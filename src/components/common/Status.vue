<template>
  <div>
    <strong v-if="value">
      <md-icon class="text-success">check</md-icon>
    </strong>
    <strong v-if="!value">
      <md-icon class="text-danger">error_outline</md-icon>
    </strong>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
};
</script>

<style>

</style>