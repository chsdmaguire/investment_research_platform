<template>

<div class="barChart"  data-app>
  <v-card>
    <div class="selectBox"> 
        <h3>Quarterly Metric Graphing</h3>
      <v-select
        id="metricShow" 
          :items="quarterFslis"
          v-model="chosenMetric"
          v-on:change="replaceQuarterChart"
          item-text="fsli"
          label="Select a Metric To Analyze"
          outlined
        ></v-select>
    </div>

    <v-card title="Bar">
      <v-card img-bottom>
        <ChartBarBase  :chart-data="metricChart"
        :options="chartOptions"
        v-model="chosenMetric" 
        v-on:change="replaceQuarterChart"/>

      </v-card>
    </v-card>
  </v-card>

</div>
</template>

<script>
export default {
  data() {
    return {
      metricChart: null,
      chartOptions: null,
      chosenMetric: null,
      quarterFslis:  [],
      chartValues: [],
      chartKeys: [],
    };
  },
  mounted() {
    this.updateQuarterChart();
  },
  methods: {
    async updateQuarterChart() {
      const ticker = this.$route.params.ticker.toUpperCase()
      const fsliList = await this.$axios.get(`/stock/quarter/metrics/chart/${ticker}`);
      if (fsliList.data.length > 0) {
      const fsliData = fsliList.data
      fsliData.forEach(element => this.quarterFslis.push(element));        
      }

      const initial_met = 'Revenue Growth Rate';
      const quartResponse = await this.$axios.get(`/stock/quarter/metrics/chart/${ticker}/${initial_met}`);
      if (quartResponse.data.length > 0) {
      const revData = quartResponse.data;
      revData.forEach(val => {
        this.chartValues.push(val.num_value);
        this.chartKeys.push(val.date.split('T')[0])
      });

      this.metricChart = {
        labels: this.chartKeys,
        datasets: [
          {
            backgroundColor: "#ac51ed",
            borderColor: "#0c0306",
            data: this.chartValues,
            label: initial_met
          },
        ]
      }; 
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
              unit: 'quarter'
            },
            
            gridLines: {
              display: false
            }
          }]
          },
          responsive: true
      }        
      }
      },
      
       
      replaceQuarterChart() {
        const ticker = this.$route.params.ticker.toUpperCase()
         this.chartValues.length = 0;
         this.chartKeys.length = 0;        
         this.$axios.get(`/stock/quarter/metrics/chart/${ticker}/${this.chosenMetric}`).then(response => {
           response.data.forEach(elem => {
             this.chartValues.push(elem.num_value);
             this.chartKeys.push(elem.date.split('T')[0]);
           })
          this.metricChart = {
          labels: this.chartKeys,
          datasets: [
            {
              backgroundColor: "#de98ab",
              borderColor: "#0c0306",
              data: this.chartValues,
              label: this.chosenMetric
              },
            ]
          };
          // this.chartOptions.scales.yAxes.callback = 
          if (this.chosenMetric.includes('Margin') || this.chosenMetric.includes('to') || this.chosenMetric.includes('Growth')) {
            this.chartOptions = {
          scales: {
            yAxes: [
              {
                position: 'right',
                gridLines: {
                display: false,
                min: Math.min(this.chartValues),
                max: Math.max(this.chartValues),
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
              unit: 'quarter'
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
                min: Math.min(this.chartValues),
                max: Math.max(this.chartValues),
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
              unit: 'quarter'
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
  margin-top: 10%;
} */

</style>