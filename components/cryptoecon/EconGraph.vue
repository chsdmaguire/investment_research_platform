<template>    
<div data-app>
  <h1 class="title">Macroeconomic Data Plotting</h1>
  <v-card class="d-flex align-content-start flex-wrap flex-column mb-4">
      <v-select
        :items="economy"
        v-on:change="replaceChart"
        v-model="selectedMetric"
        item-text="name"
        item-value="series_id"
        label="Select a Metric To Analyze"
        outlined
      ></v-select>

      <div class="econ-chart">
        <EconChartBase  :chart-data="chartData" 
        :options="chartOptions"
        :v-model="selectedMetric"
        v-on:change="replaceChart" />        
      </div>
      <v-card class="mx-auto my-12" flat>
        <v-row no-gutters style="margin-bottom:2%;height:5vh">
         <v-card-title> <b>Title:</b>  {{ title }}</v-card-title> 
        </v-row>
        <v-row no-gutters style="margin-bottom:2%;height:3vh">
          <v-col cols="4">
            <v-card-text> <b>ID: </b> {{ serId }} </v-card-text>
          </v-col>
          <v-col cols="4">
            <v-card-text><b>Units:</b> {{ units }} </v-card-text>
          </v-col>
        </v-row>
        <v-row no-gutters style="margin-bottom:2%;height:3vh">
          <v-col cols="4">
            <v-card-text><b>Frequency:</b> {{ frequency }} </v-card-text>
          </v-col>
          <v-col cols="4">
            <v-card-text><b>Popularity:</b> {{ popularity }} </v-card-text>
          </v-col>
        </v-row>
        <v-row no-gutters style="margin-bottom:5%">
          <v-card-text><b>Notes:</b> {{ itemNotes }} </v-card-text>
        </v-row>
      </v-card>
  </v-card>
</div>
</template>

<script>
const numeral = require('numeral');

export default {
  head() {
    return {
      title: this.title,
      meta: [
        {name: 'description', content: this.itemNotes}
      ]
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: null,
      selectedMetric: null,
      chartNotes: null,
      economy:  [],
      gdpYaxis: [],
      gdpDates: [],
      title: '',
      serId: '',
      units: '',
      frequency: '',
      popularity: '',
      itemNotes: '',
    };
  },
  mounted() {
    this.updateGraph();

  },
  methods: {
    async updateGraph() {
           this.economy = await this.$axios.$get('/econ/metric/list');
           const initialResponse = await this.$axios.get('/econ/graph/metric/GDPC1');
           const initialNotes =  await this.$axios.get('/econ/metric/notes/GDPC1');
           this.chartNotes = initialNotes.data[0];
           this.title = initialNotes.data[0].title;
           this.serId = initialNotes.data[0].series_id;
           this.units = initialNotes.data[0].units;
           this.frequency = initialNotes.data[0].frequency;
           this.popularity = initialNotes.data[0].popularity;
           this.itemNotes = initialNotes.data[0].notes;

           initialResponse.data.forEach(element => {
             this.gdpDates.push(element.date);
             if( String(this.chartNotes.units).includes('Billions')) {
               this.gdpYaxis.push(element.value * 1000000000)
             } else if( String(this.chartNotes.units).includes('Millions') || String(this.chartNotes.units).includes('Million')) {
               this.gdpYaxis.push(element.value * 1000000)
             } else if( String(this.chartNotes.units).includes('Thousands')) {
               this.gdpYaxis.push(element.value * 1000)
             } else {
                this.gdpYaxis.push(element.value)
             }             
           });
           this.chartData = {            
             labels: this.gdpDates,
             datasets: [{   
               type: "line",
                backgroundColor: "#6097f0",
                borderColor: "#6097f0",
                data: this.gdpYaxis,
                label: "Real GDP",
                fill: false,
                }]
           },
          this.chartOptions = {
                legend: {
                  display: true
              },
              responsive: true,
              maintainAspectRatio: false,
              height: 400,
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
                    unit: 'month'
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
        },
             
      replaceChart() {
           this.chartNotes = '';
           this.title = '';
           this.serId = '';
           this.units = '';
           this.frequency = '';
           this.popularity = '';
           this.itemNotes = '';           
           this.$axios.get(`/econ/metric/notes/${this.selectedMetric}`).then(res => {
           this.chartNotes = res.data[0];
           this.title = res.data[0].title;
           this.serId = res.data[0].series_id;
           this.units = res.data[0].units;
           this.frequency = res.data[0].frequency;
           this.popularity = res.data[0].popularity;
           this.itemNotes = res.data[0].notes;             
           });

          this.gdpYaxis.length = 0;
          this.gdpDates.length = 0;
         this.$axios.get(`/econ/graph/metric/${this.selectedMetric}`).then(response => {
           response.data.forEach(element => {
             this.gdpDates.push(element.date);
             if( String(this.chartNotes.units).includes('Billions')) {
               this.gdpYaxis.push(element.value * 1000000000)
             } else if( String(this.chartNotes.units).includes('Millions') || String(this.chartNotes.units).includes('Million')) {
               this.gdpYaxis.push(element.value * 1000000)
             } else if( String(this.chartNotes.units).includes('Thousands')) {
               this.gdpYaxis.push(element.value * 1000)
             } else {
                this.gdpYaxis.push(element.value)
             }             
           });
           this.chartData = {            
             labels: this.gdpDates,
             datasets: [{   
               type: "line",
                backgroundColor: "#6097f0",
                borderColor: "#6097f0",
                data: this.gdpYaxis,
                label: this.title,
                fill: false,
                }]
           }
         })
      },

  },

};
</script>


<style scoped>
.title {
  text-align: center;
  margin-bottom: 15px;
  }

</style>