<template>
<div class="cryp-graph">
    <v-autocomplete
    id="cryptoShow" 
    :items="currencies"
    v-model="selectedCurrency"
    v-on:change="changeChart"
    item-text="name"
    item-value="symbol"
    label="Select a Cryptocurrency"
    rounded
    dense
    solo
    >
        <template v-slot:item="{ item }">
            <v-list-item-avatar
            color="indigo"
            class="white--text text-uppercase"
            >
            {{ item.symbol }}
            </v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title v-text="item.name" class="text-capitalize"></v-list-item-title>
            <v-spacer></v-spacer>
            <v-list-item-subtitle v-text="item.cmc_rank"></v-list-item-subtitle>
            </v-list-item-content>
        </template>
    </v-autocomplete>
    <div>
        <div id="crypto-chart" >
    </div>     
    </div>
</div>
</template>

<script>
import { createChart, CrosshairMode, PriceScaleMode } from 'lightweight-charts';

export default {
    data () {
        return {
            chartData: [],
            allData: [],
            chartSeries: null,
            cryptoChart: null,
            currencies: [],
            selectedCurrency: null,
        }
    },

    methods: {
        async fillCandleChart() {
            const cryptoList = await this.$axios.get('/api/crypto/ticker/list');
            this.currencies = cryptoList.data;
            const ticker = 'BTC'
            const candleResponse = await this.$axios.get(`/api/crypto/candlestick/${ticker}`);
            this.allData = candleResponse.data;
            for(let i = 0; i <this.allData.length; i++) {
               const newDate = this.allData[i].date.split('T')[0];
                this.chartData.push({time: newDate,
                open: this.allData[i].open,
                high: this.allData[i].high,
                low: this.allData[i].low, 
                close: this.allData[i].close,
                }) };
                console.log(this.chartData)
            this.cryptoChart = createChart(document.getElementById('crypto-chart'), { width: 900, height: 300 });
            this.chartSeries = this.cryptoChart.addCandlestickSeries();
            this.chartSeries.setData(this.chartData);

        },
         changeChart() {
            this.chartData.length = 0;
            this.cryptoChart.removeSeries(this.chartSeries)          
            this.chartSeries = null;
            this.$axios.get(`/api/crypto/candlestick/${this.selectedCurrency}`).then( response =>  {
                 const toLoop = response.data;
            for(let i = 0; i < toLoop.length; i++) {
               const newDate = toLoop[i].date.split('T')[0];
                this.chartData.push({time: newDate,
                open: toLoop[i].open,
                high: toLoop[i].high,
                low: toLoop[i].low, 
                close: toLoop[i].close,
                }) };

                this.chartSeries = this.cryptoChart.addCandlestickSeries(); 
                this.chartSeries.setData(this.chartData)                       
            })

        }
    },

    mounted() {
        this.fillCandleChart();

    }
}
</script>

<style scoped>


</style>