function isDef(value: any): boolean {
  return value !== undefined && value !== null;
}

function isObj(x: any): boolean {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isNumber(value) {
  return /^\d+$/.test(value);
}

function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export {
  isObj,
  isDef,
  isNumber,
  range
};
