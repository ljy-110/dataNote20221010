【Vue】动态组件的使用

最近在开发中，产品经理给了一个新的需求，就是在一个页面里面对页面进行多个切换，就是那种不改变路由变化，但是需要点击菜单改变页面的内容或者说切换页面。就类似是在一个管理系统里面的某个页面再加一套管理系统，但是切换页面需要改变页面内容，但是不能改变路由。

>官网文档：[https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6)
# 需求：

1. 改变页面内容
2. 不改变路由
3. 批量页面展示
# 方法：

使用动态组件

```plain
<component :is="currentTabComponent"></component>
```

因为涉及的页面比较多，而且有些页面是外面的大系统也需要使用的。而且页面还是需要动态展示的，就是第二套的管理系统是后端返回的菜单，所以就说明，我们需要进行批量的对页面进行组件的注册的方法，方便来展示。

涉及的页面比较多，然后动态组件的话，就需要对组件进行注册，就需要批量进行注册，然后我们就可以使用两种方式进行对页面进行了全局注册。

首先要先批量获取需要做组件展示的页面

```plain
const context= require.context('../../views', true, /\.vue$/)
```
>官网文档：[https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C](https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)
说明：

1. `require.context` 是一个可以批量引入模块的方法，这是`webpack`提供的一个方法，通常就是用来进行批量注册组件的方法
2. `../../views`  是你想要注册的组件所在的目录，其组件目录的相对路径
3. `true` 这是一个布尔值，用来判断是否检测该目录下的子目录
4. `/\.vue$/`  一个正则表达式，用来判断文件的文件名
## 方法一：

获取到组件后，在`components`中添加，然后就可以直接使用页面里面明名的`name`来做组件的绑定方式

被引入组件

```javascript
export default {
  name:'input',
  props: {},
},
```
引入组件
```javascript
const context= require.context('../../views', true, /\.vue$/)

let allComponents = []
context.keys().forEach((key) => {
  const component = context(key).default;
  if (component) {
    allComponents[component.name] = component
  }
});

export default {
  props: {},
  components: {
    ...allComponents,
  },
}
```

问题：

但是这个方法就是如果数量比较多，会导致页面首次今日比较卡顿

## 方法二：

```javascript
const context= require.context('../../views', true, /\.vue$/)

let componentsList = ['input','button']

export default {
  install (app) {
    context.keys().forEach(path => {
      const component = context(path).default
      if (component) {
        if (componentsList.includes(component.name)) {
          app.component(component.name, component)
        }
      }
      
    })
  }
}
```
说明
因为我只想要自己的需要的板块进行注册组件，所以添加一个判断，减少注册组件的次数，减少进入页面时间

解决卡顿

暴力解决，不在页面进行注册，直接在入口文件`main.js`文件里面进行注册；

把方法放到一个`js`文件，然后引入

```javascript
import requireComponents from '@/views/requireComponents'
Vue.use(requireComponents)
```



最终的代码

```js
<el-container>
        <el-aside width="210px">
          <el-menu
            :default-active="currentTabComponent" :unique-opened="true"
            class="el-menu-vertical-demo"
            @open="handleOpen" @select="selectMenu"
            @close="handleClose">
            <div v-for="item in data" :key="item.id">
              <el-submenu :index="item.componentName" v-if="item.children">
                <template slot="title">
                  <i class="el-icon-folder-opened"></i>
                  <span>{{item.name}}</span>
                </template>
                <div v-for="itC in item.children" :key="itC.id">
                  <el-submenu :index="itC.componentName" v-if="itC.children">
                    <template slot="title">{{itC.name}}</template>
                    <el-menu-item :index="itS.componentName" v-for="itS in itC.children" :key="itS.id">{{itS.name}}</el-menu-item>
                  </el-submenu>
                  <el-menu-item-group v-else>
                    <el-menu-item :index="itC.componentName">{{itC.name}}</el-menu-item>
                  </el-menu-item-group>
                </div>
              </el-submenu>
              <el-menu-item :index="item.componentName" v-else>
                <i class="el-icon-folder-opened"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-aside>
        <el-main>
          <keep-alive>
            <component :is="currentTabComponent"></component>
          </keep-alive>
        </el-main>
      </el-container>
```



官网的例子：

![image-20220708160736952](E:\ljy\资料\img\image-20220708160736952.png)

