<template>

<div class="barChart"  data-app>
  <v-card>
    <div class="selectBox">
      <h3>Annual Metric Graphing</h3>
      <v-select
        id="metricShow" 
          :items="companies"
          v-model="selectedFsli"
          v-on:change="replaceChart"
          item-text="fsli"
          label="Select a Metric To Analyze"
          outlined
        ></v-select>
    </div>

    <v-card title="Bar">
      <v-card img-bottom class="pa-4">
        <ChartBarBase  :chart-data="chartData"
        :options="chartOptions"
        v-model="selectedFsli"
        v-on:change="replaceChart" />
      </v-card>
    </v-card>
  </v-card>

</div>
</template>

<script>
export default {
  data() {
    return {
      chartData: null,
      chartOptions: null,
      selectedFsli: null,
      companies:  [],
      metricData: [],
      metricAxis: [],
      keys: [],
    };
  },
  mounted() {
    this.updateCompanies();
  },
  methods: {
    async updateCompanies() {
            const ticker = this.$route.params.ticker.toUpperCase()
            const fsliList = await this.$axios.get(`/api/annual/metrics/${ticker}`)
            this.companies = fsliList.data;
            const initial_fsli = 'Revenue Growth Rate';
            const initialResp =  await this.$axios.get(`/api/annual/chart/metrics/${ticker}/${initial_fsli}`);
            const initMetric = initialResp.data;
            initMetric.forEach(val => {
               this.metricData.push(val.num_value);
               this.keys.push(val.date.split('T')[0]);
            });
            this.chartData = {
              labels: this.keys,
              datasets: [
                {
                  backgroundColor: "#2cabe6",
                  borderColor: "#0c0306",
                  data: this.metricData,
                  label: initial_fsli,
                  barPercentage: 0.6,
                },
              ]
            };

            this.chartOptions = {
                scales: {
                  yAxes: [
                    {
                      position: 'right',
                      ticks: {
                        beginAtZero: true
                      },
                      gridLines: {
                        display: false,
                      },
                      ticks: {
                        beginAtZero: false,
                        callback: function (value) {
                          return (value / this.max * 100).toFixed(2) + '%'; 
                        },
                        scaleLabel: {
                          display: true,
                          labelString: 'Percentage',
                        },
                        }, 
                    }
                  ],
                  xAxes: [{
                  type: 'time',
                  distribution: 'series',
                  time: {
                    unit: 'year'
                  },
                  ticks: {
                    beginAtZero: false
                  },
                  gridLines: {
                    display: false
                  }
                }]
                },
                responsive: true,
                maintainAspectRatio: true,

            }
      },
      
       
    replaceChart() {
        const ticker = this.$route.params.ticker.toUpperCase()
         this.metricData.length = 0;
         this.keys.length = 0;
         this.$axios.get(`/api/annual/chart/metrics/${ticker}/${this.selectedFsli}`).then(response => {
           response.data.forEach(elem => {
              this.metricData.push(elem.num_value);
              this.keys.push(elem.date.split('T')[0]);
           })
         
         this.chartData = {
        labels: this.keys,
        datasets: [
          {
            backgroundColor: "#2cabe6",
            borderColor: "#0c0306",
            data: this.metricData,
            label: this.selectedFsli
          },
        ]
      };
          if (this.selectedFsli.includes('Margin') || this.selectedFsli.includes('to') 
          || this.selectedFsli.includes('Growth')) {
            this.chartOptions = {
          scales: {
            yAxes: [
              {
                position: 'right',
                gridLines: {
                  display: false,
                },
              ticks: {
              beginAtZero: false,
              callback: function (value) {
                return (value / this.max * 100).toFixed(2) + '%'; 
              },
              scaleLabel: {
                display: true,
                labelString: 'Percentage',
              },
              },  
              }
            ],
            xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'year'
            },
            
            gridLines: {
              display: false
            }
          }]
          },
          responsive: true
      }
            } else {
              this.chartOptions = {
          scales: {
            yAxes: [
              {
                position: 'right',
                gridLines: {
                  display: false,
                },
              ticks: {
              beginAtZero: false,
              callback: function (value) {
                return value;
              },
              scaleLabel: {
                display: true,
                labelString: 'Value',
              },
              },  
              }
            ],
            xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'year'
            },
            
            gridLines: {
              display: false
            }
          }]
          },
          responsive: true
      }
            }         
         })

        
     },

  },

};
</script>


<style scoped>
.chartBox {
    height: 500px;
    width: 100%;    
}

/* .barChart {
  margin-bottom: 10px;
} */

</style>