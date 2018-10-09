import { VantComponent } from '../common/component';
VantComponent({
  classes: ['title-class', 'label-class', 'value-class'],
  props: {
    title: null,
    value: null,
    url: String,
    icon: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: String,
    customStyle: String,
    linkType: {
      type: String,
      value: 'navigateTo'
    },
    border: {
      type: Boolean,
      value: true
    }
  },
  computed: {
    cellClass: function cellClass() {
      var data = this.data;
      return this.classNames('custom-class', 'van-cell', {
        'van-cell--center': data.center,
        'van-cell--required': data.required,
        'van-cell--borderless': !data.border,
        'van-cell--clickable': data.isLink || data.clickable
      });
    },
    titleStyle: function titleStyle() {
      var titleWidth = this.data.titleWidth;
      return titleWidth ? "max-width: " + titleWidth + ";min-width: " + titleWidth : '';
    }
  },
  methods: {
    onClick: function onClick() {
      var url = this.data.url;

      if (url) {
        wx[this.data.linkType]({
          url: url
        });
      }

      this.$emit('click');
    }
  }
});