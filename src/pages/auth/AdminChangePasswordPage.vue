<template>
    <div class="content">
        <h2 class="my-page-header">CHANGE PASSWORD ADMIN</h2>
         <md-card class="my-card">
            <md-card-header :data-background-color="'purple'" >
                <h4 class="title">Change Password Form</h4>
            </md-card-header>

            <md-card-content>
                <div v-if="isLoading" style="text-align: center">
                    <md-progress-spinner md-mode="indeterminate" style="margin: auto"></md-progress-spinner>
                </div>
                <div v-if="!isLoading">
                    <form class="md-layout" @submit.prevent="changePassword">
                        <md-card class="">
                            <md-card-content>
                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item size-100">
                                        <md-field >
                                            <label for="username">Username</label>
                                            <md-input name="username" id="username" v-model="user.username" />
                                        </md-field>
                                    </div>
                                </div>

                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item size-100">
                                        <md-field>
                                            <label for="password">Password</label>
                                            <md-input type="password" name="password" id="password"  v-model="user.password" />
                                        </md-field>
                                    </div>
                                
                                </div>
                                <div class="md-layout md-gutter">
                                    <div class="md-layout-item size-100">
                                        <md-field>
                                            <label for="newPassword">New Password</label>
                                            <md-input type="password" name="newPassword" id="newPassword"  v-model="user.newPassword" />
                                        </md-field>
                                    </div>
                                </div>
                            </md-card-content>

                            <md-card-actions>
                                    <md-button type="submit" class="md-primary">Submit</md-button>
                            </md-card-actions>
                        </md-card>
                    </form>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>

import AuthService from '../../services/auth.service';
import { isEmpty } from '@/utils/validations.js';
import { showSuccessMsg, showErrors, showConfirm } from '../../utils/alert';
import { getErrorsFromResponse } from '../../utils/errors';
import { SERVER_ERROR_MESSAGE } from '../../utils/constants';
import { clearAuthorization } from '../../utils/auth';
import { mapActions } from 'vuex';

export default {
    components: {
       
    },
    data: () => ({
        user: { 
            username: '',
            password: '' ,
            newPassword: ''
        },
        isLoading: false,
    }),
    methods: {
        ...mapActions({
            setIsAuthorized: 'auth/setIsAuthorized'
        }),
        showErrorsMessage: function(res){
            
        },
        
        changePassword: async function(){
            const res = await showConfirm({
                title: 'Are you sure to change current password?',
                text: 'New Password: ' + this.user.newPassword
            })
            if(res){
                this.isLoading = true;
                try {
                    const res = await AuthService.changePasswordAdmin(this.user);
                    const { success, errors } = res.data;
                    if(success == '1') {
                        showSuccessMsg({
                            title: 'Change Password Success!',
                            text: ''
                        })
                        clearAuthorization();
                        setTimeout(() => {
                            this.$router.go('/login');
                        }, 2000);
                    } else {
                        showErrors({
                            title: 'Change Password Fail!',
                            text: Object.values(errors).join('\n')
                        })
                    }
                } catch (error) {
                    showErrors({
                        title: 'Change Password Fail!',
                        text: 'Username and password do not match!'
                    })
                }
                this.isLoading = false;
            }
        },
       
    },
    beforeCreate(){
        AuthService.testAuthorization();    
    }
   
}
</script>

<style>


</style>