<template>
<v-container fluid>
    <template v-if="loading">
        <v-skeleton-loader dark type="date-picker">
        </v-skeleton-loader>
      </template>
      <template v-else>
        <v-row v-for="(slide, i) in topNewsSlides" :key="i" class="py-2" align="center" justify="center">
            <v-card height="100%" width="100%" :href="slide.url" target="_blank">
                <v-row justify="center" align="center">
                    <v-col cols="12" md="8" sm="7" xs="12">
                        <p class="font-weight-bold pt-1 majorHeadline">
                            {{ slide.headline }}
                        </p>
                        <p class="font-weight-regular pt-1 text--secondary summary">
                            {{ slide.summary }}
                        </p>
                        <div class="d-flex align-center">
                            <div class="pl-2 dateSource">{{ slide.source }} ·  
                                {{ formatDate(Date.now() - new Date(slide.datetime).getTime()) }}
                                </div>
                            </div>           
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-col lg="3" md="4" sm="5" xs="12">
                        <v-img
                        class="ml-auto my-auto rounded-lg"
                            :src="slide.image"
                            :aspect-ratio="16 / 9"
         
                            :width="imageSize"
                        ></v-img>
                    </v-col> 
                </v-row>
            </v-card>
        </v-row>
      </template>

</v-container>
</template>

<script>
  export default {
      data () {
          return {
              newsCat: null,
              topNewsSlides: [],
              loading: true,
          }
      },
      computed: {
        imageSize() {
            switch(this.$vuetify.breakpoint.name) {
                case 'xs': return 500;
            }
        }
        },

          methods: {
            async getTopNews() {
                const ticker = this.$route.params.ticker.toUpperCase();
                this.topNewsSlides = await this.$axios.get(`/news/stock/${ticker}`);
                this.loading = false;

                },

                formatDate(val) {
                    const newVal = Math.floor(val / 60000);
                    if(newVal < 60) {
                        return newVal + " minutes ago"
                    } else if (newVal > 60 && newVal < 1440) {
                        return Math.floor(newVal / 60) + " hours ago"
                    } else {
                        return Math.floor(newVal / 1440 ) + " days ago"
                    }
                }
    },

    mounted() {
        this.getTopNews();
;
    }

  }
</script>

<style scoped>

 @media screen and (max-width: 600px) {
    .majorHeadline {
        font-size: 12px;
        text-align: center;
    }
    .summary {
        font-size: 10px;
    }
    .dateSource {
        font-size: 8px;
    }
}
 @media screen and (max-width: 437) {
    .majorHeadline {
        font-size: 11px;
    }
    .summary {
        font-size: 9px;
    }
    .dateSource {
        font-size: 7px;
    }
}
</style>