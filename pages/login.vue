<template>
<v-container>
    <v-card class="px-4" v-if="!userName">

        <v-card-text>
            <v-form ref="loginForm" v-model="valid" lazy-validation>
                
                <v-alert v-if="alert" :type="alert.type">
                    {{alert.message}}</v-alert>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail"
                         required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field outlined v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" 
                        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" 
                        name="input-10-1" label="Password" hint="At least 8 characters" 
                        counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="space-between">
                    <v-col class="d-flex" md="6" sm="3" xsm="12">
                        <v-btn x-large block :disabled="loading" color="success" 
                       :loading="loading" @click="localLogin()"> Login </v-btn>
                    </v-col> 
                    <v-col class="d-flex" md="6" sm="3" xsm="12">
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
<v-container v-if="userName">
    <v-row align="center" justify="center">
        <h1>
            You're already signed in {{ userName }}. Click <a href="/">here</a> to continue!
        </h1>
    </v-row>
</v-container>
</v-container>
</template>

<script>
export default {   
    data() {
        return {
            valid: true,
            loading: false,
            show1: false,
            loginPassword: "",
            loginEmail: "",
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
      userName () {
          return this.$store.state.firstName 
      }
  },
    methods: {

        localLogin() {
            this.alert = null;
            this.loading = true;
            if (this.$refs.loginForm.validate()) {

                    const user = {
                        email: this.loginEmail,
                         password: this.loginPassword
                    }
                     this.$axios.post('/auth/login', user).then(res => {
                         this.alert = {type: 'success', message: res.data.message}
                         console.log(res.data)
                         this.$store.dispatch('userLocalLogin', res.data);
                        this.loading = false; 
                        this.$router.push('/');
                     }).catch(err => {
                         this.loading = false;
                        this.alert = {type: 'error', message: err.response.data.message }
                    })
                    
                        
                    }
            },   
        },
 }
</script>

<style scoped>

</style>