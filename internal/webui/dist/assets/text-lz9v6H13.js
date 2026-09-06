import{$ as e,H as t,Jt as n,Kt as r,Mn as i,Sn as a,Ut as o,V as s,bn as c,d as l,dt as u,mn as d,nt as f,on as p,or as m,st as h,u as g,un as _,vn as v}from"./client-DkW07njR.js";function y(e,t){return _(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}var b=/^(\d|\.)+$/,x=/(\d|\.)+/;function S(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e==`number`){let r=(e+n)*t;return r===0?`0`:`${r}px`}if(typeof e==`string`){if(b.test(e)){let i=(Number(e)+n)*t;return r?i===0?`0`:`${i}px`:`${i}`}{let r=x.exec(e);return r?e.replace(x,String((Number(r[0])+n)*t)):e}}return e}function C(){let e=a(l,null);return e===null&&u(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}var w=o(`text`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[r(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),r(`italic`,{fontStyle:`italic`}),r(`underline`,{textDecoration:`underline`}),r(`code`,`
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
 `)]),T={...s.props,code:Boolean,type:{type:String,default:`default`},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}},E=v({name:`Text`,props:T,setup(e){let{mergedClsPrefixRef:r,inlineThemeDisabled:i}=h(e),a=s(`Typography`,`-text`,w,g,e,r),o=_(()=>{let{depth:t,type:r}=e,i=r==="default"?t===void 0?`textColor`:`textColor${t}Depth`:n(`textColor`,r),{common:{fontWeightStrong:o,fontFamilyMono:s,cubicBezierEaseInOut:c},self:{codeTextColor:l,codeBorderRadius:u,codeColor:d,codeBorder:f,[i]:p}}=a.value;return{"--n-bezier":c,"--n-text-color":p,"--n-font-weight-strong":o,"--n-font-famliy-mono":s,"--n-code-border-radius":u,"--n-code-text-color":l,"--n-code-color":d,"--n-code-border":f}}),c=i?t(`text`,_(()=>`${e.type[0]}${e.depth||``}`),o,e):void 0;return{mergedClsPrefix:r,compitableTag:y(e,[`as`,`tag`]),cssVars:i?void 0:o,themeClass:c?.themeClass,onRender:c?.onRender}},render(){let{mergedClsPrefix:t}=this;this.onRender?.();let n=[`${t}-text`,this.themeClass,{[`${t}-text--code`]:this.code,[`${t}-text--delete`]:this.delete,[`${t}-text--strong`]:this.strong,[`${t}-text--italic`]:this.italic,[`${t}-text--underline`]:this.underline}],r=this.$slots.default?.();return this.code?(i(),d(`code`,{key:1,class:e(n),style:m(this.cssVars)},[this.delete?(i(),d(`del`,{key:0},[f(()=>r)])):(i(),d(p,{key:1},[f(()=>r)],64))],6)):this.delete?(i(),d(`del`,{key:2,class:e(n),style:m(this.cssVars)},[f(()=>r)],6)):c(this.compitableTag||`span`,{class:n,style:this.cssVars},r)}});export{y as i,C as n,S as r,E as t};