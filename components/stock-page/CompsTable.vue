<template>
  <v-container fluid>
      <template v-if="loading">
          <v-row justify="center" align="center">
            <v-progress-circular
            :rotate="-90"
            :size="300"
            :width="15"
            :value="value"
            color="primary"
            >
                <span class="loading-value">
                    {{ formatLoader(value) }}
                </span> 
                                        
            </v-progress-circular>   
          </v-row>
  
      </template>

      <template v-else>
  
      <v-row justify="center" align="center">
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
      <v-row justify="center" align="center">
          <v-col cols="8">
              <v-row>
                  <v-col cols="12">
                    <div class="market-table">
                        <v-simple-table dense>
                            <thead>
                                <tr>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">Ticker</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                    <th><v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">Name</span>
                                            </template>
                                        </v-tooltip></th>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">Price</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                     <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">Shares</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">Market Cap</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                   
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">Enterprise Value</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(stock, idx) in compsTable" :key="idx">
                                    <td>{{ stock.ticker }}</td>
                                    <td>{{ stock.name }}</td>
                                    <td>{{ formatPrice(stock.price) }} </td>
                                    <td>{{ bigNumber((stock.market_cap * 1000000) / stock.price) }} </td>
                                    <td>{{ bigNumber(stock.market_cap * 1000000) }}</td>
                                    <td>{{ bigNumber((stock.market_cap * 1000000) + stock.debt) }}</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12">
                    <div class="financials-table">
                        <v-simple-table dense>
                            <thead>
                                <tr>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">Ticker</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                    <th><v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">Sales</span>
                                            </template>
                                        </v-tooltip></th>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">BV</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                     <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">Net Income</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">EBIT</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                   
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">EBITDA</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">OCF</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(stock, idx) in compsTable" :key="idx">
                                    <td>{{ stock.ticker }}</td>
                                    <td>{{ bigNumber(stock.revenue) }}</td>
                                    <td>{{ bigNumber(stock.bookvalue) }} </td>
                                    <td>{{ bigNumber(stock.netincome) }}</td>
                                    <td>{{ bigNumber(stock.ebit) }}</td>
                                    <td>{{ bigNumber(stock.ebitda) }}</td>
                                    <td>{{ bigNumber(stock.ocf) }}</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12">
                    <div class="metric-table">
                        <v-simple-table dense>
                            <thead>
                                <tr>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">Ticker</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                    <th><v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">P/Sales</span>
                                            </template>
                                        </v-tooltip></th>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">EV/EBIT</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                     <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">EV/EBITDA</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">P/E</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                   
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">P/B</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">P/OCF</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(stock, idx) in compsTable" :key="idx">
                                    <td>{{ stock.ticker }}</td>
                                    <td class="multiples">{{ metricFormat((stock.market_cap * 1000000) / stock.revenue) }}</td>
                                    <td class="multiples"> {{ metricFormat(((stock.market_cap * 1000000) + stock.debt) / stock.ebit) }} </td>
                                    <td class="multiples">{{ metricFormat(((stock.market_cap * 1000000) + stock.debt) / stock.ebitda) }}</td>
                                    <td class="multiples">{{ metricFormat((stock.market_cap * 1000000) / stock.netincome) }}</td>
                                    <td class="multiples">{{ metricFormat((stock.market_cap * 1000000) / stock.bookvalue) }}</td>
                                    <td class="multiples">{{ metricFormat((stock.market_cap * 1000000) / stock.ocf) }}</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12">
                    <div class="calc-table">
                        <v-simple-table dense>
                            <thead>
                                <tr>
                                    <th>
                                    </th>
                                    <th><v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">P/Sales</span>
                                            </template>
                                        </v-tooltip></th>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">EV/EBIT</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                     <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">EV/EBITDA</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">P/E</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                   
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">P/B</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                    <th>
                                        <v-tooltip bottom color="light-blue darken-4">
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" class="fsli-name">P/OCF</span>
                                            </template>
                                        </v-tooltip>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="avg">Average</td>
                                    <td  class="multiples">{{ metricFormat(this.PsalesAvg) }}</td>
                                     <td  class="multiples">{{ metricFormat(this.EVtoEBITavg) }}</td>
                                    <td  class="multiples">{{ metricFormat(this.EVEBITDAavg) }}</td>
                                    <td  class="multiples">{{ metricFormat(this.PEavg) }}</td>
                                    <td  class="multiples">{{ metricFormat(this.PBavg) }}</td>                                   
                                    <td  class="multiples">{{ metricFormat(this.PtoOCFavg) }}</td>
                                </tr>
                                <tr>
                                    <td  class="avg">Median</td>
                                    <td  class="multiples">{{ metricFormat(this.PSalesMedian) }}</td>
                                     <td  class="multiples">{{ metricFormat(this.EVtoEBITmedian) }}</td>
                                    <td  class="multiples">{{ metricFormat(this.EVEBITDAmedian) }}</td>
                                    <td  class="multiples">{{ metricFormat(this.PEmedian) }}</td>
                                    <td  class="multiples">{{ metricFormat(this.PBmedian) }}</td>                                 
                                    <td  class="multiples">{{ metricFormat(this.PtoOCFmedian) }}</td>
                                </tr>
                                <tr>
                                    <td  class="avg">exp. Share Price</td>
                                    <td> {{ formatPrice((this.thisCompany[0].revenue * this.PsalesAvg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) }} </td>
                                        <td> {{ formatPrice(((this.thisCompany[0].ebit * this.EVtoEBITavg) - this.thisCompany[0].debt) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) }} </td>
                                    <td> {{ formatPrice(((this.thisCompany[0].ebitda * this.EVEBITDAavg - this.thisCompany[0].debt)) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) }} </td>
                                    <td> {{ formatPrice((this.thisCompany[0].netincome * this.PEavg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) }} </td>
                                    <td> {{ formatPrice((this.thisCompany[0].bookvalue * this.PBavg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) }} </td>                   
                                    <td> {{ formatPrice((this.thisCompany[0].ocf * this.PtoOCFavg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) }} </td>
                                </tr>
                                <tr>
                                    <td>% Difference</td>
                                    <td>
                                        <span v-if="((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].revenue) > this.PsalesAvg" style="color:red">
                                        {{ formatPercent((((this.thisCompany[0].revenue * this.PsalesAvg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) 
                                        - this.thisCompany[0].price) / this.thisCompany[0].price)  }}</span>
                                        <span v-else style="color:green"> {{ formatPrice((((this.thisCompany[0].revenue * this.PsalesAvg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) 
                                        - this.thisCompany[0].price) / this.thisCompany[0].price)  }}</span>
                                    </td>
                                    <td>
                                        <span v-if="(((this.thisCompany[0].market_cap * 1000000)+this.thisCompany[0].debt)/this.thisCompany[0].ebit) > this.EVtoEBITavg" style="color:red">
                                        {{ formatPercent(((((this.thisCompany[0].ebit * this.EVtoEBITavg) - this.thisCompany[0].debt) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) 
                                        - this.thisCompany[0].price) / this.thisCompany[0].price) }}
                                        </span>
                                        <span v-else style="color:green"> {{ formatPrice(((((this.thisCompany[0].ebit * this.EVtoEBITavg) - this.thisCompany[0].debt) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) 
                                        - this.thisCompany[0].price) / this.thisCompany[0].price) }}</span>
                                    </td>
                                    <td>
                                          <span v-if="(((this.thisCompany[0].market_cap * 1000000)+this.thisCompany[0].debt)/this.thisCompany[0].ebitda) > this.EVEBITDAavg" style="color:red">
                                        {{ formatPercent(((((this.thisCompany[0].ebitda * this.EVEBITDAavg) - this.thisCompany[0].debt) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) 
                                        - this.thisCompany[0].price) / this.thisCompany[0].price) }}
                                        </span>
                                        <span v-else style="color:green"> {{ formatPrice(((((this.thisCompany[0].ebitda * this.EVEBITDAavg) - this.thisCompany[0].debt) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) 
                                        - this.thisCompany[0].price) / this.thisCompany[0].price) }}</span>
                                    </td>
                                    <td>
                                        <span v-if="((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].netincome) > this.PEavg" style="color:red">
                                        {{ formatPercent((((this.thisCompany[0].netincome * this.PEavg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) 
                                        - this.thisCompany[0].price) / this.thisCompany[0].price)  }}</span>
                                        <span v-else style="color:green"> {{ formatPrice((((this.thisCompany[0].netincome * this.PEavg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) 
                                        - this.thisCompany[0].price) / this.thisCompany[0].price)  }}</span>
                                    </td>
                                     <td>
                                        <span v-if="((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].bookvalue) > this.PBavg" style="color:red">
                                        {{ formatPercent((((this.thisCompany[0].bookvalue * this.PBavg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) 
                                        - this.thisCompany[0].price) / this.thisCompany[0].price)  }}</span>
                                        <span v-else style="color:green"> {{ formatPrice((((this.thisCompany[0].bookvalue * this.PBavg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) 
                                        - this.thisCompany[0].price) / this.thisCompany[0].price)  }}</span>
                                    </td>
                                    <td>
                                        <span v-if="((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].ocf) > this.PtoOCFavg" style="color:red">
                                        {{ formatPercent((((this.thisCompany[0].ocf * this.PtoOCFavg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) 
                                        - this.thisCompany[0].price) / this.thisCompany[0].price)  }}</span>
                                        <span v-else style="color:green"> {{ formatPercent((((this.thisCompany[0].ocf * this.PtoOCFavg) / ((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].price)) 
                                        - this.thisCompany[0].price) / this.thisCompany[0].price)  }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>
                  </v-col>
              </v-row>
          </v-col>
           <v-col cols="3">
               <div class="ticker-table">
              <v-simple-table>
                  <thead>
                      <th></th>
                      <th></th>
                  </thead>
                  <tbody>
                      <tr>
                          <td class="fsli-name">Ticker</td>
                          <td>{{ this.thisCompany[0].ticker }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">Name</td>
                          <td> {{ this.thisCompany[0].name }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">Price</td>
                          <td>{{ formatPrice(this.thisCompany[0].price) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">Shares</td>
                          <td>{{bigNumber(this.thisCompany[0].market_cap / this.thisCompany[0].price)}}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">Market Cap</td>
                          <td>{{ bigNumber(this.thisCompany[0].market_cap * 1000000) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">EV</td>
                          <td>{{ bigNumber((this.thisCompany[0].market_cap * 1000000) + this.thisCompany[0].debt) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">Sales</td>
                          <td> {{ bigNumber(this.thisCompany[0].revenue) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">BV</td>
                          <td>{{ bigNumber(this.thisCompany[0].bookvalue) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">Net Income</td>
                          <td>{{ bigNumber(this.thisCompany[0].netincome) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">EBIT</td>
                          <td>{{ bigNumber(this.thisCompany[0].ebit) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">EBITDA</td>
                          <td>{{ bigNumber(this.thisCompany[0].ebitda) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">OCF</td>
                          <td>{{ bigNumber(this.thisCompany[0].ocf) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">P/Sales</td>
                          <td  class="multiples">{{ metricFormat((this.thisCompany[0].market_cap * 1000000)/ this.thisCompany[0].revenue) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">EV/EBIT</td>
                          <td  class="multiples">{{ metricFormat(((this.thisCompany[0].market_cap * 1000000) + this.thisCompany[0].debt) / this.thisCompany[0].ebit) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">EV/EBITDA</td>
                          <td  class="multiples">{{ metricFormat(((this.thisCompany[0].market_cap * 1000000) + this.thisCompany[0].debt) / this.thisCompany[0].ebitda) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">P/E</td>
                          <td  class="multiples">{{ metricFormat((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].netincome) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">P/B</td>
                          <td  class="multiples">{{ metricFormat((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].bookvalue) }}</td>
                      </tr>
                      <tr>
                          <td class="fsli-name">P/OCF</td>
                          <td  class="multiples">{{ metricFormat((this.thisCompany[0].market_cap * 1000000) / this.thisCompany[0].ocf) }}</td>
                      </tr>
                      
                  </tbody>
              </v-simple-table>
               </div>
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

            value: 0,
            interval: {},
            loadingMessage: '',
        }
    },
    // beforeDestroy () {
    //   clearInterval(this.interval)
    // },
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

        formatLoader(val) {
            return numeral(val / 100).format('0%')
        },
        formatPercent(val) {
          return numeral(val).format('0.00%')
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
        this.interval = setInterval(() => {
        if (this.value === 90) {
          return (this.value = 90)
        }
        this.value += 10
      }, 1000);
      this.loadingMessage = setInterval(() => {
          if (this.interval === 10) {
                return (this.loadingMessage = 'Gathering Financial Data')
            }
            else if (this.interval === 30) {
                return (this.loadingMessage = 'Calculating valuation multiples')
            }
            else if (this.interval === 70) {
                 return (this.loadingMessage = 'Determining main competitors')
            }
      }, 1000)
    }
}
</script>

<style scoped>
tbody {
    font-weight: 400;
    color: #fff;
    font-size: 20%;
    font-family: 'Helvetica';
}

.loading-value{
    font-size: 300%;
    font-weight: bold;
}

* {
    background-color: rgba(18,18, 18, 0)
    }

.fsli-name {
    font-weight: 600;
}

.zebra {
    background-color: #121212
}

.financials-table {
    border: 1px solid;
    border-color: rgb(63, 81, 181);
    background-color: rgb(63, 81, 181);
    border-radius: 5px;
    margin: 5px;
    padding: 2px;
}

.financials-table th {
    background-color: rgb(63, 81, 181);
}

.market-table {
    border: 1px solid;
    border-color: rgb(46, 118, 111);
    background-color: rgb(46, 118, 111);
    border-radius: 5px;
    margin: 5px;
    padding: 2px;
}

.market-table th {
    background-color: rgb(46, 118, 111);
}

.calc-table {
    border: 1px solid;
    border-color: rgb(192, 152, 25);
    background-color: rgb(192, 152, 25);
    border-radius: 5px;
    margin: 5px;
    padding: 2px;
}

.calc-table th {
    background-color: rgb(192, 152, 25);
}

.metric-table {
    border: 1px solid;
    border-color: #ed7955;
    background-color: #ed7955;
    border-radius: 5px;
    margin: 5px;
    padding: 2px;
}

.metric-table th {
    background-color: #ed7955;
}

.ticker-table {
    border: 1px solid;
    border-color: #46bdc6;
    background-color: #46bdc6;
    border-radius: 5px;
    margin: 5px;
    padding: 2px;
}

.ticker-table th {
    background-color: #46bdc6;
}

.avg {
    width: 13%;
}
    
</style>