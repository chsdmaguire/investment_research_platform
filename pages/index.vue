<template>
<v-app>
  <TheSpinner />
      <div>
    <TheNavbar />
    <TheLanding />      
    </div>
<div>
   <TheFeatures />  
</div>    
<div>
   <TheAbout />
 
</div>
<div>
  <Cookies />
</div>
  <Footer />
</v-app>
</template>

<script>
import Footer from '~/components/navigation/Footer'
import TheNavbar from '~/components/navigation/TheNavbar'
import TheLanding from '~/components/landingpage/TheLanding'
import TheAbout from '~/components/landingpage/TheAbout'
import TheSpinner from '~/components/landingpage/TheSpinner'
import TheFeatures from '~/components/landingpage/TheFeatures'
import Cookies from '~/components/landingpage/Cookies'

import 'animate.css'
export default {
  components: {
    TheAbout, TheSpinner, Footer, TheNavbar, TheLanding, TheFeatures, Cookies
    },
computed: {
      height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 220
          case 'sm': return 400
          case 'md': return 500
          case 'lg': return 600
          case 'xl': return 800
        }
      },
    },
}
</script>

<style scoped>

html {
  scroll-behavior: smooth;
}

</style>