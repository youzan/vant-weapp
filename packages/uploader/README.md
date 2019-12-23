# Uploader 文件上传

### 引入

在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "van-uploader": "path/to/@vant/weapp/dist/uploader/index"
}
```

> Vant Weapp 1.0 版本开始支持此组件，升级方式参见[快速上手](#/quickstart)

## 代码演示

### 基础用法

文件上传完毕后会触发`after-read`回调函数，获取到对应的文件的临时地址，然后再使用`wx.uploadFile`将图片上传到远程服务器上

```html
<van-uploader file-list="{{ fileList }}" bind:after-read="afterRead" />
```

```js
Page({
  data: {
    fileList: []
  },
  methods: {
    afterRead(event) {
      const { file } = event.detail;
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.uploadFile({
        url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
        filePath: file.path,
        name: 'file',
        formData: { user: 'test' },
        success(res) {
          // 上传完成需要更新 fileList
          const { fileList = [] } = this.data;
          fileList.push({ ...file, url: res.data });
          this.setData({ fileList });
        }
      });
    }
  }
});
```

### 图片预览

通过向组件传入`file-list`属性，可以绑定已经上传的图片列表，并展示图片列表的预览图

```html
<van-uploader file-list="{{ fileList }}" />
```

```js
Page({
  data: {
    fileList: [
      { url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片1' },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://iph.href.lu/60x60?text=default',
        name: '图片2',
        isImage: true
      }
    ]
  }
});
```

### 限制上传数量

通过`max-count`属性可以限制上传文件的数量，上传数量达到限制后，会自动隐藏上传区域

```html
<van-uploader
  file-list="{{ fileList }}"
  max-count="2"
  bind:after-read="afterRead"
/>
```

### 自定义上传样式

通过插槽可以自定义上传区域的样式

```html
<van-uploader>
  <van-button icon="photo" type="primary">上传图片</van-button>
</van-uploader>
```

### 上传前校验

将`use-before-read`属性设置为`true`，然后绑定 `before-read` 事件可以在上传前进行校验，调用 `callback` 方法传入 `true` 表示校验通过，传入 `false` 表示校验失败。

```html
<van-uploader
  file-list="{{ fileList }}"
  use-before-read
  bind:before-read="beforeRead"
  bind:after-read="afterRead"
/>
```

```js
Page({
  data: {
    fileList: []
  },

  methods: {
    beforeRead(event) {
      const { file, callback } = event.detail;
      callback(file.type === 'image');
    }
  }
});
```

## 云开发示例

### 上传图片至云存储

在开发中，可以利用[小程序云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)的云存储能力，将图片上传至云存储内。然后根据返回的`fileiId`来下载图片、删除图片和替换临时链接。

```js
// 上传图片
uploadToCloud() {
  wx.cloud.init();
  const { fileList } = this.data;
  if (!fileList.length) {
    wx.showToast({ title: '请选择图片', icon: 'none' });
  } else {
    const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`my-photo${index}.png`, file));
    Promise.all(uploadTasks)
      .then(data => {
        wx.showToast({ title: '上传成功', icon: 'none' });
        const newFileList = data.map(item => { url: item.fileID });
        this.setData({ cloudPath: data, fileList: newFileList });
      })
      .catch(e => {
        wx.showToast({ title: '上传失败', icon: 'none' });
        console.log(e);
      });
  }
}

uploadFilePromise(fileName, chooseResult) {
  return wx.cloud.uploadFile({
    cloudPath: fileName,
    filePath: chooseResult.path
  });
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-----------|-----------|
| name | 标识符，可以在回调函数的第二项参数中获取 | *string \| number* | - | - |
| accept | 接受的文件类型, 可选值为`all` `image` `file` `video` | *string* | `image` | - |
| sizeType | 所选的图片的尺寸, 当`accept`为`image`类型时设置所选图片的尺寸可选值为`original` `compressed`| *string[]* | `['original','compressed']` | - |
| preview-size | 预览图和上传区域的尺寸，默认单位为`px` | *string \| number* | `80px` | - |
| preview-image | 是否在上传完成后展示预览图 | *boolean* | `true` | - |
| preview-full-image | 是否在点击预览图后展示全屏图片预览 | *boolean* | `true` | - |
| multiple | 是否开启图片多选，部分安卓机型不支持 | *boolean* | `false` | - |
| disabled | 是否禁用文件上传 | *boolean* | `false` | - |
| deletable | 是否展示删除按钮 | *boolean* | `true` | - |
| capture | 图片或者视频选取模式，当`accept`为`image`类型时设置`capture`可选值为`camera`可以直接调起摄像头 | *string \| string[]* | `['album', 'camera']` | - |
| disabled | 是否禁用文件上传 | *boolean* | `false` | - |
| max-size | 文件大小限制，单位为`byte` | *number* | - | - |
| max-count | 文件上传数量限制 | *number* | - | - |
| upload-text | 上传区域文字提示 | *string* | - | - |
| image-fit | 预览图裁剪模式，可选值参考小程序`image`组件的`mode`属性 | *string* | `scaleToFill` | - |
| use-before-read | 是否开启文件读取前事件 | *boolean* | - | - |
| camera | 当 accept 为 `video` 时生效，可选值为 `back` `front` | *string* | - | - |
| compressed | 当 accept 为 `video` 时生效，是否压缩视频，默认为`true` | *boolean* | - | - |
| max-duration | 当 accept 为 `video` 时生效，拍摄视频最长拍摄时间，单位秒 | *number* | - | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| - | 自定义上传区域 |

### Event

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:before-read | 文件读取前，在回调函数中返回 `false` 可终止文件读取，绑定事件的同时需要将`use-before-read`属性设置为`true` | `event.detail.file`: 当前读取的文件，`event.detail.callback`: 回调函数，调用`callback(false)`终止文件读取 |
| bind:after-read | 文件读取完成后 | `event.detail.file`: 当前读取的文件 |
| bind:oversize | 文件超出大小限制 | - |
| bind:click-preview | 点击预览图片 | `event.detail.index`: 点击图片的序号值 |
| bind:delete | 删除图片 | `event.detail.index`: 删除图片的序号值 |
