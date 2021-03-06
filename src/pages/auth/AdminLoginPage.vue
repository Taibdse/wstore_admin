<template>
  <div class="content">
    <h2 class="my-page-header">LOGIN ADMIN</h2>
    <md-card class="my-card">
      <md-card-header :data-background-color="'purple'">
        <h4 class="title">Login Form</h4>
      </md-card-header>

      <md-card-content>
        <div v-if="isLoading" style="text-align: center">
          <md-progress-spinner
            md-mode="indeterminate"
            style="margin: auto"
          ></md-progress-spinner>
        </div>
        <div v-if="!isLoading">
          <form class="md-layout" @submit.prevent="login">
            <md-card class="">
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item size-100">
                    <md-field>
                      <label for="username">Username</label>
                      <md-input
                        name="username"
                        id="username"
                        v-model="user.username"
                      />
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item size-100">
                    <md-field>
                      <label for="password">Password</label>
                      <md-input
                        type="password"
                        name="password"
                        id="password"
                        v-model="user.password"
                      />
                    </md-field>
                  </div>
                </div>
              </md-card-content>

              <md-card-actions>
                <md-button type="submit" class="md-primary">Login</md-button>
              </md-card-actions>
            </md-card>
          </form>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import AuthService from "../../services/auth.service";
import { isEmpty } from "@/utils/validations.js";
import { showSuccessMsg, showErrors } from "../../utils/alert";
import { getErrorsFromResponse } from "../../utils/errors";
import { SERVER_ERROR_MESSAGE } from "../../utils/constants";
import { setAuthorization } from "../../utils/auth";
import { mapActions } from "vuex";

export default {
  components: {},
  data: () => ({
    user: {
      username: "",
      password: "",
    },
    isLoading: false,
  }),
  methods: {
    ...mapActions(["setIsAuthorized"]),
    login: async function () {
      this.isLoading = true;
      try {
        const res = await AuthService.loginAdmin(this.user);
        const { jwtToken, role } = res.data;
        setAuthorization(jwtToken);
        this.setIsAuthorized(true);

        showSuccessMsg({
          title: "Login Success!",
          text: "You are now authorized!",
        });

        setTimeout(() => {
          this.$router.push("/information");
        }, 2000);
      } catch (error) {
        showErrors({
          title: "Login Fail!",
          text: "Please check your username and password again!",
        });
        this.setIsAuthorized(false);
      }
      this.isLoading = false;
    },
  },
  async created() {},
};
</script>

<style>
</style>


