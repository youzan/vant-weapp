# Upload 上传文件

### 引入

在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "van-uploader": "path/to/vant-weapp/dist/uploader/index"
}
```

## 代码演示

### 基础用法

文件上传完毕后会触发`after-read`回调函数，获取到对应的文件的临时地址，然后再使用`wx.uploadFile`将图片上传到远程服务器上

#### wxml 示例

```html
<van-uploader file-list="{{ fileList }}" bind:after-read="afterRead" />
```

#### js 示例

```js
{
  data: {
    fileList: []
  },
  methods: {
    afterRead(event) {
      const { file } = event.detail;
      // 当设置 mutiple 为 true 是 file 是一个数组，mutiple 默认为 false，file 是一个对象
      wx.uploadFile({
        url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        filePath: file.path,
        name: 'file',
        formData: { 'user': 'test' },
        success (res){
          // 上传完成需要更新fileList
          const { fileList = [] } = this.data;
          fileList.push({ ...file, url: res.data });
          this.setData({ fileList });
        }
      });
    }
  }
}
```

### 图片预览

通过向组件传入`file-list`属性，可以绑定已经上传的图片列表，并展示图片列表的预览图

```html
<van-uploader file-list="{{ fileList }}" />
```

```js
{
  data: {
    fileList: [
      { url: 'https://img.yzcdn.cn/vant/cat.jpeg', name: '图片1' },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      { url: 'http://iph.href.lu/60x60?text=default', name: '图片2', isImage: true }
    ]
  }
}
```

### 限制上传数量

通过`max-count`属性可以限制上传文件的数量，上传数量达到限制后，会自动隐藏上传区域

```html
<van-uploader file-list="{{ fileList }}" max-count="2" bind:after-read="afterRead" />
```

### 自定义上传样式

将`use-slot`属性设置为`true`，通过插槽可以自定义上传区域的样式

```html
<van-uploader use-slot>
  <van-button icon="photo" type="primary">上传图片</van-button>
</van-uploader>
```

### 上传前校验

将`use-before-read`属性设置为`true`，然后绑定 `before-read` 事件可以在上传前进行校验，调用 `callback` 方法传入 `true` 表示校验通过，传入 `false` 表示校验失败。

```html
<van-uploader file-list="{{ fileList }}" use-before-read="{{ true }}" bind:before-read="beforeRead" bind:after-read="afterRead" />
```

```js
{
  data: {
    fileList: []
  },

  methods: {
    beforeRead(event) {
      const { file, callback = () => {} } = event.detail;
      console.log('before上传', file);
      if (file.type !== 'image') {
        callback(false);
        return;
      }
      callback(true);
    }
  }
}
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-----------|-----------|
| name | 标识符，可以在回调函数的第二项参数中获取 | _string \| number_ | - |
| accept | 接受的文件类型, 可选值为`all` `image` `file` | _string_ | `image` |
| preview-size | 预览图和上传区域的尺寸，默认单位为`px` | _string \| number_ | `80px` |
| preview-image | 是否在上传完成后展示预览图 | _boolean_ | `true` |
| preview-full-image | 是否在点击预览图后展示全屏图片预览 | _boolean_ | `true` |
| multiple | 是否开启图片多选，部分安卓机型不支持 | _boolean_ | `false` |
| disabled | 是否禁用文件上传 | _boolean_ | `false` |
| capture | 图片选取模式，当`accept`为`image`类型时设置`capture`可选值为`camera`可以直接调起摄像头 | _string \| Array_ | `['album', 'camera']` |
| disabled | 是否禁用文件上传 | _boolean_ | `false` |
| max-size | 文件大小限制，单位为`byte` | _number_ | - |
| max-count | 文件上传数量限制 | _number_ | - |
| upload-text | 上传区域文字提示 | _string_ | - |
| image-fit | 预览图裁剪模式，可选值参考小程序`image`组件的`mode`属性 | _string_ | `scaleToFill` |

### Slot

| 名称 | 说明 |
| ---- | -------------------------------- |
| - | 自定义上传样式，用法见上面的例子 |

### Event

| 事件名 | 说明 | 参数 |
| ------------------ | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| bind:before-read | 文件读取前的回调函数，返回 `false` 可终止文件读取，绑定事件的同时需要将`use-before-read`属性设置为`true` | `event.detail.file`: 当前读取的文件，`event.detail.callback`: 回调函数，调用`callback(false)`终止文件读取 |
| bind:after-read | 文件读取完成后的回调函数 | `event.detail.file`: 当前读取的文件 |
| bind:oversize | 文件超出大小限制的回调函数 | - |
| bind:click-preview | 点击预览图片的回调函数 | `event.detail.index`: 点击图片的序号值 |
| bind:delete | 删除图片的回调函数 | `event.detail.index`: 删除图片的序号值 |
