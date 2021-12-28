<template>

  <div>
    <head>
<script>
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="5lmgpsTwDpNi6aMcOvOPGATbqzeXwQXc";;analytics.SNIPPET_VERSION="4.15.3";
  analytics.load("5lmgpsTwDpNi6aMcOvOPGATbqzeXwQXc");
  analytics.page();
  }}();
</script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2719099872585013"
     crossorigin="anonymous"></script>  
    </head>



    <Nuxt />

  </div>
</template>

<script>
import BackToTopButton from '~/components/navigation/BackToTopButton'

export default {
    components: { BackToTopButton },
  data () {
    return {
    }
  },


}
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css?family=Poppins:400,700|Lato:300,400,700&display=swap"); */
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
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
  max-width: 100%; } */

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
  margin: 0px; }

</style>