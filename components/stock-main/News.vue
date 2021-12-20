<template>
<v-container fluid>
   <v-sheet class="mx-auto" elevation="1" rounded>
     <h5>Top News</h5>
   <v-slide-group v-model="model" show-arrows>
      <v-slide-item v-for="(slide, i) in topNewsSlides" :key="i">
        <v-card class="ma-4" height="175" width="250" :href="slide.url" target="_blank">
          <v-img :src="slide.image" height="75" width="300"></v-img>
              <v-card-text>
                  <v-row
                    align="center"
                    class="mx-0"
                  >
                  <div>{{ slide.headline }} </div>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div>{{ slide.source }}</div>
                    </v-col>
                    <v-col>
                      {{ (new Date(slide.datetime * 1000)).getDate() + '/' + 
                      ((new Date(slide.datetime * 1000)).getMonth() +1) + '/' + 
                      (new Date(slide.datetime * 1000)).getFullYear()  }}
                    </v-col>
                  </v-row>
              </v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</v-container>
</template>


<script>
  export default {
      data () {
          return {
              model: null,
              topNewsSlides: [],

          }
      },

          methods: {
        async getTopNews() {
            const topNews = await this.$axios.$get('/api/news/top/top news')
            this.topNewsSlides = topNews
             },
    },

    mounted() {
        this.getTopNews();
;
    }

  }
</script>

<style>

</style>