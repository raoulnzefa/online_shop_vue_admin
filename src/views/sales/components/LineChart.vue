<template>
  <div class="chart">
    <div id="mainChart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
export default {
  props: {
    lineChartData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: {},
    };
  },
  mounted() {
    this.initData();
    window.onresize = () => {
      this.chart.resize();
    };
  },
  watch: {
    lineChartData() {
      this.initData();
    },
  },
  methods: {
    initData() {
      this.chart = this.$echarts.init(document.getElementById("mainChart"));
      //配置图表
      var option = {
        // title: {
        //   text: "近几天的销售",
        // },
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "actual",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.lineChartData,
            animationDuration: 2000,
            animationEasing: "quadraticOut",
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>
