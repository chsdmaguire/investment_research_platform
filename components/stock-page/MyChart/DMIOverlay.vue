<script>
import { Overlay } from 'trading-vue-js'
export default {
    name: 'DMIOverlay',
    mixins: [Overlay],
    methods: {
        meta_info() {
            return {
                author: 'Flibyrd', version: '1.0.0',
                desc: 'Directional Movement Index',
                preset: {
                    name: 'DMI',
                    side: 'offchart',
                    settings: {
                        lineWidth: 0.75,
                        adxColor: "#ef1360",
                        pdiColor: "#3782f2",
                        mdiColor:  "#f48709",
                        colors: ["#ef1360", "#3782f2", "#f48709"]
                    }
                }
            }
        },
        use_for() { return ['DMIOverlay'] },

        draw(ctx) {
             const layout = this.$props.layout;
            const data = this.$props.data;

            ctx.lineWidth = this.line_width;
            ctx.strokeStyle = this.adx_color;
            ctx.beginPath();

            for (var k = 0, n = data.length; k < n; k++) {
                let p = data[k];
                let x = layout.t2screen(p[0]);
                let y1 = layout.$2screen(p[1]);
                
                ctx.lineTo(x, y1);
                ctx.stroke();
            }

            ctx.strokeStyle = this.neg_color;
            ctx.beginPath();

            for (var k = 0, n = data.length; k < n; k++) {
                let p = data[k];
                let x = layout.t2screen(p[0]);
                let y1 = layout.$2screen(p[2]);
                
                ctx.lineTo(x, y1);
                ctx.stroke();
            }
            ctx.strokeStyle = this.pos_color;
            ctx.beginPath();

            for (var k = 0, n = data.length; k < n; k++) {
                let p = data[k];
                let x = layout.t2screen(p[0]);
                let y1 = layout.$2screen(p[3]);
                
                ctx.lineTo(x, y1);
                ctx.stroke();
            }
            
        },

        legend(values) {
            let xs = values.slice(1, 4).map((x) => {
            return x.toFixed(Math.abs(x) > 0.001 ? 2 : 4);
            });
            return [
                { value: "ADX: " + xs[0], color: this.adx_color},
                { value: "-DI: " + xs[1], color: this.neg_color},
                { value: "+DI: " + xs[2], color: this.pos_color},
            ]
        }
        // calc() {
        //     return {
        //         props: {
        //             length: { def: 15, text: 'DI Length' },
        //             smooth: { def: 15, text: 'ADX Smothing' },
        //         },
        //         conf: { renderer: 'Splines' },
        //         update: `
        //             let [adx, dp, dn] = dmi(length, smooth)
        //             return [adx[0], dp[0], dn[0]]
        //         `
        //     }
        // }
    },
    computed: {
        sett() {
            return this.$props.settings
        },
        adx_color() { 
            return this.sett.adxColor || "#ef1360";
        },
        pos_color() {
            return this.sett.pdiColor || "#3782f2";
        },
        neg_color() {
            return this.sett.mdiColor || "#f48709";
        },
        line_width() {
            return this.sett.lineWidth || 0.75
        },
    }
}
</script>