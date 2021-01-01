<template>
    <div class="content">
        <h2 class="my-page-header">Update Shipping Details</h2>
         <md-card class="my-card">
            <md-card-header data-background-color="orange">
                <h4 class="title">Shipping's information</h4>
            </md-card-header>

            <md-card-content>
                <div v-if="isLoading" style="text-align: center">
                    <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                </div>
                <div v-if="!notfound && !isLoading && !isEmpty(shipping)">
                    <form class="md-layout" @submit.prevent="saveShippping">
                        <md-card class="">
                            <md-card-content>
                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item sm-size-100">
                                        <md-field >
                                            <label for="title">Title</label>
                                            <md-input name="title" id="title" v-model="shipping.title" />
                                        </md-field>
                                    </div>
                                    <div class="md-layout-item sm-size-100">
                                        <md-field>
                                            <label for="money">Money</label>
                                            <md-input name="money" id="money" :value="money" @input="changeMoney" />
                                        </md-field>
                                    </div>
                                </div>

                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item sm-size-100">
                                        <md-field>
                                            <label for="type">Type</label>
                                            <md-input name="type" id="type"  v-model="shipping.type" disabled/>
                                        </md-field>
                                    </div>
                                </div>
                              
                            </md-card-content>

                            <md-card-actions>
                                    <md-button type="submit" class="md-primary">Save</md-button>
                            </md-card-actions>
                        </md-card>
                    </form>
                </div>
                <div v-if="notfound && !isLoading">
                    <h3 style="text-align: center">Can not find this shipping</h3>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>

import ShippingService from '../../services/shipping.service';
import { isEmpty } from '@/utils/validations.js';
import { toMoneyFormat } from '../../utils/strings';
import { showSuccessMsg, showErrors } from '../../utils/alert';
import { getErrorsFromResponse } from '../../utils/errors';
import { SERVER_ERROR_MESSAGE, SAVE_SUCCESS } from '../../utils/constants';

export default {
    
    data: () => ({
        shipping: {},
        isLoading: false,
        notfound: false,
    }),

    computed: {
        money: function(){
            return toMoneyFormat(this.shipping.money);
        }
    },

    methods: {
        getShipping: async function(){
            this.isLoading = true
            const shippingType = this.$route.params.shippingType;
                try {
                const res = await ShippingService.getShippingByType(shippingType);
                this.shipping = res.data;
                if(isEmpty(this.shipping)) this.notfound = true;
                else this.shipping.money = Number(this.shipping.money);
            } catch (error) {
                this.notfound = true;
            }
            this.isLoading = false;
        },

        changeMoney: function(value){
            if(!isEmpty(value)) value = value.replace(/\D/g, '');
            this.shipping = { ...this.shipping, money: value };
        },
        
        showErrorsMessage: function(res){
            const errors = getErrorsFromResponse(res.data.errors);
            showErrors({
                title: 'Vui lòng kiểm tra lại thông tin',
                text: errors
            })
        },
        
        saveShippping: async function(){
            this.isLoading = true;

            try {
                const res = await ShippingService.updateShipping(this.shipping);
                if(res.data.success === '1') {
                    showSuccessMsg({ title: SAVE_SUCCESS, text: '' })
                } else {
                    this.showErrorsMessage(res);
                }
            } catch (error) {
                showErrors({ 
                    title: 'Lỗi hệ thống', 
                    text: SERVER_ERROR_MESSAGE
                });
            }

            this.isLoading = false;

        },
        isEmpty
    },
    async created(){
        this.getShipping();
    }
}
</script>

<style>

.md-list-item span.md-list-item-text{
    padding-top: 13px;
    padding-left: 10px;
}

.page-heading{
    text-align: center;
    margin-top: 0;
    font-size: 2em;
}
</style>