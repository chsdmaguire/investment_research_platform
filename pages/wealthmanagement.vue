<template>
  <v-container>
      <template v-if="!started">
      <v-row justify="center" align="center" class="mt-5">
            <div class="intro">
                <h1>Welcome to Flibyrd's Automated Wealth Management Platform</h1>
            </div>
        </v-row>
        <v-row align="center" justify="center" class="mt-8">
            <div class="intro">
                <h3>We understand financial planning is difficulty and costly. Our goal is to make this chore as fast and simple as possible for you.
                    <span> <v-btn class="ml-2" color="#009688" @click="started = true">Yes, Please!</v-btn> </span>
                </h3>
            </div>
        </v-row>
      </template>
      <template v-if="started">
          <PersonalInfo />
          <!-- 2. work/income (also habe to ask about spouse, 
          show expected tax rate at end based on residency as well to ask if correct)
        3. house, ask if rent or own. ask if more than one property & get mortgage details
        4. Assets
        5. other liabilities
        6. risk tolerance/experience investing -->
      </template>
  </v-container>
</template>

<script>
import PersonalInfo from '~/components/wm/PersonalInfo'
export default {
    components: {PersonalInfo},
    data() {
        return {
            started: false,
        }
    },

}
</script>

<style scoped>
.intro {
    animation: fadeInAnimation linear 2s;
}
@keyframes fadeInAnimation {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
</style>