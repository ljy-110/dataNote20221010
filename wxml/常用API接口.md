微信小程序的常用API接口方法

小程序提供了一个简单、高效的应用开发框架和丰富的组件及API，帮助开发者在微信中开发具有原生 APP 体验的服务。

1、wx.login()

调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户在当前小程序的唯一标识（openid）、微信开放平台帐号下的唯一标识（unionid，若当前小程序已绑定到微信开放平台帐号）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。

```js
wx.login({
      success (res) {
          console.log(res.code)
        if (res.code) {
          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
 })
```

2、wx.request()

发起 HTTPS 网络请求。

```js
wx.request({
    url: url,
    data: {
         code: res.code,
         user_name:e.nickName
    },
    success: (res) => {
    }
})
```

3、wx.getUserProfile()

获取用户信息

```js
wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
         	console.log(res.userInfo)
        },
        fail:(res)=>{
          console.log(res);
        }
      })
```

4、wx.checkSession()

检测登录信息是否过期

```js
wx.checkSession({
      success:function(res){
      },
      fail:function(res){
        wx.showToast({
          title: '你的登录信息过期了，请重新登录',icon:"error",duration:3000
        })
        wx.removeStorage({
          key: 'userInfo',
          success (res) {}
        })
      }
    })
```

5、wx.uploadFile

上传文件

```js
wx.chooseImage({
  success (res) {
    const tempFilePaths = res.tempFilePaths
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success (res){
        const data = res.data
        //do something
      }
    })
  }
})
```

6、wx.chooseInvoice()

查看微信卡包里面的发票信息

```js
wx.chooseInvoice({
            success(res) {
                console.log(res);
            },
            complete(res){
                console.log(res);
            }
})
```

7、wx.setStorageSync，wx.getStorageSync，wx.removeStorageSync

```
//存储
try {
            wx.setStorageSync('address', info)
        } catch (error) {
            wx.showToast({
              title: 'error',icon:'none',duration:2000
            })
        }
//获取
try {
        var ccList = wx.getStorageSync('address')
        if (ccList) {
            this.setData({ccList:ccList})
        }
    } catch (e) {}
    
//删除
try {
  wx.removeStorageSync('address')
} catch (e) {

}
```

8、wx.requestPayment()

微信支付

```js
payWeixin(data){
      wx.showLoading({title: '获取中', mask:"true"})
      let that = this
      let random = (Math.random()).toString()
      let timestamp=(new Date().getTime()).toString()
      let mch_key = '商户key'
      let obj = {
        appId:'appId',
        nonceStr:random,
        package:"prepay_id="+data.prepay_id,
        signType:'MD5',
        timeStamp:timestamp
      }
      let arr = Object.keys(obj).sort().map(item => {
          return `${item}=${obj[item]}`;
      });
      let str = arr.join('&') + '&key=' + mch_key;
      console.log(str);
      let paySign = md5(str).toUpperCase()
      console.log(paySign);
      wx.requestPayment({
        "timeStamp":timestamp,
        "nonceStr": random,
        "package": "prepay_id="+data.prepay_id,
        "signType": "MD5",
        "paySign": paySign,
        "success":function(res){
          console.log(res);
          setTimeout(function(){
              that.payOrderSuccess(data.order_id)
          },200)
        },
        "fail":function(res){
          wx.hideLoading()
          console.log(res);
          if (res.errMsg==='requestPayment:fail cancel') {
            wx.showToast({title: '用户取消支付',icon:'none',duration:2000})
          } else {
            wx.showToast({title: res.errMsg,icon:'none',duration:2000})
          }
        },
        "complete":function(res){
          // console.log(res);
        }
      })
    },
```

