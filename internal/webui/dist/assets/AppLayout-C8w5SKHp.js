import{$ as e,An as t,B as n,Bn as r,D as i,G as a,Gt as o,H as s,Hn as c,Ht as l,I as u,In as d,Jt as f,Kt as p,Ln as m,M as h,Mn as g,Nn as _,On as v,P as y,Pn as b,Q as x,Qn as S,R as C,Sn as w,T,U as ee,Ut as E,V as D,Vn as te,Xt as O,Yt as k,_n as A,ar as j,bn as M,dn as N,fn as P,gn as F,i as ne,ir as I,mn as L,nr as re,nt as R,on as z,or as B,p as V,pn as H,qt as U,sr as W,st as G,tt as ie,un as K,ut as q,v as ae,vn as J,wn as Y,z as oe}from"./client-DkW07njR.js";import{t as se}from"./create-CC2gVuYF.js";import{t as ce}from"./keysOf-BNt7p-WY.js";import{l as le,o as ue,r as de,t as fe}from"./Scrollbar-BZdl1G8a.js";import{t as pe}from"./misc-DDs3MKLt.js";import{l as me,n as X}from"./fade-in-scale-up.cssr-BdRR0Z2p.js";import{t as he}from"./use-merged-state-BhDn2UYN.js";import{i as ge,n as _e,r as ve,t as ye}from"./text-lz9v6H13.js";import{r as be,t as xe}from"./Dropdown-CqRmLtlz.js";import{t as Se}from"./src-BIRunl-2.js";import{t as Ce}from"./fade-in-height-expand.cssr-DNkZo7mN.js";import{n as we}from"./Tag-C9Kc9BR4.js";import{t as Te}from"./Alert-C3QZH9cG.js";import{n as Ee,t as De}from"./useMobileViewport-BjEkheOb.js";import{t as Z}from"./Icon-D1_Z7YPl.js";import{n as Oe,t as ke}from"./DrawerContent-dZLeCX2C.js";import{i as Ae,j as je,l as Me,n as Ne,r as Pe,t as Fe}from"./index-pOIpvN-C.js";import{t as Ie}from"./SwapHorizontalOutline-BUpwk8hp.js";import{t as Le}from"./PanelUpdateAction-CcbL3hgT.js";var Re=ae&&`loading`in document.createElement(`img`);function ze(e={}){let{root:t=null}=e;return{hash:`${e.rootMargin||`0px 0px 0px 0px`}-${Array.isArray(e.threshold)?e.threshold.join(`,`):e.threshold??`0`}`,options:{...e,root:(typeof t==`string`?document.querySelector(t):t)||document.documentElement}}}var Be=new WeakMap,Ve=new WeakMap,He=new WeakMap,Ue=(e,t,n)=>{if(!e)return()=>{};let r=ze(t),{root:i}=r.options,a,o=Be.get(i);o?a=o:(a=new Map,Be.set(i,a));let s,c;a.has(r.hash)?(c=a.get(r.hash),c[1].has(e)||(s=c[0],c[1].add(e),s.observe(e))):(s=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let t=Ve.get(e.target),n=He.get(e.target);t&&t(),n&&(n.value=!0)}})},r.options),s.observe(e),c=[s,new Set([e])],a.set(r.hash,c));let l=!1,u=()=>{l||(Ve.delete(e),He.delete(e),l=!0,c[1].has(e)&&(c[0].unobserve(e),c[1].delete(e)),c[1].size<=0&&a.delete(r.hash),a.size||Be.delete(i))};return Ve.set(e,u),He.set(e,n),u},We=q(`n-avatar-group`),Ge=E(`avatar`,`
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
`,[k(l(`&`,`--n-merged-color: var(--n-color-modal);`)),O(l(`&`,`--n-merged-color: var(--n-color-popover);`)),l(`img`,`
 width: 100%;
 height: 100%;
 `),o(`text`,`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),E(`icon`,`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),o(`text`,`line-height: 1.25`)]),Ke=[`src`],qe={...D.props,size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String},Je=J({name:`Avatar`,props:qe,slots:Object,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:a}=G(e),o=S(!1),c=null,l=S(null),u=S(null),d=()=>{let{value:e}=l;if(e&&(c===null||c!==e.innerHTML)){c=e.innerHTML;let{value:t}=u;if(t){let{offsetWidth:n,offsetHeight:r}=t,{offsetWidth:i,offsetHeight:a}=e,o=.9,s=Math.min(n/i*o,r/a*o,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${s})`}}},p=w(We,null),m=K(()=>{let{size:t}=e;if(t)return t;let{size:n}=p||{};return n||`medium`}),h=D(`Avatar`,`-avatar`,Ge,je,e,n),g=w(we,null),_=K(()=>{if(p)return!0;let{round:t,circle:n}=e;return t!==void 0||n!==void 0?t||n:g?g.roundRef.value:!1}),y=K(()=>p?!0:e.bordered||!1),b=K(()=>{let t=m.value,n=_.value,r=y.value,{color:i}=e,{self:{borderRadius:a,fontSize:o,color:s,border:c,colorModal:l,colorPopover:u},common:{cubicBezierEaseInOut:d}}=h.value,p;return p=typeof t==`number`?`${t}px`:h.value.self[f(`height`,t)],{"--n-font-size":o,"--n-border":r?c:`none`,"--n-border-radius":n?`50%`:a,"--n-color":i||s,"--n-color-modal":i||l,"--n-color-popover":i||u,"--n-bezier":d,"--n-merged-size":`var(--n-avatar-size-override, ${p})`}}),x=a?s(`avatar`,K(()=>{let t=m.value,n=_.value,r=y.value,{color:a}=e,o=``;return t&&(o+=typeof t==`number`?`a${t}`:t[0]),n&&(o+=`b`),r&&(o+=`c`),a&&(o+=i(a)),o}),b,e):void 0,C=S(!e.lazy);t(()=>{if(e.lazy&&e.intersectionObserverOptions){let t,n=te(()=>{t?.(),t=void 0,e.lazy&&(t=Ue(u.value,e.intersectionObserverOptions,C))});v(()=>{n(),t?.()})}}),r(()=>e.src||e.imgProps?.src,()=>{o.value=!1});let T=S(!e.lazy);return{textRef:l,selfRef:u,mergedRoundRef:_,mergedClsPrefix:n,fitTextTransform:d,cssVars:a?void 0:b,themeClass:x?.themeClass,onRender:x?.onRender,hasLoadError:o,shouldStartLoading:C,loaded:T,mergedOnError:t=>{if(!C.value)return;o.value=!0;let{onError:n,imgProps:{onError:r}={}}=e;n?.(t),r?.(t)},mergedOnLoad:t=>{let{onLoad:n,imgProps:{onLoad:r}={}}=e;n?.(t),r?.(t),T.value=!0}}},render(){let{$slots:t,src:n,mergedClsPrefix:r,lazy:i,onRender:a,loaded:o,hasLoadError:s,imgProps:c={}}=this;a?.();let l,u=!o&&!s&&(this.renderPlaceholder?this.renderPlaceholder():this.$slots.placeholder?.());return l=this.hasLoadError?this.renderFallback?this.renderFallback():h(t.fallback,()=>[(g(),L(`img`,{src:this.fallbackSrc,style:B({objectFit:this.objectFit})},null,12,Ke))]):y(t.default,t=>{if(t)return g(),P(de,{key:1,onResize:this.fitTextTransform},{default:()=>(g(),L(`span`,{ref:`textRef`,class:e(`${r}-avatar__text`)},[R(()=>t)],2))},1032,[`onResize`]);if(n||c.src){let e=this.src||c.src;return M(`img`,{...c,loading:Re&&!this.intersectionObserverOptions&&i?`lazy`:`eager`,src:i&&this.intersectionObserverOptions?this.shouldStartLoading?e:void 0:e,"data-image-src":e,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[c.style||``,{objectFit:this.objectFit},u?{height:`0`,width:`0`,visibility:`hidden`,position:`absolute`}:``]})}}),g(),L(`span`,{ref:`selfRef`,class:e([`${r}-avatar`,this.themeClass]),style:B(this.cssVars)},[R(()=>l),R(()=>i&&u)],6)}});function Ye(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:o,actionColor:s,scrollbarColor:c,scrollbarColorHover:l,invertedColor:u}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:s,headerColor:i,headerColorInverted:u,footerColor:s,footerColorInverted:u,headerBorderColor:o,headerBorderColorInverted:u,footerBorderColor:o,footerBorderColorInverted:u,siderBorderColor:o,siderBorderColorInverted:u,siderColor:i,siderColorInverted:u,siderToggleButtonBorder:`1px solid ${o}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:a(r,c),siderToggleBarColorHover:a(r,l),__invertScrollbar:`true`}}var Xe=n({name:`Layout`,common:ee,peers:{Scrollbar:le},self:Ye}),Ze=q(`n-layout-sider`),Qe={type:String,default:`static`},$e=E(`layout`,`
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
`,[E(`layout-scroll-container`,`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),p(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),et={embedded:Boolean,position:Qe,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},tt=q(`n-layout`);function nt(t){return J({name:t?`LayoutContent`:`Layout`,props:{...D.props,...et},setup(e){let t=S(null),n=S(null),{mergedClsPrefixRef:r,inlineThemeDisabled:i}=G(e),a=D(`Layout`,`-layout`,$e,Xe,e,r);function o(r,i){if(e.nativeScrollbar){let{value:e}=t;e&&(i===void 0?e.scrollTo(r):e.scrollTo(r,i))}else{let{value:e}=n;e&&e.scrollTo(r,i)}}_(tt,e);let c=0,l=0,u=t=>{let n=t.target;c=n.scrollLeft,l=n.scrollTop,e.onScroll?.(t)};ue(()=>{if(e.nativeScrollbar){let e=t.value;e&&(e.scrollTop=l,e.scrollLeft=c)}});let d={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},f={scrollTo:o},p=K(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=a.value;return{"--n-bezier":t,"--n-color":e.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),m=i?s(`layout`,K(()=>e.embedded?`e`:``),p,e):void 0;return{mergedClsPrefix:r,scrollableElRef:t,scrollbarInstRef:n,hasSiderStyle:d,mergedTheme:a,handleNativeElScroll:u,cssVars:i?void 0:p,themeClass:m?.themeClass,onRender:m?.onRender,...f}},render(){let{mergedClsPrefix:n,hasSider:r}=this;this.onRender?.();let i=r?this.hasSiderStyle:void 0,a=[this.themeClass,t&&`${n}-layout-content`,`${n}-layout`,`${n}-layout--${this.position}-positioned`];return g(),L(`div`,{class:e(a),style:B(this.cssVars)},[this.nativeScrollbar?(g(),L(`div`,{key:0,ref:`scrollableElRef`,class:e([`${n}-layout-scroll-container`,this.contentClass]),style:B([this.contentStyle,i]),onScroll:this.handleNativeElScroll},[R(()=>this.$slots.default?.())],46,[`onScroll`])):(g(),P(fe,Y({key:1},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,i]}),ie(this.$slots),1040,[`onScroll`,`theme`,`themeOverrides`,`contentClass`,`contentStyle`]))],6)}})}var rt=nt(!1),it=nt(!0),at=E(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[p(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),p(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),ot={position:Qe,inverted:Boolean,bordered:Boolean},st=J({name:`LayoutHeader`,props:{...D.props,...ot},setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=G(e),r=D(`Layout`,`-layout-header`,at,Xe,e,t),i=K(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=r.value,i={"--n-bezier":t};return e.inverted?(i[`--n-color`]=n.headerColorInverted,i[`--n-text-color`]=n.textColorInverted,i[`--n-border-color`]=n.headerBorderColorInverted):(i[`--n-color`]=n.headerColor,i[`--n-text-color`]=n.textColor,i[`--n-border-color`]=n.headerBorderColor),i}),a=n?s(`layout-header`,K(()=>e.inverted?`a`:`b`),i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{mergedClsPrefix:t}=this;return this.onRender?.(),g(),L(`div`,{class:e([`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`]),style:B(this.cssVars)},[R(()=>this.$slots.default?.())],6)}}),ct=E(`layout-sider`,`
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
`,[p(`bordered`,[o(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),o(`left-placement`,[p(`bordered`,[o(`border`,`
 right: 0;
 `)])]),p(`right-placement`,`
 justify-content: flex-start;
 `,[p(`bordered`,[o(`border`,`
 left: 0;
 `)]),p(`collapsed`,[E(`layout-toggle-button`,[E(`base-icon`,`
 transform: rotate(180deg);
 `)]),E(`layout-toggle-bar`,[l(`&:hover`,[o(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),o(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),E(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[E(`base-icon`,`
 transform: rotate(0);
 `)]),E(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[l(`&:hover`,[o(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),o(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),p(`collapsed`,[E(`layout-toggle-bar`,[l(`&:hover`,[o(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),o(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),E(`layout-toggle-button`,[E(`base-icon`,`
 transform: rotate(0);
 `)])]),E(`layout-toggle-button`,`
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
 `,[E(`base-icon`,`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),E(`layout-toggle-bar`,`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[o(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),o(`bottom`,`
 position: absolute;
 top: 34px;
 `),l(`&:hover`,[o(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),o(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),o(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),l(`&:hover`,[o(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),o(`border`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),E(`layout-sider-scroll-container`,`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),p(`show-content`,[E(`layout-sider-scroll-container`,{opacity:1})]),p(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),lt=[`onClick`],ut=J({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:t}=this;return g(),L(`div`,{onClick:this.onClick,class:e(`${t}-layout-toggle-bar`)},[N(`div`,{class:e(`${t}-layout-toggle-bar__top`)},null,2),N(`div`,{class:e(`${t}-layout-toggle-bar__bottom`)},null,2)],10,lt)}}),dt=[`onClick`],ft=J({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:t}=this;return g(),L(`div`,{class:e(`${t}-layout-toggle-button`),onClick:this.onClick},[(g(),P(oe,{clsPrefix:t},{default:()=>(g(),P(be))},1032,[`clsPrefix`]))],10,dt)}}),pt=[`onTransitionend`],mt={position:Qe,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},ht=J({name:`LayoutSider`,props:{...D.props,...mt},setup(e){let t=w(tt),n=S(null),r=S(null),i=S(e.defaultCollapsed),a=he(re(e,`collapsed`),i),o=K(()=>ve(a.value?e.collapsedWidth:e.width)),c=K(()=>e.collapseMode===`transform`?{minWidth:ve(e.width)}:{}),l=K(()=>t?t.siderPlacement:`left`);function d(t,i){if(e.nativeScrollbar){let{value:e}=n;e&&(i===void 0?e.scrollTo(t):e.scrollTo(t,i))}else{let{value:e}=r;e&&e.scrollTo(t,i)}}function f(){let{"onUpdate:collapsed":t,onUpdateCollapsed:n,onExpand:r,onCollapse:o}=e,{value:s}=a;n&&u(n,!s),t&&u(t,!s),i.value=!s,s?r&&u(r):o&&u(o)}let p=0,m=0,h=t=>{let n=t.target;p=n.scrollLeft,m=n.scrollTop,e.onScroll?.(t)};ue(()=>{if(e.nativeScrollbar){let e=n.value;e&&(e.scrollTop=m,e.scrollLeft=p)}}),_(Ze,{collapsedRef:a,collapseModeRef:re(e,`collapseMode`)});let{mergedClsPrefixRef:g,inlineThemeDisabled:v}=G(e),y=D(`Layout`,`-layout-sider`,ct,Xe,e,g);function b(t){t.propertyName===`max-width`&&(a.value?e.onAfterLeave?.():e.onAfterEnter?.())}let x={scrollTo:d},C=K(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=y.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":t,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return e.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),T=v?s(`layout-sider`,K(()=>e.inverted?`a`:`b`),C,e):void 0;return{scrollableElRef:n,scrollbarInstRef:r,mergedClsPrefix:g,mergedTheme:y,styleMaxWidth:o,mergedCollapsed:a,scrollContainerStyle:c,siderPlacement:l,handleNativeElScroll:h,handleTransitionend:b,handleTriggerClick:f,inlineThemeDisabled:v,cssVars:C,themeClass:T?.themeClass,onRender:T?.onRender,...x}},render(){let{mergedClsPrefix:t,mergedCollapsed:n,showTrigger:r}=this;return this.onRender?.(),g(),L(`aside`,{class:e([`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,n&&`${t}-layout-sider--collapsed`,(!n||this.showCollapsedContent)&&`${t}-layout-sider--show-content`]),onTransitionend:this.handleTransitionend,style:B([this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:ve(this.width)}])},[this.nativeScrollbar?(g(),L(`div`,{key:1,class:e([`${t}-layout-sider-scroll-container`,this.contentClass]),onScroll:this.handleNativeElScroll,style:B([this.scrollContainerStyle,{overflow:`auto`},this.contentStyle]),ref:`scrollableElRef`},[R(()=>this.$slots.default?.())],46,[`onScroll`])):(g(),P(fe,Y({key:0},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),ie(this.$slots),1040,[`onScroll`,`style`,`contentStyle`,`contentClass`,`theme`,`themeOverrides`,`builtinThemeOverrides`])),r?(g(),L(z,{key:2},[r===`bar`?(g(),P(ut,{key:0,clsPrefix:t,class:e(n?this.collapsedTriggerClass:this.triggerClass),style:B(n?this.collapsedTriggerStyle:this.triggerStyle),onClick:this.handleTriggerClick},null,8,[`clsPrefix`,`class`,`style`,`onClick`])):(g(),P(ft,{key:1,clsPrefix:t,class:e(n?this.collapsedTriggerClass:this.triggerClass),style:B(n?this.collapsedTriggerStyle:this.triggerStyle),onClick:this.handleTriggerClick},null,8,[`clsPrefix`,`class`,`style`,`onClick`]))],64)):R(()=>null),this.bordered?(g(),L(`div`,{key:4,class:e(`${t}-layout-sider__border`)},null,2)):R(()=>null)],46,pt)}}),Q=q(`n-menu`),gt=q(`n-submenu`),_t=q(`n-menu-item-group`),vt=[l(`&::before`,`background-color: var(--n-item-color-hover);`),o(`arrow`,`
 color: var(--n-arrow-color-hover);
 `),o(`icon`,`
 color: var(--n-item-icon-color-hover);
 `),E(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover);
 `,[l(`a`,`
 color: var(--n-item-text-color-hover);
 `),o(`extra`,`
 color: var(--n-item-text-color-hover);
 `)])],yt=[o(`icon`,`
 color: var(--n-item-icon-color-hover-horizontal);
 `),E(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover-horizontal);
 `,[l(`a`,`
 color: var(--n-item-text-color-hover-horizontal);
 `),o(`extra`,`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],bt=l([E(`menu`,`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[p(`horizontal`,`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[E(`submenu`,`margin: 0;`),E(`menu-item`,`margin: 0;`),E(`menu-item-content`,`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[l(`&::before`,`display: none;`),p(`selected`,`border-bottom: 2px solid var(--n-border-color-horizontal)`)]),E(`menu-item-content`,[p(`selected`,[o(`icon`,`color: var(--n-item-icon-color-active-horizontal);`),E(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-horizontal);
 `,[l(`a`,`color: var(--n-item-text-color-active-horizontal);`),o(`extra`,`color: var(--n-item-text-color-active-horizontal);`)])]),p(`child-active`,`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[E(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[l(`a`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `),o(`extra`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),o(`icon`,`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),U(`disabled`,[U(`selected, child-active`,[l(`&:focus-within`,yt)]),p(`selected`,[$(null,[o(`icon`,`color: var(--n-item-icon-color-active-hover-horizontal);`),E(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[l(`a`,`color: var(--n-item-text-color-active-hover-horizontal);`),o(`extra`,`color: var(--n-item-text-color-active-hover-horizontal);`)])])]),p(`child-active`,[$(null,[o(`icon`,`color: var(--n-item-icon-color-child-active-hover-horizontal);`),E(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[l(`a`,`color: var(--n-item-text-color-child-active-hover-horizontal);`),o(`extra`,`color: var(--n-item-text-color-child-active-hover-horizontal);`)])])]),$(`border-bottom: 2px solid var(--n-border-color-horizontal);`,yt)]),E(`menu-item-content-header`,[l(`a`,`color: var(--n-item-text-color-horizontal);`)])])]),U(`responsive`,[E(`menu-item-content-header`,`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),p(`collapsed`,[E(`menu-item-content`,[p(`selected`,[l(`&::before`,`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),E(`menu-item-content-header`,`opacity: 0;`),o(`arrow`,`opacity: 0;`),o(`icon`,`color: var(--n-item-icon-color-collapsed);`)])]),E(`menu-item`,`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),E(`menu-item-content`,`
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
 `,[l(`> *`,`z-index: 1;`),l(`&::before`,`
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
 `),p(`disabled`,`
 opacity: .45;
 cursor: not-allowed;
 `),p(`collapsed`,[o(`arrow`,`transform: rotate(0);`)]),p(`selected`,[l(`&::before`,`background-color: var(--n-item-color-active);`),o(`arrow`,`color: var(--n-arrow-color-active);`),o(`icon`,`color: var(--n-item-icon-color-active);`),E(`menu-item-content-header`,`
 color: var(--n-item-text-color-active);
 `,[l(`a`,`color: var(--n-item-text-color-active);`),o(`extra`,`color: var(--n-item-text-color-active);`)])]),p(`child-active`,[E(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active);
 `,[l(`a`,`
 color: var(--n-item-text-color-child-active);
 `),o(`extra`,`
 color: var(--n-item-text-color-child-active);
 `)]),o(`arrow`,`
 color: var(--n-arrow-color-child-active);
 `),o(`icon`,`
 color: var(--n-item-icon-color-child-active);
 `)]),U(`disabled`,[U(`selected, child-active`,[l(`&:focus-within`,vt)]),p(`selected`,[$(null,[o(`arrow`,`color: var(--n-arrow-color-active-hover);`),o(`icon`,`color: var(--n-item-icon-color-active-hover);`),E(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover);
 `,[l(`a`,`color: var(--n-item-text-color-active-hover);`),o(`extra`,`color: var(--n-item-text-color-active-hover);`)])])]),p(`child-active`,[$(null,[o(`arrow`,`color: var(--n-arrow-color-child-active-hover);`),o(`icon`,`color: var(--n-item-icon-color-child-active-hover);`),E(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover);
 `,[l(`a`,`color: var(--n-item-text-color-child-active-hover);`),o(`extra`,`color: var(--n-item-text-color-child-active-hover);`)])])]),p(`selected`,[$(null,[l(`&::before`,`background-color: var(--n-item-color-active-hover);`)])]),$(null,vt)]),o(`icon`,`
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
 `),o(`arrow`,`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),E(`menu-item-content-header`,`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[l(`a`,`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[l(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),o(`extra`,`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),E(`submenu`,`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[E(`menu-item-content`,`
 height: var(--n-item-height);
 `),E(`submenu-children`,`
 overflow: hidden;
 padding: 0;
 `,[Ce({duration:`.2s`})])]),E(`menu-item-group`,[E(`menu-item-group-title`,`
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
 `)])]),E(`menu-tooltip`,[l(`a`,`
 color: inherit;
 text-decoration: none;
 `)]),E(`menu-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function $(e,t){return[p(`hover`,e,t),l(`&:hover`,e,t)]}var xt=J({name:`MenuDivider`,setup(){let{mergedClsPrefixRef:t,isHorizontalRef:n}=w(Q);return()=>n.value?null:(g(),L(`div`,{key:1,class:e(`${t.value}-menu-divider`)},null,2))}}),St=J({name:`ChevronDownFilled`,render(){return(()=>{let e=x(`f3af82a2aab086a5`);return e[0]||=N(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[N(`path`,{d:`M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z`,fill:`currentColor`})],-1)})()}}),Ct=[`onClick`],wt=J({name:`MenuOptionContent`,props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){let{props:t}=w(Q);return{menuProps:t,style:K(()=>{let{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:K(()=>{let{maxIconSize:t,activeIconSize:n,iconMarginRight:r}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${n}px`,marginRight:`${r}px`}})}},render(){let{clsPrefix:t,tmNode:n,menuProps:{renderIcon:r,renderLabel:i,renderExtra:a,expandIcon:o}}=this,s=r?r(n.rawNode):X(this.icon);return(()=>{let r=x(`7bb10afc6caf8fa4`);return g(),L(`div`,{onClick:e=>{this.onClick?.(e)},role:`none`,class:e([`${t}-menu-item-content`,{[`${t}-menu-item-content--selected`]:this.selected,[`${t}-menu-item-content--collapsed`]:this.collapsed,[`${t}-menu-item-content--child-active`]:this.childActive,[`${t}-menu-item-content--disabled`]:this.disabled,[`${t}-menu-item-content--hover`]:this.hover}]),style:B(this.style)},[R(()=>s&&(g(),L(`div`,{class:e(`${t}-menu-item-content__icon`),style:B(this.iconStyle),role:`none`},[R(()=>[s])],6))),N(`div`,{class:e(`${t}-menu-item-content-header`),role:`none`},[this.isEllipsisPlaceholder?(g(),L(z,{key:0},[R(()=>this.title)],64)):(g(),L(z,{key:1},[i?(g(),L(z,{key:0},[R(()=>i(n.rawNode))],64)):(g(),L(z,{key:1},[R(()=>X(this.title))],64))],64)),this.extra||a?(g(),L(`span`,{key:2,class:e(`${t}-menu-item-content-header__extra`)},[r[0]||=R(` `,-1),a?(g(),L(z,{key:0},[R(()=>a(n.rawNode))],64)):(g(),L(z,{key:1},[R(()=>X(this.extra))],64))],2)):R(()=>null)],2),this.showArrow?(g(),P(oe,{key:0,ariaHidden:!0,class:e(`${t}-menu-item-content__arrow`),clsPrefix:t},{default:()=>o?o(n.rawNode):(g(),P(St,{key:1}))},1032,[`class`,`clsPrefix`])):R(()=>null)],14,Ct)})()}}),Tt=8;function Et(e){let t=w(Q),{props:n,mergedCollapsedRef:r}=t,i=w(gt,null),a=w(_t,null),o=K(()=>n.mode===`horizontal`),s=K(()=>o.value?n.dropdownPlacement:`tmNodes`in e?`right-start`:`right`),c=K(()=>Math.max(n.collapsedIconSize??n.iconSize,n.iconSize));return{dropdownPlacement:s,activeIconSize:K(()=>!o.value&&e.root&&r.value?n.collapsedIconSize??n.iconSize:n.iconSize),maxIconSize:c,paddingLeft:K(()=>{if(o.value)return;let{collapsedWidth:t,indent:s,rootIndent:l}=n,{root:u,isGroup:d}=e,f=l===void 0?s:l;return u?r.value?t/2-c.value/2:f:a&&typeof a.paddingLeftRef.value==`number`?r.value?t/2-c.value/2:s/2+a.paddingLeftRef.value:i&&typeof i.paddingLeftRef.value==`number`?(d?s/2:s)+i.paddingLeftRef.value:0}),iconMarginRight:K(()=>{let{collapsedWidth:t,indent:i,rootIndent:a}=n,{value:s}=c,{root:l}=e;return o.value||!l||!r.value?Tt:(a===void 0?i:a)+s+Tt-(t+s)/2}),NMenu:t,NSubmenu:i,NMenuOptionGroup:a}}var Dt={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},Ot={...Dt,tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function},kt=ce(Ot),At=J({name:`MenuOption`,props:Ot,setup(e){let t=Et(e),{NSubmenu:n,NMenu:r,NMenuOptionGroup:i}=t,{props:a,mergedClsPrefixRef:o,mergedCollapsedRef:s}=r,c=n?n.mergedDisabledRef:i?i.mergedDisabledRef:{value:!1},l=K(()=>c.value||e.disabled);function u(t){let{onClick:n}=e;n&&n(t)}function d(t){l.value||(r.doSelect(e.internalKey,e.tmNode.rawNode),u(t))}return{mergedClsPrefix:o,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:r.mergedThemeRef,menuProps:a,dropdownEnabled:C(()=>e.root&&s.value&&a.mode!==`horizontal`&&!l.value),selected:C(()=>r.mergedValueRef.value===e.internalKey),mergedDisabled:l,handleClick:d}},render(){let{mergedClsPrefix:e,mergedTheme:t,tmNode:n,menuProps:{renderLabel:r,nodeProps:i}}=this,a=i?.(n.rawNode);return g(),L(`div`,Y(a,{role:`menuitem`,class:[`${e}-menu-item`,a?.class]}),[(g(),P(Ee,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:`hover`,placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:[`menu-tooltip`]},{default:()=>r?r(n.rawNode):X(this.title),trigger:()=>(g(),P(wt,{tmNode:n,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick},null,8,[`tmNode`,`clsPrefix`,`paddingLeft`,`iconMarginRight`,`maxIconSize`,`activeIconSize`,`selected`,`title`,`extra`,`disabled`,`icon`,`onClick`]))},1032,[`theme`,`themeOverrides`,`placement`,`disabled`]))],16)}}),jt={...Dt,tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}},Mt=ce(jt),Nt=J({name:`MenuOptionGroup`,props:jt,setup(t){let n=Et(t),{NSubmenu:r}=n,i=K(()=>r?.mergedDisabledRef.value?!0:t.tmNode.disabled);_(_t,{paddingLeftRef:n.paddingLeft,mergedDisabledRef:i});let{mergedClsPrefixRef:a,props:o}=w(Q);return function(){let{value:r}=a,i=n.paddingLeft.value,{nodeProps:s}=o,c=s?.(t.tmNode.rawNode);return(()=>{let n=x(`45eca6a63be5028b`);return g(),L(`div`,{class:e(`${r}-menu-item-group`),role:`group`},[N(`div`,Y(c,{class:[`${r}-menu-item-group-title`,c?.class],style:[c?.style||``,i===void 0?``:`padding-left: ${i}px;`]}),[R(()=>X(t.title)),t.extra?(g(),L(z,{key:0},[n[0]||=R(` `,-1),R(()=>X(t.extra))],64)):R(()=>null)],16),N(`div`,null,[R(()=>t.tmNodes.map(e=>Vt(e,o)))])],2)})()}}}),Pt=[`aria-expanded`,`id`],Ft=[`aria-expanded`,`id`],It={...Dt,rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean},Lt=ce(It),Rt=J({name:`Submenu`,props:It,setup(e){let t=Et(e),{NMenu:n,NSubmenu:r}=t,{props:i,mergedCollapsedRef:a,mergedThemeRef:o}=n,s=K(()=>{let{disabled:t}=e;return r?.mergedDisabledRef.value||i.disabled?!0:t}),c=S(!1);_(gt,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:s}),_(_t,null);function l(){let{onClick:t}=e;t&&t()}function u(){s.value||(a.value||n.toggleExpand(e.internalKey),l())}function d(e){c.value=e}return{menuProps:i,mergedTheme:o,doSelect:n.doSelect,inverted:n.invertedRef,isHorizontal:n.isHorizontalRef,mergedClsPrefix:n.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:c,paddingLeft:t.paddingLeft,mergedDisabled:s,mergedValue:n.mergedValueRef,childActive:C(()=>e.virtualChildActive??n.activePathRef.value.includes(e.internalKey)),collapsed:K(()=>i.mode===`horizontal`?!1:a.value?!0:!n.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:K(()=>!s.value&&(i.mode===`horizontal`||a.value)),handlePopoverShowChange:d,handleClick:u}},render(){let{mergedClsPrefix:t,menuProps:{renderIcon:n,renderLabel:r}}=this,i=()=>{let{isHorizontal:e,paddingLeft:t,collapsed:n,mergedDisabled:r,maxIconSize:i,activeIconSize:a,title:o,childActive:s,icon:c,handleClick:l,menuProps:{nodeProps:u},dropdownShow:d,iconMarginRight:f,tmNode:p,mergedClsPrefix:m,isEllipsisPlaceholder:h,extra:_}=this,v=u?.(p.rawNode);return g(),L(`div`,Y(v,{class:[`${m}-menu-item`,v?.class],role:`menuitem`}),[(g(),P(wt,{tmNode:p,paddingLeft:t,collapsed:n,disabled:r,iconMarginRight:f,maxIconSize:i,activeIconSize:a,title:o,extra:_,showArrow:!e,childActive:s,clsPrefix:m,icon:c,hover:d,onClick:l,isEllipsisPlaceholder:h},null,8,[`tmNode`,`paddingLeft`,`collapsed`,`disabled`,`iconMarginRight`,`maxIconSize`,`activeIconSize`,`title`,`extra`,`showArrow`,`childActive`,`clsPrefix`,`icon`,`hover`,`onClick`,`isEllipsisPlaceholder`]))],16)},a=()=>(g(),P(T,null,{default:()=>{let{tmNodes:n,collapsed:r}=this;return r?null:(g(),L(`div`,{key:1,class:e(`${t}-submenu-children`),role:`menu`},[R(()=>n.map(e=>Vt(e,this.menuProps)))],2))}},1024));return this.root?(g(),P(xe,Y({key:2,size:`large`,trigger:`hover`},this.menuProps?.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:`14px`,optionIconSizeLarge:`18px`},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:n,renderLabel:r}),{default:()=>(g(),L(`div`,{class:e(`${t}-submenu`),role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},[R(()=>i()),this.isHorizontal?R(()=>null):(g(),L(z,{key:1},[R(()=>a())],64))],10,Pt))},1040,[`themeOverrides`,`theme`,`value`,`disabled`,`placement`,`keyField`,`labelField`,`childrenField`,`onUpdateShow`,`options`,`onSelect`,`inverted`,`renderIcon`,`renderLabel`])):(g(),L(`div`,{key:3,class:e(`${t}-submenu`),role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},[R(()=>i()),R(()=>a())],10,Ft))}});function zt(e){return e.type===`divider`||e.type===`render`}function Bt(e){return e.type===`divider`}function Vt(e,t){let{rawNode:n}=e,{show:r}=n;if(r===!1)return null;if(zt(n))return Bt(n)?(g(),P(xt,Y({key:e.key},n.props),null,16)):null;let{labelField:i}=t,{key:a,level:o,isGroup:s}=e,c={...n,title:n.title||n[i],extra:n.titleExtra||n.extra,key:a,internalKey:a,level:o,root:o===0,isGroup:s};return e.children?e.isGroup?M(Nt,me(c,Mt,{tmNode:e,tmNodes:e.children,key:a})):M(Rt,me(c,Lt,{key:a,rawNodes:n[t.childrenField],tmNodes:e.children,tmNode:e})):M(At,me(c,kt,{key:a,tmNode:e}))}var Ht={...D.props,options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},disabledField:{type:String,default:`disabled`},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:`vertical`},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:`bottom`},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array},Ut=J({name:`Menu`,inheritAttrs:!1,props:Ht,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=G(e),r=D(`Menu`,`-menu`,bt,Me,e,t),i=w(Ze,null),a=K(()=>{let{collapsed:t}=e;if(t!==void 0)return t;if(i){let{collapseModeRef:e,collapsedRef:t}=i;if(e.value===`width`)return t.value??!1}return!1}),o=K(()=>{let{keyField:t,childrenField:n,disabledField:r}=e;return se(e.items||e.options,{getIgnored(e){return zt(e)},getChildren(e){return e[n]},getDisabled(e){return e[r]},getKey(e){return e[t]??e.name}})}),c=K(()=>new Set(o.value.treeNodes.map(e=>e.key))),{watchProps:l}=e,d=S(null);l?.includes(`defaultValue`)?te(()=>{d.value=e.defaultValue}):d.value=e.defaultValue;let f=re(e,`value`),p=he(f,d),m=S([]),h=()=>{m.value=e.defaultExpandAll?o.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||o.value.getPath(p.value,{includeSelf:!1}).keyPath};l?.includes(`defaultExpandedKeys`)?te(h):h();let v=ge(e,[`expandedNames`,`expandedKeys`]),y=he(v,m),b=K(()=>o.value.treeNodes),x=K(()=>o.value.getPath(p.value).keyPath);_(Q,{props:e,mergedCollapsedRef:a,mergedThemeRef:r,mergedValueRef:p,mergedExpandedKeysRef:y,activePathRef:x,mergedClsPrefixRef:t,isHorizontalRef:K(()=>e.mode===`horizontal`),invertedRef:re(e,`inverted`),doSelect:C,toggleExpand:ee});function C(t,n){let{"onUpdate:value":r,onUpdateValue:i,onSelect:a}=e;i&&u(i,t,n),r&&u(r,t,n),a&&u(a,t,n),d.value=t}function T(t){let{"onUpdate:expandedKeys":n,onUpdateExpandedKeys:r,onExpandedNamesChange:i,onOpenNamesChange:a}=e;n&&u(n,t),r&&u(r,t),i&&u(i,t),a&&u(a,t),m.value=t}function ee(t){let n=Array.from(y.value),r=n.findIndex(e=>e===t);if(~r)n.splice(r,1);else{if(e.accordion&&c.value.has(t)){let e=n.findIndex(e=>c.value.has(e));e>-1&&n.splice(e,1)}n.push(t)}T(n)}let E=t=>{let n=o.value.getPath(t??p.value,{includeSelf:!1}).keyPath;if(!n.length)return;let r=Array.from(y.value),i=new Set([...r,...n]);e.accordion&&c.value.forEach(e=>{i.has(e)&&!n.includes(e)&&i.delete(e)}),T(Array.from(i))},O=K(()=>{let{inverted:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{borderRadius:a,borderColorHorizontal:o,fontSize:s,itemHeight:c,dividerColor:l}=i,u={"--n-divider-color":l,"--n-bezier":n,"--n-font-size":s,"--n-border-color-horizontal":o,"--n-border-radius":a,"--n-item-height":c};return t?(u[`--n-group-text-color`]=i.groupTextColorInverted,u[`--n-color`]=i.colorInverted,u[`--n-item-text-color`]=i.itemTextColorInverted,u[`--n-item-text-color-hover`]=i.itemTextColorHoverInverted,u[`--n-item-text-color-active`]=i.itemTextColorActiveInverted,u[`--n-item-text-color-child-active`]=i.itemTextColorChildActiveInverted,u[`--n-item-text-color-child-active-hover`]=i.itemTextColorChildActiveInverted,u[`--n-item-text-color-active-hover`]=i.itemTextColorActiveHoverInverted,u[`--n-item-icon-color`]=i.itemIconColorInverted,u[`--n-item-icon-color-hover`]=i.itemIconColorHoverInverted,u[`--n-item-icon-color-active`]=i.itemIconColorActiveInverted,u[`--n-item-icon-color-active-hover`]=i.itemIconColorActiveHoverInverted,u[`--n-item-icon-color-child-active`]=i.itemIconColorChildActiveInverted,u[`--n-item-icon-color-child-active-hover`]=i.itemIconColorChildActiveHoverInverted,u[`--n-item-icon-color-collapsed`]=i.itemIconColorCollapsedInverted,u[`--n-item-text-color-horizontal`]=i.itemTextColorHorizontalInverted,u[`--n-item-text-color-hover-horizontal`]=i.itemTextColorHoverHorizontalInverted,u[`--n-item-text-color-active-horizontal`]=i.itemTextColorActiveHorizontalInverted,u[`--n-item-text-color-child-active-horizontal`]=i.itemTextColorChildActiveHorizontalInverted,u[`--n-item-text-color-child-active-hover-horizontal`]=i.itemTextColorChildActiveHoverHorizontalInverted,u[`--n-item-text-color-active-hover-horizontal`]=i.itemTextColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-horizontal`]=i.itemIconColorHorizontalInverted,u[`--n-item-icon-color-hover-horizontal`]=i.itemIconColorHoverHorizontalInverted,u[`--n-item-icon-color-active-horizontal`]=i.itemIconColorActiveHorizontalInverted,u[`--n-item-icon-color-active-hover-horizontal`]=i.itemIconColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-child-active-horizontal`]=i.itemIconColorChildActiveHorizontalInverted,u[`--n-item-icon-color-child-active-hover-horizontal`]=i.itemIconColorChildActiveHoverHorizontalInverted,u[`--n-arrow-color`]=i.arrowColorInverted,u[`--n-arrow-color-hover`]=i.arrowColorHoverInverted,u[`--n-arrow-color-active`]=i.arrowColorActiveInverted,u[`--n-arrow-color-active-hover`]=i.arrowColorActiveHoverInverted,u[`--n-arrow-color-child-active`]=i.arrowColorChildActiveInverted,u[`--n-arrow-color-child-active-hover`]=i.arrowColorChildActiveHoverInverted,u[`--n-item-color-hover`]=i.itemColorHoverInverted,u[`--n-item-color-active`]=i.itemColorActiveInverted,u[`--n-item-color-active-hover`]=i.itemColorActiveHoverInverted,u[`--n-item-color-active-collapsed`]=i.itemColorActiveCollapsedInverted):(u[`--n-group-text-color`]=i.groupTextColor,u[`--n-color`]=i.color,u[`--n-item-text-color`]=i.itemTextColor,u[`--n-item-text-color-hover`]=i.itemTextColorHover,u[`--n-item-text-color-active`]=i.itemTextColorActive,u[`--n-item-text-color-child-active`]=i.itemTextColorChildActive,u[`--n-item-text-color-child-active-hover`]=i.itemTextColorChildActiveHover,u[`--n-item-text-color-active-hover`]=i.itemTextColorActiveHover,u[`--n-item-icon-color`]=i.itemIconColor,u[`--n-item-icon-color-hover`]=i.itemIconColorHover,u[`--n-item-icon-color-active`]=i.itemIconColorActive,u[`--n-item-icon-color-active-hover`]=i.itemIconColorActiveHover,u[`--n-item-icon-color-child-active`]=i.itemIconColorChildActive,u[`--n-item-icon-color-child-active-hover`]=i.itemIconColorChildActiveHover,u[`--n-item-icon-color-collapsed`]=i.itemIconColorCollapsed,u[`--n-item-text-color-horizontal`]=i.itemTextColorHorizontal,u[`--n-item-text-color-hover-horizontal`]=i.itemTextColorHoverHorizontal,u[`--n-item-text-color-active-horizontal`]=i.itemTextColorActiveHorizontal,u[`--n-item-text-color-child-active-horizontal`]=i.itemTextColorChildActiveHorizontal,u[`--n-item-text-color-child-active-hover-horizontal`]=i.itemTextColorChildActiveHoverHorizontal,u[`--n-item-text-color-active-hover-horizontal`]=i.itemTextColorActiveHoverHorizontal,u[`--n-item-icon-color-horizontal`]=i.itemIconColorHorizontal,u[`--n-item-icon-color-hover-horizontal`]=i.itemIconColorHoverHorizontal,u[`--n-item-icon-color-active-horizontal`]=i.itemIconColorActiveHorizontal,u[`--n-item-icon-color-active-hover-horizontal`]=i.itemIconColorActiveHoverHorizontal,u[`--n-item-icon-color-child-active-horizontal`]=i.itemIconColorChildActiveHorizontal,u[`--n-item-icon-color-child-active-hover-horizontal`]=i.itemIconColorChildActiveHoverHorizontal,u[`--n-arrow-color`]=i.arrowColor,u[`--n-arrow-color-hover`]=i.arrowColorHover,u[`--n-arrow-color-active`]=i.arrowColorActive,u[`--n-arrow-color-active-hover`]=i.arrowColorActiveHover,u[`--n-arrow-color-child-active`]=i.arrowColorChildActive,u[`--n-arrow-color-child-active-hover`]=i.arrowColorChildActiveHover,u[`--n-item-color-hover`]=i.itemColorHover,u[`--n-item-color-active`]=i.itemColorActive,u[`--n-item-color-active-hover`]=i.itemColorActiveHover,u[`--n-item-color-active-collapsed`]=i.itemColorActiveCollapsed),u}),k=n?s(`menu`,K(()=>e.inverted?`a`:`b`),O,e):void 0,A=pe(),j=S(null),M=S(null),N=!0,F=()=>{N?N=!1:j.value?.sync({showAllItemsBeforeCalculate:!0})};function ne(){return document.getElementById(A)}let I=S(-1);function L(t){I.value=e.options.length-t}function R(e){e||(I.value=-1)}let z=K(()=>{let t=I.value;return{children:t===-1?[]:e.options.slice(t)}}),B=K(()=>{let{childrenField:t,disabledField:n,keyField:r}=e;return se([z.value],{getIgnored(e){return zt(e)},getChildren(e){return e[t]},getDisabled(e){return e[n]},getKey(e){return e[r]??e.name}})}),V=K(()=>se([{}]).treeNodes[0]);function H(){if(I.value===-1)return g(),P(Rt,{root:!0,level:0,key:`__ellpisisGroupPlaceholder__`,internalKey:`__ellpisisGroupPlaceholder__`,title:`···`,tmNode:V.value,domId:A,isEllipsisPlaceholder:!0},null,8,[`tmNode`,`domId`]);let e=B.value.treeNodes[0],t=x.value,n=!!e.children?.some(e=>t.includes(e.key));return g(),P(Rt,{level:0,root:!0,key:`__ellpisisGroup__`,internalKey:`__ellpisisGroup__`,title:`···`,virtualChildActive:n,tmNode:e,domId:A,rawNodes:e.rawNode.children||[],tmNodes:e.children||[],isEllipsisPlaceholder:!0},null,8,[`virtualChildActive`,`tmNode`,`domId`,`rawNodes`,`tmNodes`])}return{mergedClsPrefix:t,controlledExpandedKeys:v,uncontrolledExpanededKeys:m,mergedExpandedKeys:y,uncontrolledValue:d,mergedValue:p,activePath:x,tmNodes:b,mergedTheme:r,mergedCollapsed:a,cssVars:n?void 0:O,themeClass:k?.themeClass,overflowRef:j,counterRef:M,updateCounter:()=>{},onResize:F,onUpdateOverflow:R,onUpdateCount:L,renderCounter:H,getCounter:ne,onRender:k?.onRender,showOption:E,deriveResponsiveState:F}},render(){let{mergedClsPrefix:e,mode:t,themeClass:n,onRender:r}=this;r?.();let i=()=>this.tmNodes.map(e=>Vt(e,this.$props)),a=t===`horizontal`&&this.responsive,o=()=>M(`div`,Y(this.$attrs,{role:t===`horizontal`?`menubar`:`menu`,class:[`${e}-menu`,n,`${e}-menu--${t}`,a&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),a?(g(),P(Se,{key:2,ref:`overflowRef`,onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:i,counter:this.renderCounter},1032,[`onUpdateOverflow`,`getCounter`,`onUpdateCount`,`updateCounter`])):i());return a?(g(),P(de,{key:3,onResize:this.onResize},{default:o},1032,[`onResize`])):o()}}),Wt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Gt=J({name:`CubeOutline`,render:function(e,t){return g(),L(`svg`,Wt,t[0]||=[N(`path`,{d:`M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),N(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M69 153.99l187 110l187-110`},null,-1),N(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 463.99v-200`},null,-1)])}}),Kt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},qt=J({name:`DocumentTextOutline`,render:function(e,t){return g(),L(`svg`,Kt,t[0]||=[N(`path`,{d:`M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),N(`path`,{d:`M256 56v120a32 32 0 0 0 32 32h120`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),N(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h160`},null,-1),N(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 368h160`},null,-1)])}}),Jt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Yt=J({name:`GridOutline`,render:function(e,t){return g(),L(`svg`,Jt,t[0]||=[N(`rect`,{x:`48`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),N(`rect`,{x:`288`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),N(`rect`,{x:`48`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),N(`rect`,{x:`288`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Xt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Zt=J({name:`LogOutOutline`,render:function(e,t){return g(),L(`svg`,Xt,t[0]||=[N(`path`,{d:`M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),N(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M368 336l80-80l-80-80`},null,-1),N(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 256h256`},null,-1)])}}),Qt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},$t=J({name:`MenuOutline`,render:function(e,t){return g(),L(`svg`,Qt,t[0]||=[N(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 160h352`},null,-1),N(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 256h352`},null,-1),N(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 352h352`},null,-1)])}}),en={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},tn=J({name:`PulseOutline`,render:function(e,t){return g(),L(`svg`,en,t[0]||=[N(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M48 320h64l64-256l64 384l64-224l32 96h64`},null,-1),N(`circle`,{cx:`432`,cy:`320`,r:`32`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),nn={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},rn=J({name:`SettingsOutline`,render:function(e,t){return g(),L(`svg`,nn,t[0]||=[N(`path`,{d:`M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),an={key:0,class:`brand-copy`},on={class:`mobile-drawer-account`},sn={class:`account-copy`},cn={key:0,class:`section-header-scope`},ln={key:1,class:`app-header-leading`},un={class:`app-title`},dn={class:`account`},fn={class:`account-copy`},pn=[`aria-label`],mn={class:`update-banner-body`},hn=J({__name:`AppLayout`,setup(e){let n=Pe(),i=Ae(),a=Fe(),o=_e(),s=De(),l=S(!1),u=S(null),f=S(window.innerWidth),p=K(()=>Math.min(320,Math.round(f.value*.86))),h=S(window.innerWidth<1100);function _(e,t,n,r=t){return{label:()=>M(Ne,{to:{name:t},custom:!0},{default:({href:t,isExactActive:n,navigate:r})=>M(`a`,{href:t,"aria-current":n?`page`:void 0,onClick:r},e)}),key:r,icon:()=>M(Z,null,{default:()=>M(n)})}}let y=[_(`运行概览`,`dashboard`,Yt),_(`连接活动`,`connections`,Ie),_(`配置中心`,`orchestration`,qt,`configuration`),_(`资源管理`,`versions`,Gt,`resources`),_(`排障中心`,`diagnostics`,tn,`troubleshooting`),_(`面板设置`,`settings`,rn)],x={configuration:{label:`配置中心`,icon:qt,tabs:[{name:`orchestration`,label:`代理配置`},{name:`config`,label:`配置文件`},{name:`backups`,label:`配置备份`},{name:`schema`,label:`配置参考`}]},resources:{label:`资源管理`,icon:Gt,tabs:[{name:`versions`,label:`dae 版本`},{name:`geo`,label:`Geo 数据`}]},troubleshooting:{label:`排障中心`,icon:tn,tabs:[{name:`diagnostics`,label:`故障诊断`},{name:`logs`,label:`运行日志`}]}},C=K(()=>x[n.meta.section]),w=K(()=>String(n.meta.section||n.name||`dashboard`)),T=K(()=>String(n.meta.title||`kdae-panel`));async function ee(){try{await a.logout(),await i.replace({name:`login`})}catch(e){o.error(e instanceof Error?e.message:`退出登录失败`)}}function E(){a.clearSession(),i.replace({name:`login`}),o.warning(`登录会话已过期，请重新登录`)}function D(){f.value=window.innerWidth,!s.value&&window.innerWidth<1100&&(h.value=!0)}function te(){u.value?.querySelector(`.n-menu-item-content--selected a`)?.focus({preventScroll:!0})}r(s,()=>{l.value=!1});let O=S(null),k=S(!1);async function re(){try{O.value=await ne(`/api/v1/panel/update`)}catch{O.value=null}}function R(e){let t=e.detail;O.value&&t&&(O.value.status=t)}return t(()=>{window.addEventListener(`kdae-panel:auth-expired`,E),window.addEventListener(`kdae-panel:self-update-changed`,R),window.addEventListener(`resize`,D),re()}),v(()=>{window.removeEventListener(`kdae-panel:auth-expired`,E),window.removeEventListener(`kdae-panel:self-update-changed`,R),window.removeEventListener(`resize`,D)}),(e,t)=>{let r=d(`RouterView`);return g(),P(I(rt),{"has-sider":!I(s),class:`app-shell`},{default:c(()=>[I(s)?H(``,!0):(g(),P(I(ht),{key:0,class:`app-sidebar`,bordered:``,"collapse-mode":`width`,"collapsed-width":64,width:236,collapsed:h.value,"show-trigger":`bar`,onCollapse:t[0]||=e=>h.value=!0,onExpand:t[1]||=e=>h.value=!1},{default:c(()=>[N(`div`,{class:j([`brand`,{compact:h.value}])},[t[8]||=N(`div`,{class:`brand-mark`},`K`,-1),h.value?H(``,!0):(g(),L(`div`,an,[...t[7]||=[N(`strong`,null,`kdae-panel`,-1),N(`span`,null,`零侵入管理面板`,-1)]]))],2),A(I(Ut),{value:w.value,collapsed:h.value,"collapsed-width":64,"collapsed-icon-size":22,options:y},null,8,[`value`,`collapsed`])]),_:1},8,[`collapsed`])),A(I(Oe),{show:l.value,"onUpdate:show":t[3]||=e=>l.value=e,placement:`left`,width:p.value,"auto-focus":!1,onAfterEnter:te},{default:c(()=>[A(I(ke),{class:`mobile-nav-drawer`,"native-scrollbar":!1,"body-content-style":`padding: 0;`},{footer:c(()=>[N(`div`,on,[A(I(Je),{round:``,size:`small`},{default:c(()=>[F(W(I(a).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),N(`div`,sn,[N(`strong`,null,W(I(a).user?.username),1),t[9]||=N(`span`,null,`管理员`,-1)]),A(I(V),{quaternary:``,circle:``,title:`退出登录`,"aria-label":`退出登录`,onClick:ee},{icon:c(()=>[A(I(Z),null,{default:c(()=>[A(I(Zt))]),_:1})]),_:1})])]),default:c(()=>[t[10]||=N(`div`,{class:`brand mobile-drawer-brand`},[N(`div`,{class:`brand-mark`},`K`),N(`div`,{class:`brand-copy`},[N(`strong`,null,`kdae-panel`),N(`span`,null,`零侵入管理面板`)])],-1),N(`div`,{ref_key:`mobileNavRef`,ref:u},[A(I(Ut),{value:w.value,options:y,"onUpdate:value":t[2]||=e=>l.value=!1},null,8,[`value`])],512)]),_:1})]),_:1},8,[`show`,`width`]),A(I(rt),{class:`app-main`},{default:c(()=>[A(I(st),{bordered:``,class:j([`app-header`,{"section-header":C.value}])},{default:c(()=>[C.value?(g(),L(`div`,cn,[I(s)?(g(),P(I(V),{key:0,quaternary:``,circle:``,class:`mobile-nav-trigger`,title:`打开导航`,"aria-label":`打开导航`,onClick:t[4]||=e=>l.value=!0},{icon:c(()=>[A(I(Z),null,{default:c(()=>[A(I($t))]),_:1})]),_:1})):H(``,!0),A(I(Z),{size:`17`},{default:c(()=>[(g(),P(m(C.value.icon)))]),_:1}),N(`strong`,null,W(C.value.label),1)])):(g(),L(`div`,ln,[I(s)?(g(),P(I(V),{key:0,quaternary:``,circle:``,class:`mobile-nav-trigger`,title:`打开导航`,"aria-label":`打开导航`,onClick:t[5]||=e=>l.value=!0},{icon:c(()=>[A(I(Z),null,{default:c(()=>[A(I($t))]),_:1})]),_:1})):H(``,!0),N(`div`,un,[A(I(ye),{depth:`3`,class:`eyebrow`},{default:c(()=>[...t[11]||=[F(`KDAE CONTROL PLANE`,-1)]]),_:1}),N(`h1`,null,W(T.value),1)])])),N(`div`,dn,[A(I(Je),{round:``,size:`small`},{default:c(()=>[F(W(I(a).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),N(`div`,fn,[N(`strong`,null,W(I(a).user?.username),1),t[12]||=N(`span`,null,`管理员`,-1)]),A(I(V),{quaternary:``,circle:``,title:`退出登录`,onClick:ee},{icon:c(()=>[A(I(Z),null,{default:c(()=>[A(I(Zt))]),_:1})]),_:1})]),C.value?(g(),L(`nav`,{key:2,class:`section-tabs`,"aria-label":`${C.value.label}子页面`},[(g(!0),L(z,null,b(C.value.tabs,e=>(g(),P(I(Ne),{key:e.name,to:{name:e.name},class:j([`section-tab`,{active:I(n).name===e.name}])},{default:c(()=>[F(W(e.label),1)]),_:2},1032,[`to`,`class`]))),128))],8,pn)):H(``,!0)]),_:1},8,[`class`]),A(I(it),{class:j([`app-content`,{"section-content":C.value}]),"content-style":`padding: var(--page-padding);`},{default:c(()=>[O.value?.check.updateAvailable&&!k.value?(g(),P(I(Te),{key:0,type:`info`,closable:``,class:`update-banner`,onClose:t[6]||=e=>k.value=!0},{default:c(()=>[N(`div`,mn,[N(`span`,null,[t[13]||=F(` 面板有新版本 `,-1),N(`strong`,null,W(O.value.check.latest),1),F(`（当前 `+W(O.value.check.current)+`）。 `,1),O.value.status?.enabled&&O.value.status.updatable?(g(),L(z,{key:0},[F(`升级会替换面板二进制并重启自身，配置与账号数据都会保留。`)],64)):O.value.status&&!O.value.status.enabled?(g(),L(z,{key:1},[F(`可直接在这里启用一键升级，不需要 SSH。`)],64)):O.value.status?.problem?(g(),L(z,{key:2},[F(`当前无法一键升级：`+W(O.value.status.problem),1)],64)):(g(),L(z,{key:3},[F(`当前部署不支持一键升级，可重新执行一键部署命令。`)],64)),t[14]||=N(`a`,{href:`https://github.com/tuoro/kdae-panel/releases/latest`,target:`_blank`,rel:`noopener`},`查看发布说明`,-1)]),A(Le,{payload:O.value,label:`立即升级`},null,8,[`payload`])])]),_:1})):H(``,!0),A(r)]),_:1},8,[`class`])]),_:1})]),_:1},8,[`has-sider`])}}});export{hn as default};