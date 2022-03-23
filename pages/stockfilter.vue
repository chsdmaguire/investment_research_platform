<template>
<v-container fluid>
    <template v-if="loading">
        <v-skeleton-loader type="table"></v-skeleton-loader>
    </template>
    <template v-else>
    <v-row justify="center" align="center">
        <v-col cols="11">
            <v-stepper non-linear  v-model="e1">
                <v-stepper-header>
                    <v-stepper-step editable step="1">Intro</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step editable step="2">Size</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step editable step="3">Sector</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step editable step="4">Style</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step editable step="5">Rating</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step editable step="6">Finish</v-stepper-step>
                </v-stepper-header>
                <v-stepper-content step="1">
                    <v-card color="#121212" height=200>
                        <v-row justify="center" align="center" class="mt-5">
                            <div class="intro">
                                <h1>Flibyrd Equities Screener</h1>
                            </div>
                        </v-row>
                        <v-row align="center" justify="center" class="mt-8">
                            <div class="intro">
                                <h3>Let's find some stocks for you. 
                                    <span> <v-btn class="ml-2" color="#009688" @click="e1 = 2">Yes, Please!</v-btn> </span>
                                </h3>
                            </div>
                        </v-row>
                    </v-card>
                </v-stepper-content>            
                <v-stepper-content step="2">
                    <v-card color="#121212" height=350>
                    <v-row align="center" justify="center">
                        <v-card-title>
                            What size market cap are you looking for?
                        </v-card-title>                      
                    </v-row>
                    <v-row justify="center" align="center" class="mb-3">
                        <v-col cols="3">
                            <v-hover>
                                <template v-slot:default="{ hover }">
                                    <v-card @click.stop="capChanges('large')" rounded :elevation="hover ? 12 : 4" width="170" height="170" 
                                    :style="sizeModel.includes('large') ? 'border: 1px solid green;' : 'border: 3px solid rgb(192, 152, 25);'" 
                                    class="mx-auto rounded-circle" color="#121212" :ripple="false">
                                    <v-row justify="center" align="center" class="mt-12">
                                        <v-tooltip  bottom color="light-blue darken-">
                                                <template v-slot:activator="{ on }">
                                                    <span v-on="on">
                                                        <v-card-title>Large Cap</v-card-title>
                                                    </span>
                                                </template>
                                                Market cap greater than $10 billion
                                            </v-tooltip>
                                    </v-row>                                  
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>
                        <v-col cols="3">
                            <v-hover>
                                <template v-slot:default="{ hover }">
                                    <v-card @click.stop="capChanges('mid')" rounded :elevation="hover ? 12 : 4" width="170" height="170"
                                    :style="sizeModel.includes('mid') ? 'border: 1px solid green;' : 'border: 3px solid rgb(192, 152, 25);'" 
                                    class="mx-auto rounded-circle" color="#121212" :ripple="false">
                                    <v-row justify="center" align="center" class="mt-12">
                                        <v-tooltip  bottom color="light-blue darken-">
                                                <template v-slot:activator="{ on }">
                                                    <span v-on="on">
                                                        <v-card-title>Mid Cap</v-card-title>
                                                    </span>
                                                </template>
                                                Market cap between $2 billion and $10 billion
                                            </v-tooltip>
                                    </v-row>
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>
                        <v-col cols="3">
                            <v-hover>
                                <template v-slot:default="{ hover }">
                                    <v-card @click.stop="capChanges('small')" rounded :elevation="hover ? 12 : 4" width="170" height="170" 
                                    :style="sizeModel.includes('small') ? 'border: 1px solid green;' : 'border: 3px solid rgb(192, 152, 25);'" 
                                    class="mx-auto rounded-circle" color="#121212" :ripple="false">
                                    <v-row justify="center" align="center" class="mt-12">
                                        <v-tooltip  bottom color="light-blue darken-">
                                                <template v-slot:activator="{ on }">
                                                    <span v-on="on">
                                                        <v-card-title>Small Cap</v-card-title>
                                                    </span>
                                                </template>
                                                Makret cap with less than $2 billion
                                            </v-tooltip>
                                    </v-row>                                  
                                    </v-card>
                                </template>
                            </v-hover>
                        </v-col>                  
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-btn class="primary" @click="mainFilter">Generate</v-btn>
                    </v-row>
                    <v-row justify="center" align="center" class="mt-6">
                        <h4> Currently filtering for <span class="primary-text">{{ filterText(this.sizeModel) }} </span> </h4>
                    </v-row>
                    </v-card>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-card color="#121212">
                        <v-row align="center" justify="center">
                            <v-card-title>What sector/s are you interested in?</v-card-title>
                        </v-row>
                        <v-card-text>
                        <v-row align="center" justify="center">
                            <v-col cols="4">
                                <v-treeview selectable hoverable activatable
                                color="warning" :items="tree1" v-model="treeSelection1"></v-treeview>
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col cols="4">
                                <v-treeview selectable hoverable activatable
                                color="warning" :items="tree2" v-model="treeSelection2"></v-treeview>
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col cols="4">
                                <v-treeview selectable hoverable activatable
                                color="warning" :items="tree3" v-model="treeSelection3"></v-treeview>
                            </v-col>
                        </v-row>
                            <v-row align="center" justify="center">
                                <v-btn class="primary" @click="mainFilter">Update</v-btn>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-stepper-content>  
                <v-stepper-content step="4">
                    <v-card color="#121212" height=350>
                        <v-row align="center" justify="center">
                            <v-card-title>Which do you care more about?</v-card-title>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col cols="3">
                                <v-hover>
                                    <template v-slot:default="{ hover }">
                                        <v-card @click.stop="styleChanges('growth')" rounded :elevation="hover ? 12 : 4" width="170" height="170"
                                        :style="styleModel.includes('growth') ? 'border: 1px solid green;' : 'border: 3px solid rgb(63, 81, 181);'" 
                                        class="mx-auto rounded-circle" color="#121212" :ripple="false">
                                        <v-row justify="center" align="center" class="mt-12">
                                            <v-tooltip  bottom color="light-blue darken-">
                                                <template v-slot:activator="{ on }">
                                                    <span v-on="on">
                                                        <v-card-title>Growth</v-card-title>
                                                    </span>
                                                </template>
                                                Companies with a P/E above 16 and a P/S above 2
                                            </v-tooltip>
                                        </v-row>
                                        </v-card>
                                    </template>
                                </v-hover>
                            </v-col>
                            <v-col cols="3">
                                <v-hover>
                                    <template v-slot:default="{ hover }">
                                        <v-card @click.stop="styleChanges('value')" rounded :elevation="hover ? 12 : 4" width="170" height="170"
                                        :style="styleModel.includes('value') ? 'border: 1px solid green;' : 'border: 3px solid rgb(63, 81, 181);'" 
                                        class="mx-auto rounded-circle" color="#121212" :ripple="false">
                                        <v-row justify="center" align="center" class="mt-12">
                                            <v-tooltip  bottom color="light-blue darken-">
                                                <template v-slot:activator="{ on }">
                                                    <span v-on="on">
                                                        <v-card-title>Value</v-card-title>
                                                    </span>
                                                </template>
                                                Companies with a P/E below 16 and P/S below 2
                                            </v-tooltip>
                                        </v-row>
                                        </v-card>
                                    </template>
                                </v-hover>
                            </v-col>
                            <v-col cols="3">
                                <v-hover>
                                    <template v-slot:default="{ hover }">
                                        <v-card @click.stop="styleChanges('mix')" rounded :elevation="hover ? 12 : 4" width="170" height="170"
                                        :style="styleModel.includes('mix') ? 'border: 1px solid green;' : 'border: 3px solid rgb(63, 81, 181);'" 
                                        class="mx-auto rounded-circle" color="#121212" :ripple="false">
                                        <v-row justify="center" align="center" class="mt-12">
                                            <v-tooltip  bottom color="light-blue darken-">
                                                <template v-slot:activator="{ on }">
                                                    <span v-on="on">
                                                        <v-card-title>Mixed</v-card-title>
                                                    </span>
                                                </template>
                                                Companies with either P/E above 16 and P/S below 2 or vice versa
                                            </v-tooltip>
                                        </v-row>
                                        </v-card>
                                    </template>
                                </v-hover>
                            </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-btn class="primary" @click="mainFilter">Update</v-btn>
                        </v-row>
                        <v-row justify="center" align="center" class="mt-6">
                            <h4> Currently filtering for <span class="primary-text">{{ filterText(this.styleModel) }} </span> </h4>
                        </v-row>
                    </v-card>
                </v-stepper-content>               
                <v-stepper-content step="5">
                    <v-card color="#121212" height=250>
                        <v-row align="center" justify="center">
                            <v-card-title>Preferred Analysts Rating</v-card-title>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col cols="2" v-for="(item, idx) in ratings" :key="idx">
                                <v-row align="center" justify="center">
                                    <v-hover>
                                        <template v-slot:default="{ hover }">
                                            <v-icon x- size="80" :color="hover || ratingsModel.includes(item.name) ? 'green darken-2' : ''" @click.stop="ratingsChanges(item.name)">
                                        mdi-star-outline</v-icon>
                                        </template>
                                    </v-hover>                               
                                </v-row>
                                <v-row justify="center" align="center">
                                    <h4>{{ item.name }}</h4>
                                </v-row>                         
                            </v-col>
                        </v-row>    
                        <v-row justify="center" align="center" class="mt-5">
                            <v-btn class="primary" @click="mainFilter">Update</v-btn>
                        </v-row>                    
                    </v-card>
                </v-stepper-content>
                <v-stepper-content step="6">
                    <v-card color="#121212" height=270>
                        <v-row justify="center" align="center" class="mt-5">
                            <h1>You're all set!</h1>
                        </v-row>
                        <v-row justify="center" align="center" class="mt-8 mb-4">
                            <h3>Check out the table below to see what's left</h3>
                        </v-row>
                        <v-row justify="center" align="center" class="mt-12 mb-n12">
                            <v-btn color="#009688" @click="arrowDown" class="rounded-circle" height="60" width="60">
                                <v-icon size="50">mdi-arrow-down-bold</v-icon>
                            </v-btn>
                        </v-row>
                    </v-card>
                </v-stepper-content> 
            </v-stepper>
        </v-col>
    </v-row>
    <v-row justify="center" align="center">
        <v-col cols="11">
            <v-data-table :headers="headers" :items="tableData" dense calculate-widths disable-filtering id="screener">
                <template v-slot:[`item.market_cap`]="{ item }">
                    <span> {{ formatMarketCap(item.market_cap) }} </span>
                </template>
                <template v-slot:[`item.shares_outstanding`]="{ item }">
                    <span> {{ formatMarketCap(item.shares_outstanding) }} </span>
                </template>
                <template v-slot:[`item.diff`]="{ item }">
                    <span v-if="item.diff > 0"  style="color: green;"> {{ item.diff.toFixed(2) }} </span>
                    <span v-else style="color: red;">{{ item.diff.toFixed(2) }}</span>
                </template>
                <template v-slot:[`item.percDiff`]="{ item }">
                    <span v-if="item.percDiff > 0"  style="color: green;"> {{ percentify(item.percDiff) }} </span>
                    <span v-else style="color: red;">{{ percentify(item.percDiff) }}</span>
                </template>
                <template v-slot:[`item.p_e`]="{ item }">
                    <span> {{ formatMultiple(item.p_e) }} </span>
                </template>
                <template v-slot:[`item.p_s`]="{ item }">
                    <span> {{ formatMultiple(item.p_s) }} </span>
                </template>
                <template v-slot:[`item.ticker`]="{ item }">
                    <span> <a style="text-decoration: none;font-weight: bold;" :href="`/${item.ticker}`">
                    {{ item.ticker }}</a>
                    </span>
       </template>
            </v-data-table>
        </v-col>  
    </v-row>
    </template>
</v-container>
</template>

<script>
const numeral = require('numeral');

export default {
    data() {
        return {
            tableData: [],
            headers: [
                {text: 'TICKR', value: 'ticker', width: '8%'},
                {text: 'NAME', value: 'name', width: '15%'},
                {text: 'LAST', value: 'today', width: '10%'},
                {text: 'CHG', value: 'diff', width: '8%'},
                {text: '%CHG', value: 'percDiff', width: '8%'},
                {text: 'MKT CAP', value: 'market_cap', width: '10%'},
                {text: 'SECTOR', value: 'sector', width: '15%'},
                {text: 'RATING', value: 'rating', width: '10%'},
                {text: 'P/S', value: 'p_s', width: '8%'},
                {text: 'P/E', value: 'p_e', width: '8%'},
            ],
            allData: [],
            sizeModel: [],
            tree1: [
                {id: 1,
                name: 'Communications',
                children: [
                    {id: 2, name: 'Communications'},
                    {id: 3, name: 'Media'},
                    {id: 4, name: 'Telecommunication'}]},
                {id: 5,
                name: 'Consumer Discretionary',
                children: [
                    {id: 6, name: 'Auto Components'},
                    {id: 7, name: 'Automobiles'},
                    {id: 8, name: 'Distributors'},
                    {id: 9, name: 'Diversified Consumer Services'},
                    {id: 10, name: 'Hotels, Restaurants, & Leisure'},
                    {id: 11, name: 'Leisure Products'},
                    {id: 12, name: 'Retail'},
                    {id: 13, name: 'Textiles, Apparel & Luxury Goods'},
                    ]},
                    {id: 14,
                name: 'Consumer Staples',
                children: [
                    {id: 15, name: 'Beverages'},
                    {id: 16, name: 'Consumer Products'},
                    {id: 17, name: 'Food Products'},
                    {id: 18, name: 'Tobacco'}]},
                    
                ],
            tree2: [
                {id: 19,
                name: 'Financials',
                children: [
                    {id: 20, name: 'Banking'},
                    {id: 21, name: 'Financial Services'},
                    {id: 22, name: 'Insurance'}]},
                {id: 23,
                name: 'Health Care',
                children: [
                    {id: 24, name: 'Biotechnology'},
                    {id: 25, name: 'Health Care'},
                    {id: 26, name: 'Life Sciences Tools & Services'},
                    {id: 27, name: 'Pharmaceuticals'}]},
                    {id: 28,
                name: 'Industrials',
                children: [
                    {id: 29, name: 'Aerospace & Defense'},
                    {id: 30, name: 'Airlines'},
                    {id: 31, name: 'Building'},
                    {id: 32, name: 'Commercial Services & Supplies'},
                    {id: 33, name: 'Construction'},
                    {id: 34, name: 'Leisure Products'},
                    {id: 35, name: 'Industrial Conglomerates'},
                    {id: 36, name: 'Logistics & Transportation'},
                    {id: 37, name: 'Machinery'},
                    {id: 38, name: 'Marine'},
                    {id: 39, name: 'Professional Services'},
                    {id: 40, name: 'Road & Rail'},
                    {id: 41, name: 'Trading Companies & Distributors'},
                    ]},
            ],
            tree3: [
                {id: 42,
                name: 'IT',
                children: [
                    {id: 43, name: 'Electrical Equipment'},
                    {id: 44, name: 'Semiconductors'},
                    {id: 45, name: 'Technology'}]},
                    {id: 46,
                name: 'Materials',
                children: [
                    {id: 47, name: 'Chemicals'},
                    {id: 48, name: 'Metals & Mining'},
                    {id: 49, name: 'Packaging'},
                    {id: 50, name: 'Paper & Forest'}]},
                    {id: 51,
                name: 'Other',
                children: [
                    {id: 52, name: 'Energy'},
                    {id: 53, name: 'Real Esate'},
                    {id: 54, name: 'Utilities'}]},
            ],
            treeSelection1: [],
            treeSelection2: [],
            treeSelection3: [],
            styleModel: [],
            ratings: [
                {value: 1, name: "strong sell"},
                {value: 2, name: "sell"},
                {value: 3, name: "hold"},
                {value: 4, name: "buy"},
                {value: 5, name: "strong buy"},
            ],
            ratingsModel: [],
            e1: 1,
            loading: true,
        }
    },
    methods: {
        formatMarketCap(val) {
          return numeral(val * 1000000).format('0.0a')
        },
        percentify(num) {
            return numeral(num).format('0.00%');
        },
        formatMultiple(num) {
            if(num) {
                return numeral(num).format('0.0') + 'x'
            } else {
                return 'n/a'
            }
        },
        async getData() {
            this.loading = true;
            const res = await this.$axios.get('/stocks/screener');
            res.data.forEach(item => {
                if (item.market_cap > 10000) {
                    item.size = 'large'
                } else if(item.market_cap > 2000 && item.market_cap <= 10000) {
                    item.size = 'mid'
                } else {
                    item.size = 'small'
                }
                const sumRecs = item.strong_buy + item.buy + item.hold + item.sell + item.strong_sell;
                const cumRating = (5 * (item.strong_buy / sumRecs)) + (4 * (item.buy / sumRecs)) + (3 * (item.hold / sumRecs)) + 
                (2 * (item.sell / sumRecs)) + (1 * (item.strong_sell / sumRecs));
                if(cumRating > 4) {
                    item.rating = 'strong buy'
                } else if(cumRating > 3 && cumRating <= 4) {
                    item.rating = 'buy'
                } else if(cumRating > 2 && cumRating <= 3) {
                    item.rating = 'hold'
                } else if(cumRating > 1 && cumRating <= 2) {
                    item.rating = 'sell'
                } else {
                    item.rating = 'strong sell'
                }
                item.diff = item.today - item.yesterday;
                item.percDiff = item.diff / item.yesterday;
                if(item.p_s > 2 && item.p_e > 16) {
                    item.style = 'growth'
                } else if (item.p_s < 2 && item.p_e < 16) {
                    item.style = 'value'
                } else {
                    item.style = 'mix'
                }
            });
            this.allData = res.data;
            this.tableData = this.allData;
            this.loading = false;
        },
        capChanges(val) {
            if(this.sizeModel.includes(val)) {
                const index = this.sizeModel.indexOf(val);
                this.sizeModel.splice(index, 1)
            } else {
                this.sizeModel.push(val)
            }
        },
        ratingsChanges(val) {
            if(this.ratingsModel.includes(val)) {
                const index = this.ratingsModel.indexOf(val);
                this.ratingsModel.splice(index, 1)
            } else {
                this.ratingsModel.push(val)
            }
            console.log(val)
        },
        styleChanges(val) {
            if(this.styleModel.includes(val)) {
                const index = this.styleModel.indexOf(val);
                this.styleModel.splice(index, 1);
            } else {
                this.styleModel.push(val)
            }
        },

        filterSector(item) {
                if(this.treeSelection1.length > 0 || this.treeSelection2.length > 0 || this.treeSelection3.length > 0 ) {
                const treeArr = [this.tree1, this.tree2, this.tree3];
            const modelArr = [this.treeSelection1, this.treeSelection2, this.treeSelection3]
            const allSectors = [];
                treeArr.forEach(arr => {
                    arr.forEach(i => {
                        i.children.forEach(j => {
                            modelArr.forEach(array => {
                                array.forEach(model => {
                                    if (model === j.id) {
                                    allSectors.push(j.name)
                                } 
                                })
                            })
                        })
                    });
                });
                return allSectors.includes(item)
                } else {
                    return true;
                }
            },
        mainFilter() {
            function filterSize(model, item) {
                if(model.length > 0) {
                    return model.includes(item);
                } else {
                    return true;
                }
            }
            this.tableData = [];
            this.tableData = this.allData.filter(item => filterSize(this.sizeModel, item.size) && filterSize(this.ratingsModel, item.rating) && 
            filterSize(this.styleModel, item.style) && this.filterSector(item.sector));
            if(this.e1 < 6) {
                this.e1 += 1
            } else {
                this.e1 = 6
            }

        },
        filterText(arr) {
            if(arr.length > 0) {
                return arr.toString();
            } else {
                return 'None'
            }
        },
        arrowDown() {
            document.getElementById('screener').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },
    mounted() {
        this.getData();
    },
}
</script>

<style scoped>
.primary-text {
    color:#4287f5
}
.v-stepper {
    background-color: #121212 !important;
}
.v-stepper-content {
    background-color: #121212 !important;
}

.v-stepper-header {
    background-color: #121212 !important;
}
.v-card--link:before {
  background: none;
}

.v-data-table-header th {
  white-space: nowrap !important;
  vertical-align: top !important;
}

.intro {
    animation: fadeInAnimation linear 2s;
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