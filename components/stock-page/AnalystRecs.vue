<template>
  <v-container>
    <v-row justify="center" align="center">
       <h3>Analyst Recommendations</h3>
    </v-row>
    <v-row justify="center" align="center">
      <v-col md="6" sm="10">
        <AnalystRecsBase :chart-data="BarData" :options="chartOptions"/>
      </v-col>
      <v-col md="6" sm="10">
         <ChartDoughnutBase :chart-data="PieData" />
      </v-col>
    </v-row>
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
      const analystRecs = await this.$axios.$get(`/analyst/recs/${ticker}`);
      if(analystRecs.length > 0 ) {
      analystRecs.forEach(rec => {
        this.xAxis.push(rec.period.split('T')[0])
        this.strongbuyRecs.push(rec.strong_buy);
        this.buyRecs.push(rec.buy);
        this.holdRecs.push(rec.hold);
        this.sellRecs.push(rec.sell);
        this.strongsellRecs.push(rec.strong_sell);        
      });

      }

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
          legend: {
            display: true,
             color: '#ffffff',
            labels: {
              color: '#ffffff'
            }
            }
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
      this.mostRecent = await this.$axios.get(`/analyst/recs/mostrecent/${ticker}`);
      const pie_labels = [];
      const pie_values = [];
      for(const [key, value] of Object.entries(this.mostRecent.data[0])) {
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