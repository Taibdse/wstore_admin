<template>
    <md-table md-card>
      <md-table-row>
        <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>
      <md-table-row  v-for="(order) in orders" :key="order.id">
        <md-table-cell>{{ order.index + 1 }}</md-table-cell>
        <md-table-cell>{{ order.customerFullName }}</md-table-cell>
        <md-table-cell>{{ order.customerPhone }}</md-table-cell>
        <md-table-cell>{{ order.customerEmail }}</md-table-cell>
        <md-table-cell>{{ getVNTimeFormat(order.createdAt) }}</md-table-cell>
        <md-table-cell>
          <div>{{ order.customerAddress }}</div>
          <div>{{ getTitle(order.customerDistrict) }}, {{ getTitle(order.customerProvince) }}</div>
        </md-table-cell>
        <md-table-cell>{{ order.status }}</md-table-cell>
        <md-table-cell>
          <div>{{ order.shippingType }}</div>
          <div>{{ convertNumToMoneyFormat(order.shippingMoney) }} d</div>
        </md-table-cell>
        <md-table-cell>{{ convertNumToMoneyFormat(order.totalPrice) }} d</md-table-cell>
        <md-table-cell>
            <md-button class="md-just-icon md-simple md-primary" @click="showDetails(order)">
              <md-icon>edit</md-icon>
              <md-tooltip md-direction="top">Chi tiết</md-tooltip>
            </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
</template>

<script>

import { getVNTimeFormat } from '@/utils/time.js';
import { isEmpty } from '../../utils/validations';
import { convertNumToMoneyFormat } from '../../utils/strings';

export default {
    props: {
        orders: Array,
    },
    data: () => ({
        tblHeaders: [
            '#', 'Customer', 'Phone', 'Email', 'Time', 'Address', 'Status', 'Shipping', 'Total Price'
        ],
    }),
    methods: {
        showDetails: function(order){
            this.$router.push('/orders/' + order.id);
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