<template>
  <v-container fluid>
      <v-container>
          <Intro />
      </v-container>
    <!-- <v-container>
        <Main />
      </v-container> -->
  </v-container>
</template>

<script>
import Intro from '~/components/wm/Intro';
import Main from '~/components/wm/Main';
export default {
    components: {Intro, Main}
}
</script>

<style>

</style>