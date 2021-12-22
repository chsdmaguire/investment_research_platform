<template>
  <!-- <v-app> -->
    <v-container>
      <v-layout row wrap justify-space-between>
        <v-flex lg7 class="my-6">
          <v-card>
              <v-row>
                <v-col cols="7">
                    <h3>Insider Transactions Table</h3>
                </v-col>
                <v-col cols="5">

                  <div class="text-center margin-left:5-px">
                    <v-dialog
                      v-model="dialog"
                      width="500" >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="red lighten-2"
                          dark
                          x-small
                          v-bind="attrs"
                          v-on="on"
                        >
                          Transaction Code Descriptions
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                          Transaction Code Description
                        </v-card-title>
                        <v-list disabled>
                            <v-list-item v-for="(item, i) in codeList"
                          :key="i">
                            <v-list-item-content>
                                <v-list-item-title v-text="item.code"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-content>
                                {{ item.description }}
                            </v-list-item-content>
                            </v-list-item>
                        </v-list>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-row>
                              <p>For more detail, click <a href="https://www.sec.gov/about/forms/form4data.pdf" target="_blank">here</a> </p>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="primary"
                                text
                                @click="dialog = false"
                              >
                                Close
                              </v-btn>                
                            </v-row>

                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-col>
                  
              </v-row>
        
            <v-data-table
                :headers="headers"
                :items="totalTransactions"
                :items-per-page="10"
                dense>
                <template v-slot:[`item.name`]= "{ item }">
                      {{ styleNames(item.name) }}
                </template>        
                <template v-slot:[`item.filing_date`]= "{ item }">
                    {{  new Date(item.filing_date).getFullYear() + '-' 
                    + (new Date(item.filing_date).getMonth() + 1) + '-' + 
                    new Date(item.filing_date).getDate() }}
                </template>
                <template v-slot:[`item.transaction_date`]= "{ item }">
                    {{  new Date(item.transaction_date).getFullYear() + '-' 
                    + (new Date(item.transaction_date).getMonth() + 1) + '-' + 
                    new Date(item.transaction_date).getDate() }}
                </template>

                <template v-slot:[`item.transaction_price`]= "{ item }">
                    {{ sharePrice(item.transaction_price) }}
                </template> 
                <template v-slot:[`item.share`]= "{ item }">
                      {{ item.share.toLocaleString() }}
                </template> 
                <template v-slot:[`item.change`]= "{ item }">
                    <span v-if="item.change > 0" style="color: green;"> {{ numberShares(item.change) }}</span>
                    <span v-else style="color: red;"> {{ numberShares(item.change) }}</span>
                </template>

                <template v-slot:[`item.total_value`]= "{ item }">
                    <span v-if="item.total_value > 0" style="color: green;">{{ abbreviate(item.transaction_price * item.change) }} </span>
                    <span v-else style="color: red;">{{ abbreviate(item.transaction_price * item.change) }}</span>
                      
                </template>        

                <template v-slot:[`item.percent_value`]= "{ item }">
                    <span v-if="item.change > 0"> {{ percentify(item.change / item.share) }} </span>
                    <span v-if="item.change < 0">{{ percentify( Math.abs(item.change) / (item.share + Math.abs(item.change)) ) }} </span>
                </template>  
            </v-data-table>
          </v-card>
        </v-flex>
        <v-flex lg5 class="my-6">
          <InsideTransBase :chart-data="chartData" :options="chartOptions" />
        </v-flex>
      </v-layout>
    </v-container>
  <!-- </v-app> -->
</template>

<script>
const numeral = require('numeral');

export default {
    data () {
        return {
            dialog: false,
            codeList: [
                {code: 'X', description: 'Exercise of in-the-money or at-the-money derivative security'},
                {code: 'Z', description: 'Deposit into or withdrawal from voting trust'},
                {code: 'I', description: 'Discretionary transaction in accordance with Rule 16b-3(f) resulting in acquisition or disposition of issuer securities'},
                {code: 'D', description: 'Disposition to the issuer of issuer equity securities pursuant to Rule 16b-3(e)'},
                {code: 'P', description: 'open market or private purchase of non-derivative or derivative security'},
                {code: 'G', description: 'Bona fide gift'},
                {code: 'S', description: 'open market or private sale of non-derivative or derivative security'},
                {code: 'U', description: 'Disposition pursuant to a tender of shares in a change of control transaction'},
                {code: 'W', description: 'Acquisition or disposition by will or the laws of descent and distribution'},
                {code: 'A', description: 'grant, award, or other acquisition pursuant Rule 16b-3(d)'},
                {code: 'C', description: 'Conversion of derivative security'},
                {code: 'O', description: 'Exercise of out-of-the-money derivative security'},
                {code: 'M', description: 'Exercise or conversion of derivative security exempted pursuant to Rule 16b-3'},
                {code: 'L', description: 'Small acquisition under Rule 16a-6'},
                {code: 'F', description: 'Payment of exercise price or tax liability by delivering or withholding securities incident to the receipt, exercise or vesting of a security issued in accordance with Rule 16b-3'},
            ],
            multiLine: true,
            snackbar: false,
            totalTransactions: [],
            headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
            width: '100%',
          },
          { text: 'Date', value: 'transaction_date', width: '130%' },
          { text: 'Code', value: 'transaction_code' },
          { text: 'Avg Price', value: 'transaction_price' },
          { text: 'Number of Shares', value: 'change' },
         { text: 'Number Shares Held After', value: 'share' },
         { text: 'Transaction Value', value: 'total_value' },
         { text: 'Transaction Percent of Total Ownership', value: 'percent_value' },
         
        ],
        chartData: null,
        chartOptions: null,
        xAxis: [],
        yAxis: [],
        }
    },
    methods: {
    abbreviate(num) {
      return numeral(num).format('(0.00 a)');
    },
    percentify(num) {
      return numeral(num).format('0.00%');
    },
    sharePrice(num) {
      return numeral(num).format('(0.00 a)');
    },
    numberShares(num) {
      return numeral(num).format('0a');
    },
    styleNames(name) {
        const one = name.split(" ")[1][0].toUpperCase() + name.split(" ")[1].substring(1).toLowerCase();
        const two = name.split(" ")[0][0].toUpperCase() + name.split(" ")[0].substring(1).toLowerCase();
        return one.concat(" ", two) },

        async getInsideTransactions() {
            const ticker = this.$route.params.ticker.toUpperCase()
            this.totalTransactions = await this.$axios.$get(`/api/insider/transactions/${ticker}`);
            if (this.totalTransactions.length > 0) {
            this.totalTransactions.forEach(transaction => {
              const date = transaction.filing_date.split('T')[0];
              const transactAmount = Number(transaction.change) * Number(transaction.transaction_price)
              if(this.xAxis.includes(date)) {
                const dateIndex = this.xAxis.indexOf(date)
                const newValue = transactAmount + this.yAxis[dateIndex]
                this.yAxis.splice(dateIndex, 1, newValue)
              } else {
                this.xAxis.push(date)
              this.yAxis.push(transactAmount)
              }
            })
            this.chartData = {
              labels: this.xAxis,
              datasets: [{
               type: "line",
                backgroundColor: "#6097f0",
                borderColor: "#6097f0",
                data: this.yAxis,
                label: "Net Insider Transactions",
                fill: false,                
              }]
            },
          this.chartOptions = {
                legend: {
                  display: true
              },
              responsive: true,
              maintainAspectRatio: false,
              height: 800,
              scales: {
                yAxes: [{
                  labelFontSize: 20,
                  position: 'right',
                  padding: 0,
                  type: 'linear',
                  ticks: {
                    beginAtZero: false,
                    callback: function(value) {
                          return numeral(value).format('0.00a')
                        }  
                      },
                  gridLines: {
                    display: false,
                  }
                }],
                xAxes: [{
                  type: 'time',
                  distribution: 'series',
                  time: {
                    unit: 'week'
                  },
                  ticks: {
                    beginAtZero: false
                  },
                  gridLines: {
                    display: false
                  }
                }]
              }          
          }              
            }


        }

    },

    mounted () {
        this.getInsideTransactions();
    }

}
</script>

<style>

</style>