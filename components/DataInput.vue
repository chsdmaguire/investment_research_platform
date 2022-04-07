<template>
  <v-container>
      <v-card class="mx-auto mt-10" color="#121212">
          <v-row justify="center" align="center">
               <h1 class="question">{{ question }}</h1>
          </v-row>
          <template v-if="type == 'clientKids'">
          <v-row justify="center" align="center">
              <v-col cols="3">
                  <v-text-field v-model="name" />
              </v-col>
              <v-col cols="3">
                  <v-text-field v-model="age" />
              </v-col>
          </v-row>
          </template>
      </v-card>
  </v-container>
</template>

<script>
export default {
    props: { 
        question: String,
        name: String,
        age: Number,
        type: String,
    },
}
</script>

<style>

</style>