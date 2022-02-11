
<template>
 <v-container>
      <v-card class="px-4" v-if="!user">
        <v-card-text>
            <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-alert v-if="alert" :type="alert.type">
                    {{alert.message}}</v-alert>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="firstName" :rules="[rules.required]" 
                        label="First Name" maxlength="20" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="lastName" :rules="[rules.required]" 
                        label="Last Name" maxlength="20" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="email" :rules="emailRules" 
                        label="E-mail" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="password" 
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" 
                        name="input-10-1" label="Password" hint="At least 8 characters" 
                        counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field block v-model="verify" 
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                        :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" 
                        name="input-10-1" label="Confirm Password" 
                        counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                        <v-btn x-large block :disabled="!valid" :loading="loading"
                         color="success" @click="registerUser()">Register</v-btn>
                    </v-col>
                </v-row>
                <!-- ADD V-PROGRESS BAR FOR PASSWORD -->
            </v-form>
        </v-card-text>
        </v-card>
 </v-container>
</template>

<script>
export default {

    data() {
        return {
            valid: true,
            loading: false,
            alert: null,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            verify: "",
            emailRules: [
            v => !!v || "Required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
            show1: false,
            rules: {
            required: value => !!value || "Required.",
            min: v => (v && v.length >= 8) || "Min 8 characters"
                }
        }
    },
    computed: {
        passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
    user () {
          return this.$store.state.email 
      }
    },
    methods: {
        registerUser() {
            this.alert = null;
            this.loading = true;

            if (this.$refs.registerForm.validate()) {
                const user = { 
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName}
                    this.$axios.post('/auth/register', user).then(res => {
                        this.alert = {type: 'success', message: res.data.message};
                        this.$store.dispatch('userLocalLogin', res.data);
                        this.loading = false; 
                        this.$router.push('/');
                    }).catch(err => {
                        this.loading = false;
                        this.alert = {type: 'error', message: err.response.data.message }
                    })
                    this.loading = false;
                    }
            }
        },       
        
}
</script>

<style scoped>
</style>