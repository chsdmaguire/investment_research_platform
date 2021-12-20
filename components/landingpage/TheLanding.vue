<template>
<v-app>
  <div class="header-hero">
      <v-container>
          <v-row class="justify-content-center">
              <v-col cols="6">
                  <div class="header-hero-content" data-wow-duration="1.3s" data-wow-delay="0.5s">
                      <h2 class=" wow fadeInUp">
                          Welcome to Flibyrd
                      </h2>
                      <h3 class="header-sub-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s">
                        The Most Comprehensive, Open Platform for Investors
                      </h3>
                      <a href="/stocks" class="main-btn">Get Started</a>
                  </div>
              </v-col>
              <v-col cols="6">
                  <div class="header-hero-image text-center wow fadeIn" data-wow-duration="1.3s" data-wow-delay="1.4s">
                      <img src="~/assets/header-computer.png" alt="hero">
                  </div>
              </v-col>
          </v-row>
      </v-container>
      <Particles
        id="particles-1"
        class="particles"
        url="particles.json"
      />
  </div>
</v-app>
</template>

<script>
import Particles from 'particles.vue'
import Vue from 'vue'
Vue.use(Particles)
import 'animate.css'

export default {

}
</script>

<style scoped>
.header-hero {
background-position: bottom center; 
background-image: url('~assets/banner-bg.svg');
padding-top: 130px; 
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 130%; }

.header-hero-content {
    padding-top: -130px; 
    font-size: 38px;
    font-weight: 300;
    color: #fff;
    text-align: center;
}

  @media (max-width: 767px) {
    .header-hero-content {
      padding-top: 80px; } }
  .header-hero-content .header-sub-title {
    font-size: 38px;
    font-weight: 300;
    color: #fff; }
    @media (max-width: 767px) {
      .header-hero-content .header-sub-title {
        font-size: 24px; } }
    @media only screen and (min-width: 576px) and (max-width: 767px) {
      .header-hero-content .header-sub-title {
        font-size: 30px; } }
  .header-hero-content .header-title {
    font-size: 38px;
    font-weight: 700;
    color: #fff; }
    @media (max-width: 767px) {
      .header-hero-content .header-title {
        font-size: 24px; } }
    @media only screen and (min-width: 576px) and (max-width: 767px) {
      .header-hero-content .header-title {
        font-size: 30px; } }
  .header-hero-content .text {
    color: #fff;
    margin-top: 30px; }
  .header-hero-content .main-btn {
    margin-top: 40px; }

.main-btn {
  position: relative;
  display: inline-block;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  padding: 0 25px;
  font-size: 16px;
  line-height: 48px;
  border-radius: 8px;
  border: 0;
  color: #fff;
  cursor: pointer;
  z-index: 20;
  -webkit-transition: all 0.4s ease-out 0s;
  -moz-transition: all 0.4s ease-out 0s;
  -ms-transition: all 0.4s ease-out 0s;
  -o-transition: all 0.4s ease-out 0s;
  transition: all 0.4s ease-out 0s;
  background: -webkit-linear-gradient(left, #33c8c1 0%, #119bd2 50%, #33c8c1 100%);
  background: -o-linear-gradient(left, #33c8c1 0%, #119bd2 50%, #33c8c1 100%);
  background: linear-gradient(to right, #33c8c1 0%, #119bd2 50%, #33c8c1 100%);
  background-size: 200%; }

.header-hero-image {
  padding-top: -130px;
; }
  .header-hero-image img {
    max-width: 650px; }
    @media (max-width: 767px) {
      .header-hero-image img {
        max-width: 100%; } }
  @media (max-width: 767px) {
    .header-hero-image {
      padding-top: 30px; } }

  .particles {
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; 
  z-index: -1; }

</style>