el-card的点击事件失效的解决方式

```
@click = 'link'

改为

@click.native = 'link'//变成原生绑定
```

