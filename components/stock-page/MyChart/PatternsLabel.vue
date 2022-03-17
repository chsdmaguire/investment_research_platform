<script>
// Data section splitters (with labels)
import { Overlay } from 'trading-vue-js'

export default {
    name: 'PatternsLabel',
    mixins: [Overlay],
    methods: {
        meta_info() {
            return { author: 'Flibyrd', version: '1.0.1' }
        },
        draw(ctx) {
            let layout = this.$props.layout
            ctx.lineWidth = this.line_width
            ctx.strokeStyle = this.line_color
            this.$props.data.forEach((p, i) => {
                ctx.beginPath()
                let x = layout.t2screen(p[0])
                let y = layout.$2screen(p[2]) - 20

                ctx.fillStyle = this.label_color
                ctx.font = this.new_font
                ctx.textAlign = 'center'
                ctx.fillText(p[1], x, y )
                ctx.lineTo(x, this.layout.height)
                ctx.stroke()
            })
        },
        use_for() { return ['PatternsLabel'] }
    },
    // Define internal setting & constants here
    computed: {
        sett() {
            return this.$props.settings
        },
        new_font() {
            return this.sett.font ||
            '22px ' + this.$props.font.split('px').pop()
        },
        label_color() {
            return this.sett.labelColor || '#ffffff'
        },
        line_color() {
            return this.sett.lineColor || '#4285f4'
        },
        line_width() {
            return this.sett.lineWidth || 1.0
        },
    },
    data() {
        return {}
    }
}
</script>