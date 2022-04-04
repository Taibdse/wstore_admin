<template>
  <div class="content">
    <h2 class="my-page-header">Affiliates</h2>
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
                @click="gotoInsertAffiliatePage"
                >Add more affiliate</md-button
              >
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field>
                <label for="movie">Active</label>
                <md-select
                  v-model="filters.active"
                  name="affiliate"
                  id="affiliate"
                >
                  <md-option value="all">All</md-option>
                  <md-option value="active">Active</md-option>
                  <md-option value="inactive">In active</md-option>
                </md-select>
              </md-field>
              <md-button class="md-raised md-primary" @click="getAffiliates"
                >Search</md-button
              >
            </div>
          </div>
        </md-card-content>
      </md-card>

      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Affiliates List</h4>
        </md-card-header>
        <md-card-content>
          <div v-show="isLoading" style="text-align: center">
            <md-progress-spinner
              md-mode="indeterminate"
              style="margin: auto"
            ></md-progress-spinner>
          </div>
          <div v-show="!isLoading && affiliates.length !== 0">
            <AffiliateList :affiliates="affiliates" ref="affiliateListRef" />
          </div>
          <div v-show="!isLoading && affiliates.length === 0">
            <h3 style="text-align: center">Can not find any affiliates</h3>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import AffiliateService from "../../services/affiliate.service";
import AffiliateList from "./AffiliateList.vue";
import { showErrors, showSuccessMsg } from "../../utils/alert";
import { SERVER_ERROR_MESSAGE, SAVE_SUCCESS } from "../../utils/constants";
export default {
  components: {
    AffiliateList,
  },

  async created() {
    this.getAffiliates();
  },

  data: () => ({
    affiliates: [],
    isLoading: false,
    filters: { active: "all" },
  }),

  methods: {
    getAffiliates: async function() {
      this.isLoading = true;
      try {
        let isActive = "";
        if (this.filters.active == "active") isActive = true;
        else if (this.filters.active == "inactive") isActive = false;

        const res = await AffiliateService.getAffiliates(isActive);
        this.affiliates = res.data;
      } catch (error) {
        this.affiliates = [];
      }
      this.isLoading = false;
    },

    gotoInsertAffiliatePage: function() {
      this.$router.push("/affiliates/insert");
    },
  },
};
</script>

<style></style>
