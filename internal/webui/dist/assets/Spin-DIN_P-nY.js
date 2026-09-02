import{$n as e,An as t,Cn as n,En as r,M as i,Sn as a,Wn as o,X as s,Y as c,b as l,dn as u,en as d,in as f,kn as p,on as m,pt as h,st as g,tn as _,ur as v,ut as y,vr as b,vt as x,wn as S,y as C}from"./client-DOvxO6I9.js";import{i as w}from"./text-CdZaUUMh.js";import{c as T}from"./index-Xj4sOcOi.js";var E=d([d(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),_(`spin-container`,`
 position: relative;
 `,[_(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[i()])]),_(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),_(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[f(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),_(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),_(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[f(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),D={small:20,medium:18,large:16},O={...c.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...l,strokeWidth:Number},k=t({name:`Spin`,props:O,slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=x(t),i=c(`Spin`,`-spin`,E,T,t,n),o=a(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:r}=i.value,{opacitySpinning:a,color:o,textColor:s}=r;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof e==`number`?g(e):r[m(`size`,e)],"--n-color":o,"--n-text-color":s}}),l=r?s(`spin`,a(()=>{let{size:e}=t;return typeof e==`number`?String(e):e[0]}),o,t):void 0,u=w(t,[`spinning`,`show`]),d=v(!1);return e(e=>{let n;if(u.value){let{delay:r}=t;if(r){n=window.setTimeout(()=>{d.value=!0},r),e(()=>{clearTimeout(n)});return}}d.value=u.value}),{mergedClsPrefix:n,active:d,mergedStrokeWidth:a(()=>{let{strokeWidth:e}=t;if(e!==void 0)return e;let{size:n}=t;return D[typeof n==`number`?`medium`:n]}),cssVars:r?void 0:o,themeClass:l?.themeClass,onRender:l?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:i}=this,a=e.icon&&this.rotate,s=(i||e.description)&&(o(),r(`div`,{class:y(`${t}-spin-description`)},[h(()=>i||e.description?.())],2)),c=e.icon?(o(),r(`div`,{key:1,class:y([`${t}-spin-body`,this.themeClass])},[n(`div`,{class:y([`${t}-spin`,a&&`${t}-spin--rotate`]),style:b(e.default?``:this.cssVars)},[h(()=>e.icon())],6),h(()=>s)],2)):(o(),r(`div`,{key:2,class:y([`${t}-spin-body`,this.themeClass])},[(o(),S(C,{clsPrefix:t,style:b(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:y(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),h(()=>s)],2));return this.onRender?.(),e.default?(o(),r(`div`,{key:3,class:y([`${t}-spin-container`,this.themeClass]),style:b(this.cssVars)},[n(`div`,{class:y([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:b(this.contentStyle)},[h(()=>e.default?.())],6),p(u,{name:`fade-in-transition`},{default:()=>this.active?c:null},1024)],6)):c}});export{k as t};