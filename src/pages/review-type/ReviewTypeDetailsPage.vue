<template>
  <div class="content">
    <h2 class="my-page-header">
      {{ insertReviewType ? "Insert Review Type" : "Update Review Type" }}
    </h2>
    <md-card class="my-card">
      <md-card-header
        :data-background-color="insertReviewType ? 'green' : 'orange'"
      >
        <h4 class="title">Review Type's information</h4>
      </md-card-header>

      <md-card-content>
        <div v-if="!insertReviewType && isLoading" style="text-align: center">
          <md-progress-spinner
            md-mode="indeterminate"
            style="margin: auto"
          ></md-progress-spinner>
        </div>
        <div v-if="insertReviewType || (!notfound && !isLoading)">
          <form class="md-layout" @submit.prevent="saveReviewType">
            <md-card class="">
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="name">Name</label>
                      <md-input
                        name="name"
                        id="name"
                        v-model="reviewType.reviewTypeName"
                      />
                    </md-field>
                  </div>

                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="name">Name (En)</label>
                      <md-input
                        name="name"
                        id="name"
                        v-model="reviewType.reviewTypeNameEn"
                      />
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="sortIndex">Sort Index</label>
                      <md-input
                        name="sortIndex"
                        id="sortIndex"
                        v-model="reviewType.sortIndex"
                        type="number"
                      />
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-100">
                    <md-checkbox v-model="reviewType.active"
                      >Active Review Type</md-checkbox
                    >
                  </div>
                </div>

                <div class="md-layout md-gutter" style="margin-top: 20px">
                  <div class="md-layout-item md-size-100">
                    <PageMetadata
                      ref="pageMetadata"
                      :pageMetadataContent="reviewType.pageMetadata"
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
        <div v-if="!insertReviewType && notfound && !isLoading">
          <h3 style="text-align: center">Can not find this Review Type</h3>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import ReviewTypeService from "../../services/reviewType.service";
import { isEmpty } from "@/utils/validations.js";
import { showSuccessMsg, showErrors } from "../../utils/alert";
import { getErrorsFromResponse } from "../../utils/errors";
import { SAVE_SUCCESS, SERVER_ERROR_MESSAGE } from "../../utils/constants";
import { PageMetadata } from "@/components";

export default {
  components: {
    PageMetadata,
  },
  data: () => ({
    reviewType: {
      active: true,
    },
    isLoading: false,
    notfound: false,
    insertReviewType: false,
  }),
  methods: {
    getReviewTypeDetails: async function() {
      if (this.$route.path.indexOf("/reviewTypes/insert") > -1) {
        this.insertReviewType = true;
      } else {
        this.isLoading = true;
        const reviewTypeId = this.$route.params.reviewTypeId;
        try {
          const res = await ReviewTypeService.getReviewTypeById(reviewTypeId);
          this.reviewType = res.data;
          console.log(this.reviewType);
          if (isEmpty(this.reviewType)) this.notfound = true;
        } catch (error) {
          this.notfound = true;
        }
        this.isLoading = false;
      }
    },

    showErrorsMessage: function(res) {
      const errors = getErrorsFromResponse(res.data.errors);
      showErrors({
        title: "Please check input data again!",
        text: errors,
      });
    },

    saveReviewType: async function() {
      this.isLoading = true;
      this.reviewType.pageMetadata = this.$refs[
        "pageMetadata"
      ].$data.pageMetadata;

      if (this.insertReviewType) {
        await this.handleInsertReviewType(this.reviewType);
      } else {
        await this.handleUpdateReviewType(this.reviewType);
      }
      this.isLoading = false;
    },

    handleInsertReviewType: async function(data) {
      try {
        const res = await ReviewTypeService.insertReviewType(data);
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

    handleUpdateReviewType: async function(data) {
      try {
        const res = await ReviewTypeService.updateReviewType(data);
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
  },

  async created() {
    this.getReviewTypeDetails();
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
