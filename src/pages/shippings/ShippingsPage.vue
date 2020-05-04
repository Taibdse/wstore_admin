<template>
    <div class="content">
        <h2 class="my-page-header">Shippings</h2>
        <div class="md-layout">
             <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Shippings List</h4>
                </md-card-header>
                <md-card-content>
                    <div v-show="isLoading" style="text-align: center">
                        <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                    </div>
                    <div v-show="!isLoading && shippings.length !== 0">
                        <ShippingsList :shippings="shippings" />
                    </div>
                    <div v-show="!isLoading && shippings.length === 0">
                        <h3 style="text-align: center">Can not find shippings</h3>
                    </div>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>

import ShippingService from '../../services/shipping.service';
import ShippingsList from './ShippingsList';

export default {
    
    components: {
        ShippingsList
    },

    async created(){
        this.getShippings();
    },

    data: () => ({
        shippings: [],
        isLoading: false,
    }),

    methods: {
        getShippings: async function(){
            this.isLoading = true;
            try {
                const res = await ShippingService.getShippings();
                this.shippings = res.data;
            } catch (error) {
                this.shippings = [];
            }
            this.isLoading = false;
        },
    }
}
</script>

<style>



</style>