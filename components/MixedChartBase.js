import { Bubble, mixins} from 'vue-chartjs';
const { reactiveProp } = mixins;
    

export default {
    extends: Bubble,
    mixins: [reactiveProp],
    props: ["chartData", "options"],
    data() {
        return {
        }
    },
    mounted () {
        this.renderChart( this.chartData, this.options) },
    }