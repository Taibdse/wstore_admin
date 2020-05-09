<template>
  <div  class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar v-if="isAuthorized">
      <mobile-menu slot="content"></mobile-menu>
      <!-- <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link> -->
      <sidebar-link to="/information">
        <!-- <md-icon>person</md-icon> -->
        <i class="fas fa-store"></i>
        <p>Store</p>
      </sidebar-link>
      <sidebar-link to="/products">
        <!-- <md-icon>dashboard</md-icon> -->
        <i class="fab fa-product-hunt"></i> 
        <p>Products</p>
      </sidebar-link>
      <sidebar-link to="/categories">
        <!-- <md-icon>dashboard</md-icon> -->
        <i class="fas fa-list-alt"></i> 
        <p>Categories</p>
      </sidebar-link>
      <sidebar-link to="/orders">
        <!-- <md-icon>shopping_cart</md-icon> -->
        <i class="fas fa-shopping-cart"></i> 
        <p>Orders</p>
      </sidebar-link>
      <sidebar-link to="/reviews">
        <!-- <md-icon>dashboard</md-icon> -->
        <i class="fas fa-users"></i> 
        <p>Reviews</p>
      </sidebar-link>
       <sidebar-link to="/news">
        <!-- <md-icon>person</md-icon> -->
        <i class="fas fa-newspaper"></i> 
        <p>News</p>
      </sidebar-link>
      <sidebar-link to="/policies">
        <!-- <md-icon>person</md-icon> -->
        <i class="fas fa-file-contract"></i> 
        <p>Exchange Policy</p>
      </sidebar-link>
      
       
      <sidebar-link to="/shippings">
        <!-- <md-icon>person</md-icon> -->
        <i class="fas fa-truck"></i> 
        <p>Shippings</p>
      </sidebar-link>
      <sidebar-link to="/website" style="margin-bottom: 40px">
        <i class="fab fa-internet-explorer"></i>
        <p>Website</p>
      </sidebar-link>
      
      <!-- <sidebar-link to="/sales">
        <md-icon>attach_money</md-icon>
        <p>Sales</p>
      </sidebar-link> -->
      <!-- <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
      <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link> -->
    </side-bar>

    <div :class="{ 'main-panel': true, 'width-cover': !isAuthorized }" >
      <top-navbar v-if="isAuthorized"></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="isAuthorized"></content-footer>
    </div>
  </div>
</template>

<style lang="css" scoped>
.md-list-item .router-link-active i{
  color: #fff!important;
}


</style>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  data: () => ({
    // ...mapState(['isAuthorized'])
  }),
  computed: {
    ...mapGetters(['isAuthorized'])
  }
};
</script>
