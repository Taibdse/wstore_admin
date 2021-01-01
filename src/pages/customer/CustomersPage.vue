<template>
    <div class="content">
      <h2 class="my-page-header">Customers</h2>
      <md-card>
         <md-card-header data-background-color="green">
          <h4 class="title">Filters</h4>
          <!-- <p class="category"></p> -->
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
             <div class="md-layout-item sm-size-100">
                <strong>Phone</strong>
                <md-field >
                    <md-input v-model="filters.phone"/>
                </md-field>
            </div>

            <div class="md-layout-item sm-size-100">
                <strong>Email</strong>
                <md-field >
                    <md-input v-model="filters.email"/>
                </md-field>
            </div>
          </div>
        

          <div class="md-layout md-gutter">
            <md-button class="md-raised md-primary" style="margin-left: auto" @click="handleSearchCustomers">Search</md-button>
            <md-button class="md-raised md-warning" :disabled="isLoadingExcel" @click="exportExcel">
                {{ isLoadingExcel ? 'Downloading Excel...' : 'Export Excel' }}
            </md-button>
          </div>
        </md-card-content>
      </md-card>
    <div>
        
      </div>
      
      <md-card>
        <md-card-header data-background-color="green">
          <h4 class="title">Customers List</h4>
          <!-- <p class="category"></p> -->
        </md-card-header>
        <md-card-content>
          <div v-show="isLoading" style="text-align: center">
              <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
          </div>
          <div v-show="!isLoading && customers.length !== 0">
            <Pagination :pagination="pagination" :handleChange="handlePageChange"/>
            <CustomerList :customers="customers" />
          </div>
          <div v-show="!isLoading && customers.length === 0">
            <h3 style="text-align: center">No customers found!</h3>
          </div>
        </md-card-content>
      </md-card>
    </div>

    
</template>

<script>
import CustomerService from '../../services/customer.service';
import CustomerList from '@/pages/customer/CustomerList';
import { isEmpty } from '@/utils/validations.js';
import Pagination from '@/components/common/Pagination';
import { showErrors } from '../../utils/alert';

export default {
  components: {
    Pagination, CustomerList
  },
  data: () => ({
      customers: [],
      filters: { 
        email: '', 
        phone: ''
      },
      isLoading: false,
      isLoadingExcel: false,
      pagination: { pageCount: 0, currentPage: 1, size: 10 }
  }),

  computed: {
    
  },

  methods: {
    handlePageChange: function(pageNum){
      this.pagination = { ...this.pagination, currentPage: pageNum };
      this.getCustomers(this.pagination, this.filters);
    },

    getCustomers: async function(pagination, filters){
      this.isLoading = true;
      try {
        const res = await CustomerService.getCustomerInfoList({ 
            ...filters, 
            size: pagination.size, 
            page: pagination.currentPage 
        });
        const { data, page, size, numOfPage } = res.data;
        this.customers = data.map((cus, index) => ({ ...cus, index: size * (page - 1) + index + 1 }));
        this.pagination = { ...this.pagination, currentPage: page, pageCount: numOfPage };
      } catch (error) {
        this.customers = [];
        this.pagination = { pageCount: 0, currentPage: 1, size: 10 }
      }
      this.isLoading = false;
    },

    exportExcel: async function(){
        this.isLoadingExcel = true;
        try {
            const res = await CustomerService.exportCustomerInfoListToExcel({ ...this.filters });
            this.save('wstore_customers', res.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        } catch (error) {
        }
        this.isLoadingExcel = false;
    },

    save: function(name, data, type, isBinary) {
        if (isBinary) {
            var bytes = new Array(data.length);
            for (var i = 0; i < data.length; i++) {
                bytes[i] = data.charCodeAt(i);
            }
            data = new Uint8Array(bytes);
        }

        var blob = new Blob([data], {type: type});
        let objectURL = window.URL.createObjectURL(blob);
        let anchor = document.createElement('a');

        anchor.href = objectURL;
        anchor.download = name;
        anchor.click();

        URL.revokeObjectURL(objectURL);
    },

    handleSearchCustomers: function(){
        this.pagination = { ...this.pagination, currentPage: 1 }
        this.getCustomers(this.pagination, this.filters);
    }
    
  },
  async created (){
    this.getCustomers(this.pagination, this.filters);
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