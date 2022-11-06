/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
declare type IPageScrollOption = WechatMiniprogram.Page.IPageScrollOption;
declare type Scroller = (this: WechatMiniprogram.Component.TrivialInstance, event?: IPageScrollOption) => void;
export declare function pageScrollMixin(scroller: Scroller): string;
export {};
