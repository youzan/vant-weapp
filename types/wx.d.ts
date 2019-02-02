interface SystemInfo {
  /**
   * 设备品牌
   */
  brand: string
  /**
   * 设备型号
   */
  model: string
  /**
   * 设备像素比
   */
  pixelRatio: number
  /**
   * 屏幕宽度，单位px
   */
  screenWidth: number
  /**
   * 屏幕高度，单位px
   */
  screenHeight: number
  /**
   * 可使用窗口宽度，单位px
   */
  windowWidth: number
  /**
   * 可使用窗口高度，单位px
   */
  windowHeight: number
  /**
   * 状态栏的高度，单位px
   */
  statusBarHeight: number
  /**
   * 微信设置的语言
   */
  language: string
  /**
   * 微信版本号
   */
  version: string
  /**
   * 操作系统及版本
   */
  system: string
  /**
   * 客户端平台
   */
  platform: string
  /**
   * 用户字体大小（单位px）。以微信客户端「我-设置-通用-字体大小」中的设置为准
   */
  fontSizeSetting: number
  /**
   * 客户端基础库版本
   */
  SDKVersion: string
  /**
   * 设备性能等级（仅Android小游戏）。取值为：-2 或 0（该设备无法运行小游戏），-1（性能未知），>=1（设备性能值，该值越高，设备性能越好，目前最高不到50）
   */
  benchmarkLevel: number
}

type TimingFunction =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-in-out'
  | 'ease-out'
  | 'step-start'
  | 'step-end';

interface AnimationOptions {
  /**
   * 动画持续时间，单位ms
   */
  duration?: number
  /**
   * 定义动画的效果
   */
  timingFunction?: TimingFunction
  /**
   * 动画延迟时间，单位 ms
   */
  delay?: number
  /**
   * 设置transform-origin
   */
  transformOrigin?: string
}

interface Animation {
  /**
   * 导出动画队列。export 方法每次调用后会清掉之前的动画操作。
   */
  export(): object

  /**
   * 表示一组动画完成。可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画。
   */
  step(object: AnimationOptions): void

  /**
   * 透明度，参数范围 0~1
   */
  opacity(value: number): Animation

  /**
   * 颜色值
   */
  backgroundColor(color: string): Animation
  /**
   * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
   */
  width(length: number): Animation
  /**
   * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
   */
  height(length: number): Animation
  /**
   * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
   */
  top(length: number): Animation
  /**
   * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
   */
  left(length: number): Animation
  /**
   * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
   */
  bottom(length: number): Animation
  /**
   * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
   */
  right(length: number): Animation
  /**
   * deg的范围-180~180，从原点顺时针旋转一个deg角度
   */
  rotate(deg: number): Animation
  /**
   * deg的范围-180~180，在X轴旋转一个deg角度
   */
  rotateX(deg: number): Animation
  /**
   * deg的范围-180~180，在Y轴旋转一个deg角度
   */
  rotateY(deg: number): Animation
  /**
   * deg的范围-180~180，在Z轴旋转一个deg角度
   */
  rotateZ(deg: number): Animation
  /**
   * 同transform-function rotate3d
   */
  rotate3d(x: number, y: number, z: number, deg: number): Animation
  /**
   * 一个参数时，表示在X轴、Y轴同时缩放sx倍数；两个参数时表示在X轴缩放sx倍数，在Y轴缩放sy倍数
   */
  scale(sx: number, sy?: number): Animation
  /**
   * 在X轴缩放sx倍数
   */
  scaleX(sx: number): Animation
  /**
   * 在Y轴缩放sy倍数
   */
  scaleY(sy: number): Animation
  /**
   * 在Z轴缩放sy倍数
   */
  scaleZ(sz: number): Animation
  /**
   * 在X轴缩放sx倍数，在Y轴缩放sy倍数，在Z轴缩放sz倍数
   */
  scale3d(sx: number, sy: number, sz: number): Animation
  /**
   * 一个参数时，表示在X轴偏移tx，单位px；两个参数时，表示在X轴偏移tx，在Y轴偏移ty，单位px。
   */
  translate(tx: number, ty?: number): Animation
  /**
   * 在X轴偏移tx，单位px
   */
  translateX(tx: number): Animation
  /**
   * 在Y轴偏移tx，单位px
   */
  translateY(tx: number): Animation
  /**
   * 在Z轴偏移tx，单位px
   */
  translateZ(tx: number): Animation
  /**
   * 在X轴偏移tx，在Y轴偏移ty，在Z轴偏移tz，单位px
   */
  translate3d(tx: number, ty: number, tz: number): Animation
  /**
   * 参数范围-180~180；一个参数时，Y轴坐标不变，X轴坐标延顺时针倾斜ax度；两个参数时，分别在X轴倾斜ax度，在Y轴倾斜ay度
   */
  skew(ax: number, ay?: number): Animation
  /**
   * 参数范围-180~180；Y轴坐标不变，X轴坐标延顺时针倾斜ax度
   */
  skewX(ax: number): Animation
  /**
   * 参数范围-180~180；X轴坐标不变，Y轴坐标延顺时针倾斜ay度
   */
  skewY(ay: number): Animation
  /**
   * 同transform-function matrix
   */
  matrix(
    a: number,
    b: number,
    c: number,
    d: number,
    tx: number,
    ty: number
  ): Animation
  /**
   * 同transform-function matrix3d
   */
  matrix3d(): Animation
}

interface FieldsOptions {
  /**
   * 是否返回节点 id
   */
  id?: boolean
  /**
   * 是否返回节点 dataset
   */
  dataset?: boolean
  rect?: boolean
  size?: boolean
  scrollOffset?: boolean
  properties?: string[]
  computedStyle?: string[]
  context?: boolean
}

interface BoundingClientRect {
  id: string
  dataset: object
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
}

interface IntersectionRect {
  /**
   * 	左边界
   */
  left: number
  /**
   * 右边界
   */
  right: number
  /**
   * 上边界
   */
  top: number
  /**
   * 下边界
   */
  bottom: number
}

interface ScrollOffset {
  /**
   * 节点的 ID
   */
  id: string
  /**
   * 节点的 dataset
   */
  dataset: Object
  /**
   * 节点的水平滚动位置
   */
  scrollLeft: number
  /**
   * 节点的竖直滚动位置
   */
  scrollTop: number
}

interface NodesRef {
  /**
   * 获取节点的相关信息。需要获取的字段在fields中指定。返回值是 nodesRef 对应的 selectorQuery
   */
  fields(object: FieldsOptions): object

  /**
   * 添加节点的布局位置的查询请求。相对于显示区域，以像素为单位。其功能类似于 DOM 的 getBoundingClientRect。返回 NodesRef 对应的 SelectorQuery。
   */
  boundingClientRect(callback: (res: BoundingClientRect) => void): SelectorQuery

  /**
   * 添加节点的滚动位置查询请求。以像素为单位。节点必须是 scroll-view 或者 viewport，返回 NodesRef 对应的 SelectorQuery。
   */
  scrollOffset(callback: (res: ScrollOffset) => void): SelectorQuery

  /**
   * 添加节点的 Context 对象查询请求。目前支持 VideoContext、CanvasContext、LivePlayerContext 和 MapContext 的获取。
   */
  context(callback: (res: { content: any }) => void): SelectorQuery
}

interface SelectorQuery {
  /**
   * 将选择器的选取范围更改为自定义组件 component 内。（初始时，选择器仅选取页面范围的节点，不会选取任何自定义组件中的节点）。
   * @param component [description]
   */
  in(component: Weapp.Component): SelectorQuery

  /**
   * 在当前页面下选择第一个匹配选择器 selector 的节点。返回一个 NodesRef 对象实例，可以用于获取节点信息。
   */
  select(selector: string): NodesRef

  /**
   * 在当前页面下选择匹配选择器 selector 的所有节点。
   */
  selectAll(selector: string): NodesRef

  /**
   * 选择显示区域。可用于获取显示区域的尺寸、滚动位置等信息。
   */
  selectViewport(): NodesRef

  /**
   * 执行所有的请求。请求结果按请求次序构成数组，在callback的第一个参数中返回。
   */
  exec(callback?: Function): NodesRef
}

interface ObserverOptions {
  /**
   * 一个数值数组，包含所有阈值。
   */
  thresholds?: number[]
  /**
   * 初始的相交比例，如果调用时检测到的相交比例与这个值不相等且达到阈值，则会触发一次监听器的回调函数。
   */
  initialRatio?: number
  /**
   * 是否同时观测多个目标节点（而非一个），如果设为 true ，observe 的 targetSelector 将选中多个节点（注意：同时选中过多节点将影响渲染性能）
   */
  observeAll?: boolean
}

interface Margins {
  /**
   * 节点布局区域的左边界
   */
  left: number
  /**
   * 节点布局区域的右边界
   */
  right: number
  /**
   * 节点布局区域的上边界
   */
  top: number
  /**
   * 节点布局区域的下边界
   */
  bottom: number
}

interface IntersectionObserver {
  /**
   * 停止监听。回调函数将不再触发
   */
  disconnect(): void

  /**
   * 使用选择器指定一个节点，作为参照区域之一。
   */
  relativeTo(selector: string, object: Margins): IntersectionObserver

  /**
   * 指定页面显示区域作为参照区域之一
   */
  relativeToViewport(object: Margins): IntersectionObserver

  /**
   * 指定目标节点并开始监听相交状态变化情况
   */
  observe(
    selector: string,
    callback: (
      object: {
    /**
         * 相交比例
         */
      intersectionRatio: number
    /**
         * 相交区域的边界
         */
      intersectionRect: IntersectionRect
    /**
         * 目标边界
         */
      boundingClientRect: IntersectionRect
    /**
         * 参照区域的边界
         */
      relativeRect: IntersectionRect
    /**
         * 相交检测时的时间戳
         */
      time: number
      }
    ) => void
  ): void
}

interface Wx {
  /**
   * 获取系统信息
   */
  getSystemInfo(object: {
  success: (res: SystemInfo) => void
  fail?: () => void
  complete?: () => void
  }): void

  /**
   * 获取系统信息
   */
  getSystemInfoSync(): SystemInfo

  /**
   * 创建一个动画实例 animation。调用实例的方法来描述动画。最后通过动画实例的 export 方法导出动画数据传递给组件的 animation 属性。
   */
  createAnimation(object: AnimationOptions): Animation

  /**
   * 返回一个 SelectorQuery 对象实例。在自定义组件或包含自定义组件的页面中，应使用 this.createSelectorQuery() 来代替。
   */
  createSelectorQuery(): SelectorQuery

  createIntersectionObserver(
    component: Weapp.Component,
    options: ObserverOptions
  ): IntersectionObserver
}

declare const wx: Wx;
