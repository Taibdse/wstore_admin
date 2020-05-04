<template>
     <md-table md-card>
        <md-table-row>
            <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
            <md-table-head ></md-table-head>
        </md-table-row>
        <md-table-row  v-for="(product) in products" :key="product.id" >
            <md-table-cell>{{ product.index }}</md-table-cell>
            <md-table-cell>{{ product.name }}</md-table-cell>
            <md-table-cell>
                <img :src="formatImageUrl(product.mainImage)" class="img-fluid" />
            </md-table-cell>
            <md-table-cell>{{ product.availableSizes }}</md-table-cell>
            <md-table-cell>{{ product.color }}</md-table-cell>
            <md-table-cell>{{ convertNumToMoneyFormat(product.price) }} đ</md-table-cell>
            <md-table-cell>{{ product.available ? 'Còn hàng' : 'Hết hàng' }}</md-table-cell>
            <md-table-cell>{{ product.active ? 'ACTIVE' : 'INACTIVE' }}</md-table-cell>
            <md-table-cell>{{ product.category.name }}</md-table-cell>
            <md-table-cell>
                <md-button class="md-just-icon md-simple md-primary" @click="showDetails(product)">
                <md-icon>edit</md-icon>
                <!-- <md-tooltip md-direction="top">Edit</md-tooltip> -->
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
</template>

<script>
import { convertNumToMoneyFormat } from '@/utils/strings.js';
import { APP_ROOT_DOMAIN } from '../../configs/api';
import { isEmpty } from '../../utils/validations';
import { formatImageUrl } from '../../utils/strings';


export default {
    props: {
        products: Array,
        isLoading: Boolean
    },
    data: () => ({
        tblHeaders: ['#', 'Name', 'Image', 'Sizes', 'Colors', 'Price', 'Available', 'Status', 'Category'],
    }),
    methods: {
        showDetails: function(product){
            this.$router.push('/products/' + product.slug);
        },
        convertNumToMoneyFormat, formatImageUrl
    }
}
</script>

<style>

</style>