<template>
    <v-container fluid align-items="center" class="mt-6">
        <v-row>
            <v-col lg="9" sm="10">
                <TrendingStocks />
            </v-col>
        </v-row>
                
        <v-row justify="center">
            <v-col cols="10">
                <Indices />
            </v-col>            
            <v-col cols="10">
                <v-tabs dark background-color="indigo" fixed-tabs class="mt-6">
                    <v-tab>Earnings Calendar</v-tab>
                    <v-tab>IPO Calendar</v-tab>
                    <v-tab-item><EarnCal /></v-tab-item>
                    <v-tab-item><IpoCal /></v-tab-item>
                </v-tabs>                 
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12">
            <NewsTable />
            </v-col>
        </v-row>

    </v-container>
</template>        

<script>
import Indices from '~/components/stock-main/Indices';
import NewsTable from '~/components/stock-main/NewsTable';
import EarnCal from '~/components/stock-main/EarnCal';
import IpoCal from '~/components/stock-main/IpoCal';
import TrendingStocks from '~/components/stock-main/TrendingStocks';
export default {
    components: {IpoCal, EarnCal, TrendingStocks, NewsTable, Indices },
    data() {
        return {
        }
        },  
}
</script>

<style scoped>


</style>