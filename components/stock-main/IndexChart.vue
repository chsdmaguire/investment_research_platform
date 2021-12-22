<template>
  <v-container fluid>

  <v-item-group>
    <v-container>
      <v-row>
        <v-col
          v-for="n in indices"
          :key="n"
          cols="12"
          md="2"
          sm="2"
        >
          <v-item >
            <v-card
              class="d-flex align-center"
              outlined
              height="80"
              flat
              rounded
              max-width="200"
            >
            <v-container>
            <v-layout row wrap>
                <v-flex md6>
                    <div class="font-weight-black">
                       {{ n.name }} 
                    </div>
                    
                </v-flex>
                <v-flex md6>
                     <span v-if="n.actual_change > 0"> <v-icon color="#46bdc6">mdi-arrow-up-box</v-icon> </span> 
                      <span v-else>  <v-icon color="#ff6d01">mdi-arrow-down-box</v-icon> </span>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex md12>
                    {{ abbreviate(n.value) }}
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex md6>
                    <span v-if="n.actual_change > 0" style="color: green"> {{ abbreviate(n.actual_change) }} </span>
                    <span v-else style="color: red"> {{ abbreviate(n.actual_change) }} </span>
                </v-flex>
                <v-flex md6>
                     <span v-if="n.percent_change > 0" style="color: green">{{ percentify(n.percent_change) }} </span>
                    <span v-else style="color: red"> {{  percentify(n.percent_change) }} </span>
                </v-flex>
            </v-layout>
            </v-container>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
              <!-- <trading-vue :data="sAnP" title-txt="S&P 500"
              :toolbar="true"></trading-vue> -->

  </v-container>
</template>

<script>
const numeral = require('numeral');
// list of index symbols: SP500, VIXCLS (cboe volatility index), 
// DJIA, WILL5000INDFC (wilshire 5000), NASDAQCOM

// ADD 4 MORE CHARTS (VIX, SMALL CAP (TOTAL GROWTH VALUE) MIDD, & LARGE)
export default {
data() {
    return {
        indices: []
        }
    },

    mounted() {
        this.makeIndice()
    },

    methods: {
        abbreviate(num) {
        return numeral(num).format('0,0.00');
        },
        percentify(num) {
        return numeral(num).format('0.00%');
        },
        async makeIndice() {
            const indiceData = await this.$axios.get('/api/indice/card/data');
            indiceData.data.forEach(item => {
                if (item.series_id == 'SP500') {
                    const newPrice = item.value;
                    const newDate = item.time;
                    const oldValue = indiceData.data.find(element => element.series_id == 'SP500' && element.time < newDate)
                    if(oldValue != null) {
                        this.indices.push({
                            name: 'S&P 500',
                            value: newPrice,
                            actual_change: (newPrice - oldValue.value),
                            percent_change: (newPrice - oldValue.value) / oldValue.value
                        })
                    }
                }
                else if (item.series_id == 'DJIA') {
                    const newPrice = item.value;
                    const newDate = item.time;
                    const oldValue = indiceData.data.find(element => element.series_id == 'DJIA' && element.time < newDate)
                    if(oldValue != null) {
                        this.indices.push({
                            name: 'Dow Jones',
                            value: newPrice,
                            actual_change: (newPrice - oldValue.value),
                            percent_change: (newPrice - oldValue.value) / oldValue.value
                        })
                    }
                }
                else if (item.series_id == 'NASDAQCOM') {
                    const newPrice = item.value;
                    const newDate = item.time;
                    const oldValue = indiceData.data.find(element => element.series_id == 'NASDAQCOM' && element.time < newDate)
                    if(oldValue != null) {
                        this.indices.push({
                            name: 'Nasdaq',
                            value: newPrice,
                            actual_change: (newPrice - oldValue.value),
                            percent_change: (newPrice - oldValue.value) / oldValue.value
                        })
                    }
                }
                else if (item.series_id == 'VIXCLS') {
                    const newPrice = item.value;
                    const newDate = item.time;
                    const oldValue = indiceData.data.find(element => element.series_id == 'VIXCLS' && element.time < newDate)
                    if(oldValue != null) {
                        this.indices.push({
                            name: 'Vix',
                            value: newPrice,
                            actual_change: (newPrice - oldValue.value),
                            percent_change: (newPrice - oldValue.value) / oldValue.value
                        })
                    }
                }
                else if (item.series_id == 'WILLSMLCAP') {
                    const newPrice = item.value;
                    const newDate = item.time;
                    const oldValue = indiceData.data.find(element => element.series_id == 'WILLSMLCAP' && element.time < newDate)
                    if(oldValue != null) {
                        this.indices.push({
                            name: 'Small Cap',
                            value: newPrice,
                            actual_change: (newPrice - oldValue.value),
                            percent_change: (newPrice - oldValue.value) / oldValue.value
                        })
                    }
                }
                else if (item.series_id == 'WILLMIDCAPPR') {
                    const newPrice = item.value;
                    const newDate = item.time;
                    const oldValue = indiceData.data.find(element => element.series_id == 'WILLMIDCAPPR' && element.time < newDate)
                    if(oldValue != null) {
                        this.indices.push({
                            name: 'Mid Cap',
                            value: newPrice,
                            actual_change: (newPrice - oldValue.value),
                            percent_change: (newPrice - oldValue.value) / oldValue.value
                        })
                    }
                }
            });
            console.log(this.indices)
        }
    }
}
</script>

<style scoped>
.indice-value {
    font-size: 10px;
}
</style>