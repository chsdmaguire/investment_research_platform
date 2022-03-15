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
            const closes = [];
            const dates = [];
            prices.forEach((item) => {
                dates.push(item[0]);
                closes.push(item[4]);
            });
            const emas = new technicalCalcs.EMA.calculate({period: window, values: closes});
            const diffLength = closes.length - emas.length;
            const arr = [];
            emas.forEach((item, index) => {
                if(index > window) {
                    arr.push([dates[index + diffLength], item])
                }
            });
            return arr;
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
    },
    averageDirectIndex(prices) {
        const highs = [];
        const lows = [];
        const dates = [];
        const closes = [];
        const period = 14;
        prices.forEach(item => {
            highs.push(item[2]);
            lows.push(item[3]);
            dates.push(item[0]);
            closes.push(item[4]);
        });
        const adxArr = [];
        const Adx = new technicalCalcs.ADX.calculate({close: closes, high: highs, low: lows, period: period});
        const diffLength = highs.length - Adx.length
        Adx.forEach((item, index) => {
            adxArr.push([dates[index + diffLength], item.adx, item.mdi, item.pdi])
        });
    return adxArr;
    },

    commChannelIndex(prices) {
        const highs = [];
        const lows = [];
        const dates = [];
        const closes = [];
        const opens = []
        const period = 20;
        prices.forEach(item => {
            highs.push(item[2]);
            lows.push(item[3]);
            dates.push(item[0]);
            closes.push(item[4]);
            opens.push(item[1]);
        });

        const cciCalc = new technicalCalcs.CCI.calculate({open: opens, high: highs, low: lows, close: closes, period: period});
        const diffLength = highs.length - cciCalc.length;
        const cciArr = [];
        cciCalc.forEach((item, index) => {
            cciArr.push([dates[index + diffLength], item])
        });
        
        return cciArr;
    },

    stochOsc(prices) {
        const highs = [];
        const lows = [];
        const dates = [];
        const closes = [];
        const period = 14;
        const signal_period = 3;
        prices.forEach(item => {
            highs.push(item[2]);
            lows.push(item[3]);
            dates.push(item[0]);
            closes.push(item[4]);
        });

        const calcs = new technicalCalcs.Stochastic.calculate({high: highs,
        low: lows, close: closes, period: period, signalPeriod: signal_period});

        const diffLength = closes.length - calcs.length;
        const arr = [];
        calcs.forEach((item, index) => {
            if(item.k != null && item.d != null)
          arr.push([dates[index + diffLength], Number(item.k), 
          Number(item.d)])
        });
        
        return arr;
    },
    macdIndicator(prices) {
        const dates = [];
        const closes = [];
        prices.forEach(item => {
            dates.push(item[0]);
            closes.push(item[4]);
        });
        const macdCalc = new technicalCalcs.MACD.calculate({values: closes, fastPeriod: 5, 
        slowPeriod: 8, signalPeriod: 3, SimpleMAOscillator: false, simpleMASignal: false});

        const diffLength = closes.length - macdCalc.length;
        const arr = [];
        macdCalc.forEach((item, index) => {
            if(item.histogram != null && item.signal != null && item.MACD != null)
          arr.push([dates[index + diffLength], Number(item.histogram), 
          Number(item.MACD), Number(item.signal)])
        });
        
        return arr;
    },

    williamR(prices) {
        const highs = [];
        const lows = [];
        const dates = [];
        const closes = [];
        const period = 14;
        prices.forEach(item => {
            highs.push(item[2]);
            lows.push(item[3]);
            dates.push(item[0]);
            closes.push(item[4]);
        });

        const calcs = new technicalCalcs.WilliamsR.calculate({high: highs,
        low: lows, close: closes, period: period});

        const diffLength = closes.length - calcs.length;
        const arr = [];
        calcs.forEach((item, index) => {
            if(item != null)
          arr.push([dates[index + diffLength], Number(item)])
        });
        
        return arr;
    },
    mfi(prices) {
        const highs = [];
        const lows = [];
        const dates = [];
        const closes = [];
        const volumes = [];
        const period = 14;
        prices.forEach(item => {
            highs.push(item[2]);
            lows.push(item[3]);
            dates.push(item[0]);
            closes.push(item[4]);
            volumes.push(item[5]);
        });

        const calcs = new technicalCalcs.MFI.calculate({high: highs,
        low: lows, close: closes, volume: volumes, period: period});

        const diffLength = closes.length - calcs.length;
        const arr = [];
        calcs.forEach((item, index) => {
            if(item != null)
          arr.push([dates[index + diffLength], Number(item)])
        });
        
        return arr;
    },
    atr(prices) {
        const highs = [];
        const lows = [];
        const dates = [];
        const closes = [];
        const period = 14;
        prices.forEach(item => {
            highs.push(item[2]);
            lows.push(item[3]);
            dates.push(item[0]);
            closes.push(item[4]);
        });

        const calcs = new technicalCalcs.ATR.calculate({high: highs,
        low: lows, close: closes, period: period});

        const diffLength = closes.length - calcs.length;
        const arr = [];
        calcs.forEach((item, index) => {
            if(item != null)
          arr.push([dates[index + diffLength], Number(item)])
        });
        
        return arr;
    },
    bb(prices) {
        const dates = [];
        const closes = [];
        const period = 14;
        const std = 2;
        prices.forEach(item => {
            dates.push(item[0]);
            closes.push(item[4]);
        });

        const calcs = new technicalCalcs.BollingerBands.calculate({period: period, 
            values: closes, stdDev: std});

        const diffLength = closes.length - calcs.length;
        const arr = [];
        calcs.forEach((item, index) => {
            if(item.middle != null && item.upper != null && item.lower != null)
          arr.push([dates[index + diffLength], Number(item.upper), Number(item.middle),
          Number(item.lower)])
        });
        
        return arr;
    },
    bbWidth(prices) {
        const dates = [];
        const closes = [];
        const period = 14;
        const std = 2;
        prices.forEach(item => {
            dates.push(item[0]);
            closes.push(item[4]);
        });

        const calcs = new technicalCalcs.BollingerBands.calculate({period: period, 
            values: closes, stdDev: std});

        const diffLength = closes.length - calcs.length;
        const arr = [];
        calcs.forEach((item, index) => {
            if(item.middle != null && item.upper != null && item.lower != null)
          arr.push([dates[index + diffLength], Number(item.upper) -
          Number(item.lower)])
        });
        
        return arr;
    },
    adl(prices) {
        const dates = [];
        const closes = [];
        const highs = [];
        const lows = [];
        const volumes = [];
        prices.forEach(item => {
            highs.push(item[2]);
            lows.push(item[3]);
            dates.push(item[0]);
            closes.push(item[4]);
            volumes.push(item[5]);
        });

        const calcs = new technicalCalcs.ADL.calculate({high: highs,
            low: lows, close: closes, volume: volumes});

        const diffLength = closes.length - calcs.length;
        const arr = [];
        calcs.forEach((item, index) => {
            if(item != null)
          arr.push([dates[index + diffLength], Number(item)])
        });
        
        return arr;
    },
    vwap(prices) {
        const dates = [];
        const closes = [];
        const highs = [];
        const lows = [];
        const volumes = [];
        prices.forEach(item => {
            highs.push(item[2]);
            lows.push(item[3]);
            dates.push(item[0]);
            closes.push(item[4]);
            volumes.push(item[5]);
        });

        const calcs = new technicalCalcs.VWAP.calculate({high: highs,
            low: lows, close: closes, volume: volumes});

        const diffLength = closes.length - calcs.length;
        const arr = [];
        calcs.forEach((item, index) => {
            if(item != null) {
                 arr.push([dates[index + diffLength], Number(item)])
            }
         
        });
        
        return arr;
    },
    obv(prices) {
        const dates = [];
        const closes = [];
        const volumes = [];
        prices.forEach(item => {
            dates.push(item[0]);
            closes.push(item[4]);
            volumes.push(item[5]);
        });

        const calcs = new technicalCalcs.OBV.calculate({close: closes, volume: volumes});

        const diffLength = closes.length - calcs.length;
        const arr = [];
        calcs.forEach((item, index) => {
            if(item != null) 
          arr.push([dates[index + diffLength], Number(item)])
        });
        
        return arr;
    },
    keltner(prices) {
        const highs = [];
        const lows = [];
        const dates = [];
        const closes = [];
        const period = 20;
        prices.forEach(item => {
            highs.push(item[2]);
            lows.push(item[3]);
            dates.push(item[0]);
            closes.push(item[4]);
        });

        const atrs = new technicalCalcs.ATR.calculate({high: highs,
        low: lows, close: closes, period: period});
        const emas = new technicalCalcs.EMA.calculate({
            period: period, values: closes
        });

        const diffLength = closes.length - atrs.length;
        const arr = [];
        atrs.forEach((item, index) => {
            if(item != null) {
                const time  = dates[index + diffLength];
                const mid = emas[index + diffLength -1];
                const upper = mid + (2 * item);
                const lower = mid - (2 * item)
                arr.push([time, upper, mid, lower])
            }
          
        });
        
        return arr;
    },
    keltnerWidth(prices) {
        const highs = [];
        const lows = [];
        const dates = [];
        const closes = [];
        const period = 20;
        prices.forEach(item => {
            highs.push(item[2]);
            lows.push(item[3]);
            dates.push(item[0]);
            closes.push(item[4]);
        });

        const atrs = new technicalCalcs.ATR.calculate({high: highs,
        low: lows, close: closes, period: period});
        const emas = new technicalCalcs.EMA.calculate({
            period: period, values: closes
        });

        const diffLength = closes.length - atrs.length;
        const arr = [];
        atrs.forEach((item, index) => {
            if(item != null) {
                const time  = dates[index + diffLength];
                const mid = emas[index + diffLength -1];
                const upper = mid + (2 * item);
                const lower = mid - (2 * item)
                arr.push([time, upper - lower])
            }   
        });
        
        return arr;
    },
    stdDev(prices) {
        const closes = [];
        const dates = [];
        const period = 8;
        prices.forEach((item) => {
            dates.push(item[0]);
            closes.push(item[4]);
        });

        const smas = new technicalCalcs.SMA.calculate({period: period, 
        values: closes});
        const diffLength = closes.length - smas.length;
        const arr = [];
        smas.forEach((item, index) => {
            if(index >= period) {
                const stdDev = ((((item - closes[index -1]) + (item - closes[index -2]) + (item - closes[index -3]) +
                (item - closes[index -4]) + (item - closes[index -5]) + (item - closes[index -6]) + 
                (item - closes[index -7]) + (item - closes[index -8]) ) ** 2) / period) ** (1/2)
                arr.push(dates[index + diffLength], stdDev)
            }
        });
        return arr;
    },

    chaikin(prices) {
        const window = 21;
            let index = window -1;
           const data = [];
            while(index++ < prices.length) {
                 const windowSlice = prices.slice(index - window, index);
                 const date = windowSlice.slice(-1)[0][0];
                  const sum = windowSlice.reduce((prev, curr) => ((((curr[4] - curr[3]) - (curr[2] - curr[4])) / (curr[2] - curr[3])) * curr[5]) + prev, 0);
                  console.log(windowSlice, sum)
                  data.push([date, (sum/window)]);
            };
        return data
    },
    
}
