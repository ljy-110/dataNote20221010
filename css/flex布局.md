flex布局的使用

flex布局也叫做弹性布局，可以让我们更好地简单快捷地进行前端页面的布局操作。`display: flex;`

一、justify-content

这是一个规定项目在主轴上的排序，比如多数据从左边往右边开始排序，或者从右边往左边，然后就是居中布局

这个有五个值：`flex-start | flex-end | center | space-between | space-around;`

1、`flex-start`的作用就是，让内容盒子从左往右边布局，适合一些想要让两个盒子并排在一排的。

![image-20211103171526011](E:\ljy\资料\img\image-20211103171526011.png)

2、`flex-end`的作用就是，让内容盒子从右往左边布局，适合一些想要让盒子布局在右边的。

![image-20211103171846745](E:\ljy\资料\img\image-20211103171846745.png)

3、`center`的作用就是，让内容盒子并排居中布局，适合一些想要让盒子居中。比如两个表单按钮

![image-20211103172307080](E:\ljy\资料\img\image-20211103172307080.png)

4、`space-between`的作用就是，让盒子进行两端对齐，盒子之间的间隔都相等。

![image-20211103172946048](E:\ljy\资料\img\image-20211103172946048.png)

5、`space-around`的作用就是，让盒子两侧的间隔相等

![image-20211103173116623](E:\ljy\资料\img\image-20211103173116623.png)

二、`flex-direction`

这个是问了修改主轴方向，就是修改盒子的起点位置。

```
flex-direction: row | row-reverse | column | column-reverse;
```

1、row（默认值）：让盒子为水平方向布局，起点在左边。

2、row-reverse：让盒子为水平方向布局，起点在右边。

3、column：让盒子为垂直方向布局，起点在上方。

4、column-reverse：让盒子为垂直方向布局，起点在下方。

![image-20211103181206907](E:\ljy\资料\img\image-20211103181206907.png)

三、`flex-wrap`

一般都是用来换行的功能，让盒子自动换行布局

```
flex-wrap: nowrap | wrap | wrap-reverse;
```

1、`nowrap`,是不换行；

2、`wrap`：换行，从左到右然后进行换行；

3、`wrap-reverse`：也是换行但是，第一行是在最下面，然后最新的一行在上面布局

![image-20211103181904126](E:\ljy\资料\img\image-20211103181904126.png)

四、`align-items`

根据不同的位置让盒子进行对齐

```
align-items: flex-start | flex-end | center | baseline | stretch;
```

1、`flex-start`：在盒子的顶部对齐。

2、`flex-end`：在盒子的底部对齐。

3、`center`：在盒子的居中对齐。

4、`baseline`: 在盒子的某一个线进行对齐。

5、`stretch`：如果项目未设置高度或设为auto，将占满整个容器的高度。

![image-20211103183155281](E:\ljy\资料\img\image-20211103183155281.png)

五、align-content

这个属性是定义多盒子的多个轴线的对齐方式

1、flex-start：在盒子的顶部的起点对齐。

2、flex-end：在盒子的底部的终点对齐。

3、center：在盒子的中点对齐。

4、space-between：在盒子中的间隔平均分布。

5、space-around：在盒子中的两侧的间隔都相等。

![image-20211104112501190](E:\ljy\资料\img\image-20211104112501190.png)

以上是我们常用的一些flex的属性。

下面可以看下一些实例的样式代码

```css
//盒子中左右垂直对齐
.center{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

//横向居中
.h-center{
  display: flex;
  align-items: center;
}

//换行，靠左边起点
.flex-wrap{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
}

//分布两端布局
.between{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.flex{display: flex;}
.flex-row{ flex-direction:row!important; }
.flex-row-reverse{ flex-direction:row-reverse!important; }

//靠右边起点布局
.flex-end{
  display: flex;
  justify-content:flex-end;
}

//沾满剩余宽度
flex-grow: 1;
```

