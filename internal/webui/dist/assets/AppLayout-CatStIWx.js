import{$ as e,$n as t,$t as n,A as r,B as i,Cn as a,D as o,Dn as s,Fn as c,Gn as l,H as u,J as d,Jn as f,Nn as p,O as m,On as h,P as g,Qn as _,R as v,Sn as y,T as b,Tn as x,Un as S,Vn as C,W as w,Wn as T,X as E,Y as D,Z as ee,Zn as te,_n as O,_r as k,an as A,en as j,ft as M,gr as N,hr as P,i as ne,in as F,jn as I,kn as L,lr as R,lt as re,nn as z,on as ie,p as B,pr as V,pt as H,q as ae,qn as oe,rn as U,sn as se,tt as ce,ut as W,v as le,vr as G,vt as K,wn as q,xn as J,xt as Y,zn as ue}from"./client-3GjT0YO-.js";import{t as de}from"./create-Bt40Opne.js";import{t as fe}from"./keysOf-BNt7p-WY.js";import{t as pe}from"./misc-DDs3MKLt.js";import{t as me}from"./use-merged-state-DuBoFKO_.js";import{i as he,n as ge,r as _e,t as ve}from"./text-BS8gAoyY.js";import{r as ye,t as be}from"./Dropdown-Bv4rHUKV.js";import{t as xe}from"./src-Cp7gAE4-.js";import{r as Se,t as X}from"./Icon-Dm4VT5OZ.js";import{t as Ce}from"./Alert-CQ_f0B9n.js";import{n as we,t as Te}from"./useMobileViewport-BuEHgudo.js";import{n as Ee,t as De}from"./DrawerContent-CoczVBAc.js";import{L as Z,P as Oe,Q as ke,i as Ae,n as je,r as Me,t as Ne,u as Pe,z as Fe}from"./index-fTZ5v0dX.js";import{t as Ie}from"./SwapHorizontalOutline-BSWFn-Ma.js";import{t as Le}from"./PanelUpdateAction-ZnCdXTej.js";var Re=le&&`loading`in document.createElement(`img`);function ze(e={}){let{root:t=null}=e;return{hash:`${e.rootMargin||`0px 0px 0px 0px`}-${Array.isArray(e.threshold)?e.threshold.join(`,`):e.threshold??`0`}`,options:{...e,root:(typeof t==`string`?document.querySelector(t):t)||document.documentElement}}}var Be=new WeakMap,Ve=new WeakMap,He=new WeakMap,Ue=(e,t,n)=>{if(!e)return()=>{};let r=ze(t),{root:i}=r.options,a,o=Be.get(i);o?a=o:(a=new Map,Be.set(i,a));let s,c;a.has(r.hash)?(c=a.get(r.hash),c[1].has(e)||(s=c[0],c[1].add(e),s.observe(e))):(s=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let t=Ve.get(e.target),n=He.get(e.target);t&&t(),n&&(n.value=!0)}})},r.options),s.observe(e),c=[s,new Set([e])],a.set(r.hash,c));let l=!1,u=()=>{l||(Ve.delete(e),He.delete(e),l=!0,c[1].has(e)&&(c[0].unobserve(e),c[1].delete(e)),c[1].size<=0&&a.delete(r.hash),a.size||Be.delete(i))};return Ve.set(e,u),He.set(e,n),u},We=Y(`n-avatar-group`),Ge=j(`avatar`,`
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
`,[ie(n(`&`,`--n-merged-color: var(--n-color-modal);`)),se(n(`&`,`--n-merged-color: var(--n-color-popover);`)),n(`img`,`
 width: 100%;
 height: 100%;
 `),z(`text`,`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),j(`icon`,`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),z(`text`,`line-height: 1.25`)]),Ke=[`src`],qe={...D.props,size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String},Je=L({name:`Avatar`,props:qe,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=K(e),r=R(!1),i=null,a=R(null),s=R(null),c=()=>{let{value:e}=a;if(e&&(i===null||i!==e.innerHTML)){i=e.innerHTML;let{value:t}=s;if(t){let{offsetWidth:n,offsetHeight:r}=t,{offsetWidth:i,offsetHeight:a}=e,o=.9,s=Math.min(n/i*o,r/a*o,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${s})`}}},l=p(We,null),u=J(()=>{let{size:t}=e;if(t)return t;let{size:n}=l||{};return n||`medium`}),d=D(`Avatar`,`-avatar`,Ge,Oe,e,t),f=p(Se,null),m=J(()=>{if(l)return!0;let{round:t,circle:n}=e;return t!==void 0||n!==void 0?t||n:f?f.roundRef.value:!1}),h=J(()=>l?!0:e.bordered||!1),g=J(()=>{let t=u.value,n=m.value,r=h.value,{color:i}=e,{self:{borderRadius:a,fontSize:o,color:s,border:c,colorModal:l,colorPopover:f},common:{cubicBezierEaseInOut:p}}=d.value,g;return g=typeof t==`number`?`${t}px`:d.value.self[A(`height`,t)],{"--n-font-size":o,"--n-border":r?c:`none`,"--n-border-radius":n?`50%`:a,"--n-color":i||s,"--n-color-modal":i||l,"--n-color-popover":i||f,"--n-bezier":p,"--n-merged-size":`var(--n-avatar-size-override, ${g})`}}),v=n?E(`avatar`,J(()=>{let t=u.value,n=m.value,r=h.value,{color:i}=e,a=``;return t&&(a+=typeof t==`number`?`a${t}`:t[0]),n&&(a+=`b`),r&&(a+=`c`),i&&(a+=o(i)),a}),g,e):void 0,y=R(!e.lazy);C(()=>{if(e.lazy&&e.intersectionObserverOptions){let t,n=_(()=>{t?.(),t=void 0,e.lazy&&(t=Ue(s.value,e.intersectionObserverOptions,y))});ue(()=>{n(),t?.()})}}),te(()=>e.src||e.imgProps?.src,()=>{r.value=!1});let b=R(!e.lazy);return{textRef:a,selfRef:s,mergedRoundRef:m,mergedClsPrefix:t,fitTextTransform:c,cssVars:n?void 0:g,themeClass:v?.themeClass,onRender:v?.onRender,hasLoadError:r,shouldStartLoading:y,loaded:b,mergedOnError:t=>{if(!y.value)return;r.value=!0;let{onError:n,imgProps:{onError:i}={}}=e;n?.(t),i?.(t)},mergedOnLoad:t=>{let{onLoad:n,imgProps:{onLoad:r}={}}=e;n?.(t),r?.(t),b.value=!0}}},render(){let{$slots:e,src:t,mergedClsPrefix:n,lazy:o,onRender:s,loaded:c,hasLoadError:l,imgProps:u={}}=this;s?.();let d,f=!c&&!l&&(this.renderPlaceholder?this.renderPlaceholder():this.$slots.placeholder?.());return d=this.hasLoadError?this.renderFallback?this.renderFallback():v(e.fallback,()=>[(S(),x(`img`,{src:this.fallbackSrc,style:k({objectFit:this.objectFit})},null,12,Ke))]):i(e.default,e=>{if(e)return S(),a(r,{key:1,onResize:this.fitTextTransform},{default:()=>(S(),x(`span`,{ref:`textRef`,class:W(`${n}-avatar__text`)},[H(()=>e)],2))},1032,[`onResize`]);if(t||u.src){let e=this.src||u.src;return I(`img`,{...u,loading:Re&&!this.intersectionObserverOptions&&o?`lazy`:`eager`,src:o&&this.intersectionObserverOptions?this.shouldStartLoading?e:void 0:e,"data-image-src":e,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[u.style||``,{objectFit:this.objectFit},f?{height:`0`,width:`0`,visibility:`hidden`,position:`absolute`}:``]})}}),S(),x(`span`,{ref:`selfRef`,class:W([`${n}-avatar`,this.themeClass]),style:k(this.cssVars)},[H(()=>d),H(()=>o&&f)],6)}});function Ye(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:a,actionColor:o,scrollbarColor:s,scrollbarColorHover:c,invertedColor:l}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:o,headerColor:i,headerColorInverted:l,footerColor:o,footerColorInverted:l,headerBorderColor:a,headerBorderColorInverted:l,footerBorderColor:a,footerBorderColorInverted:l,siderBorderColor:a,siderBorderColorInverted:l,siderColor:i,siderColorInverted:l,siderToggleButtonBorder:`1px solid ${a}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:ce(r,s),siderToggleBarColorHover:ce(r,c),__invertScrollbar:`true`}}var Xe=d({name:`Layout`,common:e,peers:{Scrollbar:ee},self:Ye}),Ze=Y(`n-layout-sider`),Qe={type:String,default:`static`},$e=j(`layout`,`
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
`,[j(`layout-scroll-container`,`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),U(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),et={embedded:Boolean,position:Qe,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},tt=Y(`n-layout`);function nt(e){return L({name:e?`LayoutContent`:`Layout`,props:{...D.props,...et},setup(e){let t=R(null),n=R(null),{mergedClsPrefixRef:r,inlineThemeDisabled:i}=K(e),a=D(`Layout`,`-layout`,$e,Xe,e,r);function o(r,i){if(e.nativeScrollbar){let{value:e}=t;e&&(i===void 0?e.scrollTo(r):e.scrollTo(r,i))}else{let{value:e}=n;e&&e.scrollTo(r,i)}}T(tt,e);let s=0,c=0,l=t=>{let n=t.target;s=n.scrollLeft,c=n.scrollTop,e.onScroll?.(t)};g(()=>{if(e.nativeScrollbar){let e=t.value;e&&(e.scrollTop=c,e.scrollLeft=s)}});let u={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},d={scrollTo:o},f=J(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=a.value;return{"--n-bezier":t,"--n-color":e.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),p=i?E(`layout`,J(()=>e.embedded?`e`:``),f,e):void 0;return{mergedClsPrefix:r,scrollableElRef:t,scrollbarInstRef:n,hasSiderStyle:u,mergedTheme:a,handleNativeElScroll:l,cssVars:i?void 0:f,themeClass:p?.themeClass,onRender:p?.onRender,...d}},render(){let{mergedClsPrefix:t,hasSider:n}=this;this.onRender?.();let r=n?this.hasSiderStyle:void 0,i=[this.themeClass,e&&`${t}-layout-content`,`${t}-layout`,`${t}-layout--${this.position}-positioned`];return S(),x(`div`,{class:W(i),style:k(this.cssVars)},[this.nativeScrollbar?(S(),x(`div`,{key:0,ref:`scrollableElRef`,class:W([`${t}-layout-scroll-container`,this.contentClass]),style:k([this.contentStyle,r]),onScroll:this.handleNativeElScroll},[H(()=>this.$slots.default?.())],46,[`onScroll`])):(S(),a(m,c({key:1},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,r]}),M(this.$slots),1040,[`onScroll`,`theme`,`themeOverrides`,`contentClass`,`contentStyle`]))],6)}})}var rt=nt(!1),it=nt(!0),at=j(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[U(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),U(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),ot={position:Qe,inverted:Boolean,bordered:Boolean},st=L({name:`LayoutHeader`,props:{...D.props,...ot},setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=K(e),r=D(`Layout`,`-layout-header`,at,Xe,e,t),i=J(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=r.value,i={"--n-bezier":t};return e.inverted?(i[`--n-color`]=n.headerColorInverted,i[`--n-text-color`]=n.textColorInverted,i[`--n-border-color`]=n.headerBorderColorInverted):(i[`--n-color`]=n.headerColor,i[`--n-text-color`]=n.textColor,i[`--n-border-color`]=n.headerBorderColor),i}),a=n?E(`layout-header`,J(()=>e.inverted?`a`:`b`),i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{mergedClsPrefix:e}=this;return this.onRender?.(),S(),x(`div`,{class:W([`${e}-layout-header`,this.themeClass,this.position&&`${e}-layout-header--${this.position}-positioned`,this.bordered&&`${e}-layout-header--bordered`]),style:k(this.cssVars)},[H(()=>this.$slots.default?.())],6)}}),ct=j(`layout-sider`,`
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
`,[U(`bordered`,[z(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),z(`left-placement`,[U(`bordered`,[z(`border`,`
 right: 0;
 `)])]),U(`right-placement`,`
 justify-content: flex-start;
 `,[U(`bordered`,[z(`border`,`
 left: 0;
 `)]),U(`collapsed`,[j(`layout-toggle-button`,[j(`base-icon`,`
 transform: rotate(180deg);
 `)]),j(`layout-toggle-bar`,[n(`&:hover`,[z(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),z(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),j(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[j(`base-icon`,`
 transform: rotate(0);
 `)]),j(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[n(`&:hover`,[z(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),z(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),U(`collapsed`,[j(`layout-toggle-bar`,[n(`&:hover`,[z(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),z(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),j(`layout-toggle-button`,[j(`base-icon`,`
 transform: rotate(0);
 `)])]),j(`layout-toggle-button`,`
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
 `,[j(`base-icon`,`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),j(`layout-toggle-bar`,`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[z(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),z(`bottom`,`
 position: absolute;
 top: 34px;
 `),n(`&:hover`,[z(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),z(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),z(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),n(`&:hover`,[z(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),z(`border`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),j(`layout-sider-scroll-container`,`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),U(`show-content`,[j(`layout-sider-scroll-container`,{opacity:1})]),U(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),lt=[`onClick`],ut=L({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return S(),x(`div`,{onClick:this.onClick,class:W(`${e}-layout-toggle-bar`)},[y(`div`,{class:W(`${e}-layout-toggle-bar__top`)},null,2),y(`div`,{class:W(`${e}-layout-toggle-bar__bottom`)},null,2)],10,lt)}}),dt=[`onClick`],ft=L({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return S(),x(`div`,{class:W(`${e}-layout-toggle-button`),onClick:this.onClick},[(S(),a(ae,{clsPrefix:e},{default:()=>(S(),a(ye))},1032,[`clsPrefix`]))],10,dt)}}),pt=[`onTransitionend`],mt={position:Qe,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},ht=L({name:`LayoutSider`,props:{...D.props,...mt},setup(e){let t=p(tt),n=R(null),r=R(null),i=R(e.defaultCollapsed),a=me(V(e,`collapsed`),i),o=J(()=>_e(a.value?e.collapsedWidth:e.width)),s=J(()=>e.collapseMode===`transform`?{minWidth:_e(e.width)}:{}),c=J(()=>t?t.siderPlacement:`left`);function l(t,i){if(e.nativeScrollbar){let{value:e}=n;e&&(i===void 0?e.scrollTo(t):e.scrollTo(t,i))}else{let{value:e}=r;e&&e.scrollTo(t,i)}}function d(){let{"onUpdate:collapsed":t,onUpdateCollapsed:n,onExpand:r,onCollapse:o}=e,{value:s}=a;n&&u(n,!s),t&&u(t,!s),i.value=!s,s?r&&u(r):o&&u(o)}let f=0,m=0,h=t=>{let n=t.target;f=n.scrollLeft,m=n.scrollTop,e.onScroll?.(t)};g(()=>{if(e.nativeScrollbar){let e=n.value;e&&(e.scrollTop=m,e.scrollLeft=f)}}),T(Ze,{collapsedRef:a,collapseModeRef:V(e,`collapseMode`)});let{mergedClsPrefixRef:_,inlineThemeDisabled:v}=K(e),y=D(`Layout`,`-layout-sider`,ct,Xe,e,_);function b(t){t.propertyName===`max-width`&&(a.value?e.onAfterLeave?.():e.onAfterEnter?.())}let x={scrollTo:l},S=J(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=y.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":t,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return e.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),C=v?E(`layout-sider`,J(()=>e.inverted?`a`:`b`),S,e):void 0;return{scrollableElRef:n,scrollbarInstRef:r,mergedClsPrefix:_,mergedTheme:y,styleMaxWidth:o,mergedCollapsed:a,scrollContainerStyle:s,siderPlacement:c,handleNativeElScroll:h,handleTransitionend:b,handleTriggerClick:d,inlineThemeDisabled:v,cssVars:S,themeClass:C?.themeClass,onRender:C?.onRender,...x}},render(){let{mergedClsPrefix:e,mergedCollapsed:t,showTrigger:n}=this;return this.onRender?.(),S(),x(`aside`,{class:W([`${e}-layout-sider`,this.themeClass,`${e}-layout-sider--${this.position}-positioned`,`${e}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${e}-layout-sider--bordered`,t&&`${e}-layout-sider--collapsed`,(!t||this.showCollapsedContent)&&`${e}-layout-sider--show-content`]),onTransitionend:this.handleTransitionend,style:k([this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:_e(this.width)}])},[this.nativeScrollbar?(S(),x(`div`,{key:1,class:W([`${e}-layout-sider-scroll-container`,this.contentClass]),onScroll:this.handleNativeElScroll,style:k([this.scrollContainerStyle,{overflow:`auto`},this.contentStyle]),ref:`scrollableElRef`},[H(()=>this.$slots.default?.())],46,[`onScroll`])):(S(),a(m,c({key:0},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),M(this.$slots),1040,[`onScroll`,`style`,`contentStyle`,`contentClass`,`theme`,`themeOverrides`,`builtinThemeOverrides`])),n?(S(),x(O,{key:2},[n===`bar`?(S(),a(ut,{key:0,clsPrefix:e,class:W(t?this.collapsedTriggerClass:this.triggerClass),style:k(t?this.collapsedTriggerStyle:this.triggerStyle),onClick:this.handleTriggerClick},null,8,[`clsPrefix`,`class`,`style`,`onClick`])):(S(),a(ft,{key:1,clsPrefix:e,class:W(t?this.collapsedTriggerClass:this.triggerClass),style:k(t?this.collapsedTriggerStyle:this.triggerStyle),onClick:this.handleTriggerClick},null,8,[`clsPrefix`,`class`,`style`,`onClick`]))],64)):H(()=>null),this.bordered?(S(),x(`div`,{key:4,class:W(`${e}-layout-sider__border`)},null,2)):H(()=>null)],46,pt)}}),Q=Y(`n-menu`),gt=Y(`n-submenu`),_t=Y(`n-menu-item-group`),vt=[n(`&::before`,`background-color: var(--n-item-color-hover);`),z(`arrow`,`
 color: var(--n-arrow-color-hover);
 `),z(`icon`,`
 color: var(--n-item-icon-color-hover);
 `),j(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover);
 `,[n(`a`,`
 color: var(--n-item-text-color-hover);
 `),z(`extra`,`
 color: var(--n-item-text-color-hover);
 `)])],yt=[z(`icon`,`
 color: var(--n-item-icon-color-hover-horizontal);
 `),j(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover-horizontal);
 `,[n(`a`,`
 color: var(--n-item-text-color-hover-horizontal);
 `),z(`extra`,`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],bt=n([j(`menu`,`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[U(`horizontal`,`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[j(`submenu`,`margin: 0;`),j(`menu-item`,`margin: 0;`),j(`menu-item-content`,`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[n(`&::before`,`display: none;`),U(`selected`,`border-bottom: 2px solid var(--n-border-color-horizontal)`)]),j(`menu-item-content`,[U(`selected`,[z(`icon`,`color: var(--n-item-icon-color-active-horizontal);`),j(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-horizontal);
 `,[n(`a`,`color: var(--n-item-text-color-active-horizontal);`),z(`extra`,`color: var(--n-item-text-color-active-horizontal);`)])]),U(`child-active`,`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[j(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[n(`a`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `),z(`extra`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),z(`icon`,`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),F(`disabled`,[F(`selected, child-active`,[n(`&:focus-within`,yt)]),U(`selected`,[$(null,[z(`icon`,`color: var(--n-item-icon-color-active-hover-horizontal);`),j(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[n(`a`,`color: var(--n-item-text-color-active-hover-horizontal);`),z(`extra`,`color: var(--n-item-text-color-active-hover-horizontal);`)])])]),U(`child-active`,[$(null,[z(`icon`,`color: var(--n-item-icon-color-child-active-hover-horizontal);`),j(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[n(`a`,`color: var(--n-item-text-color-child-active-hover-horizontal);`),z(`extra`,`color: var(--n-item-text-color-child-active-hover-horizontal);`)])])]),$(`border-bottom: 2px solid var(--n-border-color-horizontal);`,yt)]),j(`menu-item-content-header`,[n(`a`,`color: var(--n-item-text-color-horizontal);`)])])]),F(`responsive`,[j(`menu-item-content-header`,`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),U(`collapsed`,[j(`menu-item-content`,[U(`selected`,[n(`&::before`,`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),j(`menu-item-content-header`,`opacity: 0;`),z(`arrow`,`opacity: 0;`),z(`icon`,`color: var(--n-item-icon-color-collapsed);`)])]),j(`menu-item`,`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),j(`menu-item-content`,`
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
 `,[n(`> *`,`z-index: 1;`),n(`&::before`,`
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
 `),U(`disabled`,`
 opacity: .45;
 cursor: not-allowed;
 `),U(`collapsed`,[z(`arrow`,`transform: rotate(0);`)]),U(`selected`,[n(`&::before`,`background-color: var(--n-item-color-active);`),z(`arrow`,`color: var(--n-arrow-color-active);`),z(`icon`,`color: var(--n-item-icon-color-active);`),j(`menu-item-content-header`,`
 color: var(--n-item-text-color-active);
 `,[n(`a`,`color: var(--n-item-text-color-active);`),z(`extra`,`color: var(--n-item-text-color-active);`)])]),U(`child-active`,[j(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active);
 `,[n(`a`,`
 color: var(--n-item-text-color-child-active);
 `),z(`extra`,`
 color: var(--n-item-text-color-child-active);
 `)]),z(`arrow`,`
 color: var(--n-arrow-color-child-active);
 `),z(`icon`,`
 color: var(--n-item-icon-color-child-active);
 `)]),F(`disabled`,[F(`selected, child-active`,[n(`&:focus-within`,vt)]),U(`selected`,[$(null,[z(`arrow`,`color: var(--n-arrow-color-active-hover);`),z(`icon`,`color: var(--n-item-icon-color-active-hover);`),j(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover);
 `,[n(`a`,`color: var(--n-item-text-color-active-hover);`),z(`extra`,`color: var(--n-item-text-color-active-hover);`)])])]),U(`child-active`,[$(null,[z(`arrow`,`color: var(--n-arrow-color-child-active-hover);`),z(`icon`,`color: var(--n-item-icon-color-child-active-hover);`),j(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover);
 `,[n(`a`,`color: var(--n-item-text-color-child-active-hover);`),z(`extra`,`color: var(--n-item-text-color-child-active-hover);`)])])]),U(`selected`,[$(null,[n(`&::before`,`background-color: var(--n-item-color-active-hover);`)])]),$(null,vt)]),z(`icon`,`
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
 `),z(`arrow`,`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),j(`menu-item-content-header`,`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[n(`a`,`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[n(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),z(`extra`,`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),j(`submenu`,`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[j(`menu-item-content`,`
 height: var(--n-item-height);
 `),j(`submenu-children`,`
 overflow: hidden;
 padding: 0;
 `,[Fe({duration:`.2s`})])]),j(`menu-item-group`,[j(`menu-item-group-title`,`
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
 `)])]),j(`menu-tooltip`,[n(`a`,`
 color: inherit;
 text-decoration: none;
 `)]),j(`menu-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function $(e,t){return[U(`hover`,e,t),n(`&:hover`,e,t)]}var xt=L({name:`MenuDivider`,setup(){let{mergedClsPrefixRef:e,isHorizontalRef:t}=p(Q);return()=>t.value?null:(S(),x(`div`,{key:1,class:W(`${e.value}-menu-divider`)},null,2))}}),St=L({name:`ChevronDownFilled`,render(){return(()=>{let e=re(`f3af82a2aab086a5`);return e[0]||=y(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[y(`path`,{d:`M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z`,fill:`currentColor`})],-1)})()}}),Ct=[`onClick`],wt=L({name:`MenuOptionContent`,props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){let{props:t}=p(Q);return{menuProps:t,style:J(()=>{let{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:J(()=>{let{maxIconSize:t,activeIconSize:n,iconMarginRight:r}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${n}px`,marginRight:`${r}px`}})}},render(){let{clsPrefix:e,tmNode:t,menuProps:{renderIcon:n,renderLabel:r,renderExtra:i,expandIcon:o}}=this,s=n?n(t.rawNode):Z(this.icon);return(()=>{let n=re(`7bb10afc6caf8fa4`);return S(),x(`div`,{onClick:e=>{this.onClick?.(e)},role:`none`,class:W([`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}]),style:k(this.style)},[H(()=>s&&(S(),x(`div`,{class:W(`${e}-menu-item-content__icon`),style:k(this.iconStyle),role:`none`},[H(()=>[s])],6))),y(`div`,{class:W(`${e}-menu-item-content-header`),role:`none`},[this.isEllipsisPlaceholder?(S(),x(O,{key:0},[H(()=>this.title)],64)):(S(),x(O,{key:1},[r?(S(),x(O,{key:0},[H(()=>r(t.rawNode))],64)):(S(),x(O,{key:1},[H(()=>Z(this.title))],64))],64)),this.extra||i?(S(),x(`span`,{key:2,class:W(`${e}-menu-item-content-header__extra`)},[n[0]||=H(` `,-1),i?(S(),x(O,{key:0},[H(()=>i(t.rawNode))],64)):(S(),x(O,{key:1},[H(()=>Z(this.extra))],64))],2)):H(()=>null)],2),this.showArrow?(S(),a(ae,{key:0,ariaHidden:!0,class:W(`${e}-menu-item-content__arrow`),clsPrefix:e},{default:()=>o?o(t.rawNode):(S(),a(St,{key:1}))},1032,[`class`,`clsPrefix`])):H(()=>null)],14,Ct)})()}}),Tt=8;function Et(e){let t=p(Q),{props:n,mergedCollapsedRef:r}=t,i=p(gt,null),a=p(_t,null),o=J(()=>n.mode===`horizontal`),s=J(()=>o.value?n.dropdownPlacement:`tmNodes`in e?`right-start`:`right`),c=J(()=>Math.max(n.collapsedIconSize??n.iconSize,n.iconSize));return{dropdownPlacement:s,activeIconSize:J(()=>!o.value&&e.root&&r.value?n.collapsedIconSize??n.iconSize:n.iconSize),maxIconSize:c,paddingLeft:J(()=>{if(o.value)return;let{collapsedWidth:t,indent:s,rootIndent:l}=n,{root:u,isGroup:d}=e,f=l===void 0?s:l;return u?r.value?t/2-c.value/2:f:a&&typeof a.paddingLeftRef.value==`number`?r.value?t/2-c.value/2:s/2+a.paddingLeftRef.value:i&&typeof i.paddingLeftRef.value==`number`?(d?s/2:s)+i.paddingLeftRef.value:0}),iconMarginRight:J(()=>{let{collapsedWidth:t,indent:i,rootIndent:a}=n,{value:s}=c,{root:l}=e;return o.value||!l||!r.value?Tt:(a===void 0?i:a)+s+Tt-(t+s)/2}),NMenu:t,NSubmenu:i,NMenuOptionGroup:a}}var Dt={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},Ot={...Dt,tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function},kt=fe(Ot),At=L({name:`MenuOption`,props:Ot,setup(e){let t=Et(e),{NSubmenu:n,NMenu:r,NMenuOptionGroup:i}=t,{props:a,mergedClsPrefixRef:o,mergedCollapsedRef:s}=r,c=n?n.mergedDisabledRef:i?i.mergedDisabledRef:{value:!1},l=J(()=>c.value||e.disabled);function u(t){let{onClick:n}=e;n&&n(t)}function d(t){l.value||(r.doSelect(e.internalKey,e.tmNode.rawNode),u(t))}return{mergedClsPrefix:o,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:r.mergedThemeRef,menuProps:a,dropdownEnabled:w(()=>e.root&&s.value&&a.mode!==`horizontal`&&!l.value),selected:w(()=>r.mergedValueRef.value===e.internalKey),mergedDisabled:l,handleClick:d}},render(){let{mergedClsPrefix:e,mergedTheme:t,tmNode:n,menuProps:{renderLabel:r,nodeProps:i}}=this,o=i?.(n.rawNode);return S(),x(`div`,c(o,{role:`menuitem`,class:[`${e}-menu-item`,o?.class]}),[(S(),a(we,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:`hover`,placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:[`menu-tooltip`]},{default:()=>r?r(n.rawNode):Z(this.title),trigger:()=>(S(),a(wt,{tmNode:n,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick},null,8,[`tmNode`,`clsPrefix`,`paddingLeft`,`iconMarginRight`,`maxIconSize`,`activeIconSize`,`selected`,`title`,`extra`,`disabled`,`icon`,`onClick`]))},1032,[`theme`,`themeOverrides`,`placement`,`disabled`]))],16)}}),jt={...Dt,tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}},Mt=fe(jt),Nt=L({name:`MenuOptionGroup`,props:jt,setup(e){let t=Et(e),{NSubmenu:n}=t,r=J(()=>n?.mergedDisabledRef.value?!0:e.tmNode.disabled);T(_t,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:r});let{mergedClsPrefixRef:i,props:a}=p(Q);return function(){let{value:n}=i,r=t.paddingLeft.value,{nodeProps:o}=a,s=o?.(e.tmNode.rawNode);return(()=>{let t=re(`45eca6a63be5028b`);return S(),x(`div`,{class:W(`${n}-menu-item-group`),role:`group`},[y(`div`,c(s,{class:[`${n}-menu-item-group-title`,s?.class],style:[s?.style||``,r===void 0?``:`padding-left: ${r}px;`]}),[H(()=>Z(e.title)),e.extra?(S(),x(O,{key:0},[t[0]||=H(` `,-1),H(()=>Z(e.extra))],64)):H(()=>null)],16),y(`div`,null,[H(()=>e.tmNodes.map(e=>Vt(e,a)))])],2)})()}}}),Pt=[`aria-expanded`,`id`],Ft=[`aria-expanded`,`id`],It={...Dt,rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean},Lt=fe(It),Rt=L({name:`Submenu`,props:It,setup(e){let t=Et(e),{NMenu:n,NSubmenu:r}=t,{props:i,mergedCollapsedRef:a,mergedThemeRef:o}=n,s=J(()=>{let{disabled:t}=e;return r?.mergedDisabledRef.value||i.disabled?!0:t}),c=R(!1);T(gt,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:s}),T(_t,null);function l(){let{onClick:t}=e;t&&t()}function u(){s.value||(a.value||n.toggleExpand(e.internalKey),l())}function d(e){c.value=e}return{menuProps:i,mergedTheme:o,doSelect:n.doSelect,inverted:n.invertedRef,isHorizontal:n.isHorizontalRef,mergedClsPrefix:n.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:c,paddingLeft:t.paddingLeft,mergedDisabled:s,mergedValue:n.mergedValueRef,childActive:w(()=>e.virtualChildActive??n.activePathRef.value.includes(e.internalKey)),collapsed:J(()=>i.mode===`horizontal`?!1:a.value?!0:!n.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:J(()=>!s.value&&(i.mode===`horizontal`||a.value)),handlePopoverShowChange:d,handleClick:u}},render(){let{mergedClsPrefix:e,menuProps:{renderIcon:t,renderLabel:n}}=this,r=()=>{let{isHorizontal:e,paddingLeft:t,collapsed:n,mergedDisabled:r,maxIconSize:i,activeIconSize:o,title:s,childActive:l,icon:u,handleClick:d,menuProps:{nodeProps:f},dropdownShow:p,iconMarginRight:m,tmNode:h,mergedClsPrefix:g,isEllipsisPlaceholder:_,extra:v}=this,y=f?.(h.rawNode);return S(),x(`div`,c(y,{class:[`${g}-menu-item`,y?.class],role:`menuitem`}),[(S(),a(wt,{tmNode:h,paddingLeft:t,collapsed:n,disabled:r,iconMarginRight:m,maxIconSize:i,activeIconSize:o,title:s,extra:v,showArrow:!e,childActive:l,clsPrefix:g,icon:u,hover:p,onClick:d,isEllipsisPlaceholder:_},null,8,[`tmNode`,`paddingLeft`,`collapsed`,`disabled`,`iconMarginRight`,`maxIconSize`,`activeIconSize`,`title`,`extra`,`showArrow`,`childActive`,`clsPrefix`,`icon`,`hover`,`onClick`,`isEllipsisPlaceholder`]))],16)},i=()=>(S(),a(b,null,{default:()=>{let{tmNodes:t,collapsed:n}=this;return n?null:(S(),x(`div`,{key:1,class:W(`${e}-submenu-children`),role:`menu`},[H(()=>t.map(e=>Vt(e,this.menuProps)))],2))}},1024));return this.root?(S(),a(be,c({key:2,size:`large`,trigger:`hover`},this.menuProps?.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:`14px`,optionIconSizeLarge:`18px`},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:n}),{default:()=>(S(),x(`div`,{class:W(`${e}-submenu`),role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},[H(()=>r()),this.isHorizontal?H(()=>null):(S(),x(O,{key:1},[H(()=>i())],64))],10,Pt))},1040,[`themeOverrides`,`theme`,`value`,`disabled`,`placement`,`keyField`,`labelField`,`childrenField`,`onUpdateShow`,`options`,`onSelect`,`inverted`,`renderIcon`,`renderLabel`])):(S(),x(`div`,{key:3,class:W(`${e}-submenu`),role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},[H(()=>r()),H(()=>i())],10,Ft))}});function zt(e){return e.type===`divider`||e.type===`render`}function Bt(e){return e.type===`divider`}function Vt(e,t){let{rawNode:n}=e,{show:r}=n;if(r===!1)return null;if(zt(n))return Bt(n)?(S(),a(xt,c({key:e.key},n.props),null,16)):null;let{labelField:i}=t,{key:o,level:s,isGroup:l}=e,u={...n,title:n.title||n[i],extra:n.titleExtra||n.extra,key:o,internalKey:o,level:s,root:s===0,isGroup:l};return e.children?e.isGroup?I(Nt,ke(u,Mt,{tmNode:e,tmNodes:e.children,key:o})):I(Rt,ke(u,Lt,{key:o,rawNodes:n[t.childrenField],tmNodes:e.children,tmNode:e})):I(At,ke(u,kt,{key:o,tmNode:e}))}var Ht={...D.props,options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},disabledField:{type:String,default:`disabled`},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:`vertical`},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:`bottom`},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array},Ut=L({name:`Menu`,inheritAttrs:!1,props:Ht,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=K(e),r=D(`Menu`,`-menu`,bt,Pe,e,t),i=p(Ze,null),o=J(()=>{let{collapsed:t}=e;if(t!==void 0)return t;if(i){let{collapseModeRef:e,collapsedRef:t}=i;if(e.value===`width`)return t.value??!1}return!1}),s=J(()=>{let{keyField:t,childrenField:n,disabledField:r}=e;return de(e.items||e.options,{getIgnored(e){return zt(e)},getChildren(e){return e[n]},getDisabled(e){return e[r]},getKey(e){return e[t]??e.name}})}),c=J(()=>new Set(s.value.treeNodes.map(e=>e.key))),{watchProps:l}=e,d=R(null);l?.includes(`defaultValue`)?_(()=>{d.value=e.defaultValue}):d.value=e.defaultValue;let f=V(e,`value`),m=me(f,d),h=R([]),g=()=>{h.value=e.defaultExpandAll?s.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||s.value.getPath(m.value,{includeSelf:!1}).keyPath};l?.includes(`defaultExpandedKeys`)?_(g):g();let v=he(e,[`expandedNames`,`expandedKeys`]),y=me(v,h),b=J(()=>s.value.treeNodes),x=J(()=>s.value.getPath(m.value).keyPath);T(Q,{props:e,mergedCollapsedRef:o,mergedThemeRef:r,mergedValueRef:m,mergedExpandedKeysRef:y,activePathRef:x,mergedClsPrefixRef:t,isHorizontalRef:J(()=>e.mode===`horizontal`),invertedRef:V(e,`inverted`),doSelect:C,toggleExpand:ee});function C(t,n){let{"onUpdate:value":r,onUpdateValue:i,onSelect:a}=e;i&&u(i,t,n),r&&u(r,t,n),a&&u(a,t,n),d.value=t}function w(t){let{"onUpdate:expandedKeys":n,onUpdateExpandedKeys:r,onExpandedNamesChange:i,onOpenNamesChange:a}=e;n&&u(n,t),r&&u(r,t),i&&u(i,t),a&&u(a,t),h.value=t}function ee(t){let n=Array.from(y.value),r=n.findIndex(e=>e===t);if(~r)n.splice(r,1);else{if(e.accordion&&c.value.has(t)){let e=n.findIndex(e=>c.value.has(e));e>-1&&n.splice(e,1)}n.push(t)}w(n)}let te=t=>{let n=s.value.getPath(t??m.value,{includeSelf:!1}).keyPath;if(!n.length)return;let r=Array.from(y.value),i=new Set([...r,...n]);e.accordion&&c.value.forEach(e=>{i.has(e)&&!n.includes(e)&&i.delete(e)}),w(Array.from(i))},O=J(()=>{let{inverted:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{borderRadius:a,borderColorHorizontal:o,fontSize:s,itemHeight:c,dividerColor:l}=i,u={"--n-divider-color":l,"--n-bezier":n,"--n-font-size":s,"--n-border-color-horizontal":o,"--n-border-radius":a,"--n-item-height":c};return t?(u[`--n-group-text-color`]=i.groupTextColorInverted,u[`--n-color`]=i.colorInverted,u[`--n-item-text-color`]=i.itemTextColorInverted,u[`--n-item-text-color-hover`]=i.itemTextColorHoverInverted,u[`--n-item-text-color-active`]=i.itemTextColorActiveInverted,u[`--n-item-text-color-child-active`]=i.itemTextColorChildActiveInverted,u[`--n-item-text-color-child-active-hover`]=i.itemTextColorChildActiveInverted,u[`--n-item-text-color-active-hover`]=i.itemTextColorActiveHoverInverted,u[`--n-item-icon-color`]=i.itemIconColorInverted,u[`--n-item-icon-color-hover`]=i.itemIconColorHoverInverted,u[`--n-item-icon-color-active`]=i.itemIconColorActiveInverted,u[`--n-item-icon-color-active-hover`]=i.itemIconColorActiveHoverInverted,u[`--n-item-icon-color-child-active`]=i.itemIconColorChildActiveInverted,u[`--n-item-icon-color-child-active-hover`]=i.itemIconColorChildActiveHoverInverted,u[`--n-item-icon-color-collapsed`]=i.itemIconColorCollapsedInverted,u[`--n-item-text-color-horizontal`]=i.itemTextColorHorizontalInverted,u[`--n-item-text-color-hover-horizontal`]=i.itemTextColorHoverHorizontalInverted,u[`--n-item-text-color-active-horizontal`]=i.itemTextColorActiveHorizontalInverted,u[`--n-item-text-color-child-active-horizontal`]=i.itemTextColorChildActiveHorizontalInverted,u[`--n-item-text-color-child-active-hover-horizontal`]=i.itemTextColorChildActiveHoverHorizontalInverted,u[`--n-item-text-color-active-hover-horizontal`]=i.itemTextColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-horizontal`]=i.itemIconColorHorizontalInverted,u[`--n-item-icon-color-hover-horizontal`]=i.itemIconColorHoverHorizontalInverted,u[`--n-item-icon-color-active-horizontal`]=i.itemIconColorActiveHorizontalInverted,u[`--n-item-icon-color-active-hover-horizontal`]=i.itemIconColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-child-active-horizontal`]=i.itemIconColorChildActiveHorizontalInverted,u[`--n-item-icon-color-child-active-hover-horizontal`]=i.itemIconColorChildActiveHoverHorizontalInverted,u[`--n-arrow-color`]=i.arrowColorInverted,u[`--n-arrow-color-hover`]=i.arrowColorHoverInverted,u[`--n-arrow-color-active`]=i.arrowColorActiveInverted,u[`--n-arrow-color-active-hover`]=i.arrowColorActiveHoverInverted,u[`--n-arrow-color-child-active`]=i.arrowColorChildActiveInverted,u[`--n-arrow-color-child-active-hover`]=i.arrowColorChildActiveHoverInverted,u[`--n-item-color-hover`]=i.itemColorHoverInverted,u[`--n-item-color-active`]=i.itemColorActiveInverted,u[`--n-item-color-active-hover`]=i.itemColorActiveHoverInverted,u[`--n-item-color-active-collapsed`]=i.itemColorActiveCollapsedInverted):(u[`--n-group-text-color`]=i.groupTextColor,u[`--n-color`]=i.color,u[`--n-item-text-color`]=i.itemTextColor,u[`--n-item-text-color-hover`]=i.itemTextColorHover,u[`--n-item-text-color-active`]=i.itemTextColorActive,u[`--n-item-text-color-child-active`]=i.itemTextColorChildActive,u[`--n-item-text-color-child-active-hover`]=i.itemTextColorChildActiveHover,u[`--n-item-text-color-active-hover`]=i.itemTextColorActiveHover,u[`--n-item-icon-color`]=i.itemIconColor,u[`--n-item-icon-color-hover`]=i.itemIconColorHover,u[`--n-item-icon-color-active`]=i.itemIconColorActive,u[`--n-item-icon-color-active-hover`]=i.itemIconColorActiveHover,u[`--n-item-icon-color-child-active`]=i.itemIconColorChildActive,u[`--n-item-icon-color-child-active-hover`]=i.itemIconColorChildActiveHover,u[`--n-item-icon-color-collapsed`]=i.itemIconColorCollapsed,u[`--n-item-text-color-horizontal`]=i.itemTextColorHorizontal,u[`--n-item-text-color-hover-horizontal`]=i.itemTextColorHoverHorizontal,u[`--n-item-text-color-active-horizontal`]=i.itemTextColorActiveHorizontal,u[`--n-item-text-color-child-active-horizontal`]=i.itemTextColorChildActiveHorizontal,u[`--n-item-text-color-child-active-hover-horizontal`]=i.itemTextColorChildActiveHoverHorizontal,u[`--n-item-text-color-active-hover-horizontal`]=i.itemTextColorActiveHoverHorizontal,u[`--n-item-icon-color-horizontal`]=i.itemIconColorHorizontal,u[`--n-item-icon-color-hover-horizontal`]=i.itemIconColorHoverHorizontal,u[`--n-item-icon-color-active-horizontal`]=i.itemIconColorActiveHorizontal,u[`--n-item-icon-color-active-hover-horizontal`]=i.itemIconColorActiveHoverHorizontal,u[`--n-item-icon-color-child-active-horizontal`]=i.itemIconColorChildActiveHorizontal,u[`--n-item-icon-color-child-active-hover-horizontal`]=i.itemIconColorChildActiveHoverHorizontal,u[`--n-arrow-color`]=i.arrowColor,u[`--n-arrow-color-hover`]=i.arrowColorHover,u[`--n-arrow-color-active`]=i.arrowColorActive,u[`--n-arrow-color-active-hover`]=i.arrowColorActiveHover,u[`--n-arrow-color-child-active`]=i.arrowColorChildActive,u[`--n-arrow-color-child-active-hover`]=i.arrowColorChildActiveHover,u[`--n-item-color-hover`]=i.itemColorHover,u[`--n-item-color-active`]=i.itemColorActive,u[`--n-item-color-active-hover`]=i.itemColorActiveHover,u[`--n-item-color-active-collapsed`]=i.itemColorActiveCollapsed),u}),k=n?E(`menu`,J(()=>e.inverted?`a`:`b`),O,e):void 0,A=pe(),j=R(null),M=R(null),N=!0,P=()=>{N?N=!1:j.value?.sync({showAllItemsBeforeCalculate:!0})};function ne(){return document.getElementById(A)}let F=R(-1);function I(t){F.value=e.options.length-t}function L(e){e||(F.value=-1)}let re=J(()=>{let t=F.value;return{children:t===-1?[]:e.options.slice(t)}}),z=J(()=>{let{childrenField:t,disabledField:n,keyField:r}=e;return de([re.value],{getIgnored(e){return zt(e)},getChildren(e){return e[t]},getDisabled(e){return e[n]},getKey(e){return e[r]??e.name}})}),ie=J(()=>de([{}]).treeNodes[0]);function B(){if(F.value===-1)return S(),a(Rt,{root:!0,level:0,key:`__ellpisisGroupPlaceholder__`,internalKey:`__ellpisisGroupPlaceholder__`,title:`···`,tmNode:ie.value,domId:A,isEllipsisPlaceholder:!0},null,8,[`tmNode`,`domId`]);let e=z.value.treeNodes[0],t=x.value,n=!!e.children?.some(e=>t.includes(e.key));return S(),a(Rt,{level:0,root:!0,key:`__ellpisisGroup__`,internalKey:`__ellpisisGroup__`,title:`···`,virtualChildActive:n,tmNode:e,domId:A,rawNodes:e.rawNode.children||[],tmNodes:e.children||[],isEllipsisPlaceholder:!0},null,8,[`virtualChildActive`,`tmNode`,`domId`,`rawNodes`,`tmNodes`])}return{mergedClsPrefix:t,controlledExpandedKeys:v,uncontrolledExpanededKeys:h,mergedExpandedKeys:y,uncontrolledValue:d,mergedValue:m,activePath:x,tmNodes:b,mergedTheme:r,mergedCollapsed:o,cssVars:n?void 0:O,themeClass:k?.themeClass,overflowRef:j,counterRef:M,updateCounter:()=>{},onResize:P,onUpdateOverflow:L,onUpdateCount:I,renderCounter:B,getCounter:ne,onRender:k?.onRender,showOption:te,deriveResponsiveState:P}},render(){let{mergedClsPrefix:e,mode:t,themeClass:n,onRender:i}=this;i?.();let o=()=>this.tmNodes.map(e=>Vt(e,this.$props)),s=t===`horizontal`&&this.responsive,l=()=>I(`div`,c(this.$attrs,{role:t===`horizontal`?`menubar`:`menu`,class:[`${e}-menu`,n,`${e}-menu--${t}`,s&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),s?(S(),a(xe,{key:2,ref:`overflowRef`,onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:o,counter:this.renderCounter},1032,[`onUpdateOverflow`,`getCounter`,`onUpdateCount`,`updateCounter`])):o());return s?(S(),a(r,{key:3,onResize:this.onResize},{default:l},1032,[`onResize`])):l()}}),Wt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Gt=L({name:`CubeOutline`,render:function(e,t){return S(),x(`svg`,Wt,t[0]||=[y(`path`,{d:`M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),y(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M69 153.99l187 110l187-110`},null,-1),y(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 463.99v-200`},null,-1)])}}),Kt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},qt=L({name:`DocumentTextOutline`,render:function(e,t){return S(),x(`svg`,Kt,t[0]||=[y(`path`,{d:`M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),y(`path`,{d:`M256 56v120a32 32 0 0 0 32 32h120`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),y(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h160`},null,-1),y(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 368h160`},null,-1)])}}),Jt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Yt=L({name:`GridOutline`,render:function(e,t){return S(),x(`svg`,Jt,t[0]||=[y(`rect`,{x:`48`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),y(`rect`,{x:`288`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),y(`rect`,{x:`48`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),y(`rect`,{x:`288`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Xt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Zt=L({name:`LogOutOutline`,render:function(e,t){return S(),x(`svg`,Xt,t[0]||=[y(`path`,{d:`M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),y(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M368 336l80-80l-80-80`},null,-1),y(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 256h256`},null,-1)])}}),Qt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},$t=L({name:`MenuOutline`,render:function(e,t){return S(),x(`svg`,Qt,t[0]||=[y(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 160h352`},null,-1),y(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 256h352`},null,-1),y(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 352h352`},null,-1)])}}),en={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},tn=L({name:`PulseOutline`,render:function(e,t){return S(),x(`svg`,en,t[0]||=[y(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M48 320h64l64-256l64 384l64-224l32 96h64`},null,-1),y(`circle`,{cx:`432`,cy:`320`,r:`32`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),nn={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},rn=L({name:`SettingsOutline`,render:function(e,t){return S(),x(`svg`,nn,t[0]||=[y(`path`,{d:`M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),an={key:0,class:`brand-copy`},on={class:`mobile-drawer-account`},sn={class:`account-copy`},cn={key:0,class:`section-header-scope`},ln={key:1,class:`app-header-leading`},un={class:`app-title`},dn={class:`account`},fn={class:`account-copy`},pn=[`aria-label`],mn={class:`update-banner-body`},hn=L({__name:`AppLayout`,setup(e){let n=Me(),r=Ae(),i=Ne(),o=ge(),c=Te(),u=R(!1),d=R(null),p=R(window.innerWidth),m=J(()=>Math.min(320,Math.round(p.value*.86))),g=R(window.innerWidth<1100);function _(e,t,n,r=t){return{label:()=>I(je,{to:{name:t},custom:!0},{default:({href:t,isExactActive:n,navigate:r})=>I(`a`,{href:t,"aria-current":n?`page`:void 0,onClick:r},e)}),key:r,icon:()=>I(X,null,{default:()=>I(n)})}}let v=[_(`运行概览`,`dashboard`,Yt),_(`连接活动`,`connections`,Ie),_(`配置中心`,`orchestration`,qt,`configuration`),_(`资源管理`,`versions`,Gt,`resources`),_(`排障中心`,`diagnostics`,tn,`troubleshooting`),_(`面板设置`,`settings`,rn)],b={configuration:{label:`配置中心`,icon:qt,tabs:[{name:`orchestration`,label:`代理配置`},{name:`config`,label:`配置文件`},{name:`backups`,label:`配置备份`},{name:`schema`,label:`配置参考`}]},resources:{label:`资源管理`,icon:Gt,tabs:[{name:`versions`,label:`dae 版本`},{name:`geo`,label:`Geo 数据`}]},troubleshooting:{label:`排障中心`,icon:tn,tabs:[{name:`diagnostics`,label:`故障诊断`},{name:`logs`,label:`运行日志`}]}},w=J(()=>b[n.meta.section]),T=J(()=>String(n.meta.section||n.name||`dashboard`)),E=J(()=>String(n.meta.title||`kdae-panel`));async function D(){try{await i.logout(),await r.replace({name:`login`})}catch(e){o.error(e instanceof Error?e.message:`退出登录失败`)}}function ee(){i.clearSession(),r.replace({name:`login`}),o.warning(`登录会话已过期，请重新登录`)}function k(){p.value=window.innerWidth,!c.value&&window.innerWidth<1100&&(g.value=!0)}function A(){d.value?.querySelector(`.n-menu-item-content--selected a`)?.focus({preventScroll:!0})}te(c,()=>{u.value=!1});let j=R(null),M=R(!1);async function F(){try{j.value=await ne(`/api/v1/panel/update`)}catch{j.value=null}}function L(e){let t=e.detail;j.value&&t&&(j.value.status=t)}return C(()=>{window.addEventListener(`kdae-panel:auth-expired`,ee),window.addEventListener(`kdae-panel:self-update-changed`,L),window.addEventListener(`resize`,k),F()}),ue(()=>{window.removeEventListener(`kdae-panel:auth-expired`,ee),window.removeEventListener(`kdae-panel:self-update-changed`,L),window.removeEventListener(`resize`,k)}),(e,r)=>{let o=oe(`RouterView`);return S(),a(P(rt),{"has-sider":!P(c),class:`app-shell`},{default:t(()=>[P(c)?q(``,!0):(S(),a(P(ht),{key:0,class:`app-sidebar`,bordered:``,"collapse-mode":`width`,"collapsed-width":64,width:236,collapsed:g.value,"show-trigger":`bar`,onCollapse:r[0]||=e=>g.value=!0,onExpand:r[1]||=e=>g.value=!1},{default:t(()=>[y(`div`,{class:N([`brand`,{compact:g.value}])},[r[8]||=y(`div`,{class:`brand-mark`},`K`,-1),g.value?q(``,!0):(S(),x(`div`,an,[...r[7]||=[y(`strong`,null,`kdae-panel`,-1),y(`span`,null,`零侵入管理面板`,-1)]]))],2),h(P(Ut),{value:T.value,collapsed:g.value,"collapsed-width":64,"collapsed-icon-size":22,options:v},null,8,[`value`,`collapsed`])]),_:1},8,[`collapsed`])),h(P(Ee),{show:u.value,"onUpdate:show":r[3]||=e=>u.value=e,placement:`left`,width:m.value,"auto-focus":!1,onAfterEnter:A},{default:t(()=>[h(P(De),{class:`mobile-nav-drawer`,"native-scrollbar":!1,"body-content-style":`padding: 0;`},{footer:t(()=>[y(`div`,on,[h(P(Je),{round:``,size:`small`},{default:t(()=>[s(G(P(i).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),y(`div`,sn,[y(`strong`,null,G(P(i).user?.username),1),r[9]||=y(`span`,null,`管理员`,-1)]),h(P(B),{quaternary:``,circle:``,title:`退出登录`,"aria-label":`退出登录`,onClick:D},{icon:t(()=>[h(P(X),null,{default:t(()=>[h(P(Zt))]),_:1})]),_:1})])]),default:t(()=>[r[10]||=y(`div`,{class:`brand mobile-drawer-brand`},[y(`div`,{class:`brand-mark`},`K`),y(`div`,{class:`brand-copy`},[y(`strong`,null,`kdae-panel`),y(`span`,null,`零侵入管理面板`)])],-1),y(`div`,{ref_key:`mobileNavRef`,ref:d},[h(P(Ut),{value:T.value,options:v,"onUpdate:value":r[2]||=e=>u.value=!1},null,8,[`value`])],512)]),_:1})]),_:1},8,[`show`,`width`]),h(P(rt),{class:`app-main`},{default:t(()=>[h(P(st),{bordered:``,class:N([`app-header`,{"section-header":w.value}])},{default:t(()=>[w.value?(S(),x(`div`,cn,[P(c)?(S(),a(P(B),{key:0,quaternary:``,circle:``,class:`mobile-nav-trigger`,title:`打开导航`,"aria-label":`打开导航`,onClick:r[4]||=e=>u.value=!0},{icon:t(()=>[h(P(X),null,{default:t(()=>[h(P($t))]),_:1})]),_:1})):q(``,!0),h(P(X),{size:`17`},{default:t(()=>[(S(),a(f(w.value.icon)))]),_:1}),y(`strong`,null,G(w.value.label),1)])):(S(),x(`div`,ln,[P(c)?(S(),a(P(B),{key:0,quaternary:``,circle:``,class:`mobile-nav-trigger`,title:`打开导航`,"aria-label":`打开导航`,onClick:r[5]||=e=>u.value=!0},{icon:t(()=>[h(P(X),null,{default:t(()=>[h(P($t))]),_:1})]),_:1})):q(``,!0),y(`div`,un,[h(P(ve),{depth:`3`,class:`eyebrow`},{default:t(()=>[...r[11]||=[s(`KDAE CONTROL PLANE`,-1)]]),_:1}),y(`h1`,null,G(E.value),1)])])),y(`div`,dn,[h(P(Je),{round:``,size:`small`},{default:t(()=>[s(G(P(i).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),y(`div`,fn,[y(`strong`,null,G(P(i).user?.username),1),r[12]||=y(`span`,null,`管理员`,-1)]),h(P(B),{quaternary:``,circle:``,title:`退出登录`,onClick:D},{icon:t(()=>[h(P(X),null,{default:t(()=>[h(P(Zt))]),_:1})]),_:1})]),w.value?(S(),x(`nav`,{key:2,class:`section-tabs`,"aria-label":`${w.value.label}子页面`},[(S(!0),x(O,null,l(w.value.tabs,e=>(S(),a(P(je),{key:e.name,to:{name:e.name},class:N([`section-tab`,{active:P(n).name===e.name}])},{default:t(()=>[s(G(e.label),1)]),_:2},1032,[`to`,`class`]))),128))],8,pn)):q(``,!0)]),_:1},8,[`class`]),h(P(it),{class:N([`app-content`,{"section-content":w.value}]),"content-style":`padding: var(--page-padding);`},{default:t(()=>[j.value?.check.updateAvailable&&!M.value?(S(),a(P(Ce),{key:0,type:`info`,closable:``,class:`update-banner`,onClose:r[6]||=e=>M.value=!0},{default:t(()=>[y(`div`,mn,[y(`span`,null,[r[13]||=s(` 面板有新版本 `,-1),y(`strong`,null,G(j.value.check.latest),1),s(`（当前 `+G(j.value.check.current)+`）。 `,1),j.value.status?.enabled&&j.value.status.updatable?(S(),x(O,{key:0},[s(`升级会替换面板二进制并重启自身，配置与账号数据都会保留。`)],64)):j.value.status&&!j.value.status.enabled?(S(),x(O,{key:1},[s(`可直接在这里启用一键升级，不需要 SSH。`)],64)):j.value.status?.problem?(S(),x(O,{key:2},[s(`当前无法一键升级：`+G(j.value.status.problem),1)],64)):(S(),x(O,{key:3},[s(`当前部署不支持一键升级，可重新执行一键部署命令。`)],64)),r[14]||=y(`a`,{href:`https://github.com/tuoro/kdae-panel/releases/latest`,target:`_blank`,rel:`noopener`},`查看发布说明`,-1)]),h(Le,{payload:j.value,label:`立即升级`},null,8,[`payload`])])]),_:1})):q(``,!0),h(o)]),_:1},8,[`class`])]),_:1})]),_:1},8,[`has-sider`])}}});export{hn as default};