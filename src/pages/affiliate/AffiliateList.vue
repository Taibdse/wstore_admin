<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head></md-table-head>
    </md-table-row>
    <md-table-row v-for="(affiliate, index) in affiliates" :key="affiliate.id">
      <md-table-cell>{{ index + 1 }}</md-table-cell>
      <md-table-cell>{{ affiliate.affiliateName }}</md-table-cell>
      <md-table-cell>{{ affiliate.slug }}</md-table-cell>

      <md-table-cell>
        <Status :value="affiliate.active" />
      </md-table-cell>

      <md-table-cell>
        <ActionButton
          icon="edit"
          tooltip="Edit"
          classNames="md-primary"
          @click="showDetails(affiliate)"
        />
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { truncate } from "../../utils/strings";
import Status from "@/components/common/Status";
import ActionButton from "@/components/common/ActionButton";

export default {
  components: {
    Status,
    ActionButton,
  },
  props: {
    affiliates: Array,
  },
  data: () => ({
    sortIndexes: {},

    tblHeaders: ["#", "Name", "Slug", "Active"],
  }),

  methods: {
    showDetails: function(affiliate) {
      this.$router.push("/affiliates/" + affiliate.id);
    },
    truncate,
  },
};
</script>
