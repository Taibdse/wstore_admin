<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head class="mw-150"></md-table-head>
    </md-table-row>
    <md-table-row v-for="order in orders" :key="order.id">
      <md-table-cell>{{ order.index + 1 }}</md-table-cell>
      <md-table-cell>
        <strong>{{ order.customerFullName }}</strong>
      </md-table-cell>
      <md-table-cell>
        <strong>{{ order.customerPhone }}</strong>
      </md-table-cell>
      <md-table-cell>{{ order.customerEmail }}</md-table-cell>
      <md-table-cell>{{ getVNTimeFormat(order.createdAt) }}</md-table-cell>
      <!-- <md-table-cell style="min-width: 150px; padding-left: 5px; padding-right: 5px">
          <div>{{ order.customerAddress }}</div>
          <div>{{ getTitle(order.customerDistrict) }}, {{ getTitle(order.customerProvince) }}</div>
        </md-table-cell> -->
      <md-table-cell>
        <strong class="text-primary">{{ order.status }}</strong>
      </md-table-cell>
      <md-table-cell>
        <strong>{{ order.paymentStatus }}</strong>
        <!-- <strong class="text-primary">{{ order.status }}</strong> -->
      </md-table-cell>
      <!-- <md-table-cell>
          <strong>{{ order.shippingType }}</strong>
          <div>{{ toMoneyFormat(order.shippingMoney) }} d</div>
        </md-table-cell> -->
      <!-- <md-table-cell style="min-width: 120px;">
          {{ order.adminNote }}
        </md-table-cell> -->
      <md-table-cell>
        <strong
          class="text-success"
          style="white-space: nowrap; font-size: 1.2em"
          >{{ toMoneyFormat(order.totalPrice) }} d</strong
        >
      </md-table-cell>
      <md-table-cell>
        <!-- <md-button
          @click="handlePreview(order)"
          class="md-icon-button md-raised md-danger order-action-btn"
        >
          <md-icon>language</md-icon>
          <md-tooltip md-direction="top">Navigate to order page</md-tooltip>
        </md-button> -->
        <ActionButton
          icon="language"
          tooltip="Preview"
          classNames="md-danger"
          @click="handlePreview(order)"
        />
        <ActionButton
          icon="edit"
          tooltip="Edit"
          classNames="md-primary"
          @click="edit(order)"
        />
        <ActionButton
          icon="info"
          tooltip="View Details"
          classNames="md-warning"
          @click="onViewDetails(order)"
        />
        <!-- <md-button
          @click="edit(order)"
          class="md-icon-button md-raised md-primary order-action-btn"
        >
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="top">Edit</md-tooltip>
        </md-button> -->
        <!-- <md-button
          @click="onViewDetails(order)"
          class="md-icon-button md-raised md-warning order-action-btn"
        >
          <md-icon>info</md-icon>
          <md-tooltip md-direction="top">View Details</md-tooltip>
        </md-button> -->
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { ActionButton } from '@/components';

import { getVNTimeFormat } from "../../utils/time";
import { isEmpty } from "../../utils/validations";
import { toMoneyFormat } from "../../utils/strings";
import { openNewTab } from "../../utils/utils";
import { APP_ROOT_DOMAIN } from '../../configs/api';

export default {
  components: {
    ActionButton
  },
  props: {
    orders: Array,
    onViewDetails: Function,
  },
  data: () => ({
    tblHeaders: [
      "#",
      "Customer",
      "Phone",
      "Email",
      "Time",
      "Status",
      "Payment Status",
      "Total Price",
    ],
  }),
  methods: {
    edit: function (order) {
      this.$router.push("/orders/" + order.id);
    },
    getTitle: function (obj) {
      if (isEmpty(obj)) return "";
      return obj.title;
    },
    handlePreview: function(order) {
      openNewTab(APP_ROOT_DOMAIN + '/orders/' + order.id);
    },
    getVNTimeFormat,
    toMoneyFormat,
  },
};
</script>

<style>

</style>