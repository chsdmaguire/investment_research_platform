<template>
  <v-container>
      <v-carousel v-model="model" :show-arrows="false" hide-delimiters>
          <v-carousel-item>
              <v-row justify="center" align="center" class="mt-12">
                  <h3>Approximately how much do you spend each month on utilities?</h3>
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="4">
                    <v-text-field label="utilites" v-model="utilities" outlined>
                    </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                    <v-col cols="1">
                        <v-btn class="secondary" @click="backCarousel">
                        Back
                        </v-btn>
                    </v-col>
                    <v-col cols="1">
                        <v-btn class="primary" @click="upCarousel">
                        Next
                        </v-btn>
                    </v-col>                       
                </v-row>
          </v-carousel-item>
          <v-carousel-item>
              <v-row justify="center" align="center" class="mt-12">
                  <h3>Approximately how much do you spend each month on groceries?</h3>
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="4">
                    <v-text-field label="groceries" v-model="groceries" outlined>
                    </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                    <v-col cols="1">
                        <v-btn class="secondary" @click="backCarousel">
                        Back
                        </v-btn>
                    </v-col>
                    <v-col cols="1">
                        <v-btn class="primary" @click="upCarousel">
                        Next
                        </v-btn>
                    </v-col>                       
                </v-row>
          </v-carousel-item>
          <v-carousel-item>
              <v-row justify="center" align="center" class="mt-12">
                  <h3>Approximately how much do you spend each year on travel?</h3>
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="4">
                    <v-text-field label="travel" v-model="travel" outlined>
                    </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                    <v-col cols="1">
                        <v-btn class="secondary" @click="backCarousel">
                        Back
                        </v-btn>
                    </v-col>
                    <v-col cols="1">
                        <v-btn class="primary" @click="upCarousel">
                        Next
                        </v-btn>
                    </v-col>                       
                </v-row>
          </v-carousel-item>
          <v-carousel-item>
              <v-row justify="center" align="center" class="mt-12">
                  <h3>Approximately how much do you spend each month on eating out?</h3>
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="4">
                    <v-text-field label="restaurants" v-model="restaurants" outlined>
                    </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                    <v-col cols="1">
                        <v-btn class="secondary" @click="backCarousel">
                        Back
                        </v-btn>
                    </v-col>
                    <v-col cols="1">
                        <v-btn class="primary" @click="upCarousel">
                        Next
                        </v-btn>
                    </v-col>                       
                </v-row>
          </v-carousel-item>
          <v-carousel-item>
              <v-row justify="center" align="center" class="mt-12">
                  <h3>Approximately how much do you spend each month on shopping/general merchandise?</h3>
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="4">
                    <v-text-field label="merchandise" v-model="shopping" outlined>
                    </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                    <v-col cols="1">
                        <v-btn class="secondary" @click="backCarousel">
                        Back
                        </v-btn>
                    </v-col>
                    <v-col cols="1">
                        <v-btn class="primary" @click="upCarousel">
                        Next
                        </v-btn>
                    </v-col>                       
                </v-row>
          </v-carousel-item>
          <v-carousel-item>
              <v-row justify="center" align="center" class="mt-12">
                  <h3>Approximately how much do you spend each month on shopping/general merchandise?</h3>
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="4">
                    <v-text-field label="merchandise" v-model="shopping" outlined>
                    </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                    <v-col cols="1">
                        <v-btn class="secondary" @click="backCarousel">
                        Back
                        </v-btn>
                    </v-col>
                    <v-col cols="1">
                        <v-btn class="primary" @click="upCarousel">
                        Next
                        </v-btn>
                    </v-col>                       
                </v-row>
          </v-carousel-item>
          <v-carousel-item>
              <v-row justify="center" align="center" class="mt-12">
                  <h3>Approximately how much do you spend each month on the rest of your expenses?</h3>
              </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="4">
                    <v-text-field label="expenses" v-model="others" outlined>
                    </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                    <v-col cols="1">
                        <v-btn class="secondary" @click="backCarousel">
                        Back
                        </v-btn>
                    </v-col>
                    <v-col cols="1">
                        <v-btn class="primary" @click="upCarousel">
                        Next
                        </v-btn>
                    </v-col>                       
                </v-row>
          </v-carousel-item>
      </v-carousel>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            model: 0,
            utilities: 0,
            groceries: 0,
            travel: 0,
            shopping: 0,
            restaurants: 0,
            others: 0,
        }
    },
    methods: {
        upCarousel() {
            this.mainJob += 1
        },
        backCarousel() {
            this.mainJob -= 1
        },
    }
}
</script>

<style>

</style>