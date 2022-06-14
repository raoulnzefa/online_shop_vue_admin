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
      array:[],
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
      let nowDate = new Date()
      this.array = []
      let year = nowDate.getFullYear()
      let mon = nowDate.getMonth() + 2
      for (let i = 0; i < 6; i++) {
        mon = mon - 1
        if (mon <= 0) {
          year = year - 1
          mon = mon + 12
        }
        if (mon < 10) {
          mon = '0' + mon
        }
        this.array[5-i] = year + '-' + mon
      }
      var option = {

        // title: {
        //   text: "半年内的书城情况",
        // },
        xAxis: {
          data: this.array,
            //       ["SevenAgo", "SixAgo", "FiveAgo", "FourAgo", "ThreeAgo", "TwoAgo",
            // "OneAgo"],
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
  getdate(){

  }
};
</script>
