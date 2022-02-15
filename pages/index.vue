<template>
    <v-container fluid align-items="center" >
           <!-- <v-row justify="start" align="center">
                    <h1 class="name">Flibyrd</h1>
                </v-row>
                <v-row justify="start" align="center">
                    <h1 class="name">Automated Solutions</h1>
                </v-row>
                <v-row justify="start" align="center">
                <h1 class="name">For Personal Wealth Management</h1>
                <v-row justify="start" align="center">
                <span> <div class="changer">
                    <h1 v-html="paper"></h1></div></span>
                </v-row>
                </v-row> -->
    <v-parallax dark :src="require('~/assets/bgHero.jpg')" height="350" class="mx-n16 mt-n16">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12">
              <h1 class="display-2 font-weight-bold mb-4">Flibyrd</h1>
              <h1 class="font-weight-light">
                Automated Solutions to Personal Finance
              </h1>
            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="svg-border-waves text-white">
        <v-img :src="require('~/assets/borderWaves.svg')" />
      </div>
    </v-parallax>
<v-container fluid class="my-16">
    <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="space-around">
               <v-col
              cols="12"
              sm="4"
              class="text-center"
              v-for="(feature, i) in features"
              :key="i"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="card"
                  shaped
                  :elevation="hover ? 10 : 4"
                  :class="{ up: hover }"
                >
                  <v-img
                    :src="feature.img"
                    max-width="100px"
                    class="d-block ml-auto mr-auto"
                    :class="{ 'zoom-efect': hover }"
                  ></v-img>
                  <h1 class="font-weight-regular">{{ feature.title }}</h1>
                  <h4 class="font-weight-regular subtitle-1">
                    {{ feature.text }}
                  </h4>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>  
        <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="7">
              <h1 class="font-weight-light display-2 mb-4">Wealth Planning</h1>
              <h3 class="font-weight-light mb-4">
                A simple process to help you organize your financials
              </h3>
              <v-row>
                <v-col cols="12" class="d-flex align-center">
                  <v-img
                    :src="require('~/assets/icon1.svg')"
                    max-width="60px"
                    class="mr-4"
                  />
                  <p class="text-justify">
                    Organize your budget
                  </p>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-img
                    :src="require('~/assets/icon2.svg')"
                    max-width="60px"
                    class="mr-4"
                  />
                  <p class="text-justify">
                   Forecast future cash flows
                  </p>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-img
                    :src="require('~/assets/icon3.svg')"
                    max-width="60px"
                    class="mr-4"
                  />
                  <p class="text-justify">
                    Accomplish your financial goals
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="5" class="d-none d-md-flex">
              <v-img
                :src="require('~/assets/ill1.svg')"
                class="d-block ml-auto mr-auto"
                max-width="400px"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
        <!--<v-row justify="center" align="center">
            <div>
                 <h1 class="header">Everything an investor needs, <span class="colored-text">delivered in one powerful application</span></h1>
            </div>
           
        </v-row>
        <v-row justify="center" align="center">
            <h1 class="follow-up">Our knowledge. Your decisions.</h1>
        </v-row>
         <v-row justify="center" align="center">
            <v-img :src="require('~/assets/header-computer.png')" max-width="400"></v-img>
        </v-row> -->
<!-- 
            <v-parallax dark :src="require('~/assets/bghero1.jpg')">
                <v-row justify="start" align="center" class="mb-n16 pb-n16">
                    <h1 class="name">Flibyrd</h1>
                </v-row>
                <v-row justify="start" align="center" class="mt-n16 mb-n16 pb-n16">
                    <h1 class="name">Automated Solutions</h1>
                </v-row>
                <v-row justify="start" align="center" class="mt-n16">
                <span> <div class="changer">
                    <h1 v-html="paper"></h1></div></span>
                </v-row>
            </v-parallax> -->

    </v-container>
</template>        

<script>



export default {
    data() {
        return {
            paper: '',
            tileText: 'For Personal Finance       ',
            timer: null,
            check: null,
            features: [
        {
          img: require("~/assets/icon2.png"),
          title: "Stocks",
          text: "Find your favorite companies in the search bar above",
        },
        {
          img: require("~/assets/icon1.png"),
          title: "Cryptocurrenices",
          text: "See crypto price data, volume data, rankings, and more.",
        },
        {
          img: require("~/assets/icon3.png"),
          title: "Economic Data",
          text: "See dozens of different macroeconomic metrics",
        },
      ],
        }
        }, 
methods: {
    //   stopper() {
    //     clearInterval(this.timer)
    //     this.paper = ''
    //   },      
    //   printer() {
    //     if (this.check == null) {   
    //     this.stopper() 
    //     let i = -1;
       
    //     this.timer = setInterval(() => {
    //       i++ 
    //         const x = i%this.tileText.length;
    //         this.paper += this.tileText[x]  
    //     }, 100)            
    //     }

    //   },

      },
    // watch: {
    //   paper: function() {
    //     if(this.paper.length == this.tileText.length) {
    //       this.paper = '';
    //     }
    //   }
    //   },

    mounted() {

    } 
}
</script>

<style scoped>
/* 
div {
    overflow: hidden;
    white-space: nowrap;
} */
.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}

#hero {
  z-index: 0;
}
.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}

.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}

.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}

.card h1 {
  margin-bottom: 10px;
}

.zoom-efect {
  transform: scale(1.1);
}
.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
.name {
  font-weight: bold;
  font-size: 350%;
}
.header {
    font-size: 30px;
}

.changer {
  font-size: 200%;
  padding-left: 12px;
}

@media (max-width: 1300px) {
    .header {
        font-size: 25px
    }
    .follow-up {
        font-size: 15px
    }
}

@media (max-width: 800px) { 
    .header {
        font-size: 20px
    }
    .follow-up {
        font-size: 12px;
    }
}
.follow-up {
    font-size: 20px;
    color: #b3b3b3;
    margin-top: 1%;
    margin-bottom: 2%;
}

@media (max-width: 660px) { 
    .header {
        font-size: 15px
    }
    .follow-up {
        font-size: 10px;
    }
}

@media (max-width: 550px) { 
    .header {
        font-size: 12px
    }
    .follow-up {
        font-size: 8px;
    }
}



.colored-text {
    color: #1f6aed
}
</style>