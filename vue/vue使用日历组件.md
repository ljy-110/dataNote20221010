日历组件



一、elementui的日历组件`el-calendar`

因为我们的需求和给的实例有点大，所以修改有点多

1、样式修改，我们要把边框和hover的样式修改，还要根据不同的状态来显示不同的颜色，所以就直接进行了修改，如果你们不需要的话，可以把css样式去除，代码如下

```js
.el-calendar-table__row .current .calendar-day{
    text-align: center;
    color: #202535;
    line-height: 30px;
    font-size: 36px;
    font-family: '思源黑体 CN Bold', '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 700;
    margin-top: 15px;
}
.el-calendar-table__row .prev .calendar-day,
.el-calendar-table__row .next .calendar-day
{
    text-align: center;
    /* color: #202535; */
    line-height: 30px;
    font-size: 36px;
    font-family: '思源黑体 CN Bold', '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 700;
    margin-top: 15px;
}
/* .el-calendar-table__row .current,.el-calendar-table__row .prev,.el-calendar-table__row .next{
  height: 100px;
} */

.is-selected{
  font-family: '思源黑体 CN Bold', '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 700;
    font-size: 24px;
    margin-top: 5px;
    text-decoration: none;
    /* color: rgb(104, 143, 235); */
}
.is-selected-select{
    color: rgb(104, 143, 235);
}
.is-selected-warn{
    color: rgb(240,178,12);
}
.is-selected-error{
    color: rgb(255,0,0);
}
.el-calendar-table tr td:first-child {
    border-left: none;
}
.el-calendar-table tr:first-child td {
    border-top: none;
}
.el-calendar-table td {
    border-bottom: none;
    border-right: none;
    vertical-align: top;
    -webkit-transition: background-color .2s ease;
    transition: background-color .2s ease;
}
.el-calendar-table .el-calendar-day {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px 0 15px 0;
    height: 110px;
}
.el-calendar-table .current .el-calendar-day:hover {
    cursor: pointer;
    background-color: rgb(104,143,235);
    color: #fff;
    border-radius: 10px;
}
.el-calendar-table .prev .el-calendar-day:hover, 
.el-calendar-table .next .el-calendar-day:hover {
    background-color: #fff;
}
.el-calendar-table .current .el-calendar-day:hover .calendar-day,
.el-calendar-table .current .el-calendar-day:hover .is-selected {
    color: #fff;
}
```

2、在页面的时候根据不同的返回值来进行判断添加的内容和颜色的修改

使用三元运算来展示不同的样式修改

```js
<div class="is-selected" :class="[item.status==0?'is-selected-select':(item.status == 1?'is-selected-warn':'is-selected-error')]">{{item.things}}</div>
```

3、数据的结构

```js
data():{
    return {
        calendarData: [
          { months: ['10', '11'],days: ['15'],things: '50W',status:0 },
          { months: ['10', '11'], days: ['16'],things: '未上报' ,status:1},
          { months: ['10'], days: ['17'],things: '未上报',status:2 },
          { months: ['10'], days: ['02'],things: '30W' ,status:0}   
        ],
        value: new Date()
    }
}
```

4、点击事件

```js
methods: {
     // 选择月份
      changeMonth (start, end, current) {
       console.log('changeMonth', start, end, current)
      },
      // 点击事件
      eventClick (event, jsEvent, pos) {
        console.log('eventClick', event, jsEvent, pos)
      },
      // 点击当天
      dayClick (day, jsEvent) {
         console.log('dayClick', day, jsEvent)
      },
      // 查看更多
      moreClick (day, events, jsEvent) {
        console.log('moreCLick', day, events, jsEvent)
      },
  },
```

5、页面代码

```js
<el-calendar>
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{date, data}">
            <div>
             <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
                <div v-for="(item,index) in calendarData" :key="index">
                   <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                     <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                         
                          <div class="is-selected" :class="[item.status==0?'is-selected-select':(item.status == 1?'is-selected-warn':'is-selected-error')]">{{item.things}}</div>
                       </div>
                    <div v-else></div>
                   </div>
               <div v-else></div>
             </div>
            </div>
          </template>
        </el-calendar>
```





