<template>
<v-app>
    <v-container fluid>

        <v-layout row wrap justify-space-around class="mt-6">
            <v-flex lg8> <BasicInfo id="basic"/> </v-flex>
            <v-flex lg3> <SimilarCompanies /> </v-flex>
        </v-layout>
        <v-layout row wrap justify-left class="mt-4 pt-0">
            <v-flex lg10 md10 class="mx-1"><Financials id="financ" />
              </v-flex>        
        </v-layout>

        <v-layout row wrap justify-left class="mt-4 pt-0">
            <v-flex lg10 md10 class="mx-1">
             <DiscountCashFlow id="dcf" /> 
             </v-flex>        
        </v-layout>
        <v-layout row wrap justify-left class="mt-4 pt-0">
            <v-flex lg4 md10 class="mx-12 my-6"><MetricsGraphAnnual id="annualMetric" />  </v-flex>
            <v-flex lg4 md10 class="mx-12 my-6"><MetricsGraphQuarter id="quarterMetric"/></v-flex>   
        </v-layout>
        

        <v-layout row wrap justify-left class="mt-6">
            <v-flex lg10><CompsTable id="comp" /></v-flex>      
        </v-layout>

        <v-layout row wrap justify-left class="mt-6">
            <v-flex lg10><EarningsSurprise id="earnings" /> </v-flex>      
        </v-layout> 

        <v-layout row wrap justify-left class="mt-6">
            <v-flex lg10><AnalystRecs id="analysts" /> </v-flex>      
        </v-layout> 

        <v-layout row wrap justify-left class="mt-6">
            <v-flex lg10><InsiderTransactions id="insiders" /> </v-flex>       
        </v-layout> 

        <v-layout row wrap justify-left class="my-6" >
            <v-flex lg10><SentimentAnalysis id="sentiment" /> </v-flex>       
        </v-layout> 

        <!-- <MessageApp /> -->
        </v-container>
        <!-- <v-footer dark padless fixed inset height="50" width="auto">
            <v-slide-group>
                 <v-slide-item>
                    <v-btn depressed rounded @click="$vuetify.goTo('#top')">Back to Top</v-btn>
                </v-slide-item>
                 <v-slide-item>
                    <v-btn depressed rounded @click="$vuetify.goTo('#basic')">Basic Information</v-btn>
                </v-slide-item>
                 <v-slide-item>
                    <v-btn depressed rounded @click="$vuetify.goTo('#financ')">Historical Financials</v-btn>
                </v-slide-item>
                 <v-slide-item>
                    <v-btn depressed rounded @click="$vuetify.goTo('#comp')">Comparisons Analysis</v-btn>
                </v-slide-item>
                 <v-slide-item>
                    <v-btn depressed rounded @click="$vuetify.goTo('#annualMetric')">Annual Metrics</v-btn>
                </v-slide-item>
                 <v-slide-item>
                    <v-btn depressed rounded @click="$vuetify.goTo('#quarterMetric')">Quarterly Metrics</v-btn>
                </v-slide-item>
                 <v-slide-item>
                    <v-btn depressed rounded @click="$vuetify.goTo('#dcf')">Discounted Cash Flow</v-btn>
                </v-slide-item>
                 <v-slide-item>
                    <v-btn depressed rounded @click="$vuetify.goTo('#earnings')">EPS Estimates</v-btn>
                </v-slide-item>
                 <v-slide-item>
                    <v-btn depressed rounded @click="$vuetify.goTo('#analysts')">Analyst Recommendations</v-btn>
                </v-slide-item>
                 <v-slide-item>
                    <v-btn depressed rounded @click="$vuetify.goTo('#insiders')">Insider Transactions</v-btn>
                </v-slide-item>
                <v-slide-item>
                    <v-btn depressed rounded @click="$vuetify.goTo('#sentiment')">Sentiment Analysis</v-btn>
                </v-slide-item>
            </v-slide-group>
        </v-footer>         -->
    </v-app>
    
</template>

<script>
import SearchBar from '~/components/stock-page/SearchBar'
import BasicInfo from '~/components/stock-page/BasicInfo'
import SimilarCompanies from '~/components/stock-page/SimilarCompanies'
import Financials from '~/components/stock-page/Financials'
import DiscountCashFlow from '~/components/stock-page/DiscountCashFlow'
import MetricsGraphAnnual from '~/components/stock-page/MetricsGraphAnnual'
import MetricsGraphQuarter from '~/components/stock-page/MetricsGraphQuarter'
import CompsTable from '~/components/stock-page/CompsTable'
import EarningsSurprise from '~/components/stock-page/EarningsSurprise'
import AnalystRecs from '~/components/stock-page/AnalystRecs'
import InsiderTransactions from '~/components/stock-page/InsiderTransactions'
import SentimentAnalysis from '~/components/stock-page/SentimentAnalysis'
import MessageApp from '~/components/stock-page/MessageApp'

export default {
    components: {SearchBar, BasicInfo, SimilarCompanies, Financials, DiscountCashFlow, MetricsGraphAnnual,
    MetricsGraphQuarter, CompsTable, EarningsSurprise, AnalystRecs, InsiderTransactions, SentimentAnalysis, 
    MessageApp}
}
</script>

<style scoped>

</style>