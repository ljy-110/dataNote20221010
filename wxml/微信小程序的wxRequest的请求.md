# 微信小程序的wxRequest的请求

可以先在app.js里面把url统一封装好

```js
App({
    urlData:{
        URL: 'url',
    },
})
```

```js
getRegister:function(event){
      console.log(event)
      var url = app.urlData.URL + '/user/regist_phone_user'
    var random = Math.random()
    wx.request({
      url: url,
      data:{
        phone:this.data.phone,
        pwd:this.data.password,
        sms_code:this.data.sms,
        recommender:this.data.tuijian,
        adviser_phone:this.data.getRecommendPhone,
        random:random
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        var data  = res.data
        var that = this
        if(data.ret){
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '注册成功',
            icon: 'succes',
            duration: 1000,
            mask:true
        })
        wx.setStorage({
          key:"phone",
          data:that.data.phone
        })
        }else{
          wx.showToast({
            title: '注册失败',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        }
      }
      
    })
    
   },
```

