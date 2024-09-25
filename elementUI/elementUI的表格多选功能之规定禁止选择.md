`elementUI`的el-table表格多选功能之禁用多选

在进行表格的多选的时候我们会碰到那种，只允许部分内容可以被选择，不符合的要禁用多选框，这个时候就要用到`elementUI el-table`的`selectable`

![image-20211008101124245](D:\LJY\code\dataNote20221010\img\image-20211008101124245.png)

所以我们可以这样写

```html
<el-table :data="tableData" border v-loading='loading' size="small" @selection-change="handleSelectionChange">
    <el-table-column v-if="type==='admin'" type="selection" :selectable="selectable" width="55"></el-table-column>
    <el-table-column label="状态" prop="tips" width="150"></el-table-column>
</el-table>
```

```js
selectable(row,index) {
    return row.pro_status === 'review' //通过某个值来进行判断，规定那一行的选择框被禁用
}
```

