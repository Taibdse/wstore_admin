<template>
  <div class="content">
    <h2 class="my-page-header">Reviews</h2>
    <div class="md-layout">
      <md-card>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item sm-small-size-100 md-size-33">
              <md-field>
                <label>Review Type</label>
                <md-select
                  v-model="filters.reviewType"
                  name="reviewType"
                  id="reviewType"
                >
                  <md-option value="0">All</md-option>
                  <md-option
                    :value="reviewType.id"
                    v-for="reviewType in reviewTypes"
                    :key="reviewType.id"
                    >{{ reviewType.reviewTypeNameEn }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout md-gutter">
              <md-button
                class="md-raised md-primary"
                style="margin-left: 10px"
                @click="getReviewByType"
                >Search</md-button
              >
            </div>
            <div class="md-layout-item" style="text-align: right">
              <md-button
                class="md-raised md-success"
                @click="gotoInsertReviewPage"
                >Add more review</md-button
              >
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50"></div>
          </div>
        </md-card-content>
      </md-card>

      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Reviews List</h4>
        </md-card-header>
        <md-card-content>
          <div v-show="isLoading" style="text-align: center">
            <md-progress-spinner
              md-mode="indeterminate"
              style="margin: auto"
            ></md-progress-spinner>
          </div>
          <div v-show="reviews.length !== 0">
            <Pagination
              :pagination="pagination"
              :handleChange="handlePageChange"
            />
            <md-button
              class="md-primary"
              style="float: right"
              @click="handleSaveSortIndexes"
              >Save sort index</md-button
            >
            <ReviewsList :reviews="pagingReviews" ref="reviewListRef" />
          </div>
          <div v-show="!isLoading && reviews.length === 0">
            <h3 style="text-align: center">No review found!</h3>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { Pagination } from "@/components";

import { mapGetters, mapActions } from "vuex";
import ReviewsList from "./ReviewsList";
import ReviewService from "../../services/review.service";
import ReviewTypeService from "../../services/reviewType.service";
import { isEmpty } from "../../utils/validations";
import { showErrors, showSuccessMsg } from "../../utils/alert";
import { SERVER_ERROR_MESSAGE, SAVE_SUCCESS } from "../../utils/constants";

export default {
  components: {
    ReviewsList,
    Pagination,
  },
  data: () => ({
    reviews: [],
    reviewTypes: [],
    filters: { reviewType: 0 },
    isLoading: false,
    orderBys: {
      createdAt: "DESC",
    },
    pagination: { pageCount: 0, currentPage: 1, size: 10 },
  }),

  computed: {
    pagingReviews: function() {
      if (isEmpty(this.reviews)) return [];
      const { currentPage, size } = this.pagination;
      return this.reviews.map((review, index) => {
        return { ...review, index: index + size * (currentPage - 1) };
      });
    },
    ...mapGetters({
      reviewSearchCondition: "searchCondition/reviews",
    }),
  },

  methods: {
    ...mapActions({
      saveReviewSearchCondition: "searchCondition/saveReviewSearchCondition",
    }),
    getReviews: async function() {
      this.isLoading = true;
      try {
        const reviewType = this.filters.reviewType;
        const { currentPage, size } = this.pagination;
        const res = await ReviewService.getReviews(
          currentPage,
          size,
          reviewType
        );
        const { data, numOfPage, page } = res.data;
        this.reviews = data;
        this.pagination = { ...this.pagination, pageCount: numOfPage };
      } catch (error) {
        this.reviews = [];
        this.pagination = { pageCount: 0, currentPage: 1, size: 10 };
      }
      this.isLoading = false;
    },

    getReviewByType: function() {
      this.getReviews();
    },

    getReviewTypes: async function() {
      try {
        let isActive = "";
        const res = await ReviewTypeService.getReviewTypes(isActive);
        this.reviewTypes = res.data;
      } catch (error) {
        this.reviewTypes = [];
      }
    },

    handlePageChange: function(pageNum) {
      this.pagination = { ...this.pagination, currentPage: pageNum };
      this.getReviews();
    },

    gotoInsertReviewPage: function() {
      this.$router.push("/reviews/insert");
    },
    handleSaveSortIndexes: async function() {
      this.isLoading = true;
      try {
        const sortIndexes = this.$refs.reviewListRef.sortIndexes;
        const data = Object.keys(sortIndexes).map((id) => ({
          id,
          sortIndex: sortIndexes[id],
        }));
        const res = await ReviewService.saveSortIndexes(data);
        console.log(res);
        showSuccessMsg({ title: SAVE_SUCCESS, text: "" });
        this.getReviews();
      } catch (error) {
        showErrors({
          title: "Server errors!",
          text: SERVER_ERROR_MESSAGE,
        });
      }
      this.isLoading = false;
    },
    saveSearchCondition: function() {
      const searchCondition = {
        pagination: this.pagination,
      };
      this.saveReviewSearchCondition(searchCondition);
    },
    loadSearchCondition: function() {
      const searchCondition = this.reviewSearchCondition;
      if (!isEmpty(searchCondition)) {
        this.pagination = searchCondition.pagination;
      }
    },
  },

  async created() {
    this.loadSearchCondition();
    this.getReviews();
    this.getReviewTypes();
  },
  beforeDestroy() {
    this.saveSearchCondition();
  },
};
</script>

<style></style>
