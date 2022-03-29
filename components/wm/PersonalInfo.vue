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
                <v-card
                color="#121212"
                height="200px"
                >
                <v-row justify="center" align="center" class="mt-5">
                  <h3 class="question">
                        First, let's start with some basic info so we can get to know you better.
                    </h3>
                </v-row>
                <!-- GET FULL NAME AND TITLE -->
                </v-card>
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
            <v-stepper-content step="2">
                <v-card
                color="#121212"
                height="200px"
                >
                <v-row justify="center" align="center" class="mt-5">
                    <h3 class="question">
                        When is your birthday?
                    </h3>
                </v-row>
                <v-row justify="center" align="center">
                  <v-col cols="6">
                    <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="Birthday"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-row justify="center" align="center">
                      <v-col cols="6">
                    <v-date-picker
                      ref="picker"
                      full-width
                      v-model="date"
                      :day-format="date => new Date(date).getDate()"
                      :max="new Date().toISOString().substr(0, 10)"
                      :picker-date="pickerDate"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                      </v-col>
                    </v-row>
                  </v-menu>
                  </v-col>
                  
                </v-row>
                </v-card>

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
            <v-stepper-content step="3">
              <v-card
                color="#121212"
                height="600px"
                >
                <template v-if="!status">
              <v-row justify="center" align="center" class="mt-5">
                What is your marital status?
              </v-row>
              <v-row justify="center" align="center">
                
                <v-col cols="6">
                  <v-row v-for="i, idx in relationships" :key="idx" 
                  justify="center" align="center" v-model="maritalStatus">
                    <v-btn block depressed @click="updateStatus(i)">{{ i }}</v-btn>
                  </v-row>
                </v-col>
              </v-row>
               </template>
              <template v-if="status == 'engaged' ">
                <v-row justify="center" align="center">
                  <h3>When do you plan on getting married?</h3>
                </v-row>
                <v-row justify="center" align="center">
                  <v-date-picker
                      full-width
                      v-model="statusChange"
                      :day-format="date => new Date(date).getDate()"
                      :picker-date="pickerDate2"
                      :min="new Date().toISOString().substr(0, 10)"
                      @change="saveStatus"
                    ></v-date-picker>
                </v-row>
              </template>
              <template v-if="status == 'divorced' ">
                <v-row justify="center" align="center">
                  <h3>When do get divorced?</h3>
                </v-row>
                <v-row justify="center" align="center">
                  <v-date-picker
                      full-width
                      v-model="statusChange"
                      :day-format="date => new Date(date).getDate()"
                      :picker-date="pickerDate2"
                      @change="saveStatus"
                    ></v-date-picker>
                </v-row>
              </template>
               <template v-if="status == 'widowed' ">
                <v-row justify="center" align="center">
                  <h3>When were you widowed?</h3>
                </v-row>
                <v-row justify="center" align="center">
                  <v-date-picker
                      full-width
                      v-model="statusChange"
                      :day-format="date => new Date(date).getDate()"
                      :picker-date="pickerDate2"
                      :min="new Date().toISOString().substr(0, 10)"
                      @change="saveStatus"
                    ></v-date-picker>
                </v-row>
              </template>
              </v-card>
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
              <v-card
                color="#121212"
                height="400px"
                >
                <v-row justify="center" align="center" class="mt-5">
                  <h3 class="question">
                    Do you have any dependents?
                  </h3>
                </v-row>
                <v-row justify="center" align="center" class="mt-5">
                  <v-col cols="3">
                    <v-card class="mx-auto rounded-circle" 
                     width="170" height="170" color="indigo">
                     <v-row justify="center" align="center">
                       <h3 class="mt-16">Yes</h3>
                     </v-row>
                     </v-card>
                  </v-col>
                  <v-col cols="3">
                    <v-card class="mx-auto rounded-circle" 
                     width="170" height="170" color="indigo">
                     <v-row justify="center" align="center">
                       <h3 class="mt-16">No</h3>
                     </v-row>
                     </v-card>
                     <!-- need to get each kids age & if they intend to 
                     help pay for college if so how what % -->
                  </v-col>
                </v-row>
              </v-card>
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
              <v-card
                color="#121212"
                height="400px"
                >
                <v-row justify="center" align="center">

                </v-row>
              </v-card>
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
              <v-card
                color="#121212"
                height="400px"
                >
                <v-row justify="center" align="center">

                </v-row>
              </v-card>
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
export default {
  data() {
    return {
      e1: 1,
      date: null,
      menu: false,
      pickerDate: '1995-1-1',
      pickerDate2: '',
      relationships: ['single', 'engaged', 'married', 'divorced', 'widowed'],
      maritalStatus: null,
      status: '',
      statusChange: null,
      statusChangeDate: null
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (
        this.$refs.picker.activePicker = 'YEAR',
        this.pickerDate = null
      ))
    },
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
        save (date) {
      this.$refs.menu.save(date)
      this.pickerDate = date;
    },
    saveStatus(date) {
      this.pickerDate2 = date;
      console.log(this.statusChange)
    },
    updateStatus(val) {
        this.status = val
      console.log(val)
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