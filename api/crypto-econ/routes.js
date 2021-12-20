const { Router } = require('express');
const controller = require('./controller');

const router = Router();

// CRYPTO
router.get('/crypto/listings', controller.getListing)
router.get('/crypto/candlestick/:ticker', controller.cryptoCandleStick)
router.get('/crypto/ticker/list', controller.cryptoList)

// ECON
// index graphs
router.get('/fred/db/index/:series_id', controller.dbIndex)

// econ graph
router.get('/econ/metric/list', controller.econMetricList)
router.get('/econ/graph/metric/:symbol', controller.econData)
router.get('/econ/metric/notes/:symbol', controller.econNotes)



module.exports = router;