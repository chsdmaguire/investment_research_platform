<template>
<v-container fluid>
    <v-row align="center" justify="center">
        <v-col md="3">
            <h2 class="text-left">
              {{ head.ticker }}  
            </h2>
            
        </v-col>   
        <v-col md="3">
            <h2 class="text-right">
            {{ head.name }}
            </h2>
        </v-col>
    </v-row>
    
    <v-container>
        <v-tabs center-active>
            <v-tab>Price History</v-tab>
            <v-tab>Financials</v-tab>
            <v-tab>Fundamental Analysis</v-tab>
            <v-tab>Alternative Data</v-tab>
            <v-tab>Analyst Recs</v-tab>
            <v-tab-item><AdvancedChart /></v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col cols="12">
                     <Financials />   
                    </v-col>
                </v-row>
                <v-row>
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
                <v-divider></v-divider>
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

export default {
    components: {BasicInfo, SimilarCompanies, AdvancedChart, AnalystRecs, StockNews,
     Financials, EarningsSurprise, DiscountCashFlow, CompsTable,SentimentAnalysis,InsiderTransactions },
    data() {
        return {
            head: [],
        }
    },
    
    methods: {
        async getName() {
            const ticker = this.$route.params.ticker.toUpperCase();
            const res = await this.$axios.get(`/api/stock/basic/info/${ticker}`);
            this.head = res.data[0];
        }
    },

    mounted() {
        this.getName()
    }
}
</script>

<style scoped>

</style>