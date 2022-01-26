<template>
<div>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">Admin page</v-card-title>
        <v-card-text>
            <p v-if="user">Hello, {{user.email}}</p>
          <p v-else>The user is not authenticated!</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text href="/">Main Page</v-btn>
          <v-spacer> </v-spacer>
              <v-btn color="primary" text @click="checkMe">Check Me</v-btn>
        <v-spacer></v-spacer>
         <v-btn color="secondary" text @click="logOut">Log Out</v-btn>
         <v-spacer></v-spacer>
         <v-btn color="error" text @click="showDeleteCard">Delete Account</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  <v-container v-if="showDelete">
    <v-card class="px-4">
        <v-card-text>
            <v-form ref="loginForm" v-model="valid" lazy-validation>
                
                <v-alert v-if="alert" :type="alert.type">
                    {{alert.message}}</v-alert>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="deleteEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="deletePassword" :append-icon="show1?'eye':'eye-off'" 
                        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" 
                        name="input-10-1" label="Password" hint="At least 8 characters" 
                        counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>
                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                            <v-btn color="error" x-large block :disabled="loading" @click="deleteAccount"> 
                                Delete My Account
                            </v-btn>
                        </v-col>                 
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</v-container>
</div>
</template>
<script>
export default {
  data () {
    return {
      showDelete: null,

            valid: true,
            loading: false,
            show1: false,
            deletePassword: "",
            deleteEmail: "",
            alert: null,
            loginEmailRules: [
            v => !!v || "Required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
            rules: {
            required: value => !!value || "Required.",
            min: v => (v && v.length >= 6) || "Min 8 characters"
            },
    }
  },  
  computed: {
      user () {
          { return this.$store.state.account ? this.$store.state.account.user : null }
      }
  },

  methods: {
    showDeleteCard () {
      this.showDelete = true;
    },
      checkMe() {
          this.$store.dispatch('account/fetch').then(res => {
              console.log(res.data.message)
          })
      },

      logOut() {
          this.$store.dispatch('account/reset').then(() => {
            this.$router.push('/')
  })
      },

      deleteAccount() {
        this.$store.dispatch('account/delete', {
          email: this.deleteEmail,
          password: this.deletePassword}).then(resp => {
           this.alert = {type: 'success', message: resp.data.message};
               this.loading = false;
              this.$router.push('/');
          }).catch(err => {
               this.alert = {type: 'error', message: err || err.resp.status}
                }) 
      }
}
}
</script>
