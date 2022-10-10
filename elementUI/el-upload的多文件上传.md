el-upload实现多文件上传的方法

```js
<el-upload
          class="upload-demo"
          drag
          action="#"
          multiple
          ref="upload"
          :file-list="files"
          :http-request="handleUpload"
          :on-exceed='handExceed'
          :on-remove="handleRemove"
          :on-success='handFileSuccess'
          :before-remove="beforeRemove"
          :auto-upload="false"
          :limit="5">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">一次只能上传5个文件</div>
        </el-upload>
<span slot="footer" class="dialog-footer">
          <el-button @click="CancelUpload">取 消</el-button>
          <el-button type="primary" @click="fileChange">立即上传</el-button>
        </span>
```

```
data () {
    return {
      files:[]
    };
  },
```

```js
handleUpload(raw){
      this.files.push(raw.file);
      // console.log(files);
    },
    async fileChange() {
      if (this.files.length > 5) {
        this.$message.warning(`当前限制只能上传选择 1~5 个文件`);
        return
      } else {}
      const loading = this.$loading({
        lock: true,
        text: '上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$refs.upload.submit() // 这里是执行文件上传的函数，其实也就是获取我们要上传的文件
      let random = Math.random();
      let formData = new FormData();
      // formData.append("file", param.file);
      formData.append("user_id", localStorage.user_id);
      formData.append("s_id", localStorage.s_id);
      formData.append("random", random);
      formData.append("file_kind", "src");
      this.files.forEach(function (file) {
         formData.append('file', file); // 因为要上传多个文件，所以需要遍历一下才行
         //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
       })
      let res = await this.$axios.post(`${this.$baseUrl}/file/upload`, formData);
      console.log(res);
      // JSON.parse(res)
      if (res.data.ret) {
        this.$refs.upload.clearFiles();
        this.files = []
        let objList = []
        loading.close();
        
      } else {
        loading.close();
        this.$message.error("上传文件失败" + res.data.msg);
      }
    },
    handExceed(files, fileList){
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    CancelUpload(){
      this.files = []
      this.$refs.upload.clearFiles();
    },
    handFileSuccess(file) {
      console.log(file);
      this.files = []
      this.$refs.upload.clearFiles();
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.files = fileList
    },
    beforeRemove(file, fileList) {
      // console.log(file, fileList);
    },
```

