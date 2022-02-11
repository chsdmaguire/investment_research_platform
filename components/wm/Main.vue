<template>
<v-container fluid>
  <v-stepper
    v-model="e6"
    vertical
    dark
    flat
    non-linear
  >
    <v-stepper-step
    editable
      :complete="e6 > 1"
      step="1"
    >
      Intro
      <!-- <small>Summarize if needed</small> -->
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card
        class="mb-12"
        height="400px"
      >
      <v-card-title>Before we start, please tell me a bit about yourself so I have a better sense of who you are. </v-card-title>
      <v-btn
        color="primary"
        @click="e6 = 2"
      >
        Let's Do it!
      </v-btn>      
      </v-card>

    </v-stepper-content>

    <v-stepper-step
    editable
      :complete="e6 > 2"
      step="2"
    >
      Personal Info
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-container
        class="mb-12"
        height="400px"
      >
      <PersonalInfo />
      
      </v-container>
      <v-btn
        color="primary"
        @click="e6 = 3"
      >
        Continue
      </v-btn>
      <v-btn text @click="e6 = 1">
        Previous
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
    editable
      :complete="e6 > 3"
      step="3"
    >
      Select an ad format and name ad unit
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="e6 = 4"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4" editable>
      View setup instructions
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="e6 = 1"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>
  </v-stepper>
  </v-container>
</template>

<script>
import PersonalInfo from "./PersonalInfo.vue"
  export default {
    data() {
        return {
            e6: 1,
        };
    },
    components: { PersonalInfo }
}
</script>

<style>

</style>