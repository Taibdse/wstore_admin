<template>
  <div class="content">
    <h2 class="my-page-header">
      {{ insertCategory ? "Insert Category" : "Update Category" }}
    </h2>
    <md-card class="my-card">
      <md-card-header
        :data-background-color="insertCategory ? 'green' : 'orange'"
      >
        <h4 class="title">Category's information</h4>
      </md-card-header>

      <md-card-content>
        <div v-if="!insertCategory && isLoading" style="text-align: center">
          <md-progress-spinner
            md-mode="indeterminate"
            style="margin: auto"
          ></md-progress-spinner>
        </div>
        <div v-if="insertCategory || (!notfound && !isLoading)">
          <form class="md-layout" @submit.prevent="saveCategory">
            <md-card class="">
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="name">Name</label>
                      <md-input name="name" id="name" v-model="category.name" />
                      <md-button @click="setCategorySlug" class="sm-btn"
                        >Create slug</md-button
                      >
                    </md-field>
                  </div>

                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="slug">Slug</label>
                      <md-input name="slug" id="slug" v-model="category.slug" />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>Description</label>
                      <md-textarea v-model="category.description"></md-textarea>
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-100">
                    <md-checkbox v-model="category.active"
                      >Active category</md-checkbox
                    >
                  </div>
                </div>
              </md-card-content>

              <md-card-actions>
                <md-button type="submit" class="md-primary">Save</md-button>
              </md-card-actions>
            </md-card>
          </form>
        </div>
        <div v-if="!insertCategory && notfound && !isLoading">
          <h3 style="text-align: center">Can not find this category</h3>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import CategoryService from "../../services/category.service";
import { isEmpty } from "@/utils/validations.js";
import { convertStringToSlug } from "../../utils/strings";
import { showSuccessMsg, showErrors } from "../../utils/alert";
import { getErrorsFromResponse } from "../../utils/errors";
import { SAVE_SUCCESS, SERVER_ERROR_MESSAGE } from "../../utils/constants";

export default {
  components: {},
  data: () => ({
    category: {
      active: true,
    },
    isLoading: false,
    notfound: false,
    insertCategory: false,
  }),
  methods: {
    getCategoryDetails: async function () {
      if (this.$route.path.indexOf("/categories/insert") > -1) {
        this.insertCategory = true;
      } else {
        this.isLoading = true;
        const categoryId = this.$route.params.categoryId;
        try {
          const res = await CategoryService.getCategoryById(categoryId);
          this.category = res.data;
          if (isEmpty(this.category)) this.notfound = true;
        } catch (error) {
          this.notfound = true;
        }
        this.isLoading = false;
      }
    },

    showErrorsMessage: function (res) {
      const errors = getErrorsFromResponse(res.data.errors);
      showErrors({
        title: "Please check input data again!",
        text: errors,
      });
    },

    saveCategory: async function () {
      this.isLoading = true;
      if (this.insertCategory) {
        await this.handleInsertCategory(this.category);
      } else {
        await this.handleUpdateCategory(this.category);
      }
      this.isLoading = false;
    },

    handleInsertCategory: async function (data) {
      try {
        const res = await CategoryService.insertCategory(data);
        if (res.data.success === "1") {
          showSuccessMsg({ title: SAVE_SUCCESS, text: "" });
        } else {
          this.showErrorsMessage(res);
        }
      } catch (error) {
        showErrors({
          title: "System errors",
          text: SERVER_ERROR_MESSAGE,
        });
      }
    },

    handleUpdateCategory: async function (data) {
      try {
        const res = await CategoryService.updateCategory(data);
        if (res.data.success === "1") {
          showSuccessMsg({
            title: SAVE_SUCCESS,
            text: "",
          });
        } else {
          this.showErrorsMessage(res);
        }
      } catch (error) {
        showErrors({
          title: "System errors",
          text: SERVER_ERROR_MESSAGE,
        });
      }
    },

    getCategories: async function () {
      const res = await CategoryService.getCategories();
      this.categories = res.data;
    },

    setCategorySlug: function () {
      this.category = {
        ...this.category,
        slug: convertStringToSlug(this.category.name),
      };
    },
  },
  async created() {
    this.getCategoryDetails();
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
</style>