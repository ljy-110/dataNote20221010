关于elementui的一些组件的方法使用，坑

1.el-input现在只能输入数字

```vue
//添加oninput="value=value.replace(/[^\d]/g,'')"
<el-form-item label="邮政编码" prop="zip">
   <el-input clearable oninput="value=value.replace(/^\d{6}$/,'')" v-model="ruleForm.zip" placeholder="请输入邮政编码"></el-input>
</el-form-item>
```

2、日历插件的插槽报错，eslint报错（没解决）

![image-20211028090431057](D:\LJY\code\dataNote20221010\img\image-20211028090431057.png)

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

4、不能选择以后的时间

```js
<el-date-picker v-model="dialogForm.checkTime" type="date" placeholder="选择校核时间"
              format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-if="type=='edit'" :picker-options="pickerOptions">
              </el-date-picker>

pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now(); 
        }
      }
```

5、表单正则表达式验证

```js
grossWeight: [
          { required: true, message: '请填写毛重', trigger: 'blur' },
          { pattern: /^[0-9]+([.]{1}[0-9]{1,6})?$/, message: "请输入数字或者小数，例如：10,10.23", trigger: "blur", },
        ],
```

