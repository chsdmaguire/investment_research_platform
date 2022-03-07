<template>
<v-container fluid>
    <v-row>
        <v-toolbar>
            <v-divider vertical></v-divider>
            <v-btn text>
                Insider Transactions
            </v-btn>
            <v-divider vertical></v-divider>
             <v-divider vertical></v-divider>
            <v-btn text>
                Social Sentiment
            </v-btn>
            <v-divider vertical></v-divider>
            <v-divider vertical></v-divider>
            <v-btn text>
                EPS Hist
            </v-btn>
            <v-divider vertical></v-divider>
            <v-divider vertical></v-divider>
            <v-btn text>
                Analysts Recs
            </v-btn>
            <v-divider vertical></v-divider>
        </v-toolbar>
    </v-row>
    <v-row>
        <trading-vue :data="chart"></trading-vue>
    </v-row> 
</v-container>

</template>

<script>
import TradingVue from 'trading-vue-js'
import { DataCube } from 'trading-vue-js'
export default {
    components: { TradingVue },
    data() {
        return {
            candleStickData: [],
            chart: new DataCube({
                "chart": {
                    "data": this.candleStickData
                }
            })
        }
    },

    methods: {
        
        async getPriceData() {
            const ticker = 'AAPL';
            const res = await this.$axios.get(`/stock/candles/${ticker}`);
            res.data.forEach(item => {
                const date = new Date(item.date).getTime();
                 this.candleStickData.push([date, item.open, item.high, item.low, item.close, item.volume])
            });
        }
    },

    mounted() {
        this.getPriceData();
    }
}

</script>