<script>
import { Overlay } from "trading-vue-js";
export default {
  name: "RecsOverlay",
  mixins: [Overlay],
  methods: {
    meta_info() {
      return {
        author: "Flibyrd",
        version: "1.0.0",
        desc: "Analyst Recommendations Plot",
        preset: {
          name: "RecsOverlay",
          side: "offchart",
          settings: {
            histWidth: 30,
            thresholdSize: 0,
            StrongBuyColor: "#34a853",
            height: 100,
            BuyColor: "#46bdc6",
            HoldColor: "#fbb104",
            SellColor: "#ff6d01",
            StrongSellColor: "#ea4335",
          },
        },
      };
    },
    draw(ctx) {
      ctx.lineWidth = this.hist_width;
      ctx.strokeStyle = this.color;
      const layout = this.$props.layout;
      this.$props.layout.$_hi = 100
      console.log(layout)
      const base = layout.$2screen(0) + 0.5;
      const off = this.hist_width % 2 ? 0 : 0.5;


      // Color changed
      let changed = false;
      for (var p of this.$props.data) {

        let strong_buy_value = p[1];
        let buy_value = p[2];
        let hold_value = p[3];
        let sell_value = p[4];
        let strong_sell_value = p[5];
        let sumTotal = p[6];

        let x = layout.t2screen(p[0]) - off;
        let y1 = layout.$2screen(strong_buy_value) - 0.5;
        let y2 = layout.$2screen(buy_value) - 0.5 - y1;
        let y3 = layout.$2screen(hold_value) - 0.5 - y2 - y1;
        let y4 = layout.$2screen(sell_value) - 0.5 - y3 - y2 - y1;
        let y5 = layout.$2screen(strong_sell_value) - 0.5 - y4 - y3 - y2 - y1;
        let fullSize = layout.$2screen(sumTotal) - 0.5

          ctx.strokeStyle =  '#ffffff';;
          ctx.beginPath();
          ctx.moveTo(x, base);
          ctx.lineTo(x, fullSize);
          ctx.stroke();

        if (strong_buy_value > 0) {
          ctx.strokeStyle = this.strong_buy_color;
          ctx.beginPath();
          ctx.moveTo(x, base);
          ctx.lineTo(x, y1);
          ctx.stroke();
        }
        if (buy_value > 0) {
          ctx.strokeStyle = this.buy_color;
          ctx.beginPath();
         ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }

        if (hold_value > 0) {
        ctx.strokeStyle = this.hold_color;
          ctx.beginPath();
          ctx.moveTo(x, y2);
          ctx.lineTo(x, y3);
          ctx.stroke();
        }

          if (sell_value > 0) {
          ctx.strokeStyle = this.sell_color;
          ctx.beginPath();
          ctx.moveTo(x, y3);
          ctx.lineTo(x, y4);
          ctx.stroke();              
          }

            if (strong_sell_value > 0) {
          ctx.strokeStyle = this.strong_sell_color;
          ctx.beginPath();
          ctx.moveTo(x, y4);
          ctx.lineTo(x, y5);
          ctx.stroke();                
            }

      }
    },
    use_for() {
      return ["RecsOverlay"];
    },
    legend(values) {
      let xs = values.slice(1, 6).map((x) => {
        return x.toFixed(Math.abs(x) > 0.001 ? 4 : 8);
      });
      return [
        { value: "Strong Buy: " + xs[0], color: this.strong_buy_color},
        { value: "Buy: " + xs[1], color: this.buy_color },
        { value: "Hold: " + xs[2], color: this.hold_color },
        { value: "Sell: " + xs[3], color: this.sell_color },
        { value: "Strong Sell: " +xs[4], color: this.strong_sell_color },
      ];
    },
  },
  // Define internal setting & constants here
  computed: {
    sett() {
      return this.$props.settings;
    },
    hist_width() {
      return this.sett.histWidth || 30;
    },
    threshold_size() {
      return this.sett.thresholdSize || 0;
    },
    strong_buy_color() {
      return this.sett.StrongBuyColor || "#34a853";
    },
    buy_color() {
      return this.sett.BuyColor || "#46bdc6";
    },
    hold_color() {
      return this.sett.HoldColor || "#fbb104";
    },
    sell_color() {
      return this.sett.SellColor || "#ff6d01";
    },
    strong_sell_color() {
      return this.sett.StrongSellColor || "#ea4335";
    },
  },
  data() {
    return {};
  },
};
</script>