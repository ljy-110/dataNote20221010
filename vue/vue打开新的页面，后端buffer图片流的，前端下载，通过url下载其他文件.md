vue打开新的页面，后端buffer图片流的，前端下载，通过url下载其他文件

```js
//新页面
let routeUrl = `${this.$baseUrl}/file/download?filename=`+row.file_id+"&file_kind=" +'file'
window.open(routeUrl, '_blank');
//后端buffer图片流的，前端下载
let bytes = new Uint8Array(res.buffer.data);
        let data = "";
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          data += String.fromCharCode(bytes[i]);
        }
        let image = "data:image/png;base64," + window.btoa(data);
        const link = document.createElement('a');
        link.href = image;
        link.download = 'abcde.png';
        link.click();
//通过url下载其他文件
let routeUrl = `${this.$baseUrl}/file/download?filename=`+row.file_id+"&file_kind=" +'file'
        const link = document.createElement('a');
        link.href = routeUrl
        link.download = row.evi_name;
        link.click();
```

