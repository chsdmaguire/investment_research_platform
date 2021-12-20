<template>
    <v-container class="mt-8">
        <v-row class="justify-center">
            <v-col cols="10">
                <div class="section-title text-center">
                    <div class="line m-auto" />
                    <h3 class="title">Everything an investor needs, <span> Delivered in one powerful application</span></h3>
                </div>
                
            </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col class="lg-4 md-7 sm-8"  v-for="(feature, index) in features"
            :key="index">
            <div class="single-services text-center wow fadeIn"  data-wow-duration="1s" data-wow-delay="0.2s"> 
              <div class="services-icon">
                 <img class="shape" src="~/assets/services-shape.svg" alt="shape">
                <v-icon class="ml-n1">
                  {{ feature.icon }}
                </v-icon>
              </div>
              <div class="services-content">
                 <h4 class="services-title">
                  <a href="/stocks">{{ feature.name }}</a>
                </h4>
                <p class="text">
                  {{ feature.content }}
                </p>
                 <a class="more" href="/stocks">Learn More <v-icon>mdi-chevron-right</v-icon></a>
              </div>
            </div>
 
          </v-col>
        </v-row>
    </v-container>
</template>

<script>
import 'animate.css'

export default {
  data() {
    return {
      features: [{
        icon: 'mdi-briefcase',
        name: 'Discover',
        content: 'Find new investment opportunities free and simple.'
      }, {
        icon: 'mdi-cog-outline',
        name: 'Analyze',
        content: 'Automated financial modeling including discounted cash flow valuations & trading comps.'
      }, {
        icon: 'mdi-flash-outline',
        name: 'Collaborate',
        content: 'Learn from others or share your personal insights online.'
      }]
    }
  }
}
</script>

<style scoped>
 .services-area {
  padding-top: 120px;
}

.services-content {
  margin-top: 30px;
}
.single-services {
  background-color: #fff;
  -webkit-box-shadow: 0px 5px 30px 0px rgba(167, 167, 167, 0.16);
  -moz-box-shadow: 0px 5px 30px 0px rgba(167, 167, 167, 0.16);
  box-shadow: 0px 5px 30px 0px rgba(167, 167, 167, 0.16);
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
  margin-top: 30px;
  padding: 50px 30px;
  border: 2px solid transparent;
  border-radius: 8px; }
  @media (max-width: 767px) {
    .single-services {
      padding: 20px 20px 30px; } }
  .single-services .services-icon {
    display: inline-block;
    position: relative; }
    .single-services .services-icon img {
      -webkit-transition: all 0.4s ease-out 0s;
      -moz-transition: all 0.4s ease-out 0s;
      -ms-transition: all 0.4s ease-out 0s;
      -o-transition: all 0.4s ease-out 0s;
      transition: all 0.4s ease-out 0s; }
    .single-services .services-icon .shape-1 {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%); }
    .single-services .services-icon i {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      font-size: 34px;
      color: #fff; }
  .single-services .services-content .services-title a {
    font-family: "Montserrat", sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: #2E2E2E;
    -webkit-transition: all 0.3s ease-out 0s;
    -moz-transition: all 0.3s ease-out 0s;
    -ms-transition: all 0.3s ease-out 0s;
    -o-transition: all 0.3s ease-out 0s;
    transition: all 0.3s ease-out 0s; }
    @media only screen and (min-width: 992px) and (max-width: 1199px) {
      .single-services .services-content .services-title a {
        font-size: 24px; } }
    @media (max-width: 767px) {
      .single-services .services-content .services-title a {
        font-size: 20px; } }
    .single-services .services-content .services-title a:hover {
      color: #361CC1; }
  .single-services .services-content .text {
    font-family: "Roboto", sans-serif;
    margin-top: 30px; }
    @media (max-width: 767px) {
      .single-services .services-content .text {
        font-family: "Roboto", sans-serif;
        margin-top: 20px; } }
  .single-services .services-content .more {
    margin-top: 30px;
    font-size: 16px;
    font-weight: 400;
    color: #2E2E2E;
    -webkit-transition: all 0.3s ease-out 0s;
    -moz-transition: all 0.3s ease-out 0s;
    -ms-transition: all 0.3s ease-out 0s;
    -o-transition: all 0.3s ease-out 0s;
    transition: all 0.3s ease-out 0s; }
    .single-services .services-content .more i {
      margin-left: 10px; }
    .single-services .services-content .more:hover {
      color: #361CC1; }
  .single-services:hover {
    border-color: #FE7A7B; }
    .single-services:hover .services-icon .shape {
      -webkit-transform: rotate(25deg);
      -moz-transform: rotate(25deg);
      -ms-transform: rotate(25deg);
      -o-transform: rotate(25deg);
      transform: rotate(25deg); }

  .section-title {
    padding-bottom: 40px;
  }

.section-title .line {
  background: -webkit-linear-gradient(#fe8464 0%, #fe6e9a 100%);
  background: -o-linear-gradient(#fe8464 0%, #fe6e9a 100%);
  background: linear-gradient(#fe8464 0%, #fe6e9a 100%);
  width: 150px;
  height: 5px;
  margin: auto;
  margin-bottom: 10px !important; }

.section-title .title {
  font-family: "Montserrat", sans-serif;
  font-size: 38px;
  font-weight: 700;
  line-height: 42px; }
  @media (max-width: 767px) {
    .section-title .title {
      font-size: 20px; } }
  @media only screen and (min-width: 576px) and (max-width: 767px) {
    .section-title .title {
      font-size: 30px; } }
  .section-title .title span {
    font-weight: 400;
    display: contents; }


.section-title .sub-title {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #361CC1;
  text-transform: uppercase; }
  @media (max-width: 767px) {
    .section-title .sub-title {
      font-size: 16px; } }

.section-title .title {
  font-family: "Montserrat", sans-serif;
  font-size: 32px;
  padding-top: 10px; }
  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    .section-title .title {
      font-size: 30px; } }
  @media (max-width: 767px) {
    .section-title .title {
      font-size: 24px; } }
  .section-title .title span {
    font-weight: 400;
    display: contents; } 
</style>