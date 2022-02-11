<template>

     <v-container fluid class="splash">

    <v-container class="splash-centered mx-auto my-auto">      
      <h1>Contact Us</h1>
      <div class="contact-description mx-auto secondary-text">
        <p>We care about what you have to say. Please fill out the contact form and a member of Flibyrd will respond as soon as possible.</p>
      </div>
      <v-card class="contact-card mt-4">
          <v-form>
            <v-row>
            <v-col>
                <v-card class="input-section ms-3">
                     <v-text-field placeholder="First Name" v-model="firstName"></v-text-field>
                </v-card>
               </v-col>
            <v-col>
                <v-card class="input-section ms-3">
                     <v-text-field placeholder="Last Name" v-model="lastName"></v-text-field>
                </v-card>
               </v-col>
            </v-row>

            <v-row class="mt-3">
                <v-col>
                <v-card class="input-section ms-3">
                    <v-text-field placeholder="Your Email" v-model="email"></v-text-field>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="input-section ms-3">
                    <v-text-field placeholder="Subject" v-model="subject"></v-text-field>
                </v-card>
            </v-col>
            </v-row>

            <v-row class="mt-3">
            <v-col>
                <v-card class="input-section ms-3">
                    <v-text-field v-model="message" rows="15" placeholder="Write your message here..."></v-text-field>
                </v-card>
            </v-col>
            </v-row>

            <v-row class="mt-3">
            <v-col class="submit-btn"><v-btn variant="outline-primary" @click="sendEmail" href="/">Submit</v-btn></v-col>
            </v-row>
          </v-form>
      </v-card>
    </v-container>
  </v-container>    
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    }
  },

    methods: {
      sendEmail() {  
        const newMesage = 'body:  ' + this.message + '\n' +  'email:  ' + this.email + '\n' 
        + 'firstname:  ' + this.firstName + '\n' + 'lastname:  ' + this.lastName;

        const emailObject = {
          "firstname": this.firstName,
          "lastname": this.lastName,
          "email": this.email,
          "subject": this.subject,
          "text": String(newMesage) 
        };
       this.$axios.post('/api/flibyrd/contact', emailObject).then(resp => {
         console.log(resp)
       }).catch( (err) => {
         console.log(err)
       })
        }
    }
}
</script>

<style scoped>
.splash {
  height: 90vh;
  text-align: center;
  display: flex;
}
.contact-description {
  width: 500px;
}


.input-section {
    color: white;
}

</style>