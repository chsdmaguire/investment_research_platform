<template>
  <v-container fluid>
      <template v-if="loading">
        <v-skeleton-loader dark type="date-picker">
        </v-skeleton-loader>
      </template>
      <template v-else>
        <v-row align="center"
        justify="center">
        <v-radio-group v-model="type" row>
            <v-radio
            v-for="(item, idx) in options" :key="idx"
            :label="item.text"
            :value="item.value"
            mandatory>
            </v-radio>
        </v-radio-group>
        </v-row>

        <template v-if="type == 'topStocks'">
        <v-layout row wrap justify-center>
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
        <template v-slot:[`item.close`]="{ item }">
            <span> {{ formatPrice(item.close)  }}  </span>     
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
        </template>

      <template v-else-if="type == 'gainers'">
      <v-layout row wrap justify-center>
      <v-data-table hide-details
      hide-default-footer
      dense
      disable-filtering
      :headers="trendingHeaders"
      :items="gainers">
       <template v-slot:[`item.ticker`]="{ item }">
        <span> <a :href="`companies/${item.ticker}`">
            {{ item.ticker }}
            </a>
         </span>
       </template>
       <template v-slot:[`item.close`]="{ item }">
          <span> {{ formatPrice(item.close)  }}  </span>     
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
      </template>

      <template v-else-if="type == 'losers'">
      <v-layout row wrap justify-center>
      <v-data-table hide-details
      hide-default-footer
      dense
      disable-filtering
      :headers="trendingHeaders"
      :items="losers">
       <template v-slot:[`item.ticker`]="{ item }">
        <span> <a :href="`companies/${item.ticker}`">
            {{ item.ticker }}
            </a>
         </span>
       </template>
       <template v-slot:[`item.close`]="{ item }">
          <span> {{ formatPrice(item.close)  }}  </span>     
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
      </template>

      <template v-else-if="type == 'volume'">
      <v-layout row wrap justify-center>
      <v-data-table hide-details
      hide-default-footer
      dense
      disable-filtering
      :headers="trendingHeaders"
      :items="volume">
       <template v-slot:[`item.ticker`]="{ item }">
        <span> <a :href="`companies/${item.ticker}`">
            {{ item.ticker }}
            </a>
         </span>
       </template>
       <template v-slot:[`item.close`]="{ item }">
          <span> {{ formatPrice(item.close)  }}  </span>     
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
      </template>
      </template>
  </v-container>
</template>

<script>
const numeral = require('numeral');
export default {
    data () {
        return {
            loading: true,
             topStocks: [],
             trendingHeaders: [
                 {text: 'Ticker', value: 'ticker'},
                 {text: 'Name', value: 'name'},
                 {text: 'Price', value: 'close'},
                 {text: 'Change', value: 'change'},
                 {text: '% Change', value: 'percent_change'},
             ],
             gainers: [],
             losers: [],
             volume: [],
             options: [
                 {text: 'Media Trending', value: 'topStocks'},
                 {text: 'Gainers', value: 'gainers'},
                 {text: 'Losers', value: 'losers'},
                 {text: 'Volume Leaders', value: 'volume'},
                 
             ],
             type: 'topStocks'
        }
    },
        methods: {
            async getTrending() {
                const trendStocks = await this.$axios.get('/api/top/trending');
                trendStocks.data.forEach(element => {
                    this.topStocks.push({
                        
                        ticker: element.ticker,
                        name: element.name,
                        close: element.close,
                        change: element.close - element.open,
                        percent_change: (element.close - element.open) / element.open
                    })
                });
                const movers = [];
                const res = await this.$axios.get('/api/stocks/movers');
                for (let i = 0; i < res.data.length; i++) {
                    if (i > 0 && res.data[i].ticker == res.data[i -1].ticker && res.data[i].date > res.data[i -1].date) {
                        const curVal = res.data[i].open;
                        const pasVal = res.data[i -1].close;
                        const vol = res.data[i].volume
                        movers.push({ticker: res.data[i].ticker, name: res.data[i].name, close: res.data[i].close, date: res.data[i].date, percent_change: (curVal - pasVal)/pasVal, change: curVal - pasVal, volume: vol } );
                        
                    }
                }
                this.losers = movers.sort((a, b) => (a.percent_change > b.percent_change) ?  1: -1).sort((a, b) => {
                    return a.date.localeCompare(b.date);
                }).slice(0, 6)
                this.gainers =  movers.sort((a, b) => (a.percent_change > b.percent_change) ?  1: -1).sort((a, b) => {
                    return a.date.localeCompare(b.date);
                }).slice(-6);
                this.volume = movers.sort((a, b) => (a.volume > b.volume) ?  1: -1).sort((a, b) => {
                    return a.date.localeCompare(b.date);
                }).slice(-6);

                this.loading = false;
            },

            formatChange(val) {
                return numeral(val).format('0.00')
            },

            formatPercentChange(val) {
                return numeral(val).format('0.0%')
            },

            formatPrice(val) {
                return numeral(val).format('0,0.00')
            }
        },

        mounted() {
            this.getTrending();
        }
}
</script>

<style>

</style>