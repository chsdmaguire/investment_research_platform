<template>
<div class="text-center">
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                
                text
                v-bind="attrs"
                v-on="on"
            >
            {{ usrEmail }}
                  <v-icon right color="white">
                    mdi-wrench
                  </v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item>
                <v-dialog v-model="showLogOut" width="500">
                    <template v-slot:activator="{ on, attrs }">                      
                        <v-btn color="secondary" text v-bind="attrs" v-on="on">Log Out</v-btn>
                    </template>
                    <v-card class="justify-center align-center" elevation="4">
                        <v-card-text>
                            <v-card-title class="justify-center">Are you sure you want to log out?</v-card-title>
                            <v-row justify="space-around" class="my-3">
                               <v-btn color="primary" outlined @click="logOut()">Yes, I'm sure</v-btn>
                               <v-btn class="primary" @click="showLogOut = false">Actually, nevermind</v-btn>
                               </v-row>
                        </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-list-item>
                <v-list-item>
                  <v-dialog v-model="showDelete">
                    <template v-slot:activator="{ on, attrs }">
                     <v-btn color="error" text v-bind="attrs"
                      v-on="on">Delete Account</v-btn>
                    </template>
                    <v-card class="px-4">
                        <v-card-text>
                          <v-card-title>Please enter your login info to confirm.</v-card-title>
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
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-center>
                                          <v-btn color="primary" x-large block @click="showDelete = false">Cancel</v-btn>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-center>
                                          <v-spacer></v-spacer>
                                            <v-btn color="error" x-large block :disabled="loading" @click="deleteAccount()"> 
                                                Delete My Account
                                            </v-btn>
                                        </v-col>                 
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                  </v-dialog>
                 
                </v-list-item>
              </v-list>
            </v-menu>
          </div> 
</template>

<script>
export default {
    props: ['usrEmail'],
    data() {
        return {
            showLogOut: false,
            showDelete: false,
            deletePassword: "",
            deleteEmail: "",
            show1: false,
            loading: false,
            valid: true,
            loginEmailRules: [
                v => !!v || "Required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
                ],
            rules: {
                required: value => !!value || "Required.",
                min: v => (v && v.length >= 6) || "Min 8 characters"
            },
            alert: null,
        }
    },
    methods: {
        logOut() {
          this.$store.dispatch('userLogOut').then(() => {
            this.$router.push('/')
          })
        },
    deleteAccount() {
      this.alert = null;
      this.loading = true;
      if (this.$refs.loginForm.validate()) {
        try {
          const user = {
            email: this.deleteEmail,
            password: this.deletePassword }
            this.$axios.post('/auth/deleteuser', user).then(res => {
              this.alert = {type: 'success', message: res.data.message}
              console.log(res.data);
              this.$store.dispatch('userLogOut');
              this.loading = false;
                 this.$router.push('/');
                })
              } catch (e) {
                    console.log(e);
                    this.alert = {type: 'error', message: e};
                    this.loading = false;
                }
            } 
      }
    }
}
</script>

<style>

</style>