export default function(options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: 'Vant Weapp 组件库演示'
      };
    },
    ...options
  });
}
