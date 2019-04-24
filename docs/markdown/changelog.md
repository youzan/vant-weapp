## 更新日志

## [v0.5.11](https://github.com/youzan/vant-weapp/tree/v0.5.11)
`2019-04-24`

**Bug Fixes**

- Area: 修复同步设置areaList时不显示选项 [\#1556](https://github.com/youzan/vant-weapp/pull/1556)
- Slider: 修复拖拽同时设置 value 时拖拽失效 [\#1553](https://github.com/youzan/vant-weapp/pull/1553)
- Collapse: 修复 collapse-item 销毁时未从 collapse 中注销 [\#1517](https://github.com/youzan/vant-weapp/pull/1517)

**Improvements**

- Icon: 升级 @vant/icons 至1.1.6 [\#1560](https://github.com/youzan/vant-weapp/pull/1560)
- DatetimePicker: 新增 formatter 属性、 新增外部样式类 [\#1558](https://github.com/youzan/vant-weapp/pull/1558)
- Badge: 新增 click 事件 [\#1557](https://github.com/youzan/vant-weapp/pull/1557)
- Toast: 新增 onClose 属性、 新增插槽 [\#1552](https://github.com/youzan/vant-weapp/pull/1552)
- Picker: 新增 default-index 属性 [\#1540](https://github.com/youzan/vant-weapp/pull/1540)
- Collapse: 新增 clickable 属性 [\#1538](https://github.com/youzan/vant-weapp/pull/1538)
- Notify: 新增 zIndex 属性 [\#1535](https://github.com/youzan/vant-weapp/pull/1535)
- SubmitBar: 新增 decimal-length 属性 [\#1529](https://github.com/youzan/vant-weapp/pull/1529)
- Field: 使用 view 模拟 textarea 的 placeholder, 修复 placeholder 漂移问题 [\#1527](https://github.com/youzan/vant-weapp/pull/1527)
- Cell: 新增 useLabelSlot 属性、 新增 label 插槽 [\#1510](https://github.com/youzan/vant-weapp/pull/1510)
- Feild: 新增 error-message-align 属性 [\#1509](https://github.com/youzan/vant-weapp/pull/1509)

## [v0.5.10](https://github.com/youzan/vant-weapp/tree/v0.5.10)
`2019-04-11`

**Bug Fixes**

- Collapse: 优化性能、修复初始化未渲染时展开状态错误 [\#1506](https://github.com/youzan/vant-weapp/pull/1506)

**Improvements**

- SwipeCell: 优化性能、优化纵向滑动阻止页面滚动 [\#1501](https://github.com/youzan/vant-weapp/pull/1501)
- 修复文档中 changelog 链接错误 [\#1491](https://github.com/youzan/vant-weapp/pull/1491)
- 添加 es5 版本指引文档 [\#1489](https://github.com/youzan/vant-weapp/pull/1489)



## [v0.5.9](https://github.com/youzan/vant-weapp/tree/v0.5.9)
`2019-04-03`

**Improvements**

- 输出es5构建 [\#1485](https://github.com/youzan/vant-weapp/pull/1485)
- Stepper: 新增 input-width 属性 [\#1480](https://github.com/youzan/vant-weapp/pull/1480)
- Checkbox: 修复文档示例错误 [\#1479](https://github.com/youzan/vant-weapp/pull/1479)
- Notify: 新增 safe-area-inset-top 属性 [\#1478](https://github.com/youzan/vant-weapp/pull/1478)
- Popup: 新增 safe-area-inset-top 属性 [\#1478](https://github.com/youzan/vant-weapp/pull/1478)
- Navbar: 新增 safe-area-inset-top 属性 [\#1478](https://github.com/youzan/vant-weapp/pull/1478)
- Tabbar: 性能优化 [\#1460](https://github.com/youzan/vant-weapp/pull/1460)
- Button: 新增 hairline 属性 [\#1439](https://github.com/youzan/vant-weapp/pull/1439)

**Bug Fixes**

- Slider: 修复点击不生效的问题 [\#1484](https://github.com/youzan/vant-weapp/pull/1484)
- Icon: 避免使用标签选择器 [\#1482](https://github.com/youzan/vant-weapp/pull/1482)
- SwipeCell: 修复点击不生效的问题 [\#1459](https://github.com/youzan/vant-weapp/pull/1459)

## [v0.5.8](https://github.com/youzan/vant-weapp/tree/v0.5.8)
`2019-03-22`

**Improvements**

- Stepper: 样式更新 [\#1424](https://github.com/youzan/vant-weapp/pull/1424)
- Collapse: 新增 border 属性 [\#1408](https://github.com/youzan/vant-weapp/pull/1408)
- CellGroup: 新增 title 属性 [\#1407](https://github.com/youzan/vant-weapp/pull/1407)
- Search: 样式更新 [\#1396](https://github.com/youzan/vant-weapp/pull/1396)
- Search: 新增 label、shape 属性 [\#1396](https://github.com/youzan/vant-weapp/pull/1396)
- Search: 新增 slot label [\#1396](https://github.com/youzan/vant-weapp/pull/1396)
- Popup: 添加 transitionEnd 事件 [\#1345](https://github.com/youzan/vant-weapp/pull/1345)

**Bug Fixes**

- ActionSheet: 调整 slot 到取消按钮上方 [\#1438](https://github.com/youzan/vant-weapp/pull/1438)
- GoodsActionIcon: 修复 disabled、loading 属性不生效 [\#1435](https://github.com/youzan/vant-weapp/pull/1435)
- Transition: 修复 duration 为0时不消失 [\#1434](https://github.com/youzan/vant-weapp/pull/1434)
- Info: 修复样式异常 [\#1433](https://github.com/youzan/vant-weapp/pull/1433)
- Picker: 修复 defaultIndex 不生效 [\#1423](https://github.com/youzan/vant-weapp/pull/1423)
- SwipeCell: 现在会阻止页面滚动 [\#1419](https://github.com/youzan/vant-weapp/pull/1419)
- Transition: 修复 show 值切换过快时不消失 [\#1404](https://github.com/youzan/vant-weapp/pull/1404)
- Icon: 修复 info 的层级高于自定义图片 [\#1397](https://github.com/youzan/vant-weapp/pull/1397)

## [v0.5.7](https://github.com/youzan/vant-weapp/tree/v0.5.7)
`2019-03-09`

**Improvements**

- 使用 gulp-typescript 编译 ts 代码，并输出声明文件 [\#1392](https://github.com/youzan/vant-weapp/pull/1392)
- Tab: 新增外部样式类 nav-class、tab-class、tab-active-class [\#1391](https://github.com/youzan/vant-weapp/pull/1391)
- Field: 新增 size 属性 [\#1369](https://github.com/youzan/vant-weapp/pull/1369)
- Icon: 优化部分图标的圆角样式 [\#1363](https://github.com/youzan/vant-weapp/pull/1363)
- Tabbar: 性能优化 [\#1362](https://github.com/youzan/vant-weapp/pull/1362)

**Bug Fixes**

- Picker: 修复文档多列联动示例错误 [\#1390](https://github.com/youzan/vant-weapp/pull/1390)
- Area: 修复 columns-num 为 2 时初始选项错误 [\#1376](https://github.com/youzan/vant-weapp/pull/1376)
- Tab: 修复 offset-set 属性失效 [\#1370](https://github.com/youzan/vant-weapp/pull/1370)
- Steps: 兼容微信 7.0.3 环境下渲染错误 [\#1367](https://github.com/youzan/vant-weapp/pull/1367)

## [v0.5.6](https://github.com/youzan/vant-weapp/tree/v0.5.6)
`2019-02-28`

**Improvements**

- Stepper: 增加 focus 事件 [\#1347](https://github.com/youzan/vant-weapp/pull/1347)
- Button: 增加新属性 loading-size [\#1346](https://github.com/youzan/vant-weapp/pull/1346)

**Bug Fixes**
- Area: 修复有时初始选项错误 [\#1351](https://github.com/youzan/vant-weapp/pull/1351)

## [v0.5.5](https://github.com/youzan/vant-weapp/tree/v0.5.5)
`2019-02-26`

**Improvements**

- Transition: 实现由 animation 重构为 transition [\#1341](https://github.com/youzan/vant-weapp/pull/1341)
- Transition: 支持通过外部样式类自定义过渡效果 [\#1341](https://github.com/youzan/vant-weapp/pull/1341)
- Transition: 支持 duration 传入对象来定制进入和移出的持续时间 [\#1341](https://github.com/youzan/vant-weapp/pull/1341)
- Popup: 支持 duration 传入对象来定制进入和移出的持续时间 [\#1341](https://github.com/youzan/vant-weapp/pull/1341)
- Button: 新增 info 类型 [\#1340](https://github.com/youzan/vant-weapp/pull/1340)
- Tab: 粘性布局实现重构为 IntersectionObserver，提升了性能，不再需要外部传入 scroll-top [\#1332](https://github.com/youzan/vant-weapp/pull/1332)
- Tab: 优化标签栏横向滚动时的性能 [\#1332](https://github.com/youzan/vant-weapp/pull/1332)
- Tab: 新增 nav-left、nav-right 插槽 [\#1332](https://github.com/youzan/vant-weapp/pull/1332)
- Notify: 文本强制换行 [\#1325](https://github.com/youzan/vant-weapp/pull/1325)

**Bug Fixes**

- Transition: 修复部分机型动画初始化失败导致的位置偏移 [\#1341](https://github.com/youzan/vant-weapp/pull/1341)
- Popup: 修复部分机型动画初始化失败导致的位置偏移 [\#1341](https://github.com/youzan/vant-weapp/pull/1341)
- ActionSheet: 修复部分机型动画初始化失败导致的位置偏移 [\#1341](https://github.com/youzan/vant-weapp/pull/1341)

**Internal**

- 使用 miniprogram-api-typings 进行 wx api 类型定义 [\#1344](https://github.com/youzan/vant-weapp/pull/1344)

## [v0.5.4](https://github.com/youzan/vant-weapp/tree/v0.5.4)
`2019-02-18`

**Improvements**

- Dialog: 支持openType相关参数 [\#1321](https://github.com/youzan/vant-weapp/pull/1321)
- Button: add business-id prop [\#1308](https://github.com/youzan/vant-weapp/pull/1308)
- Button: 增加新属性 loading-text [\#1300](https://github.com/youzan/vant-weapp/pull/1300)
- SwitchCell: 增加新属性 active-value、 inactive-value [\#1298](https://github.com/youzan/vant-weapp/pull/1298)
- Switch: 增加新属性 active-value、 inactive-value [\#1297](https://github.com/youzan/vant-weapp/pull/1297)
- Area: 增加新属性 confirm-button-text [\#1296](https://github.com/youzan/vant-weapp/pull/1296)

**Bug Fixes**

- ActionSheet: 取消按钮高度异常 [\#1311](https://github.com/youzan/vant-weapp/pull/1311)
- Tab: 初始化时底部线条去除动画效果 [\#1295](https://github.com/youzan/vant-weapp/pull/1295)
- Area: 修复有时初始化选项错误 [\#1317](https://github.com/youzan/vant-weapp/pull/1317)

## [v0.5.3](https://github.com/youzan/vant-weapp/tree/v0.5.3)
`2019-02-06`

**Improvements**

- 使用 hover-class 定义点击态样式 [\#1280](https://github.com/youzan/vant-weapp/pull/1280)
- NoticeBar: 性能优化 [\#1278](https://github.com/youzan/vant-weapp/pull/1278)
- Dialog: 提高 zIndex 默认值为 2000 [\#1276](https://github.com/youzan/vant-weapp/pull/1276)
- TreeSelect: 优化性能 [\#1274](https://github.com/youzan/vant-weapp/pull/1274)
- Button:  增加新属性 ariaLabel [\#1273](https://github.com/youzan/vant-weapp/pull/1273)
- Button:  增加外部样式类 hover-class [\#1273](https://github.com/youzan/vant-weapp/pull/1273)
- Button:  增加launchapp事件 [\#1273](https://github.com/youzan/vant-weapp/pull/1273)
- GoodsActionIcon: 新增外部样式类icon-class、text-class [\#1272](https://github.com/youzan/vant-weapp/pull/1272)
- Collapse: 新增外部样式类 title-class [\#1271](https://github.com/youzan/vant-weapp/pull/1271)
- Search: 完善Search文档 [\#1228](https://github.com/youzan/vant-weapp/pull/1228)
- 新增 live 图标
- 新增 lock 图标
- 新增 audio 图标
- 新增 column 图标
- 新增 replay 图标
- 新增 shrink 图标
- 新增 graphic 图标
- 新增 invition 图标
- 新增 ascending 图标
- 新增 descending 图标
- 新增 play-circle 图标
- 新增 stop-circle 图标
- 新增 pause-circle 图标
- 新增 play-circle-o 图标
- 新增 stop-circle-o 图标
- 新增 pause-circle-o 图标
- 新增 weapp-nav 图标


**Bug Fixes**

- Area: 修复特殊情况下初始化选项错误 [\#1285](https://github.com/youzan/vant-weapp/pull/1285)
- Card: 修复centered属性无效，去除title、desc长度限制 [\#1270](https://github.com/youzan/vant-weapp/pull/1270)
- Field: 修复清除图标未居中 [\#1267](https://github.com/youzan/vant-weapp/pull/1267)


## [v0.5.2](https://github.com/youzan/vant-weapp/tree/v0.5.2)
`2019-01-20`

**Improvements**

- Card: 更新价格部分样式 [\#1237](https://github.com/youzan/vant-weapp/pull/1237)
- TreeSelect: 去除点击态样式 [\#1234](https://github.com/youzan/vant-weapp/pull/1234)
- TabbarItem: 新增 custom-class 外部样式类 [\#1213](https://github.com/youzan/vant-weapp/pull/1213)
- Toast: 支持在 message 中使用换行符 [\#1210](https://github.com/youzan/vant-weapp/pull/1210)

**Bug Fixes**

- Search: 修复readonly属性无效 [\#1238](https://github.com/youzan/vant-weapp/pull/1238)
- Area: 修复getIndexes结果不符合预期 [\#1220](https://github.com/youzan/vant-weapp/pull/1220)
- Tabs：回滚使用IntersectionObserver实现的sticky效果 [\#1217](https://github.com/youzan/vant-weapp/pull/1217)

## [v0.5.1](https://github.com/youzan/vant-weapp/tree/v0.5.1)
`2019-01-10`

**Improvements**

- Color: 基础绿色调整为微信绿 [\#1202](https://github.com/youzan/vant-weapp/pull/1202)
- Icon: 新增 cart-circle 图标 [\#1204](https://github.com/youzan/vant-weapp/pull/1204)
- Tab: 新增 line-height 属性 [\#1205](https://github.com/youzan/vant-weapp/pull/1205)
- Tab: 优化 sticky 实现，不再需要手动传入 scrollTop 属性 [\#1197](https://github.com/youzan/vant-weapp/pull/1197)

**Bug Fixes**

- 修复 Area 修复初始选中项错误 [\#1196](https://github.com/youzan/vant-weapp/pull/1196)
- 修复 Icon 部分图标的线条应使用圆角的问题 [\#1204](https://github.com/youzan/vant-weapp/pull/1204)
- 修复 Field 手写键盘输入时未触发 change 事件的问题 [\#1200](https://github.com/youzan/vant-weapp/pull/1200)
- 修复 Slider 改变 value 值时错误地触发了 drag 事件的问题 [\#1186](https://github.com/youzan/vant-weapp/pull/1186)


## [v0.5.0](https://github.com/youzan/vant-weapp/tree/v0.5.0)
`2019-01-05`

**Breaking changes**

在 0.5.0 版本中，我们统一图标规范并重绘了所有图标，同时增加约 100 个新图标。对于同一个图标，我们会提供`实底`和`线框`两种风格，以星星图标为例，`star`表示实底风格的星星，`star-o`表示线框风格的星星。

<img width="375" height="124" src="//img.yzcdn.cn/vant/icon-style-1222.png">

同时我们也对原有图标做了一定调整，具体改动如下：

- 移除 edit-data
- 移除 pending-deliver
- 移除 pending-evaluate
- 移除 points-mall
- 移除 exchange-record
- 重命名 warn 为 info
- 重命名 check 为 circle
- 重命名 add2 为 add-square
- 重命名 question2 为 question
- 重命名 password-view 为 eye
- 重命名 password-not-view 为 closed-eye
- 重命名 value-card 为 balance-o
- 重命名 receive-gift 为 gift
- 重命名 pending-orders 为 orders-o
- 重命名 gift-card-pay 为 gift-card

同时我们对下列组件的样式细节进行了优化：

- Cell 单元格
- Card 卡片
- Tab 标签页
- Toast 轻提示
- TreeSelect 分类选择

**Improvements**

- DatetimePicker: 使用picker重构 [\#1187](https://github.com/youzan/vant-weapp/pull/1187)
- Area: 使用picker重构 [\#1175](https://github.com/youzan/vant-weapp/pull/1175)
- Toast: 更新背景色 [\#1171](https://github.com/youzan/vant-weapp/pull/1171)
- Tab: 新增 dot、info、title-style 属性 [\#1156](https://github.com/youzan/vant-weapp/pull/1156)
- DatetimePicker: 优化性能 [\#1164](https://github.com/youzan/vant-weapp/pull/1164)
- Loading: 更新图标样式 [\#1154](https://github.com/youzan/vant-weapp/pull/1154)
- Slider: 新增 active-color、inactive-color 属性 [\#1150](https://github.com/youzan/vant-weapp/pull/1150)
- Slider: 新增 button slot [\#1148](https://github.com/youzan/vant-weapp/pull/1148)
- Slider: 新增 drag 事件 [\#1148](https://github.com/youzan/vant-weapp/pull/1148)
- Tabbar: 新增 active-color 属性 [\#1145](https://github.com/youzan/vant-weapp/pull/1145)
- Stepper: 新增 async-change 属性 [\#1133](https://github.com/youzan/vant-weapp/pull/1133)
- Cell: 更新样式 [\#1111](https://github.com/youzan/vant-weapp/pull/1111)
- Field: 更新 input 样式 [\#1143](https://github.com/youzan/vant-weapp/pull/1143)

**Bug Fixes**

- Card: 修复 desc 样式问题 [\#1179](https://github.com/youzan/vant-weapp/pull/1179)
- Picker: 修复设置defaultIndex时的选项样式问题 [\#1177](https://github.com/youzan/vant-weapp/pull/1177)
- Stepper: 允许删除input值为空 [\#1160](https://github.com/youzan/vant-weapp/pull/1160)
- GoodsAction: 修复 info 样式问题 [\#1123](https://github.com/youzan/vant-weapp/pull/1123)
- Tab: span selector [\#1146](https://github.com/youzan/vant-weapp/pull/1146)
- Collapse: 修复切换时没有动画效果 [\#1140](https://github.com/youzan/vant-weapp/pull/1140)
- Tabs：修复开启animated时导致的滚动问题 [\#1030](https://github.com/youzan/vant-weapp/pull/1030)

## [v0.4.10](https://github.com/youzan/vant-weapp/tree/v0.4.10)
`2018-12-19`

**Improvements**

- Card: 更新样式 [\#1085](https://github.com/youzan/vant-weapp/pull/1085)
- Card: 更新 thumb-mode 默认值为 aspectFit [\#1039](https://github.com/youzan/vant-weapp/pull/1039)
- Field: 新增 show-confirm-bar 属性 [\#1040](https://github.com/youzan/vant-weapp/pull/1040)
- TreeSelect: 更新样式 [\#1084](https://github.com/youzan/vant-weapp/pull/1084)
- TreeSelect: 支持左侧选项禁用 [\#1084](https://github.com/youzan/vant-weapp/pull/1084)
- TreeSelect: 增加外部样式类 [\#1084](https://github.com/youzan/vant-weapp/pull/1084)
- Picker: 新增选择器组件 [\#1083](https://github.com/youzan/vant-weapp/pull/1083)
- Tag: 新增 text-color 属性 [\#1077](https://github.com/youzan/vant-weapp/pull/1077)
- Collapse: 更新 content 样式 [\#1069](https://github.com/youzan/vant-weapp/pull/1069)
- Checkbox: 更新禁用态 label 颜色 [\#1068](https://github.com/youzan/vant-weapp/pull/1068)
- Checkbox: 优化渲染性能 [\#1057](https://github.com/youzan/vant-weapp/pull/1057)
- Dialog: 新增 message-align 属性 [\#1067](https://github.com/youzan/vant-weapp/pull/1067)
- Dialog：新增 overlay、confirm、cancel 事件返回值 picker [\#1047](https://github.com/youzan/vant-weapp/pull/1047)
- Info: 更新样式 [\#1066](https://github.com/youzan/vant-weapp/pull/1066)
- Toast: 更新 icon 大小 [\#1064](https://github.com/youzan/vant-weapp/pull/1064)
- SwitchCell: 新增 active-color、inactive-color 属性 [\#1061](https://github.com/youzan/vant-weapp/pull/1061)
- Switch: 更新样式 [\#1065](https://github.com/youzan/vant-weapp/pull/1065)
- Switch: 优化渲染性能 [\#1079](https://github.com/youzan/vant-weapp/pull/1079)
- Area: 优化渲染性能 [\#1055](https://github.com/youzan/vant-weapp/pull/1055)
- Cell: 优化渲染性能 [\#1050](https://github.com/youzan/vant-weapp/pull/1050)
- Button: 优化渲染性能 [\#1049](https://github.com/youzan/vant-weapp/pull/1049)

**Bug Fixes**

- 修复 Collapse 动态修改内容时高度异常 [\#1094](https://github.com/youzan/vant-weapp/pull/1094)
- 修复 Stepper 在iPad中或修改input高度时输入框样式异常 [\#1086](https://github.com/youzan/vant-weapp/pull/1086)
- 修复 ActionSheet 动态设置actions时，渲染后button被打散 [\#1070](https://github.com/youzan/vant-weapp/pull/1070)

## [v0.4.9](https://github.com/youzan/vant-weapp/tree/v0.4.9)
`2018-12-07`

**Improvements**

- Tab: 新增 sticky 属性 [\#1019](https://github.com/youzan/vant-weapp/pull/1019)
- Tab: 新增 swipeable 属性 [\#1019](https://github.com/youzan/vant-weapp/pull/1019)
- Rate: 新增 icon-class 外部样式类 [\#1026](https://github.com/youzan/vant-weapp/pull/1026)
- Icon: 优化内部 setData 次数 [\#1009](https://github.com/youzan/vant-weapp/pull/1009)
- Popup: 适配 iPhoneX [\#989](https://github.com/youzan/vant-weapp/pull/989)
- Tabbar: 适配 iPhoneX [\#989](https://github.com/youzan/vant-weapp/pull/989)
- SubmitBar: 适配 iPhoneX [\#989](https://github.com/youzan/vant-weapp/pull/989)
- ActionSheet: 适配 iPhoneX [\#989](https://github.com/youzan/vant-weapp/pull/989)
- GoodsAction: 适配 iPhoneX [\#989](https://github.com/youzan/vant-weapp/pull/989)

**Bug Fixes**

- 修复 Collapse 箭头方向错误 [\#1014](https://github.com/youzan/vant-weapp/pull/1014)
- 修复 Steps 在开发者工具体验评分中提示选择器错误的问题 [\#1015](https://github.com/youzan/vant-weapp/pull/1015)
- 修复 Stepper 动态设置 value 时禁用状态未更新的问题 [\#1022](https://github.com/youzan/vant-weapp/pull/1022)
- 修复 Popup 在 iOS 8 下动画错误的问题 [\#1008](https://github.com/youzan/vant-weapp/pull/1008) [\#1029](https://github.com/youzan/vant-weapp/pull/1029)
- 修复 Transition 在 iOS 8 下动画错误的问题 [\#1008](https://github.com/youzan/vant-weapp/pull/1008) [\#1029](https://github.com/youzan/vant-weapp/pull/1029)
- 修复 DatetimePicker 动态设置 type 后报错的问题 [\#1004](https://github.com/youzan/vant-weapp/pull/1004)
- 修复劫持 setData 方法导致无法适配支付宝小程序的问题 [\#1023](https://github.com/youzan/vant-weapp/pull/1023)


## [v0.4.8](https://github.com/youzan/vant-weapp/tree/v0.4.8)
`2018-12-03`

**Improvements**

- Icon: 增加更多基础图标 [\#980](https://github.com/youzan/vant-weapp/pull/980)
- Icon: 支持传入图片链接作为图标展示 [\#973](https://github.com/youzan/vant-weapp/pull/973)
- Tab: 新增 animated 属性 [\#957](https://github.com/youzan/vant-weapp/pull/957)
- Field: 新增 left-icon 插槽 [\#962](https://github.com/youzan/vant-weapp/pull/962)
- Field: 新增 focus、blur 事件回调参数 [\#956](https://github.com/youzan/vant-weapp/pull/956)
- Field: 新增 adjust-position、confirm-hold 属性 [\#955](https://github.com/youzan/vant-weapp/pull/955)
- NavBar: 新增 border 属性 [\#960](https://github.com/youzan/vant-weapp/pull/960)
- Dialog: 新增 transition 属性 [\#990](https://github.com/youzan/vant-weapp/pull/990)
- Rate: 新增 icon、void-icon 属性 [\#961](https://github.com/youzan/vant-weapp/pull/961)
- 文档：支持在线预览组件效果 [\#967](https://github.com/youzan/vant-weapp/pull/967)

**Bug Fixes**

- 修复 Dialog 直接函数调用时报错的问题 [\#999](https://github.com/youzan/vant-weapp/pull/999)
- 修复 Field 事件触发顺序 [\#970](https://github.com/youzan/vant-weapp/pull/970)
- 修复 Icon 模板中 wx:if 拼写错误的问题 [\#985](https://github.com/youzan/vant-weapp/pull/985)
- 修复 Tabbar 图标未垂直居中的问题 [\#1002](https://github.com/youzan/vant-weapp/pull/1002)
- 修复 Toast 在 iOS 设备上文字错误换行的问题 [\#959](https://github.com/youzan/vant-weapp/pull/959)


## [v0.4.7](https://github.com/youzan/vant-weapp/tree/v0.4.7)
`2018-11-26`

**Improvements**

- 新增 Rate 评分组件 [\#931](https://github.com/youzan/vant-weapp/pull/931)
- 新增 Collapse 折叠面板组件 [\#936](https://github.com/youzan/vant-weapp/pull/936)
- Cell: 新增 size 属性 [\#904](https://github.com/youzan/vant-weapp/pull/904)
- Field: 新增 fixed 属性 [\#925](https://github.com/youzan/vant-weapp/pull/925)
- Field: 新增 clear 事件 [\#894](https://github.com/youzan/vant-weapp/pull/894)
- Dialog: 新增 context 属性 [\#912](https://github.com/youzan/vant-weapp/pull/912)
- Dialog: 内容超过屏幕高度时展示滚动条 [\#921](https://github.com/youzan/vant-weapp/pull/921)
- Notify: 新增 context 属性 [\#914](https://github.com/youzan/vant-weapp/pull/914)
- Notify: 优化多行文字时的样式展示 [\#951](https://github.com/youzan/vant-weapp/pull/951)
- Search: 新增 clear 事件 [\#894](https://github.com/youzan/vant-weapp/pull/894)
- Search: 新增外部样式类 field-class、input-class [\#946](https://github.com/youzan/vant-weapp/pull/946)
- Tab: 更新标题栏样式 [\#940](https://github.com/youzan/vant-weapp/pull/940)
- Radio: 新增 checked-color 属性 [\#939](https://github.com/youzan/vant-weapp/pull/939)
- TreeSelect: 支持禁用选项 [\#926](https://github.com/youzan/vant-weapp/pull/926)
- Icon: 新增 star、star-o 图标 [\#923](https://github.com/youzan/vant-weapp/pull/923)


**Bug Fixes**

- 修复 Toast 最大宽度错误的问题 [\#896](https://github.com/youzan/vant-weapp/pull/896)
- 修复 Tab line-width 传入 0 时不生效的问题 [\#900](https://github.com/youzan/vant-weapp/pull/900)
- 修复 Tab swipe-threshold 属性小于 4 时不生效的问题 [\#941](https://github.com/youzan/vant-weapp/pull/941)
- 修复 Tab 在 iOS8 下的样式兼容性问题 [\#943](https://github.com/youzan/vant-weapp/pull/943)
- 修复 SwipeCell 在 iOS8 下的样式兼容性问题 [\#944](https://github.com/youzan/vant-weapp/pull/944)
- 修复 DatetimePicker 设置了 minDate 时初始 value 错误的问题 [\#942](https://github.com/youzan/vant-weapp/pull/942)


## [v0.4.6](https://github.com/youzan/vant-weapp/tree/v0.4.6)
`2018-11-10`

**Improvements**

- 新增 DatetimePicker 时间选择组件 [\#881](https://github.com/youzan/vant-weapp/pull/881)
- Cell: 新增 arrow-direction 属性 [\#866](https://github.com/youzan/vant-weapp/pull/866)
- Switch: 新增 active-color 属性 [\#845](https://github.com/youzan/vant-weapp/pull/845)
- Radio: 选中态颜色调整为蓝色 [\#873](https://github.com/youzan/vant-weapp/pull/873)
- Checkbox: 选中态颜色调整为蓝色 [\#848](https://github.com/youzan/vant-weapp/pull/848)
- Checkbox: 新增 checked-color 属性 [\#885](https://github.com/youzan/vant-weapp/pull/885)

**Bug Fixes**

- 修复 Field 图标对齐问题 [\#871](https://github.com/youzan/vant-weapp/pull/871)
- 修复 Badge active 属性在 mpvue 中不生效的问题 [\#879](https://github.com/youzan/vant-weapp/pull/879)
- 修复 Cell value 属性传值 0 时未渲染的问题 [\#844](https://github.com/youzan/vant-weapp/pull/844)
- 修复 Switch 加载图标未垂直居中的问题 [\#847](https://github.com/youzan/vant-weapp/pull/847)
- 修复 Slider 传入的 value 变化时未重新渲染的问题 [\#863](https://github.com/youzan/vant-weapp/pull/863)
- 修复 TreeSelect 类名前缀错误的问题 [\#859](https://github.com/youzan/vant-weapp/pull/859)
- 修复 TreeSelect 局部滚动与页面下拉刷新冲突的问题 [\#867](https://github.com/youzan/vant-weapp/pull/867)


## [v0.4.5](https://github.com/youzan/vant-weapp/tree/v0.4.5)
`2018-10-31`

**Improvements**

- Icon: 添加新图标 question2 [\#839](https://github.com/youzan/vant-weapp/pull/839)
- Steps: 优化样式 [\#835](https://github.com/youzan/vant-weapp/pull/835)

**Bug Fixes**

- Icon：修复商品角标 icon 兼容性问题 [\#840](https://github.com/youzan/vant-weapp/pull/840)

## [v0.4.4](https://github.com/youzan/vant-weapp/tree/v0.4.4)
`2018-10-31`

**Improvements**

- 新增 SwipeCell 组件 [\#815](https://github.com/youzan/vant-weapp/pull/815)
- Search: 新增 error 属性 [\#820](https://github.com/youzan/vant-weapp/pull/820)
- Search: 新增 input-align 属性 [\#819](https://github.com/youzan/vant-weapp/pull/819)

**Bug Fixes**

- 修复 Panel header-class 不生效的问题 [\#831](https://github.com/youzan/vant-weapp/pull/831)
- 修复 Tab 动态设置时底部划线样式问题 [\#816](https://github.com/youzan/vant-weapp/pull/816)
- 修复 ellipsis 样式类不生效的问题 [\#810](https://github.com/youzan/vant-weapp/pull/810)

## [v0.4.3](https://github.com/youzan/vant-weapp/tree/v0.4.3)
`2018-10-24`

**Improvements**

- Icon：优化商品角标icon [\#804](https://github.com/youzan/vant-weapp/pull/804)
- Toast: 新增 context 属性 [\#800](https://github.com/youzan/vant-weapp/pull/800)
- GoodsAction: 支持open-type等更多Button API [\#798](https://github.com/youzan/vant-weapp/pull/798)
- GoodsAction: 支持传入外部样式类 [\#795](https://github.com/youzan/vant-weapp/pull/795)

**Bug Fixes**

- ActionSheet: 修复背景色样式问题 [\#807](https://github.com/youzan/vant-weapp/pull/807)

## [v0.4.2](https://github.com/youzan/vant-weapp/tree/v0.4.2)
`2018-10-19`

**Improvements**

- Area: 支持海外地区码 [\#782](https://github.com/youzan/vant-weapp/pull/782)
- Tag: 新增 size 属性 [\#791](https://github.com/youzan/vant-weapp/pull/791)
- Tag: 新增 round 属性 [\#791](https://github.com/youzan/vant-weapp/pull/791)
- Tag: 新增 color 属性 [\#791](https://github.com/youzan/vant-weapp/pull/791)
- Icon: 新增 card-o 图标 [\#777](https://github.com/youzan/vant-weapp/pull/777)
- GoodsAction: 新增 loading 属性 [\#790](https://github.com/youzan/vant-weapp/pull/790)
- GoodsAction: 新增 disabled 属性 [\#790](https://github.com/youzan/vant-weapp/pull/790)
- Search: 新增 placeholder-style 属性 [\#788](https://github.com/youzan/vant-weapp/pull/788)

**Bug Fixes**

- 修复 Field input-align 属性不生效的问题 [\#789](https://github.com/youzan/vant-weapp/pull/789)
- 修复 Notify color 参数无效问题 [\#783](https://github.com/youzan/vant-weapp/pull/783)
- 修复 Tabbar 使用插槽时 info 属性不生效的问题 [\#779](https://github.com/youzan/vant-weapp/pull/779)

## [v0.4.1](https://github.com/youzan/vant-weapp/tree/v0.4.1)
`2018-10-17`

**Improvements**

- Cell: 优化左右图标未对齐问题 [\#763](https://github.com/youzan/vant-weapp/pull/763)
- Dialog: 增加 stopLoading 方法 [\#757](https://github.com/youzan/vant-weapp/pull/757)

**Bug Fixes**

- 修复 Card 描述过长时文字溢出的问题 [\#768](https://github.com/youzan/vant-weapp/pull/768)
- 修复 SubmitBar 按钮文字过大时显示不全的问题 [\#771](https://github.com/youzan/vant-weapp/pull/771)
- 修复 Tab 在 card 类型下 color 属性错误的问题 [\#767](https://github.com/youzan/vant-weapp/pull/767)

## [v0.4.0](https://github.com/youzan/vant-weapp/tree/v0.4.0)
`2018-10-15`

**Improvements**

- 新增 GoodsAction 组件 [\#736](https://github.com/youzan/vant-weapp/pull/736) [\#759](https://github.com/youzan/vant-weapp/pull/759)
- Card: 新增 thumb-mode 属性 [\#733](https://github.com/youzan/vant-weapp/pull/733)
- Card: 新增 origin-price 属性 [\#745](https://github.com/youzan/vant-weapp/pull/745)
- Dialog: 支持文本通过换行符进行换行 [\#725](https://github.com/youzan/vant-weapp/pull/725)
- Tab: z-index 默认值调整为 1 [\#749](https://github.com/youzan/vant-weapp/pull/749)

**Bug Fixes**

- 修复 Area 第一项无法选中的问题 [\#722](https://github.com/youzan/vant-weapp/pull/722)
- 修复 ActionSheet 由于外部样式类优先级导致的样式问题 [\#748](https://github.com/youzan/vant-weapp/pull/748)
- 修复 Button 在朴素样式下 loading 样式错误的问题 [\#760](https://github.com/youzan/vant-weapp/pull/760)
- 修复 Cell 由于外部样式类优先级导致的样式问题 [\#746](https://github.com/youzan/vant-weapp/pull/746)
- 修复 SubmitBar 文字颜色过浅的问题
- 修复 Tab 在 card 类型下样式错误的问题 [\#742](https://github.com/youzan/vant-weapp/pull/742)

## [v0.3.8](https://github.com/youzan/vant-weapp/tree/v0.3.8)
`2018-10-09`

**Improvements**

- Tab: 样式升级 [\#719](https://github.com/youzan/vant-weapp/pull/719)
- Badge: 样式升级 [\#718](https://github.com/youzan/vant-weapp/pull/718)
- Dialog: 样式升级 [\#717](https://github.com/youzan/vant-weapp/pull/717)
- TreeSelect: 适配 ipad [\#715](https://github.com/youzan/vant-weapp/pull/715)
- Card: 新增 lazyLoad 属性 [\#707](https://github.com/youzan/vant-weapp/pull/707)

**Bug Fixes**

- 修复 Cell 边框在部分情况下无法展示的问题 [\#714](https://github.com/youzan/vant-weapp/pull/714)
- 修复 Stepper 在 ipad 下高度错误的问题 [\#716](https://github.com/youzan/vant-weapp/pull/716)
- 修复 Stepper disabled 状态下仍然可以点击的问题 [\#709](https://github.com/youzan/vant-weapp/pull/709)



## [v0.3.7](https://github.com/youzan/vant-weapp/tree/v0.3.7)
`2018-10-08`

**Improvements**

- Button: 优化禁用状态样式 [\#702](https://github.com/youzan/vant-weapp/pull/702)
- Button: 新增 round 属性 [\#704](https://github.com/youzan/vant-weapp/pull/704)
- Card: 新增 tag 属性 [\#705](https://github.com/youzan/vant-weapp/pull/705)
- Card: 新增 link-type 属性 [\#706](https://github.com/youzan/vant-weapp/pull/706)
- Card: 新增 thumb-link 属性 [\#706](https://github.com/youzan/vant-weapp/pull/706)
- Checkbox: 支持在原生 form 组件内使用 [\#694](https://github.com/youzan/vant-weapp/pull/694)
- Radio: 支持在原生 form 组件内使用 [\#694](https://github.com/youzan/vant-weapp/pull/694)
- Tab：新增 z-index 属性 [\#695](https://github.com/youzan/vant-weapp/pull/695)
- NoticeBar: 优化样式 [\#699](https://github.com/youzan/vant-weapp/pull/699)


## [v0.3.6](https://github.com/youzan/vant-weapp/tree/v0.3.6)
`2018-09-30`

**Improvements**

- Icon: 新增 custom-style 属性 [\#677](https://github.com/youzan/vant-weapp/pull/677)
- Field: 新增 placeholder-style 属性 [\#678](https://github.com/youzan/vant-weapp/pull/678)

**Bug Fixes**

- 修复 Field readonly 属性不生效的问题 [\#679](https://github.com/youzan/vant-weapp/pull/679)

## [v0.3.5](https://github.com/youzan/vant-weapp/tree/v0.3.5)
`2018-09-29`

**Improvements**

- 新增 Checkbox 复选框组件 [\#666](https://github.com/youzan/vant-weapp/pull/666)
- 优化样式代码，减少体积 [\#660](https://github.com/youzan/vant-weapp/pull/660)

**Bug Fixes**

- 修复 Area 数据为空时报错的问题 [\#661](https://github.com/youzan/vant-weapp/pull/661)
- 修复 Tab active 属性默认值错误的问题 [\#665](https://github.com/youzan/vant-weapp/pull/665)


## [v0.3.4](https://github.com/youzan/vant-weapp/tree/v0.3.4)
`2018-09-27`

**Improvements**

- 使用 TypeScript 重构组件 [\#604](https://github.com/youzan/vant-weapp/pull/604)
- 编译工具升级至 babel 7 和 precss 3.0 [\#656](https://github.com/youzan/vant-weapp/pull/656) [\#655](https://github.com/youzan/vant-weapp/pull/655)
- 新增 Radio 单选框组件 [\#629](https://github.com/youzan/vant-weapp/pull/629)
- Button: 新增 id 属性 [\#650](https://github.com/youzan/vant-weapp/pull/650)
- Dialog: 支持 open-type 回调事件 [\#651](https://github.com/youzan/vant-weapp/pull/651)

**Bug Fixes**

- 修复 ActionSheet 边框缺失的问题 [\#619](https://github.com/youzan/vant-weapp/pull/619)
- 修复 Cell 使用 title 插槽时长度错误的问题 [\#642](https://github.com/youzan/vant-weapp/pull/642)
- 修复 Search 无法获取到输入值的问题 [\#641](https://github.com/youzan/vant-weapp/pull/641)
- 修复 Steps 样式错误的问题 [\#627](https://github.com/youzan/vant-weapp/pull/627)
- 修复 SubmitBar 金额为空时仍然显示合计的问题 [\#635](https://github.com/youzan/vant-weapp/pull/635)
- 修复 Toast 触发 touch 事件时报错的问题 [\#618](https://github.com/youzan/vant-weapp/pull/618)


## [v0.3.3](https://github.com/youzan/vant-weapp/tree/v0.3.3)
`2018-09-20`

**Improvements**

- 新增 Area 组件 [\#591](https://github.com/youzan/vant-weapp/pull/591)
- 新增 SubmitBar 组件 [\#597](https://github.com/youzan/vant-weapp/pull/597)
- ActionSheet: 新增 z-index 属性 [\#610](https://github.com/youzan/vant-weapp/pull/610)
- Popup: 新增 custom-style 属性 [\#598](https://github.com/youzan/vant-weapp/pull/598)
- Tab: 新增 border 属性 [\#595](https://github.com/youzan/vant-weapp/pull/595)
- Tab: 支持传入外部样式类 [\#612](https://github.com/youzan/vant-weapp/pull/612)

**Bug Fixes**

- 修复部分组件在基础库 2.2.3 以下版本报错的问题 [\#613](https://github.com/youzan/vant-weapp/pull/613)
- 修复 Card centered 属性不生效的问题 [\#584](https://github.com/youzan/vant-weapp/pull/584)
- 修复 Cell value 为空时 title 最大宽度错误的问题 [\#609](https://github.com/youzan/vant-weapp/pull/609)
- 修复 Dialog Promise 状态错误的问题 [\#585](https://github.com/youzan/vant-weapp/pull/585)
- 修复 Field 边框长度溢出的问题 [\#601](https://github.com/youzan/vant-weapp/pull/601)
- 修复 Layout offset 属性不生效的问题 [\#615](https://github.com/youzan/vant-weapp/pull/615)
- 修复 Tag 边框样式问题 [\#606](https://github.com/youzan/vant-weapp/pull/606)
- 修复 Toast 滚动穿透问题 [\#586](https://github.com/youzan/vant-weapp/pull/586)


## [v0.3.2](https://github.com/youzan/vant-weapp/tree/v0.3.2)
`2018-09-13`

**Improvements**

- Dialog: 新增弹出动画 [\#548](https://github.com/youzan/vant-weapp/pull/548)
- Dialog: 更新按钮色值 [\#543](https://github.com/youzan/vant-weapp/pull/543)
- Dialog: 新增 z-index 属性 [\#573](https://github.com/youzan/vant-weapp/pull/573)
- Popup: 新增 z-index 属性 [\#572](https://github.com/youzan/vant-weapp/pull/572)
- Toast: 新增 z-index 属性 [\#571](https://github.com/youzan/vant-weapp/pull/571)
- Badge: 性能优化 [\#546](https://github.com/youzan/vant-weapp/pull/546)
- Tabbar: 性能优化 [\#547](https://github.com/youzan/vant-weapp/pull/547)
- 调整组件边框色值 [\#554](https://github.com/youzan/vant-weapp/pull/554)

**Bug Fixes**

- 修复 Badge active 属性不生效的问题 [\#569](https://github.com/youzan/vant-weapp/pull/569)
- 修复 Tab color 属性会改变未激活标签的颜色的问题 [\#570](https://github.com/youzan/vant-weapp/pull/570)
- 修复 Field 展示清除按钮时导致输入框高度变化的问题 [\#560](https://github.com/youzan/vant-weapp/pull/560)
- 修复 Tab 组件部分情况下代码报错的问题 [\#553](https://github.com/youzan/vant-weapp/pull/553)
- 修复 Layout 动态渲染时 gutter 属性不生效的问题 [\#536](https://github.com/youzan/vant-weapp/pull/536)
- 移除 Cell 目前无法生效的 arrow-direction 属性 [\#559](https://github.com/youzan/vant-weapp/pull/559)


## [v0.3.1](https://github.com/youzan/vant-weapp/tree/v0.3.1)
`2018-09-08`

**Bug Fixes**

- 修复内置样式无法引入的问题 [\#535](https://github.com/youzan/vant-weapp/pull/535)

## [v0.3.0](https://github.com/youzan/vant-weapp/tree/v0.3.0)
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


## [v0.2.1](https://github.com/youzan/vant-weapp/tree/v0.2.1)
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


## [v0.2.0](https://github.com/youzan/vant-weapp/tree/v0.2.0)
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

## [v0.1.1](https://github.com/youzan/vant-weapp/tree/v0.1.1)
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

## [v0.1.0](https://github.com/youzan/vant-weapp/tree/v0.1.0)
`2018-08-13`

**Breaking changes**

- 统一采用 click 作为点击事件名

**Improvements**

- 新增 Utils 工具方法
- 优化文档对事件名的描述

**Bug Fixes**

- 修复 Card 金额为 0 时无法展示的问题


## [v0.0.1](https://github.com/youzan/vant-weapp/tree/v0.0.1)
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
