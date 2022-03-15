<script>
import { Overlay } from "trading-vue-js";
export default {
  name: "InsidersOverlay",
  mixins: [Overlay],
  methods: {
    meta_info() {
      return {
        author: "Flibyrd",
        version: "1.0.0",
        desc: "Analyst Recommendations Plot",
        preset: {
          name: "InsidersOverlay",
          side: "offchart",
          settings: {
            histWidth: 30,
            thresholdSize: 0,
            changeColor: "#34a853",
          },
        },
      };
    },
    draw(ctx) {
      ctx.lineWidth = this.hist_width;
      ctx.strokeStyle = this.color;
      const layout = this.$props.layout;
      this.$props.layout.$_hi = 100
      const base = layout.$2screen(0) + 0.5;
      const off = this.hist_width % 2 ? 0 : 0.5;


      // Color changed
      let changed = false;
      for (var p of this.$props.data) {

        let change_value = p[1];

        let x = layout.t2screen(p[0]) - off;
        let y1 = layout.$2screen(change_value) - 0.5;

        if (change_value > 0) {
          ctx.strokeStyle = this.change_color;
          ctx.beginPath();
          ctx.moveTo(x, base);
          ctx.lineTo(x, y1);
          ctx.stroke();
        }

      }
    },
    use_for() {
      return ["InsidersOverlay"];
    },
    legend(values) {
      let xs = values.slice(1, 2).map((x) => {
        return x.toFixed(Math.abs(x) > 0.001 ? 4 : 8);
      });
      return [
        { value: "Amount: " + xs[0], color: this.change_color},
      ];
    },
  },
  // Define internal setting & constants here
  computed: {
    sett() {
      return this.$props.settings;
    },
    hist_width() {
      return this.sett.histWidth || 10;
    },
    threshold_size() {
      return this.sett.thresholdSize || 0;
    },
    change_color() {
      return this.sett.changeColor || "#34a853";
    },
  },
  data() {
    return {};
  },
};
</script>