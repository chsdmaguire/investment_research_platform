<template>
  	<span>
        <trading-vue :data="chart" :width="width" :height="height"
            title-txt="₿TCUSD 🔥"
            :toolbar="true"
            :overlays="overlays"
            :color-back="colors.back"
            :color-grid="colors.grid"
            :color-text="colors.text"
            :color-cross="colors.cross"
            :color-candle-dw="colors.candle_dw"
            :color-wick-dw="colors.wick_dw"
            :color-title="colors.tvTitle">
        </trading-vue>
        <span class="night-mode">
            <input type="checkbox" v-model="night">
            <label>Night Mode</label>
        </span>
    </span>
</template>
<script>

import { DataCube } from 'trading-vue-js'
import Data from '~/assets/data.json'

export default {
    name: 'MainChart',
    props: ['width', 'height'],
  	computed: {
    	colors() {
        	return this.night ? {
            	back: '#121827',
                grid: '#3e3e3e',
                text: '#35a776',
              	cross: '#dd64ef',
              	candle_dw: '#e54077',
              	wick_dw: '#e54077'

            } : {
            	back: '#fff',
                grid: '#eee',
                text: '#333',
              	candle_dw: 'black',
              	wick_dw: 'black'
            }
        }
    },
    data() {
        return {
            chart: new DataCube(Data),
            overlays: [],
          	night: true
        }
    }
}
</script>
<style>
.night-mode {
    position: absolute;
    top: 15px;
    right: 80px;
    color: #888;
    font: 11px -apple-system,BlinkMacSystemFont,
        Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,
        Fira Sans,Droid Sans,Helvetica Neue,
        sans-serif
}
</style>