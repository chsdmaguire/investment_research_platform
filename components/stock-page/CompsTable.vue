<template>

      <v-container class="mt-10">
        <v-row class="justify-center">
          <h1>Comparisons Analysis</h1>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-model="initialCompetitors"
              :items="allCompanies"
              filled
              chips
              cache-items

              label="Select"
              item-text="name"
              item-value="ticker"
              multiple
            >
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
                 <v-list-item-title v-text="data.name"></v-list-item-title>
                 </v-list-item-content>
              </template>  
              
            </v-autocomplete> 

                <v-data-table
                :headers="headers"
                :items="competitorMetrics"
                hide-default-footer
                class="elevation-1">

                <template v-slot:[`item.pe_norm_anual`]= "{ item }">
                  {{ item.pe_norm_anual.toFixed(2) }}
                </template> 

                <template v-slot:[`item.ev_ebitda`]= "{ item }">
                  {{ item.ev_ebitda.toFixed(2) }}
                </template> 
                <template v-slot:[`item.ps_annual`]= "{ item }">
                  {{ item.ps_annual.toFixed(2) }}
                </template> 
                <template v-slot:[`item.pb_annual`]= "{ item }">
                  {{ item.pb_annual.toFixed(2) }}
                </template> 

                <template v-slot:[`item.ev_ebit`]= "{ item }">
                  {{ item.ev_ebit.toFixed(2) }}
                </template> 

                <template v-slot:[`item.p_fcf_annual`]= "{ item }">
                  {{ item.p_fcf_annual.toFixed(2) }}
                </template> 
                </v-data-table>

              <v-card class="mt-4">
                 <v-simple-table>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Calculation
                      </th>
                      <th class="text-left">
                        P/E
                      </th>
                      <th class="text-left">
                        EV/EBITDA
                      </th>
                      <th class="text-left">
                        Price/Sales
                      </th>
                      <th class="text-left">
                        Price/Book
                      </th>
                      <th class="text-left">
                        EV/EBIT
                      </th>
                      <th class="text-left">
                        Price/FCF
                      </th>
                    </tr>
                  </thead>
                <tbody>
                  <tr> 
                    <td>Average</td>
                    <td>{{ Math.round(this.PEavg * 100) / 100 }}  </td>
                    <td>{{ Math.round(this.EVEBITDAavg * 100) / 100 }}  </td>
                    <td>{{ Math.round(this.PsalesAvg * 100) / 100 }}  </td>
                    <td>{{ Math.round(this.PBavg * 100) / 100 }}  </td>
                    <td>{{ Math.round(this.EVtoEBITavg * 100) / 100 }}  </td>
                    <td>{{ Math.round(this.EVtoFCFavg * 100) / 100 }}  </td>
                  </tr>
                  <tr> 
                    <td>Median</td>
                    <td>{{ Math.round(this.PEmedian * 100) / 100 }}  </td>
                    <td>{{ Math.round(this.EVEBITDAmedian * 100) / 100 }}  </td>
                    <td>{{ Math.round(this.PSalesMedian * 100) / 100 }}  </td>
                    <td>{{ Math.round(this.PBmedian * 100) / 100 }}  </td>
                    <td>{{ Math.round(this.EVtoEBITmedian * 100) / 100 }}  </td>
                    <td>{{ Math.round(this.EVtoFCFmedian * 100) / 100 }}  </td>
                  </tr>
                  <tr>
                    <td v-for="metric in tickerComps" :key="metric.ticker">{{ metric.ticker }}</td>
                    <td v-for="metric in tickerComps" :key="metric.pe_norm_anual">{{ Math.round(metric.pe_norm_anual* 100) / 100 }}</td>
                    <td v-for="metric in tickerComps" :key="metric.ev_ebitda">{{ Math.round(metric.ev_ebitda* 100) / 100 }}</td>
                    <td v-for="metric in tickerComps" :key="metric.ps_annual">{{ Math.round(metric.ps_annual* 100) / 100 }}</td>
                    <td v-for="metric in tickerComps" :key="metric.pb_annual">{{ Math.round(metric.pb_annual* 100) / 100 }}</td>
                    <td v-for="metric in tickerComps" :key="metric.ev_ebit">{{ Math.round(metric.ev_ebit* 100) / 100 }}</td>
                    <td v-for="metric in tickerComps" :key="metric.p_fcf_annual">{{ Math.round(metric.p_fcf_annual* 100) / 100 }}</td>
                  </tr>
                <tr>
                     <td>Exp. Share Price</td>
                    <td> {{ ((this.netInc / this.numOfShares) * this.PEmedian).toFixed() }} </td> 
                     <td> {{   (((this.EVEBITDAmedian * this.ebit_da) - this.netDebt) / this.numOfShares).toFixed() }}</td>   
                    <td> {{ (this.revPerShare * this.PSalesMedian).toFixed() }} </td> 
                    <td> {{ ((this.bvPerShare * this.PBmedian).toFixed() )}} </td>  
                    <td> {{ (((this.EVtoEBITmedian * this.operInc) - this.netDebt) /this.numOfShares).toFixed()}} </td>
                    <td> {{ ((( (1 / (( 1 / (this.markCap * 1000000) ) * this.priceFcf))
                       * this.EVtoFCFmedian) - this.netDebt)  / this.numOfShares).toFixed() }} </td>                
                  </tr>
                </tbody>
              </v-simple-table>
              </v-card>


          </v-col>
        </v-row>
      </v-container>

</template>

<script>
export default {
    data () {
        return {
        netInc: 0,
        numOfShares: 0,
        ebit_da: 0,
        netDebt: 0,
        revPerShare: 0,
        bvPerShare: 0,
        operInc: 0,
        markCap: 0,
        priceFcf: 0,

        initialCompetitors: [],
        competitorMetrics: [],
        allCompanies: [],
        allMetrics: [],
        PEratio : [],
        EVebitda: [],
        Psales: [],
        PBratio: [],
        EVtoEBIT: [],
        EVtoFCF: [],
        EVtoOCF: [],
        tickerComps: [],
        PEavg : 0,
        EVEBITDAavg: 0,
        PsalesAvg: 0,
        PBavg: 0,
        EVtoEBITavg: 0,
        EVtoFCFavg: 0,
        PEmedian: 0,
        EVEBITDAmedian: 0,
        PSalesMedian: 0,
        PBmedian: 0,
        EVtoEBITmedian: 0,
        EVtoFCFmedian: 0,
        EVtoOCFmedian: 0, 
        autoUpdate: true,
        headers: [
          {text: 'Ticker', value: 'ticker'},
          {text: 'Name', value: 'name'},
          {text: 'P/E', value: 'pe_norm_anual'},
          {text: 'EV/EBITDA', value: 'ev_ebitda'},
          {text: 'Price/Sales', value: 'ps_annual'},
          {text: 'Price/Book', value: 'pb_annual'},
          {text: 'EV/EBIT', value: 'ev_ebit'},
          {text: 'Price/FCF', value: 'p_fcf_annual'},
        ],
        competitorList: [],
        
        }
    },

    methods: {
        
      async getallComps() {
          const ticker = this.$route.params.ticker.toUpperCase();
        const companyComps = await this.$axios.$get(`/stock/market/allcomps/${ticker}`);
        this.allMetrics = companyComps;
        this.competitorList = await this.$axios.$get(`/stock/competitors/${ticker}`);
        if (this.allMetrics.length > 0) {
        for(const company in this.allMetrics){

          for(var i = 0; i < this.competitorList.length; i++) {

            if(this.competitorList[i].peers === this.allMetrics[company].ticker) {

              this.initialCompetitors.push(this.allMetrics[company].ticker)
              this.competitorMetrics.push(this.allMetrics[company])
              this.PEratio.push(Number(this.allMetrics[company].pe_norm_anual))
              this.EVebitda.push(Number(this.allMetrics[company].ev_ebitda))
              this.Psales.push(Number(this.allMetrics[company].ps_annual))
              this.PBratio.push(Number(this.allMetrics[company].pb_annual))
              this.EVtoEBIT.push(Number(this.allMetrics[company].ev_ebit))
              this.EVtoFCF.push(Number(this.allMetrics[company].p_fcf_annual))
            }
            else {
              
           this.allCompanies.push(this.allMetrics[company].ticker);
                        } 
                      }
                    };          
        }
          if (this.initialCompetitors.length > 0) {
            for(var i = 0; i < this.initialCompetitors.length; i++) {
              this.index++
              this.allCompanies.push(this.initialCompetitors[i]);

            };

          }

            this.PEavg = this.PEratio.reduce((a, b) => a + b) / this.PEratio.length;
            this.EVEBITDAavg = this.EVebitda.reduce((a, b) => a + b) / this.EVebitda.length;
            this.PsalesAvg = this.Psales.reduce((a, b) => a + b) / this.Psales.length;
            this.PBavg = this.PBratio.reduce((a, b) => a + b) / this.PBratio.length;
            this.EVtoEBITavg = this.EVtoEBIT.reduce((a, b) => a + b) / this.EVtoEBIT.length;
            this.EVtoFCFavg = this.EVtoFCF.reduce((a, b) => a + b) / this.EVtoFCF.length;

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

            this.EVtoFCFmedian = this.EVtoFCF.length % 2 == 0 ? 
            (this.EVtoFCF.sort()[Math.ceil(this.EVtoFCF.length / 2)] + 
            this.EVtoFCF.sort()[this.EVtoFCF.length - 1]) / 2 : this.EVtoFCF.sort()[this.EVtoFCF.length - 1];

    
        },
      
      async getcompanyComps() {
          const ticker = this.$route.params.ticker.toUpperCase();
          const tickComps = await this.$axios.$get(`/comps/${ticker}`);
          if (tickComps.length > 0) {
          this.tickerComps = tickComps;
          this.netInc = tickComps[0].net_income;
          this.numOfShares = tickComps[0].numshares;
          this.ebit_da = tickComps[0].ebitda;
          this.netDebt = tickComps[0].net_debt_annual;
          this.revPerShare = tickComps[0].rev_share_ttm;
          this.bvPerShare = tickComps[0].bv_share_annual;
          this.operInc = tickComps[0].ebit;
          this.markCap = tickComps[0].market_capitalization;
          this.priceFcf = tickComps[0].p_fcf_annual            
          }

        },   
        remove (item) {
        const index = this.initialCompetitors.indexOf(item)
        if (index >= 0) this.initialCompetitors.splice(index, 1)
        this.competitorMetrics.splice(index, 1)

        this.PEratio.splice(index, 1)
        this.EVebitda.splice(index, 1)
        this.Psales.splice(index, 1)
        this.PBratio.splice(index, 1)

        this.PEavg = this.PEratio.reduce((a, b) => a + b) / this.PEratio.length
        this.EVEBITDAavg = this.EVebitda.reduce((a, b) => a + b) / this.EVebitda.length
        this.PsalesAvg = this.Psales.reduce((a, b) => a + b) / this.Psales.length
        this.PBavg = this.PBratio.reduce((a, b) => a + b) / this.PBratio.length

        this.PEmedian = this.PEratio.length % 2 == 0 ? 
        (this.PEratio.sort()[Math.ceil(this.PEratio.length / 2)] + 
        this.PEratio.sort()[this.PEratio.length - 1]) / 2 : this.PEratio.sort()[this.PEratio.length - 1];

        this.EVEBITDAmedian = this.EVebitda.length % 2 == 0 ? 
        (this.EVebitda.sort()[Math.ceil(this.EVebitda.length / 2)] + 
        this.PEratio.sort()[this.EVebitda.length - 1]) / 2 : this.EVebitda.sort()[this.EVebitda.length - 1];

        this.PSalesMedian = this.Psales.length % 2 == 0 ? 
        (this.Psales.sort()[Math.ceil(this.Psales.length / 2)] + 
        this.PEratio.sort()[this.Psales.length - 1]) / 2 : this.Psales.sort()[this.Psales.length - 1];

        this.PBmedian = this.PBratio.length % 2 == 0 ? 
        (this.PBratio.sort()[Math.ceil(this.PBratio.length / 2)] + 
        this.PEratio.sort()[this.PBratio.length - 1]) / 2 : this.PBratio.sort()[this.PBratio.length - 1];

        this.index--
        },
       updateList (item) {
          for(const compData in this.allMetrics){
          if(item === this.allMetrics[compData].ticker) {
            this.initialCompetitors.push(item)
              this.initialCompetitors.push(this.allMetrics[compData].ticker);
              this.competitorMetrics.push(this.allMetrics[compData])

              // regular metrics
              this.PEratio.push(Number(this.allMetrics[compData].pe_norm_anual))
              this.EVebitda.push(Number(this.allMetrics[compData].ev_ebitda))
              this.Psales.push(Number(this.allMetrics[compData].ps_annual))
              this.PBratio.push(Number(this.allMetrics[compData].pb_annual))
              this.EVtoEBIT.push(Number(this.allMetrics[compData].ev_ebit))
              this.EVtoFCF.push(Number(this.allMetrics[compData].p_fcf_annual))

              // calculate Average for each column
              this.PEavg = this.PEratio.reduce((a, b) => a + b) / this.PEratio.length
              this.EVEBITDAavg = this.EVebitda.reduce((a, b) => a + b) / this.EVebitda.length
              this.PsalesAvg = this.Psales.reduce((a, b) => a + b) / this.Psales.length
              this.PBavg = this.PBratio.reduce((a, b) => a + b) / this.PBratio.length
              this.EVtoEBITavg = this.EVtoEBIT.reduce((a, b) => a + b) / this.EVtoEBIT.length
              this.EVtoEBITavg = this.EVtoEBIT.reduce((a, b) => a + b) / this.EVtoEBIT.length

              // calulate median for each column
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

              this.EVtoFCFmedian = this.EVtoFCF.length % 2 == 0 ? 
              (this.EVtoFCF.sort()[Math.ceil(this.EVtoFCF.length / 2)] + 
              this.EVtoFCF.sort()[this.EVtoFCF.length - 1]) / 2 : this.EVtoFCF.sort()[this.EVtoFCF.length - 1];

              this.EVtoOCFmedian = this.EVtoOCF.length % 2 == 0 ? 
              (this.EVtoOCF.sort()[Math.ceil(this.EVtoOCF.length / 2)] + 
              this.EVtoOCF.sort()[this.EVtoOCF.length - 1]) / 2 : this.EVtoOCF.sort()[this.EVtoOCF.length - 1];
            }
          }
      },
        },

    mounted() {
        this.getcompanyComps();
        this.getallComps();

    }

}
</script>

