<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head></md-table-head>
    </md-table-row>
    <md-table-row v-for="(policy, index) in policies" :key="policy.type">
      <md-table-cell>{{ index + 1 }}</md-table-cell>
      <md-table-cell>{{ policy.type }}</md-table-cell>
      <md-table-cell>{{ policy.name }}</md-table-cell>
      <md-table-cell>
        <Status :value="policy.active" />
      </md-table-cell>

      <md-table-cell>
        <ActionButton
          icon="language"
          tooltip="Preview"
          classNames="md-danger"
          @click="handlePreview(policy)"
        />
        <ActionButton
          icon="edit"
          tooltip="Edit"
          classNames="md-primary"
          @click="showDetails(policy)"
        />
        <!-- <md-button
          class="md-just-icon md-simple md-primary"
          @click="showDetails(policy)"
        >
          <md-icon>edit</md-icon>
        </md-button> -->
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { ActionButton, Status } from "@/components";
import { APP_ROOT_DOMAIN } from "../../configs/api";
import { openNewTab } from "../../utils/utils";

export default {
  components: {
    Status,
    ActionButton,
  },
  props: {
    policies: Array,
  },
  data: () => ({
    tblHeaders: ["#", "Type", "Name", "Active"],
  }),
  methods: {
    showDetails: function (policy) {
      this.$router.push("/policies/" + policy.type.toLowerCase());
    },
    handlePreview: function (policy) {
      openNewTab(APP_ROOT_DOMAIN + "/policies/" + policy.type.toLowerCase());
    },
  },
};
</script>

<style>
</style>