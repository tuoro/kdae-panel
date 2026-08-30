import{$t as e,Cn as t,D as n,Fn as r,H as i,J as a,Nn as o,P as s,Qn as c,Sn as l,St as u,Tn as d,Un as f,V as p,Wn as m,Y as h,Zn as g,_n as _,_r as v,_t as y,dt as b,en as x,er as S,ft as C,ht as w,j as T,jn as E,kn as D,lr as O,lt as k,nn as A,pn as j,pr as M,rn as N,un as P,xn as F,zn as I}from"./client-DecrR2G0.js";import{t as L}from"./use-merged-state-Dvb8YPIJ.js";import{r as R}from"./text-DpnNyaQe.js";import{G as ee,J as z,K as B,N as V,O as H,Y as U,h as W,it as G,nt as K,p as q,q as J,rt as Y,tt as X}from"./index-CBIB5M6s.js";var Z=[`onMouseenter`,`onMouseleave`,`onMousedown`],Q={key:1,role:`none`},te=D({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let t=O(!!e.show),n=O(null),r=o(G),i=0,a=``,l=null,u=O(!1),d=O(!1),f=F(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:p,mergedRtlRef:h}=y(e),_=s(`Drawer`,h,p),v=k,b=e=>{d.value=!0,i=f.value?e.clientY:e.clientX,a=document.body.style.cursor,document.body.style.cursor=f.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,D),document.body.addEventListener(`mouseleave`,v),document.body.addEventListener(`mouseup`,k)},x=()=>{l!==null&&(window.clearTimeout(l),l=null),d.value?u.value=!0:l=window.setTimeout(()=>{u.value=!0},300)},S=()=>{l!==null&&(window.clearTimeout(l),l=null),u.value=!1},{doUpdateHeight:C,doUpdateWidth:w}=r,T=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},E=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function D(t){if(d.value){if(f.value){let r=n.value?.offsetHeight||0,a=i-t.clientY;r+=e.placement===`bottom`?a:-a,r=E(r),C(r),i=t.clientY}else{let r=n.value?.offsetWidth||0,a=i-t.clientX;r+=e.placement===`right`?a:-a,r=T(r),w(r),i=t.clientX}}}function k(){d.value&&(i=0,d.value=!1,document.body.style.cursor=a,document.body.removeEventListener(`mousemove`,D),document.body.removeEventListener(`mouseup`,k),document.body.removeEventListener(`mouseleave`,v))}c(()=>{e.show&&(t.value=!0)}),g(()=>e.show,e=>{e||k()}),I(()=>{k()});let A=F(()=>{let{show:t}=e,n=[[j,t]];return e.showMask||n.push([U,e.onClickoutside,void 0,{capture:!0}]),n});function M(){t.value=!1,e.onAfterLeave?.()}return V(F(()=>e.blockScroll&&t.value)),m(Y,n),m(X,null),m(K,null),{bodyRef:n,rtlEnabled:_,mergedClsPrefix:r.mergedClsPrefixRef,isMounted:r.isMountedRef,mergedTheme:r.mergedThemeRef,displayed:t,transitionName:F(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:M,bodyDirectives:A,handleMousedownResizeTrigger:b,handleMouseenterResizeTrigger:x,handleMouseleaveResizeTrigger:S,isDragging:d,isHoverOnResizeTrigger:u}},render(){let{$slots:e,mergedClsPrefix:i}=this;return this.displayDirective===`show`||this.displayed||this.show?S((f(),d(`div`,Q,[(f(),t(B,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(f(),t(P,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>S(E(`div`,r(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${i}-drawer`,this.rtlEnabled&&`${i}-drawer--rtl`,`${i}-drawer--${this.placement}-placement`,this.isDragging&&`${i}-drawer--unselectable`,this.nativeScrollbar&&`${i}-drawer--native-scrollbar`]}),[this.resizable?(f(),d(`div`,{key:2,class:k([`${i}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${i}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Z)):null,this.nativeScrollbar?(f(),d(`div`,{key:3,class:k([`${i}-drawer-content-wrapper`,this.contentClass]),style:v(this.contentStyle),role:`none`},[C(()=>e.default?.())],6)):(f(),t(n,r({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${i}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),b(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[j,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=w;function ie({duration:t=`0.3s`,leaveDuration:n=`0.2s`,name:r=`slide-in-from-bottom`}={}){return[e(`&.${r}-transition-leave-active`,{transition:`transform ${n} ${ne}`}),e(`&.${r}-transition-enter-active`,{transition:`transform ${t} ${re}`}),e(`&.${r}-transition-enter-to`,{transform:`translateY(0)`}),e(`&.${r}-transition-enter-from`,{transform:`translateY(100%)`}),e(`&.${r}-transition-leave-from`,{transform:`translateY(0)`}),e(`&.${r}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=w;function se({duration:t=`0.3s`,leaveDuration:n=`0.2s`,name:r=`slide-in-from-left`}={}){return[e(`&.${r}-transition-leave-active`,{transition:`transform ${n} ${ae}`}),e(`&.${r}-transition-enter-active`,{transition:`transform ${t} ${oe}`}),e(`&.${r}-transition-enter-to`,{transform:`translateX(0)`}),e(`&.${r}-transition-enter-from`,{transform:`translateX(-100%)`}),e(`&.${r}-transition-leave-from`,{transform:`translateX(0)`}),e(`&.${r}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=w;function ue({duration:t=`0.3s`,leaveDuration:n=`0.2s`,name:r=`slide-in-from-right`}={}){return[e(`&.${r}-transition-leave-active`,{transition:`transform ${n} ${ce}`}),e(`&.${r}-transition-enter-active`,{transition:`transform ${t} ${le}`}),e(`&.${r}-transition-enter-to`,{transform:`translateX(0)`}),e(`&.${r}-transition-enter-from`,{transform:`translateX(100%)`}),e(`&.${r}-transition-leave-from`,{transform:`translateX(0)`}),e(`&.${r}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=w;function pe({duration:t=`0.3s`,leaveDuration:n=`0.2s`,name:r=`slide-in-from-top`}={}){return[e(`&.${r}-transition-leave-active`,{transition:`transform ${n} ${de}`}),e(`&.${r}-transition-enter-active`,{transition:`transform ${t} ${fe}`}),e(`&.${r}-transition-enter-to`,{transform:`translateY(0)`}),e(`&.${r}-transition-enter-from`,{transform:`translateY(-100%)`}),e(`&.${r}-transition-leave-from`,{transform:`translateY(0)`}),e(`&.${r}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=e([x(`drawer`,`
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
 `,[ue(),se(),pe(),ie(),N(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),N(`native-scrollbar`,[x(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),A(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[N(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),x(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),x(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[N(`native-scrollbar`,[x(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),x(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),x(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),x(`drawer-header`,`
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
 `,[A(`main`,`
 flex: 1;
 `),A(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),x(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),N(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[A(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),N(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[A(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),N(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[A(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),N(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[A(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),e(`body`,[e(`>`,[x(`drawer-container`,`
 position: fixed;
 `)])]),x(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[e(`> *`,`
 pointer-events: all;
 `)]),x(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[N(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),T({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...a.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=D({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:r}=y(e),o=i(),s=a(`Drawer`,`-drawer`,$,q,e,t),c=O(e.defaultWidth),l=O(e.defaultHeight),u=L(M(e,`width`),c),d=L(M(e,`height`),l),f=F(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:R(u.value)}),g=F(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:R(d.value)}),_=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&p(n,t),r&&p(r,t),c.value=t},v=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&p(n,t),r&&p(r,t),l.value=t},b=F(()=>[{width:f.value,height:g.value},e.drawerStyle||``]);function x(t){let{onMaskClick:n,maskClosable:r}=e;r&&T(!1),n&&n(t)}function S(e){x(e)}let C=W();function w(t){e.onEsc?.(),e.show&&e.closeOnEsc&&H(t)&&(C.value||T(!1))}function T(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&p(r,t),i&&p(i,t),n&&!t&&p(n,t)}m(G,{isMountedRef:o,mergedThemeRef:s,mergedClsPrefixRef:t,doUpdateShow:T,doUpdateHeight:v,doUpdateWidth:_});let E=F(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=s.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),D=r?h(`drawer`,void 0,E,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:b,handleOutsideClick:S,handleMaskClick:x,handleEsc:w,mergedTheme:s,cssVars:r?void 0:E,themeClass:D?.themeClass,onRender:D?.onRender,isMounted:o}},render(){let{mergedClsPrefix:e}=this;return f(),t(J,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),S((f(),d(`div`,{class:k([`${e}-drawer-container`,this.namespace,this.themeClass]),style:v(this.cssVars),role:`none`},[this.showMask?(f(),t(P,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(f(),d(`div`,{key:1,"aria-hidden":!0,class:k([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):C(()=>null),(f(),t(te,r(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),b(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[z,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=D({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=o(G,null);e||u(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:i,nativeScrollbar:a,mergedTheme:o,bodyClass:s,bodyStyle:c,bodyContentClass:u,bodyContentStyle:p,headerClass:m,headerStyle:h,footerClass:g,footerStyle:y,scrollbarProps:x,closable:S,$slots:w}=this;return f(),d(`div`,{role:`none`,class:k([`${i}-drawer-content`,a&&`${i}-drawer-content--native-scrollbar`])},[w.header||e||S?(f(),d(`div`,{key:0,class:k([`${i}-drawer-header`,m]),style:v(h),role:`none`},[l(`div`,{class:k(`${i}-drawer-header__main`),role:`heading`,"aria-level":`1`},[w.header===void 0?(f(),d(_,{key:1},[C(()=>e)],64)):(f(),d(_,{key:0},[C(()=>w.header())],64))],2),C(()=>S&&(f(),t(ee,{onClick:this.handleCloseClick,clsPrefix:i,class:k(`${i}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):C(()=>null),a?(f(),d(`div`,{key:2,class:k([`${i}-drawer-body`,s]),style:v(c),role:`none`},[l(`div`,{class:k([`${i}-drawer-body-content-wrapper`,u]),style:v(p),role:`none`},[C(()=>w.default?.())],6)],6)):(f(),t(n,r({key:3,themeOverrides:o.peerOverrides.Scrollbar,theme:o.peers.Scrollbar},x,{class:`${i}-drawer-body`,contentClass:[`${i}-drawer-body-content-wrapper`,u],contentStyle:p}),b(w),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),w.footer?(f(),d(`div`,{key:4,class:k([`${i}-drawer-footer`,g]),style:v(y),role:`none`},[C(()=>w.footer())],6)):C(()=>null)],2)}});export{ge as n,_e as t};