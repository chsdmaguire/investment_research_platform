<template>
<v-container fluid>
    <v-row align="center" justify="center" class="mt-4">
            <h1 class="text-left mr-2">
              {{ head.ticker }}  
            </h1>
            <span>  &#8226;</span>
            <h1 class="text-right ml-2">
            {{ head.name }}
            </h1>
    </v-row>
    <v-row align="center" justify="center" >
            <h6 class="text-left mr-2">
              {{ head.country }}  
            </h6>
            <span>  &#8226;</span>
            <h6 class="text-right ml-2 mr-2">
            {{ head.sector }}
            </h6>
            <span>  &#8226;</span>
            <h6 class="text-right ml-2">
            {{ formatExchange(head.exchange) }}
            </h6>
    </v-row>
    <v-row>
    <v-container fluid class="mx-12">
            <v-tabs center-active fixed-tabs background-color="rgba(255, 0, 0, 0.0)">
                    <v-tab>Basic Info</v-tab>
                    <v-tab>Advanced Charting</v-tab>
                    <v-tab>Financials</v-tab>
                    <v-tab>Valuation</v-tab>
                    <v-tab>Comparisons</v-tab>
                    <v-tab>Alternative Data</v-tab>
                    <v-tab-item>
                        <v-container fluid class="mt-2">
                            <v-row justify="start">
                                <v-row justify="center" align="center" class="my-2">
                                    <h5 class="text-left mr-2">
                                        {{ formatMarketCap(head.market_cap) }} Market Cap 
                                    </h5>
                                    <span style="color:#cfcdcc">  &boxv;</span>
                                    <h5 class="text-right ml-2 mr-2">
                                        {{ formatMarketCap(head.shares_outstanding) }} Shares
                                    </h5>
                                    <span style="color:#cfcdcc">  &boxv;</span>
                                    <h5 class="text-right ml-2 mr-2">
                                        {{ formatDate(head.ipo) }} IPO Date
                                    </h5>
                                        <span style="color:#cfcdcc">  &boxv;</span>
                                    <h4 class="text-right ml-2">
                                        <a :href="head.weburl">
                                            {{ head.weburl }}
                                        </a>
                                    </h4>
                                </v-row>
                                <v-row>
                                <v-col cols="4">
                                    <v-row align="center" justify="center">
                                        <KeyMetrics />
                                    </v-row>
                                    <v-row align="center" justify="center">
                                        <AnalystCurrent />
                                    </v-row>
                                </v-col>
                                <v-col cols="7">
                                    <v-row>
                                        <AdvancedChart />
                                    </v-row>
                                    <v-row class="mb-4">
                                        <h5 class="descrip">{{ head.description }} </h5>
                                    </v-row>
                                </v-col>
                                </v-row>
                            </v-row>
                        </v-container>
                        </v-tab-item>
                    <v-tab-item><ChartContainer /></v-tab-item>
                    <v-tab-item>
                        <v-row justify="center" align="center">
                            <v-col cols="12">
                            <Financials />   
                            </v-col>
                        </v-row>
                        <v-row justify="center" align="center">
                            <v-col cols="12">
                            <EarningsSurprise />   
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col cols="12">
                                <DiscountCashFlow />
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col cols="12">
                                <CompsTable />
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col cols="12">
                                <SentimentAnalysis />
                            </v-col>
                        </v-row>
                        <v-row>
                        <v-col cols="12">
                                <InsiderTransactions />
                            </v-col>
                        </v-row>
                        <v-row>
                        <v-col cols="12">
                                <Patents />
                            </v-col>
                        </v-row>
                    </v-tab-item>
                </v-tabs>

    </v-container>
    </v-row>
    <!-- <v-container>
        <v-row align="center" justify="center">
            <v-col>
                <BasicInfo />
            </v-col>           
        </v-row> 
    </v-container> -->
    <v-container>
        <StockNews />
    </v-container>
</v-container>    
</template>

<script>
import BasicInfo from '~/components/stock-page/BasicInfo';
import SimilarCompanies from '~/components/stock-page/SimilarCompanies';
import AdvancedChart from '~/components/stock-page/AdvancedChart';
import StockNews from '~/components/stock-page/StockNews';
import Financials from '~/components/stock-page/Financials';
import EarningsSurprise from '~/components/stock-page/EarningsSurprise';
import DiscountCashFlow from '~/components/stock-page/DiscountCashFlow';
import CompsTable from '~/components/stock-page/CompsTable';
import SentimentAnalysis from '~/components/stock-page/SentimentAnalysis';
import InsiderTransactions from '~/components/stock-page/InsiderTransactions';
import KeyMetrics from '~/components/stock-page/KeyMetrics';
import AnalystCurrent from '~/components/stock-page/AnalystCurrent';
import Patents from '~/components/stock-page/Patents';
import ChartContainer from '~/components/stock-page/MyChart/ChartContainer';
const numeral = require('numeral');

export default {
  head() {
    return {
      title: this.head.ticker + "stock",
      meta: [
          {name: 'description', content: 'Latest news, price, financials, and valuations for ' + this.head.ticker},
          {name: 'keywords', content: this.head.ticker + "stock"},
      ]
    }
  },

    components: { AnalystCurrent, BasicInfo, KeyMetrics, ChartContainer, SimilarCompanies, AdvancedChart, StockNews, Financials, EarningsSurprise, DiscountCashFlow, CompsTable, SentimentAnalysis, InsiderTransactions, Patents, ChartContainer },
    data() {
        return {
            head: [],
        }
    },
    
    methods: {
        async getName() {
            const ticker = this.$route.params.ticker.toUpperCase();
            const res = await this.$axios.get(`/stock/basic/info/${ticker}`);
            this.head = res.data[0];
        },

        formatExchange(item) {
            const val = String(item)
            if(val.includes('NASDAQ')) {
                return 'NASDAQ'
            } else if (val.includes('NEW YORK') || val.includes('NYSE')) {
                return 'NYSE'
            } else if (val.includes('OTC')) {
                return 'OTC Markets'
            } else if (val.includes('TORONTO')) {
                return 'Toronto'
            } else if (val.includes('BATS')) {
                return 'BATS'
            }
        },
        formatMarketCap(val) {
          return numeral(val * 1000000).format('0.0a')
        },

        formatDate(val) {
          return new Date(val).toLocaleDateString('en-US');
        }
    },

    mounted() {
        this.getName()
    }
}
</script>

<style scoped>
* {
    background-color: #121212;
    }
.descrip {
    font-family: 'arial';
    font-weight: 200;
}
</style>