<template>
   <div class="content">
        <h2 class="my-page-header">WStore Information</h2>
         <md-card>
            <md-card-header data-background-color="orange">
            <h4 class="title" style="text-align: center">Store Information</h4>
            <!-- <p v-show="!isLoading && !notfound && !isEmpty(information)" style="text-align:center">ID: {{ information.id }}</p> -->
            </md-card-header>
                <md-card-content>
                    <div v-show="isLoading" style="text-align: center">
                        <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                    </div>
                    <div v-show="!isLoading && !notfound && !isEmpty(information)">
                        <form @submit.prevent="saveInformation">
                             <div class="md-layout md-gutter">
                                <div class="md-layout-item sm-size-100">
                                    <md-field >
                                        <label for="storeName">Store Name</label>
                                        <md-input name="storeName" id="storeName" v-model="information.storeName"  />
                                    </md-field>
                                </div>

                                <div class="md-layout-item sm-size-100">
                                    <md-field>
                                        <label for="storeAddress">Store Address</label>
                                        <md-input name="storeAddress" id="storeAddress" v-model="information.storeAddress"/>
                                    </md-field>
                                </div>
                            </div>

                            <div class="md-layout md-gutter">
                                <div class="md-layout-item sm-size-100">
                                    <md-field >
                                        <label for="storePhone">Phone</label>
                                        <md-input name="storePhone" id="storePhone" v-model="information.storePhone"  />
                                    </md-field>
                                </div>

                                <div class="md-layout-item sm-size-100">
                                    <md-field>
                                        <label for="storeEmail">Email</label>
                                        <md-input name="storeEmail" id="storeEmail" v-model="information.storeEmail"/>
                                    </md-field>
                                </div>
                            </div>

                            <div class="md-layout md-gutter">
                                <div class="md-layout-item sm-size-100">
                                    <md-field>
                                        <label for="storeFacebook">Facebook</label>
                                        <md-input name="storeFacebook" id="storeFacebook" v-model="information.storeFacebook"/>
                                    </md-field>
                                </div>

                                <div class="md-layout-item sm-size-100">
                                    <md-field>
                                        <label for="storeInstagram">Instagram</label>
                                        <md-input name="storeInstagram" id="storeInstagram" v-model="information.storeInstagram"/>
                                    </md-field>
                                </div>
                            </div>

                            <div class="md-layout md-gutter">
                                <div class="md-layout-item sm-size-100">
                                    <strong>About Us Content (VN)</strong>
                                    <MyEditor 
                                            :ref="'myEditorVN'" 
                                            :content="information.aboutUsContent" />
                                </div>
                            </div>

                            <div class="md-layout md-gutter" style="margin-top: 20px">
                                <div class="md-layout-item sm-size-100">
                                    <strong>About Us Content (EN)</strong>
                                    <MyEditor 
                                            :ref="'myEditorEN'" 
                                            :content="information.aboutUsContentEn" />
                                </div>
                            </div>

                            <div class="md-layout md-gutter">
                                <div class="md-layout-item sm-size-100">
                                    <strong>Order success content (VN)</strong>
                                    <MyEditor 
                                            :ref="'orderSuccessContent'" 
                                            :content="information.orderSuccessContent" />
                                </div>
                            </div>

                            <div class="md-layout md-gutter" style="margin-top: 20px">
                                <div class="md-layout-item sm-size-100">
                                    <strong>Order success content (EN)</strong>
                                    <MyEditor 
                                            :ref="'orderSuccessContentEn'" 
                                            :content="information.orderSuccessContentEn" />
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
                    </div>
                    <div v-show="notfound">
                        <h3 style="text-align: center">Can not find store's information</h3>
                    </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>

import InformationService from '../../services/information.service';
import { isEmpty } from '../../utils/validations';
import { showErrors, showSuccessMsg } from '../../utils/alert';
import { getErrorsFromResponse } from '../../utils/errors';
import { SERVER_ERROR_MESSAGE } from '../../utils/constants';
import MyEditor from '../../components/common/MyEditor.vue';


export default {
    components: {
        MyEditor
    },
    
    data: () => ({
        information: {},
        isLoading: false,
        notfound: false,
    }),
    
    methods: {
        getStoreInformation: async function () {
            this.isLoading = true;
            try {
                const res = await InformationService.getLatestInformation();
                this.information = res.data;
                if(isEmpty(this.information)) this.notfound = true;
            } catch (error) {
                this.notfound = true;
            }
            this.isLoading = false;
        },
        
        saveInformation: async function () {
            this.isLoading = true;
            try {
                const aboutUsContent = this.$refs['myEditorVN'].$data.myContent;
                const aboutUsContentEn = this.$refs['myEditorEN'].$data.myContent;
                const orderSuccessContent = this.$refs['orderSuccessContent'].$data.myContent;
                const orderSuccessContentEn = this.$refs['orderSuccessContentEn'].$data.myContent;
                this.information.aboutUsContent = aboutUsContent;
                this.information.aboutUsContentEn = aboutUsContentEn;
                this.information.orderSuccessContent = orderSuccessContent;
                this.information.orderSuccessContentEn = orderSuccessContentEn;
                

                const res = await InformationService.updateInformation(this.information);
                if(res.data.success == '1') {
                    showSuccessMsg({ 
                        title: 'Save successfully!', 
                        text: '',
                        timer: 4000, 
                    }) 
                } else {
                    let errorStr = getErrorsFromResponse(res.data.errors);
                    showErrors({
                        title: 'Please check input data!',
                        text: errorStr
                    });
                }
            } catch (error) {
                showErrors({
                    title: 'Server error!',
                    text: SERVER_ERROR_MESSAGE
                });
            }
            this.isLoading = false;
        },
        isEmpty
    },
    async created(){
        this.getStoreInformation();
    }


    
}
</script>

<style>

</style>