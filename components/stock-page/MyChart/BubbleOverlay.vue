<script>
// Spline renderer. (SMAs, EMAs, TEMAs...
// you know what I mean)
// TODO: make a real spline, not a bunch of lines...

// Adds all necessary stuff for you.
import { Overlay } from 'trading-vue-js'

export default {
    name: 'BubbleOverlay',
    mixins: [Overlay],
    methods: {
        meta_info() {
            return { 
                author: 'Flibyrd', 
                version: '1.0.0',
                // preset: {
                    settings: {
                        actColor: '#f87991',
                        estColor: '#249EBF',
                        }                    
                   // }

                }
        },

        draw(ctx) {
            const layout = this.$props.layout
            const i = this.data_index

            //actual 
            // ctx.lineWidth = this.line_width
            // ctx.strokeStyle = this.act_color
            // 
            ctx.fillStyle = this.act_color
            for (var p of this.$props.data) {
                let x = layout.t2screen(p[0])
                let y = layout.$2screen(p[1])
               ctx.beginPath()
                ctx.ellipse(x, y, 10, 10, 0, 0, Math.PI * 2);
                ctx.fill();
                }
                ctx.stroke();

            //est 
            // ctx.lineWidth = this.line_width
            // ctx.strokeStyle = this.est_color

            ctx.fillStyle = this.est_color
            
            for (var p of this.$props.data) {
                let x = layout.t2screen(p[0])
                let z = layout.$2screen(p[2])
            ctx.beginPath()
            ctx.ellipse(x, z, 10, 10, 0, 0, Math.PI * 2);
            ctx.fill();
                }
           ctx.stroke();
           
            
        },
        // For all data with these types overlay will be
        // added to the renderer list. And '$props.data'
        // will have the corresponding values. If you want to
        // redefine the default behviour for a prticular
        // indicator (let's say EMA),
        // just create a new overlay with the same type:
        // e.g. use_for() { return ['EMA'] }.
        use_for() { return ['BubbleOverlay'] },

        // Colors for the legend, should have the
        // same dimention as a data point (excl. timestamp)
        // data_colors() { return [this.color] }
    },
    // Define internal setting & constants here
    computed: {       
        sett() {
            return this.$props.settings
        },
        est_color() {
            return this.sett.estColor || '#249EBF'
        },
        act_color() {
            return this.sett.actColor || '#f87991'
        },
        line_width() {
            return this.sett.lineWidth || 3
        },
        // color() {
        //     const n = this.$props.num % 5
        //     return this.sett.color || this.COLORS[n]
        // },
        data_index() {
            return this.sett.dataIndex || 1
        }
    },
    data() {
        return {
            COLORS:
            [
                '#5691ce', '#612ff9',
                '#d50b90', '#ff2316'
            ]
        }
    }

}
</script>