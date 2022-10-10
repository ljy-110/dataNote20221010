vue+elementUI的el-form的回车键登录，监听键盘来触发事件

1.当只有一个el-input的时候，可以用elementUI的自带的回车键触发提交事件

但是有时候会同时触发刷新页面，这样可以在el-form上添加@submit.native.prevent来解决

```js
<el-form :model="ruleForm" label-position='left' status-icon :rules="rules" @submit.native.prevent ref="ruleForm" label-width="50px" class="demo-ruleForm">
                <el-form-item label="账号" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入管理员账号"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" native-type="submit" @click="submitForm('ruleForm')">登录</el-button>
                  <el-button @click="resetForm('ruleForm')">清空</el-button>
                </el-form-item>
              </el-form>
```

2.使用回车键enter来进行登录，在登录按钮上面添加native-type="submit"

```js
<el-form :model="ruleForm" label-position='left' status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
                <el-form-item label="账号" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入管理员账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" show-password v-model="ruleForm.pass" placeholder="请输入密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" native-type="submit" @click="submitForm('ruleForm')">登录</el-button>
                  <el-button @click="resetForm('ruleForm')">清空</el-button>
                </el-form-item>
              </el-form>
```

3.监听键盘来触发登录事件

```js
created() {
    window.addEventListener('keydown', this.handkeyCode, true)//开启监听键盘按下事件
  },
```

```js
handkeyCode(e) {
      let key = null;
      if (window.event === undefined) {
        key = e.keyCode;
      } else {
        key = window.event.keyCode;
      }
      if (key === 13) {
        this.login();//登录事件
      }
    },
```

