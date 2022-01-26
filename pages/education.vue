<template>
<v-app>
<v-container fluid class="splash mt-12">

<v-row class="justify-center">
    <h1 class="ed-title">What would you like to <span class="primary-text">Learn</span>?</h1>  
</v-row>
<v-row class="justify-center my-8">
  <h5>Powered By <span class="primary-text">Investopedia</span> </h5>
</v-row>


    <card-grid :data="grid"></card-grid>

        <ChatBox />
  </v-container>
</v-app>
</template>
<script>
import CardGrid from '../components/CardGrid.vue';
export default {
  components: { CardGrid },
 data() {
    return {
    model: null,
    search: null,
      grid: [
{text: 'Equity vs Debt Financing', link: 'https://www.investopedia.com/ask/answers/042215/what-are-benefits-company-using-equity-financing-vs-debt-financing.asp', tag: 'corporate finance', color: 'primary'},
{text: 'Days Sale Outstanding Definition', link: 'https://www.investopedia.com/terms/d/dso.asp', tag: 'financial ratios', color: 'secondary'},
{text: 'Understanding Financial Leverage & Capital Structure', link: 'https://www.investopedia.com/articles/investing/111813/optimal-use-financial-leverage-corporate-capital-structure.asp', tag: 'corporate finance', color: 'primary'},
{text: 'Shareholders Equity', link: 'https://www.investopedia.com/terms/s/shareholdersequity.asp', tag: 'financial accounting', color: 'red'},
{text: 'Basics of Free Cash Flow', link: 'https://www.investopedia.com/terms/f/freecashflow.asp', tag: 'corporate finance', color: 'primary'},
{text: 'Current Assets', link: 'https://www.investopedia.com/terms/c/currentassets.asp', tag: 'financial accounting', color: 'red'},
{text: 'What is the Cash Flow Statement?', link: 'https://www.investopedia.com/investing/what-is-a-cash-flow-statement/', tag: 'financial accounting', color: 'red'},
{text: 'Understanding the Balance Sheet', link: 'https://www.investopedia.com/terms/b/balancesheet.asp', tag: 'financial accounting', color: 'red'},
{text: 'Understanding the Income Statement', link: 'https://www.investopedia.com/terms/i/incomestatement.asp', tag: 'financial accounting', color: 'red'},
{text: 'Present Value and How it Relates to Finance', link: 'https://www.investopedia.com/terms/p/presentvalue.asp', tag: 'corporate finance', color: 'primary'},
{text: 'How Companies Calculate Revenue', link: 'https://www.investopedia.com/ask/answers/09/how-companies-calculate-revenue.asp', tag: 'financial accounting', color: 'red'},
{text: 'Free Cash Flow to Firm ', link: 'https://www.investopedia.com/terms/f/freecashflowfirm.asp', tag: 'corporate finance', color: 'primary'},
{text: 'How the 3 Financial Statements Are Related', link: 'https://www.investopedia.com/ask/answers/031815/how-are-three-major-financial-statements-related-each-other.asp', tag: 'corporate finance', color: 'primary'},
{text: 'Understanding Net Debt', link: 'https://www.investopedia.com/terms/n/netdebt.asp', tag: 'corporate finance', color: 'primary'},
{text: 'Most Important Items on the Balance Sheet', link: 'https://www.investopedia.com/ask/answers/050615/what-items-balance-sheet-are-most-important-fundamental-analysis.asp', tag: 'financial accounting', color: 'red'},
{text: "What's the Difference Between Goodwill and Other Intangible Assets?", link: 'https://www.investopedia.com/articles/investing/100614/goodwill-vs-other-intangible-assets-whats-difference.asp', tag: 'financial accounting', color: 'red'},
{text: "Reading the Balance Sheet", link: 'https://www.investopedia.com/articles/04/031004.asp', tag: 'financial accounting', color: 'red'},
{text: "What's the Difference Between Operating and Net Income", link: 'https://www.investopedia.com/ask/answers/102714/whats-difference-between-profit-margin-and-operating-margin.asp', tag: 'financial accounting', color: 'red'},
{text: "What's Considered a Healthy Profit Margin", link: 'https://www.investopedia.com/ask/answers/041415/what-considered-healthy-operating-profit-margin.asp', tag: 'corporate finance', color: 'primary'},
{text: 'Accounts Payable Turnover', link: 'https://www.investopedia.com/terms/a/accountspayableturnoverratio.asp', tag: 'financial ratios', color: 'secondary'},
{text: 'Cash Conversion Cycle', link: 'https://www.investopedia.com/terms/c/cashconversioncycle.asp', tag: 'financial ratios', color: 'secondary'},
{text: 'Cash Flow from Financing Activities', link: 'https://www.investopedia.com/terms/c/cashflowfromfinancing.asp', tag: 'financial accounting', color: 'red'},
{text: 'Understanding EBIT', link: 'https://www.investopedia.com/terms/e/ebit.asp', tag: 'corporate finance', color: 'primary'},
{text: 'Basics of Business Valuation', link: 'https://www.investopedia.com/terms/b/business-valuation.asp', tag: 'stock valuation', color: 'green'},
{text: 'The Difference Between Intrinsic Value and Market Value', link: 'https://www.investopedia.com/ask/answers/011215/what-difference-between-intrinsic-value-and-current-market-value.asp', tag: 'corporate finance', color: 'primary'},
{text: 'Major Steps in Due Diligence', link: 'https://www.investopedia.com/articles/stocks/08/due-diligence.asp', tag: 'stock valuation', color: 'green'},
{text: 'Qualitative Analysis in Investing', link: 'https://www.investopedia.com/terms/q/qualitativeanalysis.asp', tag: 'stock valuation', color: 'green'},
{text: 'Basics of Discounted Cash Flow Valuation', link: 'https://www.investopedia.com/terms/d/dcf.asp', tag: 'stock valuation', color: 'green'},
{text: 'Understanding Enterprise Value', link: 'https://www.investopedia.com/terms/e/enterprisevalue.asp', tag: 'stock valuation', color: 'green'},
{text: 'How to Analyze Corporate Profit Margins', link: 'https://www.investopedia.com/articles/fundamental/04/042804.asp', tag: 'corporate finance', color: 'primary'},
{text: 'Return on Equity', link: 'https://www.investopedia.com/terms/r/returnonequity.asp', tag: 'financial ratios', color: 'secondary'},
{text: 'How to Use Enterprise Value to Compare Companies', link: 'https://www.investopedia.com/articles/fundamental/04/031004.asp', tag: 'stock valuation', color: 'green'},
{text: 'Basics of Financial Ratios & What They Tell You', link: 'https://www.investopedia.com/financial-edge/0910/6-basic-financial-ratios-and-what-they-tell-you.aspx', tag: 'financial ratios', color: 'secondary'},
{text: 'Price to Book Ratio', link: 'https://www.investopedia.com/terms/p/price-to-bookratio.asp', tag: 'financial ratios', color: 'secondary'},
{text: 'Price to Earnings to Growth (PEG) Ratio', link: 'https://www.investopedia.com/terms/p/pegratio.asp', tag: 'financial ratios', color: 'secondary'},
{text: 'Bottom-Up Investing', link: 'https://www.investopedia.com/terms/b/bottomupinvesting.asp', tag: 'stock valuation', color: 'green'},
{text: 'Economics & Fiscal Policy', link: 'https://www.investopedia.com/fiscal-policy-4689796', tag: 'economics', color: 'indigo'},
{text: 'Top 10 US Economic Indicators', link: 'https://www.investopedia.com/articles/personal-finance/020215/top-ten-us-economic-indicators.asp', tag: 'economics', color: 'indigo'},
{text: 'Economics & GDP', link: 'https://www.investopedia.com/terms/g/gdp.asp', tag: 'economics', color: 'indigo'},
{text: 'Economics & Consumer Spending', link: 'https://www.investopedia.com/terms/c/consumer-spending.asp', tag: 'economics', color: 'indigo'},
{text: 'Economics & Retail Sales', link: 'https://www.investopedia.com/terms/r/retail-sales.asp', tag: 'economics', color: 'indigo'},
{text: 'Economics & the Job Market', link: 'https://www.investopedia.com/terms/j/job-market.asp', tag: 'economics', color: 'indigo'},
{text: 'What’s the Difference between Alpha & Beta', link: 'https://www.investopedia.com/ask/answers/102714/whats-difference-between-alpha-and-beta.asp', tag: 'stock valuation', color: 'green'},
{text: 'Basics of Cryptocurrency', link: 'https://www.investopedia.com/terms/c/cryptocurrency.asp', tag: 'cryptocurrency', color: 'deep-purple'},
{text: 'The Most Important Cryptos Other Than Bitcoin', link: 'https://www.investopedia.com/tech/most-important-cryptocurrencies-other-than-bitcoin/', tag: 'cryptocurrency', color: 'deep-purple'},
{text: 'Bitcoin vs Ethereum', link: 'https://www.investopedia.com/articles/investing/031416/bitcoin-vs-ethereum-driven-different-purposes.asp', tag: 'cryptocurrency', color: 'deep-purple'},
{text: 'Bitcoin Mining Explained', link: 'https://www.investopedia.com/terms/b/bitcoin-mining.asp', tag: 'cryptocurrency', color: 'deep-purple'},
{text: 'How is the Value of 1 Bitcoin Determined', link: 'https://www.investopedia.com/tech/what-determines-value-1-bitcoin/', tag: 'cryptocurrency', color: 'deep-purple'},
{text: 'How Bitcoin Works', link: 'https://www.investopedia.com/news/how-bitcoin-works/', tag: 'cryptocurrency', color: 'deep-purple'},
{text: 'Understanding the Bitcoin Wallet', link: 'https://www.investopedia.com/terms/b/blockchain-wallet.asp', tag: 'cryptocurrency', color: 'deep-purple'},
{text: 'More Than Half of the Top 100 Cryptocurrencies Have No Utility Report', link: 'https://www.investopedia.com/news/more-half-top-100-cryptos-have-no-utility-report/', tag: 'cryptocurrency', color: 'deep-purple'},
{text: 'Governance- Why Crypto Investors Should Care', link: 'https://www.investopedia.com/tech/governance-why-crypto-investors-should-care/', tag: 'cryptocurrency', color: 'deep-purple'},
{text: 'Basics of US Generally Accepted Accounting Principles (GAAP)', link: 'https://www.investopedia.com/terms/g/gaap.asp', tag: 'financial accounting', color: 'red'},
{text: 'What is Included in Comprehensive Income', link: 'https://www.investopedia.com/ask/answers/071415/what-are-some-examples-items-count-comprehensive-income.asp', tag: 'financial accounting', color: 'red'},

        ]
    };
  },
}
</script>

<style scoped>

.primary-text {
  color: #007bff;
}

.ed-title {
  text-align: center;
}


</style>