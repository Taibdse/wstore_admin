<template>
    <div class="content">
        <h2 class="my-page-header">Categories</h2>
        <div class="md-layout">
            <md-card>
                  <md-card-header data-background-color="green" >
                    <h4 class="title">Filters</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                         <div class="md-layout-item md-size-100" style="text-align: right">
                            <md-button class="md-raised md-success" @click="gotoInsertCategoryPage">Add more category</md-button>
                         </div>
                    </div>
                        <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50">
                            <md-field>
                                <label for="movie">Active</label>
                                <md-select v-model="filters.active" name="category" id="category">
                                    <md-option value="all">All</md-option>
                                    <md-option value="active">Active</md-option>
                                    <md-option value="inactive">In active</md-option>
                                </md-select>
                            </md-field>
                            <md-button class="md-raised md-primary" @click="getCategories">Search</md-button>
                        </div>
                    </div>
                </md-card-content>
            </md-card>

             <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Categories List</h4>
                </md-card-header>
                <md-card-content>
                    <div v-show="isLoading" style="text-align: center">
                        <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                    </div>
                    <div v-show="!isLoading && categories.length !== 0">
                        <CategoriesList :categories="categories" />
                    </div>
                    <div v-show="!isLoading && categories.length === 0">
                        <h3 style="text-align: center">Can not find any categories</h3>
                    </div>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>
import CategoryService from '../../services/category.service';
import CategoriesList from './CategoriesList.vue';

export default {
    
    components: {
        CategoriesList
    },

    async created(){
        this.getCategories();
    },

    data: () => ({
        categories: [],
        isLoading: false,
        filters: { active: 'all' },
    }),

    methods: {
        
        getCategories: async function(){
            this.isLoading = true;
            try {
                let isActive = '';
                if(this.filters.active == 'active') isActive = true;
                else if(this.filters.active == 'inactive') isActive = false;

                const res = await CategoryService.getCategories(isActive);
                this.categories = res.data;
            } catch (error) {
                this.categories = [];
            }
            this.isLoading = false;
        },
       
        gotoInsertCategoryPage: function(){
            this.$router.push('/categories/insert');
        }
    }
}
</script>

<style>



</style>