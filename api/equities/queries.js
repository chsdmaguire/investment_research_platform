// search query
const basicSearch = " SELECT DISTINCT ticker, name, sector FROM equities.basic_info";

// STOCK MAIN PAGE NEWS API REQUESTS
const topNews = "SELECT DISTINCT * FROM equities.general_news where category = $1 ORDER BY datetime desc limit 30";

// IPO CALENDAR API
const getIpos = 'select distinct date, symbol, name, price, number_of_shares, total_shares_value, exchange from equities.ipo_calendar where date is not null and exchange is not null and name is not null and number_of_shares is not null and price is not null and status is not null and symbol is not null and total_shares_value is not null';

// EARNINGS CALENDAR API
const getEarningsCalendar = 'SELECT DISTINCT * FROM equities.earnings_calendar WHERE eps_estimate IS NOT null and revenue_estimate IS NOT null order by date desc limit 500';

// Analyst Recommendations API
const getAnalystRecs = 'SELECT DISTINCT * FROM equities.analyst_recs WHERE ticker = $1 ORDER BY period asc';
const mostRecentRec = 'select * from equities.analyst_recs where ticker = $1 order by period desc limit 1';

//SENTIMENT ANALYSIS API
const sentimentAnalysis = 'select DISTINCT * from equities.social_sentiment where ticker = $1 ORDER BY date desc';

// STOCK SPECIFIC NEWS API
const stockNews = 'select DISTINCT * from equities.stock_news where ticker = $1 ORDER BY datetime desc limit 60';

// INSIDER TRANSACTIONS API
const insideTransactions = 'select distinct * from equities.inside_transactions where ticker = $1 ORDER BY transaction_date desc';

// EARNINGS SURPRISES API
const earningsSurprise = 'select DISTINCT * from equities.earnings_estimate where ticker = $1 ORDER BY period desc limit 40';

// STOCK CANDLESTICK CHART API
const candles = "select distinct * from equities.candlestick_data where ticker = $1 and frequency = 'D'  order by date desc"
const stockCandleStick = "select distinct date, open from equities.candlestick_data where ticker = $1 and date > $2 and frequency = $3 order by date desc limit 1200";

// STOCK BASIC INFO API
const basicInfo = 'select * from equities.basic_info where ticker = $1';
const keyMarketFinancials = "select distinct metric, value from equities.key_metrics where ticker = $1"

// Metrics Graph 
const finRatiosAnnual = "select distinct fsli from equities.financial_ratios where ticker = $1 and fp = 'annual'";
const specificRatioAnnual = "select distinct num_value, date from equities.financial_ratios where ticker = $1 and fsli = $2 and fp = 'annual'";

const finRatiosQuarter = "select distinct fsli from equities.financial_ratios where ticker = $1 and fp = 'quarter'";
const specificRatioQuarter = "select DISTINCT num_value, date from equities.financial_ratios where ticker = $1 and fsli = $2 and fp = 'quarter'";

// COMPETITORS LIST
const stockCompetitors = "select DISTINCT peers from equities.peers where ticker = $1";

// COMPS TABLE
const allComps = "with ticker_list as (select distinct ticker, name from equities.basic_info) select a.ticker, ev_fcf_annual, p_fcf_annual, pb_annual, bv_share_annual, ps_annual,  rev_share_ttm, pe_norm_anual,  revenue, ev_ebit, ev_ebitda,  net_debt_annual, numshares, ticker_list.name from equities.dcf_comps a  inner join ticker_list on a.ticker = ticker_list.ticker where a.ticker != $1 order by ticker asc";
const tickerComps = "select ticker, ev_fcf_annual, p_fcf_annual, pb_annual, bv_share_annual, ps_annual, rev_share_ttm, pe_norm_anual, revenue, ev_ebit, ev_ebitda, net_debt_annual, numshares, net_income, ebitda, bv_share_annual, ebit, market_capitalization from equities.dcf_comps where ticker = $1";

// FINANCIAL STATEMENTS
const finStmtDates = "select distinct date, fp from equities.normalized_financials where ticker = $1";

const histFinancial = "select distinct fp, stmt, date, fsli, value from equities.normalized_financials where ticker = $1";


// DCF INPUTS
const dcfInputs = "select wacc, gross_margin, net_debt, taxexp, rev_growth_rate, operating_margin, capex_margin, da_margin, change_nwc_margin, operating_margin, sbc_margin, numshares, payoutratio_ttm, beta from equities.dcf_comps where ticker = $1"
const revDcf = "select fsli, value from equities.normalized_financials where ticker = $1 and value is not null and fsli = 'totalRevenue' and fp = 'quarter' order by date desc limit 4"

// TOP TRENDING/MOST ACTIVE
const topTrending = "with top_stocks as (select distinct * from equities.social_sentiment order by date desc, total_mentions desc, " +
 "total_score desc limit 6) select a.ticker, a.date, a.open, a.close, b.name from equities.candlestick_data a, equities.basic_info b " +
  "where a.ticker in (select ticker from top_stocks) and a.ticker = b.ticker group by a.ticker, b.ticker, b.name, date, open, " +
  "close order by date desc limit 6";

const bigMovers = "with top as (select distinct ticker, open, close, date, volume " +
    "from equities.candlestick_data where close > 20 group by date, " +
    "ticker, open, close, volume order by date desc limit 4896), " +
    "name as (select distinct ticker, name from equities.basic_info) " +
    "select top.ticker, top.open, top.close, top.date, top.volume, " +
    "name.name from top, name where top.ticker = name.ticker " +
    "order by top.ticker asc, date asc"

// SIMILAR COMPANIES
const similarCompanies = "with similar_companies as (select distinct * from equities.peers where ticker = $1)  select a.ticker, a.date, a.open, a.close, b.name from  equities.candlestick_data a, equities.basic_info b  where a.ticker in (select peers from similar_companies) and a.ticker = b.ticker group by a.ticker, b.ticker, b.name, date, open, close order by date desc limit 6"

// PATENTS
const patents = "select distinct * from equities.patents where ticker = $1"

const comp = "with fin as (select distinct ticker, fsli, date, value from equities.normalized_financials where " +
"(fsli = 'totalRevenue' or fsli = 'ebit' or fsli = 'ebitda' or fsli = 'netIncome' " +
"or fsli = 'totalShareholderEquity' or fsli = 'operatingCashflow' " +
"or fsli = 'shortLongTermDebtTotal') and fp = 'annual' and value is not null " +
"group by ticker, fsli, date, value order by date desc, ticker asc, fsli desc limit 50000), " +
"price as (select distinct ticker, open, date from equities.candlestick_data " +
"group by ticker, open, date order by date desc, ticker asc limit 60000), " +
"name as (select distinct ticker, name, market_cap from equities.basic_info order by ticker asc)  " +
'select fin.ticker, name.name, max(price.open) as "price",' +
`max(fin.value) filter (where fin.fsli = 'totalRevenue') as "revenue", ` +
`max(fin.value) filter (where fin.fsli = 'ebit') as "ebit", ` +
`max(fin.value) filter (where fin.fsli = 'ebitda') as "ebitda", ` +
`max(fin.value) filter (where fin.fsli = 'netIncome') as "netincome", ` +
`max(fin.value) filter (where fin.fsli = 'totalShareholderEquity') as "bookvalue", ` +
`max(fin.value) filter (where fin.fsli = 'shortLongTermDebtTotal') as "debt", ` +
`max(fin.value) filter (where fin.fsli = 'operatingCashflow') as "ocf", `  +
'max(name.market_cap) as "market_cap" ' + 
"from fin, name, price where fin.ticker = name.ticker  and fin.ticker = price.ticker " +
 "group by fin.ticker, name.name order by fin.ticker asc"

 const dcf = "select distinct date, fsli, value from equities.normalized_financials where ticker = $1 and " +
 "fp = 'annual' and (fsli = 'totalRevenue' or fsli = 'costofGoodsAndServicesSold' or fsli = 'researchAndDevelopment' " +
 "or fsli = 'sellingGeneralAndAdministrative' or fsli = 'depreciationAndAmortization' or fsli = 'incomeBeforeTax' or " + 
 "fsli = 'incomeTaxExpense' or fsli = 'changeInOperatingAssets' or fsli = 'changeInOperatingLiabilities' " +
 "or fsli = 'capitalExpenditures' or fsli = 'dividendPayoutCommonStock') and value is not null order by date desc"

 const betaCalc = "with stock as (select distinct ticker, date, close from equities.candlestick_data where " +
 "ticker = $1 and frequency = 'D' group by ticker, date, close order by date desc limit 300), " +
 "spy as (select distinct * from econ.indice_data where series_id = 'SP500'  " +
 "group by series_id, time, value order by time desc limit 300) " +
 'select stock.date as "date", stock.close as "stock", spy.value as "spy" ' +
 "from stock, spy where stock.date = spy.time"

 const otherDcfAss = "with price as (select distinct date, close from equities.candlestick_data where ticker = $1 " + 
 "order by date desc limit 1), tyield as (select distinct date, value from econ.timeseries_data  where series_id = 'DGS30' " +
 "order by date desc limit 1), " +
 "cap as (select distinct market_cap from equities.basic_info where ticker = $1), " +
 "fin as (select distinct * from equities.normalized_financials where ticker = $1 and " +
 "fp = 'annual' and (fsli = 'totalShareholderEquity' or fsli = 'ebitda' or fsli = 'shortLongTermDebtTotal' " + 
 "or fsli = 'cashAndCashEquivalentsAtCarryingValue'  or fsli = 'interestExpense') order by date desc, fsli desc limit 7) " +
 'select max(price.close) as "price", ROUND((max(cap.market_cap) * 1000000) / max(price.close)) as "shares_outs", ' +
 `(max(fin.value) filter( where fsli = 'interestExpense') / (max(fin.value) filter( where fsli = 'shortLongTermDebtTotal'))) as "debt_cost", ` +
 `max(fin.value) filter( where fsli = 'shortLongTermDebtTotal') as "total_debt", ` +
 `max(fin.value) filter( where fsli = 'cashAndCashEquivalentsAtCarryingValue') as "total_cash", ` +
`(((max(fin.value) filter (where fsli = 'shortLongTermDebtTotal')) + (max(cap.market_cap) * 1000000) - (max(fin.value) filter ` + 
`(where fsli = 'cashAndCashEquivalentsAtCarryingValue'))) / (max(fin.value) filter (where fsli = 'ebitda'))) as "ev_ebitda", ` +
 ` max(tyield.value) as "tyield" from price, tyield, cap, fin`
 
const newSearch = "with name as (select distinct ticker, name, sector from equities.basic_info " +
"  group by ticker, name, sector order by ticker asc) select " +
`name.ticker as "ticker",  concat(name.name, ' ', '(', name.ticker, ')') as "name", name.sector as "industry" from name`

const newInsiders = "with inside as (select distinct sum(change), transaction_date, max(transaction_price) from " +
"equities.inside_transactions where ticker = $1 and transaction_price > 0 group by transaction_date order by transaction_date) " +
`select inside.transaction_date as "date", (inside.max * inside.sum) as "amount" from inside order by date asc`

// financials charting queries
const margin = "select distinct date,  max(case when (fsli = 'totalRevenue') then value else NULL end) as revenue, " +
"max(case when (fsli = $2) then value else NULL end) as fsli " +
"from equities.normalized_financials where ticker = $1 group by date order by date asc"

const finChart1 = "select distinct date,  max(case when (fsli = $3) then value else NULL end) as bottom, " +
"max(case when (fsli = $2) then value else NULL end) as top " +
"from equities.normalized_financials where ticker = $1 group by date order by date asc"

const finChart2 = "select distinct date,  max(case when (fsli = $3) then value else NULL end) as bottom, " +
"max(case when (fsli = $2) then value else NULL end) as top_first, max(case when (fsli = $4) then value else NULL end) as top_second " +
"from equities.normalized_financials where ticker = $1 group by date order by date asc"

const socialMentions = "select distinct date, positive_mentions, negative_mentions from equities.social_sentiment " +
"where ticker = $1 and source = $2 order by date desc";

const socialScore = "select distinct date, positive_score, negative_score, total_score from equities.social_sentiment " +
"where ticker = $1 and source = $2 order by date asc";

const bvPerShare = "with shares as (select distinct shares_outstanding from equities.basic_info where ticker = $1), " + 
"fin as (select distinct date, fsli, value from equities.normalized_financials where fp = 'quarter' " +
"and ticker = $1 and (fsli = 'totalAssets' or fsli = 'totalLiabilities') group by date, fsli, value) " +
"select distinct date, (max(case when (fsli = 'totalAssets') then value else null end) -  max(case when (fsli = 'totalLiabilities') " +
'then value else null end)) / (max(shares.shares_outstanding) * 1000000) as "bv_per_share" from shares, fin group by date order by date'

const marketMetrics = "with shares as (select distinct shares_outstanding from equities.basic_info where ticker = $1), " + 
"fin as (select distinct date, fsli, value from equities.normalized_financials where fp = 'quarter' " + 
"and ticker = $1 and (fsli = $2 or fsli = 'shortLongTermDebtTotal' or fsli = 'cashAndShortTermInvestments') " +
"group by ticker, date, fsli, value), " + 
"price as (select distinct date, close from equities.candlestick_data where ticker = $1 group by " +
"date, close) select distinct fin.date, (((max(shares.shares_outstanding) * 1000000) * price.close) " +
"+ max(case when (fsli = 'shortLongTermDebtTotal') then value else null end) -  max(case when (fsli = 'cashAndShortTermInvestments') " +
`then value else null end)) / max(case when (fsli = $2) then value else null end) as "value" from shares, fin, price ` +
"where fin.date = price.date group by fin.date, price.close order by fin.date"

const marketMetrics2 = "with shares as (select distinct shares_outstanding from equities.basic_info where ticker = $1), " + 
"fin as (select distinct date, fsli, value from equities.normalized_financials where fp = 'quarter' " + 
"and ticker = $1 and fsli = $2  group by ticker, date, fsli, value), " +
"price as (select distinct date, close from equities.candlestick_data where ticker = $1 group by " +
"date, close) select distinct fin.date, ((max(shares.shares_outstanding) * 1000000) * price.close) " +
`/ max(case when (fsli = $2) then value else null end) as "value" from shares, fin, price ` +
"where fin.date = price.date group by fin.date, price.close order by fin.date"

module.exports = {
    topNews,
    getIpos,
    getEarningsCalendar,
    getAnalystRecs,
    mostRecentRec,
    sentimentAnalysis,
    stockNews,
    insideTransactions,
    earningsSurprise,
    stockCandleStick,
    basicInfo,
    finRatiosAnnual,
    specificRatioAnnual,
    finRatiosQuarter,
    specificRatioQuarter,
    stockCompetitors,
    allComps,
    tickerComps,
    keyMarketFinancials,
    finStmtDates,
    histFinancial,
    basicSearch,
    dcfInputs,
    revDcf,
    topTrending,
    similarCompanies,
    bigMovers,
    patents,
    comp,
    dcf,
    betaCalc,
    otherDcfAss,
    newSearch,
    candles,
    newInsiders,
    margin,
    socialMentions,
    socialScore,
    finChart1,
    finChart2,
    bvPerShare,
    marketMetrics,
    marketMetrics2
}