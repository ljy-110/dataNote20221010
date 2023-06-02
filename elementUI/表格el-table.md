表格的一些样式

```js
//鼠标悬浮的修改颜色
.el-table__body tr:hover>td ,
  .el-table__body .el-table__row.hover-row td { //加了flexd属性
    background-color: rgba(31, 133, 212, 0.2)!important;
    // background-color: transparent;
  }
//加了fixed属性，去除下面的边框线
  .el-table__fixed-right::before,
  .el-table__fixed::before{
    display: none !important;
  }
```

、

```css
.el-table, .el-table__expanded-cell{
    background-color: transparent;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: transparent;
  }
  .el-table, .el-table th,.el-table tr{
    background-color: transparent;
  }
  .el-table thead tr,.el-table .is-group.has-gutter{
    background-color: rgb(5,44,81);
  }
  // .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
  //   border-bottom: 0;
  // }
  // .el-table__body{
  //   -webkit-border-vertical-spacing: 10px;  // 垂直间距
  // }
  .el-table__body td{
    margin-bottom: 15px;
    color: #DEEEFF;
    background-color: rgba(31, 133, 212, 0.08);
  }
  .el-table__body tr:hover>td ,
  .el-table__body .el-table__row.hover-row td {
    background-color: rgba(31, 133, 212, 0.2)!important;
    // background-color: transparent;
  }
  .el-table__fixed-right::before,
  .el-table__fixed::before{
    display: none !important;
  }
  .el-table::before {
    display: none;
  }
  .el-table--border{
    border: 1px solid rgba(89, 135, 164, 0.4)!important;
  }
  .el-table--border .el-table__cell, 
  .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    border-right: 1px solid rgba(89, 135, 164, 0.4)!important;
  }
  .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf,
  .el-table--border th.el-table__cell, .el-table__fixed-right-patch{
    border-bottom: 1px solid rgba(89, 135, 164, 0.4)!important;
  }
  .el-table thead.is-group th.el-table__cell{
    background-color: rgb(5,44,81);
  }
```

