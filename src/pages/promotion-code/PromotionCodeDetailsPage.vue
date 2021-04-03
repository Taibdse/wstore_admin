<template>
  <div class="content">
    <h2 class="my-page-header">
      {{
        insertPromotionCode ? "Insert Promotion Code" : "Update Promotion Code"
      }}
    </h2>
    <md-card class="my-card">
      <md-card-header
        :data-background-color="insertPromotionCode ? 'green' : 'orange'"
      >
        <h4 class="title">Promotion Code's information</h4>
      </md-card-header>

      <md-card-content>
        <div
          v-if="!insertPromotionCode && isLoading"
          style="text-align: center"
        >
          <md-progress-spinner
            md-mode="indeterminate"
            style="margin: auto"
          ></md-progress-spinner>
        </div>
        <div v-if="insertPromotionCode || (!notfound && !isLoading)">
          <form class="md-layout" @submit.prevent="handleSave">
            <md-card class="">
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="name">Name</label>
                      <md-input
                        name="name"
                        id="name"
                        v-model="promotionCode.displayName"
                      />
                    </md-field>
                  </div>
                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="code">Code</label>
                      <md-input
                        :disabled="!insertPromotionCode"
                        name="code"
                        id="code"
                        v-model="promotionCode.code"
                      />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="type">Type</label>
                      <md-select
                        id="type"
                        name="type"
                        v-model="promotionCode.type"
                      >
                        <md-option
                          v-for="type in promotionCodeTypes"
                          :key="type"
                          :value="type"
                          >{{ type }}</md-option
                        >
                      </md-select>
                    </md-field>
                  </div>
                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="amount">Amount</label>
                      <md-input
                        name="amount"
                        id="amount"
                        type="number"
                        v-model="promotionCode.amount"
                      />
                    </md-field>
                  </div>
                  <div class="md-layout-item sm-size-100">
                    <md-field>
                      <label for="quantity">Quantity</label>
                      <md-input
                        name="quantity"
                        id="quantity"
                        type="number"
                        v-model="promotionCode.quantity"
                      />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item sm-size-100">
                    <strong>from date</strong>
                    <!-- <md-datepicker
                      v-model="promotionCode.fromDate"
                      md-immediately
                    /> -->
                    <Datetime v-model="promotionCode.fromDate" />
                  </div>
                  <div class="md-layout-item sm-size-100">
                    <strong>to date</strong>
                    <Datetime v-model="promotionCode.toDate" />
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-100">
                    <md-checkbox v-model="promotionCode.active"
                      >Active</md-checkbox
                    >
                  </div>
                </div>
              </md-card-content>
              <md-card-actions>
                <md-button type="submit" class="md-primary">Save</md-button>
                <md-button type="button" class="" @click="handleBack"
                  >Back</md-button
                >
              </md-card-actions>
            </md-card>
          </form>
        </div>
        <div v-if="!insertPromotionCode && notfound && !isLoading">
          <h3 style="text-align: center">Can not find this promotionCode</h3>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import PromotionCodeService from "../../services/promotionCode.service";
import Datetime from '../../components/common/Datetime';
import { isEmpty } from "@/utils/validations.js";
import { toMoneyFormat } from "../../utils/strings";
import { getVNTimeFormat } from "../../utils/time";
import { showSuccessMsg, showErrors } from "../../utils/alert";
import { getErrorsFromResponse } from "../../utils/errors";
import {
  SERVER_ERROR_MESSAGE,
  SAVE_SUCCESS,
  SAVE_FAILED,
} from "../../utils/constants";
import { PathRouteConstants } from "../../routes/pathRoutes";
import { PROMOTION_CODE_TYPES } from "../../common/constants";

export default {
  components: {
    Datetime
  },
  data: () => ({
    promotionCode: {
      active: true,
    },
    isLoading: false,
    notfound: false,
    insertPromotionCode: false,
    promotionCodeTypes: Object.values(PROMOTION_CODE_TYPES),
  }),
  methods: {
    handleBack: function () {
      this.$router.push(PathRouteConstants.promotionCodesRoute);
    },

    getPromotionCodeDetails: async function () {
      if (!this.insertPromotionCode) {
        this.isLoading = true;
        const promotionCodeId = this.$route.params.id;
        try {
          const res = await PromotionCodeService.getById(promotionCodeId);
          console.log(res);

          if (isEmpty(this.promotionCode)) {
            this.notfound = true;
          } else {
            this.promotionCode = {
              ...res.data,
              // fromDate: new Date(res.data.fromDate),
              // toDate: new Date(res.data.toDate),
              // fromDate: formatVNDatetime(res.data.fromDate)
            };
          }
        } catch (error) {
          this.notfound = true;
        }
        this.isLoading = false;
      }
    },

    handleSave: async function () {
      // console.log(typeof this.promotionCode.fromDate);
      // return;
      this.isLoading = true;
      try {
        let res;
        if (this.insertPromotionCode) {
          res = await PromotionCodeService.create(this.promotionCode);
        } else {
          res = await PromotionCodeService.update(this.promotionCode);
        }
        console.log(res);
        const { errors, success } = res.data;
        if (success) {
          showSuccessMsg({ title: SAVE_SUCCESS, text: "" });
        } else {
          showErrors({
            title: "Please check input data!",
            text: getErrorsFromResponse(errors),
          });
        }
      } catch (error) {
        console.log(error);
        showErrors({
          title: SAVE_FAILED,
          text: SERVER_ERROR_MESSAGE,
        });
      }
      this.isLoading = false;
    },
    toMoneyFormat,
    getVNTimeFormat,
  },

  async created() {
    if (
      this.$route.path.indexOf(PathRouteConstants.promotionCodeInsertRoute) > -1
    ) {
      this.insertPromotionCode = true;
    }
    this.getPromotionCodeDetails();
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