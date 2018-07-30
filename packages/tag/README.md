## Tag 标签

### 使用指南
在 json 文件中配置tag组件
```json
"usingComponents": {
  "van-tag": "path/to/vant-weapp/dist/tag/index"
}
```

### 代码演示

#### 基础用法
```html
<van-tag>取消订单</van-tag>
```

#### 类型
tag支持额外的三种类型 primary, danger, warn
```html
<van-tag type="primary">会员折扣</van-tag>
<van-tag type="danger">返现</van-tag>
<van-tag type="warn">返现</van-tag>
```


#### 其他
tag镂空状态
```html
<van-tag plain>返现</van-tag>
```

tag禁用状态
```html
<van-tag disabled>不可用</van-tag>
```


### API

| 名称     | 类型    | 是否必须  | 默认  | 描述   |
|---------|---------|----------|------|-------|
| type    | String  | 否       | 空 | tag类型，值有primary、warn、danger |
| plain   | Boolean | 否       | false | tag是否镂空，默认为false |
| disabled | Boolean | 否      | false | tag是否禁用，默认为false |

### 外部样式类
| 类名       | 说明      |
|-----------|-----------|
| custom-class | 根节点自定义样式类，通过这个可以改变根节点上的样式 |
| theme-class | 根节点自定义样式类，用于更改根节点上的主题样式 |
