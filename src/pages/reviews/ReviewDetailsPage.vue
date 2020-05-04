<template>
   <div class="content">
        <h2 class="my-page-header">
            {{ insertReview ? 'Insert review' : 'Update Review' }}
        </h2>
         <md-card class="my-card">
            <md-card-header :data-background-color="insertReview ? 'green' : 'orange'">
                <h4 class="title">Review's information</h4>
            </md-card-header>

            <md-card-content>
                <div v-if="!insertReview && isLoading" style="text-align: center">
                    <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                </div>
                <div v-if="insertReview || (!notfound && !isLoading)">
                    <form class="md-layout" @submit.prevent="saveReview">
                        <md-card class="">
                            <md-card-content>
                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item sm-size-100">
                                        <md-field >
                                            <label for="title">Review Title</label>
                                            <md-input name="title" id="title" v-model="review.title" @input="setReviewSlug" />
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item sm-size-100">
                                        <md-field>
                                            <label for="slug">Slug</label>
                                            <md-input name="slug" id="slug"  v-model="review.slug" disabled />
                                        </md-field>
                                    </div>
                                </div>
                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item sm-small-size-100">
                                        <md-field>
                                            <label for="celebrityName">Celebrity Name</label>
                                            <md-input name="celebrityName" id="celebrityName"  v-model="review.celebrityName"  />
                                        </md-field>
                                    </div>
                                </div>
                               
                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item md-size-100">
                                        <strong>Content</strong>
                                        <!-- <md-textarea v-model="review.content"></md-textarea> -->
                                        <MyEditor 
                                            :ref="'myEditor'" 
                                            :content="review.content" />
                                    </div>
                                </div>

                                <div class="md-layout md-gutter" style="margin-top: 20px">
                                    <div class="md-layout-item md-size-100">
                                        <strong>Upload Image</strong><br/><br/>
                                        <div>
                                            <DropzoneUpload
                                                ref="dropzoneReviewImage"
                                                :id="'dropzoneReviewImage'"
                                                :uploadMultiple="false" 
                                                :uploadedFiles="reviewImages">
                                            </DropzoneUpload>
                                        </div>
                                    </div>
                                </div>

                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item md-size-100">
                                        <md-checkbox v-model="review.active">Active review</md-checkbox>
                                    </div>
                                </div>
                            </md-card-content>

                            <md-card-actions>
                                    <md-button type="submit" class="md-primary">Save</md-button>
                            </md-card-actions>
                        </md-card>
                    </form>
                </div>
                <div v-if="!insertReview && notfound && !isLoading">
                    <h3 style="text-align: center">Can not find this review</h3>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>

import DropzoneUpload from '../../components/common/DropzoneUpload';
import ReviewService from '../../services/review.service';
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
        review: { 
            active: true, 
        },
        isLoading: false,
        notfound: false,
        insertReview: false,
        reviewImages: []
    }),
    methods: {
        getReviewDetails: async function(){
            if(this.$route.path.indexOf('/reviews/insert') > -1){
                this.insertReview = true;
            } else {
                this.isLoading = true;
                const reviewSlug = this.$route.params.reviewSlug;
                try {
                    const res = await ReviewService.getReviewBySlug(reviewSlug);
                    this.review = res.data;

                    this.reviewImages = [{
                        url: formatImageUrl(this.review.image), 
                        name: this.review.title 
                    }]
                    
                    if(isEmpty(this.review)) this.notfound = true;
                } catch (error) {
                    this.notfound = true;
                }
                this.isLoading = false;
            }
        },
        saveReview: async function(){
            const reviewImage = this.$refs.dropzoneReviewImage.getUploadedFiles();
            const content = this.$refs['myEditor'].$data.myContent;
            const data = JSON.parse(JSON.stringify(this.review));
            data.image = isEmpty(reviewImage) ? null : reviewImage[0].dataURL;
            data.content = content;


            if(this.insertReview) {
                await this.handleInsertReview(data);
            } else {
                await this.handleUpdateReview(data);
            }
        
        },

        handleInsertReview: async function(data){
            this.isLoading = true;
            try {
                const res = await ReviewService.insertReview(data);
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
        
        handleUpdateReview: async function(data){
            try {
                const res = await ReviewService.updateReview(data);
                if(res.data.success === '1') {
                    await this.getReviewDetails();
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

        setReviewSlug: function(value){
            this.review.slug = convertStringToSlug(value);
        },
        handleContentChange: function(){},

    },
    async created(){
        this.getReviewDetails();
    }
}
</script>

<style>

</style>