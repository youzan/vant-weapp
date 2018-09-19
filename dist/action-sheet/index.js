exports.__esModule = true;
var create_1 = require("../common/create");
create_1.create({
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        actions: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        onSelect: function (event) {
            var index = event.currentTarget.dataset.index;
            var item = this.data.actions[index];
            if (item && !item.disabled && !item.loading) {
                this.$emit('select', item);
            }
        },
        onCancel: function (type) {
            this.$emit('cancel');
        },
        onClose: function () {
            this.$emit('close');
        }
    }
});
