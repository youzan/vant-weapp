## TopTips 顶部提示

### 使用指南
在 index.json 中引入组件
```json
{
  "usingComponents": {
    "zan-toptips": "path/to/zanui-weapp/dist/toptips/index"
  }
}
```

在 index.js 中声明组件数据

**toptips提供了声明式和命令式2种调用方式，但是由于小程序本身限制，会有一定使用的要求**
```js
// 使用声明式调用的方式， 必须在Page中声明 $zanui对象， 结构如下
// 同时在其他触发toptips显示的函数中，需要手动改变对应的数值
Page({
  data: {
    duration: 1000,
    content: 'xxx',
    $zanui: {
      toptips: {
        show: false
      }
    }
  }
})

// 使用命令式调用的方式，必须在 wxml 模板中声明组件id，
// 默认我们使用了 zan-toptips， 如果使用者要更换，可以手动传入
// 注意和 usingComponents 里引用的路径不一样
const Toptips = require('path/to/zanui-weapp/dist/toptips/toptips');
Page({
  customCallback() {
    Toptips('只传文案展示');
  }
})

```

### 代码演示

### 声明式调用
使用声明式调用
```js
Page({
  data: {
    duration: 1000,
    content: 'xxx',
    $zanui: {
      toptips: {
        show: false
      }
    }
  },

  customCallback() {
    this.setData({
      $zanui: {
        toptips: {
          show: true
        }
      }
    });

    setTimeout(() => {
      this.setData({
        $zanui: {
          toptips: {
            show: false
          }
        }
      })
    }, this.data.duration);
  }
})
```
```html
<zan-toptips
  content="tip内容"
  duration="{{ duration }}"
  is-show="{{ $zanui.toptips.show }}"
/>
```

### 命令式调用
```js
Page({
  customCallback() {
    Toptips('我只改文案')
  }
})
```
```html
<zan-toptips
  id="zan-toptips"
  contetn="{{ content }}"
/>
```

### 修改组件id
```js
Page({
  customCallback() {
    Toptips({
      content: '传入其他参数',
      selector: '#other-id',
      duration: 5000
    })
  }
})
```
```html
<zan-toptips
  id="other-id"
  contetn="{{ content }}"
/>
```

| 参数       | 说明      | 类型       | 默认值       | 可选值     |
|-----------|-----------|-----------|-------------|-------------|
| content | 展示文案 | String | - | |
| duration | 弹层持续时间 | Number | 3000 | |
| isShow | 弹层是否展示 | Boolean | false | |
| color | 字体颜色 | String | `#fff` | |
| backgroundColor | 提示背景色 | String | `#e64340` |