(function(e){function t(t){for(var r,o,u=t[0],s=t[1],i=t[2],l=0,f=[];l<u.length;l++)o=u[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,i||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(c.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={app:0},a={app:0},c=[];function u(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-2d0aa5b8":"cb34e5d4","chunk-4367c25a":"8095192b","chunk-72d31754":"685f06b7","chunk-2d23860a":"9cd75e81","chunk-5105e2de":"6952241d"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-4367c25a":1,"chunk-72d31754":1,"chunk-5105e2de":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0aa5b8":"31d6cfe0","chunk-4367c25a":"36d4fde2","chunk-72d31754":"ac26b4cd","chunk-2d23860a":"31d6cfe0","chunk-5105e2de":"d67f4e24"}[e]+".css",a=s.p+r,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var i=c[u],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===r||l===a))return t()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){i=f[u],l=i.getAttribute("data-href");if(l===r||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[e],d.parentNode.removeChild(d),n(c)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=c);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=u(e);var f=new Error;i=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var d=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var f=0;f<i.length;f++)t(i[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("b3c3"),o=n.n(r);o.a},"07c5":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r="https://egida.herokuapp.com"},"0e21":function(e,t,n){},2553:function(e,t,n){},"47be":function(e,t,n){"use strict";var r=n("adde"),o=n.n(r);o.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper",attrs:{id:"app"}},[n("Header",{key:e.key,staticClass:"header"}),n("router-view",{staticClass:"content"}),n("Footer",{staticClass:"footer"})],1)},a=[],c=(n("d3b7"),n("96cf"),n("1da1")),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"main-header"},[e._m(0),n("div",{staticClass:"second-row"},[n("div",{staticClass:"btn-container"},[e.isLoggedIn?e._e():n("q-btn",{staticClass:"login-but",attrs:{color:"white","text-color":"black",label:"Войти"},on:{click:function(t){return t.preventDefault(),e.toLogin(t)}}}),e.isLoggedIn?n("q-btn",{staticClass:"login-but",attrs:{color:"blue-10","text-color":"white",label:"Выйти"},on:{click:function(t){return t.preventDefault(),e.logout(t)}}}):e._e()],1),n("div",{staticClass:"to-home-text"},[n("router-link",{staticClass:"router-text",attrs:{to:"/"}},[e._v("Управление обеспечения бюджетного процесса и ресурсного сопровождения учреждений в сфере образования мэрии г. Новосибирска ")])],1)])]),n("hr")])},s=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"welcome-header"},[r("img",{staticClass:"image",attrs:{"data-entity-type":"file",src:n("dbf9")}}),r("div",{staticClass:"text-header"},[r("p",{staticClass:"welcome-header",staticStyle:{margin:"0"}},[e._v("МЭРИЯ ГОРОДА НОВОСИБИРСКА"),r("br"),e._v(" ДЕПАРТАМЕНТ ОБРАЗОВАНИЯ")]),r("br")]),r("img",{staticClass:"image",attrs:{"data-entity-type":"file",src:n("fac1")}})])}],i={name:"Header",computed:{isLoggedIn:function(){return this.$store.getters.isLoggedIn}},methods:{logout:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("logout").then((function(){t.$router.push("/login")}));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),toLogin:function(){this.$router.push("/login")}}},l=i,f=(n("b855"),n("2877")),d=n("fe09"),p=Object(f["a"])(l,u,s,!1,null,"179d35bd",null),h=p.exports;p.options.components=Object.assign(Object.create(p.options.components||null),p.options.components||{},{QBtn:d["a"]});var m=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},g=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"footer"},[n("div",{staticClass:"text"},[n("p",[e._v("Департамент образования мэрии города Новосибирска"),n("br"),n("strong",[e._v("630099, город Новосибирск, ул.Красный проспект, 34 Тел.: 227-45-00")])])])])}],v={name:"Footer"},b=v,k=(n("df70"),Object(f["a"])(b,m,g,!1,null,"2f486eea",null)),w=k.exports,y={components:{Footer:w,Header:h},data:function(){return{key:0}},methods:{update:function(){this.key+=1}},created:function(){this.$http.interceptors.response.use(void 0,function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(){throw 401===t.status&&t.config&&!t.config.__isRetryRequest&&this.$store.dispatch("logout"),t}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},_=y,x=(n("034f"),Object(f["a"])(_,o,a,!1,null,null,null)),C=x.exports,j=(n("45fc"),n("8c4f")),O=n("2f62"),S=n("bc3a"),I=n.n(S),E=n("07c5"),P={actions:{login:function(e,t){return Object(c["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.prev=1,n.next=4,new Promise((function(e,n){r("auth_request"),I.a.post(E["a"]+"/accounts/login/",t,{headers:{"Content-Type":"application/json"}}).then((function(t){var n=t.data.data,o=n.token,a=n.user,c=a["permission"];localStorage.setItem("token",o),localStorage.setItem("inn",a["username"]),localStorage.setItem("permission",c),I.a.defaults.headers.common["Authorization"]="Token"+o,r("auth_success",o,a),e(t)})).catch((function(e){r("auth_error"),console.log("remove"),localStorage.clear(),n(e)}))}));case 4:return n.abrupt("return",n.sent);case 7:n.prev=7,n.t0=n["catch"](1),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[1,7]])})))()},logout:function(e){return Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,new Promise((function(e){n("logout"),console.log("logout"),localStorage.clear(),delete I.a.defaults.headers.common["Authorization"],e()}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})))()}}},$={state:{info:{}},mutations:{setInfo:function(e,t){e.info=t}},actions:{fetchInfo:function(e){return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.prev=1,r=localStorage.getItem("token"),o=localStorage.getItem("inn"),t.next=6,new Promise((function(e,t){I.a.get(E["a"]+"/api/school/1",{headers:{Authorization:"Token "+r,"Content-Type":"application/json",username:o,INN:o}}).then((function(t){console.log("check");var r=t.data.data.school;console.log(r),n("setInfo",r),e(t)})).catch((function(e){t(e)}))}));case 6:return t.abrupt("return",t.sent);case 9:t.prev=9,t.t0=t["catch"](1),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[1,9]])})))()}},getters:{info:function(e){return e.info}}};r["a"].use(O["a"]);var A=new O["a"].Store({state:{status:"",token:localStorage.getItem("token")||"",user:{},error:null},mutations:{auth_request:function(e){e.status="loading"},auth_success:function(e,t,n){e.status="success",e.token=t,e.user=n},auth_error:function(e){e.status="error"},logout:function(e){e.status="",e.token="",e.user={}},setError:function(e,t){e.error=t},clearError:function(e){e.error=null}},getters:{isLoggedIn:function(e){return!!e.token},authStatus:function(e){return e.status},error:function(e){return e.error},username:function(e){return e.user["username"]}},modules:{auth:P,info:$}}),L=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},R=[],T={name:"Home",mounted:function(){"15"===localStorage.getItem("permission")&&this.$router.push("/school")}},q=T,N=(n("47be"),Object(f["a"])(q,L,R,!1,null,"f5d99808",null)),H=N.exports;r["a"].use(j["a"]);var z=new j["a"]({mode:"history",routes:[{path:"/",name:"home",component:H},{path:"/districts",name:"districts",meta:{requiresAuth:!0},component:function(){return Promise.all([n.e("chunk-2d0aa5b8"),n.e("chunk-4367c25a")]).then(n.bind(null,"a47a"))}},{path:"/districts/:district",name:"one_district",meta:{requiresAuth:!0},component:function(){return Promise.all([n.e("chunk-2d0aa5b8"),n.e("chunk-72d31754")]).then(n.bind(null,"78d4"))},props:!0},{path:"/login",name:"login",component:function(){return n.e("chunk-5105e2de").then(n.bind(null,"a55b"))}},{path:"/school",name:"school",meta:{requiresAuth:!0},component:function(){return n.e("chunk-2d23860a").then(n.bind(null,"feb7"))}}]});z.beforeEach((function(e,t,n){if(e.matched.some((function(e){return e.meta.requiresAuth}))){if(A.getters.isLoggedIn)return void n();n("/login")}else n()}));var B=z,D=(n("0e21"),n("e54f"),n("b05d"));r["a"].use(D["a"],{config:{},components:{},directives:{},plugins:{}});n("6885");r["a"].prototype.$http=I.a;var F=localStorage.getItem("token");F&&(r["a"].prototype.$http.defaults.headers.common["Authorization"]=F),r["a"].config.productionTip=!1,new r["a"]({router:B,store:A,render:function(e){return e(C)}}).$mount("#app")},adde:function(e,t,n){},b3c3:function(e,t,n){},b855:function(e,t,n){"use strict";var r=n("2553"),o=n.n(r);o.a},dbf9:function(e,t,n){e.exports=n.p+"img/gerb.1e06e495.png"},df70:function(e,t,n){"use strict";var r=n("fdb8"),o=n.n(r);o.a},fac1:function(e,t,n){e.exports=n.p+"img/gerb-2.41a94b77.png"},fdb8:function(e,t,n){}});
//# sourceMappingURL=app.474c7ef5.js.map