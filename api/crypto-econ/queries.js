
// CRYPTO
const cryptoListings = " SELECT DISTINCT * from crypto.latest_listings order by cmc_rank";
const cryptoCandleStick = 'select distinct * from crypto.crypto_candlesticks where ticker = $1 and date in (select date from (select ticker, date, count(*) from crypto.crypto_candlesticks where ticker = $1 and date > $2 group by ticker, date having count(*) = 1) as foo) ORDER BY date desc limit 1200';
const cryptoList = "SELECT DISTINCT symbol, name, cmc_rank from crypto.latest_listings order by cmc_rank";


// ECON
const econData = 'SELECT distinct value, date FROM econ.timeseries_data where ' +
 'series_id = $1 and value is not null order by date asc limit 8000';

const econMetricList =  'SELECT distinct series_id, name FROM econ.metrics_info ORDER BY name asc';

const dbIndex = "SELECT distinct time, value FROM econ.indice_data where " +
"series_id = $1 and time >= $2 ORDER BY time desc";

const econNotes = "SELECT * FROM econ.metrics_info where series_id = $1";

const allIndices = "with indices as (select distinct * from econ.indice_data where series_id = 'SP500' or " +
 "series_id = 'DJIA' or series_id = 'NASDAQCOM' group by series_id, time, value order by time, series_id " +
  "desc limit 300) select * from indices order by series_id, time"

const indiceCard = "select distinct * from econ.indice_data group by " +
 "series_id, time, value order by time desc limit 28"

module.exports = {
    cryptoListings,
    cryptoCandleStick,
    cryptoList,
    econData,
    econMetricList,
    dbIndex,
    econNotes,
    indiceCard,
    allIndices
}