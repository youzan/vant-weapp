"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseMessageFileProps = exports.chooseMediaProps = exports.chooseVideoProps = exports.chooseImageProps = void 0;
// props for choose image
exports.chooseImageProps = {
    sizeType: {
        type: Array,
        value: ['original', 'compressed'],
    },
    capture: {
        type: Array,
        value: ['album', 'camera'],
    },
};
// props for choose video
exports.chooseVideoProps = {
    capture: {
        type: Array,
        value: ['album', 'camera'],
    },
    compressed: {
        type: Boolean,
        value: true,
    },
    maxDuration: {
        type: Number,
        value: 60,
    },
    camera: {
        type: String,
        value: 'back',
    },
};
// props for choose media
exports.chooseMediaProps = {
    capture: {
        type: Array,
        value: ['album', 'camera'],
    },
    mediaType: {
        type: Array,
        value: ['image', 'video'],
    },
    maxDuration: {
        type: Number,
        value: 60,
    },
    camera: {
        type: String,
        value: 'back',
    },
};
// props for choose file
exports.chooseMessageFileProps = {
    extension: null,
};
