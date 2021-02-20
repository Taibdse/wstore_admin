<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{header}}</md-table-head>
      <md-table-head></md-table-head>
    </md-table-row>
    <md-table-row v-for="review in reviews" :key="review.id">
      <md-table-cell>{{ review.index + 1 }}</md-table-cell>
      <md-table-cell>{{ truncate(review.title, 10) }}</md-table-cell>
      <!-- <md-table-cell>{{ truncate(removeHtmlTags(review.content), 40) }}</md-table-cell> -->
      <md-table-cell>{{ review.celebrityName }}</md-table-cell>
      <md-table-cell>
        <img :src="formatImageUrl(review.image)" class="img-fluid" />
      </md-table-cell>
      <md-table-cell>
        <strong v-if="!review.active" class="text-danger">INACTIVE</strong>
        <strong v-if="review.active" class="text-success">ACTIVE</strong>
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
        <md-button
          class="md-just-icon md-simple md-primary"
          @click="showDetails(review)"
        >
          <md-icon>edit</md-icon>
          <!-- <md-tooltip md-direction="top">Edit</md-tooltip> -->
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { formatImageUrl, truncate, removeHtmlTags } from "../../utils/strings";

export default {
  props: {
    reviews: Array,
  },
  data: () => ({
    tblHeaders: ["#", "Title", "Celebrity Name", "Image", "Status", "Sort Index"],
    sortIndexes: {}
  }),
  methods: {
    showDetails: function (review) {
      this.$router.push("/reviews/" + review.slug);
      // window.open("/reviews/" + review.slug, "_blank");
    },
    formatImageUrl,
    truncate,
    removeHtmlTags,
  },
  watch: {
      reviews: function(newReviews){
          this.sortIndexes = newReviews.reduce((acc, r) => ({ ...acc, [r.id]: r.sortIndex }), {});
      },
    }
};
</script>

<style>
</style>