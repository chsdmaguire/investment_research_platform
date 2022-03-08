<template>
<v-container>
 <div id="chart-container"></div> 
</v-container>

</template>

<script>
import { createChart } from 'lightweight-charts';

export default {
  head() {
    return {
      script: [
        {
          src: 'https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js',
          defer: true,
          callback: () => {this.isChartLoaded = true}
        }
        
      ]
    }
  },
    data() {
        return {
          chart: null,
          lineSeries: null,
          isChartLoaded: false,
        }
    },
    methods: {
      drawChart() {
        let { LightWeightCharts } = this.$lwcCore()
        this.chart = LightWeightCharts.createChart(document.getElementById('chart-container'), { width: 400, height: 300 });
        this.lineSeries = this.chart.addLineSeries();
        this.lineSeries.setData([
            { time: '2019-04-11', value: 80.01 },
            { time: '2019-04-12', value: 96.63 },
            { time: '2019-04-13', value: 76.64 },
            { time: '2019-04-14', value: 81.89 },
            { time: '2019-04-15', value: 74.43 },
            { time: '2019-04-16', value: 80.01 },
            { time: '2019-04-17', value: 96.63 },
            { time: '2019-04-18', value: 76.64 },
            { time: '2019-04-19', value: 81.89 },
            { time: '2019-04-20', value: 74.43 },
        ]);
      },


  },
    mounted() {
      // this.drawChart();     
    }
}


</script>

<style scoped>


</style>