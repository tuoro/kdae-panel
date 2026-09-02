import{An as e,Bn as t,Cn as n,En as r,G as i,Gn as a,H as o,Hn as s,In as c,K as l,Mn as u,Pn as d,Qn as f,Sn as p,W as m,Wn as h,X as g,Y as _,an as v,cr as y,dn as b,dt as x,en as S,in as C,k as w,lr as T,lt as E,mr as D,on as O,pt as k,rn as A,tn as j,ur as M,ut as N,vn as P,vt as F,wn as I,wt as L,xt as R,zn as z}from"./client-DOvxO6I9.js";import{c as B,i as ee,n as V,r as te,s as ne,t as H}from"./Popover-BgdnYjCz.js";import{i as re,t as ie}from"./create-CCdUweXY.js";import{t as ae}from"./utils-WWf3b1oy.js";import{t as oe}from"./use-merged-state-pTT-7LRM.js";import{t as se}from"./Icon-qPtEwTkM.js";import{F as ce,L as U,Q as le,b as ue,nt as de,rt as fe,tt as W,x as pe}from"./index-Xj4sOcOi.js";function me(e={},n){let r=y({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:a,keyup:o}=e,s=e=>{switch(e.key){case`Control`:r.ctrl=!0;break;case`Meta`:r.command=!0,r.win=!0;break;case`Shift`:r.shift=!0;break;case`Tab`:r.tab=!0}a!==void 0&&Object.keys(a).forEach(t=>{if(t!==e.key)return;let n=a[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},c=e=>{switch(e.key){case`Control`:r.ctrl=!1;break;case`Meta`:r.command=!1,r.win=!1;break;case`Shift`:r.shift=!1;break;case`Tab`:r.tab=!1}o!==void 0&&Object.keys(o).forEach(t=>{if(t!==e.key)return;let n=o[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},u=()=>{(n===void 0||n.value)&&(l(`keydown`,document,s),l(`keyup`,document,c)),n!==void 0&&f(n,e=>{e?(l(`keydown`,document,s),l(`keyup`,document,c)):(i(`keydown`,document,s),i(`keyup`,document,c))})};return ae()?(z(u),t(()=>{(n===void 0||n.value)&&(i(`keydown`,document,s),i(`keyup`,document,c))})):u(),T(r)}var G=e({name:`ChevronRight`,render(){return(()=>{let e=E(`6ab04425f4fcb756`);return e[0]||=n(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[n(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`})],-1)})()}});function K(e){return t=>{e.value=t?t.$el:null}}var he={...V,..._.props},ge=e({name:`Tooltip`,props:he,slots:Object,__popover__:!0,setup(e){let{mergedClsPrefixRef:t}=F(e),n=_(`Tooltip`,`-tooltip`,void 0,ue,e,t),r=M(null);return{syncPosition(){r.value.syncPosition()},setShow(e){r.value.setShow(e)},popoverRef:r,mergedTheme:n,popoverThemeOverrides:p(()=>n.value.self)}},render(){let{mergedTheme:e,internalExtraClass:t}=this;return u(H,{...this.$props,theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:t.concat(`tooltip`),ref:`popoverRef`},this.$slots)}}),q=R(`n-dropdown-menu`),J=R(`n-dropdown`),Y=R(`n-dropdown-option`),X=e({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return h(),r(`div`,{class:N(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function Z(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function _e(e){return e.type===`group`}function Q(e){return e.type===`divider`}function ve(e){return e.type===`render`}function ye(e,t,n){if(!t)return e;let r=M(e.value),i=null;return f(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var be=e({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=d(J),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:i,pendingKeyPathRef:o,activeKeyPathRef:s,animatedRef:c,mergedShowRef:l,renderLabelRef:u,renderIconRef:f,labelFieldRef:h,childrenFieldRef:g,renderOptionRef:_,nodePropsRef:v,menuPropsRef:y}=t,b=d(Y,null),x=d(q),S=d(W),C=p(()=>e.tmNode.rawNode),w=p(()=>{let{value:t}=g;return Z(e.tmNode.rawNode,t)}),T=p(()=>{let{disabled:t}=e.tmNode;return t}),E=ye(p(()=>{if(!w.value)return!1;let{key:t,disabled:a}=e.tmNode;if(a)return!1;let{value:s}=n,{value:c}=r,{value:l}=i,{value:u}=o;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,p(()=>r.value===null&&!c.value)),D=p(()=>!!b?.enteringSubmenuRef.value),O=M(!1);a(Y,{enteringSubmenuRef:O});function k(){O.value=!0}function A(){O.value=!1}function j(){let{parentKey:t,tmNode:a}=e;a.disabled||l.value&&(i.value=t,r.value=null,n.value=a.key)}function N(){let{tmNode:t}=e;t.disabled||l.value&&n.value!==t.key&&j()}function P(t){if(e.tmNode.disabled||!l.value)return;let{relatedTarget:r}=t;r&&!re({target:r},`dropdownOption`)&&!re({target:r},`scrollbarRail`)&&(n.value=null)}function F(){let{value:n}=w,{tmNode:r}=e;l.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:h,renderLabel:u,renderIcon:f,siblingHasIcon:x.showIconRef,siblingHasSubmenu:x.hasSubmenuRef,menuProps:y,popoverBody:S,animated:c,mergedShowSubmenu:p(()=>E.value&&!D.value),rawNode:C,hasSubmenu:w,pending:m(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:m(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:m(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:T,renderOption:_,nodeProps:v,handleClick:F,handleMouseMove:N,handleMouseEnter:j,handleMouseLeave:P,handleSubmenuBeforeEnter:k,handleSubmenuAfterEnter:A}},render(){let{animated:e,rawNode:t,mergedShowSubmenu:n,clsPrefix:i,siblingHasIcon:a,siblingHasSubmenu:o,renderLabel:s,renderIcon:l,renderOption:d,nodeProps:f,props:p,scrollable:m}=this,g=null;if(n){let e=this.menuProps?.(t,t.children);g=(t=>(h(),I($,c({key:1},e,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(g)}let _={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},v=f?.(t),y=(h(),r(`div`,c({class:[`${i}-dropdown-option`,v?.class],"data-dropdown-option":!0},v),[k(()=>u(`div`,c(_,p),[(h(),r(`div`,{class:N([`${i}-dropdown-option-body__prefix`,a&&`${i}-dropdown-option-body__prefix--show-icon`])},[k(()=>[l?l(t):U(t.icon)])],2)),(h(),r(`div`,{"data-dropdown-option":!0,class:N(`${i}-dropdown-option-body__label`)},[s?(h(),r(P,{key:0},[k(()=>s(t))],64)):(h(),r(P,{key:1},[k(()=>U(t[this.labelField]??t.title))],64))],2)),(h(),r(`div`,{"data-dropdown-option":!0,class:N([`${i}-dropdown-option-body__suffix`,o&&`${i}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(h(),I(se,{key:0},{_:1,default:x(()=>(h(),I(G)))})):k(()=>null)],2))])),this.hasSubmenu?(h(),I(B,{key:0},{default:()=>[(h(),I(ne,null,{default:()=>(h(),r(`div`,{class:N(`${i}-dropdown-offset-container`)},[(h(),I(ee,{show:this.mergedShowSubmenu,placement:this.placement,to:m&&this.popoverBody||void 0,teleportDisabled:!m},{default:()=>(h(),r(`div`,{class:N(`${i}-dropdown-menu-wrapper`)},[e?(h(),I(b,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>g},1032,[`onBeforeEnter`,`onAfterEnter`])):(h(),r(P,{key:1},[k(()=>g)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):k(()=>null)],16));return d?d({node:y,option:t}):y}}),xe=e({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=d(q),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=d(J);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:i,nodeProps:a,renderLabel:o,renderOption:s}=this,{rawNode:l}=this.tmNode,u=(h(),r(`div`,c({class:`${e}-dropdown-option`},a?.(l)),[n(`div`,{class:N(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[n(`div`,{"data-dropdown-option":!0,class:N([`${e}-dropdown-option-body__prefix`,i&&`${e}-dropdown-option-body__prefix--show-icon`])},[k(()=>U(l.icon))],2),n(`div`,{class:N(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[o?(h(),r(P,{key:0},[k(()=>o(l))],64)):(h(),r(P,{key:1},[k(()=>U(l.title??l[this.labelField]))],64))],2),n(`div`,{class:N([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return s?s({node:u,option:l}):u}}),Se=e({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:n}=this,{children:i}=e;return h(),r(P,null,[(h(),I(xe,{clsPrefix:n,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),k(()=>i?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:Q(r)?u(X,{clsPrefix:n,key:e.key}):e.isGroup?(L(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(h(),I(be,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Ce=e({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return u(`div`,t,[e?.()])}}),$=e({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=d(J);a(q,{showIconRef:p(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:p(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>Z(e,t));let{rawNode:n}=e;return Z(n,t)})})});let r=M(null);return a(de,null),a(fe,null),a(W,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,i=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:ve(i)?(h(),I(Ce,{tmNode:r,key:r.key},null,8,[`tmNode`])):Q(i)?(h(),I(X,{clsPrefix:t,key:r.key},null,8,[`clsPrefix`])):_e(i)?(h(),I(Se,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(h(),I(be,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return h(),r(`div`,{class:N([`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`]),ref:`bodyRef`},[n?(h(),I(w,{key:0,contentClass:`${t}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(h(),r(P,{key:1},[k(()=>i)],64)),this.showArrow?(h(),r(P,{key:2},[k(()=>te({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):k(()=>null)],2)}}),we=j(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[ce(),j(`dropdown-option`,`
 position: relative;
 `,[S(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[S(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),j(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[S(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),v(`disabled`,[C(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[A(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),S(`&::before`,`background-color: var(--n-option-color-hover);`)]),C(`active`,`
 color: var(--n-option-text-color-active);
 `,[A(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),S(`&::before`,`background-color: var(--n-option-color-active);`)]),C(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[A(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),C(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),C(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[A(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[C(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),A(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[C(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),j(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),A(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),A(`suffix`,`
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
 `,[C(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),j(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),j(`dropdown-menu`,`pointer-events: all;`)]),j(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),j(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),j(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),S(`>`,[j(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),v(`scrollable`,`
 padding: var(--n-padding);
 `),C(`scrollable`,[A(`content`,`
 padding: var(--n-padding);
 `)])]),Te={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Ee=Object.keys(V),De={...V,...Te,..._.props},Oe=e({name:`Dropdown`,inheritAttrs:!1,props:De,setup(e){let t=M(!1),n=oe(D(e,`show`),t),r=p(()=>{let{keyField:t,childrenField:n}=e;return ie(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),i=p(()=>r.value.treeNodes),s=M(null),c=M(null),l=M(null),u=p(()=>s.value??c.value??l.value??null),d=p(()=>r.value.getPath(u.value).keyPath),h=p(()=>r.value.getPath(e.value).keyPath),v=m(()=>e.keyboard&&n.value);me({keydown:{ArrowUp:{prevent:!0,handler:N},ArrowRight:{prevent:!0,handler:j},ArrowDown:{prevent:!0,handler:P},ArrowLeft:{prevent:!0,handler:A},Enter:{prevent:!0,handler:I},Escape:k}},v);let{mergedClsPrefixRef:y,inlineThemeDisabled:b,mergedComponentPropsRef:x}=F(e),S=p(()=>e.size||x?.value?.Dropdown?.size||`medium`),C=_(`Dropdown`,`-dropdown`,we,pe,e,y);a(J,{labelFieldRef:D(e,`labelField`),childrenFieldRef:D(e,`childrenField`),renderLabelRef:D(e,`renderLabel`),renderIconRef:D(e,`renderIcon`),hoverKeyRef:s,keyboardKeyRef:c,lastToggledSubmenuKeyRef:l,pendingKeyPathRef:d,activeKeyPathRef:h,animatedRef:D(e,`animated`),mergedShowRef:n,nodePropsRef:D(e,`nodeProps`),renderOptionRef:D(e,`renderOption`),menuPropsRef:D(e,`menuProps`),doSelect:w,doUpdateShow:T}),f(n,t=>{!e.animated&&!t&&E()});function w(t,n){let{onSelect:r}=e;r&&o(r,t,n)}function T(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&o(r,n),i&&o(i,n),t.value=n}function E(){s.value=null,c.value=null,l.value=null}function k(){T(!1)}function A(){R(`left`)}function j(){R(`right`)}function N(){R(`up`)}function P(){R(`down`)}function I(){let e=L();e?.isLeaf&&n.value&&(w(e.key,e.rawNode),T(!1))}function L(){let{value:e}=r,{value:t}=u;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=u,{value:{getFirstAvailableNode:n}}=r,i=null;if(t===null){let e=n();e!==null&&(i=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(i=n.key)}}i!==null&&(s.value=null,c.value=i)}let z=p(()=>{let{inverted:t}=e,n=S.value,{common:{cubicBezierEaseInOut:r},self:i}=C.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[O(`optionIconSuffixWidth`,n)]:l,[O(`optionSuffixWidth`,n)]:u,[O(`optionIconPrefixWidth`,n)]:d,[O(`optionPrefixWidth`,n)]:f,[O(`fontSize`,n)]:p,[O(`optionHeight`,n)]:m,[O(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=b?g(`dropdown`,p(()=>`${S.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:y,mergedTheme:C,mergedSize:S,tmNodes:i,mergedShow:n,handleAfterLeave:()=>{e.animated&&E()},doUpdateShow:T,cssVars:b?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let s=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:K(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return u($,c(this.$attrs,l,s))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return h(),I(H,le(this.$props,Ee,n),{_:1,trigger:x(()=>this.$slots.default?.())},16)}}),ke=`(max-width: 767px)`;function Ae(){let e=window.matchMedia(ke),n=M(e.matches),r=e=>{n.value=e.matches};return s(()=>e.addEventListener(`change`,r)),t(()=>e.removeEventListener(`change`,r)),T(n)}export{G as a,K as i,Oe as n,ge as r,Ae as t};