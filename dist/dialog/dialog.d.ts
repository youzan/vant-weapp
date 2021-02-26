/// <reference types="miniprogram-api-typings" />
export declare type Action = 'confirm' | 'cancel' | 'overlay';
interface DialogOptions {
  lang?: string;
  show?: boolean;
  title?: string;
  width?: string | number | null;
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
  /**
   * @deprecated use beforeClose instead
   */
  asyncClose?: boolean;
  beforeClose?: null | ((action: Action) => Promise<void> | void);
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
}
declare const Dialog: {
  (options: DialogOptions): Promise<
    WechatMiniprogram.Component.Instance<
      Record<string, any>,
      Record<string, any>,
      Record<string, any>,
      Record<string, any>,
      false
    >
  >;
  alert(
    options: DialogOptions
  ): Promise<
    WechatMiniprogram.Component.Instance<
      Record<string, any>,
      Record<string, any>,
      Record<string, any>,
      Record<string, any>,
      false
    >
  >;
  confirm(
    options: DialogOptions
  ): Promise<
    WechatMiniprogram.Component.Instance<
      Record<string, any>,
      Record<string, any>,
      Record<string, any>,
      Record<string, any>,
      false
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
