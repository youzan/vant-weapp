"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IMAGE_EXT = ['jpeg', 'jpg', 'gif', 'png', 'svg'];
function isImageUrl(url) {
    return IMAGE_EXT.some(function (ext) { return url.indexOf("." + ext) !== -1; });
}
exports.isImageUrl = isImageUrl;
function isImageFile(item) {
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
exports.isImageFile = isImageFile;
function isVideo(res, accept) {
    return accept === 'video';
}
exports.isVideo = isVideo;
