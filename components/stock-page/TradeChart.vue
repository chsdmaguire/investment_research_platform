<template>
  <v-container>
      <trading-vue :data="chart"/>
  </v-container>
</template>

<script>
import TradingVue from 'trading-vue-js'
import { DataCube } from 'trading-vue-js'
export default {
    components: { TradingVue },
    data() {
        return {
            candles: {
                chart: {
                   data: [] 
                }              
            },
            chart: {},
        }
    },
        methods: {
        async startingChart() {
             const ticker = this.$route.params.ticker.toUpperCase();
            const candleRes =  await this.$axios.get(`/api/stock/candlestick/chart/${ticker}`);
            if(candleRes.data.length > 0) {
                candleRes.data.forEach(bar => {
                    this.candles.chart.data.push([new Date(bar.date).getTime(), bar.open, bar.high, bar.low, bar.close, bar.volume])
                })
            };
            this.chart = new DataCube(this.candles);
        }
        },
        mounted() {
            this.startingChart();
        }
}
</script>

<style>

</style>