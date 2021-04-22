<template>
  <ul class="nav nav-mobile-menu">
    <!-- <li>
      <md-field>
        <label>Search</label>
        <md-input v-model="search" type="text"></md-input>
      </md-field>
    </li> -->
    <!-- <li>
      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <i class="material-icons">dashboard</i>
        <p>Dashboard</p></a
      >
    </li> -->
    <li style="backgound-color: red; padding-left: 5px">
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="fas fa-user"></i>
          <span style="margin-top: 10px">Account</span>
          <!-- <span class="notification">5</span> -->
          <!-- <p class="hidden-lg hidden-md">person</p> -->
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
    </li>
    <li style="backgound-color: red; padding-left: 5px">
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="fas fa-bell"></i>
          <span style="margin-top: 10px">Settings</span>
          <!-- <span class="notification">5</span> -->
          <!-- <p class="hidden-lg hidden-md">person</p> -->
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li>
            <a href="#" @click="() => navigateRoute('/information')">Store</a>
          </li>
          <li>
            <a href="#" @click="() => navigateRoute('/website')">Website</a>
          </li>
          <li>
            <a href="#" @click="() => navigateRoute('/language')"
              >Multilingual Settings</a
            >
          </li>
        </ul>
      </drop-down>
    </li>
    <!-- <li>
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="material-icons">notifications</i>
          <span class="notification">5</span>
          <p>Notifications</p>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">Mike John responded to your email</a></li>
          <li><a href="#">You have 5 new tasks</a></li>
          <li><a href="#">You're now friend with Andrew</a></li>
          <li><a href="#">Another Notification</a></li>
          <li><a href="#">Another One</a></li>
        </ul>
      </drop-down>
    </li> -->
    <!-- <li>
      <a href="#" data-toggle="dropdown" class="dropdown-toggle"
        ><i class="material-icons">person</i>
        <p>Profile</p></a
      >
    </li> -->
  </ul>
</template>
<script>
import { clearAuthorization } from "../../utils/auth";
import { mapActions } from "vuex";
import { showConfirm } from "../../utils/alert";

export default {
  data() {
    return {
      search: null,
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      setIsAuthorized: "auth/setIsAuthorized",
    }),
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
