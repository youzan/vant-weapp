/// <reference types="miniprogram-api-typings" />
declare type IPageScrollOption = WechatMiniprogram.Page.IPageScrollOption;
declare type Scroller = (event: IPageScrollOption) => void;
export declare const pageScrollMixin: (scroller: Scroller) => string;
export {};
