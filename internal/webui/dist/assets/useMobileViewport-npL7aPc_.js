import{$t as e,An as t,En as n,Et as r,Ft as i,In as a,It as o,Jt as s,Kn as c,Lt as l,Nn as u,Nt as d,On as f,Pn as p,Qt as m,Yt as h,Zt as g,an as _,cr as v,en as y,fn as b,ft as x,gn as S,ir as C,j as w,nr as T,pt as E,rr as D,v as O,wn as k,wt as A,zn as j}from"./client-Bvr5b7kq.js";import{i as M,t as N}from"./create-C5P9jhr1.js";import{f as P,g as F,p as I,r as L}from"./light-BJ0f_k_W.js";import{t as R}from"./utils-DlsUDt7q.js";import{c as z,i as B,n as V,r as ee,s as te,t as H}from"./Popover-DxlZq7XZ.js";import{t as ne}from"./use-merged-state-6Ad8uSz9.js";import{t as re}from"./Icon-DTSlz0m2.js";import{E as ie,j as U,v as ae,y as oe}from"./index-DdA6q9Ln.js";function se(e={},t){let n=T({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:i}=e,a=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}r!==void 0&&Object.keys(r).forEach(t=>{if(t!==e.key)return;let n=r[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},s=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}i!==void 0&&Object.keys(i).forEach(t=>{if(t!==e.key)return;let n=i[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},d=()=>{(t===void 0||t.value)&&(l(`keydown`,document,a),l(`keyup`,document,s)),t!==void 0&&c(t,e=>{e?(l(`keydown`,document,a),l(`keyup`,document,s)):(o(`keydown`,document,a),o(`keyup`,document,s))})};return R()?(u(d),p(()=>{(t===void 0||t.value)&&(o(`keydown`,document,a),o(`keyup`,document,s))})):d(),D(n)}function ce(e,t,n){if(!t)return e;let r=C(e.value),i=null;return c(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}function W(e){return t=>{e.value=t?t.$el:null}}var G=k({name:`ChevronRight`,render(){return n(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},n(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`}))}}),le=Object.assign(Object.assign({},V),w.props),ue=k({name:`Tooltip`,props:le,slots:Object,__popover__:!0,setup(e){let{mergedClsPrefixRef:t}=E(e),n=w(`Tooltip`,`-tooltip`,void 0,ae,e,t),r=C(null);return Object.assign(Object.assign({},{syncPosition(){r.value.syncPosition()},setShow(e){r.value.setShow(e)}}),{popoverRef:r,mergedTheme:n,popoverThemeOverrides:S(()=>n.value.self)})},render(){let{mergedTheme:e,internalExtraClass:t}=this;return n(H,Object.assign(Object.assign({},this.$props),{theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:t.concat(`tooltip`),ref:`popoverRef`}),this.$slots)}}),K=d(`n-dropdown-menu`),q=d(`n-dropdown`),J=d(`n-dropdown-option`),Y=k({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return n(`div`,{class:`${this.clsPrefix}-dropdown-divider`})}}),de=k({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=f(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=f(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:r,nodeProps:i,renderLabel:a,renderOption:o}=this,{rawNode:s}=this.tmNode,c=n(`div`,Object.assign({class:`${e}-dropdown-option`},i?.(s)),n(`div`,{class:`${e}-dropdown-option-body ${e}-dropdown-option-body--group`},n(`div`,{"data-dropdown-option":!0,class:[`${e}-dropdown-option-body__prefix`,r&&`${e}-dropdown-option-body__prefix--show-icon`]},U(s.icon)),n(`div`,{class:`${e}-dropdown-option-body__label`,"data-dropdown-option":!0},a?a(s):U(s.title??s[this.labelField])),n(`div`,{class:[`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return o?o({node:c,option:s}):c}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function fe(e){return e.type===`group`}function Z(e){return e.type===`divider`}function pe(e){return e.type===`render`}var Q=k({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=f(q),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:o,activeKeyPathRef:s,animatedRef:c,mergedShowRef:l,renderLabelRef:u,renderIconRef:d,labelFieldRef:p,childrenFieldRef:m,renderOptionRef:h,nodePropsRef:g,menuPropsRef:_}=t,v=f(J,null),y=f(K),b=f(P),x=S(()=>e.tmNode.rawNode),w=S(()=>{let{value:t}=m;return X(e.tmNode.rawNode,t)}),T=S(()=>{let{disabled:t}=e.tmNode;return t}),E=ce(S(()=>{if(!w.value)return!1;let{key:t,disabled:i}=e.tmNode;if(i)return!1;let{value:s}=n,{value:c}=r,{value:l}=a,{value:u}=o;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,S(()=>r.value===null&&!c.value)),D=S(()=>!!v?.enteringSubmenuRef.value),O=C(!1);j(J,{enteringSubmenuRef:O});function k(){O.value=!0}function A(){O.value=!1}function N(){let{parentKey:t,tmNode:i}=e;i.disabled||l.value&&(a.value=t,r.value=null,n.value=i.key)}function F(){let{tmNode:t}=e;t.disabled||l.value&&n.value!==t.key&&N()}function I(t){if(e.tmNode.disabled||!l.value)return;let{relatedTarget:r}=t;r&&!M({target:r},`dropdownOption`)&&!M({target:r},`scrollbarRail`)&&(n.value=null)}function L(){let{value:n}=w,{tmNode:r}=e;l.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:p,renderLabel:u,renderIcon:d,siblingHasIcon:y.showIconRef,siblingHasSubmenu:y.hasSubmenuRef,menuProps:_,popoverBody:b,animated:c,mergedShowSubmenu:S(()=>E.value&&!D.value),rawNode:x,hasSubmenu:w,pending:i(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:i(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:i(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:T,renderOption:h,nodeProps:g,handleClick:L,handleMouseMove:F,handleMouseEnter:N,handleMouseLeave:I,handleSubmenuBeforeEnter:k,handleSubmenuAfterEnter:A}},render(){let{animated:e,rawNode:r,mergedShowSubmenu:i,clsPrefix:a,siblingHasIcon:o,siblingHasSubmenu:s,renderLabel:c,renderIcon:l,renderOption:u,nodeProps:d,props:f,scrollable:p}=this,m=null;if(i){let e=this.menuProps?.call(this,r,r.children);m=n($,Object.assign({},e,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}let h={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},g=d?.(r),v=n(`div`,Object.assign({class:[`${a}-dropdown-option`,g?.class],"data-dropdown-option":!0},g),n(`div`,t(h,f),[n(`div`,{class:[`${a}-dropdown-option-body__prefix`,o&&`${a}-dropdown-option-body__prefix--show-icon`]},[l?l(r):U(r.icon)]),n(`div`,{"data-dropdown-option":!0,class:`${a}-dropdown-option-body__label`},c?c(r):U(r[this.labelField]??r.title)),n(`div`,{"data-dropdown-option":!0,class:[`${a}-dropdown-option-body__suffix`,s&&`${a}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?n(re,null,{default:()=>n(G,null)}):null)]),this.hasSubmenu?n(z,null,{default:()=>[n(te,null,{default:()=>n(`div`,{class:`${a}-dropdown-offset-container`},n(B,{show:this.mergedShowSubmenu,placement:this.placement,to:p&&this.popoverBody||void 0,teleportDisabled:!p},{default:()=>n(`div`,{class:`${a}-dropdown-menu-wrapper`},e?n(_,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>m}):m)}))})]}):null);return u?u({node:v,option:r}):v}}),me=k({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:i}=this,{children:a}=e;return n(b,null,n(de,{clsPrefix:i,tmNode:e,key:e.key}),a?.map(e=>{let{rawNode:a}=e;return a.show===!1?null:Z(a)?n(Y,{clsPrefix:i,key:e.key}):e.isGroup?(r(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):n(Q,{clsPrefix:i,tmNode:e,parentKey:t,key:e.key})}))}}),he=k({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return n(`div`,t,[e?.()])}}),$=k({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=f(q);j(K,{showIconRef:S(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:S(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let r=C(null);return j(I,null),j(F,null),j(P,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:t,scrollable:r}=this,i=this.tmNodes.map(i=>{let{rawNode:a}=i;return a.show===!1?null:pe(a)?n(he,{tmNode:i,key:i.key}):Z(a)?n(Y,{clsPrefix:t,key:i.key}):fe(a)?n(me,{clsPrefix:t,tmNode:i,parentKey:e,key:i.key}):n(Q,{clsPrefix:t,tmNode:i,parentKey:e,key:i.key,props:a.props,scrollable:r})});return n(`div`,{class:[`${t}-dropdown-menu`,r&&`${t}-dropdown-menu--scrollable`],ref:`bodyRef`},r?n(O,{contentClass:`${t}-dropdown-menu__content`},{default:()=>i}):i,this.showArrow?ee({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),ge=h(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[ie(),h(`dropdown-option`,`
 position: relative;
 `,[s(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[s(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),h(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[s(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),e(`disabled`,[m(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[g(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),s(`&::before`,`background-color: var(--n-option-color-hover);`)]),m(`active`,`
 color: var(--n-option-text-color-active);
 `,[g(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),s(`&::before`,`background-color: var(--n-option-color-active);`)]),m(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[g(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),m(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),m(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[g(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[m(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),g(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[m(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),h(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),g(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),g(`suffix`,`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[m(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),h(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),h(`dropdown-menu`,`pointer-events: all;`)]),h(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),h(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),h(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),s(`>`,[h(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),e(`scrollable`,`
 padding: var(--n-padding);
 `),m(`scrollable`,[g(`content`,`
 padding: var(--n-padding);
 `)])]),_e={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},ve=Object.keys(V),ye=Object.assign(Object.assign(Object.assign({},V),_e),w.props),be=k({name:`Dropdown`,inheritAttrs:!1,props:ye,setup(e){let t=C(!1),n=ne(v(e,`show`),t),r=S(()=>{let{keyField:t,childrenField:n}=e;return N(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),a=S(()=>r.value.treeNodes),o=C(null),s=C(null),l=C(null),u=S(()=>o.value??s.value??l.value??null),d=S(()=>r.value.getPath(u.value).keyPath),f=S(()=>r.value.getPath(e.value).keyPath),p=i(()=>e.keyboard&&n.value);se({keydown:{ArrowUp:{prevent:!0,handler:F},ArrowRight:{prevent:!0,handler:P},ArrowDown:{prevent:!0,handler:I},ArrowLeft:{prevent:!0,handler:M},Enter:{prevent:!0,handler:L},Escape:k}},p);let{mergedClsPrefixRef:m,inlineThemeDisabled:h,mergedComponentPropsRef:g}=E(e),_=S(()=>e.size||g?.value?.Dropdown?.size||`medium`),b=w(`Dropdown`,`-dropdown`,ge,oe,e,m);j(q,{labelFieldRef:v(e,`labelField`),childrenFieldRef:v(e,`childrenField`),renderLabelRef:v(e,`renderLabel`),renderIconRef:v(e,`renderIcon`),hoverKeyRef:o,keyboardKeyRef:s,lastToggledSubmenuKeyRef:l,pendingKeyPathRef:d,activeKeyPathRef:f,animatedRef:v(e,`animated`),mergedShowRef:n,nodePropsRef:v(e,`nodeProps`),renderOptionRef:v(e,`renderOption`),menuPropsRef:v(e,`menuProps`),doSelect:T,doUpdateShow:D}),c(n,t=>{!e.animated&&!t&&O()});function T(t,n){let{onSelect:r}=e;r&&A(r,t,n)}function D(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&A(r,n),i&&A(i,n),t.value=n}function O(){o.value=null,s.value=null,l.value=null}function k(){D(!1)}function M(){z(`left`)}function P(){z(`right`)}function F(){z(`up`)}function I(){z(`down`)}function L(){let e=R();e?.isLeaf&&n.value&&(T(e.key,e.rawNode),D(!1))}function R(){let{value:e}=r,{value:t}=u;return!e||t===null?null:e.getNode(t)??null}function z(e){let{value:t}=u,{value:{getFirstAvailableNode:n}}=r,i=null;if(t===null){let e=n();e!==null&&(i=e.key)}else{let t=R();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(i=n.key)}}i!==null&&(o.value=null,s.value=i)}let B=S(()=>{let{inverted:t}=e,n=_.value,{common:{cubicBezierEaseInOut:r},self:i}=b.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[y(`optionIconSuffixWidth`,n)]:l,[y(`optionSuffixWidth`,n)]:u,[y(`optionIconPrefixWidth`,n)]:d,[y(`optionPrefixWidth`,n)]:f,[y(`fontSize`,n)]:p,[y(`optionHeight`,n)]:m,[y(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),V=h?x(`dropdown`,S(()=>`${_.value[0]}${e.inverted?`i`:``}`),B,e):void 0;return{mergedClsPrefix:m,mergedTheme:b,mergedSize:_,tmNodes:a,mergedShow:n,handleAfterLeave:()=>{e.animated&&O()},doUpdateShow:D,cssVars:h?void 0:B,themeClass:V?.themeClass,onRender:V?.onRender}},render(){let e=(e,r,i,a,o)=>{var s;let{mergedClsPrefix:c,menuProps:l}=this;(s=this.onRender)==null||s.call(this);let u=l?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},d={ref:W(r),class:[e,`${c}-dropdown`,`${c}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:c,tmNodes:this.tmNodes,style:[...i,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:a,onMouseleave:o};return n($,t(this.$attrs,d,u))},{mergedTheme:r}=this,i={show:this.mergedShow,theme:r.peers.Popover,themeOverrides:r.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return n(H,Object.assign({},L(this.$props,ve),i),{trigger:()=>{var e;return(e=this.$slots).default?.call(e)}})}}),xe=`(max-width: 767px)`;function Se(){let e=window.matchMedia(xe),t=C(e.matches),n=e=>{t.value=e.matches};return a(()=>e.addEventListener(`change`,n)),p(()=>e.removeEventListener(`change`,n)),D(t)}export{W as a,G as i,be as n,ue as r,Se as t};