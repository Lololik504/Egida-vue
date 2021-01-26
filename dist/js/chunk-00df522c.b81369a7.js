(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00df522c"],{"138e":function(t,a,n){},b40b:function(t,a,n){"use strict";n("138e")},feb7:function(t,a,n){"use strict";n.r(a);var s=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"container"},[t.loading?n("Loader"):n("div",[n("h4",[t._v("Учереждение "),n("router-link",{attrs:{to:"/schoolcard/"+this.$route.params["school"]}},[t._v(" "+t._s(t.mainInfo.shortname))])],1),n("div",{staticClass:"card"},[n("h4",[t._v("Основные сведения учреждения")]),n("table",{staticClass:"main-info"},[n("tbody",[n("tr",{staticClass:"inn"},[n("th",[t._v("ИНН")]),n("td",[t._v(t._s(t.mainInfo.INN))])]),n("tr",{staticClass:"inn"},[n("th",[t._v("Краткое название")]),n("td",[t._v(t._s(t.mainInfo.shortname))])]),n("tr",{staticClass:"inn"},[n("th",[t._v("Полное название")]),n("td",[t._v(t._s(t.mainInfo.name))])]),n("tr",{staticClass:"inn"},[n("th",[t._v("Вид организационно-правовой формы")]),n("td",[t._v(t._s(t.mainInfo.form_type))])]),n("tr",{staticClass:"inn"},[n("th",[t._v("Вид образования")]),n("td",[t._v(t._s(t.mainInfo.edu_type))])])])]),n("br"),n("button",{staticClass:"btn waves-effect waves-light right",on:{click:function(a){return a.preventDefault(),t.toUpdateInfo(a)}}},[t._v(" Редактировать основные сведения ")])]),n("div",{staticClass:"card"},[n("h4",[t._v("Контактные данные")]),n("div",{staticClass:"director"},[n("h5",[t._v("Руководство образовательного учреждения")]),n("table",{staticClass:"main-info"},[n("tbody",[n("tr",{staticClass:"fio"},[n("th",[t._v("ФИО")]),n("td",[t._v(t._s(t.contactInfo.director.last_name)+" "+t._s(t.contactInfo.director.first_name)+" "+t._s(t.contactInfo.director.patronymic)+" ")])]),n("tr",{staticClass:"phone"},[n("th",[t._v("Телефон рабочий")]),n("td",[t._v(t._s(t.contactInfo.director.phone))])]),n("tr",{staticClass:"email"},[n("th",[t._v("Электронная почта")]),n("td",[t._v(t._s(t.contactInfo.director.email))])])])])]),n("div",{staticClass:"zavhoz"},[n("h5",[t._v("Заместитель директора по административно-хозяйственной части / завхоз")]),n("table",{staticClass:"main-info"},[n("tbody",[n("tr",{staticClass:"fio"},[n("th",[t._v("ФИО")]),n("td",[t._v(t._s(t.contactInfo.zavhoz.last_name)+" "+t._s(t.contactInfo.zavhoz.first_name)+" "+t._s(t.contactInfo.zavhoz.patronymic)+" ")])]),n("tr",{staticClass:"phone"},[n("th",[t._v("Телефон рабочий")]),n("td",[t._v(t._s(t.contactInfo.zavhoz.phone))])]),n("tr",{staticClass:"email"},[n("th",[t._v("Электронная почта")]),n("td",[t._v(t._s(t.contactInfo.zavhoz.email))])])])])]),n("div",{staticClass:"updater"},[n("h5",[t._v("Ответственный за заполнение данных")]),n("table",{staticClass:"main-info"},[n("tbody",[n("tr",{staticClass:"fio"},[n("th",[t._v("ФИО")]),n("td",[t._v(t._s(t.contactInfo.updater.last_name)+" "+t._s(t.contactInfo.updater.first_name)+" "+t._s(t.contactInfo.updater.patronymic)+" ")])]),n("tr",{staticClass:"phone"},[n("th",[t._v("Телефон рабочий")]),n("td",[t._v(t._s(t.contactInfo.updater.phone))])]),n("tr",{staticClass:"email"},[n("th",[t._v("Электронная почта")]),n("td",[t._v(t._s(t.contactInfo.updater.email))])]),n("tr",{staticClass:"prikaz"},[n("th",[t._v("Приказ о назначении ответственного")]),n("td",[t._v(t._s(t.contactInfo.updater.prikaz))])])])]),n("br")]),n("div",{staticClass:"bookkeeper"},[n("h5",[t._v("Главный бухгалтер")]),n("table",{staticClass:"main-info"},[n("tbody",[n("tr",{staticClass:"fio"},[n("th",[t._v("ФИО")]),n("td",[t._v(t._s(t.contactInfo.bookkeeper.last_name)+" "+t._s(t.contactInfo.bookkeeper.first_name)+" "+t._s(t.contactInfo.bookkeeper.patronymic)+" ")])]),n("tr",{staticClass:"phone"},[n("th",[t._v("Телефон рабочий")]),n("td",[t._v(t._s(t.contactInfo.bookkeeper.phone))])]),n("tr",{staticClass:"email"},[n("th",[t._v("Электронная почта")]),n("td",[t._v(t._s(t.contactInfo.bookkeeper.email))])])])])]),n("br"),n("button",{staticClass:"btn waves-effect waves-light right",on:{click:function(a){return a.preventDefault(),t.toUpdateContacts(a)}}},[t._v(" Редактировать контактные данные ")])]),n("div",{staticClass:"card"},[n("h4",[t._v("Реквизиты, адреса учреждения")]),n("table",{staticClass:"main-info"},[n("tbody",[n("tr",{staticClass:"site"},[n("th",[t._v("Официальный сайт")]),n("td",[t._v(t._s(t.requisites.site))])]),n("tr",{staticClass:"address"},[n("th",[t._v("Юридический адрес")]),n("td",[t._v(t._s(t.requisites.street)+" "+t._s(t.requisites.street_number))])]),n("tr",{staticClass:"district"},[n("th",[t._v("Территориальная принадлежность")]),n("td",[t._v(t._s(t.requisites.district))])]),n("tr",{staticClass:"date"},[n("th",[t._v("Дата образования юр.лица")]),n("td",[t._v(t._s(t.requisites.date))])])])]),n("br"),n("button",{staticClass:"btn waves-effect waves-light right",on:{click:function(a){return a.preventDefault(),t.toUpdateRequisites(a)}}},[t._v(" Редактировать реквизиты ")])])])],1)},e=[],o=(n("b0c0"),n("96cf"),n("1da1")),i={name:"school",data:function(){return{mainInfo:{INN:null,form_type:null,edu_type:null,shortname:null,name:null},requisites:{street:null,street_number:null,district:null,site:null,date:null},contactInfo:{director:{first_name:null,last_name:null,patronymic:null,phone:null,email:null},zavhoz:{first_name:null,last_name:null,patronymic:null,phone:null,email:null},updater:{first_name:null,last_name:null,patronymic:null,phone:null,email:null,prikaz:null},bookkeeper:{first_name:null,last_name:null,patronymic:null,phone:null,email:null}},loading:!0}},mounted:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n,s,e,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,n=localStorage.getItem("token"),s=t.$route.params["school"],a.next=5,t.$store.dispatch("fetchInfo",{token:n,inn:s});case 5:return e=a.sent,a.next=8,t.$store.dispatch("fetchPersonal",s);case 8:o=a.sent,t.mainInfo.INN=e["INN"],t.mainInfo.name=e["name"],t.mainInfo.edu_type=e["edu_type"],t.mainInfo.form_type=e["form_type"],t.mainInfo.shortname=e["shortname"],t.contactInfo.director=o["director"],t.contactInfo.zavhoz=o["zavhoz"],t.contactInfo.updater=o["updater"],t.contactInfo.bookkeeper=o["bookkeeper"],t.requisites.district=e["district"],t.loading=!1,a.next=25;break;case 22:a.prev=22,a.t0=a["catch"](0),console.log(a.t0);case 25:case"end":return a.stop()}}),a,null,[[0,22]])})))()},methods:{toUpdateInfo:function(){this.$router.push("/update_school_info/".concat(this.$route.params["school"]))},toUpdateContacts:function(){this.$router.push("/update_contact_info/".concat(this.$route.params["school"]))},toUpdateRequisites:function(){this.$router.push("/update_requisite_info/".concat(this.$route.params["school"]))}}},c=i,r=(n("b40b"),n("2877")),l=Object(r["a"])(c,s,e,!1,null,"9a38ac76",null);a["default"]=l.exports}}]);
//# sourceMappingURL=chunk-00df522c.b81369a7.js.map