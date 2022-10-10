elementui的图片上传并且显示图片在页面，不经过后端

```html
<el-upload
              action="#"  
              ref='upload1'
              list-type="picture-card"
              :on-change="onChange"
              :limit="1"
              :auto-upload="false"
              :file-list="fileList"
              :http-request="httpRequest"
              :before-upload='beforeAvatarUpload'
			accept="image/png,image/gif,image/jpg,image/jpeg"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}" class="files">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                  >
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
```

```js
//data.return
fileList:[],
      file:'',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,

//
show(){
      this.$refs.upload1.submit();
    },
async httpRequest(){
      let formData = new FormData()// FormData 对象
        let file = this.file.raw
        console.log(file);
        formData.append('file', file)
        var that = this
        that.$axios({
            method: 'post',
            url: url,
            headers:{'Content-Type': 'multipart/form-data'},
            data: formData
        }).then((response) => {
            console.log(response.config)
            console.log(response.data)
            if(response.data.ret) {
                // this.$message.success('上传成功')
                this.fileList = []
            }else if(response.data.msg == 'upload photo failed'){
              this.$message.error('正面照片上传失败')
              return
            }
        })
        .catch((e) => {
        })
    },
        handleRemove(file) {
      // this.$refs.upload.clearFiles();
      // console.log(file);
      this.fileList = []
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      // console.log(file);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jpg' || file.raw.type == 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/png/jpg 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      return isJPG && isLt2M;
    },
    onChange(file, fileList) {
      console.log(file);
      // console.log(fileList);
      this.file = file
    },
```

