<template>
  <v-container fluid>
           <div class="animated-title">
  <div class="text-top">
    <div>
      <span>Flibyrd</span>
    </div>
  </div>
  <div class="text-bottom">
    <div>Financial planning made quick and simple</div>
  </div>
</div>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>


@keyframes showTopText {
  0% { transform: translate3d(0, 100%, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
@keyframes showBottomText {
  0% { transform: translate3d(0, -100%, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
.animated-title {
  color: #222;
  font-family: Roboto, Arial, sans-serif;
  height: 90vmin;
  left: 50%;
  position: absolute;
  top: 20%;
  transform: translate(-50%, -50%);
  width: 100vmin;
}
.animated-title > div {
  height: 50%;
  overflow: hidden;
  position: absolute;
  width: 100%;
}
.animated-title > div div {
  font-size: 50px;
  padding: 2vmin 0;
  position: absolute;
}
.animated-title > div div span {
  display: block;
}
.animated-title > div.text-top {
  border-bottom: 1vmin solid #000;
  top: 0;
}
.animated-title > div.text-top div {
  animation: showTopText .5s;
  animation-delay: .5s;
  animation-fill-mode: forwards;
  bottom: 0;
  transform: translate(0, 100%);
}
.animated-title > div.text-top div span:first-child {
  color: #ccc7c7;
}
.animated-title > div.text-bottom {
  bottom: 0;
}
.animated-title > div.text-bottom div {
  animation: showBottomText 1s;
  animation-delay: 1.75s;
  animation-fill-mode: forwards;
  top: 0;
  transform: translate(0, -100%);
}

.summary {
    color: #ccc7c7;
    font-size: 60px;
    font-family: Roboto, Arial, sans-serif;
    height: 50vmin;
    left: 30%;
    position: absolute;
    top: 50%;
    animation: showBottomText 1s;
  animation-delay: 2s;
  animation-fill-mode: forwards;
}

</style>