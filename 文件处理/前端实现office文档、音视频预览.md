前端实现office文档、音视频预览、PDF预览、图片预览

在前端开发中，实现多种文件格式的预览功能是一项常见需求。本文将介绍如何在Vue项目中实现Office文档（如Word、Excel、PPT）、音视频文件以及PDF文件的预览功能。

一、Office文档的预览、PDF预览

注意：word文档的只能支持`.docx`的文档；

安装使用插件`@vue-office/`

地址：https://github.com/501351981/vue-office

```js
#docx文档预览组件
npm install @vue-office/docx vue-demi@0.14.6

#excel文档预览组件
npm install @vue-office/excel vue-demi@0.14.6

#pdf文档预览组件
npm install @vue-office/pdf vue-demi@0.14.6

#pptx文档预览组件
npm install @vue-office/pptx vue-demi@0.14.6

//如果是vue2.6版本或以下还需要额外安装 @vue/composition-api
npm install @vue/composition-api
```

使用实例

```js
//引入js
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
import VueOfficePdf from '@vue-office/pdf'
import VueOfficePptx from '@vue-office/pptx'
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'


//页面使用
<div v-else-if="['.docx'].includes(type)" class="box-files">
	<vue-office-docx :src="fileUrl" @rendered="renderedHandler" />
</div>
<div v-else-if="['.pdf'].includes(type)" class="box-files">
	<vue-office-pdf :src="fileUrl" @rendered="renderedHandler" @error="errorHandler" />
</div>
<div v-else-if="['.xlsx'].includes(type)" class="box-files">
	<vue-office-excel :src="fileUrl" @rendered="renderedHandler" @error="errorHandler" />
</div>
<div v-else-if="['.pptx'].includes(type)" class="box-files">
	<vue-office-pptx :src="fileUrl" @rendered="renderedHandler" @error="errorHandler" />
</div>
```

pdf和excel的预览也还有其他的插件，比如

```js
//pdf预览插件
npm install vue-pdf
npm install pdfjs-dist
//excel预览插件
npm install xlsx

```



二、音视频预览

```js
<div v-else-if="['.mp4','.avi','.mov',].includes(type)" class="box-files flex-center">
    <video controls width="100%" :src="fileUrl" style="object-fit: cover;width: 400px;">
      Your browser does not support the video tag.
    </video>
</div>
<div v-else-if="['.mp3'].includes(type)" class="box-files flex-center">
    <p>video标签</p>
    <video controls autoplay name="media"><source :src="fileUrl" type="audio/mpeg"></video>
    <p>audio标签</p>
    <audio controls> 
        <source :src="fileUrl" type="audio/mpeg"> 
        您的浏览器不支持 audio 元素。 
    </audio>
</div>
```

视频的类型有很多种，可以用原生的标签，也可以使用其他的使用第三方视频播放器插件（如Video.js）

```js
//Video.js
npm install video.js

//使用
<template>
  <div>
    <video id="my-video" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264">
      <source :src="videoUrl" type="video/mp4">
    </video>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
  data() {
    return {
      videoUrl: 'path/to/your/video.mp4',
      player: null
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, { /* options */ }, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>
```

如果是海康、大华、萤石云等视频类型，可以用各自对应的播放器来播放。



三、图片预览

```js
<div v-if="['.jpg','.png','.gif','.webp','.png','.bmp'].includes(type)" class="box-files flex-center">
	<el-image :src="fileUrl" class="file-box" fit="contain" :preview-src-list="[fileUrl]"></el-image>
</div>
```

可以使用elementui的大屏组件

```js
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

<el-image-viewer v-if="imgDialog.dialogVisible" style="z-index: 500000;" :on-close="closeViewer" :url-list="[imgDialog.url]" />

closeViewer() {
     this.imgDialog.dialogVisible = false
},
```

最后可以把这些内容合并成一个常用的附件预览的组件

```js
<template>
  <div>
    <!-- 附件预览 -->
    <div>
      <h3 style="margin-bottom:20px;">@vue-office</h3>
      <el-button @click="openFiles('.xlsx')">excel预览</el-button>
      <el-button @click="openFiles('.docx')">docx预览</el-button>
      <el-button @click="openFiles('.pdf')">pdf预览</el-button>
      <el-button @click="openFiles('.pptx')">ppt预览</el-button>
    </div>
    <div style="margin-top:40px;">
      <h3 style="margin-bottom:20px;">image</h3>
      <el-button @click="openFiles('.png')">图片预览</el-button>
    </div>
    <div style="margin-top:40px;">
      <h3 style="margin-bottom:20px;">video</h3>
      <el-button @click="openFiles('.mp4')">视频预览</el-button>
    </div>
    <div style="margin-top:40px;">
      <h3 style="margin-bottom:20px;">txt</h3>
      <el-button @click="openFiles('.txt')">txt预览</el-button>
    </div>
    <div style="margin-top:40px;">
      <h3 style="margin-bottom:20px;">audio</h3>
      <el-button @click="openFiles('.mp3')">audio预览</el-button>
    </div>
    <el-dialog title="文件预览" :visible.sync="dialogVisible" width="70%" top="2%" @close="closeDialog">
        <div class="box-files">
          <div v-if="['.jpg','.png','.gif','.webp','.png','.bmp'].includes(type)" class="box-files flex-center">
            <el-image :src="fileUrl" class="file-box" fit="contain" :preview-src-list="[fileUrl]"></el-image>
          </div>
          <div v-else-if="['.docx'].includes(type)" class="box-files">
            <vue-office-docx :src="fileUrl" @rendered="renderedHandler" />
          </div>
          <div v-else-if="['.pdf'].includes(type)" class="box-files">
            <vue-office-pdf :src="fileUrl" @rendered="renderedHandler" @error="errorHandler" />
          </div>
          <div v-else-if="['.xlsx'].includes(type)" class="box-files">
            <vue-office-excel :src="fileUrl" @rendered="renderedHandler" @error="errorHandler" />
          </div>
          <div v-else-if="['.pptx'].includes(type)" class="box-files">
            <vue-office-pptx :src="fileUrl" @rendered="renderedHandler" @error="errorHandler" />
          </div>
          <div v-else-if="['.mp4','.avi','.mov',].includes(type)" class="box-files flex-center">
            <video controls width="100%" :src="fileUrl" style="object-fit: cover;width: 400px;">
              Your browser does not support the video tag.
            </video>
          </div>
          <div v-else-if="['.txt'].includes(type)" class="box-files flex-center">
            <pre>{{fileUrl}}</pre>
          </div>
          <div v-else-if="['.mp3'].includes(type)" class="box-files flex-center">
            <p>video标签</p>
            <video controls autoplay name="media"><source :src="fileUrl" type="audio/mpeg"></video>
            <p>audio标签</p>
            <audio controls> 
                <source :src="fileUrl" type="audio/mpeg"> 
                您的浏览器不支持 audio 元素。 
            </audio>
          </div>
        </div>
        <div slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
import VueOfficePdf from '@vue-office/pdf'
import VueOfficePptx from '@vue-office/pptx'
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'
export default {
  props: {},
  components: {
    VueOfficeDocx,VueOfficePdf,VueOfficeExcel,VueOfficePptx
  },
  watch: {},
  computed: {},
  data () {
    return {
      fileUrl:'',
      type:'',
      dialogVisible:false
    };
  },
  mounted () {},
  created () {},
  methods: {
    openFiles(type){
      let url = '';
      if (type == '.xlsx') {
        url = "http://static.shanhuxueyuan.com/demo/excel.xlsx"
      } else if(type == '.docx'){
        url = "http://static.shanhuxueyuan.com/test6.docx"
      } else if(type == '.pdf'){
        url = "http://static.shanhuxueyuan.com/test.pdf"
      } else if(type == '.pptx'){
        url = "http://localhost:8080/files/预览ppt.pptx"
      } else if(type == '.png'){
        url = "https://www.bing.com/th?id=OHR.TrulliGrove_ZH-CN9519400567_1920x1080.jpg"
      } else if(type == '.mp4'){
        url = "https://cdn.xxhzm.cn/videos/meinv/7112434921842560271.mp4"
      } else if(type == '.txt'){
        url = "https://pan.suyanw.cn/down.php/4935b1dc61233c907e26eb523f8e778a.txt"
      } else if(type == '.mp3'){
        url = 'https://api.zxz.ee/api/zdbs/m/15.MP3'
      }
      this.type = type;
      this.fileUrl = url;
      this.dialogVisible = true;
    },
    renderedHandler() {
        console.log("渲染完成")
    },
    errorHandler() {
        console.log("渲染失败")
    },
    closeDialog(){
      this.type = '';
      this.fileUrl = '';
      this.dialogVisible = false;
    },
  },
}

</script>
<style lang='less' scoped>
.box-files{
  height: 70vh;
  width: 100%;
  overflow-y: auto;
  
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

