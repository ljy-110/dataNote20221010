`vue`中获取高度的方法；监听屏幕的宽高来触发事件；点击事件到达底部；

`js`获取页面的高度

```
document.body.scrollTop = document.body.scrollHeight;
```

获取某个区域的高度

```js
var height = document.getElementById("list");
height.scrollTop = height.scrollHeight;
//上面的获取在你使用了`v-else`的时候会导致获取的高度为0或者null
```

`vue`获取区域的高度，然后点击到达底部

```html
 <div ref="chatlists" class="main-con" style="width:100%;">
    <div v-for="(item, index) in chatMsg" :key="index" class="" style="margin-left: 15px;margin-right: 15px;">
        <p class="msg-time text-center">{{item.msg_info.time}}</p>
    </div>
</div>
```

```js
this.$refs.chatlists.scrollTop = this.$refs.chatlists.scrollHeight;
//如果只是在渲染页面的时候获取高度，是可以拿到的，但是在你渲染完之后，
//通过事件来获取高度，可能会获取失败，所以添加`$nextTick`
this.$nextTick(() => {
    this.$refs.chatlists.scrollTop = this.$refs.chatlists.scrollHeight;
    console.log(this.$refs.chatlists.scrollTop);
});
```

2、使用`window.onresize`来监听屏幕的宽高

只会跑一次，多个页面使用会导致失效，所以视情况而定

```js
mounted() {
  var that = this;
  window.onresize = function(){ // 定义窗口大小变更通知事件
    that.screenWidth = document.documentElement.clientWidth; //窗口宽度
    that.screenHeight = document.documentElement.clientHeight; //窗口高度
  };
}
```

3、使用`window.addEventListener`来做监听

```js
//方法methods中
handleScroll() {
  let scroll = this.$refs.chatlists.scrollTop;
  console.log(scroll);
},
```

```js
mounted(){
    window.addEventListener('scroll', this.handleScroll,true)
},
```

最好就是添加消除这个监听,但是有时候加了会报错，我也不知道为啥；所以加不加看情况而定；最好不要挂载太多的，否则会出事的

```js
destroyed () {
   window.removeEventListener('scroll', this.handleScroll,true)
},
```

4、给div添加`@scroll='scrollHeight($event)'`事件来获取高度

```html
<div ref="chatlists" class="main-con" style="width:100%;" @scroll='functionName($event)'>
</div>
```

```js
functionName(e) {
  console.log(this.$refs.chatlists.scrollTop);
  console.log(this.$refs.chatlists.scrollHeight;
}
```

