<template>
    <md-table md-card>
        <md-table-row>
            <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
            <md-table-head ></md-table-head>
        </md-table-row>
        <md-table-row  v-for="(review) in reviews" :key="review.id" >
            <md-table-cell>{{ review.index + 1 }}</md-table-cell>
            <md-table-cell>{{ truncate(review.title, 10) }}</md-table-cell>
            <md-table-cell>{{ truncate(removeHtmlTags(review.content), 40) }}</md-table-cell>
            <md-table-cell>{{ review.celebrityName }}</md-table-cell>
            <md-table-cell>
                <img :src="formatImageUrl(review.image)" class="img-fluid" />
            </md-table-cell>
            <md-table-cell>
                <strong v-if="!review.active" class="text-danger">INACTIVE</strong>
                <strong v-if="review.active" class="text-success">ACTIVE</strong>
            </md-table-cell>
            <md-table-cell>
                <md-button class="md-just-icon md-simple md-primary" @click="showDetails(review)">
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
        reviews: Array,
    },
    data: () => ({
        tblHeaders: ['#', 'Title', 'Content', 'Celebrity Name', 'Image', 'Status'],
    }),
    methods: {
        showDetails: function(review){
            // this.$router.push('/reviews/' + review.slug);
            window.open('/reviews/' + review.slug, '_blank');
        },
        formatImageUrl, truncate, removeHtmlTags
    }
}
</script>

<style>

</style>