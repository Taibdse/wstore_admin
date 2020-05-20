<template>
    <md-table md-card>
        <md-table-row>
            <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
            <md-table-head ></md-table-head>
        </md-table-row>
        <md-table-row  v-for="(tip) in tips" :key="tip.id" >
            <md-table-cell>{{ tip.index + 1 }}</md-table-cell>
            <md-table-cell>{{ truncate(tip.title, 10) }}</md-table-cell>
            <md-table-cell>{{ truncate(removeHtmlTags(tip.content), 40) }}</md-table-cell>
            <md-table-cell>
                <img :src="formatImageUrl(tip.image)" class="img-fluid" />
            </md-table-cell>
            <md-table-cell>
                <strong v-if="!tip.active" class="text-danger">INACTIVE</strong>
                <strong v-if="tip.active" class="text-success">ACTIVE</strong>
            </md-table-cell>
            <md-table-cell>
                <md-button class="md-just-icon md-simple md-primary" @click="showDetails(tip)">
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
import { formatImageUrl, truncate, removeHtmlTags } from '../../utils/strings';

export default {
    props: {
        tips: Array,
    },
    data: () => ({
        tblHeaders: ['#', 'Title', 'Content', 'Image', 'Status'],
    }),
    methods: {
        showDetails: function(tip){
            // this.$router.push('/tips/' + tip.slug);
            window.open('/tips/' + tip.slug, '_blank');
        },
        formatImageUrl, truncate, removeHtmlTags
    }
}
</script>

<style>

</style>