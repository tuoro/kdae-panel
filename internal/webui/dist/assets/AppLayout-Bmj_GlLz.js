import{$ as e,$n as t,A as n,An as r,B as i,Bn as a,Cn as o,D as s,En as c,Gn as l,H as u,Hn as d,In as f,J as p,Jn as m,Kn as h,Mn as g,O as _,On as v,P as y,Pn as b,Qn as x,R as S,Sn as C,St as w,T,Tn as E,W as D,Wn as O,X as k,Y as A,Yn as ee,Z as j,_r as M,an as N,cn as P,en as F,er as I,ft as L,gr as R,i as te,in as z,kn as B,lt as ne,mr as re,on as ie,p as ae,pt as V,q as oe,rn as H,sn as se,tn as U,tt as ce,ur as W,ut as G,v as le,vn as K,vr as q,vt as ue,wn as J,xt as Y,yr as X}from"./client-BDSaduAi.js";import{r as de,t as fe}from"./create-DbfYzi58.js";import{t as pe}from"./misc-DDs3MKLt.js";import{t as me}from"./use-merged-state-BShkc5xA.js";import{i as he,n as ge,r as _e,t as ve}from"./text-D9E8ig7N.js";import{a as ye,n as be,r as xe,t as Se}from"./useMobileViewport-DCE3Q3yQ.js";import{r as Ce,t as Z}from"./Icon-4EeM7IRj.js";import{t as we}from"./Alert-WmJwrLvM.js";import{n as Te,t as Ee}from"./DrawerContent-C3YxNZfS.js";import{L as Q,P as De,Q as Oe,i as ke,n as Ae,r as je,t as Me,u as Ne,z as Pe}from"./index-LlkbWj36.js";import{t as Fe}from"./SwapHorizontalOutline-CsXFryuS.js";import{t as Ie}from"./PanelUpdateAction-BNdUyHOl.js";var Le=le&&`loading`in document.createElement(`img`);function Re(e={}){let{root:t=null}=e;return{hash:`${e.rootMargin||`0px 0px 0px 0px`}-${Array.isArray(e.threshold)?e.threshold.join(`,`):e.threshold??`0`}`,options:{...e,root:(typeof t==`string`?document.querySelector(t):t)||document.documentElement}}}var ze=new WeakMap,Be=new WeakMap,Ve=new WeakMap,He=(e,t,n)=>{if(!e)return()=>{};let r=Re(t),{root:i}=r.options,a,o=ze.get(i);o?a=o:(a=new Map,ze.set(i,a));let s,c;a.has(r.hash)?(c=a.get(r.hash),c[1].has(e)||(s=c[0],c[1].add(e),s.observe(e))):(s=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let t=Be.get(e.target),n=Ve.get(e.target);t&&t(),n&&(n.value=!0)}})},r.options),s.observe(e),c=[s,new Set([e])],a.set(r.hash,c));let l=!1,u=()=>{l||(Be.delete(e),Ve.delete(e),l=!0,c[1].has(e)&&(c[0].unobserve(e),c[1].delete(e)),c[1].size<=0&&a.delete(r.hash),a.size||ze.delete(i))};return Be.set(e,u),Ve.set(e,n),u},Ue=Y(`n-avatar-group`),We=U(`avatar`,`
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
`,[se(F(`&`,`--n-merged-color: var(--n-color-modal);`)),P(F(`&`,`--n-merged-color: var(--n-color-popover);`)),F(`img`,`
 width: 100%;
 height: 100%;
 `),H(`text`,`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),U(`icon`,`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),H(`text`,`line-height: 1.25`)]),Ge=[`src`],Ke={...A.props,size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String},qe=r({name:`Avatar`,props:Ke,slots:Object,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=ue(e),i=W(!1),o=null,c=W(null),l=W(null),u=()=>{let{value:e}=c;if(e&&(o===null||o!==e.innerHTML)){o=e.innerHTML;let{value:t}=l;if(t){let{offsetWidth:n,offsetHeight:r}=t,{offsetWidth:i,offsetHeight:a}=e,o=.9,s=Math.min(n/i*o,r/a*o,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${s})`}}},f=b(Ue,null),p=C(()=>{let{size:t}=e;if(t)return t;let{size:n}=f||{};return n||`medium`}),m=A(`Avatar`,`-avatar`,We,De,e,n),h=b(Ce,null),g=C(()=>{if(f)return!0;let{round:t,circle:n}=e;return t!==void 0||n!==void 0?t||n:h?h.roundRef.value:!1}),_=C(()=>f?!0:e.bordered||!1),v=C(()=>{let t=p.value,n=g.value,r=_.value,{color:i}=e,{self:{borderRadius:a,fontSize:o,color:s,border:c,colorModal:l,colorPopover:u},common:{cubicBezierEaseInOut:d}}=m.value,f;return f=typeof t==`number`?`${t}px`:m.value.self[ie(`height`,t)],{"--n-font-size":o,"--n-border":r?c:`none`,"--n-border-radius":n?`50%`:a,"--n-color":i||s,"--n-color-modal":i||l,"--n-color-popover":i||u,"--n-bezier":d,"--n-merged-size":`var(--n-avatar-size-override, ${f})`}}),y=r?k(`avatar`,C(()=>{let t=p.value,n=g.value,r=_.value,{color:i}=e,a=``;return t&&(a+=typeof t==`number`?`a${t}`:t[0]),n&&(a+=`b`),r&&(a+=`c`),i&&(a+=s(i)),a}),v,e):void 0,S=W(!e.lazy);d(()=>{if(e.lazy&&e.intersectionObserverOptions){let n,r=t(()=>{n?.(),n=void 0,e.lazy&&(n=He(l.value,e.intersectionObserverOptions,S))});a(()=>{r(),n?.()})}}),x(()=>e.src||e.imgProps?.src,()=>{i.value=!1});let w=W(!e.lazy);return{textRef:c,selfRef:l,mergedRoundRef:g,mergedClsPrefix:n,fitTextTransform:u,cssVars:r?void 0:v,themeClass:y?.themeClass,onRender:y?.onRender,hasLoadError:i,shouldStartLoading:S,loaded:w,mergedOnError:t=>{if(!S.value)return;i.value=!0;let{onError:n,imgProps:{onError:r}={}}=e;n?.(t),r?.(t)},mergedOnLoad:t=>{let{onLoad:n,imgProps:{onLoad:r}={}}=e;n?.(t),r?.(t),w.value=!0}}},render(){let{$slots:e,src:t,mergedClsPrefix:r,lazy:a,onRender:o,loaded:s,hasLoadError:l,imgProps:u={}}=this;o?.();let d,f=!s&&!l&&(this.renderPlaceholder?this.renderPlaceholder():this.$slots.placeholder?.());return d=this.hasLoadError?this.renderFallback?this.renderFallback():S(e.fallback,()=>[(O(),c(`img`,{src:this.fallbackSrc,style:q({objectFit:this.objectFit})},null,12,Ge))]):i(e.default,e=>{if(e)return O(),J(n,{key:1,onResize:this.fitTextTransform},{default:()=>(O(),c(`span`,{ref:`textRef`,class:G(`${r}-avatar__text`)},[V(()=>e)],2))},1032,[`onResize`]);if(t||u.src){let e=this.src||u.src;return g(`img`,{...u,loading:Le&&!this.intersectionObserverOptions&&a?`lazy`:`eager`,src:a&&this.intersectionObserverOptions?this.shouldStartLoading?e:void 0:e,"data-image-src":e,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[u.style||``,{objectFit:this.objectFit},f?{height:`0`,width:`0`,visibility:`hidden`,position:`absolute`}:``]})}}),O(),c(`span`,{ref:`selfRef`,class:G([`${r}-avatar`,this.themeClass]),style:q(this.cssVars)},[V(()=>d),V(()=>a&&f)],6)}});function Je(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:a,actionColor:o,scrollbarColor:s,scrollbarColorHover:c,invertedColor:l}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:o,headerColor:i,headerColorInverted:l,footerColor:o,footerColorInverted:l,headerBorderColor:a,headerBorderColorInverted:l,footerBorderColor:a,footerBorderColorInverted:l,siderBorderColor:a,siderBorderColorInverted:l,siderColor:i,siderColorInverted:l,siderToggleButtonBorder:`1px solid ${a}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:ce(r,s),siderToggleBarColorHover:ce(r,c),__invertScrollbar:`true`}}var Ye=p({name:`Layout`,common:e,peers:{Scrollbar:j},self:Je}),Xe=Y(`n-layout-sider`),Ze={type:String,default:`static`},Qe=U(`layout`,`
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
`,[U(`layout-scroll-container`,`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),z(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),$e={embedded:Boolean,position:Ze,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},et=Y(`n-layout`);function tt(e){return r({name:e?`LayoutContent`:`Layout`,props:{...A.props,...$e},setup(e){let t=W(null),n=W(null),{mergedClsPrefixRef:r,inlineThemeDisabled:i}=ue(e),a=A(`Layout`,`-layout`,Qe,Ye,e,r);function o(r,i){if(e.nativeScrollbar){let{value:e}=t;e&&(i===void 0?e.scrollTo(r):e.scrollTo(r,i))}else{let{value:e}=n;e&&e.scrollTo(r,i)}}l(et,e);let s=0,c=0,u=t=>{let n=t.target;s=n.scrollLeft,c=n.scrollTop,e.onScroll?.(t)};y(()=>{if(e.nativeScrollbar){let e=t.value;e&&(e.scrollTop=c,e.scrollLeft=s)}});let d={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},f={scrollTo:o},p=C(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=a.value;return{"--n-bezier":t,"--n-color":e.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),m=i?k(`layout`,C(()=>e.embedded?`e`:``),p,e):void 0;return{mergedClsPrefix:r,scrollableElRef:t,scrollbarInstRef:n,hasSiderStyle:d,mergedTheme:a,handleNativeElScroll:u,cssVars:i?void 0:p,themeClass:m?.themeClass,onRender:m?.onRender,...f}},render(){let{mergedClsPrefix:t,hasSider:n}=this;this.onRender?.();let r=n?this.hasSiderStyle:void 0,i=[this.themeClass,e&&`${t}-layout-content`,`${t}-layout`,`${t}-layout--${this.position}-positioned`];return O(),c(`div`,{class:G(i),style:q(this.cssVars)},[this.nativeScrollbar?(O(),c(`div`,{key:0,ref:`scrollableElRef`,class:G([`${t}-layout-scroll-container`,this.contentClass]),style:q([this.contentStyle,r]),onScroll:this.handleNativeElScroll},[V(()=>this.$slots.default?.())],46,[`onScroll`])):(O(),J(_,f({key:1},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,r]}),L(this.$slots),1040,[`onScroll`,`theme`,`themeOverrides`,`contentClass`,`contentStyle`]))],6)}})}var nt=tt(!1),rt=tt(!0),it=U(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[z(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),z(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),at={position:Ze,inverted:Boolean,bordered:Boolean},ot=r({name:`LayoutHeader`,props:{...A.props,...at},setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=ue(e),r=A(`Layout`,`-layout-header`,it,Ye,e,t),i=C(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=r.value,i={"--n-bezier":t};return e.inverted?(i[`--n-color`]=n.headerColorInverted,i[`--n-text-color`]=n.textColorInverted,i[`--n-border-color`]=n.headerBorderColorInverted):(i[`--n-color`]=n.headerColor,i[`--n-text-color`]=n.textColor,i[`--n-border-color`]=n.headerBorderColor),i}),a=n?k(`layout-header`,C(()=>e.inverted?`a`:`b`),i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{mergedClsPrefix:e}=this;return this.onRender?.(),O(),c(`div`,{class:G([`${e}-layout-header`,this.themeClass,this.position&&`${e}-layout-header--${this.position}-positioned`,this.bordered&&`${e}-layout-header--bordered`]),style:q(this.cssVars)},[V(()=>this.$slots.default?.())],6)}}),st=U(`layout-sider`,`
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
`,[z(`bordered`,[H(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),H(`left-placement`,[z(`bordered`,[H(`border`,`
 right: 0;
 `)])]),z(`right-placement`,`
 justify-content: flex-start;
 `,[z(`bordered`,[H(`border`,`
 left: 0;
 `)]),z(`collapsed`,[U(`layout-toggle-button`,[U(`base-icon`,`
 transform: rotate(180deg);
 `)]),U(`layout-toggle-bar`,[F(`&:hover`,[H(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),H(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),U(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[U(`base-icon`,`
 transform: rotate(0);
 `)]),U(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[F(`&:hover`,[H(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),H(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),z(`collapsed`,[U(`layout-toggle-bar`,[F(`&:hover`,[H(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),H(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),U(`layout-toggle-button`,[U(`base-icon`,`
 transform: rotate(0);
 `)])]),U(`layout-toggle-button`,`
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
 `,[U(`base-icon`,`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),U(`layout-toggle-bar`,`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[H(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),H(`bottom`,`
 position: absolute;
 top: 34px;
 `),F(`&:hover`,[H(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),H(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),H(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),F(`&:hover`,[H(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),H(`border`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),U(`layout-sider-scroll-container`,`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),z(`show-content`,[U(`layout-sider-scroll-container`,{opacity:1})]),z(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),ct=[`onClick`],lt=r({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return O(),c(`div`,{onClick:this.onClick,class:G(`${e}-layout-toggle-bar`)},[o(`div`,{class:G(`${e}-layout-toggle-bar__top`)},null,2),o(`div`,{class:G(`${e}-layout-toggle-bar__bottom`)},null,2)],10,ct)}}),ut=[`onClick`],dt=r({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return O(),c(`div`,{class:G(`${e}-layout-toggle-button`),onClick:this.onClick},[(O(),J(oe,{clsPrefix:e},{default:()=>(O(),J(ye))},1032,[`clsPrefix`]))],10,ut)}}),ft=[`onTransitionend`],pt={position:Ze,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},mt=r({name:`LayoutSider`,props:{...A.props,...pt},setup(e){let t=b(et),n=W(null),r=W(null),i=W(e.defaultCollapsed),a=me(re(e,`collapsed`),i),o=C(()=>_e(a.value?e.collapsedWidth:e.width)),s=C(()=>e.collapseMode===`transform`?{minWidth:_e(e.width)}:{}),c=C(()=>t?t.siderPlacement:`left`);function d(t,i){if(e.nativeScrollbar){let{value:e}=n;e&&(i===void 0?e.scrollTo(t):e.scrollTo(t,i))}else{let{value:e}=r;e&&e.scrollTo(t,i)}}function f(){let{"onUpdate:collapsed":t,onUpdateCollapsed:n,onExpand:r,onCollapse:o}=e,{value:s}=a;n&&u(n,!s),t&&u(t,!s),i.value=!s,s?r&&u(r):o&&u(o)}let p=0,m=0,h=t=>{let n=t.target;p=n.scrollLeft,m=n.scrollTop,e.onScroll?.(t)};y(()=>{if(e.nativeScrollbar){let e=n.value;e&&(e.scrollTop=m,e.scrollLeft=p)}}),l(Xe,{collapsedRef:a,collapseModeRef:re(e,`collapseMode`)});let{mergedClsPrefixRef:g,inlineThemeDisabled:_}=ue(e),v=A(`Layout`,`-layout-sider`,st,Ye,e,g);function x(t){t.propertyName===`max-width`&&(a.value?e.onAfterLeave?.():e.onAfterEnter?.())}let S={scrollTo:d},w=C(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=v.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":t,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return e.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),T=_?k(`layout-sider`,C(()=>e.inverted?`a`:`b`),w,e):void 0;return{scrollableElRef:n,scrollbarInstRef:r,mergedClsPrefix:g,mergedTheme:v,styleMaxWidth:o,mergedCollapsed:a,scrollContainerStyle:s,siderPlacement:c,handleNativeElScroll:h,handleTransitionend:x,handleTriggerClick:f,inlineThemeDisabled:_,cssVars:w,themeClass:T?.themeClass,onRender:T?.onRender,...S}},render(){let{mergedClsPrefix:e,mergedCollapsed:t,showTrigger:n}=this;return this.onRender?.(),O(),c(`aside`,{class:G([`${e}-layout-sider`,this.themeClass,`${e}-layout-sider--${this.position}-positioned`,`${e}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${e}-layout-sider--bordered`,t&&`${e}-layout-sider--collapsed`,(!t||this.showCollapsedContent)&&`${e}-layout-sider--show-content`]),onTransitionend:this.handleTransitionend,style:q([this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:_e(this.width)}])},[this.nativeScrollbar?(O(),c(`div`,{key:1,class:G([`${e}-layout-sider-scroll-container`,this.contentClass]),onScroll:this.handleNativeElScroll,style:q([this.scrollContainerStyle,{overflow:`auto`},this.contentStyle]),ref:`scrollableElRef`},[V(()=>this.$slots.default?.())],46,[`onScroll`])):(O(),J(_,f({key:0},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),L(this.$slots),1040,[`onScroll`,`style`,`contentStyle`,`contentClass`,`theme`,`themeOverrides`,`builtinThemeOverrides`])),n?(O(),c(K,{key:2},[n===`bar`?(O(),J(lt,{key:0,clsPrefix:e,class:G(t?this.collapsedTriggerClass:this.triggerClass),style:q(t?this.collapsedTriggerStyle:this.triggerStyle),onClick:this.handleTriggerClick},null,8,[`clsPrefix`,`class`,`style`,`onClick`])):(O(),J(dt,{key:1,clsPrefix:e,class:G(t?this.collapsedTriggerClass:this.triggerClass),style:q(t?this.collapsedTriggerStyle:this.triggerStyle),onClick:this.handleTriggerClick},null,8,[`clsPrefix`,`class`,`style`,`onClick`]))],64)):V(()=>null),this.bordered?(O(),c(`div`,{key:4,class:G(`${e}-layout-sider__border`)},null,2)):V(()=>null)],46,ft)}}),ht=Y(`n-menu`),gt=Y(`n-submenu`),_t=Y(`n-menu-item-group`),vt=[F(`&::before`,`background-color: var(--n-item-color-hover);`),H(`arrow`,`
 color: var(--n-arrow-color-hover);
 `),H(`icon`,`
 color: var(--n-item-icon-color-hover);
 `),U(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover);
 `,[F(`a`,`
 color: var(--n-item-text-color-hover);
 `),H(`extra`,`
 color: var(--n-item-text-color-hover);
 `)])],yt=[H(`icon`,`
 color: var(--n-item-icon-color-hover-horizontal);
 `),U(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover-horizontal);
 `,[F(`a`,`
 color: var(--n-item-text-color-hover-horizontal);
 `),H(`extra`,`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],bt=F([U(`menu`,`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[z(`horizontal`,`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[U(`submenu`,`margin: 0;`),U(`menu-item`,`margin: 0;`),U(`menu-item-content`,`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[F(`&::before`,`display: none;`),z(`selected`,`border-bottom: 2px solid var(--n-border-color-horizontal)`)]),U(`menu-item-content`,[z(`selected`,[H(`icon`,`color: var(--n-item-icon-color-active-horizontal);`),U(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-horizontal);
 `,[F(`a`,`color: var(--n-item-text-color-active-horizontal);`),H(`extra`,`color: var(--n-item-text-color-active-horizontal);`)])]),z(`child-active`,`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[U(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[F(`a`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `),H(`extra`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),H(`icon`,`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),N(`disabled`,[N(`selected, child-active`,[F(`&:focus-within`,yt)]),z(`selected`,[$(null,[H(`icon`,`color: var(--n-item-icon-color-active-hover-horizontal);`),U(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[F(`a`,`color: var(--n-item-text-color-active-hover-horizontal);`),H(`extra`,`color: var(--n-item-text-color-active-hover-horizontal);`)])])]),z(`child-active`,[$(null,[H(`icon`,`color: var(--n-item-icon-color-child-active-hover-horizontal);`),U(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[F(`a`,`color: var(--n-item-text-color-child-active-hover-horizontal);`),H(`extra`,`color: var(--n-item-text-color-child-active-hover-horizontal);`)])])]),$(`border-bottom: 2px solid var(--n-border-color-horizontal);`,yt)]),U(`menu-item-content-header`,[F(`a`,`color: var(--n-item-text-color-horizontal);`)])])]),N(`responsive`,[U(`menu-item-content-header`,`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),z(`collapsed`,[U(`menu-item-content`,[z(`selected`,[F(`&::before`,`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),U(`menu-item-content-header`,`opacity: 0;`),H(`arrow`,`opacity: 0;`),H(`icon`,`color: var(--n-item-icon-color-collapsed);`)])]),U(`menu-item`,`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),U(`menu-item-content`,`
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
 `,[F(`> *`,`z-index: 1;`),F(`&::before`,`
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
 `),z(`disabled`,`
 opacity: .45;
 cursor: not-allowed;
 `),z(`collapsed`,[H(`arrow`,`transform: rotate(0);`)]),z(`selected`,[F(`&::before`,`background-color: var(--n-item-color-active);`),H(`arrow`,`color: var(--n-arrow-color-active);`),H(`icon`,`color: var(--n-item-icon-color-active);`),U(`menu-item-content-header`,`
 color: var(--n-item-text-color-active);
 `,[F(`a`,`color: var(--n-item-text-color-active);`),H(`extra`,`color: var(--n-item-text-color-active);`)])]),z(`child-active`,[U(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active);
 `,[F(`a`,`
 color: var(--n-item-text-color-child-active);
 `),H(`extra`,`
 color: var(--n-item-text-color-child-active);
 `)]),H(`arrow`,`
 color: var(--n-arrow-color-child-active);
 `),H(`icon`,`
 color: var(--n-item-icon-color-child-active);
 `)]),N(`disabled`,[N(`selected, child-active`,[F(`&:focus-within`,vt)]),z(`selected`,[$(null,[H(`arrow`,`color: var(--n-arrow-color-active-hover);`),H(`icon`,`color: var(--n-item-icon-color-active-hover);`),U(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover);
 `,[F(`a`,`color: var(--n-item-text-color-active-hover);`),H(`extra`,`color: var(--n-item-text-color-active-hover);`)])])]),z(`child-active`,[$(null,[H(`arrow`,`color: var(--n-arrow-color-child-active-hover);`),H(`icon`,`color: var(--n-item-icon-color-child-active-hover);`),U(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover);
 `,[F(`a`,`color: var(--n-item-text-color-child-active-hover);`),H(`extra`,`color: var(--n-item-text-color-child-active-hover);`)])])]),z(`selected`,[$(null,[F(`&::before`,`background-color: var(--n-item-color-active-hover);`)])]),$(null,vt)]),H(`icon`,`
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
 `),H(`arrow`,`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),U(`menu-item-content-header`,`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[F(`a`,`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[F(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),H(`extra`,`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),U(`submenu`,`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[U(`menu-item-content`,`
 height: var(--n-item-height);
 `),U(`submenu-children`,`
 overflow: hidden;
 padding: 0;
 `,[Pe({duration:`.2s`})])]),U(`menu-item-group`,[U(`menu-item-group-title`,`
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
 `)])]),U(`menu-tooltip`,[F(`a`,`
 color: inherit;
 text-decoration: none;
 `)]),U(`menu-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function $(e,t){return[z(`hover`,e,t),F(`&:hover`,e,t)]}var xt=r({name:`MenuDivider`,setup(){let{mergedClsPrefixRef:e,isHorizontalRef:t}=b(ht);return()=>t.value?null:(O(),c(`div`,{key:1,class:G(`${e.value}-menu-divider`)},null,2))}}),St=r({name:`ChevronDownFilled`,render(){return(()=>{let e=ne(`f3af82a2aab086a5`);return e[0]||=o(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[o(`path`,{d:`M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z`,fill:`currentColor`})],-1)})()}}),Ct=[`onClick`],wt=r({name:`MenuOptionContent`,props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){let{props:t}=b(ht);return{menuProps:t,style:C(()=>{let{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:C(()=>{let{maxIconSize:t,activeIconSize:n,iconMarginRight:r}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${n}px`,marginRight:`${r}px`}})}},render(){let{clsPrefix:e,tmNode:t,menuProps:{renderIcon:n,renderLabel:r,renderExtra:i,expandIcon:a}}=this,s=n?n(t.rawNode):Q(this.icon);return(()=>{let n=ne(`7bb10afc6caf8fa4`);return O(),c(`div`,{onClick:e=>{this.onClick?.(e)},role:`none`,class:G([`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}]),style:q(this.style)},[V(()=>s&&(O(),c(`div`,{class:G(`${e}-menu-item-content__icon`),style:q(this.iconStyle),role:`none`},[V(()=>[s])],6))),o(`div`,{class:G(`${e}-menu-item-content-header`),role:`none`},[this.isEllipsisPlaceholder?(O(),c(K,{key:0},[V(()=>this.title)],64)):(O(),c(K,{key:1},[r?(O(),c(K,{key:0},[V(()=>r(t.rawNode))],64)):(O(),c(K,{key:1},[V(()=>Q(this.title))],64))],64)),this.extra||i?(O(),c(`span`,{key:2,class:G(`${e}-menu-item-content-header__extra`)},[n[0]||=V(` `,-1),i?(O(),c(K,{key:0},[V(()=>i(t.rawNode))],64)):(O(),c(K,{key:1},[V(()=>Q(this.extra))],64))],2)):V(()=>null)],2),this.showArrow?(O(),J(oe,{key:0,ariaHidden:!0,class:G(`${e}-menu-item-content__arrow`),clsPrefix:e},{default:()=>a?a(t.rawNode):(O(),J(St,{key:1}))},1032,[`class`,`clsPrefix`])):V(()=>null)],14,Ct)})()}}),Tt=8;function Et(e){let t=b(ht),{props:n,mergedCollapsedRef:r}=t,i=b(gt,null),a=b(_t,null),o=C(()=>n.mode===`horizontal`),s=C(()=>o.value?n.dropdownPlacement:`tmNodes`in e?`right-start`:`right`),c=C(()=>Math.max(n.collapsedIconSize??n.iconSize,n.iconSize));return{dropdownPlacement:s,activeIconSize:C(()=>!o.value&&e.root&&r.value?n.collapsedIconSize??n.iconSize:n.iconSize),maxIconSize:c,paddingLeft:C(()=>{if(o.value)return;let{collapsedWidth:t,indent:s,rootIndent:l}=n,{root:u,isGroup:d}=e,f=l===void 0?s:l;return u?r.value?t/2-c.value/2:f:a&&typeof a.paddingLeftRef.value==`number`?r.value?t/2-c.value/2:s/2+a.paddingLeftRef.value:i&&typeof i.paddingLeftRef.value==`number`?(d?s/2:s)+i.paddingLeftRef.value:0}),iconMarginRight:C(()=>{let{collapsedWidth:t,indent:i,rootIndent:a}=n,{value:s}=c,{root:l}=e;return o.value||!l||!r.value?Tt:(a===void 0?i:a)+s+Tt-(t+s)/2}),NMenu:t,NSubmenu:i,NMenuOptionGroup:a}}var Dt={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},Ot={...Dt,tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function},kt=w(Ot),At=r({name:`MenuOption`,props:Ot,setup(e){let t=Et(e),{NSubmenu:n,NMenu:r,NMenuOptionGroup:i}=t,{props:a,mergedClsPrefixRef:o,mergedCollapsedRef:s}=r,c=n?n.mergedDisabledRef:i?i.mergedDisabledRef:{value:!1},l=C(()=>c.value||e.disabled);function u(t){let{onClick:n}=e;n&&n(t)}function d(t){l.value||(r.doSelect(e.internalKey,e.tmNode.rawNode),u(t))}return{mergedClsPrefix:o,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:r.mergedThemeRef,menuProps:a,dropdownEnabled:D(()=>e.root&&s.value&&a.mode!==`horizontal`&&!l.value),selected:D(()=>r.mergedValueRef.value===e.internalKey),mergedDisabled:l,handleClick:d}},render(){let{mergedClsPrefix:e,mergedTheme:t,tmNode:n,menuProps:{renderLabel:r,nodeProps:i}}=this,a=i?.(n.rawNode);return O(),c(`div`,f(a,{role:`menuitem`,class:[`${e}-menu-item`,a?.class]}),[(O(),J(xe,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:`hover`,placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:[`menu-tooltip`]},{default:()=>r?r(n.rawNode):Q(this.title),trigger:()=>(O(),J(wt,{tmNode:n,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick},null,8,[`tmNode`,`clsPrefix`,`paddingLeft`,`iconMarginRight`,`maxIconSize`,`activeIconSize`,`selected`,`title`,`extra`,`disabled`,`icon`,`onClick`]))},1032,[`theme`,`themeOverrides`,`placement`,`disabled`]))],16)}}),jt={...Dt,tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}},Mt=w(jt),Nt=r({name:`MenuOptionGroup`,props:jt,setup(e){let t=Et(e),{NSubmenu:n}=t,r=C(()=>n?.mergedDisabledRef.value?!0:e.tmNode.disabled);l(_t,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:r});let{mergedClsPrefixRef:i,props:a}=b(ht);return function(){let{value:n}=i,r=t.paddingLeft.value,{nodeProps:s}=a,l=s?.(e.tmNode.rawNode);return(()=>{let t=ne(`45eca6a63be5028b`);return O(),c(`div`,{class:G(`${n}-menu-item-group`),role:`group`},[o(`div`,f(l,{class:[`${n}-menu-item-group-title`,l?.class],style:[l?.style||``,r===void 0?``:`padding-left: ${r}px;`]}),[V(()=>Q(e.title)),e.extra?(O(),c(K,{key:0},[t[0]||=V(` `,-1),V(()=>Q(e.extra))],64)):V(()=>null)],16),o(`div`,null,[V(()=>e.tmNodes.map(e=>Vt(e,a)))])],2)})()}}}),Pt=[`aria-expanded`,`id`],Ft=[`aria-expanded`,`id`],It={...Dt,rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean},Lt=w(It),Rt=r({name:`Submenu`,props:It,setup(e){let t=Et(e),{NMenu:n,NSubmenu:r}=t,{props:i,mergedCollapsedRef:a,mergedThemeRef:o}=n,s=C(()=>{let{disabled:t}=e;return r?.mergedDisabledRef.value||i.disabled?!0:t}),c=W(!1);l(gt,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:s}),l(_t,null);function u(){let{onClick:t}=e;t&&t()}function d(){s.value||(a.value||n.toggleExpand(e.internalKey),u())}function f(e){c.value=e}return{menuProps:i,mergedTheme:o,doSelect:n.doSelect,inverted:n.invertedRef,isHorizontal:n.isHorizontalRef,mergedClsPrefix:n.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:c,paddingLeft:t.paddingLeft,mergedDisabled:s,mergedValue:n.mergedValueRef,childActive:D(()=>e.virtualChildActive??n.activePathRef.value.includes(e.internalKey)),collapsed:C(()=>i.mode===`horizontal`?!1:a.value?!0:!n.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:C(()=>!s.value&&(i.mode===`horizontal`||a.value)),handlePopoverShowChange:f,handleClick:d}},render(){let{mergedClsPrefix:e,menuProps:{renderIcon:t,renderLabel:n}}=this,r=()=>{let{isHorizontal:e,paddingLeft:t,collapsed:n,mergedDisabled:r,maxIconSize:i,activeIconSize:a,title:o,childActive:s,icon:l,handleClick:u,menuProps:{nodeProps:d},dropdownShow:p,iconMarginRight:m,tmNode:h,mergedClsPrefix:g,isEllipsisPlaceholder:_,extra:v}=this,y=d?.(h.rawNode);return O(),c(`div`,f(y,{class:[`${g}-menu-item`,y?.class],role:`menuitem`}),[(O(),J(wt,{tmNode:h,paddingLeft:t,collapsed:n,disabled:r,iconMarginRight:m,maxIconSize:i,activeIconSize:a,title:o,extra:v,showArrow:!e,childActive:s,clsPrefix:g,icon:l,hover:p,onClick:u,isEllipsisPlaceholder:_},null,8,[`tmNode`,`paddingLeft`,`collapsed`,`disabled`,`iconMarginRight`,`maxIconSize`,`activeIconSize`,`title`,`extra`,`showArrow`,`childActive`,`clsPrefix`,`icon`,`hover`,`onClick`,`isEllipsisPlaceholder`]))],16)},i=()=>(O(),J(T,null,{default:()=>{let{tmNodes:t,collapsed:n}=this;return n?null:(O(),c(`div`,{key:1,class:G(`${e}-submenu-children`),role:`menu`},[V(()=>t.map(e=>Vt(e,this.menuProps)))],2))}},1024));return this.root?(O(),J(be,f({key:2,size:`large`,trigger:`hover`},this.menuProps?.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:`14px`,optionIconSizeLarge:`18px`},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:n}),{default:()=>(O(),c(`div`,{class:G(`${e}-submenu`),role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},[V(()=>r()),this.isHorizontal?V(()=>null):(O(),c(K,{key:1},[V(()=>i())],64))],10,Pt))},1040,[`themeOverrides`,`theme`,`value`,`disabled`,`placement`,`keyField`,`labelField`,`childrenField`,`onUpdateShow`,`options`,`onSelect`,`inverted`,`renderIcon`,`renderLabel`])):(O(),c(`div`,{key:3,class:G(`${e}-submenu`),role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},[V(()=>r()),V(()=>i())],10,Ft))}});function zt(e){return e.type===`divider`||e.type===`render`}function Bt(e){return e.type===`divider`}function Vt(e,t){let{rawNode:n}=e,{show:r}=n;if(r===!1)return null;if(zt(n))return Bt(n)?(O(),J(xt,f({key:e.key},n.props),null,16)):null;let{labelField:i}=t,{key:a,level:o,isGroup:s}=e,c={...n,title:n.title||n[i],extra:n.titleExtra||n.extra,key:a,internalKey:a,level:o,root:o===0,isGroup:s};return e.children?e.isGroup?g(Nt,Oe(c,Mt,{tmNode:e,tmNodes:e.children,key:a})):g(Rt,Oe(c,Lt,{key:a,rawNodes:n[t.childrenField],tmNodes:e.children,tmNode:e})):g(At,Oe(c,kt,{key:a,tmNode:e}))}var Ht={...A.props,options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},disabledField:{type:String,default:`disabled`},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:`vertical`},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:`bottom`},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array},Ut=r({name:`Menu`,inheritAttrs:!1,props:Ht,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=ue(e),i=A(`Menu`,`-menu`,bt,Ne,e,n),a=b(Xe,null),o=C(()=>{let{collapsed:t}=e;if(t!==void 0)return t;if(a){let{collapseModeRef:e,collapsedRef:t}=a;if(e.value===`width`)return t.value??!1}return!1}),s=C(()=>{let{keyField:t,childrenField:n,disabledField:r}=e;return fe(e.items||e.options,{getIgnored(e){return zt(e)},getChildren(e){return e[n]},getDisabled(e){return e[r]},getKey(e){return e[t]??e.name}})}),c=C(()=>new Set(s.value.treeNodes.map(e=>e.key))),{watchProps:d}=e,f=W(null);d?.includes(`defaultValue`)?t(()=>{f.value=e.defaultValue}):f.value=e.defaultValue;let p=re(e,`value`),m=me(p,f),h=W([]),g=()=>{h.value=e.defaultExpandAll?s.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||s.value.getPath(m.value,{includeSelf:!1}).keyPath};d?.includes(`defaultExpandedKeys`)?t(g):g();let _=he(e,[`expandedNames`,`expandedKeys`]),v=me(_,h),y=C(()=>s.value.treeNodes),x=C(()=>s.value.getPath(m.value).keyPath);l(ht,{props:e,mergedCollapsedRef:o,mergedThemeRef:i,mergedValueRef:m,mergedExpandedKeysRef:v,activePathRef:x,mergedClsPrefixRef:n,isHorizontalRef:C(()=>e.mode===`horizontal`),invertedRef:re(e,`inverted`),doSelect:S,toggleExpand:T});function S(t,n){let{"onUpdate:value":r,onUpdateValue:i,onSelect:a}=e;i&&u(i,t,n),r&&u(r,t,n),a&&u(a,t,n),f.value=t}function w(t){let{"onUpdate:expandedKeys":n,onUpdateExpandedKeys:r,onExpandedNamesChange:i,onOpenNamesChange:a}=e;n&&u(n,t),r&&u(r,t),i&&u(i,t),a&&u(a,t),h.value=t}function T(t){let n=Array.from(v.value),r=n.findIndex(e=>e===t);if(~r)n.splice(r,1);else{if(e.accordion&&c.value.has(t)){let e=n.findIndex(e=>c.value.has(e));e>-1&&n.splice(e,1)}n.push(t)}w(n)}let E=t=>{let n=s.value.getPath(t??m.value,{includeSelf:!1}).keyPath;if(!n.length)return;let r=Array.from(v.value),i=new Set([...r,...n]);e.accordion&&c.value.forEach(e=>{i.has(e)&&!n.includes(e)&&i.delete(e)}),w(Array.from(i))},D=C(()=>{let{inverted:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value,{borderRadius:a,borderColorHorizontal:o,fontSize:s,itemHeight:c,dividerColor:l}=r,u={"--n-divider-color":l,"--n-bezier":n,"--n-font-size":s,"--n-border-color-horizontal":o,"--n-border-radius":a,"--n-item-height":c};return t?(u[`--n-group-text-color`]=r.groupTextColorInverted,u[`--n-color`]=r.colorInverted,u[`--n-item-text-color`]=r.itemTextColorInverted,u[`--n-item-text-color-hover`]=r.itemTextColorHoverInverted,u[`--n-item-text-color-active`]=r.itemTextColorActiveInverted,u[`--n-item-text-color-child-active`]=r.itemTextColorChildActiveInverted,u[`--n-item-text-color-child-active-hover`]=r.itemTextColorChildActiveInverted,u[`--n-item-text-color-active-hover`]=r.itemTextColorActiveHoverInverted,u[`--n-item-icon-color`]=r.itemIconColorInverted,u[`--n-item-icon-color-hover`]=r.itemIconColorHoverInverted,u[`--n-item-icon-color-active`]=r.itemIconColorActiveInverted,u[`--n-item-icon-color-active-hover`]=r.itemIconColorActiveHoverInverted,u[`--n-item-icon-color-child-active`]=r.itemIconColorChildActiveInverted,u[`--n-item-icon-color-child-active-hover`]=r.itemIconColorChildActiveHoverInverted,u[`--n-item-icon-color-collapsed`]=r.itemIconColorCollapsedInverted,u[`--n-item-text-color-horizontal`]=r.itemTextColorHorizontalInverted,u[`--n-item-text-color-hover-horizontal`]=r.itemTextColorHoverHorizontalInverted,u[`--n-item-text-color-active-horizontal`]=r.itemTextColorActiveHorizontalInverted,u[`--n-item-text-color-child-active-horizontal`]=r.itemTextColorChildActiveHorizontalInverted,u[`--n-item-text-color-child-active-hover-horizontal`]=r.itemTextColorChildActiveHoverHorizontalInverted,u[`--n-item-text-color-active-hover-horizontal`]=r.itemTextColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-horizontal`]=r.itemIconColorHorizontalInverted,u[`--n-item-icon-color-hover-horizontal`]=r.itemIconColorHoverHorizontalInverted,u[`--n-item-icon-color-active-horizontal`]=r.itemIconColorActiveHorizontalInverted,u[`--n-item-icon-color-active-hover-horizontal`]=r.itemIconColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-child-active-horizontal`]=r.itemIconColorChildActiveHorizontalInverted,u[`--n-item-icon-color-child-active-hover-horizontal`]=r.itemIconColorChildActiveHoverHorizontalInverted,u[`--n-arrow-color`]=r.arrowColorInverted,u[`--n-arrow-color-hover`]=r.arrowColorHoverInverted,u[`--n-arrow-color-active`]=r.arrowColorActiveInverted,u[`--n-arrow-color-active-hover`]=r.arrowColorActiveHoverInverted,u[`--n-arrow-color-child-active`]=r.arrowColorChildActiveInverted,u[`--n-arrow-color-child-active-hover`]=r.arrowColorChildActiveHoverInverted,u[`--n-item-color-hover`]=r.itemColorHoverInverted,u[`--n-item-color-active`]=r.itemColorActiveInverted,u[`--n-item-color-active-hover`]=r.itemColorActiveHoverInverted,u[`--n-item-color-active-collapsed`]=r.itemColorActiveCollapsedInverted):(u[`--n-group-text-color`]=r.groupTextColor,u[`--n-color`]=r.color,u[`--n-item-text-color`]=r.itemTextColor,u[`--n-item-text-color-hover`]=r.itemTextColorHover,u[`--n-item-text-color-active`]=r.itemTextColorActive,u[`--n-item-text-color-child-active`]=r.itemTextColorChildActive,u[`--n-item-text-color-child-active-hover`]=r.itemTextColorChildActiveHover,u[`--n-item-text-color-active-hover`]=r.itemTextColorActiveHover,u[`--n-item-icon-color`]=r.itemIconColor,u[`--n-item-icon-color-hover`]=r.itemIconColorHover,u[`--n-item-icon-color-active`]=r.itemIconColorActive,u[`--n-item-icon-color-active-hover`]=r.itemIconColorActiveHover,u[`--n-item-icon-color-child-active`]=r.itemIconColorChildActive,u[`--n-item-icon-color-child-active-hover`]=r.itemIconColorChildActiveHover,u[`--n-item-icon-color-collapsed`]=r.itemIconColorCollapsed,u[`--n-item-text-color-horizontal`]=r.itemTextColorHorizontal,u[`--n-item-text-color-hover-horizontal`]=r.itemTextColorHoverHorizontal,u[`--n-item-text-color-active-horizontal`]=r.itemTextColorActiveHorizontal,u[`--n-item-text-color-child-active-horizontal`]=r.itemTextColorChildActiveHorizontal,u[`--n-item-text-color-child-active-hover-horizontal`]=r.itemTextColorChildActiveHoverHorizontal,u[`--n-item-text-color-active-hover-horizontal`]=r.itemTextColorActiveHoverHorizontal,u[`--n-item-icon-color-horizontal`]=r.itemIconColorHorizontal,u[`--n-item-icon-color-hover-horizontal`]=r.itemIconColorHoverHorizontal,u[`--n-item-icon-color-active-horizontal`]=r.itemIconColorActiveHorizontal,u[`--n-item-icon-color-active-hover-horizontal`]=r.itemIconColorActiveHoverHorizontal,u[`--n-item-icon-color-child-active-horizontal`]=r.itemIconColorChildActiveHorizontal,u[`--n-item-icon-color-child-active-hover-horizontal`]=r.itemIconColorChildActiveHoverHorizontal,u[`--n-arrow-color`]=r.arrowColor,u[`--n-arrow-color-hover`]=r.arrowColorHover,u[`--n-arrow-color-active`]=r.arrowColorActive,u[`--n-arrow-color-active-hover`]=r.arrowColorActiveHover,u[`--n-arrow-color-child-active`]=r.arrowColorChildActive,u[`--n-arrow-color-child-active-hover`]=r.arrowColorChildActiveHover,u[`--n-item-color-hover`]=r.itemColorHover,u[`--n-item-color-active`]=r.itemColorActive,u[`--n-item-color-active-hover`]=r.itemColorActiveHover,u[`--n-item-color-active-collapsed`]=r.itemColorActiveCollapsed),u}),ee=r?k(`menu`,C(()=>e.inverted?`a`:`b`),D,e):void 0,j=pe(),M=W(null),N=W(null),P=!0,F=()=>{P?P=!1:M.value?.sync({showAllItemsBeforeCalculate:!0})};function I(){return document.getElementById(j)}let L=W(-1);function R(t){L.value=e.options.length-t}function te(e){e||(L.value=-1)}let z=C(()=>{let t=L.value;return{children:t===-1?[]:e.options.slice(t)}}),B=C(()=>{let{childrenField:t,disabledField:n,keyField:r}=e;return fe([z.value],{getIgnored(e){return zt(e)},getChildren(e){return e[t]},getDisabled(e){return e[n]},getKey(e){return e[r]??e.name}})}),ne=C(()=>fe([{}]).treeNodes[0]);function ie(){if(L.value===-1)return O(),J(Rt,{root:!0,level:0,key:`__ellpisisGroupPlaceholder__`,internalKey:`__ellpisisGroupPlaceholder__`,title:`···`,tmNode:ne.value,domId:j,isEllipsisPlaceholder:!0},null,8,[`tmNode`,`domId`]);let e=B.value.treeNodes[0],t=x.value,n=!!e.children?.some(e=>t.includes(e.key));return O(),J(Rt,{level:0,root:!0,key:`__ellpisisGroup__`,internalKey:`__ellpisisGroup__`,title:`···`,virtualChildActive:n,tmNode:e,domId:j,rawNodes:e.rawNode.children||[],tmNodes:e.children||[],isEllipsisPlaceholder:!0},null,8,[`virtualChildActive`,`tmNode`,`domId`,`rawNodes`,`tmNodes`])}return{mergedClsPrefix:n,controlledExpandedKeys:_,uncontrolledExpanededKeys:h,mergedExpandedKeys:v,uncontrolledValue:f,mergedValue:m,activePath:x,tmNodes:y,mergedTheme:i,mergedCollapsed:o,cssVars:r?void 0:D,themeClass:ee?.themeClass,overflowRef:M,counterRef:N,updateCounter:()=>{},onResize:F,onUpdateOverflow:te,onUpdateCount:R,renderCounter:ie,getCounter:I,onRender:ee?.onRender,showOption:E,deriveResponsiveState:F}},render(){let{mergedClsPrefix:e,mode:t,themeClass:r,onRender:i}=this;i?.();let a=()=>this.tmNodes.map(e=>Vt(e,this.$props)),o=t===`horizontal`&&this.responsive,s=()=>g(`div`,f(this.$attrs,{role:t===`horizontal`?`menubar`:`menu`,class:[`${e}-menu`,r,`${e}-menu--${t}`,o&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),o?(O(),J(de,{key:2,ref:`overflowRef`,onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:a,counter:this.renderCounter},1032,[`onUpdateOverflow`,`getCounter`,`onUpdateCount`,`updateCounter`])):a());return o?(O(),J(n,{key:3,onResize:this.onResize},{default:s},1032,[`onResize`])):s()}}),Wt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Gt=r({name:`CubeOutline`,render:function(e,t){return O(),c(`svg`,Wt,t[0]||=[o(`path`,{d:`M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),o(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M69 153.99l187 110l187-110`},null,-1),o(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 463.99v-200`},null,-1)])}}),Kt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},qt=r({name:`DocumentTextOutline`,render:function(e,t){return O(),c(`svg`,Kt,t[0]||=[o(`path`,{d:`M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),o(`path`,{d:`M256 56v120a32 32 0 0 0 32 32h120`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),o(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h160`},null,-1),o(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 368h160`},null,-1)])}}),Jt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Yt=r({name:`GridOutline`,render:function(e,t){return O(),c(`svg`,Jt,t[0]||=[o(`rect`,{x:`48`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),o(`rect`,{x:`288`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),o(`rect`,{x:`48`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),o(`rect`,{x:`288`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Xt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Zt=r({name:`LogOutOutline`,render:function(e,t){return O(),c(`svg`,Xt,t[0]||=[o(`path`,{d:`M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),o(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M368 336l80-80l-80-80`},null,-1),o(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 256h256`},null,-1)])}}),Qt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},$t=r({name:`MenuOutline`,render:function(e,t){return O(),c(`svg`,Qt,t[0]||=[o(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 160h352`},null,-1),o(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 256h352`},null,-1),o(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 352h352`},null,-1)])}}),en={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},tn=r({name:`PulseOutline`,render:function(e,t){return O(),c(`svg`,en,t[0]||=[o(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M48 320h64l64-256l64 384l64-224l32 96h64`},null,-1),o(`circle`,{cx:`432`,cy:`320`,r:`32`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),nn={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},rn=r({name:`SettingsOutline`,render:function(e,t){return O(),c(`svg`,nn,t[0]||=[o(`path`,{d:`M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),an={key:0,class:`brand-copy`},on={class:`mobile-drawer-account`},sn={class:`account-copy`},cn={key:0,class:`section-header-scope`},ln={key:1,class:`app-header-leading`},un={class:`app-title`},dn={class:`account`},fn={class:`account-copy`},pn=[`aria-label`],mn={class:`update-banner-body`},hn=r({__name:`AppLayout`,setup(e){let t=je(),n=ke(),r=Me(),i=ge(),s=Se(),l=W(!1),u=W(null),f=W(window.innerWidth),p=C(()=>Math.min(320,Math.round(f.value*.86))),_=W(window.innerWidth<1100);function y(e,t,n,r=t){return{label:()=>g(Ae,{to:{name:t},custom:!0},{default:({href:t,isExactActive:n,navigate:r})=>g(`a`,{href:t,"aria-current":n?`page`:void 0,onClick:r},e)}),key:r,icon:()=>g(Z,null,{default:()=>g(n)})}}let b=[y(`运行概览`,`dashboard`,Yt),y(`连接活动`,`connections`,Fe),y(`配置中心`,`orchestration`,qt,`configuration`),y(`资源管理`,`versions`,Gt,`resources`),y(`排障中心`,`diagnostics`,tn,`troubleshooting`),y(`面板设置`,`settings`,rn)],S={configuration:{label:`配置中心`,icon:qt,tabs:[{name:`orchestration`,label:`代理配置`},{name:`config`,label:`配置文件`},{name:`backups`,label:`配置备份`},{name:`schema`,label:`配置参考`}]},resources:{label:`资源管理`,icon:Gt,tabs:[{name:`versions`,label:`dae 版本`},{name:`geo`,label:`Geo 数据`}]},troubleshooting:{label:`排障中心`,icon:tn,tabs:[{name:`diagnostics`,label:`故障诊断`},{name:`logs`,label:`运行日志`}]}},w=C(()=>S[t.meta.section]),T=C(()=>String(t.meta.section||t.name||`dashboard`)),D=C(()=>String(t.meta.title||`kdae-panel`));async function k(){try{await r.logout(),await n.replace({name:`login`})}catch(e){i.error(e instanceof Error?e.message:`退出登录失败`)}}function A(){r.clearSession(),n.replace({name:`login`}),i.warning(`登录会话已过期，请重新登录`)}function j(){f.value=window.innerWidth,!s.value&&window.innerWidth<1100&&(_.value=!0)}function N(){u.value?.querySelector(`.n-menu-item-content--selected a`)?.focus({preventScroll:!0})}x(s,()=>{l.value=!1});let P=W(null),F=W(!1);async function L(){try{P.value=await te(`/api/v1/panel/update`)}catch{P.value=null}}function z(e){let t=e.detail;P.value&&t&&(P.value.status=t)}return d(()=>{window.addEventListener(`kdae-panel:auth-expired`,A),window.addEventListener(`kdae-panel:self-update-changed`,z),window.addEventListener(`resize`,j),L()}),a(()=>{window.removeEventListener(`kdae-panel:auth-expired`,A),window.removeEventListener(`kdae-panel:self-update-changed`,z),window.removeEventListener(`resize`,j)}),(e,n)=>{let i=m(`RouterView`);return O(),J(R(nt),{"has-sider":!R(s),class:`app-shell`},{default:I(()=>[R(s)?E(``,!0):(O(),J(R(mt),{key:0,class:`app-sidebar`,bordered:``,"collapse-mode":`width`,"collapsed-width":64,width:236,collapsed:_.value,"show-trigger":`bar`,onCollapse:n[0]||=e=>_.value=!0,onExpand:n[1]||=e=>_.value=!1},{default:I(()=>[o(`div`,{class:M([`brand`,{compact:_.value}])},[n[8]||=o(`div`,{class:`brand-mark`},`K`,-1),_.value?E(``,!0):(O(),c(`div`,an,[...n[7]||=[o(`strong`,null,`kdae-panel`,-1),o(`span`,null,`零侵入管理面板`,-1)]]))],2),B(R(Ut),{value:T.value,collapsed:_.value,"collapsed-width":64,"collapsed-icon-size":22,options:b},null,8,[`value`,`collapsed`])]),_:1},8,[`collapsed`])),B(R(Te),{show:l.value,"onUpdate:show":n[3]||=e=>l.value=e,placement:`left`,width:p.value,"auto-focus":!1,onAfterEnter:N},{default:I(()=>[B(R(Ee),{class:`mobile-nav-drawer`,"native-scrollbar":!1,"body-content-style":`padding: 0;`},{footer:I(()=>[o(`div`,on,[B(R(qe),{round:``,size:`small`},{default:I(()=>[v(X(R(r).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),o(`div`,sn,[o(`strong`,null,X(R(r).user?.username),1),n[9]||=o(`span`,null,`管理员`,-1)]),B(R(ae),{quaternary:``,circle:``,title:`退出登录`,"aria-label":`退出登录`,onClick:k},{icon:I(()=>[B(R(Z),null,{default:I(()=>[B(R(Zt))]),_:1})]),_:1})])]),default:I(()=>[n[10]||=o(`div`,{class:`brand mobile-drawer-brand`},[o(`div`,{class:`brand-mark`},`K`),o(`div`,{class:`brand-copy`},[o(`strong`,null,`kdae-panel`),o(`span`,null,`零侵入管理面板`)])],-1),o(`div`,{ref_key:`mobileNavRef`,ref:u},[B(R(Ut),{value:T.value,options:b,"onUpdate:value":n[2]||=e=>l.value=!1},null,8,[`value`])],512)]),_:1})]),_:1},8,[`show`,`width`]),B(R(nt),{class:`app-main`},{default:I(()=>[B(R(ot),{bordered:``,class:M([`app-header`,{"section-header":w.value}])},{default:I(()=>[w.value?(O(),c(`div`,cn,[R(s)?(O(),J(R(ae),{key:0,quaternary:``,circle:``,class:`mobile-nav-trigger`,title:`打开导航`,"aria-label":`打开导航`,onClick:n[4]||=e=>l.value=!0},{icon:I(()=>[B(R(Z),null,{default:I(()=>[B(R($t))]),_:1})]),_:1})):E(``,!0),B(R(Z),{size:`17`},{default:I(()=>[(O(),J(ee(w.value.icon)))]),_:1}),o(`strong`,null,X(w.value.label),1)])):(O(),c(`div`,ln,[R(s)?(O(),J(R(ae),{key:0,quaternary:``,circle:``,class:`mobile-nav-trigger`,title:`打开导航`,"aria-label":`打开导航`,onClick:n[5]||=e=>l.value=!0},{icon:I(()=>[B(R(Z),null,{default:I(()=>[B(R($t))]),_:1})]),_:1})):E(``,!0),o(`div`,un,[B(R(ve),{depth:`3`,class:`eyebrow`},{default:I(()=>[...n[11]||=[v(`KDAE CONTROL PLANE`,-1)]]),_:1}),o(`h1`,null,X(D.value),1)])])),o(`div`,dn,[B(R(qe),{round:``,size:`small`},{default:I(()=>[v(X(R(r).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),o(`div`,fn,[o(`strong`,null,X(R(r).user?.username),1),n[12]||=o(`span`,null,`管理员`,-1)]),B(R(ae),{quaternary:``,circle:``,title:`退出登录`,onClick:k},{icon:I(()=>[B(R(Z),null,{default:I(()=>[B(R(Zt))]),_:1})]),_:1})]),w.value?(O(),c(`nav`,{key:2,class:`section-tabs`,"aria-label":`${w.value.label}子页面`},[(O(!0),c(K,null,h(w.value.tabs,e=>(O(),J(R(Ae),{key:e.name,to:{name:e.name},class:M([`section-tab`,{active:R(t).name===e.name}])},{default:I(()=>[v(X(e.label),1)]),_:2},1032,[`to`,`class`]))),128))],8,pn)):E(``,!0)]),_:1},8,[`class`]),B(R(rt),{class:M([`app-content`,{"section-content":w.value}]),"content-style":`padding: var(--page-padding);`},{default:I(()=>[P.value?.check.updateAvailable&&!F.value?(O(),J(R(we),{key:0,type:`info`,closable:``,class:`update-banner`,onClose:n[6]||=e=>F.value=!0},{default:I(()=>[o(`div`,mn,[o(`span`,null,[n[13]||=v(` 面板有新版本 `,-1),o(`strong`,null,X(P.value.check.latest),1),v(`（当前 `+X(P.value.check.current)+`）。 `,1),P.value.status?.enabled&&P.value.status.updatable?(O(),c(K,{key:0},[v(`升级会替换面板二进制并重启自身，配置与账号数据都会保留。`)],64)):P.value.status&&!P.value.status.enabled?(O(),c(K,{key:1},[v(`可直接在这里启用一键升级，不需要 SSH。`)],64)):P.value.status?.problem?(O(),c(K,{key:2},[v(`当前无法一键升级：`+X(P.value.status.problem),1)],64)):(O(),c(K,{key:3},[v(`当前部署不支持一键升级，可重新执行一键部署命令。`)],64)),n[14]||=o(`a`,{href:`https://github.com/tuoro/kdae-panel/releases/latest`,target:`_blank`,rel:`noopener`},`查看发布说明`,-1)]),B(Ie,{payload:P.value,label:`立即升级`},null,8,[`payload`])])]),_:1})):E(``,!0),B(i)]),_:1},8,[`class`])]),_:1})]),_:1},8,[`has-sider`])}}});export{hn as default};