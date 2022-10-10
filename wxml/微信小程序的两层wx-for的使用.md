微信小程序的两层`wx-for`的使用

微信小程序需要用到两次循环来获取页面数据，第二次循环的时候使用`wx:for-item="pro"`来命名别名

```html
<view>
 <van-grid square border="{{ false }}" column-num="3" wx:for="{{ list }}" wx:key='item' gutter="{{5}}">
    <view style="font-size:14px;height:40px;line-height:40px;">{{filter.format(item.save_time*1000,'YY-MM-DD HH:SS')}}</view>
    <van-grid-item use-slot  wx:for="{{ item.progress_images }}" wx:key='idx' wx:for-item="pro">
       <image src='{{imgUrl+pro}}' bindtap="getImage" data-url="{{imgUrl+pro}}" lazy-load="true" style="width:98%;height:110px;"></image>
    </van-grid-item>
 </van-grid>
</view>
```

