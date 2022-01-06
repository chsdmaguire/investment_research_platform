<template>

  <div class="toolbar">
      <v-layout row>
          <v-flex full-width>
            <v-toolbar flat dense class="toolbar">
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-row align-content="center" justify="space-between">
                        <v-col >
                    <v-btn text href="/">Flibyrd</v-btn>
                    <v-btn text href="/stocks" >Equities</v-btn>
                    <v-btn text href="/economic">Economy</v-btn>
                    <v-btn text href="/crypto">Cryptocurrency</v-btn>
                    <v-btn text href="/education">Education</v-btn>                            
                        </v-col>
                        
                    </v-row>

                </v-toolbar-items>
            </v-toolbar>
            </v-flex>
      </v-layout>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
        }
}
</script>

<style scoped>

.toolbar {
    position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  margin: auto;
  color: #5137e4;
}

</style>