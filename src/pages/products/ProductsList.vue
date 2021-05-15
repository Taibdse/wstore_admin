<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head class="mw-100"></md-table-head>
    </md-table-row>
    <md-table-row v-for="product in products" :key="product.id">
      <md-table-cell>{{ product.index }}</md-table-cell>
      <md-table-cell>{{ product.name }}</md-table-cell>
      <md-table-cell>
        <img :src="formatImageUrl(product.mainImage)" class="img-fluid" />
      </md-table-cell>
      <md-table-cell>{{ product.availableSizes }}</md-table-cell>
      <md-table-cell>{{ product.color }}</md-table-cell>
      <md-table-cell>
        <strong class="text-primary"
          >{{ toMoneyFormat(product.price) }} đ</strong
        >
      </md-table-cell>
      <md-table-cell>
        <Status :value="product.available" />
      </md-table-cell>
      <md-table-cell>
        <Status :value="product.active" />
      </md-table-cell>
      <md-table-cell>{{ product.category.name }}</md-table-cell>
      <md-table-cell>
        <md-field>
          <md-input
            type="number"
            style="width: 60px"
            v-model="sortIndexes[product.id]"
          />
        </md-field>
      </md-table-cell>
      <md-table-cell class="px-0">
        <ActionButton
          icon="language"
          tooltip="Preview"
          classNames="md-danger"
          @click="handlePreview(product)"
        />
        <ActionButton
          icon="edit"
          tooltip="Edit"
          classNames="md-primary"
          @click="showDetails(product)"
        />
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { ActionButton, Status } from "@/components";

import { toMoneyFormat } from "@/utils/strings.js";
import { formatImageUrl } from "../../utils/strings";
import { openNewTab } from '../../utils/utils';
import { APP_ROOT_DOMAIN } from '../../configs/api';

export default {
  components: {
    Status,
    ActionButton,
  },
  props: {
    products: Array,
    isLoading: Boolean,
  },
  data: () => ({
    tblHeaders: [
      "#",
      "Name",
      "Image",
      "Sizes",
      "Colors",
      "Price",
      "Available",
      "Active",
      "Category",
      "Sort Index",
    ],
    sortIndexes: {},
  }),
  methods: {
    showDetails: function (product) {
      this.$router.push("/products/" + product.slug);
    },
    handlePreview: function(p) {
      openNewTab(APP_ROOT_DOMAIN + '/products/' + p.slug);
    },
    toMoneyFormat,
    formatImageUrl,
  },
  watch: {
    products: function (newProducts) {
      this.sortIndexes = newProducts.reduce(
        (acc, p) => ({ ...acc, [p.id]: p.sortIndex }),
        {}
      );
    },
  },
};
</script>

<style>
.d-inline-block {
  display: inline-block !important;
}
.px-0 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>