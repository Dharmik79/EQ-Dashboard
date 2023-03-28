(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(t,e,n){"use strict";n.r(e);var r=n(1),a=n.n(r),o=n(59),c=n.n(o),i=n(60),l=n(3);n(87),n(88);var u=function(t){var e=t.count,n=t.data,o=(t.geo,t.setGeo),c=Object(r.useState)(0),i=Object(l.a)(c,2),u=i[0],s=i[1],f={};n.forEach(function(t){var e=t.geometry.coordinates[1].toFixed(1),n=t.geometry.coordinates[0].toFixed(1),r=t.properties.place,a="".concat(e,",").concat(n),o=t.properties.mag;o>u&&s(o),f[a]?f[a].count+=1:f[a]={latitude:e,longitude:n,count:1,place:r}});var h=Object.values(f).sort(function(t,e){return e.count-t.count}).slice(0,5);return a.a.createElement("div",{className:"text"},a.a.createElement("div",{className:"text-design"},a.a.createElement("p",{className:"h2"},"WORLD'S ",a.a.createElement("br",null),"EARTHQUAKES"," "),a.a.createElement("span",{className:"hot-zones"},"Data as 4 PM(PST), March 20, 2023"),a.a.createElement("div",{className:"earthquakestats"},a.a.createElement("hr",null),a.a.createElement("div",{className:"statsdata"},a.a.createElement("div",{className:"dataview"},a.a.createElement("span",null,u),a.a.createElement("span",null,"Max Magnitude")),a.a.createElement("div",{className:"dataview"},a.a.createElement("span",null,e),a.a.createElement("span",null,"Total Count"))),a.a.createElement("hr",null)),a.a.createElement("div",{className:"hot-zones"},a.a.createElement("p",null,"HOT ZONES:"),a.a.createElement("ul",null,a.a.createElement("li",{onClick:function(){h[0]&&o({lat:h[0].latitude,long:h[0].longitude})}},h[0]&&h[0].place),a.a.createElement("li",{onClick:function(){h[1]&&o({lat:h[1].latitude,long:h[1].longitude})}},h[1]&&h[1].place),a.a.createElement("li",{onClick:function(){h[2]&&o({lat:h[2].latitude,long:h[2].longitude})}},h[2]&&h[2].place),a.a.createElement("li",{onClick:function(){h[3]&&o({lat:h[3].latitude,long:h[3].longitude})}},h[3]&&h[3].place),a.a.createElement("li",{onClick:function(){h[4]&&o({lat:h[4].latitude,long:h[4].longitude})}},h[4]&&h[4].place)))))},s=n(112),f=n(113),h=n(106),d=n(114),m=n(8),p=n.n(m),g=(n(53),n(65)),v=(n(89),new p.a.Icon({iconUrl:"./earthquake.svg",iconSize:[20,20]})),y={},b=function(t,e){return y[t]||(y[t]=p.a.divIcon({html:'<div class="cluster-marker" style="width: '.concat(e,"px; height: ").concat(e,'px;">\n        ').concat(t,"\n      </div>")})),y[t]};var E=function(t){var e=t.data,n=t.geo,o=(t.setGeo,t.selectedRange),c=Object(r.useState)(null),i=Object(l.a)(c,2),u=i[0],m=i[1],p=Object(r.useState)(5),y=Object(l.a)(p,2),E=y[0],w=y[1],O=Object(r.useRef)();function j(){var t=O.current.leafletElement,e=t.getBounds(),n=t.getZoom();m([e.getSouthWest().lng,e.getSouthWest().lat,e.getNorthEast().lng,e.getNorthEast().lat]),n<2?(t.setZoom(2),w(2)):w(n)}Object(r.useEffect)(function(){j()},[]);var x=Object(g.a)({points:e?e.features.filter(function(t){return!o||t.properties.mag>=o[0]&&t.properties.mag<=o[1]}):[],bounds:u,zoom:E,options:{radius:75,maxZoom:17,minZoom:3}}),k=x.clusters,S=x.supercluster;return a.a.createElement("div",{className:"map",style:{height:"100%",width:"100%"}},a.a.createElement(s.a,{center:n?[n.lat,n.long]:[46.58,80.08],zoom:n?10:5,style:{height:"100%",width:"100%"},ref:O,onMoveEnd:j},a.a.createElement(f.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),k.map(function(t){var e=Object(l.a)(t.geometry.coordinates,2),n=e[0],r=e[1],o=t.properties,c=o.cluster,i=o.point_count;return c?a.a.createElement(h.a,{key:"cluster-".concat(t.id),position:[r,n],icon:b(i,10+i/k.length),onClick:function(){var e=Math.min(S.getClusterExpansionZoom(t.id),17);O.current.leafletElement.setView([r,n],e,{animate:!0})}}):a.a.createElement(h.a,{key:t.id,position:[r,n],icon:v,onClick:function(){O.current.leafletElement.setView([r,n],15,{animate:!0})}},a.a.createElement(d.a,null,"Latitude: ".concat(r,", Longitude: ").concat(n," place: ").concat(t.properties.place," magnitude: ").concat(t.properties.mag)))})))},w=(n(92),n(55)),O=n(20),j=n(18),x=n(9),k=n(36);var S=function(t){var e=t.data,n=t.onRangeSelected,o=Object(r.useRef)(),c=Object(r.useRef)(null);return Object(r.useEffect)(function(){if(e){var t={};e.features.forEach(function(e){var n=Math.round(10*e.properties.mag)/10;t[n]?t[n].count+=1:t[n]={count:1}});var r=Object.keys(t).map(function(e){return{mag:parseFloat(e),count:t[e].count}}).sort(function(t,e){return t.mag-e.mag}),a=r.length,i=300/a-1,u=Object(x.e)().domain(r.map(function(t){return t.mag})).range([0,300]).paddingInner(.1),s=Object(x.f)().domain([0,x.d(r,function(t){return t.count})]).range([150,0]),f=r.map(function(t){return t.mag}).filter(function(t){return Number.isInteger(t)}),h=Object(j.a)(u).tickValues(f),d=Object(j.b)(s);Object(w.a)(o.current).select(".x-axis").style("transform","translateY(150px)").call(h),Object(w.a)(o.current).select(".y-axis").style("transform","translateX(0px)").call(d);var m=function(t){var e=Math.round(t*a/300);return r[e]?r[e].mag:null},p=Object(k.a)().extent([[0,0],[300,150]]).on("brush end",function(){if(O.c.selection){var t=Object(l.a)(O.c.selection,2),e=t[0],r=t[1],a=m(e),o=m(r);n([a,o])}});Object(w.a)(o.current).selectAll(".brush").remove(),n(null);var g=Object(w.a)(o.current);c.current=function(){g.select(".brush").call(p.move,null),n(null)},g.selectAll(".bar").data(r).join("rect").attr("class","bar").attr("x",function(t){return u(t.mag)}).attr("y",function(t){return s(t.count)}).attr("width",i).attr("height",function(t){return 150-s(t.count)}).attr("fill",function(t){return(e=t.mag)>=-2&&e<-1?"white":e>=-1&&e<0?"blue":e>=0&&e<1?"black":e>=1&&e<2?"steelblue":e>=2&&e<3?"pink":e>=3&&e<4?"yellow":e>=4&&e<5?"orange":e>=5&&e<6?"red":"gray";var e}).on("click",function(t){console.log("d",t)}),Object(w.a)(o.current).append("g").attr("class","brush").call(p)}},[e]),a.a.createElement("div",{className:"barview"},a.a.createElement("button",{onClick:c.current},"Reset"),a.a.createElement("p",null,"Earthquake Magnitude Histogram"),a.a.createElement("svg",{ref:o,style:{overflow:"visible"}},a.a.createElement("g",{className:"x-axis"}),a.a.createElement("g",{className:"y-axis"})))},N=(n(93),function(t){for(var e=t.startDate,n=t.endDate,o=t.setStartDate,c=t.setEndDate,i=Object(r.useRef)(null),l=[],u=new Date(2022,0,1),s=new Date(2022,11,31);u<=s;)l.push({day:new Date(u),value:1}),u.setDate(u.getDate()+1);return Object(r.useEffect)(function(){if(l){var t={top:20,right:20,bottom:30,left:50},r=i.current.clientWidth-t.left-t.right,a=i.current.clientHeight-t.top-t.bottom,u=x.g().domain([new Date(2022,0,1),new Date(2022,11,31)]).range([0,r]),s=x.a(u).tickFormat(x.i("%b")).tickValues(x.j.range(new Date(2022,0,1),new Date(2022,11,31),1)).tickSize(10).tickPadding(5),f=x.b().extent([[0,0],[r,a]]).on("end",function(){var t=x.c.selection,e=t?u.invert(t[0]):null,n=t?u.invert(t[1]):null;e&&n?(o(e.toISOString().split("T")[0]),c(n.toISOString().split("T")[0])):(o(null),c(null)),h.selectAll(".selection").attr("fill",t?"blue":"gray")});x.h(i.current).selectAll("*").remove();var h=x.h(i.current).attr("width",r+t.left+t.right).attr("height",a+t.top+t.bottom).append("g").attr("transform","translate(".concat(t.left,", ").concat(t.top,")"));h.append("rect").attr("width",r).attr("height",a).attr("fill","gray"),h.append("g").attr("class","x axis").attr("transform","translate(0, ".concat(a,")")).call(s),h.append("g").attr("class","brush").call(f).call(f.move,e&&n?[u(new Date(e)),u(new Date(n))]:null)}},[l,e,n]),a.a.createElement("div",{className:"timeline"},a.a.createElement("svg",{ref:i,width:1500,height:70}))}),D=(n(94),n(111));var L=function(){var t=Object(r.useState)([25,30,45,60,20,65,75]),e=Object(l.a)(t,2),n=e[0],o=(e[1],Object(r.useRef)());return Object(r.useEffect)(function(){var t=Object(w.a)(o.current),e=Object(x.f)().domain([0,n.length-1]).range([0,300]),r=Object(x.f)().domain([0,75]).range([150,0]),a=Object(j.a)(e).ticks(n.length).tickFormat(function(t){return t+1});t.select(".x-axis").style("transform","translateY(150px)").call(a);var c=Object(j.b)(r);t.select(".y-axis").style("transform","translateX(0px)").call(c);var i=Object(D.a)().x(function(t,n){return e(n)}).y(r);t.selectAll(".line").data([n]).join("path").attr("class","line").attr("d",i).attr("fill","none").attr("stroke","blue")},[n]),a.a.createElement("div",{className:"depthview"},a.a.createElement("p",null,"Earthquake Depth Anaysis"),a.a.createElement("svg",{ref:o,style:{overflow:"visible"}},a.a.createElement("g",{className:"x-axis"}),a.a.createElement("g",{className:"y-axis"})))},_=n(66),R=n(64),C=n(109),G=(n(95),"https://earthquake.usgs.gov/fdsnws/event/1/"),P=Object(R.a)({},"GET",function(t,e,n){var r=t;return console.log("query",G+r),C.a.get(G+r,{headers:n})});function T(t){return Promise.reject(t)}var A=function(t){var e=t.type,n=t.url,r=t.data,a=void 0===r?{}:r,o=t.config,c=void 0===o?{}:o;return c.contentType,C.a.defaults.headers.get.Accept="application/json",(0,P[e.toUpperCase()])(n,a,c.headers).then(function(t){return Promise.resolve(t.data)}).catch(T)},I={getData:{url:function(t){return"query?format=geojson&starttime=".concat(t.startDate,"&endtime=").concat(t.endDate)},method:"get"},getCount:{url:function(t){return"count?starttime=".concat(t.startDate,"&endtime=").concat(t.endDate)},method:"get"}},M=function(t){var e=t.parameters,n=void 0===e?[]:e,r=t.action,a=t.module,o=void 0===a?"":a,c=t.data,i=t.config,l=I["".concat(r).concat(o)];return l?A({type:l.method,url:l.url.apply(l,Object(_.a)(n)),data:c,config:i}):Promise.reject(new Error("Oops!, I believe you have called wrong url."))};function F(){F=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",i=a.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(D){l=function(t,e,n){return t[e]=n}}function u(t,e,n,a){var o=e&&e.prototype instanceof h?e:h,c=Object.create(o.prototype),i=new k(a||[]);return r(c,"_invoke",{value:w(t,n,i)}),c}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(D){return{type:"throw",arg:D}}}t.wrap=u;var f={};function h(){}function d(){}function m(){}var p={};l(p,o,function(){return this});var g=Object.getPrototypeOf,v=g&&g(g(S([])));v&&v!==e&&n.call(v,o)&&(p=v);var y=m.prototype=h.prototype=Object.create(p);function b(t){["next","throw","return"].forEach(function(e){l(t,e,function(t){return this._invoke(e,t)})})}function E(t,e){var a;r(this,"_invoke",{value:function(r,o){function c(){return new e(function(a,c){!function r(a,o,c,i){var l=s(t[a],t,o);if("throw"!==l.type){var u=l.arg,f=u.value;return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then(function(t){r("next",t,c,i)},function(t){r("throw",t,c,i)}):e.resolve(f).then(function(t){u.value=t,c(u)},function(t){return r("throw",t,c,i)})}i(l.arg)}(r,o,a,c)})}return a=a?a.then(c,c):c()}})}function w(t,e,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return N()}for(n.method=a,n.arg=o;;){var c=n.delegate;if(c){var i=O(c,n);if(i){if(i===f)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var l=s(t,e,n);if("normal"===l.type){if(r=n.done?"completed":"suspendedYield",l.arg===f)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(r="completed",n.method="throw",n.arg=l.arg)}}}function O(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,O(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),f;var a=s(r,t.iterator,e.arg);if("throw"===a.type)return e.method="throw",e.arg=a.arg,e.delegate=null,f;var o=a.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function S(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,a=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:N}}function N(){return{value:void 0,done:!0}}return d.prototype=m,r(y,"constructor",{value:m,configurable:!0}),r(m,"constructor",{value:d,configurable:!0}),d.displayName=l(m,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,l(t,i,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},b(E.prototype),l(E.prototype,c,function(){return this}),t.AsyncIterator=E,t.async=function(e,n,r,a,o){void 0===o&&(o=Promise);var c=new E(u(e,n,r,a),o);return t.isGeneratorFunction(n)?c:c.next().then(function(t){return t.done?t.value:c.next()})},b(y),l(y,i,"Generator"),l(y,o,function(){return this}),l(y,"toString",function(){return"[object Generator]"}),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=S,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return c.type="throw",c.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var i=n.call(o,"catchLoc"),l=n.call(o,"finallyLoc");if(i&&l){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=t,c.arg=e,o?(this.method="next",this.next=o.finallyLoc,f):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),x(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;x(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:S(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},t}var q=function(){var t=Object(r.useState)(null),e=Object(l.a)(t,2),n=e[0],o=e[1],c=Object(r.useState)("2022-01-01"),s=Object(l.a)(c,2),f=s[0],h=s[1],d=Object(r.useState)("2022-01-31"),m=Object(l.a)(d,2),p=m[0],g=m[1],v=Object(r.useState)(),y=Object(l.a)(v,2),b=y[0],w=y[1],O=Object(r.useState)(null),j=Object(l.a)(O,2),x=j[0],k=j[1],D=Object(r.useState)(null),_=Object(l.a)(D,2),R=_[0],C=_[1],G=function(){var t=Object(i.a)(F().mark(function t(){var e,n;return F().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,M({action:"getData",parameters:[{startDate:f,endDate:p}]});case 2:return e=t.sent,o(e),t.next=6,M({action:"getCount",parameters:[{startDate:f,endDate:p}]});case 6:n=t.sent,w(n);case 8:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}();return Object(r.useEffect)(function(){G()},[f,p]),a.a.createElement("div",{className:"dashboard"},a.a.createElement("div",{className:"row1"},a.a.createElement(u,{count:b,data:n?n.features:[],geo:R,setGeo:C}),a.a.createElement(E,{data:n,selectedRange:x,geo:R,setGeo:C})),a.a.createElement("div",{className:"row2"},a.a.createElement(S,{data:n,onRangeSelected:k}),a.a.createElement(L,null)),a.a.createElement("div",{className:"row3"},a.a.createElement(N,{startDate:f,endDate:p,setStartDate:h,setEndDate:g,setSelectedRange:k})))};n(102);c.a.createRoot(document.getElementById("root")).render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(q,null)))},79:function(t,e,n){t.exports=n(103)},87:function(t,e,n){},88:function(t,e,n){},89:function(t,e,n){},92:function(t,e,n){},93:function(t,e,n){},94:function(t,e,n){}},[[79,1,2]]]);
//# sourceMappingURL=main.239b7273.chunk.js.map