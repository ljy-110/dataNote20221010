excel、docx、pdf文件预览

excel、docx、pdf

```js
#docx文档预览组件
npm install @vue-office/docx vue-demi@0.14.6

#excel文档预览组件
npm install @vue-office/excel vue-demi@0.14.6

#pdf文档预览组件
npm install @vue-office/pdf vue-demi@0.14.6

//如果是vue2.6版本或以下还需要额外安装 @vue/composition-api
npm install @vue/composition-api
```

### .docx文件预览

```js
<template>
    <vue-office-docx
        :src="docx"
        style="height: 100vh;"
        @rendered="rendered"
    />
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'

export default {
    components:{
        VueOfficeDocx
    },
    data(){
        return {
            docx: 'http://static.shanhuxueyuan.com/test6.docx' //设置文档网络地址，可以是相对地址
        }
    },
    methods:{
        rendered(){
            console.log("渲染完成")
        }
    }
}
</script>
```



**二进制文件预览**

如果后端给的不是CDN地址，而是一些POST接口，该接口返回二进制流，则可以调用接口获取文件的ArrayBuffer数据，传递给src属性。

```js
<template>
    <vue-office-docx
        :src="docx"
        style="height: 100vh;"
        @rendered="rendered"
    />
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'

export default {
    components:{
        VueOfficeDocx
    },
    data(){
        return {
            docx: ''
        }
    },
    mounted(){
        fetch('你的API文件地址', {
            method: 'post'
        }).then(res=>{
            //读取文件的arrayBuffer
            res.arrayBuffer().then(res=>{
                this.docx = res
            })
        })
    },
    methods:{
        rendered(){
            console.log("渲染完成")
        }
    }
}
</script>
```



### excel文件预览

通过网络地址预览示例如下，通过文件ArrayBuffer预览和上面docx的使用方式一致。

```js
<template>
    <vue-office-excel
        :src="excel"
        style="height: 100vh;"
        @rendered="renderedHandler"
        @error="errorHandler"
    />
</template>

<script>
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'

export default {
    components: {
        VueOfficeExcel
    },
    data() {
        return {
            excel: 'http://static.shanhuxueyuan.com/demo/excel.xlsx'//设置文档地址
        }
    },
    methods: {
        renderedHandler() {
            console.log("渲染完成")
        },
        errorHandler() {
            console.log("渲染失败")
        }
    }
}
</script>
```



### pdf文件预览

通过网络地址预览示例如下，通过文件ArrayBuffer预览和上面docx的使用方式一致。

```js
<template>
    <vue-office-pdf
        :src="pdf"
        style="height: 100vh"
        @rendered="renderedHandler"
        @error="errorHandler"
    />
</template>

<script>
//引入VueOfficePdf组件
import VueOfficePdf from '@vue-office/pdf'

export default {
    components: {
        VueOfficePdf
    },
    data() {
        return {
            pdf: 'http://static.shanhuxueyuan.com/test.pdf' //设置文档地址
        }
    },
    methods: {
        renderedHandler() {
            console.log("渲染完成")
        },
        errorHandler() {
            console.log("渲染失败")
        }
    }
}
</script>
```

