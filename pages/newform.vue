<template>
<v-container class="mt-16">
  <v-carousel v-model="carouselModel">
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>Do you own any real estate?</h2>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="3">
            <v-card class="mx-auto rounded-circle" 
                width="170" height="170" color="indigo" @click.stop="yesRe">
                <v-row justify="center" align="center">
                <h3 class="mt-16">Yes</h3>
                </v-row>
                </v-card>
            </v-col>
            <v-col cols="3">
            <v-card class="mx-auto rounded-circle" @click.stop="noRe"
                width="170" height="170" color="indigo">
                <v-row justify="center" align="center">
                <h3 class="mt-16">No</h3>
                </v-row>
                </v-card>
            </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>How many properties do you own?</h2>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="4">
            <v-text-field
              v-model="reCount"
              hide-details
              single-line
              type="number"
            />
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="1">
            <v-btn @click="noRe">Back</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="yesRe">Continue</v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>Please enter current market value for each property?</h2>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="4">
            <v-text-field hide-details v-model="properties.name">{{"property# " + n}} </v-text-field>
          </v-col>
          <v-col cols="4">
              <v-text-field
                v-model="properties.value"
                hide-details
                single-line
                type="number"
              />
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="1">
            <v-btn @click="noRe">Back</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="yesRe">Continue</v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>Do you own a checkings account?</h2>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="3">
            <v-card class="mx-auto rounded-circle" 
                width="170" height="170" color="indigo" @click.stop="yesRe">
                <v-row justify="center" align="center">
                <h3 class="mt-16">Yes</h3>
                </v-row>
                </v-card>
            </v-col>
            <v-col cols="3">
            <v-card class="mx-auto rounded-circle" @click.stop="noRe"
                width="170" height="170" color="indigo">
                <v-row justify="center" align="center">
                <h3 class="mt-16">No</h3>
                </v-row>
                </v-card>
            </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</v-container>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      carouselModel: 0,
      reCount: 1,
      properties: []
    }
  },
  methods: {
    yesRe() {
      this.carouselModel += 1;
      console.log(this.properties);
      console.log(this.reCount)
    },
    
    noRe() {
      this.carouselModel += 3
    }
  }
}
</script>

<style scoped>

</style>