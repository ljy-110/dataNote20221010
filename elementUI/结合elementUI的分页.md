vue结合elementui的后端返回数据的分页操作

```html
//vue页面
<div class="block" style="margin-top:20px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage" //记得要加 .sync
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
```

```js
//data.return
currentPage:1,
total:null,
limit:10,
list:[],
page:1,
eviLists:[],
//分页方法
getinfoList(){
  let fyData = this.eviLists
  this.list = fyData.filter((item, index) =>
      index < this.page * this.limit && index >= this.limit * (this.page - 1)
  )
  this.page = 1
},
handleSizeChange(val) {
  this.limit = val
  this.getlist()
  // console.log(`每页 ${val} 条`);
},
handleCurrentChange(val) {
  this.page = val
  this.getlist()
  // console.log(`当前页: ${val}`);
},
 //获取后端数据，后端已经进行了分页
    getlist(){
        let params = {//传给后端的参数
            begin: (this.page-1)*10,//后端已经分好了数据
            len: this.limit //条数
        }
        this.eviLists = res.list //后端返回的数据
        this.total = res.sum // 后端返回的总条数
        this.getinfoList()  //获取数据之后进行分页
    }
  
```



