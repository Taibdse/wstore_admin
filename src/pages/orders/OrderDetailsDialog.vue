<template>
    <md-dialog :md-active="showDialog" style="max-width: 100vw; min-width: 450px">
        <md-dialog-title>Order Information</md-dialog-title>
        <md-dialog-content>
          <div style="padding: 10px" class="detail-list">
            <div>
              <strong>Customer:</strong> {{ order.customerFullName }}
            </div>
            <div>
              <strong>Date of birth:</strong> {{ formatVNDate(order.customerDob) }}
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
              <strong>Payment method:</strong> {{ !isEmpty(order.paymentMethod) ? order.paymentMethod.nameEn : '' }}
            </div>
             <div>
              <strong>Payment status:</strong> {{ order.paymentStatus }}
            </div>
            <div>
              <strong>Shipping:</strong> <strong> {{ order.shippingType }} / </strong>
              {{ order.freeship ? 'freeship' : toMoneyFormat(order.shippingMoney) + 'đ' }} 
            </div>
            <div>
              <strong>Customer's note:</strong> {{ order.note }}
            </div>
             <div>
              <strong>Admin's note:</strong> {{ order.adminNote }}
            </div>
             <div>
              <strong>Product price:</strong> {{ toMoneyFormat(order.productsPrice) }} d
            </div>
            <div>
              <strong>Total price:</strong> {{ toMoneyFormat(order.totalPrice) }} d
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
import { toMoneyFormat } from '../../utils/strings';
import { isEmpty } from '../../utils/validations';
import { formatVNDate } from '../../utils/time'


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
      getVNTimeFormat, toMoneyFormat, isEmpty, formatVNDate
    }
  }
</script>

<style scoped>
  .detail-list > div{
    margin-top: 10px;
  }
</style>