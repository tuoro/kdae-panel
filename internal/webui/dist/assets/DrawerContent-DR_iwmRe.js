import{B as e,Bn as t,Cn as n,Dn as r,F as i,Gt as a,Hn as o,Ht as s,I as c,Mn as l,O as u,Q as d,Qt as f,V as p,Vt as m,Wt as h,Zn as g,_n as _,an as v,ar as y,dn as b,et as x,it as S,jn as C,ln as w,ot as T,pn as E,tn as D,tr as O,tt as k,un as A,ut as j,xn as M,yn as N,zn as P}from"./client-aJ7VylDj.js";import{t as F}from"./Scrollbar-BwDSgsaA.js";import{S as I,_ as L,a as ee,c as te,o as R,s as z,t as B,v as V,x as H}from"./event-Dt-XIvq2.js";import{t as U}from"./use-merged-state-C2wcLaf9.js";import{r as W}from"./text-DRlxVKC3.js";import{t as G}from"./fade-in.cssr-D0aV1a83.js";import{s as K}from"./fade-in-height-expand.cssr-BJwCRVuW.js";import{O as q,f as J,m as Y}from"./index-CS_xLr4y.js";var X=[`onMouseenter`,`onMouseleave`,`onMousedown`],Z={key:1,role:`none`},Q=_({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let n=g(!!e.show),i=g(null),a=M(I),o=0,s=``,c=null,d=g(!1),f=g(!1),p=w(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:m,mergedRtlRef:h}=T(e),_=u(`Drawer`,h,m),v=A,y=e=>{f.value=!0,o=p.value?e.clientY:e.clientX,s=document.body.style.cursor,document.body.style.cursor=p.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,k),document.body.addEventListener(`mouseleave`,v),document.body.addEventListener(`mouseup`,A)},b=()=>{c!==null&&(window.clearTimeout(c),c=null),f.value?d.value=!0:c=window.setTimeout(()=>{d.value=!0},300)},x=()=>{c!==null&&(window.clearTimeout(c),c=null),d.value=!1},{doUpdateHeight:S,doUpdateWidth:C}=a,E=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},O=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function k(t){if(f.value){if(p.value){let n=i.value?.offsetHeight||0,r=o-t.clientY;n+=e.placement===`bottom`?r:-r,n=O(n),S(n),o=t.clientY}else{let n=i.value?.offsetWidth||0,r=o-t.clientX;n+=e.placement===`right`?r:-r,n=E(n),C(n),o=t.clientX}}}function A(){f.value&&(o=0,f.value=!1,document.body.style.cursor=s,document.body.removeEventListener(`mousemove`,k),document.body.removeEventListener(`mouseup`,A),document.body.removeEventListener(`mouseleave`,v))}t(()=>{e.show&&(n.value=!0)}),P(()=>e.show,e=>{e||A()}),r(()=>{A()});let j=w(()=>{let{show:t}=e,n=[[D,t]];return e.showMask||n.push([te,e.onClickoutside,void 0,{capture:!0}]),n});function N(){n.value=!1,e.onAfterLeave?.()}return q(w(()=>e.blockScroll&&n.value)),l(H,i),l(L,null),l(V,null),{bodyRef:i,rtlEnabled:_,mergedClsPrefix:a.mergedClsPrefixRef,isMounted:a.isMountedRef,mergedTheme:a.mergedThemeRef,displayed:n,transitionName:w(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:N,bodyDirectives:j,handleMousedownResizeTrigger:y,handleMouseenterResizeTrigger:b,handleMouseleaveResizeTrigger:x,isDragging:f,isHoverOnResizeTrigger:d}},render(){let{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective===`show`||this.displayed||this.show?o((C(),E(`div`,Z,[(C(),b(ee,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(C(),b(f,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>o(N(`div`,n(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?(C(),E(`div`,{key:2,class:d([`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,X)):null,this.nativeScrollbar?(C(),E(`div`,{key:3,class:d([`${t}-drawer-content-wrapper`,this.contentClass]),style:y(this.contentStyle),role:`none`},[k(()=>e.default?.())],6)):(C(),b(F,n({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),x(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[D,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=S;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[m(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),m(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),m(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),m(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),m(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),m(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=S;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[m(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),m(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),m(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),m(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),m(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),m(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=S;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[m(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),m(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),m(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),m(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),m(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),m(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=S;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[m(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),m(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),m(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),m(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),m(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),m(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=m([s(`drawer`,`
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
 `,[ue(),se(),pe(),ie(),a(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),a(`native-scrollbar`,[s(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),h(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[a(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),s(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),s(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[a(`native-scrollbar`,[s(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),s(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),s(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),s(`drawer-header`,`
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
 `)]),s(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),a(`right-placement`,`
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
 `)]),a(`left-placement`,`
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
 `)]),a(`top-placement`,`
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
 `)]),a(`bottom-placement`,`
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
 `)])]),m(`body`,[m(`>`,[s(`drawer-container`,`
 position: fixed;
 `)])]),s(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[m(`> *`,`
 pointer-events: all;
 `)]),s(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[a(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),G({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...e.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=_({name:`Drawer`,inheritAttrs:!1,props:he,setup(t){let{mergedClsPrefixRef:n,namespaceRef:r,inlineThemeDisabled:a}=T(t),o=c(),s=e(`Drawer`,`-drawer`,$,J,t,n),u=g(t.defaultWidth),d=g(t.defaultHeight),f=U(O(t,`width`),u),m=U(O(t,`height`),d),h=w(()=>{let{placement:e}=t;return e===`top`||e===`bottom`?``:W(f.value)}),_=w(()=>{let{placement:e}=t;return e===`left`||e===`right`?``:W(m.value)}),v=e=>{let{onUpdateWidth:n,"onUpdate:width":r}=t;n&&i(n,e),r&&i(r,e),u.value=e},y=e=>{let{onUpdateHeight:n,"onUpdate:width":r}=t;n&&i(n,e),r&&i(r,e),d.value=e},b=w(()=>[{width:h.value,height:_.value},t.drawerStyle||``]);function x(e){let{onMaskClick:n,maskClosable:r}=t;r&&D(!1),n&&n(e)}function S(e){x(e)}let C=Y();function E(e){t.onEsc?.(),t.show&&t.closeOnEsc&&B(e)&&(C.value||D(!1))}function D(e){let{onHide:n,onUpdateShow:r,"onUpdate:show":a}=t;r&&i(r,e),a&&i(a,e),n&&!e&&i(n,e)}l(I,{isMountedRef:o,mergedThemeRef:s,mergedClsPrefixRef:n,doUpdateShow:D,doUpdateHeight:y,doUpdateWidth:v});let k=w(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=s.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),A=a?p(`drawer`,void 0,k,t):void 0;return{mergedClsPrefix:n,namespace:r,mergedBodyStyle:b,handleOutsideClick:S,handleMaskClick:x,handleEsc:E,mergedTheme:s,cssVars:a?void 0:k,themeClass:A?.themeClass,onRender:A?.onRender,isMounted:o}},render(){let{mergedClsPrefix:e}=this;return C(),b(R,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),o((C(),E(`div`,{class:d([`${e}-drawer-container`,this.namespace,this.themeClass]),style:y(this.cssVars),role:`none`},[this.showMask?(C(),b(f,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(C(),E(`div`,{key:1,"aria-hidden":!0,class:d([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):k(()=>null),(C(),b(Q,n(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),x(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[z,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=_({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=M(I,null);e||j(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:t,nativeScrollbar:r,mergedTheme:i,bodyClass:a,bodyStyle:o,bodyContentClass:s,bodyContentStyle:c,headerClass:l,headerStyle:u,footerClass:f,footerStyle:p,scrollbarProps:m,closable:h,$slots:g}=this;return C(),E(`div`,{role:`none`,class:d([`${t}-drawer-content`,r&&`${t}-drawer-content--native-scrollbar`])},[g.header||e||h?(C(),E(`div`,{key:0,class:d([`${t}-drawer-header`,l]),style:y(u),role:`none`},[A(`div`,{class:d(`${t}-drawer-header__main`),role:`heading`,"aria-level":`1`},[g.header===void 0?(C(),E(v,{key:1},[k(()=>e)],64)):(C(),E(v,{key:0},[k(()=>g.header())],64))],2),k(()=>h&&(C(),b(K,{onClick:this.handleCloseClick,clsPrefix:t,class:d(`${t}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):k(()=>null),r?(C(),E(`div`,{key:2,class:d([`${t}-drawer-body`,a]),style:y(o),role:`none`},[A(`div`,{class:d([`${t}-drawer-body-content-wrapper`,s]),style:y(c),role:`none`},[k(()=>g.default?.())],6)],6)):(C(),b(F,n({key:3,themeOverrides:i.peerOverrides.Scrollbar,theme:i.peers.Scrollbar},m,{class:`${t}-drawer-body`,contentClass:[`${t}-drawer-body-content-wrapper`,s],contentStyle:c}),x(g),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),g.footer?(C(),E(`div`,{key:4,class:d([`${t}-drawer-footer`,f]),style:y(p),role:`none`},[k(()=>g.footer())],6)):k(()=>null)],2)}});export{ge as n,_e as t};