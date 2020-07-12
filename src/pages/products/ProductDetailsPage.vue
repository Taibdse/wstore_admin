<template>
    <div class="content">
        <h2 class="my-page-header">{{ insertProduct ? 'Insert Product' : 'Update Product' }}</h2>
        
         <md-card class="my-card">
            <md-card-header :data-background-color="insertProduct ? 'green' : 'orange'">
                <h4 class="title">Product's information</h4>
            </md-card-header>

            <md-card-content>
                <div v-if="!insertProduct && isLoading" style="text-align: center">
                    <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                </div>
                <div v-if="insertProduct || (!notfound && !isLoading)">
                    <form class="md-layout" @submit.prevent="saveProduct">
                        <md-card class="">
                            <md-card-content>
                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item sm-size-100">
                                        <md-field >
                                            <label for="name">Name</label>
                                            <md-input name="name" id="name" v-model="product.name" @input="setProductSlug" />
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item sm-size-100">
                                        <md-field>
                                            <label for="slug">Slug</label>
                                            <md-input name="slug" id="slug"  v-model="product.slug" disabled />
                                        </md-field>
                                    </div>
                                
                                </div>
                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item sm-small-size-100">
                                        <md-field>
                                            <label for="category">Category</label>
                                            <md-select v-model="product.categoryId" name="category" id="category">
                                                <md-option :value="cate.id" v-for="(cate) in categories" :key="cate.id">{{ cate.name }}</md-option>
                                            </md-select>
                                        </md-field>
                                    </div>
                                    <div class="md-layout-item sm-small-size-100">
                                        <md-field>
                                            <label for="sku">Sku</label>
                                            <md-input name="sku" id="sku" v-model="product.sku"  />
                                        </md-field>
                                    </div>
                                </div>
                                <div class="md-layout md-gutter">
                                     <div class="md-layout-item sm-small-size-100">
                                        <md-field>
                                            <label for="price">Price</label>
                                            <md-input name="price" id="price"  v-model="product.price"  />
                                        </md-field>
                                    </div>
                                    <div class="md-layout-item sm-small-size-100">
                                        <md-field>
                                            <label for="color">Colors</label>
                                            <md-input name="color" id="color"  v-model="product.color" placeholder="yellow,black,blue" />
                                        </md-field>
                                    </div>
                                    <div class="md-layout-item sm-small-size-100">
                                        <md-field>
                                            <label for="size">Sizes</label>
                                            <md-input name="size" id="size"  v-model="product.availableSizes" placeholder="S,M,L,XL" />
                                        </md-field>
                                    </div>
                                      <div class="md-layout-item sm-small-size-100">
                                        <md-field>
                                            <label for="productForm">Product Form</label>
                                            <md-input name="productForm" id="productForm"  
                                                v-model="product.productForm" placeholder="25cm,28cm" />
                                        </md-field>
                                    </div>
                                    
                                </div>

                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item md-size-100">
                                        <md-field>
                                            <label>Description (VN)</label>
                                            <md-textarea v-model="product.description"></md-textarea>
                                        </md-field>
                                    </div>
                                </div>

                                  <div class="md-layout md-gutter">
                                    <div class="md-layout-item md-size-100">
                                        <md-field>
                                            <label>Description (EN)</label>
                                            <md-textarea v-model="product.descriptionEn"></md-textarea>
                                        </md-field>
                                    </div>
                                </div>

                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item md-size-100">
                                        <md-checkbox v-model="product.available">Available</md-checkbox>
                                        <md-checkbox v-model="product.inHomePage">Show product in home page</md-checkbox>
                                        <md-checkbox v-model="product.active">Active product</md-checkbox>
                                    </div>
                                </div>

                                <div class="md-layout md-gutter" style="margin-top: 20px">
                                    <div class="md-layout-item md-size-100">
                                        <strong>Upload main image (only 1 image)</strong><br/><br/>
                                        <div>
                                            <DropzoneUpload
                                                ref="dropzoneMainImage"
                                                :id="'productMainImage'"
                                                :uploadMultiple="false" 
                                                :uploadedFiles="productMainImages">
                                            </DropzoneUpload>
                                        </div>
                                    </div>
                                </div>

                                <div class="md-layout md-gutter" style="margin-top: 20px">
                                    <div class="md-layout-item md-size-100">
                                        <strong style="margin-bottom: 20px">Upload sub image (can upload multiple images)</strong><br/><br/>
                                        <DropzoneUpload 
                                            ref="dropzoneSubImage"
                                            :id="'productSubImages'" 
                                            :uploadMultiple="true" 
                                            :uploadedFiles="productSubImages"></DropzoneUpload>
                                    </div>
                                </div>
                            </md-card-content>

                            <md-card-actions>
                                    <md-button type="submit" class="md-primary">Save</md-button>
                            </md-card-actions>
                        </md-card>
                    </form>
                </div>
                <div v-if="!insertProduct && notfound && !isLoading">
                    <h3 style="text-align: center">Can not find this product</h3>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>

import CategoryService from '../../services/category.service';
import ProductService from '../../services/product.service';
import { isEmpty } from '@/utils/validations.js';
import { convertNumToMoneyFormat, convertStringToSlug, formatImageUrl } from '../../utils/strings';
import { getVNTimeFormat } from '../../utils/time';
import { showSuccessMsg, showErrors } from '../../utils/alert';
import { getErrorsFromResponse } from '../../utils/errors';
import DropzoneUpload from '@/components/common/DropzoneUpload';
import { APP_ROOT_DOMAIN } from '../../configs/api';

export default {
    components: {
       DropzoneUpload
    },
    data: () => ({
        product: { 
            category: {}, 
            active: true, 
            available: true, 
            inHomePage: true 
        },
        isLoading: false,
        notfound: false,
        arrStatus: [],
        categories: [],
        productSubImages: [],
        productMainImages: [],
        insertProduct: false,
        serverErrorMsg: 'Can not save product, due to some errord from server!'
    }),
    methods: {
        getProductDetails: async function(){
            if(!this.insertProduct){
                this.isLoading = true
                const productSlug = this.$route.params.productSlug;
                try {
                    const res = await ProductService.getProductDetails(productSlug);
                    this.product = res.data;
                    
                    this.product.categoryId = this.product.category.id;
                    this.productMainImages = [{ 
                        url: formatImageUrl(this.product.mainImage), 
                        name: this.product.name 
                    }]
                    this.productSubImages = this.product.subImages.map(subImage => {
                        return { 
                            url:  formatImageUrl(subImage.url), 
                            name: subImage.id
                        }
                    });
                    
                    if(isEmpty(this.product)) this.notfound = true;
                } catch (error) {
                    this.notfound = true;
                }
                this.isLoading = false;
            }
        },
        
        showErrorsMessage: function(res){
            const errors = getErrorsFromResponse(res.data);
            showErrors({
                title: 'Please check input data!',
                text: errors
            })
        },
        
        saveProduct: async function(){
            
            const mainImage = this.$refs.dropzoneMainImage.getUploadedFiles();
            const uploadedSubImages = this.$refs.dropzoneSubImage.getUploadedFiles();
            const manaullyAddedSubImages = this.$refs.dropzoneSubImage.getManuallyAddedFiles();
            const data = JSON.parse(JSON.stringify(this.product));
            data.subImages = uploadedSubImages.map(img => img.dataURL);
            data.mainImage = isEmpty(mainImage) ? null : mainImage[0].dataURL;

            if(!this.insertProduct){
                data.inactiveSubImages = this.productSubImages
                                    .filter(img => {
                                        return manaullyAddedSubImages.findIndex(item => item.name == img.name) == -1;
                                    }).map(item => item.name);
            } else {
                data.inactiveSubImages = [];
            }

            if(this.insertProduct) {
                await this.handleInsertProduct(data);
            } else {
                await this.handleUpdateProduct(data);
            }

        },

        handleInsertProduct: async function(data){
            this.isLoading = true;
            try {
                const res = await ProductService.insertProduct(data);
                if(res.data.success === '1') {
                    showSuccessMsg({ title: 'Save successfully!', text: '' })
                } else {
                    this.showErrorsMessage(res);
                }
            } catch (error) {
                showErrors({ 
                    title: 'Server errors!', 
                    text: this.serverErrorMsg
                });
            }
            this.isLoading = false;
        },

        handleUpdateProduct: async function(data){
            this.isLoading = true;
            try {
                const res = await ProductService.updateProduct(data);
                if(res.data.success === '1') {
                    await this.getProductDetails();
                    showSuccessMsg({
                        title: 'Save successfully!',
                        text: ''
                    });

                } else {
                    this.showErrorsMessage(res);
                }
            } catch (error) {
                showErrors({ 
                    title: 'Server errors!', 
                    text: this.serverErrorMsg
                });
            }
            this.isLoading = false;
        },

        getCategories: async function(){
            const res = await CategoryService.getCategories('');
            this.categories = res.data;
        },

        setProductSlug: function(value){
            this.product.slug = convertStringToSlug(value);
        },

        convertNumToMoneyFormat, getVNTimeFormat
    },

    async created(){
        if(this.$route.path.indexOf('/products/insert') > -1){
            this.insertProduct = true;
        }
        try {
            await this.getCategories();
            this.getProductDetails();
            if(this.insertProduct) {
                this.product = { ...this.product, categoryId: this.categories[0].id };
            }
        } catch (error) {
            
        }
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