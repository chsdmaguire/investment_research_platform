<template>
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
</template>

<script>
export default {
    data() {
        return {
            kids: false,
            id: 1,
            dependents: [{firstName: '', lastName: '', age: ''}],
            wantsMoreKids: false,
            slider1: 1,

        }
    },
    methods: {
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
        }
    }

}
</script>

<style>

</style>