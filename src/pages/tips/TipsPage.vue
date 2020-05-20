<template>
  <div class="content">
      <h2 class="my-page-header">Tips</h2>
        <div class="md-layout">
            <md-card>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item" style="text-align: right">
                            <md-button class="md-raised md-success" @click="gotoInsertTipPage">Add more tip</md-button>
                        </div>
                    </div>
                        <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50">
                            <!-- <md-field>
                                <label for="createdAt">Sort By Date</label>
                                <md-select v-model="orderBys.createdAt" name="createdAt" id="createdAt">
                                    <md-option value="DESC">Moi nhat</md-option>
                                    <md-option value="ASC">Cu nhat</md-option>
                                </md-select>
                            </md-field>
                            <md-button class="md-raised md-primary" @click="getTips">Tìm kiếm</md-button> -->
                        </div>
                    </div>
                </md-card-content>
            </md-card>

             <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Tips List</h4>
                </md-card-header>
                <md-card-content>
                    <div v-show="isLoading" style="text-align: center">
                        <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                    </div>
                    <div v-show="tips.length !== 0">
                        <Pagination :pagination="pagination" :handleChange="handlePageChange"/>
                        <TipsList :tips="pagingTips" />
                    </div>
                    <div v-show="!isLoading && tips.length === 0">
                        <h3 style="text-align: center">No tip found!</h3>
                    </div>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/common/Pagination';
import TipsList from './TipsList';
import TipService from '../../services/tip.service.js';
import { isEmpty } from '../../utils/validations';

export default {
    components: {
        TipsList, Pagination
    },
    data: () => ({
        tips: [],
        isLoading: false,
        orderBys: {
            createdAt: 'DESC'
        },
        pagination: { pageCount: 0, currentPage: 1, size: 10 }
    }),

    computed: {
        pagingTips: function(){
            if(isEmpty(this.tips)) return [];
            const { currentPage, size } = this.pagination;
            return this.tips.map((tip, index) => {
                return { ...tip, index: index + size * (currentPage - 1) }
            })
        }
    },

    methods: {
        getTips: async function(){
            this.isLoading = true;
            try {
                const { currentPage, size } = this.pagination;
                const res = await TipService.getTips(currentPage, size);
                const { data, numOfPage, page } = res.data;
                this.tips = data;
                this.pagination = { ...this.pagination, pageCount: numOfPage }
            } catch (error) {
                this.tips = [];
                this.pagination = { pageCount: 0, currentPage: 1, size: 10 };
            }
            this.isLoading = false;
        },

        handlePageChange: function(pageNum){
            this.pagination = { ...this.pagination, currentPage: pageNum };
            this.getTips();
        },

        gotoInsertTipPage: function(){
            this.$router.push('/tips/insert');
        }
    },

    async created (){
        this.getTips();
    }
}
</script>

<style>

</style>