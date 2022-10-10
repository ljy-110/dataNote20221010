微信小程序之tabBar页

在`app.json`文件中添加

```json
"tabBar":{
    "color":"#6e6d6b",
    "selectedColor":"#f9f027",
    "position":"bottom",
    "borderStyle":"white",
    "backgroundColor": "#292929",
    "list": [{
        "pagePath": "pages/home/home",
        "text": "首页",
        "iconPath": "./img/1-1.png",
        "selectedIconPath": "./img/1-2.png"
      }, {
        "pagePath": "pages/projects/projects",
        "text": "购物车",
        "iconPath": "./img/2-1.png",
        "selectedIconPath": "./img/2-2.png"
      }, {
        "pagePath": "pages/user/user",
        "text": "我的",
        "iconPath": "./img/3-1.png",
        "selectedIconPath": "./img/3-2.png"
      }]
  },
```

