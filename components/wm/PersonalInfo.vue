<template>
  <v-container>
     <v-stepper v-model="e1" non-linear>
            <v-stepper-header>
            <v-stepper-step step="1" editable>
                Intro
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step editable step="2">
                Age
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step editable step="3">
                Status
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="4">
                Dependents
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="5">
                Residence
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="6">
                Goals
            </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <Client ref="client" />
                <v-btn
                color="primary"
                @click="commitClient"
                >
                Continue
                </v-btn>

                <v-btn text @click="moveDown">
                Back
                </v-btn>
              </v-stepper-content>
            <v-stepper-content step="2">
               <Bday ref="bday"/>

                <v-btn
                color="primary"
                @click="commitBday"
                >
                Continue
                </v-btn>
                <v-btn text @click="moveDown">
                Back
                </v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
             <MaritalStatus ref="maritalStatus"/>
              <v-btn
                color="primary"
                @click="moveUp"
                >
                Continue
                </v-btn>

                <v-btn text @click="moveDown">
                Back
                </v-btn>
            </v-stepper-content>
            <v-stepper-content step="4">
            <Dependents ref="dependents"/>
              <v-btn
                color="primary"
                @click="moveUp"
                >
                Continue
                </v-btn>

                <v-btn text @click="moveDown">
                Back
                </v-btn>
            </v-stepper-content>
            <v-stepper-content step="5">
              <Residence ref="residence"/>
              <v-btn
                color="primary"
                @click="moveUp"
                >
                Continue
                </v-btn>

                <v-btn text @click="moveDown">
                Back
                </v-btn>
            </v-stepper-content>
            <v-stepper-content step="6">
              <Goals ref="goals"/>
              <v-btn
                color="primary"
                @click="moveUp"
                >
                Continue
                </v-btn>

                <v-btn text @click="moveDown">
                Back
                </v-btn>
            </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
  </v-container>
</template>

<script>
import Client from './pInfo/Client.vue';
import Bday from './pInfo/Bday.vue';
import MaritalStatus from './pInfo/MaritalStatus.vue';
import Dependents from './pInfo/Dependents.vue';
import Residence from './pInfo/Residence.vue';
import Goals from './pInfo/Goals.vue';
export default {
  components: { Client, Bday, MaritalStatus, Dependents, Residence, Goals },
  data() {
    return {
      e1: 1,
    }
  },
  methods: {
        moveUp() {
            if(this.e1 < 6) {
                this.e1 += 1
            } else {
                this.e1 = 6
            }
        },
        moveDown() {
            if(this.e1 > 1) {
                this.e1 -= 1
            }
        },
        commitClient() {
          this.$store.commit('fpTool/clientTitle', this.$refs.client.title);
          this.$store.commit('fpTool/clientFirstName', this.$refs.client.firstName);
          this.$store.commit('fpTool/clientLastName', this.$refs.client.lastName);
          this.e1 += 1
        },
        commitBday() {
          this.$store.commit('fpTool/clientBirthday', this.$refs.bday.pickerDate);
          this.e1 += 1
        },
        commitMarStatus() {
          this.$store.commit('fpTool/clientMaritalDate', this.$refs.maritalStatus.maritalStatus);
        },
        commitDeps() {

        },
        commitResidence() {

        },
        commitGoals() {
          
        }
    }
}
</script>

<style scoped>
.v-stepper {
    background-color: #121212 !important;
}
.v-stepper-content {
    background-color: #121212 !important;
}

.v-stepper-header {
    background-color: #121212 !important;
}
</style>