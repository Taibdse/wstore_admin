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

      <md-table-cell>{{ truncate(category.description, 50) }}</md-table-cell>

      <md-table-cell style="width: 60px">
        <md-field>
          <md-input
            type="number"
            style="width: 60px"
            v-model="sortIndexes[category.id]"
          />
        </md-field>
      </md-table-cell>

      <md-table-cell>
        <Status :value="category.active" />
      </md-table-cell>

      <md-table-cell>
        <ActionButton
          icon="language"
          tooltip="Preview"
          classNames="md-danger"
          @click="handlePreview(category)"
        />
        <ActionButton
          icon="edit"
          tooltip="Edit"
          classNames="md-primary"
          @click="showDetails(category)"
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
import { truncate } from "../../utils/strings";
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
    categories: Array,
  },
  data: () => ({
    sortIndexes: {},

    tblHeaders: ["#", "Name", "Description", "Sort Index", "Active"],
  }),

  methods: {
    showDetails: function(category) {
      this.$router.push("/categories/" + category.id);
    },
    handlePreview: function(category) {
      openNewTab(
        APP_ROOT_DOMAIN + "/products?category=" + category.slug + "&page=1"
      );
    },
    truncate,
  },

  watch: {
    categories: function(newCategories) {
      this.sortIndexes = newCategories.reduce(
        (acc, r) => ({ ...acc, [r.id]: r.sortIndex }),
        {}
      );
    },
  },
};
</script>
