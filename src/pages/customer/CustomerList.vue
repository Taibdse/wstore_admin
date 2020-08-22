<template>
    <md-table md-card>
      <md-table-row>
        <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{ header }}</md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>
      <md-table-row  v-for="(customer) in customers" :key="customer.id">
        <md-table-cell>{{ customer.index }}</md-table-cell>
        <md-table-cell>
            {{ customer.fullName }}
        </md-table-cell>
        <md-table-cell>
         {{ customer.phone }}
        </md-table-cell>
        <md-table-cell>{{ customer.email }}</md-table-cell>
        <md-table-cell>{{ customer.address }}</md-table-cell>
        <md-table-cell>{{ customer.district }}, {{ customer.province }}</md-table-cell>
      
        <md-table-cell>
            <md-button class="md-just-icon md-simple md-primary" @click="showDetails(customer)">
              <md-icon>edit</md-icon>
              <md-tooltip md-direction="top">See order history</md-tooltip>
            </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
</template>

<script>

export default {
    props: {
        customers: Array,
    },
    data: () => ({
        tblHeaders: ['#', 'Fullname', 'Phone', 'Email', 'Address', 'Province'],
    }),
    methods: {
        showDetails: function(customer){
   
        },
    }
}
</script>

<style>

</style>