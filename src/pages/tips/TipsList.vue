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
        <ActionButton
          icon="language"
          tooltip="Preview"
          classNames="md-danger"
          @click="handlePreview(tip)"
        />
        <ActionButton
          icon="edit"
          tooltip="Edit"
          classNames="md-primary"
          @click="showDetails(tip)"
        />
        <!-- <md-button
          class="md-just-icon md-simple md-primary"
          @click="showDetails(tip)"
        >
          <md-icon>edit</md-icon>
        </md-button> -->
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { ActionButton, Status } from "@/components";

import { formatImageUrl, removeHtmlTags } from "../../utils/strings";
import { APP_ROOT_DOMAIN } from '../../configs/api';
import { openNewTab } from '../../utils/utils';

export default {
  components: {
    Status, ActionButton
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
    handlePreview: function(tip) {
      openNewTab(APP_ROOT_DOMAIN + '/tips/' + tip.slug);
    },
    formatImageUrl,
    removeHtmlTags,
  },
};
</script>

<style>
</style>