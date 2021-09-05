<template>
  <div class="content">
    <h2 class="my-page-header">Tags</h2>
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Filters</h4>
        <!-- <p class="category"></p> -->
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100" style="text-align: right">
            <md-button class="md-raised md-success" @click="gotoInsertTagPage"
              >Add more tag</md-button
            >
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item sm-size-100">
            <strong>Search Tags</strong>
            <md-field>
              <md-input v-model="keyword" />
            </md-field>
          </div>

          <div class="md-layout md-gutter">
            <md-button class="md-raised md-primary" @click="handleSearchTags"
              >Search</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
    <div></div>

    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Tags List</h4>
        <!-- <p class="category"></p> -->
      </md-card-header>
      <md-card-content>
        <div v-show="isLoading" style="text-align: center">
          <md-progress-spinner
            md-mode="indeterminate"
            style="margin: auto"
          ></md-progress-spinner>
        </div>
        <div v-show="!isLoading && tags.length !== 0">
          <Pagination
            :pagination="pagination"
            :handleChange="handlePageChange"
          />
          <TagsList :tags="tags" />
        </div>
        <div v-show="!isLoading && tags.length === 0">
          <h3 style="text-align: center">No tags found!</h3>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import TagService from "../../services/tag.service";
import TagsList from "@/pages/tags/TagsList";
import Pagination from "@/components/common/Pagination";

export default {
  components: {
    TagsList,
    Pagination,
  },
  data: () => ({
    tags: [],
    keyword: "",
    isLoading: false,
    pagination: { pageCount: 0, currentPage: 1, size: 10 },
  }),

  computed: {},

  methods: {
    handlePageChange: function(pageNum) {
      this.pagination = { ...this.pagination, currentPage: pageNum };
      this.getTags(this.pagination, this.keyword);
    },

    getTags: async function(pagination, keyword) {
      this.isLoading = true;
      try {
        const res = await TagService.getFullTags({
          keyword: keyword,
          page: pagination.currentPage,
          size: pagination.size,
        });
        const { data, page, size, numOfPage } = res.data;
        this.tags = data.map((tag, index) => ({
          ...tag,
          index: size * (page - 1) + index + 1,
        }));
        this.pagination = {
          ...this.pagination,
          currentPage: page,
          pageCount: numOfPage,
        };
      } catch (error) {
        this.tags = [];
        this.pagination = { pageCount: 0, currentPage: 1, size: 10 };
      }
      this.isLoading = false;
    },
    handleSearchTags: function() {
      this.pagination = { ...this.pagination, currentPage: 1 };
      this.getTags(this.pagination, this.keyword);
    },

    gotoInsertTagPage: function() {
      this.$router.push("/tags/insert");
    },
  },
  async created() {
    this.getTags(this.pagination, this.keyword);
  },
};
</script>

<style scoped>
.md-table-cell {
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: center;
}

.md-dialog {
  max-width: 768px;
  min-width: 500px;
}

.md-input {
  width: 20px;
}
</style>
