import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData"],
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false,
              }
            }
          ],

          xAxes: [{
            gridLines: {
              display: false,
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};