<template>
  <div class="content">
    <Loading :isLoading="isLoading" />
    <h2 class="my-page-header">
      {{ insertProduct ? "Insert Product" : "Update Product" }}
    </h2>

    <md-card class="my-card">
      <md-card-header
        :data-background-color="insertProduct ? 'green' : 'orange'"
      >
        <h4 class="title">Product's information</h4>
      </md-card-header>

      <md-card-content>
        <div v-if="insertProduct || !notfound">
          <form class="md-layout" @submit.prevent="saveProduct">
            <md-card class="">
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="name">Name</label>
                      <md-input name="name" id="name" v-model="product.name" />
                      <md-button @click="setProductSlug" class="sm-btn"
                        >Create slug</md-button
                      >
                    </md-field>
                  </div>

                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="slug">Slug</label>
                      <md-input name="slug" id="slug" v-model="product.slug" />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-small-size-100">
                    <md-field>
                      <label for="category">Category</label>
                      <md-select
                        v-model="product.categoryId"
                        name="category"
                        id="category"
                      >
                        <md-option
                          :value="cate.id"
                          v-for="cate in categories"
                          :key="cate.id"
                          >{{ cate.name }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item sm-small-size-100">
                    <md-field>
                      <label for="sku">Sku</label>
                      <md-input name="sku" id="sku" v-model="product.sku" />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-small-size-100">
                    <md-field>
                      <label for="price">Price</label>
                      <md-input
                        name="price"
                        id="price"
                        v-model="product.price"
                      />
                    </md-field>
                  </div>
                  <div class="md-layout-item sm-small-size-100">
                    <md-field>
                      <label for="price">Old Price</label>
                      <md-input
                        name="oldPrice"
                        id="oldPrice"
                        v-model="product.oldPrice"
                      />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-small-size-100">
                    <md-field>
                      <label for="color">Colors</label>
                      <md-input
                        name="color"
                        id="color"
                        v-model="product.color"
                        placeholder="yellow,black,blue"
                      />
                    </md-field>
                  </div>
                  <div class="md-layout-item sm-small-size-100">
                    <md-field>
                      <label for="size">Sizes</label>
                      <md-input
                        name="size"
                        id="size"
                        v-model="product.availableSizes"
                        placeholder="S,M,L,XL"
                      />
                    </md-field>
                  </div>
                  <div class="md-layout-item sm-small-size-100">
                    <md-field>
                      <label for="productForm">Product Form</label>
                      <md-input
                        name="productForm"
                        id="productForm"
                        v-model="product.productForm"
                        placeholder="25cm,28cm"
                      />
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-25">
                    <md-field>
                      <label for="sortIndex">Sort Index</label>
                      <md-input
                        name="sortIndex"
                        id="sortIndex"
                        v-model="product.sortIndex"
                        type="number"
                      />
                    </md-field>
                  </div>
                  <div class="md-layout-item">
                    <md-field>
                      <multiselect
                        v-model="product.tagIds"
                        :options="tags.map((tag) => tag.id)"
                        :custom-label="
                          (opt) => tags.find((x) => x.id == opt).name
                        "
                        :multiple="true"
                        placeholder="Select Tags"
                      ></multiselect>
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter" style="margin-top: 20px">
                  <div class="md-layout-item md-size-100">
                    <strong>Description (VN)</strong>
                    <MyEditor
                      :ref="'descriptionVN'"
                      :content="product.description"
                    />
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div
                    class="md-layout-item md-size-100"
                    style="margin-top: 20px"
                  >
                    <strong>Description (EN)</strong>
                    <MyEditor
                      :ref="'descriptionEN'"
                      :content="product.descriptionEn"
                    />
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-100">
                    <md-checkbox v-model="product.available"
                      >Available</md-checkbox
                    >
                    <md-checkbox v-model="product.inHomePage"
                      >Show product in home page</md-checkbox
                    >
                    <md-checkbox v-model="product.active"
                      >Active product</md-checkbox
                    >
                  </div>
                </div>

                <div class="md-layout md-gutter" style="margin-top: 20px">
                  <div class="md-layout-item md-size-100">
                    <strong>Upload main image (only 1 image)</strong>
                    <br /><br />
                    <div>
                      <DropzoneUpload
                        ref="dropzoneMainImage"
                        :id="'productMainImage'"
                        :uploadMultiple="false"
                        :uploadedFiles="productMainImages"
                      >
                      </DropzoneUpload>
                    </div>
                  </div>
                </div>

                <div class="md-layout md-gutter" style="margin-top: 20px">
                  <div class="md-layout-item md-size-100">
                    <strong style="margin-bottom: 20px"
                      >Upload sub image (can upload multiple images)</strong
                    ><br /><br />
                    <DropzoneUpload
                      ref="dropzoneSubImage"
                      :id="'productSubImages'"
                      :uploadMultiple="true"
                      :uploadedFiles="productSubImages"
                    ></DropzoneUpload>
                  </div>
                </div>

                <div class="md-layout md-gutter" style="margin-top: 20px">
                  <div class="md-layout-item md-size-100">
                    <PageMetadata
                      ref="pageMetadata"
                      :pageMetadataContent="product.pageMetadata"
                    />
                  </div>
                </div>
              </md-card-content>

              <md-card-actions>
                <md-button type="submit" class="md-primary">Save</md-button>
              </md-card-actions>
            </md-card>
          </form>
        </div>
        <div v-if="!insertProduct && notfound && !isLoading">
          <h3 style="text-align: center">Can not find this product</h3>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { Loading, DropzoneUpload, MyEditor, PageMetadata } from "@/components";
import TagService from "../../services/tag.service";
import CategoryService from "../../services/category.service";
import ProductService from "../../services/product.service";
import { isEmpty } from "@/utils/validations.js";
import {
  toMoneyFormat,
  convertStringToSlug,
  formatImageUrl,
} from "../../utils/strings";
import { getVNTimeFormat } from "../../utils/time";
import { showSuccessMsg, showErrors } from "../../utils/alert";
import { getErrorsFromResponse } from "../../utils/errors";
import { SAVE_SUCCESS, SERVER_ERROR_MESSAGE } from "../../utils/constants";
import Multiselect from "vue-multiselect";

export default {
  components: {
    DropzoneUpload,
    MyEditor,
    PageMetadata,
    Loading,
    Multiselect,
  },
  data: () => ({
    product: {
      category: {},
      active: true,
      available: true,
      inHomePage: true,
      pageMetadata: {},
      tagIds: [],
    },
    isLoading: false,
    notfound: false,
    arrStatus: [],
    categories: [],
    productSubImages: [],
    productMainImages: [],
    insertProduct: false,
    tags: [],
  }),
  methods: {
    getProductDetails: async function() {
      if (!this.insertProduct) {
        this.isLoading = true;
        const productId = this.$route.params.productId;
        try {
          const res = await ProductService.getById(productId);
          this.product = res.data;

          if (isEmpty(this.product)) {
            this.notfound = true;
          } else {
            this.product.categoryId = this.product.category.id;
            this.productMainImages = [
              {
                url: formatImageUrl(this.product.mainImage),
                name: this.product.name,
              },
            ];
            this.productSubImages = this.product.subImages.map((subImage) => {
              return {
                url: formatImageUrl(subImage.url),
                name: subImage.id,
              };
            });

            if (isEmpty(this.product.pageMetadata)) {
              this.product.pageMetadata = {};
            }
          }
        } catch (error) {
          this.notfound = true;
        }
        this.isLoading = false;
      }
    },

    showErrorsMessage: function(res) {
      const errors = getErrorsFromResponse(res.data);
      showErrors({
        title: "Please check input data!",
        text: errors,
      });
    },

    saveProduct: async function() {
      const mainImage = this.$refs.dropzoneMainImage.getUploadedFiles();
      const uploadedSubImages = this.$refs.dropzoneSubImage.getUploadedFiles();
      const manaullyAddedSubImages = this.$refs.dropzoneSubImage.getManuallyAddedFiles();
      const data = JSON.parse(JSON.stringify(this.product));
      data.subImages = uploadedSubImages.map((img) => img.dataURL);
      data.mainImage = isEmpty(mainImage) ? null : mainImage[0].dataURL;

      if (!this.insertProduct) {
        data.inactiveSubImages = this.productSubImages
          .filter((img) => {
            return (
              manaullyAddedSubImages.findIndex(
                (item) => item.name == img.name
              ) == -1
            );
          })
          .map((item) => item.name);
      } else {
        data.inactiveSubImages = [];
      }

      data.description = this.$refs["descriptionVN"].$data.myContent;
      data.descriptionEn = this.$refs["descriptionEN"].$data.myContent;
      data.pageMetadata = this.$refs["pageMetadata"].$data.pageMetadata;
      if (this.insertProduct) {
        console.log(data);
        await this.handleInsertProduct(data);
      } else {
        await this.handleUpdateProduct(data);
      }
    },

    handleInsertProduct: async function(data) {
      this.isLoading = true;
      try {
        const res = await ProductService.insertProduct(data);
        if (res.data.success === "1") {
          showSuccessMsg({ title: SAVE_SUCCESS, text: "" });
        } else {
          this.showErrorsMessage(res);
        }
      } catch (error) {
        showErrors({
          title: "Server errors!",
          text: SERVER_ERROR_MESSAGE,
        });
      }
      this.isLoading = false;
    },

    handleUpdateProduct: async function(data) {
      this.isLoading = true;
      try {
        const res = await ProductService.updateProduct(data);
        if (res.data.success === "1") {
          await this.getProductDetails();
          showSuccessMsg({
            title: SAVE_SUCCESS,
            text: "",
          });
        } else {
          this.showErrorsMessage(res);
        }
      } catch (error) {
        showErrors({
          title: "Server errors!",
          text: SERVER_ERROR_MESSAGE,
        });
      }
      this.isLoading = false;
    },

    getCategories: async function() {
      const res = await CategoryService.getCategories("");
      this.categories = res.data;
    },

    getTags: async function() {
      const res = await TagService.getAllTagsActive();
      this.tags = res.data;
    },

    setProductSlug: function() {
      this.product = {
        ...this.product,
        slug: convertStringToSlug(this.product.name),
      };
    },

    toMoneyFormat,
    getVNTimeFormat,
  },

  async created() {
    if (this.$route.path.indexOf("/products/insert") > -1) {
      this.insertProduct = true;
    }
    try {
      await this.getTags();
      await this.getCategories();
      this.getProductDetails();
      if (this.insertProduct) {
        this.product = { ...this.product, categoryId: this.categories[0].id };
      }
    } catch (error) {}
  },
};
</script>

<style>
.md-list-item span.md-list-item-text {
  padding-top: 13px;
  padding-left: 10px;
}

.page-heading {
  text-align: center;
  margin-top: 0;
  font-size: 2em;
}

.multiselect__tags {
  border-radius: none !important;
  border: none !important;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
