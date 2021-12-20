export { default as AnalystRecsBase } from '../..\\components\\AnalystRecsBase.js'
export { default as CardGrid } from '../..\\components\\CardGrid.vue'
export { default as ChartBarBase } from '../..\\components\\ChartBarBase.js'
export { default as ChartBubbleBase } from '../..\\components\\ChartBubbleBase.js'
export { default as ChartDoughnutBase } from '../..\\components\\ChartDoughnutBase.js'
export { default as ChartLineBase } from '../..\\components\\ChartLineBase.js'
export { default as EconChartBase } from '../..\\components\\EconChartBase.js'
export { default as InsideTransBase } from '../..\\components\\InsideTransBase.js'
export { default as MixedChartBase } from '../..\\components\\MixedChartBase.js'
export { default as NavBar } from '../..\\components\\NavBar.vue'
export { default as RedditChartBase } from '../..\\components\\RedditChartBase.js'
export { default as SentiChartBase } from '../..\\components\\SentiChartBase.js'
export { default as CryptoeconCryptoGraph } from '../..\\components\\cryptoecon\\CryptoGraph.vue'
export { default as CryptoeconCryptoTable } from '../..\\components\\cryptoecon\\CryptoTable.vue'
export { default as CryptoeconEconGraph } from '../..\\components\\cryptoecon\\EconGraph.vue'
export { default as LandingpageTheAbout } from '../..\\components\\landingpage\\TheAbout.vue'
export { default as LandingpageTheFeatures } from '../..\\components\\landingpage\\TheFeatures.vue'
export { default as LandingpageTheLanding } from '../..\\components\\landingpage\\TheLanding.vue'
export { default as LandingpageTheSpinner } from '../..\\components\\landingpage\\TheSpinner.vue'
export { default as NavigationBackToTopButton } from '../..\\components\\navigation\\BackToTopButton.vue'
export { default as NavigationFooter } from '../..\\components\\navigation\\Footer.vue'
export { default as NavigationTheNavbar } from '../..\\components\\navigation\\TheNavbar.vue'
export { default as StockMainEarnCal } from '../..\\components\\stock-main\\EarnCal.vue'
export { default as StockMainExample } from '../..\\components\\stock-main\\Example.vue'
export { default as StockMainIndexChart } from '../..\\components\\stock-main\\IndexChart.vue'
export { default as StockMainIpoCal } from '../..\\components\\stock-main\\IpoCal.vue'
export { default as StockMainNews } from '../..\\components\\stock-main\\News.vue'
export { default as StockSearch } from '../..\\components\\stock-main\\StockSearch.vue'
export { default as StockMainTrendingStocks } from '../..\\components\\stock-main\\TrendingStocks.vue'
export { default as StockPageAnalystRecs } from '../..\\components\\stock-page\\AnalystRecs.vue'
export { default as StockPageBasicInfo } from '../..\\components\\stock-page\\BasicInfo.vue'
export { default as StockPageCompsTable } from '../..\\components\\stock-page\\CompsTable.vue'
export { default as StockPageDiscountCashFlow } from '../..\\components\\stock-page\\DiscountCashFlow.vue'
export { default as StockPageEarningsSurprise } from '../..\\components\\stock-page\\EarningsSurprise.vue'
export { default as StockPageFinancials } from '../..\\components\\stock-page\\Financials.vue'
export { default as StockPageInsiderTransactions } from '../..\\components\\stock-page\\InsiderTransactions.vue'
export { default as StockPageMessageApp } from '../..\\components\\stock-page\\MessageApp.vue'
export { default as StockPageMetricsGraphAnnual } from '../..\\components\\stock-page\\MetricsGraphAnnual.vue'
export { default as StockPageMetricsGraphQuarter } from '../..\\components\\stock-page\\MetricsGraphQuarter.vue'
export { default as StockPageSearchBar } from '../..\\components\\stock-page\\SearchBar.vue'
export { default as StockPageSentimentAnalysis } from '../..\\components\\stock-page\\SentimentAnalysis.vue'
export { default as StockPageSimilarCompanies } from '../..\\components\\stock-page\\SimilarCompanies.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
