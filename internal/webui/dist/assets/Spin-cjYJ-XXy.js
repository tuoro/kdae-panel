import{$t as e,Cn as t,M as n,On as r,Qn as i,Sn as a,Tn as o,Un as s,X as c,Y as l,_r as u,an as d,b as f,en as p,kn as m,lr as h,pt as g,rn as _,st as v,un as y,ut as b,vt as x,xn as S,y as C}from"./client-3GjT0YO-.js";import{i as w}from"./text-BS8gAoyY.js";import{c as T}from"./index-fTZ5v0dX.js";var E=e([e(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),p(`spin-container`,`
 position: relative;
 `,[p(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[n()])]),p(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),p(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[_(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),p(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),p(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[_(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),D={small:20,medium:18,large:16},O={...l.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...f,strokeWidth:Number},k=m({name:`Spin`,props:O,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=x(e),r=l(`Spin`,`-spin`,E,T,e,t),a=S(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?v(t):i[d(`size`,t)],"--n-color":o,"--n-text-color":s}}),o=n?c(`spin`,S(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),a,e):void 0,s=w(e,[`spinning`,`show`]),u=h(!1);return i(t=>{let n;if(s.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{u.value=!0},r),t(()=>{clearTimeout(n)});return}}u.value=s.value}),{mergedClsPrefix:t,active:u,mergedStrokeWidth:S(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return D[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$slots:e,mergedClsPrefix:n,description:i}=this,c=e.icon&&this.rotate,l=(i||e.description)&&(s(),o(`div`,{class:b(`${n}-spin-description`)},[g(()=>i||e.description?.())],2)),d=e.icon?(s(),o(`div`,{key:1,class:b([`${n}-spin-body`,this.themeClass])},[a(`div`,{class:b([`${n}-spin`,c&&`${n}-spin--rotate`]),style:u(e.default?``:this.cssVars)},[g(()=>e.icon())],6),g(()=>l)],2)):(s(),o(`div`,{key:2,class:b([`${n}-spin-body`,this.themeClass])},[(s(),t(C,{clsPrefix:n,style:u(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:b(`${n}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),g(()=>l)],2));return this.onRender?.(),e.default?(s(),o(`div`,{key:3,class:b([`${n}-spin-container`,this.themeClass]),style:u(this.cssVars)},[a(`div`,{class:b([`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass]),style:u(this.contentStyle)},[g(()=>e.default?.())],6),r(y,{name:`fade-in-transition`},{default:()=>this.active?d:null},1024)],6)):d}});export{k as t};