(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["layout-components-topPanel-UserInfo-vue","layout-components-TopPanel-vue"],{"05ce":function(e,t,a){},5530:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));a("a4d3"),a("4de4"),a("4160"),a("e439"),a("dbb4"),a("b64b"),a("159b");function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}},a672:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("router-link",{staticClass:"user",attrs:{to:"/"+e.$store.state.user.data.route+"/profile"}},[a("div",{staticClass:"avatar"},[e.user.avatar?a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.imagesUrl+e.user.avatar.avatar_mini,expression:"imagesUrl + user.avatar.avatar_mini"}],staticClass:"lazyload",attrs:{alt:""}}):a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:"/images/avatar_default_mini.jpg",expression:"'/images/avatar_default_mini.jpg'"}],staticClass:"lazyload",attrs:{alt:""}}),a("div",{staticClass:"icon"},[a("svg",[a("use",{attrs:{"xlink:href":"/images/sprite.svg#ic_settings"}})])])])])},n=[],s=a("5530"),i=(a("05ce"),a("2f62")),o={name:"topPanelUserInfo",data:function(){return{imagesUrl:"https://api.doctrine.im"}},computed:Object(s["a"])({},Object(i["b"])({user:"user/getData"}))},c=o,u=a("2877"),l=Object(u["a"])(c,r,n,!1,null,null,null);t["default"]=l.exports},dbb4:function(e,t,a){var r=a("23e7"),n=a("83ab"),s=a("56ef"),i=a("fc6a"),o=a("06cf"),c=a("8418");r({target:"Object",stat:!0,sham:!n},{getOwnPropertyDescriptors:function(e){var t,a,r=i(e),n=o.f,u=s(r),l={},p=0;while(u.length>p)a=n(r,t=u[p++]),void 0!==a&&c(l,t,a);return l}})}}]);
//# sourceMappingURL=layout-components-topPanel-UserInfo-vue.dac6f672.js.map