layui的模板引擎文档 - layui.laytpl

最近layui的官方文档已经关闭了，但是还是有不少的老项目使用的是layui的框架，又不方便整体修改，所以现在就是记录下一些特别的东西，还有就是layui 的镜像文档

文档连接：https://layui.itze.cn/doc/index.html

laytpl 是 JavScript 模板引擎，在字符解析上有着比较出色的表现，欠缺之处在于异常调试上。由于传统意义的前端模板引擎已经变得不再流行，*所以 laytpl 后续可能会进行重写*，目前方向暂时还没有想好，预计会在layui比较稳定后开始实施。

![image-20211101113731707](E:\ljy\资料\img\image-20211101113731707.png)

首先在页面添加一个模板的代码

d.data是配置传入的是数据

```js
//第一步：编写模版。你可以使用一个script标签存放模板，如：
<script id="demo" type="text/html">
  <h3>{{ d.title }}</h3>
  <ul>
  {{#  layui.each(d.data, function(index, item){ }}
    <li>
      <span>{{ item.name }}</span>
      <span>{{ item.value }}</span>
    </li>
  {{#  }); }}
  {{#  if(d.data.length === 0){ }}
    无数据
  {{#  } }} 
  </ul>
</script>
```

建立视图，就是给一个这个循环渲染的盒子

```js
//第二步：建立视图。用于呈现渲染结果。
<div id="view"></div>
```

渲染模板

```
axios.get('/user?ID=12345')
  .then(function (response) {
    layui.use(['laytpl'], function() {
    	var laytpl = layui.laytpl;
    	var vivw = document.getElementById('view')
    	var html = document.getElementById('demo').innerHTML
    	//  模板与渲染
    	laytpl(html).render(response.data, function(html){
  			view.innerHTML = html;
		});
    })
  })
  .catch(function (error) {
    console.log(error);
  });
```

上面的代码，其中

`document.getElementById('view')`是为了获取到建立的视图，`document.getElementById('demo').innerHTML`，这个是为了获取模板的对应的`script`的内容,，然后利用里面的`laytpl`来进行页面的渲染和赋值。

踩坑：

1、那个时候没有定义laytpl ：var laytpl = layui.laytpl;，然后导致一直在报错

2、layui.use，没有添加！！！！！

3、data：传给laytpl的数据一定要是对应上的，不然也会报错的

然后我们再看看官网上面的模板实例

```
layui.use('laytpl', function(){
  var laytpl = layui.laytpl;
  
  //直接解析字符
  laytpl('{{ d.name }}是一位公猿').render({
    name: '贤心'
  }, function(string){
    console.log(string); //贤心是一位公猿
  });
  
  //你也可以采用下述同步写法，将 render 方法的回调函数剔除，可直接返回渲染好的字符
  var string =  laytpl('{{ d.name }}是一位公猿').render({
    name: '贤心'
  });
  console.log(string);  //贤心是一位公猿
  
  //如果模板较大，你也可以采用数据的写法，这样会比较直观一些
  laytpl([
    '{{ d.name }}是一位公猿'
    ,'其它字符 {{ d.content }}  其它字符'
  ].join(''))
}); 
```

可以看到，页面的模板也是可以直接写的，不需要再次进行定制，但是只是针对需要循环的页面少的，多的话还是建议新建一个模板的script