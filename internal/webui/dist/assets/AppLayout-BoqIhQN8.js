import{$n as e,$t as t,Cn as n,D as r,Dn as i,E as a,En as o,Fn as s,J as c,K as l,L as u,N as d,Nn as f,On as p,Q as m,Qn as h,Sn as g,Tn as _,U as v,Un as y,V as b,Vn as x,Wn as S,X as C,Y as w,Zn as T,_ as E,_n as D,_r as O,_t as k,an as A,bt as j,ct as M,dt as N,en as P,et as ee,f as F,ft as I,gr as te,hr as L,i as ne,in as R,jn as z,k as re,kn as B,lr as V,lt as H,nn as U,on as ie,pr as W,q as ae,qn as oe,rn as G,sn as se,vr as K,w as ce,wn as q,xn as J,xt as le,z as ue,zn as de}from"./client-DecrR2G0.js";import{r as fe,t as pe}from"./create-ByZqGS3o.js";import{t as me}from"./misc-DDs3MKLt.js";import{t as he}from"./use-merged-state-Dvb8YPIJ.js";import{i as ge,n as _e,r as Y,t as ve}from"./text-DpnNyaQe.js";import{a as ye,n as be,r as xe,t as Se}from"./useMobileViewport-Dn5cCRb1.js";import{r as Ce,t as X}from"./Icon-Dy6e-gst.js";import{t as we}from"./Alert-D6OY5-aq.js";import{n as Te,t as Ee}from"./DrawerContent-CaKJwBC7.js";import{L as Z,P as De,Q as Oe,i as ke,n as Ae,r as je,t as Me,u as Ne,z as Pe}from"./index-CBIB5M6s.js";import{t as Fe}from"./CodeSlashOutline-LxDnfKd_.js";import{t as Ie}from"./ReaderOutline-C0Sjpl8q.js";import{t as Le}from"./SwapHorizontalOutline-PmmMnoVu.js";import{t as Re}from"./PanelUpdateAction-BW7suSOJ.js";var ze=E&&`loading`in document.createElement(`img`);function Be(e={}){let{root:t=null}=e;return{hash:`${e.rootMargin||`0px 0px 0px 0px`}-${Array.isArray(e.threshold)?e.threshold.join(`,`):e.threshold??`0`}`,options:{...e,root:(typeof t==`string`?document.querySelector(t):t)||document.documentElement}}}var Ve=new WeakMap,He=new WeakMap,Ue=new WeakMap,We=(e,t,n)=>{if(!e)return()=>{};let r=Be(t),{root:i}=r.options,a,o=Ve.get(i);o?a=o:(a=new Map,Ve.set(i,a));let s,c;a.has(r.hash)?(c=a.get(r.hash),c[1].has(e)||(s=c[0],c[1].add(e),s.observe(e))):(s=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let t=He.get(e.target),n=Ue.get(e.target);t&&t(),n&&(n.value=!0)}})},r.options),s.observe(e),c=[s,new Set([e])],a.set(r.hash,c));let l=!1,u=()=>{l||(He.delete(e),Ue.delete(e),l=!0,c[1].has(e)&&(c[0].unobserve(e),c[1].delete(e)),c[1].size<=0&&a.delete(r.hash),a.size||Ve.delete(i))};return He.set(e,u),Ue.set(e,n),u},Ge=j(`n-avatar-group`),Ke=P(`avatar`,`
 width: var(--n-merged-size);
 height: var(--n-merged-size);
 color: #FFF;
 font-size: var(--n-font-size);
 display: inline-flex;
 position: relative;
 overflow: hidden;
 text-align: center;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 --n-merged-color: var(--n-color);
 background-color: var(--n-merged-color);
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[ie(t(`&`,`--n-merged-color: var(--n-color-modal);`)),se(t(`&`,`--n-merged-color: var(--n-color-popover);`)),t(`img`,`
 width: 100%;
 height: 100%;
 `),U(`text`,`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),P(`icon`,`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),U(`text`,`line-height: 1.25`)]),qe=[`src`],Je={...c.props,size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String},Ye=B({name:`Avatar`,props:Je,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=k(e),r=V(!1),i=null,o=V(null),s=V(null),l=()=>{let{value:e}=o;if(e&&(i===null||i!==e.innerHTML)){i=e.innerHTML;let{value:t}=s;if(t){let{offsetWidth:n,offsetHeight:r}=t,{offsetWidth:i,offsetHeight:a}=e,o=.9,s=Math.min(n/i*o,r/a*o,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${s})`}}},u=f(Ge,null),d=J(()=>{let{size:t}=e;if(t)return t;let{size:n}=u||{};return n||`medium`}),p=c(`Avatar`,`-avatar`,Ke,De,e,t),m=f(Ce,null),g=J(()=>{if(u)return!0;let{round:t,circle:n}=e;return t!==void 0||n!==void 0?t||n:m?m.roundRef.value:!1}),_=J(()=>u?!0:e.bordered||!1),v=J(()=>{let t=d.value,n=g.value,r=_.value,{color:i}=e,{self:{borderRadius:a,fontSize:o,color:s,border:c,colorModal:l,colorPopover:u},common:{cubicBezierEaseInOut:f}}=p.value,m;return m=typeof t==`number`?`${t}px`:p.value.self[A(`height`,t)],{"--n-font-size":o,"--n-border":r?c:`none`,"--n-border-radius":n?`50%`:a,"--n-color":i||s,"--n-color-modal":i||l,"--n-color-popover":i||u,"--n-bezier":f,"--n-merged-size":`var(--n-avatar-size-override, ${m})`}}),y=n?w(`avatar`,J(()=>{let t=d.value,n=g.value,r=_.value,{color:i}=e,o=``;return t&&(o+=typeof t==`number`?`a${t}`:t[0]),n&&(o+=`b`),r&&(o+=`c`),i&&(o+=a(i)),o}),v,e):void 0,b=V(!e.lazy);x(()=>{if(e.lazy&&e.intersectionObserverOptions){let t,n=h(()=>{t?.(),t=void 0,e.lazy&&(t=We(s.value,e.intersectionObserverOptions,b))});de(()=>{n(),t?.()})}}),T(()=>e.src||e.imgProps?.src,()=>{r.value=!1});let S=V(!e.lazy);return{textRef:o,selfRef:s,mergedRoundRef:g,mergedClsPrefix:t,fitTextTransform:l,cssVars:n?void 0:v,themeClass:y?.themeClass,onRender:y?.onRender,hasLoadError:r,shouldStartLoading:b,loaded:S,mergedOnError:t=>{if(!b.value)return;r.value=!0;let{onError:n,imgProps:{onError:i}={}}=e;n?.(t),i?.(t)},mergedOnLoad:t=>{let{onLoad:n,imgProps:{onLoad:r}={}}=e;n?.(t),r?.(t),S.value=!0}}},render(){let{$slots:e,src:t,mergedClsPrefix:r,lazy:i,onRender:a,loaded:o,hasLoadError:s,imgProps:c={}}=this;a?.();let l,d=!o&&!s&&(this.renderPlaceholder?this.renderPlaceholder():this.$slots.placeholder?.());return l=this.hasLoadError?this.renderFallback?this.renderFallback():u(e.fallback,()=>[(y(),_(`img`,{src:this.fallbackSrc,style:O({objectFit:this.objectFit})},null,12,qe))]):ue(e.default,e=>{if(e)return y(),n(re,{key:1,onResize:this.fitTextTransform},{default:()=>(y(),_(`span`,{ref:`textRef`,class:H(`${r}-avatar__text`)},[I(()=>e)],2))},1032,[`onResize`]);if(t||c.src){let e=this.src||c.src;return z(`img`,{...c,loading:ze&&!this.intersectionObserverOptions&&i?`lazy`:`eager`,src:i&&this.intersectionObserverOptions?this.shouldStartLoading?e:void 0:e,"data-image-src":e,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[c.style||``,{objectFit:this.objectFit},d?{height:`0`,width:`0`,visibility:`hidden`,position:`absolute`}:``]})}}),y(),_(`span`,{ref:`selfRef`,class:H([`${r}-avatar`,this.themeClass]),style:O(this.cssVars)},[I(()=>l),I(()=>i&&d)],6)}});function Xe(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:a,actionColor:o,scrollbarColor:s,scrollbarColorHover:c,invertedColor:l}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:o,headerColor:i,headerColorInverted:l,footerColor:o,footerColorInverted:l,headerBorderColor:a,headerBorderColorInverted:l,footerBorderColor:a,footerBorderColorInverted:l,siderBorderColor:a,siderBorderColorInverted:l,siderColor:i,siderColorInverted:l,siderToggleButtonBorder:`1px solid ${a}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:ee(r,s),siderToggleBarColorHover:ee(r,c),__invertScrollbar:`true`}}var Ze=ae({name:`Layout`,common:m,peers:{Scrollbar:C},self:Xe}),Qe=j(`n-layout-sider`),$e={type:String,default:`static`},et=P(`layout`,`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[P(`layout-scroll-container`,`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),G(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),tt={embedded:Boolean,position:$e,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},nt=j(`n-layout`);function rt(e){return B({name:e?`LayoutContent`:`Layout`,props:{...c.props,...tt},setup(e){let t=V(null),n=V(null),{mergedClsPrefixRef:r,inlineThemeDisabled:i}=k(e),a=c(`Layout`,`-layout`,et,Ze,e,r);function o(r,i){if(e.nativeScrollbar){let{value:e}=t;e&&(i===void 0?e.scrollTo(r):e.scrollTo(r,i))}else{let{value:e}=n;e&&e.scrollTo(r,i)}}S(nt,e);let s=0,l=0,u=t=>{let n=t.target;s=n.scrollLeft,l=n.scrollTop,e.onScroll?.(t)};d(()=>{if(e.nativeScrollbar){let e=t.value;e&&(e.scrollTop=l,e.scrollLeft=s)}});let f={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},p={scrollTo:o},m=J(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=a.value;return{"--n-bezier":t,"--n-color":e.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),h=i?w(`layout`,J(()=>e.embedded?`e`:``),m,e):void 0;return{mergedClsPrefix:r,scrollableElRef:t,scrollbarInstRef:n,hasSiderStyle:f,mergedTheme:a,handleNativeElScroll:u,cssVars:i?void 0:m,themeClass:h?.themeClass,onRender:h?.onRender,...p}},render(){let{mergedClsPrefix:t,hasSider:i}=this;this.onRender?.();let a=i?this.hasSiderStyle:void 0,o=[this.themeClass,e&&`${t}-layout-content`,`${t}-layout`,`${t}-layout--${this.position}-positioned`];return y(),_(`div`,{class:H(o),style:O(this.cssVars)},[this.nativeScrollbar?(y(),_(`div`,{key:0,ref:`scrollableElRef`,class:H([`${t}-layout-scroll-container`,this.contentClass]),style:O([this.contentStyle,a]),onScroll:this.handleNativeElScroll},[I(()=>this.$slots.default?.())],46,[`onScroll`])):(y(),n(r,s({key:1},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,a]}),N(this.$slots),1040,[`onScroll`,`theme`,`themeOverrides`,`contentClass`,`contentStyle`]))],6)}})}var it=rt(!1),at=rt(!0),ot=P(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[G(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),G(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),st={position:$e,inverted:Boolean,bordered:Boolean},ct=B({name:`LayoutHeader`,props:{...c.props,...st},setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=k(e),r=c(`Layout`,`-layout-header`,ot,Ze,e,t),i=J(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=r.value,i={"--n-bezier":t};return e.inverted?(i[`--n-color`]=n.headerColorInverted,i[`--n-text-color`]=n.textColorInverted,i[`--n-border-color`]=n.headerBorderColorInverted):(i[`--n-color`]=n.headerColor,i[`--n-text-color`]=n.textColor,i[`--n-border-color`]=n.headerBorderColor),i}),a=n?w(`layout-header`,J(()=>e.inverted?`a`:`b`),i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{mergedClsPrefix:e}=this;return this.onRender?.(),y(),_(`div`,{class:H([`${e}-layout-header`,this.themeClass,this.position&&`${e}-layout-header--${this.position}-positioned`,this.bordered&&`${e}-layout-header--bordered`]),style:O(this.cssVars)},[I(()=>this.$slots.default?.())],6)}}),lt=P(`layout-sider`,`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[G(`bordered`,[U(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),U(`left-placement`,[G(`bordered`,[U(`border`,`
 right: 0;
 `)])]),G(`right-placement`,`
 justify-content: flex-start;
 `,[G(`bordered`,[U(`border`,`
 left: 0;
 `)]),G(`collapsed`,[P(`layout-toggle-button`,[P(`base-icon`,`
 transform: rotate(180deg);
 `)]),P(`layout-toggle-bar`,[t(`&:hover`,[U(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),U(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),P(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[P(`base-icon`,`
 transform: rotate(0);
 `)]),P(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[t(`&:hover`,[U(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),U(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),G(`collapsed`,[P(`layout-toggle-bar`,[t(`&:hover`,[U(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),U(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),P(`layout-toggle-button`,[P(`base-icon`,`
 transform: rotate(0);
 `)])]),P(`layout-toggle-button`,`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[P(`base-icon`,`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),P(`layout-toggle-bar`,`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[U(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),U(`bottom`,`
 position: absolute;
 top: 34px;
 `),t(`&:hover`,[U(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),U(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),U(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),t(`&:hover`,[U(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),U(`border`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),P(`layout-sider-scroll-container`,`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),G(`show-content`,[P(`layout-sider-scroll-container`,{opacity:1})]),G(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),ut=[`onClick`],dt=B({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return y(),_(`div`,{onClick:this.onClick,class:H(`${e}-layout-toggle-bar`)},[g(`div`,{class:H(`${e}-layout-toggle-bar__top`)},null,2),g(`div`,{class:H(`${e}-layout-toggle-bar__bottom`)},null,2)],10,ut)}}),ft=[`onClick`],pt=B({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return y(),_(`div`,{class:H(`${e}-layout-toggle-button`),onClick:this.onClick},[(y(),n(l,{clsPrefix:e},{default:()=>(y(),n(ye))},1032,[`clsPrefix`]))],10,ft)}}),mt=[`onTransitionend`],ht={position:$e,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},gt=B({name:`LayoutSider`,props:{...c.props,...ht},setup(e){let t=f(nt),n=V(null),r=V(null),i=V(e.defaultCollapsed),a=he(W(e,`collapsed`),i),o=J(()=>Y(a.value?e.collapsedWidth:e.width)),s=J(()=>e.collapseMode===`transform`?{minWidth:Y(e.width)}:{}),l=J(()=>t?t.siderPlacement:`left`);function u(t,i){if(e.nativeScrollbar){let{value:e}=n;e&&(i===void 0?e.scrollTo(t):e.scrollTo(t,i))}else{let{value:e}=r;e&&e.scrollTo(t,i)}}function p(){let{"onUpdate:collapsed":t,onUpdateCollapsed:n,onExpand:r,onCollapse:o}=e,{value:s}=a;n&&b(n,!s),t&&b(t,!s),i.value=!s,s?r&&b(r):o&&b(o)}let m=0,h=0,g=t=>{let n=t.target;m=n.scrollLeft,h=n.scrollTop,e.onScroll?.(t)};d(()=>{if(e.nativeScrollbar){let e=n.value;e&&(e.scrollTop=h,e.scrollLeft=m)}}),S(Qe,{collapsedRef:a,collapseModeRef:W(e,`collapseMode`)});let{mergedClsPrefixRef:_,inlineThemeDisabled:v}=k(e),y=c(`Layout`,`-layout-sider`,lt,Ze,e,_);function x(t){t.propertyName===`max-width`&&(a.value?e.onAfterLeave?.():e.onAfterEnter?.())}let C={scrollTo:u},T=J(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=y.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":t,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return e.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),E=v?w(`layout-sider`,J(()=>e.inverted?`a`:`b`),T,e):void 0;return{scrollableElRef:n,scrollbarInstRef:r,mergedClsPrefix:_,mergedTheme:y,styleMaxWidth:o,mergedCollapsed:a,scrollContainerStyle:s,siderPlacement:l,handleNativeElScroll:g,handleTransitionend:x,handleTriggerClick:p,inlineThemeDisabled:v,cssVars:T,themeClass:E?.themeClass,onRender:E?.onRender,...C}},render(){let{mergedClsPrefix:e,mergedCollapsed:t,showTrigger:i}=this;return this.onRender?.(),y(),_(`aside`,{class:H([`${e}-layout-sider`,this.themeClass,`${e}-layout-sider--${this.position}-positioned`,`${e}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${e}-layout-sider--bordered`,t&&`${e}-layout-sider--collapsed`,(!t||this.showCollapsedContent)&&`${e}-layout-sider--show-content`]),onTransitionend:this.handleTransitionend,style:O([this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:Y(this.width)}])},[this.nativeScrollbar?(y(),_(`div`,{key:1,class:H([`${e}-layout-sider-scroll-container`,this.contentClass]),onScroll:this.handleNativeElScroll,style:O([this.scrollContainerStyle,{overflow:`auto`},this.contentStyle]),ref:`scrollableElRef`},[I(()=>this.$slots.default?.())],46,[`onScroll`])):(y(),n(r,s({key:0},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),N(this.$slots),1040,[`onScroll`,`style`,`contentStyle`,`contentClass`,`theme`,`themeOverrides`,`builtinThemeOverrides`])),i?(y(),_(D,{key:2},[i===`bar`?(y(),n(dt,{key:0,clsPrefix:e,class:H(t?this.collapsedTriggerClass:this.triggerClass),style:O(t?this.collapsedTriggerStyle:this.triggerStyle),onClick:this.handleTriggerClick},null,8,[`clsPrefix`,`class`,`style`,`onClick`])):(y(),n(pt,{key:1,clsPrefix:e,class:H(t?this.collapsedTriggerClass:this.triggerClass),style:O(t?this.collapsedTriggerStyle:this.triggerStyle),onClick:this.handleTriggerClick},null,8,[`clsPrefix`,`class`,`style`,`onClick`]))],64)):I(()=>null),this.bordered?(y(),_(`div`,{key:4,class:H(`${e}-layout-sider__border`)},null,2)):I(()=>null)],46,mt)}}),Q=j(`n-menu`),_t=j(`n-submenu`),vt=j(`n-menu-item-group`),yt=[t(`&::before`,`background-color: var(--n-item-color-hover);`),U(`arrow`,`
 color: var(--n-arrow-color-hover);
 `),U(`icon`,`
 color: var(--n-item-icon-color-hover);
 `),P(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover);
 `,[t(`a`,`
 color: var(--n-item-text-color-hover);
 `),U(`extra`,`
 color: var(--n-item-text-color-hover);
 `)])],bt=[U(`icon`,`
 color: var(--n-item-icon-color-hover-horizontal);
 `),P(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover-horizontal);
 `,[t(`a`,`
 color: var(--n-item-text-color-hover-horizontal);
 `),U(`extra`,`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],xt=t([P(`menu`,`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[G(`horizontal`,`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[P(`submenu`,`margin: 0;`),P(`menu-item`,`margin: 0;`),P(`menu-item-content`,`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[t(`&::before`,`display: none;`),G(`selected`,`border-bottom: 2px solid var(--n-border-color-horizontal)`)]),P(`menu-item-content`,[G(`selected`,[U(`icon`,`color: var(--n-item-icon-color-active-horizontal);`),P(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-horizontal);
 `,[t(`a`,`color: var(--n-item-text-color-active-horizontal);`),U(`extra`,`color: var(--n-item-text-color-active-horizontal);`)])]),G(`child-active`,`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[P(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[t(`a`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `),U(`extra`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),U(`icon`,`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),R(`disabled`,[R(`selected, child-active`,[t(`&:focus-within`,bt)]),G(`selected`,[$(null,[U(`icon`,`color: var(--n-item-icon-color-active-hover-horizontal);`),P(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[t(`a`,`color: var(--n-item-text-color-active-hover-horizontal);`),U(`extra`,`color: var(--n-item-text-color-active-hover-horizontal);`)])])]),G(`child-active`,[$(null,[U(`icon`,`color: var(--n-item-icon-color-child-active-hover-horizontal);`),P(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[t(`a`,`color: var(--n-item-text-color-child-active-hover-horizontal);`),U(`extra`,`color: var(--n-item-text-color-child-active-hover-horizontal);`)])])]),$(`border-bottom: 2px solid var(--n-border-color-horizontal);`,bt)]),P(`menu-item-content-header`,[t(`a`,`color: var(--n-item-text-color-horizontal);`)])])]),R(`responsive`,[P(`menu-item-content-header`,`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),G(`collapsed`,[P(`menu-item-content`,[G(`selected`,[t(`&::before`,`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),P(`menu-item-content-header`,`opacity: 0;`),U(`arrow`,`opacity: 0;`),U(`icon`,`color: var(--n-item-icon-color-collapsed);`)])]),P(`menu-item`,`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),P(`menu-item-content`,`
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[t(`> *`,`z-index: 1;`),t(`&::before`,`
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),G(`disabled`,`
 opacity: .45;
 cursor: not-allowed;
 `),G(`collapsed`,[U(`arrow`,`transform: rotate(0);`)]),G(`selected`,[t(`&::before`,`background-color: var(--n-item-color-active);`),U(`arrow`,`color: var(--n-arrow-color-active);`),U(`icon`,`color: var(--n-item-icon-color-active);`),P(`menu-item-content-header`,`
 color: var(--n-item-text-color-active);
 `,[t(`a`,`color: var(--n-item-text-color-active);`),U(`extra`,`color: var(--n-item-text-color-active);`)])]),G(`child-active`,[P(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active);
 `,[t(`a`,`
 color: var(--n-item-text-color-child-active);
 `),U(`extra`,`
 color: var(--n-item-text-color-child-active);
 `)]),U(`arrow`,`
 color: var(--n-arrow-color-child-active);
 `),U(`icon`,`
 color: var(--n-item-icon-color-child-active);
 `)]),R(`disabled`,[R(`selected, child-active`,[t(`&:focus-within`,yt)]),G(`selected`,[$(null,[U(`arrow`,`color: var(--n-arrow-color-active-hover);`),U(`icon`,`color: var(--n-item-icon-color-active-hover);`),P(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover);
 `,[t(`a`,`color: var(--n-item-text-color-active-hover);`),U(`extra`,`color: var(--n-item-text-color-active-hover);`)])])]),G(`child-active`,[$(null,[U(`arrow`,`color: var(--n-arrow-color-child-active-hover);`),U(`icon`,`color: var(--n-item-icon-color-child-active-hover);`),P(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover);
 `,[t(`a`,`color: var(--n-item-text-color-child-active-hover);`),U(`extra`,`color: var(--n-item-text-color-child-active-hover);`)])])]),G(`selected`,[$(null,[t(`&::before`,`background-color: var(--n-item-color-active-hover);`)])]),$(null,yt)]),U(`icon`,`
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `),U(`arrow`,`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),P(`menu-item-content-header`,`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[t(`a`,`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[t(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),U(`extra`,`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),P(`submenu`,`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[P(`menu-item-content`,`
 height: var(--n-item-height);
 `),P(`submenu-children`,`
 overflow: hidden;
 padding: 0;
 `,[Pe({duration:`.2s`})])]),P(`menu-item-group`,[P(`menu-item-group-title`,`
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]),P(`menu-tooltip`,[t(`a`,`
 color: inherit;
 text-decoration: none;
 `)]),P(`menu-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function $(e,n){return[G(`hover`,e,n),t(`&:hover`,e,n)]}var St=B({name:`MenuDivider`,setup(){let{mergedClsPrefixRef:e,isHorizontalRef:t}=f(Q);return()=>t.value?null:(y(),_(`div`,{key:1,class:H(`${e.value}-menu-divider`)},null,2))}}),Ct=B({name:`ChevronDownFilled`,render(){return(()=>{let e=M(`f3af82a2aab086a5`);return e[0]||=g(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[g(`path`,{d:`M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z`,fill:`currentColor`})],-1)})()}}),wt=[`onClick`],Tt=B({name:`MenuOptionContent`,props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){let{props:t}=f(Q);return{menuProps:t,style:J(()=>{let{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:J(()=>{let{maxIconSize:t,activeIconSize:n,iconMarginRight:r}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${n}px`,marginRight:`${r}px`}})}},render(){let{clsPrefix:e,tmNode:t,menuProps:{renderIcon:r,renderLabel:i,renderExtra:a,expandIcon:o}}=this,s=r?r(t.rawNode):Z(this.icon);return(()=>{let r=M(`7bb10afc6caf8fa4`);return y(),_(`div`,{onClick:e=>{this.onClick?.(e)},role:`none`,class:H([`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}]),style:O(this.style)},[I(()=>s&&(y(),_(`div`,{class:H(`${e}-menu-item-content__icon`),style:O(this.iconStyle),role:`none`},[I(()=>[s])],6))),g(`div`,{class:H(`${e}-menu-item-content-header`),role:`none`},[this.isEllipsisPlaceholder?(y(),_(D,{key:0},[I(()=>this.title)],64)):(y(),_(D,{key:1},[i?(y(),_(D,{key:0},[I(()=>i(t.rawNode))],64)):(y(),_(D,{key:1},[I(()=>Z(this.title))],64))],64)),this.extra||a?(y(),_(`span`,{key:2,class:H(`${e}-menu-item-content-header__extra`)},[r[0]||=I(` `,-1),a?(y(),_(D,{key:0},[I(()=>a(t.rawNode))],64)):(y(),_(D,{key:1},[I(()=>Z(this.extra))],64))],2)):I(()=>null)],2),this.showArrow?(y(),n(l,{key:0,ariaHidden:!0,class:H(`${e}-menu-item-content__arrow`),clsPrefix:e},{default:()=>o?o(t.rawNode):(y(),n(Ct,{key:1}))},1032,[`class`,`clsPrefix`])):I(()=>null)],14,wt)})()}}),Et=8;function Dt(e){let t=f(Q),{props:n,mergedCollapsedRef:r}=t,i=f(_t,null),a=f(vt,null),o=J(()=>n.mode===`horizontal`),s=J(()=>o.value?n.dropdownPlacement:`tmNodes`in e?`right-start`:`right`),c=J(()=>Math.max(n.collapsedIconSize??n.iconSize,n.iconSize));return{dropdownPlacement:s,activeIconSize:J(()=>!o.value&&e.root&&r.value?n.collapsedIconSize??n.iconSize:n.iconSize),maxIconSize:c,paddingLeft:J(()=>{if(o.value)return;let{collapsedWidth:t,indent:s,rootIndent:l}=n,{root:u,isGroup:d}=e,f=l===void 0?s:l;return u?r.value?t/2-c.value/2:f:a&&typeof a.paddingLeftRef.value==`number`?r.value?t/2-c.value/2:s/2+a.paddingLeftRef.value:i&&typeof i.paddingLeftRef.value==`number`?(d?s/2:s)+i.paddingLeftRef.value:0}),iconMarginRight:J(()=>{let{collapsedWidth:t,indent:i,rootIndent:a}=n,{value:s}=c,{root:l}=e;return o.value||!l||!r.value?Et:(a===void 0?i:a)+s+Et-(t+s)/2}),NMenu:t,NSubmenu:i,NMenuOptionGroup:a}}var Ot={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},kt={...Ot,tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function},At=le(kt),jt=B({name:`MenuOption`,props:kt,setup(e){let t=Dt(e),{NSubmenu:n,NMenu:r,NMenuOptionGroup:i}=t,{props:a,mergedClsPrefixRef:o,mergedCollapsedRef:s}=r,c=n?n.mergedDisabledRef:i?i.mergedDisabledRef:{value:!1},l=J(()=>c.value||e.disabled);function u(t){let{onClick:n}=e;n&&n(t)}function d(t){l.value||(r.doSelect(e.internalKey,e.tmNode.rawNode),u(t))}return{mergedClsPrefix:o,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:r.mergedThemeRef,menuProps:a,dropdownEnabled:v(()=>e.root&&s.value&&a.mode!==`horizontal`&&!l.value),selected:v(()=>r.mergedValueRef.value===e.internalKey),mergedDisabled:l,handleClick:d}},render(){let{mergedClsPrefix:e,mergedTheme:t,tmNode:r,menuProps:{renderLabel:i,nodeProps:a}}=this,o=a?.(r.rawNode);return y(),_(`div`,s(o,{role:`menuitem`,class:[`${e}-menu-item`,o?.class]}),[(y(),n(xe,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:`hover`,placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:[`menu-tooltip`]},{default:()=>i?i(r.rawNode):Z(this.title),trigger:()=>(y(),n(Tt,{tmNode:r,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick},null,8,[`tmNode`,`clsPrefix`,`paddingLeft`,`iconMarginRight`,`maxIconSize`,`activeIconSize`,`selected`,`title`,`extra`,`disabled`,`icon`,`onClick`]))},1032,[`theme`,`themeOverrides`,`placement`,`disabled`]))],16)}}),Mt={...Ot,tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}},Nt=le(Mt),Pt=B({name:`MenuOptionGroup`,props:Mt,setup(e){let t=Dt(e),{NSubmenu:n}=t,r=J(()=>n?.mergedDisabledRef.value?!0:e.tmNode.disabled);S(vt,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:r});let{mergedClsPrefixRef:i,props:a}=f(Q);return function(){let{value:n}=i,r=t.paddingLeft.value,{nodeProps:o}=a,c=o?.(e.tmNode.rawNode);return(()=>{let t=M(`45eca6a63be5028b`);return y(),_(`div`,{class:H(`${n}-menu-item-group`),role:`group`},[g(`div`,s(c,{class:[`${n}-menu-item-group-title`,c?.class],style:[c?.style||``,r===void 0?``:`padding-left: ${r}px;`]}),[I(()=>Z(e.title)),e.extra?(y(),_(D,{key:0},[t[0]||=I(` `,-1),I(()=>Z(e.extra))],64)):I(()=>null)],16),g(`div`,null,[I(()=>e.tmNodes.map(e=>Ht(e,a)))])],2)})()}}}),Ft=[`aria-expanded`,`id`],It=[`aria-expanded`,`id`],Lt={...Ot,rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean},Rt=le(Lt),zt=B({name:`Submenu`,props:Lt,setup(e){let t=Dt(e),{NMenu:n,NSubmenu:r}=t,{props:i,mergedCollapsedRef:a,mergedThemeRef:o}=n,s=J(()=>{let{disabled:t}=e;return r?.mergedDisabledRef.value||i.disabled?!0:t}),c=V(!1);S(_t,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:s}),S(vt,null);function l(){let{onClick:t}=e;t&&t()}function u(){s.value||(a.value||n.toggleExpand(e.internalKey),l())}function d(e){c.value=e}return{menuProps:i,mergedTheme:o,doSelect:n.doSelect,inverted:n.invertedRef,isHorizontal:n.isHorizontalRef,mergedClsPrefix:n.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:c,paddingLeft:t.paddingLeft,mergedDisabled:s,mergedValue:n.mergedValueRef,childActive:v(()=>e.virtualChildActive??n.activePathRef.value.includes(e.internalKey)),collapsed:J(()=>i.mode===`horizontal`?!1:a.value?!0:!n.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:J(()=>!s.value&&(i.mode===`horizontal`||a.value)),handlePopoverShowChange:d,handleClick:u}},render(){let{mergedClsPrefix:e,menuProps:{renderIcon:t,renderLabel:r}}=this,i=()=>{let{isHorizontal:e,paddingLeft:t,collapsed:r,mergedDisabled:i,maxIconSize:a,activeIconSize:o,title:c,childActive:l,icon:u,handleClick:d,menuProps:{nodeProps:f},dropdownShow:p,iconMarginRight:m,tmNode:h,mergedClsPrefix:g,isEllipsisPlaceholder:v,extra:b}=this,x=f?.(h.rawNode);return y(),_(`div`,s(x,{class:[`${g}-menu-item`,x?.class],role:`menuitem`}),[(y(),n(Tt,{tmNode:h,paddingLeft:t,collapsed:r,disabled:i,iconMarginRight:m,maxIconSize:a,activeIconSize:o,title:c,extra:b,showArrow:!e,childActive:l,clsPrefix:g,icon:u,hover:p,onClick:d,isEllipsisPlaceholder:v},null,8,[`tmNode`,`paddingLeft`,`collapsed`,`disabled`,`iconMarginRight`,`maxIconSize`,`activeIconSize`,`title`,`extra`,`showArrow`,`childActive`,`clsPrefix`,`icon`,`hover`,`onClick`,`isEllipsisPlaceholder`]))],16)},a=()=>(y(),n(ce,null,{default:()=>{let{tmNodes:t,collapsed:n}=this;return n?null:(y(),_(`div`,{key:1,class:H(`${e}-submenu-children`),role:`menu`},[I(()=>t.map(e=>Ht(e,this.menuProps)))],2))}},1024));return this.root?(y(),n(be,s({key:2,size:`large`,trigger:`hover`},this.menuProps?.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:`14px`,optionIconSizeLarge:`18px`},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:r}),{default:()=>(y(),_(`div`,{class:H(`${e}-submenu`),role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},[I(()=>i()),this.isHorizontal?I(()=>null):(y(),_(D,{key:1},[I(()=>a())],64))],10,Ft))},1040,[`themeOverrides`,`theme`,`value`,`disabled`,`placement`,`keyField`,`labelField`,`childrenField`,`onUpdateShow`,`options`,`onSelect`,`inverted`,`renderIcon`,`renderLabel`])):(y(),_(`div`,{key:3,class:H(`${e}-submenu`),role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},[I(()=>i()),I(()=>a())],10,It))}});function Bt(e){return e.type===`divider`||e.type===`render`}function Vt(e){return e.type===`divider`}function Ht(e,t){let{rawNode:r}=e,{show:i}=r;if(i===!1)return null;if(Bt(r))return Vt(r)?(y(),n(St,s({key:e.key},r.props),null,16)):null;let{labelField:a}=t,{key:o,level:c,isGroup:l}=e,u={...r,title:r.title||r[a],extra:r.titleExtra||r.extra,key:o,internalKey:o,level:c,root:c===0,isGroup:l};return e.children?e.isGroup?z(Pt,Oe(u,Nt,{tmNode:e,tmNodes:e.children,key:o})):z(zt,Oe(u,Rt,{key:o,rawNodes:r[t.childrenField],tmNodes:e.children,tmNode:e})):z(jt,Oe(u,At,{key:o,tmNode:e}))}var Ut={...c.props,options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},disabledField:{type:String,default:`disabled`},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:`vertical`},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:`bottom`},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array},Wt=B({name:`Menu`,inheritAttrs:!1,props:Ut,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:r}=k(e),i=c(`Menu`,`-menu`,xt,Ne,e,t),a=f(Qe,null),o=J(()=>{let{collapsed:t}=e;if(t!==void 0)return t;if(a){let{collapseModeRef:e,collapsedRef:t}=a;if(e.value===`width`)return t.value??!1}return!1}),s=J(()=>{let{keyField:t,childrenField:n,disabledField:r}=e;return pe(e.items||e.options,{getIgnored(e){return Bt(e)},getChildren(e){return e[n]},getDisabled(e){return e[r]},getKey(e){return e[t]??e.name}})}),l=J(()=>new Set(s.value.treeNodes.map(e=>e.key))),{watchProps:u}=e,d=V(null);u?.includes(`defaultValue`)?h(()=>{d.value=e.defaultValue}):d.value=e.defaultValue;let p=W(e,`value`),m=he(p,d),g=V([]),_=()=>{g.value=e.defaultExpandAll?s.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||s.value.getPath(m.value,{includeSelf:!1}).keyPath};u?.includes(`defaultExpandedKeys`)?h(_):_();let v=ge(e,[`expandedNames`,`expandedKeys`]),x=he(v,g),C=J(()=>s.value.treeNodes),T=J(()=>s.value.getPath(m.value).keyPath);S(Q,{props:e,mergedCollapsedRef:o,mergedThemeRef:i,mergedValueRef:m,mergedExpandedKeysRef:x,activePathRef:T,mergedClsPrefixRef:t,isHorizontalRef:J(()=>e.mode===`horizontal`),invertedRef:W(e,`inverted`),doSelect:E,toggleExpand:O});function E(t,n){let{"onUpdate:value":r,onUpdateValue:i,onSelect:a}=e;i&&b(i,t,n),r&&b(r,t,n),a&&b(a,t,n),d.value=t}function D(t){let{"onUpdate:expandedKeys":n,onUpdateExpandedKeys:r,onExpandedNamesChange:i,onOpenNamesChange:a}=e;n&&b(n,t),r&&b(r,t),i&&b(i,t),a&&b(a,t),g.value=t}function O(t){let n=Array.from(x.value),r=n.findIndex(e=>e===t);if(~r)n.splice(r,1);else{if(e.accordion&&l.value.has(t)){let e=n.findIndex(e=>l.value.has(e));e>-1&&n.splice(e,1)}n.push(t)}D(n)}let A=t=>{let n=s.value.getPath(t??m.value,{includeSelf:!1}).keyPath;if(!n.length)return;let r=Array.from(x.value),i=new Set([...r,...n]);e.accordion&&l.value.forEach(e=>{i.has(e)&&!n.includes(e)&&i.delete(e)}),D(Array.from(i))},j=J(()=>{let{inverted:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value,{borderRadius:a,borderColorHorizontal:o,fontSize:s,itemHeight:c,dividerColor:l}=r,u={"--n-divider-color":l,"--n-bezier":n,"--n-font-size":s,"--n-border-color-horizontal":o,"--n-border-radius":a,"--n-item-height":c};return t?(u[`--n-group-text-color`]=r.groupTextColorInverted,u[`--n-color`]=r.colorInverted,u[`--n-item-text-color`]=r.itemTextColorInverted,u[`--n-item-text-color-hover`]=r.itemTextColorHoverInverted,u[`--n-item-text-color-active`]=r.itemTextColorActiveInverted,u[`--n-item-text-color-child-active`]=r.itemTextColorChildActiveInverted,u[`--n-item-text-color-child-active-hover`]=r.itemTextColorChildActiveInverted,u[`--n-item-text-color-active-hover`]=r.itemTextColorActiveHoverInverted,u[`--n-item-icon-color`]=r.itemIconColorInverted,u[`--n-item-icon-color-hover`]=r.itemIconColorHoverInverted,u[`--n-item-icon-color-active`]=r.itemIconColorActiveInverted,u[`--n-item-icon-color-active-hover`]=r.itemIconColorActiveHoverInverted,u[`--n-item-icon-color-child-active`]=r.itemIconColorChildActiveInverted,u[`--n-item-icon-color-child-active-hover`]=r.itemIconColorChildActiveHoverInverted,u[`--n-item-icon-color-collapsed`]=r.itemIconColorCollapsedInverted,u[`--n-item-text-color-horizontal`]=r.itemTextColorHorizontalInverted,u[`--n-item-text-color-hover-horizontal`]=r.itemTextColorHoverHorizontalInverted,u[`--n-item-text-color-active-horizontal`]=r.itemTextColorActiveHorizontalInverted,u[`--n-item-text-color-child-active-horizontal`]=r.itemTextColorChildActiveHorizontalInverted,u[`--n-item-text-color-child-active-hover-horizontal`]=r.itemTextColorChildActiveHoverHorizontalInverted,u[`--n-item-text-color-active-hover-horizontal`]=r.itemTextColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-horizontal`]=r.itemIconColorHorizontalInverted,u[`--n-item-icon-color-hover-horizontal`]=r.itemIconColorHoverHorizontalInverted,u[`--n-item-icon-color-active-horizontal`]=r.itemIconColorActiveHorizontalInverted,u[`--n-item-icon-color-active-hover-horizontal`]=r.itemIconColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-child-active-horizontal`]=r.itemIconColorChildActiveHorizontalInverted,u[`--n-item-icon-color-child-active-hover-horizontal`]=r.itemIconColorChildActiveHoverHorizontalInverted,u[`--n-arrow-color`]=r.arrowColorInverted,u[`--n-arrow-color-hover`]=r.arrowColorHoverInverted,u[`--n-arrow-color-active`]=r.arrowColorActiveInverted,u[`--n-arrow-color-active-hover`]=r.arrowColorActiveHoverInverted,u[`--n-arrow-color-child-active`]=r.arrowColorChildActiveInverted,u[`--n-arrow-color-child-active-hover`]=r.arrowColorChildActiveHoverInverted,u[`--n-item-color-hover`]=r.itemColorHoverInverted,u[`--n-item-color-active`]=r.itemColorActiveInverted,u[`--n-item-color-active-hover`]=r.itemColorActiveHoverInverted,u[`--n-item-color-active-collapsed`]=r.itemColorActiveCollapsedInverted):(u[`--n-group-text-color`]=r.groupTextColor,u[`--n-color`]=r.color,u[`--n-item-text-color`]=r.itemTextColor,u[`--n-item-text-color-hover`]=r.itemTextColorHover,u[`--n-item-text-color-active`]=r.itemTextColorActive,u[`--n-item-text-color-child-active`]=r.itemTextColorChildActive,u[`--n-item-text-color-child-active-hover`]=r.itemTextColorChildActiveHover,u[`--n-item-text-color-active-hover`]=r.itemTextColorActiveHover,u[`--n-item-icon-color`]=r.itemIconColor,u[`--n-item-icon-color-hover`]=r.itemIconColorHover,u[`--n-item-icon-color-active`]=r.itemIconColorActive,u[`--n-item-icon-color-active-hover`]=r.itemIconColorActiveHover,u[`--n-item-icon-color-child-active`]=r.itemIconColorChildActive,u[`--n-item-icon-color-child-active-hover`]=r.itemIconColorChildActiveHover,u[`--n-item-icon-color-collapsed`]=r.itemIconColorCollapsed,u[`--n-item-text-color-horizontal`]=r.itemTextColorHorizontal,u[`--n-item-text-color-hover-horizontal`]=r.itemTextColorHoverHorizontal,u[`--n-item-text-color-active-horizontal`]=r.itemTextColorActiveHorizontal,u[`--n-item-text-color-child-active-horizontal`]=r.itemTextColorChildActiveHorizontal,u[`--n-item-text-color-child-active-hover-horizontal`]=r.itemTextColorChildActiveHoverHorizontal,u[`--n-item-text-color-active-hover-horizontal`]=r.itemTextColorActiveHoverHorizontal,u[`--n-item-icon-color-horizontal`]=r.itemIconColorHorizontal,u[`--n-item-icon-color-hover-horizontal`]=r.itemIconColorHoverHorizontal,u[`--n-item-icon-color-active-horizontal`]=r.itemIconColorActiveHorizontal,u[`--n-item-icon-color-active-hover-horizontal`]=r.itemIconColorActiveHoverHorizontal,u[`--n-item-icon-color-child-active-horizontal`]=r.itemIconColorChildActiveHorizontal,u[`--n-item-icon-color-child-active-hover-horizontal`]=r.itemIconColorChildActiveHoverHorizontal,u[`--n-arrow-color`]=r.arrowColor,u[`--n-arrow-color-hover`]=r.arrowColorHover,u[`--n-arrow-color-active`]=r.arrowColorActive,u[`--n-arrow-color-active-hover`]=r.arrowColorActiveHover,u[`--n-arrow-color-child-active`]=r.arrowColorChildActive,u[`--n-arrow-color-child-active-hover`]=r.arrowColorChildActiveHover,u[`--n-item-color-hover`]=r.itemColorHover,u[`--n-item-color-active`]=r.itemColorActive,u[`--n-item-color-active-hover`]=r.itemColorActiveHover,u[`--n-item-color-active-collapsed`]=r.itemColorActiveCollapsed),u}),M=r?w(`menu`,J(()=>e.inverted?`a`:`b`),j,e):void 0,N=me(),P=V(null),ee=V(null),F=!0,I=()=>{F?F=!1:P.value?.sync({showAllItemsBeforeCalculate:!0})};function te(){return document.getElementById(N)}let L=V(-1);function ne(t){L.value=e.options.length-t}function R(e){e||(L.value=-1)}let z=J(()=>{let t=L.value;return{children:t===-1?[]:e.options.slice(t)}}),re=J(()=>{let{childrenField:t,disabledField:n,keyField:r}=e;return pe([z.value],{getIgnored(e){return Bt(e)},getChildren(e){return e[t]},getDisabled(e){return e[n]},getKey(e){return e[r]??e.name}})}),B=J(()=>pe([{}]).treeNodes[0]);function H(){if(L.value===-1)return y(),n(zt,{root:!0,level:0,key:`__ellpisisGroupPlaceholder__`,internalKey:`__ellpisisGroupPlaceholder__`,title:`···`,tmNode:B.value,domId:N,isEllipsisPlaceholder:!0},null,8,[`tmNode`,`domId`]);let e=re.value.treeNodes[0],t=T.value,r=!!e.children?.some(e=>t.includes(e.key));return y(),n(zt,{level:0,root:!0,key:`__ellpisisGroup__`,internalKey:`__ellpisisGroup__`,title:`···`,virtualChildActive:r,tmNode:e,domId:N,rawNodes:e.rawNode.children||[],tmNodes:e.children||[],isEllipsisPlaceholder:!0},null,8,[`virtualChildActive`,`tmNode`,`domId`,`rawNodes`,`tmNodes`])}return{mergedClsPrefix:t,controlledExpandedKeys:v,uncontrolledExpanededKeys:g,mergedExpandedKeys:x,uncontrolledValue:d,mergedValue:m,activePath:T,tmNodes:C,mergedTheme:i,mergedCollapsed:o,cssVars:r?void 0:j,themeClass:M?.themeClass,overflowRef:P,counterRef:ee,updateCounter:()=>{},onResize:I,onUpdateOverflow:R,onUpdateCount:ne,renderCounter:H,getCounter:te,onRender:M?.onRender,showOption:A,deriveResponsiveState:I}},render(){let{mergedClsPrefix:e,mode:t,themeClass:r,onRender:i}=this;i?.();let a=()=>this.tmNodes.map(e=>Ht(e,this.$props)),o=t===`horizontal`&&this.responsive,c=()=>z(`div`,s(this.$attrs,{role:t===`horizontal`?`menubar`:`menu`,class:[`${e}-menu`,r,`${e}-menu--${t}`,o&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),o?(y(),n(fe,{key:2,ref:`overflowRef`,onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:a,counter:this.renderCounter},1032,[`onUpdateOverflow`,`getCounter`,`onUpdateCount`,`updateCounter`])):a());return o?(y(),n(re,{key:3,onResize:this.onResize},{default:c},1032,[`onResize`])):c()}}),Gt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Kt=B({name:`ArchiveOutline`,render:function(e,t){return y(),_(`svg`,Gt,t[0]||=[g(`path`,{d:`M80 152v256a40.12 40.12 0 0 0 40 40h272a40.12 40.12 0 0 0 40-40V152`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),g(`rect`,{x:`48`,y:`64`,width:`416`,height:`80`,rx:`28`,ry:`28`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),g(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M320 304l-64 64l-64-64`},null,-1),g(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 345.89V224`},null,-1)])}}),qt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Jt=B({name:`CubeOutline`,render:function(e,t){return y(),_(`svg`,qt,t[0]||=[g(`path`,{d:`M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),g(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M69 153.99l187 110l187-110`},null,-1),g(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 463.99v-200`},null,-1)])}}),Yt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Xt=B({name:`DocumentTextOutline`,render:function(e,t){return y(),_(`svg`,Yt,t[0]||=[g(`path`,{d:`M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),g(`path`,{d:`M256 56v120a32 32 0 0 0 32 32h120`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),g(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h160`},null,-1),g(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 368h160`},null,-1)])}}),Zt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Qt=B({name:`EarthOutline`,render:function(e,t){return y(),_(`svg`,Zt,t[0]||=[o(`<path d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208s208-93.13 208-208z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path d="M445.57 172.14c-16.06.1-14.48 29.73-34.49 15.75c-7.43-5.18-12-12.71-21.33-15c-8.15-2-16.5.08-24.55 1.47c-9.15 1.58-20 2.29-26.94 9.22c-6.71 6.67-10.26 15.62-17.4 22.33c-13.81 13-19.64 27.19-10.7 45.57c8.6 17.67 26.59 27.26 46 26c19.07-1.27 38.88-12.33 38.33 15.38c-.2 9.8 1.85 16.6 4.86 25.71c2.79 8.4 2.6 16.54 3.24 25.21c1.18 16.2 4.16 34.36 12.2 48.67l15-21.16c1.85-2.62 5.72-6.29 6.64-9.38c1.63-5.47-1.58-14.87-1.95-21s-.19-12.34-1.13-18.47c-1.32-8.59-6.4-16.64-7.1-25.13c-1.29-15.81 1.6-28.43-10.58-41.65c-11.76-12.75-29-15.81-45.47-13.22c-8.3 1.3-41.71 6.64-28.3-12.33c2.65-3.73 7.28-6.79 10.26-10.34c2.59-3.09 4.84-8.77 7.88-11.18s17-5.18 21-3.95s8.17 7 11.64 9.56a49.89 49.89 0 0 0 21.81 9.36c13.66 2 42.22-5.94 42-23.46c-.04-8.4-7.84-20.1-10.92-27.96z" fill="currentColor"></path><path d="M287.45 316.3c-5.33-22.44-35.82-29.94-52.26-42.11c-9.45-7-17.86-17.81-30.27-18.69c-5.72-.41-10.51.83-16.18-.64c-5.2-1.34-9.28-4.14-14.82-3.41c-10.35 1.36-16.88 12.42-28 10.92c-10.55-1.42-21.42-13.76-23.82-23.81c-3.08-12.92 7.14-17.11 18.09-18.26c4.57-.48 9.7-1 14.09.67c5.78 2.15 8.51 7.81 13.7 10.67c9.73 5.33 11.7-3.19 10.21-11.83c-2.23-12.94-4.83-18.22 6.71-27.12c8-6.14 14.84-10.58 13.56-21.61c-.76-6.48-4.31-9.41-1-15.86c2.51-4.91 9.4-9.34 13.89-12.27c11.59-7.56 49.65-7 34.1-28.16c-4.57-6.21-13-17.31-21-18.83c-10-1.89-14.44 9.27-21.41 14.19c-7.2 5.09-21.22 10.87-28.43 3c-9.7-10.59 6.43-14.07 10-21.46s-8.27-21.36-14.61-24.9l-29.81 33.43a41.52 41.52 0 0 0 8.34 31.86c5.93 7.63 15.37 10.08 15.8 20.5c.42 10-1.14 15.12-7.68 22.15c-2.83 3-4.83 7.26-7.71 10.07c-3.53 3.43-2.22 2.38-7.73 3.32c-10.36 1.75-19.18 4.45-29.19 7.21C95.34 199.94 93.8 172.69 86.2 162l-25 20.19c-.27 3.31 4.1 9.4 5.29 13c6.83 20.57 20.61 36.48 29.51 56.16c9.37 20.84 34.53 15.06 45.64 33.32c9.86 16.2-.67 36.71 6.71 53.67c5.36 12.31 18 15 26.72 24c8.91 9.09 8.72 21.53 10.08 33.36a305.22 305.22 0 0 0 7.45 41.28c1.21 4.69 2.32 10.89 5.53 14.76c2.2 2.66 9.75 4.95 6.7 5.83c4.26.7 11.85 4.68 15.4 1.76c4.68-3.84 3.43-15.66 4.24-21c2.43-15.9 10.39-31.45 21.13-43.35c10.61-11.74 25.15-19.69 34.11-33c8.73-12.98 11.36-30.49 7.74-45.68zm-33.39 26.32c-6 10.71-19.36 17.88-27.95 26.39c-2.33 2.31-7.29 10.31-10.21 8.58c-2.09-1.24-2.8-11.62-3.57-14a61.17 61.17 0 0 0-21.71-29.95c-3.13-2.37-10.89-5.45-12.68-8.7c-2-3.53-.2-11.86-.13-15.7c.11-5.6-2.44-14.91-1.06-20c1.6-5.87-1.48-2.33 3.77-3.49c2.77-.62 14.21 1.39 17.66 2.11c5.48 1.14 8.5 4.55 12.82 8c11.36 9.11 23.87 16.16 36.6 23.14c9.86 5.46 12.76 12.37 6.46 23.62z" fill="currentColor"></path><path d="M184.46 67.09c4.74 4.63 9.2 10.11 16.27 10.57c6.69.45 13-3.17 18.84 1.38c6.48 5 11.15 11.33 19.75 12.89c8.32 1.51 17.13-3.35 19.19-11.86c2-8.11-2.31-16.93-2.57-25.07c0-1.13.61-6.15-.17-7c-.58-.64-5.42.08-6.16.1q-8.13.24-16.22 1.12a207.1 207.1 0 0 0-57.18 14.65c2.43 1.68 5.48 2.35 8.25 3.22z" fill="currentColor"></path><path d="M356.4 123.27c8.49 0 17.11-3.8 14.37-13.62c-2.3-8.23-6.22-17.16-15.76-12.72c-6.07 2.82-14.67 10-15.38 17.12c-.81 8.08 11.11 9.22 16.77 9.22z" fill="currentColor"></path><path d="M349.62 166.24c8.67 5.19 21.53 2.75 28.07-4.66c5.11-5.8 8.12-15.87 17.31-15.86a15.4 15.4 0 0 1 10.82 4.41c3.8 3.93 3.05 7.62 3.86 12.54c1.81 11.05 13.66.63 16.75-3.65c2-2.79 4.71-6.93 3.8-10.56c-.84-3.39-4.8-7-6.56-10.11c-5.14-9-9.37-19.47-17.07-26.74c-7.41-7-16.52-6.19-23.55 1.08c-5.76 6-12.45 10.75-16.39 18.05c-2.78 5.13-5.91 7.58-11.54 8.91c-3.1.73-6.64 1-9.24 3.08c-7.24 5.7-3.12 19.39 3.74 23.51z" fill="currentColor"></path>`,6)])}}),$t={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},en=B({name:`GitNetworkOutline`,render:function(e,t){return y(),_(`svg`,$t,t[0]||=[o(`<circle cx="128" cy="96" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="256" cy="416" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 256v112"></path><circle cx="384" cy="96" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path d="M128 144c0 74.67 68.92 112 128 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path d="M384 144c0 74.67-68.92 112-128 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path>`,6)])}}),tn={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},nn=B({name:`GridOutline`,render:function(e,t){return y(),_(`svg`,tn,t[0]||=[g(`rect`,{x:`48`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),g(`rect`,{x:`288`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),g(`rect`,{x:`48`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),g(`rect`,{x:`288`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),rn={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},an=B({name:`LogOutOutline`,render:function(e,t){return y(),_(`svg`,rn,t[0]||=[g(`path`,{d:`M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),g(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M368 336l80-80l-80-80`},null,-1),g(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 256h256`},null,-1)])}}),on={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},sn=B({name:`MenuOutline`,render:function(e,t){return y(),_(`svg`,on,t[0]||=[g(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 160h352`},null,-1),g(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 256h352`},null,-1),g(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 352h352`},null,-1)])}}),cn={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},ln=B({name:`PulseOutline`,render:function(e,t){return y(),_(`svg`,cn,t[0]||=[g(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M48 320h64l64-256l64 384l64-224l32 96h64`},null,-1),g(`circle`,{cx:`432`,cy:`320`,r:`32`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),un={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},dn=B({name:`SettingsOutline`,render:function(e,t){return y(),_(`svg`,un,t[0]||=[g(`path`,{d:`M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),fn={key:0,class:`brand-copy`},pn={class:`mobile-drawer-account`},mn={class:`account-copy`},hn={class:`app-header-leading`},gn={class:`app-title`},_n={class:`account`},vn={class:`account-copy`},yn={class:`update-banner-body`},bn=B({__name:`AppLayout`,setup(t){let r=je(),a=ke(),o=Me(),s=_e(),c=Se(),l=V(!1),u=V(null),d=V(window.innerWidth),f=J(()=>Math.min(320,Math.round(d.value*.86))),m=V(window.innerWidth<1100);function h(e,t,n){return{label:()=>z(Ae,{to:{name:t},custom:!0},{default:({href:t,isExactActive:n,navigate:r})=>z(`a`,{href:t,"aria-current":n?`page`:void 0,onClick:r},e)}),key:t,icon:()=>z(X,null,{default:()=>z(n)})}}let v=[h(`运行概览`,`dashboard`,nn),h(`连接活动`,`connections`,Le),h(`代理编排`,`orchestration`,en),h(`配置管理`,`config`,Xt),h(`配置能力`,`schema`,Fe),h(`dae 版本`,`versions`,Jt),h(`Geo 数据`,`geo`,Qt),h(`故障诊断`,`diagnostics`,ln),h(`运行日志`,`logs`,Ie),h(`配置备份`,`backups`,Kt),h(`面板设置`,`settings`,dn)],b=J(()=>String(r.name||`dashboard`)),S=J(()=>String(r.meta.title||`kdae-panel`));async function C(){try{await o.logout(),await a.replace({name:`login`})}catch(e){s.error(e instanceof Error?e.message:`退出登录失败`)}}function w(){o.clearSession(),a.replace({name:`login`}),s.warning(`登录会话已过期，请重新登录`)}function E(){d.value=window.innerWidth,!c.value&&window.innerWidth<1100&&(m.value=!0)}function O(){u.value?.querySelector(`.n-menu-item-content--selected a`)?.focus({preventScroll:!0})}T(c,()=>{l.value=!1});let k=V(null),A=V(!1);async function j(){try{k.value=await ne(`/api/v1/panel/update`)}catch{k.value=null}}function M(e){let t=e.detail;k.value&&t&&(k.value.status=t)}return x(()=>{window.addEventListener(`kdae-panel:auth-expired`,w),window.addEventListener(`kdae-panel:self-update-changed`,M),window.addEventListener(`resize`,E),j()}),de(()=>{window.removeEventListener(`kdae-panel:auth-expired`,w),window.removeEventListener(`kdae-panel:self-update-changed`,M),window.removeEventListener(`resize`,E)}),(t,r)=>{let a=oe(`RouterView`);return y(),n(L(it),{"has-sider":!L(c),class:`app-shell`},{default:e(()=>[L(c)?q(``,!0):(y(),n(L(gt),{key:0,class:`app-sidebar`,bordered:``,"collapse-mode":`width`,"collapsed-width":64,width:236,collapsed:m.value,"show-trigger":`bar`,onCollapse:r[0]||=e=>m.value=!0,onExpand:r[1]||=e=>m.value=!1},{default:e(()=>[g(`div`,{class:te([`brand`,{compact:m.value}])},[r[7]||=g(`div`,{class:`brand-mark`},`K`,-1),m.value?q(``,!0):(y(),_(`div`,fn,[...r[6]||=[g(`strong`,null,`kdae-panel`,-1),g(`span`,null,`零侵入管理面板`,-1)]]))],2),p(L(Wt),{value:b.value,collapsed:m.value,"collapsed-width":64,"collapsed-icon-size":22,options:v},null,8,[`value`,`collapsed`])]),_:1},8,[`collapsed`])),p(L(Te),{show:l.value,"onUpdate:show":r[3]||=e=>l.value=e,placement:`left`,width:f.value,"auto-focus":!1,onAfterEnter:O},{default:e(()=>[p(L(Ee),{class:`mobile-nav-drawer`,"native-scrollbar":!1,"body-content-style":`padding: 0;`},{footer:e(()=>[g(`div`,pn,[p(L(Ye),{round:``,size:`small`},{default:e(()=>[i(K(L(o).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),g(`div`,mn,[g(`strong`,null,K(L(o).user?.username),1),r[8]||=g(`span`,null,`管理员`,-1)]),p(L(F),{quaternary:``,circle:``,title:`退出登录`,"aria-label":`退出登录`,onClick:C},{icon:e(()=>[p(L(X),null,{default:e(()=>[p(L(an))]),_:1})]),_:1})])]),default:e(()=>[r[9]||=g(`div`,{class:`brand mobile-drawer-brand`},[g(`div`,{class:`brand-mark`},`K`),g(`div`,{class:`brand-copy`},[g(`strong`,null,`kdae-panel`),g(`span`,null,`零侵入管理面板`)])],-1),g(`div`,{ref_key:`mobileNavRef`,ref:u},[p(L(Wt),{value:b.value,options:v,"onUpdate:value":r[2]||=e=>l.value=!1},null,8,[`value`])],512)]),_:1})]),_:1},8,[`show`,`width`]),p(L(it),{class:`app-main`},{default:e(()=>[p(L(ct),{bordered:``,class:`app-header`},{default:e(()=>[g(`div`,hn,[L(c)?(y(),n(L(F),{key:0,quaternary:``,circle:``,class:`mobile-nav-trigger`,title:`打开导航`,"aria-label":`打开导航`,onClick:r[4]||=e=>l.value=!0},{icon:e(()=>[p(L(X),null,{default:e(()=>[p(L(sn))]),_:1})]),_:1})):q(``,!0),g(`div`,gn,[p(L(ve),{depth:`3`,class:`eyebrow`},{default:e(()=>[...r[10]||=[i(`KDAE CONTROL PLANE`,-1)]]),_:1}),g(`h1`,null,K(S.value),1)])]),g(`div`,_n,[p(L(Ye),{round:``,size:`small`},{default:e(()=>[i(K(L(o).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),g(`div`,vn,[g(`strong`,null,K(L(o).user?.username),1),r[11]||=g(`span`,null,`管理员`,-1)]),p(L(F),{quaternary:``,circle:``,title:`退出登录`,onClick:C},{icon:e(()=>[p(L(X),null,{default:e(()=>[p(L(an))]),_:1})]),_:1})])]),_:1}),p(L(at),{class:`app-content`,"content-style":`padding: var(--page-padding);`},{default:e(()=>[k.value?.check.updateAvailable&&!A.value?(y(),n(L(we),{key:0,type:`info`,closable:``,class:`update-banner`,onClose:r[5]||=e=>A.value=!0},{default:e(()=>[g(`div`,yn,[g(`span`,null,[r[12]||=i(` 面板有新版本 `,-1),g(`strong`,null,K(k.value.check.latest),1),i(`（当前 `+K(k.value.check.current)+`）。 `,1),k.value.status?.enabled&&k.value.status.updatable?(y(),_(D,{key:0},[i(`升级会替换面板二进制并重启自身，配置与账号数据都会保留。`)],64)):k.value.status&&!k.value.status.enabled?(y(),_(D,{key:1},[i(`可直接在这里启用一键升级，不需要 SSH。`)],64)):k.value.status?.problem?(y(),_(D,{key:2},[i(`当前无法一键升级：`+K(k.value.status.problem),1)],64)):(y(),_(D,{key:3},[i(`当前部署不支持一键升级，可重新执行一键部署命令。`)],64)),r[13]||=g(`a`,{href:`https://github.com/tuoro/kdae-panel/releases/latest`,target:`_blank`,rel:`noopener`},`查看发布说明`,-1)]),p(Re,{payload:k.value,label:`立即升级`},null,8,[`payload`])])]),_:1})):q(``,!0),p(a)]),_:1})]),_:1})]),_:1},8,[`has-sider`])}}});export{bn as default};