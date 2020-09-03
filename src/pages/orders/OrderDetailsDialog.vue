<template>
    <md-dialog :md-active="showDialog" style="max-width: 600px; min-width: 500px">
        <md-dialog-title>Order Information</md-dialog-title>
        <md-dialog-content>
          <div style="padding: 10px" class="detail-list">
            <div>
              <strong>Customer:</strong> {{ order.customerFullName }}
            </div>
            <div>
              <strong>Phone:</strong> {{ order.customerPhone }}
            </div>
            <div>
              <strong>Email:</strong> {{ order.customerEmail }}
            </div>
            <div>
              <strong>Time:</strong> {{ getVNTimeFormat(order.createdAt) }}
            </div>
            <div>
              <strong>Address:</strong> {{ order.customerAddress }}, {{ getTitle(order.customerDistrict) }}, {{ getTitle(order.customerProvince) }}
            </div>
            <div>
              <strong>Status:</strong> {{ order.status }}
            </div>
            <div>
              <strong>Payment method:</strong> {{ order.paymentMethod.nameEn }}
            </div>
             <div>
              <strong>Payment status:</strong> {{ order.paymentStatus }}
            </div>
            <div>
              <strong>Shipping:</strong> <strong> {{ order.shippingType }}</strong>
              {{ convertNumToMoneyFormat(order.shippingMoney) }} d
            </div>
            <div>
              <strong>Customer's note:</strong> {{ order.note }}
            </div>
             <div>
              <strong>Admin's note:</strong> {{ order.adminNote }}
            </div>
             <div>
              <strong>Product price:</strong> {{ convertNumToMoneyFormat(order.productsPrice) }} d
            </div>
            <div>
              <strong>Total price:</strong> {{ convertNumToMoneyFormat(order.totalPrice) }} d
            </div>
        </div>
        </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-default" type="button" @click="onClose">Close</md-button>
      </md-dialog-actions>
    </md-dialog>

</template>

<script>
import { getVNTimeFormat } from '../../utils/time';
import { convertNumToMoneyFormat } from '../../utils/strings';
import { isEmpty } from '../../utils/validations';


  export default {
    name: 'OrderDetailsDialog',
    props: {
       order: Object,
       showDialog: Boolean,
       onClose: Function,
    },
    methods: {
       getTitle: function(obj){
          if(isEmpty(obj)) return '';
          return obj.title;
        },
      getVNTimeFormat, convertNumToMoneyFormat, isEmpty
    }
  }
</script>

<style scoped>
  .detail-list > div{
    margin-top: 10px;
  }
</style>