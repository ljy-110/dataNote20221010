海康的视频web插件的使用，实现视频预览（单个视频和批量视频播放）和回放

首先去海康开发平台，把插件包给下载下来。但是这个包需要登录下才可以获取到

地址：https://open.hikvision.com/download/5c67f1e2f05948198c909700?type=20

gitHub地址：https://github.com/ljy-110/video-plug

![image-20240319163349310](E:\ljy\资料\img\image-20240319163349310.png)

一、电脑安装插件。打开下载的文件包，找到`VideoWebPlugin.exe`文件进行安装

![image-20240319164811810](E:\ljy\资料\img\image-20240319164811810.png)



二、`index.html`引入视频`js`

![image-20240319164933430](E:\ljy\资料\img\image-20240319164933430.png)

三、开始实现视频预览

1、创建放视频窗口的盒子

```html
<div id="playWnd" v-loading="loading"></div>
```

2、启动插件服务接口、初始化视频插件，创建窗口

（1）定义`oWebControl`

```js
<script>
    var bIE = (!!window.ActiveXObject || 'ActiveXObject' in window);// 是否为IE浏览器
    var pubKey = '';
    var iLastCoverLeft = 0;
    var iLastCoverTop = 0;
    var iLastCoverRight = 0;
    var iLastCoverBottom = 0;
    var oWebControl = null
    export default {
        data () {
            return {
              winWidth:1360,
              winHeight:760,
              initCount:0,
              layoutList:[ '1x1', '2x2','3x3','4x4','5x5','1x2', '1+2','1+5','1+7', '1+8','1+9', '1+12','1+16','4+9','1+1+12', '3+4','1x4','4x6'], //视频窗口布局
              playMode:0,//0-预览，1-回放
              loading:true,
            };
          },
    }
</script>
```

（2）启动插件服务接口，首先要先`new WebControl`，然后使用`oWebControl.JS_StartService`和`oWebControl.JS_CreateWnd`

```js
initPlugin(){
      let that = this
      this.winWidth = document.getElementById('playWnd').offsetWidth;
      this.winHeight =  document.documentElement.clientHeight;
      oWebControl = new WebControl({
        szPluginContainer: "playWnd",
        iServicePortStart: 15900,
        iServicePortEnd: 15909,
        cbConnectSuccess: function () {
          that.setCallbacks();
          oWebControl.JS_StartService("window", {
            dllPath: "./VideoPluginConnect.dll"
          }).then(function () {
            oWebControl.JS_CreateWnd("playWnd", that.winWidth, that.winHeight).then(function () {
              console.log("JS_CreateWnd success");
              that.loading = false
              that.initLivePlayer(); //---------启动插件成功后初始化插件
            });
          }, function () {

          });
        },
        cbConnectError: function () {
          that.loading = false
          console.log("cbConnectError");
          oWebControl = null;
          // $("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
          WebControl.JS_WakeUp("VideoWebPlugin://");
          that.initCount ++;
          if (that.initCount < 3) {
            setTimeout(function () {
              that.initPlugin();
            }, 3000)
          } else {
            // $("#playWnd").html("插件启动失败，请检查插件是否安装！");
          }
        },
        cbConnectClose: function () {
          that.loading = false
          console.log("cbConnectClose");
          oWebControl = null;
        }
      });
    },
  //设置窗口控制回调
    setCallbacks() {
      let that = this
      oWebControl.JS_SetWindowControlCallback({
          cbIntegrationCallBack: that.cbIntegrationCallBack
      });
    },
    //推送消息
    cbIntegrationCallBack(oData) {
      console.log(JSON.stringify(oData.responseMsg));
    },
```

（3）初始化播放器

```js
initLivePlayer(){
      let that = this
      this.getPubKey(function () {
		////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////		
            var appkey = "28730366";                           //综合安防管理平台提供的appkey，必填
            var secret = that.setEncrypt("HSZkCJpSJ7gSUYrO6wVi");   //综合安防管理平台提供的secret，必填
            var ip = "10.19.132.75";                           //综合安防管理平台IP地址，必填
            var playMode = that.playMode;                      //初始播放模式：0-预览，1-回放
            var port = 443;                                    //综合安防管理平台端口，若启用HTTPS协议，默认443
            var snapDir = "D:\\SnapDir";                       //抓图存储路径
            var videoDir = "D:\\VideoDir";                     //紧急录像或录像剪辑存储路径
            var layout = "1x1";                                //playMode指定模式的布局
            var enableHTTPS = 1;                               //是否启用HTTPS协议与综合安防管理平台交互，这里总是填1
            var encryptedFields = 'secret';					   //加密字段，默认加密领域为secret
            var showToolbar = 1;                               //是否显示工具栏，0-不显示，非0-显示
            var showSmart = 1;                                 //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
            var buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769";  //自定义工具条按钮
			      ////////////////////////////////// 请自行修改以上变量值	////////////////////////////////////
            oWebControl.JS_RequestInterface({
                funcName: "init",
                argument: JSON.stringify({
                    appkey: appkey,                            //API网关提供的appkey
                    secret: secret,                            //API网关提供的secret
                    ip: ip,                                    //API网关IP地址
                    playMode: playMode,                        //播放模式（决定显示预览还是回放界面）
                    port: port,                                //端口
                    snapDir: snapDir,                          //抓图存储路径
                    videoDir: videoDir,                        //紧急录像或录像剪辑存储路径
                    layout: layout,                            //布局
                    enableHTTPS: enableHTTPS,                  //是否启用HTTPS协议
                    encryptedFields: encryptedFields,          //加密字段
                    showToolbar: showToolbar,                  //是否显示工具栏
                    showSmart: showSmart,                      //是否显示智能信息
                    buttonIDs: buttonIDs                       //自定义工具条按钮
                })
            }).then(function (oData) {
				oWebControl.JS_Resize(1000, 600);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
            });
        });
    },
   setEncrypt (value) {  //加密
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(pubKey);
        return encrypt.encrypt(value);
    },
 getPubKey (callback) {
        oWebControl.JS_RequestInterface({
            funcName: "getRSAPubKey",
            argument: JSON.stringify({
                keyLength: 1024
            })
        }).then(function (oData) {
            if (oData.responseMsg.data) {
                pubKey = oData.responseMsg.data;
                callback()
            }
        })
    },
```

![image-20240319171717998](E:\ljy\资料\img\image-20240319171717998.png)

3、播放视频

获取视频列表

```js
this.$axios.post('',{}).then(res =>{
    let list = res.data.data
    //更加视频的数量来展示不同的窗口布局
    if (list.length > 4 && list.length <= 9) {
      this.getSetLayout('3x3')
    } else if (list.length > 9){
      this.getSetLayout('4x4')
    } else if (list.length >1 && list.length <= 4){
      this.getSetLayout('2x2')
    }
    //批量视频播放
    this.batchPlayVido(list)
    //单个视频播放
    this.playLiveVideoOcx(list[0])
    //循环播放
    // list.forEach(item => {
    //   this.playLiveVideoOcx(item)
    // });
})
```

（1）设置窗口布局

```js
getSetLayout(layout){
      //有“1x1”、 “2x2”、“3x3”、“4x4”、“5x5”、“1x2”、 “1+2”、“1+5”、“1+7”、 “1+8”、“1+9”、 “1+12”、“1+16”、“4+9”、“1+1+12”、 “3+4”、“1x4”、“4x6”
      oWebControl.JS_RequestInterface({
          funcName: "setLayout",
          argument: {
            layout: layout // 窗口布局
          }
      }).then(function (oData) {
        oWebControl.JS_Resize(1000, 600);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
      });
},
```

（2）单个视频播放

```js
playLiveVideoOcx(info){ //单个视频播放
      if (!info.cameraIndexCode ) {
        //showCBInfo("监控点编号不能为空！", 'error');
        return
      }
      var cameraIndexCode  = info.cameraIndexCode;     //获取输入的监控点编号值，必填
      var streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
      var transMode = 1;                                      //传输协议：0-UDP，1-TCP
      var gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用
      var wndId = -1;                                         //播放窗口序号（在2x2以上布局下可指定播放窗口）
      cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
      cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");
      oWebControl.JS_RequestInterface({
          funcName: "startPreview",
          argument: JSON.stringify({
              cameraIndexCode:cameraIndexCode,                //监控点编号
              streamMode: streamMode,                         //主子码流标识
              transMode: transMode,                           //传输协议
              gpuMode: gpuMode,                               //是否开启GPU硬解
              wndId:wndId                                     //可指定播放窗口
          })
      }).then(function (oData) {
          console.log(oData);
        })
    },
```

（3）批量播放视频

```js
batchPlayVido(list){ //批量播放视频
      oWebControl.JS_RequestInterface({
          funcName: "startMultiPreviewByCameraIndexCode",
          argument: JSON.stringify({
            //list:list
            list:[
              {
                "authUuid": "", //可忽略
                "cameraIndexCode": "",//获取输入的监控点编号值，必填
                "ezvizDirect": 0, //未指定或为 0-非直连 其它值-直连。多平台接入时不支持直连萤石，如指定直连，
                "gpuMode": 0, //0-不启用 1-启用，如未指定则使用默认值 0，如指定非可选值则返回错误，如无特殊 需求建议不启用
                "streamMode": 0, //0-主码流 1-子码流，如未指定则使用默认值 0，如指定非可选值，返回错误
                "transMode": 1, //0-UDP 1-TCP，如未指定则使用默认值 1，如指定非可选值则返回错误。
                "wndId": 1 //可指定播放窗口
              },
              {
                "authUuid": "",
                "cameraIndexCode": "",
                "ezvizDirect": 0,
                "gpuMode": 0,
                "streamMode": 0,
                "transMode": 1,
                "wndId": 2
              }
            ]
          })
      })
    },
```

![Snipaste_2024-03-19_16-21-51](E:\ljy\资料\img\Snipaste_2024-03-19_16-21-51.png)

4、回放（点击从预览模式改成回放模式`playMode:0,//0-预览，1-回放`）

按钮切换

```html
<el-button type="" @click="startPlayback(1)">回放</el-button>
<el-button type="" @click="startPlayback(0)">实时</el-button>
```

回放。（先销毁前面预览的视频，然后再次初始化回放模式）

```js
startPlayback(val){
      this.loading = true;
      this.stopDestroyWnd(); //销毁视频,关闭服务连接
      this.playMode = val;
      setTimeout(()=>{
        this.initPlugin(); //然后再次初始化回放模式的插件
      },1000)
},
stopDestroyWnd(){
      if (oWebControl != null){
        oWebControl.JS_Disconnect();
        oWebControl.JS_DestroyWnd()
          .then(() => {})
          .catch(() => {})
        oWebControl.JS_HideWnd();
        oWebControl = null
      }
},
```

播放回放视频

```js
playVideoBack(info){
        var cameraIndexCode  = info.cameraIndexCode;         //获取输入的监控点编号值，必填
        var startTimeStamp = new Date().getTime() - 24*60*60*1000;    //回放开始时间戳，必填
        var endTimeStamp = new Date().getTime();        //回放结束时间戳，必填
        var recordLocation = 0;                                     //录像存储位置：0-中心存储，1-设备存储
        var transMode = 1;                                          //传输协议：0-UDP，1-TCP
        var gpuMode = 0;                                            //是否启用GPU硬解，0-不启用，1-启用
        var wndId = -1;                                             //播放窗口序号（在2x2以上布局下可指定播放窗口）
        oWebControl.JS_RequestInterface({
            funcName: "startPlayback",
            argument: JSON.stringify({
                cameraIndexCode: cameraIndexCode,                   //监控点编号
                startTimeStamp: Math.floor(startTimeStamp / 1000).toString(),  //录像查询开始时间戳，单位：秒
                endTimeStamp: Math.floor(endTimeStamp / 1000).toString(),      //录像结束开始时间戳，单位：秒
                recordLocation: recordLocation,                     //录像存储类型：0-中心存储，1-设备存储
                transMode: transMode,                               //传输协议：0-UDP，1-TCP
                gpuMode: gpuMode,                                   //是否启用GPU硬解，0-不启用，1-启用
                wndId:wndId                                         //可指定播放窗口
            })
        })
    },
```

批量录像回放

```js
// 批量录像回放
    startMultiPlayback(list){
      oWebControl.JS_RequestInterface({
          funcName: "startMultiPlaybackByCameraIndexCode",
          argument: JSON.stringify({
            // list:list
            list:[
              {
                "authUuid": "", //可忽略
                "cameraIndexCode": "",//获取输入的监控点编号值，必填
                "ezvizDirect": 0, //未指定或为 0-非直连 其它值-直连。多平台接入时不支持直连萤石，如指定直连，
                "gpuMode": 0, //0-不启用 1-启用，如未指定则使用默认值 0，如指定非可选值则返回错误，如无特殊 需求建议不启用
                "transMode": 1, //0-UDP 1-TCP，如未指定则使用默认值 1，如指定非可选值则返回错误。
                "wndId": 1 ,//可指定播放窗口,
                "endTimeStamp":  new Date().getTime(),//回放结束时间戳
                "playTimeStamp":  new Date().getTime() - 24*60*60*1000,//播放时间戳
                "startTimeStamp": new Date().getTime() - 24*60*60*1000, //回放开始时间戳
              }
            ]
          })
      })
    },
```

停止回放视频

```js
stopBackVideo(){
      oWebControl.JS_RequestInterface({
            funcName: "stopAllPlayback"
        })
    }
```

![image-20240319173011462](E:\ljy\资料\img\image-20240319173011462.png)

四、关闭页面、切换路由、销毁视频关闭窗口

```js
beforeDestroy () {
    if (oWebControl != null){
      oWebControl.JS_Disconnect();
      oWebControl.JS_DestroyWnd()
        .then(() => {})
        .catch(() => {})
      oWebControl.JS_HideWnd();
    }
    
  },
```



