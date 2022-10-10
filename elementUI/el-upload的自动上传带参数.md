el-upload的自动上传带参数

```vue
<el-form-item label="商品照片">
              <el-upload
                class="upload-demo"
                action="#"
                multiple
                :limit="1"
                :auto-upload="true"
                :show-file-list='false'
                :file-list="fileList"
                :http-request="imageChange"
                accept="image/png,image/gif,image/jpg,image/jpeg">
                <el-button class="upbtn" :loading='srcload'>上传商品照片</el-button>
              </el-upload>
            </el-form-item>
```

```js
imageChange(param,type){
        let formData = new FormData()
        formData.append('file', param.file)
        formData.append("s_id", localStorage.s_id)
        formData.append("img_kind", 'open')
        this.$axios.post(`${this.$baseUrl}/image/upload`, formData).then(res => {
          if(res.data.ret){
            this.$message.success('上传成功')
          }else{
            this.$message.error('上传失败'+res.data.msg)
          }
        }).catch(function (error) {
          this.$message.error('上传失败'+res.data.msg)
        });            
    },
```

