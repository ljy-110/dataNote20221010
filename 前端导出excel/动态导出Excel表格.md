导出Excel表格

```js
let rowXlsx = []
          rowXlsx.push(JSON.parse(row[j].data))
          let keys = []
          let value = []
          rowXlsx.forEach((v,i)=>{                  
              Object.keys(v).forEach(v=>{
                keys.push(v)
                value.push(rowXlsx[i][v])
              })
          })
          console.log(keys)//取到了key
          console.log(value)//取到了值
          import("@/vendor/Export2Excel").then( excel => {
            const tHeader = keys;
            const filterVal = keys;
            const content = rowXlsx;
            const data = this.formatJson(filterVal,content);
            excel.export_json_to_excel(tHeader,data,Date.parse(new Date()))
          })
          // let vv = XLSX.utils.table_to_book(document.getElementById('outTable'));
          // let vbouts = XLSX.write(vv,{bookType:'xlsx', bookSST: true, type:'array'});
          // try {
          //   FileSaver.saveAs(new B1ob( [vbouts], {type:'application/octet-stream' }), Date.parse(new Date())+".xlsx" );
          // } catch (e) {
          //   if (typeof console !== 'undefined') console.log(e, vbouts);
          // }
          // return vbouts;

          // let routeUrl = `${this.$baseUrl}/file/download?filename=`+row[j].file_id+"&file_kind=" +'file'
          // const link = document.createElement('a');
          // link.href = routeUrl
          // link.target = '_blank'
          // link.download = row[j].evi_name;
          // document.body.appendChild(link)
          // link.click();
          // window.URL.revokeObjectURL(link.href);
          // var that = this
          // that.$axios({
          //      method: 'get',
          //      url: `${this.$baseUrl}/file/download?filename=`+row[j].file_id+"&file_kind=" +'file', // 请求地址
          //      responseType: 'arraybuffer' // 表明返回服务器返回的数据类型
          //  }).then(
          //      (res) => {
          //   console.log(res);
          //      let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
          //      let fileName = Date.parse(new Date())+".xlsx";
          //      if (window.navigator.msSaveOrOpenBlob) {
          //          navigator.msSaveBlob(blob, fileName);
          //      } else {
          //          var link = document.createElement('a');
          //          link.href = window.URL.createObjectURL(blob);
          //          link.download = fileName;
          //          link.click();
          //          window.URL.revokeObjectURL(link.href);
          //      }
          //  });
      //     let blob = new Blob([row[j]], {type: "application/vnd.ms-excel"});
      //      let fileName = Date.parse(new Date())+".xlsx";
      //      if (window.navigator.msSaveOrOpenBlob) {
      //          navigator.msSaveBlob(blob, fileName);
      //      } else {
      //          var link = document.createElement('a');
      //          link.href = window.URL.createObjectURL(blob);
      //          link.download = fileName;
      //          link.click();
      //          window.URL.revokeObjectURL(link.href);
      //      }   
```

