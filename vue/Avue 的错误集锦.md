vue的错误集锦

1、点击方法突然报错，而且点击绑定都报错，如下

![image-20211208085820867](D:\LJY\code\dataNote20221010\img\image-20211208085820867.png)

百度了有人说是因为`methods`写少了，或者是变量名没有定义，但是我的都是争取的，也已经定义了。重启了项目也还是不行，最后把变量名给改了就没有报错了，这个是有毒的东西，不知道为啥。

2、el-select 下拉框 因为没有写绑定值value所以导致报错

```js
vue.esm.js?efeb:628 [Vue warn]: Missing required prop: "value"

found in

---> <ElOption> at packages/select/src/option.vue
       <ElScrollbar>
         <ElSelectDropdown> at packages/select/src/select-dropdown.vue
           <ElSelect> at packages/select/src/select.vue
             <ElFormItem> at packages/form/src/form-item.vue
               <ElCol>
                 <ElRow>
                   <ElForm> at packages/form/src/form.vue
                     <NewPersonInfo> at src/components/workArea/personmanage/person/NewPersonInfo.vue
                       <ElMain> at packages/main/src/main.vue
                         <ElContainer> at packages/container/src/main.vue... (1 recursive calls)
                           <MainContent> at src/components/MainContent.vue
                             <App> at src/App.vue
                               <Root>
```

![image-20220112164243382](D:\LJY\code\dataNote20221010\img\image-20220112164243382.png)

页面写法

```js
<el-select v-model="from.personType" style="width: 302px;">
                <el-option label="全部" ></el-option>
                <el-option label="女生" :value="0"></el-option>
                <el-option label="男生" :value="1"></el-option>
</el-select>
```

从上面可以看到是因为全部选项的缺少绑定 value，所以只要加上就可以了

修改

```ja
<el-select v-model="from.personType" style="width: 302px;">
                <el-option label="全部" value=""></el-option>
                <el-option label="女生" :value="0"></el-option>
                <el-option label="男生" :value="1"></el-option>
</el-select>
```

当然错误很多，还有可能是因为没有写`v-model`,或者是`v-model`的值不存在没有定义
