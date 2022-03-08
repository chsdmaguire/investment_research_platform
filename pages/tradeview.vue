<template>
<!-- <v-container fluid>
    <v-row>
        <v-toolbar color="#10141f" elevation="4">
            <v-btn text class="mx-2">Insider Transactions</v-btn>

            <v-btn text class="mx-2">Social Sentiment</v-btn>
            <v-btn text class="mx-2">EPS</v-btn>
            <v-btn text class="mx-2">Analysts Recs</v-btn>
            <v-btn text class="mx-2">Technicals</v-btn>
            <v-btn text class="mx-2">Financials</v-btn>
             <v-btn text class="mx-2">Economic</v-btn>
        </v-toolbar>
    </v-row>
    <v-row class="mt-5 mb-6 mr-12"> -->
        <trading-vue 
        :title-txt="ticker"
        :data="chart"
        
        :width="this.width" :height="this.height"
        ref="tv"
        :toolbar="true">
   </trading-vue>
  <!--    </v-row> 
</v-container> -->

</template>

<script>
import TradingVue from 'trading-vue-js'
import { DataCube } from 'trading-vue-js'
export default {
    components: { TradingVue },
    data() {
        return {
            chart: {},
            width: window.innerWidth,
            height: window.innerHeight,
            ticker: '',
        }
    },

    methods: {
        
        async getPriceData() {
            const candleStickData = []
            const ticker = 'AAPL';
            this.ticker = ticker;
            const res = await this.$axios.get(`/stock/candles/${ticker}`);
            const arr = res.data.sort((a, b) => (a.date > b.date) ? 1: -1)
            arr.forEach(item => {
                const date = new Date(item.date).getTime();
                candleStickData.push([date, item.open, item.high, item.low, item.close, item.volume])
            });
            console.log(this.overlays)
            this.chart = new DataCube({
                ohlcv: candleStickData
            })
        },
        onResize(event) {
            this.width = window.innerWidth
            this.height = window.innerHeight
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