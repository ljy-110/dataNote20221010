layUI的表格的使用和实例

layUI的官网虽然宣布了关闭，但是还有很多能找到其他额非官方的文档：https://layui.itze.cn/doc/element/table.html

layUI曾经也是很火很实用的一个组件库，就像现在很多老项目也是还说使用layUI来，所以还说回经常用到layui的一些属性，下面我们就来说说下layui下的表格属性。表格还是有很大的写功能，比如自带的导出和打印功能等等，很方法开发者进行使用。

页面的盒子的渲染位置代码

```html
<div class="layui-card">
	<table id="demo" lay-filter="test"></table>
</div>
<script type="text/html" id="toolbarDemo">
        <div class="layui-btn-container">

        </div>
</script>
```

然后我们使用`table.render`来进行渲染

elem ： 指定原始 table 容器的选择器或 DOM

toolbar ： script的内容，开启工具栏，此处显示默认图标，可以自定义模板，详见文档

height：表格的高度

method ： 请求方式

url ： 数据接口

where ： 传的参数（layui.setter.tableName，存储的值）

cols ： 表头，同时也是渲染的值（这个可以针对不同的返回的数值进行处理，比如根据状态显示不同的文字；图片的显示，文件的下载等等）

```js
{
        table.render({
            elem: '#demo'
            ,toolbar: '#toolbarDemo'
            ,height: '720'
            ,method:'post'
            ,limit:15
            ,url: 'url' //数据接口
            ,where:{main_id:nowMainObj.main_id,role_id:nowMainObj.role_id,order_kind:'install',
                user_id:layui.data(layui.setter.tableName,'user_id'),s_id:layui.data(layui.setter.tableName,'s_id'),random:Math.random()}
            ,page: true //开启分页
            ,cols: [[ //表头
                {field: 'create_time', title: '时间', width:'10%'}
                ,{field: 'order_number', title: '申请单号', width:'10%'}
                ,{field: 'order_kind', title: '类型', width:'5%',templet:function(d){
                        return d.order_kind == 'repair'?'维修单':'安装单'
                    }}
                ,{field: 'mark', title: '申请单备注', width:'10%'}
                ,{field: 'user_name', title: '申请人姓名', width: '10%'}
                ,{field: 'phone', title: '手机', width:'10%'}
                ,{field: 'addr', title: '地址', width: '10%'}
                ,{field: 'product_number', title: '产品序号', width:'10%',templet:function (d) {
                        return d.product_number+(d.grpid?'（产品识别码：'+d.grpid.split('_')[1]+'）':'');
                    }}
                // ,{field: 'product_batch', title: '产品批次', width:'10%'}
                ,{field: 'product_model_info', title: '产品名称', width:'10%',templet:function (d) {
                        return d.product_model_info?d.product_model_info.product_name+'（'+d.product_model_info.product_model+'）':'';
                    }}
                ,{field: 'product_name', title: '产品名称', width:'10%'}
               ,{field: 'product_model', title: '产品型号', width: '5%'}
               ,{field: 'product_desc', title: '产品简介', width: '5%'}
                , {field: 'product_image', title: '图片', width: '5%', templet: function (d) {
                        return '<a href="/image/view?img_kind=open&filename=' + d.product_image + '"><img src="/image/view?img_kind=open&filename=' + d.product_image + '" width="30px" height="30px"></a>'
                    }
                }
                ,{field: 'order_number', title: '订单相关', width: '8%',templet: function(d){
                         let html ='';
                         html+=d.order_number ? '订单号：'+ d.order_number:'';
                        html+=d.wuliu_number ? '运单号：'+ d.wuliu_number:'';
                        html+=d.product_number ? '产品序号：'+ d.product_number:'';
                        html+="<a href='/file/download?file_kind=src&filename="+d.order_doc_file+"&user_id="+user_id+"&s_id="+s_id+"' target='_blank'>订单凭证</a> &nbsp;"
                
                        return html;
                     }
                 }
                ,{field: 'op', title: '操作', width: '12%',templet: function(d){
                        // if(!d.deal_status)
                        return getOPStr(d)+
                            '<a class="layui-table-link" href="javascript:up(\''+d.order_id+'\')">&nbsp; 置顶 &nbsp;</a>&nbsp;'+
                            '<a class="layui-table-link" href="javascript:remove(\''+d.order_id+'\')">&nbsp; 删除 &nbsp;</a>&nbsp;'
                        // return '';
                    }}

            ]],
            request: {
                pageName: 'begin' //页码的参数名称，默认：page
                ,limitName: 'len' //每页数据量的参数名，默认：limit
            },
            parseData: function(res){ //res 即为原始返回的数据
                if(res.ret) {
                    return {
                        "ret": res.ret, //解析接口状态
                        "msg": res.msg, //解析提示文本
                        "count": res.list.length*100, //解析数据长度
                        "list": res.list //解析数据列表
                    };
                }else{
                    return {"code":false,msg:res.msg}
                }
            },response: {
                statusName: 'ret' //规定数据状态的字段名称，默认：code
                ,statusCode: true //规定成功的状态码，默认：0
                ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
                ,countName: 'count' //规定数据总数的字段名称，默认：count
                ,dataName: 'list' //规定数据列表的字段名称，默认：data
            }
        });
    }
```

以上是我使用的其中一种表格的渲染方式方法渲染，layui还有其他的 表格渲染方式，比如自动渲染，转换静态表格总共三种方法

自动渲染使用的是一种写好的模板来进行页面的渲染

\1) 带有 *class="layui-table"* 的 *<table>* 标签。
\2) 对标签设置属性 *lay-data=""* 用于配置一些基础参数
\3) 在 *<th>* 标签中设置属性*lay-data=""*用于配置表头信息

```js
<table class="layui-table" lay-data="{height:315, url:'/demo/table/user.json', page:true, id:'test'}" lay-filter="test">
  <thead>
    <tr>
      <th lay-data="{field:'id', width:80, sort: true}">ID</th>
      <th lay-data="{field:'username', width:80}">用户名</th>
      <th lay-data="{field:'sex', width:80, sort: true}">性别</th>
      <th lay-data="{field:'city'}">城市</th>
      <th lay-data="{field:'sign'}">签名</th>
      <th lay-data="{field:'experience', sort: true}">积分</th>
      <th lay-data="{field:'score', sort: true}">评分</th>
      <th lay-data="{field:'classify'}">职业</th>
      <th lay-data="{field:'wealth', sort: true}">财富</th>
    </tr>
  </thead>
</table>
```





























