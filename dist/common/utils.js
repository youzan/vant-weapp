function isDef(value) {
  return value !== undefined && value !== null;
}

function isObj(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isNumber(value) {
  return /^\d+$/.test(value);
}

function isSrc(url) {
  return /^(https?:)?\/\/|data:image/.test(url);
}

export { isObj, isDef, isSrc, isNumber };