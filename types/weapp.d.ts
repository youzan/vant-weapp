type BehaviorOptions = {
  [key: string]: any & ThisType<any>
};

declare function Behavior(options: BehaviorOptions): void
declare function Component(options: any): void

declare namespace Weapp {
  interface Component {
    [key: string]: any
    getRelationNodes(selector: string): any[]
    setData(data: any, callback?: Function): void
  }

  interface FormField {
    data: {
      name: string
      value: any
    }
  }

  interface Target {
    id: string
    tagName: string
    dataset: {
      [key: string]: any
    }
  }

  interface Event {
    /**
     * 代表事件的类型。
     */
    type: string
    /**
     * 页面打开到触发事件所经过的毫秒数。
     */
    timeStamp: number
    /**
     * 触发事件的源组件。
     */
    target: Target
    /**
     * 事件绑定的当前组件。
     */
    currentTarget: Target
    /**
     * 	额外的信息
     */
    detail: any
  }

  interface Touch {
    /**
     * 触摸点的标识符
     */
    identifier: number
    /**
     * 距离文档左上角的距离，文档的左上角为原点 ，横向为X轴，纵向为Y轴
     */
    pageX: number
    /**
     * 距离文档左上角的距离，文档的左上角为原点 ，横向为X轴，纵向为Y轴
     */
    pageY: number
    /**
     * 距离页面可显示区域（屏幕除去导航条）左上角距离，横向为X轴，纵向为Y轴
     */
    clientX: number
    /**
     * 距离页面可显示区域（屏幕除去导航条）左上角距离，横向为X轴，纵向为Y轴
     */
    clientY: number
  }

  interface TouchEvent extends Event {
    touches: Array<Touch>
    changedTouches: Array<Touch>
  }
}
