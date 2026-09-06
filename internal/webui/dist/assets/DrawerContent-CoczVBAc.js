import{$t as e,Cn as t,F as n,Fn as r,H as i,M as a,Nn as o,O as s,Qn as c,Sn as l,St as u,Tn as d,U as f,Un as p,Wn as m,X as h,Y as g,Zn as _,_n as v,_r as y,en as b,er as x,ft as S,gt as C,jn as w,kn as T,lr as E,nn as D,pn as O,pr as k,pt as A,rn as j,un as M,ut as N,vt as P,xn as F,zn as I}from"./client-3GjT0YO-.js";import{t as L}from"./use-merged-state-DuBoFKO_.js";import{r as R}from"./text-BS8gAoyY.js";import{G as ee,J as z,K as B,N as V,O as H,Y as U,h as W,it as G,nt as K,p as q,q as J,rt as Y,tt as X}from"./index-fTZ5v0dX.js";var Z=[`onMouseenter`,`onMouseleave`,`onMousedown`],Q={key:1,role:`none`},te=T({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let t=E(!!e.show),r=E(null),i=o(G),a=0,s=``,l=null,u=E(!1),d=E(!1),f=F(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:p,mergedRtlRef:h}=P(e),g=n(`Drawer`,h,p),v=k,y=e=>{d.value=!0,a=f.value?e.clientY:e.clientX,s=document.body.style.cursor,document.body.style.cursor=f.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,D),document.body.addEventListener(`mouseleave`,v),document.body.addEventListener(`mouseup`,k)},b=()=>{l!==null&&(window.clearTimeout(l),l=null),d.value?u.value=!0:l=window.setTimeout(()=>{u.value=!0},300)},x=()=>{l!==null&&(window.clearTimeout(l),l=null),u.value=!1},{doUpdateHeight:S,doUpdateWidth:C}=i,w=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},T=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function D(t){if(d.value){if(f.value){let n=r.value?.offsetHeight||0,i=a-t.clientY;n+=e.placement===`bottom`?i:-i,n=T(n),S(n),a=t.clientY}else{let n=r.value?.offsetWidth||0,i=a-t.clientX;n+=e.placement===`right`?i:-i,n=w(n),C(n),a=t.clientX}}}function k(){d.value&&(a=0,d.value=!1,document.body.style.cursor=s,document.body.removeEventListener(`mousemove`,D),document.body.removeEventListener(`mouseup`,k),document.body.removeEventListener(`mouseleave`,v))}c(()=>{e.show&&(t.value=!0)}),_(()=>e.show,e=>{e||k()}),I(()=>{k()});let A=F(()=>{let{show:t}=e,n=[[O,t]];return e.showMask||n.push([U,e.onClickoutside,void 0,{capture:!0}]),n});function j(){t.value=!1,e.onAfterLeave?.()}return V(F(()=>e.blockScroll&&t.value)),m(Y,r),m(X,null),m(K,null),{bodyRef:r,rtlEnabled:g,mergedClsPrefix:i.mergedClsPrefixRef,isMounted:i.isMountedRef,mergedTheme:i.mergedThemeRef,displayed:t,transitionName:F(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:j,bodyDirectives:A,handleMousedownResizeTrigger:y,handleMouseenterResizeTrigger:b,handleMouseleaveResizeTrigger:x,isDragging:d,isHoverOnResizeTrigger:u}},render(){let{$slots:e,mergedClsPrefix:n}=this;return this.displayDirective===`show`||this.displayed||this.show?x((p(),d(`div`,Q,[(p(),t(B,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(p(),t(M,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>x(w(`div`,r(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${n}-drawer`,this.rtlEnabled&&`${n}-drawer--rtl`,`${n}-drawer--${this.placement}-placement`,this.isDragging&&`${n}-drawer--unselectable`,this.nativeScrollbar&&`${n}-drawer--native-scrollbar`]}),[this.resizable?(p(),d(`div`,{key:2,class:N([`${n}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${n}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Z)):null,this.nativeScrollbar?(p(),d(`div`,{key:3,class:N([`${n}-drawer-content-wrapper`,this.contentClass]),style:y(this.contentStyle),role:`none`},[A(()=>e.default?.())],6)):(p(),t(s,r({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${n}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),S(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[O,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=C;function ie({duration:t=`0.3s`,leaveDuration:n=`0.2s`,name:r=`slide-in-from-bottom`}={}){return[e(`&.${r}-transition-leave-active`,{transition:`transform ${n} ${ne}`}),e(`&.${r}-transition-enter-active`,{transition:`transform ${t} ${re}`}),e(`&.${r}-transition-enter-to`,{transform:`translateY(0)`}),e(`&.${r}-transition-enter-from`,{transform:`translateY(100%)`}),e(`&.${r}-transition-leave-from`,{transform:`translateY(0)`}),e(`&.${r}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=C;function se({duration:t=`0.3s`,leaveDuration:n=`0.2s`,name:r=`slide-in-from-left`}={}){return[e(`&.${r}-transition-leave-active`,{transition:`transform ${n} ${ae}`}),e(`&.${r}-transition-enter-active`,{transition:`transform ${t} ${oe}`}),e(`&.${r}-transition-enter-to`,{transform:`translateX(0)`}),e(`&.${r}-transition-enter-from`,{transform:`translateX(-100%)`}),e(`&.${r}-transition-leave-from`,{transform:`translateX(0)`}),e(`&.${r}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=C;function ue({duration:t=`0.3s`,leaveDuration:n=`0.2s`,name:r=`slide-in-from-right`}={}){return[e(`&.${r}-transition-leave-active`,{transition:`transform ${n} ${ce}`}),e(`&.${r}-transition-enter-active`,{transition:`transform ${t} ${le}`}),e(`&.${r}-transition-enter-to`,{transform:`translateX(0)`}),e(`&.${r}-transition-enter-from`,{transform:`translateX(100%)`}),e(`&.${r}-transition-leave-from`,{transform:`translateX(0)`}),e(`&.${r}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=C;function pe({duration:t=`0.3s`,leaveDuration:n=`0.2s`,name:r=`slide-in-from-top`}={}){return[e(`&.${r}-transition-leave-active`,{transition:`transform ${n} ${de}`}),e(`&.${r}-transition-enter-active`,{transition:`transform ${t} ${fe}`}),e(`&.${r}-transition-enter-to`,{transform:`translateY(0)`}),e(`&.${r}-transition-enter-from`,{transform:`translateY(-100%)`}),e(`&.${r}-transition-leave-from`,{transform:`translateY(0)`}),e(`&.${r}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=e([b(`drawer`,`
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
 `,[ue(),se(),pe(),ie(),j(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),j(`native-scrollbar`,[b(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),D(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[j(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),b(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),b(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[j(`native-scrollbar`,[b(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),b(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),b(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),b(`drawer-header`,`
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
 `,[D(`main`,`
 flex: 1;
 `),D(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),b(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),j(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[D(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),j(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[D(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),j(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[D(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),j(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[D(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),e(`body`,[e(`>`,[b(`drawer-container`,`
 position: fixed;
 `)])]),b(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[e(`> *`,`
 pointer-events: all;
 `)]),b(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[j(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),a({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...g.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=T({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:r}=P(e),a=f(),o=g(`Drawer`,`-drawer`,$,q,e,t),s=E(e.defaultWidth),c=E(e.defaultHeight),l=L(k(e,`width`),s),u=L(k(e,`height`),c),d=F(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:R(l.value)}),p=F(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:R(u.value)}),_=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&i(n,t),r&&i(r,t),s.value=t},v=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&i(n,t),r&&i(r,t),c.value=t},y=F(()=>[{width:d.value,height:p.value},e.drawerStyle||``]);function b(t){let{onMaskClick:n,maskClosable:r}=e;r&&w(!1),n&&n(t)}function x(e){b(e)}let S=W();function C(t){e.onEsc?.(),e.show&&e.closeOnEsc&&H(t)&&(S.value||w(!1))}function w(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":a}=e;r&&i(r,t),a&&i(a,t),n&&!t&&i(n,t)}m(G,{isMountedRef:a,mergedThemeRef:o,mergedClsPrefixRef:t,doUpdateShow:w,doUpdateHeight:v,doUpdateWidth:_});let T=F(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:s,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=o.value;return{"--n-line-height":s,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),D=r?h(`drawer`,void 0,T,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:y,handleOutsideClick:x,handleMaskClick:b,handleEsc:C,mergedTheme:o,cssVars:r?void 0:T,themeClass:D?.themeClass,onRender:D?.onRender,isMounted:a}},render(){let{mergedClsPrefix:e}=this;return p(),t(J,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),x((p(),d(`div`,{class:N([`${e}-drawer-container`,this.namespace,this.themeClass]),style:y(this.cssVars),role:`none`},[this.showMask?(p(),t(M,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(p(),d(`div`,{key:1,"aria-hidden":!0,class:N([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):A(()=>null),(p(),t(te,r(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),S(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[z,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=T({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=o(G,null);e||u(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:n,nativeScrollbar:i,mergedTheme:a,bodyClass:o,bodyStyle:c,bodyContentClass:u,bodyContentStyle:f,headerClass:m,headerStyle:h,footerClass:g,footerStyle:_,scrollbarProps:b,closable:x,$slots:C}=this;return p(),d(`div`,{role:`none`,class:N([`${n}-drawer-content`,i&&`${n}-drawer-content--native-scrollbar`])},[C.header||e||x?(p(),d(`div`,{key:0,class:N([`${n}-drawer-header`,m]),style:y(h),role:`none`},[l(`div`,{class:N(`${n}-drawer-header__main`),role:`heading`,"aria-level":`1`},[C.header===void 0?(p(),d(v,{key:1},[A(()=>e)],64)):(p(),d(v,{key:0},[A(()=>C.header())],64))],2),A(()=>x&&(p(),t(ee,{onClick:this.handleCloseClick,clsPrefix:n,class:N(`${n}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):A(()=>null),i?(p(),d(`div`,{key:2,class:N([`${n}-drawer-body`,o]),style:y(c),role:`none`},[l(`div`,{class:N([`${n}-drawer-body-content-wrapper`,u]),style:y(f),role:`none`},[A(()=>C.default?.())],6)],6)):(p(),t(s,r({key:3,themeOverrides:a.peerOverrides.Scrollbar,theme:a.peers.Scrollbar},b,{class:`${n}-drawer-body`,contentClass:[`${n}-drawer-body-content-wrapper`,u],contentStyle:f}),S(C),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),C.footer?(p(),d(`div`,{key:4,class:N([`${n}-drawer-footer`,g]),style:y(_),role:`none`},[A(()=>C.footer())],6)):A(()=>null)],2)}});export{ge as n,_e as t};