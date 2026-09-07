import{$ as e,$t as t,H as n,Ht as r,Jt as i,Kt as a,Mn as o,O as s,Qn as c,Ut as l,V as u,Vn as d,Z as f,_n as p,b as m,dn as h,fn as g,mn as _,nt as v,or as y,st as b,un as x,vn as S,y as C}from"./client-DkW07njR.js";import{i as w}from"./text-lz9v6H13.js";import{s as T}from"./index-Dxee6kLX.js";var E=r([r(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),l(`spin-container`,`
 position: relative;
 `,[l(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[s()])]),l(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),l(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[a(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),l(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),l(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[a(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),D={small:20,medium:18,large:16},O={...u.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...m,strokeWidth:Number},k=S({name:`Spin`,props:O,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:r}=b(e),a=u(`Spin`,`-spin`,E,T,e,t),o=x(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=a.value,{opacitySpinning:o,color:s,textColor:c}=r;return{"--n-bezier":n,"--n-opacity-spinning":o,"--n-size":typeof t==`number`?f(t):r[i(`size`,t)],"--n-color":s,"--n-text-color":c}}),s=r?n(`spin`,x(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),o,e):void 0,l=w(e,[`spinning`,`show`]),p=c(!1);return d(t=>{let n;if(l.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{p.value=!0},r),t(()=>{clearTimeout(n)});return}}p.value=l.value}),{mergedClsPrefix:t,active:p,mergedStrokeWidth:x(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return D[typeof n==`number`?`medium`:n]}),cssVars:r?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{$slots:n,mergedClsPrefix:r,description:i}=this,a=n.icon&&this.rotate,s=(i||n.description)&&(o(),_(`div`,{class:e(`${r}-spin-description`)},[v(()=>i||n.description?.())],2)),c=n.icon?(o(),_(`div`,{key:1,class:e([`${r}-spin-body`,this.themeClass])},[h(`div`,{class:e([`${r}-spin`,a&&`${r}-spin--rotate`]),style:y(n.default?``:this.cssVars)},[v(()=>n.icon())],6),v(()=>s)],2)):(o(),_(`div`,{key:2,class:e([`${r}-spin-body`,this.themeClass])},[(o(),g(C,{clsPrefix:r,style:y(n.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:e(`${r}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),v(()=>s)],2));return this.onRender?.(),n.default?(o(),_(`div`,{key:3,class:e([`${r}-spin-container`,this.themeClass]),style:y(this.cssVars)},[h(`div`,{class:e([`${r}-spin-content`,this.active&&`${r}-spin-content--spinning`,this.contentClass]),style:y(this.contentStyle)},[v(()=>n.default?.())],6),p(t,{name:`fade-in-transition`},{default:()=>this.active?c:null},1024)],6)):c}});export{k as t};