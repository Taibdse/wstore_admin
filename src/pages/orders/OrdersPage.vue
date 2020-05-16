<template>
    <div class="content">
      <h2 class="my-page-header">Orders</h2>
      <md-card>
         <md-card-header data-background-color="green">
          <h4 class="title">Filters</h4>
          <!-- <p class="category"></p> -->
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
             <div class="md-layout-item sm-size-100">
              <strong>customer's name/phone/email</strong>
              <md-field >
                  <md-input v-model="filters.keyword"/>
              </md-field>
            </div>
            <div class="md-layout-item sm-size-100">
              <strong>from date</strong>
              <md-datepicker v-model="selectedDate.from" md-immediately />
            </div>
            <div class="md-layout-item sm-size-100">
              <strong>to date</strong>
              <md-datepicker v-model="selectedDate.to" md-immediately />
            </div>
            <div class="md-layout-item sm-size-100">
                <strong>Status</strong>
                <md-field>
                    <!-- <label for="status" style="font-weight: bold; font-size: 2em">Trang thai</label> -->
                    <md-select v-model="filters.status" name="status" id="status" >
                        <md-option value="all" >all</md-option>
                        <md-option v-for="(status) in arrStatus" :key="status" :value="status">{{ status }}</md-option>
                    </md-select>
                </md-field>
            </div>
            
          </div>
          <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-25">
                <strong>Order by Time</strong>
                <md-field>
                    <!-- <label for="status" style="font-weight: bold; font-size: 2em">Trang thai</label> -->
                    <md-select v-model="orderBys.createdAt" name="orderByTime" id="orderByTime" >
                        <md-option v-for="(orderBy) in orderByOptions" :key="orderBy.value" :value="orderBy.value">{{ orderBy.text }}</md-option>
                    </md-select>
                </md-field>
              </div>
          </div>

          <div class="md-layout md-gutter">
            <md-button class="md-raised md-primary" style="margin-left: auto" @click="getOrders">Search</md-button>
          </div>
        </md-card-content>
      </md-card>
    <div>
        
      </div>
      
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Orders List</h4>
          <!-- <p class="category"></p> -->
        </md-card-header>
        <md-card-content>
          <div v-show="isLoading" style="text-align: center">
              <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
          </div>
          <div v-show="!isLoading && orders.length !== 0">
            <Pagination :pagination="pagination" :handleChange="handlePageChange"/>
            <OrdersList :orders="pagingOrders" />
          </div>
          <div v-show="!isLoading && orders.length === 0">
            <h3 style="text-align: center">No orders found!</h3>
          </div>
        </md-card-content>
      </md-card>
    </div>

    
</template>

<script>
import OrderService from '../../services/order.service';
import OrdersList from '@/pages/orders/OrdersList';
import { formatVNDate, is2MonthRange, convertVNDateToSQLDateFormat } from '../../utils/time';
import { isEmpty } from '@/utils/validations.js';
import Pagination from '@/components/common/Pagination';
import { showErrors } from '../../utils/alert';

export default {
  components: {
    OrdersList, Pagination
  },
  data: () => ({
      orders: [],
      selectedDate: {
        from: '01/01/2010',
        to: '31/01/2010'
      },
      filters: { 
        status: 'all', 
        keyword: ''
      },
      orderBys: {
        createdAt: 'DESC' 
      },
      orderByOptions: [
        // { text: 'Khong sap', value: '0' },
        { text: 'Tăng dần', value: 'ASC' },
        { text: 'Giảm dần', value: 'DESC' }
      ],
      
      isLoading: false,
      arrStatus: [],
      pagination: { pageCount: 0, currentPage: 1, size: 10 }
  }),

  computed: {
    pagingOrders: function(){
      if(isEmpty(this.orders)) return [];
      const { currentPage, size } = this.pagination;
      return this.orders.filter((order, index) => {
        return index >= size * (currentPage - 1) && index < currentPage * size;
      }).map((item, index) => ({ ...item, index: index + (currentPage - 1) * size }))
    }
  },

  methods: {
    handlePageChange: function(pageNum){
      this.pagination = { ...this.pagination, currentPage: pageNum };
    },

    getOrders: async function(){
      let { from, to } = this.selectedDate;
      from = convertVNDateToSQLDateFormat(from);
      to = convertVNDateToSQLDateFormat(to);
      
      if(!is2MonthRange(from, to)) return showErrors({ 
        title: 'Khoảng thời gian tìm kiếm không được quá 2 tháng!', 
        text: '' 
      })

      this.isLoading = true;

      try {
        const params = { 
          from, to, 
          ...this.filters, 
          orderByTime: this.orderBys.createdAt 
        };
        const res = await OrderService.getOrders(params);
        this.orders = res.data;
        const pageCount = Math.ceil(res.data.length / this.pagination.size);
        this.pagination = { ...this.pagination, currentPage: 1, pageCount };
      } catch (error) {
        this.orders = [];
        this.pagination = { pageCount: 0, currentPage: 1, size: 10 }
      }

      this.isLoading = false;
    },

    getSelectedDateDefault: function(){
      let d = new Date();
      const to = formatVNDate(d);
      d = new Date(d.setDate(d.getDate() - 7)); 
      const from = formatVNDate(d);
      this.selectedDate = { from, to };
    },
  },
  async created (){
    this.isLoading = true;
    this.$material.locale.dateFormat = 'dd/MM/yyyy';
    this.getSelectedDateDefault();
    
    
    try {
      const res = await OrderService.getOrderStatus();
      this.arrStatus = res.data;
      await this.getOrders();
    } catch (error) {

    }
    this.isLoading = false;
  }
}
</script>

<style scoped>
.md-table-cell{
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: center;
}

.md-dialog {
    max-width: 768px;
    min-width: 500px;
}

.md-input{
  width: 20px;
}
</style>