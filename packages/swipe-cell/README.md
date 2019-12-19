# SwipeCell 滑动单元格

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "van-swipe-cell": "path/to/@vant/weapp/dist/swipe-cell/index"
}
```

## 代码演示

### 基础用法

```html
<van-swipe-cell right-width="{{ 65 }}" left-width="{{ 65 }}">
  <view slot="left">选择</view>
  <van-cell-group>
    <van-cell title="单元格" value="内容" />
  </van-cell-group>
  <view slot="right">删除</view>
</van-swipe-cell>
```

### 异步关闭

当开启`async-close`时， 通过绑定`close`事件，可以自定义两侧滑动内容点击时的关闭行为

```html
<van-swipe-cell id="swipe-cell" right-width="{{ 65 }}" left-width="{{ 65 }}" async-close bind:close="onClose">
  <view slot="left">选择</view>
  <van-cell-group>
    <van-cell title="单元格" value="内容" />
  </van-cell-group>
  <view slot="right">删除</view>
</van-swipe-cell>
```

```js
Page({
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close();
        });
        break;
    }
  }
});
```

### 主动打开

```html
<van-swipe-cell id="swipe-cell2" right-width="{{ 65 }}" left-width="{{ 65 }}" name="示例" bind:open="onOpen" >
    <view slot="left" class="van-swipe-cell__left">选择</view>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
    </van-cell-group>
    <view slot="right" class="van-swipe-cell__right">删除</view>
  </van-swipe-cell>
```

```js
Page({
  onOpen(event) {
    const { position, name } = event.detail;
    switch (position) {
      case 'left':
        Notify({
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`
        });
        break;
      case 'right':
        Notify({
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`
        });
        break;
    }
  }
});
```



## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| name | 标识符，可以在 close 事件的参数中获取到 | *string \| number* | - | - |
| left-width | 左侧滑动区域宽度 | *number* | `0` | - |
| right-width | 右侧滑动区域宽度 | *number* | `0` | - |
| async-close | 是否异步关闭 | *boolean* | `false` | - |
| disabled | 是否禁用滑动 | *boolean* | `false` | 1.3.4 |

### Slot

| 名称 | 说明 |
|------|------|
| - | 自定义显示内容 |
| left | 左侧滑动内容 |
| right | 右侧滑动内容 |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| click | 点击时触发 | 关闭时的点击位置 (`left` `right` `cell` `outside`) |
| close | 关闭时触发 | 	{ position: 'left' \| 'right' , instance , name: string } |
| open | 打开时触发 | 	{ position: 'left' \| 'right' , name: string } |

### close 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| position | *string* | 关闭时的点击位置 (`left` `right` `cell` `outside`) |
| instance | *object* | SwipeCell 实例 |
| name | 标识符 | *string* |

### 方法

通过 selectComponent 可以获取到 SwipeCell 实例并调用实例方法

| 方法名 | 参数 | 返回值 | 介绍 |
|------|------|------|------|
| open | position: `left | right` | - | 打开单元格侧边栏 |
| close | - | - | 收起单元格侧边栏 |
