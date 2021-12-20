<template>
<v-app>
  <v-container fluid class="splash">
    <NavBar />
    <div class="splash-centered mx-auto my-auto">
      <h1 style="padding-top:5vh" class=py-6>About <span class="primary-text">Flibyrd</span></h1>
      <p style="width:50vw;text-align:center;padding-top:5vh">
        Flibyrd is a free online tool for analyzing publicly traded stocks. The purpose of this application is to provide comprehensive financial analysis in a simple and elegant method for the average investor. It’s capable of producing complicated valuations usually done by Wall Street professionals to provide insight into a company’s fundamental worth. It can usually be difficult, and often expensive, to get access to this type of data. Flibyrd is meant to help even the playing field with large players like hedge funds so normal retail investors can make informed decisions when they decide to invest, without spending hours doing their own calculations. 
</p>
      <!-- <p style="width:50vw;text-align:center">  Flibyrd features additional features as well, giving it its unique and exciting environment. Users can create a free account and join an online community. Members can share ideas and discuss current market trends in an online environment. It also povides data on the US economy and the most popular cyrptocurrencies.
</p> -->


    </div>
  </v-container>
</v-app>
</template>

<script>
export default {

}
</script>

<style scoped>

.splash {
  background-color: white;
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