```js
</body>
</html>
<script>
var map = new BMapGL.Map('container', {
    restrictCenter: false
});
var point = new BMapGL.Point(118.6614, 36.2190);
map.centerAndZoom(point, 8);
map.enableScrollWheelZoom();

var citys = ['济南市', '青岛市', '烟台市', '潍坊市', '淄博市', '威海市', '济宁市', '东营市',
    '泰安市', '德州市', '聊城市', '滨州市', '枣庄市', '菏泽市', '日照市', '莱芜市', '临沂市'];
var bdary = new BMapGL.Boundary();
bdary.get('山东省', function (rs) {
    // 绘制行政区
    map.clearOverlays();
    var count = rs.boundaries.length;
    if (count === 0) {
        alert('未能获取当前输入行政区域');
        return;
    }
    var pointArray = [];
    for (var i = 0; i < count; i++) {
        var ply = new BMapGL.Polygon(rs.boundaries[i], {strokeWeight: 1, strokeColor: '#90c8f1'}); // 建立多边形覆盖物
        map.addOverlay(ply);
        pointArray = pointArray.concat(ply.getPath());
    }
    map.setViewport(pointArray); // 调整视野
    // 绘制带高度的点
    var cityGeo = new BMapGL.Geocoder();
    for (let i = 0; i < citys.length; i++) {
        cityGeo.getPoint(citys[i], function (point) { // 地址解析获取对应经纬度
            var pt = new BMapGL.Point(point.lng, point.lat);
            var marker = new BMapGL.Marker3D(pt, Math.round(Math.random()) * 130000, {
                size: 50,
                shape: 'BMAP_SHAPE_CIRCLE',
                fillColor: '#454399',
                fillOpacity: 0.6
            });
                    var pt = new BMapGL.Point(point.lng, point.lat);
            var marker = new BMapGL.Marker3D(pt, Math.round(Math.random()) * 130000, {
                size: 50,
                shape: 'BMAP_SHAPE_CIRCLE',
                fillColor: '#454399',
                fillOpacity: 0.6
            });
                      // 添加鼠标事件
            marker.addEventListener('mouseover', function(e) {
                e.target.setFillColor('#f00');
            });
            marker.addEventListener('mouseout', function(e) {
                e.target.setFillColor('#454399');
            })
            marker.addEventListener('click', function(e) {
                alert('click!');
            })
            map.addOverlay(marker);
        });
    }
      
       
```

