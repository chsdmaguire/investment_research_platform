<template>
<div class="wrapper">
  <div class="one">One</div>
  <div class="two">Two</div>
  <div class="three">Three</div>
  <div class="four">Four</div>
  <div class="five">Five</div>
  <div class="six">Six</div>
</div>


</template>

<script>
export default {
    data() {
        return {
            x: 0,
            y: 0
        }
    },
//     methods: {
//     showCoordinates(e) {
//       this.x = e.offsetX;
//       this.y = e.offsetY;
//     }
//   },
//     mounted() {
//         var canvas = document.getElementById("myCanvas");
//         var ctx = canvas.getContext("2d");

//         var X = 0;
//         var Y = 0;
//         var width = window.innerWidth;
//         var height = window.innerWidth;
//         ctx.fillStyle = "#121827";
//         ctx.fillRect(X, Y, width, height);      
//     }
}


</script>

<style scoped>
.wrapper {
    display: grid;
    
}
.main-chart {
    width: 90vw;
    height: 80vh;  
    text-align: center;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    /* margin-right: auto; */
    display: block;
    overflow: hidden;
    float: left;
}

.toolbar {
    width: 5vw;
    float:left;
    height: 80vh;  
    text-align: center;
    padding-left: 0;
    padding-right: 0;
    /* margin-left: auto;
    margin-right: auto; */
    display: block;
    background-color: white;
}

.bottom-bar {
    width: 95vw;
    display: block;
    background-color: red;
    height: 5vh;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
.one {
  grid-column: 1 / 3;
  grid-row: 1;
  background-color: white;
}
.two {
  grid-column: 2 / 4;
  grid-row: 1 / 3;
  background-color: white;
}
.three {
  grid-column: 1;
  grid-row: 2 / 5;
  background-color: white;
}
.four {
  grid-column: 3;
  grid-row: 3;
}
.five {
  grid-column: 2;
  grid-row: 4;
}
.six {
  grid-column: 3;
  grid-row: 4;
}

</style>