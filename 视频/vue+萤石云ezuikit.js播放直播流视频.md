vue+萤石云ezuikit.js播放直播流视频（声音自动关闭，添加控件，多个视频播放）

实例使用

![image-20230331110547041](E:\ljy\资料\img\image-20230331110547041.png)

引入最新的ezuikit.js

```js
//npm
npm install ezuikit-js
//index.html
<script src="./ezuikit.js"></script>
获取地址js和demo地址：https://github.com/Ezviz-OpenBiz/EZUIKit-JavaScript-npm
```

看过官网的文档都知道萤石云的文档是多么的‘善解人意’哈，懂得都懂，很多东西没有说清楚的，只能靠自己去摸索或者看他们的demo来一点点测试实现

官网地址：https://open.ys7.com/help/31

坑

（1）无法关闭声音

看官网文档的属性是添加`audio:0`即可，但是发现根本没有反应。然后还有就是说把`autoplay: false,`，但是最后发现，都没有反应。但是使用了自定义的控件之后，就可以实现了，就很尴尬

![image-20230331111333229](E:\ljy\资料\img\image-20230331111333229.png)

（2）播放器模板

文档上面显示只有`使用内置的播放器样式，组件 simple：极简版;standard：标准版;security：安防版;vioce：语音版`，这几种类型，但是我们看demo上面就发现还有`pcLive,pcRec`。（具体demo文件下载地址在上面）。而且这两个属性还是很好用的那种，样式也是好看的

`pcLive`模式控件是这样的。

![image-20230331111724061](E:\ljy\资料\img\image-20230331111724061.png)

（3）`pcLive`模式去除多余控件

在上面我们看到，这个模式下的控件有个头部设备名称的展示，如果我们想去除或者修改，就发现文档里面好像没有说明

![image-20230331112117500](E:\ljy\资料\img\image-20230331112117500.png)

然后我们看demo文件里面有个方法就是自定义的属性，添加控件`themeData: themeData,`,`themeData`的内容如下，引入这个我们可以添加或者删除不想要的控件了。`功能有播放暂停、截图、录制、云台控制、语音对讲、放大、全屏等等`

```js
var themeData = {
      "header": {
        "color": "#1890ff",
        "activeColor": "#FFFFFF",
        "backgroundColor": "#000000",
        "btnList": [
          {
            "iconId": "deviceID",
            "part": "left",
            "defaultActive": 0,
            "memo": "顶部设备序列号",
            "isrender": 1
          },
          {
            "iconId": "deviceName",
            "part": "left",
            "defaultActive": 0,
            "memo": "顶部设备名称",
            "isrender": 1
          },
          {
            "iconId": "cloudRec",
            "part": "right",
            "defaultActive": 0,
            "memo": "云存储",
            "isrender": 0
          },
          {
            "iconId": "rec",
            "part": "right",
            "defaultActive": 0,
            "memo": "SD卡回放",
            "isrender": 0
          }
        ]
      },
      "footer": {
        "color": "#FFFFFF",
        "activeColor": "#1890FF",
        "backgroundColor": "#00000021",
        "btnList": [
          {
            "iconId": "play",
            "part": "left",
            "defaultActive": 1,
            "memo": "播放",
            "isrender": 1
          },
          {
            "iconId": "capturePicture",
            "part": "left",
            "defaultActive": 0,
            "memo": "截屏按钮",
            "isrender": 1
          },
          {
            "iconId": "sound",
            "part": "left",
            "defaultActive": 0,
            "memo": "声音按钮",
            "isrender": 1
          },
          {
            "iconId": "pantile",
            "part": "left",
            "defaultActive": 0,
            "memo": "云台控制按钮",
            "isrender": 1
          },
          {
            "iconId": "recordvideo",
            "part": "left",
            "defaultActive": 0,
            "memo": "录制按钮",
            "isrender": 1
          },
          {
            "iconId": "talk",
            "part": "left",
            "defaultActive": 0,
            "memo": "对讲按钮",
            "isrender": 1
          },
          {
            "iconId": "zoom",
            "part": "left",
            "defaultActive": 0,
            "memo": "电子放大",
            "isrender": 1
          },
          {
            "iconId": "hd",
            "part": "right",
            "defaultActive": 0,
            "memo": "清晰度切换按钮",
            "isrender": 1
          },
          {
            "iconId": "webExpend",
            "part": "right",
            "defaultActive": 0,
            "memo": "网页全屏按钮",
            "isrender": 1
          },
          {
            "iconId": "expend",
            "part": "right",
            "defaultActive": 0,
            "memo": "全局全屏按钮",
            "isrender": 1
          }
        ]
      }
    };
```

具体实例代码

```js
//首先创建一个容器DOM
 <div id="video-container"></div>
//然后初始化,在合适的地方调用函数即可
init(){
	player =  new EZUIKit.EZUIKitPlayer({
      id：'video-container',
      autoplay: true,
      url:playUrl, //播放地址
      accessToken:accessToken, //token
      width: 780,
      height: 360,
      handleError: that.handleError(),
      handleSuccess:  that.handleSuccess(),
      //splitBasis:1, //旧版本3.5有个自带的分屏功能，现在没有了
      audio:0,
      themeData: themeData, //上面的对象内容
    });
    that.playerVideo = player;
}

```

多个视频播放的话，demo里面也有说明的，就是new多个实例，但是按照demo里面的用法，其实我们实际使用是感觉不行的，所以只能说按照demo的思路走

demo的用法

```js
var playr;
var playr2;
    fetch('https://open.ys7.com/jssdk/ezopen/demo/token')
      .then(response => response.json())
      .then(res => {
        var accessToken = res.data.accessToken;
        playr = new EZUIKit.EZUIKitPlayer({
          id: 'video-container', // 视频容器ID
          accessToken: accessToken,
          url: 'ezopen://open.ys7.com/G39444019/1.live',
          template: 'pcLive', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版; theme-可配置主题；
          plugin: ['talk'],                       // 加载插件，talk-对讲
          width: 600,
          height: 400,
        });
        playr2 = new EZUIKit.EZUIKitPlayer({
          id: 'video-container2', // 视频容器ID
          accessToken: "at.e0mnhu50d7bwohb40358mchq13aobjm2-6m2v78jd7m-1g22scv-lcn0rdqm1",
          url: 'ezopen://open.ys7.com/G39444019/1.live',
          template: 'pcLive', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版; theme-可配置主题；
          plugin: ['talk'],                       // 加载插件，talk-对讲
          width: 600,
          height: 400,
        });
      });
```

通过demo发现，主要是区别就是容器盒子的ID不一样，至于声明多个变量只是为了在其他方法里面进行一些操作，我这里是暂时用不到，因为常用的控件都自带了，就不需要额外的方法去进行操作了

实际使用代码

```js
//html
<div id="liveVideoDivHKMode" :class="[(this.current + 1)==1 ? '':'grid__' + (this.current + 1) + 'k']">
</div>
//js
//后端视频列表
list
let html = '';
for (let i = 0; i < list.length; i++) {
    html += `<div id="${list[i].pk}"></div>`  //id唯一值，看个人想用什么来做
    // let element = list[i];
    setTimeout(function () {
      let player1 = new EZUIKit.EZUIKitPlayer({
        id:list[i].pk,
        // autoplay: false,
        url:list[i].playUrl,
        accessToken:list[i].accessToken,
        // decoderPath: '../../static/js/mode',
        width: width,
        height: height,
        handleError: that.handleError(),
        handleSuccess:  that.handleSuccess(),
        themeData: themeData,
        audio:0,
      });
      that.ezvizHkVideoListPlay.push(player1)  //添加到一个数组里面方便后面关闭页面的时候关闭视频销毁
    }, 10)
    setTimeout(function () {
      document.getElementById("liveVideoDivHKMode").innerHTML = html;
    },50)
}
```

