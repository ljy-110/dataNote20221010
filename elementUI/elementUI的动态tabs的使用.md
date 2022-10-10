## elementUI的动态tabs页的使用，vue的动态组件的操作

有时候我们需要用到动态的tab页，结合不同的页面内容来显示。这里是使用了elementUI的动态tabs页来实现的

```html
<div class="right" v-loading="loading">
    <div class="between main-top">
          <span @click="addTab(editableTabsValue,'groupInfo（组件的名称）','tabs页的名称')">add tabs</span>
    </div>
   <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
    <el-tab-pane v-for="(item, index) in editableTabs" :key="index" :label="item.title" :name="item.name" :closable='item.closable'>
        <component :is='item.content' :objId='objId' @fatherEvent="btnclick" @delTab='delTabs'></component>
         <!-- 
		:closable='item.closable' ----通过closable来判断当前tabs是否可以关闭
		component：通过使用component元素，在根据组件中的is属性来动态的切换不同的组件。
		:is='item.content'：这是动态绑定的组件
		:objId='objId'  ----这个是组件之间的传值，父组件传值给子组件的
		@fatherEvent="btnclick" ----这是子组件对父组件的操作
		@delTab='delTabs' ----这是子组件对父组件的操作
		-->
     </el-tab-pane>
   </el-tabs>
</div>
```

```js
//---------------------引入组件的模块
import chat from './chat'
import create from './create'
import statements from './statements'
import groupInfo from './groupInfo'
import renew from './renew'
import project from './project'
export default {
  props: {},
  components: {
    chat,
    statementsGnode,
    createGnode,
    groupInfo,
    renewGnode,
    project
  },
 data() {
    return {
      editableTabsValue: '1',
      editableTabs: [{//第一个默认打开的tabs
        title: '项目通讯',//tabs页的名称
        name: '1',
        content: chat,//对应组件名称
        closable:false// 是否可以关闭，false是不可以，true是可以关闭
      }],
      tabIndex: 1,
      //动态子组件
      objId:'',
    };
  },
```

```js
addTab(targetName,name,title) {//----------------这是添加tabs页的方法，三个值对应着上面点击方法传过来的，但是也不是三个都要，第一个值是必须要传的
        let newTabName = ++this.tabIndex + '';
        if (name === 'statements') {//------------------这几个判断是我要区分开不同的组件所需要的值来做的
          this.objId = title
          this.editableTabs.push({
            title: title.name,
            name: newTabName,
            content: name,
            closable:true
          });
        } else if (name === 'renew'){
          this.objId = title
          this.editableTabs.push({
            title: '够着'+title.name,
            name: newTabName,
            content: name,
            closable:true
          });
        }else{
          this.editableTabs.push({
            title: title,
            name: newTabName,
            content: name,
            closable:true
          });
        }
        
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {//--------------这是关闭tab页的
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
    btnclick(com,item){//这个子组件点击控制父组件的方法，不同的子组件对应不同的调用
      if (com === "groupInfo") {
        this.ChatMamList();
      } else if(com === 'renewGnode'){
        let value = this.editableTabsValue
        this.addTab(value,com,item)
      }else{
        this.manageNode();
      }
    },
    delTabs(targetName){ //---------------这是子组件想要关闭当前tab页的，控制父组件的操作
      let tabs = this.editableTabs;
      let activeName;
      tabs.forEach((tab, index) => {
        if (tab.title === targetName) { //因为判断不一样
          let nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.title !== targetName);
      this.manageNode();
    },
```

以上是父组件的的代码

下面是子组件的代码

```js
props: {
    objId:{//----------------接受父组件的值
      type:Object
    }
  },
```

```js
renew(){
      let objInfo = this.objId
      this.Gnodedialog = false
      //调用父组件的方法，fatherEvent--是在父组件的的动态组件component上面的方法，注意看上面的代码
    //'renew',objInfo，都是传值
      this.$emit("fatherEvent",'renew',objInfo) 
}
```

