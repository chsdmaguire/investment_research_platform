<template>
  <v-container fluid>
      <template v-if="loading">
        <v-skeleton-loader dark type="date-picker">
        </v-skeleton-loader>         
      </template>

      <template v-else>
      <v-row align="center" justify="center">
          <v-col cols="12">
              <v-autocomplete
                v-model="initialCompetitors"
                filled
                chips
                cache-items
                :items="allCompanies"
                label="Select"
                item-text="title"
                item-value="ticker"
                multiple>

          <template v-slot:selection="data">
                <v-chip
                  :input-value="data.selected"
                  close
                  @click:close="remove(data.item)"
                  color="indigo"
                  class="white--text text-uppercase"
                >
                  {{ data.item }}
                </v-chip>
              </template>
             <template v-slot:item="data">
                 <v-list-item-content v-text="data.item" :input-value="data.selected" 
                 @click="updateList(data.item)">
                 <v-list-item-title v-text="data.title"></v-list-item-title>
                 </v-list-item-content>
              </template>  

                </v-autocomplete>
          </v-col>
          
      </v-row>
      <v-row align="center" justify="center">
          <v-col cols="12">
      <v-simple-table>
          <thead>
              <tr>
                  <th v-for="(head, idx) in compsHead" :key="idx">
                      {{ head }}
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(stock, idx) in compsTable" :key="idx">
                  <td>
                      {{ stock.ticker }}
                  </td>
                  <td>
                      {{ stock.name }}
                  </td>
                  <td>
                      {{ formatPrice(stock.price) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.market_cap * 1000000) }}
                  </td>
                  <td>
                      {{ bigNumber((stock.market_cap * 1000000) + stock.debt) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.revenue) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.bookvalue) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.netincome) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.ebit) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.ebitda) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.ocf) }}
                  </td>
                  <td>
                      {{ metricFormat((stock.market_cap * 1000000) / stock.revenue) }}
                  </td>
                    <td>
                      {{ metricFormat((stock.market_cap * 1000000) / stock.netincome) }}
                  </td>
                   <td>
                      {{ metricFormat((stock.market_cap * 1000000) / stock.bookvalue) }}
                  </td>
                  <td>
                      {{ metricFormat(((stock.market_cap * 1000000) + stock.debt) / stock.ebit) }}
                  </td>
                  <td>
                      {{ metricFormat(((stock.market_cap * 1000000) + stock.debt) / stock.ebitda) }}
                  </td>
                  <td>
                      {{ metricFormat((stock.market_cap * 1000000) / stock.ocf) }}
                  </td>
              </tr>
          </tbody>
          <tbody>
            <tr v-for="(stock, idx) in thisCompany" :key="idx">
                <td>
                    {{ stock.ticker }}
                </td>
                <td>
                    {{ stock.name }}
                </td>
                <td>
                      {{ formatPrice(stock.price) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.market_cap * 1000000) }}
                  </td>
                  <td>
                      {{ bigNumber((stock.market_cap * 1000000) + stock.debt) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.revenue) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.bookvalue) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.netincome) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.ebit) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.ebitda) }}
                  </td>
                  <td>
                      {{ bigNumber(stock.ocf) }}
                  </td>
                  <td>
                      {{ metricFormat((stock.market_cap * 1000000) / stock.revenue) }}
                  </td>
                    <td>
                      {{ metricFormat((stock.market_cap * 1000000) / stock.netincome) }}
                  </td>
                   <td>
                      {{ metricFormat((stock.market_cap * 1000000) / stock.bookvalue) }}
                  </td>
                  <td>
                      {{ metricFormat(((stock.market_cap * 1000000) + stock.debt) / stock.ebit) }}
                  </td>
                  <td>
                      {{ metricFormat(((stock.market_cap * 1000000) + stock.debt) / stock.ebitda) }}
                  </td>
                  <td>
                      {{ metricFormat((stock.market_cap * 1000000) / stock.ocf) }}
                  </td>
            </tr>
          </tbody>
          <tbody>
              <tr>
                  <td>Average</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{{ metricFormat(this.PsalesAvg) }}</td>
                  <td>{{ metricFormat(this.PEavg) }}</td>
                  <td>{{ metricFormat(this.PBavg) }}</td>
                  <td>{{ metricFormat(this.EVtoEBITavg) }}</td>
                  <td>{{ metricFormat(this.EVEBITDAavg) }}</td>
                  <td>{{ metricFormat(this.PtoOCFavg) }}</td>
                  
              </tr>
              <tr> 
                  <td>Median</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{{ metricFormat(this.PSalesMedian) }}</td>
                  <td>{{ metricFormat(this.PEmedian) }}</td>
                  <td>{{ metricFormat(this.PBmedian) }}</td>
                  <td>{{ metricFormat(this.EVtoEBITmedian) }}</td>
                  <td>{{ metricFormat(this.EVEBITDAmedian) }}</td>
                  <td>{{ metricFormat(this.PtoOCFmedian) }}</td>
                  
                 
              </tr>
              <tr>
                  <td>exp. Share Price</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td> {{ formatPrice((this.thisCompany[0].revenue * this.PsalesAvg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) }} </td>
                  <td> {{ formatPrice((this.thisCompany[0].netincome * this.PEavg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) }} </td>
                  <td> {{ formatPrice((this.thisCompany[0].bookvalue * this.PBavg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) }} </td>
                  <td> {{ formatPrice(((this.thisCompany[0].ebit * this.EVtoEBITavg) - this.thisCompany[0].debt) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) }} </td>
                  <td> {{ formatPrice(((this.thisCompany[0].ebitda * this.EVEBITDAavg - this.thisCompany[0].debt)) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) }} </td>
                  <td> {{ formatPrice((this.thisCompany[0].ocf * this.PtoOCFavg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) }} </td>
                  
              </tr>
          </tbody>
      </v-simple-table>
      </v-col>
      </v-row>
      </template>
</v-container>
</template>

<script>
const numeral = require('numeral');

export default {
    data() {
        return {
            compsHead: ['Ticker', 'Name', 'Price', 'Market Cap', 'EV', 'Sales', 'BV', 'Net Income', 'EBIT', 'EBITDA', 'OCF', 'P/S', 'P/E', 'P/B', 'EV/EBIT', 'EV/EBITDA', 'P/OCF'],
            allData: [],
            competitorList: [],
            compsTable: [],
            thisCompany: [],
            selectList: [],
            initialCompetitors: [],
            allCompanies: [],
            loading: true,
            compsCalcs: [],

            PEratio : [],
            EVebitda: [],
            Psales: [],
            PBratio: [],
            EVtoEBIT: [],
            PtoOCF: [],

            PEavg: 0,
            EVEBITDAavg: 0,
            PsalesAvg: 0,
            PBavg: 0,
            EVtoEBITavg: 0,
            PtoOCFavg: 0,

            PEmedian: 0,
            EVEBITDAmedian: 0,
            PSalesMedian: 0,
            PBmedian: 0,
            EVtoEBITmedian: 0,
            PtoOCFmedian: 0, 
        }
    },
    
    methods: {
        bigNumber(val) {
          return numeral(val).format('0.0a')
    },
        metricFormat(val) {
            return numeral(val).format('0.0') + ' x'
        },

        formatPrice(val) {
            return numeral(val).format('0,0.0a')
        },

        async getComps() {
            this.loading = true;
            const response = await this.$axios.get('/stocks/comps');
            response.data.forEach(entry => {
                const newName = entry.ticker + " ( " + entry.name + " )";
                entry.title = newName;
                this.allData.push(entry)
            })
            this.allData = response.data;
            const ticker = this.$route.params.ticker.toUpperCase();
            const resp = await this.$axios.get(`/stock/competitors/${ticker}`);
            this.competitorList = resp.data
            this.allData.forEach(e => {

                this.allCompanies.push(e.title) 
                if (e.ticker === ticker) { this.thisCompany.push(e) } 
                this.competitorList.forEach(item => {

                if (item.peers === e.ticker) {
                        this.compsTable.push(e);
                        if (e.netincome > 0) { this.PEratio.push((e.market_cap * 1000000) / e.netincome) };
                         if (e.ebitda > 0) { this.EVebitda.push((e.market_cap + e.debt) / e.ebitda) };
                          this.Psales.push((e.market_cap * 1000000) / e.revenue);
                        if (e.bookvalue > 0 )this.PBratio.push((e.market_cap * 1000000) / e.bookvalue);
                         if (e.ebit > 0) { this.EVtoEBIT.push(((e.market_cap * 1000000) + e.debt) / e.ebit) };
                         if (e.ocf > 0) { this.PtoOCF.push(((e.market_cap * 1000000) + e.debt) / e.ocf) };
                        this.initialCompetitors.push(e.title)
                   }
                })
            });

            this.calcmetrics()

            this.loading = false;
        },

        calcmetrics() {
            this.PEavg = this.PEratio.reduce((a, b) => a + b) / this.PEratio.length;
            this.EVEBITDAavg = this.EVebitda.reduce((a, b) => a + b) / this.EVebitda.length;
            this.PsalesAvg = this.Psales.reduce((a, b) => a + b) / this.Psales.length;
            this.PBavg = this.PBratio.reduce((a, b) => a + b) / this.PBratio.length;
            this.EVtoEBITavg = this.EVtoEBIT.reduce((a, b) => a + b) / this.EVtoEBIT.length;
            this.PtoOCFavg = this.PtoOCF.reduce((a, b) => a + b) / this.PtoOCF.length;

            this.PEmedian = this.PEratio.length % 2 == 0 ? 
            (this.PEratio.sort()[Math.ceil(this.PEratio.length / 2)] + 
            this.PEratio.sort()[this.PEratio.length - 1]) / 2 : this.PEratio.sort()[this.PEratio.length - 1];

            this.EVEBITDAmedian = this.EVebitda.length % 2 == 0 ? 
            (this.EVebitda.sort()[Math.ceil(this.EVebitda.length / 2)] + 
            this.EVebitda.sort()[this.EVebitda.length - 1]) / 2 : this.EVebitda.sort()[this.EVebitda.length - 1];

            this.PSalesMedian = this.Psales.length % 2 == 0 ? 
            (this.Psales.sort()[Math.ceil(this.Psales.length / 2)] + 
            this.Psales.sort()[this.Psales.length - 1]) / 2 : this.Psales.sort()[this.Psales.length - 1];

            this.PBmedian = this.PBratio.length % 2 == 0 ? 
            (this.PBratio.sort()[Math.ceil(this.PBratio.length / 2)] + 
            this.PBratio.sort()[this.PBratio.length - 1]) / 2 : this.PBratio.sort()[this.PBratio.length - 1];

            this.EVtoEBITmedian = this.EVtoEBIT.length % 2 == 0 ? 
            (this.EVtoEBIT.sort()[Math.ceil(this.EVtoEBIT.length / 2)] + 
            this.EVtoEBIT.sort()[this.EVtoEBIT.length - 1]) / 2 : this.EVtoEBIT.sort()[this.EVtoEBIT.length - 1];

            this.PtoOCFmedian = this.PtoOCF.length % 2 == 0 ? 
            (this.PtoOCF.sort()[Math.ceil(this.PtoOCF.length / 2)] + 
            this.PtoOCF.sort()[this.PtoOCF.length - 1]) / 2 : this.PtoOCF.sort()[this.PtoOCF.length - 1];
        },

        
        remove (item) {
            console.log(item)
            const index = this.initialCompetitors.indexOf(item);
            if (index >= 0) this.initialCompetitors.splice(index, 1)
            this.compsTable.splice(index, 1)

            this.PEratio.splice(index, 1)
            this.EVebitda.splice(index, 1)
            this.Psales.splice(index, 1)
            this.PBratio.splice(index, 1)
            this.EVtoEBIT.splice(index, 1)
            this.PtoOCF.splice(index, 1)

            this.calcmetrics()

        },

        updateList (item) {
            this.allData.forEach(e => {
                if (item === e.title && this.initialCompetitors.includes(item) == false) {
                    this.initialCompetitors.push(item)
                    this.initialCompetitors.push(e.title)
                    this.compsTable.push(e)
                    if (e.netincome > 0) { this.PEratio.push((e.market_cap * 1000000) / e.netincome) };
                    if (e.ebitda > 0) { this.EVebitda.push((e.market_cap + e.debt) / e.ebitda) };
                    this.Psales.push((e.market_cap * 1000000) / e.revenue);
                this.PBratio.push((e.market_cap * 1000000) / e.bookvalue);
                    if (e.ebit > 0) { this.EVtoEBIT.push(((e.market_cap * 1000000) + e.debt) / e.ebit) };
                    if (e.ocf > 0) { this.PtoOCF.push(((e.market_cap * 1000000) + e.debt) / e.ocf) };
                }
            });

            this.calcmetrics()
        }
    },

    mounted() {
        this.getComps();
    }
}
</script>

<style scoped>
.table-head {
    font-weight: bold;
    color: #fff;
    font-size: 10%;
}
</style>