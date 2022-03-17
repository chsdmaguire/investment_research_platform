<template>

   <div>
      <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <NavList />
    <v-divider></v-divider>
    
    <template v-if=" this.$vuetify.breakpoint.name === 'xs' && !user">
      <LoginBtn />      
      <v-divider></v-divider>    
    </template>

    <v-card class="d-flex flex-column">
      <v-spacer></v-spacer>      
        <v-card-actions >
          <v-card-title>
          <div class="copyright copyright-content d-sm-flex justify-content-between">
              <p class="text" style=" width: 100%; text-align: center">
                © {{ new Date().getFullYear() }} — <strong>Fli<span>&beta;</span>yrd LLC</strong>
              </p>
            </div>
        </v-card-title>
        </v-card-actions>
      </v-card>

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title><strong>Fli<span>&beta;</span>yrd</strong></v-toolbar-title>   
      <router-link to="/">      
      <v-img src="/icon.png" max-width="35px" class="ml-4" link="/"></v-img>
      </router-link>

    <v-col md="6" class="ml-12 pl-12">
       <StockSearch />
    </v-col>
      <v-spacer />
      <template v-if="this.$vuetify.breakpoint.name !== 'xs' && !user">
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
         <UserBtn v-bind:usr-email="user" />
      </template>
        
    </v-app-bar>
    <v-main>
      <!-- <v-container> -->
        <Nuxt />

        
        

      <!-- </v-container> -->
    </v-main>
    <BackToTopButton />
    <!-- <CookieControl /> -->
  </v-app>
  </div>
</template>

<script>
import StockSearch from '~/components/layout/StockSearch';
import BackToTopButton from '~/components/layout/BackToTopButton';
import UserBtn from '~/components/layout/UserBtn';
import LoginBtn from '~/components/layout/LoginBtn';
import NavList from '~/components/layout/NavList';
export default {
  components: {StockSearch, BackToTopButton, UserBtn, LoginBtn, NavList},
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Flibyrd'
    }
  },
  computed: {
      user () {
          return this.$store.state.email 
      },
  },

  mounted() {
    
  }
}
</script>

<style scoped>
.user-btn-text {
    font-size: 100%;
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
.v-navigation-drawer {
z-index: 999999 !important;
}
.v-app-bar {
z-index: 999999 !important;
}
/* @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
.primary-text {
  color: #007bff;
} */
</style>