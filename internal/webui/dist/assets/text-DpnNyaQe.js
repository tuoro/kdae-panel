import{J as e,Nn as t,St as n,Tn as r,Un as i,Y as a,_n as o,_r as s,_t as c,an as l,en as u,ft as d,jn as f,kn as p,l as m,lt as h,rn as g,u as _,xn as v}from"./client-DecrR2G0.js";function y(e,t){return v(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}var b=/^(\d|\.)+$/,x=/(\d|\.)+/;function S(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e==`number`){let r=(e+n)*t;return r===0?`0`:`${r}px`}if(typeof e==`string`){if(b.test(e)){let i=(Number(e)+n)*t;return r?i===0?`0`:`${i}px`:`${i}`}{let r=x.exec(e);return r?e.replace(x,String((Number(r[0])+n)*t)):e}}return e}function C(){let e=t(_,null);return e===null&&n(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}var w=u(`text`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[g(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),g(`italic`,{fontStyle:`italic`}),g(`underline`,{textDecoration:`underline`}),g(`code`,`
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
 `)]),T={...e.props,code:Boolean,type:{type:String,default:`default`},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}},E=p({name:`Text`,props:T,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=c(t),i=e(`Typography`,`-text`,w,m,t,n),o=v(()=>{let{depth:e,type:n}=t,r=n==="default"?e===void 0?`textColor`:`textColor${e}Depth`:l(`textColor`,n),{common:{fontWeightStrong:a,fontFamilyMono:o,cubicBezierEaseInOut:s},self:{codeTextColor:c,codeBorderRadius:u,codeColor:d,codeBorder:f,[r]:p}}=i.value;return{"--n-bezier":s,"--n-text-color":p,"--n-font-weight-strong":a,"--n-font-famliy-mono":o,"--n-code-border-radius":u,"--n-code-text-color":c,"--n-code-color":d,"--n-code-border":f}}),s=r?a(`text`,v(()=>`${t.type[0]}${t.depth||``}`),o,t):void 0;return{mergedClsPrefix:n,compitableTag:y(t,[`as`,`tag`]),cssVars:r?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{mergedClsPrefix:e}=this;this.onRender?.();let t=[`${e}-text`,this.themeClass,{[`${e}-text--code`]:this.code,[`${e}-text--delete`]:this.delete,[`${e}-text--strong`]:this.strong,[`${e}-text--italic`]:this.italic,[`${e}-text--underline`]:this.underline}],n=this.$slots.default?.();return this.code?(i(),r(`code`,{key:1,class:h(t),style:s(this.cssVars)},[this.delete?(i(),r(`del`,{key:0},[d(()=>n)])):(i(),r(o,{key:1},[d(()=>n)],64))],6)):this.delete?(i(),r(`del`,{key:2,class:h(t),style:s(this.cssVars)},[d(()=>n)],6)):f(this.compitableTag||`span`,{class:t,style:this.cssVars},n)}});export{y as i,C as n,S as r,E as t};