elementUI的el-table的循环遍历二维数组，v-for循环遍历二维数组并且显示成表格的形式

这些其实就是Excel表格的数据转化下来先是查看数组类型的样式全部的数据

```js
async reafXls(){
      let res = await this.$api.teaback.readXls()
      console.log(res);
    this.dataList =  res.excelObj
      this.goodsList = res.excelObj.slice(1)//内容
      this.dataColum = res.excelObj[0]//表头
      console.log(this.goodsList);
      console.log(this.dataColum);
}
```

<<<<<<< HEAD
![image-20200922141213325](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200922141213325.png)
=======
![image-20200922141213325](E:\ljy\资料\img\typora-user-images\image-20200922141213325.png)
>>>>>>> 8939307 (2022年10月10日2)

下面试区分开一个表格的表头，一个单元格数据



<<<<<<< HEAD
![image-20200922141352178](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200922141352178.png)
=======
![image-20200922141352178](E:\ljy\资料\img\typora-user-images\image-20200922141352178.png)
>>>>>>> 8939307 (2022年10月10日2)

然后就是在页面显示出来

第一种

```html
<table cellpadding="0" cellspacing="0" >
    <tr v-for='(item,i) in dataList' :key="i">
          <td v-for='(value,index) in item' :key="index">{{value}}</td>
    </tr>
  </table>
```

第二种

```html
<el-table :data="goodsList" border height="550" style="width:100%">
            <el-table-column v-for='(item,i) in dataColum' :key="i" :label="item" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row[i]}}
              </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleSee(scope.row)">查看</el-button>
                <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
```

<<<<<<< HEAD
![image-20200922141950586](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200922141950586.png)
=======
![image-20200922141950586](E:\ljy\资料\img\typora-user-images\image-20200922141950586.png)
>>>>>>> 8939307 (2022年10月10日2)
