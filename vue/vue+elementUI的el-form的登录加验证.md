vue+elementUI的el-form的登录加验证

```vue
<template>
  <div>
    <div class="box">
      <div class="left">
        <div class="contents a1" style="margin:20%;width:50%;">
          <div style="margin-bottom:60px;">
            <h1>登录到
              <span @click="$router.push(`/`)" class="t1">知云链</span>
            </h1>
          </div>
          <!-- <div style="margin-bottom:50px;">
            <span>没有账号？</span>
            <span class="t2" @click="$router.push(`/register`)">注册账号</span>
          </div> -->
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="律师入口" name='1'></el-tab-pane>
              <el-tab-pane label="企业入口" name='2'></el-tab-pane>
            </el-tabs>
            <el-form :model="ruleForm" label-position='left' hide-required-asterisk @submit.native.prevent status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
                <el-form-item label="账号" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" show-password v-model="ruleForm.pass" placeholder="请输入密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" native-type="submit" :loading='loading' @click="submitForm('ruleForm')">登录</el-button>
                  <el-button @click="resetForm('ruleForm')">清空</el-button>
                </el-form-item>
              </el-form>
                  <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="记住密码" name="type"></el-checkbox>
                  </el-checkbox-group>
              <div>
              <span class="t3 pl" @click="$router.push(`/password`)">忘记密码？</span>
              </div>
          </div>
        </div>
      </div>
      <div class="right" style="margin-top:70px;">
        <div class="contents">
          <img src="../../../assets/img/logo.png" alt="" srcset="" @click="$router.push(`/`)" style="cursor: pointer;width:90%;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      activeName: '1',
      ruleForm: {
        pass: '',
        name:'',
        type:''
      },
      loading:false,
      rules: {
        pass: [
          {required: true,message: '请输入密码',trigger: 'blur' }
        ],
        name: [
          {required: true,message: '请输入账号', trigger: 'blur' },
        ],
      }
    };
  },

  created() {
    this.passWord()
  },

  methods: {
    submitForm(formName) {
      let data = this.ruleForm
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let random = Math.random();
          let params = {
            account:this.ruleForm.name,
            pwd: this.ruleForm.pass,
            user_type:this.activeName,
            random: random
          }
          let res = await this.$api.teaback.login_user_pwd(params)
          console.log(res)
          if(res.ret){
            if(res.user_type === this.activeName){
              this.$message.success('登录成功')
              this.loading = false
              this.$router.push(`/operate`)
              localStorage.setItem("account", res.account);
              localStorage.setItem("s_id", res.s_id);
              localStorage.setItem("real_res", res.real_res);
              localStorage.setItem("user_type", res.user_type);
              localStorage.setItem("userInfo",JSON.stringify(res))
              localStorage.setItem("user_id", res.user_id);
              if('is_son' in res){
                localStorage.setItem("father_id", res.father_id);
              }else{}
            }else{
              this.$message.warning('请选择账号对应的登录入口')
              this.loading = false
            }
          }else if(res.msg == 'pwd error'){
            this.$message.error('密码错误')
            this.loading = false
          }else{
            this.$message.error('登录失败')
            this.loading = false
          }
          if(this.ruleForm.type){
            localStorage.setItem("rem_account", res.account);
            localStorage.setItem("rem_pad", this.ruleForm.pass);
          }else{
            localStorage.removeItem("rem_account");
            localStorage.removeItem("rem_pad");
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClick(tab, event) {
      // console.log(tab.name);
    },
    passWord(){
      if(localStorage.rem_account && localStorage.rem_pad){
        this.ruleForm.name = localStorage.rem_account
        this.ruleForm.pass = localStorage.rem_pad
      }else{
        this.ruleForm.name = ''
        this.ruleForm.pass = ''
      }
    }
  },

  computed: {},

  mounted(){},

  watch: {}
}

</script>
<style lang='stylus' scoped>
/deep/ .el-tabs__nav{
  width 100%
}
/deep/ .el-tabs__item{
  width 50%
  text-align center
}
/deep/ .el-tabs__active-bar{
  width 50%
}
/deep/ .el-form-item__content{
  margin-left 48px
  // height 60px
}
/deep/ .el-form-item__label{
  margin-bottom 0px;
}
// /deep/ .el-form-item{
//   height 60px;
// }
.pl:hover{
  color rgb(64,158,255)
  text-decoration:underline
}
.pl{
  color #ccc
  font-size 14px
  margin-top 20px;
}
.box{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.left{
  width: 50%;
}
.right{
  width: 50%;
}
.contents{
  margin:100px auto;
}
.a1{
  width: 50%;
}
.t1{
  color: #2487ce;
  font-weight: 600;
}
.t2{
  color: #2487ce;
  text-decoration:underline;
  cursor: pointer;
}
.t3{
  color: #2487ce;
  margin-top: 20px;
  cursor: pointer;
}
</style>
```

