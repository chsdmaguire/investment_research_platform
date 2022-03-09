<template>
<v-container class="mt-4 mb-12 mx-2">
    <v-row justify="center" align="center">
        <trading-vue 
        :title-txt="ticker"
        :data="chart"
        :overlays="overlays"
        :width="this.width" :height="this.height"
        ref="tv"
        :legend-buttons="['remove', 'settings']"
        v-on:legend-button-click="on_button_click"
        :toolbar="true">
        </trading-vue> 
    </v-row>
    <v-row>
    <v-btn class="primary" @click="getTwitterData">Twitter Sentiment</v-btn>
    <v-btn class="secondary" @click="getInsiders">insider transactions</v-btn>
    </v-row>         
</v-container> 

</template>

<script>
import TradingVue from 'trading-vue-js'
import { DataCube } from 'trading-vue-js'
import TestOverlay from './TestOverlay.vue'
import NewOverlay from './NewOverlay.vue'
export default {
    components: { TradingVue },
    data() {
        return {
            chart: {},
            width: window.innerWidth - 100,
            height: 400,
            ticker: '',
            candles: {
                ohlcv: [],
                onchart: [],
                offchart: [],
            },

            twitPosMentions: [],
            insideTransactions: [],

            overlays: [NewOverlay, TestOverlay],
            candleStickData: [],

            
        }
    },
    methods: {
        on_button_click(event) {
            if(event.button == 'remove') {
                if(event.type == 'offchart') {
                    const arrNumber = event.dataIndex;
                    this.candles.offchart.splice(arrNumber, 1);
                    this.chart = new DataCube(this.candles)
                }
            } else if(event.button == 'display') {
                console.log('display', event)
            }
        },

        getInsiders() {
            this.chart = {};
            const ticker = 'AAPL';
            this.$axios.get(`/stocks/insiders/${ticker}`).then(res => {
                res.data.forEach(c => {
                    const date = new Date(c.date).getTime();
                    this.insideTransactions.push([date, Number(c.amount)])
                })
            });
            this.candles.offchart.push({
            name: 'Insider Transactions',
            type: "TestOverlay",
            data: this.insideTransactions,
            settings: {
            upper: 10,
            lower: 1,
            backColor: "#9b9ba316",
            bandColor: "#666"
                }
            })
            console.log(this.candles)
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
            this.chart = new DataCube(this.candles)
            // this.chart = new DataCube({
            //     ohlcv: this.candleStickData,
            //     onchart: [{
            //     name: 'NewOverlay',
            //     type: 'NewOverlay',
            //     data: [],
            //     settings: {}
            // }]
            // },
            // )
        },
        onResize(event) {
            this.width = window.innerWidth - 100
            // this.height = window.innerHeight - 100
        },
         getTwitterData() {
        const ticker = 'AAPL';
        this.chart = {};
        this.$axios.get(`/social/sentiment/${ticker}`).then(res => {
            const arr = res.data.sort((a, b) => (a.date > b.date) ? 1: -1)
            arr.forEach((item, index) => {
                 const date = new Date(item.date).getTime();
                 if(item.source == 'twitter') {
                     this.twitPosMentions.push([date, Number(item.positive_mentions)])
                 }
                 
            });
        });
        this.$axios.get(`/stocks/insiders/${ticker}`).then(res => {
                res.data.forEach(c => {
                    const date = new Date(c.date).getTime();
                    this.insideTransactions.push([date, Number(c.amount)])
                })
            });

        this.chart = new DataCube({
            chart: {
                data: this.candleStickData,
                tf: '1d'
            },
            offchart: [{
            name: 'Twitter Positive Mentions',
            type: "TestOverlay",
            data: this.twitPosMentions,
            tf: '30m',
            settings: {
            upper: 10,
            lower: 1,
            backColor: "#9b9ba316",
            bandColor: "#666"
                }
            },
            {
            name: 'Insider Transactions',
            type: "RSI",
            data: this.insideTransactions,
            settings: {
            backColor: "#9b9ba316",
            bandColor: "#666"
                }
            }
            ]
        });
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