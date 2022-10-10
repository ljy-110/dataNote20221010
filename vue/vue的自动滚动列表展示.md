vue的自动滚动列表展示--无缝滚动

无缝滚动是我们经常遇到的一张列表的展示的效果，或者是一些盒子的效果。最近我碰到了一个项目就是需要用到无缝滚动的效果，经过我的查找，找到了`vue-seamless-scroll`，这个插件，下面就来说下具体的用法

安装插件依赖包

```js
"vue-seamless-scroll": "^1.1.21",
    
npm install vue-seamless-scroll --save　　
```

官网文档

```js
https://chenxuan1993.gitee.io/component-document/index_prod#/component/seamless-default
```

引入使用

```
import vueSeamlessScroll from 'vue-seamless-scroll'

components: {
    vueSeamlessScroll
  },
```

页面使用。官网上面有多种的滚动方式，向上向下左右滚动的效果都有，我使用的是基本的用法，向上滚动的用法，下面的是我具体的实例代码。

注意：

1、记得需要给父元素添加一个高度和绑定一个数组，即`:data="alarmListData"`

2、要添加一个超出隐藏的css属性`overfolw:hidden;`；

3、左右滚动的需要给初始的内容ul标签盒子添加一个宽度；

效果基本如下

![9](E:\ljy\资料\img\9.gif)

```html
<vue-seamless-scroll :data="alarmListData"
                                       class="seamless-warp size"
                                       :class-option="classOption"
                                       v-if="alarmListData.length > 0">
                    <ul class="item">
                      <li v-for="(item, index) in alarmListData"
                          :key="index">
                        <el-row>
                          <el-col :span="3"><span>{{ index + 1 }}</span>
                          </el-col>
                          <el-col :span="15"><span class="title"
                                  :title="item.title">{{
                              item.sectionName
                            }}</span></el-col>
                          <el-col :span="6">{{ item.avgPm10 }}</el-col>
                        </el-row>
                      </li>
                    </ul>
                  </vue-seamless-scroll>
```

class-option的属性配置，放在计算机属性里面

```js
computed: {
    classOption () {
      return {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: 10, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
```

左右滚动。左右滚动需要添加`direction:2``limitMoveNum: 2`，这两个属性，下面是需要判断使用哪个方向来进行滚动的设置。

```js
direction: 1, // 0向下 1向上 2向左 3向右
```

效果基本如下

![10](E:\ljy\资料\img\10.gif)

以上就是使用无缝滚动的一些基本效果，如果还行深入了解其他的效果，可以自行去官网查看，地址在上面。
