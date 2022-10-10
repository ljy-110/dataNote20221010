百度地图的文字和icon的显示和隐藏

```js
<li class = "btn" onclick = "showText()">显示POI文字</li>
        <li class = "btn" onclick = "hideText()">隐藏POI文字</li>
        <li class = "btn" onclick = "showIcon()">显示POI的Icon</li>
        <li class = "btn" onclick = "hideIcon()">隐藏POI的Icon</li>


function showText() {
            map.setDisplayOptions({
                poiText: true
            })
        }
        function hideText() {
            map.setDisplayOptions({
                poiText: false
            })
        }
        function showIcon() {
            map.setDisplayOptions({
                poiIcon: true
            })
        }
        function hideIcon() {
            map.setDisplayOptions({
                poiIcon: false
            })
        }
```

