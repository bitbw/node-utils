(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["subway"],{"2fa4":function(t,e,a){"use strict";a("20f6");var r=a("80d2");e["a"]=Object(r["g"])("spacer","div","v-spacer")},"332d":function(t,e,a){},"3e24":function(t,e,a){"use strict";a("332d")},"4c53":function(t,e,a){"use strict";var r=a("23e7"),n=a("857a"),i=a("af03");r({target:"String",proto:!0,forced:i("sub")},{sub:function(){return n(this,"sub","","")}})},b2d2:function(t,e,a){"use strict";a.r(e),a.d(e,"default",(function(){return E}));var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("v-card",{staticClass:"calculate-container",attrs:{flat:""}},[a("v-toolbar",{attrs:{dense:"",elevation:"0"}},[a("v-icon",{attrs:{left:"",size:"30"}},[t._v("mdi-alarm-panel-outline")]),a("v-toolbar-title",[t._v(t._s(t.$t("calculate")))]),a("v-spacer")],1),a("v-card-text",[a("v-row",[a("v-col",{attrs:{cols:"12",md:"4"}},[a("v-text-field",{attrs:{label:t.$t("subway.moneySpentEachTime"),type:"number",suffix:"￥"},model:{value:t.moneySpentEachTime,callback:function(e){t.moneySpentEachTime=t._n(e)},expression:"moneySpentEachTime"}})],1),a("v-col",{attrs:{cols:"12",md:"4"}},[a("v-text-field",{attrs:{label:t.$t("subway.totalFrequency"),type:"number",suffix:"Frequency"},model:{value:t.totalFrequency,callback:function(e){t.totalFrequency=t._n(e)},expression:"totalFrequency"}})],1),a("v-col",{attrs:{cols:"12",md:"4"}},[a("v-btn",{attrs:{color:"secondary",dark:""},on:{click:t.handleCalc}},[t._v(" "+t._s(t.$t("calculate"))+" ")])],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",md:"1"}},[a("v-toolbar-title",[t._v(t._s(t.$t("result")))])],1),a("v-col",{attrs:{cols:"12",md:"8"}},[a("v-text-field",{attrs:{disabled:"",value:t.resultMoney,suffix:"￥"}})],1)],1)],1)],1),a("v-card",{staticClass:"ladder-container",attrs:{flat:""}},[a("v-toolbar",{attrs:{dense:"",elevation:"0"}},[a("v-icon",{attrs:{left:"",size:"30"}},[t._v("mdi-animation")]),a("v-toolbar-title",[t._v(t._s(t.$t("subway.ladder")))]),a("v-spacer")],1),a("v-card-text",[a("v-row",{attrs:{align:"center"}},[a("v-col",{staticClass:"pa-0",attrs:{cols:"12"}},t._l(t.ladders,(function(e,r){return a("v-row",{key:e.name+"-"+e.id,staticClass:"ma-0",attrs:{align:"center"}},[a("v-col",{attrs:{cols:"12",md:"2"}},[a("v-text-field",{attrs:{label:t.$t("name")},model:{value:e.name,callback:function(a){t.$set(e,"name",a)},expression:"ladder.name"}})],1),a("v-col",{attrs:{cols:"12",md:"2"}},[a("v-text-field",{attrs:{label:t.$t("subway.lowerLimit"),suffix:"￥"},model:{value:e.lowerLimit,callback:function(a){t.$set(e,"lowerLimit",a)},expression:"ladder.lowerLimit"}})],1),a("v-col",{attrs:{cols:"12",md:"2"}},[a("v-text-field",{attrs:{label:t.$t("subway.upperLimit"),suffix:"￥"},model:{value:e.upperLimit,callback:function(a){t.$set(e,"upperLimit",a)},expression:"ladder.upperLimit"}})],1),a("v-col",{attrs:{cols:"12",md:"2"}},[a("v-text-field",{attrs:{label:t.$t("subway.discont"),suffix:"%"},model:{value:e.discont,callback:function(a){t.$set(e,"discont",a)},expression:"ladder.discont"}})],1),a("v-col",{attrs:{cols:"12",md:"2"}},[a("v-btn",{attrs:{icon:""},on:{click:function(e){return t.handleRemoveladder(r)}}},[a("v-icon",[t._v("mdi-trash-can")])],1)],1)],1)})),1),a("v-col",{attrs:{cols:"12"}},[a("v-btn",{attrs:{tile:""},on:{click:function(e){return t.handleAddladder()}}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-plus")]),a("span",[t._v(t._s(t.$t("add")))])],1)],1)],1)],1)],1)],1)},n=[],i=(a("13d5"),a("a434"),a("a9e3"),a("4c53"),a("5530")),l=a("d4ec"),c=a("bee2"),s=a("262e"),o=a("2caf"),d=a("9ab4"),u=a("60a3"),m=function(){function t(e){for(var a in Object(l["a"])(this,t),this.frequency=0,this.money=0,this.upperLimit=0,this.lowerLimit=0,this.discont=0,e)Object.prototype.hasOwnProperty.call(e,a)&&(this[a]=e[a])}return Object(c["a"])(t,[{key:"calc",value:function(t){var e=t.starMoney,a=t.starFrequency,r=t.moneySpentEachTime,n=t.totalFrequency;return"number"===typeof this.upperLimit?this.frequency=Math.ceil((this.upperLimit-e)/(r*(this.discont/100))):this.frequency=n-a,this.money=this.frequency*r*(this.discont/100),{currentTotalMoney:this.money+e,currentTotalFrequency:this.frequency+a}}}]),t}(),v=m,f=function(){return[new m({id:1,name:"lodder1",lowerLimit:0,upperLimit:100,discont:100}),new m({id:2,name:"lodder2",lowerLimit:100,upperLimit:150,discont:80}),new m({id:3,name:"lodder3",lowerLimit:150,upperLimit:"*",discont:50})]},p=function(t){Object(s["a"])(a,t);var e=Object(o["a"])(a);function a(){var t;return Object(l["a"])(this,a),t=e.apply(this,arguments),t.moneySpentEachTime=0,t.totalFrequency=0,t.editLadder={upperLimit:0,lowerLimit:0,discont:0,name:"",id:0},t.ladders=[],t.resultMoney=0,t}return Object(c["a"])(a,[{key:"handleCalc",value:function(){var t=this;if(this.moneySpentEachTime&&this.totalFrequency){var e=this.ladders[0],a={currentTotalMoney:e.lowerLimit,currentTotalFrequency:0},r=this.ladders.reduce((function(e,a){var r={starMoney:e.currentTotalMoney,starFrequency:e.currentTotalFrequency,moneySpentEachTime:t.moneySpentEachTime,totalFrequency:t.totalFrequency};return a.calc(r)}),a),n=r.currentTotalMoney;this.resultMoney=n}}},{key:"handleAddladder",value:function(){var t=Number(this.ladders[this.ladders.length-1].upperLimit);t=isNaN(t)?0:t,this.ladders.push(new v(Object(i["a"])(Object(i["a"])({},this.editLadder),{},{lowerLimit:t,upperLimit:"*",id:this.ladders.length+1,name:"ladder".concat(this.ladders.length+1)})))}},{key:"handleRemoveladder",value:function(t){this.ladders.splice(t,1)}},{key:"created",value:function(){this.ladders=f(),window.sub=this}}]),a}(u["c"]);p=Object(d["a"])([Object(u["a"])({})],p);var y=p,b=y,h=(a("3e24"),a("2877")),w=a("6544"),L=a.n(w),x=a("8336"),T=a("b0af"),q=a("99d9"),_=a("62ad"),k=a("a523"),F=a("132d"),$=a("0fd9"),O=a("2fa4"),j=a("8654"),S=a("71d9"),V=a("2a7f"),C=Object(h["a"])(b,r,n,!1,null,"24b7193c",null),E=C.exports;L()(C,{VBtn:x["a"],VCard:T["a"],VCardText:q["b"],VCol:_["a"],VContainer:k["a"],VIcon:F["a"],VRow:$["a"],VSpacer:O["a"],VTextField:j["a"],VToolbar:S["a"],VToolbarTitle:V["a"]})}}]);
//# sourceMappingURL=subway.ce7d93dd.js.map