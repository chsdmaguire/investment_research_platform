<template>
<v-container fluid>
    <v-row justify="center" align="center">
         <h1>How To <span class="primary-text">Invest</span></h1>
    </v-row>
    <v-row justify="center" align="center" class="mb-4">
        <h4>Our Answers to Your Questions</h4>
    </v-row>
    <!-- <v-row justify="space-between" align="center">
        <v-col :cols="numCols" v-for="(item, idx) in cardAssets" :key="idx">
            <v-card class="mx-auto jump ma-3 text-center justify-center align-center" :href="item.link" max-height="400" max-width="400">
            <v-img :src="item.img" aspect-ratio="1" width="100" class=" mx-auto text-center justify-center align-center"></v-img>
            <v-card-title class="my-2 justify-center" primary-title>
               {{ item.title }}
            </v-card-title>
            </v-card>
        </v-col>
    </v-row> -->
    <v-row justify="start" v-for="(item, idx) in cardAssets" :key="idx" class="ml-12">
      <v-container class="mb-4">
        <v-card :href="item.link" class="jump" dark color="rgba(255, 0, 0, 0.0)" flat>
          <v-container>
             <v-row>
           <h2 class="mb-4 primary-text"> {{ item.title }} </h2>
        </v-row>
        <v-row>
          <h4  class="mb-6 font-weight-light">{{ item.description }}</h4>
        </v-row>
        <v-row class="mb-3">
          <v-divider></v-divider>
        </v-row>
          </v-container>
         
        </v-card>
      
      </v-container>
        
    </v-row>
</v-container>
</template>

<script>

export default {
 data() {
    return {
        cardAssets: [
            {title: "What's On An Income Statement?", img: require('~/assets/education/is.jpeg'), link: "/edu/is", description: "A simple guide to understanding the different line items seen on the Income Statement"},
            {title: "What's On A Balance Sheet?", img: require('~/assets/education/bs.jpeg'), link: "/edu/bs", description: "A simple guide to understanding the different line items seen on the Balance Sheet"},
            {title: "What's On A Cash Flow Statement?", img: require('~/assets/education/cf.jpeg'), link: "/edu/cf", description: "A simple guide to understanding the different line items seen on the Cash Flow Statement"},
            {title: "What is the Time Value of Money?", img: require('~/assets/education/tvm.jpeg'), link: "/edu/tvm", description: "Understand the mathematical concept behind the phrase 'A bird in hand is worth two in the bush'"},
            {title: "How Do You Value a Company?", img: require('~/assets/education/value.jpeg'), link: "/edu/value", description: "How do wall street analysts actually decide what a company is worth?"},
            {title: "Introduction to Bitcoin & Blockchain", img: require('~/assets/education/btc.jpeg'), link: "/edu/btc", description: "Bitcoin? Blockchain? A plain english explanation to understand the hype"},
            {title: "Understanding Cryptocurrency & its Implications", img: require('~/assets/education/crypto.jpeg'), link: "/edu/crypto", description: "Cryptocurrency has become quite popular, but why is it so important and what industries can it impact?"},
            {title: "How to Interpret Economic Data", img: require('~/assets/education/econ.jpeg'), link: "/edu/econ", description: "Find explanations for the economic metrics provided in our website"},
          
        ]
    };
  },

  computed: {
      numCols() {
          switch (this.$vuetify.breakpoint.name) {
          case 'sm': return 12
          case 'md': return 3
          case 'lg': return 3
          }
      }
  }

}

</script>

<style scoped>
.primary-text {
  color: #007bff;
}

.secondary-text {
  color: grey;
}

.white-text {
  color: white;
}

.light-text {
  font-weight: 150;
}

.splash {
  height: 100vh;
}

.splash-centered {
height: 10vh;
text-align: center;
}


  .jump {
transition: all 0.4s ease-out;
cursor: pointer;
  }

.jump:hover {
transform: translateY(-20px);
}

</style>