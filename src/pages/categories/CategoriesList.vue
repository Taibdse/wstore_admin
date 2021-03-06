<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head></md-table-head>
    </md-table-row>
    <md-table-row v-for="(category, index) in categories" :key="category.id">
      <md-table-cell>{{ index + 1 }}</md-table-cell>
      <md-table-cell>{{ category.name }}</md-table-cell>

      <md-table-cell>{{ truncate(category.description, 100) }}</md-table-cell>
      <md-table-cell>
        <Status :value="category.active" />
      </md-table-cell>
      <md-table-cell>
        <md-button
          class="md-just-icon md-simple md-primary"
          @click="showDetails(category)"
        >
          <md-icon>edit</md-icon>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { truncate } from "../../utils/strings";
import Status from "@/components/common/Status";

export default {
  components: {
    Status,
  },
  props: {
    categories: Array,
  },
  data: () => ({
    tblHeaders: ["#", "Name", "Description", "Active"],
  }),
  methods: {
    showDetails: function (category) {
      this.$router.push("/categories/" + category.slug);
    },
    truncate,
  },
};
</script>

<style>
</style>