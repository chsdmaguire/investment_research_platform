<script>
import { Overlay } from 'trading-vue-js'

export default {
    name: 'BubbleOverlay',
    mixins: [Overlay],
    methods: {
        meta_info() {
            return { 
                author: 'Flibyrd', 
                version: '1.0.0',
                preset: {
                    name: "BubbleOverlay",
                    side: "offchart",
                    settings: {
                        actColor: '#f87991',
                        estColor: '#249EBF',
                        }                    
                   }

                }
        },

        draw(ctx) {
            const layout = this.$props.layout
            const i = this.data_index

            //actual 
            

            for (var p of this.$props.data) {
                let x = layout.t2screen(p[0]);
                let y = layout.$2screen(p[1]);
                let z = layout.$2screen(p[2]);

                ctx.strokeStyle = this.act_color;
                ctx.beginPath();
                ctx.ellipse(x, y, 10, 10, 0, 0, Math.PI * 2);
                ctx.fillStyle = this.act_color;
                ctx.fill();
                ctx.stroke();
               
                
                // estimate
                ctx.strokeStyle = this.est_color;
                ctx.beginPath();
                ctx.ellipse(x, z, 10, 10, 0, 0, Math.PI * 2);
                 ctx.fillStyle = this.est_color;
                ctx.fill();
                ctx.stroke();         
            }         
        },
        use_for() { return ['BubbleOverlay'] },
        legend(values) {
            let xs = values.slice(1, 3).map((x) => {
            return x.toFixed(Math.abs(x) > 0.001 ? 4 : 8);
            });

            return [
                { value: "Actual: " + xs[0], color: this.act_color},
                { value: "Estimate: " + xs[1], color: this.est_color},
            ]
        }
    },
    computed: {       
        sett() {
            return this.$props.settings
        },
        est_color() {
            return this.sett.estColor || '#249EBF';
        },
        act_color() {
            return this.sett.actColor || '#f87991';
        },
        line_width() {
            return this.sett.lineWidth || 3
        },
    },
    data() {
        return {
        }
    }

}
</script>