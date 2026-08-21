import{C as e,En as t,Gt as n,Jt as r,Qt as i,S as a,Yt as o,an as s,en as c,ft as l,gn as u,ir as d,j as f,pt as p,qn as m,w as h,wn as g}from"./client-Bvr5b7kq.js";import{i as _}from"./text-DRrx6bZf.js";import{s as v}from"./index-DdA6q9Ln.js";var y=r([r(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),o(`spin-container`,`
 position: relative;
 `,[o(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[a()])]),o(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),o(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[i(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),o(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),o(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[i(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),b={small:20,medium:18,large:16},x=Object.assign(Object.assign(Object.assign({},f.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),h),S=g({name:`Spin`,props:x,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:r}=p(e),i=f(`Spin`,`-spin`,y,v,e,t),a=u(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:r},self:a}=i.value,{opacitySpinning:o,color:s,textColor:l}=a;return{"--n-bezier":r,"--n-opacity-spinning":o,"--n-size":typeof t==`number`?n(t):a[c(`size`,t)],"--n-color":s,"--n-text-color":l}}),o=r?l(`spin`,u(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),a,e):void 0,s=_(e,[`spinning`,`show`]),h=d(!1);return m(t=>{let n;if(s.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{h.value=!0},r),t(()=>{clearTimeout(n)});return}}h.value=s.value}),{mergedClsPrefix:t,active:h,mergedStrokeWidth:u(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return b[typeof n==`number`?`medium`:n]}),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){var n;let{$slots:r,mergedClsPrefix:i,description:a}=this,o=r.icon&&this.rotate,c=(a||r.description)&&t(`div`,{class:`${i}-spin-description`},a||r.description?.call(r)),l=r.icon?t(`div`,{class:[`${i}-spin-body`,this.themeClass]},t(`div`,{class:[`${i}-spin`,o&&`${i}-spin--rotate`],style:r.default?``:this.cssVars},r.icon()),c):t(`div`,{class:[`${i}-spin-body`,this.themeClass]},t(e,{clsPrefix:i,style:r.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${i}-spin`}),c);return(n=this.onRender)==null||n.call(this),r.default?t(`div`,{class:[`${i}-spin-container`,this.themeClass],style:this.cssVars},t(`div`,{class:[`${i}-spin-content`,this.active&&`${i}-spin-content--spinning`,this.contentClass],style:this.contentStyle},r),t(s,{name:`fade-in-transition`},{default:()=>this.active?l:null})):l}});export{S as t};