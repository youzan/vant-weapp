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

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

export { isObj, isDef, isNumber, range };