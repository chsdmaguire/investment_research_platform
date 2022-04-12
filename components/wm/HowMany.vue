<template>
  <v-container>
    <v-card class="mx-auto mt-10" color="#121212">
      <v-row justify="center" align="center">
        <h1 class="question">{{ question }}</h1>
      </v-row>
      <v-row justify="center" align="center">
          <v-col cols="2">
              <v-text-field v-model="num" />
          </v-col>  
      </v-row>
      <v-row justify="center" align="center">
          <v-col cols="2">
              <v-btn @click="goBackwards">Go Back</v-btn>
          </v-col>
          <v-col cols="2">
              <v-btn @click="updateNumber">Continue</v-btn>
          </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props:{
    question: String
  },
  data() {
    return {
        num: 0,
    }
  },
  methods: {
      goBackwards() {
          this.$emit('childBackwards')
      },
      updateNumber() {
          this.$emit('childForwards')
      }
  }
}
</script>

<style>

</style>