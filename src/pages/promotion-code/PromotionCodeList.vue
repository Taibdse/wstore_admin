<template>
  <md-table md-card>
    <md-table-row>
      <md-table-head v-for="(header, index) in tblHeaders" :key="index">{{
        header
      }}</md-table-head>
      <md-table-head></md-table-head>
    </md-table-row>
    <md-table-row v-for="promotionCode in promotionCodes" :key="promotionCode.id">
      <md-table-cell>{{ promotionCode.index }}</md-table-cell>
      <md-table-cell>{{ promotionCode.displayName }}</md-table-cell>
      <md-table-cell>{{ promotionCode.code }}</md-table-cell>
      <md-table-cell>{{ promotionCode.quantity }}</md-table-cell>
      <md-table-cell>{{ promotionCode.usedCount }}</md-table-cell>
      <md-table-cell>{{ formatVNDatetime(promotionCode.fromDate) }}</md-table-cell>
      <md-table-cell>{{ formatVNDatetime(promotionCode.toDate) }}</md-table-cell>
      <md-table-cell>{{ toMoneyFormat(promotionCode.amount) }}</md-table-cell>
      <md-table-cell>{{ promotionCode.type }}</md-table-cell>
      <md-table-cell>
        <Status :value="promotionCode.active" />
      </md-table-cell>
      <md-table-cell>
        <md-button
          class="md-just-icon md-simple md-primary"
          @click="showDetails(promotionCode)"
        >
          <md-icon>edit</md-icon>
          <!-- <md-tooltip md-direction="top">Edit</md-tooltip> -->
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { toMoneyFormat } from "@/utils/strings.js";
import { formatVNDatetime } from "../../utils/time";
import Status from '@/components/common/Status';
import { PathRouteConstants } from '../../routes/pathRoutes';

export default {
  components: {
    Status
  },
  props: {
    promotionCodes: Array,
    isLoading: Boolean,
  },
  data: () => ({
    tblHeaders: [
      "#",
      "Name",
      "Code",
      "Quantity",
      "Used count",
      "From Date",
      "To Date",
      "Amount",
      "Type",
      "Active",
    ],
    // sortIndexes: {},
  }),
  methods: {
    showDetails: function (promotionCode) {
      this.$router.push(PathRouteConstants.promotionCodeDetailsRoute + '/' + promotionCode.id);
    },
    toMoneyFormat,
    formatVNDatetime
  },
  //  watch: {
  //     promotionCodes: function(newPromotionCodes){
  //         this.sortIndexes = newPromotionCodes.reduce((acc, p) => ({ ...acc, [p.id]: p.sortIndex }), {});
  //     },
  //   }
};
</script>

<style>
</style>