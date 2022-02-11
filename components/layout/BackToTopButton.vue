<template>
  <transition name="fade">
    <a
      v-if="scrolled"
      class="back-to-top"
      href="#"
    >
      <v-icon color="white">mdi-chevron-up</v-icon>
    </a>
  </transition>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      scrolled: false
    }
  },
  mounted () {
    // Sticky header
    $(window).on('scroll', () => {
      this.scrolled = $(window).scrollTop() > 600
    })
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.back-to-top i.v-icon.v-icon {
  color: white
}

.back-to-top {
  font-size: 20px;
  color: #fff !important;
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  background: -webkit-linear-gradient(left, #361cc1 0%, #2e82ef 100%);
  background: -o-linear-gradient(left, #361cc1 0%, #2e82ef 100%);
  background: linear-gradient(to right, #361cc1 0%, #2e82ef 100%);
  text-align: center;
  z-index: 99;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;}
  .back-to-top:hover {
    text-decoration: none;
  }
</style>
