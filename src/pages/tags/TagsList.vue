<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head></md-table-head>
    </md-table-row>
    <md-table-row v-for="tag in tags" :key="tag.id">
      <md-table-cell>{{ tag.index }}</md-table-cell>
      <md-table-cell>
        {{ tag.name }}
      </md-table-cell>

      <md-table-cell>
        <Status :value="tag.active" />
      </md-table-cell>

      <md-table-cell>
        <md-button
          class="md-just-icon md-simple md-primary"
          @click="showDetails(tag)"
        >
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="top">See order history</md-tooltip>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import Status from "@/components/common/Status";

export default {
  components: {
    Status,
  },
  props: {
    tags: Array,
  },
  data: () => ({
    tblHeaders: ["#", "Name", "Status"],
  }),
  methods: {
    showDetails: function(tag) {
      this.$router.push("/tags/" + tag.id);
    },
  },
};
</script>

<style></style>
