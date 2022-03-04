<template>
<v-container fluid>
    <v-row align="center" justify="center" class="mt-4">
            <h2 class="text-left mr-2">
              {{ head.ticker }}  
            </h2>
            <span>  &#8226;</span>
            <h2 class="text-right ml-2">
            {{ head.name }}
            </h2>
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
            <v-tabs center-active background-color="rgba(255, 0, 0, 0.0)">
                    <v-tab>Price History</v-tab>
                    <v-tab>Financials</v-tab>
                    <v-tab>Valuation</v-tab>
                    <v-tab>Comparisons</v-tab>
                    <v-tab>Alternative Data</v-tab>
                    <v-tab>Analyst Recs</v-tab>
                   <v-tab-item><AdvancedChart /></v-tab-item>
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
                    <v-tab-item>
                    <v-row>
                        <v-col cols="12">
                            <AnalystRecs />
                        </v-col>
                    </v-row>
                    </v-tab-item>
                </v-tabs>

    </v-container>
    </v-row>
    <v-container>
        <v-row align="center" justify="center">
            <v-col>
                <BasicInfo />
            </v-col>           
        </v-row> 
    </v-container>
    <v-container>
        <StockNews />
    </v-container>
</v-container>    
</template>

<script>
import BasicInfo from '~/components/stock-page/BasicInfo';
import SimilarCompanies from '~/components/stock-page/SimilarCompanies';
import AdvancedChart from '~/components/stock-page/AdvancedChart';
import AnalystRecs from '~/components/stock-page/AnalystRecs';
import StockNews from '~/components/stock-page/StockNews';
import Financials from '~/components/stock-page/Financials';
import EarningsSurprise from '~/components/stock-page/EarningsSurprise';
import DiscountCashFlow from '~/components/stock-page/DiscountCashFlow';
import CompsTable from '~/components/stock-page/CompsTable';
import SentimentAnalysis from '~/components/stock-page/SentimentAnalysis';
import InsiderTransactions from '~/components/stock-page/InsiderTransactions';
import Patents from '~/components/stock-page/Patents';

export default {
  head() {
    return {
      title: this.head.ticker,
      meta: [
          {name: 'description', content: this.head.description},
          {name: 'keywords', content: this.head.name},
      ]
    }
  },

    components: {BasicInfo, SimilarCompanies, AdvancedChart, AnalystRecs, StockNews,
     Financials, EarningsSurprise, DiscountCashFlow, CompsTable,SentimentAnalysis,InsiderTransactions, Patents },
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
            console.log(this.head)
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
</style>