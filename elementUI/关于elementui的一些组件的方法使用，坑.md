关于elementui的一些组件的方法使用，坑

1.el-input现在只能输入数字

```vue
//添加oninput="value=value.replace(/[^\d]/g,'')"
<el-form-item label="邮政编码" prop="zip">
   <el-input clearable oninput="value=value.replace(/^\d{6}$/,'')" v-model="ruleForm.zip" placeholder="请输入邮政编码"></el-input>
</el-form-item>
```

2、日历插件的插槽报错，eslint报错（没解决）

![image-20211028090431057](E:\ljy\资料\img\image-20211028090431057.png)

3、序号

```html
<el-table-column type="index" label="序号" width="80" align="center">
              <template slot-scope="scope" class="center">
                <span class="center">
                  <span class="warn-bg-index">{{(page - 1) * limit + scope.$index + 1}}</span>
                </span>
              </template>
            </el-table-column>
```

