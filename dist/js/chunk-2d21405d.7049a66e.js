(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21405d"],{aebe:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[e.loading?n("Loader"):n("div",[n("h4",[e._v(" Карточка учреждения "+e._s(e.shortname))]),n("div",{staticClass:"q-gutter-md"},[n("button",{staticClass:"btn waves-effect waves-light",on:{click:e.mainInfo}},[e._v(" Сведения о юридическом лице ")]),e.permission?n("button",{staticClass:"btn waves-effect waves-light",on:{click:e.deleteSchool}},[e._v(" Удалить учреждение ")]):e._e()])])],1)},a=[],o=(n("b64b"),n("96cf"),n("1da1")),s={name:"SchoolCard",data:function(){return{loading:!0,shortname:"",permission:localStorage.getItem("permission")<=10}},methods:{mainInfo:function(){this.$router.push("/school/".concat(this.$route.params["card"]))},deleteSchool:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,n=confirm("Удалить данное учреждение?"),!n){t.next=7;break}return t.next=5,e.$store.dispatch("deleteSchool",e.$route.params["card"]);case 5:return t.next=7,e.$router.push("/districts");case 7:t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()}},mounted:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,n=e.$store.getters.info,r=localStorage.getItem("token"),a=e.$route.params["card"],Object.keys(n).length&&n["INN"]===a){t.next=8;break}return t.next=7,e.$store.dispatch("fetchInfo",{token:r,inn:a});case 7:n=t.sent;case 8:e.loading=!1,e.shortname=n["shortname"],t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](0),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})))()}},c=s,i=n("2877"),u=Object(i["a"])(c,r,a,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d21405d.7049a66e.js.map