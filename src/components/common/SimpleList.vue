<template>
  <ul style="text-align: left">
    <li v-for="(it, index) in data" :key="index">
      {{ it }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: Array,
    style: String,
  },
};
</script>

<style>
</style>