exports.__esModule = true;
var basic_1 = require("../mixins/basic");
var index_1 = require("../mixins/observer/index");
var typing_d_1 = require("./typing.d");
function create(sfc) {
    if (sfc.props) {
        sfc.properties = sfc.props;
        delete sfc.props;
    }
    if (sfc.mixins) {
        sfc.behaviors = sfc.mixins;
        delete sfc.mixins;
    }
    sfc.externalClasses = sfc.classes || [];
    delete sfc.classes;
    sfc.externalClasses.push('custom-class');
    sfc.behaviors = sfc.behaviors || [];
    sfc.behaviors.push(basic_1.basic);
    sfc.options = sfc.options || {};
    sfc.options.multipleSlots = true;
    sfc.options.addGlobalClass = true;
    if (sfc.field) {
        sfc.behaviors.push('wx://form-field');
    }
    index_1.observe(sfc);
    typing_d_1.Component(sfc);
}
exports.create = create;
;
