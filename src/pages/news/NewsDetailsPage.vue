<template>
   <div class="content">
        <h2 class="my-page-header">{{ insertNews ? 'Insert News' : 'Update News' }}</h2>        
         <md-card>
            <md-card-header :data-background-color="insertNews ? 'green' : 'orange'">
            <h4 class="title" style="text-align: center">News's information</h4>
            <p v-if="!insertNews && !isLoading && !notfound && !isEmpty(news)" style="text-align:center">ID: {{ news.id }}</p>
            </md-card-header>
                <md-card-content>
                    <div v-if="isLoading" style="text-align: center">
                        <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                    </div>
                    <div v-if="!isLoading && !notfound && !isEmpty(news)">
                        <form @submit.prevent="saveNews">
                             <div class="md-layout md-gutter">
                                <div class="md-layout-item md-small-size-100 md-size-33">
                                    <md-field >
                                        <label for="title">Title (VN)</label>
                                        <md-input name="title" id="title" v-model="news.title" @input="setNewsSlug"  />
                                    </md-field>
                                </div>
                                  <div class="md-layout-item md-small-size-100 md-size-33">
                                    <md-field >
                                        <label for="titleEn">Title (EN)</label>
                                        <md-input name="titleEn" id="titleEn" v-model="news.titleEn" />
                                    </md-field>
                                </div>
                                <div class="md-layout-item md-small-size-100 md-size-33">
                                    <md-field>
                                        <label for="slug">Slug</label>
                                        <md-input name="slug" id="slug" v-model="news.slug" disabled/>
                                    </md-field>
                                </div>
                            </div>

                            <h3>News Items</h3>
                            <div v-for="(newsItem, index) in news.newsItems" :key="index">
                                <md-card class="custom-card">
                                    <div>
                                        <div class="index-news-item">Item {{ index + 1 }}</div>
                                        <i v-if="newsItem.new" class="fas fa-times remove-news-items" @click="removeNewsItem(index)"></i>
                                    </div>
                                    <div style="clear: both"></div>
                                    <md-card-content>
                                        <div class="md-layout md-gutter">
                                            <div class="md-layout-item md-size-100">
                                                <strong>Image</strong>
                                                <DropzoneUpload 
                                                    :ref="'dropzoneImage' + newsItem.id"
                                                    :id="'dropzoneImage' + newsItem.id" 
                                                    :uploadMultiple="false" 
                                                    :uploadedFiles="newsItem.imageFile"></DropzoneUpload>
                                            </div>
                                        </div>

                                        <div class="md-layout md-gutter" style="margin-top: 20px">
                                            <div class="md-layout-item sm-size-100">
                                                <strong for="">Content (VN)</strong><br/>
                                                <MyEditor 
                                                    :ref="'myEditorVN' + newsItem.id" 
                                                    :content="newsItem.content" />
                                            </div>
                                        </div>

                                          <div class="md-layout md-gutter" style="margin-top: 20px">
                                            <div class="md-layout-item sm-size-100">
                                                <strong for="">Content (EN)</strong><br/>
                                                <MyEditor 
                                                    :ref="'myEditorEN' + newsItem.id" 
                                                    :content="newsItem.contentEn" />
                                            </div>
                                            
                                        </div>

                                        <div class="md-layout md-gutter">
                                            <div class="md-layout-item md-size-100">
                                                <md-checkbox v-model="newsItem.active">Active</md-checkbox>
                                            </div>
                                        </div>
                                    </md-card-content>
                                
                                </md-card>
                                <hr/>
                            </div>

                            <div class="md-layout md-gutter">
                                <md-button 
                                    @click="addMoreNewsItem"
                                    class="md-raised md-secondary" 
                                    style="margin-left: auto">
                                    Add news's item
                                </md-button>
                            </div>

                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-size-100">
                                    <md-checkbox v-model="news.active">Active news</md-checkbox>
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
                    <div v-if="!isLoading && notfound">
                        <h3 style="text-align: center">Can not find news</h3>
                    </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>

import NewsService from '../../services/news.service';
import { isEmpty } from '../../utils/validations';
import { showErrors, showSuccessMsg } from '../../utils/alert';
import { uuidv4 } from '../../utils/id';
import { getErrorsFromResponse } from '../../utils/errors';
import { SERVER_ERROR_MESSAGE } from '../../utils/constants';
import { convertStringToSlug, formatImageUrl } from '../../utils/strings';
import MyEditor from '../../components/common/MyEditor.vue';
import DropzoneUpload from '../../components/common/DropzoneUpload.vue';

export default {
    components: {
        MyEditor, DropzoneUpload
    },
    
    data: () => ({
        news: { 
            active: true,
            newsItems: []
        },
        isLoading: false,
        notfound: false,
        insertNews: false
    }),
    
    methods: {
        getNews: async function () {
             if(this.$route.path.indexOf('/news/insert') > -1){
                this.insertNews = true;
            } else {
                this.isLoading = true;
                const newsSlug = this.$route.params.newsSlug;
                try {
                    const res = await NewsService.getNewsBySlug(newsSlug);
                    this.news = res.data;
                    if(isEmpty(this.news)) this.notfound = true;
                    else {
                        this.news.newsItems.forEach((newsItem) => {
                            newsItem.imageFile = [{ 
                                url: formatImageUrl(newsItem.image), 
                                name: ''
                            }];
                            newsItem.new = false;
                        })
                    }
                } catch (error) {
                    console.log(error);
                    this.notfound = true;
                }
                this.isLoading = false;
            }
        },
        saveNews: async function () {
            const news = JSON.parse(JSON.stringify(this.news));

            news.newsItems.forEach((newsItem) => {
                const imageFile = this.$refs['dropzoneImage' + newsItem.id][0].getUploadedFiles();
                const content = this.$refs['myEditorVN' + newsItem.id][0].$data.myContent;
                const contentEn = this.$refs['myEditorEN' + newsItem.id][0].$data.myContent;
                
                newsItem.image = isEmpty(imageFile) ? null : imageFile[0].dataURL;
                newsItem.content = content;
                newsItem.contentEn = contentEn;

                if(newsItem.new) {
                    delete newsItem.id;
                    if(!this.insertNews) newsItem.newsId = this.news.id;
                }
                
            });


            if(this.insertNews){
                await this.handleInsertNews(news);
            } else {
                await this.handleUpdateNews(news);
            }

        },

        handleUpdateNews: async function(news){
            this.isLoading = true;
            try {
                const res = await NewsService.updateNews(news);
                if(res.data.success == '1') {
                    await this.getNews();
                    showSuccessMsg({ 
                        title: 'Save successfully!', 
                        text: '',
                        timer: 4000, 
                    }) 
                } else {
                    let errorStr = this.getErrorsMsg(res.data.errors);
                    showErrors({
                        title: 'Please check input data',
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

        handleInsertNews: async function(news){
            this.isLoading = true;
             try {
                const res = await NewsService.inserNews(news);
                if(res.data.success == '1') {
                    showSuccessMsg({ 
                        title: 'Save successfully!',
                        text: '',
                        timer: 4000, 
                    }) 
                } else {
                    let errorStr = this.getErrorsMsg(res.data.errors);
                    showErrors({
                        title: 'Please check input data',
                        text: errorStr
                    });
                }
            } catch (error) {
                showErrors({
                    title: 'Server error',
                    text: SERVER_ERROR_MESSAGE
                });
            }
            this.isLoading = false;
        },

        getErrorsMsg: function(errors){
            let str = '';
            for(let prop in errors){
                if(prop.indexOf('newsItem') > -1){
                    str += prop.toUpperCase() + ': ' + errors[prop] + '\n'; 
                } else {
                    str += errors[prop] + '\n'; 
                }
            }
            return str;
        },

        addMoreNewsItem: function(){
            this.news.newsItems.push({ 
                id: uuidv4(),
                active: true, 
                content: '', 
                image: '',
                imageFile: [],
                new: true
            });
            this.news = { ...this.news };
        },

      

        setNewsSlug: function(value){
            this.news.slug = convertStringToSlug(value);
        },

        removeNewsItem: function(index){
            this.news.newsItems.splice(index, 1);
        },
        
        isEmpty
    },
    async created(){
        this.getNews();
    }
}
</script>

<style scoped>
.custom-card div.md-card-content{
    border: 2px solid #ccc!important;
}
.custom-card div.ql-editor.ql-blank{
    height: 300px!important;
}
i.remove-news-items{
    font-size: 20px;
    cursor: pointer;
    display: block;
    float: right;
}

i.remove-news-items:active{
    color: red;
}
div.index-news-item{
    float: left;
    font-size: 1.1em;
    font-weight: bold;
    margin: 10px;
}

</style>