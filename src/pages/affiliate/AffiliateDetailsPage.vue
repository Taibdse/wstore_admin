<template>
  <div class="content">
    <h2 class="my-page-header">
      {{ insertAffiliate ? "Insert Affiliate" : "Update Affiliate" }}
    </h2>
    <md-card class="my-card">
      <md-card-header
        :data-background-color="insertAffiliate ? 'green' : 'orange'"
      >
        <h4 class="title">Affiliate's information</h4>
      </md-card-header>

      <md-card-content>
        <div v-if="!insertAffiliate && isLoading" style="text-align: center">
          <md-progress-spinner
            md-mode="indeterminate"
            style="margin: auto"
          ></md-progress-spinner>
        </div>
        <div v-if="insertAffiliate || (!notfound && !isLoading)">
          <form class="md-layout" @submit.prevent="saveAffiliate">
            <md-card class="">
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="name">Name</label>
                      <md-input
                        name="name"
                        id="name"
                        v-model="affiliate.affiliateName"
                      />
                      <md-button @click="setAffiliateSlug" class="sm-btn"
                        >Create slug</md-button
                      >
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="slug">Slug</label>
                      <md-input
                        name="slug"
                        id="slug"
                        v-model="affiliate.slug"
                      />
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-100">
                    <md-checkbox v-model="affiliate.active"
                      >Active Affiliate</md-checkbox
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
        <div v-if="!insertAffiliate && notfound && !isLoading">
          <h3 style="text-align: center">Can not find this affiliate</h3>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import AffiliateService from "../../services/affiliate.service";
import { isEmpty } from "@/utils/validations.js";
import { convertStringToSlug } from "../../utils/strings";
import { showSuccessMsg, showErrors } from "../../utils/alert";
import { getErrorsFromResponse } from "../../utils/errors";
import { SAVE_SUCCESS, SERVER_ERROR_MESSAGE } from "../../utils/constants";

export default {
  data: () => ({
    affiliate: {
      active: true,
    },
    isLoading: false,
    notfound: false,
    insertAffiliate: false,
    name: null,
  }),

  methods: {
    getAffiliateDetails: async function() {
      if (this.$route.path.indexOf("/affiliates/insert") > -1) {
        this.insertAffiliate = true;
      } else {
        this.isLoading = true;
        const affiliateId = this.$route.params.affiliateId;
        try {
          const res = await AffiliateService.getAffiliateById(affiliateId);
          this.affiliate = res.data;
          console.log(this.affiliate);
          if (isEmpty(this.affiliate)) this.notfound = true;
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

    setAffiliateSlug: function() {
      this.affiliate = {
        ...this.affiliate,
        slug: convertStringToSlug(this.affiliate.affiliateName),
      };
    },

    saveAffiliate: async function() {
      this.isLoading = true;

      if (this.insertAffiliate) {
        await this.handleInsertAffiliate(this.affiliate);
      } else {
        await this.handleUpdateAffiliate(this.affiliate);
      }
      this.isLoading = false;
    },

    handleInsertAffiliate: async function(data) {
      try {
        const res = await AffiliateService.insertAffiliate(data);
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

    handleUpdateAffiliate: async function(data) {
      try {
        const res = await AffiliateService.updateAffiliate(data);
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

    getAffiliates: async function() {
      const res = await AffiliateService.getAffiliates();
      this.affiliates = res.data;
    },
  },
  async created() {
    this.getAffiliateDetails();
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
