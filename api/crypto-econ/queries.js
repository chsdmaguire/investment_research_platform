
// CRYPTO
const cryptoListings = " SELECT DISTINCT * from crypto.latest_listings order by cmc_rank";
const cryptoCandleStick = " SELECT DISTINCT * from crypto.crypto_candlesticks where ticker = $1 ORDER BY date asc limit 1200";
const cryptoList = "SELECT DISTINCT symbol, name, cmc_rank from crypto.latest_listings order by cmc_rank";


// ECON
const econData = 'SELECT distinct value, date FROM econ.timeseries_data where series_id = $1 and value is not null  order by date asc limit 8000';
const econMetricList =  'SELECT distinct series_id, name FROM econ.metrics_info ORDER BY name asc';
const dbIndex = "SELECT distinct time, value FROM econ.indice_data where series_id = $1 and time > '2015/01/01' ORDER BY time asc";
const econNotes = "SELECT * FROM econ.metrics_info where series_id = $1";

module.exports = {
    cryptoListings,
    cryptoCandleStick,
    cryptoList,
    econData,
    econMetricList,
    dbIndex,
    econNotes
}