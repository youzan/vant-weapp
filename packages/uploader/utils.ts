interface File {
  path: string; // 上传临时地址
  url: string; // 上传临时地址
  size: number; // 上传大小
  name: string; // 上传文件名称，accept="image" 不存在
  type: string; // 上传类型，accept="image" 不存在
  time: number; // 上传时间，accept="image" 不存在
  image: boolean; // 是否为图片
}

const IMAGE_EXT = ['jpeg', 'jpg', 'gif', 'png', 'svg'];

export function isImageUrl(url: string): boolean {
  return IMAGE_EXT.some(ext => url.indexOf(`.${ext}`) !== -1);
}

export function isImageFile(item: File): boolean {
  if (item.type) {
    return item.type.indexOf('image') === 0;
  }

  if (item.path) {
    return isImageUrl(item.path);
  }

  if (item.url) {
    return isImageUrl(item.url);
  }

  return false;
}

export function isVideo(
  res,
  accept
): res is WechatMiniprogram.ChooseVideoSuccessCallbackResult {
  return accept === 'video';
}
