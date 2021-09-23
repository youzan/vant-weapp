# ConfigProvider 全局配置

### 介绍

用于配置 Vant Weapp 组件的主题样式，从 `v1.7.0` 版本开始支持。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "van-config-provider": "@vant/weapp/config-provider/index"
}
```

## 定制主题

### 介绍

Vant Weapp 组件通过丰富的 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 来组织样式，通过覆盖这些 CSS 变量，可以实现**定制主题、动态切换主题**等效果。

#### 示例

以 Button 组件为例，查看组件的样式，可以看到 `.van-button--primary` 类名上存在以下变量：

```css
.van-button--primary {
  color: var(--button-primary-color, #fff);
  background: var(--button-primary-background-color, #07c160);
  border: var(--button-border-width, 1px) solid var(
      --button-primary-border-color,
      #07c160
    );
}
```

### 自定义 CSS 变量

#### 通过 CSS 覆盖

你可以直接在代码中覆盖这些 CSS 变量，Button 组件的样式会随之发生改变：

```css
/* 添加这段样式后，Primary Button 会变成红色 */
page {
  --button-primary-background-color: red;
}
```

#### 通过 ConfigProvider 覆盖

`ConfigProvider` 组件提供了覆盖 CSS 变量的能力，你需要在根节点包裹一个 `ConfigProvider` 组件，并通过 `theme-vars` 属性来配置一些主题变量。

```html
<van-config-provider theme-vars="{{ themeVars }}">
  <van-cell-group>
    <van-field label="评分">
      <view slot="input" style="width: 100%">
        <van-rate
          model:value="{{ rate }}"
          data-key="rate"
          bind:change="onChange"
        />
      </view>
    </van-field>
    <van-field label="滑块" border="{{ false }}">
      <view slot="input" style="width: 100%">
        <van-slider
          value="{{ slider }}"
          data-key="slider"
          bind:change="onChange"
        />
      </view>
    </van-field>
  </van-cell-group>

  <view style="margin: 16px">
    <van-button round block type="primary">提交</van-button>
  </view>
</van-config-provider>
```

```js
import Page from '../../common/page';

Page({
  data: {
    rate: 4,
    slider: 50,
    themeVars: {
      rateIconFullColor: '#07c160',
      sliderBarHeight: '4px',
      sliderButtonWidth: '20px',
      sliderButtonHeight: '20px',
      sliderActiveBackgroundColor: '#07c160',
      buttonPrimaryBorderColor: '#07c160',
      buttonPrimaryBackgroundColor: '#07c160',
    },
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail,
    });
  },
});
```

## API

### Props

| 参数       | 说明           | 类型     | 默认值 |
| ---------- | -------------- | -------- | ------ |
| theme-vars | 自定义主题变量 | _object_ | -      |
