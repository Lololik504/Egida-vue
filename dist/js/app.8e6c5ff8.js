(function(e){function t(t){for(var r,o,s=t[0],i=t[1],u=t[2],l=0,f=[];l<s.length;l++)o=s[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a={app:0},c=[];function s(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-1049fe2b":"8f8676cf","chunk-2d23860a":"908c9cc4","chunk-ddcd04dc":"d3d2b97a","chunk-4367c25a":"eff9bbdf","chunk-72d31754":"da95e5df"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-1049fe2b":1,"chunk-4367c25a":1,"chunk-72d31754":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-1049fe2b":"a43b5ff4","chunk-2d23860a":"31d6cfe0","chunk-ddcd04dc":"31d6cfe0","chunk-4367c25a":"36d4fde2","chunk-72d31754":"ac26b4cd"}[e]+".css",a=i.p+r,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var u=c[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===a))return t()}var f=document.getElementsByTagName("style");for(s=0;s<f.length;s++){u=f[s],l=u.getAttribute("data-href");if(l===r||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[e],d.parentNode.removeChild(d),n(c)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=c);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=s(e);var f=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var f=0;f<u.length;f++)t(u[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("b3c3"),o=n.n(r);o.a},"0e21":function(e,t,n){},2553:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper",attrs:{id:"app"}},[n("Header",{key:e.key,staticClass:"header"}),n("router-view",{staticClass:"content"}),n("Footer",{staticClass:"footer"})],1)},a=[],c=(n("d3b7"),n("96cf"),n("1da1")),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"main-header"},[e._m(0),n("div",{staticClass:"second-row"},[n("div",{staticClass:"btn-container"},[e.isLoggedIn?e._e():n("q-btn",{staticClass:"login-but",attrs:{color:"white","text-color":"black",label:"Войти"},on:{click:function(t){return t.preventDefault(),e.toLogin(t)}}}),e.isLoggedIn?n("q-btn",{staticClass:"login-but",attrs:{color:"blue-10","text-color":"white",label:"Выйти"},on:{click:function(t){return t.preventDefault(),e.logout(t)}}}):e._e()],1),n("div",{staticClass:"to-home-text"},[n("router-link",{staticClass:"router-text",attrs:{to:"/"}},[e._v("Управление обеспечения бюджетного процесса и ресурсного сопровождения учреждений в сфере образования мэрии г. Новосибирска ")])],1)])]),n("hr")])},i=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"welcome-header"},[r("img",{staticClass:"image",attrs:{"data-entity-type":"file",src:n("dbf9")}}),r("div",{staticClass:"text-header"},[r("p",{staticClass:"welcome-header",staticStyle:{margin:"0"}},[e._v("МЭРИЯ ГОРОДА НОВОСИБИРСКА"),r("br"),e._v(" ДЕПАРТАМЕНТ ОБРАЗОВАНИЯ")]),r("br")]),r("img",{staticClass:"image",attrs:{"data-entity-type":"file",src:n("fac1")}})])}],u={name:"Header",computed:{isLoggedIn:function(){return this.$store.getters.isLoggedIn}},methods:{logout:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("logout").then((function(){t.$router.push("/login")}));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),toLogin:function(){this.$router.push("/login")}}},l=u,f=(n("b855"),n("2877")),d=n("fe09"),p=Object(f["a"])(l,s,i,!1,null,"179d35bd",null),h=p.exports;p.options.components=Object.assign(Object.create(p.options.components||null),p.options.components||{},{QBtn:d["a"]});var m=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},g=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"footer"},[n("div",{staticClass:"text"},[n("p",[e._v("Департамент образования мэрии города Новосибирска"),n("br"),n("strong",[e._v("630099, город Новосибирск, ул.Красный проспект, 34 Тел.: 227-45-00")])])])])}],v={name:"Footer"},b=v,k=(n("df70"),Object(f["a"])(b,m,g,!1,null,"2f486eea",null)),w=k.exports,y={components:{Footer:w,Header:h},data:function(){return{key:0}},methods:{update:function(){this.key+=1}},created:function(){this.$http.interceptors.response.use(void 0,function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(){throw 401===t.status&&t.config&&!t.config.__isRetryRequest&&this.$store.dispatch("logout"),t}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},_=y,x=(n("034f"),Object(f["a"])(_,o,a,!1,null,null,null)),C=x.exports,S=(n("45fc"),n("8c4f")),j=n("2f62"),I=n("bc3a"),O=n.n(I),E={actions:{login:function(e,t){return Object(c["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.prev=1,n.next=4,new Promise((function(e,n){r("auth_request"),O.a.post("http://192.168.0.2:8000/accounts/login/",t,{headers:{"Content-Type":"application/json"}}).then((function(t){var n=t.data.data,o=n.token,a=n.user,c=a["permission"];console.log(t),localStorage.setItem("token",o),localStorage.setItem("inn",a["username"]),localStorage.setItem("permission",c),O.a.defaults.headers.common["Authorization"]="Token"+o,r("auth_success",o,a),e(t)})).catch((function(e){r("auth_error"),console.log("remove"),localStorage.removeItem("token"),localStorage.removeItem("inn"),localStorage.removeItem("permission"),n(e)}))}));case 4:return n.abrupt("return",n.sent);case 7:n.prev=7,n.t0=n["catch"](1),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[1,7]])})))()},logout:function(e){return Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,new Promise((function(e){n("logout"),localStorage.removeItem("token"),localStorage.removeItem("inn"),localStorage.removeItem("permission"),delete O.a.defaults.headers.common["Authorization"],e()}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})))()}}},P={state:{info:{}},mutations:{setInfo:function(e,t){e.info=t}},actions:{fetchInfo:function(e){return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.dispatch,n=e.commit,t.prev=1,r=localStorage.getItem("token"),console.log(r),o=localStorage.getItem("inn"),console.log(o),t.next=8,new Promise((function(e,t){O.a.get("http://192.168.0.2:8000/api/school/1",{headers:{Authorization:"Token "+r,"Content-Type":"application/json",username:o,INN:o}}).then((function(t){console.log("check"),console.log(t);var r=t.data.data.school;console.log(r),n("setInfo",r),e(t)})).catch((function(e){t(e)}))}));case 8:return t.abrupt("return",t.sent);case 11:t.prev=11,t.t0=t["catch"](1),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[1,11]])})))()}},getters:{info:function(e){return e.info}}};r["a"].use(j["a"]);var $=new j["a"].Store({state:{status:"",token:localStorage.getItem("token")||"",user:{},error:null},mutations:{auth_request:function(e){e.status="loading"},auth_success:function(e,t,n){e.status="success",e.token=t,e.user=n},auth_error:function(e){e.status="error"},logout:function(e){e.status="",e.token="",e.info={}},setError:function(e,t){e.error=t},clearError:function(e){e.error=null}},getters:{isLoggedIn:function(e){return!!e.token},authStatus:function(e){return e.status},error:function(e){return e.error}},modules:{auth:E,info:P}}),A=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},L=[],R={name:"Home"},T=R,q=(n("776a"),Object(f["a"])(T,A,L,!1,null,"b96ac5d4",null)),N=q.exports;r["a"].use(S["a"]);var H=new S["a"]({mode:"history",routes:[{path:"/",name:"home",component:N},{path:"/districts",name:"districts",meta:{requiresAuth:!0},component:function(){return Promise.all([n.e("chunk-ddcd04dc"),n.e("chunk-4367c25a")]).then(n.bind(null,"a47a"))}},{path:"/districts/:district",name:"one_district",meta:{requiresAuth:!0},component:function(){return Promise.all([n.e("chunk-ddcd04dc"),n.e("chunk-72d31754")]).then(n.bind(null,"78d4"))},props:!0},{path:"/login",name:"login",component:function(){return n.e("chunk-1049fe2b").then(n.bind(null,"a55b"))}},{path:"/school",name:"school",meta:{requiresAuth:!0},component:function(){return n.e("chunk-2d23860a").then(n.bind(null,"feb7"))}}]});H.beforeEach((function(e,t,n){if(e.matched.some((function(e){return e.meta.requiresAuth}))){if($.getters.isLoggedIn)return void n();n("/login")}else n()}));var z=H,B=(n("0e21"),n("e54f"),n("b05d"));r["a"].use(B["a"],{config:{},components:{},directives:{},plugins:{}});n("6885");r["a"].prototype.$http=O.a;var D=localStorage.getItem("token");D&&(r["a"].prototype.$http.defaults.headers.common["Authorization"]=D),r["a"].config.productionTip=!1,new r["a"]({router:z,store:$,render:function(e){return e(C)}}).$mount("#app")},"65db":function(e,t,n){},"776a":function(e,t,n){"use strict";var r=n("65db"),o=n.n(r);o.a},b3c3:function(e,t,n){},b855:function(e,t,n){"use strict";var r=n("2553"),o=n.n(r);o.a},dbf9:function(e,t,n){e.exports=n.p+"img/gerb.1e06e495.png"},df70:function(e,t,n){"use strict";var r=n("fdb8"),o=n.n(r);o.a},fac1:function(e,t,n){e.exports=n.p+"img/gerb-2.41a94b77.png"},fdb8:function(e,t,n){}});
//# sourceMappingURL=app.8e6c5ff8.js.map