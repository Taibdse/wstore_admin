<template>
  <div class="content">
      <h2 class="my-page-header">Payment Methods</h2>
        <div class="md-layout">
            
            <div class="md-layout-item" style="text-align: right">
                <md-button class="md-raised md-success" @click="handleOpenCreateDialog">Create payment method</md-button>
            </div>

             <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Payment Method List</h4>
                </md-card-header>
                <md-card-content>
                    <div v-show="isLoading" style="text-align: center">
                        <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                    </div>
                    <div v-show="paymentMethods.length !== 0">
                        <PaymentMethodList 
                            :onEdit="handleEdit" 
                            :paymentMethods="paymentMethods" />
                    </div>
                    <div v-show="!isLoading && paymentMethods.length === 0">
                        <h3 style="text-align: center">No payment method found!</h3>
                    </div>
                </md-card-content>
            </md-card>
        </div>

        <PaymentMethodDialog
            :showDialog="showDialog"
            :onSave="savePaymentMethod"
            :editMode="editMode"
            :isSaving="isSaving"
            :onChange="changePaymentMethod"
            :paymentMethod="paymentMethod"
            :onToggleDialog="toggleDialog"
            :notfound="notfound"
            :loading="loadingPaymentMethod"
        />
    </div>
</template>

<script>
import PaymentMethodList from './PaymentMethodList';
import PaymentMethodDialog from './PaymentMethodDialog';
import PaymentMethodService from '../../services/paymentMethod.service';
import { isEmpty } from '../../utils/validations';
import { showSuccessMsg, showErrors } from '../../utils/alert';
import { add_success, add_fail, update_success, update_fail } from '../../common/message-constants';


export default {
    components: {
        PaymentMethodList, PaymentMethodDialog
    },
    data: () => ({
        paymentMethods: [],
        paymentMethod: {},
        isLoading: false,
        showDialog: false,
        isSaving: false,
        notfound: false,
        loadingPaymentMethod: false,
        editMode: false
    }),

    methods: {
        getPaymentMethods: async function(){
            this.isLoading = true;
            try {
                const res = await PaymentMethodService.getAll();
                console.log(res);
                const { data } = res.data;
                this.paymentMethods = data;
            } catch (error) {
                this.paymentMethods = [];
            }
            this.isLoading = false;
        },

        savePaymentMethod: async function(paymentMethod){
            if(this.isSaving || this.loadingPaymentMethod || this.notfound) return;

            this.isSaving = true;
            if(this.editMode){
                await this.handleUpdate(paymentMethod)
            } else {
                await this.handleCreate(paymentMethod)
            }
            this.isSaving = false;
            
        },

        handleCreate: async function(paymentMethod){
            try {
                const res = await PaymentMethodService.create(paymentMethod)
                console.log(res);
                const { success, errors } = res.data;
                if(success) {
                    showSuccessMsg({ title: add_success, text: '' })
                    this.showDialog = false;
                    this.getPaymentMethods();
                } else {
                    showErrors({
                        title: add_success,
                        text: Object.values(errors)[0]
                    })
                }
            } catch (error) {
                console.log(error);
            }
        },

        handleUpdate: async function(paymentMethod){
            try {
                const res = await PaymentMethodService.update(paymentMethod)
                console.log(res);
                 const { data, success, errors } = res.data;
                 if(success) {
                    showSuccessMsg({ title: update_success, text: '' })
                    this.showDialog = false
                    this.getPaymentMethods();
                } else {
                    showErrors({
                        title: update_fail,
                        text: Object.values(errors)[0]
                    })
                }
            } catch (error) {
                console.log(error);
            }
        },

        handleEdit: async function(paymentMethod){
            this.loadingPaymentMethod = true;
            this.showDialog = true;
            this.editMode = true;
            try {
                const res = await PaymentMethodService.getById(paymentMethod.id);
                console.log(res);
                const { data } = res.data;
                this.paymentMethod = data;
                if(isEmpty(data)) {
                    this.notfound = true;
                } 
            } catch (error) {
                console.log(error);
            }
            this.loadingPaymentMethod = false;
        },

        changePaymentMethod: function(){

        },

        toggleDialog: function(value){
            this.showDialog = value;
        },

        handleOpenCreateDialog: function(){
            this.showDialog = true
            this.notfound = false;
            this.editMode = false;
            this.paymentMethod = {};
        },

        createPaymentMethod: function(){
            // this.$router.push('/paymentMethods/insert');
        }
    },

    async created (){
        this.getPaymentMethods();
    }
}
</script>

<style>

</style>