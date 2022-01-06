<template>
  <div class="footer-area bg-cover">
      <v-container fluid>
          <v-row>
              <v-col cols="4">
                  <div class="footer-widget">
                  <div class="footer-about wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                      <h1 class="text">
                          Flibyrd
                      </h1>
                       <p class="text">
                            Create company valuations, see past 5 years of price & historical data, compare analyst recommendation trends, analyze company metrics, track performance, and more!
                        </p>
                  <ul class="social">
                        <li><a href="\"><v-icon>mdi-facebook</v-icon></a></li>
                        <li><a href="\"><v-icon>mdi-twitter</v-icon></a></li>
                        <li><a href="\"><v-icon>mdi-instagram</v-icon></a></li>
                        <li><a href="\"><v-icon>mdi-linkedin</v-icon></a></li>
                    </ul>
                  </div>
                  </div>
              </v-col>
          </v-row>
      </v-container>
      <div class="footer-copyright">
        <v-row>
          <v-col cols="2">
            <div class="copyright copyright-content d-sm-flex justify-content-between">
              <p class="text" style=" width: 100%; text-align: center">
                © {{ new Date().getFullYear() }} — <strong>Flibyrd LLC</strong>
              </p>
            </div>
          </v-col>
          <v-col cols="2">
            <div class="copyright copyright-content d-sm-flex justify-content-between">
              <a class="text" style=" width: 100%; text-align: center" href="/about">
                About Flibyrd
              </a>
            </div> 
          </v-col>
          <v-col cols="2">
            <div class="copyright copyright-content d-sm-flex justify-content-between">
              <a class="text" style=" width: 100%; text-align: center" href="/contact">
                Contact Us
              </a>
            </div> 
          </v-col>
          <v-col cols="2">
            <div class="copyright copyright-content d-sm-flex justify-content-between">
              <a class="text" style=" width: 100%; text-align: center" href="/terms">
                Terms & Conditions
              </a>
            </div> 
          </v-col><v-col cols="2">
            <div class="copyright copyright-content d-sm-flex justify-content-between">
              <a class="text" style=" width: 100%; text-align: center" href="/privacy">
                Privacy Policy
              </a>
            </div> 
          </v-col>
        </v-row>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.bg-cover {
    background-image: url('~assets/footer-bg.svg');
    background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 50%;    
}
.footer-area {
  background-position: top center;
  position: relative;
  z-index: 0; 
  padding-top: 190px;
  }

.footer-widget {
  padding-top: 50px; }

  .footer-about .text {
  color: #fff;
  line-height: 30px;
  margin-top: 30px; }

.footer-about .social {
  margin-top: 40px; }
  .footer-about .social li {
    display: inline-block;
    margin-right: 30px; }
    .footer-about .social li a {
      font-size: 22px;
      color: #fff;
      -webkit-transition: all 0.3s ease-out 0s;
      -moz-transition: all 0.3s ease-out 0s;
      -ms-transition: all 0.3s ease-out 0s;
      -o-transition: all 0.3s ease-out 0s;
      transition: all 0.3s ease-out 0s; }
      .footer-about .social li a:hover {
        color: #FE8464; }

.footer-copyright {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 15px;
  padding-bottom: 5px; }

.copyright-content {
  padding-top: 15px;
  text-align: center; }
  .copyright-content p {
    color: #fff; }
  .copyright-content a {
    font-size: 16px;
    color: #fff;
    -webkit-transition: all 0.3s ease-out 0s;
    -moz-transition: all 0.3s ease-out 0s;
    -ms-transition: all 0.3s ease-out 0s;
    -o-transition: all 0.3s ease-out 0s;
    transition: all 0.3s ease-out 0s; }
    .copyright-content a:hover {
      color: #FE8464; }


</style>