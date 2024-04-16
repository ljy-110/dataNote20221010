css

```css
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: transparent;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: transparent;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(144, 147, 153, .3);
  background-color: rgba(144, 147, 153, .3);
}
/* 火狐滚动条 */
*{
  scrollbar-color: rgba(89, 135, 164, .5) transparent; /* 第一个颜色为滚动条的颜色， 第二个颜色为滚动条轨道的颜色 */
  scrollbar-width: thin; /* 设置比默认滚动条宽度更窄的宽度 */
}
* {
  /* color: #DEEEFF; */
}
.h-center{
  display: flex;
  align-items: center;
}
.grid__2k{
  display: grid;
  grid-template-columns: repeat(2, minmax(45%, 1fr));
  gap: 2vh;
}
.grid__2k_none{
  display: grid;
  grid-template-columns: repeat(2, minmax(45%, 1fr));
}
.grid__3k{
  display: grid;
  grid-template-columns: repeat(3, minmax(31%, 1fr));
  gap: 1vh;
}
.grid__4k{
  display: grid;
  grid-template-columns: repeat(4, minmax(23%, 1fr));
  gap: 8px;
}
.grid__5k{
  display: grid;
  grid-template-columns: repeat(5, minmax(16%, 1fr));
  gap: 15px;
}
.grid__6k{
  display: grid;
  grid-template-columns: repeat(6, minmax(15%, 1fr));
  gap: 15px;
}
.flex-wrap{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.flex-start{
  display: flex;
  width: 100%;
  justify-content: flex-start;
}
.flex-end{
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
.flex-center{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.vertical-center{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.center{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.center-duo{
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.between{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.flex{
  display: flex;
}
.flex1{
  flex:1;
}
.flex2 {
  -webkit-box-flex: 2;
  -ms-flex: 2;
  flex: 2;
}
.flex-direction{
  flex-direction:column;
}
.flex-grow{
  flex-grow:1;
}
.warn-bg-index{
  /* border: 1px double #0d9fc4; */
  background-color: #0d9fc4;
  width: 20px;
  height: 20px;
  border-radius: 5px;
}
.word-one{
  text-overflow:ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.word-two{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;				
  text-overflow: ellipsis;	
  display: -webkit-box;			
  -webkit-line-clamp: 2;		
  line-clamp: 2;					
  -webkit-box-orient: vertical;	
}

/* 边距 */
.p10{
  padding: 10px;
  box-sizing: border-box;
}
.p15{
  padding: 15px;
  box-sizing: border-box;
}
.p20{
  padding: 20px;
  box-sizing: border-box;
}
.pLR16{
  padding-left:16px;
  padding-right:16px;
  box-sizing: border-box;
}
.pLR20{
  padding-left:20px;
  padding-right:20px;
  box-sizing: border-box;
}
.pLR10{
  padding-left:10px;
  padding-right:10px;
  box-sizing: border-box;
}
.pTB10{
  padding-top:10px;
  padding-bottom:10px;
  box-sizing: border-box;
}
.pT10{
  padding-top:10px;
  box-sizing: border-box;
}
.p13{
  padding: 13px;
  box-sizing: border-box;
}
.mTop10{
  margin-top: 10px;
}
.mTop15{
  margin-top: 15px;
}
.mTop18{
  margin-top: 18px;
}
.mTop20{
  margin-top: 20px;
}
.mTop25{
  margin-top: 25px;
}
.mTop30{
  margin-top: 30px;
}
.mBot20{
  margin-bottom: 20px;
}
.mBot10{
  margin-bottom: 10px;
}
.mBot5{
  margin-bottom: 5px;
}
.mLeft10{
  margin-left: 10px;
}
.mLeft20{
  margin-left: 20px;
}
.mRight5{
  margin-right: 5px;
}
.mRight10{
  margin-right: 10px;
}
.mRight15{
  margin-right: 15px;
}
.mRight20{
  margin-right: 20px;
}
/* 字体 */
.textLfet{
  text-align: left;
}
.textRight{
  text-align: right;
}
.tcenter{
  text-align: center;
}
.font12{
  font-size: 12px;
}
.font14{
  font-size: 14px;
}
.font16{
  font-size: 16px;
}
.font18{
  font-size: 18px;
}
.font20{
  font-size: 20px;
}
.font22{
  font-size: 22px;
}
.font24{
  font-size: 24px;
}
.font32{
  font-size: 32px;
}
.font48{
  font-size: 48px;
}
.f-weight{
  font-weight: bold;
}
/*定义最上方和最下方的按钮*/
/* ::-webkit-scrollbar-button{
     background-color: #000;
     border:1px solid yellow;
} */
i {
  font-style: normal;
}
.posRel{
  position: relative;
}
.posAbs{
  position: absolute;
}
video {
  object-fit: fill;
}

.c-white{
  color: #fff;
}
.c-grey{
  color: #AAC1DA;
}
.c-def{
  color: #DEEEFF;
}
.c-38f{
  color: #33A8FF;
}
.c-49f{
  color: #43F9FF;
}
.c-FF797C{
  color: #FF797C;
}
.c-ff0000{
  color: #ff0000;
}
.c-65FFD0{
  color: #65FFD0;
}
.c-ffcf68{
  color: #ffcf68;
}
.c-64b3ff{
  color: #64b3ff;
}
.color7EB3FF{
  color: #7EB3FF;
}
.color67C23A{
  color: #67C23A;
}
.colorB4D9FF{
  color: #B4D9FF;
}
.tcenter{
  text-align: center;
}
.bgz{
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}
.bgr{
  background-repeat: repeat !important;
}
.bdz{
  box-sizing: border-box;
}
.wd-100{
  width: 100%;
}
.wd90{
  width: 90px;
}
.wd100{
  width: 100px;
}
.wd110{
  width: 110px;
}
.wd150{
  width: 150px;
}
.wd180{
  width: 180px;
}
.wh100{
  width: 100%;
  height: 100%;
}
.h100{
  height: 100%;
}
.auto{
  overflow-y: auto;
}
/* leaflet样式 */
.leaflet-container {
  background: none;
}
.finger{
  cursor:pointer;
}
.a-link{
  cursor: pointer;
  /* color: #409EFF; */
}
.a-link.active{
  color: #409EFF;
}
.a-link:hover{
  /* text-decoration: underline; */
  color: #409EFF;
}
```

