<template>
<v-container fluid>
    <!-- <template v-if="loading">
        <v-skeleton-loader dark type="date-picker">
        </v-skeleton-loader>         
      </template>
      <template v-else> -->
        <div class="alert">
        <v-alert
        color="#26a599"
        icon="mdi-arrow-left"
        dismissible
        > Select a crypto to get started!
        </v-alert>
      </div>
    <v-row justify="center" align="center">
        <v-col cols="6">
    <v-autocomplete
    id="cryptoShow" 
    :items="currencies"
    v-model="selectedCurrency"
    v-on:change="replaceChart"
    item-text="name"
    item-value="symbol"
    label="Select a Cryptocurrency"
    rounded
    dense
    solo
    class="select-menu"
    >
        <template v-slot:item="{ item }">
            <v-list-item-avatar
            color="indigo"
            class="white--text text-uppercase"
            >
            {{ item.symbol }}
            </v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title v-text="item.name" class="text-capitalize font-weight-black h6"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
            <v-list-item-title v-text="item.cmc_rank"></v-list-item-title>
            <v-list-item-subtitle class="font-italic">Rank</v-list-item-subtitle>
            </v-list-item-action>
        </template>
    </v-autocomplete>
    </v-col>
    </v-row>
        <v-row align="center" justify="center">
            <TradingVue
            :title-txt="ticker"
            :data="chart"
            :overlays="overlays"
            :chart-config="config"
            :indexBased="iB"
            color-back="#121212"
            :width="this.width"
            ref="tv"
            :legend-buttons="['remove']"
            v-on:legend-button-click="on_button_click"
            :toolbar="false"
             :x-settings="xsett">
          </TradingVue> 
            
        </v-row>
          <v-row  align="center" justify="center">
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
    <v-dialog v-model="dialog4" width="700" height="200" style='z-index:600;'>
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" outlined v-on="on">
                <v-icon dark>
                    mdi-rocket-launch
                </v-icon>
                Compare</v-btn>
        </template>

        <v-card tile height="500">
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
                  <v-btn-toggle mandatory group dense v-model="timeFrame" v-on:change="changeRange">
                    <v-btn plain>1W</v-btn>
                    <v-btn plain>1M</v-btn>
                    <v-btn plain>3M</v-btn>
                    <v-btn plain>6M</v-btn>
                    <v-btn plain>1Y</v-btn>
                    <v-btn plain>3Y</v-btn>
                    <v-btn plain>5Y</v-btn>
                  </v-btn-toggle>
          </v-row>
      <!-- </template> -->

</v-container>
</template>

<script>
import TradingVue from 'trading-vue-js';
import { DataCube } from 'trading-vue-js';
import Overlays from 'tvjs-overlays'
import technicals from '../stock-page/MyChart/Technicals.js';
import CandlePatterns from '../stock-page/MyChart/CandlePatterns.js';
import DMIOverlay from '../stock-page/MyChart/DMIOverlay';
import MACDOverlay from '../stock-page/MyChart/MACDOverlay';
import IchiCloudOverlay from '../stock-page/MyChart/IchiCloudOverlay';
import StochOverlay from '../stock-page/MyChart/StochOverlay';
import PatternsLabel from '../stock-page/MyChart/PatternsLabel';

const numeral = require('numeral');
export default {
    components: { TradingVue },
    data () {
        return {
            currencies: [],
            selectedCurrency: null,
            timeFrame: 2,
            scaler: 0,
            loading: true,
            dialog1: false,
            dialog4: false,
            dialog5: false,

            chart: {},
            width: window.innerWidth -100,
            config: {
                DEFAULT_LEN: 400, 
                TB_BORDER: 5,
                CANDLEW: 0.9,
               GRIDX: 200,
                VOLSCALE: 0.06
            },
            iB: false,
            ticker: '',
            overlays: [ Overlays['MOM'], 
            Overlays['Histogram'], DMIOverlay, Overlays['CCI'], Overlays['Area51'], 
            Overlays['Ichimoku'], IchiCloudOverlay, Overlays['PlotCross'], MACDOverlay, Overlays['WilliamsR'], 
            StochOverlay, Overlays['MFI'], Overlays['ATR'], Overlays['BB'],  Overlays['VWMA'],
            PatternsLabel],
            candles: {
                ohlcv: [],
                onchart: [],
                offchart: [],
            },
             xsett: {
                'grid-resize': { min_height: 30 }
            },
            SimpMovingAvgs: [
                {name: '5-day Simple Moving Average', window: 5, color: '#44b6eb'},
                {name: '10-day Simple Moving Average', window: 10, color: '#ed897b'},
                {name: '15-day Simple Moving Average', window: 15, color: '#75382f'},
                {name: '20-day Simple Moving Average', window: 20, color: '#bf6b47'},
                {name: '30-day Simple Moving Average', window: 30, color: '#e39c4b'},
                {name: '50-day Simple Moving Average', window: 50, color: '#9bdb84'},
                {name: '100-day Simple Moving Average', window: 100, color: '#4d754e'},
                {name: '200-day Simple Moving Average', window: 200, color: '#61d4c4'},
            ],
            ExpMovingAvgs: [
                {name: '5-day Exponential Moving Average', window: 5, color: '#7d9ac7'},
                {name: '10-day Exponential Moving Average', window: 10, color: '#453d91'},
                {name: '15-day Exponential Moving Average', window: 15, color: '#271e82'},
                {name: '20-day Exponential Moving Average', window: 20, color: '#7d48a3'},
                {name: '30-day Exponential Moving Average', window: 30, color: '#823841'},
                {name: '50-day Exponential Moving Average', window: 50, color: '#3c7021'},
                {name: '100-day Exponential Moving Average', window: 100, color: '#73bd4d'},
                {name: '200-day Exponential Moving Average', window: 200, color: '#a39846'},
            ],
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
            compModel: '',
            yieldModel: '',
            econModel: '',
            SimpMaModel: '',
            ExpMaModel: '',
        }
    },
    mounted() {
        this.getTable();
        this.$refs.tv.resetChart();
        window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    methods: {
        onResize(event) {
            this.width = window.innerWidth - 100
            this.height = window.innerHeight - 200
        },
        async changeRange() {
            const startDate = new Date();
            startDate.setDate(startDate.getDate());
            switch(this.timeFrame) {
                case 0:
                    startDate.setDate(startDate.getDate() - 7);
                    break;
                case 1:
                    startDate.setDate(startDate.getDate() - 30);
                    break;
                case 2:
                    startDate.setDate(startDate.getDate() - 90);
                    break;
                case 3:
                     startDate.setDate(startDate.getDate() - 180);
                    break;
                case 4: 
                    startDate.setDate(startDate.getDate() - 365);
                    break;
                case 5:
                     startDate.setDate(startDate.getDate() - 1095);
                     break;
                case 6:
                    startDate.setDate(startDate.getDate() -1825);
                    break
            };
            const endDate = new Date().getTime()
            this.$nextTick(() =>
                this.$refs.tv.setRange(startDate, endDate)
            )
        },
        replaceChart () {
            this.ticker = this.selectedCurrency;
            this.$axios.get(`/crypto/candlestick/${this.ticker}`).then(res => {
                const arr = res.data.sort((a, b) => (a.date > b.date) ? 1: -1);
                this.candles.ohlcv = [];
                arr.forEach(item => {
                const date = new Date(item.date).getTime();
                this.candles.ohlcv.push([date, item.open, item.high, item.low, item.close, item.volume])
            });
            this.chart = new DataCube(this.candles);
            const endDate = new Date()
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 90);
            const t1 = startDate.getTime();
            const t2 = endDate.getTime();
            this.$nextTick(() =>
            this.$refs.tv.setRange(t1, t2)
            );
            })
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
            }
        },
        async getTable() {
            const cryptoList = await this.$axios.get('/crypto/ticker/list');
            this.currencies = cryptoList.data;
        },
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
                type: 'Area51',
                data: econData,
                settings: {
                    color: color,
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
                type: 'IchiCloudOverlay',
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
                    color: '#834ea6'
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
    },


}
</script>

<style scoped>
.select-menu {
z-index: 500;
}

.alert {
  z-index: 50;
  position:absolute;
  right: 5%;
  width: 500;
  opacity:0;
  animation: fadeInAnimation linear 1s;
            animation-delay: 1.5s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
}
@keyframes fadeInAnimation {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
</style>