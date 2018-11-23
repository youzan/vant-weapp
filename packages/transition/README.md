## Transition 动画

### 使用指南

在 app.json 或 index.json 中引入组件
```json
"usingComponents": {
  "van-transition": "path/to/vant-weapp/dist/transition/index"
}
```

### 代码演示

#### 基础用法
将元素包裹在 transition 组件内，在元素展示/隐藏时，会有相应的过渡动画

```html
<van-transition show="{{ show }}" custom-class="block">
  内容
</van-transition>
```

#### 动画类型
transition 组件内置了多种动画，可以通过`name`字段指定动画类型

```html
<van-transition name="fade-up" />
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 动画类型 | `String` | `fade`|
| show | 是否展示组件 | `Boolean` | `true` |
| duration | 动画时长，单位为毫秒 | `Number` | `300` |
| custom-style | 自定义样式 | `String` | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### 动画类型

| 名称 | 说明 |
|-----------|-----------|
| fade | 淡入 |
| fade-up | 上滑淡入 |
| fade-down | 下滑淡入 |
| fade-left | 左滑淡入 |
| fade-right | 右滑淡入 |
| slide-up | 上滑进入 |
| slide-down | 下滑进入 |
| slide-left | 左滑进入 |
| slide-right | 右滑进入 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.1.1 | feature | 新增组件 |
