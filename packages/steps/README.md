## Steps 步骤条

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/zanui-weapp/dist/index.wxss";
```

在需要使用的页面里引入组件库模板和脚本
```html
<import src="path/to/zanui-weapp/dist/steps/index.wxml" />
```

### 代码演示
在模板中使用 zan-steps 模板，并传入相应数据
```html
<template is="zan-steps" data="{{ type: 'horizon', steps }}"></template>
```
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| type | steps 的展示状态，可选值为 'horizon', 'vertical' | String | horizon | |
| hasDesc | 是否展示描述 | Boolean  | false | |
| steps | 步骤条展示数据 | Array  |  | 必须 |
| className | 自定义类目，方便自定义显示 | String  | | |

steps 数据格式如下：
```js
[
  {
    // 此步骤是否当前完成状态
    current: false,
    // 此步骤是否已经完成
    done: true,
    // 此步骤显示文案
    text: '步骤一',
    // 此步骤描述语
    desc: '10.01'
  },
  {
    done: true,
    current: false,
    text: '步骤二',
    desc: '10.02'
  },
  {
    done: true,
    current: true,
    text: '步骤三',
    desc: '10.03'
  }
]
```
