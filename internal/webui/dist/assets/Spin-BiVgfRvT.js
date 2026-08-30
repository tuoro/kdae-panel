import{$t as e,Cn as t,J as n,On as r,Qn as i,Sn as a,Tn as o,Un as s,Y as c,_r as l,_t as u,an as d,en as f,ft as p,j as m,kn as h,lr as g,lt as _,ot as v,rn as y,un as b,v as x,xn as S,y as C}from"./client-DecrR2G0.js";import{i as w}from"./text-DpnNyaQe.js";import{c as T}from"./index-CBIB5M6s.js";var E=e([e(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),f(`spin-container`,`
 position: relative;
 `,[f(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[m()])]),f(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),f(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[y(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),f(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),f(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[y(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),D={small:20,medium:18,large:16},O={...n.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...C,strokeWidth:Number},k=h({name:`Spin`,props:O,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:r}=u(e),a=n(`Spin`,`-spin`,E,T,e,t),o=S(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=a.value,{opacitySpinning:i,color:o,textColor:s}=r;return{"--n-bezier":n,"--n-opacity-spinning":i,"--n-size":typeof t==`number`?v(t):r[d(`size`,t)],"--n-color":o,"--n-text-color":s}}),s=r?c(`spin`,S(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),o,e):void 0,l=w(e,[`spinning`,`show`]),f=g(!1);return i(t=>{let n;if(l.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{f.value=!0},r),t(()=>{clearTimeout(n)});return}}f.value=l.value}),{mergedClsPrefix:t,active:f,mergedStrokeWidth:S(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return D[typeof n==`number`?`medium`:n]}),cssVars:r?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{$slots:e,mergedClsPrefix:n,description:i}=this,c=e.icon&&this.rotate,u=(i||e.description)&&(s(),o(`div`,{class:_(`${n}-spin-description`)},[p(()=>i||e.description?.())],2)),d=e.icon?(s(),o(`div`,{key:1,class:_([`${n}-spin-body`,this.themeClass])},[a(`div`,{class:_([`${n}-spin`,c&&`${n}-spin--rotate`]),style:l(e.default?``:this.cssVars)},[p(()=>e.icon())],6),p(()=>u)],2)):(s(),o(`div`,{key:2,class:_([`${n}-spin-body`,this.themeClass])},[(s(),t(x,{clsPrefix:n,style:l(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:_(`${n}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),p(()=>u)],2));return this.onRender?.(),e.default?(s(),o(`div`,{key:3,class:_([`${n}-spin-container`,this.themeClass]),style:l(this.cssVars)},[a(`div`,{class:_([`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass]),style:l(this.contentStyle)},[p(()=>e.default?.())],6),r(b,{name:`fade-in-transition`},{default:()=>this.active?d:null},1024)],6)):d}});export{k as t};