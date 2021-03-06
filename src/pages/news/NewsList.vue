<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head></md-table-head>
    </md-table-row>
    <md-table-row v-for="(news, index) in newsArray" :key="news.id">
      <md-table-cell>{{ index + 1 }}</md-table-cell>
      <md-table-cell>
        <img :src="formatImageUrl(news.image)" class="img-fluid" />
      </md-table-cell>
      <md-table-cell style="max-width: 150px">{{
        removeHtmlTags(news.title)
      }}</md-table-cell>
      <md-table-cell>{{ getVNTimeFormat(news.createdAt) }}</md-table-cell>
      <md-table-cell>
        <Status :value="news.active" />
      </md-table-cell>
      <md-table-cell>
        <Status :value="news.hot" />
      </md-table-cell>
      <md-table-cell>
        <md-button
          class="md-just-icon md-simple md-primary"
          @click="showDetails(news)"
        >
          <md-icon>edit</md-icon>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { isEmpty } from "../../utils/validations";
import { formatImageUrl, removeHtmlTags } from "../../utils/strings";
import { getVNTimeFormat } from "../../utils/time";
import Status from "@/components/common/Status.vue";

export default {
  components: {
    Status,
  },
  props: {
    newsArray: Array,
  },
  data: () => ({
    tblHeaders: ["#", "", "Title", "Created At", "Active", "Hot"],
  }),
  methods: {
    showDetails: function (news) {
      this.$router.push("/news/" + news.slug);
    },
    formatImageUrl,
    getVNTimeFormat,
    isEmpty,
    removeHtmlTags,
  },
};
</script>

<style>
</style>