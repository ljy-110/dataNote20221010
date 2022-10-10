ECharts xAxis配置 x坐标轴刻度标签设置

1、ECharts xAxis配置 x坐标轴刻度标签设置

xAxis.**axisLabel** |  Object

坐标轴刻度标签的相关设置。

------

xAxis.axisLabel.**show**  |  boolean

[ default: true ]

是否显示刻度标签。

------

xAxis.axisLabel.**interval**  |  number, Function

[ default: 'auto' ]

坐标轴刻度标签的显示间隔，在类目轴中有效。

默认会采用标签不重叠的策略间隔显示标签。

可以设置成 0 强制显示所有标签。

如果设置为 1，表示『隔一个标签显示一个标签』，如果值为 2，表示隔两个标签显示一个标签，以此类推。

可以用数值表示间隔的数据，也可以通过回调函数控制。回调函数格式如下：

```
(index:number, value: string) => boolean
```

第一个参数是类目的 index，第二个值是类目名称，如果跳过则返回 false。

------

xAxis.axisLabel.**inside**  |  boolean

[ default: false ]

刻度标签是否朝内，默认朝外。

------

xAxis.axisLabel.**rotate**  |  number

[ default: 0 ]

刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。

旋转的角度从 -90 度到 90 度。

------

xAxis.axisLabel.**margin**  |  number

[ default: 8 ]

刻度标签与轴线之间的距离。

------

xAxis.axisLabel.**formatter**  |  string, Function

[ default: null ]

刻度标签的内容格式器，支持字符串模板和回调函数两种形式。

示例:

```
// 使用字符串模板，模板变量为刻度默认标签 {value}
formatter: '{value} kg'
// 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
formatter: function (value, index) {
    // 格式化成月/日，只在第一个刻度显示年份
    var date = new Date(value);
    var texts = [(date.getMonth() + 1), date.getDate()];
    if (index === 0) {
        texts.unshift(date.getYear());
    }
    return texts.join('/');
}
```

------

xAxis.axisLabel.**showMinLabel**  |  boolean

[ default: null ]

是否显示最小 tick 的 label。可取值 true, false, null。默认自动判定（即如果标签重叠，不会显示最小 tick 的 label）。

------

xAxis.axisLabel.**showMaxLabel**  |  boolean

[ default: null ]

是否显示最大 tick 的 label。可取值 true, false, null。默认自动判定（即如果标签重叠，不会显示最大 tick 的 label）。

------

xAxis.axisLabel.**color**  |  Color, Function

刻度标签文字的颜色，默认取 [axisLine.lineStyle.color](https://www.w3cschool.cn/echarts_tutorial/echarts_tutorial-a7vq2cpl.html)。支持回调函数，格式如下：

```
(val: string) => Color
```

参数是标签的文本，返回颜色值，如下示例：

```
textStyle: {
    color: function (value, index) {
        return value >= 0 ? 'green' : 'red';
    }
}
```

------

xAxis.axisLabel.**fontStyle**  |  string

[ default: 'normal' ]

文字字体的风格

可选：

- 'normal'
- 'italic'
- 'oblique'

------

xAxis.axisLabel.**fontWeight**  |  string

[ default: normal ]

文字字体的粗细

可选：

- 'normal'
- 'bold'
- 'bolder'
- 'lighter'
- 100 | 200 | 300 | 400...

------

xAxis.axisLabel.**fontFamily**  |  string

[ default: 'sans-serif' ]

文字的字体系列

还可以是 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...

------

xAxis.axisLabel.**fontSize**  |  number

[ default: 12 ]

文字的字体大小

------

xAxis.axisLabel.**align**  |  string

文字水平对齐方式，默认自动。

可选：

- 'left'
- 'center'
- 'right'

rich 中如果没有设置 align，则会取父层级的 align。例如：

```
{
    align: right,
    rich: {
        a: {
            // 没有设置 `align`，则 `align` 为 right
        }
    }
}
```

------

xAxis.axisLabel.**verticalAlign**  |  string

文字垂直对齐方式，默认自动。

可选：

- 'top'
- 'middle'
- 'bottom'

rich 中如果没有设置 verticalAlign，则会取父层级的 verticalAlign。例如：

```
{
    verticalAlign: bottom,
    rich: {
        a: {
            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
        }
    }
}
```

------

xAxis.axisLabel.**lineHeight**  |  number

行高。

rich 中如果没有设置 lineHeight，则会取父层级的 lineHeight。例如：

```
{
    lineHeight: 56,
    rich: {
        a: {
            // 没有设置 `lineHeight`，则 `lineHeight` 为 56
        }
    }
}
```

------

xAxis.axisLabel.**backgroundColor**  |  string, Object

[ default: 'transparent' ]

文字块背景色。

可以是直接的颜色值，例如：'#123234', 'red', rgba(0,23,11,0.3)'。

可以支持使用图片，例如：

```
backgroundColor: {
    image: 'xxx/xxx.png'
    // 这里可以是图片的 URL，
    // 或者图片的 dataURI，
    // 或者 HTMLImageElement 对象，
    // 或者 HTMLCanvasElement 对象。
}
```

当使用图片的时候，可以使用 width 或 height 指定高宽，也可以不指定自适应。

------

xAxis.axisLabel.**borderColor**  |  string

[ default: 'transparent' ]

文字块边框颜色。

------

xAxis.axisLabel.**borderWidth**  |  number

[ default: 0 ]

文字块边框宽度。

------

xAxis.axisLabel.**borderRadius**  |  number, Array

[ default: 0 ]

文字块的圆角。

------

xAxis.axisLabel.**padding**  |  number, Array

[ default: 0 ]

文字块的内边距。例如：

- padding: [3, 4, 5, 6]：表示 [上, 右, 下, 左] 的边距。
- padding: 4：表示 padding: [4, 4, 4, 4]。
- padding: [3, 4]：表示 padding: [3, 4, 3, 4]。

注意，文字块的 width 和 height 指定的是内容高宽，不包含 padding。

------

xAxis.axisLabel.**shadowColor**  |  string

[ default: 'transparent' ]

文字块的背景阴影颜色。

------

xAxis.axisLabel.**shadowBlur**  |  number

[ default: 0 ]

文字块的背景阴影长度。

------

xAxis.axisLabel.**shadowOffsetX**  |  number

[ default: 0 ]

文字块的背景阴影 X 偏移。

------

xAxis.axisLabel.**shadowOffsetY**  |  number

[ default: 0 ]

文字块的背景阴影 Y 偏移。

------

xAxis.axisLabel.**width**  |  number, string

文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 backgroundColor）时，可能会使用它。

注意，文字块的 width 和 height 指定的是内容高宽，不包含 padding。

width 也可以是百分比字符串，如 '100%'。表示的是所在文本块的 contentWidth（即不包含文本块的 padding）的百分之多少。之所以以 contentWidth 做基数，因为每个文本片段只能基于 content box 布局。如果以 outerWidth 做基数，则百分比的计算在实用中不具有意义，可能会超出。

注意，如果不定义 rich 属性，则不能指定 width 和 height。

------

xAxis.axisLabel.**height**  |  number, string

文字块的高度。一般不用指定，不指定则自动是文字的高度。在使用图片（参见 backgroundColor）时，可能会使用它。

注意，文字块的 width 和 height 指定的是内容高宽，不包含 padding。

注意，如果不定义 rich 属性，则不能指定 width 和 height。

------

xAxis.axisLabel.**textBorderColor**  |  string

[ default: 'transparent' ]

文字本身的描边颜色。

------

xAxis.axisLabel.**textBorderWidth**  |  number

[ default: 0 ]

文字本身的描边宽度。

------

xAxis.axisLabel.**textShadowColor**  |  string

[ default: 'transparent' ]

文字本身的阴影颜色。

------

xAxis.axisLabel.**textShadowBlur**  |  number

[ default: 0 ]

文字本身的阴影长度。

------

xAxis.axisLabel.**textShadowOffsetX**  |  number

[ default: 0 ]

文字本身的阴影 X 偏移。

------

xAxis.axisLabel.**textShadowOffsetY**  |  number

[ default: 0 ]



文字本身的阴影 Y 偏移。
