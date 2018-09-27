import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'row',
    type: 'ancestor'
  },
  props: {
    span: Number,
    offset: Number
  },
  data: {
    style: ''
  },
  computed: {
    classes: function classes() {
      var _this$classNames;

      var _this$data = this.data,
          span = _this$data.span,
          offset = _this$data.offset;
      return this.classNames('custom-class', 'van-col', (_this$classNames = {}, _this$classNames["van-col--" + span] = span, _this$classNames["van-col--offset-" + offset] = offset, _this$classNames));
    }
  },
  methods: {
    setGutter: function setGutter(gutter) {
      var padding = gutter / 2 + "px";
      var style = gutter ? "padding-left: " + padding + "; padding-right: " + padding + ";" : '';

      if (style !== this.data.style) {
        this.setData({
          style: style
        });
      }
    }
  }
});