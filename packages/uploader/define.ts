export default interface File {
  path: string; // 上传临时地址
  url: string; // 上传临时地址
  size: number; // 上传大小
  name: string; // 上传文件名称，accept="image"不存在
  type: string; // 上传类型，accept="image"不存在
  time: number; // 上传时间，accept="image"不存在
  image: boolean; // 是否为图片
};
