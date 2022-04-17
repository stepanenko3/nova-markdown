(()=>{var e={960:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});const a={props:["card"],data:function(){return{loading:!1,timeout:null,fetchPath:""}},mounted:function(){this.fetch()},methods:{fetch:function(){var e=this;this.loading||(this.loading=!0,this.timeout&&clearTimeout(this.timeout),Nova.request().get(this.fetchPath).then((function(t){e.loading=!1,e.fetchCallback(t.data,t),e.card.pollingTime&&(e.timeout=setTimeout(e.fetch,e.card.pollingTime))})))},fetchCallback:function(e,t){}}}},793:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var a=n(645),o=n.n(a)()((function(e){return e[1]}));o.push([e.id,".htmlCard{height:auto}.htmlCard__content>p:not(:last-child){margin-bottom:1em}",""]);const r=o},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,a){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(a)for(var r=0;r<this.length;r++){var l=this[r][0];null!=l&&(o[l]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);a&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},379:(e,t,n)=>{"use strict";var a,o=function(){return void 0===a&&(a=Boolean(window&&document&&document.all&&!window.atob)),a},r=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),l=[];function s(e){for(var t=-1,n=0;n<l.length;n++)if(l[n].identifier===e){t=n;break}return t}function c(e,t){for(var n={},a=[],o=0;o<e.length;o++){var r=e[o],c=t.base?r[0]+t.base:r[0],i=n[c]||0,d="".concat(c," ").concat(i);n[c]=i+1;var u=s(d),m={css:r[1],media:r[2],sourceMap:r[3]};-1!==u?(l[u].references++,l[u].updater(m)):l.push({identifier:d,updater:g(m,t),references:1}),a.push(d)}return a}function i(e){var t=document.createElement("style"),a=e.attributes||{};if(void 0===a.nonce){var o=n.nc;o&&(a.nonce=o)}if(Object.keys(a).forEach((function(e){t.setAttribute(e,a[e])})),"function"==typeof e.insert)e.insert(t);else{var l=r(e.insert||"head");if(!l)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");l.appendChild(t)}return t}var d,u=(d=[],function(e,t){return d[e]=t,d.filter(Boolean).join("\n")});function m(e,t,n,a){var o=n?"":a.media?"@media ".concat(a.media," {").concat(a.css,"}"):a.css;if(e.styleSheet)e.styleSheet.cssText=u(t,o);else{var r=document.createTextNode(o),l=e.childNodes;l[t]&&e.removeChild(l[t]),l.length?e.insertBefore(r,l[t]):e.appendChild(r)}}function p(e,t,n){var a=n.css,o=n.media,r=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),r&&"undefined"!=typeof btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=a;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}var f=null,h=0;function g(e,t){var n,a,o;if(t.singleton){var r=h++;n=f||(f=i(t)),a=m.bind(null,n,r,!1),o=m.bind(null,n,r,!0)}else n=i(t),a=p.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var a=0;a<n.length;a++){var o=s(n[a]);l[o].references--}for(var r=c(e,t),i=0;i<n.length;i++){var d=s(n[i]);0===l[d].references&&(l[d].updater(),l.splice(d,1))}n=r}}}},744:(e,t)=>{"use strict";t.Z=(e,t)=>{const n=e.__vccOpts||e;for(const[e,a]of t)n[e]=a;return n}},312:(e,t,n)=>{"use strict";n.d(t,{Z:()=>m});var a=n(311),o=["innerHTML"],r={class:"px-3 py-3"},l=["innerHTML"];const s={props:["card"],computed:{cardClassList:function(){var e="";return this.card.center&&(e+=" flex flex-col justify-center text-center"),e}},mounted:function(){this.card.forceFullWidth&&(this.$parent.$el.classList.remove("w-5/6"),this.$parent.$el.classList.add("w-full"))}};var c=n(379),i=n.n(c),d=n(793),u={insert:"head",singleton:!1};i()(d.Z,u);d.Z.locals;const m=(0,n(744).Z)(s,[["render",function(e,t,n,s,c,i){var d=(0,a.resolveComponent)("Card");return n.card.withoutCardStyles?((0,a.openBlock)(),(0,a.createElementBlock)("div",{key:0,class:(0,a.normalizeClass)(["htmlCard",i.cardClassList])},[(0,a.createElementVNode)("div",{innerHTML:n.card.content,class:"htmlCard__content"},null,8,o)],2)):((0,a.openBlock)(),(0,a.createBlock)(d,{key:1,class:(0,a.normalizeClass)(["htmlCard",i.cardClassList])},{default:(0,a.withCtx)((function(){return[(0,a.createElementVNode)("div",r,[(0,a.createElementVNode)("div",{innerHTML:n.card.content,class:"htmlCard__content"},null,8,l)])]})),_:1},8,["class"]))}]])},609:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var a=n(311);const o={props:["card","refresh","loading","heading"]};const r=(0,n(744).Z)(o,[["render",function(e,t,n,o,r,l){var s=(0,a.resolveComponent)("Icon"),c=(0,a.resolveComponent)("LoadingButton"),i=(0,a.resolveComponent)("Heading"),d=(0,a.resolveComponent)("Loader"),u=(0,a.resolveComponent)("Card");return(0,a.openBlock)(),(0,a.createBlock)(u,{class:"h-auto p-4"},{default:(0,a.withCtx)((function(){return[(0,a.createVNode)(i,{level:3,class:"flex items-center justify-between mb-2"},{default:(0,a.withCtx)((function(){return[(0,a.createElementVNode)("span",null,(0,a.toDisplayString)(n.heading),1),(0,a.createVNode)(c,{class:"relative ml-auto",size:"xs",component:"LinkButton",disabled:n.loading,loading:n.loading,onClick:t[0]||(t[0]=function(t){return e.$emit("refresh")})},{default:(0,a.withCtx)((function(){return[(0,a.createVNode)(s,{type:"refresh"})]})),_:1},8,["disabled","loading"])]})),_:1}),n.loading?((0,a.openBlock)(),(0,a.createBlock)(d,{key:0,class:"mb-4"})):(0,a.createCommentVNode)("",!0),n.loading?(0,a.createCommentVNode)("",!0):(0,a.renderSlot)(e.$slots,"default",{key:1})]})),_:3})}]])},317:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var a=n(311),o={key:0},r={key:1,class:"w-full text-left table-collapse"},l=["item"];const s={props:["card"],mixins:[n(960).Z],data:function(){return{data:[],fetchPath:"/nova-vendor/stepanenko3/nova-cards/scheduled-jobs"}},methods:{fetchCallback:function(e,t){this.data=e}}};const c=(0,n(744).Z)(s,[["render",function(e,t,n,s,c,i){var d=(0,a.resolveComponent)("LoadingCardWithButton");return(0,a.openBlock)(),(0,a.createBlock)(d,{heading:e.__("Scheduled Jobs"),loading:e.loading,onRefresh:e.fetch},{default:(0,a.withCtx)((function(){return[e.loading||e.data.length?(0,a.createCommentVNode)("",!0):((0,a.openBlock)(),(0,a.createElementBlock)("p",o,(0,a.toDisplayString)(e.__("You do not currently have any scheduled jobs.")),1)),e.data.length?((0,a.openBlock)(),(0,a.createElementBlock)("table",r,[((0,a.openBlock)(!0),(0,a.createElementBlock)(a.Fragment,null,(0,a.renderList)(e.data,(function(e,t){return(0,a.openBlock)(),(0,a.createElementBlock)("tr",{item:e},[(0,a.createElementVNode)("td",null,(0,a.toDisplayString)(e.command),1),(0,a.createElementVNode)("td",null,(0,a.toDisplayString)(e.expression),1),(0,a.createElementVNode)("td",null,(0,a.toDisplayString)(e.humanReadableNextRun),1)],8,l)})),256))])):(0,a.createCommentVNode)("",!0)]})),_:1},8,["heading","loading","onRefresh"])}]])},89:(e,t,n)=>{"use strict";n.d(t,{Z:()=>V});var a=n(311),o={key:0,class:"w-full text-left table-collapse"},r={class:"align-baseline"},l=(0,a.createElementVNode)("td",{class:"py-2 pr-2 font-bold"},"Disk Space",-1),s={class:"p-2"},c={class:"text-xs"},i={class:"text-xs"},d=(0,a.createTextVNode)(") "),u={key:0},m=(0,a.createElementVNode)("td",{class:"py-2 pr-2 font-bold"},"Memory Usage",-1),p={class:"p-2"},f={class:"text-xs"},h={class:"text-xs"},g=(0,a.createTextVNode)(") "),v=(0,a.createElementVNode)("td",{class:"py-2 pr-2 font-bold"},"CPU Usage",-1),y={class:"p-2"},N=(0,a.createElementVNode)("br",null,null,-1),C={class:"text-xs"};const b={props:["card"],mixins:[n(960).Z],data:function(){return{data:{},fetchPath:"/nova-vendor/stepanenko3/nova-cards/system-resources"}},methods:{fetchCallback:function(e){this.data=e}}};const V=(0,n(744).Z)(b,[["render",function(e,t,n,b,V,k){var E=(0,a.resolveComponent)("LoadingCardWithButton");return(0,a.openBlock)(),(0,a.createBlock)(E,{heading:"Server Metrics",loading:e.loading,onRefresh:e.fetch},{default:(0,a.withCtx)((function(){return[e.data?((0,a.openBlock)(),(0,a.createElementBlock)("table",o,[(0,a.createElementVNode)("tbody",r,[(0,a.createElementVNode)("tr",null,[l,(0,a.createElementVNode)("td",s,[(0,a.createTextVNode)((0,a.toDisplayString)(e.data.disk_space.use_percentage)+"% Used ("+(0,a.toDisplayString)(e.data.disk_space.used.memory),1),(0,a.createElementVNode)("span",c,(0,a.toDisplayString)(e.data.disk_space.used.unit.toLowerCase()),1),(0,a.createTextVNode)(" / "+(0,a.toDisplayString)(e.data.disk_space.total.memory),1),(0,a.createElementVNode)("span",i,(0,a.toDisplayString)(e.data.disk_space.total.unit.toLowerCase()),1),d])]),e.data.memory_usage?((0,a.openBlock)(),(0,a.createElementBlock)("tr",u,[m,(0,a.createElementVNode)("td",p,[(0,a.createTextVNode)((0,a.toDisplayString)(e.data.memory_usage.use_percentage)+"% Used ("+(0,a.toDisplayString)(e.data.memory_usage.used.memory),1),(0,a.createElementVNode)("span",f,(0,a.toDisplayString)(e.data.memory_usage.used.unit.toLowerCase()),1),(0,a.createTextVNode)(" / "+(0,a.toDisplayString)(e.data.memory_usage.total.memory),1),(0,a.createElementVNode)("span",h,(0,a.toDisplayString)(e.data.memory_usage.total.unit.toLowerCase()),1),g])])):(0,a.createCommentVNode)("",!0),(0,a.createElementVNode)("tr",null,[v,(0,a.createElementVNode)("td",y,[(0,a.createTextVNode)((0,a.toDisplayString)(e.data.cpu_usage.use_percentage)+"% Used ",1),N,(0,a.createElementVNode)("span",C,(0,a.toDisplayString)(e.data.cpu_usage.name),1)])])])])):(0,a.createCommentVNode)("",!0)]})),_:1},8,["loading","onRefresh"])}]])},557:(e,t,n)=>{"use strict";n.d(t,{Z:()=>v});var a=n(311),o={key:0,class:"w-full text-left table-collapse"},r={class:"align-baseline"},l=(0,a.createElementVNode)("td",{class:"py-2 pr-2 font-bold"},"OS",-1),s={class:"p-2"},c=(0,a.createElementVNode)("td",{class:"py-2 pr-2 font-bold"},"PHP",-1),i={class:"p-2"},d=(0,a.createElementVNode)("td",{class:"py-2 pr-2 font-bold"},"Database",-1),u={class:"p-2"},m=(0,a.createElementVNode)("td",{class:"py-2 pr-2 font-bold"},"Laravel",-1),p={class:"p-2"},f=(0,a.createElementVNode)("td",{class:"py-2 pr-2 font-bold"},"Nova",-1),h={class:"p-2"};const g={props:["card"],mixins:[n(960).Z],data:function(){return{data:{},fetchPath:"/nova-vendor/stepanenko3/nova-cards/versions"}},methods:{fetchCallback:function(e,t){this.data=e}}};const v=(0,n(744).Z)(g,[["render",function(e,t,n,g,v,y){var N=(0,a.resolveComponent)("LoadingCardWithButton");return(0,a.openBlock)(),(0,a.createBlock)(N,{heading:"System Versions",loading:e.loading,onRefresh:e.fetch},{default:(0,a.withCtx)((function(){return[e.data?((0,a.openBlock)(),(0,a.createElementBlock)("table",o,[(0,a.createElementVNode)("tbody",r,[(0,a.createElementVNode)("tr",null,[l,(0,a.createElementVNode)("td",s,(0,a.toDisplayString)(e.data.os||"-"),1)]),(0,a.createElementVNode)("tr",null,[c,(0,a.createElementVNode)("td",i,(0,a.toDisplayString)(e.data.php||"-"),1)]),(0,a.createElementVNode)("tr",null,[d,(0,a.createElementVNode)("td",u,(0,a.toDisplayString)(e.data.database||"-"),1)]),(0,a.createElementVNode)("tr",null,[m,(0,a.createElementVNode)("td",p,(0,a.toDisplayString)(e.data.laravel||"-"),1)]),(0,a.createElementVNode)("tr",null,[f,(0,a.createElementVNode)("td",h,(0,a.toDisplayString)(e.data.nova||"-"),1)])])])):(0,a.createCommentVNode)("",!0)]})),_:1},8,["loading","onRefresh"])}]])},311:e=>{"use strict";e.exports=Vue}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var r=t[a]={id:a,exports:{}};return e[a](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),Nova.booting((function(e){e.component("LoadingCardWithButton",n(609).Z),e.component("system-resources-card",n(89).Z),e.component("versions-card",n(557).Z),e.component("html-card",n(312).Z),e.component("scheduled-jobs-card",n(317).Z)}))})();