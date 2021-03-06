<template>
<v-container>
  <v-row class="fill-height">

    <v-col>
       
      <v-sheet height="64">        
        <v-toolbar
          flat
        >
        <v-toolbar-title>
          Earnings Calendar
        </v-toolbar-title>
        <v-spacer></v-spacer>      
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"

        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-row>
                   EPS Estimate: <span v-html="selectedEvent.eps_estimate"></span> 
                </v-row>
                <v-row>
                 EPS Actual: <span v-html="selectedEvent.eps_actual"></span>   
                </v-row>
                <v-row>
                    Revenue Estimate: <span v-html="selectedEvent.revenue_estimate"></span> 
                </v-row>
              <v-row>
                  Revenue Actual: <span v-html="selectedEvent.revenue_actual"></span>
              </v-row>
             <v-row>
               Fiscal Period: <span v-html="selectedEvent.period"></span>  
             </v-row>
              
              
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
const numeral = require('numeral');

  export default {
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    }),
    mounted () {

      this.getEarningsData();
    },
    methods: {
    
        async getEarningsData() {
            const response = await this.$axios.get('/earnings/calendar');
            response.data.forEach(item => {
                this.events.push({
                    name: item.symbol + '  ' + this.editTime(item.hour) ,
                    start: item.date.split('T')[0],
                   
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    eps_estimate: this.editEps(item.eps_estimate),
                    eps_actual: this.editEps(item.eps_actual),
                    revenue_estimate: this.editNumber(item.revenue_estimate),
                    revenue_actual: this.editNumber(item.revenue_actual),
                    period: item.quarter

                });
            });
        },
        editNumber(x) {
            if(x != null) {
                return numeral(Number(x)).format('(0.00a)')
            } else {
                return '-'
            }
        },

        editEps(x) {
            if(x != null) {
                return numeral(Number(x)).format('(0.00)')
            } else {
                return '-'
            }
        },
        editTime(x) {
            if(x == 'amc') {
                return 'After Market Close'
            } else if(x == 'bmo') {
                return 'Before Market Open'
            } else {
                return 'During Market Hour'}
        },

      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>

