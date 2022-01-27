// const ta = require('ta.js');

// // export function sma(data, length) {
// //     return ta.sma(data, length)
// // }

// const sma = function sma(data, length) {
//     return ta.sma(data, length)
// }

const sma = require('technicalindicators').SMA;

export default function smaCalc(period, values) {
    return sma.calculate({period: period, values: values })
}


