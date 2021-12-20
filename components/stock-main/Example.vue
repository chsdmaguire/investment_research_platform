<template>
  <v-container>
      <v-layout row wrap justify-center>
          <div>
          <EconChartBase :chart-data="spChart" :options="spOptions" />              
          </div>

      </v-layout>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            spData: [],
            xAxis: [],
            spChart: null,
            spOptions: null,

        }
    },

    mounted() {
        this.getsPData();
    },

    methods: {
        async getsPData() {
            const spResponse = await this.$axios.get('/api/fred/db/index/SP500');
            spResponse.data.forEach(item => {
                this.spData.push(Number(item.value))
                this.xAxis.push(item.time.split('T')[0])
            });
// let easing = easeOutQuad;
// let restart = false;
            this.spChart = {
                
                labels: this.xAxis,
                datasets: [{  
                    type: 'line',
                    data: this.spData,
                    borderColor: "#6097f0",
                    backgroundColor: "#6097f0",
                    fill: false,
                    borderWidth: '5px',
                    pointRadius: 1,
                    spanGaps: true,

                }]               
            };

            this.spOptions =  {             
              scales: {
                yAxes: [{
                  labelFontSize: 20,
                  position: 'right',
                  padding: 0,
                  type: 'linear',
                  ticks: {
                    beginAtZero: false,
                      },
                  gridLines: {
                    display: false,
                  }
                }],
                xAxes: [{
                  type: 'time',
                  distribution: 'series',
                  time: {
                    unit: 'day'
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
}
</script>

<style>

</style>