# 更新日志

### [1.5.0](https://github.com/youzan/vant-weapp/compare/v1.5.0)

`2020-08-27`

**Features**

- ShareSheet: 新增组件 [#3559](https://github.com/youzan/vant-weapp/issues/3559)
- Icons: 升级 @vant/icons 至 v1.2.5 [#3539](https://github.com/youzan/vant-weapp/issues/3539)
- sidebar: 新增 badge 属性 [#3564](https://github.com/youzan/vant-weapp/issues/3564)
- Tabs: 调整默认 line-width 至 40px [#3518](https://github.com/youzan/vant-weapp/issues/3518)
- Tabs: 去除默认边框 [#3519](https://github.com/youzan/vant-weapp/issues/3519)
- TreeSelect: 新增 selected-icon 属性 [#3565](https://github.com/youzan/vant-weapp/issues/3565)
- TreeSelect: 支持 badge、dot 显示 [#3565](https://github.com/youzan/vant-weapp/issues/3565)

**Bug Fixes**

- collapse: 修复嵌套在 popup 等组件中时默认展开无效 [#3562](https://github.com/youzan/vant-weapp/issues/3562)
- empty: 修复 image、description 插槽不生效 [#3563](https://github.com/youzan/vant-weapp/issues/3563)

### [1.4.4](https://github.com/youzan/vant-weapp/tree/v1.4.4)

`2020-08-12`

**Bug Fixes**

- Transition: 重构组件以修复卡顿问题 [#3498](https://github.com/youzan/vant-weapp/pull/3498)
- Icon: 修复数字未对齐 [#3501](https://github.com/youzan/vant-weapp/pull/3501)
- Tab: 修复可滚动时下划线位置错误 [#3511](https://github.com/youzan/vant-weapp/pull/3511)

### [v1.4.3](https://github.com/youzan/vant-weapp/tree/v1.4.3)

`2020-08-07`

**Features**

- Dialog: 增加圆角按钮样式 [#3476](https://github.com/youzan/vant-weapp/pull/3476)
- Cell: 调整下划线位置 [#3487](https://github.com/youzan/vant-weapp/pull/3487)
- Tab: 调整默认滚动阈值至 5 个、优化样式 [#3459](https://github.com/youzan/vant-weapp/pull/3459)

### [v1.4.2](https://github.com/youzan/vant-weapp/tree/v1.4.2)

`2020-08-03`

**Features**

- Toast: 优化样式 [#3451](https://github.com/youzan/vant-weapp/pull/3451)
- Tag: 优化样式 [#3465](https://github.com/youzan/vant-weapp/pull/3465)

**Bug Fixes**

- Calendar: 修复超出 max-range 时未显示 Toast [#3466](https://github.com/youzan/vant-weapp/pull/3466)
- Tab: 修复手势滚动可切换至禁用项 [#3467](https://github.com/youzan/vant-weapp/pull/3467)

### [v1.4.1](https://github.com/youzan/vant-weapp/tree/v1.4.1)

`2020-07-28`

**Features**

- Picker: 调整默认可见的选项个数为 6 个 [#3418](https://github.com/youzan/vant-weapp/pull/3418)
- Toast: 调整圆角为 8px [#3419](https://github.com/youzan/vant-weapp/pull/3419)

**Bug Fixes**

- Slider: 修复点击会触发 drag 事件 [#3415](https://github.com/youzan/vant-weapp/pull/3415)
- Area: 修复中间列无法滚动 [#3443](https://github.com/youzan/vant-weapp/pull/3443)

### [v1.4.0](https://github.com/youzan/vant-weapp/tree/v1.4.0)

`2020-07-17`

**Features**

- Empty: 新增 Empty 组件 [\#3327](https://github.com/youzan/vant-weapp/pull/3327)
- NoticeBar: 新增 background 属性 [\#3388](https://github.com/youzan/vant-weapp/pull/3388)
- NoticeBar: 新增 close 事件 [\#3388](https://github.com/youzan/vant-weapp/pull/3388)
- GridItem: 新增 icon-color 属性 [\#3386](https://github.com/youzan/vant-weapp/pull/3386)
- NavBar: 现在 custom-style 将影响根节点[\#3371](https://github.com/youzan/vant-weapp/pull/3371)
- Cell: 新增 title-style 属性, fix Field label width [\#3370](https://github.com/youzan/vant-weapp/pull/3370)
- Uploader: 更新 failed 图标 [\#3359](https://github.com/youzan/vant-weapp/pull/3359)
- Uploader: 更新删除图标样式 [\#3385](https://github.com/youzan/vant-weapp/pull/3385)
- Uploader: 移除圆角样式 [\#3384](https://github.com/youzan/vant-weapp/pull/3384)
- Field: 更新禁用态样式 [\#3358](https://github.com/youzan/vant-weapp/pull/3358)
- Field: 更新 label 样式 [\#3357](https://github.com/youzan/vant-weapp/pull/3357)
- Picker: 调整 action button 样式 [\#3316](https://github.com/youzan/vant-weapp/pull/3316)

**Bug Fixes**

- Collapse: 使用 animation 重构动画部分逻辑以修复动画卡顿 [\#3401](https://github.com/youzan/vant-weapp/pull/3401)
- Uploader: 修复 loading 样式错误、调整 previewSize 属性默认值 [\#3317](https://github.com/youzan/vant-weapp/pull/3317)
- Area: 修复低版本基础库下 columns-num 设置为 1 或 2 时真机环境报错 [\#3318](https://github.com/youzan/vant-weapp/pull/3318)
- DatetimePicker: 修复使用 formatter 时，事件返回值可能不正确 [\#3352](https://github.com/youzan/vant-weapp/pull/3352)
- Field: 修复 textarea 模式下 label 与 value 不在同一水平线上 [\#3383](https://github.com/youzan/vant-weapp/pull/3383)
- Dialog: show dialog after class ready [\#3374](https://github.com/youzan/vant-weapp/pull/3374)
- Calendar: confirm-disabled-text 属性增加默认值 [\#3394](https://github.com/youzan/vant-weapp/pull/3394)

### [v1.3.3](https://github.com/youzan/vant-weapp/tree/v1.3.3)

`2020-06-24`

**Features**

- steps: 为每一项增加 inactiveIcon、activeIcon 属性 [\#3315](https://github.com/youzan/vant-weapp/pull/3315)
- field: 增加外部样式类 label-class [\#3311](https://github.com/youzan/vant-weapp/pull/3311)
- field: 现在总会从内部 set value 值 [\#3313](https://github.com/youzan/vant-weapp/pull/3313)
- uploader: 为每一项增加 deletable 属性 [\#3270](https://github.com/youzan/vant-weapp/pull/3270)
- uploader: 扩大删除图标的可点击区域 [\#3265](https://github.com/youzan/vant-weapp/pull/3265)

**Bug Fixes**

- tabbar: 修复 iphone-se 上高度异常 [\#3314](https://github.com/youzan/vant-weapp/pull/3314)
- grid: 修复 text 与 icon 同时设置时样式异常 [\#3310](https://github.com/youzan/vant-weapp/pull/3310)
- calendar: 修复多选模式下 default-date 属性不生效 [\#3284](https://github.com/youzan/vant-weapp/pull/3284)
- circle: 修复 type="2d" 时无法动态变更 value [\#3264](https://github.com/youzan/vant-weapp/pull/3264)
- nav-bar: 修复未设置 left-text 时左侧图标样式异常 [\#3263](https://github.com/youzan/vant-weapp/pull/3263)

### [v1.3.2](https://github.com/youzan/vant-weapp/tree/v1.3.2)

`2020-06-04`

**Features**

- button: 新增 form-type 属性 [\#3208](https://github.com/youzan/vant-weapp/pull/3208)
- grid: 新增 icon-size、badge 属性 [\#3236](https://github.com/youzan/vant-weapp/pull/3236)
- grid: 新增 direction 属性 [\#3192](https://github.com/youzan/vant-weapp/pull/3192)

**Bug Fixes**

- Grid: 修复开启 `square` 时横、纵向间距不同 [\#3231](https://github.com/youzan/vant-weapp/pull/3231)
- uploader: 修复点击删除图标时触发 click-preview 事件 [\#3230](https://github.com/youzan/vant-weapp/pull/3230)
- circle: 修复 `type="2d"` 不生效 [\#3228](https://github.com/youzan/vant-weapp/pull/3228)
- calendar: 修复在选择区间时，点击确定报错 [\#3195](https://github.com/youzan/vant-weapp/pull/3195)
- tag: 修复 css 变量名拼写错误 [\#3191](https://github.com/youzan/vant-weapp/pull/3191)

### [v1.3.1](https://github.com/youzan/vant-weapp/tree/v1.3.1)

`2020-05-24`

**Features**

- Button: 新增 class-prefix 属性 [\#3159](https://github.com/youzan/vant-weapp/pull/3159)
- Collapse: 新增 open、close 事件 [\#3176](https://github.com/youzan/vant-weapp/pull/3176)

**Bug Fixes**

- 修复控制台提示选择器错误的问题 [\#3137](https://github.com/youzan/vant-weapp/pull/3137)
- 修复 GoodsActionButton 在某些情况下报错的问题 [\#3145](https://github.com/youzan/vant-weapp/pull/3145)

### [v1.3.0](https://github.com/youzan/vant-weapp/tree/v1.3.0)

`2020-05-08`

#### 支持简易双向绑定

1.3.0 中，我们为数个表单组件支持了简易双向绑定，涉及组件有

Slider [\#3107](https://github.com/youzan/vant-weapp/pull/3107)

Search [\#3106](https://github.com/youzan/vant-weapp/pull/3106)

Rate [\#3105](https://github.com/youzan/vant-weapp/pull/3105)

**Features**

- sticky: 新增 scroll-top 属性 [\#3115](https://github.com/youzan/vant-weapp/pull/3115)
- button: 新增 dataset 属性 [\#3075](https://github.com/youzan/vant-weapp/pull/3075)
- uploader: 所有类型都会触发 click-preview 事件 [\#3071](https://github.com/youzan/vant-weapp/pull/3071)
- Uploader: 属性 accept 新增值 media [\#3047](https://github.com/youzan/vant-weapp/pull/3047)
- feat: 新增基础 font-family [\#3061](https://github.com/youzan/vant-weapp/pull/3061)
- submit-bar: 使用另一个 view 实现 safe-area-inset-bottom 以避免样式冲突 [\#3104](https://github.com/youzan/vant-weapp/pull/3104)

**Bug Fixes**

- dialog: 修复 title 多余空格的问题 [\#3069](https://github.com/youzan/vant-weapp/pull/3069)
- tab: 修复 tab 个数多时显示滚动条 [\#3072](https://github.com/youzan/vant-weapp/pull/3072)
- Sticky: 修复使用组件时页面 onPageScroll 失效 [\#3092](https://github.com/youzan/vant-weapp/pull/3092)
- button: 修复 disabled 属性对 open-type 类型的按钮无效 [\#3076](https://github.com/youzan/vant-weapp/pull/3076)

### [v1.2.2](https://github.com/youzan/vant-weapp/tree/v1.2.2)

`2020-04-21`

**Features**

- GoodsActionButton: 新增 CSS 变量 goods-action-line-height [\#3037](https://github.com/youzan/vant-weapp/pull/3037)
- Calendar: 选择区间大于 range 时自动选中最大范围 [\#3026](https://github.com/youzan/vant-weapp/pull/3026)
- Notify: 新增 top 属性 [\#3018](https://github.com/youzan/vant-weapp/pull/3018)

**Bug Fixes**

- Field: 修复未设置 autosize 时 wxs 报错 [\#3038](https://github.com/youzan/vant-weapp/pull/3038)
- Field: 避免设置 showClear 为 undefined [\#3012](https://github.com/youzan/vant-weapp/pull/3012)

### [v1.2.1](https://github.com/youzan/vant-weapp/tree/v1.2.1)

`2020-04-12`

**Features**

- Field: 支持小程序双向绑定 [\#2986](https://github.com/youzan/vant-weapp/pull/2986)
- Calendar: 多选模式下新增 unselect 事件 [\#2990](https://github.com/youzan/vant-weapp/pull/2990)

**Bug Fixes**

- IndexBar: 移除 scroll-top 属性 [\#2999](https://github.com/youzan/vant-weapp/pull/2999)
- Uploader: 修复图片后缀名为大写时未正常识别 [\#2987](https://github.com/youzan/vant-weapp/pull/2987)
- Field: 修复 autosize 属性 设置 max-height 不生效 [\#3007](https://github.com/youzan/vant-weapp/pull/3007)

### [v1.2.0](https://github.com/youzan/vant-weapp/tree/v1.2.0)

`2020-04-04`

**Features**

- TreeSelect: 更新 nav 背景色 [\#2952](https://github.com/youzan/vant-weapp/pull/2952)
- Sticky: 使用 page scroll 重构组件 [\#2950](https://github.com/youzan/vant-weapp/pull/2950)
- Field: 新增 auto-focus、disable-default-padding、cursor 属性 [\#2936](https://github.com/youzan/vant-weapp/pull/2936)
- Field: 新增 linechange、keyboardheightchange 事件 [\#2936](https://github.com/youzan/vant-weapp/pull/2936)
- Uploader: 支持显示上传状态 [\#2929](https://github.com/youzan/vant-weapp/pull/2929)
- Image: mode 属性新增 widthFix、heightFix [\#2908](https://github.com/youzan/vant-weapp/pull/2908)
- Canvas: 新增 type 属性 [\#2906](https://github.com/youzan/vant-weapp/pull/2906)
- NavBar: 新增 placeholder 属性 [\#2896](https://github.com/youzan/vant-weapp/pull/2896)

**Bug Fixes**

- Field: 修复输入过快时输入框内容不断回退 [\#2936](https://github.com/youzan/vant-weapp/pull/2936)
- Calendar: 修复 show-confirm 为 true 时组件初始化报错 [\#2951](https://github.com/youzan/vant-weapp/pull/2951)
- Tab: 修复 type 为 card 时 color 对边框无效 [\#2941](https://github.com/youzan/vant-weapp/pull/2941)

### [v1.1.0](https://github.com/youzan/vant-weapp/tree/v1.1.0)

`2020-03-21`

**Features**

- 新增 Calendar 日历组件 [\#2894](https://github.com/youzan/vant-weapp/pull/2894)
- Grid: 新增外部样式类 custom-class、content-class、icon-class、text-class [\#2882](https://github.com/youzan/vant-weapp/pull/2882)
- Steps: 新增 click 事件 [\#2874](https://github.com/youzan/vant-weapp/pull/2874)
- SideBar: 新增 title 插槽 [\#2873](https://github.com/youzan/vant-weapp/pull/2873)
- Uploader: 新增 upload-icon 属性 [\#2869](https://github.com/youzan/vant-weapp/pull/2869)
- Uploader: 新增 show-upload 属性 [\#2868](https://github.com/youzan/vant-weapp/pull/2868)
- Uploader: 更新样式、调整事件触发顺序与 vant 一致 [\#2886](https://github.com/youzan/vant-weapp/pull/2886)
- Field: 新增 show-word-limit 属性 [\#2856](https://github.com/youzan/vant-weapp/pull/2856)
- Field: autosize 属性支持传入对象，指定 maxHeight 与 minHeight [\#2856](https://github.com/youzan/vant-weapp/pull/2856)
- Field: 新增若干 CSS 变量 [\#2856](https://github.com/youzan/vant-weapp/pull/2856)

**Bug Fixes**

- Button: 移除 lang 属性默认值 [\#2883](https://github.com/youzan/vant-weapp/pull/2883)
- Button: 修复 disabled 属性对原生事件无效 [\#2878](https://github.com/youzan/vant-weapp/pull/2878)

### [v1.0.7](https://github.com/youzan/vant-weapp/tree/v1.0.7)

`2020-03-04`

**Features**

- DropdownItem: 新增 `popupStyle` 属性 [\#2804](https://github.com/youzan/vant-weapp/pull/2804)
- DropdownItem: 新增 `open` `close` `opened` `closed` 事件 [\#2804](https://github.com/youzan/vant-weapp/pull/2804)
- Card: 新增 `price` `num` 插槽 [\#2787](https://github.com/youzan/vant-weapp/pull/2787)
- Card: 新增 `origin-price-class` 外部样式类 [\#2787](https://github.com/youzan/vant-weapp/pull/2787)

**Bug Fixes**

- Tab: 修复内容项高度不同时粘性布局异常 [\#2817](https://github.com/youzan/vant-weapp/pull/2817)
- Picker: 修复未选中项样式未置灰 [\#2816](https://github.com/youzan/vant-weapp/pull/2816)
- GoodsActionButton: 修复仅使用一个 button 时样式异常 [\#2808](https://github.com/youzan/vant-weapp/pull/2808)
- Radio: `name`类型与`value`统一 [\#2801](https://github.com/youzan/vant-weapp/pull/2801)
- Uploader: 修复文档错误 [\#2777](https://github.com/youzan/vant-weapp/pull/2777)

### [v1.0.6](https://github.com/youzan/vant-weapp/tree/v1.0.6)

`2020-02-24`

**Features**

- GoodsActionButton: 新增默认 slot [\#2779](https://github.com/youzan/vant-weapp/pull/2779)
- SubmitBar: 更新圆角样式 [\#2755](https://github.com/youzan/vant-weapp/pull/2755)
- Card: 更新样式 [\#2754](https://github.com/youzan/vant-weapp/pull/2754)
- 优化 relation 部分代码 [\#2760](https://github.com/youzan/vant-weapp/pull/2760)

**Bug Fixes**

- DropdownItem: 修复点击选项时不触发`close`事件 [\#2766](https://github.com/youzan/vant-weapp/pull/2766)
- GoodsActionButton: 修复低版本基础库下的样式问题 [\#2762](https://github.com/youzan/vant-weapp/pull/2762)
- Tabs: 修复点击禁用项时事件参数错误 [\#2758](https://github.com/youzan/vant-weapp/pull/2758)
- Checkbox: 修复动态设置`disabled`属性无效 [\#2748](https://github.com/youzan/vant-weapp/pull/2748)
- Button: add loading color when plain is true [\#2746](https://github.com/youzan/vant-weapp/pull/2746)
- Radio: 修复`label-disabled`文档错误 [\#2763](https://github.com/youzan/vant-weapp/pull/2763)

### [v1.0.5](https://github.com/youzan/vant-weapp/tree/v1.0.5)

`2020-02-07`

**Features**

- ActionSheet: actions 支持更多 openType [\#2715](https://github.com/youzan/vant-weapp/pull/2715)
- Uploader: 新增开始`disabled`时的组件样式 [\#2720](https://github.com/youzan/vant-weapp/pull/2720)
- Icon: 调整示例小程序页面与 vant 对齐 [\#2728](https://github.com/youzan/vant-weapp/pull/2728)
- 示例小程序首页与 vant 对齐 [\#2729](https://github.com/youzan/vant-weapp/pull/2729)
- 完善快速上手文档，增加 npm 构建说明 [\#2726](https://github.com/youzan/vant-weapp/pull/2726)

**Bug Fixes**

- Radio: 修复`disabled`属性不生效 [\#2711](https://github.com/youzan/vant-weapp/pull/2711)
- Tab: 修复`animated`属性无法动态切换 [\#2712](https://github.com/youzan/vant-weapp/pull/2712)
- Circle: 修正文档错误，`size`属性不支持`string`类型 [\#2694](https://github.com/youzan/vant-weapp/pull/2694)
- 修正文档默认 slot 名称为 default 的错误 [\#2726](https://github.com/youzan/vant-weapp/pull/2726)
- TreeSelect: 修正文档示例代码标签闭合错误 [\#2710](https://github.com/youzan/vant-weapp/pull/2710)

### [v1.0.4](https://github.com/youzan/vant-weapp/tree/v1.0.4)

`2020-01-21`

**Features**

- Stepper: 新增 disable-long-press 属性 [\#2691](https://github.com/youzan/vant-weapp/pull/2691)
- quickstart: 快速上手新增关闭 style v2 说明 [\#2704](https://github.com/youzan/vant-weapp/pull/2704)
- Search: 新增 background、disabled、input-align 文档示例 [\#2698](https://github.com/youzan/vant-weapp/pull/2698)
- Icon: 文档新增图标文字加载失败说明 [\#2681](https://github.com/youzan/vant-weapp/pull/2681)

**Bug Fixes**

- Sticky: 修复真机上页面滚动缓慢时无法吸顶/取消吸顶 [\#2703](https://github.com/youzan/vant-weapp/pull/2703)
- DropdownItem: 修复 wx:key 警告 [\#2670](https://github.com/youzan/vant-weapp/pull/2670)
- IndexBar: 文档修复组件引入路径错误 [\#2689](https://github.com/youzan/vant-weapp/pull/2689)
- 升级依赖版本以避免安全警告 [\#2680](https://github.com/youzan/vant-weapp/pull/2680)

### [v1.0.3](https://github.com/youzan/vant-weapp/tree/v1.0.3)

`2020-01-09`

**Features**

- npm 包默认输出 es5 版本代码 [\#2639](https://github.com/youzan/vant-weapp/pull/2639)
- Steps: 新增外部样式类 desc-class [\#2630](https://github.com/youzan/vant-weapp/pull/2630)

**Bug Fixes**

- Tab: 解决动态添加选项时，顺序错乱和下划线长度不变的问题 [\#2663](https://github.com/youzan/vant-weapp/pull/2663)
- NavBar: 修复返回图标未居中的问题 [\#2633](https://github.com/youzan/vant-weapp/pull/2633)

### [v1.0.2](https://github.com/youzan/vant-weapp/tree/v1.0.2)

`2019-12-31`

**Features**

- Skeleton: 新增外部样式类` row-class``avatar-class``title-class ` [\#2612](https://github.com/youzan/vant-weapp/pull/2612)
- SwipeCell: 支持动态修改`width`属性 [\#2607](https://github.com/youzan/vant-weapp/pull/2607)
- Uploader: 新增` camera``compressed``maxDuration `属性 [\#2584](https://github.com/youzan/vant-weapp/pull/2584)

**Improvements**

- Tab: 优化弹性滚动效果 [\#2606](https://github.com/youzan/vant-weapp/pull/2606)

**Bug Fixes**

- IndexBar: 修复字母未全部定义时 click 事件报错 [\#2605](https://github.com/youzan/vant-weapp/pull/2605)
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
- 使用`env()`重构 iOS 安全区域适配
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

微信小程序自定义组件的组件模型相当于一个简化版的 [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=zh-CN)，幸运的是，小程序也支持了 [CSS 自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 的特性。最终，我们基于 CSS 自定义属性设计了样式定制的方案，开发者使用灵活、方便，组件维护也更简单。

从 1.0 版本开始，Vant Weapp 中的所有组件都支持通过 [CSS 组定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 进行样式定制，具体使用姿势可查看[相关文档](https://youzan.github.io/vant-weapp/#/theme)

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

---

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
- 新增 disablePlus、disableMinus 属性

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
