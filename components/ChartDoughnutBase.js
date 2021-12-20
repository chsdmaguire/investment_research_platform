import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["chartData"],
  data() {
    return {
      options: {
        legend: {
          display: true,
          align: 'center',
          position: 'bottom',

        },
        title: {
          display: true,
          text: 'Current Analyst Recommendations'
      },
        events: ['mousemove', 'mouseout', 'touchstart', 'touchmove'],
        interaction: {
          mode: 'point'
      },
        responsive: true,
        maintainAspectRatio: false
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};