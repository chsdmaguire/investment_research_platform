<template>
<v-container class="mt-4 mb-12 mx-2" fluid>
        <v-row justify="start" align="center">
    <v-dialog v-model="dialog1" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">Technicals</v-btn>
      </template>

      <v-card tile>
        <v-card-title class="justify-center">
          Technical Indicators
        </v-card-title>
                <v-list>
                    <v-list-item-group>
                        <v-list-item>       
                            <v-list-item-content>
                                <v-list-item-title @click="showMA">Moving Average</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="showMA">Exponential Moving Average</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>                            
                    </v-list-item-group>
                </v-list>                    
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Financials</v-btn>
        </template>

        <v-card tile>
            <v-card-title class="justify-center">
            Financial Metrics
            </v-card-title>
                    <v-list>
                        <v-list-item-group>
                            <v-list-item>       
                                <v-list-item-content>
                                    <v-list-item-title @click="showMA">Gross Margin</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="showMA">Operating Margin</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>                            
                        </v-list-item-group>
                    </v-list>                    
            </v-card>
        </v-dialog>
    <v-dialog v-model="dialog3" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Alt. Data</v-btn>
        </template>

        <v-card tile>
            <v-card-title class="justify-center">
            Alternative Data
            </v-card-title>
                    <v-list>
                        <v-list-item-group>
                            <v-list-item>       
                                <v-list-item-content>
                                    <v-list-item-title @click="getInsiders">Insider Transactions</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="showMA">Analyst Recommendations</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="getEPS">EPS Estimates</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="showMA">Patent Filings</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="showMA">Twitter Mentions</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>  
                             <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="showMA">Twitter Sentiment</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                             <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="showMA">Reddit Mentions</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>  
                             <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="showMA">Reddit Sentiment</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>                                  
                        </v-list-item-group>
                    </v-list>                    
            </v-card>
        </v-dialog>
    <v-dialog v-model="dialog4" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Compare</v-btn>
        </template>

        <v-card tile>
            <v-card-title class="justify-center">
            Make Comparisons
            </v-card-title>
                    <v-list>
                        <v-list-item-group>
                            <v-list-item>       
                                <v-list-item-content>
                                    <v-list-item-title @click="showMA">S&P 500</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="showMA">NASDAQ</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>                            
                        </v-list-item-group>
                    </v-list>                    
            </v-card>
        </v-dialog>

           
            <v-spacer></v-spacer>
            <v-btn-toggle mandatory group dense>
                    <v-btn plain>5D</v-btn>
                    <v-btn plain>1M</v-btn>
                    <v-btn plain>3M</v-btn>
                    <v-btn plain>6M</v-btn>
                    <v-btn plain>1Y</v-btn>
                    <v-btn plain>3Y</v-btn>
                    <v-btn plain>5Y</v-btn>
                  </v-btn-toggle>
        </v-row>
    <v-row justify="center" align="center">
        <trading-vue 
        :title-txt="ticker"
        :data="chart"
        :overlays="overlays"
        :width="width" :height="height"
        ref="tv"
        :legend-buttons="['remove', 'settings']"
        v-on:legend-button-click="on_button_click"
        :toolbar="false">
        </trading-vue> 
    </v-row>
    <v-row>
    <v-btn class="primary" @click="getTwitterData">Twitter Sentiment</v-btn>
    <v-btn class="secondary" @click="getInsiders">insider transactions</v-btn>
    <v-btn class="error" @click="showMA">Moving Avg</v-btn>
    <v-btn class="primary" @click="getEPS">EPS</v-btn>
    <v-btn class="secondary" @click="showPatents">patents</v-btn>
    <v-btn class="errpr" @click="changeScale">scale</v-btn>
    </v-row>         
</v-container> 

</template>

<script>
import TradingVue from 'trading-vue-js';
import { DataCube } from 'trading-vue-js';
import TestOverlay from './TestOverlay.vue';
import Overlays from 'tvjs-overlays'
import simpleMovingAverage from './Calcs.js';
import BubbleOverlay from './BubbleOverlay';
import PatentsOverlay from './PatentsOverlay';
export default {
    components: { TradingVue },
    mixins: [simpleMovingAverage],
    data() {
        return {
            chart: {},
            props: ['width', 'height'],
            width: window.innerWidth - 300,
            height: window.innerWidth - 800,
            dialog1: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            ticker: '',
            candles: {
                ohlcv: [],
                onchart: [],
                offchart: [],
            },

            twitPosMentions: [],
            insideTransactions: [],

            overlays: [TestOverlay, BubbleOverlay, PatentsOverlay, Overlays['MOM'], Overlays['Histogram'], Overlays['Area51']],
            candleStickData: [],
            epsData: [],
            patentData: [],

            
        }
    },
    computed: {
        barWidth () {
            return window.innerWidth
        }
    },

    methods: {
        changeScale() {
            const logScale = {
                grid: {
                    logScale: true,
                }
            }
            this.chart.data.chart = {
                ...this.chart.data.chart,
                ...logScale
            }
            console.log(this.chart.data.chart);
        },
        showPatents() {
            const ticker = 'AAPL';
             this.$axios.get(`/stocks/patents/${ticker}`).then(res => {
                
                const arr = res.data.sort((a, b) => (a.publication_date > b.publication_date) ? 1: -1);
                var incrementer = 0;
                arr.forEach(item => {
                    const date = new Date(item.publication_date).getTime();
                      this.patentData.push([date, item.description, 0, null, incrementer])
                      incrementer += 0.1;
                      console.log(incrementer)
                    if(incrementer >= 1) {
                      incrementer = 0
                    }             
                })
             });
             console.log(this.patentData)
            this.candles.onchart.push({
        "name": "Data sections",
        "type": "Splitters",
        "data": this.patentData,
        "settings": {
            "legend": false
        }
    });
             this.chart = new DataCube(this.candles);
        },
        getEPS() {
            const ticker = 'AAPL';
            this.$axios.get(`/earnings/surpises/${ticker}`).then(res => {
                const arr = res.data.sort((a, b) => (a.period > b.period) ? 1: -1)
                arr.forEach(item => {
                    const date = new Date(item.period).getTime();
                    this.epsData.push([date, Number(item.actual)]);
                    this.epsData.push([date, Number(item.estimate)]);
                });
                });
                 this.candles.offchart.push({
                    name: 'EPS Data',
                    type: "BubbleOverlay",
                    data: this.epsData,
                    settings: {
                        estColor: '#249EBF',
                        actColor: '#f87991'
                    }
                });
                this.chart = new DataCube(this.candles)

        },
        showMA() {
            const prices = this.candles.chart.data;
            const smas = this.simpleMovingAverage(prices);
            this.candles.onchart.push({
                name: 'Simple Moving Average',
                type: 'SMA',
                data: smas,
                settings: {
                    color: '#44b6eb'
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;

        },
        on_button_click(event) {
            if(event.button == 'remove') {
                if(event.type == 'offchart') {
                    const arrNumber = event.dataIndex;
                    this.candles.offchart.splice(arrNumber, 1);
                    this.chart = new DataCube(this.candles)
                } else if(event.type == 'onchart') {
                    const arrNumber = event.dataIndex;
                    this.candles.onchart.splice(arrNumber, 1);
                    this.chart = new DataCube(this.candles)
                }
            } else if(event.button == 'display') {
                console.log('display', event)
            }
        },
// USE DHISTOGRAM OVERLAY FOR SENTIMENT ANALYSIS: SHOW POSITIVE & NEGATIVE MENTIONS
        getInsiders() {
            const ticker = 'AAPL';
            this.$axios.get(`/stocks/insiders/${ticker}`).then(res => {
                res.data.forEach(c => {
                    const date = new Date(c.date).getTime();
                    this.insideTransactions.push([date, Number(c.amount)])
                })
            });
            this.candles.offchart.push({
            name: 'Insider Transactions',
            type: "Volume",
            data: this.insideTransactions,
            settings: {
            upper: 1000000,
            lower: -10000000,
            backColor: "#44b6eb",
            bandColor: "#9241d9"
                }
            })
            this.chart = new DataCube(this.candles)
        },
        
        async getPriceData() {
            const ticker = 'AAPL';
            this.ticker = ticker;
            const res = await this.$axios.get(`/stock/candles/${ticker}`);
            const arr = res.data.sort((a, b) => (a.date > b.date) ? 1: -1)
            arr.forEach(item => {
                const date = new Date(item.date).getTime();
                this.candles.ohlcv.push([date, item.open, item.high, item.low, item.close, item.volume])
            });
            this.chart = new DataCube(this.candles);
            console.log(Overlays)
        },
        onResize(event) {
            this.width = window.innerWidth - 100
            // this.height = window.innerHeight - 100
        },
         getTwitterData() {
        const ticker = 'AAPL';
        // this.chart = {};
        this.$axios.get(`/social/sentiment/${ticker}`).then(res => {
            const arr = res.data.sort((a, b) => (a.date > b.date) ? 1: -1)
            arr.forEach((item, index) => {
                 const date = new Date(item.date).getTime();
                 if(item.source == 'twitter') {
                     this.twitPosMentions.push([date, Number(item.positive_mentions)])
                 }
                 
            });
        });
        console.log(this.twitPosMentions)
            this.candles.offchart.push({
            name: 'Twitter Positive Mentions',
            type: "TestOverlay",
            data: this.twitPosMentions,
            // settings: {
            // upper: 10,
            // lower: 1,
            // backColor: "#9b9ba316",
            // bandColor: "#666"
            //     }
            })
            this.chart = new DataCube(this.candles)
        }
    },

    mounted() {
        this.getPriceData();
        window.addEventListener('resize', this.onResize)
        this.onResize()
        window.tv = this.$refs.tv
    }
}

</script>