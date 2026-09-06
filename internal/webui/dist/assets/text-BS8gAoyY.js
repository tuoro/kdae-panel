import{Nn as e,St as t,Tn as n,Un as r,X as i,Y as a,_n as o,_r as s,an as c,d as l,en as u,jn as d,kn as f,pt as p,rn as m,u as h,ut as g,vt as _,xn as v}from"./client-3GjT0YO-.js";function y(e,t){return v(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}var b=/^(\d|\.)+$/,x=/(\d|\.)+/;function S(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e==`number`){let r=(e+n)*t;return r===0?`0`:`${r}px`}if(typeof e==`string`){if(b.test(e)){let i=(Number(e)+n)*t;return r?i===0?`0`:`${i}px`:`${i}`}{let r=x.exec(e);return r?e.replace(x,String((Number(r[0])+n)*t)):e}}return e}function C(){let n=e(l,null);return n===null&&t(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),n}var w=u(`text`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[m(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),m(`italic`,{fontStyle:`italic`}),m(`underline`,{textDecoration:`underline`}),m(`code`,`
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
 `)]),T={...a.props,code:Boolean,type:{type:String,default:`default`},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}},E=f({name:`Text`,props:T,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=_(e),r=a(`Typography`,`-text`,w,h,e,t),o=v(()=>{let{depth:t,type:n}=e,i=n==="default"?t===void 0?`textColor`:`textColor${t}Depth`:c(`textColor`,n),{common:{fontWeightStrong:a,fontFamilyMono:o,cubicBezierEaseInOut:s},self:{codeTextColor:l,codeBorderRadius:u,codeColor:d,codeBorder:f,[i]:p}}=r.value;return{"--n-bezier":s,"--n-text-color":p,"--n-font-weight-strong":a,"--n-font-famliy-mono":o,"--n-code-border-radius":u,"--n-code-text-color":l,"--n-code-color":d,"--n-code-border":f}}),s=n?i(`text`,v(()=>`${e.type[0]}${e.depth||``}`),o,e):void 0;return{mergedClsPrefix:t,compitableTag:y(e,[`as`,`tag`]),cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{mergedClsPrefix:e}=this;this.onRender?.();let t=[`${e}-text`,this.themeClass,{[`${e}-text--code`]:this.code,[`${e}-text--delete`]:this.delete,[`${e}-text--strong`]:this.strong,[`${e}-text--italic`]:this.italic,[`${e}-text--underline`]:this.underline}],i=this.$slots.default?.();return this.code?(r(),n(`code`,{key:1,class:g(t),style:s(this.cssVars)},[this.delete?(r(),n(`del`,{key:0},[p(()=>i)])):(r(),n(o,{key:1},[p(()=>i)],64))],6)):this.delete?(r(),n(`del`,{key:2,class:g(t),style:s(this.cssVars)},[p(()=>i)],6)):d(this.compitableTag||`span`,{class:t,style:this.cssVars},i)}});export{y as i,C as n,S as r,E as t};