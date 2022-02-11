<template>
  <div>
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
  </div>
</template>

<script>
export default {

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
</style>