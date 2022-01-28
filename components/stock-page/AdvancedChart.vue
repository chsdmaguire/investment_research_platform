<template>
  <v-container fluid>
      <v-row justify="center" align="center">
          <v-col cols="12">
              <h1>
                  Advanced Chart
              </h1>
              <div>
                  <v-row>
                      <v-col cols="3">
                  <v-overflow-btn
                    :items="frequencyList"
                    v-model="frequency"
                    v-on:change="newFrequency"
                    label="Frequency"
                    dense
                    item-value="text"
                    width="100"
                    >
                    
                    </v-overflow-btn>
                      </v-col>
                  </v-row>
                  <div id="ticker-chart"></div>
              </div>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { createChart } from 'lightweight-charts';
const technicals = require('technicalindicators');
export default {
    data() {
        return {
            stockData: [],
            stockChart: null,
            candlestickSeries: null,
            frequency: '1M',
            frequencyList: [
                {text: '1M'},
                {text: '5M'},
                {text: '10M'},
                {text: '30M'},
                {text: '1H'},
                {text: '1D'},
                {text: '1W'},
                {text: '1M'},
            ]
        }
    },
    methods: {
        async getPriceData() {
            const ticker = this.$route.params.ticker.toUpperCase();
            const candleResponse =  await this.$axios.get(`/api/stock/technicals/${ticker}/one`);
            if(candleResponse.data.length > 0) {
                 candleResponse.data.forEach(bar => {
                this.stockData.push({
                    time: new Date(bar.date).getTime() / 1000,
                    open: Number(bar.open),
                    high: Number(bar.high),
                    low: Number(bar.low),
                    close: Number(bar.close)
                });
            });
   
            }
        
            this.stockChart = createChart(document.getElementById('ticker-chart'), { width: 900, height:400, 
            timeScale: {
                timeVisible: true
            }
            }
            );
            
            this.candlestickSeries = this.stockChart.addCandlestickSeries({
                title: ticker,
                visible: true,
                color: '#2296f3'
            });
            this.candlestickSeries.setData(this.stockData)
            this.stockChart.applyOptions({
                layout: {
                backgroundColor: '#253248',
                textColor: 'rgba(255, 255, 255, 0.9)',
            },
            grid: {
                vertLines: {
                color: '#334158',
                },
                horzLines: {
                color: '#334158',
                },
            },

        });
        },

        newFrequency() {
            const newData = [];
            switch(this.frequency) {
                case '1M':
                   this.candlestickSeries.setData(this.stockData);
                    break;
                case '5M':
                    newData.length = 0;
                    for (var i = 0; i < this.stockData.length; i += 5) {
                        const newFreq = this.stockData.slice(i, i +5);
                        newData.push({
                    time: newFreq[0].time,
                    open: newFreq[0].open,
                    high: Math.max.apply(Math, newFreq.map(function(o) {return o.high} )),
                    low: Math.min.apply(Math, newFreq.map(function(o) {return o.high} )),
                    close: newFreq[4].close,
                        })
                    };
                     this.candlestickSeries.setData(newData);
                     break;
                case '10M':
                    newData.length = 0;
                    for (var i = 0; i < this.stockData.length; i += 10) {
                        const newFreq = this.stockData.slice(i, i +10);
                        newData.push({
                    time: newFreq[0].time,
                    open: newFreq[0].open,
                    high: Math.max.apply(Math, newFreq.map(function(o) {return o.high} )),
                    low: Math.min.apply(Math, newFreq.map(function(o) {return o.high} )),
                    close: newFreq[9].close,
                        })
                    };
                     this.candlestickSeries.setData(newData);
                     break;
                case '30M':
                    newData.length = 0;
                    for (var i = 0; i < this.stockData.length; i += 10) {
                        const newFreq = this.stockData.slice(i, i +10);
                        newData.push({
                    time: newFreq[0].time,
                    open: newFreq[0].open,
                    high: Math.max.apply(Math, newFreq.map(function(o) {return o.high} )),
                    low: Math.min.apply(Math, newFreq.map(function(o) {return o.high} )),
                    close: newFreq[9].close,
                        })
                    };
                     this.candlestickSeries.setData(newData);
                     break;
                case '1H':
                    newData.length = 0;
                    for (var i = 0; i < this.stockData.length; i += 60) {
                        const newFreq = this.stockData.slice(i, i +60);
                        newData.push({
                    time: newFreq[0].time,
                    open: newFreq[0].open,
                    high: Math.max.apply(Math, newFreq.map(function(o) {return o.high} )),
                    low: Math.min.apply(Math, newFreq.map(function(o) {return o.high} )),
                    close: newFreq[59].close,
                        })
                    };
                     this.candlestickSeries.setData(newData);
                     break;
                case '1H':
                    newData.length = 0;
                    for (var i = 0; i < this.stockData.length; i += 60) {
                        const newFreq = this.stockData.slice(i, i +60);
                        newData.push({
                    time: newFreq[0].time,
                    open: newFreq[0].open,
                    high: Math.max.apply(Math, newFreq.map(function(o) {return o.high} )),
                    low: Math.min.apply(Math, newFreq.map(function(o) {return o.high} )),
                    close: newFreq[59].close,
                        })
                    };
                     this.candlestickSeries.setData(newData);
                     break;
            }
        }
    },
    mounted() {
        this.getPriceData();
    }
}
</script>

<style scoped>
.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

</style>