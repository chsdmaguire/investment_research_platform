export default {
    methods: {
        simpleMovingAverage(prices) {
            const window = 5;
            if (!prices || prices.length < window) {
                return []
            }
            let index = window - 1;
            const length = prices.length + 1;
            const simpleMovingAverages = [];
            while (++index < length) {
                const windowSlice = prices.slice(index - window, index);
                const date = windowSlice.slice(-1)[0][0]
               const sum = windowSlice.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
               const closeMa = sum[4] / window;
               simpleMovingAverages.push([date, closeMa])
            };
            return simpleMovingAverages;
        }
    }
}