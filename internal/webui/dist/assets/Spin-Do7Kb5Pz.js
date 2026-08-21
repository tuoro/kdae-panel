import{C as e,En as t,Gt as n,Jt as r,Kn as i,Qt as a,S as o,Yt as s,an as c,en as l,ft as u,gn as d,j as f,pt as p,rr as m,w as h,wn as g}from"./client-7ydMUZih.js";import{i as _}from"./text-DpqooQtL.js";import{s as v}from"./index-DHYLQA2V.js";var y=r([r(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),s(`spin-container`,`
 position: relative;
 `,[s(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[o()])]),s(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),s(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[a(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),s(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),s(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[a(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),b={small:20,medium:18,large:16},x=Object.assign(Object.assign(Object.assign({},f.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),h),S=g({name:`Spin`,props:x,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:r}=p(e),a=f(`Spin`,`-spin`,y,v,e,t),o=d(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:r},self:i}=a.value,{opacitySpinning:o,color:s,textColor:c}=i;return{"--n-bezier":r,"--n-opacity-spinning":o,"--n-size":typeof t==`number`?n(t):i[l(`size`,t)],"--n-color":s,"--n-text-color":c}}),s=r?u(`spin`,d(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),o,e):void 0,c=_(e,[`spinning`,`show`]),h=m(!1);return i(t=>{let n;if(c.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{h.value=!0},r),t(()=>{clearTimeout(n)});return}}h.value=c.value}),{mergedClsPrefix:t,active:h,mergedStrokeWidth:d(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return b[typeof n==`number`?`medium`:n]}),cssVars:r?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){var n;let{$slots:r,mergedClsPrefix:i,description:a}=this,o=r.icon&&this.rotate,s=(a||r.description)&&t(`div`,{class:`${i}-spin-description`},a||r.description?.call(r)),l=r.icon?t(`div`,{class:[`${i}-spin-body`,this.themeClass]},t(`div`,{class:[`${i}-spin`,o&&`${i}-spin--rotate`],style:r.default?``:this.cssVars},r.icon()),s):t(`div`,{class:[`${i}-spin-body`,this.themeClass]},t(e,{clsPrefix:i,style:r.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${i}-spin`}),s);return(n=this.onRender)==null||n.call(this),r.default?t(`div`,{class:[`${i}-spin-container`,this.themeClass],style:this.cssVars},t(`div`,{class:[`${i}-spin-content`,this.active&&`${i}-spin-content--spinning`,this.contentClass],style:this.contentStyle},r),t(c,{name:`fade-in-transition`},{default:()=>this.active?l:null})):l}});export{S as t};