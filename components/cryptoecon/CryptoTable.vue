<template>
<v-container data-app class="my-12">
  <v-card>
        <v-card-title>
        Top 100 Cryptocurrencies
        <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        </v-card-title>
    <v-data-table
    :headers="fields"
    :items="cryptoData"
    dense
    :items-per-page="100"
    hide-default-footer
    class="elevation-1"
    :search="search"
    >

    <template v-slot:[`item.percent_change_24h`]="{ item }">
        <span v-if="item.percent_change_24h > 0" style="color: green;">{{ item.percent_change_24h.toFixed(2) }}%</span>
        <span v-else style="color: red;">{{ item.percent_change_24h.toFixed(2) }}%</span>
    </template>

        <template v-slot:[`item.percent_change_7d`]="{ item }">
        <span v-if="item.percent_change_7d > 0" style="color: green;">{{ item.percent_change_7d.toFixed(2) }}%</span>
        <span v-else style="color: red;">{{ item.percent_change_7d.toFixed(2) }}%</span>
    </template>

    <template v-slot:[`item.percent_change_30d`]="{ item }">
        <span v-if="item.percent_change30dh > 0" style="color: green;">{{ item.percent_change_30d.toFixed(2) }}%</span>
        <span v-else style="color: red;">{{ item.percent_change_30d.toFixed(2) }}%</span>
    </template>

    <template v-slot:[`item.percent_change_60d`]="{ item }">
        <span v-if="item.percent_change_60d > 0" style="color: green;">{{ item.percent_change_60d.toFixed(2) }}%</span>
        <span v-else style="color: red;">{{ item.percent_change_60d.toFixed(2) }}%</span>
    </template>

    <template v-slot:[`item.percent_change_90d`]="{ item }">
        <span v-if="item.percent_change_90d > 0" style="color: green;">{{ item.percent_change_90d.toFixed(2) }}%</span>
        <span v-else style="color: red;">{{ item.percent_change_90d.toFixed(2) }}%</span>
    </template>

    <template v-slot:[`item.volume_24h`]="{ item }">
        <span>{{ abbreviate(item.volume_24h) }}</span>
    </template>

    <template v-slot:[`item.price`]="{ item }">
        <span>{{ abbreviate(item.price) }}</span>
    </template>

     <template v-slot:[`item.market_cap`]="{ item }">
        <span>{{ abbreviate(item.market_cap) }}</span>
    </template>

    <template v-slot:[`item.total_supply`]="{ item }">
        <span>{{ abbreviate(item.total_supply) }}</span>
    </template>

    <template v-slot:[`item.max_supply`]="{ item }">
        <span>{{ abbreviate(item.max_supply) }}</span>
    </template>
    <template v-slot:[`item.circulating_supply`]="{ item }">
        <span>{{ abbreviate(item.circulating_supply) }}</span>
    </template>

      <template v-slot:[`item.mark_cap_dominance`]="{ item }">
        <span>{{ percentify(item.mark_cap_dominance) }}</span>
    </template>

    <template v-slot:[`item.cmc_rank`]="{ item }">
        <span>{{ rank(item.cmc_rank) }}</span>
    </template>

    <template v-slot:[`item.date_added`]="{ item }">
        <span>{{   (new Date(item.date_added).getMonth() + 1)  + '-'
           +  new Date(item.date_added).getDate() + '-' +new Date(item.date_added).getFullYear()}}</span>
    </template>
    </v-data-table>

  </v-card>
</v-container>
</template>

<script>
const numeral = require('numeral');

export default {
  head() {
    return {
      meta: [
        {name: 'description', content: 'Table showing top cryptocurrencies by name, symbol, price, ranking, supply, percentage change, and market cap'}
      ]
    }
  },
  data() {
    return {
        cryptoData: [],
        search: '',
        fields: [
            {text: 'Symbol', value: 'symbol'},
            {text: 'Name', value: 'name'},
            {text: 'Date Added', value: 'date_added', width: '10%'},
            {text: 'Price', value: 'price'},
            {text: ' CoinMarketCap Rank', value: 'cmc_rank'},
            {text: '24H Volume', value: 'volume_24h'},
            // {text: 'Max Supply', value: 'max_supply'},
            {text: 'Supply', value: 'circulating_supply'},
            {text: '24H Price Change', value: 'percent_change_24h'},
            {text: '7D Price Change', value: 'percent_change_7d'},
            {text: '30 Day Price Change', value: 'percent_change_30d'},
            // {text: '60 Day Price Change', value: 'percent_change_60d'},
            // {text: '90 Day Price Change', value: 'percent_change_90d'},
            {text: 'Market Cap', value: 'market_cap'},
            // {text: 'Market Cap Dominance', value: 'mark_cap_dominance'},
        ],
      
    };
  },
  methods: {

    async fetchListing() {
      this.cryptoData = await this.$axios.$get('/crypto/listings');
    },
    abbreviate(num) {
      return numeral(num).format('0.00a');
    },
    percentify(num) {
      return numeral(num).format('0.00%');
    },

    priceChange(num) {
      return numeral(num).format('0,0.00')
    },
    rank(num) {
      return numeral(num).format('0o')
    }
  },

  mounted() {
      this.fetchListing();
  }
}
</script>

<style>

</style>