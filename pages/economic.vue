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
    },
    head() {
        return {
            title: 'US Economy',
            meta: [
                {name: 'description', content: 'latest economic news and trends chart'},
                {name: 'keywords', content: ['us economy news', 'us economic trends', 'us economic metrics']}
            ]
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