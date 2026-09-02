import{An as e,Ct as t,En as n,Mn as r,Pn as i,Sn as a,Wn as o,X as s,Y as c,d as l,in as u,on as d,pt as f,tn as p,u as m,ut as h,vn as g,vr as _,vt as v}from"./client-BDSaduAi.js";function y(e,t){return a(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}var b=/^(\d|\.)+$/,x=/(\d|\.)+/;function S(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e==`number`){let r=(e+n)*t;return r===0?`0`:`${r}px`}if(typeof e==`string`){if(b.test(e)){let i=(Number(e)+n)*t;return r?i===0?`0`:`${i}px`:`${i}`}{let r=x.exec(e);return r?e.replace(x,String((Number(r[0])+n)*t)):e}}return e}function C(){let e=i(l,null);return e===null&&t(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}var w=p(`text`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[u(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),u(`italic`,{fontStyle:`italic`}),u(`underline`,{textDecoration:`underline`}),u(`code`,`
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
 `)]),T={...c.props,code:Boolean,type:{type:String,default:`default`},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}},E=e({name:`Text`,props:T,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=v(e),r=c(`Typography`,`-text`,w,m,e,t),i=a(()=>{let{depth:t,type:n}=e,i=n==="default"?t===void 0?`textColor`:`textColor${t}Depth`:d(`textColor`,n),{common:{fontWeightStrong:a,fontFamilyMono:o,cubicBezierEaseInOut:s},self:{codeTextColor:c,codeBorderRadius:l,codeColor:u,codeBorder:f,[i]:p}}=r.value;return{"--n-bezier":s,"--n-text-color":p,"--n-font-weight-strong":a,"--n-font-famliy-mono":o,"--n-code-border-radius":l,"--n-code-text-color":c,"--n-code-color":u,"--n-code-border":f}}),o=n?s(`text`,a(()=>`${e.type[0]}${e.depth||``}`),i,e):void 0;return{mergedClsPrefix:t,compitableTag:y(e,[`as`,`tag`]),cssVars:n?void 0:i,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{mergedClsPrefix:e}=this;this.onRender?.();let t=[`${e}-text`,this.themeClass,{[`${e}-text--code`]:this.code,[`${e}-text--delete`]:this.delete,[`${e}-text--strong`]:this.strong,[`${e}-text--italic`]:this.italic,[`${e}-text--underline`]:this.underline}],i=this.$slots.default?.();return this.code?(o(),n(`code`,{key:1,class:h(t),style:_(this.cssVars)},[this.delete?(o(),n(`del`,{key:0},[f(()=>i)])):(o(),n(g,{key:1},[f(()=>i)],64))],6)):this.delete?(o(),n(`del`,{key:2,class:h(t),style:_(this.cssVars)},[f(()=>i)],6)):r(this.compitableTag||`span`,{class:t,style:this.cssVars},i)}});export{y as i,C as n,S as r,E as t};