vue+WebSocket创建实现实时通讯

```js
//websocket
    async initWebSocket() {
      if (websock) {
        return;
      }
      if (!const_chatid) return;
      if (typeof WebSocket === "undefined") {
        console.error("您的浏览器不支持WebSocket");
        return false;
      }
      try {
        let params = {
          user_id: localStorage.user_id,
          s_id: localStorage.s_id,
          chatid: this.token_y,
        };
        let tokenRet = await this.$api.teaback.getChatRoomWebSocketListenToken(params);
        if (tokenRet && tokenRet.ret && tokenRet.listen_token) {
          let wsuri = this.$api.teaback.createWSChatListenUrl(tokenRet.listen_token);
          websock = new WebSocket(wsuri);
          websock.onopen = this.websocketonopen;
          websock.onmessage = this.websocketonmessage;
          websock.onerror = this.websocketonerror;
          websock.onclose = this.websocketclose;
        } else if (tokenRet.msg === "chatroom is alread baned") {
          this.msg = "chatroom is alread baned";
          return;
        } else {
          console.log("initWebSocket-get-ws-token failed:" + JSON.stringify(tokenRet));
          if (tokenRet.chat_vip_level && tokenRet.msg && tokenRet.msg.indexOf("less")) {
            console.log("visit pm failed");
            websock = null;
            exitFlag = true;
            return;
          } else {
          }
          websock = null;
          if (!exitFlag) setTimeout(this.initWebSocket, restart_time);
        }
      } catch (ex) {
        console.log("start websocket-exception:" + ex);
        // let array = JSON.parse(localStorage.getItem("error"));
        // console.log(array);
        // array.push(ex.message);
        // localStorage.setItem("error", JSON.stringify(array));
        if (!exitFlag) setTimeout(this.initWebSocket, restart_time);
      }
    },
    callKeepAlive() {
      this.killKeepAlive();
      keepalive_id = setInterval(function () {
        if (websock) websock.send("keepalive");
      }, 9000);
      if (websock) websock.send("keepalive");
    },
    killKeepAlive() {
      if (keepalive_id) clearInterval(keepalive_id);
      keepalive_id = null;
    },
    //连接成功
    async websocketonopen() {
      console.log("WebSocket连接成功");
      this.imgStatus = true;
      this.callKeepAlive();
    },
    //接收后端返回的数据
    async websocketonmessage(e) {
      let data = e.data;
      if (e.data.indexOf("mem_alive_cnt") !== -1) {
        this.cnt = e.data.split(":")[1];
      }
      this.imgStatus = true;
      let dataJson = null;
      try {
        dataJson = JSON.parse(data);
        // if(newMsgObjFunc) newMsgObjFunc(dataJson)
        // dataJson =
      } catch (ex) {
        // console.log("dataJson parse failed:" + ex);
        return;
      }
      // if(newMsgObjFunc) newMsgObjFunc(dataJson)
      console.log(dataJson);
      let obj = {
        token: this.token_y,
        height: dataJson.height,
        create_time_i: dataJson.time_i,
        create_time: dataJson.time,
        msg_info: dataJson,
        user_id: dataJson.from,
        //msg_obj:dataJson
      };
      //let list = this.chatRexord;
      let isExists = false;
      for (let i = 0; this.chatMsg && i < this.chatMsg.length; i++) {
        //高度一致的话，就不重复了
        if (obj.height == this.chatMsg[i].height) {
          isExists = true;
          break;
        }
      }
      if (!isExists) {
        // this.chatMsg.push(obj);
        this.getChatInfo(this.token_y);
        this.expandUserData();
        this.updateReadedHeight(dataJson.height);
        return;
      }
    },
    //连接建立失败重连
    async websocketonerror(e) {
      console.log(`连接失败的信息：`, e);
      //this.initWebSocket() // 连接失败后尝试重新连接
      this.imgStatus = false;
      websock = null;
      this.killKeepAlive();
      if (!exitFlag) setTimeout(this.initWebSocket, restart_time);
    },
    //关闭连接
    async websocketclose(e) {
      console.log("断开连接", e);
      websock = null;
      this.imgStatus = false;
      setTimeout(this.initWebSocket, restart_time);
      this.killKeepAlive();
    },
```

或者是

```js
const restart_time = 1000;
async function initWebSocket(){
    // console.log('into initWebSocket function')
    if(websock)
	{
        notice_user_ws_status(user_keepalive)
        return ;
    }
    if(typeof(WebSocket) === "undefined"){
        console.error("您的浏览器不支持WebSocket")
        return false
    }

    try{
        let params = {user_id:localStorage.user_id,s_id:localStorage.s_id};
        let tokenRet = await api.post(urls.ws_user_listen,params,{'Content-Type': 'application/x-www-form-urlencoded'});//token
		// console.log(tokenRet)
        if(tokenRet && tokenRet.ret && tokenRet.listen_token)
        {
            let wsuri = urls.ws_host_path_0+'/userchatlist/ws/svr?token='+tokenRet.listen_token;
            websock = new WebSocket(wsuri)
            websock.onopen = websocketonopen
            websock.onmessage = websocketonmessage
            websock.onerror = websocketonerror
            websock.onclose = websocketclose
        }else{
            // console.log('initWebSocket-get-ws-token failed:'+JSON.stringify(tokenRet))
            websock  = null;
            setTimeout(initWebSocket,restart_time);
        }   
    }catch(ex){
        // console.log('start websocket-exception:'+ex)
        setTimeout(initWebSocket,restart_time);
    }
}
let keepalive_id = null;
function callKeepAlive()
{
    killKeepAlive();
    keepalive_id = setInterval(function(){
        if(websock) websock.send('keepalive')
    },9000)

    if(websock) websock.send('keepalive')
}
function killKeepAlive()
{
    if(keepalive_id) clearInterval(keepalive_id)
    keepalive_id = null;
}
//连接成功
function websocketonopen(){ 
    console.log('WebSocket连接成功')
    user_keepalive = 1;
    notice_user_ws_status(user_keepalive)
    callKeepAlive();

}
//接收后端返回的数据
function websocketonmessage(e){ 
    let data = e.data;
    // console.log('websocketonmessage:'+data)

    user_keepalive = 1;
    notice_user_ws_status(user_keepalive)

    let dataJson = null;
    try{
        dataJson = JSON.parse(data)
    }catch(ex){
        // console.log('dataJson parse failed:'+ex)
    }

    // console.log('dataJSON:'+JSON.stringify(dataJson))
    if(newMsgObjFunc) newMsgObjFunc(dataJson)

    // 在这里使用后端返回的数据，对数据进行处理渲染
}
//连接建立失败重连
function websocketonerror(e){
    console.log(`连接失败的信息：`, e)
    //this.initWebSocket() // 连接失败后尝试重新连接
    user_keepalive = 0;
    notice_user_ws_status(user_keepalive)
    websock  = null;
    setTimeout(initWebSocket,restart_time);
    killKeepAlive();
}
//关闭连接
function websocketclose(e){ 
    console.log('断开连接',e)
    websock  = null;
    user_keepalive = 0;
    notice_user_ws_status(user_keepalive)
    setTimeout(initWebSocket,restart_time);
    killKeepAlive();
}
```

