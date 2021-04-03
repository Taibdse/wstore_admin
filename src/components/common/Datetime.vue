<template>
  <Datetime
    input-style="width: 100%; height: 30px; border: none; border-bottom: 1px solid #ccc"
    format="dd/MM/yyyy HH:mm"
    v-model="value"
    type="datetime"
    class="datetime-theme"
  />
</template>

<script>
import { Datetime } from "vue-datetime";

export default {
  components: {
    Datetime,
  },
  props: {
    value: {
      type: String,
      required: false,
    },
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
  },
};
</script>

<style>
.datetime-theme .vdatetime-popup__header,
.datetime-theme .vdatetime-calendar__month__day--selected > span > span,
.datetime-theme .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #ff9800;
}

.datetime-theme .vdatetime-year-picker__item--selected,
.datetime-theme .vdatetime-time-picker__item--selected,
.datetime-theme .vdatetime-popup__actions__button {
  color: #ff9800;
}
</style>