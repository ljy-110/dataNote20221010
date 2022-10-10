# 从后面截取字符串；字符串变成小写；判断数组字符串是否存在特定字符；检验url是否带了http

# js截取数据，从后面开始截取

```js
let type = (file.name).substring((file.name).lastIndexOf(".")+1)
```

# 把字符串变成小写模式

```js
let type2 = type.trim().toLowerCase()
```

# 判断数组中有没有特定的字符

```js
let text = ['TXT','DOC','XLS','PPT','DOCX','XLSX','PPTX','pdf','txt','doc','xls','ppt','docx','xlsx','pptx','zip','rar','ZIP','RAR']
text.indexOf(type)

如果等于 -1 就说明数组中没有该字符，
```

# 判断字符串中有没有特定的字符，检验http

```js
let html = (this.html).trim().toLowerCase() // 变成小写
console.log(html.indexOf('http')== '-1');  //判断url是否存在http
```

