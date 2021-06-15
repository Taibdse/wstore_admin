<template>
  <div class="content">
    <div class="row">
      <md-nav>
        <div class="col s12">
          <md-crumb href="#!/breadcrumbs">First</md-crumb>
          <md-crumb href="#!/breadcrumbs">Second</md-crumb>
          <md-crumb href="#!/breadcrumbs">Third</md-crumb>
        </div>
      </md-nav>
    </div>
    <h2 class="my-page-header">Orders</h2>
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Filters</h4>
        <!-- <p class="category"></p> -->
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div
            class="md-layout-item md-xlarge-size-25 md-large-size-25 md-medium-size-25 md-small-size-100 md-xsmall-size-100"
          >
            <strong>customer's name/phone/email</strong>
            <md-field>
              <md-input v-model="filters.keyword" />
            </md-field>
          </div>
          <div
            class="md-layout-item md-xlarge-size-25 md-large-size-25 md-medium-size-25 md-small-size-50 md-xsmall-size-50"
          >
            <strong>from date</strong>
            <md-datepicker v-model="selectedDate.from" md-immediately />
          </div>
          <div
            class="md-layout-item md-xlarge-size-25 md-large-size-25 md-medium-size-25 md-small-size-50 md-xsmall-size-50"
          >
            <strong>to date</strong>
            <md-datepicker v-model="selectedDate.to" md-immediately />
          </div>
          <div
            class="md-layout-item md-xlarge-size-25 md-large-size-25 md-medium-size-25 md-small-size-50 md-xsmall-size-50"
          >
            <strong>Status</strong>
            <md-field>
              <!-- <label for="status" style="font-weight: bold; font-size: 2em">Trang thai</label> -->
              <md-select v-model="filters.status" name="status" id="status">
                <md-option value="all">all</md-option>
                <md-option
                  v-for="status in orderStatuses"
                  :key="status"
                  :value="status"
                  >{{ status }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div
            class="md-layout-item md-xlarge-size-25 md-large-size-25 md-medium-size-25 md-small-size-50 md-xsmall-size-50"
          >
            <strong>Order by Time</strong>
            <md-field>
              <!-- <label for="status" style="font-weight: bold; font-size: 2em">Trang thai</label> -->
              <md-select
                v-model="orderBys.createdAt"
                name="orderByTime"
                id="orderByTime"
              >
                <md-option
                  v-for="orderBy in orderByOptions"
                  :key="orderBy.value"
                  :value="orderBy.value"
                  >{{ orderBy.text }}</md-option
                >
              </md-select>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter"></div>

        <div class="md-layout md-gutter">
          <md-button
            class="md-raised md-primary"
            style="margin-left: auto"
            @click="handleSearch"
            >Search</md-button
          >
        </div>
      </md-card-content>
    </md-card>
    <div></div>

    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Orders List</h4>
      </md-card-header>
      <md-card-content>
        <div v-show="isLoading" style="text-align: center">
          <md-progress-spinner
            md-mode="indeterminate"
            style="margin: auto"
          ></md-progress-spinner>
        </div>
        <div v-show="!isLoading && orders.length !== 0">
          <Pagination
            :pagination="pagination"
            :handleChange="handlePageChange"
          />
          <OrdersList
            :orders="pagingOrders"
            :onViewDetails="handleViewOrderDetails"
          />
        </div>
        <div v-show="!isLoading && orders.length === 0">
          <h3 style="text-align: center">No orders found!</h3>
        </div>
      </md-card-content>
    </md-card>
    <OrderDetailsDialog
      :order="order"
      :onClose="handleCloseDialog"
      :showDialog="showDialog"
    />
  </div>
</template>

<script>
import OrderService from "../../services/order.service";
import OrdersList from "@/pages/orders/OrdersList";
import OrderDetailsDialog from "./OrderDetailsDialog";
import { formatVNDate, convertVNDateToSQLDateFormat } from "../../utils/time";
import { isEmpty } from "@/utils/validations.js";
import { Pagination } from "@/components";
import { mapGetters, mapActions } from "vuex";

const DEFAULT_PAGINATION = { pageCount: 0, currentPage: 1, size: 10 };
const ORDER_SEARCH_CONDITION_KEY = "orderSearchConditionKey";

export default {
  components: {
    OrdersList,
    OrderDetailsDialog,
    Pagination,
  },
  data: () => ({
    orders: [],
    selectedDate: {
      from: "01/01/2010",
      to: "31/01/2010",
    },
    filters: {
      status: "all",
      keyword: "",
    },
    orderBys: {
      createdAt: "DESC",
    },
    orderByOptions: [
      { text: "Tăng dần", value: "ASC" },
      { text: "Giảm dần", value: "DESC" },
    ],

    isLoading: false,
    orderStatuses: [],
    pagination: { pageCount: 0, currentPage: 1, size: 10 },
    order: {},
    showDialog: false,
  }),

  computed: {
    pagingOrders: function () {
      if (isEmpty(this.orders)) return [];
      const { currentPage, size } = this.pagination;
      return this.orders.map((order, index) => ({
        ...order,
        index: index + (currentPage - 1) * size,
      }));
    },
    ...mapGetters({
      orderSearchCondition: "searchCondition/orders",
    }),
  },

  methods: {
    ...mapActions({
      saveOrderSearchCondition: "searchCondition/saveOrderSearchCondition",
    }),
    handlePageChange: function (pageNum) {
      this.pagination = { ...this.pagination, currentPage: pageNum };
      this.getOrders();
    },

    handleCloseDialog: function () {
      this.showDialog = false;
    },

    handleViewOrderDetails: function (order) {
      this.order = order;
      this.showDialog = true;
    },

    handleSearch: function () {
      this.pagination = { ...this.pagination, currentPage: 1 };
      this.getOrders();
    },

    getOrders: async function () {
      this.isLoading = true;
      let { from, to } = this.selectedDate;
      from = convertVNDateToSQLDateFormat(from);
      to = convertVNDateToSQLDateFormat(to);
      try {
        const params = {
          from,
          to,
          ...this.filters,
          orderByTime: this.orderBys.createdAt,
          page: this.pagination.currentPage,
          size: this.pagination.size,
        };
        const res = await OrderService.getOrders(params);
        const { numOfPage, size, page, data } = res.data;
        this.orders = data;
        this.pagination = {
          ...this.pagination,
          currentPage: page,
          pageCount: numOfPage,
        };
      } catch (error) {
        this.orders = [];
        this.pagination = { ...DEFAULT_PAGINATION };
      }
      this.isLoading = false;
    },
    getDefaultSelectedDate: function () {
      let d = new Date();
      const to = formatVNDate(d);
      d = new Date(d.setDate(d.getDate() - 7));
      const from = formatVNDate(d);
      return { from, to };
    },
    saveSearchCondition: function () {
      const searchCondition = {
        selectedDate: this.selectedDate,
        filters: this.filters,
        orderBys: this.orderBys,
        pagination: this.pagination,
      };
      this.saveOrderSearchCondition(searchCondition);
    },
    loadSearchCondition: function () {
      const searchCondition = this.orderSearchCondition;
      if (!isEmpty(searchCondition)) {
        console.log(searchCondition.filters);
        this.selectedDate = isEmpty(searchCondition.selectedDate)
          ? this.getDefaultSelectedDate()
          : searchCondition.selectedDate;
        this.filters = searchCondition.filters;
        this.orderBys = searchCondition.orderBys;
        this.pagination = searchCondition.pagination;
      } else {
        this.selectedDate = this.getDefaultSelectedDate();
      }
    },
  },
  async created() {
    this.isLoading = true;
    this.loadSearchCondition();
    try {
      const res = await OrderService.getOrderStatus();
      this.orderStatuses = res.data;
      await this.getOrders();
    } catch (error) {}
    this.isLoading = false;
  },

  beforeDestroy() {
    this.saveSearchCondition();
  },
};
</script>

<style scoped>
.md-table-cell {
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: center;
}

.md-dialog {
  max-width: 768px;
  min-width: 500px;
}

.md-input {
  width: 20px;
}
</style>