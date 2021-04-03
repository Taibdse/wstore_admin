<template>
  <div class="content">
    <h2 class="my-page-header">Promotion Codes</h2>
    <div class="md-layout">
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Filters</h4>
          <!-- <p class="category"></p> -->
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item" style="text-align: right">
              <md-button
                class="md-raised md-success"
                @click="gotoInsertPromotionCodePage"
                >Add more promotionCodes</md-button>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field>
                <label for="searchValue">Input code/name...</label>
                <md-input
                  name="searchValue"
                  id="searchValue"
                  v-model="filters.searchValue"
                />
              </md-field>
              <md-button
                class="md-raised md-primary"
                @click="search"
                >Search</md-button
              >
            </div>
          </div>
        </md-card-content>
      </md-card>

      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">PromotionCodes List</h4>
        </md-card-header>
        <md-card-content>
          <div v-show="isLoading" style="text-align: center">
            <md-progress-spinner
              md-mode="indeterminate"
              style="margin: auto"
            ></md-progress-spinner>
          </div>
          <div v-show="!isLoading && promotionCodes.length !== 0">
            <Pagination
              :pagination="pagination"
              :handleChange="handlePageChange"
            />
            <PromotionCodeList
              :isLoading="isLoading"
              :promotionCodes="promotionCodes"
              ref="promotionCodeListRef"
            />
          </div>
          <div v-show="!isLoading && promotionCodes.length === 0">
            <h3 style="text-align: center">Can not find any promotion codes</h3>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import PromotionCodeService from "../../services/promotionCode.service";
import PromotionCodeList from "@/pages/promotion-code/PromotionCodeList";
import Pagination from "@/components/common/Pagination";
import DropzoneUpload from "@/components/common/DropzoneUpload";
import { showErrors, showSuccessMsg } from "../../utils/alert";
import { SERVER_ERROR_MESSAGE, SAVE_SUCCESS } from "../../utils/constants";
import { PathRouteConstants } from '../../routes/pathRoutes';

export default {
  components: {
    PromotionCodeList,
    Pagination,
    DropzoneUpload,
  },

  data: () => ({
    promotionCodes: [],
    isLoading: false,
    filters: { searchValue: "" },
    pagination: { pageCount: 0, currentPage: 1, size: 10 },
  }),

  methods: {
    getPromotionCodes: async function () {
      this.isLoading = true;
      let { category } = this.filters;
      const { currentPage, size } = this.pagination;
      try {
        const res = await PromotionCodeService.search({ ...this.filters, page: currentPage, size });
        console.log(res);
        const { data, numOfPage, page } = res.data;
        this.promotionCodes = data.map((item, index) => ({
          ...item,
          index: (page - 1) * size + index + 1,
        }));
        this.pagination = { ...this.pagination, pageCount: numOfPage };
      } catch (error) {
        this.promotionCodes = [];
        this.pagination = { pageCount: 0, currentPage: 1, size: 10 };
      }
      this.isLoading = false;
    },

    search: function () {
      this.pagination = { ...this.pagination, currentPage: 1 };
      this.getPromotionCodes();
    },

    handlePageChange: function (pageNum) {
      this.pagination = { ...this.pagination, currentPage: pageNum };
      this.getPromotionCodes();
    },

    gotoInsertPromotionCodePage: function () {
      this.$router.push(PathRouteConstants.promotionCodeInsertRoute);
    },
  },
  async created() {
    this.isLoading = true;
    try {
      await this.getPromotionCodes();
    } catch (error) {}
    this.isLoading = false;
  },
};
</script>

<style>
button.float-right {
  margin-left: auto;
}
</style>