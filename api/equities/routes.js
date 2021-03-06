const { Router } = require('express');
const controller = require('./controller');

const router = Router();

// basic search query
router.get('/basic', controller.basicSearch)

// STOCK MAIN PAGE NEWS DATA
router.get('/news/top/:category', controller.topNews)

//IPO Calendar 
router.get('/ipo/calendar', controller.getIpos)

//EARNINGS CALENDAR
router.get('/earnings/calendar', controller.getEarningsCalendar)

//ANALYST RECS
router.get('/analyst/recs/:ticker', controller.getAnalystRecs)
router.get('/analyst/recs/mostrecent/:ticker', controller.mostRecentRec)

//SENTIMENT ANALYSIS
router.get('/social/sentiment/:ticker', controller.sentimentAnalysis)

// STOCK SPECIFIC NEWS
router.get('/news/stock/:ticker', controller.stockNews)

// INSIDE TRANSACTIONS
router.get('/insider/transactions/:ticker', controller.insideTransactions)

// EARNINGS SURPISES
router.get('/earnings/surpises/:ticker', controller.earningsSurprise)

// STOCK CANDELSTICK CHART 
router.get('/stock/candlestick/chart/:ticker/:date/:freq', controller.stockCandleStick)
router.get('/stock/candles/:ticker', controller.candles)

// STOCK BASIC INFO
router.get('/stock/basic/info/:ticker', controller.basicInfo)
router.get('/stock/key/metrics/:ticker', controller.keyMarketFinancials)

// STOCK METRICS GRAPH
router.get('/annual/metrics/:ticker', controller.finRatiosAnnual)
router.get('/annual/chart/metrics/:ticker/:fsli', controller.specificRatioAnnual)
router.get('/stock/quarter/metrics/chart/:ticker', controller.finRatiosQuarter)
router.get('/stock/quarter/metrics/chart/:ticker/:fsli', controller.specificRatioQuarter)

// COMPETITORS
router.get('/stock/competitors/:ticker', controller.stockCompetitors)

// COMPS TABLE
router.get('/stock/market/allcomps/:ticker', controller.allComps)
router.get('/comps/:ticker', controller.tickerComps)

// FINANCIAL STATEMENTS
router.get('/historical/financials/dates/:ticker', controller.finStmtDates)
router.get('/financials/values/:ticker', controller.histFinancial)

// DCF INPUTS
router.get('/dcf/inputs/:ticker', controller.dcfInputs)
router.get('/dcf/rev/:ticker', controller.revDcf)

// TOP TRENDING
router.get('/top/trending', controller.topTrending)
router.get('/stocks/movers', controller.bigMovers)

// MOST SIMILAR
router.get('/similar/companies/:ticker', controller.similarCompanies)

// PATENTS
router.get('/stocks/patents/:ticker', controller.patents)

router.get('/stocks/comps', controller.comp)
router.get('/stocks/dcf/:ticker', controller.dcf)

router.get('/stocks/betacalc/:ticker', controller.betaCalc)
router.get('/stocks/otherdcfassump/:ticker', controller.otherDcfAss)

router.get('/stocks/insiders/:ticker', controller.newInsiders)

router.get('/charting/financials/margin/:ticker/:fsli', controller.margin)

router.get('/charting/financials/asset/:ticker/:one/:two', controller.finChart1)
router.get('/charting/financials/three/:ticker/:one/:two/:three', controller.finChart2)

router.get('/stocks/social/mentions/:ticker/:source', controller.socialMentions)

router.get('/stocks/social/score/:ticker/:source', controller.socialScore)

router.get('/stocks/charting/bvshare/:ticker', controller.bvPerShare)

router.get('/stocks/charting/marketmetrics/:ticker/:fsli', controller.marketMetrics)

router.get('/stocks/charting/marketmetrics2/:ticker/:fsli', controller.marketMetrics2)

router.get('/stocks/screener', controller.screener)

module.exports = router;