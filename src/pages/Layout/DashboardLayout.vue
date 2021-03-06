<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar v-if="isAuthorized">
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/orders">
        <i class="fas fa-shopping-cart"></i>
        <p>Orders</p>
      </sidebar-link>
      <sidebar-link to="/products">
        <i class="fab fa-product-hunt"></i>
        <p>Products</p>
      </sidebar-link>
      <sidebar-link to="/categories">
        <i class="fas fa-list-alt"></i>
        <p>Categories</p>
      </sidebar-link>
      <sidebar-link to="/reviews">
        <i class="fas fa-users"></i>
        <p>Reviews</p>
      </sidebar-link>
      <sidebar-link to="/tips">
        <i class="fas fa-lightbulb"></i>
        <p>Tips</p>
      </sidebar-link>
      <sidebar-link to="/news">
        <i class="fas fa-newspaper"></i>
        <p>News</p>
      </sidebar-link>

      <sidebar-link to="/customer">
        <i class="fas fa-users"></i>
        <p>Customer</p>
      </sidebar-link>
      <sidebar-link to="/payment-method">
        <i class="fas fa-money-check-alt"></i>
        <p>Payment Method</p>
      </sidebar-link>
      <sidebar-link to="/policies">
        <i class="fas fa-file-contract"></i>
        <p>Policies</p>
      </sidebar-link>
      <sidebar-link to="/shippings" style="margin-bottom: 40px">
        <i class="fas fa-truck"></i>
        <p>Shippings</p>
      </sidebar-link>
    </side-bar>
    <div :class="{ 'main-panel': true, 'width-cover': !isAuthorized }">
      <top-navbar v-if="isAuthorized"></top-navbar>
      <dashboard-content> </dashboard-content>
      <!-- <content-footer></content-footer> -->
    </div>
  </div>
</template>

<style lang="css" scoped>
.md-list-item .router-link-active i {
  color: #fff !important;
}
</style>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters(["isAuthorized"]),
  },
};
</script>
