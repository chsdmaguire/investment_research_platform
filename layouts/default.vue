<template>

   <div>
     <head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2719099872585013"
     crossorigin="anonymous"></script>       
<script>
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="5lmgpsTwDpNi6aMcOvOPGATbqzeXwQXc";;analytics.SNIPPET_VERSION="4.15.3";
  analytics.load("5lmgpsTwDpNi6aMcOvOPGATbqzeXwQXc");
  analytics.page();
  }}();
</script>
    </head> 
      <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
            <template v-if="!user && this.$vuetify.breakpoint.name === 'xs'">
              <v-list>
                <v-list-item>
                  <v-card
                    class="pa-1 rounded-pill text-center mr-2 logButton"
                    outlined
                    tile
                    width="125"
                    style="background: linear-gradient(to bottom right, #FC0441, #F52DA8)"
                    >
                      <a class="user-btn-text" href="login">
                        Log In   
                      </a>                
                  </v-card>
                </v-list-item>
                <v-list-item>
                  <v-card
                      class="pa-1 rounded-pill text-center mr-2"
                      outlined
                      tile
                      width="125"
                      style="background: linear-gradient(to bottom right, #FC0441, #F52DA8)"
                      >
                        <a class="user-btn-text" href="/register">
                        Sign-Up
                        </a>
                    </v-card>
                </v-list-item>
              </v-list>       
            <v-divider></v-divider>    
      </template>
      <v-card class="d-flex flex-column">
        <v-spacer></v-spacer>
        
        <v-card-actions >
          <v-card-title>
          <div class="copyright copyright-content d-sm-flex justify-content-between">
              <p class="text" style=" width: 100%; text-align: center">
                © {{ new Date().getFullYear() }} — <strong>Flibyrd LLC</strong>
              </p>
            </div>
        </v-card-title>
        </v-card-actions>
      </v-card>

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />   
      <router-link to="/">      
      <v-img src="icon.png" max-width="35px" class="ml-4" link="/"></v-img>
      </router-link>

    <v-col md="6" class="ml-12 pl-12">
       <StockSearch />
    </v-col>
      <v-spacer />
      <template v-if="!user && this.$vuetify.breakpoint.name !== 'xs'">
        <v-card
          class="pa-1 rounded-pill text-center mr-2 logButton"
          outlined
          tile
          width="125"
          style="background: linear-gradient(to bottom right, #FC0441, #F52DA8)"
          >
            <a class="user-btn-text" href="login">
              Log In   
            </a>                
        </v-card>
        <v-card
          class="pa-1 rounded-pill text-center mr-2"
          outlined
          tile
          width="125"
          style="background: linear-gradient(to bottom right, #FC0441, #F52DA8)"
          >
            <a class="user-btn-text" href="/register">
            Sign-Up
            </a>
        </v-card>
      </template>
      <template v-if="user">
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  
                  flat
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ user.firstName }}
                  <v-icon right color="white">
                    mdi-wrench
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn color="secondary" text  @click="logOut">Log Out</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-dialog v-model="showDelete">
                    <template v-slot:activator="{ on, attrs }">
                     <v-btn color="error" text v-bind="attrs"
                      v-on="on">Delete Account</v-btn>
                    </template>
                    <v-card class="px-4">
                        <v-card-text>
                          <v-card-title>Delete My Account</v-card-title>
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
                                            <v-btn color="error" x-large block :disabled="loading" @click="deleteAccount"> 
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
        
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />

        <!-- <Cookies /> -->
 
      </v-container>
    </v-main>
  </v-app>
  </div>
</template>

<script>
import StockSearch from '~/components/stock-main/StockSearch'
// import BacktoTopButton from '~/components/BacktoTopButton'

export default {
  components: {StockSearch},
  data () {
    return {
        showDelete: false,
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

      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-currency-btc',
          title: 'Crypto',
          to: '/crypto'
        },
        {
          icon: 'mdi-podium-silver',
          title: 'Economics',
          to: '/economic'
        },
        {
          icon: 'mdi-school-outline',
          title: 'Education',
          to: '/education'
        },
        {
          icon: 'mdi-information-outline',
          title: 'About Flibyrd',
          to: '/about'
        },
        {
          icon: 'mdi-account',
          title: 'My Account',
          to: '/admin'
        },
        {
          icon: 'mdi-form-select',
          title: 'Privacy Policy',
          to: '/privacy'
        },
        {
          icon: 'mdi-file-settings',
          title: 'Terms of Use',
          to: '/terms'
        },
        {
          icon: 'mdi-keyboard-settings-outline',
          title: 'Contact Us',
          to: '/contact'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Flibyrd'
    }
  },
  computed: {
      user () {
          { return this.$store.state.account ? this.$store.state.account.user : null }
      }
  },

  methods: {
    logOut() {
          this.$store.dispatch('account/reset').then(() => {
            this.$router.push('/')
          })
        }
    },
    showDeleteCard () {
      this.showDelete = true;
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
</script>

<style scoped>
.user-btn-text {
    font-size: 150%;
    color: #fff;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
}

@media screen and (max-width: 640px ) {
  .user-btn-text {
    font-size: 90%;
  } 
}


/* @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
.primary-text {
  color: #007bff;
}

body {
  font-family: "Montserrat", sans-serif;
  font-weight: normal;
  font-style: normal;
  color: #6A6972;
  overflow-x: hidden; }

* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box; }

/* img {
  max-width: 100%; }

a:focus,
input:focus,
textarea:focus,
button:focus {
  text-decoration: none;
  outline: none; }

a:focus,
a:hover {
  text-decoration: none; }

i,
span,
a {
  display: inline-block; }

audio,
canvas,
iframe,
img,
svg,
video {
  vertical-align: middle; }

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  color: #2E2E2E;
  margin: 0px; }

h1 {
  font-size: 48px; }

h2 {
  font-size: 36px; }

h3 {
  font-size: 28px; }

h4 {
  font-size: 22px; }

h5 {
  font-size: 18px; }

h6 {
  font-size: 16px; }

ul, ol {
  margin: 0px;
  padding: 0px;
  list-style-type: none; }

p {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #6A6972;
  margin: 0px; } */

</style>