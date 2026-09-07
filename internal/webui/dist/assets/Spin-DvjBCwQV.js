import{B as e,Bn as t,Gt as n,Ht as r,Q as i,Qt as a,V as o,Vt as s,X as c,Zn as l,_n as u,ar as d,b as f,dn as p,gn as m,jn as h,ln as g,ot as _,pn as v,qt as y,tt as b,un as x,y as S}from"./client-aJ7VylDj.js";import{i as C}from"./text-DRlxVKC3.js";import{t as w}from"./fade-in.cssr-D0aV1a83.js";import{s as T}from"./index-CS_xLr4y.js";var E=s([s(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),r(`spin-container`,`
 position: relative;
 `,[r(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[w()])]),r(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),r(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[n(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),r(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),r(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[n(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),D={small:20,medium:18,large:16},O={...e.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...f,strokeWidth:Number},k=u({name:`Spin`,props:O,slots:Object,setup(n){let{mergedClsPrefixRef:r,inlineThemeDisabled:i}=_(n),a=e(`Spin`,`-spin`,E,T,n,r),s=g(()=>{let{size:e}=n,{common:{cubicBezierEaseInOut:t},self:r}=a.value,{opacitySpinning:i,color:o,textColor:s}=r;return{"--n-bezier":t,"--n-opacity-spinning":i,"--n-size":typeof e==`number`?c(e):r[y(`size`,e)],"--n-color":o,"--n-text-color":s}}),u=i?o(`spin`,g(()=>{let{size:e}=n;return typeof e==`number`?String(e):e[0]}),s,n):void 0,d=C(n,[`spinning`,`show`]),f=l(!1);return t(e=>{let t;if(d.value){let{delay:r}=n;if(r){t=window.setTimeout(()=>{f.value=!0},r),e(()=>{clearTimeout(t)});return}}f.value=d.value}),{mergedClsPrefix:r,active:f,mergedStrokeWidth:g(()=>{let{strokeWidth:e}=n;if(e!==void 0)return e;let{size:t}=n;return D[typeof t==`number`?`medium`:t]}),cssVars:i?void 0:s,themeClass:u?.themeClass,onRender:u?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,r=e.icon&&this.rotate,o=(n||e.description)&&(h(),v(`div`,{class:i(`${t}-spin-description`)},[b(()=>n||e.description?.())],2)),s=e.icon?(h(),v(`div`,{key:1,class:i([`${t}-spin-body`,this.themeClass])},[x(`div`,{class:i([`${t}-spin`,r&&`${t}-spin--rotate`]),style:d(e.default?``:this.cssVars)},[b(()=>e.icon())],6),b(()=>o)],2)):(h(),v(`div`,{key:2,class:i([`${t}-spin-body`,this.themeClass])},[(h(),p(S,{clsPrefix:t,style:d(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:i(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),b(()=>o)],2));return this.onRender?.(),e.default?(h(),v(`div`,{key:3,class:i([`${t}-spin-container`,this.themeClass]),style:d(this.cssVars)},[x(`div`,{class:i([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:d(this.contentStyle)},[b(()=>e.default?.())],6),m(a,{name:`fade-in-transition`},{default:()=>this.active?s:null},1024)],6)):s}});export{k as t};