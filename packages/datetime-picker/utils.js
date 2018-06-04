function partStartWithZero(num, strlen) {
  let zeros = '';
  while (zeros.length < strlen) {
    zeros += '0';
  }
  return (zeros + num).slice(-strlen);
}

module.exports.genNumber = function genNumber(begin, end, strlen) {
  let nums = [];
  while (begin <= end) {
    nums.push(partStartWithZero(begin, strlen));
    begin++;
  }
  return nums;
}

module.exports.moment = function moment(date, formatStr = 'YYYY:MM:DD') {
  if (!date && date !== 0) date = new Date();

  date = new Date(date);
  if (date.toString() === 'Invalid Date') throw new Error('Invalid Date');

  let getDateValue = (method, fn) => (fn ? fn(date[`get${method}`]()) : date[`get${method}`]());
  let map = new Map();

  map.set(/(Y+)/i, () => getDateValue('FullYear', year => (year + '').substr(4 - RegExp.$1.length)));
  map.set(/(M+)/, () => getDateValue('Month', month => partStartWithZero(month + 1, RegExp.$1.length)));
  map.set(/(D+)/i, () => getDateValue('Date', date => partStartWithZero(date, RegExp.$1.length)));
  map.set(/(H+)/i, () => getDateValue('Hours', hour => partStartWithZero(hour, RegExp.$1.length)));
  map.set(/(m+)/, () => getDateValue('Minutes', minute => partStartWithZero(minute, RegExp.$1.length)));
  map.set(/(s+)/, () => getDateValue('Seconds', second => partStartWithZero(second, RegExp.$1.length)));

  for (const [reg, fn] of map) {
    if (reg.test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1, fn.call(null));
    }
  }

  return formatStr;
}

module.exports.iso2utc = function (string) {
  let regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
  if (string) {
    let d = string.match(new RegExp(regexp));
    let offset = 0;
    let date = new Date(d[1], 0, 1);

    if (d[3]) {
      date.setMonth(d[3] - 1);
    }
    if (d[5]) {
      date.setDate(+d[5]);
    }
    if (d[7]) {
      date.setHours(d[7]);
    }
    if (d[8]) {
      date.setMinutes(d[8]);
    }
    if (d[10]) {
      date.setSeconds(d[10]);
    }
    if (d[12]) {
      date.setMilliseconds(Number("0." + d[12]) * 1000);
    }
    if (d[14]) {
      offset = (Number(d[16]) * 60) + Number(d[17]);
      offset *= ((d[15] == '-') ? 1 : -1);
    }

    offset -= date.getTimezoneOffset();

    return (Number(date) + (offset * 60 * 1000));
  } else {
    return string;
  }
}
