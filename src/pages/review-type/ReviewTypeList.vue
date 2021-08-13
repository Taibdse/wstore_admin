<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head></md-table-head>
    </md-table-row>
    <md-table-row
      v-for="(reviewType, index) in reviewTypes"
      :key="reviewType.id"
    >
      <md-table-cell>{{ index + 1 }}</md-table-cell>
      <md-table-cell>{{ reviewType.reviewTypeName }}</md-table-cell>

      <md-table-cell>{{ reviewType.reviewTypeNameEn }}</md-table-cell>

      <md-table-cell style="width: 60px">
        <md-field>
          <md-input
            type="number"
            style="width: 60px"
            v-model="sortIndexes[reviewType.id]"
          />
        </md-field>
      </md-table-cell>

      <md-table-cell>
        <Status :value="reviewType.active" />
      </md-table-cell>

      <md-table-cell>
        <ActionButton
          icon="edit"
          tooltip="Edit"
          classNames="md-primary"
          @click="showDetails(reviewType)"
        />
        <!-- <md-button
          class="md-just-icon md-simple md-primary"
          @click="showDetails(category)"
        >
          <md-icon>edit</md-icon>
        </md-button> -->
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import Status from "@/components/common/Status";
import ActionButton from "@/components/common/ActionButton";
import { openNewTab } from "../../utils/utils";
import { APP_ROOT_DOMAIN } from "../../configs/api";

export default {
  components: {
    Status,
    ActionButton,
  },
  props: {
    reviewTypes: Array,
  },
  data: () => ({
    sortIndexes: {},

    tblHeaders: ["#", "Name", "Name En", "Sort Index", "Active"],
  }),

  methods: {
    showDetails: function(reviewType) {
      this.$router.push("/reviewTypes/" + reviewType.id);
    },
  },

  watch: {
    reviewTypes: function(newReviewTypes) {
      this.sortIndexes = newReviewTypes.reduce(
        (acc, r) => ({ ...acc, [r.id]: r.sortIndex }),
        {}
      );
    },
  },
};
</script>
