import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData", "chartOptions"],
  data() {
    return {
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }
};