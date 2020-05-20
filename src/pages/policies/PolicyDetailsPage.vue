<template>
   <div class="content">
        <h2 class="my-page-header" v-if="!notfound">Update {{ policy.type }}</h2>
         <md-card>
            <md-card-header data-background-color="orange">
            <h4 class="title" style="text-align: center" v-if="!notfound">{{ policy.type }}'s information</h4>
            </md-card-header>
                <md-card-content>
                    <div v-if="isLoading" style="text-align: center">
                        <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                    </div>
                    <div v-if="!isLoading && !notfound && !isEmpty(policy)">
                        <form @submit.prevent="savePolicy">
                             <div class="md-layout md-gutter">
                                <div class="md-layout-item sm-size-100">
                                    <md-field >
                                        <label for="name">Name</label>
                                        <md-input name="name" id="name" v-model="policy.name"  />
                                    </md-field>
                                </div>

                                <div class="md-layout-item sm-size-100">
                                    <md-field>
                                        <label for="type">Type</label>
                                        <md-input name="type" id="type" v-model="policy.type" disabled/>
                                    </md-field>
                                </div>
                            </div>

                             <div class="md-layout md-gutter">
                                <div class="md-layout-item sm-size-100">
                                    <strong for="">Content</strong><br/><br/>
                                    <MyEditor 
                                        ref="myEditor" 
                                        :content="policy.content" />
                                </div>
                            </div>

                             <!-- <div class="md-layout md-gutter">
                                <div class="md-layout-item md-size-100">
                                    <md-checkbox v-model="policy.active">Active policy</md-checkbox>
                                </div>
                            </div> -->


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

                    <div v-if="!isLoading && notfound">
                        <h3 style="text-align: center">No policy found</h3>
                    </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>

import PolicyService from '../../services/policy.service';
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
        policy: { 
            active: true, 
        },
        isLoading: false,
        notfound: false,
    }),
    
    methods: {
        getExchangePolicy: async function () {
            this.isLoading = true;
            const policyType = this.$route.params.type;
            try {
                const res = await PolicyService.getPolicyByType(policyType);
                this.policy = res.data;
                console.log(this.policy);
                if(isEmpty(this.policy)) this.notfound = true;
                
            } catch (error) {
                this.notfound = true;
            }
            this.isLoading = false;
        },

        savePolicy: async function () {
            this.policy.content = this.$refs.myEditor.$data.myContent;
            this.isLoading = true;
            try {
                const res = await PolicyService.updatePolicy(this.policy);
                if(res.data.success == '1') {
                    showSuccessMsg({ 
                        title: 'Cập nhật thành công', 
                        text: 'Thông tin đã được lưu vào hệ thống',
                        timer: 4000, 
                    }) 
                } else {
                    let errorStr = getErrorsFromResponse(res.data);
                    showErrors({
                        title: 'Thông tin không hợp lệ!',
                        text: errorStr
                    });
                }
            } catch (error) {
                showErrors({
                        title: 'Lỗi Server',
                        text: SERVER_ERROR_MESSAGE
                    });
            }

            this.isLoading = false;

        },
        isEmpty
    },
    async created(){
        this.getExchangePolicy();
    }
}
</script>

<style>

</style>