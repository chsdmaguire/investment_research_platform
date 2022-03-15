<template>
<v-container class="mt-4 mx-2" fluid>
        <v-row justify="center" align="center">
        <v-dialog v-model="dialog5" max-width="500">
        <template #activator="{ on: dialog}">
                <v-tooltip left>
                    <template #activator="{ on: tooltip}">
                    <v-btn text outlined v-on="{...dialog, ...tooltip}">
                    <v-icon dark>
                        mdi-atom
                    </v-icon> 
                    </v-btn>
                </template>
                <span>Candlestick Pattern Recognitiion</span>
            </v-tooltip>
        </template>
        <v-card tile class="mx-auto">
            <v-card-title class="justify-center">
                Candlestick Pattern Recognition
                </v-card-title>
                <v-card-text class="justify-center">
                    <v-tabs center-active vertical>
                        <v-tab>Bullish</v-tab>
                        <v-tab>Bearish</v-tab>
                        <v-tab>Reversal</v-tab>
                    <v-tab-item>
                        <v-list>
                        <v-list-item-group>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="doji">Bullish Engulfing Pattern</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="bullHaram">Bullish Harami</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="bullHaramCross">Bullish Harami Cross</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="bullMarubozu">Bullish Marubozu</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="pierceLine">Piercing Line</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="bullSpinTop">Bullish Spinning Top</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="mornDojStar">Morning Doji Star</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="mornStar">Morning Star</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="whiteSoldiers">3 White Soldiers</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="bullHammer">Bullish Hammer</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="bep">Bullish Inverted Hammer</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="bep">Tweezer Bottom</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                        </v-list>  
                    </v-tab-item>
                    <v-tab-item>
                        <v-list>
                        <v-list-item-group>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="bep">Bearish Engulfing Pattern</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="darkCloud">Dark Cloud Cover</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="downTasuki">Downside Tasuki Gap</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="bearHaramCross">Bearish Harami Cross</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="bearMarubozu">Bearish Marubozu</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="evDojStar">Evening Doji Star</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="evStar">Evening Star</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="bearSpinTop">Bearish Spinning Top</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="blackCrows">3 Black Crows</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="bearHammer">Bearish Hammer</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="hangMan">Hanging Man</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="shootStar">Shooting Star</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="tweezTop">Tweezer Top</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                        </v-list>  
                    </v-tab-item>
                    <v-tab-item>
                        <v-list>
                        <v-list-item-group>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="doji">Doji</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="dragoDoj">Dragonfly Doji</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="graveDoj">Gravestone Doji</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                        </v-list>  
                    </v-tab-item>
            </v-tabs>
                </v-card-text>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" max-width="500">
      <template v-slot:activator="{ on, attrs }">

        <v-btn text v-bind="attrs" outlined v-on="on">
        <v-icon dark>
            mdi-chart-waterfall
        </v-icon> Technicals
        </v-btn>
      </template>


      <v-card tile class="mx-auto">
        <v-card-title class="justify-center">
          Technical Indicators
        </v-card-title>
        <v-card-text class="justify-center">
            <v-tabs center-active vertical>
            <v-tab>SMAs</v-tab>
            <v-tab>EMAs</v-tab>
            <v-tab>Trend</v-tab>
            <v-tab>Momentum</v-tab>
            <v-tab>Volatility</v-tab>
            <v-tab>Volume</v-tab>
            <v-tab-item>
                <v-list>
                <v-list-item-group :value="SimpMaModel">
                    <v-list-item v-for="(i, idx) in SimpMovingAvgs" :key="idx">
                        <v-list-item-content>
                            <v-list-item-title @click="smas(idx)">{{ i.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
                </v-list>
            </v-tab-item>
            <v-tab-item>
                <v-list>
                <v-list-item-group :value="ExpMaModel">
                    <v-list-item v-for="(i, idx) in ExpMovingAvgs" :key="idx">
                        <v-list-item-content>
                            <v-list-item-title @click="emas(idx)">{{ i.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
                </v-list>
            </v-tab-item>
            <v-tab-item>
                <v-list>
                    <v-list-item-group>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="ichiKloud">Ichimoku Cloud</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item> 
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="parSar">Parabolic SAR</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item> 
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="showCci">Commodity Channel Index</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>                           
                    </v-list-item-group>
                </v-list>                            
            </v-tab-item>
            <v-tab-item>
                <v-list>
                    <v-list-item-group>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="showAdx">Directional Movement Index</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="showMacd">MACD</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="stochastic">Stochastic Oscillator</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="williams">Williams %R</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="mfi">Money Flow Index</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-tab-item>
            <v-tab-item>
                <v-list>
                    <v-list-item-group>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="atr">Average True Range</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="bb">Bollinger Bands</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="bbWidth">Bollinger Bands Width</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="keltner">Keltner Channel</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="keltnerWidth">Keltner Channel Width</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="stdDev">Standard Deviation</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-tab-item>
            <v-tab-item>
                <v-list>
                    <v-list-item-group>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="adl">Acumulation/Distribution</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="chaikin">Chaikin Money Flow</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="obv">On-Balance Volume</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="vwap">Volume Weighted Average Price</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-tab-item>
            </v-tabs>
        </v-card-text>       
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" max-width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" outlined v-on="on">
                <v-icon dark>
                    mdi-finance
                </v-icon>
                Financials</v-btn>
        </template>

        <v-card tile class="mx-auto">
            <v-card-title class="justify-center">
            Financial Metrics
            </v-card-title>
            <v-card-text class="justify-center">
                <v-tabs center-active vertical show-arrows>
                    <v-tab>Profitability</v-tab>
                    <v-tab>Efficiency</v-tab>
                    <v-tab>Leverage</v-tab>
                    <v-tab>Liquidity</v-tab>
                    <v-tab>Valuation</v-tab>
                    <v-tab-item>
                        <v-list>
                        <v-list-item-group>
                            <v-list-item>       
                                <v-list-item-content>
                                    <v-list-item-title @click="showGrossMargin">Gross Margin</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="showOM">Operating Margin</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="ebitdaMargin">EBITDA Margin</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item> 
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="niMargin">Net Income Margin</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item> 
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="roa">Return on Assets</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item> 
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="roe">Return on Equity</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>                                                     
                        </v-list-item-group>
                        </v-list>   
                    </v-tab-item>
                    <v-tab-item>
                        <v-list>
                            <v-list-item-group :value="efficiencyModel">
                                <v-list-item v-for="(i, idx) in efficiencyArr" :key="idx">
                                    <v-list-item-content>
                                        <v-list-item-title @click="turnover(idx)">{{ i.name }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-tab-item>
                    <v-tab-item>
                         <v-list>
                            <v-list-item-group :value="leverageModel">
                                <v-list-item v-for="(i, idx) in leverageArr" :key="idx">
                                    <v-list-item-content>
                                        <v-list-item-title @click="leverage(idx)">{{ i.name }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-tab-item>
                    <v-tab-item>
                        <v-list>
                            <v-list-item-group>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title @click="cash">Cash Ratio</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title @click="acidTest">Acid-Test Ratio</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title @click="current">Current Ratio</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title @click="ocf">Operating Cash Flow Ratio</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-tab-item>
                    <v-tab-item>
                        <v-list>
                            <v-list-item-group>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title @click="bvShare">Book Value per Share</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title @click="evEbit">EV to EBIT</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title @click="priceSales">Price to Sales</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>                                 
            </v-card>
        </v-dialog>
    <v-dialog v-model="dialog3" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" outlined v-on="on">
                <v-icon dark>
                    mdi-blur-linear
                </v-icon>
                Alt. Data</v-btn>
        </template>

        <v-card tile>
            <v-card-title class="justify-center">
            Alternative Data
            </v-card-title>
                    <v-list>
                        <v-list-item-group>
                            <v-list-item>       
                                <v-list-item-content>
                                    <v-list-item-title @click="getInsiders">Insider Transactions</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="getAnalystRecs">Analyst Recommendations</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="getEPS">EPS Estimates</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="showPatents">Patent Filings</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="TwitterMentions">Twitter Mentions</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>  
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="TwitterScore">Twitter Sentiment</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="redditMentions">Reddit Mentions</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>  
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="redditScore">Reddit Sentiment</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>                                  
                        </v-list-item-group>
                    </v-list>                    
            </v-card>
        </v-dialog>
    <v-dialog v-model="dialog4" width="700">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" outlined v-on="on">
                <v-icon dark>
                    mdi-rocket-launch
                </v-icon>
                Compare</v-btn>
        </template>

        <v-card tile>
            <v-card-title class="justify-center">
            Make Comparisons
            </v-card-title>
            <v-tabs center-active vertical>
                <v-tab>Indices</v-tab>
                <v-tab>Bond Yields</v-tab>
                <v-tab>Economic Data</v-tab>
            
                <v-tab-item>
                   <v-list>
                        <v-list-item-group :value="compModel">
                            <v-list-item v-for="(i, idx) in indices" :key="idx">       
                                <v-list-item-content>
                                    <v-list-item-title @click="showSp(idx)">{{ i.name }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>                      
                        </v-list-item-group>  
                    </v-list>                    
                </v-tab-item>
                <v-tab-item>
                   <v-list>
                        <v-list-item-group :value="yieldModel">
                            <v-list-item v-for="(i, idx) in yields" :key="idx">       
                                <v-list-item-content>
                                    <v-list-item-title @click="showYieldData(idx)">{{ i.name }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>                      
                        </v-list-item-group>  
                    </v-list>                    
                </v-tab-item>
                <v-tab-item>
                   <v-list>
                        <v-list-item-group :value="econModel">
                            <v-list-item v-for="(i, idx) in econMetrics" :key="idx">       
                                <v-list-item-content>
                                    <v-list-item-title @click="showEconData(idx)">{{ i.name }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>                      
                        </v-list-item-group>  
                    </v-list>                    
                </v-tab-item>
              </v-tabs>      
            </v-card>
        </v-dialog>

            <v-btn-toggle mandatory group dense>
                    <v-btn plain>5D</v-btn>
                    <v-btn plain>1M</v-btn>
                    <v-btn plain>3M</v-btn>
                    <v-btn plain>6M</v-btn>
                    <v-btn plain>1Y</v-btn>
                    <v-btn plain>3Y</v-btn>
                    <v-btn plain>5Y</v-btn>
                  </v-btn-toggle>
        </v-row>
        
    <v-row justify="center" align="center">

            <trading-vue 
            :title-txt="ticker"
            :data="chart"
            :overlays="overlays"
            color-back="#121212"
            :width="this.width" :height="this.height"
            ref="tv"
            :legend-buttons="['remove', 'settings']"
            :ext="extensions"
            :resetkey="resetkey"
            v-on:legend-button-click="on_button_click"
            :toolbar="false"
             :x-settings="xsett">
          </trading-vue>                          
    </v-row>       
</v-container> 

</template>

<script>
import TradingVue from 'trading-vue-js';
import { DataCube } from 'trading-vue-js';
import TestOverlay from './TestOverlay.vue';
import Overlays from 'tvjs-overlays'
import technicals from './Technicals.js';
import financials from './Financials.js';
import CandlePatterns from './CandlePatterns.js';
import BubbleOverlay from './BubbleOverlay';
import DMIOverlay from './DMIOverlay';
import InsidersOverlay from './InsidersOverlay';
import PatentsOverlay from './PatentsOverlay';
import RecsOverlay from './RecsOverlay';
import MACDOverlay from './MACDOverlay';
import StochOverlay from './StochOverlay';
import PatternsLabel from './PatternsLabel';
import SocialMentions from './SocialMentions';
import SocialScore from './SocialScore';
import xp from 'tvjs-xp';

const technicalCalcs = require('technicalindicators');

export default {
    components: { TradingVue },
    data() {
        return {
            chart: {},
            width: window.innerWidth -100,
            height: window.innerHeight -100,
            dialog1: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            dialog5: false,
            ticker: '',
            candles: {
                ohlcv: [],
                onchart: [],
                offchart: [],
            },
            extensions: Object.values(xp),
             ext_names: Object.keys(xp),
             resetkey: 0,
             xsett: {
                'grid-resize': { min_height: 30 }
            },
            twitPosMentions: [],
            insideTransactions: [],

            overlays: [TestOverlay, SocialScore, InsidersOverlay, SocialMentions, 
            RecsOverlay, BubbleOverlay, PatentsOverlay, Overlays['MOM'], 
            Overlays['Histogram'], DMIOverlay, Overlays['CCI'], Overlays['Area51'], 
            Overlays['Ichimoku'], Overlays['PlotCross'], MACDOverlay, Overlays['WilliamsR'], 
            StochOverlay, Overlays['MFI'], Overlays['ATR'], Overlays['BB'],  Overlays['VWMA'],
            PatternsLabel
            ],
            candleStickData: [],
            epsData: [],
            patentData: [],
            analystRecs: [],
            indices: [
                {name: 'S&P 500', id: 'SP500', color: '#2fd68f'},
                {name: 'NASDAQ', id: 'NASDAQCOM', color: '#f87991'},
                {name: 'Dow Jones', id: 'DJIA', color: '#53e06f'},
                {name: 'Wilshire 5000', id: 'WILL5000INDFC', color: '#5285F4'},
                {name: 'Vix', id: 'VIXCLS', color: '#00A1F1'},
                {name: 'Large Caps', id: 'WILLLRGCAP', color: '#34A853'},
                {name: 'Mid Caps', id: 'WILLMIDCAPPR', color: '#7CBB00'},
                {name: 'Small Caps', id: 'WILLSMLCAP', color: '#FBBC05'},
                {name: 'Large Cap Growth Stocks', id: 'WILLLRGCAPGR', color: '#EA4335'},
                {name: 'Mid Cap Growth Stocks', id: 'WILLMIDCAPGR', color: '#F65314'},
                {name: 'Small Cap Growth Stocks', id: 'WILLSMLCAPGR', color: '#9d42ed'},
                {name: 'Large Cap Value Stocks', id: 'WILLLRGCAPVAL', color: '#f3f573'},
                {name: 'Mid Cap Value Stocks', id: 'WILLMIDCAPVALPR', color: '#ff192d'},
                {name: 'Small Cap Value Stocks', id: 'WILLSMLCAPVALPR', color: '#7c81d6'},
            ],
            yields: [
                 {name: '3-Month Treasury Yield', value: 'DGS3MO', color: '#2fd68f'},
                 {name: '2-Year Treasury Yield', value: 'DGS2', color: '#f87991'},
                 {name: '5-Year Treasury Yield', value: 'DGS5', color: '#53e06f'},
                 {name: '5-Year Inflation-Indexed Treasury Yield', value: 'DFII5', color: '#5285F4'},
                 {name: '10-YearTreasury Yield', value: 'DGS10', color: '#00A1F1'},
                 {name: '10-Year Inflation-Indexed Treasury Yield', value: 'DFII10', color: '#34A853'},
                 {name: '30-Year Treasury Yield', value: 'DGS30', color: '#7CBB00'},
                 {name: 'AAA Corporate Index Yield', value: 'AAA', color: '#FBBC05'},
                {name: 'AA Corporate Index Yield', value: 'BAMLC0A2CAAEY', color: '#EA4335'},
                {name: 'A Corporate Index Yield', value: 'BAMLC0A3CAEY', color: '#F65314'},
                 {name: 'BBB Corporate Index Yield', value: 'BAMLC0A4CBBBEY', color: '#9d42ed'},
                {name: 'BB Corporate Index Yield', value: 'BAMLH0A1HYBBEY', color: '#f3f573'},
                {name: 'B Corporate Index Yield', value: 'BAMLH0A2HYBEY', color: '#ff192d'},               
                {name: 'CCC & Lower Corporate Index Yield', value: 'BAMLH0A3HYCEY', color: '#7c81d6'},
            ],
            econMetrics: [
                 {name: 'Advance Retail Sales: Electronics and Appliance Stores', value: 'RSEAS', color: '#2fd68f'},
                 {name: 'Advance Retail Sales: Retail Trade and Food Services', value: 'RSAFS', color: '#f87991'},
                 {name: 'Business Expectations: Employment Growth', value: 'ATLSBUEGEP', color: '#53e06f'},
                 {name: 'Business Expectations: Sales Revenue Growth', value: 'ATLSBUSRGEP', value: 'DFII5', color: '#5285F4'},
                 {name: 'Business Uncertainty: Sales Revenue Growth', value: 'ATLSBUSRGUP', color: '#00A1F1'},
                 {name: 'Capacity Utilization: Manufacturing (SIC)', value: 'CUMFNS', color: '#34A853'},
                 {name: 'Capacity Utilization: Mining, Quarrying, and Oil and Gas Extraction: Mining (NAICS = 21)', value: 'CAPUTLG21S', color: '#7CBB00'},
                 {name: 'Capacity Utilization: Total Index', value: 'TCU', color: '#FBBC05'},
                 {name: 'Cass Freight Index: Shipments', value: 'FRGSHPUSM649NCIS', color: '#EA4335'},
                 {name: 'CPI for All Urban Consumers: All Items Less Food and Energy in U.S. City Average', value: 'CPILFESL', color: '#F65314'},
                 {name: 'CPI for All Urban Consumers: All Items in U.S. City Average', value: 'CPIAUCSL', color: '#9d42ed'},
                 {name: 'Employment-Population Ratio', value: 'EMRATIO', color: '#f3f573'},
                  {name: 'E-Commerce Retail Sales', value: 'ECOMSA', color: '#ff192d'},
                  {name: 'E-Commerce Retail Sales as a Percent of Total Sales', value: 'ECOMPCTSA', color: '#7c81d6'},
                 {name: 'Industrial Production: Construction Supplies', value: 'IPB54100S', value: 'RSEAS', color: '#2fd68f'},
                 {name: 'Industrial Production: Consumer Goods', value: 'IPCONGD', color: '#f87991'},
                 {name: 'Industrial Production: Equipment: Business Equipment', value: 'IPBUSEQ', color: '#53e06f'},
                 {name: 'Industrial Production: Manufacturing (SIC)', value: 'IPMANSICS', color: '#5285F4'},
                 {name: 'Industrial Production: Total Index', value: 'INDPRO', color: '#00A1F1'},
                 {name: 'Labor Force Participation Rate', value: 'CIVPART', color: '#34A853'},
                 {name: 'Load Factor for U.S. Air Carrier Domestic and International, Scheduled Passenger Flights', value: 'LOADFACTOR', color: '#7CBB00'},                             
                  {name: 'Manufacturers New Orders: Durable Goods', value: 'DGORDER', color: '#FBBC05'},
                   {name: 'New One Family Houses Sold: United States', value: 'HSN1F', color: '#EA4335'},
                {name: 'Personal Consumption Expenditures', value: 'PCE', color: '#F65314'},
                {name: 'Real-time Sahm Rule Recession Indicator', value: 'SAHMREALTIME', color: '#f3f573'},
                 {name: 'Real Gross Domestic Product', value: 'A191RL1Q225SBEA', color: '#ff192d'},
                 {name: 'S&P/Case-Shiller 20-City Composite Home Price Index', value: 'SPCS20RSA', color: '#7c81d6'},
                 {name: 'Total Vehicle Sales', value: 'TOTALNSA', color: '#2fd68f'},
                 {name: 'Trade Balance: Goods and Services, Balance of Payments Basis', value: 'BOPGSTB', value: 'RSEAS', color: '#2fd68f'},
                 {name: 'University of Michigan: Consumer Sentiment', value: 'UMCSENT', color: '#f87991'},
                
            ],
            efficiencyArr: [
                {name: 'Asset Turnover', top: 'totalRevenue', bottom: 'totalAssets', color: '#f57e76'},
                {name: 'Inventory Turnover', top: 'totalRevenue', bottom: 'inventory', color: '#6ac75a'},
                {name: 'Receivables Turnover', top: 'totalRevenue', bottom: 'currentNetReceivables', color: '#6ac75a'},
                {name: 'Payables Turnover', top: 'costofGoodsAndServicesSold', bottom: 'currentAccountsPayable', color: '#6ac75a'},
            ],
            leverageArr: [
                {name: 'Leverage Ratio', top: 'totalLiabilities', bottom: 'totalAssets', color: '#f57e76'},
                {name: 'Debt to Equity', top: 'totalLiabilities', bottom: 'totalShareholderEquity', color: '#6ac75a'},
                {name: 'Interest Coverage', top: 'operatingIncome', bottom: 'currentNetReceivables', color: '#6ac75a'},
                {name: 'Debt Service Coverage', top: 'operatingIncome', bottom: 'shortLongTermDebtTotal', color: '#6ac75a'},
            ],
            SimpMovingAvgs: [
                {name: '5-day Simple Moving Average', window: 5, color: '#44b6eb'},
            ],
            ExpMovingAvgs: [
                {name: '5-day Exponential Moving Average', window: 5, color: '#44b6eb'},
            ],
            efficiencyModel: '',
            leverageModel: '',
            compModel: '',
            yieldModel: '',
            econModel: '',
            SimpMaModel: '',
            ExpMaModel: '',
            
        }
    },
    computed: {
        barWidth () {
            return window.innerWidth
        },
        listSelection() {
        return this.value
        },
    },

    methods: {
        dragoDoj() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.dragoDoj(prices);
            this.candles.onchart.push({
                     name: 'Dragonfly Doji',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        graveDoj() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.graveDoj(prices);
            this.candles.onchart.push({
                     name: 'Gravestone Doji',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        bullHaram() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.bullHaram(prices);
            this.candles.onchart.push({
                     name: 'Bullish Harami',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        bullHaramCross() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.bullHaramCross(prices);
            this.candles.onchart.push({
                     name: 'Bullish Harami Cross',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        bearHaramCross() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.bearHaramCross(prices);
            this.candles.onchart.push({
                     name: 'Bearish Harami Cross',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        bullMarubozu() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.bullMarubozu(prices);
            this.candles.onchart.push({
                     name: 'Bullish Marubozu',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        bearMarubozu() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.bearMarubozu(prices);
            this.candles.onchart.push({
                     name: 'Bearish Marubozu',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        evDojStar() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.evDojStar(prices);
            this.candles.onchart.push({
                     name: 'Evening Doji Star',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        evStar() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.evStar(prices);
            this.candles.onchart.push({
                     name: 'Evening Star',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        pierceLine() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.pierceLine(prices);
            this.candles.onchart.push({
                     name: 'Pierce Line',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        bullSpinTop() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.bullSpinTop(prices);
            this.candles.onchart.push({
                     name: 'Bullish Spinning Top',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        bearSpinTop() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.bearSpinTop(prices);
            this.candles.onchart.push({
                     name: 'Bearish Spinning Top',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        mornDojStar() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.mornDojStar(prices);
            this.candles.onchart.push({
                     name: 'Morning Doji Star',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        mornStar() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.mornStar(prices);
            this.candles.onchart.push({
                     name: 'Morning Star',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        blackCrows() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.blackCrows(prices);
            this.candles.onchart.push({
                     name: '3 Black Crows',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        whiteSoldiers() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.whiteSoldiers(prices);
            this.candles.onchart.push({
                     name: '3 White Soldiers',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        tweezTop() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.tweezTop(prices);
            this.candles.onchart.push({
                     name: 'Tweezer Top',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        bullHammer() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.bullHammer(prices);
            this.candles.onchart.push({
                     name: 'Bullish Hammer',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        bearHammer() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.bearHammer(prices);
            this.candles.onchart.push({
                     name: 'Bearish Hammer',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        hangMan() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.hangMan(prices);
            this.candles.onchart.push({
                     name: 'Hanging Man',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        shootStar() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.shootStar(prices);
            this.candles.onchart.push({
                     name: 'Shooting Star',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },

        downTasuki() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.downTasuki(prices);
            this.candles.onchart.push({
                     name: 'Downside Tasuki Gap',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        darkCloud() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.darkCloud(prices);
            this.candles.onchart.push({
                     name: 'Dark Cloud',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        bep() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.bearEngulf(prices);
            this.candles.onchart.push({
                     name: 'Bearish Engulfing Pattern',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;
        },
        doji() {
            const prices = this.candles.chart.data;
            const data = CandlePatterns.doji(prices);
            this.candles.onchart.push({
                     name: 'Doji Recognition',
                     type: 'PatternsLabel',
                     data: data,
                 });
                 this.chart = new DataCube(this.candles)
            this.dialog5 = false;

        },
        reset(state) {
            let sub = Object.keys(state).filter(x => state[x])
            this.extensions = sub.map(x => xp[x])
            this.resetkey++
        },

        showEconData(idx) {
             const id = this.econMetrics[idx].value;
             const color = this.econMetrics[idx].color;
             const econData = [];
             this.$axios.get(`/econ/graph/metric/${id}`).then(res => {
                 const arr = res.data.sort((a, b) => (a.date > b.date) ?  1: -1);
                 arr.forEach(item => {
                     const date = new Date(item.date).getTime();
                     econData.push([date, item.value])
                 });
             });
             this.candles.offchart.push({
                name: this.econMetrics[idx].name,
                type: 'Histogram',
                data: econData,
                settings: {
                    color: color,
                    lineWidth: 100,
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog4= false;
        },
        showYieldData(idx) {
             const id = this.yields[idx].value;
             const color = this.yields[idx].color;
             const yieldData = [];
             this.$axios.get(`/econ/graph/metric/${id}`).then(res => {
                 const arr = res.data.sort((a, b) => (a.date > b.date) ?  1: -1);
                 arr.forEach(item => {
                     const date = new Date(item.date).getTime();
                     yieldData.push([date, Number(item.value)]);
                 });
             });
             this.candles.offchart.push({
                name: this.yields[idx].name,
                type: 'Area51',
                data: yieldData,
                settings: {
                    color: color
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog4= false;
        },
        showSp(idx) {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 1200);
            const start = startDate.toISOString();

            const id = this.indices[idx].id;
            const color = this.indices[idx].color;
            const sp500 = []
            this.$axios.get(`/fred/db/index/${id}/${start}`).then(res => {
                const arr = res.data.sort((a, b) => (a.time > b.time) ?  1: -1);
                arr.forEach(item => {
                    const date = new Date(item.time).getTime();
                    sp500.push([date, item.value])
                });
            });
            this.candles.offchart.push({
                name: this.indices[idx].name,
                type: 'Area51',
                data: sp500,
                settings: {
                    color: color
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog4= false;
        },
        showGrossMargin() {
            const ticker = 'AAPL';
            const fsli = 'grossProfit';
            this.$axios.get(`/charting/financials/margin/${ticker}/${fsli}`).then(res => {
            const data = financials.calcMargin(res.data);    
                 this.candles.offchart.push({
                     name: 'Gross Margin',
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color: '#4287f5'
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        showOM() {
            const ticker = 'AAPL';
            const fsli = 'operatingIncome';
            this.$axios.get(`/charting/financials/margin/${ticker}/${fsli}`).then(res => {
            const data = financials.calcMargin(res.data);    
                 this.candles.offchart.push({
                     name: 'Operating Margin',
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color: '#f57e76'
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        ebitdaMargin() {
            const ticker = 'AAPL';
            const fsli = 'ebitda';
            this.$axios.get(`/charting/financials/margin/${ticker}/${fsli}`).then(res => {
            const data = financials.calcMargin(res.data);    
                 this.candles.offchart.push({
                     name: 'EBITDA Margin',
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color: '#a3d19b'
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        niMargin() {
            const ticker = 'AAPL';
            const fsli = 'netIncome';
            this.$axios.get(`/charting/financials/margin/${ticker}/${fsli}`).then(res => {
            const data = financials.calcMargin(res.data);    
                 this.candles.offchart.push({
                     name: 'Net Income Margin',
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color: '#f57e76'
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        assetTurn() {
            const ticker = 'AAPL';
            const top = 'totalRevenue';
            const bottom = 'totalAssets';
            this.$axios.get(`/charting/financials/asset/${ticker}/${top}/${bottom}`).then(res => {
                const data = financials.calc1(res.data);
                this.candles.offchart.push({
                     name: 'Asset Turnover',
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color: '#f57e76'
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        turnover(idx) {
            const ticker = 'AAPL';
            const top = this.efficiencyArr[idx].top;
            const bottom = this.efficiencyArr[idx].bottom;
            const color = this.efficiencyArr[idx].color;
            const name = this.efficiencyArr[idx].name;
            this.$axios.get(`/charting/financials/asset/${ticker}/${top}/${bottom}`).then(res => {
                const data = financials.calc1(res.data);
                this.candles.offchart.push({
                     name: name,
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color: color
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        leverage(idx) {
            const ticker = 'AAPL';
            const top = this.leverageArr[idx].top;
            const bottom = this.leverageArr[idx].bottom;
            const color = this.leverageArr[idx].color;
            const name = this.leverageArr[idx].name;
            this.$axios.get(`/charting/financials/asset/${ticker}/${top}/${bottom}`).then(res => {
                const data = financials.calc1(res.data);
                this.candles.offchart.push({
                     name: name,
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color: color
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        current() {
            const ticker = 'AAPL';
            const top = 'totalCurrentAssets'
            const bottom = 'totalCurrentLiabilities';
            this.$axios.get(`/charting/financials/asset/${ticker}/${top}/${bottom}`).then(res => {
                const data = financials.calc1(res.data);
                this.candles.offchart.push({
                     name: 'Current Ratio',
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color:  '#f57e76'
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        ocf() {
            const ticker = 'AAPL';
            const top = 'operatingCashflow'
            const bottom = 'totalCurrentLiabilities';
            this.$axios.get(`/charting/financials/asset/${ticker}/${top}/${bottom}`).then(res => {
                const data = financials.calc1(res.data);
                this.candles.offchart.push({
                     name: 'OCF Ratio',
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color:  '#f57e76'
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        cash() {
            const ticker = 'AAPL';
            const top = 'cashAndShortTermInvestments'
            const bottom = 'totalCurrentLiabilities';
            this.$axios.get(`/charting/financials/asset/${ticker}/${top}/${bottom}`).then(res => {
                const data = financials.calc1(res.data);
                this.candles.offchart.push({
                     name: 'Cash Ratio',
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color:  '#f57e76'
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        roa() {
            const ticker = 'AAPL';
            const top = 'netIncome'
            const bottom = 'totalAssets';
            this.$axios.get(`/charting/financials/asset/${ticker}/${top}/${bottom}`).then(res => {
                const data = financials.calc1(res.data);
                this.candles.offchart.push({
                     name: 'ROA',
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color:  '#f57e76'
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        roe() {
            const ticker = 'AAPL';
            const top = 'netIncome'
            const bottom = 'totalShareholderEquity';
            this.$axios.get(`/charting/financials/asset/${ticker}/${top}/${bottom}`).then(res => {
                const data = financials.calc1(res.data);
                this.candles.offchart.push({
                     name: 'ROE',
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color:  '#f57e76'
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        acidTest() {
            const ticker = 'AAPL';
            const topFirst = 'totalCurrentAssets';
            const topSecond = 'inventory'
            const bottom = 'totalCurrentLiabilities';
            this.$axios.get(`/charting/financials/three/${ticker}/${topFirst}/${bottom}/${topSecond}`).then(res => {
                const data = financials.calc2(res.data);
                this.candles.offchart.push({
                     name: 'Acid-Test Ratio',
                     type: 'Histogram',
                     data: data,
                     settings: {
                         lineWidth: 100,
                         color:  '#f57e76'
                     }
                 });
                 this.chart = new DataCube(this.candles)
            });
            this.dialog2 = false;
        },
        getAnalystRecs() {
            const ticker = 'AAPL';
            this.$axios.get(`/analyst/recs/${ticker}`).then(res => {
                 const arr = res.data.sort((a, b) => (a.period > b.period) ? 1: -1);
                 arr.forEach(i => {
                     const date = new Date(i.period).getTime();
                     const total = (i.strong_buy + i.buy + i.hold + i.sell + i.strong_sell)
                     this.analystRecs.push([date, i.strong_buy, i.buy, i.hold, i.sell, i.strong_sell, total])
                 });
            });
            this.dialog3 = false;
            this.candles.offchart.push({
                    name: 'Analyst Recs',
                    type: "RecsOverlay",
                    data: this.analystRecs,
                });
                this.chart = new DataCube(this.candles)
        },
        bvShare() {
            const ticker = 'AAPL';
            const arr = [];
            this.$axios.get(`/stocks/charting/bvshare/${ticker}`).then(res => {
                res.data.forEach(item => {
                    const date = new Date(item.date).getTime();
                    arr.push([date, item.bv_per_share])
                });
                this.candles.offchart.push({
                     name: 'Book Value Per Share',
                     type: 'Histogram',
                     data: arr,
                     settings: {
                         lineWidth: 100,
                         color:  '#f57e76'
                     }
                 });
                 this.chart = new DataCube(this.candles)  
            });
            this.dialog2 = false;
        },
        evEbit() {
            const ticker = 'AAPL';
            const fsli = 'ebit';
            const arr = [];
            this.$axios.get(`/stocks/charting/marketmetrics/${ticker}/${fsli}`).then(res => {
                res.data.forEach(item => {
                    const date = new Date(item.date).getTime();
                    arr.push([date, item.value])
                });
                this.candles.offchart.push({
                     name: 'EV to EBIT',
                     type: 'Histogram',
                     data: arr,
                     settings: {
                         lineWidth: 100,
                         color:  '#f57e76'
                     }
                 });
                 this.chart = new DataCube(this.candles)  
            });
            this.dialog2 = false;
        },
        priceSales() {
            const ticker = 'AAPL';
            const fsli = 'netIncome';
            const arr = [];
            this.$axios.get(`/stocks/charting/marketmetrics2/${ticker}/${fsli}`).then(res => {
                res.data.forEach(item => {
                    const date = new Date(item.date).getTime();
                    arr.push([date, item.value])
                });
                this.candles.offchart.push({
                     name: 'P/E',
                     type: 'Histogram',
                     data: arr,
                     settings: {
                         lineWidth: 100,
                         color:  '#f57e76'
                     }
                 });
                 this.chart = new DataCube(this.candles)  
            });
            this.dialog2 = false;
        },
        changeScale() {
            const startDate = new Date()
            startDate.setDate(startDate.getDate() - 7);
            const endDate = new Date().getTime();
            this.$refs.tv.setRange(startDate.getTime(), endDate)
            console.log(startDate.getTime(), endDate)
        },
        showPatents() {
            const ticker = 'AAPL';
             this.$axios.get(`/stocks/patents/${ticker}`).then(res => {
                
                const arr = res.data.sort((a, b) => (a.publication_date > b.publication_date) ? 1: -1);
                var incrementer = 0;
                arr.forEach(item => {
                    const date = new Date(item.publication_date).getTime();
                      this.patentData.push([date, item.description, 0, null, incrementer])
                      incrementer += 0.1;
                      console.log(incrementer)
                    if(incrementer >= 1) {
                      incrementer = 0
                    }             
                })
             });
            this.candles.onchart.push({
        "name": "Data sections",
        "type": "Splitters",
        "data": this.patentData,
        "settings": {
            "legend": false
        }
    });
             this.chart = new DataCube(this.candles);
        },
        getEPS() {
            const ticker = 'AAPL';
            this.$axios.get(`/earnings/surpises/${ticker}`).then(res => {
                const arr = res.data.sort((a, b) => (a.period > b.period) ? 1: -1)
                arr.forEach(item => {
                    const date = new Date(item.period).getTime();
                    this.epsData.push([date, Number(item.actual), Number(item.estimate)]);
                    // this.epsData.push([date, Number(item.estimate)]);
                });
                console.log(this.epsData)
                 this.candles.offchart.push({
                    name: 'EPS Data',
                    type: "BubbleOverlay",
                    data: this.epsData,
                });
                this.chart = new DataCube(this.candles)                
                });
                this.dialog3 = false;
        },
        smas(idx) {
            const prices = this.candles.chart.data;
            const window = this.SimpMovingAvgs[idx].window;
            const color = this.SimpMovingAvgs[idx].color;
            const name = this.SimpMovingAvgs[idx].name;
            const smas = technicals.simpleMovingAverage(prices, window);
            this.candles.onchart.push({
                name: name,
                type: 'SMA',
                data: smas,
                settings: {
                    color: color
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;

        },
        emas(idx){
            const prices = this.candles.chart.data;
            const window = this.ExpMovingAvgs[idx].window;
            const color = this.ExpMovingAvgs[idx].color;
            const name = this.ExpMovingAvgs[idx].name;
            const emas = technicals.exponentialMovingAverage(prices, window);
            this.candles.onchart.push({
                name: name,
                type: 'SMA',
                data: emas,
                settings: {
                    color: color
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        ichiKloud() {
            const prices = this.candles.chart.data;
            const data = technicals.ichiMokuCloud(prices)
            this.candles.onchart.push({
                name: 'Ichimoku Cloud',
                type: 'Ichimoku',
                data: data,
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        parSar(){
            const prices = this.candles.chart.data;
            const data = technicals.parabolicSar(prices);
            this.candles.onchart.push({
                name: 'Parabolic SAR',
                type: 'PlotCross',
                data: data
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        showAdx() {
            const prices = this.candles.chart.data;
            const data = technicals.averageDirectIndex(prices);
            this.candles.offchart.push({
                name: 'Directional Movement Index',
                type: 'DMIOverlay',
                data: data
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        on_button_click(event) {
            if(event.button == 'remove') {
                if(event.type == 'offchart') {
                    const arrNumber = event.dataIndex;
                    this.candles.offchart.splice(arrNumber, 1);
                    this.chart = new DataCube(this.candles)
                } else if(event.type == 'onchart') {
                    const arrNumber = event.dataIndex;
                    this.candles.onchart.splice(arrNumber, 1);
                    this.chart = new DataCube(this.candles)
                }
            } else if(event.button == 'display') {
                console.log('display', event)
            }
        },
        showCci() {
            const prices = this.candles.chart.data;
            const data = technicals.commChannelIndex(prices);
            this.candles.offchart.push({
                name: 'Commodity Channel Index',
                type: 'CCI',
                data: data,
                settings: {
                    upper: 100,
                    lower: -100,
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        showMacd() {
             const prices = this.candles.chart.data;
             const data = technicals.macdIndicator(prices);
            this.candles.offchart.push({
                name: 'MACD',
                type: 'MACDOverlay',
                data: data,
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        stochastic() {
            const prices = this.candles.chart.data;
            const data = technicals.stochOsc(prices);
            this.candles.offchart.push({
                name: 'Stochastic Oscillator',
                type: 'StochOverlay',
                data: data,
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        williams(){
            const prices = this.candles.chart.data;
            const data = technicals.williamR(prices);
            this.candles.offchart.push({
                name: 'Williams %R',
                type: 'WilliamsR',
                data: data,
                settings: {
                    upper: -20,
                    lower: -80
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        mfi(){
            const prices = this.candles.chart.data;
            const data = technicals.mfi(prices);
            this.candles.offchart.push({
                name: 'Money Flow Index',
                type: 'MFI',
                data: data,
                settings: {
                    upper: 80,
                    lower: 20,
                    color: '#c4f22e'

                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        atr(){
            const prices = this.candles.chart.data;
            const data = technicals.atr(prices);
            this.candles.offchart.push({
                name: 'Average True Range',
                type: 'ATR',
                data: data,
                settings: {
                    upper: 80,
                    lower: 20,
                    color: '#be5ee0'

                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        bb(){
            const prices = this.candles.chart.data;
            const data = technicals.bb(prices);
            this.candles.onchart.push({
                name: 'Bollinger Bands',
                type: 'BB',
                data: data,
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        bbWidth(){
            const prices = this.candles.chart.data;
            const data = technicals.bbWidth(prices);
            this.candles.offchart.push({
                name: 'Bollinger Bands Width',
                type: 'ATR',
                data: data,
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        adl(){
            const prices = this.candles.chart.data;
            const data = technicals.adl(prices);
            this.candles.offchart.push({
                name: 'Accumulation Distribution Line',
                type: 'ATR',
                data: data,
                settings: {
                    color: '#d91e59'
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        obv(){
            const prices = this.candles.chart.data;
            const data = technicals.obv(prices);
            this.candles.offchart.push({
                name: 'On-Balance Volume',
                type: 'Histogram',
                data: data,
                settings: {
                    color: '#5691ce'
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        vwap(){
            const prices = this.candles.chart.data;
            const data = technicals.vwap(prices);
            this.candles.onchart.push({
                name: 'VWAP',
                type: 'VWMA',
                data: data,
                settings: {
                    color: '#ffcf70'
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        keltner(){
            const prices = this.candles.chart.data;
            const data = technicals.keltner(prices);
            this.candles.onchart.push({
                name: 'Keltner Channel',
                type: 'BB',
                data: data,
                settings: {
                    color: '#c048c2'
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false
        },
        keltnerWidth(){
            const prices = this.candles.chart.data;
            const data = technicals.keltnerWidth(prices);
            this.candles.offchart.push({
                name: 'Keltner Channel Width',
                type: 'Area51',
                data: data,
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        stdDev(){
            const prices = this.candles.chart.data;
            const data = technicals.stdDev(prices);
            this.candles.offchart.push({
                name: 'Standard Deviation',
                type: 'Area51',
                data: data,
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        chaikin() {   
            const prices = this.candles.chart.data;
            const data = technicals.chaikin(prices)
            this.candles.offchart.push({
                name: 'Chaikin Money Flow',
                type: 'SMA',
                data: data,
                settings: {
                    color: '#c49c5a'
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;
        },
        getInsiders() {
            const ticker = 'AAPL';
            this.$axios.get(`/stocks/insiders/${ticker}`).then(res => {
                res.data.forEach(c => {
                    const date = new Date(c.date).getTime();
                    this.insideTransactions.push([date, Math.abs(Number(c.amount))])
                })
            });
            this.candles.offchart.push({
            name: 'Insider Transactions',
            type: "InsidersOverlay",
            data: this.insideTransactions,
            })
            this.chart = new DataCube(this.candles)
        },
        
        async getPriceData() {
            const ticker = 'AAPL';
            this.ticker = ticker;
            const res = await this.$axios.get(`/stock/candles/${ticker}`);
            const arr = res.data.sort((a, b) => (a.date > b.date) ? 1: -1)
            arr.forEach(item => {
                const date = new Date(item.date).getTime();
                this.candles.ohlcv.push([date, item.open, item.high, item.low, item.close, item.volume])
            });
            this.chart = new DataCube(this.candles);
            this.$refs.tv.t2i(time)
            console.log(this.chart)
        },
        onResize(event) {
            this.width = window.innerWidth - 100
            this.height = window.innerHeight - 100
        },
         TwitterMentions() {
            const ticker = 'AAPL';
            const source = 'twitter';
            this.$axios.get(`/stocks/social/mentions/${ticker}/${source}`).then(res => {
                res.data.forEach(item => {
                    const date = new Date(item.date).getTime();
                    this.twitPosMentions.push([date, Number(item.positive_mentions),  -Number(item.negative_mentions)])                
                });
                this.candles.offchart.push({
                name: 'Twitter Mentions',
                type: "SocialMentions",
                data: this.twitPosMentions,
                })
                this.chart = new DataCube(this.candles)            
            });
            this.dialog3 = false;
        },
        TwitterScore() {
            const ticker = 'AAPL';
            const source = 'twitter';
            this.$axios.get(`/stocks/social/score/${ticker}/${source}`).then(res => {
                const scores = [];
                res.data.forEach(item => {
                    const date = new Date(item.date).getTime();
                    scores.push([date, Number(item.positive_score),  Number(item.negative_score), Number(item.total_score)])                
                });
                console.log(scores)
                this.candles.offchart.push({
                name: 'Twitter Sentiment Score',
                type: "SocialScore",
                data: scores,
                })
                this.chart = new DataCube(this.candles)            
            });
            this.dialog3 = false;
        },
        redditMentions() {
            const ticker = 'AAPL';
            const source = 'reddit';
            this.$axios.get(`/stocks/social/mentions/${ticker}/${source}`).then(res => {
                res.data.forEach(item => {
                    const date = new Date(item.date).getTime();
                    this.twitPosMentions.push([date, Number(item.positive_mentions),  -Number(item.negative_mentions)])                
                });
                this.candles.offchart.push({
                name: 'Reddit Mentions',
                type: "SocialMentions",
                data: this.twitPosMentions,
                })
                this.chart = new DataCube(this.candles)            
            });
            this.dialog3 = false;
        },
        redditScore() {
            const ticker = 'AAPL';
            const source = 'reddit';
            this.$axios.get(`/stocks/social/score/${ticker}/${source}`).then(res => {
                const scores = [];
                res.data.forEach(item => {
                    const date = new Date(item.date).getTime();
                    scores.push([date, Number(item.positive_score),  Number(item.negative_score), Number(item.total_score)])                
                });
                this.candles.offchart.push({
                name: 'Reddit Sentiment Score',
                type: "SocialScore",
                data: scores,
                })
                this.chart = new DataCube(this.candles)            
            });
            this.dialog3 = false;
        },
    },

    mounted() {
        this.getPriceData();
        window.addEventListener('resize', this.onResize)
        // this.onResize()
        // window.tv = this.$refs.tv
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
}

</script>
<style scoped>
.v-btn {
    font-size: 12px;
}
</style>