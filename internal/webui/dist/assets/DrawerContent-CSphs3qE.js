import{$ as e,$t as t,Bn as n,Gt as r,H as i,Ht as a,I as o,Kt as s,L as c,Mn as l,Nn as u,O as d,On as f,Qn as p,Sn as m,Un as h,Ut as g,V as _,Vn as v,at as y,bn as b,dn as x,dt as S,fn as C,k as w,mn as T,nn as E,nr as D,nt as O,on as k,or as A,st as j,tt as M,un as N,vn as P,wn as F}from"./client-DkW07njR.js";import{t as I}from"./Scrollbar-BZdl1G8a.js";import{a as L,b as R,g as z,h as ee,i as B,o as V,r as H,y as U}from"./fade-in-scale-up.cssr-BdRR0Z2p.js";import{t as W}from"./use-merged-state-BhDn2UYN.js";import{r as G}from"./text-lz9v6H13.js";import{s as K}from"./fade-in-height-expand.cssr-DNkZo7mN.js";import{A as q,D as J,f as Y,m as X}from"./index-1SjSYdlk.js";var Z=[`onMouseenter`,`onMouseleave`,`onMousedown`],Q={key:1,role:`none`},te=P({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let t=p(!!e.show),r=p(null),i=m(R),a=0,o=``,s=null,c=p(!1),l=p(!1),d=N(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:h,mergedRtlRef:g}=j(e),_=w(`Drawer`,g,h),y=A,b=e=>{l.value=!0,a=d.value?e.clientY:e.clientX,o=document.body.style.cursor,document.body.style.cursor=d.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,k),document.body.addEventListener(`mouseleave`,y),document.body.addEventListener(`mouseup`,A)},x=()=>{s!==null&&(window.clearTimeout(s),s=null),l.value?c.value=!0:s=window.setTimeout(()=>{c.value=!0},300)},S=()=>{s!==null&&(window.clearTimeout(s),s=null),c.value=!1},{doUpdateHeight:C,doUpdateWidth:T}=i,D=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},O=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function k(t){if(l.value){if(d.value){let n=r.value?.offsetHeight||0,i=a-t.clientY;n+=e.placement===`bottom`?i:-i,n=O(n),C(n),a=t.clientY}else{let n=r.value?.offsetWidth||0,i=a-t.clientX;n+=e.placement===`right`?i:-i,n=D(n),T(n),a=t.clientX}}}function A(){l.value&&(a=0,l.value=!1,document.body.style.cursor=o,document.body.removeEventListener(`mousemove`,k),document.body.removeEventListener(`mouseup`,A),document.body.removeEventListener(`mouseleave`,y))}v(()=>{e.show&&(t.value=!0)}),n(()=>e.show,e=>{e||A()}),f(()=>{A()});let M=N(()=>{let{show:t}=e,n=[[E,t]];return e.showMask||n.push([V,e.onClickoutside,void 0,{capture:!0}]),n});function P(){t.value=!1,e.onAfterLeave?.()}return q(N(()=>e.blockScroll&&t.value)),u(U,r),u(ee,null),u(z,null),{bodyRef:r,rtlEnabled:_,mergedClsPrefix:i.mergedClsPrefixRef,isMounted:i.isMountedRef,mergedTheme:i.mergedThemeRef,displayed:t,transitionName:N(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:P,bodyDirectives:M,handleMousedownResizeTrigger:b,handleMouseenterResizeTrigger:x,handleMouseleaveResizeTrigger:S,isDragging:l,isHoverOnResizeTrigger:c}},render(){let{$slots:n,mergedClsPrefix:r}=this;return this.displayDirective===`show`||this.displayed||this.show?h((l(),T(`div`,Q,[(l(),C(H,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(l(),C(t,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>h(b(`div`,F(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${r}-drawer`,this.rtlEnabled&&`${r}-drawer--rtl`,`${r}-drawer--${this.placement}-placement`,this.isDragging&&`${r}-drawer--unselectable`,this.nativeScrollbar&&`${r}-drawer--native-scrollbar`]}),[this.resizable?(l(),T(`div`,{key:2,class:e([`${r}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${r}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Z)):null,this.nativeScrollbar?(l(),T(`div`,{key:3,class:e([`${r}-drawer-content-wrapper`,this.contentClass]),style:A(this.contentStyle),role:`none`},[O(()=>n.default?.())],6)):(l(),C(I,F({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${r}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),M(n),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[E,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=y;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[a(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),a(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),a(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),a(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),a(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),a(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=y;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[a(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),a(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),a(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),a(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),a(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),a(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=y;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[a(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),a(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),a(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),a(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),a(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),a(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=y;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[a(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),a(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),a(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),a(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),a(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),a(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=a([g(`drawer`,`
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
 `,[ue(),se(),pe(),ie(),s(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),s(`native-scrollbar`,[g(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),r(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[s(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),g(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),g(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[s(`native-scrollbar`,[g(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),g(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),g(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),g(`drawer-header`,`
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
 `,[r(`main`,`
 flex: 1;
 `),r(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),g(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),s(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[r(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),s(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[r(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),s(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[r(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),s(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[r(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),a(`body`,[a(`>`,[g(`drawer-container`,`
 position: fixed;
 `)])]),g(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[a(`> *`,`
 pointer-events: all;
 `)]),g(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[s(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),d({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={..._.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=P({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:r}=j(e),a=c(),s=_(`Drawer`,`-drawer`,$,Y,e,t),l=p(e.defaultWidth),d=p(e.defaultHeight),f=W(D(e,`width`),l),m=W(D(e,`height`),d),h=N(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:G(f.value)}),g=N(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:G(m.value)}),v=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&o(n,t),r&&o(r,t),l.value=t},y=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&o(n,t),r&&o(r,t),d.value=t},b=N(()=>[{width:h.value,height:g.value},e.drawerStyle||``]);function x(t){let{onMaskClick:n,maskClosable:r}=e;r&&T(!1),n&&n(t)}function S(e){x(e)}let C=X();function w(t){e.onEsc?.(),e.show&&e.closeOnEsc&&J(t)&&(C.value||T(!1))}function T(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&o(r,t),i&&o(i,t),n&&!t&&o(n,t)}u(R,{isMountedRef:a,mergedThemeRef:s,mergedClsPrefixRef:t,doUpdateShow:T,doUpdateHeight:y,doUpdateWidth:v});let E=N(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=s.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),O=r?i(`drawer`,void 0,E,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:b,handleOutsideClick:S,handleMaskClick:x,handleEsc:w,mergedTheme:s,cssVars:r?void 0:E,themeClass:O?.themeClass,onRender:O?.onRender,isMounted:a}},render(){let{mergedClsPrefix:n}=this;return l(),C(B,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),h((l(),T(`div`,{class:e([`${n}-drawer-container`,this.namespace,this.themeClass]),style:A(this.cssVars),role:`none`},[this.showMask?(l(),C(t,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(l(),T(`div`,{key:1,"aria-hidden":!0,class:e([`${n}-drawer-mask`,this.showMask===`transparent`&&`${n}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):O(()=>null),(l(),C(te,F(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),M(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[L,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=P({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=m(R,null);e||S(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:t,mergedClsPrefix:n,nativeScrollbar:r,mergedTheme:i,bodyClass:a,bodyStyle:o,bodyContentClass:s,bodyContentStyle:c,headerClass:u,headerStyle:d,footerClass:f,footerStyle:p,scrollbarProps:m,closable:h,$slots:g}=this;return l(),T(`div`,{role:`none`,class:e([`${n}-drawer-content`,r&&`${n}-drawer-content--native-scrollbar`])},[g.header||t||h?(l(),T(`div`,{key:0,class:e([`${n}-drawer-header`,u]),style:A(d),role:`none`},[x(`div`,{class:e(`${n}-drawer-header__main`),role:`heading`,"aria-level":`1`},[g.header===void 0?(l(),T(k,{key:1},[O(()=>t)],64)):(l(),T(k,{key:0},[O(()=>g.header())],64))],2),O(()=>h&&(l(),C(K,{onClick:this.handleCloseClick,clsPrefix:n,class:e(`${n}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):O(()=>null),r?(l(),T(`div`,{key:2,class:e([`${n}-drawer-body`,a]),style:A(o),role:`none`},[x(`div`,{class:e([`${n}-drawer-body-content-wrapper`,s]),style:A(c),role:`none`},[O(()=>g.default?.())],6)],6)):(l(),C(I,F({key:3,themeOverrides:i.peerOverrides.Scrollbar,theme:i.peers.Scrollbar},m,{class:`${n}-drawer-body`,contentClass:[`${n}-drawer-body-content-wrapper`,s],contentStyle:c}),M(g),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),g.footer?(l(),T(`div`,{key:4,class:e([`${n}-drawer-footer`,f]),style:A(p),role:`none`},[O(()=>g.footer())],6)):O(()=>null)],2)}});export{ge as n,_e as t};