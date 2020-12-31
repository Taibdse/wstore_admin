<template>
  <div class="content">
    <h2 class="my-page-header">Products</h2>
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
                @click="gotoInsertProductPage"
                >Add more products</md-button
              >
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field>
                <label for="movie">Category</label>
                <md-select
                  v-model="filters.category"
                  name="category"
                  id="category"
                >
                  <md-option value="all">All</md-option>
                  <md-option
                    :value="cate.slug"
                    v-for="cate in categories"
                    :key="cate.id"
                    >{{ cate.name }}</md-option
                  >
                </md-select>
              </md-field>
              <md-button
                class="md-raised md-primary"
                @click="getProductsByCategory"
                >Search</md-button
              >
            </div>
          </div>
        </md-card-content>
      </md-card>

      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Products List</h4>
        </md-card-header>
        <md-card-content>
          <div v-show="isLoading" style="text-align: center">
            <md-progress-spinner
              md-mode="indeterminate"
              style="margin: auto"
            ></md-progress-spinner>
          </div>
          <div v-show="!isLoading && products.length !== 0">
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
            <ProductsList
              :isLoading="isLoading"
              :products="products"
              ref="productListRef"
            />
          </div>
          <div v-show="!isLoading && products.length === 0">
            <h3 style="text-align: center">Can not find any products</h3>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/product.service";
import CategoryService from "@/services/category.service";
import ProductsList from "@/pages/products/ProductsList";
import Pagination from "@/components/common/Pagination";
import DropzoneUpload from "@/components/common/DropzoneUpload";

export default {
  components: {
    ProductsList,
    Pagination,
    DropzoneUpload,
  },

  async created() {
    this.isLoading = true;
    try {
      await this.getCategories();
      await this.getProducts();
    } catch (error) {}
    this.isLoading = false;
  },

  data: () => ({
    products: [],
    isLoading: false,
    categories: [],
    filters: { category: "all" },
    orderBys: {
      price: "ASC",
    },
    pagination: { pageCount: 0, currentPage: 1, size: 10 },
  }),

  methods: {
    getProducts: async function () {
      this.isLoading = true;
      let { category } = this.filters;
      if (category === "all") category = "";
      const { currentPage, size } = this.pagination;
      try {
        const res = await ProductService.getProducts(
          category,
          currentPage,
          size
        );
        const { data, numOfPage, page } = res.data;
        this.products = data.map((item, index) => ({
          ...item,
          index: (page - 1) * size + index + 1,
        }));
        this.pagination = { ...this.pagination, pageCount: numOfPage };
      } catch (error) {
        this.products = [];
        this.pagination = { pageCount: 0, currentPage: 1, size: 10 };
      }
      this.isLoading = false;
    },

    getProductsByCategory: function () {
      this.pagination = { ...this.pagination, currentPage: 1 };
      this.getProducts();
    },

    getCategories: async function () {
      const res = await CategoryService.getCategories("");
      this.categories = res.data;
    },

    handlePageChange: function (pageNum) {
      this.pagination = { ...this.pagination, currentPage: pageNum };
      this.getProducts();
    },

    handleSaveSortIndexes: async function () {
      this.isLoading = true;
      try {
        const sortIndexes = this.$refs.productListRef.sortIndexes;
        const data = Object.keys(sortIndexes).map((id) => ({
          id,
          sortIndex: sortIndexes[id],
        }));
        console.log(data);
        const res = await ProductService.saveSortIndexes(data);
        console.log(res);
        this.getProducts();
      } catch (error) {
        console.log(error);
        showErrors({
          title: "Server errors!",
          text: this.serverErrorMsg,
        });
      }
      this.isLoading = false;
    },

    gotoInsertProductPage: function () {
      this.$router.push("/products/insert");
    },
  },
};
</script>

<style>
.img-fluid {
  width: 65px !important;
}

button.float-right {
  margin-left: auto;
}
</style>