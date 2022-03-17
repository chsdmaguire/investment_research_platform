<template>
  <v-container>
       <ChartDoughnutBase :chart-data="PieData" />
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            PieData: null,
            mostRecent: [],
        }
    },
    methods: {
        formatLabel(val) {
            if(val.includes('_')) {
                return val.split('_')[0] + ' ' + val.split('_')[1]
            } else {
                return val
            }
        },
        async fillData() {
        const ticker = this.$route.params.ticker.toUpperCase();
        this.mostRecent = await this.$axios.get(`/analyst/recs/mostrecent/${ticker}`);
        const pie_labels = [];
        const pie_values = [];
        for(const [key, value] of Object.entries(this.mostRecent.data[0])) {
            if(key !== 'ticker' && key !== 'period') {
                const name = this.formatLabel(key)
            pie_labels.push(name)
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
    },
    mounted() {
        this.fillData();
    }
}
</script>

<style>

</style>