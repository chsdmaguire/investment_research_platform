<template>
  <v-container fluid>
      <v-layout row wrap justify-center>
            <h4>
                  Similar Companies
              </h4>
      <v-data-table hide-details
      hide-default-footer
      dense
      disable-filtering
      :headers="trendingHeaders"
      :items="topStocks">
       <template v-slot:[`item.ticker`]="{ item }">
        <span> <a :href="`companies/${item.ticker}`">
            {{ item.ticker }}
            </a>
         </span>
       </template>

      <template v-slot:[`item.change`]="{ item }">
          <span v-if="item.change > 0" style="color: green;"> {{ formatChange(item.change)  }}  </span>
          <span v-else style="color: red;">{{ formatChange(item.change)  }}</span>        
      </template>
      <template v-slot:[`item.percent_change`]="{ item }">
          <span v-if="item.percent_change > 0" style="color: green;"> {{ formatPercentChange(item.percent_change)  }}  </span>
          <span v-else style="color: red;"> {{ formatPercentChange(item.percent_change)  }}</span>        
      </template>
    </v-data-table> 
      </v-layout>
   
  </v-container>
</template>

<script>
const numeral = require('numeral');
export default {
    data () {
        return {
             topStocks: [],
             trendingHeaders: [
                 {text: 'Ticker', value: 'ticker'},
                 {text: 'Name', value: 'name'},
                 {text: 'Price', value: 'close'},
                 {text: 'Change', value: 'change'},
                 {text: '% Change', value: 'percent_change'},
             ]
        }
    },
        methods: {
            async getTrending() {
                const ticker = this.$route.params.ticker.toUpperCase();
                const trendStocks = await this.$axios.get(`/api/similar/companies/${ticker}`);
                trendStocks.data.forEach(element => {
                    this.topStocks.push({
                        
                        ticker: element.ticker,
                        name: element.name,
                        close: element.close,
                        change: element.close - element.open,
                        percent_change: (element.close - element.open) / element.open
                    })
                });
            },

            formatChange(val) {
                return numeral(val).format('0.00')
            },

            formatPercentChange(val) {
                return numeral(val).format('0.0%')
            }
        },

        mounted() {
            this.getTrending();
        }
}
</script>

<style>

</style>