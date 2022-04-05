<template>
<v-container>
    <v-stepper v-model="e10" non-linear>
        <!-- <v-stepper-header>
            <v-row>
            <v-stepper-step step="1" editable :complete="e10 >1">
                Real Estate
            </v-stepper-step>
            <v-stepper-step step="2" editable :complete="e10 >2">
                Checkings
            </v-stepper-step>
            <v-stepper-step step="3" editable :complete="e10 >3">
                Savings
            </v-stepper-step>
            <v-stepper-step step="4" editable :complete="e10 >4">
                CDs
            </v-stepper-step>
            <v-stepper-step step="5" editable :complete="e10 >5">
                MMFs
            </v-stepper-step>
            <v-stepper-step step="6" editable :complete="e10 >6">
                Brokerage
            </v-stepper-step>
            <v-stepper-step step="7" editable :complete="e10 >7">
                IRA
            </v-stepper-step>
            <v-stepper-step step="8" editable :complete="e10 >8">
                Company Retirement Plans
            </v-stepper-step>
            <v-stepper-step step="9" editable :complete="e10 >9">
                529
            </v-stepper-step>
            <v-stepper-step step="10" editable :complete="e10 >10">
                Gifts
            </v-stepper-step>
            <v-stepper-step step="11" editable :complete="e10 >11">
                529
            </v-stepper-step>
            <v-stepper-step step="12" editable :complete="e10 >12">
                Art
            </v-stepper-step>
            <v-stepper-step step="13" editable :complete="e10 >13">
                Vehicles
            </v-stepper-step>
            <v-stepper-step step="14" editable :complete="e10 >14">
                Businesses
            </v-stepper-step>
            <v-stepper-step step="15" editable :complete="e10 >15">
                Cash
            </v-stepper-step>
            <v-stepper-step step="16" editable :complete="e10 >16">
                ESOPS
            </v-stepper-step>
            <v-stepper-step step="17" editable :complete="e10 >17">
                Bonds
            </v-stepper-step>
            <v-stepper-step step="19" editable :complete="e10 >18">
                Other Assets
            </v-stepper-step>
            </v-row>
        </v-stepper-header> -->
        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card color="#121212" height="200px">
                    <v-row justify="center" align="center" class="mt-5">
                        <h3 class="question">
                            Do you own any real estate?
                        </h3>
                    </v-row>
                    <v-row justify="center" align="center" class="mt-5">
                        <v-col cols="3">
                        <v-card class="mx-auto rounded-circle" 
                            width="170" height="170" color="indigo" @click.stop="ownsProperty = true">
                            <v-row justify="center" align="center">
                            <h3 class="mt-16">Yes</h3>
                            </v-row>
                            </v-card>
                        </v-col>
                        <v-col cols="3">
                        <v-card class="mx-auto rounded-circle" @click.stop="e10=2"
                            width="170" height="170" color="indigo">
                            <v-row justify="center" align="center">
                            <h3 class="mt-16">No</h3>
                            </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            e10: 1,
            ownsProperty: false,
        }
    }
}
</script>

<style>

</style>