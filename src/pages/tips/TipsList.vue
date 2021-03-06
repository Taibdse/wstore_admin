<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head></md-table-head>
    </md-table-row>
    <md-table-row v-for="tip in tips" :key="tip.id">
      <md-table-cell>{{ tip.index + 1 }}</md-table-cell>
      <md-table-cell style="max-width: 150px">{{ tip.title }}</md-table-cell>
      <md-table-cell>
        <img :src="formatImageUrl(tip.image)" class="img-fluid" />
      </md-table-cell>
      <md-table-cell>
        <Status :value="tip.hot" />
      </md-table-cell>
      <md-table-cell>
        <Status :value="tip.active" />
      </md-table-cell>
      <md-table-cell>
        <md-button
          class="md-just-icon md-simple md-primary"
          @click="showDetails(tip)"
        >
          <md-icon>edit</md-icon>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { formatImageUrl, removeHtmlTags } from "../../utils/strings";
import Status from "@/components/common/Status";

export default {
  components: {
    Status,
  },
  props: {
    tips: Array,
  },
  data: () => ({
    tblHeaders: ["#", "Title", "Image", "Hot", "Active"],
  }),
  methods: {
    showDetails: function (tip) {
      this.$router.push("/tips/" + tip.slug);
    },
    formatImageUrl,
    removeHtmlTags,
  },
};
</script>

<style>
</style>