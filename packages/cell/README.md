## Cell 单元格

### 使用指南

#### 单个 cell 使用示例
```json
  {
    "usingComponents": {
      "zan-cell": "path/to/zanui-weapp/dist/cell/index",
    }
  }
```

```wxml
  <zan-cell title="单行列表" label="附加描述" value="详细信息"></zan-cell>
```

### 属性与事件

| 名称          | 类型        | 是否必须 | 默认  | 描述                                                                                                     |
| ------------- | ----------- | -------- | ----- | -------------------------------------------------------------------------------------------------------- |
| title         | String      | 否       | 无    | 左侧标题                                                                                                 |
| label         | Boolean     | 否       | false | 标题下方的描述信息                                                                                       |
| value         | String      | 否       | 取消  | 右侧内容                                                                                                 |
| noBorder        | Boolean      | 否      | false   | 不显示下边线 |
| isLink        | Boolean      | 否       | false    | 是否展示右侧箭头并开启尝试以 url 跳转 |
| url        | String      | 否      | -    | 当 isLink 设置为 true 时，点击 cell 会尝试跳转到该路径 |
| linkType      | String      | 否       | navigateTo    | 链接跳转类型，可选值为 `navigateTo`，`redirectTo`，`switchTab`，`reLaunch`                               |
| onlyTapFooter | Boolean     | 否       | false | 只有点击 footer 区域才触发 tab 事件                                                                      |
| bindtap       | EventHandle | 否       | 无    | 点击 cell 时触发，`onlyTapFooter` 为 `true` 时点击 footer 区域触发                                       |

### 可用的 slot

| 名称          | 是否必须    | 默认 | 描述                                                                  |
| ------------- | ----------- | ---- | --------------------------------------------------------------------- |
| 默认            | 否          | 无   | 左侧除了 `title`，`label` 外的自定义 wxml 内容                              |
| icon          | 否          | 无   | 标题前自定义的 icon，可使用 `icon` 自定义组件，具体使用参考 icon 组件 |
| footer          | 否          | 无   | 右侧自定义 wxml 内容，如果设置了 `value` 属性，则不生效 |

### 外部样式类
| 类名       | 说明      |
|-----------|-----------|
| cell-class | 根节点自定义样式类，通过这个可以改变根节点上的样式 |
| title-class | title区域自定义样式 |

#### cell 组使用示例
多个 cell 组件必须作为 `cell-group` 组件的子组件，否则可能出现显示问题。

```json
  {
    "usingComponents": {
      "zan-cell": "path/to/zanui-weapp/dist/cell/index",
      "zan-cell-group": "path/to/zanui-weapp/dist/cell-group/index"
    }
  }
```

`cell-group`提供`title-width`控制组内整体 cell 的 title 区域宽度
```wxml
<zan-cell-group border title-width="90">
    <zan-cell title="只显示箭头" is-link></zan-cell>
    <zan-cell title="跳转到首页" is-link url="/pages/dashboard/index"></zan-cell>
    <zan-cell title="单行列表" label="附加描述" value="详细信息"></zan-cell>
    <zan-cell title="表单">
		<input slot="footer" type="digit" placeholder="带小数点的数字键盘"/>
	</zan-cell>
    <zan-cell title="开关">
    	<switch slot="footer" checked/>
    </zan-cell>
</zan-cell-group>
```

### 属性与事件

| 名称       | 类型    | 是否必须 | 默认  | 描述             |
| ---------- | ------- | -------- | ----- | ---------------- |
| titleWidth | Number  | 否       | 无    | title宽度        |
| border     | Boolean | 否       | false | 是否显示上下边框 |
