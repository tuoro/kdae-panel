import{L as $,H as l,b1 as w,M as z,cg as B,v as T,U as i,d as N,p as a,E as S,F as m,G as M,ch as R,O as V}from"./index-C1xjsYS6.js";function E(e,t){return $(e,o=>{o!==void 0&&(t.value=o)}),l(()=>e.value===void 0?t.value:e.value)}function j(e,t){return l(()=>{for(const o of t)if(e[o]!==void 0)return e[o];return e[t[t.length-1]]})}const O=/^(\d|\.)+$/,u=/(\d|\.)+/;function I(e,{c:t=1,offset:o=0,attachPx:n=!0}={}){if(typeof e=="number"){const r=(e+o)*t;return r===0?"0":`${r}px`}else if(typeof e=="string")if(O.test(e)){const r=(Number(e)+o)*t;return n?r===0?"0":`${r}px`:`${r}`}else{const r=u.exec(e);return r?e.replace(u,String((Number(r[0])+o)*t)):e}return e}function K(){const e=z(B,null);return e===null&&w("use-message","No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}const P=T("text",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[i("strong",`
 font-weight: var(--n-font-weight-strong);
 `),i("italic",{fontStyle:"italic"}),i("underline",{textDecoration:"underline"}),i("code",`
 line-height: 1.4;
 display: inline-block;
 font-family: var(--n-font-famliy-mono);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-sizing: border-box;
 padding: .05em .35em 0 .35em;
 border-radius: var(--n-code-border-radius);
 font-size: .9em;
 color: var(--n-code-text-color);
 background-color: var(--n-code-color);
 border: var(--n-code-border);
 `)]),k=Object.assign(Object.assign({},m.props),{code:Boolean,type:{type:String,default:"default"},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}}),L=N({name:"Text",props:k,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=S(e),n=m("Typography","-text",P,R,e,t),r=l(()=>{const{depth:d,type:c}=e,f=c==="default"?d===void 0?"textColor":`textColor${d}Depth`:V("textColor",c),{common:{fontWeightStrong:h,fontFamilyMono:g,cubicBezierEaseInOut:x},self:{codeTextColor:b,codeBorderRadius:p,codeColor:v,codeBorder:y,[f]:C}}=n.value;return{"--n-bezier":x,"--n-text-color":C,"--n-font-weight-strong":h,"--n-font-famliy-mono":g,"--n-code-border-radius":p,"--n-code-text-color":b,"--n-code-color":v,"--n-code-border":y}}),s=o?M("text",l(()=>`${e.type[0]}${e.depth||""}`),r,e):void 0;return{mergedClsPrefix:t,compitableTag:j(e,["as","tag"]),cssVars:o?void 0:r,themeClass:s?.themeClass,onRender:s?.onRender}},render(){var e,t,o;const{mergedClsPrefix:n}=this;(e=this.onRender)===null||e===void 0||e.call(this);const r=[`${n}-text`,this.themeClass,{[`${n}-text--code`]:this.code,[`${n}-text--delete`]:this.delete,[`${n}-text--strong`]:this.strong,[`${n}-text--italic`]:this.italic,[`${n}-text--underline`]:this.underline}],s=(o=(t=this.$slots).default)===null||o===void 0?void 0:o.call(t);return this.code?a("code",{class:r,style:this.cssVars},this.delete?a("del",null,s):s):this.delete?a("del",{class:r,style:this.cssVars},s):a(this.compitableTag||"span",{class:r,style:this.cssVars},s)}});export{L as N,E as a,j as b,I as f,K as u};
