# 更新日志

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
