import { VantComponent } from '../common/component';
VantComponent({
    classes: [
        'title-class',
        'label-class',
        'value-class'
    ],
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
        cellClass() {
            const { data } = this;
            return this.classNames('custom-class', 'van-cell', {
                'van-hairline': data.border,
                'van-cell--center': data.center,
                'van-cell--required': data.required,
                'van-cell--clickable': data.isLink || data.clickable
            });
        },
        titleStyle() {
            const { titleWidth } = this.data;
            return titleWidth ? `max-width: ${titleWidth};min-width: ${titleWidth}` : '';
        }
    },
    methods: {
        onClick() {
            const { url } = this.data;
            if (url) {
                wx[this.data.linkType]({ url });
            }
            this.$emit('click');
        }
    }
});
