<template>
  <div class="content">
    <h2 class="my-page-header">Review Types</h2>
    <div class="md-layout">
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Filters</h4>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100" style="text-align: right">
              <md-button
                class="md-raised md-success"
                @click="gotoInsertReviewTypePage"
                >Add more review type</md-button
              >
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field>
                <label for="movie">Active</label>
                <md-select
                  v-model="filters.active"
                  name="reviewType"
                  id="reviewType"
                >
                  <md-option value="all">All</md-option>
                  <md-option value="active">Active</md-option>
                  <md-option value="inactive">In active</md-option>
                </md-select>
              </md-field>
              <md-button class="md-raised md-primary" @click="getReviewTypes"
                >Search</md-button
              >
            </div>
          </div>
        </md-card-content>
      </md-card>

      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Review Types List</h4>
        </md-card-header>
        <md-card-content>
          <div v-show="isLoading" style="text-align: center">
            <md-progress-spinner
              md-mode="indeterminate"
              style="margin: auto"
            ></md-progress-spinner>
          </div>
          <div v-show="!isLoading && reviewTypes.length !== 0">
            <md-button
              class="md-primary"
              style="float: right"
              @click="handleSaveSortIndexes"
              >Save sort index</md-button
            >
            <ReviewTypeList
              :reviewTypes="reviewTypes"
              ref="reviewTypeListRef"
            />
          </div>
          <div v-show="!isLoading && reviewTypes.length === 0">
            <h3 style="text-align: center">Can not find any reviewTypes</h3>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import ReviewTypeService from "../../services/reviewType.service";
import ReviewTypeList from "./ReviewTypeList.vue";
import { showErrors, showSuccessMsg } from "../../utils/alert";
import { SERVER_ERROR_MESSAGE, SAVE_SUCCESS } from "../../utils/constants";
export default {
  components: {
    ReviewTypeList,
  },

  async created() {
    this.getReviewTypes();
  },

  data: () => ({
    reviewTypes: [],
    isLoading: false,
    filters: { active: "all" },
  }),

  methods: {
    handleSaveSortIndexes: async function() {
      this.isLoading = true;
      try {
        const sortIndexes = this.$refs.reviewTypeListRef.sortIndexes;
        const data = Object.keys(sortIndexes).map((id) => ({
          id,
          sortIndex: sortIndexes[id],
        }));
        const res = await ReviewTypeService.saveSortIndexes(data);
        showSuccessMsg({ title: SAVE_SUCCESS, text: "" });
        this.getReviewTypes();
      } catch (error) {
        showErrors({
          title: "Server errors!",
          text: SERVER_ERROR_MESSAGE,
        });
      }
      this.isLoading = false;
    },

    getReviewTypes: async function() {
      this.isLoading = true;
      try {
        let isActive = "";
        if (this.filters.active == "active") isActive = true;
        else if (this.filters.active == "inactive") isActive = false;

        const res = await ReviewTypeService.getReviewTypes(isActive);
        this.reviewTypes = res.data;
      } catch (error) {
        this.reviewTypes = [];
      }
      this.isLoading = false;
    },

    gotoInsertReviewTypePage: function() {
      this.$router.push("/reviewTypes/insert");
    },
  },
};
</script>

<style></style>
