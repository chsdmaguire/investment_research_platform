<template>
<v-container>
    <v-simple-table dense> 
        <tbody>
            <tr v-for="(item, idx) in keyMetrics" :key="idx">
                <td class="data">{{ item.name }}</td>
                <td  class="data">{{ formatChange(item.value) }}</td>
            </tr>
        </tbody>

    </v-simple-table>
  </v-container>
</template>

<script>
const numeral = require('numeral');

export default {
    data () {
        return {
            keyMetrics: [],
        }
    },
    methods: {
        async getData() {
            const ticker = this.$route.params.ticker.toUpperCase();
            const response = await this.$axios.get(`/stock/key/metrics/${ticker}`);
            response.data.forEach(item => {
                if(item.metric == 'psAnnual'){this.keyMetrics.push({name: 'Price to Sales', value: Number(item.value)})}
                else if(item.metric == 'grossMarginAnnual'){this.keyMetrics.push({name: 'Gross Margin', value: Number(item.value) / 100})}
                else if(item.metric == 'operatingMarginAnnual'){this.keyMetrics.push({name: 'Operating Margin', value: Number(item.value) / 100})}
                else if(item.metric == 'peNormalizedAnnual'){this.keyMetrics.push({name: 'Price to Earnings', value: Number(item.value)})}
                else if(item.metric == 'dividendPerShareAnnual'){this.keyMetrics.push({name: 'Dividend per Share', value: Number(item.value)})}
                else if(item.metric == 'beta'){this.keyMetrics.push({name: 'Beta', value: Number(item.value)})}
                else if(item.metric == 'revenueGrowth3Y'){this.keyMetrics.push({name:'3Y Revenue Growth', value: Number(item.value) / 100})}
            });
        },
        formatChange(val) {
            if(val < 1 && val > 0) {
                return numeral(val).format('0.0%')
            } else {
                return numeral(val).format('0.0')
            }
                
            },
    },
    mounted()  {
        this.getData();
    }
}
</script>

<style scoped>
.v-simple-table {
    background-color: #121212;
    }
.tr {
    background-color: #121212;
    }
.data {
    background-color: #121212;
    }
</style>