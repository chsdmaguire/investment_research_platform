<template>
  <v-container fluid>
      <template v-if="loading">
        <v-skeleton-loader dark type="date-picker">
        </v-skeleton-loader>         
      </template>
      <template v-else>
          <!-- <v-row align="center" justify="center">
              <v-col cols="3">
                  <v-dialog v-model="ratioDialog" width="600">
                      <template v-slot:activator="{ on, attrs }">
                          <v-btn color="red lighten-2" dark
                            v-bind="attrs" v-on="on"> Financial Ratios</v-btn>
                      </template>
                      <v-card class="mx-auto justify-center">
                          <v-tabs>
                              <v-tab>Profitability</v-tab>
                              <v-tab>Efficiency</v-tab>
                              <v-tab>Leverage</v-tab>
                              <v-tab>Solvency</v-tab>
                              <v-tab>Valuation</v-tab>
                          </v-tabs>
                      </v-card>
                  </v-dialog>
              </v-col>
              <v-col cols="3">
                  <v-dialog v-model="altDialog" width="500">
                      <template v-slot:activator="{ on, attrs }">
                          <v-btn color="red lighten-2" dark
                            v-bind="attrs" v-on="on"> Alternative Data</v-btn>
                      </template>
                      <v-card class="mx-auto justify-center">
                          <v-list>
                              <v-list-item-group v-model="altDataModel" multiple>
                                  <template v-for="(item, i) in altDataList">
                                      <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>
                                      <v-list-item  v-else :key="`item-${i}`" :value="item.value" active-class="deep-purple--text text--accent-4">
                                        <template v-slot:default="{ active }">
                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.text"></v-list-item-title>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-checkbox
                                                :input-value="active"
                                                color="deep-purple accent-4 text-white"
                                                ></v-checkbox>
                                            </v-list-item-action>
                                        </template>
                                      </v-list-item>
                                  </template>
                              </v-list-item-group>
                          </v-list>
                      </v-card>
                  </v-dialog>
              </v-col>
          <v-col cols="3">
                  <v-dialog v-model="compareDialog" width="500">
                      <template>
                      </template>
                      <v-btn>
                      </v-btn>
                  </v-dialog>
              </v-col>
          </v-row> -->
          <v-row align="center" justify="center">
              <v-col cols="12">
                  <IndiceChartBase :chart-data="chartData" :chart-options="chartOptions"  v-on:change="render()" id="indice-chart"/>
              </v-col>
          </v-row>
          <v-row  align="center" justify="center">
              <v-col>   
                  <v-btn-toggle mandatory group v-model="timeFrame" v-on:change="changeTime" dense>
                    <v-btn >5D</v-btn>
                    <v-btn>1M</v-btn>
                    <v-btn>3M</v-btn>
                    <v-btn>6M</v-btn>
                    <v-btn>1Y</v-btn>
                    <v-btn>3Y</v-btn>
                    <v-btn>5Y</v-btn>
                  </v-btn-toggle>
              </v-col>
              <v-spacer> </v-spacer>
                  <v-btn-toggle mandatory v-model="scaler" dense v-on:change="changeScale" class="pr-3">
                    <v-btn >Auto Scale</v-btn>
                    <v-btn>Log Scale</v-btn>
                    <v-btn>% Scale</v-btn>
                  </v-btn-toggle>            
          </v-row>
      </template>
  </v-container>
</template>

<script>
const numeral = require('numeral');

export default {
    data() {
        return {
            loading: true,
            timeFrame: 0,
            scaler: 0,
            candlesY: [],
            candlesX: [],
            chartData: null,
            chartOptions: null,
            ratioDialog: false,
            altDialog: false,
            compareDialog: false,
            altDataModel: [],
            altDataList: [{text: 'Inside Transactions', value: 'inside'},
            {text: 'EPS Estimates', value: 'eps'},
            {text: 'Twitter Sentiment', value: 'twitter'},
            {text: 'Reddit Sentiment', value: 'reddit'},
            {text: 'Analyst Recommendations', value: 'analyst'},],
            
        }
    },
    methods: {
     
       async changeTime() {
            this.loading = true;
            this.scaler = 0;
            this.chartData = null;
            this.chartOptions = null;
            this.candlesX.length = 0;
            this.candlesY.length = 0;
            const startDate = new Date();
            startDate.setDate(startDate.getDate());
            switch(this.timeFrame) {
                case 0:
                    startDate.setDate(startDate.getDate() - 7);
                    break;
                case 1:
                    startDate.setDate(startDate.getDate() - 30);
                    break;
                case 2:
                    startDate.setDate(startDate.getDate() - 90);
                    break;
                case 3:
                     startDate.setDate(startDate.getDate() - 180);
                    break;
                case 4: 
                    startDate.setDate(startDate.getDate() - 365);
                    break;
                case 5:
                     startDate.setDate(startDate.getDate() - 1095);
                     break;
                case 6:
                    startDate.setDate(startDate.getDate() -1825);
                    break
            }
            
        
            const freq = 'D';
            const ticker = this.$route.params.ticker.toUpperCase();
            const date = startDate.toLocaleDateString().toString().replaceAll('/', '-');
            const res = await this.$axios.get(`/stock/candlestick/chart/${ticker}/${date}/${freq}`);
                if(res.data.length > 0) {
                    const arr = res.data.sort((a, b) => (a.time > b.time) ? 1: -1)
                    arr.forEach(bar => {
                    this.candlesY.push(Number(bar.open));
                    this.candlesX.push(bar.date.split('T')[0]);
                })
            };
            
            this.chartData = {
                labels: this.candlesX,
                datasets: [
                    {
                    type: 'line',
                    backgroundColor: '#32a852',
                    borderColor: '#32a852',
                    data: this.candlesY,
                    label: ticker,
                    fill: false,
                    }
                ]
            },
            this.chartOptions = {
                elements: {
                    point: {
                        radius: 0,
                    }
                },
                scales: {
                    yAxes: [{
                        position: 'right',
                        type: 'linear', 
                     ticks: {
                        beginAtZero: false,                       
                        },
                        gridLines: {
                        display: false
                        }           
                        }, 
                        ],
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
                },
                legend: {
                    display: false,
                     onClick: (e) => e.stopPropagation()
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    height: 400,
            },
             this.loading = false;
        },
        async changeScale() {
                const ticker = this.$route.params.ticker.toUpperCase();
                this.loading = true;
                this.chartData = null;
                this.chartOptions = null;
                switch(this.scaler) {
                    case 0:
                        
                        this.chartOptions = {
                        elements: {
                            point: {
                                radius: 0,
                            }
                        },
                        scales: {
                            yAxes: [{
                                position: 'right',
                                type: 'linear', 
                            ticks: {
                                beginAtZero: false,                       
                                },
                                gridLines: {
                                display: false
                                }           
                                }, 
                                ],
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
                        },
                        legend: {
                            display: false,
                            onClick: (e) => e.stopPropagation()
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            height: 400,
                    };
                    this.chartData = {
                        labels: this.candlesX,
                        datasets: [
                            {
                            type: 'line',
                            backgroundColor: '#32a852',
                            borderColor: '#32a852',
                            data: this.candlesY,
                            label: ticker,
                            fill: false,
                            }
                        ]
                    };
                    break;
                    case 1:
                        const min = Math.min(...this.candlesY);
                        const max = Math.max(...this.candlesY);
                        const newArr = [];
                        this.candlesY.forEach(e => {
                            const newLog = (Math.log(e) - Math.log(min)) / (Math.log(max) - Math.log(min));
                            newArr.push(newLog * 100)
                        })
                        this.chartOptions = {
                        elements: {
                            point: {
                                radius: 0,
                            }
                        },
                        scales: {
                            yAxes: [{
                                position: 'left',
                                type: 'logarithmic', 
                            ticks: {
                                beginAtZero: false,
                                callback: function(value) {
                                    return numeral(value).format('0,0.00')
                                    }                         
                                },
                                gridLines: {
                                display: false
                                }           
                                }, 
                                ],
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
                        },
                        legend: {
                            display: false,
                            onClick: (e) => e.stopPropagation()
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            height: 400,
                    };
                    this.chartData = {
                        labels: this.candlesX,
                        datasets: [
                            {
                            type: 'line',
                            backgroundColor: '#32a852',
                            borderColor: '#32a852',
                            data: newArr,
                            label: ticker,
                            fill: false,
                            }
                        ]
                    };
                    break;
                    case 2:
                        const firstItem = this.candlesY[0];
                        const newYVal = [];
                        this.candlesY.forEach(y => {
                            const newY = (y - firstItem) / firstItem;
                            newYVal.push(newY * 100)
                        });
                        this.chartOptions = {
                        elements: {
                            point: {
                                radius: 0,
                            }
                        },
                        scales: {
                            yAxes: [{
                                position: 'left',
                                type: 'linear', 
                            ticks: {
                                beginAtZero: false,                       
                                callback: function(value) {
                                    return numeral(value).format('0.00%')
                                    }
                                },
                                gridLines: {
                                display: false
                                }           
                                }, 
                                ],
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
                        },
                        legend: {
                            display: false,
                            onClick: (e) => e.stopPropagation()
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            height: 400,
                    };
                    this.chartData = {
                        labels: this.candlesX,
                        datasets: [
                            {
                            type: 'line',
                            backgroundColor: '#32a852',
                            borderColor: '#32a852',
                            data: newYVal,
                            label: ticker,
                            fill: false,
                            }
                        ]
                    };
                    break;  
                }
                        
                    this.loading = false;
                },
    },

    mounted() {
        this.changeTime();
        this.changeScale();
    },
}
</script>

<style>

</style>