import { VantComponent } from '../common/component';
VantComponent({
    props: {
        color: String,
        vertical: Boolean,
        type: {
            type: String,
            value: 'circular'
        },
        size: String,
        textSize: String
    }
});
