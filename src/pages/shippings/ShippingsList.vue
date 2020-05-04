<template>
     <md-table md-card>
        <md-table-row>
            <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
            <md-table-head ></md-table-head>
        </md-table-row>
        <md-table-row  v-for="(shipping, index) in shippings" :key="shipping.type" >
            <md-table-cell>{{ index + 1 }}</md-table-cell>
            <md-table-cell>{{ shipping.title }}</md-table-cell>
          
            <md-table-cell>{{ convertNumToMoneyFormat(shipping.money) }} d</md-table-cell>
            <md-table-cell>{{ shipping.type }}</md-table-cell>
            <md-table-cell>
                <md-button class="md-just-icon md-simple md-primary" @click="showDetails(shipping)">
                <md-icon>edit</md-icon>
                <!-- <md-tooltip md-direction="top">Edit</md-tooltip> -->
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
</template>

<script>
import { isEmpty } from '../../utils/validations';
import { convertNumToMoneyFormat } from '../../utils/strings';

export default {
    props: {
        shippings: Array,
    },
    data: () => ({
        tblHeaders: ['#', 'Title', 'Money', 'Type'],
    }),
    methods: {
        showDetails: function(shipping){
            this.$router.push('/shippings/' + shipping.type);
        },
        convertNumToMoneyFormat
    }
}
</script>

<style>

</style>