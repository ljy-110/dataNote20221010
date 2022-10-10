# 微信小程序的点击获取数据，和url路由传值，全局本地存储数据

## 点击获取数据

```
点击事件的写法bindtap='方法名'
需要数据的名称
data-xxx='{{数据}}'
```

```xml
//在wxml
<van-row gutter="20" class="data" bindtap='getupdateNew' data-token="{{item.token_y}}" style="height: 25px;line-height: 25px;" wx:for='{{getTaskInfoList}}' wx:key="token_y">
</van-row>
```

```js
//在js获取点击的数据
getupdateNew:function(e){
    let token = e.currentTarget.dataset.token
    var taskid = this.data.taskid
   console.log(taskid)
    //点击跳转路由，带参数
    wx.navigateTo({ url: '/pages/addEnterprise/addEnterprise?task_id='+taskid+'&token='+token, }
  },
```

## 在跳转的路由页面获取url传过去的参数

```js
page({
    data:{
        taskid:null,
      	token:null,
    }
})
```

```js
//获取url的值
onLoad: function (options) {
    var taskid = options.task_id;
    var token = options.token
    console.log(taskid)
    console.log(options)
    //传过来的值可以，赋值给data里面
    this.setData({
      taskid:taskid,
      token:token
    })
}
```

## 全局本地存储数据（1）

```js
//先在app.js里面的添加数据存储的地方
App({
    appData:{
        userInfo:null
    }
})
```

```js
//然后再赋值的地方引用app，然后赋值
var app = getApp();
app.appData.userInfo = {"user_id":res.data.user_id,"s_id":res.data.s_id,'user_name':res.data.phone};
//然后就是取值
var app = getApp();
var userInfo = app.appData.userInfo;
```

## 当然也可以使用本地缓存的方法（2）

```js
//先存值
wx.setStorage({
     key: 'userInfo',
     data: res.data
})
//取值
wx.getStorage({
  key: 'userInfo',
  success (res) {
    console.log(res.data)
  }
})
//清除
wx.removeStorage({
  key: 'userInfo',
  success (res) {
    console.log(res)
  }
})
```

当然还有很多的方法，可以仔细去查看官方的文档

```
https://developers.weixin.qq.com/miniprogram/dev/framework/
```

