<template>
<v-container>
    <v-layout row wrap justify-center>
        <v-flex lg12>
            <h3>Actual EPS vs Concensus Analyst Expectations</h3>
        </v-flex>
    </v-layout>
     <v-layout row wrap justify-center>
        <v-flex lg12>   
            <div class="combo-chart">
            <MixedChartBase :chart-data="letTry" :options="options"/>
            </div> 
        </v-flex>
     </v-layout>
</v-container>
</template>

<script>
const numeral = require('numeral');

export default {
    data () {
        return {
            letTry: null,
            options: null,
            chartData: null,
            labels: ['Earnings Surprise'],
            allEarnings: [],
        }
    },

    methods: {
       async renderMix() {
            const ticker = this.$route.params.ticker.toUpperCase()
            const earnSurpise = await this.$axios.get(`/api/earnings/surpises/${ticker}`);
            this.allEarnings = earnSurpise.data;
            const estimateData = [];
            const actualData = [];
            const surprisePercent = [];
            this.allEarnings.forEach(earn => {
                 const result = new Date(earn.period);
                 estimateData.push({r: 10, y: earn.estimate, x: result});
                 actualData.push({r: 10, y: earn.actual, x: result});
                 surprisePercent.push({r: 10, y: earn.surprise_percent, x: result});
            });
            

            this.letTry = {
                labels: "Mix Earnings",
                datasets: [
                    
                    {
                        type: 'bubble',
                        label: 'Estimated EPS',
                        backgroundColor: '#4896f0',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: '#249EBF',
                        data: estimateData,
                        yAxisID: 'A',
                    },
                    {
                        type: 'bubble',
                        label: 'Actual EPS',
                        backgroundColor: '#f87991',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: '#f87991',
                        data: actualData,
                        yAxisID: 'A',
                    },{
                        type: 'bar',
                        borderColor: '#53e06f',
                        backgroundColor: '#53e06f',
                        label: 'Percent Difference',
                        data: surprisePercent,
                        fill: false,
                        yAxisID: 'B',
                    },

                ],
                };
                this.options = {
                    scales: {
                        yAxes: [{
                        id: 'A',
                        position: 'left',
                        type: 'linear', 
                     ticks: {
                        beginAtZero: false,
                        callback: function(value) {
                            return numeral(value).format('$0,0.00')
                        }                        
                        },
                        gridLines: {
                        display: false
                        }           
                        }, 
                        
                        {
                        id: 'B',
                        position: 'right',
                        type: 'linear',
                     ticks: {
                        beginAtZero: false,
                        callback: function(value) {
                            return numeral(value / 100).format('0.00%')
                        }
                        },
                        gridLines: {
                        display: false
                        }                          
                        }],

                        xAxes: [{
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
                        }]                        
                    },
                    legend: {
                        display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    height: 400,

                    animation: {
                        duration: 3 
                    },
                    hover: {
                        animationDuration: 3 
                    },
                    responsiveAnimationDuration: 3
                    }
       
        },
     updateChart() {
      this.$nextTick(() => {
        this.renderMix();
      });
    } 
    },

    mounted() {
        this.renderMix();
    }
}
</script>

<style scoped>

.combo-chart {
    max-height: 500px;
    width: 80%;
}

</style>