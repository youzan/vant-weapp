## 更新日志

### [0.3.0](https://github.com/youzan/vant-weapp/tree/v0.3.0)
`2018-09-07`

**Breaking changes**

- Actionsheet: 重命名为 ActionSheet [\#514](https://github.com/youzan/vant-weapp/pull/514)
- Toast: 修改组件引入路径，避免编辑器报错的问题 [\#524](https://github.com/youzan/vant-weapp/pull/524)
- 组件统一使用 ES module 进行模块引用 [\#499](https://github.com/youzan/vant-weapp/pull/499)

**Improvements**

- 新增 Tab 标签页组件 [\#496](https://github.com/youzan/vant-weapp/pull/496)
- 新增 Dialog 对话框组件 [\#496](https://github.com/youzan/vant-weapp/pull/496)
- 优化 Popup 动画，支持退场动画 [\#498](https://github.com/youzan/vant-weapp/pull/498)
- 优化组件风格、代码体积 [\#523](https://github.com/youzan/vant-weapp/pull/523)
- ActionSheet 支持微信开放能力 [\#516](https://github.com/youzan/vant-weapp/pull/516)

**Bug Fixes**

- 修复 ActionSheet subname 属性不生效的问题 [\#515](https://github.com/youzan/vant-weapp/pull/515)
- 修复 Card currency 默认值不生效的问题 [\#525](https://github.com/youzan/vant-weapp/pull/525)
- 修复 Field title 宽度错误的问题 [\#525](https://github.com/youzan/vant-weapp/pull/525)
- 修复 Tab card 类型下 color 属性不生效的问题 [\#520](https://github.com/youzan/vant-weapp/pull/520)
- 修复 Button 在加载状态下仍然显示文字的问题 [\#503](https://github.com/youzan/vant-weapp/pull/503)


### [0.2.1](https://github.com/youzan/vant-weapp/tree/v0.2.1)
`2018-08-31`

**Improvements**

- 新增 Progress 进度条组件 [\#459](https://github.com/youzan/vant-weapp/pull/459)
- Field：增加 title-width 属性 [\#482](https://github.com/youzan/vant-weapp/pull/482)
- Search: 支持在原生 form 组件内使用 [\#480](https://github.com/youzan/vant-weapp/pull/480)
- Switch: 支持在原生 form 组件内使用 [\#478](https://github.com/youzan/vant-weapp/pull/478)
- Stepper: 支持在原生 form 组件内使用 [\#477](https://github.com/youzan/vant-weapp/pull/477)
- SwitchCell: 支持在原生 form 组件内使用 [\#479](https://github.com/youzan/vant-weapp/pull/479)
- Field: 优化清除按钮颜色 [\#476](https://github.com/youzan/vant-weapp/pull/476)
- Icon: 新增 class-prefix 属性 [\#475](https://github.com/youzan/vant-weapp/pull/475)

**Bug Fixes**

- 修复 Search focus 属性不生效的问题 [\#484](https://github.com/youzan/vant-weapp/pull/484)
- 修复 Tabbar z-index 不生效的问题 [\#474](https://github.com/youzan/vant-weapp/pull/474)


### [0.2.0](https://github.com/youzan/vant-weapp/tree/v0.2.0)
`2018-08-22`

**Breaking changes**

- 组件增加 addGlobalClass 属性，支持外部样式覆盖 [\#449](https://github.com/youzan/vant-weapp/pull/449)
- 优化 Notify 模块导出方式，支持 ES6 模块引入 [\#448](https://github.com/youzan/vant-weapp/pull/448)

**Improvements**

- 新增 Slider 组件 [\#453](https://github.com/youzan/vant-weapp/pull/453)
- 新增 SwitchCell 组件 [\#455](https://github.com/youzan/vant-weapp/pull/455)
- 新增 Icon aim 类型 [\#457](https://github.com/youzan/vant-weapp/pull/457)
- 新增 Field name 属性 [\#450](https://github.com/youzan/vant-weapp/pull/450)
- 新增 multi-ellipsis 内部样式类 [\#456](https://github.com/youzan/vant-weapp/pull/456)

**Bug Fixes**

- 修复 share 图标无法加粗的问题 [\#457](https://github.com/youzan/vant-weapp/pull/457)

### [0.1.1](https://github.com/youzan/vant-weapp/tree/v0.1.1)
`2018-08-21`

**Improvements**

- 新增 Toast 组件 [\#437](https://github.com/youzan/vant-weapp/pull/437)
- 新增 Tabbar 组件 [\#435](https://github.com/youzan/vant-weapp/pull/435)
- 新增 Transition 组件 [\#441](https://github.com/youzan/vant-weapp/pull/441)
- 新增 Button square 属性 [\#427](https://github.com/youzan/vant-weapp/pull/427)

**Bug Fixes**

- 修复 Field 在 form 组件内无法获取值的问题 [\#447](https://github.com/youzan/vant-weapp/pull/447)
- 修复 Field icon slot 无法使用的问题 [\#428](https://github.com/youzan/vant-weapp/pull/428)
- 修复 Switch 组件无法开关的问题 [\#438](https://github.com/youzan/vant-weapp/pull/438)

### [0.1.0](https://github.com/youzan/vant-weapp/tree/v0.1.0)
`2018-08-13`

**Breaking changes**

- 统一采用 click 作为点击事件名

**Improvements**

- 新增 Utils 工具方法
- 优化文档对事件名的描述

**Bug Fixes**

- 修复 Card 金额为 0 时无法展示的问题


### [0.0.1](https://github.com/youzan/vant-weapp/tree/v0.0.1)
`2018-08-10`

**Improvements**

- 新增 ActionSheet 组件
- 新增 Badge 组件
- 新增 BadgeGroup 组件
- 新增 Button 组件
- 新增 Card 组件
- 新增 Cell 组件
- 新增 CellGroup 组件
- 新增 Col 组件
- 新增 Field 组件
- 新增 Icon 组件
- 新增 Loading 组件
- 新增 NavBar 组件
- 新增 NoticeBar 组件
- 新增 Notify 组件
- 新增 Panel 组件
- 新增 Popup 组件
- 新增 Row 组件
- 新增 Search 组件
- 新增 Stepper 组件
- 新增 Steps 组件
- 新增 Switch 组件
- 新增 Tag 组件
- 新增 TreeSelect 组件
