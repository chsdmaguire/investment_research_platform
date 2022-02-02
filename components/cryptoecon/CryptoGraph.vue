<template>
<v-container fluid>
    <template v-if="loading">
        <v-skeleton-loader dark type="date-picker">
        </v-skeleton-loader>         
      </template>
      <template v-else>
        
    <v-autocomplete
    id="cryptoShow" 
    :items="currencies"
    v-model="selectedCurrency"
    v-on:change="replaceChart"
    item-text="name"
    item-value="symbol"
    label="Select a Cryptocurrency"
    rounded
    dense
    solo
    >
        <template v-slot:item="{ item }">
            <v-list-item-avatar
            color="indigo"
            class="white--text text-uppercase"
            >
            {{ item.symbol }}
            </v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title v-text="item.name" class="text-capitalize font-weight-black h6"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
            <v-list-item-title v-text="item.cmc_rank"></v-list-item-title>
            <v-list-item-subtitle class="font-italic">Rank</v-list-item-subtitle>
            </v-list-item-action>
        </template>
    </v-autocomplete>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card title="Bar">
                    <v-card img-bottom class="pa-4">
                        <IndiceChartBase :chart-data="chartData" 
                        :chart-options="chartOptions" v-on:change="replaceChart"
                        v-model="selectedCurrency" />
                    </v-card>
                </v-card>
            </v-col>
        </v-row>
          <v-row  align="center" justify="center">
                  <v-btn-toggle mandatory group v-model="timeFrame" v-on:change="changeTime" dense>
                    <v-btn >5D</v-btn>
                    <v-btn>1M</v-btn>
                    <v-btn>3M</v-btn>
                    <v-btn>6M</v-btn>
                    <v-btn>1Y</v-btn>
                    <v-btn>3Y</v-btn>
                    <v-btn>5Y</v-btn>
                  </v-btn-toggle>
          </v-row>
          <v-row  align="center" justify="center">
                <v-btn-toggle mandatory v-model="scaler" dense v-on:change="changeScale">
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
    data () {
        return {
            currencies: [],
            selectedCurrency: null,
            chartData: null,
            chartOptions: null,
            candlesX: [],
            candlesY: [],
            timeFrame: 0,
            scaler: 0,
            loading: true,
        }
    },
    mounted() {
        this.changeTime();
        this.changeScale();
    },
    methods: {
        replaceChart () {
            this.loading = true;
            this.candlesX.length = 0;
            this.candlesY.length = 0;
            this.scaler = 0;
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
            const date = startDate.toLocaleDateString().toString().replaceAll('/', '-');
            this.$axios.get(`/crypto/candlestick/${this.selectedCurrency}/${date}`).then(res => {
                const response = res.data.sort((a, b) => (a.date > b.date) ? 1: -1);
                
                response.forEach(a => {
                    this.candlesY.push(Number(a.open));
                    this.candlesX.push(a.date.split('T')[0])
                });

        this.chartData = {
                labels: this.candlesX,
                datasets: [
                    {
                    type: 'line',
                    backgroundColor: '#32a852',
                    borderColor: '#32a852',
                    data: this.candlesY,
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
            };
                
            });
            
             this.loading = false;
        },
        async changeTime() {
            this.loading = true;
            this.scaler = 0;
            this.chartData = null;
            this.chartOptions = null;
            this.candlesX.length = 0;
            this.candlesY.length = 0;
            const startDate = new Date();
            startDate.setDate(startDate.getDate());

             const cryptoList = await this.$axios.get('/crypto/ticker/list');
            this.currencies = cryptoList.data;
            
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
            this.selectedCurrency = 'BTC'
            const date = startDate.toLocaleDateString().toString().replaceAll('/', '-');
            const candleResponse = await this.$axios.get(`/crypto/candlestick/${this.selectedCurrency}/${date}`);
            if(candleResponse.data.length > 0) {
                    const arr = candleResponse.data.sort((a, b) => (a.date > b.date) ? 1: -1)
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
                            label: this.selectedCurrency,
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
                                position: 'right',
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
                            label: this.selectedCurrency,
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
                            label: this.selectedCurrency,
                            fill: false,
                            }
                        ]
                    };
                    break;  
                }
                        
                    this.loading = false;
        }
    },


}
</script>

<style scoped>


</style>