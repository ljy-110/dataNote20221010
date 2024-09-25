vue实现海康H5视频插件播放视频的实例，实现取流失败了之后重新获取新的流播放视频

h5player是一个基于HTML5的流式网络视频播放器，无需安装浏览器插件即可通过websocket协议向媒体服务取流播放多种格式的音视频流。

首先去海康开发平台，把插件包给下载下来。但是这个包需要登录下才可以获取到

地址：https://open.hikvision.com/download/5c67f1e2f05948198c909700?type=20

不想登录可以去这里拿：https://download.csdn.net/download/lu6545311/88562387

![image-20231123085724490](D:\LJY\code\dataNote20221010\img\image-20231123085724490.png)

一、引入插件包

因为目前项目用的是`vue2.5`，所以我的资源包是放在了`static`目录下面

![image-20231123090827365](D:\LJY\code\dataNote20221010\img\image-20231123090827365.png)

然后在`index.html`里面再引入

```htm;
<script src="/static/js/h5player/h5player.min.js"></scrip>
```

二、使用

（1）因为我们项目有多个地方使用这个播放器，所以是做成了组件的形式，然后进行引入使用

```html
//子组件
<template>
    <div id="H5Play"></div>
</template>

//父组件引入
<HKH5Player ref="hkH5Player" @resetVideoMax="resetVideoH5" @getWndPk="getWndPk"></HKH5Player>
```

（2）初始化

```js
let that = this
//设置播放容器的宽高并监听窗口大小变化
window.addEventListener('resize', () => {
    this.player.JS_Resize()
})

this.player = new window.JSPlugin({
    szId: 'H5Play',
    szBasePath: "../../static/js/h5player",
    //在集成过程中new JSPlugin时候必填szBasePath: './dist', // 必填,引用H5player.min.js的js相对路径，否则会引起内部加载解码库异常
    iMaxSplit: this.maxSplit, //分屏播放，默认最大分屏4*4
    iCurrentSplit: 1,
    openDebug: true,
    oStyle: {
        borderSelect: '#FFCC00', //选中窗口的边框颜色
    },
    // 当容器div#play_window有固定宽高时，可不传iWidth和iHeight，窗口大小将自适应容器宽高
	// iWidth: 600,
	// iHeight: 400,
})
```

（3）事件回调绑定（实现取流失败了之后重新获取新的流播放视频）

```js
this.player.JS_SetWindowControlCallback({
    windowEventSelect: function (iWndIndex) {  //插件选中窗口回调
        console.log('windowSelect callback: ', iWndIndex);
        //每一次窗口变化都会触发这个，用来记录窗口，方便后面进行取流失败了针对对应的窗口视频进行再次播放------------
        that.$emit('getWndPk',iWndIndex)  //调用父组件的方法，并且把当前的窗口传过去，为了记录当前视频的pk
    },
    pluginErrorHandler: function (iWndIndex, iErrorCode, oError) {  //插件错误回调
        console.log('pluginError callback: ', iWndIndex, iErrorCode, oError);
        //视频爆发错误之后，进行想要的逻辑操作，这里是为了再次取流播放视频------------
        that.showErrror(iErrorCode,iWndIndex)  //iErrorCode 错误码  iWndIndex 错误的视频窗口，对应上面获取到的是窗口来进行操作
    },
    windowEventOver: function (iWndIndex) {  //鼠标移过回调
        //console.log(iWndIndex);
    },
    windowEventOut: function (iWndIndex) {  //鼠标移出回调
        //console.log(iWndIndex);
    },
    windowEventUp: function (iWndIndex) {  //鼠标mouseup事件回调
        //console.log(iWndIndex);
    },
    windowFullCcreenChange: function (bFull) {  //全屏切换回调
        console.log('fullScreen callback: ', bFull);
    },
    firstFrameDisplay: function (iWndIndex, iWidth, iHeight) {  //首帧显示回调
        console.log('firstFrame loaded callback: ', iWndIndex, iWidth, iHeight);
    },
    performanceLack: function () {  //性能不足回调
        // console.log('performanceLack callback: ');
    }
});
```

（4） 开始播放视频

```js
//playURL:播放地址  ws://1111111
// mode 0 普通模式  1 高级模式  这里用的是高级模式
//index ： 窗口
this.player.JS_Play(playURL, { playURL, mode }, index).then(
    () => { console.log('realplay success') },
    e => { console.error(e) }
)
//自动跳转下一个窗口
index = index + 1;
if (index == this.maxSplit) { index = 0 }
player.JS_SelectWnd(index);
```

（5）停止播放视频、销毁视频

```js
this.player.JS_StopRealPlayAll(); //全部
this.player.JS_Stop(); //单个
```

（6）切换窗口数

```js
//splitNum  最大 4 
this.player.JS_ArrangeWindow(splitNum).then(
    () => { console.log(`arrangeWindow to ${splitNum}x${splitNum} success`) },
    e => { console.error(e) }
)
```

（7）获取错误码，然后进行提醒

在上面的第三点中，事件的回调，我们可以获取到视频播放错误的错误码，然后官网下载的开发文档里面有对应的错误码，但是好像是不完整的，但是够用。

```js
showErrror(val,iWndIndex){
    let list = {
        '0x12f900005':'高级模式不支持该功能',
        '0x12f900006':'高级模式的解码库加载失败',
        '0x12f900008':'url格式错误',
        '0x12f900009':'取流超时错误',
        '0x12f900010':'设置或者是获取音量失败，因为没有开启音频的窗口',
        '0x12f900011':'设置的音量不在1-100范围',
        '0x12f910000':'websocket连接失败，请检查网络是否通畅，URL是否正确',
        '0x12f910010':'取流失败',
        '0x12f910011':'流中断，电脑配置过低，程序卡主线程都可能导致流中断',
        '0x12f910014':'没有音频数据',
        '0x12f910015':'未找到对应websocket,取流套接字被动关闭的报错',
        '0x12f910016':'websocket不在连接状态',
        '0x12f910017':'不支持智能信息展示',
        '0x12f910018':'websocket长时间未收到message',
        '0x12f910019':'WSS连接失败，原因：端口尚未开通、证书未安装、证书不安全',
        '0x12f910020':'单帧回放时不能暂停',
        '0x12f910021':'已是最大倍速',
        '0x12f910022':'已是最小倍速',
        '0x12f910023':'ws/wss连接超时，默认6s超时时间，原因：网络异常，网络不通',
        '0x12f910026':'jsdecoder1.0解码报错视频编码格式不支持',
        '0x12f910027':'后端取流超时，主动关闭连接(设备突然离线或重启，网络传输超时20s)',
        '0x12f910028':'设置的缓冲区大小无效，大小0-510241024,不在该范围的报错',
        '0x12f910029':'普通模式的报错，码流异常导致黑屏，尝试重新取流',
        '0x12f910031':'普通模式下播放卡主会出现',
        '0x12f910032':'码流编码格式普通模式下不支持，可切换高级模式尝试播放',
        '0x12f920015':'未调用停止录像，再次调用开始录像',
        '0x12f920016':'未开启录像调用停止录像接口错误',
        '0x12f920017':'紧急录像目标格式不支持，非ps/mp4',
        '0x12f920018':'紧急录像文件名为null',
        '0x12f930010':'内存不足',
        '0x12f930011':'首帧显示之前无法抓图，请稍后重试',
        '0x12f950000':'采集音频失败，可能是在非https域下使用对讲导致',
        '0x12f950001':'对讲不支持这种音频编码格式',
        '0x12f900001':'接口调用参数错误',
        '0x12f900002':'不在播放状态',
        '0x12f900003':'仅回放支持该功能',
        '0x12f900004':'普通模式不支持该功能'
    }
    if (list[val]) {
        this.$message.error(list[val])
        console.error(list[val]);
    }
    //防止一直在请求，我们只给你两个错误进行再次取流，各自根据业务进行调整
    if (['0x12f910011','0x12f910027'].includes(val)) {
        this.$emit('resetVideoMax',iWndIndex);  //调用父组件的方法，并且把发生错误的窗口闯过去
        this.player.JS_SelectWnd(iWndIndex); // 把当前窗口选择到发生错误的窗口
    }
},
```

三、父组件的写法

主要是写了怎么视频取流失败后，再次请求获取到流进行视频播放的操作

（1）在父组件调用插件初始化方法

```js
mounted() {
    setTimeout(function (){
          that.$refs.hkH5Player.初始化方法();
          that.$refs.hkH5Player.初始化方法();
          that.$refs.hkH5Player.初始窗口数量(1);
    },200)
}
```

（2）记录视频窗口的`getWndPk`方法

```js
getWndPk(index){
      // h5窗口变化的时候进行
      // 播放视频的时候记录窗口对应的pk
    //这里是把对应窗口的pk记录起来，计算你手动切换的窗口也可以记录到的
      this.h5WndIndex = index;
},
    
//记录到当前的窗口，然后在播放视频的时候把pk存起来
playVideo(pk){
    this.$axios.post('',{pk:pk,protocol:'ws'}).then(res => {
        this.h5PkList[this.h5WndIndex] = pk; //记录对应窗口的视频pk，为后面视频失败再次取流做准备
        //调用子组件的播放视频的方法,具体逻辑自行处理
        .....
        this.$refs.hkH5Player.播放视频(url);
    })
}

```

（3）取流失败后，调用方法再次取流

```js
resetVideoH5(index){
      // 取流失败重新获取流
      let pk = this.h5PkList[index]
      this.playVideo(pk)
},
```

（4）初始播放多个视频

```js
getList(){
    list = [...pk]
    //先判断有多少个视频，然后来展示多少个窗口，最多16个 即num最大是4
    if (that.videoList.length > 4 && that.videoList.length <= 9) {
    	num = 3;
  	} else if (that.videoList.length > 9) {
    	num = 4;
  	} else {
    	num = 2;
  	}
    that.$refs.hkH5Player.初始窗口数量(num);
    //拿到多个视频pk后，循环调用播放方法
    for (let index = 0; index < list.length; index++) {
     	this.playVideo(list[index].pk)
    }
}
```

这样就可以实现视频播放失败之后再次取流进行播放

tip：重点

（1）窗口变化的记录，触发父组件播放视频的时候，接口窗口数把pk（或者你再次取流的参数等等）存起来，方便后面再次取流

（2）发生错误之后，触发父组件找到对应窗口的错误视频的pk，然后再次请求

效果

![image-20231123085515071](D:\LJY\code\dataNote20221010\img\image-20231123085515071.png)

功能（一些具体的功能没有使用到，如果想要使用，可以去看看下载包里面的开发文档）

![image-20231123085540057](D:\LJY\code\dataNote20221010\img\image-20231123085540057.png)