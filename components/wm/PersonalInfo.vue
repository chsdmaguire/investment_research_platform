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
<v-container>
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
                    v-model="statusChange"
                    :day-format="date => new Date(date).getDate()"
                    :picker-date="pickerDate2"
                    :min="new Date().toISOString().substr(0, 10)"
                    @change="saveStatus"
                ></v-date-picker>
            </v-row>
            </template>
            </v-card>
  </v-container>              
            </v-stepper-content>
            <v-stepper-content step="4">
<v-container>
      <v-card
        color="#121212"
        height="400px"
        >
        <v-container v-if="!kids">
        <v-row justify="center" align="center" class="mt-5">
            <h3 class="question">
            Do you have any dependents?
            </h3>
        </v-row>
        <v-row justify="center" align="center" class="mt-5">
            <v-col cols="3">
            <v-card class="mx-auto rounded-circle" 
                width="170" height="170" color="indigo" @click.stop="hasKids">
                <v-row justify="center" align="center">
                <h3 class="mt-16">Yes</h3>
                </v-row>
                </v-card>
            </v-col>
            <v-col cols="3">
            <v-card class="mx-auto rounded-circle" @click.stop="noKids"
                width="170" height="170" color="indigo">
                <v-row justify="center" align="center">
                <h3 class="mt-16">No</h3>
                </v-row>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
        <v-container v-if="kids === true">
            <v-row justify="center" align="center">
                <h3>Please Enter Info for All Dependents</h3>
            </v-row>
            <v-row justify="center" align="center">
                <v-row v-for="(i, idx) in dependents" :key="idx"  justify="center" align="center">
                    <v-col cols="3">
                        <v-text-field label="First Name"
                        v-model="i.firstName" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field label="Last Name"
                        v-model="i.lastName" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-text-field label="Age"
                        v-model="i.age" outlined>
                        </v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-btn @click="removeRow(i)"><v-icon>mdi-minus</v-icon></v-btn>
                    </v-col>
                </v-row>
               
                <!-- need a thing to ask if they intend on having any more kids in the near future -->
            </v-row>
             <v-row justify="center" align="center">
                    <v-btn block @click="addRow"><v-icon>mdi-plus</v-icon></v-btn>
                </v-row>
            <v-row justify="center" align="center" class="mt-5">
                <h3>Do you intend on having any more children in the future?</h3>
            </v-row>
            <v-row justify="center" align="center">
                <v-switch v-model="wantsMoreKids" :label="`${wantsMoreKids.toString()}`"></v-switch>
            </v-row>
            <v-row>
                <v-btn color="secondary" @click.stop="goBack">Cancel</v-btn>
            </v-row>
            <v-container v-if="wantsMoreKids">
                <v-row justify="center" align="center">
                <h3>How many more kids do you want/expect to have in the next 5 years?</h3>
            </v-row>
            <v-row justify="center" align="center">
                <v-slider
                v-model="slider1"
                thumb-color="red"
                thumb-label="always"
                min="1"
                max="5"
                ></v-slider>
            </v-row>
            </v-container>
            <!-- need a thing if person says no to ask if they intend on having children in the next 5 years -->
        </v-container>
       <v-container v-if="kids === 'no'">
           <v-row justify="center" align="center">
               <h3>Do you intend on having children within the next 5 years?</h3>
           </v-row>
           <v-row justify="center" align="center" class="mt-5">
            <v-col cols="3">
            <v-card class="mx-auto rounded-circle" 
                width="170" height="170" color="indigo" @click.stop="wantsKids">
                <v-row justify="center" align="center">
                <h3 class="mt-16">Yes</h3>
                </v-row>
                </v-card>
            </v-col>
            <v-col cols="3">
            <v-card class="mx-auto rounded-circle" @click.stop="notWantKids"
                width="170" height="170" color="indigo">
                <v-row justify="center" align="center">
                <h3 class="mt-16">No</h3>
                </v-row>
                </v-card>
            </v-col>
        </v-row>
       </v-container>
    </v-card>
  </v-container>
            </v-stepper-content>
            <v-stepper-content step="5">
              <Residence ref="residence"/>
              <v-btn
                color="primary"
                @click="commitResidence"
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
                @click="commitGoals"
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
import Residence from './pInfo/Residence.vue';
import Goals from './pInfo/Goals.vue';
export default {
  components: { Client, Bday, Residence, Goals },
  data() {
    return {
      e1: 1,
      statusChange: null,
      relationships: ['single', 'engaged', 'married', 'divorced', 'widowed'],
      pickerDate2: '',
      status: '',
      maritalStatus: null,
      kids: false,
      id: 1,
      dependents: [{firstName: '', lastName: '', age: ''}],
      wantsMoreKids: false,
      slider1: 1,
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
        },saveStatus(date) {
        this.pickerDate2 = date;
        this.$store.commit('fpTool/clientMaritalDate', date);
        this.e1 = 4;
        },
        updateStatus(val) {
            this.status = val;
            this.$store.commit('fpTool/clientStatus', val);     
            if(val === 'single') {
              this.e1 = 4
            }
        },
        commitClient() {
          this.$store.commit('fpTool/clientTitle', this.$refs.client.title);
          this.$store.commit('fpTool/clientFirstName', this.$refs.client.firstName);
          this.$store.commit('fpTool/clientLastName', this.$refs.client.lastName);
          this.e1 = 2;
        },
        commitBday() {
          this.$store.commit('fpTool/clientBirthday', this.$refs.bday.pickerDate);
          this.e1 = 3;
        },
        commitResidence() {
           this.$store.commit('fpTool/clientResState', this.$refs.Dependents.state);
           this.$store.commit('fpTool/clientResZip', this.$refs.Dependents.zCode);
           this.e1 = 6;
        },
        commitGoals() {
           this.$store.commit('fpTool/clntGls', this.$refs.goals.clientGoals);
           this.$router.push('secondwm')
        },
        hasKids() {
            this.kids = true
        },
        addRow() {
            this.id += 1;
            this.dependents.push({firstName: '', lastName: '', age: ''})
        },
        removeRow(i) {
            this.dependents.splice(i, 1)
        },
        goBack() {
            this.kids = false;
        },
        noKids() {
            this.kids = 'no'
        },
        wantsKids() {
            this.wantsMoreKids = true;
            this.$store.commit('fpTool/clientWantsKids')
        },
        notWantKids() {
          this.e1 = 5
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