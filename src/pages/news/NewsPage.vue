<template>
  <div class="content">
    <h2 class="my-page-header">News</h2>
    <div class="md-layout">
      <md-card>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item" style="text-align: right">
              <md-button
                class="md-raised md-success"
                @click="gotoInsertNewsPage"
                >Add more news</md-button
              >
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <!-- <md-field>
                                <label for="createdAt">Sort By Date</label>
                                <md-select v-model="orderBys.createdAt" name="createdAt" id="createdAt">
                                    <md-option value="DESC">Moi nhat</md-option>
                                    <md-option value="ASC">Cu nhat</md-option>
                                </md-select>
                            </md-field>
                            <md-button class="md-raised md-primary" @click="getReviews">Tìm kiếm</md-button> -->
            </div>
          </div>
        </md-card-content>
      </md-card>

      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">News List</h4>
        </md-card-header>
        <md-card-content>
          <div v-show="isLoading" style="text-align: center">
            <md-progress-spinner
              md-mode="indeterminate"
              style="margin: auto"
            ></md-progress-spinner>
          </div>
          <div v-show="newsArray.length !== 0">
            <Pagination
              :pagination="pagination"
              :handleChange="handlePageChange"
            />
            <NewsList :newsArray="newsArray" />
          </div>
          <div v-show="!isLoading && newsArray.length === 0">
            <h3 style="text-align: center">No news found!</h3>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Pagination from "@/components/common/Pagination";
import NewsList from "./NewsList";
import NewsService from "../../services/news.service";
import { isEmpty } from "../../utils/validations";

const NEWS_SEARCH_CONDITION_KEY = "newsSearchConditionKey";

export default {
  components: {
    NewsList,
    Pagination,
  },
  data: () => ({
    newsArray: [],
    isLoading: false,
    orderBys: {
      createdAt: "DESC",
    },
    pagination: { pageCount: 0, currentPage: 1, size: 10 },
  }),
  computed: {
    ...mapGetters({
      newsSearchCondition: "searchCondition/newsList",
    }),
  },

  methods: {
    ...mapActions({
      saveNewsSearchCondition: "searchCondition/saveNewsSearchCondition",
    }),
    getNews: async function () {
      this.isLoading = true;
      try {
        const { currentPage, size } = this.pagination;
        const res = await NewsService.getNews(currentPage, size);
        const { data, numOfPage, page } = res.data;
        this.newsArray = data;
        this.pagination = { ...this.pagination, pageCount: numOfPage };
      } catch (error) {
        this.newsArray = [];
        this.pagination = { pageCount: 0, currentPage: 1, size: 10 };
      }
      this.isLoading = false;
    },

    handlePageChange: function (pageNum) {
      this.pagination = { ...this.pagination, currentPage: pageNum };
      this.getNews();
    },

    gotoInsertNewsPage: function () {
      this.$router.push("/news/insert");
    },
    saveSearchCondition: function () {
      const searchCondition = {
        pagination: this.pagination,
      };
      this.saveNewsSearchCondition(searchCondition);
    },
    loadSearchCondition: function () {
      const searchCondition = this.newsSearchCondition;
      if (!isEmpty(searchCondition)) {
        this.pagination = searchCondition.pagination;
      }
    },
  },

  async created() {
    this.loadSearchCondition();
    this.getNews();
  },
  beforeDestroy() {
    this.saveSearchCondition();
  },
};
</script>

<style>
</style>