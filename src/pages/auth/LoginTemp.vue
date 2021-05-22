<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>
              <!-- <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button> -->
              <p slot="description" class="description">
                Wstore's Admin System
              </p>
              <div slot="inputs">
                <form
                  class="md-layout text-center"
                  @submit.prevent="login"
                  autocomplete="off"
                >
                  <md-field class="md-form-group">
                    <md-icon>face</md-icon>
                    <label>Username...</label>
                    <md-input
                      name="username"
                      id="username"
                      v-model="user.username"
                    ></md-input>
                  </md-field>
                  <md-field class="md-form-group">
                    <md-icon>lock_outline</md-icon>
                    <label>Password...</label>
                    <md-input
                      type="password"
                      name="password"
                      id="password"
                      v-model="user.password"
                    ></md-input>
                  </md-field>
                </form>
              </div>

              <md-button
                @click="login"
                type="submit"
                slot="footer"
                class="md-simple md-success md-lg"
                :disabled="isLoading"
              >
                {{ isLoading ? "Logging in..." : "Get Started" }}
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginCard from "@/components/Cards/LoginCard";
import AuthService from "../../services/auth.service";
import { showSuccessMsg, showErrors } from "../../utils/alert";
import { setAuthorization } from "../../utils/auth";
import { mapActions } from "vuex";
import { PathRouteConstants } from "../../routes/pathRoutes";

export default {
  components: {
    LoginCard,
  },
  bodyClass: "login-page",
  data: () => ({
    user: {
      username: "",
      password: "",
    },
    isLoading: false,
  }),
  methods: {
    ...mapActions({
      setIsAuthorized: "auth/setIsAuthorized",
    }),
    login: async function () {
      if (this.isLoading) return;

      this.isLoading = true;
      try {
        const res = await AuthService.loginAdmin(this.user);
        const { jwtToken } = res.data;
        setAuthorization(jwtToken);
        this.setIsAuthorized(true);

        showSuccessMsg({
          title: "Login Success!",
          text: "You are now authorized!",
        });

        setTimeout(() => {
          this.$router.push(PathRouteConstants.ordersRoute);
        }, 500);
      } catch (error) {
        showErrors({
          title: "Login Fail!",
          text: "Please check your username and password again!",
        });
        this.user = {
          ...this.user,
          password: "",
        };
        this.setIsAuthorized(false);
      }
      this.isLoading = false;
    },
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg"),
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
};
</script>

<style lang="css"></style>
