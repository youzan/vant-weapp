## Steps 步骤条

### 使用指南
在 app.wxss 中引入组件库所有样式
```css
@import "path/to/vant-weapp/dist/index.wxss";
```

在 index.json 中引入组件
```json
{
  "usingComponents": {
    "van-steps": "path/to/vant-weapp/dist/steps/index"
  }
}
```

### 代码演示

#### 基础用法

```html
<van-steps type="horizon" steps="{{steps}}"></van-steps>
```

#### 2步完成

```html
<van-steps type="horizon" steps="{{steps}}"></van-steps>
```

```js
steps: [
  {
      done: true,
      current: false,
      text: '步骤一',
      desc: '10.01'
    },
    {
      done: false,
      current: true,
      text: '步骤二',
      desc: '10.02'
    }
]
```

#### 有描述的steps

```html
<van-steps type="horizon" hasDesc steps="{{steps}}"></van-steps>
```

#### 垂直方向的steps

```html
<van-steps type="vertical" steps="{{steps}}"></van-steps>
```

#### 自定义 class

```html
<van-steps
  steps-class="my-class"
  icon-class="gray"
  title-class="white"
  type="horizon"
  steps="{{steps}}"
></van-steps>
```



| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| type | steps 的展示状态，可选值为 'horizon', 'vertical' | String | horizon | |
| hasDesc | 是否展示描述 | Boolean  | false | |
| steps | 步骤条展示数据 | Array  |  | 必须 |
| steps-class | 自定义类，可改变steps外层样式 | String  | | |
| icon-class | 自定义类，可改变icon样式 | String  | | |
| title-class | 自定义类，可改变标题样式 | String  | | |
| desc-class | 自定义类，可改变描述样式 | String  | | |

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
