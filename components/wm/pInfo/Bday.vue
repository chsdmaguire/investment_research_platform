<template>
  <v-container>
       <v-card
                color="#121212"
                height="200px"
                >
                <v-row justify="center" align="center" class="mt-5">
                    <h3 class="question">
                        When is your birthday?
                    </h3>
                </v-row>
                <v-row justify="center" align="center">
                  <v-col cols="6">
                    <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="Birthday"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-row justify="center" align="center">
                      <v-col cols="6">
                    <v-date-picker
                      ref="picker"
                      v-model="date"
                      :day-format="date => new Date(date).getDate()"
                      :max="new Date().toISOString().substr(0, 10)"
                      :picker-date="pickerDate"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                      </v-col>
                    </v-row>
                  </v-menu>
                  </v-col>
                  
                </v-row>
                </v-card>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            date: null,
            menu: false,
            pickerDate: '1995-1-1',
        }
    },
    watch: {
    menu (val) {
      val && setTimeout(() => (
        this.$refs.picker.activePicker = 'YEAR',
        this.pickerDate = null
      ))
    },
    },
    methods: {
        save (date) {
        this.$refs.menu.save(date)
        this.pickerDate = date;
        },
    }
  
}
</script>

<style>

</style>