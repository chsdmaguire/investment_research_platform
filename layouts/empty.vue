<template>
<div class="backgrnd">
    <v-app>
        <v-main>
             <nuxt /> 
        </v-main>
    </v-app>
       

</div>
  
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
}
</script>
<style scoped>

</style>