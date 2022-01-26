<template>
<v-container fluid>
    <template v-if="loading">
        <v-skeleton-loader dark type="date-picker">
        </v-skeleton-loader>
      </template>
      <template v-else>
        <v-row align="center" justify="center">
            <v-btn-toggle mandatory group v-model="newsCat" v-on:change="changeNews">
                <v-btn >Top News</v-btn>
                <v-btn>Business</v-btn>
                <v-btn>Mergers</v-btn>
                <v-btn>Crypto</v-btn>
            </v-btn-toggle>
        </v-row>
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
                                {{ ((new Date(slide.datetime * 1000)).getMonth() +1) + '/' + 
                                (new Date(slide.datetime * 1000)).getDate() + '/' +                       
                                (new Date(slide.datetime * 1000)).getFullYear()  }}</div>
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
                this.topNewsSlides = await this.$axios.$get('/api/news/top/top news');
                this.loading = false;
                },

            changeNews() {
                switch(this.newsCat) {
                    case 0:
                        this.loading = true;
                        this.topNewsSlides.length = 0;
                        this.$axios.$get('/api/news/top/top news').then(res => {
                            this,this.topNewsSlides = res
                        });
                        this.loading = false;
                        break;
                    case 1:
                        this.loading = true;
                        this.topNewsSlides.length = 0;
                        this.$axios.$get('/api/news/top/business').then(res => {
                            this,this.topNewsSlides = res
                        });
                        this.loading = false;
                        break;
                    case 2:
                        this.loading = true;
                        this.topNewsSlides.length = 0;
                         this.$axios.$get('/api/news/top/merger').then(res => {
                            this,this.topNewsSlides = res
                        });
                        this.loading = false;
                        break;
                    case 3:
                        this.loading = true;
                        this.topNewsSlides.length = 0;
                        this.$axios.$get('/api/news/top/crypto').then(res => {
                            this.topNewsSlides = res
                        });
                        this.loading = false;
                        break;
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