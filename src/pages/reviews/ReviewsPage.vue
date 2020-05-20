<template>
  <div class="content">
      <h2 class="my-page-header">Reviews</h2>
        <div class="md-layout">
            <md-card>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item" style="text-align: right">
                            <md-button class="md-raised md-success" @click="gotoInsertReviewPage">Add more review</md-button>
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
                            <md-button class="md-raised md-primary" @click="getReviews">Tìm kiếm</md-button> -->
                        </div>
                    </div>
                </md-card-content>
            </md-card>

             <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Reviews List</h4>
                </md-card-header>
                <md-card-content>
                    <div v-show="isLoading" style="text-align: center">
                        <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                    </div>
                    <div v-show="reviews.length !== 0">
                        <Pagination :pagination="pagination" :handleChange="handlePageChange"/>
                        <ReviewsList :reviews="pagingReviews" />
                    </div>
                    <div v-show="!isLoading && reviews.length === 0">
                        <h3 style="text-align: center">No review found!</h3>
                    </div>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/common/Pagination';
import ReviewsList from './ReviewsList';
import ReviewService from '../../services/review.service';
import { isEmpty } from '../../utils/validations';

export default {
    components: {
        ReviewsList, Pagination
    },
    data: () => ({
        reviews: [],
        isLoading: false,
        orderBys: {
            createdAt: 'DESC'
        },
        pagination: { pageCount: 0, currentPage: 1, size: 10 }
    }),

    computed: {
        pagingReviews: function(){
            if(isEmpty(this.reviews)) return [];
            const { currentPage, size } = this.pagination;
            return this.reviews.map((review, index) => {
                return { ...review, index: index + size * (currentPage - 1) }
            })
        }
    },

    methods: {
        getReviews: async function(){
            this.isLoading = true;
            try {
                const { currentPage, size } = this.pagination;
                const res = await ReviewService.getReviews(currentPage, size);
                const { data, numOfPage, page } = res.data;
                this.reviews = data;
                this.pagination = { ...this.pagination, pageCount: numOfPage }
            } catch (error) {
                this.reviews = [];
                this.pagination = { pageCount: 0, currentPage: 1, size: 10 };
            }
            this.isLoading = false;
        },

        handlePageChange: function(pageNum){
            this.pagination = { ...this.pagination, currentPage: pageNum };
            this.getReviews();
        },

        gotoInsertReviewPage: function(){
            this.$router.push('/reviews/insert');
        }
    },

    async created (){
        this.getReviews();
    }
}
</script>

<style>

</style>