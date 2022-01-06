<template>
<div class='cookie-banner' id="cookie-popup">
<p class="statement">
    By using our website, you agree to our 
    <a href='/privacy' target="_blank">cookie policy</a>
  </p>
<button @click="closeCookie" class="accept">Accept</button>
</div>
</template>

<script>

export default {
    data() {
        return {

        }
    },

    methods: {
        closeCookie() {
            document.getElementById('cookie-popup').style.display = 'none';
        }
    },

    mounted() {
                if (! localStorage.noFirstVisit) { 
                    document.getElementById('cookie-popup').style.display = 'block';
                    localStorage.noFirstVisit = "1";
                }         
    }
}
</script>

<style scoped>

.cookie-banner {
  position: fixed;
  bottom: 3%;
  left: 25%;
  right: 25%;
  width: 50%;
  text-align: center;
  background-color: #eee;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  overflow-x: auto;
}
.accept {
  background-color: rgb(59, 80, 128);
  border: none;
  color: white;
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  margin-top: 1%;
  margin-bottom: 1%;
  margin-left: 20%;
  position: left;
  z-index: 20;
  border-radius: 8px;
  font-weight: 400;
  padding: 0 10px;
background: -webkit-linear-gradient(left, #30928d 0%, #1e5a72 50%, #263d5c 100%);
  background: -o-linear-gradient(left, #33c8c1 0%, #119bd2 50%, #33c8c1 100%);
  background: linear-gradient(to right, #33c8c1 0%, #119bd2 50%, #33c8c1 100%);
}

.statement {
    display: inline-block;
    font-size: 100%;
    margin-top: 1%;
    margin-bottom: 1%;
    position: right;
}

</style>