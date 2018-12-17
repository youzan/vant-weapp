import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'col',
    type: 'descendant',
    linked: function linked(target) {
      if (this.data.gutter) {
        target.setGutter(this.data.gutter);
      }
    }
  },
  props: {
    gutter: Number
  },
  watch: {
    gutter: 'setGutter'
  },
  mounted: function mounted() {
    if (this.data.gutter) {
      this.setGutter();
    }
  },
  methods: {
    setGutter: function setGutter() {
      var _this = this;

      var gutter = this.data.gutter;
      var margin = "-" + Number(gutter) / 2 + "px";
      var style = gutter ? "margin-right: " + margin + "; margin-left: " + margin + ";" : '';
      this.set({
        style: style
      });
      this.getRelationNodes('../col/index').forEach(function (col) {
        col.setGutter(_this.data.gutter);
      });
    }
  }
});