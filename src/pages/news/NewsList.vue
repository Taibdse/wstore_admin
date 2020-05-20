<template>
    <md-table md-card>
        <md-table-row>
            <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
            <md-table-head ></md-table-head>
        </md-table-row>
        <md-table-row  v-for="(news, index) in newsArray" :key="news.id" >
            <md-table-cell>{{ index + 1 }}</md-table-cell>
            <md-table-cell>
                <img 
                    v-if="!isEmpty(news.newsItems[0]) && !isEmpty(news.newsItems[0].image)" 
                    :src="formatImageUrl(news.newsItems[0].image)" 
                    class="img-fluid" />
            </md-table-cell>
            <md-table-cell>{{ truncate(removeHtmlTags(news.title), 20) }}</md-table-cell>
            <md-table-cell>{{ getVNTimeFormat(news.createdAt) }}</md-table-cell>
            <md-table-cell>
                <strong v-if="!news.active" class="text-danger">INACTIVE</strong>
                <strong v-if="news.active" class="text-success">ACTIVE</strong>
            </md-table-cell>
            <md-table-cell>
                <md-button class="md-just-icon md-simple md-primary" @click="showDetails(news)">
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
import { getVNTimeFormat } from '../../utils/time';

export default {
    props: {
        newsArray: Array,
    },
    data: () => ({
        tblHeaders: ['#','', 'Title', 'Created At', 'Status'],
    }),
    methods: {
        showDetails: function(news){
            // this.$router.push('/news/' + news.slug);
            window.open('/news/' + news.slug, '_blank');
        },
        formatImageUrl, truncate, getVNTimeFormat, isEmpty, removeHtmlTags
    }
}
</script>

<style>

</style>