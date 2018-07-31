`ZanUI-WeApp` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

## [v3.1.0](https://github.com/youzan/zanui-weapp/tree/v3.1.0) (2018-07-31)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v3.0.10...v3.1.0)

**Breaking changes**

- 修复 Field 组件错误的事件参数 [\#391](https://github.com/youzan/zanui-weapp/pull/391) ([pangxie1991](https://github.com/pangxie1991))

**Improvements**

- 示例小程序增加 tree-select DEMO [\#392](https://github.com/youzan/zanui-weapp/pull/392) ([pangxie1991](https://github.com/pangxie1991))
- 文档增加 timeout 的单位标注 [\#389](https://github.com/youzan/zanui-weapp/pull/389) ([upupming](https://github.com/upupming))
- 修复文档 Card 示例页 title 错误标注为 CAPSULE 的问题 [\#385](https://github.com/youzan/zanui-weapp/pull/385) ([Fyerl](https://github.com/Fyerl))


## [v3.0.10](https://github.com/youzan/zanui-weapp/tree/v3.0.10) (2018-07-27)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v3.0.9...v3.0.10)

**new feature**

- cell-group 组件支持显示上下边框 [\#380](https://github.com/youzan/zanui-weapp/pull/380) ([rex-zsd](https://github.com/rex-zsd))

**Improvements**

- Cell 组件去掉 title 区域的最小宽度 [\#376](https://github.com/youzan/zanui-weapp/pull/376) ([ylethe](https://github.com/ylethe))


## [v3.0.9](https://github.com/youzan/zanui-weapp/tree/v3.0.9) (2018-07-17)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v3.0.8...v3.0.9)

**new feature**
- Cell 组件新增 no-border 属性 [\#369](https://github.com/youzan/zanui-weapp/pull/369) ([realywithoutname](https://github.com/realywithoutname))
- 新增 Radio 组件 [\#354](https://github.com/youzan/zanui-weapp/pull/354) ([jerryni](https://github.com/jerryni))

**Improvements**

- 优化 Dialog 弹窗组件对 open 信息的处理 [\#366](https://github.com/youzan/zanui-weapp/pull/366) ([pangxie1991](https://github.com/pangxie1991))
- 优化 Cell 组件默认 slot 展示效果，添加 title 区域自定义 class [\#360](https://github.com/youzan/zanui-weapp/pull/360) ([ylethe](https://github.com/ylethe))
- 优化 LoadMore 组件表现及展示效果 [\#337](https://github.com/youzan/zanui-weapp/pull/337) ([zgrong](https://github.com/zgrong))

**Bug Fixes**

- 修复文档错误 [\#370](https://github.com/youzan/zanui-weapp/pull/370) ([jerryni](https://github.com/jerryni))


## [v3.0.8](https://github.com/youzan/zanui-weapp/tree/v3.0.8) (2018-07-12)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v3.0.7...v3.0.8)

**Bug Fixes**

- 修复 Toast 组件未传入 timeout 时不会自动关闭的问题 [\#361](https://github.com/youzan/zanui-weapp/pull/361) ([pangxie1991](https://github.com/pangxie1991))
- 修复 DateTime 组件接收非标准 iso 格式时间初始时间错误的问题 [\#355](https://github.com/youzan/zanui-weapp/pull/355) ([realywithoutname](https://github.com/realywithoutname))

## [v3.0.7](https://github.com/youzan/zanui-weapp/tree/v3.0.7) (2018-07-10)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v3.0.6...v3.0.7)

**new feature**
- \[new feature\] 新增 checkbox 组件 [\#341](https://github.com/youzan/zanui-weapp/pull/341) ([jerryni](https://github.com/jerryni))

**Improvements**

- Tab 组件支持选中项自动滑动到中间位置 [\#347](https://github.com/youzan/zanui-weapp/pull/347) ([rex-zsd](https://github.com/rex-zsd))
- 增加部分组件自定义样式类，方便自定义样式 [\#352](https://github.com/youzan/zanui-weapp/pull/352) ([pangxie1991](https://github.com/pangxie1991))

**Bug Fixes**

- 修复 Toptips 组件在示例小程序上的问题 [\#351](https://github.com/youzan/zanui-weapp/pull/351) ([pangxie1991](https://github.com/pangxie1991))
- 修复 DateTime 组件设置初始时间时报错的问题 [\#350](https://github.com/youzan/zanui-weapp/pull/350) ([realywithoutname](https://github.com/realywithoutname))

## [v3.0.6](https://github.com/youzan/zanui-weapp/tree/v3.0.6) (2018-07-08)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v3.0.5...v3.0.6)

**new feature**
- 新增搜索组件 [\#321](https://github.com/youzan/zanui-weapp/pull/321) ([jerryni](https://github.com/jerryni))
- 新增分类选择组件 [\#346](https://github.com/youzan/zanui-weapp/pull/346) ([pangxie1991](https://github.com/pangxie1991))

**Improvements**

- 优化 Tab 组件宽度样式 [\#336](https://github.com/youzan/zanui-weapp/pull/336) ([pangxie1991](https://github.com/pangxie1991))

**Bug Fixes**

- 修复由于 autoprefixer 移除旧浏览器代码导致的兼容性问题 [\#335](https://github.com/youzan/zanui-weapp/pull/335) ([realywithoutname](https://github.com/realywithoutname))
- 修复 select、popup 组件文档错误，改善部分组件文档一致性 [\#334](https://github.com/youzan/zanui-weapp/pull/334) ([rex-zsd](https://github.com/rex-zsd))
- 修复 Toast 组件的 timeout 不支持小于0的问题 [\#340](https://github.com/youzan/zanui-weapp/pull/340) ([rex-zsd](https://github.com/rex-zsd))


## [v3.0.5](https://github.com/youzan/zanui-weapp/tree/v3.0.5) (2018-06-29)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v3.0.4...v3.0.5)

**Improvements**

- 优化 popup 遮罩层相关文档 [\#324](https://github.com/youzan/zanui-weapp/pull/324) ([jerryni](https://github.com/jerryni))
- 优化 Button，支持 disabled 属性 [\#323](https://github.com/youzan/zanui-weapp/pull/323) ([jerryni](https://github.com/jerryni))
- Steps 组件扩展自定义class [\#311](https://github.com/youzan/zanui-weapp/pull/311) ([jerryni](https://github.com/jerryni))
- Stepper 组件 size 属性支持 small middle large [\#306](https://github.com/youzan/zanui-weapp/pull/306) ([jerryni](https://github.com/jerryni))
- 优化 Field 组件在列表中输入框表现 [\#296](https://github.com/youzan/zanui-weapp/pull/296) ([pangxie1991](https://github.com/pangxie1991))
- datepicker 使用原生 picker-view 重写 [\#294](https://github.com/youzan/zanui-weapp/pull/294) ([realywithoutname](https://github.com/realywithoutname))
- Noticebar 组件支持动态更新text [\#314](https://github.com/youzan/zanui-weapp/pull/314) ([rex-zsd](https://github.com/rex-zsd))
- datetime-picker 组件在 demo 中增加 datetime 示例入口 [\#313](https://github.com/youzan/zanui-weapp/pull/313) ([rex-zsd](https://github.com/rex-zsd))


**Bug Fixes**

- 修复 Toptips 在自定义组件中引入报错的问题，backgroundColor不生效的问题 [\#318](https://github.com/youzan/zanui-weapp/pull/318) ([Yuliang-Lee](https://github.com/Yuliang-Lee))
- Dialog 组件修复取消按钮只生效一次的问题 [\#312](https://github.com/youzan/zanui-weapp/pull/312) ([rex-zsd](https://github.com/rex-zsd))
- 修复使用 dialog 组件的页面切换路由时会报错的问题 \(\#289\) [\#310](https://github.com/youzan/zanui-weapp/pull/310) ([rex-zsd](https://github.com/rex-zsd))
- 修复按钮点击态时没有任何变化的问题 [\#287](https://github.com/youzan/zanui-weapp/pull/287) ([jerryni](https://github.com/jerryni))
- Stepper 组件增加在数字越界前进行校验的操作 [\#283](https://github.com/youzan/zanui-weapp/pull/283) ([icarusion](https://github.com/icarusion))


## [v3.0.4](https://github.com/youzan/zanui-weapp/tree/v3.0.4) (2018-05-29)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v3.0.3...v3.0.4)

**Improvements**

- 使用 babel 简单编译 dist 里面的文件 [\#285](https://github.com/youzan/zanui-weapp/pull/285) ([pangxie1991](https://github.com/pangxie1991))
- Cell 组件增加默认白色背景色 [\#270](https://github.com/youzan/zanui-weapp/pull/270) ([pangxie1991](https://github.com/pangxie1991))
- Stepper 文档添加size属性说明 [\#260](https://github.com/youzan/zanui-weapp/pull/260) ([jerryni](https://github.com/jerryni))

**Bug Fixes**

- 修复 Switch 组件示例名称错误 [\#281](https://github.com/youzan/zanui-weapp/pull/281) ([dlhandsome](https://github.com/dlhandsome))
- 修复 Steps 2步样式 && 优化文档 [\#274](https://github.com/youzan/zanui-weapp/pull/274) ([jerryni](https://github.com/jerryni))
- 修复 Stepper 组件不传 max 情况下，默认置灰的问题 [\#269](https://github.com/youzan/zanui-weapp/pull/269) ([pangxie1991](https://github.com/pangxie1991))


## [v3.0.3](https://github.com/youzan/zanui-weapp/tree/v3.0.3) (2018-05-21)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v3.0.2...v3.0.3)

**Bug Fixes**
- 修复 cell 组件点击事情触发两次的问题 [\#259](https://github.com/youzan/zanui-weapp/pull/259) ([pangxie1991](https://github.com/pangxie1991))
- 修复 Cell 组件文档错误 [\#254](https://github.com/youzan/zanui-weapp/pull/254) ([pangxie1991](https://github.com/pangxie1991))

**Improvements**
- Dialog 组件中的按钮支持 open-type 属性 [\#247](https://github.com/youzan/zanui-weapp/pull/247) ([artecher](https://github.com/artecher))

## [v3.0.2](https://github.com/youzan/zanui-weapp/tree/v3.0.2) (2018-05-13)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v3.0.1...v3.0.2)

**new feature**
- 新增时间选择组件 [\#164](https://github.com/youzan/zanui-weapp/pull/164) ([realywithoutname](https://github.com/realywithoutname))

**Improvements**
- Icon 中增加减号图标 [\#235](https://github.com/youzan/zanui-weapp/pull/235) ([pangxie1991](https://github.com/pangxie1991))
- Toast 组件新增默认配置设置 [\#229](https://github.com/youzan/zanui-weapp/pull/229) ([pangxie1991](https://github.com/pangxie1991))
- Btn 组件和 Field 组件支持原生属性 [\#219](https://github.com/youzan/zanui-weapp/pull/219) ([pangxie1991](https://github.com/pangxie1991))

**Bug Fixes**
- 修复部分情况下 cell 边框不出现的问题 [\#237](https://github.com/youzan/zanui-weapp/pull/237) ([pangxie1991](https://github.com/pangxie1991)))
- 修复 Badge 组件在页面数据改变了以后，组件中的数字不变的问题 [\#225](https://github.com/youzan/zanui-weapp/pull/225) ([pangxie1991](https://github.com/pangxie1991))
- 修复 Stepper 组件文档错误 [\#222](https://github.com/youzan/zanui-weapp/pull/222) ([jerryni](https://github.com/jerryni))
- 修复部分文档错误 [\#239](https://github.com/youzan/zanui-weapp/pull/239) ([pangxie1991](https://github.com/pangxie1991))


## [v3.0.1](https://github.com/youzan/zanui-weapp/tree/v3.0.1) (2018-04-30)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v3.0.0...v3.0.1)

**Bug Fixes**
- 修复 gulp 插件引起的组件编译后代码异常的问题 [\#209](https://github.com/youzan/zanui-weapp/pull/209) ([pangxie1991](https://github.com/pangxie1991))

## [v3.0.0](https://github.com/youzan/zanui-weapp/tree/v3.0.0) (2018-04-28)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.4.7...v3.0.0)

**Breaking changes**
- 升级组件库至自定义组件 [\#199](https://github.com/youzan/zanui-weapp/pull/199) ([pangxie1991](https://github.com/pangxie1991))

**Improvements**
- Field 组件新增 maxlength 属性 [\#203](https://github.com/youzan/zanui-weapp/pull/203) ([pangxie1991](https://github.com/pangxie1991))

## [v2.4.7](https://github.com/youzan/zanui-weapp/tree/v2.4.7) (2018-03-25)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.4.6...v2.4.7)

**Improvements**

- Field 组件新增 disabled 属性支持 [\#150](https://github.com/youzan/zanui-weapp/pull/150) ([pangxie1991](https://github.com/pangxie1991))
- 移除多余的日志信息 [\#144](https://github.com/youzan/zanui-weapp/pull/144) ([pangxie1991](https://github.com/pangxie1991))
- 新增小程序文档网页 [\#142](https://github.com/youzan/zanui-weapp/pull/142) ([realywithoutname](https://github.com/realywithoutname))

**Bug Fixes**

- 修复弹窗被输入框文本覆盖的问题 [\#149](https://github.com/youzan/zanui-weapp/pull/149) ([pangxie1991](https://github.com/pangxie1991))
- 修复 NoticeBar 组件动画播放异常的问题 [\#155](https://github.com/youzan/zanui-weapp/pull/155) ([pangxie1991](https://github.com/pangxie1991))

## [v2.4.6](https://github.com/youzan/zanui-weapp/tree/v2.4.6) (2018-02-27)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.4.5...v2.4.6)

**new feature**

- 新增 Field 组件 focus 自动聚焦属性 [\#135](https://github.com/youzan/zanui-weapp/pull/135) ([pangxie1991](https://github.com/pangxie1991))
- 新增文档网站 [\#126](https://github.com/youzan/zanui-weapp/pull/126) ([realywithoutname](https://github.com/realywithoutname))

**Bug Fixes**

- 修复 Field 组件圆角输入框，边框显示问题 [\#134](https://github.com/youzan/zanui-weapp/pull/134) ([pangxie1991](https://github.com/pangxie1991))
- 修复 Noticebar 组件元素查询返回空，导致报错的问题 [\#130](https://github.com/youzan/zanui-weapp/pull/130) ([pangxie1991](https://github.com/pangxie1991))

## [v2.4.5](https://github.com/youzan/zanui-weapp/tree/v2.4.5) (2018-02-07)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.4.4...v2.4.5)

**Improvements**

- Toast 新增支持图标展示 [\#121](https://github.com/youzan/zanui-weapp/pull/121) ([pangxie1991](https://github.com/pangxie1991))
- 新增 Actionsheet 文档 [\#118](https://github.com/youzan/zanui-weapp/pull/118) ([pangxie1991](https://github.com/pangxie1991))
- 修复 Toptips 组件未显示时，下拉页面展示问题 [\#116](https://github.com/youzan/zanui-weapp/pull/116) ([pangxie1991](https://github.com/pangxie1991))
- Field 使用示例中增加 picker-view 使用 [\#115](https://github.com/youzan/zanui-weapp/pull/115) ([pangxie1991](https://github.com/pangxie1991))
- 修复 Toptips 组件在控制台里的报错 [\#114](https://github.com/youzan/zanui-weapp/pull/114) ([pangxie1991](https://github.com/pangxie1991))

## [v2.4.4](https://github.com/youzan/zanui-weapp/tree/v2.4.4) (2018-01-12)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.4.3...v2.4.4)

**Improvements**

- Actionsheet 组件新增 open-type 支持 [\#106](https://github.com/youzan/zanui-weapp/pull/106) ([pangxie1991](https://github.com/pangxie1991))
- Select 组件新增支持 form 中 submit 使用 [\#104](https://github.com/youzan/zanui-weapp/pull/104) ([pangxie1991](https://github.com/pangxie1991))
- 新增 Actionsheet 行动按钮组件 [\#97](https://github.com/youzan/zanui-weapp/pull/97) ([pangxie1991](https://github.com/pangxie1991))

**Bug Fixes**
- 修复 actionsheet 隐藏时阻挡页面元素点击 [\#99](https://github.com/youzan/zanui-weapp/pull/99) ([yun77op](https://github.com/yun77op))
- 修复 Badge 组件纵向对齐问题 [\#96](https://github.com/youzan/zanui-weapp/pull/96) ([pangxie1991](https://github.com/pangxie1991))
- 修复合并生命周期extend函数并修改tab文档 [\#93](https://github.com/youzan/zanui-weapp/pull/93) ([Tinysymphony](https://github.com/Tinysymphony))

## [v2.4.3](https://github.com/youzan/zanui-weapp/tree/v2.4.3) (2017-12-28)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.4.2...v2.4.3)

**Improvements**

- 增加无边框的panel样式 [\#92](https://github.com/youzan/zanui-weapp/pull/92) ([w91](https://github.com/w91))
- 增加支持合并page生命周期的extend函数 [\#90](https://github.com/youzan/zanui-weapp/pull/90) ([w91](https://github.com/w91))

## [v2.4.2](https://github.com/youzan/zanui-weapp/tree/v2.4.2) (2017-12-25)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.4.1...v2.4.2)

**Bug Fixes**

- 修复 Popup 组件弹出的 container 遮挡主页事件bug [\#83](https://github.com/youzan/zanui-weapp/pull/83) ([shoung6](https://github.com/shoung6))
- 修复 Tab 组件不滚动情况下，文字过长显示问题 [\#81](https://github.com/youzan/zanui-weapp/pull/81) ([pangxie1991](https://github.com/pangxie1991))

**Improvements**

- 新增使用文档 [\#88](https://github.com/youzan/zanui-weapp/pull/88) ([pangxie1991](https://github.com/pangxie1991))
- 部分组件边框实现修改 [\#87](https://github.com/youzan/zanui-weapp/pull/87) ([pangxie1991](https://github.com/pangxie1991))


## [v2.4.1](https://github.com/youzan/zanui-weapp/tree/v2.4.1) (2017-12-13)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.4.0...v2.4.1)

**Bug Fixes**

- 修复 Tag 展现问题 [\#77](https://github.com/youzan/zanui-weapp/pull/77) ([pangxie1991](https://github.com/pangxie1991))

**Improvements**

- 新增 tag 组件文档 [\#76](https://github.com/youzan/zanui-weapp/pull/76) ([pangxie1991](https://github.com/pangxie1991))

## [v2.4.0](https://github.com/youzan/zanui-weapp/tree/v2.4.0) (2017-12-09)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.3.5...v2.4.0)

**Improvements**

- 新增 Field 组件对于 Form 的支持 [\#75](https://github.com/youzan/zanui-weapp/pull/75) ([pangxie1991](https://github.com/pangxie1991))
- 新增 Field 组件文档 [\#73](https://github.com/youzan/zanui-weapp/pull/73) ([pangxie1991](https://github.com/pangxie1991))
- 修复 Dialog 组件自定义按钮时按钮点击回调的问题 [\#72](https://github.com/youzan/zanui-weapp/pull/72) ([pangxie1991](https://github.com/pangxie1991))
- Quantity 组件更名为 Stepper [\#70](https://github.com/youzan/zanui-weapp/pull/70) ([pangxie1991](https://github.com/pangxie1991))
- Dialog 组件和 Popup 组件重构 [\#69](https://github.com/youzan/zanui-weapp/pull/69) ([pangxie1991](https://github.com/pangxie1991))
- 修正部分文档错误 [\#68](https://github.com/youzan/zanui-weapp/pull/68) ([0x01f7](https://github.com/0x01f7))
- Label组件重命名为 Tag 并整理样式 [\#55](https://github.com/youzan/zanui-weapp/pull/55) ([pangxie1991](https://github.com/pangxie1991))

## [v2.3.5](https://github.com/youzan/zanui-weapp/tree/v2.3.5) (2017-11-27)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.3.4...v2.3.5)

**Improvements**

- 修复 zan-icon-new 展示 [\#66](https://github.com/youzan/zanui-weapp/pull/66) ([pangxie1991](https://github.com/pangxie1991))

## [v2.3.4](https://github.com/youzan/zanui-weapp/tree/v2.3.4) (2017-11-24)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.3.3...v2.3.4)

**Improvements**

- 增加新的 Icon [\#65](https://github.com/youzan/zanui-weapp/pull/65) ([pangxie1991](https://github.com/pangxie1991))
- 加回 cart 图标 [\#64](https://github.com/youzan/zanui-weapp/pull/64) ([pangxie1991](https://github.com/pangxie1991))

## [v2.3.3](https://github.com/youzan/zanui-weapp/tree/v2.3.3) (2017-11-20)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.3.2...v2.3.3)

**Improvements**

- 新增部分 icon [\#63](https://github.com/youzan/zanui-weapp/pull/63) ([pangxie1991](https://github.com/pangxie1991))
- Field 增加 value 传入支持 [\#60](https://github.com/youzan/zanui-weapp/pull/60) ([pangxie1991](https://github.com/pangxie1991))
- 修复 capsule 样式问题 [\#51](https://github.com/youzan/zanui-weapp/pull/51) ([everywill](https://github.com/everywill))
- 增加组件使用文档 [\#50](https://github.com/youzan/zanui-weapp/pull/50) ([pangxie1991](https://github.com/pangxie1991))

## [v2.3.2](https://github.com/youzan/zanui-weapp/tree/v2.3.2) (2017-11-02)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.3.1...v2.3.2)

**Improvements**

- 更新 Icon 中 shop 图标 [\#45](https://github.com/youzan/zanui-weapp/pull/45) ([pangxie1991](https://github.com/pangxie1991))
- 新增 layout 组件 [\#43](https://github.com/youzan/zanui-weapp/pull/43) ([pangxie1991](https://github.com/pangxie1991))
- Field 组件中 Input 事件支持升级 [\#42](https://github.com/youzan/zanui-weapp/pull/42) ([pangxie1991](https://github.com/pangxie1991))
- 增加 css 编译，方便组件书写 [\#40](https://github.com/youzan/zanui-weapp/pull/40) ([pangxie1991](https://github.com/pangxie1991))

## [v2.3.1](https://github.com/youzan/zanui-weapp/tree/v2.3.1) (2017-10-27)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.3.0...v2.3.1)

**Bug Fixes**

- 修复 Field 组件多行展示样式问题 [\#39](https://github.com/youzan/zanui-weapp/pull/39) ([pangxie1991](https://github.com/pangxie1991))

## [v2.3.0](https://github.com/youzan/zanui-weapp/tree/v2.3.0) (2017-10-26)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.2.0...v2.3.0)

**Breaking Change**

- icon 整理 & 新增 [\#38](https://github.com/youzan/zanui-weapp/pull/38) ([pangxie1991](https://github.com/pangxie1991))
- 新增 Field 组件, 代替原有 Form 组件 [\#37](https://github.com/youzan/zanui-weapp/pull/37) ([pangxie1991](https://github.com/pangxie1991))
- 新增 Select 组件，代替原有 Check_label 组件 [\#36](https://github.com/youzan/zanui-weapp/pull/36) ([pangxie1991](https://github.com/pangxie1991))

## [v2.2.0](https://github.com/youzan/zanui-weapp/tree/v2.2.0) (2017-10-15)
[Full Changelog](https://github.com/youzan/zanui-weapp/compare/v2.1.1...v2.2.0)

**Bug Fixes**

- 多页面情况下，TopTips 无法自动清除 [\#20](https://github.com/youzan/zanui-weapp/issues/20)

**Improvements**

- \[new feature\] 增加发布脚本 [\#35](https://github.com/youzan/zanui-weapp/pull/35) ([pangxie1991](https://github.com/pangxie1991))
- \[new feature\] 增加Capsule, Noticebar, Popup；修正Dialog在非最外层情况下引入的样式问题；更新readme。 [\#32](https://github.com/youzan/zanui-weapp/pull/32) ([everywill](https://github.com/everywill))
- \[new feature\] 增加单选 和一个验证码的样式 [\#30](https://github.com/youzan/zanui-weapp/pull/30) ([muzea](https://github.com/muzea))
- \[new feature\] Docs: 文档更新 [\#29](https://github.com/youzan/zanui-weapp/pull/29) ([pangxie1991](https://github.com/pangxie1991))

## 2.1.0

**Improvements**

- 新增`switch`组件
