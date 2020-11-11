/// <reference types="miniprogram-api-typings" />
export declare namespace Weapp {
  export interface FormField {
    data: {
      name: string;
      value: any;
    };
  }
  /**
   * relation定义，miniprogram-api-typings缺少this定义
   */
  export interface RelationOption<Instance> {
    /** 目标组件的相对关系 */
    type: 'parent' | 'child' | 'ancestor' | 'descendant';
    /** 关系生命周期函数，当关系被建立在页面节点树中时触发，触发时机在组件attached生命周期之后 */
    linked?(
      this: Instance,
      target: WechatMiniprogram.Component.TrivialInstance
    ): void;
    /** 关系生命周期函数，当关系在页面节点树中发生改变时触发，触发时机在组件moved生命周期之后 */
    linkChanged?(
      this: Instance,
      target: WechatMiniprogram.Component.TrivialInstance
    ): void;
    /** 关系生命周期函数，当关系脱离页面节点树时触发，触发时机在组件detached生命周期之后 */
    unlinked?(
      this: Instance,
      target: WechatMiniprogram.Component.TrivialInstance
    ): void;
    /** 如果这一项被设置，则它表示关联的目标节点所应具有的behavior，所有拥有这一behavior的组件节点都会被关联 */
    target?: string;
  }
  /**
   * obverser定义，miniprogram-api-typings缺少this定义
   */
  type Observer<Instance, T> = (
    this: Instance,
    newVal: T,
    oldVal: T,
    changedPath: Array<string | number>
  ) => void;
  /**
   * methods定义，miniprogram-api-typings缺少this定义
   */
  export interface MethodOption<Instance> {
    [name: string]: (this: Instance, ...args: any[]) => any;
  }
  export interface ComputedOption<Instance> {
    [name: string]: (this: Instance) => any;
  }
  type PropertyType =
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | ArrayConstructor
    | ObjectConstructor
    | FunctionConstructor
    | null;
  export interface PropertyOption {
    [name: string]:
      | PropertyType
      | PropertyType[]
      | {
          /** 属性类型 */
          type: PropertyType | PropertyType[];
          /** 属性初始值 */
          value?: any;
          /** 属性值被更改时的响应函数 */
          observer?:
            | string
            | Observer<WechatMiniprogram.Component.TrivialInstance, any>;
          /** 属性的类型（可以指定多个） */
          optionalTypes?: PropertyType[];
        };
  }
  export {};
}
