1

```
 <crumbs></crumbs>
```

```
import crumbs from '../../components/crumbs'
```

```
crumbs
```

```
vip_level:'',
      vipShow:false,
      vip_timeout_str:'',
```

```
async getAccountInfo(){
      let random = Math.random()
      let params = {
        user_id:localStorage.user_id,
        s_id:localStorage.s_id,
        random:random
      }
      let res = await this.$api.teaback.accountInfo(params)
      console.log(res);
      if (res.ret) {
        this.crumbs = res
        if('vip_info' in res){
          this.vip_level = res.vip_info.vip_level
          this.vipShow = true
          this.vip_timeout_str = res.vip_info.vip_timeout_str
        }else{
          this.vip_level = 0
        }
      } else {
        
      }
    }
```

```
<div class="">
      <el-breadcrumb separator="/" class="crumbs">
        <el-breadcrumb-item :to="{ path: '/home' }" class="crumbs-index">主页</el-breadcrumb-item>
        <el-breadcrumb-item>我的余额</el-breadcrumb-item>
        <el-breadcrumb-item v-if="crumbs">{{crumbs.user_info.user_name}} &nbsp; (余额：{{crumbs.rmb}}元 &nbsp; / &nbsp;
          <router-link to="/rmbRecharge" style="color:red;cursor:pointer;">充值余额</router-link>
           &nbsp;)
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
```

