exports.Actionsheet = require('./actionsheet/index');
exports.Dialog = require('./dialog/index');
exports.Field = require('./field/index');
exports.NoticeBar = require('./noticebar/index');
exports.Select = require('./select/index');
exports.Stepper = require('./stepper/index');
exports.Switch = require('./switch/index');
exports.Tab = require('./tab/index');
exports.Toast = require('./toast/index');
exports.TopTips = require('./toptips/index');

// 兼容老版本，在下次大版本发布时会被移除
exports.CheckLabel = require('./select/index');

const { extend } = require('./common/helper');
exports.extend = extend;
