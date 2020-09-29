/// <reference types="wechat-miniprogram" />
declare type DialogOptions = {
  lang?: string;
  show?: boolean;
  title?: string;
  width?: string | number;
  zIndex?: number;
  theme?: string;
  context?:
    | WechatMiniprogram.Page.TrivialInstance
    | WechatMiniprogram.Component.TrivialInstance;
  message?: string;
  overlay?: boolean;
  selector?: string;
  ariaLabel?: string;
  className?: string;
  customStyle?: string;
  transition?: string;
  asyncClose?: boolean;
  businessId?: number;
  sessionFrom?: string;
  overlayStyle?: string;
  appParameter?: string;
  messageAlign?: string;
  sendMessageImg?: string;
  showMessageCard?: boolean;
  sendMessagePath?: string;
  sendMessageTitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  closeOnClickOverlay?: boolean;
  confirmButtonOpenType?: string;
};
declare const Dialog: {
  (options: DialogOptions): Promise<
    WechatMiniprogram.Component.TrivialInstance
  >;
  alert(
    options: DialogOptions
  ): Promise<
    WechatMiniprogram.Component.Instance<
      Record<string, any>,
      Record<string, any>,
      Record<string, any>,
      Record<string, any>
    >
  >;
  confirm(
    options: DialogOptions
  ): Promise<
    WechatMiniprogram.Component.Instance<
      Record<string, any>,
      Record<string, any>,
      Record<string, any>,
      Record<string, any>
    >
  >;
  close(): void;
  stopLoading(): void;
  currentOptions: DialogOptions;
  defaultOptions: DialogOptions;
  setDefaultOptions(options: DialogOptions): void;
  resetDefaultOptions(): void;
};
export default Dialog;
