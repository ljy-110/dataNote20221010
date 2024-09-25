vue+elementUI的管理后台实例

![image-20211030161910067](D:\LJY\code\dataNote20221010\img\image-20211030161910067.png)

第一次写管理后台的时候我还不懂用elementui的组件，直到后面有人和我说才知道有这个一个组合型的组件然后弄成一个简单的管理后台的模板

使用的是elementUI的`Container 布局容器`,`NavMenu 导航菜单`，使用了导航菜单的路由功能来实现点击切换的功能。

![image-20211101091607828](D:\LJY\code\dataNote20221010\img\image-20211101091607828.png)

代码目录（代码文件连接：https://github.com/ljy-110/vue-manage）

![image-20211101090929178](D:\LJY\code\dataNote20221010\img\image-20211101090929178.png)

一、布局的页面代码

```js
<template>
  <div style="height:100%;">
    <el-container class="index-con">
      <el-aside :class="showclass">
        <leftnav></leftnav>
      </el-aside>
      <el-container class="main-con">
        <el-header class="index-header">
          <topNav></topNav>
        </el-header>
        <el-main clss="index-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import topNav from './nav/topNav'
import leftnav from './nav/leftnav'
export default {
  props: {},
  components: {
    leftnav,
    topNav
  },
  data () {
    return {
       showclass: 'asideshow',
    };
  },

  created() {},

  methods: {},

  computed: {},

  mounted(){},

  watch: {}
}

</script>
<style lang='css' scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
/* .el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
} */
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.aside {
  width: 64px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.asideshow {
  width: 240px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.index-header,
.index-main {
  padding: 0px;
  border-left: 2px solid #333;
}
</style>
```

二、左边导航的文件代码

```js
<template>
  <div style="height:100%;">
    <div class="left-nav">
      <el-menu
      :default-active="this.$route.path" //标识使用了路由来做
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#334157" //配置颜色
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <h3 class="logobox">后台管理系统</h3>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="/nav1">选项1</el-menu-item>
          <el-menu-item index="/nav2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/nav5">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="/nav3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="/nav4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      activeIndex:'1'
    };
  },

  created() {},

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  computed: {},

  mounted(){},

  watch: {}
}

</script>
<style lang='css' scoped>
.left-nav{
  /* width: 12%; */
  height: 100%;
  background-color:#334157;
}
.logobox {
  height: 60px;
  line-height: 60px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  margin: 0px;
  /* padding: 20px 0px; */
}
.left-nav >>> .el-menu{
  border-right: 0px;
}
</style>
```

三、头部导航的文件代码

```js
<template>
  <div style="height:100%;" class="bwt bg">
    <div class="width:90%">
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#334157"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
        <el-menu-item index="/top1">处理中心</el-menu-item>
        <el-menu-item index="/top2">消息中心</el-menu-item>
        <!-- <el-menu-item index="/nav5">订单管理</el-menu-item> -->
      </el-menu>
    </div>
    <div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#334157"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!-- <el-menu-item index="/top1">处理中心</el-menu-item> -->
        <el-submenu index="2">
          <template slot="title">管理员</template>
          <el-menu-item index="2-1">个人中心</el-menu-item>
          <el-menu-item index="2-2" @click="$router.push({ path:'/' })">退出</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="/top2">消息中心</el-menu-item> -->
        <!-- <el-menu-item index="/nav5">订单管理</el-menu-item> -->
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      activeIndex:'1'
    };
  },

  created() {},

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  computed: {},

  mounted(){},

  watch: {}
}

</script>
<style lang='css' scoped>
/* .left-nav{
  width: 12%;
  height: 93.5%;
  background-color:#545c64;
} */
.bwt{
  justify-content: space-between;
  width: 100%;
  display: flex;
}
.bg{
  background-color:#334157;
}
</style>
```

以上就是基本的代码，具体的代码可以看以下路径：https://github.com/ljy-110/vue-manage







