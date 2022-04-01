<template>
  <v-cotainer>
      <v-card
        color="#121212"
        height="200px"
        >
        <v-row justify="center" align="center" class="mt-5">
          <h3 class="question">
                First, let's start with some basic info so we can get to know you better.
            </h3>
        </v-row>
        <v-row justify="center" align="center" class="mt-5">
          <v-col cols="3">
            <v-text-field label="Title"
            v-model="title" outlined>
            </v-text-field>
          </v-col>
          <v-col cols="3">
              <v-text-field label="First Name"
              v-model="firstName" outlined>
              </v-text-field>
          </v-col>
          <v-col cols="3">
              <v-text-field label="Last Name"
              v-model="lastName" outlined>
              </v-text-field>
          </v-col>
                
        </v-row>
        <!-- GET FULL NAME AND TITLE -->
        </v-card>
  </v-cotainer>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      firstName: '',
      lastName: '',
    }
  }
}
</script>

<style>

</style>