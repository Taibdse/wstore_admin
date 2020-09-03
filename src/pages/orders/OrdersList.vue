<template>
    <md-table md-card>
      <md-table-row>
        <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>
      <md-table-row  v-for="(order) in orders" :key="order.id">
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
          <div>{{ convertNumToMoneyFormat(order.shippingMoney) }} d</div>
        </md-table-cell> -->
         <!-- <md-table-cell style="min-width: 120px;">
          {{ order.adminNote }}
        </md-table-cell> -->
        <md-table-cell>
          <strong class="text-success" style="white-space: nowrap; font-size: 1.2em">{{ convertNumToMoneyFormat(order.totalPrice) }} d</strong>
        </md-table-cell>
        <md-table-cell>
            <!-- <md-button class="md-just-icon md-simple md-primary" @click="edit(order)">
              <md-icon>edit</md-icon>
              <md-tooltip md-direction="top">Chi tiết</md-tooltip>
            </md-button> -->
            <md-menu 
              md-direction="bottom-end" 
              style="padding: 0;" 
              :mdCloseOnClick="true" 
              :mdCloseOnSelect="true">
            <md-button md-menu-trigger style="padding: 0; background: red">...</md-button>

            <md-menu-content>
              <md-menu-item @click="edit(order)">Edit</md-menu-item>
              <md-menu-item @click="onViewDetails(order)">View Details</md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-table-cell>
      </md-table-row>
    </md-table>
</template>

<script>

import { getVNTimeFormat } from '../../utils/time';
import { isEmpty } from '../../utils/validations';
import { convertNumToMoneyFormat } from '../../utils/strings';

export default {
    props: {
        orders: Array,
        onViewDetails: Function
    },
    data: () => ({
        tblHeaders: [
            '#', 'Customer', 'Phone', 'Email', 'Time', 'Status', 'Payment Status', 'Total Price'
        ],
    }),
    methods: {
        edit: function(order){
          window.open('/orders/' + order.id, '_blank');
            // this.$router.go('/orders/' + order.id);
        },
        getTitle: function(obj){
          if(isEmpty(obj)) return '';
          return obj.title;
        },
        getVNTimeFormat, convertNumToMoneyFormat
    }
}
</script>

<style>

</style>