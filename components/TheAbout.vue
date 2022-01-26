<template>
  <section class="about-area">
    <div class="about-shape">
      <img src="~/assets/about-shape.svg" alt="shape">
    </div>
    <v-container>

      <v-row>
        <v-col cols="6">
          <div class="fadeInRight about-content wow" data-wow-duration="1s" data-wow-delay="0.5s">
            <div class="section-title">
              <div class="line"> </div>
                <h3 class="title text-center">
                  More Than Just Equities
                </h3> 
                <p class="text"> 
                  Whether you're a crypto trader or crypto holder, Flibyrd has the right data for you. Check out our cryptocurrency page.
                </p>
            <a href="/crypto" class="started-btn"> Crypto</a>
          </div>
        </div>              
        </v-col>
        <v-col cols="6">
          <div class="fadeInRight about-content wow" data-wow-duration="1s" data-wow-delay="0.5s">
            <div class="about-image text-center wow">
                <img src="~/assets/analyze.jpg" alt="title" class="about-image">
              </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <div class="fadeInLeft about-content wow" data-wow-duration="1s" data-wow-delay="0.5s">
            <div class="about-image text-center wow">
                <img src="~/assets/learn.jpg" alt="title" class="about-image">
              </div>
          </div>
        </v-col>        
        <v-col cols="6">
          <div class="fadeInLeft about-content wow" data-wow-duration="1s" data-wow-delay="0.5s">
            <div class="section-title">
              <div class="line"> </div>
                <h3 class="title text-center">
                  Knowledge is Power
                </h3> 
                <p class="text"> 
                  We believe in empowering people. Understanding the underlying economic trends is critical to investing. Check out our economics page to learn more.
                </p>
            <a href="/economic" class="started-btn">Economics</a>
          </div>
        </div>              
        </v-col>

      </v-row>

      <v-row>
        <v-col cols="6">
          <div class="fadeInRight about-content wow" data-wow-duration="1s" data-wow-delay="0.5s">
            <div class="section-title">
              <div class="line"> </div>
                <h3 class="title text-center">
                  Leveling the Playing Field
                </h3> 
                <p class="text"> 
                  Individual investors deserve the same access to quality investment insights as the large institutions. We aim to empower these individuals.
                </p>
            <a href="/equities" class="started-btn">Get Started</a>
          </div>
        </div>              
        </v-col>
        <v-col cols="6">
          <div class="fadeInRight about-content wow" data-wow-duration="1s" data-wow-delay="0.5s">
            <div class="about-image text-center wow">
                <img src="~/assets/collaborate.jpg" alt="title" class="about-image">
              </div>
          </div>
        </v-col>
      </v-row>




    </v-container>
  </section>
</template>

<script>
import 'animate.css'

export default {
  data () {
    return {}
  }
}
</script>

<style scoped>


.about-area {
  /* font-family: "Roboto", sans-serif; */
  position: relative;
  z-index: 5;
  padding-top: 20px; }

.title {
  font-family: "Montserrat", sans-serif;
}

.about-shape {
  position: absolute;
  top: 0;
  left: 0;
  width: 35%;
  height: 100%;
  z-index: -1; }
  .about-shape img {
    width: 100%; }
  @media (max-width: 767px) {
    .about-shape {
      display: none; } }

.about-content {
  /* max-width: 480px; */
  margin-top: 10px }
.text {
    margin-top: 15px; }
  .started-btn {
    position: relative;
    display: inline-block;
    font-weight: 400;
    border-radius: 8px;
    color: #fff;
    background: -webkit-linear-gradient(left, #fe8464 0%, #fe6e9a 50%, #fe8464 100%);
    background: -o-linear-gradient(left, #fe8464 0%, #fe6e9a 50%, #fe8464 100%);
    background: linear-gradient(to right, #fe8464 0%, #fe6e9a 50%, #fe8464 100%);
    background-size: 300%;
    height: 50px;
    margin-left: 30%; 
    line-height: 50px;
    padding: 0 35px;
    margin-top: 40px; }
    .about-content .started-btn:hover {
      background-position: right center; }

.section-title .line {
  background: -webkit-linear-gradient(#fe8464 0%, #fe6e9a 100%);
  background: -o-linear-gradient(#fe8464 0%, #fe6e9a 100%);
  background: linear-gradient(#fe8464 0%, #fe6e9a 100%);
  width: 150px;
  float: center;
  margin-left: 40%;
  height: 5px;
  margin-bottom: 10px !important; }

.section-title .title {
  font-family: "Montserrat", sans-serif;
  font-size: 80px;
  font-weight: 900;
  line-height: 42px; }
  @media (max-width: 767px) {
    .section-title .title {
      font-size: 50px; } }
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
      font-size: 16px; 
      font-family: "Montserrat", sans-serif;} }

.section-title .title {
  font-size: 32px;
  font-family: "Montserrat", sans-serif;
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

.about-image {
  width: 90%;
}
</style>