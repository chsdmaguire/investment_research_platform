<template>
    <div>
        <v-container fluid>
            <v-layout row wrap justify-center class="mt-5">
                <v-flex lg1 md2 sm2 class="mx-2"><p id='tradeSymbol'></p></v-flex>
                <v-flex lg1 md2 sm2  class="mx-2"><p id="compName"></p> </v-flex>
                <v-flex lg1 md2 sm2  class="mx-4"> <p id="Industry"></p></v-flex>
                <v-flex lg1 md2 sm2  class="mx-4"> <p id="Exchange"></p> </v-flex>
                <v-flex lg2 md3 sm3  class="mx-4"><p id="compUrl"></p> </v-flex>
                <v-flex lg3 md3 sm4  class="mx-5"><p id="ipoDate"></p></v-flex>
            </v-layout>
            <v-layout row wrap justify-left class="my-1">
                <v-flex sm6 md3 lg3>
                    <v-container class="scroll mt-3">
                        <v-layout row wrap align-center>        
                            <v-flex>
                                <div v-for="(article, idx) in newsArticles" :key="idx">
                                <v-card hover data-aos="zoom-in" data-aos-easing="ease" :href="article.url" target="_blank">
                                    <v-img
                                    height="75px"
                                    :src="article.image"
                                    ></v-img>
                                    <v-container>
                                        <v-layout>
                                        <v-flex xs12 align-end d-flex>
                                            <span class="news-title">{{ article.headline }}</span>
                                        </v-flex>
                                        </v-layout>
                                    </v-container>
                                    <v-card-text class="news-summary">
                                    {{ article.summary }}
                                    </v-card-text>
                                    <v-card-actions>

                                <v-row class="justify-space-around pb-1">
                                    <v-chip small class="white--text" color="blue">
                                    {{ article.source }}
                                    </v-chip>
                                

                                    <v-chip color="blue" class="white--text" small>{{ new Date(article.datetime).getFullYear() + '-' 
                                    + (new Date(article.datetime).getMonth() + 1) + '-' + new Date(article.datetime).getDate()}}</v-chip>

                                </v-row>
                                </v-card-actions>
                                </v-card>
                                </div>
                            </v-flex>
                    </v-layout>
                    </v-container> 
                </v-flex> 
                <v-flex lg3 md4 sm6> 
                    <v-card max-width="250">
                        <v-card-title class="subheading font-weight-bold">
                        Key Market Stats
                        </v-card-title>
                        <v-list>
                            <v-list-item v-for="(key, idx) in marketStats" :key="idx">
                                <v-list-item-content>
                                    <v-list-item-subtitle v-text="key.metric"></v-list-item-subtitle>
                                </v-list-item-content>
                                {{ key.value }} 
                            </v-list-item>
                        </v-list>                   
                    </v-card>
                </v-flex>
           
                <v-flex sm10 md4 lg4 class="pt-3">
                        <div>
                           <div id="ticker-chart"> </div>  
                        </div>
                    <p id="summary" class="company-description" width="600"></p>                   
                </v-flex>                
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { createChart } from 'lightweight-charts';
const numeral = require('numeral');

export default {
    data () {
        return {
            basicInfo: [],
            symbol: null,
            name: null,
            Industry: null,
            compExchange: null,
            compCountry: null,
            compUrl: null,
            ipoDate: null,
            summary: null,
            marketStats: [],
            candlestickSeries: null,
            volumeSeries: null,
            candleData: null,
            candleOptions: null,
            stockChart: null,
            stockData: [],
            candleDates: [],
            candleSeries: [],
            volumeData: [],


            allData: [],
        
            newsArticles: []  
        }
    },

    methods: {

        async getBasicInfo() {
            const ticker = this.$route.params.ticker.toUpperCase()
            const basic_response = await this.$axios.get(`/api/stock/basic/info/${ticker}`)
            this.basicInfo = basic_response.data[0];
            if (this.basicInfo.length > 0) {
            this.symbol = document.getElementById('tradeSymbol').innerHTML = this.basicInfo.ticker;
            this.name = document.getElementById('compName').innerHTML = this.basicInfo.name;
            this.Industry = document.getElementById('Industry').innerHTML = this.basicInfo.sector;
            this.compExchange = document.getElementById('Exchange').innerHTML = this.basicInfo.exchange.replace(/ .*/,'');
            this.compUrl = document.getElementById('compUrl').innerHTML = this.basicInfo.weburl;
            this.ipoDate = document.getElementById('ipoDate').innerHTML = 'IPO Date: ' + this.basicInfo.ipo.toString().split('T')[0];
            this.summary = document.getElementById('summary').innerHTML = this.basicInfo.description;                           
            }
        },


        async getKeyMetric() {
            const ticker = this.$route.params.ticker.toUpperCase()
            const basic_response = await this.$axios.get(`/api/stock/key/metrics/${ticker}`);
            if (basic_response.data.length > 0) {
            basic_response.data.forEach(element => {     
                if(element.metric == '52WeekHigh') {
                    element.metric = '52 Week High'
                    element.value = numeral(element.value).format('($0,0.00)')
                    this.marketStats.push(element)
                } else if(element.metric == '52WeekHighDate') {
                    element.metric = 'High Date'
                    this.marketStats.push(element)                   
                } else if ( element.metric=='52WeekLow') {
                    element.metric = '52 Week Low'
                     element.value = numeral(element.value).format('($0,0.00)')
                    this.marketStats.push(element)
                } else if ( element.metric=='52WeekLowDate') {
                     element.metric = 'Low Date'
                    this.marketStats.push(element)                    
                } else if (element.metric=='beta') {
                    element.value = numeral(element.value).format('0.00')
                    element.metric = 'Beta'
                    this.marketStats.push(element)  
                } else if (element.metric=='marketCapitalization') {
                    element.value = numeral(element.value * 1000000).format('0.00a')
                    element.metric = 'Market Cap'
                    this.marketStats.push(element)  
                } else if (element.metric=='10DayAverageTradingVolume') {
                    element.value = numeral(element.value  * 1000000).format('0.00a')
                    element.metric = '10 Day Avg Volume'
                    this.marketStats.push(element)  
                } else if (element.metric=='3MonthAverageTradingVolume') {
                    element.value = numeral(element.value  * 1000000).format('0.00a')
                    element.metric = '3 Month Avg Volume'
                    this.marketStats.push(element)  
                } else if (element.metric=='monthToDatePriceReturnDaily') {
                    element.value = numeral(element.value / 100).format('0.00%')
                    element.metric = 'Month to Date Return'
                    this.marketStats.push(element)  
                } else if (element.metric=='13WeekPriceReturnDaily') {
                    element.value = numeral(element.value / 100).format('0.00%')
                    element.metric = '3 Month to Date Return'
                    this.marketStats.push(element)  
                } else if (element.metric=='26WeekPriceReturnDaily') {
                    element.value = numeral(element.value / 100).format('0.00%')
                    element.metric = '6 Month to Date Return'
                    this.marketStats.push(element)  
                } else if (element.metric=='52WeekPriceReturnDaily') {
                    element.value = numeral(element.value / 100).format('0.00%')
                    element.metric = '1 Year to Date Return'
                    this.marketStats.push(element)  
                }
                
            })   
                        
            }

        },

         async getPriceData() {
            const ticker = this.$route.params.ticker.toUpperCase();
            const candleResponse =  await this.$axios.get(`/api/stock/candlestick/chart/${ticker}`);
            if(candleResponse.data.length > 0) {
                 candleResponse.data.forEach(bar => {
                const newDate = bar.date.split('T')[0];
                this.stockData.push({
                    time: newDate,
                    open: Number(bar.open),
                    high: Number(bar.high),
                    low: Number(bar.low),
                    close: Number(bar.close)
                });
                this.volumeData.push({
                    time: newDate,
                    value: bar.volume
                })
            });
   
            }
        
            this.stockChart = createChart(document.getElementById('ticker-chart'), { width: 500, height:400 });
            
            this.candlestickSeries = this.stockChart.addCandlestickSeries({
                title: ticker,
                visible: true,
                color: '#2296f3'
            });
            this.volumeSeries = this.stockChart.addHistogramSeries({
                    visible: true,
                    color: '#429ef5',
                    priceFormat: {
                        type: 'volume',
                    },
                    priceScaleId: '',
                    scaleMargins: {
                        top: 0.8,
                        bottom: 0,
                    },
                });
            this.candlestickSeries.setData(this.stockData)
            this.volumeSeries.setData(this.volumeData)
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
            watermark: {
                visible: true,
                text: ticker + '     ' + '1D' + '     ' + 'O:' + ' ' + this.stockData.slice(-1)[0].open + '  ' + 'L:' + 'H:' + ' ' + this.stockData.slice(-1)[0].high + '  ' + 'L:' + ' ' + this.stockData.slice(-1)[0].low + '  ' + 'C:' + ' ' + this.stockData.slice(-1)[0].close,
                fontSize: '14',
                horzAlign: 'left',
                vertAlign: 'top',
                color: '#fcfcfc',
                },
        })
        },
        async getNews() {
        const ticker = this.$route.params.ticker.toUpperCase()
        this.newsArticles = await this.$axios.$get(`/api/news/stock/${ticker}`);
        }        
    },

    mounted() {
        this.getBasicInfo();
        this.getKeyMetric();
        this.getPriceData();
        this.getNews();
    }
}
</script>

<style scoped>

 .logo {
    max-width: 35%;
    margin-top: -10px;
}

.yup {
    outline: 10px solid rgb(92, 231, 127);
}

.company-description {
    font-size: 10px;
    padding-left: 10px;
    line-height: 20px;
}

.scroll {
    width: 210px;
    height: 620px;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: center;
    /* padding-right: 10px;
    padding-left: 60px; */
    /* padding-right: 5px; */
}

.news-title {
  font-size: 12px;
  font-weight: bold;
}

.news-summary {
  font-size: 10px;
  line-height: 15px;
  color: black;
}

/*
.title {
    position: relative;
    margin-top: 10px;
    }
p {
    position: relative;
    margin-top: 12px;
    margin-left: 10px;
} */
</style>