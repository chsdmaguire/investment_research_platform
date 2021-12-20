<template>
  <v-container fluid>
      <v-layout row wrap justify-center>
          <v-flex lg3  class="px-4">
<div id="nasdaq-chart" class="chart"> </div>
          </v-flex>
          <v-flex lg3 class="px-4">
           <div id="sp500-chart" class="chart"> </div>
          </v-flex>
          <v-flex lg3  class="px-4">
            <div id="dowJones-chart" class="chart"> </div>
          </v-flex>
          <v-flex lg3  class="px-4">
           <div id="vix-chart" class="chart"> </div>
          </v-flex>
      </v-layout>
      <!-- <v-row justify-content="center" align-content="center">
          
      </v-row >
       <v-row justify-content="center" align-content="center">

      </v-row>
       <v-row justify-content="center" align-content="center">

      </v-row>
       <v-row justify-content="center" align-content="center">

      </v-row> -->

  </v-container>
</template>

<script>
import { createChart, CrosshairMode, PriceScaleMode } from 'lightweight-charts';
// list of index symbols: SP500, VIXCLS (cboe volatility index), 
// DJIA, WILL5000INDFC (wilshire 5000), NASDAQCOM

// ADD 4 MORE CHARTS (VIX, SMALL CAP (TOTAL GROWTH VALUE) MIDD, & LARGE)
// CHANGE PULL SETTINGS SO REQUESTS GO BACK TO 2015
// change colors for lines
// add that gradient area coloring below lines for charts with 1

export default {
data() {
    return {
        SP500: [],
        dowJones: [],
        nasDaq: [],
        vix: [],

        nasChart: null,
        spChart: null,
        djChart: null,
        vixChart: null,

        SPLineSeries: null,
        NasLineSeries: null,
        DJLineSeries: null,
        vixLineSeries: null,
    }
    },

    methods: {
       async showNasData() {
             const nasResponse = await this.$axios.get('/api/fred/db/index/NASDAQCOM');
            this.nasDaq = nasResponse.data
            this.nasChart = createChart(document.getElementById('nasdaq-chart'), { width: 300, height: 150 });
            this.NasLineSeries = this.nasChart.addAreaSeries({
                title: 'Nasdaq',
                visible: true,
                color: '#2296f3'
            });
            this.NasLineSeries.setData(this.nasDaq)
            this.nasChart.applyOptions({
                    layout: {
                    backgroundColor: '#ffffff',
                    textColor: '191a19',
                },
                drawTicks: true,
                grid: {
                    vertLines: {
                    color: '#334158',
                    visible: false,
                    },
                    horzLines: {
                    color: '#334158',
                    visible: false,
                    },
                },  
                watermark: {
                        color: '#191a19',
                        visible: true,
                        text: 'Nasdaq Composite',
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        horzAlign: 'right',
                        vertAlign: 'top',
                    },
            })
       },
    
        async showSPData() {
            const spResponse = await this.$axios.get('/api/fred/db/index/SP500');
            this.SP500 = spResponse.data
            this.spChart = createChart(document.getElementById('sp500-chart'), { width: 300, height: 150 });
            this.SPLineSeries = this.spChart.addAreaSeries({
              title: 'S&P 500',
              visible: true,
              color: '#2296f3'
            });
            this.SPLineSeries.setData(this.SP500)
            this.spChart.applyOptions({
                    layout: {
                    backgroundColor: '#ffffff',
                    textColor: '191a19',
                },
                drawTicks: true,
                grid: {
                    vertLines: {
                    color: '#334158',
                    visible: false,
                    },
                    horzLines: {
                    color: '#334158',
                    visible: false,
                    },
                },
                watermark: {
                        color: '#191a19',
                        visible: true,
                        text: 'S&P 500 Index',
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        horzAlign: 'right',
                        vertAlign: 'top',
                    },      
            })
        },

        async showDJData() {
            const DjResponse = await this.$axios.get('/api/fred/db/index/DJIA');
            this.dowJones = DjResponse.data
            this.djChart = createChart(document.getElementById('dowJones-chart'), { width: 300, height: 150 });
            this.DJLineSeries = this.djChart.addAreaSeries({
                title: 'Dow Jones',
                visible: true,
                color: '#2296f3'
            });
            this.DJLineSeries.setData(this.dowJones)
            this.djChart.applyOptions({
                    layout: {
                    backgroundColor: '#ffffff',
                    textColor: '191a19',
                },
                drawTicks: true,
                grid: {
                    vertLines: {
                    color: '#334158',
                    visible: false,
                    },
                    horzLines: {
                    color: '#334158',
                    visible: false,
                    },
                },
                watermark: {
                        color: '#191a19',
                        visible: true,
                        text: 'Dow Jones Industrial Average',
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        horzAlign: 'right',
                        vertAlign: 'top',
                    },
            })
    },

        async showVixData() {
        const vixResponse = await this.$axios.get('/api/fred/db/index/VIXCLS');
        this.vix = vixResponse.data
        this.vixChart = createChart(document.getElementById('vix-chart'), { width: 300, height: 150 });
        this.vixLineSeries = this.vixChart.addAreaSeries({
            title: 'VIX',
            visible: true,
            color: '#2296f3'
        });
        this.vixLineSeries.setData(this.vix)
        this.vixChart.applyOptions({
                    layout: {
                    backgroundColor: '#ffffff',
                    textColor: '191a19',
                },
                drawTicks: true,
                grid: {
                    vertLines: {
                    color: '#334158',
                    visible: false,
                    },
                    horzLines: {
                    color: '#334158',
                    visible: false,
                    },
                },
            watermark: {
                    color: '#191a19',
                    visible: true,
                    text: 'CBOE Volatility Index',
                    fontFamily: 'Roboto',
                    fontSize: 14,
                    horzAlign: 'right',
                    vertAlign: 'top',
                },
        })
    },

},

    mounted() {
        this.showSPData();
        this.showNasData();
        this.showDJData();
        this.showVixData();
    }
}
</script>

<style scoped>
/* .chart {
    margin-top: 10%;
    margin-bottom: 5%;
} */

</style>