<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :lineChartData="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import {apiSaleDataInfo} from  "@/api/sales.js";
import { messageInfo } from "@/utils/MessageInfo";

const chartData = {
  newVisitis: {
    actualData: [50, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    LineChart,
  },
  data() {
    return {
      lineChartData: chartData.newVisitis.actualData,
      allSaleData:{
        newVisitis: {
          actualData: [],
        },
        messages: {
          actualData: [],
        },
        purchases: {
          actualData: [],
        },
        shoppings: {
          actualData: [],
        },
    },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = this.allSaleData[type];
    },
    initData() {
      apiSaleDataInfo().then((res) => {
        if (res.status) {
          this.allSaleData=res.data;
          this.lineChartData = this.allSaleData.newVisitis;
        } else {
          messageInfo({ type: "error", message: res.message });
        }
      });
    },

  },
};
</script>

<style scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
