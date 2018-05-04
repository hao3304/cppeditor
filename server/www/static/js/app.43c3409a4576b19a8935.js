webpackJsonp([1],{"2fqJ":function(n,t){},"7MY1":function(n,t,e){"use strict";t.a=[{name:"Hello World!",demo:'\n#include<stdio.h>\nint main()\n{\n\tprintf("hello world!\\n");\n  \treturn 0;\n}\n    ',content:"\n# Hello World!\n```C\n#include<stdio.h>               //预处理，包含头文件\nint main()                      //主函数，程序起点\n{\n    printf(\"Hello World!\\n\");   //输出字符串到标准输出\n    return 0;                   //程序返回值\n}\n```\n\n## 预处理器\n```C\n#define PI 3.14159\n#include <stdio.h>\n```\n## 函数\n```\nmain()函数\nprintf()函数\n```\n## 返回值\n\n## 语句基本构成\n```\n分号结尾\n花括号包含程序块\n```\n\n# 常量和变量\n## 常量\n```\n1,2,3\n5.0,8.0,11.5\n'a','b','c'\n'1','2','3'\n```\n## 变量属性\n```\n名称\n值\n类型\n```\n\n## 变量类型\n### 整数\n```C\nint i = 9;\n```\n### 浮点数\n```C\nfloat f = 2.3;\n```\n### 字符\n```C\nchar c = 'Z';\n```\n    "},{name:"C程序基本结构",demo:'\n    #include <stdio.h>  \nint main() {  \n    int a, b, c, score; \n    a = 90;\n    b = 100;\n    c = 90;\n    score = a*20/100 + b*30/100+c*50/100;\n    printf("%d",score);  \n    return 0;  \n} ',content:'\n    # 第二讲 C程序基本结构（续）\n## 运算和赋值表达式\n【问题描述】\n牛牛最近学习了 C++入门课程，这门课程的总成绩计算方法是：\n总成绩 = 作业成绩 × 20% + 小测成绩 × 30% + 期末考试成绩 × 50%\n牛牛想知道，这门课程自己最终能得到多少分。\n说明：\n1. 三个非负整数a、b、c，分别表示牛牛的作业成绩、小测成绩和期末考试成绩。\n2. 三项成绩满分都是 100 分。\n3.  0 ≤ a、b、c ≤ 100 且 a、b、c 都是 10 的整数倍。\n\n```C\n#include <stdio.h>  \nint main() {  \n    int a, b, c, score; \n    a = 90;\n    b = 100;\n    c = 90;\n    score = a*20/100 + b*30/100+c*50/100;\n    printf("%d",score);  \n    return 0;  \n}  \n```\n\n动动手：修改上述程序中的a,b,c的值，观察输出结果。\n\n## 循环\n\n```C\n#include <stdio.h>  \nint main() {  \n    int i; \n    for (i=0;i<10;i=i+1)\n    printf("%d\\n",i);  \n    return 0;  \n}  \n```\n## 条件表达式\n```C\n#include <stdio.h>  \nint main() {  \n    int t; \n    printf("Please input the temperature:\\n");\n    scanf("%d",&t);\n    if(t>=30)\n        printf("It\'s hot!\\n");  \n    else\n        printf("It\'s not hot!\\n");\n    return 0;  \n}  \n```\n    '}]},C5kV:function(n,t,e){"use strict";(function(n){var i=e("yl3R"),s=(e.n(i),e("2fqJ")),o=(e.n(s),e("5b+m")),a=(e.n(o),e("Nb7R")),c=(e.n(a),e("aozt")),r=e.n(c),l=e("xjgd"),d=e.n(l),u=e("7MY1");t.a={name:"compile",data:function(){return{code:"",lessons:u.a,active:0,cmOptions:{tabSize:4,mode:"text/x-c++src",theme:"material",lineNumbers:!0,matchBrackets:!0,line:!0,height:400},loading:!1,socketOpen:!1,hasListen:!1,stdout:[],type:0}},computed:{getStdout:function(){return this.stdout.join("</br>")}},methods:{renderTerminal:function(){var t=this;this.Terminal?this.Terminal.clear().greetings("欢迎使用在线C/C++编译器"):this.Terminal=n("#terminal").terminal(function(n){""!==n?t.socketOpen&&t.socket.emit("send",n):this.echo("")},{greetings:"欢迎使用在线C/C++编译器",name:"js_demo",height:"200px",prompt:"> "})},onBuild:function(){var n=this;this.code&&(this.loading=!0,this.socket.close(),this.stdout=[],r.a.post("/compile",{code:this.code}).then(function(t){var e=t.data;n.loading=!1,0==e.errno?n.onSocket(e.data):(n.stdout=[e.errmsg],n.type=1)}).catch(function(){n.loading=!1,n.$Message.error("编译错误！")}))},onSocket:function(n){var t=this;this.socketOpen=!0,this.socket.connect(),this.isBind||(this.socket.on("data",function(n){this.stdout.push(n),this.type=0}.bind(this)),this.socket.on("close",function(n){t.socket.close(),t.socketOpen=!1,t.isBind=!1,t.socket.removeAllListeners()})),this.isBind=!0,this.socket.emit("build",n)},renderLesson:function(){this.code=this.lessons[this.active].demo.replace(/(^\s*)|(\s*$)/g,""),this.stdout=[],n("#markdown").html(d()(this.lessons[this.active].content)),this.renderTerminal()},onSelect:function(n){this.active=n,this.renderLesson()}},mounted:function(){this.renderLesson(),this.socket=io("//"+window.location.host),this.socket.close()}}}).call(t,e("L7Pj"))},HjUa:function(n,t){},NHnr:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("7+uW"),s=e("xJD8"),o={render:function(){var n=this.$createElement,t=this._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var a=function(n){e("g3vj")},c=e("VU/8")(s.a,o,!1,a,null,null).exports,r=e("/ocq"),l=e("C5kV"),d={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"app"},[e("Layout",{staticStyle:{height:"100%","background-color":"#fff"}},[e("Sider",{attrs:{"hide-trigger":""}},[e("Menu",{staticStyle:{width:"100%"},attrs:{theme:"dark","active-name":n.active},on:{"on-select":n.onSelect}},[e("MenuGroup",{attrs:{title:"课程列表"}},n._l(n.lessons,function(t,i){return e("MenuItem",{key:i,attrs:{name:i}},[e("Icon",{attrs:{type:"document-text"}}),n._v("\n            "+n._s(t.name)+"\n          ")],1)}))],1)],1),n._v(" "),e("Layout",[e("Header",{staticStyle:{"background-color":"#fff"}},[e("h5",{staticClass:"title"},[n._v("C/C++基础课程")])]),n._v(" "),e("Content",{staticStyle:{padding:"0 10px","background-color":"#fff"}},[e("Row",{attrs:{getter:20}},[e("Col",{staticStyle:{padding:"0 10px"},attrs:{span:12}},[e("div",{staticClass:"markdown-body",attrs:{id:"markdown"}})]),n._v(" "),e("Col",{attrs:{span:12,id:"terminal-block"}},[e("div",{staticStyle:{position:"relative"}},[e("Spin",{directives:[{name:"show",rawName:"v-show",value:n.loading,expression:"loading"}],attrs:{fix:""}}),n._v(" "),e("codemirror",{attrs:{options:n.cmOptions},model:{value:n.code,callback:function(t){n.code=t},expression:"code"}})],1),n._v(" "),n.stdout.length>0?e("div",{staticClass:"stdout"},[e("Tabs",[e("TabPane",{attrs:{label:"输出"}},[e("Alert",{attrs:{type:0==n.type?"success":"error","show-icon":""},domProps:{innerHTML:n._s(n.getStdout)}})],1)],1)],1):n._e(),n._v(" "),e("div",{staticClass:"stdin"},[e("Button",{staticClass:"btn-run",staticStyle:{width:"100px"},attrs:{disabled:n.loading,icon:"play",type:"success"},on:{click:n.onBuild}},[n._v("编译")]),n._v(" "),e("Tabs",{attrs:{type:"card"}},[e("TabPane",{attrs:{label:"输入"}},[e("div",{attrs:{id:"terminal"}})])],1)],1)])],1)],1)],1)],1)],1)},staticRenderFns:[]};var u=function(n){e("dvls")},h=e("VU/8")(l.a,d,!1,u,null,null).exports;i.default.use(r.a);var p=new r.a({routes:[{path:"/",name:"compile",component:h}]}),f=e("HocA"),m=e.n(f),v=e("oiyU"),b=e.n(v);e("s72s"),e("HjUa"),e("WEav");e("briU"),i.default.config.productionTip=!1,i.default.use(m.a),i.default.use(b.a),new i.default({el:"#app",router:p,components:{App:c},template:"<App/>"})},Nb7R:function(n,t){},WEav:function(n,t){},dvls:function(n,t){},g3vj:function(n,t){},s72s:function(n,t){},xJD8:function(n,t,e){"use strict";(function(n){t.a={name:"App",mounted:function(){n("#progressbar").remove()}}}).call(t,e("L7Pj"))}},["NHnr"]);
//# sourceMappingURL=app.43c3409a4576b19a8935.js.map