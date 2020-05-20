<template>
    <md-table md-card>
        <md-table-row>
            <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
            <md-table-head ></md-table-head>
        </md-table-row>
        <md-table-row  v-for="(policy, index) in policies" :key="policy.type" >
            <md-table-cell>{{ index + 1 }}</md-table-cell>
            <md-table-cell>{{ policy.type }}</md-table-cell>
            <md-table-cell>{{ policy.name }}</md-table-cell>
            <md-table-cell>
                <strong v-if="policy.active" class="text-success">ACTIVE</strong>
                <strong v-if="!policy.active" class="text-danger">INACTIVE</strong>
            </md-table-cell>
          
            <md-table-cell>
                <md-button class="md-just-icon md-simple md-primary" @click="showDetails(policy)">
                <md-icon>edit</md-icon>
                <!-- <md-tooltip md-direction="top">Edit</md-tooltip> -->
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
</template>

<script>

export default {
    props: {
        policies: Array,
    },
    data: () => ({
        tblHeaders: ['#', 'Type', 'Name', 'Status'],
    }),
    methods: {
        showDetails: function(policy){
            this.$router.push('/policies/' + policy.type.toLowerCase());
        },
    }
}
</script>

<style>

</style>