时间格式化的js文件可以直接引入

```js
let dateUtil = {
  dateFormat: function (fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      }
    }
    return fmt;
  },
  add0: function (m) {
    return m < 10 ? '0' + m : m
  },
  formatTime: function (shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + dateUtil.add0(m) + '-' + dateUtil.add0(d) + ' ' + dateUtil.add0(h) + ':' + dateUtil.add0(mm) + ':' + dateUtil.add0(s);
  },
  formatTimeMinute: function (shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + dateUtil.add0(m) + '-' + dateUtil.add0(d) + ' ' + dateUtil.add0(h) + ':' + dateUtil.add0(mm);
  },
  formatDate: function (shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + dateUtil.add0(m) + '-' + dateUtil.add0(d);
  },
  formatTypeDate: function (date, type) {

    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(date);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    switch (type) {
      case 'yyyy':
        return y
      case 'yyyy-MM':
        return y + '-' + dateUtil.add0(m);
      case 'yyyy-MM-dd':
        return y + '-' + dateUtil.add0(m) + '-' + dateUtil.add0(d);
      case 'MM-dd':
        return dateUtil.add0(m) + '-' + dateUtil.add0(d);
      case 'yyyy-MM-dd hh:MM':
        return y + '-' + dateUtil.add0(m) + '-' + dateUtil.add0(d) + ' ' + dateUtil.add0(h) + ':' + dateUtil.add0(mm);
      case 'yyyy-MM-dd hh:MM:ss':
        return y + '-' + dateUtil.add0(m) + '-' + dateUtil.add0(d) + ' ' + dateUtil.add0(h) + ':' + dateUtil.add0(mm) + ':' + dateUtil.add0(s);
      case 'hh:MM':
        return dateUtil.add0(h) + ':' + dateUtil.add0(mm);
      case 'hh:MM:ss':
        return dateUtil.add0(h) + ':' + dateUtil.add0(mm) + ':' + dateUtil.add0(s);
      default:
        return y + '-' + dateUtil.add0(m) + '-' + dateUtil.add0(d);
    }

  }

}

export {
  dateUtil
}

```

获取当前周一周日

```js
// 获取周一周日
    getWeek(){
      var now = new Date();
      var nowTime = now.getTime();
      var day = now.getDay();
      var oneDayTime = 24*60*60*1000;
      //显示周一
      var MondayTime = nowTime - (day-1)*oneDayTime;
      //显示周日
      var SundayTime = nowTime + (7-day)*oneDayTime;
      //初始化日期时间
      var monday = dateUtil.formatDate(new Date(MondayTime));
      var sunday = dateUtil.formatDate(new Date(SundayTime));
      //打印查看结果
      // console.log(monday);
      // console.log(sunday);
    },
    // 当前月份的第一天和最后一天
    getMonth() {
      var myDate = new Date();
      var currentMonth = myDate.getMonth();
      var firstDay = new Date(myDate.getFullYear(), currentMonth, 1)
      var lastDay = new Date(firstDay.getFullYear(), currentMonth + 1, 0);
      firstDay = dateUtil.formatDate(firstDay);
      lastDay = dateUtil.formatDate(lastDay);
      console.log(firstDay);
      console.log(lastDay);
      // return firstDay + "~" + lastDay;
    },
```

