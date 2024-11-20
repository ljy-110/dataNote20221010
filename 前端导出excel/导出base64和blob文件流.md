<!-- blob -->

```
    downFile(){
      var fileName = "混凝土数据.xlsx";
      this.$http.post('/zhgd/qualityManager/getConcreteDataListExcel', formData, {responseType: 'blob'}).then((res) => {
        if (res.data && res.data.msg) {
          this.$message({showClose: true, message: res.data.msg, type: 'warning'});
          return;
        }

        if ('download' in document.createElement('a')) {
          let url = window.URL.createObjectURL(res.data);
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          navigator.msSaveBlob(res.data, fileName)
        }
      }).catch(err => {

      });
    },
```

<!-- base64 -->

// 模板下载
    exportFileDownload() {
      Axios.get(process.env.VUE_APP_LOCALHOST_API + '/api/countrySeafoodInfo/export',{}).then((res) => {
        if (res.data.code != 200) {
          this.$message({showClose: true, message: res.data.msg, type: 'warning'});
          return;
        }
        let blob = this.dataURLtoBlob(res.data.data);
        const url = window.URL.createObjectURL(blob);  
        const link = document.createElement('a');  
        link.href = url;
        link.setAttribute('download', new Date().getTime()+'.xlsx');  
        document.body.appendChild(link);  
        link.click();  
        document.body.removeChild(link);  
        window.URL.revokeObjectURL(url);
      }).catch(err => {

      });
    
    },
    dataURLtoBlob(base64Str) {
      var bstr = atob(base64Str); var n = bstr.length; var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      // 下载的是excel格式的文件
      return new Blob([u8arr], { type: 'application/vnd.ms-excel' })
    },



filesDownload(url){

   let apiUrl = process.env.VUE_APP_LOCALHOST_API + '/api/attach' + url

   window.open(apiUrl)

  },



下载

```js
const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel,charset=utf-8' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'excel.xlsx');
            document.body.appendChild(link);
            link.click();
```

