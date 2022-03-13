<template>
<v-container class="mt-4 mb-12 mx-2" fluid>
        <v-row justify="start" align="center">
    <v-dialog v-model="dialog1" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">Technicals</v-btn>
      </template>

      <v-card tile>
        <v-card-title class="justify-center">
          Technical Indicators
        </v-card-title>
                <v-list>
                    <v-list-item-group>
                        <v-list-item>       
                            <v-list-item-content>
                                <v-list-item-title @click="sma5Day">5-Day Simple Moving Average</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title @click="ema5Day">5-Day Exponential Moving Average</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item> 
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
                    </v-list-item-group>
                </v-list>                    
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Financials</v-btn>
        </template>

        <v-card tile>
            <v-card-title class="justify-center">
            Financial Metrics
            </v-card-title>
                    <v-list>
                        <v-list-item-group>
                            <v-list-item>       
                                <v-list-item-content>
                                    <v-list-item-title @click="showGrossMargin">Gross Margin</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click="showGrossMargin">Operating Margin</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>                            
                        </v-list-item-group>
                    </v-list>                    
            </v-card>
        </v-dialog>
    <v-dialog v-model="dialog3" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Alt. Data</v-btn>
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
    <v-dialog v-model="dialog4" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Compare</v-btn>
        </template>

        <v-card tile>
            <v-card-title class="justify-center">
            Make Comparisons
            </v-card-title>
            <v-tabs>
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

           
            <v-spacer></v-spacer>
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
        :width="width" :height="height"
        ref="tv"
        :legend-buttons="['remove', 'settings']"
        v-on:legend-button-click="on_button_click"
        :toolbar="false">
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
import calcGrossMargin from './Financials.js'
import BubbleOverlay from './BubbleOverlay';
import InsidersOverlay from './InsidersOverlay';
import PatentsOverlay from './PatentsOverlay';
import RecsOverlay from './RecsOverlay';
import SocialMentions from './SocialMentions';
import SocialScore from './SocialScore';
const technicalCalcs = require('technicalindicators');
export default {
    components: { TradingVue },
    mixins: [calcGrossMargin],
    data() {
        return {
            chart: {},
            props: ['width', 'height'],
            width: window.innerWidth - 300,
            height: window.innerWidth - 500,
            dialog1: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            ticker: '',
            candles: {
                ohlcv: [],
                onchart: [],
                offchart: [],
            },

            twitPosMentions: [],
            insideTransactions: [],

            overlays: [TestOverlay, SocialScore, InsidersOverlay, SocialMentions, 
            RecsOverlay, BubbleOverlay, PatentsOverlay, Overlays['MOM'], 
            Overlays['Histogram'], Overlays['Area51'], Overlays['Ichimoku'], Overlays['PlotCross']],
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
            compModel: '',
            yieldModel: '',
            econModel: '',


            
        }
    },
    computed: {
        barWidth () {
            return window.innerWidth
        },
        listSelection() {
        return this.value
        }
    },

    methods: {
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
             console.log(yieldData)
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
            console.log(this.indices[idx])
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
            this.$axios.get(`/charting/financials/gm/${ticker}`).then(res => {
            const grossMargin = this.calcGrossMargin(res.data);    
                 this.candles.offchart.push({
                     name: 'Gross Margin',
                     type: 'Histogram',
                     data: grossMargin,
                     settings: {
                         lineWidth: 100,
                         color: '#4287f5'
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
             console.log(this.patentData)
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
        sma5Day() {
            const prices = this.candles.chart.data;
            const window = 5;
            const smas = technicals.simpleMovingAverage(prices, window);
            this.candles.onchart.push({
                name: '5-Day Simple Moving Average',
                type: 'SMA',
                data: smas,
                settings: {
                    color: '#44b6eb'
                }
            });
            this.chart = new DataCube(this.candles);
            this.dialog1 = false;

        },
        ema5Day(){
            const prices = this.candles.chart.data;
            const window = 5;
            const emas = technicals.exponentialMovingAverage(prices, window);
            this.candles.onchart.push({
                name: '5-Day Exponential Moving Average',
                type: 'SMA',
                data: emas,
                settings: {
                    color: '#44b6eb'
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
            console.log(Overlays)
        },
        onResize(event) {
            this.width = window.innerWidth - 100
            // this.height = window.innerHeight - 100
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
        this.onResize()
        window.tv = this.$refs.tv
    }
}

</script>