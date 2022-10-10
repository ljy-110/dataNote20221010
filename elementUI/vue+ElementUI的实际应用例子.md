vue+ElementUI的实际应用例子

### 一、表格（`el-table`）

1、序号

每一个分页后的序号都是递增的，不是每一页都是从1开始

```html
<el-table-column type="index" label="序号" width="80" align="center">
              <template slot-scope="scope">
                <span>{{(page - 1) * limit + scope.$index + 1}}</span>
              </template>
</el-table-column>
```

2、多状态转换成中文显示

比如说我们在开发时候，后端只返回状态的类型，但是我们的页面显示却要中文，我们有多种办法可以进行转换，下面就来一一列举

> 比如 ： 1 已完成 2 已取消 3 已过期 4 已结束 5 未开始 

方法一：直接在页面使用v-if来做判断，但是如果类型比较多就不适合了

```vue
<el-table-column prop="status" label="状态">
    <template slot-scope="scope">
      <span v-if="scope.row.status == 1">已完成</span>
      <span v-else-if="scope.row.status == 2">已取消</span>
	  ...
    </template>
</el-table-column>
```

方法二：类型不超过三个的话，可以使用运算符直接页面进行判断

```vue
<el-table-column prop="status" label="状态">
    <template slot-scope="scope">
		<!--只有两种的时候可以用这个  -->
      <span>{{scope.row.status==1 ? '已完成':'已取消'}}</span>
		<!--只有三种的时候可以用这个  -->
      <span>{{scope.row.status==1 ? '已完成':(scope.row.status==2 ? '已取消':'已过期')}}</span>
    </template>
</el-table-column>
```

方法三：使用过滤器`filters`

```js
filters:{
    formatStatus(status) {
      if (status == 1) {
        return '已完成'
      } else if (status == 2) {
        return '已取消'
      } else if (status == 3) {
        return '已过期'
      } else if (status == 4) {
        return '已结束'
      } else if (status == 5) {
        return '未开始'
      }
      return '-'
    },
},
```

```vue
<el-table-column prop="status" label="状态">
    <template slot-scope="scope">
      <span>{{scope.row.status | formatStatus}}</span>
    </template>
</el-table-column>
```

方法四：使用自定义方法来进行转换，这个方法其实和过滤器差不多的用法，但是使用方法来使用的，可以让多个地方同时使用。过滤器大部分是只局限在页面上面使用，使用自定义方法的话可以在整个页面都可以使用到。比如可以在其他方法里面调用这个方法来获取文字展示

```js
methods: {
    formatStatus(status) {
      if (status == 1) {
        return '已完成'
      } else if (status == 2) {
        return '已取消'
      } else if (status == 3) {
        return '已过期'
      } else if (status == 4) {
        return '已结束'
      } else if (status == 5) {
        return '未开始'
      }
      return '-'
    },
},
```

```vue
<el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span>{{formatStatus(scope.row.status)}}</span>
        </template>
</el-table-column>
```

方法五：使用表格自带的属性`formatter`，用来格式化内容

```js
<el-table-column prop="status" label="状态" :formatter="formatStatus2">
      </el-table-column>
```

```js
methods: {
    formatStatus2(row, column, status, index) {
      // row 当前行  column 表格属性 status 对应数据 index 第几条数据
      if (status == 1) {
        return '已完成'
      } else if (status == 2) {
        return '已取消'
      } else if (status == 3) {
        return '已过期'
      } else if (status == 4) {
        return '已结束'
      } else if (status == 5) {
        return '未开始'
      }
      return '-'
    },
  },
```

3、页面表格导出

表格的导出，使用了`npm`插件`"xlsx": "^0.17.0"`

在使用的页面引入

```js
import XLSX from 'xlsx'
```

给表格添加ref属性，方便获取demo，`ref="table"`

导出方法

```js
downLoadReport(){
      const worksheet = XLSX.utils.table_to_sheet(this.$refs.table.$el)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, '报表-2020-06')
      XLSX.writeFile(workbook, '报表-2020-06.xlsx')
},
```

4、使用运行符动态颜色的展示

```js
<template slot-scope="scope">
    <span :style="{'color':scope.row.nuclein === '其他' ? '#E6A23C':'#00bec7'}">{{scope.row.nuclein}}</span>
</template>

<template slot-scope="scope">
     <span :style="{'color':scope.row.temperature > 37.3 ? '#E6A23C':(scope.row.temperature < 36 ? '#E6A23C':'#00bec7')}">{{scope.row.temperature}}℃</span>
</template>
```

5、表单与表格的使用

比如，获取表格数据方法是`getList()`

输入框，可以使用内置的方法来进行和表格的联动。点击清除按钮刷新表格`@clear="getList(1)"`，输入值后，马上进行搜索`@input="getList(1)"`

```vue
<el-input v-model="value" clearable @clear="getList(1)" @input="getList(1)" placeholder="请输入"></el-input>
```

