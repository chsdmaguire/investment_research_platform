<template>
  <v-container fluid>
       <v-card
    class="mx-auto"
  >
    <v-list>
      <v-list-group no-action
          sub-group>
          <template v-slot:activator>
          <v-list-item-title>Similar Companies</v-list-item-title>
          </template>
          <v-list-item>
              <SimilarCompanies />
          </v-list-item>       
      </v-list-group>

        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Basic Info</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-card flat class="mx-auto">
          <v-simple-table dense>
              <tbody>
               <tr>
                  <td>Country</td>
                  <td>{{ basicInfo.country }}</td>
              </tr>   
              <tr>
                  <td>Exchange</td>
                  <td>{{ basicInfo.exchange }}</td>
              </tr>
              <tr>
                  <td>Sector</td>
                  <td>{{ basicInfo.sector }}</td>
              </tr>
              <tr>
                  <td>IPO Date</td>
                  <td>{{ formatDate(basicInfo.ipo) }}</td>
              </tr>
              <tr>
                  <td>Market Cap</td>
                  <td>{{ formatMarketCap(basicInfo.market_cap) }}</td>
              </tr>
              <tr>
                  <td>Shares Outst.</td>
                  <td>{{ formatMarketCap(basicInfo.shares_outstanding) }}</td>
              </tr>
              <tr>
                  <td>Site</td>
                  <td>{{ basicInfo.weburl }}</td>
              </tr>
              </tbody>
              
          </v-simple-table>
          </v-card>

        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Key Market Stats</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-card flat class="mx-auto">
          <v-simple-table dense> 
              <tbody>
                  <tr v-for="(item, idx) in keyMetrics" :key="idx">
                      <td>{{ item.name }}</td>
                      <td>{{ formatChange(item.value) }}</td>
                  </tr>
              </tbody>

          </v-simple-table>
          </v-card>
        </v-list-group>

        <v-list-group no-action
          sub-group>
          <template v-slot:activator>
          <v-list-item-title>Company Description</v-list-item-title>
          </template>
          <v-list-item>
              <p>{{ basicInfo.description }}</p>
          </v-list-item>       
      </v-list-group>

    </v-list>
  </v-card>

  </v-container>
</template>

<script>
const numeral = require('numeral');

import SimilarCompanies from './SimilarCompanies';
export default {
    components: {SimilarCompanies},
    data () {
        return {
            admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
      basicInfo: [],
      keyMetrics: [],

        }
    },

    methods: {
        formatChange(val) {
                return numeral(val).format('0.00')
            },
        async getBasicInfo() {
            const ticker = this.$route.params.ticker.toUpperCase();
            const res = await this.$axios.get(`/api/stock/basic/info/${ticker}`);
            this.basicInfo = res.data[0];
            const response = await this.$axios.get(`/api/stock/key/metrics/${ticker}`);
            response.data.forEach(item => {
                if(item.metric == 'psAnnual'){this.keyMetrics.push({name: 'Price to Sales', value: Number(item.value)})}
                else if(item.metric == 'grossMarginAnnual'){this.keyMetrics.push({name: 'Gross Margin', value: Number(item.value)})}
                else if(item.metric == 'operatingMarginAnnual'){this.keyMetrics.push({name: 'Operating Margin', value: Number(item.value)})}
                else if(item.metric == 'peNormalizedAnnual'){this.keyMetrics.push({name: 'Price to Earnings', value: Number(item.value)})}
                else if(item.metric == 'dividendPerShareAnnual'){this.keyMetrics.push({name: 'Dividend per Share', value: Number(item.value)})}
                else if(item.metric == 'beta'){this.keyMetrics.push({name: 'Beta', value: Number(item.value)})}
                else if(item.metric == 'revenueGrowth3Y'){this.keyMetrics.push({name:'3Y Revenue Growth', value: Number(item.value)})}
            });
        },

        formatMarketCap(val) {
          return numeral(val * 1000000).format('0.0a')
        },

        formatDate(val) {
          return new Date(val).toLocaleDateString('en-US');
        }
    },

    mounted () {
        this.getBasicInfo();
    }
}
</script>

<style>

</style>