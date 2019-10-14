# 更新日志

### [v1.0.0-beta.2](https://github.com/youzan/vant-weapp/tree/v1.0.0-beta.2)

#### 主要变动

- Transition去除`transitionend`事件，新增若干事件
- 增加一个新组件
- 增加多个 API

#### 新组件

- 新增`CountDown`倒计时组件

#### 新特性

##### NavBar

- 修复`safeAreaInsetTop`在安卓设备上不生效

##### Area

- 新增`columns-placeholder`属性

##### Dialog

- 新增`width`属性
- 新增`overlay-style`属性
- 优化样式

##### Slider

- 增加滑动动画
- 增大点击区域
- 修复在某些设备中造成页面横向溢出

##### ActionSheet

- 新增`description`属性

##### Rate

- 修复某些情况下高度异常

##### Stepper

- 修复当`step`为小数时加减失效

##### Tabs

- 修复组件初始化报错

### [v1.0.0-beta.1](https://github.com/youzan/vant-weapp/tree/v1.0.0-beta.1)

#### 主要变动

- 使用`env()`重构iOS安全区域适配
- 增加多个 API

#### 新特性

##### Tab

- 新增`name`属性
- 新增`line-height`属性
- `line-width`属性支持`String`类型

##### Popup

- 调整圆角为`20px`

##### Stepper

- 新增`decimalLength`属性

##### SwipeCell

- 支持打开状态互斥

##### Button

- 切换`disabled`时增加过渡效果

##### GoodsActionButton

- 样式升级为圆角风格

##### GoodsActionIcon

- 新增`dot`属性

##### ActionSheet

- 新增`color`属性
- 新增`round`属性

##### GridItem

- 新增`info`属性
- 新增`dot`属性

##### Rate

- 优化手势判断

### [v1.0.0-beta.0](https://github.com/youzan/vant-weapp/tree/v1.0.0-beta.0)

#### 主要变动

- 支持主题定制
- 增加四个新组件
- 增加数十个 API
- 调整部分 API 命名

#### 新组件

- 新增`Grid`宫格组件
- 新增`Circle`环形进度条组件
- 新增`Divider`分割线组件
- 新增`Overlay`遮罩层组件
- 新增`Sticky`粘性布局组件

#### 不兼容更新

##### Badge

- `BadgeGroup`重命名为`Sidebar`
- `Badge`重命名为`SlidebarItem`

##### Notify

- `text`选项重命名为`message`
- `backgroundColor`选项重命名为`background`

##### Popup

- `transitionEnd`事件重命名为`transitionend`

##### SwitchCell

- 移除了`SwitchCell`组件，可以使用`Cell`和`Switch`组件代替


#### 新特性

##### ActionSheet

- 新增`click-overlay`事件
- 新增`close-on-click-action`属性

##### Area

- `reset`方法支持传入`code`参数

##### Button

- 新增`loading-type`属性
- `color`属性支持渐变色

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

##### Field

- 新增`clickable`属性
- 新增`arrow-direction`属性

##### GoodsActionButton

- 新增`color`属性

##### GoodsActionIcon

- 新增`icon`插槽

##### Icon

- 新增`dot`属性
- 新增`down`图标
- 新增`wap-hone`实底风格图标
- 支持`number`类型的`size`属性

##### Loading

- 支持`number`类型的`size`属性

##### Popup

- 新增`round`属性
- 新增`closeable`属性
- 新增`close-icon`属性
- 新增`close-icon-position`属性

##### Progress

- 新增`stroke-width`属性

##### Rate

- 新增`gutter`属性
- 新增`touchable`属性
- 支持`string`类型的`size`属性

##### Radio

- 新增`icon-size`属性

##### SlidebarItem

- 新增`dot`属性

##### Slider

- 新增`drag-start`事件
- 新增`drag-end`事件
- 支持传入任意范围的`max`和`min`属性
- 支持`number`类型的`bar-height`属性

##### Search

- 新增`action-text`属性
- 新增`left-icon`插槽
- 新增`right-icon`插槽

##### Switch

- 加载图标的颜色会跟随开关状态变化

##### SwipeCell

- 新增`name`属性

##### Stepper

- 支持长按手势
- 新增`input-width`属性
- 新增`button-size`属性

##### Steps

- 新增`active-icon`属性
- 新增`inactive-icon`属性

##### TreeSelect

- 新增`max`属性
- 新增`content`插槽
