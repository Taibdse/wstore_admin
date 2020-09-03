<template>
    <md-table md-card>
        <md-table-row>
            <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
            <md-table-head ></md-table-head>
        </md-table-row>
        <md-table-row  v-for="(paymentMethod, index) in paymentMethods" :key="paymentMethod.id" >
            <md-table-cell>{{ index + 1 }}</md-table-cell>
            <md-table-cell>{{ paymentMethod.name }}</md-table-cell>
            <md-table-cell>{{ paymentMethod.nameEn }}</md-table-cell>
            
            <md-table-cell>
                <md-button class="md-just-icon md-simple md-primary" @click="showDetails(paymentMethod)">
                    <md-icon>edit</md-icon>
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
</template>

<script>

export default {
    props: {
        paymentMethods: Array,
        onEdit: Function
    },
    data: () => ({
        tblHeaders: ['#', 'Vietnamese Name', 'English Name'],
    }),
    methods: {
        showDetails: function(paymentMethod){
            this.onEdit(paymentMethod)
        },
    }
}
</script>

<style>

</style>