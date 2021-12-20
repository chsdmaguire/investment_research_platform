<template>
  <header>
    <div class="navbar-area" :class="{ sticky: scrolled }">
      <nav class="navbar navbar-expand">
        <v-row>
          <v-col cols="12">
            <div class="navbar-nav"> 
              <div class="nav-item">
                <a class="page-scroll" href="\" >Flibyrd</a> 
                <a class="page-scroll" href="/stocks">Equities</a>
                <a class="page-scroll" href="/crypto">Cryptocurrency</a>
                <a class="page-scroll" href="/economic">Economy</a>
                <a class="page-scroll" href="/education">Education</a>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- <div class="navbar-btn">
          <a class="main-btn" href="#pricing">Login</a>
        </div> -->
      </nav>
    </div>

    

  </header>
  
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      scrolled: false,
      drawer: false,
      group: null,
    }
  },
  computed: {
  },
  mounted () {
    // Sticky header
    $(window).on('scroll', () => {
      this.scrolled = $(window).scrollTop() > 20
    })
  },
}
</script>

<style>
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

.navbar-area {
  position: absolute;
  text-align: center;
  padding-right: 15%;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  margin: auto;
  flex-direction: column;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s; }

  @media (max-width: 767px) {
  .navbar-nav .nav-item a {
    font-size: 10px; 
    font-weight: 200;} }

.sticky {
  position: fixed;
  z-index: 99;
  background-color: #fff;
  -webkit-box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05);
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s; }
  .sticky .navbar {
    padding: 10px 0; } 

.navbar {
  padding: 20px 0;
  text-align: center;
  border-radius: 5px;
  position: relative;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s; }
 
.navbar-brand {
  padding: 0; }


  .navbar-nav .nav-item a {
    font-size: 20px;
    margin-left: 10%;
    font-weight: 400;
    color: #fff;
    text-align: center;
    -webkit-transition: all 0.3s ease-out 0s;
    -moz-transition: all 0.3s ease-out 0s;
    -ms-transition: all 0.3s ease-out 0s;
    -o-transition: all 0.3s ease-out 0s;
    transition: all 0.3s ease-out 0s;
    padding: 10px 0;
    position: relative;
    font-family: "Poppins", sans-serif; }

        
.navbar-btn .main-btn {
  position: relative;
  height: 45px;
  line-height: 45px;
  background: -webkit-linear-gradient(left, #fe8464 0%, #fe6e9a 50%, #fe8464 100%);
  background: -o-linear-gradient(left, #fe8464 0%, #fe6e9a 50%, #fe8464 100%);
  background: linear-gradient(to right, #fe8464 0%, #fe6e9a 50%, #fe8464 100%);
  background-size: 200%; }
  .navbar-btn .main-btn:hover {
    color: #fff;
    background-position: right center; }

.sticky .navbar-nav .nav-item a {
  color: #2E2E2E; }

.sticky .navbar-nav .nav-item.active > a, .sticky .navbar-nav .nav-item:hover > a {
  color: #361CC1; }

/* .main-btn {
  display: inline-block;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0 25px;
  font-size: 16px;
  line-height: 48px;
  border-radius: 8px;
  border: 0;
  color: #fff;
  cursor: pointer;
  z-index: 5;
  -webkit-transition: all 0.4s ease-out 0s;
  -moz-transition: all 0.4s ease-out 0s;
  -ms-transition: all 0.4s ease-out 0s;
  -o-transition: all 0.4s ease-out 0s;
  transition: all 0.4s ease-out 0s;
  background: -webkit-linear-gradient(left, #33c8c1 0%, #119bd2 50%, #33c8c1 100%);
  background: -o-linear-gradient(left, #33c8c1 0%, #119bd2 50%, #33c8c1 100%);
  background: linear-gradient(to right, #33c8c1 0%, #119bd2 50%, #33c8c1 100%);
  background-size: 200%; }
  .main-btn:hover {
    color: #fff; */
</style>