<template>
  <div
    class="sidebar"
    :data-color="activeColor"
    :data-image="backgroundImage"
    :style="sidebarStyle"
  >
    <div class="logo">
      <a href="#" class="simple-text logo-mini">
        <div class="logo-img">
          <img :src="imgLogo" alt="Wstore Logo" />
        </div>
      </a>

      <a
        href="/"
        target="_blank"
        class="simple-text logo-normal"
      >
        {{ title }}
      </a>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
          >
          </sidebar-link>
        </slot>
      </md-list>
    </div>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  components: {
    SidebarLink
  },
  props: {
    title: {
      type: String,
      default: "WStore"
    },
    backgroundImage: {
      type: String,
      default: "/assets/img/sidebar-4.jpg"
    },
    imgLogo: {
      type: String,
      default: '/assets/img/wstore_avatar.jpg'
    },
    activeColor: {
      type: String,
      default: "purple",
      validator: value => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`
      };
    }
  }
};
</script>
<style>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}

.logo div.logo-img{
  width: 45px!important;
  height: 45px!important;
  margin-right: 5px!important;
}

.logo div.logo-img img{
  display: inline-block;
  width: 100%!important;
  height: 100%!important;
}
</style>
