# elementui的文件上传限制格式和大小

## 第一种是accept

```html
<el-upload
          class="upload-demo"
          action="#"
          :http-request="httpRequest"
          :on-change="onChange"
          :accept="accept"
          multiple
          :limit="1"
          ref="upload"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :auto-upload="false"
          :before-upload="beforeAvatarUpload"
          >
          <el-button slot="trigger" class="but up-but" icon="el-icon-upload2" type="primary" @click="getaccept">选取文件</el-button>
          <el-button style="margin-left: 10px;margin-top:70px;" :loading="loading" class="but" @click="submitUpload">确定提交</el-button>
        </el-upload>
```

### 常用的文件类型

```js
let text = ['TXT','DOC','XLS','PPT','DOCX','XLSX','PPTX','pdf','txt','doc','xls','ppt','docx','xlsx','pptx','zip','rar','ZIP','RAR']
let photo = ['jpg','png','jpeg','bmp','gif','raw','JPG','PNG','JPEG','BMP','GIF','RAW','zip','rar','ZIP','RAR']
let music = ['WMA','MP3','wav','wma','mp3','WAV','zip','rar','ZIP','RAR']
let video = ['mp4','mov','avi','wmv','3gp','mkv','flv','MP4','MOV','AVI','WMV','3GP','MKV','FLV','zip','rar','ZIP','RAR']
```

## 第二种就是before-upload的方法

```js
beforeAvatarUpload(file) {
  let type1 = (file.name).substring((file.name).lastIndexOf(".")+1)
      let type = type1.trim().toLowerCase()
      // const isJPG = type === 'jpeg' || type === 'jpg' || type === 'png';
      // const isText = type === 'doc/txt//xls/docx/xlsx' || type === 'txt' || type === 'pdf' || type === 'xls' || type === 'jpg' || type === 'jpg';
      // const isvideo = type === 'mp4/flv/zip/rar/WMA/MP3/wav';
      const isvideo = type === 'mp4' || type === 'mov' || type === 'avi' || type === 'wmv' || 
      type === '3gp' || type === 'mkv' || type === 'flv' || type === 'wma' || type === 'mp3' 
      || type === 'wav' || type === 'zip' || type === 'rar';
      const isLt50M = (file.size / 1024 / 1024) < 50;
      const isLt200M = (file.size / 1024 / 1024) < 200;
      console.log(isLt200M);
      console.log(isvideo);
      console.log(isLt50M);
      if(isvideo){
        if (!isLt200M) {
          this.$message.error('上传视频音频大小不能超过 200MB!');
          this.loading = false
          this.$refs.upload.clearFiles()
        }else{}
      }else if(!isLt50M){
        this.loading = false
        this.$message.error('上传文档图片大小不超过50MB');
        this.$refs.upload.clearFiles()
      }else{}
      return isLt200M && isvideo || isLt50M
},
```

