<template>
      <v-container fluid class="mt-16 pt-16">
        <v-row justify="start" align="center">
          <h1 class="name">Flibyrd</h1>
        </v-row>
        <v-row justify="start" align="center">
          <h1 class="name">Automated</h1>
        </v-row>
         <v-row justify="start" align="center">
          <h1 class="name">Financial Planning (Coming Soon)</h1>
        </v-row>
        <v-row justify="start" align="center">
         <span> <div class="changer">
            <h1 v-html="paper"></h1></div></span>
        </v-row>
        <v-row>
        <!-- <v-btn
          class="primary"
          dark
          elevation="2"
          x-large
          href="wealth/planner"
        >
          Get Started
        </v-btn> -->
         
      </v-row> 
        
      </v-container>
</template>

<script>

import Intro from '~/components/wm/Intro';
import Main from '~/components/wm/Main';
export default {
    components: {Intro, Main},
    data() {
      return {
        plan: null,
        dialog: false,
        paper: '',
        timer: null,
        tileText: 'Automated Solutions For Personal Finance       ',
      }
    },
    methods: {
      stopper() {
        clearInterval(this.timer)
        this.paper = ''
      },      
      printer() {
        this.stopper() 
        let i = -1;
        this.timer = setInterval(() => {
          i++ 
            const x = i%this.tileText.length;
            this.paper += this.tileText[x]  
        }, 100)
      },

    },
    watch: {
      paper: function() {
        if(this.paper.length == this.tileText.length) {
          this.paper = ''
        }
      }
      },

    mounted() {
      this.printer()
    }
    
}
</script>

<style scoped>
.name {
  font-weight: bold;
  font-size: 400%;
}
.console-underscore {
   display:inline-block;
  position:relative;
  top:-0.14em;
  left:10px;
}

.changer {
  font-size: 200%;
  padding-left: 12px;
}

.hidden {
  opacity: 0;
}
</style>