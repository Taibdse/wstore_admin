<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head></md-table-head>
    </md-table-row>
    <md-table-row v-for="(comment, index) in comments" :key="comment.id">
      <md-table-cell>{{ index + 1 }}</md-table-cell>
      <md-table-cell>{{ comment.name }}</md-table-cell>

      <md-table-cell>{{ truncate(comment.description, 50) }}</md-table-cell>

      <md-table-cell style="width: 60px">
        <md-field>
          <md-input
            type="number"
            style="width: 60px"
            v-model="sortIndexes[comment.id]"
          />
        </md-field>
      </md-table-cell>

      <md-table-cell>
        <Status :value="comment.active" />
      </md-table-cell>

      <md-table-cell>
        <ActionButton
          icon="language"
          tooltip="Preview"
          classNames="md-danger"
          @click="handlePreview(comment)"
        />
        <ActionButton
          icon="edit"
          tooltip="Edit"
          classNames="md-primary"
          @click="showDetails(comment)"
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
    comments: Array,
  },
  data: () => ({
    sortIndexes: {},

    tblHeaders: ["#", "Name", "Phone", "Email", "Content", "Rating"],
  }),

  methods: {
    showDetails: function(comment) {
      this.$router.push("/comments/" + comment.id);
    },
    handlePreview: function(comment) {
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
