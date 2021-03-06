<template>
  <md-toolbar md-elevation="0" class="md-transparent my-top-navbar">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <md-list>
            <li class="md-list-item">
              <a
                href="#"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <a href="#" @click="() => navigateRoute('/information')"
                          >Store Info</a
                        >
                      </li>
                      <li>
                        <a href="#" @click="() => navigateRoute('/website')"
                          >W.Store Website</a
                        >
                      </li>
                      <li>
                        <a href="#" @click="() => navigateRoute('/language')"
                          >Multilingual Settings</a
                        >
                      </li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>
          </md-list>
          <md-list-item href="#" class="dropdown">
            <drop-down>
              <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                <i class="material-icons">person</i>
                <p class="hidden-lg hidden-md">person</p>
              </a>
              <ul class="dropdown-menu dropdown-menu-right">
                <li><a href="#" @click="handleLogout">Logout</a></li>
                <li>
                  <a href="#" @click="() => navigateRoute('/change-password')"
                    >Change Password</a
                  >
                </li>
              </ul>
            </drop-down>
          </md-list-item>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { showConfirm } from "../../utils/alert";
import { clearAuthorization } from "../../utils/auth";
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setIsAuthorized"]),
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    handleLogout: async function () {
      const res = await showConfirm({
        title: "Are you sure to logout wstore admin?",
        text: "",
      });
      if (res) {
        clearAuthorization();
        this.setIsAuthorized(false);
        this.$router.go("/login");
      }
    },
    navigateRoute: function (route) {
      this.$router.push(route);
    },
  },
};
</script>

<style lang="css">
.my-top-navbar {
  background-color: red;
}
</style>
