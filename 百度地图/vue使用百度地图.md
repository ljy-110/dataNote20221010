vue使用百度地图

先安装包

```
npm i vue-baidu-map --save
```

在main.js引入

```
import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
      ak: '你的百度地图密钥ak'
})
```

没有密钥ak的可以去百度地图网站申请

```
http://lbsyun.baidu.com/apiconsole/key#/home
```

如下图

![image-20201024165954606](E:\ljy\资料\img\typora-user-images\image-20201024165954606.png)

然后再index.html入口文件添加引用

```
<script type="text/javascript" src="//api.map.baidu.com/api?v=1.1&ak=你的AK"></script>
```

然后创建vue单页添加

```vue
<template>
  <div>
    <div id="map" style="width:1200px;height:500px;"></div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data () {
    return {
    };
  },

  created() {},

  methods: {},

  computed: {},

  mounted(){
        // 百度地图API功能
    var map = new BMap.Map("map");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(113.370171,23.129587), 15);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
        mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));
    map.setCurrentCity("广州");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

  },

  watch: {}
}

</script>
<style lang='stylus' scoped>
.BMap_cpyCtrl {
    display: none;
}
.anchorBL {
    display: none;
}


</style>
```

```js
// var that = this
    // var map = new BMap.Map("map");    // 创建Map实例
    // var mapstyle = bmapJSON
    // map.centerAndZoom(new BMap.Point(113.353816,23.15199), 15);  // 初始化地图,设置中心点坐标和地图级别
    // // var point = new BMap.Point(113,23)   
    // // var myIcon = new BMap.Icon(Micon, new BMap.Size(28, 34)) 
    // // var marker = new BMap.Marker(point, { icon: myIcon }) // 创建标注 

    // var icon = new BMap.Icon(Micon,new BMap.Size(60,60));
    // //设置标注的经纬度
    // var marker = new BMap.Marker(new BMap.Point(113.353816,23.15199),{icon:icon});
    // map.addOverlay(marker) // 将标注添加到地图中
    // marker.addEventListener('click', function () { //监听标注点击事件
    //   that.$router.push(`/engineering`)
    // })
    // //添加地图类型控件
    // map.setMapStyleV2({styleJson:mapstyle});
    // map.setCurrentCity("广州");          // 设置地图显示的城市 此项是必须设置的
    // map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    // marker.addEventListener("mouseover",function(e){
    //     //为标注设置一个标签
    //     const label = new BMap.Label("徐州幼儿园",{offset:new BMap.Size(15,-35)});
    //     label.setStyle({
    //         background: 'rgb(10,35,45)',
    //         border: '1px double rgb(0,254,212)',
    //         borderRadius: "5px",
    //         color: '#fff', 
    //         height: "26px",
    //         lineHeight: "26px",
    //         textAlign: "center",
    //         width: "120px",
    //     });
    //     marker.setLabel(label);
    // });
    // marker.addEventListener("mouseout",function(e){  
    //     const label = this.getLabel();
    //     label.setContent("");
    //     label.setStyle({border:"none",width:"0px",padding:"0px"});
    // });
```

```js
```

