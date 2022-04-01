<template>
  <v-container>
        <v-card
            color="#121212"
            height="400px"
            >
            <v-row justify="center" align="center">
              <h3>Where is your primary Residence?</h3>
            </v-row>
            <v-row justify="center" align="center">
              <v-col cols="4">
                <v-text-field label="state" v-model="state" outlined></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field label="zip code" v-model="zCode" outlined></v-text-field>
              </v-col>
            </v-row>
        </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      state: '',
      zCode: ''
    }
  }
}
</script>

<style>

</style>