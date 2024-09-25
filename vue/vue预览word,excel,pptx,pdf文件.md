vue预览word，excel，pptx，pdf文件

1、做word，excel，pptx的预览，要先确定文件路径访问是通过域名的url来预览，不可以通过IP的url来访问

先把文件路径的url进行url编码（`encodeURIComponent`）

```js
let router = 'https://aaaaaa.com/file/download?filename=file.obj_id'  //文件路径
let url = encodeURIComponent(routeUrl)
```

然后用`Office Web Viewer`的路径接口

```js
http://view.officeapps.live.com/op/view.aspx?src=
```

把两个拼接在一起

```js
let officeUrl = 'http://view.officeapps.live.com/op/view.aspx?src='+url
window.open(officeUrl,'_target')
```

这样就可以预览`word，excel，pptx`文件了

完整的代码

```js
let routeUrl = 'https://aaaaaa.com/file/download?filename=file.obj_id'
let url = encodeURIComponent(routeUrl)
let officeUrl = 'http://view.officeapps.live.com/op/view.aspx?src='+url
window.open(officeUrl,'_target')
```

2、pdf文件预览

下载好pdf.js(下载地址在下面)，放到`static`的目录下面

网站链接：`http://mozilla.github.io/pdf.js/getting_started/#download`

百度网盘：链接: https://pan.baidu.com/s/1tdGrN3L-A9wkOIBzXjUWYw 提取码: pucv 

![image-20210126142956794](D:\LJY\code\dataNote20221010\img\typora-user-images\image-20210126142956794.png)

然后

```html
<div style="height:800px;">
  <iframe :src="pdfSrc" width="100%" height="100%"></iframe>
</div>
```

```js
getSeePdf(file){
      this.pdffile=file
      let routeUrl = '文件地址url';
      let pSrc = routeUrl + '?r=' + new Date();
      this.pdfSrc = 'static/pdf/web/viewer.html?file=' + encodeURIComponent(pSrc) + '.pdf';
    },
```

