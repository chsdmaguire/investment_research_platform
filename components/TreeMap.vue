<template>
  <v-container fluid>
      <v-row>
          <h2>
              Filter Stocks Here
          </h2>
      </v-row>
    <svg :width="treemapWidth" :height="treemapHeight">
        <g
            v-for="rectangle in treemapData"
            :key="`${rectangle.x}:${rectangle.y}`"
            class="treemap__rectangle"
            :fill="rectangle.data.color"
        >
            <rect
            :x="rectangle.x"
            :y="rectangle.y"
            :width="rectangle.width"
            :height="rectangle.height"
            ></rect>
            <text
            fill="white"
            :x="rectangle.x + (rectangle.width / 2)"
            :y="rectangle.y + (rectangle.height / 2)"
            >
            {{ rectangle.data.label }}
            </text>
        </g>
        Sorry, your browser does not support inline SVG.
    </svg>
</v-container>
</template>

<script>
const { getTreemap } = require('treemap-squarify');
export default {
    data() {
        return {
            treemapWidth: 1000,
            treemapHeight: 1000,
            treemapData: [],
        }
    },
    methods: {
        async getData() {
            const res = await this.$axios.get('/basic');
            console.log(res.data);
            this.treemapData = getTreemap({
                data: [
                    { value: 23, color: '#1B277C', label: '23' },
                    { value: 20, color: '#2C5A9C', label: '20' },
                    { value: 19, color: '#3984B6', label: '19' },
                    { value: 14, color: '#3F97C2', label: '14' },
                    { value: 9, color: '#78C6D0', label: '9' },
                    { value: 8, color: '#AADACC', label: '8' },
                    { value: 7, color: '#DCECC9', label: '7' },
                ],
                width: 700,
                height: 600,
                });
                this.treemapData.forEach(rectangle => {
                    console.log(rectangle.x, rectangle.y, rectangle.data.label, rectangle.data.color)
                })
        }
    },
    mounted() {
        this.getData();
    }
}
</script>

<style>

</style>