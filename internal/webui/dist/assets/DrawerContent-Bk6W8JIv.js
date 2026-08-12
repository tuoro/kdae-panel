import{An as e,En as t,Gn as n,Jn as r,Jt as i,Kn as a,N as o,On as s,P as c,Pn as l,Pt as u,Qt as d,S as f,Tt as p,Yt as m,Zt as h,_ as g,an as _,cn as v,ft as y,gn as b,j as x,pt as S,rr as C,sr as w,wn as T,wt as E,zn as D}from"./client-7ydMUZih.js";import{_ as O,c as k,f as A,g as j,l as M,o as N,p as P,s as F}from"./light-CqZR8w70.js";import{t as I}from"./use-merged-state-Bt7Nbk0v.js";import{r as L}from"./text-DpqooQtL.js";import{r as R}from"./fade-in-height-expand.cssr-B8WMQWpp.js";import{F as z,I as B,N as V,f as H}from"./index-gqNpGYtl.js";var U=T({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let t=C(!!e.show),r=C(null),i=s(O),o=0,u=``,d=null,f=C(!1),p=C(!1),m=b(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:h,mergedRtlRef:g}=S(e),_=c(`Drawer`,g,h),y=L,x=e=>{p.value=!0,o=m.value?e.clientY:e.clientX,u=document.body.style.cursor,document.body.style.cursor=m.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,I),document.body.addEventListener(`mouseleave`,y),document.body.addEventListener(`mouseup`,L)},w=()=>{d!==null&&(window.clearTimeout(d),d=null),p.value?f.value=!0:d=window.setTimeout(()=>{f.value=!0},300)},T=()=>{d!==null&&(window.clearTimeout(d),d=null),f.value=!1},{doUpdateHeight:E,doUpdateWidth:k}=i,N=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},F=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function I(t){if(p.value){if(m.value){let n=r.value?.offsetHeight||0,i=o-t.clientY;n+=e.placement===`bottom`?i:-i,n=F(n),E(n),o=t.clientY}else{let n=r.value?.offsetWidth||0,i=o-t.clientX;n+=e.placement===`right`?i:-i,n=N(n),k(n),o=t.clientX}}}function L(){p.value&&(o=0,p.value=!1,document.body.style.cursor=u,document.body.removeEventListener(`mousemove`,I),document.body.removeEventListener(`mouseup`,L),document.body.removeEventListener(`mouseleave`,y))}a(()=>{e.show&&(t.value=!0)}),n(()=>e.show,e=>{e||L()}),l(()=>{L()});let R=b(()=>{let{show:t}=e,n=[[v,t]];return e.showMask||n.push([M,e.onClickoutside,void 0,{capture:!0}]),n});function B(){var n;t.value=!1,(n=e.onAfterLeave)==null||n.call(e)}return z(b(()=>e.blockScroll&&t.value)),D(j,r),D(A,null),D(P,null),{bodyRef:r,rtlEnabled:_,mergedClsPrefix:i.mergedClsPrefixRef,isMounted:i.isMountedRef,mergedTheme:i.mergedThemeRef,displayed:t,transitionName:b(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:B,bodyDirectives:R,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:w,handleMouseleaveResizeTrigger:T,isDragging:p,isHoverOnResizeTrigger:f}},render(){let{$slots:n,mergedClsPrefix:i}=this;return this.displayDirective===`show`||this.displayed||this.show?r(t(`div`,{role:`none`},t(N,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>t(_,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>r(t(`div`,e(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${i}-drawer`,this.rtlEnabled&&`${i}-drawer--rtl`,`${i}-drawer--${this.placement}-placement`,this.isDragging&&`${i}-drawer--unselectable`,this.nativeScrollbar&&`${i}-drawer--native-scrollbar`]}),[this.resizable?t(`div`,{class:[`${i}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${i}-drawer__resize-trigger--hover`],onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger}):null,this.nativeScrollbar?t(`div`,{class:[`${i}-drawer-content-wrapper`,this.contentClass],style:this.contentStyle,role:`none`},n):t(g,Object.assign({},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${i}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),n)]),this.bodyDirectives)})})),[[v,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:W,cubicBezierEaseOut:G}=o;function K({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[i(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${W}`}),i(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${G}`}),i(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),i(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),i(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),i(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:q,cubicBezierEaseOut:J}=o;function Y({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[i(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${q}`}),i(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${J}`}),i(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),i(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),i(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),i(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:X,cubicBezierEaseOut:Z}=o;function Q({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[i(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${X}`}),i(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${Z}`}),i(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),i(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),i(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),i(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:$,cubicBezierEaseOut:ee}=o;function te({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[i(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${$}`}),i(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ee}`}),i(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),i(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),i(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),i(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var ne=i([m(`drawer`,`
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
 `,[Q(),Y(),te(),K(),d(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),d(`native-scrollbar`,[m(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),h(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[d(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),m(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),m(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[d(`native-scrollbar`,[m(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),m(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),m(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),m(`drawer-header`,`
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
 `,[h(`main`,`
 flex: 1;
 `),h(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),m(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),d(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[h(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),d(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[h(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),d(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[h(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),d(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[h(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),i(`body`,[i(`>`,[m(`drawer-container`,`
 position: fixed;
 `)])]),m(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[i(`> *`,`
 pointer-events: all;
 `)]),m(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[d(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),f({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),re=Object.assign(Object.assign({},x.props),{show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function}),ie=T({name:`Drawer`,inheritAttrs:!1,props:re,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:r}=S(e),i=u(),a=x(`Drawer`,`-drawer`,ne,H,e,t),o=C(e.defaultWidth),s=C(e.defaultHeight),c=I(w(e,`width`),o),l=I(w(e,`height`),s),d=b(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:L(c.value)}),f=b(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:L(l.value)}),p=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&E(n,t),r&&E(r,t),o.value=t},m=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&E(n,t),r&&E(r,t),s.value=t},h=b(()=>[{width:d.value,height:f.value},e.drawerStyle||``]);function g(t){let{onMaskClick:n,maskClosable:r}=e;r&&k(!1),n&&n(t)}function _(e){g(e)}let v=B();function T(t){var n;(n=e.onEsc)==null||n.call(e),e.show&&e.closeOnEsc&&V(t)&&(v.value||k(!1))}function k(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&E(r,t),i&&E(i,t),n&&!t&&E(n,t)}D(O,{isMountedRef:i,mergedThemeRef:a,mergedClsPrefixRef:t,doUpdateShow:k,doUpdateHeight:m,doUpdateWidth:p});let A=b(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:o,lineHeight:s,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=a.value;return{"--n-line-height":s,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":o,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),j=r?y(`drawer`,void 0,A,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:h,handleOutsideClick:_,handleMaskClick:g,handleEsc:T,mergedTheme:a,cssVars:r?void 0:A,themeClass:j?.themeClass,onRender:j?.onRender,isMounted:i}},render(){let{mergedClsPrefix:e}=this;return t(F,{to:this.to,show:this.show},{default:()=>{var n;return(n=this.onRender)==null||n.call(this),r(t(`div`,{class:[`${e}-drawer-container`,this.namespace,this.themeClass],style:this.cssVars,role:`none`},this.showMask?t(_,{name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?t(`div`,{"aria-hidden":!0,class:[`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`],onClick:this.handleMaskClick}):null}):null,t(U,Object.assign({},this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),this.$slots)),[[k,{zIndex:this.zIndex,enabled:this.show}]])}})}}),ae=T({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=s(O,null);e||p(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:n,nativeScrollbar:r,mergedTheme:i,bodyClass:a,bodyStyle:o,bodyContentClass:s,bodyContentStyle:c,headerClass:l,headerStyle:u,footerClass:d,footerStyle:f,scrollbarProps:p,closable:m,$slots:h}=this;return t(`div`,{role:`none`,class:[`${n}-drawer-content`,r&&`${n}-drawer-content--native-scrollbar`]},h.header||e||m?t(`div`,{class:[`${n}-drawer-header`,l],style:u,role:`none`},t(`div`,{class:`${n}-drawer-header__main`,role:`heading`,"aria-level":`1`},h.header===void 0?e:h.header()),m&&t(R,{onClick:this.handleCloseClick,clsPrefix:n,class:`${n}-drawer-header__close`,absolute:!0})):null,r?t(`div`,{class:[`${n}-drawer-body`,a],style:o,role:`none`},t(`div`,{class:[`${n}-drawer-body-content-wrapper`,s],style:c,role:`none`},h)):t(g,Object.assign({themeOverrides:i.peerOverrides.Scrollbar,theme:i.peers.Scrollbar},p,{class:`${n}-drawer-body`,contentClass:[`${n}-drawer-body-content-wrapper`,s],contentStyle:c}),h),h.footer?t(`div`,{class:[`${n}-drawer-footer`,d],style:f,role:`none`},h.footer()):null)}});export{ie as n,ae as t};