import{En as e,On as t,Qt as n,Tt as r,Yt as i,en as a,ft as o,gn as s,j as c,l,pt as u,u as d,wn as f}from"./client-7ydMUZih.js";function p(e,t){return s(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}var m=/^(\d|\.)+$/,h=/(\d|\.)+/;function g(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e==`number`){let r=(e+n)*t;return r===0?`0`:`${r}px`}if(typeof e==`string`){if(m.test(e)){let i=(Number(e)+n)*t;return r?i===0?`0`:`${i}px`:`${i}`}{let r=h.exec(e);return r?e.replace(h,String((Number(r[0])+n)*t)):e}}return e}function _(){let e=t(d,null);return e===null&&r(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}var v=i(`text`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[n(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),n(`italic`,{fontStyle:`italic`}),n(`underline`,{textDecoration:`underline`}),n(`code`,`
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
 `)]),y=Object.assign(Object.assign({},c.props),{code:Boolean,type:{type:String,default:`default`},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}}),b=f({name:`Text`,props:y,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=u(e),r=c(`Typography`,`-text`,v,l,e,t),i=s(()=>{let{depth:t,type:n}=e,i=n==="default"?t===void 0?`textColor`:`textColor${t}Depth`:a(`textColor`,n),{common:{fontWeightStrong:o,fontFamilyMono:s,cubicBezierEaseInOut:c},self:{codeTextColor:l,codeBorderRadius:u,codeColor:d,codeBorder:f,[i]:p}}=r.value;return{"--n-bezier":c,"--n-text-color":p,"--n-font-weight-strong":o,"--n-font-famliy-mono":s,"--n-code-border-radius":u,"--n-code-text-color":l,"--n-code-color":d,"--n-code-border":f}}),d=n?o(`text`,s(()=>`${e.type[0]}${e.depth||``}`),i,e):void 0;return{mergedClsPrefix:t,compitableTag:p(e,[`as`,`tag`]),cssVars:n?void 0:i,themeClass:d?.themeClass,onRender:d?.onRender}},render(){var t,n;let{mergedClsPrefix:r}=this;(t=this.onRender)==null||t.call(this);let i=[`${r}-text`,this.themeClass,{[`${r}-text--code`]:this.code,[`${r}-text--delete`]:this.delete,[`${r}-text--strong`]:this.strong,[`${r}-text--italic`]:this.italic,[`${r}-text--underline`]:this.underline}],a=(n=this.$slots).default?.call(n);return this.code?e(`code`,{class:i,style:this.cssVars},this.delete?e(`del`,null,a):a):this.delete?e(`del`,{class:i,style:this.cssVars},a):e(this.compitableTag||`span`,{class:i,style:this.cssVars},a)}});export{p as i,_ as n,g as r,b as t};