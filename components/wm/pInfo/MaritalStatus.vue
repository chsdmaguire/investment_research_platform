<template>
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
</template>

<script>
export default {
    data () {
        return {
            statusChange: null,
            relationships: ['single', 'engaged', 'married', 'divorced', 'widowed'],
            pickerDate2: '',
            status: '',
            maritalStatus: null,
        }
    },
    methods: {
        saveStatus(date) {
        this.pickerDate2 = date;
        console.log(this.statusChange)
        },
        updateStatus(val) {
            this.status = val
        }
    }
}
</script>

<style>

</style>