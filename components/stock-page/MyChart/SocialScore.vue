<script>
import { Overlay } from "trading-vue-js";
export default {
  name: "SocialScore",
  mixins: [Overlay],
  methods: {
    meta_info() {
      return {
        author: "Flibyrd",
        version: "1.0.0",
        desc: "Positive, Negative, & Total Sentiment Score on Social Media",
        preset: {
          name: "SocialScore",
          side: "offchart",
          settings: {
            histWidth: 4,
            thresholdSize: 0,
            posColor: "#35a776",
            negColor: "#e54150",
            totalColor: '#f48709'
          },
        },
      };
    },
    draw(ctx) {
      ctx.lineWidth = this.hist_width;
      ctx.strokeStyle = this.color;
      const layout = this.$props.layout;
      const base = layout.$2screen(0) + 0.5;
      const off = this.hist_width % 2 ? 0 : 0.5;
      // Color changed
      let changed = false;
      for (var p of this.$props.data) {
        let pos_value = p[1];
        let neg_value = p[2];

        let x = layout.t2screen(p[0]) - off;
        let y1 = layout.$2screen(pos_value) - 0.5;
        let y2 = layout.$2screen(neg_value) - 0.5;

        if (pos_value > this.threshold_size) {
          ctx.strokeStyle = this.pos_color;
          ctx.beginPath();
          ctx.moveTo(x, base);
          ctx.lineTo(x, y1);
          ctx.stroke();
        }
        if (neg_value < -this.threshold_size) {
          ctx.strokeStyle = this.neg_color;
          ctx.beginPath();
          ctx.moveTo(x, base);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }
 }
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.total_color;

        for (var p of this.$props.data) {
            let total_value = p[3];
            let x = layout.t2screen(p[0]) - off;
            let y3 = layout.$2screen(total_value) - 0.5;
            ctx.lineTo(x, y3)
        }
        ctx.stroke();
     
    },
    use_for() {
      return ["SocialScore"];
    },
    legend(values) {
      let xs = values.slice(1, 4).map((x) => {
        return x.toFixed(Math.abs(x) > 0.001 ? 4 : 8);
      });
      return [
        { value: "Positive Score: " + Math.abs(xs[0]), color: '#ffffff' },
        { value: "Negative Score: " + xs[1], color: '#ffffff' },
        { value: "Total Score: " + xs[2], color: '#ffffff'},
      ];
    },
  },
  // Define internal setting & constants here
  computed: {
    sett() {
      return this.$props.settings;
    },
    hist_width() {
      return this.sett.histWidth || 4;
    },
    threshold_size() {
      return this.sett.thresholdSize || 0;
    },
    pos_color() {
      return this.sett.posColor || "#35a776";
    },
    neg_color() {
      return this.sett.negColor || "#e54150";
    },
    total_color() {
      return this.sett.totalColor || "#f48709";
    },
  },
  data() {
    return {};
  },
};
</script>