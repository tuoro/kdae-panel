import{B as e,Bn as t,Cn as n,D as r,Dn as i,F as a,Fn as o,Gt as s,H as c,Ht as l,In as u,Jt as d,Kt as f,L as p,Mn as m,N as h,Nn as g,Q as _,R as v,T as y,V as b,Vn as x,Vt as S,W as C,Wt as w,Yt as ee,Z as T,Zn as E,_n as D,an as O,ar as k,dn as A,et as j,fn as M,gn as N,hn as P,i as te,ir as F,j as ne,jn as I,kn as re,ln as L,lt as R,or as z,ot as B,p as V,pn as H,qt as ie,rr as U,tr as W,tt as G,un as K,v as ae,xn as q,yn as J,z as oe,zn as se}from"./client-aJ7VylDj.js";import{o as ce,t as le}from"./create-B4Asm14z.js";import{f as ue,l as de,o as fe,r as pe,t as me}from"./Scrollbar-BwDSgsaA.js";import{t as he}from"./misc-DDs3MKLt.js";import{d as ge,i as Y}from"./event-Dt-XIvq2.js";import{t as _e}from"./use-merged-state-C2wcLaf9.js";import{i as ve,n as ye,r as be,t as xe}from"./text-DRlxVKC3.js";import{a as Se,n as Ce,r as we,t as Te}from"./useMobileViewport-BN-6odsE.js";import{t as Ee}from"./fade-in-height-expand.cssr-BJwCRVuW.js";import{n as De}from"./Tag-WnQe2zVj.js";import{t as Oe}from"./Alert-D4F91M-U.js";import{t as X}from"./Icon-s65Z1vBH.js";import{n as ke,t as Ae}from"./DrawerContent-DR_iwmRe.js";import{i as je,k as Me,l as Ne,n as Pe,r as Fe,t as Ie}from"./index-CS_xLr4y.js";import{t as Le}from"./SwapHorizontalOutline-CLgGLDsO.js";import{t as Re}from"./PanelUpdateAction-BGmE6YUt.js";var ze=ae&&`loading`in document.createElement(`img`);function Be(e={}){let{root:t=null}=e;return{hash:`${e.rootMargin||`0px 0px 0px 0px`}-${Array.isArray(e.threshold)?e.threshold.join(`,`):e.threshold??`0`}`,options:{...e,root:(typeof t==`string`?document.querySelector(t):t)||document.documentElement}}}var Ve=new WeakMap,He=new WeakMap,Ue=new WeakMap,We=(e,t,n)=>{if(!e)return()=>{};let r=Be(t),{root:i}=r.options,a,o=Ve.get(i);o?a=o:(a=new Map,Ve.set(i,a));let s,c;a.has(r.hash)?(c=a.get(r.hash),c[1].has(e)||(s=c[0],c[1].add(e),s.observe(e))):(s=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let t=He.get(e.target),n=Ue.get(e.target);t&&t(),n&&(n.value=!0)}})},r.options),s.observe(e),c=[s,new Set([e])],a.set(r.hash,c));let l=!1,u=()=>{l||(He.delete(e),Ue.delete(e),l=!0,c[1].has(e)&&(c[0].unobserve(e),c[1].delete(e)),c[1].size<=0&&a.delete(r.hash),a.size||Ve.delete(i))};return He.set(e,u),Ue.set(e,n),u},Ge=R(`n-avatar-group`),Ke=l(`avatar`,`
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
`,[d(S(`&`,`--n-merged-color: var(--n-color-modal);`)),ee(S(`&`,`--n-merged-color: var(--n-color-popover);`)),S(`img`,`
 width: 100%;
 height: 100%;
 `),w(`text`,`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),l(`icon`,`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),w(`text`,`line-height: 1.25`)]),qe=[`src`],Je={...e.props,size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String},Ye=D({name:`Avatar`,props:Je,slots:Object,setup(n){let{mergedClsPrefixRef:a,inlineThemeDisabled:o}=B(n),s=E(!1),c=null,l=E(null),u=E(null),d=()=>{let{value:e}=l;if(e&&(c===null||c!==e.innerHTML)){c=e.innerHTML;let{value:t}=u;if(t){let{offsetWidth:n,offsetHeight:r}=t,{offsetWidth:i,offsetHeight:a}=e,o=.9,s=Math.min(n/i*o,r/a*o,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${s})`}}},f=q(Ge,null),p=L(()=>{let{size:e}=n;if(e)return e;let{size:t}=f||{};return t||`medium`}),m=e(`Avatar`,`-avatar`,Ke,Me,n,a),h=q(De,null),g=L(()=>{if(f)return!0;let{round:e,circle:t}=n;return e!==void 0||t!==void 0?e||t:h?h.roundRef.value:!1}),_=L(()=>f?!0:n.bordered||!1),v=L(()=>{let e=p.value,t=g.value,r=_.value,{color:i}=n,{self:{borderRadius:a,fontSize:o,color:s,border:c,colorModal:l,colorPopover:u},common:{cubicBezierEaseInOut:d}}=m.value,f;return f=typeof e==`number`?`${e}px`:m.value.self[ie(`height`,e)],{"--n-font-size":o,"--n-border":r?c:`none`,"--n-border-radius":t?`50%`:a,"--n-color":i||s,"--n-color-modal":i||l,"--n-color-popover":i||u,"--n-bezier":d,"--n-merged-size":`var(--n-avatar-size-override, ${f})`}}),y=o?b(`avatar`,L(()=>{let e=p.value,t=g.value,i=_.value,{color:a}=n,o=``;return e&&(o+=typeof e==`number`?`a${e}`:e[0]),t&&(o+=`b`),i&&(o+=`c`),a&&(o+=r(a)),o}),v,n):void 0,x=E(!n.lazy);re(()=>{if(n.lazy&&n.intersectionObserverOptions){let e,r=t(()=>{e?.(),e=void 0,n.lazy&&(e=We(u.value,n.intersectionObserverOptions,x))});i(()=>{r(),e?.()})}}),se(()=>n.src||n.imgProps?.src,()=>{s.value=!1});let S=E(!n.lazy);return{textRef:l,selfRef:u,mergedRoundRef:g,mergedClsPrefix:a,fitTextTransform:d,cssVars:o?void 0:v,themeClass:y?.themeClass,onRender:y?.onRender,hasLoadError:s,shouldStartLoading:x,loaded:S,mergedOnError:e=>{if(!x.value)return;s.value=!0;let{onError:t,imgProps:{onError:r}={}}=n;t?.(e),r?.(e)},mergedOnLoad:e=>{let{onLoad:t,imgProps:{onLoad:r}={}}=n;t?.(e),r?.(e),S.value=!0}}},render(){let{$slots:e,src:t,mergedClsPrefix:n,lazy:r,onRender:i,loaded:a,hasLoadError:o,imgProps:s={}}=this;i?.();let c,l=!a&&!o&&(this.renderPlaceholder?this.renderPlaceholder():this.$slots.placeholder?.());return c=this.hasLoadError?this.renderFallback?this.renderFallback():ne(e.fallback,()=>[(I(),H(`img`,{src:this.fallbackSrc,style:k({objectFit:this.objectFit})},null,12,qe))]):h(e.default,e=>{if(e)return I(),A(pe,{key:1,onResize:this.fitTextTransform},{default:()=>(I(),H(`span`,{ref:`textRef`,class:_(`${n}-avatar__text`)},[G(()=>e)],2))},1032,[`onResize`]);if(t||s.src){let e=this.src||s.src;return J(`img`,{...s,loading:ze&&!this.intersectionObserverOptions&&r?`lazy`:`eager`,src:r&&this.intersectionObserverOptions?this.shouldStartLoading?e:void 0:e,"data-image-src":e,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[s.style||``,{objectFit:this.objectFit},l?{height:`0`,width:`0`,visibility:`hidden`,position:`absolute`}:``]})}}),I(),H(`span`,{ref:`selfRef`,class:_([`${n}-avatar`,this.themeClass]),style:k(this.cssVars)},[G(()=>c),G(()=>r&&l)],6)}});function Xe(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:a,actionColor:o,scrollbarColor:s,scrollbarColorHover:c,invertedColor:l}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:o,headerColor:i,headerColorInverted:l,footerColor:o,footerColorInverted:l,headerBorderColor:a,headerBorderColorInverted:l,footerBorderColor:a,footerBorderColorInverted:l,siderBorderColor:a,siderBorderColorInverted:l,siderColor:i,siderColorInverted:l,siderToggleButtonBorder:`1px solid ${a}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:C(r,s),siderToggleBarColorHover:C(r,c),__invertScrollbar:`true`}}var Ze=oe({name:`Layout`,common:c,peers:{Scrollbar:de},self:Xe}),Qe=R(`n-layout-sider`),$e={type:String,default:`static`},et=l(`layout`,`
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
`,[l(`layout-scroll-container`,`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),s(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),tt={embedded:Boolean,position:$e,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},nt=R(`n-layout`);function rt(t){return D({name:t?`LayoutContent`:`Layout`,props:{...e.props,...tt},setup(t){let n=E(null),r=E(null),{mergedClsPrefixRef:i,inlineThemeDisabled:a}=B(t),o=e(`Layout`,`-layout`,et,Ze,t,i);function s(e,i){if(t.nativeScrollbar){let{value:t}=n;t&&(i===void 0?t.scrollTo(e):t.scrollTo(e,i))}else{let{value:t}=r;t&&t.scrollTo(e,i)}}m(nt,t);let c=0,l=0,u=e=>{let n=e.target;c=n.scrollLeft,l=n.scrollTop,t.onScroll?.(e)};fe(()=>{if(t.nativeScrollbar){let e=n.value;e&&(e.scrollTop=l,e.scrollLeft=c)}});let d={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},f={scrollTo:s},p=L(()=>{let{common:{cubicBezierEaseInOut:e},self:n}=o.value;return{"--n-bezier":e,"--n-color":t.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),h=a?b(`layout`,L(()=>t.embedded?`e`:``),p,t):void 0;return{mergedClsPrefix:i,scrollableElRef:n,scrollbarInstRef:r,hasSiderStyle:d,mergedTheme:o,handleNativeElScroll:u,cssVars:a?void 0:p,themeClass:h?.themeClass,onRender:h?.onRender,...f}},render(){let{mergedClsPrefix:e,hasSider:r}=this;this.onRender?.();let i=r?this.hasSiderStyle:void 0,a=[this.themeClass,t&&`${e}-layout-content`,`${e}-layout`,`${e}-layout--${this.position}-positioned`];return I(),H(`div`,{class:_(a),style:k(this.cssVars)},[this.nativeScrollbar?(I(),H(`div`,{key:0,ref:`scrollableElRef`,class:_([`${e}-layout-scroll-container`,this.contentClass]),style:k([this.contentStyle,i]),onScroll:this.handleNativeElScroll},[G(()=>this.$slots.default?.())],46,[`onScroll`])):(I(),A(me,n({key:1},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,i]}),j(this.$slots),1040,[`onScroll`,`theme`,`themeOverrides`,`contentClass`,`contentStyle`]))],6)}})}var it=rt(!1),at=rt(!0),ot=l(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[s(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),s(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),st={position:$e,inverted:Boolean,bordered:Boolean},ct=D({name:`LayoutHeader`,props:{...e.props,...st},setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=B(t),i=e(`Layout`,`-layout-header`,ot,Ze,t,n),a=L(()=>{let{common:{cubicBezierEaseInOut:e},self:n}=i.value,r={"--n-bezier":e};return t.inverted?(r[`--n-color`]=n.headerColorInverted,r[`--n-text-color`]=n.textColorInverted,r[`--n-border-color`]=n.headerBorderColorInverted):(r[`--n-color`]=n.headerColor,r[`--n-text-color`]=n.textColor,r[`--n-border-color`]=n.headerBorderColor),r}),o=r?b(`layout-header`,L(()=>t.inverted?`a`:`b`),a,t):void 0;return{mergedClsPrefix:n,cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{mergedClsPrefix:e}=this;return this.onRender?.(),I(),H(`div`,{class:_([`${e}-layout-header`,this.themeClass,this.position&&`${e}-layout-header--${this.position}-positioned`,this.bordered&&`${e}-layout-header--bordered`]),style:k(this.cssVars)},[G(()=>this.$slots.default?.())],6)}}),lt=l(`layout-sider`,`
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
`,[s(`bordered`,[w(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),w(`left-placement`,[s(`bordered`,[w(`border`,`
 right: 0;
 `)])]),s(`right-placement`,`
 justify-content: flex-start;
 `,[s(`bordered`,[w(`border`,`
 left: 0;
 `)]),s(`collapsed`,[l(`layout-toggle-button`,[l(`base-icon`,`
 transform: rotate(180deg);
 `)]),l(`layout-toggle-bar`,[S(`&:hover`,[w(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),w(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),l(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[l(`base-icon`,`
 transform: rotate(0);
 `)]),l(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[S(`&:hover`,[w(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),w(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),s(`collapsed`,[l(`layout-toggle-bar`,[S(`&:hover`,[w(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),w(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),l(`layout-toggle-button`,[l(`base-icon`,`
 transform: rotate(0);
 `)])]),l(`layout-toggle-button`,`
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
 `,[l(`base-icon`,`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),l(`layout-toggle-bar`,`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[w(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),w(`bottom`,`
 position: absolute;
 top: 34px;
 `),S(`&:hover`,[w(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),w(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),w(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),S(`&:hover`,[w(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),w(`border`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),l(`layout-sider-scroll-container`,`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),s(`show-content`,[l(`layout-sider-scroll-container`,{opacity:1})]),s(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),ut=[`onClick`],dt=D({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return I(),H(`div`,{onClick:this.onClick,class:_(`${e}-layout-toggle-bar`)},[K(`div`,{class:_(`${e}-layout-toggle-bar__top`)},null,2),K(`div`,{class:_(`${e}-layout-toggle-bar__bottom`)},null,2)],10,ut)}}),ft=[`onClick`],pt=D({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return I(),H(`div`,{class:_(`${e}-layout-toggle-button`),onClick:this.onClick},[(I(),A(v,{clsPrefix:e},{default:()=>(I(),A(Se))},1032,[`clsPrefix`]))],10,ft)}}),mt=[`onTransitionend`],ht={position:$e,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},gt=D({name:`LayoutSider`,props:{...e.props,...ht},setup(t){let n=q(nt),r=E(null),i=E(null),o=E(t.defaultCollapsed),s=_e(W(t,`collapsed`),o),c=L(()=>be(s.value?t.collapsedWidth:t.width)),l=L(()=>t.collapseMode===`transform`?{minWidth:be(t.width)}:{}),u=L(()=>n?n.siderPlacement:`left`);function d(e,n){if(t.nativeScrollbar){let{value:t}=r;t&&(n===void 0?t.scrollTo(e):t.scrollTo(e,n))}else{let{value:t}=i;t&&t.scrollTo(e,n)}}function f(){let{"onUpdate:collapsed":e,onUpdateCollapsed:n,onExpand:r,onCollapse:i}=t,{value:c}=s;n&&a(n,!c),e&&a(e,!c),o.value=!c,c?r&&a(r):i&&a(i)}let p=0,h=0,g=e=>{let n=e.target;p=n.scrollLeft,h=n.scrollTop,t.onScroll?.(e)};fe(()=>{if(t.nativeScrollbar){let e=r.value;e&&(e.scrollTop=h,e.scrollLeft=p)}}),m(Qe,{collapsedRef:s,collapseModeRef:W(t,`collapseMode`)});let{mergedClsPrefixRef:_,inlineThemeDisabled:v}=B(t),y=e(`Layout`,`-layout-sider`,lt,Ze,t,_);function x(e){e.propertyName===`max-width`&&(s.value?t.onAfterLeave?.():t.onAfterEnter?.())}let S={scrollTo:d},C=L(()=>{let{common:{cubicBezierEaseInOut:e},self:n}=y.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":e,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return t.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),w=v?b(`layout-sider`,L(()=>t.inverted?`a`:`b`),C,t):void 0;return{scrollableElRef:r,scrollbarInstRef:i,mergedClsPrefix:_,mergedTheme:y,styleMaxWidth:c,mergedCollapsed:s,scrollContainerStyle:l,siderPlacement:u,handleNativeElScroll:g,handleTransitionend:x,handleTriggerClick:f,inlineThemeDisabled:v,cssVars:C,themeClass:w?.themeClass,onRender:w?.onRender,...S}},render(){let{mergedClsPrefix:e,mergedCollapsed:t,showTrigger:r}=this;return this.onRender?.(),I(),H(`aside`,{class:_([`${e}-layout-sider`,this.themeClass,`${e}-layout-sider--${this.position}-positioned`,`${e}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${e}-layout-sider--bordered`,t&&`${e}-layout-sider--collapsed`,(!t||this.showCollapsedContent)&&`${e}-layout-sider--show-content`]),onTransitionend:this.handleTransitionend,style:k([this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:be(this.width)}])},[this.nativeScrollbar?(I(),H(`div`,{key:1,class:_([`${e}-layout-sider-scroll-container`,this.contentClass]),onScroll:this.handleNativeElScroll,style:k([this.scrollContainerStyle,{overflow:`auto`},this.contentStyle]),ref:`scrollableElRef`},[G(()=>this.$slots.default?.())],46,[`onScroll`])):(I(),A(me,n({key:0},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),j(this.$slots),1040,[`onScroll`,`style`,`contentStyle`,`contentClass`,`theme`,`themeOverrides`,`builtinThemeOverrides`])),r?(I(),H(O,{key:2},[r===`bar`?(I(),A(dt,{key:0,clsPrefix:e,class:_(t?this.collapsedTriggerClass:this.triggerClass),style:k(t?this.collapsedTriggerStyle:this.triggerStyle),onClick:this.handleTriggerClick},null,8,[`clsPrefix`,`class`,`style`,`onClick`])):(I(),A(pt,{key:1,clsPrefix:e,class:_(t?this.collapsedTriggerClass:this.triggerClass),style:k(t?this.collapsedTriggerStyle:this.triggerStyle),onClick:this.handleTriggerClick},null,8,[`clsPrefix`,`class`,`style`,`onClick`]))],64)):G(()=>null),this.bordered?(I(),H(`div`,{key:4,class:_(`${e}-layout-sider__border`)},null,2)):G(()=>null)],46,mt)}}),Z=R(`n-menu`),_t=R(`n-submenu`),vt=R(`n-menu-item-group`),yt=[S(`&::before`,`background-color: var(--n-item-color-hover);`),w(`arrow`,`
 color: var(--n-arrow-color-hover);
 `),w(`icon`,`
 color: var(--n-item-icon-color-hover);
 `),l(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover);
 `,[S(`a`,`
 color: var(--n-item-text-color-hover);
 `),w(`extra`,`
 color: var(--n-item-text-color-hover);
 `)])],bt=[w(`icon`,`
 color: var(--n-item-icon-color-hover-horizontal);
 `),l(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover-horizontal);
 `,[S(`a`,`
 color: var(--n-item-text-color-hover-horizontal);
 `),w(`extra`,`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],xt=S([l(`menu`,`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[s(`horizontal`,`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[l(`submenu`,`margin: 0;`),l(`menu-item`,`margin: 0;`),l(`menu-item-content`,`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[S(`&::before`,`display: none;`),s(`selected`,`border-bottom: 2px solid var(--n-border-color-horizontal)`)]),l(`menu-item-content`,[s(`selected`,[w(`icon`,`color: var(--n-item-icon-color-active-horizontal);`),l(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-horizontal);
 `,[S(`a`,`color: var(--n-item-text-color-active-horizontal);`),w(`extra`,`color: var(--n-item-text-color-active-horizontal);`)])]),s(`child-active`,`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[l(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[S(`a`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `),w(`extra`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),w(`icon`,`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),f(`disabled`,[f(`selected, child-active`,[S(`&:focus-within`,bt)]),s(`selected`,[Q(null,[w(`icon`,`color: var(--n-item-icon-color-active-hover-horizontal);`),l(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[S(`a`,`color: var(--n-item-text-color-active-hover-horizontal);`),w(`extra`,`color: var(--n-item-text-color-active-hover-horizontal);`)])])]),s(`child-active`,[Q(null,[w(`icon`,`color: var(--n-item-icon-color-child-active-hover-horizontal);`),l(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[S(`a`,`color: var(--n-item-text-color-child-active-hover-horizontal);`),w(`extra`,`color: var(--n-item-text-color-child-active-hover-horizontal);`)])])]),Q(`border-bottom: 2px solid var(--n-border-color-horizontal);`,bt)]),l(`menu-item-content-header`,[S(`a`,`color: var(--n-item-text-color-horizontal);`)])])]),f(`responsive`,[l(`menu-item-content-header`,`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),s(`collapsed`,[l(`menu-item-content`,[s(`selected`,[S(`&::before`,`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),l(`menu-item-content-header`,`opacity: 0;`),w(`arrow`,`opacity: 0;`),w(`icon`,`color: var(--n-item-icon-color-collapsed);`)])]),l(`menu-item`,`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),l(`menu-item-content`,`
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
 `,[S(`> *`,`z-index: 1;`),S(`&::before`,`
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
 `),s(`disabled`,`
 opacity: .45;
 cursor: not-allowed;
 `),s(`collapsed`,[w(`arrow`,`transform: rotate(0);`)]),s(`selected`,[S(`&::before`,`background-color: var(--n-item-color-active);`),w(`arrow`,`color: var(--n-arrow-color-active);`),w(`icon`,`color: var(--n-item-icon-color-active);`),l(`menu-item-content-header`,`
 color: var(--n-item-text-color-active);
 `,[S(`a`,`color: var(--n-item-text-color-active);`),w(`extra`,`color: var(--n-item-text-color-active);`)])]),s(`child-active`,[l(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active);
 `,[S(`a`,`
 color: var(--n-item-text-color-child-active);
 `),w(`extra`,`
 color: var(--n-item-text-color-child-active);
 `)]),w(`arrow`,`
 color: var(--n-arrow-color-child-active);
 `),w(`icon`,`
 color: var(--n-item-icon-color-child-active);
 `)]),f(`disabled`,[f(`selected, child-active`,[S(`&:focus-within`,yt)]),s(`selected`,[Q(null,[w(`arrow`,`color: var(--n-arrow-color-active-hover);`),w(`icon`,`color: var(--n-item-icon-color-active-hover);`),l(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover);
 `,[S(`a`,`color: var(--n-item-text-color-active-hover);`),w(`extra`,`color: var(--n-item-text-color-active-hover);`)])])]),s(`child-active`,[Q(null,[w(`arrow`,`color: var(--n-arrow-color-child-active-hover);`),w(`icon`,`color: var(--n-item-icon-color-child-active-hover);`),l(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover);
 `,[S(`a`,`color: var(--n-item-text-color-child-active-hover);`),w(`extra`,`color: var(--n-item-text-color-child-active-hover);`)])])]),s(`selected`,[Q(null,[S(`&::before`,`background-color: var(--n-item-color-active-hover);`)])]),Q(null,yt)]),w(`icon`,`
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
 `),w(`arrow`,`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),l(`menu-item-content-header`,`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[S(`a`,`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[S(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),w(`extra`,`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),l(`submenu`,`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[l(`menu-item-content`,`
 height: var(--n-item-height);
 `),l(`submenu-children`,`
 overflow: hidden;
 padding: 0;
 `,[Ee({duration:`.2s`})])]),l(`menu-item-group`,[l(`menu-item-group-title`,`
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
 `)])]),l(`menu-tooltip`,[S(`a`,`
 color: inherit;
 text-decoration: none;
 `)]),l(`menu-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function Q(e,t){return[s(`hover`,e,t),S(`&:hover`,e,t)]}var St=D({name:`MenuDivider`,setup(){let{mergedClsPrefixRef:e,isHorizontalRef:t}=q(Z);return()=>t.value?null:(I(),H(`div`,{key:1,class:_(`${e.value}-menu-divider`)},null,2))}}),Ct=D({name:`ChevronDownFilled`,render(){return(()=>{let e=T(`f3af82a2aab086a5`);return e[0]||=K(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[K(`path`,{d:`M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z`,fill:`currentColor`})],-1)})()}}),wt=[`onClick`],Tt=D({name:`MenuOptionContent`,props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){let{props:t}=q(Z);return{menuProps:t,style:L(()=>{let{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:L(()=>{let{maxIconSize:t,activeIconSize:n,iconMarginRight:r}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${n}px`,marginRight:`${r}px`}})}},render(){let{clsPrefix:e,tmNode:t,menuProps:{renderIcon:n,renderLabel:r,renderExtra:i,expandIcon:a}}=this,o=n?n(t.rawNode):Y(this.icon);return(()=>{let n=T(`7bb10afc6caf8fa4`);return I(),H(`div`,{onClick:e=>{this.onClick?.(e)},role:`none`,class:_([`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}]),style:k(this.style)},[G(()=>o&&(I(),H(`div`,{class:_(`${e}-menu-item-content__icon`),style:k(this.iconStyle),role:`none`},[G(()=>[o])],6))),K(`div`,{class:_(`${e}-menu-item-content-header`),role:`none`},[this.isEllipsisPlaceholder?(I(),H(O,{key:0},[G(()=>this.title)],64)):(I(),H(O,{key:1},[r?(I(),H(O,{key:0},[G(()=>r(t.rawNode))],64)):(I(),H(O,{key:1},[G(()=>Y(this.title))],64))],64)),this.extra||i?(I(),H(`span`,{key:2,class:_(`${e}-menu-item-content-header__extra`)},[n[0]||=G(` `,-1),i?(I(),H(O,{key:0},[G(()=>i(t.rawNode))],64)):(I(),H(O,{key:1},[G(()=>Y(this.extra))],64))],2)):G(()=>null)],2),this.showArrow?(I(),A(v,{key:0,ariaHidden:!0,class:_(`${e}-menu-item-content__arrow`),clsPrefix:e},{default:()=>a?a(t.rawNode):(I(),A(Ct,{key:1}))},1032,[`class`,`clsPrefix`])):G(()=>null)],14,wt)})()}}),Et=8;function $(e){let t=q(Z),{props:n,mergedCollapsedRef:r}=t,i=q(_t,null),a=q(vt,null),o=L(()=>n.mode===`horizontal`),s=L(()=>o.value?n.dropdownPlacement:`tmNodes`in e?`right-start`:`right`),c=L(()=>Math.max(n.collapsedIconSize??n.iconSize,n.iconSize));return{dropdownPlacement:s,activeIconSize:L(()=>!o.value&&e.root&&r.value?n.collapsedIconSize??n.iconSize:n.iconSize),maxIconSize:c,paddingLeft:L(()=>{if(o.value)return;let{collapsedWidth:t,indent:s,rootIndent:l}=n,{root:u,isGroup:d}=e,f=l===void 0?s:l;return u?r.value?t/2-c.value/2:f:a&&typeof a.paddingLeftRef.value==`number`?r.value?t/2-c.value/2:s/2+a.paddingLeftRef.value:i&&typeof i.paddingLeftRef.value==`number`?(d?s/2:s)+i.paddingLeftRef.value:0}),iconMarginRight:L(()=>{let{collapsedWidth:t,indent:i,rootIndent:a}=n,{value:s}=c,{root:l}=e;return o.value||!l||!r.value?Et:(a===void 0?i:a)+s+Et-(t+s)/2}),NMenu:t,NSubmenu:i,NMenuOptionGroup:a}}var Dt={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},Ot={...Dt,tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function},kt=ue(Ot),At=D({name:`MenuOption`,props:Ot,setup(e){let t=$(e),{NSubmenu:n,NMenu:r,NMenuOptionGroup:i}=t,{props:a,mergedClsPrefixRef:o,mergedCollapsedRef:s}=r,c=n?n.mergedDisabledRef:i?i.mergedDisabledRef:{value:!1},l=L(()=>c.value||e.disabled);function u(t){let{onClick:n}=e;n&&n(t)}function d(t){l.value||(r.doSelect(e.internalKey,e.tmNode.rawNode),u(t))}return{mergedClsPrefix:o,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:r.mergedThemeRef,menuProps:a,dropdownEnabled:p(()=>e.root&&s.value&&a.mode!==`horizontal`&&!l.value),selected:p(()=>r.mergedValueRef.value===e.internalKey),mergedDisabled:l,handleClick:d}},render(){let{mergedClsPrefix:e,mergedTheme:t,tmNode:r,menuProps:{renderLabel:i,nodeProps:a}}=this,o=a?.(r.rawNode);return I(),H(`div`,n(o,{role:`menuitem`,class:[`${e}-menu-item`,o?.class]}),[(I(),A(we,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:`hover`,placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:[`menu-tooltip`]},{default:()=>i?i(r.rawNode):Y(this.title),trigger:()=>(I(),A(Tt,{tmNode:r,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick},null,8,[`tmNode`,`clsPrefix`,`paddingLeft`,`iconMarginRight`,`maxIconSize`,`activeIconSize`,`selected`,`title`,`extra`,`disabled`,`icon`,`onClick`]))},1032,[`theme`,`themeOverrides`,`placement`,`disabled`]))],16)}}),jt={...Dt,tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}},Mt=ue(jt),Nt=D({name:`MenuOptionGroup`,props:jt,setup(e){let t=$(e),{NSubmenu:r}=t,i=L(()=>r?.mergedDisabledRef.value?!0:e.tmNode.disabled);m(vt,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:i});let{mergedClsPrefixRef:a,props:o}=q(Z);return function(){let{value:r}=a,i=t.paddingLeft.value,{nodeProps:s}=o,c=s?.(e.tmNode.rawNode);return(()=>{let t=T(`45eca6a63be5028b`);return I(),H(`div`,{class:_(`${r}-menu-item-group`),role:`group`},[K(`div`,n(c,{class:[`${r}-menu-item-group-title`,c?.class],style:[c?.style||``,i===void 0?``:`padding-left: ${i}px;`]}),[G(()=>Y(e.title)),e.extra?(I(),H(O,{key:0},[t[0]||=G(` `,-1),G(()=>Y(e.extra))],64)):G(()=>null)],16),K(`div`,null,[G(()=>e.tmNodes.map(e=>Vt(e,o)))])],2)})()}}}),Pt=[`aria-expanded`,`id`],Ft=[`aria-expanded`,`id`],It={...Dt,rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean},Lt=ue(It),Rt=D({name:`Submenu`,props:It,setup(e){let t=$(e),{NMenu:n,NSubmenu:r}=t,{props:i,mergedCollapsedRef:a,mergedThemeRef:o}=n,s=L(()=>{let{disabled:t}=e;return r?.mergedDisabledRef.value||i.disabled?!0:t}),c=E(!1);m(_t,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:s}),m(vt,null);function l(){let{onClick:t}=e;t&&t()}function u(){s.value||(a.value||n.toggleExpand(e.internalKey),l())}function d(e){c.value=e}return{menuProps:i,mergedTheme:o,doSelect:n.doSelect,inverted:n.invertedRef,isHorizontal:n.isHorizontalRef,mergedClsPrefix:n.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:c,paddingLeft:t.paddingLeft,mergedDisabled:s,mergedValue:n.mergedValueRef,childActive:p(()=>e.virtualChildActive??n.activePathRef.value.includes(e.internalKey)),collapsed:L(()=>i.mode===`horizontal`?!1:a.value?!0:!n.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:L(()=>!s.value&&(i.mode===`horizontal`||a.value)),handlePopoverShowChange:d,handleClick:u}},render(){let{mergedClsPrefix:e,menuProps:{renderIcon:t,renderLabel:r}}=this,i=()=>{let{isHorizontal:e,paddingLeft:t,collapsed:r,mergedDisabled:i,maxIconSize:a,activeIconSize:o,title:s,childActive:c,icon:l,handleClick:u,menuProps:{nodeProps:d},dropdownShow:f,iconMarginRight:p,tmNode:m,mergedClsPrefix:h,isEllipsisPlaceholder:g,extra:_}=this,v=d?.(m.rawNode);return I(),H(`div`,n(v,{class:[`${h}-menu-item`,v?.class],role:`menuitem`}),[(I(),A(Tt,{tmNode:m,paddingLeft:t,collapsed:r,disabled:i,iconMarginRight:p,maxIconSize:a,activeIconSize:o,title:s,extra:_,showArrow:!e,childActive:c,clsPrefix:h,icon:l,hover:f,onClick:u,isEllipsisPlaceholder:g},null,8,[`tmNode`,`paddingLeft`,`collapsed`,`disabled`,`iconMarginRight`,`maxIconSize`,`activeIconSize`,`title`,`extra`,`showArrow`,`childActive`,`clsPrefix`,`icon`,`hover`,`onClick`,`isEllipsisPlaceholder`]))],16)},a=()=>(I(),A(y,null,{default:()=>{let{tmNodes:t,collapsed:n}=this;return n?null:(I(),H(`div`,{key:1,class:_(`${e}-submenu-children`),role:`menu`},[G(()=>t.map(e=>Vt(e,this.menuProps)))],2))}},1024));return this.root?(I(),A(Ce,n({key:2,size:`large`,trigger:`hover`},this.menuProps?.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:`14px`,optionIconSizeLarge:`18px`},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:r}),{default:()=>(I(),H(`div`,{class:_(`${e}-submenu`),role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},[G(()=>i()),this.isHorizontal?G(()=>null):(I(),H(O,{key:1},[G(()=>a())],64))],10,Pt))},1040,[`themeOverrides`,`theme`,`value`,`disabled`,`placement`,`keyField`,`labelField`,`childrenField`,`onUpdateShow`,`options`,`onSelect`,`inverted`,`renderIcon`,`renderLabel`])):(I(),H(`div`,{key:3,class:_(`${e}-submenu`),role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},[G(()=>i()),G(()=>a())],10,Ft))}});function zt(e){return e.type===`divider`||e.type===`render`}function Bt(e){return e.type===`divider`}function Vt(e,t){let{rawNode:r}=e,{show:i}=r;if(i===!1)return null;if(zt(r))return Bt(r)?(I(),A(St,n({key:e.key},r.props),null,16)):null;let{labelField:a}=t,{key:o,level:s,isGroup:c}=e,l={...r,title:r.title||r[a],extra:r.titleExtra||r.extra,key:o,internalKey:o,level:s,root:s===0,isGroup:c};return e.children?e.isGroup?J(Nt,ge(l,Mt,{tmNode:e,tmNodes:e.children,key:o})):J(Rt,ge(l,Lt,{key:o,rawNodes:r[t.childrenField],tmNodes:e.children,tmNode:e})):J(At,ge(l,kt,{key:o,tmNode:e}))}var Ht={...e.props,options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},disabledField:{type:String,default:`disabled`},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:`vertical`},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:`bottom`},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array},Ut=D({name:`Menu`,inheritAttrs:!1,props:Ht,setup(n){let{mergedClsPrefixRef:r,inlineThemeDisabled:i}=B(n),o=e(`Menu`,`-menu`,xt,Ne,n,r),s=q(Qe,null),c=L(()=>{let{collapsed:e}=n;if(e!==void 0)return e;if(s){let{collapseModeRef:e,collapsedRef:t}=s;if(e.value===`width`)return t.value??!1}return!1}),l=L(()=>{let{keyField:e,childrenField:t,disabledField:r}=n;return le(n.items||n.options,{getIgnored(e){return zt(e)},getChildren(e){return e[t]},getDisabled(e){return e[r]},getKey(t){return t[e]??t.name}})}),u=L(()=>new Set(l.value.treeNodes.map(e=>e.key))),{watchProps:d}=n,f=E(null);d?.includes(`defaultValue`)?t(()=>{f.value=n.defaultValue}):f.value=n.defaultValue;let p=W(n,`value`),h=_e(p,f),g=E([]),_=()=>{g.value=n.defaultExpandAll?l.value.getNonLeafKeys():n.defaultExpandedNames||n.defaultExpandedKeys||l.value.getPath(h.value,{includeSelf:!1}).keyPath};d?.includes(`defaultExpandedKeys`)?t(_):_();let v=ve(n,[`expandedNames`,`expandedKeys`]),y=_e(v,g),x=L(()=>l.value.treeNodes),S=L(()=>l.value.getPath(h.value).keyPath);m(Z,{props:n,mergedCollapsedRef:c,mergedThemeRef:o,mergedValueRef:h,mergedExpandedKeysRef:y,activePathRef:S,mergedClsPrefixRef:r,isHorizontalRef:L(()=>n.mode===`horizontal`),invertedRef:W(n,`inverted`),doSelect:C,toggleExpand:ee});function C(e,t){let{"onUpdate:value":r,onUpdateValue:i,onSelect:o}=n;i&&a(i,e,t),r&&a(r,e,t),o&&a(o,e,t),f.value=e}function w(e){let{"onUpdate:expandedKeys":t,onUpdateExpandedKeys:r,onExpandedNamesChange:i,onOpenNamesChange:o}=n;t&&a(t,e),r&&a(r,e),i&&a(i,e),o&&a(o,e),g.value=e}function ee(e){let t=Array.from(y.value),r=t.findIndex(t=>t===e);if(~r)t.splice(r,1);else{if(n.accordion&&u.value.has(e)){let e=t.findIndex(e=>u.value.has(e));e>-1&&t.splice(e,1)}t.push(e)}w(t)}let T=e=>{let t=l.value.getPath(e??h.value,{includeSelf:!1}).keyPath;if(!t.length)return;let r=Array.from(y.value),i=new Set([...r,...t]);n.accordion&&u.value.forEach(e=>{i.has(e)&&!t.includes(e)&&i.delete(e)}),w(Array.from(i))},D=L(()=>{let{inverted:e}=n,{common:{cubicBezierEaseInOut:t},self:r}=o.value,{borderRadius:i,borderColorHorizontal:a,fontSize:s,itemHeight:c,dividerColor:l}=r,u={"--n-divider-color":l,"--n-bezier":t,"--n-font-size":s,"--n-border-color-horizontal":a,"--n-border-radius":i,"--n-item-height":c};return e?(u[`--n-group-text-color`]=r.groupTextColorInverted,u[`--n-color`]=r.colorInverted,u[`--n-item-text-color`]=r.itemTextColorInverted,u[`--n-item-text-color-hover`]=r.itemTextColorHoverInverted,u[`--n-item-text-color-active`]=r.itemTextColorActiveInverted,u[`--n-item-text-color-child-active`]=r.itemTextColorChildActiveInverted,u[`--n-item-text-color-child-active-hover`]=r.itemTextColorChildActiveInverted,u[`--n-item-text-color-active-hover`]=r.itemTextColorActiveHoverInverted,u[`--n-item-icon-color`]=r.itemIconColorInverted,u[`--n-item-icon-color-hover`]=r.itemIconColorHoverInverted,u[`--n-item-icon-color-active`]=r.itemIconColorActiveInverted,u[`--n-item-icon-color-active-hover`]=r.itemIconColorActiveHoverInverted,u[`--n-item-icon-color-child-active`]=r.itemIconColorChildActiveInverted,u[`--n-item-icon-color-child-active-hover`]=r.itemIconColorChildActiveHoverInverted,u[`--n-item-icon-color-collapsed`]=r.itemIconColorCollapsedInverted,u[`--n-item-text-color-horizontal`]=r.itemTextColorHorizontalInverted,u[`--n-item-text-color-hover-horizontal`]=r.itemTextColorHoverHorizontalInverted,u[`--n-item-text-color-active-horizontal`]=r.itemTextColorActiveHorizontalInverted,u[`--n-item-text-color-child-active-horizontal`]=r.itemTextColorChildActiveHorizontalInverted,u[`--n-item-text-color-child-active-hover-horizontal`]=r.itemTextColorChildActiveHoverHorizontalInverted,u[`--n-item-text-color-active-hover-horizontal`]=r.itemTextColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-horizontal`]=r.itemIconColorHorizontalInverted,u[`--n-item-icon-color-hover-horizontal`]=r.itemIconColorHoverHorizontalInverted,u[`--n-item-icon-color-active-horizontal`]=r.itemIconColorActiveHorizontalInverted,u[`--n-item-icon-color-active-hover-horizontal`]=r.itemIconColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-child-active-horizontal`]=r.itemIconColorChildActiveHorizontalInverted,u[`--n-item-icon-color-child-active-hover-horizontal`]=r.itemIconColorChildActiveHoverHorizontalInverted,u[`--n-arrow-color`]=r.arrowColorInverted,u[`--n-arrow-color-hover`]=r.arrowColorHoverInverted,u[`--n-arrow-color-active`]=r.arrowColorActiveInverted,u[`--n-arrow-color-active-hover`]=r.arrowColorActiveHoverInverted,u[`--n-arrow-color-child-active`]=r.arrowColorChildActiveInverted,u[`--n-arrow-color-child-active-hover`]=r.arrowColorChildActiveHoverInverted,u[`--n-item-color-hover`]=r.itemColorHoverInverted,u[`--n-item-color-active`]=r.itemColorActiveInverted,u[`--n-item-color-active-hover`]=r.itemColorActiveHoverInverted,u[`--n-item-color-active-collapsed`]=r.itemColorActiveCollapsedInverted):(u[`--n-group-text-color`]=r.groupTextColor,u[`--n-color`]=r.color,u[`--n-item-text-color`]=r.itemTextColor,u[`--n-item-text-color-hover`]=r.itemTextColorHover,u[`--n-item-text-color-active`]=r.itemTextColorActive,u[`--n-item-text-color-child-active`]=r.itemTextColorChildActive,u[`--n-item-text-color-child-active-hover`]=r.itemTextColorChildActiveHover,u[`--n-item-text-color-active-hover`]=r.itemTextColorActiveHover,u[`--n-item-icon-color`]=r.itemIconColor,u[`--n-item-icon-color-hover`]=r.itemIconColorHover,u[`--n-item-icon-color-active`]=r.itemIconColorActive,u[`--n-item-icon-color-active-hover`]=r.itemIconColorActiveHover,u[`--n-item-icon-color-child-active`]=r.itemIconColorChildActive,u[`--n-item-icon-color-child-active-hover`]=r.itemIconColorChildActiveHover,u[`--n-item-icon-color-collapsed`]=r.itemIconColorCollapsed,u[`--n-item-text-color-horizontal`]=r.itemTextColorHorizontal,u[`--n-item-text-color-hover-horizontal`]=r.itemTextColorHoverHorizontal,u[`--n-item-text-color-active-horizontal`]=r.itemTextColorActiveHorizontal,u[`--n-item-text-color-child-active-horizontal`]=r.itemTextColorChildActiveHorizontal,u[`--n-item-text-color-child-active-hover-horizontal`]=r.itemTextColorChildActiveHoverHorizontal,u[`--n-item-text-color-active-hover-horizontal`]=r.itemTextColorActiveHoverHorizontal,u[`--n-item-icon-color-horizontal`]=r.itemIconColorHorizontal,u[`--n-item-icon-color-hover-horizontal`]=r.itemIconColorHoverHorizontal,u[`--n-item-icon-color-active-horizontal`]=r.itemIconColorActiveHorizontal,u[`--n-item-icon-color-active-hover-horizontal`]=r.itemIconColorActiveHoverHorizontal,u[`--n-item-icon-color-child-active-horizontal`]=r.itemIconColorChildActiveHorizontal,u[`--n-item-icon-color-child-active-hover-horizontal`]=r.itemIconColorChildActiveHoverHorizontal,u[`--n-arrow-color`]=r.arrowColor,u[`--n-arrow-color-hover`]=r.arrowColorHover,u[`--n-arrow-color-active`]=r.arrowColorActive,u[`--n-arrow-color-active-hover`]=r.arrowColorActiveHover,u[`--n-arrow-color-child-active`]=r.arrowColorChildActive,u[`--n-arrow-color-child-active-hover`]=r.arrowColorChildActiveHover,u[`--n-item-color-hover`]=r.itemColorHover,u[`--n-item-color-active`]=r.itemColorActive,u[`--n-item-color-active-hover`]=r.itemColorActiveHover,u[`--n-item-color-active-collapsed`]=r.itemColorActiveCollapsed),u}),O=i?b(`menu`,L(()=>n.inverted?`a`:`b`),D,n):void 0,k=he(),j=E(null),M=E(null),N=!0,P=()=>{N?N=!1:j.value?.sync({showAllItemsBeforeCalculate:!0})};function te(){return document.getElementById(k)}let F=E(-1);function ne(e){F.value=n.options.length-e}function re(e){e||(F.value=-1)}let R=L(()=>{let e=F.value;return{children:e===-1?[]:n.options.slice(e)}}),z=L(()=>{let{childrenField:e,disabledField:t,keyField:r}=n;return le([R.value],{getIgnored(e){return zt(e)},getChildren(t){return t[e]},getDisabled(e){return e[t]},getKey(e){return e[r]??e.name}})}),V=L(()=>le([{}]).treeNodes[0]);function H(){if(F.value===-1)return I(),A(Rt,{root:!0,level:0,key:`__ellpisisGroupPlaceholder__`,internalKey:`__ellpisisGroupPlaceholder__`,title:`···`,tmNode:V.value,domId:k,isEllipsisPlaceholder:!0},null,8,[`tmNode`,`domId`]);let e=z.value.treeNodes[0],t=S.value,n=!!e.children?.some(e=>t.includes(e.key));return I(),A(Rt,{level:0,root:!0,key:`__ellpisisGroup__`,internalKey:`__ellpisisGroup__`,title:`···`,virtualChildActive:n,tmNode:e,domId:k,rawNodes:e.rawNode.children||[],tmNodes:e.children||[],isEllipsisPlaceholder:!0},null,8,[`virtualChildActive`,`tmNode`,`domId`,`rawNodes`,`tmNodes`])}return{mergedClsPrefix:r,controlledExpandedKeys:v,uncontrolledExpanededKeys:g,mergedExpandedKeys:y,uncontrolledValue:f,mergedValue:h,activePath:S,tmNodes:x,mergedTheme:o,mergedCollapsed:c,cssVars:i?void 0:D,themeClass:O?.themeClass,overflowRef:j,counterRef:M,updateCounter:()=>{},onResize:P,onUpdateOverflow:re,onUpdateCount:ne,renderCounter:H,getCounter:te,onRender:O?.onRender,showOption:T,deriveResponsiveState:P}},render(){let{mergedClsPrefix:e,mode:t,themeClass:r,onRender:i}=this;i?.();let a=()=>this.tmNodes.map(e=>Vt(e,this.$props)),o=t===`horizontal`&&this.responsive,s=()=>J(`div`,n(this.$attrs,{role:t===`horizontal`?`menubar`:`menu`,class:[`${e}-menu`,r,`${e}-menu--${t}`,o&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),o?(I(),A(ce,{key:2,ref:`overflowRef`,onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:a,counter:this.renderCounter},1032,[`onUpdateOverflow`,`getCounter`,`onUpdateCount`,`updateCounter`])):a());return o?(I(),A(pe,{key:3,onResize:this.onResize},{default:s},1032,[`onResize`])):s()}}),Wt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Gt=D({name:`CubeOutline`,render:function(e,t){return I(),H(`svg`,Wt,t[0]||=[K(`path`,{d:`M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),K(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M69 153.99l187 110l187-110`},null,-1),K(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 463.99v-200`},null,-1)])}}),Kt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},qt=D({name:`DocumentTextOutline`,render:function(e,t){return I(),H(`svg`,Kt,t[0]||=[K(`path`,{d:`M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),K(`path`,{d:`M256 56v120a32 32 0 0 0 32 32h120`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),K(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h160`},null,-1),K(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 368h160`},null,-1)])}}),Jt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Yt=D({name:`GridOutline`,render:function(e,t){return I(),H(`svg`,Jt,t[0]||=[K(`rect`,{x:`48`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),K(`rect`,{x:`288`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),K(`rect`,{x:`48`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),K(`rect`,{x:`288`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Xt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Zt=D({name:`LogOutOutline`,render:function(e,t){return I(),H(`svg`,Xt,t[0]||=[K(`path`,{d:`M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),K(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M368 336l80-80l-80-80`},null,-1),K(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 256h256`},null,-1)])}}),Qt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},$t=D({name:`MenuOutline`,render:function(e,t){return I(),H(`svg`,Qt,t[0]||=[K(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 160h352`},null,-1),K(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 256h352`},null,-1),K(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 352h352`},null,-1)])}}),en={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},tn=D({name:`PulseOutline`,render:function(e,t){return I(),H(`svg`,en,t[0]||=[K(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M48 320h64l64-256l64 384l64-224l32 96h64`},null,-1),K(`circle`,{cx:`432`,cy:`320`,r:`32`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),nn={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},rn=D({name:`SettingsOutline`,render:function(e,t){return I(),H(`svg`,nn,t[0]||=[K(`path`,{d:`M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),an={key:0,class:`brand-copy`},on={class:`mobile-drawer-account`},sn={class:`account-copy`},cn={key:0,class:`section-header-scope`},ln={key:1,class:`app-header-leading`},un={class:`app-title`},dn={class:`account`},fn={class:`account-copy`},pn=[`aria-label`],mn={class:`update-banner-body`},hn=D({__name:`AppLayout`,setup(e){let t=Fe(),n=je(),r=Ie(),a=ye(),s=Te(),c=E(!1),l=E(null),d=E(window.innerWidth),f=L(()=>Math.min(320,Math.round(d.value*.86))),p=E(window.innerWidth<1100);function m(e,t,n,r=t){return{label:()=>J(Pe,{to:{name:t},custom:!0},{default:({href:t,isExactActive:n,navigate:r})=>J(`a`,{href:t,"aria-current":n?`page`:void 0,onClick:r},e)}),key:r,icon:()=>J(X,null,{default:()=>J(n)})}}let h=[m(`运行概览`,`dashboard`,Yt),m(`连接活动`,`connections`,Le),m(`配置中心`,`orchestration`,qt,`configuration`),m(`资源管理`,`versions`,Gt,`resources`),m(`排障中心`,`diagnostics`,tn,`troubleshooting`),m(`面板设置`,`settings`,rn)],_={configuration:{label:`配置中心`,icon:qt,tabs:[{name:`orchestration`,label:`代理配置`},{name:`config`,label:`配置文件`},{name:`backups`,label:`配置备份`},{name:`schema`,label:`配置参考`}]},resources:{label:`资源管理`,icon:Gt,tabs:[{name:`versions`,label:`dae 版本`},{name:`geo`,label:`Geo 数据`}]},troubleshooting:{label:`排障中心`,icon:tn,tabs:[{name:`diagnostics`,label:`故障诊断`},{name:`logs`,label:`运行日志`}]}},v=L(()=>_[t.meta.section]),y=L(()=>String(t.meta.section||t.name||`dashboard`)),b=L(()=>String(t.meta.title||`kdae-panel`));async function S(){try{await r.logout(),await n.replace({name:`login`})}catch(e){a.error(e instanceof Error?e.message:`退出登录失败`)}}function C(){r.clearSession(),n.replace({name:`login`}),a.warning(`登录会话已过期，请重新登录`)}function w(){d.value=window.innerWidth,!s.value&&window.innerWidth<1100&&(p.value=!0)}function ee(){l.value?.querySelector(`.n-menu-item-content--selected a`)?.focus({preventScroll:!0})}se(s,()=>{c.value=!1});let T=E(null),D=E(!1);async function k(){try{T.value=await te(`/api/v1/panel/update`)}catch{T.value=null}}function j(e){let t=e.detail;T.value&&t&&(T.value.status=t)}return re(()=>{window.addEventListener(`kdae-panel:auth-expired`,C),window.addEventListener(`kdae-panel:self-update-changed`,j),window.addEventListener(`resize`,w),k()}),i(()=>{window.removeEventListener(`kdae-panel:auth-expired`,C),window.removeEventListener(`kdae-panel:self-update-changed`,j),window.removeEventListener(`resize`,w)}),(e,n)=>{let i=o(`RouterView`);return I(),A(U(it),{"has-sider":!U(s),class:`app-shell`},{default:x(()=>[U(s)?M(``,!0):(I(),A(U(gt),{key:0,class:`app-sidebar`,bordered:``,"collapse-mode":`width`,"collapsed-width":64,width:236,collapsed:p.value,"show-trigger":`bar`,onCollapse:n[0]||=e=>p.value=!0,onExpand:n[1]||=e=>p.value=!1},{default:x(()=>[K(`div`,{class:F([`brand`,{compact:p.value}])},[n[8]||=K(`div`,{class:`brand-mark`},`K`,-1),p.value?M(``,!0):(I(),H(`div`,an,[...n[7]||=[K(`strong`,null,`kdae-panel`,-1),K(`span`,null,`零侵入管理面板`,-1)]]))],2),N(U(Ut),{value:y.value,collapsed:p.value,"collapsed-width":64,"collapsed-icon-size":22,options:h},null,8,[`value`,`collapsed`])]),_:1},8,[`collapsed`])),N(U(ke),{show:c.value,"onUpdate:show":n[3]||=e=>c.value=e,placement:`left`,width:f.value,"auto-focus":!1,onAfterEnter:ee},{default:x(()=>[N(U(Ae),{class:`mobile-nav-drawer`,"native-scrollbar":!1,"body-content-style":`padding: 0;`},{footer:x(()=>[K(`div`,on,[N(U(Ye),{round:``,size:`small`},{default:x(()=>[P(z(U(r).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),K(`div`,sn,[K(`strong`,null,z(U(r).user?.username),1),n[9]||=K(`span`,null,`管理员`,-1)]),N(U(V),{quaternary:``,circle:``,title:`退出登录`,"aria-label":`退出登录`,onClick:S},{icon:x(()=>[N(U(X),null,{default:x(()=>[N(U(Zt))]),_:1})]),_:1})])]),default:x(()=>[n[10]||=K(`div`,{class:`brand mobile-drawer-brand`},[K(`div`,{class:`brand-mark`},`K`),K(`div`,{class:`brand-copy`},[K(`strong`,null,`kdae-panel`),K(`span`,null,`零侵入管理面板`)])],-1),K(`div`,{ref_key:`mobileNavRef`,ref:l},[N(U(Ut),{value:y.value,options:h,"onUpdate:value":n[2]||=e=>c.value=!1},null,8,[`value`])],512)]),_:1})]),_:1},8,[`show`,`width`]),N(U(it),{class:`app-main`},{default:x(()=>[N(U(ct),{bordered:``,class:F([`app-header`,{"section-header":v.value}])},{default:x(()=>[v.value?(I(),H(`div`,cn,[U(s)?(I(),A(U(V),{key:0,quaternary:``,circle:``,class:`mobile-nav-trigger`,title:`打开导航`,"aria-label":`打开导航`,onClick:n[4]||=e=>c.value=!0},{icon:x(()=>[N(U(X),null,{default:x(()=>[N(U($t))]),_:1})]),_:1})):M(``,!0),N(U(X),{size:`17`},{default:x(()=>[(I(),A(u(v.value.icon)))]),_:1}),K(`strong`,null,z(v.value.label),1)])):(I(),H(`div`,ln,[U(s)?(I(),A(U(V),{key:0,quaternary:``,circle:``,class:`mobile-nav-trigger`,title:`打开导航`,"aria-label":`打开导航`,onClick:n[5]||=e=>c.value=!0},{icon:x(()=>[N(U(X),null,{default:x(()=>[N(U($t))]),_:1})]),_:1})):M(``,!0),K(`div`,un,[N(U(xe),{depth:`3`,class:`eyebrow`},{default:x(()=>[...n[11]||=[P(`KDAE CONTROL PLANE`,-1)]]),_:1}),K(`h1`,null,z(b.value),1)])])),K(`div`,dn,[N(U(Ye),{round:``,size:`small`},{default:x(()=>[P(z(U(r).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),K(`div`,fn,[K(`strong`,null,z(U(r).user?.username),1),n[12]||=K(`span`,null,`管理员`,-1)]),N(U(V),{quaternary:``,circle:``,title:`退出登录`,onClick:S},{icon:x(()=>[N(U(X),null,{default:x(()=>[N(U(Zt))]),_:1})]),_:1})]),v.value?(I(),H(`nav`,{key:2,class:`section-tabs`,"aria-label":`${v.value.label}子页面`},[(I(!0),H(O,null,g(v.value.tabs,e=>(I(),A(U(Pe),{key:e.name,to:{name:e.name},class:F([`section-tab`,{active:U(t).name===e.name}])},{default:x(()=>[P(z(e.label),1)]),_:2},1032,[`to`,`class`]))),128))],8,pn)):M(``,!0)]),_:1},8,[`class`]),N(U(at),{class:F([`app-content`,{"section-content":v.value}]),"content-style":`padding: var(--page-padding);`},{default:x(()=>[T.value?.check.updateAvailable&&!D.value?(I(),A(U(Oe),{key:0,type:`info`,closable:``,class:`update-banner`,onClose:n[6]||=e=>D.value=!0},{default:x(()=>[K(`div`,mn,[K(`span`,null,[n[13]||=P(` 面板有新版本 `,-1),K(`strong`,null,z(T.value.check.latest),1),P(`（当前 `+z(T.value.check.current)+`）。 `,1),T.value.status?.enabled&&T.value.status.updatable?(I(),H(O,{key:0},[P(`升级会替换面板二进制并重启自身，配置与账号数据都会保留。`)],64)):T.value.status&&!T.value.status.enabled?(I(),H(O,{key:1},[P(`可直接在这里启用一键升级，不需要 SSH。`)],64)):T.value.status?.problem?(I(),H(O,{key:2},[P(`当前无法一键升级：`+z(T.value.status.problem),1)],64)):(I(),H(O,{key:3},[P(`当前部署不支持一键升级，可重新执行一键部署命令。`)],64)),n[14]||=K(`a`,{href:`https://github.com/tuoro/kdae-panel/releases/latest`,target:`_blank`,rel:`noopener`},`查看发布说明`,-1)]),N(Re,{payload:T.value,label:`立即升级`},null,8,[`payload`])])]),_:1})):M(``,!0),N(i)]),_:1},8,[`class`])]),_:1})]),_:1},8,[`has-sider`])}}});export{hn as default};