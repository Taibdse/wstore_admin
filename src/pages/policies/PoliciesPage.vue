<template>
  <div class="content">
        <h2 class="my-page-header">Policies</h2>
        <div class="md-layout">
             <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Policies List</h4>
                </md-card-header>
                <md-card-content>
                    <div v-show="isLoading" style="text-align: center">
                        <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                    </div>
                    <div v-show="policies.length !== 0">
                        <PoliciesList :policies="policies" />
                    </div>
                    <div v-show="!isLoading && policies.length === 0">
                        <h3 style="text-align: center">Can not find policies</h3>
                    </div>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>
import PoliciesList from './PoliciesList';
import PolicyService from '../../services/policy.service';

export default {
    components: {
        PoliciesList
    },

    async created(){
        this.getPolices();
    },

    data: () => ({
        policies: [],
        isLoading: false,
    }),

    methods: {
        getPolices: async function(){
            this.isLoading = true;
            try {
                const res = await PolicyService.getPolices();
                console.log(res);
                this.policies = res.data;
            } catch (error) {
                this.policies = [];
            }
            this.isLoading = false;
        },
    }
}
</script>

<style>

</style>