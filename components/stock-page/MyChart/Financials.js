export default {
    methods: {
        calcGrossMargin(response) {
            const arr = response.sort((a, b) => (a.date > b.date) ? 1: -1);
            const grossMargin = [];
            arr.forEach(item => {
                const date = new Date(item.date).getTime();
                const val = item.gross_profit / item.revenue
                grossMargin.push([date, val])
            });
            
            return grossMargin;
        }
    }
}