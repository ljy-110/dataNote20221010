vue+wangEditor的富文本编辑器的使用

安装

```
npm install --save wangeditor
```

先配置新建一个

```js
<el-form-item label="源码简介" prop="desc">
    <div id="editor"></div>//编辑器的位置
</el-form-item>

data(){
	return{
	  //编辑器
      editor: null,
      editorData: '',
    }
}
methods: {
	getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html()
    },
	beforeDestroy() {
        // 调用销毁 API 对当前编辑器实例进行销毁
        this.editor.destroy()
        this.editor = null
  },
}
mounted(){
	 const random = Math.random();
    const editor = new wangEditor(`#editor`)
    const url = this.url
    editor.config.onchange = (newHtml) => {
       this.editorData = newHtml
    }
    editor.config.showLinkImg = false //隐藏网络图片
    editor.config.uploadImgServer = `${this.$baseUrl}/image/upload`  //图片上传的地址
    editor.config.uploadFileName = 'file' //文件传给后端的名称。类似formData.append("file", param.file);中的file
    editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']//上传图片的类型
    editor.customconfig.uploadimgheaders = {// 上传的请求头部
       'accept': '*/*',
       'authorization':'bearer ' 
    }
    editor.config.uploadImgParams = { //上传请求的参数
      user_id: localStorage.user_id,
      s_id: localStorage.s_id,
      random:this.random,
      img_kind:'open'
    }
    editor.config.uploadImgHooks = { //上传图片的可使用回调函数
        // 上传图片之前
        before: function(xhr) {
            console.log(xhr)

            // 可阻止图片上传
            // return {
            //     prevent: true,
            //     msg: '需要提示给用户的错误信息'
            // }
        },
        // 图片上传并返回了结果，图片插入已成功
        success: function(xhr) {
            console.log('success', xhr)
        },
        // 图片上传并返回了结果，但图片插入时出错了
        fail: function(xhr, editor, resData) {
            console.log('fail', resData)
        },
        // 上传图片出错，一般为 http 请求的错误
        error: function(xhr, editor, resData) {
            console.log('error', xhr, resData)
        },
        // 上传图片超时
        timeout: function(xhr) {
            console.log('timeout')
        },
        // 图片上传并返回了结果，想要自己把图片插入到编辑器中
        // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
        customInsert: function(insertImgFn, result) {
            // result 即服务端返回的接口
            console.log('customInsert', result)

            // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
            insertImgFn(result.url)
        }
    }
    editor.create()
    this.editor = editor
}
```

文本编辑器的回显

```js
this.editor.txt.html(`${res.src_desc}`)//编辑器回显
```

清空内容

```js
this.editor.txt.html('<p><br></p>')
```

获取编辑器的内容

```js
// 获取编辑器区域完整html代码
this.editor.txt.html();

// 获取编辑器纯文本内容
this.editor.txt.text();

// 获取格式化后的纯文本
this.editor.txt.formatText();

//编辑器追加新内容
this.editor.txt.append('<p>新追加的内容</p>');
```

编辑器的启用与禁用

```js
// 禁用
    editor.disable();
// 启用
    editor.enable();
```

编辑器的`z-index`问题，有时候编辑器会因为权重的问题覆盖了其他的组件的使用

```
// 将全屏时z-index修改为20000，要写在编辑器创建之前

    editor.config.zindex = 20000;
    
    editor.create();
    

```

或者也可以通过css来修改

```css
/* 富文本编辑器 */
.w-e-toolbar {
  z-index: 2 !important;
}
.w-e-text-container {
  z-index: 1 !important;
}
```

