const technicalCalcs = require('technicalindicators');

export default {
        simpleMovingAverage(prices, window) {
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
        },

        exponentialMovingAverage(prices, window) {
            if (!prices || prices.length < window) {
                return []
            }
            const weight = 2 / (window + 1);

            const expMovingAvgs = [];
            prices.forEach((item, i) => {
                const date = item[0];
                const val = item[5];
                const prevVal = prices[i -1][5];
                const currEma = ((val - prevVal) * weight) + prevVal;
                expMovingAvgs.push([date, currEma])
            })
            return expMovingAvgs;
        },

    ichiMokuCloud(prices) {
        const sortedPrices = prices.sort((a, b) => a[0] - b[0])
            const highs = [];
            const lows = [];
            const closes = [];
            const dates = [];
            sortedPrices.forEach(item => {
                highs.push(item[2]);
                lows.push(item[3]);
                dates.push(item[0]);
                closes.push(item[4])
            });
            const window3 = 52;
            let index3 = window3 - 1;
            const ichiData = [];
            while(++index3 < highs.length) {
                const highWindow1 = highs.slice(index3 - window3, index3 - 43);
                const lowWindow1 = lows.slice(index3 - window3, index3 - 43);

                const highWindow2 = highs.slice(index3 - window3, index3 - 26);
                const lowWindow2 = lows.slice(index3 - window3, index3 - 26);

                const highWindow3 = highs.slice(index3 - window3, index3);
                const lowWindow3 = lows.slice(index3 - window3, index3);
                const windowDate = dates.slice(index3 - window3, index3);
                const newDate = Math.max(...windowDate)

                const tenkanSenVal = (Math.max(...highWindow1) + Math.min(...lowWindow1)) / 2
                const kijunSenVal = (Math.max(...highWindow2) + Math.min(...lowWindow2)) / 2
                const senkoSpanA = (tenkanSenVal + kijunSenVal) / 2
                const senkoSpanB = (Math.max(...highWindow3) + Math.min(...lowWindow3)) / 2
                const chikouSPan = closes[index3 - 25]
                ichiData.push([newDate, tenkanSenVal, kijunSenVal, senkoSpanA, senkoSpanB, chikouSPan])
            };
        return ichiData
    },
    parabolicSar(prices) {
        const highs = [];
            const lows = [];
            const dates = [];
            prices.forEach(item => {
                highs.push(item[2]);
                lows.push(item[3]);
                dates.push(item[0]);
            });
            const sarsArray = [];
            const pSar = new technicalCalcs.PSAR.calculate({high: highs, low: lows, step: .02, max: .2});
          
            pSar.forEach((item, index) => {
                sarsArray.push([dates[index], item])
            });
        return sarsArray;
    }
}