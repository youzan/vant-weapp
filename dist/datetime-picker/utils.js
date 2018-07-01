'use strict';

function partStartWithZero(num, strlen) {
  var zeros = '';
  while (zeros.length < strlen) {
    zeros += '0';
  }
  return (zeros + num).slice(-strlen);
}

module.exports.genNumber = function genNumber(begin, end, strlen) {
  var nums = [];
  while (begin <= end) {
    nums.push(partStartWithZero(begin, strlen));
    begin++;
  }
  return nums;
};

module.exports.moment = function moment(date) {
  var formatStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY:MM:DD';

  if (!date && date !== 0) date = new Date();

  date = new Date(date);
  if (date.toString() === 'Invalid Date') throw new Error('Invalid Date');

  var getDateValue = function getDateValue(method, fn) {
    return fn ? fn(date['get' + method]()) : date['get' + method]();
  };
  var map = new Map();

  map.set(/(Y+)/i, function () {
    return getDateValue('FullYear', function (year) {
      return (year + '').substr(4 - RegExp.$1.length);
    });
  });
  map.set(/(M+)/, function () {
    return getDateValue('Month', function (month) {
      return partStartWithZero(month + 1, RegExp.$1.length);
    });
  });
  map.set(/(D+)/i, function () {
    return getDateValue('Date', function (date) {
      return partStartWithZero(date, RegExp.$1.length);
    });
  });
  map.set(/(H+)/i, function () {
    return getDateValue('Hours', function (hour) {
      return partStartWithZero(hour, RegExp.$1.length);
    });
  });
  map.set(/(m+)/, function () {
    return getDateValue('Minutes', function (minute) {
      return partStartWithZero(minute, RegExp.$1.length);
    });
  });
  map.set(/(s+)/, function () {
    return getDateValue('Seconds', function (second) {
      return partStartWithZero(second, RegExp.$1.length);
    });
  });

  for (var _iterator = map, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref2 = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref2 = _i.value;
    }

    var _ref = _ref2;
    var reg = _ref[0];
    var fn = _ref[1];

    if (reg.test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1, fn.call(null));
    }
  }

  return formatStr;
};

module.exports.iso2utc = function (string) {
  var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
  if (string) {
    var d = string.match(new RegExp(regexp));
    var offset = 0;
    var date = new Date(d[1], 0, 1);

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
      offset = Number(d[16]) * 60 + Number(d[17]);
      offset *= d[15] == '-' ? 1 : -1;
    }

    offset -= date.getTimezoneOffset();

    return Number(date) + offset * 60 * 1000;
  } else {
    return string;
  }
};