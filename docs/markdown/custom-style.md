# 样式覆盖

### 介绍

Vant Weapp 基于微信小程序的机制，为开发者提供了以下 3 种修改组件样式的方法

### 解除样式隔离

样式隔离的相关背景知识请查阅[微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F%E9%9A%94%E7%A6%BB)

<br />

Vant Weapp 的所有组件都开启了`addGlobalClass: true`以接受外部样式的影响，可以使用如下 2 种方式覆盖组件样式

> 在页面中使用 Vant Weapp 组件时，可直接在页面的样式文件中覆盖样式

```html
<van-button type="primary">主要按钮</van-button>
```

```css
/* page.wxss */
.van-button--primary {
  font-size: 20px;
  background-color: pink;
}
```

> 在自定义组件中使用 Vant Weapp 组件时，需开启`styleIsolation: 'shared'`选项

```html
<van-button type="primary">主要按钮</van-button>
```

```js
Component({
  options: {
    styleIsolation: 'shared',
  },
});
```

```css
.van-button--primary {
  font-size: 20px;
  background-color: pink;
}
```

### 使用外部样式类

外部样式类的相关知识背景请查阅[微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E5%A4%96%E9%83%A8%E6%A0%B7%E5%BC%8F%E7%B1%BB)

<br />

Vant Weapp 开放了大量的外部样式类供开发者使用，具体的样式类名称可查阅对应组件的“外部样式类”部分。

需要注意的是普通样式类和外部样式类的优先级是未定义的，因此使用时请添加`!important`以保证外部样式类的优先级。

```html
<van-cell
  title="单元格"
  value="内容"
  title-class="cell-title"
  value-class="cell-value"
/>
```

```css
.cell-title {
  color: pink !important;
  font-size: 20px !important;
}

.cell-value {
  color: green !important;
  font-size: 12px !important;
}
```

### 使用 CSS 变量

Vant Weapp 为部分 CSS 属性开放了基于 CSS 属性的定制方案。

相较于 解除样式隔离 和 使用外部样式类，这种方案支持在页面或应用级别对多个组件的样式做批量修改以进行主题样式的定制。

当然，用它来修改单个组件的部分样式也是绰绰有余的。具体的使用方法请查阅[定制主题](#/theme)
