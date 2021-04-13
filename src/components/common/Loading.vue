<template>
    <loading
      :active="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      :is-full-page="true"
      loader="spinner"
      width="50"
      height="50"
      color="#9C27B0"
    ></loading>
</template>
 
<script>
// Import component
import Loading from "vue-loading-overlay";
export default {
  props: {
    isLoading: Boolean,
  },
  components: {
    Loading,
  },
  methods: {
    onCancel() {
      // console.log("User cancelled the loader.");
    },
  },
};
</script> 