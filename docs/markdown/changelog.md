# 更新日志

### [v1.0.0-beta.0](https://github.com/youzan/vant-weapp/tree/v1.0.0-beta.0)

#### 新组件

- 新增`Circle`环形进度条组件
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

- 移除了`SwitchCell`组件，请使用`Cell`和`Switch`组件代替


#### 新特性

##### ActionSheet

- 新增`click-overlay`事件
- 新增`close-on-click-action`属性

##### Area

- `reset`方法支持传入`code`参数

##### Button

- 新增`loading-type`属性
- `color`属性支持渐变色

##### Color

- 基础红色更新为`#ee0a24`

##### DatetimePicker

- 新增`filter`属性

##### Field

- 新增`clickable`属性
- 新增`arrow-direction`属性

##### Icon

- 支持`number`类型的`size`属性

##### Loading

- 支持`number`类型的`size`属性

##### Rate

- 新增`gutter`属性
- 支持`string`类型的`size`属性

##### Popup

- 新增`round`属性
- 新增`closeable`属性
- 新增`close-icon`属性

##### Slider

- 支持传入任意范围的`max`和`min`属性
- 支持`number`类型的`bar-height`属性

##### Steps

- 新增`active-icon`属性
- 新增`inactive-icon`属性
