import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
VantComponent({
    props: {
        size: {
            type: String,
            observer: 'setSizeWithUnit'
        },
        type: {
            type: String,
            value: 'circular'
        },
        color: {
            type: String,
            value: '#c9c9c9'
        }
    },
    data: {
        sizeWithUnit: '30px'
    },
    methods: {
        setSizeWithUnit(size) {
            this.setData({
                sizeWithUnit: addUnit(size)
            });
        }
    }
});
