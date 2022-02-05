<template>
  <v-container fluid>
      <template v-if="loading">
        <v-skeleton-loader dark type="date-picker">
        </v-skeleton-loader>
      </template>
      <template v-else>
      <v-row align="center" justify="center">
          <h4>
              Cumulative Change
          </h4>
      </v-row>
      <v-row align="center" justify="center">
          <v-btn-toggle mandatory v-model="timeFrame" v-on:change="changeTime" group>
              <v-btn >5D</v-btn>
                <v-btn>1M</v-btn>
                <v-btn>3M</v-btn>
                <v-btn>6M</v-btn>
                <v-btn>1Y</v-btn>
                <v-btn>3Y</v-btn>
                <v-btn>5Y</v-btn>
          </v-btn-toggle>
         
     
          <v-col cols="12">
          <IndiceChartBase :chart-data="chartData" :chart-options="chartOptions"
          v-on:change="updateChart" v-model="selected" />
          </v-col>
         </v-row>
      <v-row align="center" justify="center">  
          <v-col cols="12">
              <v-simple-table dense height="300px">
                  <template v-slot:default>
                  <tbody>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="S&P 500" value="SP500" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ allData[0].lastItems[1].value }} </td>
                          <td v-if="Number(allData[0].lastItems[1].value) - Number(allData[0].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[0].lastItems[1].value) - Number(allData[0].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[0].lastItems[1].value) - Number(allData[0].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[0].lastItems[1].value) - Number(allData[0].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[0].lastItems[1].value) - Number(allData[0].lastItems[0].value)) / Number(allData[0].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[0].lastItems[1].value) - Number(allData[0].lastItems[0].value)) / Number(allData[0].lastItems[0].value)) }}</td>
                      </tr>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Nasdaq" value="NASDAQCOM" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[1].lastItems[1].value) }} </td>
                          <td v-if="Number(allData[1].lastItems[1].value) - Number(allData[1].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[1].lastItems[1].value) - Number(allData[1].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[1].lastItems[1].value) - Number(allData[1].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[1].lastItems[1].value) - Number(allData[1].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[1].lastItems[1].value) - Number(allData[1].lastItems[0].value)) / Number(allData[1].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[1].lastItems[1].value) - Number(allData[1].lastItems[0].value)) / Number(allData[1].lastItems[0].value)) }}</td>
                      </tr>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Dow Jones" value="DJIA" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[2].lastItems[1].value) }} </td>
                           <td v-if="Number(allData[2].lastItems[1].value) - Number(allData[2].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[2].lastItems[1].value) - Number(allData[2].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[2].lastItems[1].value) - Number(allData[2].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[2].lastItems[1].value) - Number(allData[2].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[2].lastItems[1].value) - Number(allData[2].lastItems[0].value)) / Number(allData[2].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[2].lastItems[1].value) - Number(allData[2].lastItems[0].value)) / Number(allData[2].lastItems[0].value)) }}</td>
                      </tr>
                       <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Wilshire 5000" value="WILL5000INDFC" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[3].lastItems[1].value) }} </td>
                           <td v-if="Number(allData[3].lastItems[1].value) - Number(allData[3].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[3].lastItems[1].value) - Number(allData[3].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[3].lastItems[1].value) - Number(allData[3].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[3].lastItems[1].value) - Number(allData[3].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[3].lastItems[1].value) - Number(allData[3].lastItems[0].value)) / Number(allData[3].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[3].lastItems[1].value) - Number(allData[3].lastItems[0].value)) / Number(allData[3].lastItems[0].value)) }}</td>
                      </tr>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Vix" value="VIXCLS" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[4].lastItems[1].value) }} </td>
                           <td v-if="Number(allData[4].lastItems[1].value) - Number(allData[4].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[4].lastItems[1].value) - Number(allData[4].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[4].lastItems[1].value) - Number(allData[4].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[4].lastItems[1].value) - Number(allData[2].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[4].lastItems[1].value) - Number(allData[2].lastItems[0].value)) / Number(allData[4].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[4].lastItems[1].value) - Number(allData[4].lastItems[0].value)) / Number(allData[4].lastItems[0].value)) }}</td>
                      </tr>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Large Cap" value="WILLLRGCAP" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[5].lastItems[1].value) }} </td>
                           <td v-if="Number(allData[5].lastItems[1].value) - Number(allData[5].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[5].lastItems[1].value) - Number(allData[5].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[5].lastItems[1].value) - Number(allData[5].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[5].lastItems[1].value) - Number(allData[5].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[5].lastItems[1].value) - Number(allData[5].lastItems[0].value)) / Number(allData[5].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[5].lastItems[1].value) - Number(allData[5].lastItems[0].value)) / Number(allData[5].lastItems[0].value)) }}</td>
                      </tr>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Mid Cap" value="WILLMIDCAPPR" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[6].lastItems[1].value) }} </td>
                           <td v-if="Number(allData[6].lastItems[1].value) - Number(allData[6].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[6].lastItems[1].value) - Number(allData[6].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[6].lastItems[1].value) - Number(allData[6].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[6].lastItems[1].value) - Number(allData[6].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[6].lastItems[1].value) - Number(allData[6].lastItems[0].value)) / Number(allData[6].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[6].lastItems[1].value) - Number(allData[6].lastItems[0].value)) / Number(allData[9].lastItems[0].value)) }}</td>
                      </tr>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Small Cap" value="WILLSMLCAP" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[7].lastItems[1].value) }} </td>
                           <td v-if="Number(allData[7].lastItems[1].value) - Number(allData[7].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[7].lastItems[1].value) - Number(allData[7].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[7].lastItems[1].value) - Number(allData[7].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[7].lastItems[1].value) - Number(allData[7].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[7].lastItems[1].value) - Number(allData[7].lastItems[0].value)) / Number(allData[7].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[7].lastItems[1].value) - Number(allData[7].lastItems[0].value)) / Number(allData[7].lastItems[0].value)) }}</td>
                      </tr>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Large Cap Growth" value="WILLLRGCAPGR" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[8].lastItems[1].value) }} </td>
                           <td v-if="Number(allData[8].lastItems[1].value) - Number(allData[8].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[8].lastItems[1].value) - Number(allData[8].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[8].lastItems[1].value) - Number(allData[8].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[8].lastItems[1].value) - Number(allData[8].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[8].lastItems[1].value) - Number(allData[8].lastItems[0].value)) / Number(allData[8].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[8].lastItems[1].value) - Number(allData[8].lastItems[0].value)) / Number(allData[8].lastItems[0].value)) }}</td>
                      </tr>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Mid Cap Growth" value="WILLMIDCAPGR" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[9].lastItems[1].value) }} </td>
                           <td v-if="Number(allData[9].lastItems[1].value) - Number(allData[9].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[9].lastItems[1].value) - Number(allData[9].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[9].lastItems[1].value) - Number(allData[9].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[9].lastItems[1].value) - Number(allData[9].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[9].lastItems[1].value) - Number(allData[9].lastItems[0].value)) / Number(allData[9].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[9].lastItems[1].value) - Number(allData[9].lastItems[0].value)) / Number(allData[9].lastItems[0].value)) }}</td>
                      </tr>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Small Cap Growth" value="WILLSMLCAPGR" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[10].lastItems[1].value) }} </td>
                           <td v-if="Number(allData[10].lastItems[1].value) - Number(allData[10].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[10].lastItems[1].value) - Number(allData[10].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[10].lastItems[1].value) - Number(allData[10].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[10].lastItems[1].value) - Number(allData[10].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[10].lastItems[1].value) - Number(allData[10].lastItems[0].value)) / Number(allData[10].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[10].lastItems[1].value) - Number(allData[10].lastItems[0].value)) / Number(allData[10].lastItems[0].value)) }}</td>
                      </tr>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Large Cap Value" value="WILLMIDCAPVALPR" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[11].lastItems[1].value) }} </td>
                           <td v-if="Number(allData[11].lastItems[1].value) - Number(allData[11].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[11].lastItems[1].value) - Number(allData[11].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[11].lastItems[1].value) - Number(allData[11].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[11].lastItems[1].value) - Number(allData[11].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[11].lastItems[1].value) - Number(allData[11].lastItems[0].value)) / Number(allData[11].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[11].lastItems[1].value) - Number(allData[11].lastItems[0].value)) / Number(allData[11].lastItems[0].value)) }}</td>
                      </tr>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Mid Cap Value" value="WILLMIDCAPVALPR" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[12].lastItems[1].value) }} </td>
                           <td v-if="Number(allData[12].lastItems[1].value) - Number(allData[12].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[12].lastItems[1].value) - Number(allData[12].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[12].lastItems[1].value) - Number(allData[12].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[12].lastItems[1].value) - Number(allData[12].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[12].lastItems[1].value) - Number(allData[12].lastItems[0].value)) / Number(allData[12].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[12].lastItems[1].value) - Number(allData[12].lastItems[0].value)) / Number(allData[12].lastItems[0].value)) }}</td>
                      </tr>
                      <tr>
                          <td>
                              <v-checkbox v-model="selected" label="Small Cap Value" value="WILLSMLCAPVALPR" v-on:change="updateChart"></v-checkbox>
                          </td>
                          <td> {{ Number(allData[13].lastItems[1].value) }} </td>
                           <td v-if="Number(allData[13].lastItems[1].value) - Number(allData[13].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterChange(Number(allData[13].lastItems[1].value) - Number(allData[13].lastItems[0].value)) }} </td>
                              <td v-else style="color:red">{{ filterChange(Number(allData[13].lastItems[1].value) - Number(allData[13].lastItems[0].value)) }}</td>
                          <td v-if="Number(allData[13].lastItems[1].value) - Number(allData[13].lastItems[0].value) > 0" style="color:green"> 
                              {{ filterPercent((Number(allData[13].lastItems[1].value) - Number(allData[13].lastItems[0].value)) / Number(allData[13].lastItems[0].value)) }} </td>
                            <td v-else style="color:red"> {{ filterPercent((Number(allData[13].lastItems[1].value) - Number(allData[13].lastItems[0].value)) / Number(allData[13].lastItems[0].value)) }}</td>
                      </tr>
                  </tbody>
                  </template>
              </v-simple-table>
          </v-col>
      </v-row>
      <div>

      </div>
      </template>
  </v-container>
</template>

<script>
const numeral = require('numeral');
// list of index symbols: SP500, VIXCLS (cboe volatility index), 
// DJIA, WILL5000INDFC (wilshire 5000), NASDAQCOM

// ADD 4 MORE CHARTS (VIX, SMALL CAP (TOTAL GROWTH VALUE) MIDD, & LARGE)
export default {
    data () {
        return {
    chartData: null,
    loading: true,
    timeFrame: 0,
    chartOptions: {
        elements: {
                point: {
                    radius: 0,
                }
            },
        scales: {
            yAxes: [{
                position: 'right',
                type: 'linear', 
                ticks: {
                beginAtZero: false,
                callback: function(value) {    
                        return numeral(value).format('0.00%')
                    }                        
                },
                gridLines: {
                display: false
                }           
                }, 
                ],
                xAxes: [{
                type: 'time',
                distribution: 'series',
                ticks: {
                    beginAtZero: false
                },
                gridLines: {
                    display: false
                }
                }]   
        },
        legend: {
            display: true,
                onClick: (e) => e.stopPropagation()
            },
            responsive: true,
            maintainAspectRatio: false,
            height: 400,
    },
    selected: ['SP500'],
    allData: [
        {time : [], val : [],  color: '#6097f0', id: 'SP500', label: 'S&P 500', hidden: false, lastItems: 0 },
       {time : [], val : [], color: '#f87991', id: 'NASDAQCOM', label: 'Nasdaq', hidden: true, lastItems: 0},
       {time : [], val : [],  color: '#53e06f', id: 'DJIA', label: 'Dow Jones', hidden: true, lastItems: 0},
       {time : [], val : [],  color: '#5285F4', id: 'WILL5000INDFC', label: 'Wilshire 5000', hidden: true, lastItems: 0},
       {time : [], val : [],  color: '#00A1F1', id: 'VIXCLS', label: 'Vix', hidden: true, lastItems: 0},
       {time : [], val : [],  color: '#34A853', id: 'WILLLRGCAP', label: 'Large Cap', hidden: true, lastItems: 0},
       {time : [], val : [],  color: '#7CBB00', id: 'WILLMIDCAPPR', label: 'Mid Cap', hidden: true, lastItems: 0},
       {time : [], val : [],  color: '#FBBC05', id: 'WILLSMLCAP', label: 'Small Cap', hidden: true, lastItems: 0},
       {time : [], val : [],  color: '#EA4335', id: 'WILLLRGCAPGR', label: 'Large Cap Growth', hidden: true, lastItems: 0},
       {time : [], val : [],  color: '#F65314', id: 'WILLMIDCAPGR', label: 'Mid Cap Growth', hidden: true, lastItems: 0},
       {time : [], val : [],  color: '#9d42ed', id: 'WILLSMLCAPGR', label: 'Small Cap Growth', hidden: true, lastItems: 0},
       {time : [], val : [],  color: '#f3f573', id: 'WILLLRGCAPVAL', label: 'Large Cap Value', hidden: true, lastItems: 0},
       {time : [], val : [],  color: '#ff192d', id: 'WILLMIDCAPVALPR', label: 'Mid Cap Value', hidden: true, lastItems: 0},
       {time : [], val : [],  color: '#7c81d6', id: 'WILLSMLCAPVALPR', label: 'Small Cap Value', hidden: true, lastItems: 0},
    ],
   
        }
    },

    methods: {
        updateChart() {
            if(this.selected.includes('SP500')) {this.allData[0].hidden = false};
            if(!this.selected.includes('SP500')) {this.allData[0].hidden = true};
            if(this.selected.includes('NASDAQCOM')) {this.allData[1].hidden = false};
            if(!this.selected.includes('NASDAQCOM')) {this.allData[1].hidden = true};
            if(this.selected.includes('DJIA')) {this.allData[2].hidden = false };
            if(!this.selected.includes('DJIA')) {this.allData[2].hidden = true};
            if(this.selected.includes('WILL5000INDFC')) {this.allData[3].hidden = false};
            if(!this.selected.includes('WILL5000INDFC')) {this.allData[3].hidden = true};
            if(this.selected.includes('VIXCLS')) {this.allData[4].hidden = false};
            if(!this.selected.includes('VIXCLS')) {this.allData[4].hidden = true};
            if(this.selected.includes('WILLLRGCAP')) {this.allData[5].hidden = false };
            if(!this.selected.includes('WILLLRGCAP')) {this.allData[5].hidden = true};
            if(this.selected.includes('WILLMIDCAPPR')) {this.allData[6].hidden = false};
            if(!this.selected.includes('WILLMIDCAPPR')) {this.allData[6].hidden = true};
            if(this.selected.includes('WILLSMLCAP')) {this.allData[7].hidden = false};
            if(!this.selected.includes('WILLSMLCAP')) {this.allData[7].hidden = true};
            if(this.selected.includes('WILLLRGCAPGR')) {this.allData[8].hidden = false };
            if(!this.selected.includes('WILLLRGCAPGR')) {this.allData[8].hidden = true};
            if(this.selected.includes('WILLMIDCAPGR')) {this.allData[9].hidden = false};
            if(!this.selected.includes('WILLMIDCAPGR')) {this.allData[9].hidden = true};
            if(this.selected.includes('WILLSMLCAPGR')) {this.allData[10].hidden = false};
            if(!this.selected.includes('WILLSMLCAPGR')) {this.allData[10].hidden = true};
            if(this.selected.includes('WILLLRGCAPVAL')) {this.allData[11].hidden = false };
            if(!this.selected.includes('WILLLRGCAPVAL')) {this.allData[11].hidden = true};
            if(this.selected.includes('WILLMIDCAPVALPR')) {this.allData[12].hidden = false};
            if(!this.selected.includes('WILLMIDCAPVALPR')) {this.allData[12].hidden = true};
            if(this.selected.includes('WILLSMLCAPVALPR')) {this.allData[13].hidden = false};
            if(!this.selected.includes('WILLSMLCAPVALPR')) {this.allData[13].hidden = true};

            this.chartData = {
                labels: this.allData[0].time,
                datasets: [
                    {
                    type: 'line',
                    hidden:  this.allData[0].hidden,
                     backgroundColor: this.allData[0].color,
                     borderColor: this.allData[0].color,
                     data: this.allData[0].val,
                     label: this.allData[0].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden:  this.allData[1].hidden,
                     backgroundColor: this.allData[1].color,
                     borderColor: this.allData[1].color,
                     data: this.allData[1].val,
                     label: this.allData[1].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[2].hidden,
                     backgroundColor: this.allData[2].color,
                     borderColor: this.allData[2].color,
                     data: this.allData[2].val,
                     label: this.allData[2].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[3].hidden,
                     backgroundColor: this.allData[3].color,
                     borderColor: this.allData[3].color,
                     data: this.allData[3].val,
                     label: this.allData[3].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[4].hidden,
                     backgroundColor: this.allData[4].color,
                     borderColor: this.allData[4].color,
                     data: this.allData[4].val,
                     label: this.allData[4].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[5].hidden,
                     backgroundColor: this.allData[5].color,
                     borderColor: this.allData[5].color,
                     data: this.allData[5].val,
                     label: this.allData[5].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[6].hidden,
                     backgroundColor: this.allData[6].color,
                     borderColor: this.allData[6].color,
                     data: this.allData[6].val,
                     label: this.allData[6].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[7].hidden,
                     backgroundColor: this.allData[7].color,
                     borderColor: this.allData[7].color,
                     data: this.allData[7].val,
                     label: this.allData[7].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[8].hidden,
                     backgroundColor: this.allData[8].color,
                     borderColor: this.allData[8].color,
                     data: this.allData[8].val,
                     label: this.allData[8].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[9].hidden,
                     backgroundColor: this.allData[9].color,
                     borderColor: this.allData[9].color,
                     data: this.allData[9].val,
                     label: this.allData[9].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[10].hidden,
                     backgroundColor: this.allData[10].color,
                     borderColor: this.allData[10].color,
                     data: this.allData[10].val,
                     label: this.allData[10].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[11].hidden,
                     backgroundColor: this.allData[11].color,
                     borderColor: this.allData[11].color,
                     data: this.allData[11].val,
                     label: this.allData[11].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[12].hidden,
                     backgroundColor: this.allData[12].color,
                     borderColor: this.allData[12].color,
                     data: this.allData[12].val,
                     label: this.allData[12].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[13].hidden,
                     backgroundColor: this.allData[13].color,
                     borderColor: this.allData[13].color,
                     data: this.allData[13].val,
                     label: this.allData[13].label,
                     fill: false,
                },
                ]
            };
                this.chartOptions = {
                scales: {
                    yAxes: [{
                        position: 'right',
                        type: 'linear', 
                     ticks: {
                        beginAtZero: false,
                        callback: function(value) {
                            return numeral(value).format('0.00%')
                        }                        
                        },
                        gridLines: {
                        display: false
                        }           
                        }, 
                        ],
                        xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        time: {
                            unit: 'week'
                        },
                        ticks: {
                            beginAtZero: false
                        },
                        gridLines: {
                            display: false
                        }
                        }]   
                },
                legend: {
                    display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    height: 400,
            };
            
          
        },

       async changeTime() {
           this.loading = true;
            this.allData[0].time.length = 0;
            this.allData[0].val.length = 0;
            this.allData[1].time.length = 0;
            this.allData[1].val.length = 0;
            this.allData[2].time.length = 0;
            this.allData[2].val.length = 0;
            this.allData[3].time.length = 0;
            this.allData[3].val.length = 0;
            this.allData[4].time.length = 0;
            this.allData[4].val.length = 0;
            this.allData[5].time.length = 0;
            this.allData[5].val.length = 0;
            this.allData[6].time.length = 0;
            this.allData[6].val.length = 0;
            this.allData[7].time.length = 0;
            this.allData[7].val.length = 0;
            this.allData[8].time.length = 0;
            this.allData[8].val.length = 0;
            this.allData[9].time.length = 0;
            this.allData[9].val.length = 0;
            this.allData[10].time.length = 0;
            this.allData[10].val.length = 0;
            this.allData[11].time.length = 0;
            this.allData[11].val.length = 0;
            this.allData[12].time.length = 0;
            this.allData[12].val.length = 0;
            this.allData[13].time.length = 0;
            this.allData[13].val.length = 0;
           const startDate = new Date();
           startDate.setDate(startDate.getDate() - 5);
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
            }
            const start = startDate.toISOString();
            
           const allIds = ['SP500', 'NASDAQCOM', 'DJIA', 'WILL5000INDFC', 'VIXCLS', 'WILLLRGCAP', 'WILLMIDCAPPR', 'WILLSMLCAP', 
            'WILLLRGCAPGR', 'WILLMIDCAPGR', 'WILLSMLCAPGR', 'WILLLRGCAPVAL', 'WILLMIDCAPVALPR', 'WILLSMLCAPVALPR'];


            for(var i = 0; i < allIds.length; i++) {
                const id = allIds[i];
                const res = await this.$axios.get(`/fred/db/index/${id}/${start}`);
                const arr = res.data.sort((a, b) => (a.time > b.time) ?  1: -1);
                this.allData[i].lastItems = arr.slice(-2);
                const firstItem = arr.slice(0, 1);
                arr.forEach(item => {
                    this.allData[i].time.push(item.time.split('T')[0]);
                    const cumChange = (item.value - firstItem[0].value) / firstItem[0].value;
                    this.allData[i].val.push(cumChange);                 
                });
            }
            this.chartData = {
                labels: this.allData[0].time,
                datasets: [
                    {
                    type: 'line',
                    hidden:  this.allData[0].hidden,
                     backgroundColor: this.allData[0].color,
                     borderColor: this.allData[0].color,
                     data: this.allData[0].val,
                     label: this.allData[0].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden:  this.allData[1].hidden,
                     backgroundColor: this.allData[1].color,
                     borderColor: this.allData[1].color,
                     data: this.allData[1].val,
                     label: this.allData[1].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden:  this.allData[2].hidden,
                     backgroundColor: this.allData[2].color,
                     borderColor: this.allData[2].color,
                     data: this.allData[2].val,
                     label: this.allData[2].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[3].hidden,
                     backgroundColor: this.allData[3].color,
                     borderColor: this.allData[3].color,
                     data: this.allData[3].val,
                     label: this.allData[3].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[4].hidden,
                     backgroundColor: this.allData[4].color,
                     borderColor: this.allData[4].color,
                     data: this.allData[4].val,
                     label: this.allData[4].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[5].hidden,
                     backgroundColor: this.allData[5].color,
                     borderColor: this.allData[5].color,
                     data: this.allData[5].val,
                     label: this.allData[5].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[6].hidden,
                     backgroundColor: this.allData[6].color,
                     borderColor: this.allData[6].color,
                     data: this.allData[6].val,
                     label: this.allData[6].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[7].hidden,
                     backgroundColor: this.allData[7].color,
                     borderColor: this.allData[7].color,
                     data: this.allData[7].val,
                     label: this.allData[7].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[8].hidden,
                     backgroundColor: this.allData[8].color,
                     borderColor: this.allData[8].color,
                     data: this.allData[8].val,
                     label: this.allData[8].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[9].hidden,
                     backgroundColor: this.allData[9].color,
                     borderColor: this.allData[9].color,
                     data: this.allData[9].val,
                     label: this.allData[9].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[10].hidden,
                     backgroundColor: this.allData[10].color,
                     borderColor: this.allData[10].color,
                     data: this.allData[10].val,
                     label: this.allData[10].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[11].hidden,
                     backgroundColor: this.allData[11].color,
                     borderColor: this.allData[11].color,
                     data: this.allData[11].val,
                     label: this.allData[11].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[12].hidden,
                     backgroundColor: this.allData[12].color,
                     borderColor: this.allData[12].color,
                     data: this.allData[12].val,
                     label: this.allData[12].label,
                     fill: false,
                },
                {
                    type: 'line',
                    hidden: this.allData[13].hidden,
                     backgroundColor: this.allData[13].color,
                     borderColor: this.allData[13].color,
                     data: this.allData[13].val,
                     label: this.allData[13].label,
                     fill: false,
                },
                ]
            };

            this.loading = false;
        },

        filterPercent(val) {
            return numeral(val).format('0.00%')
        },
        filterChange(val) {
            return numeral(val).format('0.00')
        }
    },

    mounted() {
        this.changeTime();
    },

}
</script>

<style>

</style>