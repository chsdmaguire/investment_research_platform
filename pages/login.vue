<template>
<v-container>
    <v-card class="px-4">
        <v-card-text>
            <v-form ref="loginForm" v-model="valid" lazy-validation>
                
                <v-alert v-if="alert" :type="alert.type">
                    {{alert.message}}</v-alert>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="loginEmail" dark :rules="loginEmailRules" label="E-mail"
                         required outlined></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field dark outlined v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" 
                        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" 
                        name="input-10-1" label="Password" hint="At least 8 characters" 
                        counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="d-flex" cols="12" sm="6" xsm="12">
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn x-large block :disabled="loading" color="success" 
                        @click="validate" :loading="loading"> Login </v-btn>
                        </v-col>               
                </v-row>
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
            google_loading: false,
            google_ready: false
        }
    },
    methods: {
        validate() {
            this.alert = null;
            this.loading = true;
            if (this.$refs.loginForm.validate()) {
            this.$store.dispatch('account/login', {
                email: this.loginEmail,
                password: this.loginPassword}).then(resp => {
               this.alert = {type: 'success', message: resp.data.message};
               this.loading = false;
               this.$router.push('/');
            }).catch(err => {
                console.log(err)
                this.alert = {type: 'error', message: err || err.resp.status}
                })            
            }
        },
        google_submit () {
            this.$axios.get('/api/google/url').then(resp => {
                console.log(resp)
            })
            }
    },

 }
</script>

<style scoped>

</style>