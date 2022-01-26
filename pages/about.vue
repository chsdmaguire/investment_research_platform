<template>
<v-container>
<div style="margin-top:-350px">
   <Intro />
</div>
   
 <div style="margin-top:-350px">
   <TheAbout />
 </div>
    

</v-container>

</template>

<script>
export default {
}
</script>

<style scoped>
.line {
  background: -webkit-linear-gradient(#fe8464 0%, #fe6e9a 100%);
  background: -o-linear-gradient(#fe8464 0%, #fe6e9a 100%);
  background: linear-gradient(#fe8464 0%, #fe6e9a 100%);
  width: 150px;
  height: 5px;
    margin-left: 46%;
  margin-bottom: 10px !important;
   }

 .splash {
  height: 90vh;
  text-align: center;
  display: flex;
}

h1 {
  font-size: 50px;
}

p {
  font-size: 25px;
} 

</style>