import { Bubble, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bubble,
  mixins: [reactiveProp],
  props: ["chartData"],
  data() {
    return {
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: false
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
      },
      legend: {
        display: true
      },
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
          label: function(tooltipItems, data) {
            return '$' + tooltipItems.yLabel;
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      height: 200,

      animation: {
        duration: 3 
    },
    hover: {
        animationDuration: 3
    },
    responsiveAnimationDuration: 3 
    }
  };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },

}