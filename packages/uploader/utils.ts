import File from './define';

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
