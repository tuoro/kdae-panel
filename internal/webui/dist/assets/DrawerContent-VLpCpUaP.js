import{An as e,En as t,Jt as n,Kn as r,N as i,On as a,P as o,Pn as s,Pt as c,Qt as l,S as u,Tt as d,Yn as f,Yt as p,Zt as m,_ as h,an as g,cn as _,cr as v,ft as y,gn as b,ir as x,j as S,pt as C,qn as w,wn as T,wt as E,zn as D}from"./client-Bvr5b7kq.js";import{_ as O,c as k,f as A,g as j,l as M,o as N,p as P,s as F}from"./light-BJ0f_k_W.js";import{t as I}from"./use-merged-state-6Ad8uSz9.js";import{r as L}from"./text-DRrx6bZf.js";import{r as R}from"./fade-in-height-expand.cssr-BhQOpJwg.js";import{F as z,I as B,N as V,f as H}from"./index-DdA6q9Ln.js";var U=T({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let t=x(!!e.show),n=x(null),i=a(O),c=0,l=``,u=null,d=x(!1),f=x(!1),p=b(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:m,mergedRtlRef:h}=C(e),g=o(`Drawer`,h,m),v=L,y=e=>{f.value=!0,c=p.value?e.clientY:e.clientX,l=document.body.style.cursor,document.body.style.cursor=p.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,I),document.body.addEventListener(`mouseleave`,v),document.body.addEventListener(`mouseup`,L)},S=()=>{u!==null&&(window.clearTimeout(u),u=null),f.value?d.value=!0:u=window.setTimeout(()=>{d.value=!0},300)},T=()=>{u!==null&&(window.clearTimeout(u),u=null),d.value=!1},{doUpdateHeight:E,doUpdateWidth:k}=i,N=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},F=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function I(t){if(f.value){if(p.value){let r=n.value?.offsetHeight||0,i=c-t.clientY;r+=e.placement===`bottom`?i:-i,r=F(r),E(r),c=t.clientY}else{let r=n.value?.offsetWidth||0,i=c-t.clientX;r+=e.placement===`right`?i:-i,r=N(r),k(r),c=t.clientX}}}function L(){f.value&&(c=0,f.value=!1,document.body.style.cursor=l,document.body.removeEventListener(`mousemove`,I),document.body.removeEventListener(`mouseup`,L),document.body.removeEventListener(`mouseleave`,v))}w(()=>{e.show&&(t.value=!0)}),r(()=>e.show,e=>{e||L()}),s(()=>{L()});let R=b(()=>{let{show:t}=e,n=[[_,t]];return e.showMask||n.push([M,e.onClickoutside,void 0,{capture:!0}]),n});function B(){var n;t.value=!1,(n=e.onAfterLeave)==null||n.call(e)}return z(b(()=>e.blockScroll&&t.value)),D(j,n),D(A,null),D(P,null),{bodyRef:n,rtlEnabled:g,mergedClsPrefix:i.mergedClsPrefixRef,isMounted:i.isMountedRef,mergedTheme:i.mergedThemeRef,displayed:t,transitionName:b(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:B,bodyDirectives:R,handleMousedownResizeTrigger:y,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:T,isDragging:f,isHoverOnResizeTrigger:d}},render(){let{$slots:n,mergedClsPrefix:r}=this;return this.displayDirective===`show`||this.displayed||this.show?f(t(`div`,{role:`none`},t(N,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>t(g,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>f(t(`div`,e(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${r}-drawer`,this.rtlEnabled&&`${r}-drawer--rtl`,`${r}-drawer--${this.placement}-placement`,this.isDragging&&`${r}-drawer--unselectable`,this.nativeScrollbar&&`${r}-drawer--native-scrollbar`]}),[this.resizable?t(`div`,{class:[`${r}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${r}-drawer__resize-trigger--hover`],onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger}):null,this.nativeScrollbar?t(`div`,{class:[`${r}-drawer-content-wrapper`,this.contentClass],style:this.contentStyle,role:`none`},n):t(h,Object.assign({},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${r}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),n)]),this.bodyDirectives)})})),[[_,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:W,cubicBezierEaseOut:G}=i;function K({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:r=`slide-in-from-bottom`}={}){return[n(`&.${r}-transition-leave-active`,{transition:`transform ${t} ${W}`}),n(`&.${r}-transition-enter-active`,{transition:`transform ${e} ${G}`}),n(`&.${r}-transition-enter-to`,{transform:`translateY(0)`}),n(`&.${r}-transition-enter-from`,{transform:`translateY(100%)`}),n(`&.${r}-transition-leave-from`,{transform:`translateY(0)`}),n(`&.${r}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:q,cubicBezierEaseOut:J}=i;function Y({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:r=`slide-in-from-left`}={}){return[n(`&.${r}-transition-leave-active`,{transition:`transform ${t} ${q}`}),n(`&.${r}-transition-enter-active`,{transition:`transform ${e} ${J}`}),n(`&.${r}-transition-enter-to`,{transform:`translateX(0)`}),n(`&.${r}-transition-enter-from`,{transform:`translateX(-100%)`}),n(`&.${r}-transition-leave-from`,{transform:`translateX(0)`}),n(`&.${r}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:X,cubicBezierEaseOut:Z}=i;function Q({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:r=`slide-in-from-right`}={}){return[n(`&.${r}-transition-leave-active`,{transition:`transform ${t} ${X}`}),n(`&.${r}-transition-enter-active`,{transition:`transform ${e} ${Z}`}),n(`&.${r}-transition-enter-to`,{transform:`translateX(0)`}),n(`&.${r}-transition-enter-from`,{transform:`translateX(100%)`}),n(`&.${r}-transition-leave-from`,{transform:`translateX(0)`}),n(`&.${r}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:$,cubicBezierEaseOut:ee}=i;function te({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:r=`slide-in-from-top`}={}){return[n(`&.${r}-transition-leave-active`,{transition:`transform ${t} ${$}`}),n(`&.${r}-transition-enter-active`,{transition:`transform ${e} ${ee}`}),n(`&.${r}-transition-enter-to`,{transform:`translateY(0)`}),n(`&.${r}-transition-enter-from`,{transform:`translateY(-100%)`}),n(`&.${r}-transition-leave-from`,{transform:`translateY(0)`}),n(`&.${r}-transition-leave-to`,{transform:`translateY(-100%)`})]}var ne=n([p(`drawer`,`
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `,[Q(),Y(),te(),K(),l(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),l(`native-scrollbar`,[p(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),m(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[l(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),p(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),p(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[l(`native-scrollbar`,[p(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),p(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),p(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),p(`drawer-header`,`
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `,[m(`main`,`
 flex: 1;
 `),m(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),p(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),l(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[m(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),l(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[m(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),l(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[m(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),l(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[m(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),n(`body`,[n(`>`,[p(`drawer-container`,`
 position: fixed;
 `)])]),p(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[n(`> *`,`
 pointer-events: all;
 `)]),p(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[l(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),u({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),re=Object.assign(Object.assign({},S.props),{show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function}),ie=T({name:`Drawer`,inheritAttrs:!1,props:re,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:r}=C(e),i=c(),a=S(`Drawer`,`-drawer`,ne,H,e,t),o=x(e.defaultWidth),s=x(e.defaultHeight),l=I(v(e,`width`),o),u=I(v(e,`height`),s),d=b(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:L(l.value)}),f=b(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:L(u.value)}),p=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&E(n,t),r&&E(r,t),o.value=t},m=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&E(n,t),r&&E(r,t),s.value=t},h=b(()=>[{width:d.value,height:f.value},e.drawerStyle||``]);function g(t){let{onMaskClick:n,maskClosable:r}=e;r&&k(!1),n&&n(t)}function _(e){g(e)}let w=B();function T(t){var n;(n=e.onEsc)==null||n.call(e),e.show&&e.closeOnEsc&&V(t)&&(w.value||k(!1))}function k(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&E(r,t),i&&E(i,t),n&&!t&&E(n,t)}D(O,{isMountedRef:i,mergedThemeRef:a,mergedClsPrefixRef:t,doUpdateShow:k,doUpdateHeight:m,doUpdateWidth:p});let A=b(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:o,lineHeight:s,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=a.value;return{"--n-line-height":s,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":o,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),j=r?y(`drawer`,void 0,A,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:h,handleOutsideClick:_,handleMaskClick:g,handleEsc:T,mergedTheme:a,cssVars:r?void 0:A,themeClass:j?.themeClass,onRender:j?.onRender,isMounted:i}},render(){let{mergedClsPrefix:e}=this;return t(F,{to:this.to,show:this.show},{default:()=>{var n;return(n=this.onRender)==null||n.call(this),f(t(`div`,{class:[`${e}-drawer-container`,this.namespace,this.themeClass],style:this.cssVars,role:`none`},this.showMask?t(g,{name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?t(`div`,{"aria-hidden":!0,class:[`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`],onClick:this.handleMaskClick}):null}):null,t(U,Object.assign({},this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),this.$slots)),[[k,{zIndex:this.zIndex,enabled:this.show}]])}})}}),ae=T({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=a(O,null);e||d(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:n,nativeScrollbar:r,mergedTheme:i,bodyClass:a,bodyStyle:o,bodyContentClass:s,bodyContentStyle:c,headerClass:l,headerStyle:u,footerClass:d,footerStyle:f,scrollbarProps:p,closable:m,$slots:g}=this;return t(`div`,{role:`none`,class:[`${n}-drawer-content`,r&&`${n}-drawer-content--native-scrollbar`]},g.header||e||m?t(`div`,{class:[`${n}-drawer-header`,l],style:u,role:`none`},t(`div`,{class:`${n}-drawer-header__main`,role:`heading`,"aria-level":`1`},g.header===void 0?e:g.header()),m&&t(R,{onClick:this.handleCloseClick,clsPrefix:n,class:`${n}-drawer-header__close`,absolute:!0})):null,r?t(`div`,{class:[`${n}-drawer-body`,a],style:o,role:`none`},t(`div`,{class:[`${n}-drawer-body-content-wrapper`,s],style:c,role:`none`},g)):t(h,Object.assign({themeOverrides:i.peerOverrides.Scrollbar,theme:i.peers.Scrollbar},p,{class:`${n}-drawer-body`,contentClass:[`${n}-drawer-body-content-wrapper`,s],contentStyle:c}),g),g.footer?t(`div`,{class:[`${n}-drawer-footer`,d],style:f,role:`none`},g.footer()):null)}});export{ie as n,ae as t};