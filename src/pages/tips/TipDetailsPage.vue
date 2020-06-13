<template>
   <div class="content">
        <h2 class="my-page-header">
            {{ insertTip ? 'Insert tip' : 'Update Tip' }}
        </h2>
         <md-card class="my-card">
            <md-card-header :data-background-color="insertTip ? 'green' : 'orange'">
                <h4 class="title">Tip's information</h4>
            </md-card-header>

            <md-card-content>
                <div v-if="!insertTip && isLoading" style="text-align: center">
                    <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                </div>
                <div v-if="insertTip || (!notfound && !isLoading)">
                    <form class="md-layout" @submit.prevent="saveTip">
                        <md-card class="">
                            <md-card-content>
                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item sm-size-100">
                                        <md-field >
                                            <label for="title">Tip Title</label>
                                            <md-input name="title" id="title" v-model="tip.title" @input="setTipSlug" />
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item sm-size-100">
                                        <md-field>
                                            <label for="slug">Slug</label>
                                            <md-input name="slug" id="slug"  v-model="tip.slug" disabled />
                                        </md-field>
                                    </div>
                                </div>
                                
                               
                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item md-size-100">
                                        <strong>Content</strong>
                                        <!-- <md-textarea v-model="tip.content"></md-textarea> -->
                                        <MyEditor 
                                            :ref="'myEditor'" 
                                            :content="tip.content" />
                                    </div>
                                </div>

                                <div class="md-layout md-gutter" style="margin-top: 20px">
                                    <div class="md-layout-item md-size-100">
                                        <strong>Upload Image</strong><br/><br/>
                                        <div>
                                            <DropzoneUpload
                                                ref="dropzoneTipImage"
                                                :id="'dropzoneTipImage'"
                                                :uploadMultiple="false" 
                                                :uploadedFiles="tipImages">
                                            </DropzoneUpload>
                                        </div>
                                    </div>
                                </div>

                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item md-size-100">
                                        <md-checkbox v-model="tip.active">Active tip</md-checkbox>
                                    </div>
                                </div>
                            </md-card-content>

                            <md-card-actions>
                                    <md-button type="submit" class="md-primary">Save</md-button>
                            </md-card-actions>
                        </md-card>
                    </form>
                </div>
                <div v-if="!insertTip && notfound && !isLoading">
                    <h3 style="text-align: center">Can not find this tip</h3>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>

import DropzoneUpload from '../../components/common/DropzoneUpload';
import TipService from '../../services/tip.service';
import { convertStringToSlug, formatImageUrl } from '../../utils/strings';
import { getErrorsFromResponse } from '../../utils/errors';
import { showErrors, showSuccessMsg } from '../../utils/alert';
import { isEmpty } from '../../utils/validations';
import { SERVER_ERROR_MESSAGE } from '../../utils/constants';
import MyEditor from '../../components/common/MyEditor.vue';

export default {
    components: {
       DropzoneUpload, MyEditor
    },
    data: () => ({
        tip: { 
            active: true, 
        },
        isLoading: false,
        notfound: false,
        insertTip: false,
        tipImages: []
    }),
    methods: {
        getTipDetails: async function(){
            if(this.$route.path.indexOf('/tips/insert') > -1){
                this.insertTip = true;
            } else {
                this.isLoading = true;
                const tipSlug = this.$route.params.tipSlug;
                try {
                    const res = await TipService.getTipBySlug(tipSlug);
                    this.tip = res.data;

                    this.tipImages = [{
                        url: formatImageUrl(this.tip.image), 
                        name: this.tip.title 
                    }]
                    
                    if(isEmpty(this.tip)) this.notfound = true;
                } catch (error) {
                    this.notfound = true;
                }
                this.isLoading = false;
            }
        },
        saveTip: async function(){
            const tipImage = this.$refs.dropzoneTipImage.getUploadedFiles();
            const content = this.$refs['myEditor'].$data.myContent;
            const data = JSON.parse(JSON.stringify(this.tip));
            data.image = isEmpty(tipImage) ? null : tipImage[0].dataURL;
            data.content = content;


            if(this.insertTip) {
                await this.handleInsertTip(data);
            } else {
                await this.handleUpdateTip(data);
            }
        
        },

        handleInsertTip: async function(data){
            this.isLoading = true;
            try {
                const res = await TipService.insertTip(data);
                if(res.data.success === '1') {
                    showSuccessMsg({ title: 'Thêm thành công', text: '' })
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
        
        handleUpdateTip: async function(data){
            try {
                const res = await TipService.updateTip(data);
                if(res.data.success === '1') {
                    await this.getTipDetails();
                    showSuccessMsg({ title: 'Cap nhat thành công', text: '' })
                } else {
                    this.showErrorsMessage(res);
                }
            } catch (error) {
                console.log(error);
                showErrors({ 
                    title: 'Lỗi hệ thống', 
                    text: SERVER_ERROR_MESSAGE
                });
            }
        },

        showErrorsMessage: function(res){
            const errors = getErrorsFromResponse(res.data);
            showErrors({
                title: 'Vui lòng kiểm tra lại thông tin',
                text: errors
            })
        },

        setTipSlug: function(value){
            this.tip.slug = convertStringToSlug(value);
        },
        handleContentChange: function(){},

    },
    async created(){
        this.getTipDetails();
    }
}
</script>

<style>

</style>