import{$t as e,Cn as t,Ct as n,Fn as r,G as i,H as a,K as o,Nn as s,Rn as c,Sn as l,Tn as u,Un as d,W as f,Wn as p,X as m,Y as h,Zn as g,_n as _,an as v,cr as y,dt as b,en as x,in as S,jn as C,k as w,kn as T,lr as E,lt as D,nn as O,pr as k,pt as A,rn as j,sr as M,un as N,ut as P,vt as ee,xn as F,xt as I,zn as L}from"./client-3GjT0YO-.js";import{a as R,h as z,i as B,l as te,o as V,r as ne,t as re,u as ie}from"./create-EeAxawtt.js";import{t as ae}from"./utils-BnO-FBMM.js";import{t as oe}from"./use-merged-state-DuBoFKO_.js";import{t as se}from"./Icon-Bv9cEogU.js";import{F as ce,L as H,Q as le,nt as ue,rt as de,tt as U,x as fe}from"./index-CTeeybPj.js";function pe(e={},t){let n=M({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:a}=e,s=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}r!==void 0&&Object.keys(r).forEach(t=>{if(t!==e.key)return;let n=r[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},l=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}a!==void 0&&Object.keys(a).forEach(t=>{if(t!==e.key)return;let n=a[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},u=()=>{(t===void 0||t.value)&&(o(`keydown`,document,s),o(`keyup`,document,l)),t!==void 0&&g(t,e=>{e?(o(`keydown`,document,s),o(`keyup`,document,l)):(i(`keydown`,document,s),i(`keyup`,document,l))})};return ae()?(c(u),L(()=>{(t===void 0||t.value)&&(i(`keydown`,document,s),i(`keyup`,document,l))})):u(),y(n)}var W=T({name:`ChevronRight`,render(){return(()=>{let e=D(`6ab04425f4fcb756`);return e[0]||=l(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[l(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`})],-1)})()}});function G(e){return t=>{e.value=t?t.$el:null}}var K=I(`n-dropdown-menu`),q=I(`n-dropdown`),J=I(`n-dropdown-option`),Y=T({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return d(),u(`div`,{class:P(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function me(e){return e.type===`group`}function Z(e){return e.type===`divider`}function he(e){return e.type===`render`}function ge(e,t,n){if(!t)return e;let r=E(e.value),i=null;return g(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Q=T({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=s(q),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:i,pendingKeyPathRef:a,activeKeyPathRef:o,animatedRef:c,mergedShowRef:l,renderLabelRef:u,renderIconRef:d,labelFieldRef:m,childrenFieldRef:h,renderOptionRef:g,nodePropsRef:_,menuPropsRef:v}=t,y=s(J,null),b=s(K),x=s(U),S=F(()=>e.tmNode.rawNode),C=F(()=>{let{value:t}=h;return X(e.tmNode.rawNode,t)}),w=F(()=>{let{disabled:t}=e.tmNode;return t}),T=ge(F(()=>{if(!C.value)return!1;let{key:t,disabled:o}=e.tmNode;if(o)return!1;let{value:s}=n,{value:c}=r,{value:l}=i,{value:u}=a;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,F(()=>r.value===null&&!c.value)),D=F(()=>!!y?.enteringSubmenuRef.value),O=E(!1);p(J,{enteringSubmenuRef:O});function k(){O.value=!0}function A(){O.value=!1}function j(){let{parentKey:t,tmNode:a}=e;a.disabled||l.value&&(i.value=t,r.value=null,n.value=a.key)}function M(){let{tmNode:t}=e;t.disabled||l.value&&n.value!==t.key&&j()}function N(t){if(e.tmNode.disabled||!l.value)return;let{relatedTarget:r}=t;r&&!z({target:r},`dropdownOption`)&&!z({target:r},`scrollbarRail`)&&(n.value=null)}function P(){let{value:n}=C,{tmNode:r}=e;l.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:m,renderLabel:u,renderIcon:d,siblingHasIcon:b.showIconRef,siblingHasSubmenu:b.hasSubmenuRef,menuProps:v,popoverBody:x,animated:c,mergedShowSubmenu:F(()=>T.value&&!D.value),rawNode:S,hasSubmenu:C,pending:f(()=>{let{value:t}=a,{key:n}=e.tmNode;return t.includes(n)}),childActive:f(()=>{let{value:t}=o,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:f(()=>{let{value:t}=o,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:w,renderOption:g,nodeProps:_,handleClick:P,handleMouseMove:M,handleMouseEnter:j,handleMouseLeave:N,handleSubmenuBeforeEnter:k,handleSubmenuAfterEnter:A}},render(){let{animated:e,rawNode:n,mergedShowSubmenu:i,clsPrefix:a,siblingHasIcon:o,siblingHasSubmenu:s,renderLabel:c,renderIcon:l,renderOption:f,nodeProps:p,props:m,scrollable:h}=this,g=null;if(i){let e=this.menuProps?.(n,n.children);g=(n=>(d(),t($,r({key:1},e,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(g)}let v={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},y=p?.(n),x=(d(),u(`div`,r({class:[`${a}-dropdown-option`,y?.class],"data-dropdown-option":!0},y),[A(()=>C(`div`,r(v,m),[(d(),u(`div`,{class:P([`${a}-dropdown-option-body__prefix`,o&&`${a}-dropdown-option-body__prefix--show-icon`])},[A(()=>[l?l(n):H(n.icon)])],2)),(d(),u(`div`,{"data-dropdown-option":!0,class:P(`${a}-dropdown-option-body__label`)},[c?(d(),u(_,{key:0},[A(()=>c(n))],64)):(d(),u(_,{key:1},[A(()=>H(n[this.labelField]??n.title))],64))],2)),(d(),u(`div`,{"data-dropdown-option":!0,class:P([`${a}-dropdown-option-body__suffix`,s&&`${a}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(d(),t(se,{key:0},{_:1,default:b(()=>(d(),t(W)))})):A(()=>null)],2))])),this.hasSubmenu?(d(),t(ie,{key:0},{default:()=>[(d(),t(te,null,{default:()=>(d(),u(`div`,{class:P(`${a}-dropdown-offset-container`)},[(d(),t(V,{show:this.mergedShowSubmenu,placement:this.placement,to:h&&this.popoverBody||void 0,teleportDisabled:!h},{default:()=>(d(),u(`div`,{class:P(`${a}-dropdown-menu-wrapper`)},[e?(d(),t(N,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>g},1032,[`onBeforeEnter`,`onAfterEnter`])):(d(),u(_,{key:1},[A(()=>g)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):A(()=>null)],16));return f?f({node:x,option:n}):x}}),_e=T({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=s(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=s(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:i,renderLabel:a,renderOption:o}=this,{rawNode:s}=this.tmNode,c=(d(),u(`div`,r({class:`${e}-dropdown-option`},i?.(s)),[l(`div`,{class:P(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[l(`div`,{"data-dropdown-option":!0,class:P([`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`])},[A(()=>H(s.icon))],2),l(`div`,{class:P(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[a?(d(),u(_,{key:0},[A(()=>a(s))],64)):(d(),u(_,{key:1},[A(()=>H(s.title??s[this.labelField]))],64))],2),l(`div`,{class:P([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return o?o({node:c,option:s}):c}}),ve=T({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:r,clsPrefix:i}=this,{children:a}=e;return d(),u(_,null,[(d(),t(_e,{clsPrefix:i,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),A(()=>a?.map(e=>{let{rawNode:a}=e;return a.show===!1?null:Z(a)?C(Y,{clsPrefix:i,key:e.key}):e.isGroup?(n(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(d(),t(Q,{clsPrefix:i,tmNode:e,parentKey:r,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),ye=T({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return C(`div`,t,[e?.()])}}),$=T({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=s(q);p(K,{showIconRef:F(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:F(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let r=E(null);return p(ue,null),p(de,null),p(U,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:n,scrollable:r}=this,i=this.tmNodes.map(i=>{let{rawNode:a}=i;return a.show===!1?null:he(a)?(d(),t(ye,{tmNode:i,key:i.key},null,8,[`tmNode`])):Z(a)?(d(),t(Y,{clsPrefix:n,key:i.key},null,8,[`clsPrefix`])):me(a)?(d(),t(ve,{clsPrefix:n,tmNode:i,parentKey:e,key:i.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(d(),t(Q,{clsPrefix:n,tmNode:i,parentKey:e,key:i.key,props:a.props,scrollable:r},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return d(),u(`div`,{class:P([`${n}-dropdown-menu`,r&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[r?(d(),t(w,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(d(),u(_,{key:1},[A(()=>i)],64)),this.showArrow?(d(),u(_,{key:2},[A(()=>R({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):A(()=>null)],2)}}),be=x(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[ce(),x(`dropdown-option`,`
 position: relative;
 `,[e(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[e(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),x(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[e(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),S(`disabled`,[j(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[O(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),e(`&::before`,`background-color: var(--n-option-color-hover);`)]),j(`active`,`
 color: var(--n-option-text-color-active);
 `,[O(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),e(`&::before`,`background-color: var(--n-option-color-active);`)]),j(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[O(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),j(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),j(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[O(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[j(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),O(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[j(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),x(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),O(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),O(`suffix`,`
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
 `,[j(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),x(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),x(`dropdown-menu`,`pointer-events: all;`)]),x(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),x(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),x(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),e(`>`,[x(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),S(`scrollable`,`
 padding: var(--n-padding);
 `),j(`scrollable`,[O(`content`,`
 padding: var(--n-padding);
 `)])]),xe={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Se=Object.keys(B),Ce={...B,...xe,...h.props},we=T({name:`Dropdown`,inheritAttrs:!1,props:Ce,setup(e){let t=E(!1),n=oe(k(e,`show`),t),r=F(()=>{let{keyField:t,childrenField:n}=e;return re(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),i=F(()=>r.value.treeNodes),o=E(null),s=E(null),c=E(null),l=F(()=>o.value??s.value??c.value??null),u=F(()=>r.value.getPath(l.value).keyPath),d=F(()=>r.value.getPath(e.value).keyPath),_=f(()=>e.keyboard&&n.value);pe({keydown:{ArrowUp:{prevent:!0,handler:M},ArrowRight:{prevent:!0,handler:j},ArrowDown:{prevent:!0,handler:N},ArrowLeft:{prevent:!0,handler:A},Enter:{prevent:!0,handler:P},Escape:O}},_);let{mergedClsPrefixRef:y,inlineThemeDisabled:b,mergedComponentPropsRef:x}=ee(e),S=F(()=>e.size||x?.value?.Dropdown?.size||`medium`),C=h(`Dropdown`,`-dropdown`,be,fe,e,y);p(q,{labelFieldRef:k(e,`labelField`),childrenFieldRef:k(e,`childrenField`),renderLabelRef:k(e,`renderLabel`),renderIconRef:k(e,`renderIcon`),hoverKeyRef:o,keyboardKeyRef:s,lastToggledSubmenuKeyRef:c,pendingKeyPathRef:u,activeKeyPathRef:d,animatedRef:k(e,`animated`),mergedShowRef:n,nodePropsRef:k(e,`nodeProps`),renderOptionRef:k(e,`renderOption`),menuPropsRef:k(e,`menuProps`),doSelect:w,doUpdateShow:T}),g(n,t=>{!e.animated&&!t&&D()});function w(t,n){let{onSelect:r}=e;r&&a(r,t,n)}function T(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&a(r,n),i&&a(i,n),t.value=n}function D(){o.value=null,s.value=null,c.value=null}function O(){T(!1)}function A(){L(`left`)}function j(){L(`right`)}function M(){L(`up`)}function N(){L(`down`)}function P(){let e=I();e?.isLeaf&&n.value&&(w(e.key,e.rawNode),T(!1))}function I(){let{value:e}=r,{value:t}=l;return!e||t===null?null:e.getNode(t)??null}function L(e){let{value:t}=l,{value:{getFirstAvailableNode:n}}=r,i=null;if(t===null){let e=n();e!==null&&(i=e.key)}else{let t=I();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(i=n.key)}}i!==null&&(o.value=null,s.value=i)}let R=F(()=>{let{inverted:t}=e,n=S.value,{common:{cubicBezierEaseInOut:r},self:i}=C.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[v(`optionIconSuffixWidth`,n)]:l,[v(`optionSuffixWidth`,n)]:u,[v(`optionIconPrefixWidth`,n)]:d,[v(`optionPrefixWidth`,n)]:f,[v(`fontSize`,n)]:p,[v(`optionHeight`,n)]:m,[v(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),z=b?m(`dropdown`,F(()=>`${S.value[0]}${e.inverted?`i`:``}`),R,e):void 0;return{mergedClsPrefix:y,mergedTheme:C,mergedSize:S,tmNodes:i,mergedShow:n,handleAfterLeave:()=>{e.animated&&D()},doUpdateShow:T,cssVars:b?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender}},render(){let e=(e,t,n,i,a)=>{let{mergedClsPrefix:o,menuProps:s}=this;this.onRender?.();let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:G(t),class:[e,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:i,onMouseleave:a};return C($,r(this.$attrs,l,c))},{mergedTheme:n}=this,i={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return d(),t(ne,le(this.$props,Se,i),{_:1,trigger:b(()=>this.$slots.default?.())},16)}});export{G as n,W as r,we as t};