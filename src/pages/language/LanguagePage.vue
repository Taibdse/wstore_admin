<template>
   <div class="content">
        <h2 class="my-page-header">Multilingual Settings</h2>
        <div class="md-layout">
              <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Filters</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-30 md-medium-size-40 md-small-size-70 md-xsmall-size-100">
                            <strong>Input en/vn</strong>
                            <md-field >
                                <md-input v-model="filters.keyword"/>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <md-button class="md-raised md-primary" 
                            style="margin-left: auto" 
                            @click="handleSearch">
                            Search
                        </md-button>
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <div class="md-layout">
             <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Words List</h4>
                </md-card-header>
                <md-card-content>
                    <div v-if="isLoading" style="text-align: center">
                        <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                    </div>
                    <div v-if="words.length !== 0">
                        <Pagination :pagination="pagination" :handleChange="handlePageChange"/>
                        <WordsList :onEdit="edit" :words="words" />
                    </div>
                    <div v-if="!isLoading && words.length === 0">
                        <h3 style="text-align: center">No words found!</h3>
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <EditWordDialog  
            :showDialog="showDialog"
            :onSave="saveWord"
            :isSaving="isSaving"
            :onChange="changeWord"
            :word="word"
            :onToggleDialog="toggleDialog" />
    </div>
</template>

<script>
import Pagination from '../../components/common/Pagination';
import LanguageService from '../../services/language.service';
import WordsList from './WordsList';
import EditWordDialog from './EditWordDialog';
import { isEmpty } from '../../utils/validations';
import { showErrors, showSuccessMsg } from '../../utils/alert';

export default {
    components: {
        WordsList, Pagination, EditWordDialog
    },
    data: () => ({
        words: [],
        isLoading: false,
        filters: { keyword: '' },
        pagination: { pageCount: 0, size: 10, currentPage: 1 },
        word: {},
        showDialog: false,
        isSaving: false
    }),

    methods: {
        getWords: async function(){
            this.isLoading = true;
            try {
                const { currentPage, size } = this.pagination;
                const res = await LanguageService.getPaging({ 
                    size, page: currentPage, 
                    keyword: this.filters.keyword
                });
                const { data, numOfPage } = res.data;
                this.words  = data.map((item, i) => ({ ...item, index: (currentPage - 1) * size + i + 1 }));
                this.pagination = { ...this.pagination, pageCount: numOfPage };
            } catch (error) {
                console.log(error);
                this.words = [];
                this.pagination = { pageCount: 0, currentPage: 1, size: 10 }
            }
            this.isLoading = false;
        },

        handleSearch: function(){
            this.pagination = { ...this.pagination, currentPage: 1 };
            this.getWords();
        },

        saveWord: async function(){
            this.isSaving = true;
            try {
                const res = await LanguageService.update(this.word);
                const { success, data, errors } = res.data;
                if(success){
                    showSuccessMsg({
                        title: 'Save successfully!',
                        text:'',
                    })
                    this.getWords();
                } else {
                    showErrors({
                        title: 'Can not save word!',
                        text: Object.values(errors)[0]
                    })
                }
                this.showDialog = false;
               
            } catch (error) {
                console.log(error);
                showErrors({
                    title: 'Can not save word!',
                    text: 'Please try again!'
                })
            }
            this.isSaving = false;
        },

        changeWord: function(prop, value){
            this.word = { ...this.word, [prop]: value };
        },

        edit: function(word){
            this.word = { ...word };
            this.toggleDialog(true);
        },

        toggleDialog: function(value){
            this.showDialog = value;
        },

        filterWords: function(words, pagination){
            const { currentPage, size } = pagination;
            const startIndex = (currentPage - 1) * size;
            const endIndex = currentPage * size;
            return words.filter((w, index) => index >= startIndex && index < endIndex)
                            .map((w, i) => ({ ...w, index: startIndex + i + 1 }));
        },

        handlePageChange: function(pageNum){
            this.pagination = { ...this.pagination, currentPage: pageNum };
            this.getWords();
        }

       
    },

    async created (){
        this.handleSearch();
    }
}
</script>

<style>

</style>