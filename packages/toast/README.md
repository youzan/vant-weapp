## Toast 轻提示

### 使用指南
在 json 文件中配置 toast 组件
```json
"usingComponents": {
  "zan-toast": "/path/to/zanui-weapp/dist/toast/index"
}
```

在需要使用的页面里引入组件库模板和脚本
```html
<zan-toast id="zan-toast-test"></zan-toast>
```
```js
const Toast = require('path/to/zanui-weapp/dist/toast/toast');

Page({
  // ...
  // 可以在任意方法里直接调用，即可唤起
  handleClick() {
    Toast({
      message: 'toast me',
      selector: '#zan-toast-test'
    });
  }
});
```

#### 加载提示
```js
Toast.loading({
  selector: '#zan-toast-test'
});
```

### 参数说明

#### 方法
| 方法名       | 参数      | 返回值       | 介绍       |
|-----------|-----------|-----------|-------------|
| Toast | `options`, `timeout` | - | 展示提示 |
| Toast.loading | `options` | - | 展示加载提示 |
| Toast.clear | - | - | 关闭提示 |
| Toast.setDefaultOptions | `options` 格式同 Toast 函数可以传入的参数, `type` 可选 global/page, 分别指定对整个小程序生效/对当前页面生效 | - | 修改默认配置，对所有 Toast 生效 |
| Toast.resetDefaultOptions | `type` 可选 global/page | - | 重置默认配置，对所有 Toast 生效 |

#### options 具体参数如下
| 参数       | 说明      | 类型       | 默认值       |
|-----------|-----------|-----------|-------------|
| message | toast 显示文案 | String | - |
| type | 提示类型, 可选值：loading，success，fail | String | - |
| icon | toast 显示图标，可以用 icon 里面支持的所有图标	 | String | - |
| image | toast 显示图标，为图片的链接，传入此值后会覆盖 icon 值 | String | - |
| timeout | toast 显示时间，单位为毫秒，小于0则会一直显示，需要手动调用 Toast.clear 清除 | Number | - |
