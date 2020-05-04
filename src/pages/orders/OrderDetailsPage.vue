<template>
    <div class="content">
        <!-- <h4 class="title">Thông tin đơn hàng</h4> -->
         <md-card>
            <md-card-header data-background-color="orange">
            <h4 class="title">Order Information</h4>
            <p v-show="!isLoading && !notfound && !isEmpty(order)" style="text-align:center">ID: {{ order.id }}</p>
            </md-card-header>
                <md-card-content>
                    <div v-show="isLoading" style="text-align: center">
                        <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                    </div>
                    <div v-show="!isLoading && !notfound && !isEmpty(order)">
                        <form @submit.prevent="saveOrder">
                             <div class="md-layout md-gutter">
                                <div class="md-layout-item sm-size-100">
                                    <md-field >
                                        <label for="customerFullName">Customer's name</label>
                                        <md-input name="customerFullName" id="customerFullName" v-model="order.customerFullName"  />
                                    </md-field>
                                </div>

                                <div class="md-layout-item sm-size-100">
                                    <md-field>
                                        <label for="status">Status</label>
                                        <md-select v-model="order.status" name="status" id="status" >
                                            <md-option v-for="(status) in arrStatus" :key="status" :value="status">{{ status }}</md-option>
                                        </md-select>
                                    </md-field>
                                </div>
                            </div>

                            <div class="md-layout md-gutter">
                                <div class="md-layout-item sm-size-100">
                                    <md-field>
                                        <label for="customerPhone">Phone</label>
                                        <md-input name="customerPhone" id="customerPhone" v-model="order.customerPhone" />
                                    </md-field>
                                </div>
                                <div class="md-layout-item sm-size-100">
                                    <md-field>
                                        <label for="customerEmail">Email</label>
                                        <md-input name="customerEmail" id="customerEmail" v-model="order.customerEmail" />
                                    </md-field>
                                </div>
                            </div>

                             <div class="md-layout md-gutter">
                                 <div class="md-layout-item custom-layout-item">
                                    <md-field>
                                        <label for="customerProvince">Province</label>
                                        <md-select @input="changeProvince" v-model="order.provinceId" 
                                            name="customerProvince" id="customerProvince" >
                                            <md-option 
                                                v-for="(province) in provinces" 
                                                :key="province.id" 
                                                :value="province.id">
                                                {{ province.title }}
                                            </md-option>
                                        </md-select>
                                    </md-field>
                                </div>
                                 <div class="md-layout-item custom-layout-item">
                                    <md-field>
                                        <label for="customerDistrict">District</label>
                                        <md-select @input="changeDistrict" v-model="order.districtId" 
                                            name="customerDistrict" id="customerDistrict" >
                                            <md-option 
                                                v-for="(district) in districts" 
                                                :key="district.id" 
                                                :value="district.id">
                                                {{ district.title }}
                                            </md-option>
                                        </md-select>
                                    </md-field>
                                </div>
                                <div class="md-layout-item sm-size-100">
                                    <md-field >
                                        <label for="customerAddress">Address</label>
                                        <md-input name="customerAddress" id="customerAddress" 
                                            v-model="order.customerAddress"  />
                                    </md-field>
                                </div>
                                
                            </div>
                            <div class="md-layout md-gutter">
                                <md-button 
                                    type="submit" 
                                    class="md-raised md-primary" 
                                    style="margin-left: auto">
                                    Save
                                </md-button>
                            </div>
                        </form>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item">
                                <OrderProducts :orderItems="order.orderDetails" />
                                <strong style="float: right">Total products price: {{ convertNumToMoneyFormat(order.productsPrice) }} đ</strong>
                            </div>
                        </div>
                      
                        <div class="md-layout md-gutter" style="margin-top: 20px">
                            <div class="md-layout-item md-size-50">
                                 <md-table>
                                    <md-table-row >
                                        <md-table-head>Shipping: </md-table-head>
                                        <md-table-cell>
                                            {{ order.shippingType }}, {{ convertNumToMoneyFormat(order.shippingMoney) }}đ
                                        </md-table-cell>
                                    </md-table-row>
                                    <md-table-row>
                                        <md-table-head>Order Time: </md-table-head>
                                        <md-table-cell>
                                            {{ getVNTimeFormat(order.createdAt) }}
                                        </md-table-cell>
                                    </md-table-row>
                                    <md-table-row>
                                        <md-table-head>Customer's note: </md-table-head>
                                        <md-table-cell>
                                            {{ order.note }}
                                        </md-table-cell>
                                    </md-table-row>
                                </md-table>
                            </div>
                        </div>
                    </div>
                    <h4 style="font-weight: bold; float: right">Total money: {{ convertNumToMoneyFormat(order.totalPrice) }} đ</h4>
                    <div v-show="!isLoading && notfound">
                        <h3 style="text-align: center">Không tìm thấy đơn hàng này</h3>
                    </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import OrderProducts from '@/pages/orders/OrderProducts';
import OrderService from '../../services/order.service';
import AddressService from '../../services/address.service';
import ShippingService from '../../services/shipping.service';
import { isEmpty } from '../../utils/validations';
import { convertNumToMoneyFormat } from '../../utils/strings';
import { getVNTimeFormat } from '@/utils/time.js';
import { showSuccessMsg, showErrors } from '../../utils/alert';

export default {
    components: {
        OrderProducts
    },
    data: () => ({
        order: {},
        isLoading: false,
        notfound: false,
        arrStatus: [],
        provinces: [],
        districts: [],
        shippings: [],
        shouldSetDistrict0: false
    }),
    methods: {
        isEmpty,

        getOrderDetails: async function(){
            const orderId = this.$route.params.orderId;
            try {
                const res = await OrderService.getOrderDetails(orderId);
                this.order = res.data;
                if(isEmpty(this.order)){
                     this.notfound = true;
                } else {
                    const { customerProvince, customerDistrict } = this.order;
                    await this.getDistrictsByProvinceId(customerProvince.id);
                    this.order = { 
                        ...this.order, 
                        provinceId: customerProvince.id, 
                        districtId: customerDistrict.id 
                    }
                    console.log(this.order);
                }
            } catch (error) {
                console.log(error);
                this.notfound = true;
                this.order = {};
            }
        },

        changeProvince: async function(provinceId){
            await this.getDistrictsByProvinceId(provinceId);
            const province = this.provinces.find(p => p.id == provinceId);
            
            const shippingMoney = this.shippings.find(item => item.type == province.shippingType).money;
            const districtId = this.shouldSetDistrict0 ? this.districts[0].id : this.order.districtId;

            this.order = { 
                ...this.order, 
                customerProvince: province, 
                shippingType: province.shippingType, 
                shippingMoney,
                districtId: districtId
            };
            this.shouldSetDistrict0 = true;
        },

        changeDistrict: function(districtId){
            console.log('change district');
            if(this.order.customerProvince.shippingType === 'NOI_THANH'){
                const district = this.districts.find(d => d.id == districtId);
                let shippingType = 'NOI_THANH';
                if(!isEmpty(district.shippingType)){
                    shippingType = district.shippingType;
                }
                this.order.shippingType = shippingType;
                this.order.shippingMoney =  this.shippings.find(item => item.type == shippingType).money;
            }
        },

        getDistrictsByProvinceId: async function(provinceId){
            const res = await AddressService.getDistrictsByProvinceId(provinceId);
            this.districts = res.data;
        },

        saveOrder: async function(){
            const { customerPhone, customerFullName, status, customerAddress, customerEmail } = this.order;
            const data = { 
                ...this.order, 
                orderDetails: null, 
                phone: customerPhone,
                email: customerEmail,
                fullName: customerFullName, 
                address: customerAddress,
                status,
            };
            this.isLoading = true;
            try {
                const res = await OrderService.updateOrder(data);
                if(res.data.success == '1') {
                    showSuccessMsg({ 
                        title: 'Cập nhật thành công', 
                        text: 'Thông tin đơn hàng đã được lưu vào hệ thống',
                        timer: 4000, 
                    }) 
                } else {
                    let errorStr = '';
                    for(let prop in res.data){
                        errorStr += res.data[prop] + '\n';
                    }
                    showErrors({
                        title: 'Thông tin không hợp lệ!',
                        text: errorStr
                    });
                }
            } catch (error) {
                
            }
            this.isLoading = false;
        },

        convertNumToMoneyFormat, getVNTimeFormat
    },
    async created(){
        this.isLoading = true;
       try {
            const [res1, res2, res3] = await Promise.all([
                OrderService.getOrderStatus(),
                AddressService.getProvinces(),
                ShippingService.getShippings()
            ]);

            this.arrStatus = res1.data;
            this.provinces = res2.data;
            this.shippings = res3.data;

            await this.getOrderDetails();


       } catch (error) {
           
       }
       console.log(this.$refs.selectProvince);
       this.isLoading = false;
    }
}
</script>

<style scoped>
.custom-list{
  padding-left: 25px;
}

.list-item{
  padding-top: 10px;
  padding-bottom: 10px;
  display: block;
}

.title{
    text-align: center;
    font-size: 2em;
    margin-top: 0;
}
</style>