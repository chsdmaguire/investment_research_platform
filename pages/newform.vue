<template>
<v-container class="mt-16">
  <v-carousel v-model="carouselModel">
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>Do you own any real estate?</h2>
        </v-row>
        <v-row justify="center" align="center" class="mt-12">
          <v-col cols="3">
            <v-card class="mx-auto rounded-circle" 
                width="120" height="120" color="indigo" @click.stop="upOne">
                <v-row justify="center" align="center">
                <h3 class="mt-12">Yes</h3>
                </v-row>
                </v-card>
            </v-col>
            <v-col cols="3">
            <v-card class="mx-auto rounded-circle" @click.stop="skipThree"
                width="120" height="120" color="indigo">
                <v-row justify="center" align="center">
                <h3 class="mt-12">No</h3>
                </v-row>
                </v-card>
            </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>How many properties do you own?</h2>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="4">
            <v-text-field
              v-model="reCount"
              hide-details
              single-line
              type="number"
            />
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="1">
            <v-btn @click="goBack">Back</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="updatePropCount">Continue</v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>Please enter current market value for each property?</h2>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-row align="center" justify="center" v-for="(n, idx) in properties" :key="idx">
                <v-col cols="4">
                  <v-text-field hide-details label="property" v-model="n.name"></v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field
                      v-model="n.value"
                      hide-details
                      single-line
                      type="number"
                      label="market value"
                    />
                </v-col>
              </v-row>
          </v-col>     
        </v-row>
        <v-row justify="center" align="center" class="mt-10">
          <v-col cols="1">
            <v-btn @click="goBack">Back</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="upOne">Continue</v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>Do you own a checkings account?</h2>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="3">
            <v-card class="mx-auto rounded-circle" 
                width="170" height="170" color="indigo" @click.stop="upOne">
                <v-row justify="center" align="center">
                <h3 class="mt-16">Yes</h3>
                </v-row>
            </v-card>
            </v-col>
            <v-col cols="3">
            <v-card class="mx-auto rounded-circle" @click.stop="skipTwo"
                width="170" height="170" color="indigo">
                <v-row justify="center" align="center">
                <h3 class="mt-16">No</h3>
                </v-row>
            </v-card>
            </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item>
      <v-row justify="center" align="center" class="mt-12">
          <h2>What is the current balance of your checkings?</h2>
        </v-row>
        <v-row justify="center" align="center" class="mt-6">
          <v-col cols="2">
              <v-text-field
                v-model="checkings"
                hide-details
                single-line
                type="number"
                label="checkings"
              />
          </v-col>
        </v-row>
         <v-row justify="center" align="center" class="mt-10">
          <v-col cols="1">
            <v-btn @click="goBack">Back</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="updateCheckings">Continue</v-btn>
          </v-col>
        </v-row>
    </v-carousel-item>
     <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>Do you own a savings account?</h2>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="3">
            <v-card class="mx-auto rounded-circle" 
                width="170" height="170" color="indigo" @click.stop="upOne">
                <v-row justify="center" align="center">
                <h3 class="mt-16">Yes</h3>
                </v-row>
            </v-card>
            </v-col>
            <v-col cols="3">
            <v-card class="mx-auto rounded-circle" @click.stop="skipTwo"
                width="170" height="170" color="indigo">
                <v-row justify="center" align="center">
                <h3 class="mt-16">No</h3>
                </v-row>
            </v-card>
            </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item>
      <v-row justify="center" align="center" class="mt-12">
          <h2>What is the current balance of your savings?</h2>
        </v-row>
        <v-row justify="center" align="center" class="mt-6">
          <v-col cols="2">
              <v-text-field
                v-model="savings"
                hide-details
                single-line
                type="number"
                label="checkings"
              />
          </v-col>
        </v-row>
         <v-row justify="center" align="center" class="mt-10">
          <v-col cols="1">
            <v-btn @click="goBack">Back</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="updateCheckings">Continue</v-btn>
          </v-col>
        </v-row>
    </v-carousel-item>
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>Do you own any of of the following types of IRAs?</h2>
        </v-row>
        <v-row justify="center" align="center" class="mt-5" 
        v-for="index in listOfIras.length / 4" :key="index">
        <v-col md="3" sm="6" xs="12" v-for="(item, idx) in listOfIras.slice((index -1) *4, (index -1)*4 + 4)" :key="idx">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 4" @click="updateIraModel(item)" 
              :color="iraModel.includes(item) ? 'deep-purple accent-4' : '#ffffff' ">
              <v-row align="center" justify="center">
                <v-card-title v-text="item"></v-card-title>
              </v-row>            
              </v-card>
            </template>
          </v-hover>
        </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-1">
          <v-col cols="1">
            <v-btn @click="goBack">Back</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="updateIraList">Continue</v-btn>
          </v-col>
        </v-row>            
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>Please enter current market value for each IRA</h2>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-row align="center" justify="center" v-for="(n, idx) in iras" :key="idx">
                <v-col cols="4">
                  <v-text-field hide-details label="property" v-model="n.type"></v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field
                      v-model="n.value"
                      hide-details
                      single-line
                      type="number"
                      label="market value"
                    />
                </v-col>
              </v-row>
          </v-col>     
        </v-row>
        <v-row justify="center" align="center" class="mt-10">
          <v-col cols="1">
            <v-btn @click="goBack">Back</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="updateIras">Continue</v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>Do you own any of of the following types of CDs?</h2>
        </v-row>
        <v-row justify="center" align="center" class="mt-5" 
        v-for="index in listOfCds.length / 4" :key="index">
        <v-col md="3" sm="6" xs="12" v-for="(item, idx) in listOfCds.slice((index -1) *4, (index -1)*4 + 4)" :key="idx">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 4" @click="updateCdModel(item)" 
              :color="cdModel.includes(item) ? 'deep-purple accent-4' : '#ffffff' ">
              <v-row align="center" justify="center">
                <v-card-title v-text="item"></v-card-title>
              </v-row>            
              </v-card>
            </template>
          </v-hover>
        </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-1">
          <v-col cols="1">
            <v-btn @click="goBack">Back</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="updateCdList">Continue</v-btn>
          </v-col>
        </v-row>            
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>Please enter info for each CD</h2>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-row align="center" justify="center" v-for="(n, idx) in cds" :key="idx">
                <v-col cols="3">
                  <v-text-field hide-details label="Type" v-model="n.type"></v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field
                      v-model="n.deposit_amount"
                      hide-details
                      single-line
                      type="number"
                      label="Deposit Amount"
                    />
                </v-col>
                <v-col cols="2">
                  <v-text-field v-model="n.deposit_date" label="Deposit Date"
                  hide-details single-line type="date"></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-autocomplete v-model="n.term" :items="cdTerms" label="Term"
                  rounded filled dense class="mb-n10"></v-autocomplete> 
                </v-col>
                <v-col cols="1">
                  <v-text-field hide-details single-line type="number" label="APY" append-icon="mdi-percent"
                  v-model="n.apy" />
                </v-col>
              </v-row>
          </v-col>     
        </v-row>
        <v-row justify="center" align="center" class="mt-10">
          <v-col cols="1">
            <v-btn @click="goBack">Back</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn @click="updateCds">Continue</v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item>
      <v-sheet>
        <v-row justify="center" align="center" class="mt-12">
          <h2>Do you have any of the following employer-sponsored retirement plans?</h2>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="3">
            <v-card class="mx-auto rounded-circle" 
                width="170" height="170" color="indigo" @click.stop="upOne">
                <v-row justify="center" align="center">
                <h3 class="mt-16">Yes</h3>
                </v-row>
            </v-card>
            </v-col>
            <v-col cols="3">
            <v-card class="mx-auto rounded-circle" @click.stop="skipTwo"
                width="170" height="170" color="indigo">
                <v-row justify="center" align="center">
                <h3 class="mt-16">No</h3>
                </v-row>
            </v-card>
            </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</v-container>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      carouselModel: 0,
      reCount: 1,
      properties: [],
      propRows: null,
      checkings: 0,
      savings: 0,
      iras: [],
      cds: [],
      mmfs: [],
      brokerages: [],
      compRetPlans: [],
      collegePlans: [],
      gifts: 0,
      arts: 0,
      vehicles: [],
      businesses: [],
      cash: 0,
      esops: [],
      bonds: [],
      otherAssets: [],
      listOfIras: ['Roth IRA', 'Traditional IRA', 'SIMPLE IRA', 'SEP IRA', 'Spousal IRA', 'Inherited IRA', 'Group IRA', 
      'Rollover IRA'],
      iraModel: [],
      listOfCds: ['Traditional CD', 'Bump-up CD', 'Step-up CD', 'Liquid CD', 'Zero-coupon CD', 
      'Callable CD', 'Brokered CD', 'High-yield CD', 'Jumbo CD', 'IRA CD', 'Add-on CD', 'Foreign Currency CD'],
      cdModel: [],
      cdTerms: [],
    }
  },
  methods: {
    async addCdTerms() {
      for(var i = 0; i < 121; i++) {
        this.cdTerms.push( i+ ' month')
      }
    },
    upOne() {
      this.carouselModel += 1;
    },
    goBack() {
      this.carouselModel -= 1;
    },
    skipThree() {
      this.carouselModel += 3
    },
    skipTwo() {
      this.carouselModel += 2
    },
    updatePropCount() {
      for(var i = 0; i < this.reCount; i++) {
        const count = Number(i)+1
        this.properties.push({name: 'property# ' + count, value: 0})
      }
      this.carouselModel += 1
    }, 
    updateRe() {
      this.$store.commit('fpTool/clientProperties', this.properties);
      this.carouselModel += 1
    }, 
    updateCheckings() {
      this.$store.commit('fpTool/clientCheckings', this.checkings);
      this.carouselModel += 1
    },
    updateSavings() {
      this.$store.commit('fpTool/clientSavings', this.savings);
      this.carouselModel += 1
    },
    updateIraModel(val) {
      if(!this.iraModel.includes(val)) {
        this.iraModel.push(val);
      } else {
        const index = this.iraModel.indexOf(val)
        this.iraModel.splice(index, 1);
      }
    },
    updateIraList() {
      if(this.iraModel.length > 0) { 
        this.iraModel.forEach(item => {
          this.iras.push({type: item, value: 0})
        })
      };
      this.carouselModel += 1
    },
    updateCdModel(val) {
      if(!this.cdModel.includes(val)) {
        this.cdModel.push(val);
      } else {
        const index = this.cdModel.indexOf(val)
        this.cdModel.splice(index, 1);
      }
    },
    updateCdList() {
      if(this.cdModel.length > 0) { 
        this.cdModel.forEach(item => {
          this.cds.push({type: item, deposit_amount: 0, term: 0, deposit_date: 0, apy: 0})
        })
      };
      this.carouselModel += 1
    },
    updateIras() {
      this.$store.commit('fpTool/clientIra', this.iras);
      this.carouselModel += 1
    },
    updateCds() {
      this.$store.commit('fpTool/clientCDs', this.cds);
      this.carouselModel += 1
    },
    updateMmfs() {
      this.$store.commit('fpTool/clientMmfs', this.mmfs);
      this.carouselModel += 1
    },
    updateBrokerage() {
      this.$store.commit('fpTool/clientBrokerage', this.brokerages);
      this.carouselModel += 1
    },
    updateRetirements() {
      this.$store.commit('fpTool/compRetirementPlans', this.compRetPlans);
      this.carouselModel += 1
    },
    updateRetirements() {
      this.$store.commit('fpTool/compRetirementPlans', this.compRetPlans);
      this.carouselModel += 1
    },
    updateCollegePlans() {
      this.$store.commit('fpTool/client529s', this.collegePlans);
      this.carouselModel += 1
    },
    updateGifts() {
      this.$store.commit('fpTool/clientGifts', this.gifts);
      this.carouselModel += 1
    },
    updateArt() {
      this.$store.commit('fpTool/clientArt', this.arts);
      this.carouselModel += 1
    },
    updateVehicles() {
      this.$store.commit('fpTool/clientVehicles', this.vehicles);
      this.carouselModel += 1
    },
    updateCash() {
      this.$store.commit('fpTool/clientCash', this.cash);
      this.carouselModel += 1
    },
    updateEsops() {
      this.$store.commit('fpTool/clientEsops', this.esops);
      this.carouselModel += 1
    },
    updateBonds() {
      this.$store.commit('fpTool/clientBonds', this.bonds);
      this.carouselModel += 1
    },
    updateOtherAssets() {
      this.$store.commit('fpTool/clientOtherAssets', this.otherAssets);
      this.carouselModel += 1
    },
  },
  mounted() {
    this.addCdTerms()
  }
}
</script>

<style scoped>

</style>