<template>
<v-app>
    <NavBar />
    <v-container  fluid align-items="center" class="mt-16 pt-10">
        <v-layout row wrap justify-center>
            <v-flex lg8>
                 <IndexChart />
            </v-flex>
            <v-flex lg8 class="my-8">
                 <StockSearch />
            </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
            <v-flex lg10>
                <News />
            </v-flex>
        </v-layout>

        <v-layout row wrap justify-center>
            <v-flex lg7>
                <v-tabs dark background-color="indigo" fixed-tabs>
                    <v-tab>Earnings Calendar</v-tab>
                     <v-tab>IPO Calendar</v-tab>
                     <v-tab-item><EarnCal /></v-tab-item>
                     <v-tab-item><IpoCal /></v-tab-item>
                </v-tabs>               
            </v-flex>
            <v-flex lg3>
                <TrendingStocks />
            </v-flex>

        </v-layout>
    </v-container>
 </v-app>
</template>        

<script>
import EarnCal from '~/components/stock-main/EarnCal'
import StockSearch from '~/components/stock-main/StockSearch'
import IndexChart from '~/components/stock-main/IndexChart'
import News from '~/components/stock-main/News'
import IpoCal from '~/components/stock-main/IpoCal'
import TrendingStocks from '~/components/stock-main/TrendingStocks'
export default {
    components: {StockSearch, IndexChart, News, IpoCal, EarnCal, TrendingStocks },
    data() {
        return {
        }
        },  
}
</script>

<style scoped>


</style>