<p align="center">
    <img src="https://img.yzcdn.cn/public_files/2017/02/06/ee0ebced79a80457d77ce71c7d414c74.png">
</p>


ZanUI for WeApp 为微信小程序量身设计
====

## 概述
[ZanUI WeApp] 是一套用于微信小程序开发的基础UI组件库，由有赞官方提供，结合了微信的视觉规范，为用户提供更加统一的使用感知。包含 `btn`、`card`、`cell`、`icon`、`tab` 等各式元素

## 下载
``` bash
git clone https://github.com/youzan/zanui-weapp.git
cd zanui-weapp
```

## 预览
用[微信web开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)打开项目目录

<img src="https://img.yzcdn.cn/public_files/2017/02/08/a5e6445075826183659742cc6946c477.png" width="320" />

## 使用

首先引入样式文件，我们推荐在你的`app.wxss`直接引入`zanui-weapp/dist/index.wxss`。

根据功能的不同，可以将组件大致的分为4类：

1. 简单组件

    如按钮组件，只要按照wxml结构写就好了

    ~~~html
    <!-- example/btn/index.html -->

    <view class="zan-btn">按钮</view>
    ~~~

2. 复杂组件

    如加载更多组件，需要先引入定义好的模版，然后给模版传递数据

    ~~~html
    <!-- example/loadmore/index.html -->

    <!-- 引入组件模版 -->
    <import src="path/to/zanui-weapp/dist/loadmore/index.wxml" />

    <!-- 使用组件 -->
    <template is="zan-loadmore" data="{{loading: true}}" />
    ~~~

3. 带事件回掉的组件

    如数量选择组件，需要先引入模版，然后给模版传递数据

    ~~~html
    <!-- example/quantity/index.html -->

    <import src="path/to/zanui-weapp/dist/quantity/index.wxml" />

    <template is="zan-quantity" data="{{ ...quantity, componentId: 'customId' }}" />
    ~~~

    然后通过`Zan.Quantity`把相关回掉注入到页面中

    ~~~js
    // example/quantity/index.js

    var Zan = require('path/to/zanui-weapp/dist/index');

    Page(Object.assign({}, Zan.Quantity, {
      data: {
        quantity: {
          quantity: 10,
          min: 1,
          max: 20
        },
      },

      handleZanQuantityChange(e) {
        // 如果页面有多个Quantity组件，则通过componentId来表示唯一
        var compoenntId = e.componentId;
        var quantity = e.quantity;

        this.setData({
          [`quantity.quantity`]: quantity
        });
      }
    }));
    ~~~

4. API类组件

    如Toast组件，需要先引入模版，并在页面上使用。

    >> 注意`zanToast`这个数据也是通过`Zan.Toast`注入到页面的

    ~~~html
    <!-- example/toast/index.html -->

    <import src="path/to/zanui-weapp/dist/toast/index.wxml" />

    <view bindtap="showToast">showToast</view>

    <template is="zan-toast" data="{{ zanToast }}"></template>
    ~~~

    将API注入到页面后，就可以通过`this`来直接调用相应的API了

    ~~~js
    <!-- example/toast/index.js -->

    var Zan = require('path/to/zanui-weapp/dist/index');

    Page(Object.assign({}, Zan.Toast, {
      showToast() {
        this.showZanToast('toast的内容');
      }
    }));

    ~~~

更多示例可以在项目的 `example`目录中查看

## 协议
[MIT]

请自由地享受和参与开源

## 贡献

如果你有好的意见或建议，欢迎给我们提 [issue] 或 [PR]，为提升 [ZanUI Weapp] 贡献力量

[issue]: https://github.com/youzan/zanui-weapp/issues/new
[PR]: https://github.com/youzan/zanui-weapp/compare
[ZanUI Weapp]: https://github.com/youzan/zanui-weapp
[MIT]: http://opensource.org/licenses/MIT
