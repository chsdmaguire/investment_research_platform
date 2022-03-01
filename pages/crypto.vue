<template>
<v-container fluid>
    <v-row align="center" justify="center">
        <v-col cols="12">
            <CryptoGraph /> 
        </v-col>
    </v-row>
    <v-row align="center" justify="center">
        <v-col cols="12">
            <CryptoTable /> 
        </v-col>
    </v-row>
    <v-row align="center" justify="center">
        <v-col cols="12">
            <News /> 
        </v-col>
    </v-row>
</v-container>
  
</template>

<script>
import CryptoTable from '~/components/cryptoecon/CryptoTable';
import CryptoGraph from '~/components/cryptoecon/CryptoGraph';
import News from '~/components/cryptoecon/News';

export default {
    components: {CryptoTable, CryptoGraph, News}
}
</script>

<style scoped>

.graph {
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 5%;
    
    }
.cryp-table {
    margin-top: 4%;
}


</style>