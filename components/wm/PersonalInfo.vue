<template>
  <v-container
    class="mx-auto my-16"
  >
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
    </v-card-title>

    <v-window v-model="step" show-arrows>
            <template v-slot:prev="{ on, attrs }">
                <v-btn
                    color="success"
                    v-bind="attrs"
                    v-on="on"
                >Previous</v-btn>
            </template>
            <template v-slot:next="{ on, attrs }">
                <v-btn
                    color="info"
                    v-bind="attrs"
                    v-on="on"
                >Next</v-btn>
            </template>
<!-- AGE -->
      <v-window-item :value="1">
          <v-row class="my-16">
              <v-col cols="8">
                <v-slider v-model="age"
                :thumb-size="50"
                thumb-label="always"
                min="1" max="120" >
                    <template v-slot:prepend>
                    <v-icon
                        color="indigo"
                        @click="decrement"
                    >
                        mdi-minus
                    </v-icon>
                    </template>

                    <template v-slot:append>
                    <v-icon
                        color="indigo"
                        @click="increment"
                    >
                        mdi-plus
                    </v-icon>
                    </template>         
                </v-slider>
            </v-col>
          </v-row>

      </v-window-item>


      <v-window-item :value="2">
      </v-window-item>

      <v-window-item :value="3">
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

  </v-container>
</template>

<script>
export default {
    data() {
        return {
            step: 1,
            age: 30
        }
    },
    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'What is your current age?'
          case 2: return 'Do you own or rent?'
          case 3: return 'What is your marital status?'
          case 3: return 'What is your marital status?'
        }
      },
    },
      methods: {
          decrement() {
              this.age --
          },
          increment() {
              this.age ++
          }
      }
}
</script>

<style>

</style>