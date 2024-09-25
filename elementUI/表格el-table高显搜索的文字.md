表格搜索的时候，在列表高显搜索的文字、

![image-20240301170249623](D:\LJY\code\dataNote20221010\img\image-20240301170249623.png)

在需要的列

```js
<el-table-column prop="driverName" label="车主姓名" min-width="30%" align="center">
              <template slot-scope="scope">
                <span v-html="showSearchContent(scope.row.driverName)"></span>
              </template>
            </el-table-column>
```

方法`showSearchContent`

```js
showSearchContent(val){
      // this.form.driverName 是指的搜索的关键词
      if (
        val.indexOf(this.form.driverName) !== -1 && 
        this.form.driverName !== ''
      ) {
        return val.replace(
          this.form.driverName,
          '<font color="#f00">' + this.form.driverName + '</font>'
        )
      } else {
        return val
      }

    },
```

