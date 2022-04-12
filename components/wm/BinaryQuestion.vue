<template>
  <v-container>
    <v-card class="mx-auto mt-10" color="#121212">
      <v-row justify="center" align="center">
        <h1 class="question">{{ question }}</h1>
      </v-row>
      <v-row justify="center" align="center">
        <v-col md="4" sm="8">
          <v-card color="indigo" @click.stop="answeredYes">
            <h4>Yes</h4>
          </v-card>
        </v-col>
        <v-col md="4" sm="8">
          <v-card color="green" @click.stop="answeredNo">
            <h4>No</h4>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
    props: { 
        question: String,
    },
  data() {
    return {

    }
  },
  methods: {
    answeredYes() {
      this.$emit('childYes')
    },
    answeredNo() {
      this.$emit('childNo')
    },
  },
}
</script>

<style>

</style>