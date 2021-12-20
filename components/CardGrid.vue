<template>
  <div>
      <v-container fluid class="mt-8">
          <v-layout row wrap justify-center>
              <v-flex sm10 md10 lg10>
    <v-row class="mt-5" v-for="index in data.length / 6" :key="index">
      <v-col :cols="numCols" v-for="(item, idx) in data.slice((index - 1) * 6, (index - 1) * 6 + 6)" :key="idx">
        <v-card class="card-item" :href="item.link" max-height="200" 
         target="_blank" elevation="6">
            <v-row align="center" class="justify-center mx-0" >
                <h3 class="secondary-text">{{ item.text }}</h3>
            </v-row>
            <v-row align="left" class="justify-left mx-0 my-12">
                <v-chip :color="item.color" text-color="white"> {{ item.tag }} </v-chip>
            </v-row>
            
        
        </v-card>
      </v-col>
    </v-row>    
              </v-flex>
          </v-layout>
      
      </v-container>

  </div>
</template>

<script>
export default {
  name: 'CardGrid',
  props: ['data'],
  computed: {
      numCols () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 6
          case 'sm': return 4
          case 'md': return 3
          case 'lg': return 2
          case 'xl': return 2
        }
      },
    },
}
</script>

<style scoped>

.card-item {
  width: 200px;
  height: 200px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.card-item:hover {
  transform: translateY(-5px);
  background-color: rgb(228, 242, 255);
}

.card-body {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>