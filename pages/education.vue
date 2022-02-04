<template>
<v-container fluid>
    <v-row justify="center" align="center">
         <h1>How To <span class="primary-text">Invest</span></h1>
    </v-row>
    <v-row justify="center" align="center">
        <h4>Our Answers to Your Questions</h4>
    </v-row>
    <v-row justify="space-between" align="center">
        <v-col :cols="numCols" v-for="(item, idx) in cardAssets" :key="idx">
            <v-card class="mx-auto jump ma-3 text-center justify-center align-center" :href="item.link" max-height="400" max-width="400">
            <v-img :src="item.img" aspect-ratio="1" width="100" class=" mx-auto text-center justify-center align-center"></v-img>
            <v-card-title class="my-2 justify-center" primary-title>
               {{ item.title }}
            </v-card-title>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>

export default {
 data() {
    return {
        cardAssets: [
            {title: "What's On An Income Statement?", img: require('~/assets/education/is.jpeg'), link: "/edu/is"},
            {title: "What's On A Balance Sheet?", img: require('~/assets/education/bs.jpeg'), link: "/edu/bs"},
            {title: "What's On A Cash Flow Statement?", img: require('~/assets/education/cf.jpeg'), link: "/edu/cf"},
            {title: "What is the Time Value of Money?", img: require('~/assets/education/tvm.jpeg'), link: "/edu/tvm"},
            {title: "How Do You Value a Company?", img: require('~/assets/education/value.jpeg'), link: "/edu/value"},
            {title: "Introduction to Bitcoin & Blockchain", img: require('~/assets/education/btc.jpeg'), link: "/edu/btc"},
            {title: "Understanding Cryptocurrency & its Implications", img: require('~/assets/education/crypto.jpeg'), link: "/edu/crypto"},
            {title: "How to Interpret Economic Data", img: require('~/assets/education/econ.jpeg'), link: "/edu/econ"},
          
        ]
    };
  },

  computed: {
      numCols() {
          switch (this.$vuetify.breakpoint.name) {
          case 'sm': return 12
          case 'md': return 5
          case 'lg': return 5
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