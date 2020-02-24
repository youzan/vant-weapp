# 更新日志

### [v1.0.6](https://github.com/youzan/vant-weapp/tree/v1.0.6)
`2020-02-24`

**Bug Fixes**

- DropdownItem: 修复点击选项时不触发`close`事件 [\#2766](https://github.com/youzan/vant-weapp/pull/2766)
- GoodsActionButton: 修复低版本基础库下的样式问题 [\#2762](https://github.com/youzan/vant-weapp/pull/2762)
- Tabs: 修复点击禁用项时事件参数错误 [\#2758](https://github.com/youzan/vant-weapp/pull/2758)
- Checkbox: 修复动态设置`disabled`属性无效 [\#2748](https://github.com/youzan/vant-weapp/pull/2748)
- Button: add loading color when plain is true [\#2746](https://github.com/youzan/vant-weapp/pull/2746)
- Radio: 修复`label-disabled`文档错误 [\#2763](https://github.com/youzan/vant-weapp/pull/2763)

**Features**

- GoodsActionButton: 新增默认slot [\#2779](https://github.com/youzan/vant-weapp/pull/2779)
- SubmitBar: 更新圆角样式 [\#2755](https://github.com/youzan/vant-weapp/pull/2755)
- Card: 更新样式 [\#2754](https://github.com/youzan/vant-weapp/pull/2754)
- 优化relation部分代码 [\#2760](https://github.com/youzan/vant-weapp/pull/2760)

### [v1.0.5](https://github.com/youzan/vant-weapp/tree/v1.0.5)
`2020-02-07`

**Bug Fixes**

- Radio: 修复`disabled`属性不生效 [\#2711](https://github.com/youzan/vant-weapp/pull/2711)
- Tab: 修复`animated`属性无法动态切换 [\#2712](https://github.com/youzan/vant-weapp/pull/2712)
- Circle: 修正文档错误，`size`属性不支持`string`类型 [\#2694](https://github.com/youzan/vant-weapp/pull/2694)
- 修正文档默认 slot 名称为 default 的错误 [\#2726](https://github.com/youzan/vant-weapp/pull/2726)
- TreeSelect: 修正文档示例代码标签闭合错误 [\#2710](https://github.com/youzan/vant-weapp/pull/2710)

**Features**

- ActionSheet: actions 支持更多 openType [\#2715](https://github.com/youzan/vant-weapp/pull/2715)
- Uploader: 新增开始`disabled`时的组件样式 [\#2720](https://github.com/youzan/vant-weapp/pull/2720)
- Icon: 调整示例小程序页面与vant对齐 [\#2728](https://github.com/youzan/vant-weapp/pull/2728)
- 示例小程序首页与vant对齐 [\#2729](https://github.com/youzan/vant-weapp/pull/2729)
- 完善快速上手文档，增加npm构建说明 [\#2726](https://github.com/youzan/vant-weapp/pull/2726)

### [v1.0.4](https://github.com/youzan/vant-weapp/tree/v1.0.4)
`2020-01-21`

**Bug Fixes**

- Sticky: 修复真机上页面滚动缓慢时无法吸顶/取消吸顶 [\#2703](https://github.com/youzan/vant-weapp/pull/2703)
- DropdownItem: 修复 wx:key 警告 [\#2670](https://github.com/youzan/vant-weapp/pull/2670)
- IndexBar: 文档修复组件引入路径错误 [\#2689](https://github.com/youzan/vant-weapp/pull/2689)
- 升级依赖版本以避免安全警告 [\#2680](https://github.com/youzan/vant-weapp/pull/2680)

**Features**

- Stepper: 新增 disable-long-press 属性 [\#2691](https://github.com/youzan/vant-weapp/pull/2691)
- quickstart: 快速上手新增关闭 style v2 说明 [\#2704](https://github.com/youzan/vant-weapp/pull/2704)
- Search: 新增 background、disabled、input-align 文档示例 [\#2698](https://github.com/youzan/vant-weapp/pull/2698)
- Icon: 文档新增图标文字加载失败说明 [\#2681](https://github.com/youzan/vant-weapp/pull/2681)

### [v1.0.3](https://github.com/youzan/vant-weapp/tree/v1.0.3)
`2020-01-09`

**Bug Fixes**

- Tab: 解决动态添加选项时，顺序错乱和下划线长度不变的问题 [\#2663](https://github.com/youzan/vant-weapp/pull/2663)
- NavBar: 修复返回图标未居中的问题 [\#2633](https://github.com/youzan/vant-weapp/pull/2633)

**Features**

- npm包默认输出es5版本代码 [\#2639](https://github.com/youzan/vant-weapp/pull/2639)
- Steps: 新增外部样式类 desc-class [\#2630](https://github.com/youzan/vant-weapp/pull/2630)

### [v1.0.2](https://github.com/youzan/vant-weapp/tree/v1.0.2)
`2019-12-31`

**Features**

- Skeleton: 新增外部样式类`row-class``avatar-class``title-class` [\#2612](https://github.com/youzan/vant-weapp/pull/2612)
- SwipeCell: 支持动态修改`width`属性 [\#2607](https://github.com/youzan/vant-weapp/pull/2607)
- Uploader: 新增`camera``compressed``maxDuration`属性 [\#2584](https://github.com/youzan/vant-weapp/pull/2584)

**Improvements**
- Tab: 优化弹性滚动效果 [\#2606](https://github.com/youzan/vant-weapp/pull/2606)

**Bug Fixes**

- IndexBar: 修复字母未全部定义时click事件报错 [\#2605](https://github.com/youzan/vant-weapp/pull/2605)
- Field: 修复点击清除图标后下一次点击无效 [\#2602](https://github.com/youzan/vant-weapp/pull/2602)

### [v1.0.1](https://github.com/youzan/vant-weapp/tree/v1.0.1)
`2019-12-23`

**Features**

- Uploader: 新增 sizeType 属性 [\#2563](https://github.com/youzan/vant-weapp/pull/2563)
- GoodsActionButton: 新增 plain 属性 [\#2559](https://github.com/youzan/vant-weapp/pull/2559)
- Uploader: 去除 use-slot 属性 [\#2551](https://github.com/youzan/vant-weapp/pull/2551)
- 新增样式覆盖说明文档 [\#2566](https://github.com/youzan/vant-weapp/pull/2566)

**Improvements**

- 使用 nextTick 优化部分异步逻辑 [\#2561](https://github.com/youzan/vant-weapp/pull/2561)
- wxs 新增 addUnit 方法以减少 setData 调用次数 [\#2550](https://github.com/youzan/vant-weapp/pull/2550)

**Bug Fixes**

- Tag: 修复未依赖 van-icon 组件 [\#2579](https://github.com/youzan/vant-weapp/pull/2579)
- Notify: 修复 safeAreaInsetTop 不生效 [\#2558](https://github.com/youzan/vant-weapp/pull/2558)
- Uploader: 修复 capture 属性不生效 [\#2551](https://github.com/youzan/vant-weapp/pull/2551)

### [v1.0.0](https://github.com/youzan/vant-weapp/tree/v1.0.0)
`2019-12-11`

#### 主要变动

- npm 包名由 vant-weapp 重命名为 @vant/weapp
- 增加十一个新组件
- 增加数十个 API
- 所有组件支持通过`CSS自定义属性`自定义样式
- 使用`env()`重构iOS安全区域适配
- 调整部分 API 命名，废除少量 API

#### 新组件

在 Vant Weapp 1.0 版本中，我们新增了 11 个实用的基础组件：

- <b>Grid 宫格</b>，用于展示内容或进行页面导航
- <b>Image 图片</b>，增强版的 Image 标签，支持图片懒加载与加载失败提示
- <b>Circle 环形进度条</b>，告知用户当前的状态和进度
- <b>Overaly 遮罩层</b>，用于强调特定的页面元素，并阻止用户进行其他操作
- <b>Divider 分割线</b>，区隔内容的分割线
- <b>Sticky 粘性布局</b>，与 CSS 中`position: sticky`属性实现的效果类似
- <b>Skeleton 骨架屏</b>，在待加载区域展示的占位区块，提供界面加载过程中的过渡效果
- <b>IndexBar 索引栏</b>，通讯录中的字母索引栏，用于长列表快速索引
- <b>Uploader 文件上传</b>，上传一个或多个文件
- <b>CountDown 倒计时</b>，用于显示活动倒计时、短信验证码等
- <b>DropdownMenu 下拉菜单</b>，用于列表的分类选择、筛选及排序

![](https://img.yzcdn.cn/public_files/2019/12/06/748d9b70feb76eeaf44f9d6080b6e108.png)

#### 样式定制

在 1.0 迭代计划确定之初，我们就不断思考这样一个问题 -- 该如何给用户提供动态切换主题样式的功能呢？

微信小程序的环境是非常特殊的。不具有动态加载代码的机制，同时微信又限制了代码的主包大小和总大小。传统的基于预设的样式定制过于臃肿，不再适合微信小程序的环境。

微信小程序自定义组件的组件模型相当于一个简化版的 [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=zh-CN)，幸运的是，小程序也支持了 [CSS自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 的特性。最终，我们基于CSS自定义属性设计了样式定制的方案，开发者使用灵活、方便，组件维护也更简单。

从 1.0 版本开始，Vant Weapp 中的所有组件都支持通过 [CSS组定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 进行样式定制，具体使用姿势可查看[相关文档](https://youzan.github.io/vant-weapp/#/theme)

![定制主题](https://img.yzcdn.cn/public_files/2019/06/11/9a066c1a212264c7ae56065e1f13d317.png)

#### 不兼容更新

1.0 版本中包含少量不兼容更新，主要是命名调整和移除个别属性。对于正在使用 0.x 版本的项目，请按照下方的列表依次检查，大部分项目可以<b>无痛升级</b>。

##### Badge

- `BadgeGroup`重命名为`Sidebar`
- `Badge`重命名为`SlidebarItem`
- `active`属性重命名为`activeKey`

##### Notify

- `text`选项重命名为`message`
- `backgroundColor`选项重命名为`background`

##### Popup

- 去除`transitionend`事件，新增 6 个事件

##### SwitchCell

- 移除了`SwitchCell`组件，可以使用`Cell`和`Switch`组件代替

##### Transition

- 去除`transitionend`事件，新增 6 个事件

----

#### 新特性

##### ActionSheet

- 新增`click-overlay`事件
- 新增`close-on-click-action`属性
- 新增`color`属性
- 新增`description`属性
- 新增`round`属性

##### Area

- 新增`columns-placeholder`属性
- `reset`方法支持传入`code`参数

##### Button

- 新增`loading-type`属性
- `color`属性支持渐变色
- 切换`disabled`时增加过渡效果

##### Checkbox

- 新增`icon-size`属性

##### Color

- 基础红色更新为`#ee0a24`

##### DatetimePicker

- 新增`filter`属性

##### Dialog

- 优化文字换行
- 新增`title`插槽
- 新增`confirm-button-color`属性
- 新增`cancel-button-color`属性
- 新增`width`属性
- 新增`overlay-style`属性

##### Field

- 新增`clickable`属性
- 新增`arrow-direction`属性
- 新增`hold-keyboard`属性

##### GoodsActionButton

- 新增`color`属性
- 样式升级为圆角风格

##### GoodsActionIcon

- 新增`icon`插槽
- 新增`dot`属性

##### GridItem

- 新增`info`属性
- 新增`dot`属性

##### Icon

- 新增`dot`属性
- 新增`down`图标
- 新增`wap-hone`实底风格图标
- 支持`number`类型的`size`属性

##### Loading

- 支持`number`类型的`size`属性

##### NoticeBar

- 阻止关闭图标点击事件冒泡

##### Notify

- 新增`clear`方法

##### Popup

- 新增`round`属性
- 新增`closeable`属性
- 新增`close-icon`属性
- 新增`close-icon-position`属性

##### Progress

- 新增`stroke-width`属性

##### Radio

- 新增`icon-size`属性

##### Rate

- 优化手势判断
- 新增`gutter`属性
- 新增`touchable`属性
- 支持`string`类型的`size`属性

##### Search

- 新增`action-text`属性
- 新增`left-icon`插槽
- 新增`right-icon`插槽

##### SlidebarItem

- 新增`dot`属性

##### Slider

- 新增`drag-start`事件
- 新增`drag-end`事件
- 支持传入任意范围的`max`和`min`属性
- 支持`number`类型的`bar-height`属性
- 增加滑动动画
- 增大点击区域

##### SwipeCell

- 新增`name`属性
- 新增`open`事件
- 支持打开状态互斥

##### Switch

- 加载图标的颜色会跟随开关状态变化

##### Stepper

- 支持长按手势
- 新增`input-width`属性
- 新增`button-size`属性
- 新增`decimalLength`属性
- 新增 disablePlus、disableMinus属性

##### Steps

- 新增`active-icon`属性
- 新增`inactive-icon`属性

##### Tabs

- 使用 Sticky 组件重构吸顶实现
- 新增`name`属性
- 新增`line-height`属性
- 新增`ellipsis`属性
- 新增`lazy-render`属性
- `line-width`属性支持`String`类型
- 增加云开发结合示例

##### TreeSelect

- 新增`max`属性
- 新增`content`插槽
