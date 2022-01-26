<template>
<div>
    <div class="graph">
        <EconGraph />
   </div>
</div>

</template>

<script>
import EconGraph from '~/components/cryptoecon/EconGraph'

export default {
    components: {EconGraph},
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>

.graph {
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 5%;
    
    }

</style>