import{B as e,Gt as t,Ht as n,Q as r,V as i,_n as a,an as o,ar as s,d as c,jn as l,ln as u,ot as d,pn as f,qt as p,tt as m,u as h,ut as g,xn as _,yn as v}from"./client-aJ7VylDj.js";function y(e,t){return u(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}var b=/^(\d|\.)+$/,x=/(\d|\.)+/;function S(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e==`number`){let r=(e+n)*t;return r===0?`0`:`${r}px`}if(typeof e==`string`){if(b.test(e)){let i=(Number(e)+n)*t;return r?i===0?`0`:`${i}px`:`${i}`}{let r=x.exec(e);return r?e.replace(x,String((Number(r[0])+n)*t)):e}}return e}function C(){let e=_(c,null);return e===null&&g(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}var w=n(`text`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[t(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),t(`italic`,{fontStyle:`italic`}),t(`underline`,{textDecoration:`underline`}),t(`code`,`
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
 `)]),T={...e.props,code:Boolean,type:{type:String,default:`default`},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}},E=a({name:`Text`,props:T,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=d(t),a=e(`Typography`,`-text`,w,h,t,n),o=u(()=>{let{depth:e,type:n}=t,r=n==="default"?e===void 0?`textColor`:`textColor${e}Depth`:p(`textColor`,n),{common:{fontWeightStrong:i,fontFamilyMono:o,cubicBezierEaseInOut:s},self:{codeTextColor:c,codeBorderRadius:l,codeColor:u,codeBorder:d,[r]:f}}=a.value;return{"--n-bezier":s,"--n-text-color":f,"--n-font-weight-strong":i,"--n-font-famliy-mono":o,"--n-code-border-radius":l,"--n-code-text-color":c,"--n-code-color":u,"--n-code-border":d}}),s=r?i(`text`,u(()=>`${t.type[0]}${t.depth||``}`),o,t):void 0;return{mergedClsPrefix:n,compitableTag:y(t,[`as`,`tag`]),cssVars:r?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{mergedClsPrefix:e}=this;this.onRender?.();let t=[`${e}-text`,this.themeClass,{[`${e}-text--code`]:this.code,[`${e}-text--delete`]:this.delete,[`${e}-text--strong`]:this.strong,[`${e}-text--italic`]:this.italic,[`${e}-text--underline`]:this.underline}],n=this.$slots.default?.();return this.code?(l(),f(`code`,{key:1,class:r(t),style:s(this.cssVars)},[this.delete?(l(),f(`del`,{key:0},[m(()=>n)])):(l(),f(o,{key:1},[m(()=>n)],64))],6)):this.delete?(l(),f(`del`,{key:2,class:r(t),style:s(this.cssVars)},[m(()=>n)],6)):v(this.compitableTag||`span`,{class:t,style:this.cssVars},n)}});export{y as i,C as n,S as r,E as t};