uniapp开发时候常用的一些东西

1、pages.json

```js
"style" : 
    {
        "navigationBarTitleText" : "导航栏标题",
        "navigationBarBackgroundColor" : "#1175fc",  //导航背景颜色
        "navigationBarTextStyle" : "white", //导航文字颜色
        "enablePullDownRefresh":"true", //开启下拉
        "navigationStyle" : "custom",//隐藏导航栏
        "transparentTitle": "auto",//导航栏滚动显示
        
    }
```

2、动态配置导航栏

```js
uni.setNavigationBarTitle({
    title: newTitle
});
```

3、大图查看图片

```js
uni.previewImage({
    urls: [img],
    current: index
})
```

4、计算盒子的信息，高度

```js
let query = uni.createSelectorQuery().in(this);
query.select(".footer-btn")
    .boundingClientRect((data) => {
        data.height
    })
    .exec();
```

