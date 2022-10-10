vue生成二维码，并且扫码访问链接网址

1、安装

```js
npm i qrcodejs2
```

2、页面引用

```js
import QRCode from "qrcodejs2";
```

3、页面添加

```html
<p>企业链接</p>
<p>{{url}}</p>
<el-button size="small" type="success" @click="qrcode(url)">点击生成二维码</el-button>
<div id="qrcode" ref="qrcode" style="margin-top:10px;"></div>

```

4、方法

```js
qrcode(url) {
    //url是你想要访问的网站地址
        let qrcode = new QRCode("qrcode", {
            width: 200, // 二维码宽度，单位像素
            height: 200, // 二维码高度，单位像素
            text: url // 生成二维码的链接
        });
},
```

这样就可以生成二维码啦，并且扫码可以直接访问网站

