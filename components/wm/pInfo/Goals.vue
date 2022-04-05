<template>
  <v-container>
        <v-card
        color="#121212"
        height="700px"
        >
        <v-row class="mt-5" v-for="index in data.length / 3" :key="index">
        <v-col cols="4" v-for="(item, idx) in data.slice((index - 1) * 3, (index - 1) * 3 + 3)" :key="idx">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 4" width="170" height="170" rounded @click.stop="addGoal(item.text)"
              :style="clientGoals.includes(item.text) ? 'border: 1px solid green;' : 'border: 3px solid rgb(192, 152, 25);'" >
                <p class="secondary-text">{{ item.text }}</p>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
        </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {text: 'Budgeting & Saving'},
        {text: 'Growing My Wealth'},
        {text: 'Paying off Debt'},
        {text: 'Retirement Planning'},
        {text: 'Funding Education for Dependents'},
        {text: 'Specific Large Purchases (eg house, car, boat, etc)'},
        {text: 'Funding Significant Event (eg wedding)'},
        {text: 'Charitable Giving'},
        {text: 'Wealth Transfer'},
      ],
      clientGoals: [],
    }
  },
  methods: {
    addGoal(val) {
      if(!this.clientGoals.includes(val)) {
        this.clientGoals.push(val);
      } else {
        this.clientGoals.splice(val, 1);
      }

    }
  }
}
</script>

<style scoped>

</style>