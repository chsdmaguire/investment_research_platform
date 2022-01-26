<template>
<div>
    <div class="graph">
        <CryptoGraph /> 
    </div>
   <div class="cryp-table">
    <CryptoTable />       
   </div>

</div>
  
</template>

<script>
import CryptoTable from '~/components/cryptoecon/CryptoTable'
import CryptoGraph from '~/components/cryptoecon/CryptoGraph'

export default {
    components: {CryptoTable, CryptoGraph}
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