<template>
     <md-table md-card>
        <md-table-row>
            <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
            <md-table-head ></md-table-head>
        </md-table-row>
        <md-table-row  v-for="(category, index) in categories" :key="category.id" >
            <md-table-cell>{{ index + 1 }}</md-table-cell>
            <md-table-cell>{{ category.name }}</md-table-cell>
          
            <md-table-cell>{{ truncate(category.description, 100) }}</md-table-cell>
            <md-table-cell>{{ category.active ? 'ACTIVE' : 'INACTIVE' }}</md-table-cell>
            <md-table-cell>
                <md-button class="md-just-icon md-simple md-primary" @click="showDetails(category)">
                <md-icon>edit</md-icon>
                <!-- <md-tooltip md-direction="top">Edit</md-tooltip> -->
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
</template>

<script>
import { APP_ROOT_DOMAIN } from '../../configs/api';
import { isEmpty } from '../../utils/validations';
import { truncate } from '../../utils/strings';

export default {
    props: {
        categories: Array,
    },
    data: () => ({
        tblHeaders: ['#', 'Name', 'Description', 'Status'],
    }),
    methods: {
        showDetails: function(category){
            this.$router.push('/categories/' + category.slug);
        },
        truncate
    }
}
</script>

<style>

</style>