/// <reference types="miniprogram-api-typings" />
interface File {
    path: string;
    url: string;
    size: number;
    name: string;
    type: string;
    time: number;
    image: boolean;
}
export declare function isImageUrl(url: string): boolean;
export declare function isImageFile(item: File): boolean;
export declare function isVideo(res: any, accept: any): res is WechatMiniprogram.ChooseVideoSuccessCallbackResult;
export {};
