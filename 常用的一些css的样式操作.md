常用的一些css的样式操作写法

1、文字超出盒子显示省略号

​	（1）、单行文字超出省略

```css
text-overflow:ellipsis;
overflow: hidden;
white-space: nowrap;
```

​	（2）、多行文字超出省略

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

2、滚动条的样式修改

```css
 /* 滚动条的隐藏  */
.left-scoll::-webkit-scrollbar {display: none;}
  /* 定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: rgba(240, 240, 240, 1);
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  border-radius: 10px;
  background-color: #fff;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  background-color: rgba(32, 34, 42, .5);
}

/* 火狐 */
*{
  scrollbar-color: rgba(89, 135, 164, .5) transparent; /* 第一个颜色为滚动条的颜色， 第二个颜色为滚动条轨道的颜色 */
  scrollbar-width: thin; /* 设置比默认滚动条宽度更窄的宽度 */
}
  scrollbar-color: auto; /* 使用浏览器默认的滚动条样式 */
  scrollbar-color: dark; /* 使用浏览器默认的深色或者黑色滚动效果 */
  scrollbar-color: light; /* 使用浏览器默认的浅色滚动效果 */
  scrollbar-color: red #00f; /* 第一个颜色为滚动条的颜色， 第二个颜色为滚动条轨道的颜色 */
  scrollbar-width: auto; /* 使用浏览器默认的滚动宽度 */
  scrollbar-width: thin; /* 设置比默认滚动条宽度更窄的宽度 */
  scrollbar-width: none; /* 隐藏滚动条，但是元素还是可以滚动 */
  scrollbar-width: 66px; /* 直接设置滚动条的宽度，比如 60px 3vh 4wh 5rem 6rm 等长度 */
```

3、特殊的三角形状

```css
content: "";
width: 0;
height: 0;
left: 100%;
top: 12px;
border-top: 9px solid transparent;
border-right: 9px solid #DDDDDD;
border-bottom: 7px solid transparent;
//或者
width: 0;
height: 0;
border: 5px solid #transparent;
border-top-color: red;


//实例
<i class="triangle"></i>
.triangle{
  display:block; 
  width:0; 
  height:0; 
  border-width:10px 10px 0; 
  border-style:solid; 
  border-color:#fff transparent transparent;
  position:absolute; 
  left: 83px;
  bottom: -10px;
}
```

4、flex布局

（1）、居中

```css
display: flex;
justify-content: center;
align-items: center;
```

（2）、居中

```css
.center{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

（3）、靠左排序，自动换行

```css
.flex-wrap{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;//靠右排序就改为：flex-end
}
```

（4）、左右分布

```css
.between{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
```

5、grid布局

```css
.grid__container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2vh;
}
```

6、字体下划线

```css
.text-xh:hover{
  text-decoration: underline;  //去除下划线就用  none
}
```

7、背景渐变色

```css
background: linear-gradient(to right, #076fb4, #05d6d4);
```

8、旋转

```js
transform:rotate(-90deg)
```

9\、使用`require`动态加载

```js
let url = './data/test.json';
const json1 = require(url);			//错误用法
const json2 = require(`${url}`);	//正确用法
const json3 = require(url + '');	//正确用法

:style="{'background-image': `url(${require(`../img/backlog_bg${index + 1}.png`)})`}"

liftPhoto: require('../../../../assets/image/u22230.png'),
```

10、边框线，最后一个不要右边框线

```css
ul {
    margin: 50px auto;
    width: 400px;
    height: 48px;
    font-size: 24px;
    display: flex;
    flex-direction: row;
}
ul li {
    width: 100px;
    line-height: 48px;
    text-align: center;   
}
ul li:not(:last-child) {
    border-right: 1px solid #666;
}
```

盒子内发光
box-shadow: inset 0 0 10px 5px red;

