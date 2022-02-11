<template>
<v-container fluid>
  <v-row align="center" justify="center"> 
    <v-col cols="12">
   <Intro />
    </v-col>
  </v-row>

    <v-row align="center" justify="center"> 
    <v-col cols="12">
   <TheAbout />
    </v-col>
  </v-row>
</v-container>

</template>

<script>
import Intro from '~/components/about/Intro';
import TheAbout from '~/components/about/TheAbout';
export default {
  components: {TheAbout, Intro}
}
</script>

<style scoped>
.line {
  background: -webkit-linear-gradient(#fe8464 0%, #fe6e9a 100%);
  background: -o-linear-gradient(#fe8464 0%, #fe6e9a 100%);
  background: linear-gradient(#fe8464 0%, #fe6e9a 100%);
  width: 150px;
  height: 5px;
    margin-left: 46%;
  margin-bottom: 10px !important;
   }

 .splash {
  height: 90vh;
  text-align: center;
  display: flex;
}

h1 {
  font-size: 50px;
}

p {
  font-size: 25px;
} 

</style>