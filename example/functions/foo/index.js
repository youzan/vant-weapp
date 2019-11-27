// 这是一个测试用的云函数
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async event => {
  const wxContext = cloud.getWXContext();

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  };
};
