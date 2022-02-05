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
const stockCandleStick = 'select distinct * from equities.candlestick_data where ticker = $1 and date in (select date from (select ticker, date, count(*) from equities.candlestick_data where ticker = $1 and date > $2 group by ticker, date having count(*) = 1) as foo) ORDER BY date desc limit 1200';

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
const similarCompanies = "with similar_companies as (select * from equities.peers where ticker = $1)  select a.ticker, a.date, a.open, a.close, b.name from  equities.candlestick_data a, equities.basic_info b  where a.ticker in (select peers from similar_companies) and a.ticker = b.ticker group by a.ticker, b.ticker, b.name, date, open, close order by date desc limit 6"

// PATENTS
const patents = "select distinct * from equities.patents where ticker = $1"

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
    patents
}