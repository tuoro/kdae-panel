import{$t as e,Cn as t,Ct as n,Fn as r,G as i,J as a,Nn as o,O as s,Rn as c,Sn as l,Tn as u,U as d,Un as f,V as p,Vn as m,W as h,Wn as g,Y as _,Zn as v,_n as y,_t as b,an as x,bt as S,cr as C,ct as w,en as T,ft as E,in as D,jn as O,kn as k,lr as A,lt as j,nn as M,pr as N,rn as P,sr as F,un as I,ut as L,xn as R,zn as z}from"./client-DecrR2G0.js";import{c as B,i as ee,n as V,r as te,s as ne,t as H}from"./Popover-BZ_qWFTX.js";import{i as re,t as ie}from"./create-ByZqGS3o.js";import{t as ae}from"./utils-qR7Igvzu.js";import{t as oe}from"./use-merged-state-Dvb8YPIJ.js";import{t as se}from"./Icon-Dy6e-gst.js";import{F as ce,L as U,Q as le,b as ue,nt as de,rt as fe,tt as W,x as pe}from"./index-CBIB5M6s.js";function me(e={},t){let n=F({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:a}=e,o=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}r!==void 0&&Object.keys(r).forEach(t=>{if(t!==e.key)return;let n=r[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},s=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}a!==void 0&&Object.keys(a).forEach(t=>{if(t!==e.key)return;let n=a[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},l=()=>{(t===void 0||t.value)&&(i(`keydown`,document,o),i(`keyup`,document,s)),t!==void 0&&v(t,e=>{e?(i(`keydown`,document,o),i(`keyup`,document,s)):(h(`keydown`,document,o),h(`keyup`,document,s))})};return ae()?(c(l),z(()=>{(t===void 0||t.value)&&(h(`keydown`,document,o),h(`keyup`,document,s))})):l(),C(n)}var G=k({name:`ChevronRight`,render(){return(()=>{let e=w(`6ab04425f4fcb756`);return e[0]||=l(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[l(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`})],-1)})()}});function K(e){return t=>{e.value=t?t.$el:null}}var he={...V,...a.props},ge=k({name:`Tooltip`,props:he,slots:Object,__popover__:!0,setup(e){let{mergedClsPrefixRef:t}=b(e),n=a(`Tooltip`,`-tooltip`,void 0,ue,e,t),r=A(null);return{syncPosition(){r.value.syncPosition()},setShow(e){r.value.setShow(e)},popoverRef:r,mergedTheme:n,popoverThemeOverrides:R(()=>n.value.self)}},render(){let{mergedTheme:e,internalExtraClass:t}=this;return O(H,{...this.$props,theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:t.concat(`tooltip`),ref:`popoverRef`},this.$slots)}}),q=S(`n-dropdown-menu`),J=S(`n-dropdown`),Y=S(`n-dropdown-option`),X=k({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return f(),u(`div`,{class:j(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function Z(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function _e(e){return e.type===`group`}function Q(e){return e.type===`divider`}function ve(e){return e.type===`render`}function ye(e,t,n){if(!t)return e;let r=A(e.value),i=null;return v(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var be=k({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=o(J),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:i,pendingKeyPathRef:a,activeKeyPathRef:s,animatedRef:c,mergedShowRef:l,renderLabelRef:u,renderIconRef:f,labelFieldRef:p,childrenFieldRef:m,renderOptionRef:h,nodePropsRef:_,menuPropsRef:v}=t,y=o(Y,null),b=o(q),x=o(W),S=R(()=>e.tmNode.rawNode),C=R(()=>{let{value:t}=m;return Z(e.tmNode.rawNode,t)}),w=R(()=>{let{disabled:t}=e.tmNode;return t}),T=ye(R(()=>{if(!C.value)return!1;let{key:t,disabled:o}=e.tmNode;if(o)return!1;let{value:s}=n,{value:c}=r,{value:l}=i,{value:u}=a;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,R(()=>r.value===null&&!c.value)),E=R(()=>!!y?.enteringSubmenuRef.value),D=A(!1);g(Y,{enteringSubmenuRef:D});function O(){D.value=!0}function k(){D.value=!1}function j(){let{parentKey:t,tmNode:a}=e;a.disabled||l.value&&(i.value=t,r.value=null,n.value=a.key)}function M(){let{tmNode:t}=e;t.disabled||l.value&&n.value!==t.key&&j()}function N(t){if(e.tmNode.disabled||!l.value)return;let{relatedTarget:r}=t;r&&!re({target:r},`dropdownOption`)&&!re({target:r},`scrollbarRail`)&&(n.value=null)}function P(){let{value:n}=C,{tmNode:r}=e;l.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:p,renderLabel:u,renderIcon:f,siblingHasIcon:b.showIconRef,siblingHasSubmenu:b.hasSubmenuRef,menuProps:v,popoverBody:x,animated:c,mergedShowSubmenu:R(()=>T.value&&!E.value),rawNode:S,hasSubmenu:C,pending:d(()=>{let{value:t}=a,{key:n}=e.tmNode;return t.includes(n)}),childActive:d(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:d(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:w,renderOption:h,nodeProps:_,handleClick:P,handleMouseMove:M,handleMouseEnter:j,handleMouseLeave:N,handleSubmenuBeforeEnter:O,handleSubmenuAfterEnter:k}},render(){let{animated:e,rawNode:n,mergedShowSubmenu:i,clsPrefix:a,siblingHasIcon:o,siblingHasSubmenu:s,renderLabel:c,renderIcon:l,renderOption:d,nodeProps:p,props:m,scrollable:h}=this,g=null;if(i){let e=this.menuProps?.(n,n.children);g=(n=>(f(),t($,r({key:1},e,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(g)}let _={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},v=p?.(n),b=(f(),u(`div`,r({class:[`${a}-dropdown-option`,v?.class],"data-dropdown-option":!0},v),[E(()=>O(`div`,r(_,m),[(f(),u(`div`,{class:j([`${a}-dropdown-option-body__prefix`,o&&`${a}-dropdown-option-body__prefix--show-icon`])},[E(()=>[l?l(n):U(n.icon)])],2)),(f(),u(`div`,{"data-dropdown-option":!0,class:j(`${a}-dropdown-option-body__label`)},[c?(f(),u(y,{key:0},[E(()=>c(n))],64)):(f(),u(y,{key:1},[E(()=>U(n[this.labelField]??n.title))],64))],2)),(f(),u(`div`,{"data-dropdown-option":!0,class:j([`${a}-dropdown-option-body__suffix`,s&&`${a}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(f(),t(se,{key:0},{_:1,default:L(()=>(f(),t(G)))})):E(()=>null)],2))])),this.hasSubmenu?(f(),t(B,{key:0},{default:()=>[(f(),t(ne,null,{default:()=>(f(),u(`div`,{class:j(`${a}-dropdown-offset-container`)},[(f(),t(ee,{show:this.mergedShowSubmenu,placement:this.placement,to:h&&this.popoverBody||void 0,teleportDisabled:!h},{default:()=>(f(),u(`div`,{class:j(`${a}-dropdown-menu-wrapper`)},[e?(f(),t(I,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>g},1032,[`onBeforeEnter`,`onAfterEnter`])):(f(),u(y,{key:1},[E(()=>g)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):E(()=>null)],16));return d?d({node:b,option:n}):b}}),xe=k({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=o(q),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=o(J);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:i,renderLabel:a,renderOption:o}=this,{rawNode:s}=this.tmNode,c=(f(),u(`div`,r({class:`${e}-dropdown-option`},i?.(s)),[l(`div`,{class:j(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[l(`div`,{"data-dropdown-option":!0,class:j([`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`])},[E(()=>U(s.icon))],2),l(`div`,{class:j(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[a?(f(),u(y,{key:0},[E(()=>a(s))],64)):(f(),u(y,{key:1},[E(()=>U(s.title??s[this.labelField]))],64))],2),l(`div`,{class:j([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return o?o({node:c,option:s}):c}}),Se=k({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:r,clsPrefix:i}=this,{children:a}=e;return f(),u(y,null,[(f(),t(xe,{clsPrefix:i,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),E(()=>a?.map(e=>{let{rawNode:a}=e;return a.show===!1?null:Q(a)?O(X,{clsPrefix:i,key:e.key}):e.isGroup?(n(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(f(),t(be,{clsPrefix:i,tmNode:e,parentKey:r,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Ce=k({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return O(`div`,t,[e?.()])}}),$=k({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=o(J);g(q,{showIconRef:R(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:R(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>Z(e,t));let{rawNode:n}=e;return Z(n,t)})})});let r=A(null);return g(de,null),g(fe,null),g(W,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:n,scrollable:r}=this,i=this.tmNodes.map(i=>{let{rawNode:a}=i;return a.show===!1?null:ve(a)?(f(),t(Ce,{tmNode:i,key:i.key},null,8,[`tmNode`])):Q(a)?(f(),t(X,{clsPrefix:n,key:i.key},null,8,[`clsPrefix`])):_e(a)?(f(),t(Se,{clsPrefix:n,tmNode:i,parentKey:e,key:i.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(f(),t(be,{clsPrefix:n,tmNode:i,parentKey:e,key:i.key,props:a.props,scrollable:r},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return f(),u(`div`,{class:j([`${n}-dropdown-menu`,r&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[r?(f(),t(s,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(f(),u(y,{key:1},[E(()=>i)],64)),this.showArrow?(f(),u(y,{key:2},[E(()=>te({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):E(()=>null)],2)}}),we=T(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[ce(),T(`dropdown-option`,`
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
 `)]),T(`dropdown-option-body`,`
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
 `),D(`disabled`,[P(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[M(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),e(`&::before`,`background-color: var(--n-option-color-hover);`)]),P(`active`,`
 color: var(--n-option-text-color-active);
 `,[M(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),e(`&::before`,`background-color: var(--n-option-color-active);`)]),P(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[M(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),P(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),P(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[M(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[P(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),M(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[P(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),T(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),M(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),M(`suffix`,`
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
 `,[P(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),T(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),T(`dropdown-menu`,`pointer-events: all;`)]),T(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),T(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),T(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),e(`>`,[T(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),D(`scrollable`,`
 padding: var(--n-padding);
 `),P(`scrollable`,[M(`content`,`
 padding: var(--n-padding);
 `)])]),Te={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Ee=Object.keys(V),De={...V,...Te,...a.props},Oe=k({name:`Dropdown`,inheritAttrs:!1,props:De,setup(e){let t=A(!1),n=oe(N(e,`show`),t),r=R(()=>{let{keyField:t,childrenField:n}=e;return ie(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),i=R(()=>r.value.treeNodes),o=A(null),s=A(null),c=A(null),l=R(()=>o.value??s.value??c.value??null),u=R(()=>r.value.getPath(l.value).keyPath),f=R(()=>r.value.getPath(e.value).keyPath),m=d(()=>e.keyboard&&n.value);me({keydown:{ArrowUp:{prevent:!0,handler:M},ArrowRight:{prevent:!0,handler:j},ArrowDown:{prevent:!0,handler:P},ArrowLeft:{prevent:!0,handler:k},Enter:{prevent:!0,handler:F},Escape:O}},m);let{mergedClsPrefixRef:h,inlineThemeDisabled:y,mergedComponentPropsRef:S}=b(e),C=R(()=>e.size||S?.value?.Dropdown?.size||`medium`),w=a(`Dropdown`,`-dropdown`,we,pe,e,h);g(J,{labelFieldRef:N(e,`labelField`),childrenFieldRef:N(e,`childrenField`),renderLabelRef:N(e,`renderLabel`),renderIconRef:N(e,`renderIcon`),hoverKeyRef:o,keyboardKeyRef:s,lastToggledSubmenuKeyRef:c,pendingKeyPathRef:u,activeKeyPathRef:f,animatedRef:N(e,`animated`),mergedShowRef:n,nodePropsRef:N(e,`nodeProps`),renderOptionRef:N(e,`renderOption`),menuPropsRef:N(e,`menuProps`),doSelect:T,doUpdateShow:E}),v(n,t=>{!e.animated&&!t&&D()});function T(t,n){let{onSelect:r}=e;r&&p(r,t,n)}function E(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&p(r,n),i&&p(i,n),t.value=n}function D(){o.value=null,s.value=null,c.value=null}function O(){E(!1)}function k(){L(`left`)}function j(){L(`right`)}function M(){L(`up`)}function P(){L(`down`)}function F(){let e=I();e?.isLeaf&&n.value&&(T(e.key,e.rawNode),E(!1))}function I(){let{value:e}=r,{value:t}=l;return!e||t===null?null:e.getNode(t)??null}function L(e){let{value:t}=l,{value:{getFirstAvailableNode:n}}=r,i=null;if(t===null){let e=n();e!==null&&(i=e.key)}else{let t=I();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(i=n.key)}}i!==null&&(o.value=null,s.value=i)}let z=R(()=>{let{inverted:t}=e,n=C.value,{common:{cubicBezierEaseInOut:r},self:i}=w.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[x(`optionIconSuffixWidth`,n)]:l,[x(`optionSuffixWidth`,n)]:u,[x(`optionIconPrefixWidth`,n)]:d,[x(`optionPrefixWidth`,n)]:f,[x(`fontSize`,n)]:p,[x(`optionHeight`,n)]:m,[x(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=y?_(`dropdown`,R(()=>`${C.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:h,mergedTheme:w,mergedSize:C,tmNodes:i,mergedShow:n,handleAfterLeave:()=>{e.animated&&D()},doUpdateShow:E,cssVars:y?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,t,n,i,a)=>{let{mergedClsPrefix:o,menuProps:s}=this;this.onRender?.();let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:K(t),class:[e,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:i,onMouseleave:a};return O($,r(this.$attrs,l,c))},{mergedTheme:n}=this,i={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return f(),t(H,le(this.$props,Ee,i),{_:1,trigger:L(()=>this.$slots.default?.())},16)}}),ke=`(max-width: 767px)`;function Ae(){let e=window.matchMedia(ke),t=A(e.matches),n=e=>{t.value=e.matches};return m(()=>e.addEventListener(`change`,n)),z(()=>e.removeEventListener(`change`,n)),C(t)}export{G as a,K as i,Oe as n,ge as r,Ae as t};