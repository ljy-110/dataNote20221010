elementUI的日期选择器获取选择时间的格式，获取时间戳等

在使用日期选择器的时候，我们需要把时间进行格式化，然后再传给后端

比如传时间戳

```
value-format="timestamp"
```

```html
<el-form-item label="申请人生日" required>
        <el-date-picker type="date" value-format="timestamp" placeholder="申请人生日" v-model="ruleFormUser.date1" style="width: 100%;">		</el-date-picker>
</el-form-item>
```

比如‘yyyy-MM-dd’格式

```
value-format="yyyy-MM-dd"
```

```html
<el-form-item label="申请人生日" required>
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="申请人生日" v-model="ruleFormUser.date1" style="width: 100%;">		</el-date-picker>
</el-form-item>
```

