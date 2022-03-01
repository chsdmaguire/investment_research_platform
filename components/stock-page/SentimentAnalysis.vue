<template>
<v-container>
  <v-row justify="center" align="center">
    <v-col lg="6" class="my-6">
      <v-row justify="center" align="center">
        <h3>Twitter Sentiment</h3>
      </v-row>
      <v-row justify="center" align="center" no-gutters>
         <div>
          <SentiChartBase :chart-data="twitterData" :options="twitterOptions" />
        </div>
      </v-row>
    </v-col>
    <v-col lg="6" class="my-6">
      <v-row justify="center" align="center">
        <h3>Reddit Sentiment</h3>
      </v-row>
      <v-row justify="center" align="center" no-gutters>
         <div>
           <RedditChartBase :chart-data="redditData" :options="redditOptions" />
        </div>
      </v-row>
    </v-col>
  </v-row>
</v-container>

</template>

<script>


export default {

  data() {
    return {
      twitterData: null,
      twitterOptions: null,
      twitPosMentions: [],
      twitNegMentions: [],
      twitOtherMentions: [],
      twitPosScore: [],
      twitNegScore: [],
      twitScore: [],
      TwitxAxis: [],

      redditData: null,
      redditOptions: null,
      redPosMentions: [],
      redNegMentions: [],
      redOtherMentions: [],
      redPosScore: [],
      redNegScore: [],
      redScore: [],
      redxAxis: [],
    };
  },
  mounted() {
    this.barchartdata();
  },
  methods: {
    async barchartdata() {
      const ticker = this.$route.params.ticker.toUpperCase()
          const senti = await this.$axios.get(`/social/sentiment/${ticker}`);
          if (senti.data.length > 0) {
          const sentiData = senti.data;

          sentiData.forEach(item => {
            const date = item.date.split('T')[0];

            if(item.source == 'twitter') {
              
              if(this.TwitxAxis.includes(date)) {
                const otherMen = Number(item.total_mentions) - Number(item.negative_mentions) 
                - Number(item.positive_mentions);
                const itemIndex = this.TwitxAxis.indexOf(date);
                this.twitPosMentions.splice(itemIndex, 1, Number(this.twitPosMentions[itemIndex]) + Number(item.positive_mentions));
                this.twitNegMentions.splice(itemIndex, 1, Number(this.twitNegMentions[itemIndex]) + Number(item.negative_mentions));
                this.twitOtherMentions.splice(itemIndex, 1, Number(this.twitOtherMentions[itemIndex]) + Number(otherMen)); 
                const new_score = (Number(this.twitScore[itemIndex]) + Number(item.total_score)) / 2;
                this.twitScore.splice(itemIndex, 1, new_score);

              } else {
              this.twitPosMentions.push(item.positive_mentions);
              this.twitNegMentions.push(item.negative_mentions);
              this.twitOtherMentions.push(Number(item.total_mentions) - Number(item.negative_mentions) 
              - Number(item.positive_mentions));
              this.twitScore.push(item.total_score);
              this.TwitxAxis.push(date)
              }                
            } else if(item.source == 'reddit') {
              if(this.redxAxis.includes(date)) {
                const otherMen = Number(item.total_mentions) - Number(item.negative_mentions) 
                - Number(item.positive_mentions);
                const itemIndex = this.redxAxis.indexOf(date);
                this.redPosMentions.splice(itemIndex, 1, Number(this.redPosMentions[itemIndex]) + Number(item.positive_mentions));
                this.redNegMentions.splice(itemIndex, 1, Number(this.redNegMentions[itemIndex]) + Number(item.negative_mentions));
                this.redOtherMentions.splice(itemIndex, 1, Number(this.redOtherMentions[itemIndex]) + Number(otherMen)); 
                const new_score = (Number(this.redScore[itemIndex]) + Number(item.total_score)) / 2;
                this.redScore.splice(itemIndex, 1, new_score);

              } else {
              this.redPosMentions.push(item.positive_mentions);
              this.redNegMentions.push(item.negative_mentions);
              this.redOtherMentions.push(Number(item.total_mentions) - Number(item.negative_mentions) 
              - Number(item.positive_mentions));
              this.redScore.push(item.total_score);
              this.redxAxis.push(date)
              }                
            }
          });

          this.twitterData = {
            labels: this.TwitxAxis,
            datasets: [{type: 'line',
              label: 'Total Score',
              data: this.twitScore,
              backgroundColor: "#34a853",
              borderColor: "#34a853",
              yAxisID: 'B',
              fill: false},
              {type: 'bar',
              label: 'Positive Mentions',
              data: this.twitPosMentions,
              backgroundColor: "#46bdc6",
              yAxisID: 'A'},
              {type: 'bar',
              label: 'Negative Mentions',
              data: this.twitNegMentions,
              backgroundColor: "#fbb104",
              yAxisID: 'A'},
              {type: 'bar',
              label: 'Other Mentions',
              data: this.twitOtherMentions,
              backgroundColor: "#ff6d01",
              yAxisID: 'A'},
              
            ],
          };

          this.twitterOptions = {
            legend: {
                display: true
              },
              // title: {
              //   display: true,
              //   text: 'Twitter Sentimnent Analysis'
              // },
              responsive: true,
              maintainAspectRatio: false,
              height: 800,
              scales: {
                yAxes: [{ id: 'A',
                text: 'Number of Mentions',
                  stacked: true,
                  position: 'left',
                  type: 'linear',
                  gridLines: {
                        display: false
                        },
                  ticks: {
                          beginAtZero: true
                        },
                      }, 
                  { id: 'B',
                  text: 'Sentiment Score',
                    position: 'right',
                    type: 'linear',
                    gridLines: {
                        display: false
                        },
                    ticks: {
                            beginAtZero: false
                        },
                      }
                  ],
                xAxes: [{
                  type: 'time',
                  stacked: true,
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
              }
          }

          this.redditData = {
            labels: this.redxAxis,
            datasets: [{type: 'line',
              label: 'Total Score',
              data: this.redScore,
              backgroundColor: "#34a853",
              borderColor: "#34a853",
              yAxisID: 'B',
              fill: false},
              {type: 'bar',
              label: 'Positive Mentions',
              data: this.redPosMentions,
              backgroundColor: "#46bdc6",
              yAxisID: 'A'},
              {type: 'bar',
              label: 'Negative Mentions',
              data: this.redNegMentions,
              backgroundColor: "#fbb104",
              yAxisID: 'A'},
              {type: 'bar',
              label: 'Other Mentions',
              data: this.redOtherMentions,
              backgroundColor: "#ff6d01",
              yAxisID: 'A'},
              
            ],
          };

          this.redditOptions = {
            legend: {
                display: true
              },
              // title: {
              //   display: true,
              //   text: 'Reddit Sentimnent Analysis'
              // },
              responsive: true,
              maintainAspectRatio: false,
              height: 800,
              scales: {
                yAxes: [{ id: 'A',
                text: 'Number of Mentions',
                  stacked: true,
                  position: 'left',
                  type: 'linear',
                  gridLines: {
                        display: false
                        },
                  ticks: {
                          beginAtZero: true
                        },
                      }, 
                  { id: 'B',
                  text: 'Sentiment Score',
                    position: 'right',
                    type: 'linear',
                    gridLines: {
                        display: false
                        },
                    ticks: {
                            beginAtZero: false
                        },
                      }
                  ],
                xAxes: [{
                  type: 'time',
                  stacked: true,
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
              }
          }
                      
          }

    }
  }
};
</script>

<style scoped>

</style>