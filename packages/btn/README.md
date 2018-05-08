## Button 按钮

### 使用指南
在 json 文件中配置button组件
```json
"usingComponents": {
  "zan-button": "/dist/btn/index"
}
```

### 属性

| 名称     | 类型    | 是否必须  | 默认  | 描述   |
|---------|---------|----------|------|-------|
| type    | String  | 否       | 空 | 按钮类型，值有primary、warn、danger |
| size    | String  | 否       | 空 | 按钮大小，值有large、small、mini |
| plain   | Boolean | 否       | false | 按钮是否镂空，默认为false |
| disabled | Boolean | 否      | false | 按钮是否禁用，默认为false |
| loading | Boolean | 否       | false | 按钮加载状态，默认为false |

### 代码演示

#### 基础用法
```html
<zan-button>取消订单</zan-button>
```

#### 按钮类型
按钮支持额外的三种类型 primary, danger, warn
```html
<zan-button type="primary">确认付款</zan-button>
<zan-button type="danger">确认付款</zan-button>
<zan-button type="warn">确认付款</zan-button>
```

#### 按钮大小
按钮支持额外三种大小 large, small, mini
```html
<zan-button type="large">确认付款</zan-button>
<zan-button type="small">取消订单</zan-button>
<zan-button type="mini">确认付款</zan-button>
```

#### 其他
按钮镂空状态
```html
<zan-button plain>确认付款</zan-button>
```

按钮加载状态
```html
<zan-button loading>确认付款</zan-button>
```

按钮禁用状态
```html
<zan-button disabled>确认付款</zan-button>
```

![](https://img.yzcdn.cn/public_files/2017/02/08/1b1e39ed3dc6b63519a68ba1e2650cfc.png)
