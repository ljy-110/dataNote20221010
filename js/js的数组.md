## 判断属性是否存在

```js
if('shop_id' in liveInfo)


group_live_gli(){
              let chat_sid = localStorage.getItem('chat_sid')
              let liveInfo = this.liveinfo
              if(this.chat_type == 'group_live')
              {
                if('shop_id' in liveInfo){
                  let shopid = liveInfo.shop_id
                }else{
             }
              }else
              {
              }
            },
```

## 2.给对象添加一个属性和值

```js
list['status'] = 1
```

## 3.给后端拿到的数组对象添加一个状态值

```js
upgetShopList(){
                let res =  list
                let shoplist = res.shoplist
                let chatInfo = this.chatInfo
                let goodlist = []
                this.img = this.$img
                if('shop_id' in chatInfo){
                  for(var i=0;i<shoplist.length;i++){
                    let shopid = chatInfo.shop_id
                    let shop_id = shoplist[i].shop_id
                    let list = shoplist[i]
                    if(shopid === shoplist[i].shop_id){
                      list['status'] = 1
                      goodlist.push(list)
                    }else{
                      list['status'] = 3
                      goodlist.push(list)
                    }
                  }
                }else{
                  shoplist.forEach(item => {
                    item.status = 0
                  })
                }
                this.shoplist = shoplist
              },
```

## 4.给数组对象添加一个属性和值

```js
shoplist.forEach(item => {
                    item.status = 0
                  })
```


