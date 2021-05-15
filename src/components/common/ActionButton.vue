<template>
  <md-button
    @click="handleClick()"
    :class="`md-icon-button md-raised ${classNames} action-btn`"
  >
    <md-icon>{{ icon }}</md-icon>
    <md-tooltip md-direction="top">{{ tooltip }}</md-tooltip>
  </md-button>
</template>

<script>
export default {
  props: {
    icon: String,
    tooltip: String,
    classNames: String,
  },
  methods: {
    handleClick: function () {
      this.$emit('click');
    },
  },
};
</script>

<style>
.action-btn {
  width: 35px !important;
  min-width: 35px !important;
  height: 35px !important;
  border-radius: 50% !important;
  display: inline-block !important;
  margin-right: 5px !important;
}
</style>