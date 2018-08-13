'use strict';

exports.__esModule = true;
function isDef(value) {
  return value !== undefined && value !== null;
}

function isObj(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

exports.isObj = isObj;
exports.isDef = isDef;