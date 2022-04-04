<template>
<v-container>
    <v-stepper v-model="e2" non-linear>
        <v-stepper-header>
            <v-stepper-step step="1" editable>
                Work
            </v-stepper-step>
            <v-divider></v-divider>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                <PrimIncome />
            </v-stepper-content>
      </v-stepper-items>
      </v-stepper>
  </v-container>
</template>

<script>
import PrimIncome from "./budg/PrimIncome.vue";
export default {
    components: { PrimIncome }
}
</script>

<style>

</style>