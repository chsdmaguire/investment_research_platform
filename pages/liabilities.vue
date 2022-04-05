<template>
<v-container>
    <v-stepper v-model="e11" non-linear>
        <v-stepper-header>
            <v-stepper-step step="1" editable :complete="e10 >1">
                Mortgage
            </v-stepper-step>
            <v-stepper-step step="2" editable :complete="e10 >2">
                Credit Card
            </v-stepper-step>
            <v-stepper-step step="3" editable :complete="e10 >3">
                Student Loans
            </v-stepper-step>
            <v-stepper-step step="4" editable :complete="e10 >4">
                Home Equity
            </v-stepper-step>
            <v-stepper-step step="5" editable :complete="e10 >5">
                Payday
            </v-stepper-step>
            <v-stepper-step step="6" editable :complete="e10 >6">
                SBL
            </v-stepper-step>
            <v-stepper-step step="7" editable :complete="e10 >7">
                Farm Loan
            </v-stepper-step>
            <v-stepper-step step="8" editable :complete="e10 >8">
                Auto Loan
            </v-stepper-step>
            <v-stepper-step step="9" editable :complete="e10 >9">
                Tax Debt
            </v-stepper-step>
        </v-stepper-header>
    </v-stepper>
</v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>