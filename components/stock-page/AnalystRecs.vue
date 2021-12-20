<template>
  <v-container class="myapp">
    <v-layout row wrap justify-space-between>
      <v-flex lg10>
        <h1>Analyst Recommendations</h1>
      </v-flex>
      <v-flex lg5 class="my-6 mx-1"> 
          <!-- <div id="analyst-line-chart" class="analyst-line"></div> -->
          <AnalystRecsBase :chart-data="BarData" :options="chartOptions"/>
      </v-flex>
      <v-flex lg5 class="my-6 mx-1">
          <div class="analyst-doughnut">
            <ChartDoughnutBase :chart-data="PieData" />
          </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      strongbuyRecs: [],
      buyRecs: [],
      holdRecs: [],
      sellRecs: [],
      strongsellRecs: [],

      
      BarData: null,
      chartOptions: null,
      xAxis: [],

      PieData: null,
      mostRecent: [],
      recent_labels: [],
      recent_data: [], 

      radio: "day"
    }
  },

  methods: {
    async getAnalystRecs() {
      const ticker = this.$route.params.ticker.toUpperCase()
      const analystRecs = await this.$axios.$get(`/api/analyst/recs/${ticker}`);

      analystRecs.forEach(rec => {
        this.xAxis.push(rec.period.split('T')[0])
        this.strongbuyRecs.push(rec.strong_buy);
        this.buyRecs.push(rec.buy);
        this.holdRecs.push(rec.hold);
        this.sellRecs.push(rec.sell);
        this.strongsellRecs.push(rec.strong_sell);        
      });

      this.BarData = {
        labels: this.xAxis,
        datasets: [
          {label: 'Strong Buy',
          data: this.strongbuyRecs,
          backgroundColor: "#34a853"},
          {label: 'Buy',
          data: this.buyRecs,
          backgroundColor: "#46bdc6"},
          {label: 'Hold',
          data: this.holdRecs,
          backgroundColor: "#fbb104"},
          {label: 'Sell',
          data: this.sellRecs,
          backgroundColor: "#ff6d01"},
          {label: 'Strong Sell',
          data: this.strongsellRecs,
          backgroundColor: "#ea4335"},
        ],
      },

      this.chartOptions = {
        plugins: {
          title: {
            display: true,
            text: 'Analyst Recommendations'
          },
        },
        responsive: true,
        scales: {
          xAxes:[ {
            stacked: true,
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'quarter'
            },
            ticks: {
              beginAtZero: false
            },
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            stacked: true,
             gridLines: {
              display: false
            }
          }]
        }
      }     
    },

    async fillData() {
      const ticker = this.$route.params.ticker.toUpperCase();
      this.mostRecent = await this.$axios.$get(`/api/analyst/recs/mostrecent/${ticker}`);
      const pie_labels = [];
      const pie_values = [];
      for(const [key, value] of Object.entries(this.mostRecent[0])) {
        if(key !== 'ticker' && key !== 'period') {
        pie_labels.push(key)
        pie_values.push(value)          
        }

      };
      this.PieData = {
        labels: pie_labels,
        datasets: [
          {
            borderWidth: 3,
              borderColor: [
               '#34a853',
               '#46bdc6',
               '#fbb104',
               '#ff6d01',
               '#ea4335'

              ],
              backgroundColor: [
               '#34a853',
               '#46bdc6',
               '#fbb104',
               '#ff6d01',
               '#ea4335'            
              ],
            data: pie_values,
          }
        ],      
      };
    },
    updateChart() {
      this.$nextTick(() => {
        this.fillData();
      });
    }

  },

  mounted() {
    this.getAnalystRecs();
    this.fillData();
  }
}
</script>

<style scoped>

</style>