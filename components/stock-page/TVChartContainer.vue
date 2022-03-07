<template>
  <div id="tv_chart_container" class="TVChartContainer" />
</template>

<script>

export default {
    data() {
        return {
            stockData: [],
            tvWidget: null,
        }
    },

    methods: {
        async demoChart() {
            const ticker = 'AAPL';
            const res = await this.$axios.get(`/stock/candles/${ticker}`);
            res.data.forEach(item => {
                const date = new Date(item.date).getTime();
                this.stockData.push({
                    time: date,
                    low: item.low,
                    high: item.high,
                    open: item.open,
                    close: item.close
                })
            });
            console.log(this.stockData)
            const widgetOptions = {
                symbol: ticker,
                interval: '1D',
                fullscreen: true,
                datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.stockData),
                container: 'tv_chart_container',
                enabled_features: ['study_templates'],
                library_path: '/charting_library/'
            }
            const {
            $TVChart: { Widget }
            } = this
            const tvWidget = new Widget(widgetOptions)
            this.tvWidget = tvWidget
            }
    },

    mounted() {
        this.demoChart();
    }
}
</script>
<style scoped>
.TVChartContainer {
  height: calc(100vh - 80px);
}
</style>