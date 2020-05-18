# 定制主题

### 背景知识

小程序基于 [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=zh-cn) 来实现自定义组件，所以 Vant Weapp 使用与之配套的 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 来实现定制主题。链接中的内容可以帮助你对这两个概念有基本的认识，避免许多不必要的困扰。

CSS 变量 的兼容性要求可以在 [这里](https://caniuse.com/#feat=css-variables) 查看。对于不支持 CSS 变量 的设备，定制主题将不会生效，不过不必担心，默认样式仍会生效。

### 样式变量

定制使用的 CSS 变量 与 Less 变量 同名，下面是一些基本的样式变量，所有可用的颜色变量请参考 [配置文件](https://github.com/youzan/vant-weapp/blob/dev/packages/common/style/var.less)。

```less
// Component Colors
@text-color: #323233;
@border-color: #ebedf0;
@active-color: #f2f3f5;
@background-color: #f8f8f8;
@background-color-light: #fafafa;
```

## 定制方法

### 定制单个组件的主题样式

> 在 wxss 中为组件设置 CSS 变量

```html
<van-button class="my-button">
  默认按钮
</van-button>
```

```less
.my-button {
  --button-border-radius: 10px;
  --button-default-color: #f2f3f5;
}
```

> 或通过 style 属性来设置 CSS 变量，这使你能够轻松实现主题的动态切换

```html
<van-button style="{{ buttonStyle }}">
  默认按钮
</van-button>
```

```js
Page({
  data: {
    buttonStyle: `
      --button-border-radius: 10px;
      --button-default-color: green;
    `,
  },

  onLoad() {
    setTimeout(() => {
      this.setData({
        buttonStyle: `
          --button-border-radius: 2px;
          --button-default-color: pink;
        `,
      });
    }, 2000);
  },
});
```

### 定制多个组件的主题样式

> 与单个组件的定制方式类似，只需用一个 container 节点包裹住需要定制的组件，并将 CSS 变量 设置在 container 节点上

```html
<view class="container">
  <van-button bind:click="onClick">
    默认按钮
  </van-button>

  <van-toast id="van-toast" />
</view>
```

```js
import Toast from 'path/to/vant-weapp/dist/toast/toast';

Page({
  onClick() {
    Toast('我是提示文案，建议不超过十五字~');
  },
});
```

```less
.container {
  --button-border-radius: 10px;
  --button-default-color: #f2f3f5;
  --toast-max-width: 100px;
  --toast-background-color: pink;
}
```

### 定制全局主题样式

> 在 app.wxss 中，写入 CSS 变量，即可对全局生效

```less
page {
  --button-border-radius: 10px;
  --button-default-color: #f2f3f5;
  --toast-max-width: 100px;
  --toast-background-color: pink;
}
```
