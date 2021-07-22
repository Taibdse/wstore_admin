<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head class="mw-100"></md-table-head>
    </md-table-row>
    <md-table-row v-for="news in newsArray" :key="news.id">
      <md-table-cell>{{ news.index + 1 }}</md-table-cell>
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
      <md-table-cell style="width: 60px">
        <md-field>
          <md-input
            type="number"
            style="width: 60px"
            v-model="sortIndexes[news.id]"
          />
        </md-field>
      </md-table-cell>
      <md-table-cell>
        <ActionButton
          icon="language"
          tooltip="Preview"
          classNames="md-danger"
          @click="handlePreview(news)"
        />
        <ActionButton
          icon="edit"
          tooltip="Edit"
          classNames="md-primary"
          @click="showDetails(news)"
        />
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { ActionButton, Status } from "@/components";

import { isEmpty } from "../../utils/validations";
import { formatImageUrl, removeHtmlTags } from "../../utils/strings";
import { getVNTimeFormat } from "../../utils/time";
import { APP_ROOT_DOMAIN } from "../../configs/api";
import { openNewTab } from "../../utils/utils";

export default {
  components: {
    Status,
    ActionButton,
  },
  props: {
    newsArray: Array,
  },
  data: () => ({
    tblHeaders: ["#", "", "Title", "Created At", "Active", "Hot", "Sort Index"],
    sortIndexes: {},
  }),
  methods: {
    showDetails: function (news) {
      this.$router.push("/news/" + news.id);
    },
    handlePreview: function (news) {
      openNewTab(APP_ROOT_DOMAIN + "/news/" + news.slug);
    },
    formatImageUrl,
    getVNTimeFormat,
    isEmpty,
    removeHtmlTags,
  },
  watch: {
    newsArray: function (newNewsList) {
      this.sortIndexes = newNewsList.reduce(
        (acc, it) => ({ ...acc, [it.id]: it.sortIndex }),
        {}
      );
    },
  },
};
</script>

<style>
</style>