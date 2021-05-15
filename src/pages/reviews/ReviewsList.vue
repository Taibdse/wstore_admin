<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head class="mư-100"></md-table-head>
    </md-table-row>
    <md-table-row v-for="review in reviews" :key="review.id">
      <md-table-cell>{{ review.index + 1 }}</md-table-cell>
      <md-table-cell style="max-width: 150px">{{ review.title }}</md-table-cell>
      <md-table-cell>{{ review.celebrityName }}</md-table-cell>
      <md-table-cell>
        <img :src="formatImageUrl(review.image)" class="img-fluid" />
      </md-table-cell>
      <md-table-cell>
        <Status :value="review.active" />
        <!-- <strong v-if="!review.active" class="text-danger">INACTIVE</strong> -->
        <!-- <strong v-if="review.active" class="text-success">ACTIVE</strong> -->
      </md-table-cell>
      <md-table-cell>
        <Status :value="review.hot" />
      </md-table-cell>
      <md-table-cell style="width: 60px">
        <md-field>
          <md-input
            type="number"
            style="width: 60px"
            v-model="sortIndexes[review.id]"
          />
        </md-field>
      </md-table-cell>
      <md-table-cell>
        <ActionButton
          icon="language"
          tooltip="Preview"
          classNames="md-danger"
          @click="handlePreview(review)"
        />
        <ActionButton
          icon="edit"
          tooltip="Edit"
          classNames="md-primary"
          @click="showDetails(review)"
        />
        <!-- <md-button
          class="md-just-icon md-simple md-primary"
          @click="showDetails(review)"
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
import { openNewTab } from '../../utils/utils';
import { APP_ROOT_DOMAIN } from '../../configs/api';

export default {
  components: {
    Status, ActionButton
  },
  props: {
    reviews: Array,
  },
  data: () => ({
    tblHeaders: [
      "#",
      "Title",
      "Celebrity Name",
      "Image",
      "Active",
      "Hot",
      "Sort Index",
    ],
    sortIndexes: {},
  }),
  methods: {
    showDetails: function (review) {
      this.$router.push("/reviews/" + review.slug);
    },
    handlePreview: function(review) {
      openNewTab(APP_ROOT_DOMAIN + '/reviews/' + review.slug);
    },
    formatImageUrl,
    removeHtmlTags,
  },
  watch: {
    reviews: function (newReviews) {
      this.sortIndexes = newReviews.reduce(
        (acc, r) => ({ ...acc, [r.id]: r.sortIndex }),
        {}
      );
    },
  },
};
</script>

<style>
</style>