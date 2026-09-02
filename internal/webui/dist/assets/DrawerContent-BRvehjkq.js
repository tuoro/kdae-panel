import{$n as e,An as t,Bn as n,Cn as r,Ct as i,En as a,F as o,Gn as s,H as c,In as l,M as u,Mn as d,O as f,Pn as p,Qn as m,Sn as h,U as g,Wn as _,X as v,Y as y,dn as b,en as x,ft as S,gt as C,in as w,mn as T,mr as E,pt as D,rn as O,tn as k,tr as A,ur as j,ut as M,vn as N,vr as P,vt as F,wn as I}from"./client-DOvxO6I9.js";import{t as L}from"./use-merged-state-pTT-7LRM.js";import{r as R}from"./text-CdZaUUMh.js";import{G as z,J as ee,K as B,N as V,O as H,Y as U,h as W,it as G,nt as K,p as q,q as J,rt as Y,tt as X}from"./index-Xj4sOcOi.js";var Z=[`onMouseenter`,`onMouseleave`,`onMousedown`],Q={key:1,role:`none`},te=t({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(t){let r=j(!!t.show),i=j(null),a=p(G),c=0,l=``,u=null,d=j(!1),f=j(!1),g=h(()=>t.placement===`top`||t.placement===`bottom`),{mergedClsPrefixRef:_,mergedRtlRef:v}=F(t),y=o(`Drawer`,v,_),b=A,x=e=>{f.value=!0,c=g.value?e.clientY:e.clientX,l=document.body.style.cursor,document.body.style.cursor=g.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,k),document.body.addEventListener(`mouseleave`,b),document.body.addEventListener(`mouseup`,A)},S=()=>{u!==null&&(window.clearTimeout(u),u=null),f.value?d.value=!0:u=window.setTimeout(()=>{d.value=!0},300)},C=()=>{u!==null&&(window.clearTimeout(u),u=null),d.value=!1},{doUpdateHeight:w,doUpdateWidth:E}=a,D=e=>{let{maxWidth:n}=t;if(n&&e>n)return n;let{minWidth:r}=t;return r&&e<r?r:e},O=e=>{let{maxHeight:n}=t;if(n&&e>n)return n;let{minHeight:r}=t;return r&&e<r?r:e};function k(e){if(f.value){if(g.value){let n=i.value?.offsetHeight||0,r=c-e.clientY;n+=t.placement===`bottom`?r:-r,n=O(n),w(n),c=e.clientY}else{let n=i.value?.offsetWidth||0,r=c-e.clientX;n+=t.placement===`right`?r:-r,n=D(n),E(n),c=e.clientX}}}function A(){f.value&&(c=0,f.value=!1,document.body.style.cursor=l,document.body.removeEventListener(`mousemove`,k),document.body.removeEventListener(`mouseup`,A),document.body.removeEventListener(`mouseleave`,b))}e(()=>{t.show&&(r.value=!0)}),m(()=>t.show,e=>{e||A()}),n(()=>{A()});let M=h(()=>{let{show:e}=t,n=[[T,e]];return t.showMask||n.push([U,t.onClickoutside,void 0,{capture:!0}]),n});function N(){r.value=!1,t.onAfterLeave?.()}return V(h(()=>t.blockScroll&&r.value)),s(Y,i),s(X,null),s(K,null),{bodyRef:i,rtlEnabled:y,mergedClsPrefix:a.mergedClsPrefixRef,isMounted:a.isMountedRef,mergedTheme:a.mergedThemeRef,displayed:r,transitionName:h(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[t.placement]),handleAfterLeave:N,bodyDirectives:M,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:C,isDragging:f,isHoverOnResizeTrigger:d}},render(){let{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective===`show`||this.displayed||this.show?A((_(),a(`div`,Q,[(_(),I(B,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(_(),I(b,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>A(d(`div`,l(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?(_(),a(`div`,{key:2,class:M([`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Z)):null,this.nativeScrollbar?(_(),a(`div`,{key:3,class:M([`${t}-drawer-content-wrapper`,this.contentClass]),style:P(this.contentStyle),role:`none`},[D(()=>e.default?.())],6)):(_(),I(f,l({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),S(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[T,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=C;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[x(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),x(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),x(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),x(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),x(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),x(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=C;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[x(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),x(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),x(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),x(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),x(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),x(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=C;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[x(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),x(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),x(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),x(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),x(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),x(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=C;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[x(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),x(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),x(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),x(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),x(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),x(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=x([k(`drawer`,`
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
 `,[ue(),se(),pe(),ie(),w(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),w(`native-scrollbar`,[k(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),O(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[w(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),k(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),k(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[w(`native-scrollbar`,[k(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),k(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),k(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),k(`drawer-header`,`
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
 `,[O(`main`,`
 flex: 1;
 `),O(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),k(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),w(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[O(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),w(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[O(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),w(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[O(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),w(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[O(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),x(`body`,[x(`>`,[k(`drawer-container`,`
 position: fixed;
 `)])]),k(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[x(`> *`,`
 pointer-events: all;
 `)]),k(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[w(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),u({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...y.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=t({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:r}=F(e),i=g(),a=y(`Drawer`,`-drawer`,$,q,e,t),o=j(e.defaultWidth),l=j(e.defaultHeight),u=L(E(e,`width`),o),d=L(E(e,`height`),l),f=h(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:R(u.value)}),p=h(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:R(d.value)}),m=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&c(n,t),r&&c(r,t),o.value=t},_=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&c(n,t),r&&c(r,t),l.value=t},b=h(()=>[{width:f.value,height:p.value},e.drawerStyle||``]);function x(t){let{onMaskClick:n,maskClosable:r}=e;r&&T(!1),n&&n(t)}function S(e){x(e)}let C=W();function w(t){e.onEsc?.(),e.show&&e.closeOnEsc&&H(t)&&(C.value||T(!1))}function T(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&c(r,t),i&&c(i,t),n&&!t&&c(n,t)}s(G,{isMountedRef:i,mergedThemeRef:a,mergedClsPrefixRef:t,doUpdateShow:T,doUpdateHeight:_,doUpdateWidth:m});let D=h(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:o,lineHeight:s,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=a.value;return{"--n-line-height":s,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":o,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),O=r?v(`drawer`,void 0,D,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:b,handleOutsideClick:S,handleMaskClick:x,handleEsc:w,mergedTheme:a,cssVars:r?void 0:D,themeClass:O?.themeClass,onRender:O?.onRender,isMounted:i}},render(){let{mergedClsPrefix:e}=this;return _(),I(J,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),A((_(),a(`div`,{class:M([`${e}-drawer-container`,this.namespace,this.themeClass]),style:P(this.cssVars),role:`none`},[this.showMask?(_(),I(b,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(_(),a(`div`,{key:1,"aria-hidden":!0,class:M([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):D(()=>null),(_(),I(te,l(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),S(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[ee,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=t({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=p(G,null);e||i(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:t,nativeScrollbar:n,mergedTheme:i,bodyClass:o,bodyStyle:s,bodyContentClass:c,bodyContentStyle:u,headerClass:d,headerStyle:p,footerClass:m,footerStyle:h,scrollbarProps:g,closable:v,$slots:y}=this;return _(),a(`div`,{role:`none`,class:M([`${t}-drawer-content`,n&&`${t}-drawer-content--native-scrollbar`])},[y.header||e||v?(_(),a(`div`,{key:0,class:M([`${t}-drawer-header`,d]),style:P(p),role:`none`},[r(`div`,{class:M(`${t}-drawer-header__main`),role:`heading`,"aria-level":`1`},[y.header===void 0?(_(),a(N,{key:1},[D(()=>e)],64)):(_(),a(N,{key:0},[D(()=>y.header())],64))],2),D(()=>v&&(_(),I(z,{onClick:this.handleCloseClick,clsPrefix:t,class:M(`${t}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):D(()=>null),n?(_(),a(`div`,{key:2,class:M([`${t}-drawer-body`,o]),style:P(s),role:`none`},[r(`div`,{class:M([`${t}-drawer-body-content-wrapper`,c]),style:P(u),role:`none`},[D(()=>y.default?.())],6)],6)):(_(),I(f,l({key:3,themeOverrides:i.peerOverrides.Scrollbar,theme:i.peers.Scrollbar},g,{class:`${t}-drawer-body`,contentClass:[`${t}-drawer-body-content-wrapper`,c],contentStyle:u}),S(y),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),y.footer?(_(),a(`div`,{key:4,class:M([`${t}-drawer-footer`,m]),style:P(h),role:`none`},[D(()=>y.footer())],6)):D(()=>null)],2)}});export{ge as n,_e as t};