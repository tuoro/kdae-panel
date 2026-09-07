import{$ as e,$t as t,Bn as n,Dn as r,Gt as i,H as a,Ht as o,I as s,Jt as c,Kt as l,Mn as u,Nn as d,On as f,Q as p,Qn as m,R as h,Sn as g,Ut as _,V as v,Xn as y,Zn as b,bn as x,dn as S,et as C,fn as w,ft as T,mn as E,nr as D,nt as O,on as k,qt as A,st as j,un as M,ut as N,vn as P,wn as F}from"./client-DkW07njR.js";import{a as I,h as L,i as R,l as z,o as B,r as ee,t as te,u as ne}from"./create-CC2gVuYF.js";import{c as V,n as re,s as H}from"./Scrollbar-BZdl1G8a.js";import{f as ie,g as ae,h as U,l as oe,n as W,t as se,y as ce}from"./fade-in-scale-up.cssr-BdRR0Z2p.js";import{t as le}from"./use-merged-state-BhDn2UYN.js";import{t as ue}from"./Icon-C5vJw3pV.js";import{x as de}from"./index-1SjSYdlk.js";function fe(e={},t){let i=y({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:a,keyup:o}=e,s=e=>{switch(e.key){case`Control`:i.ctrl=!0;break;case`Meta`:i.command=!0,i.win=!0;break;case`Shift`:i.shift=!0;break;case`Tab`:i.tab=!0}a!==void 0&&Object.keys(a).forEach(t=>{if(t!==e.key)return;let n=a[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},c=e=>{switch(e.key){case`Control`:i.ctrl=!1;break;case`Meta`:i.command=!1,i.win=!1;break;case`Shift`:i.shift=!1;break;case`Tab`:i.tab=!1}o!==void 0&&Object.keys(o).forEach(t=>{if(t!==e.key)return;let n=o[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},l=()=>{(t===void 0||t.value)&&(V(`keydown`,document,s),V(`keyup`,document,c)),t!==void 0&&n(t,e=>{e?(V(`keydown`,document,s),V(`keyup`,document,c)):(H(`keydown`,document,s),H(`keyup`,document,c))})};return ie()?(r(l),f(()=>{(t===void 0||t.value)&&(H(`keydown`,document,s),H(`keyup`,document,c))})):l(),b(i)}var G=P({name:`ChevronRight`,render(){return(()=>{let e=p(`6ab04425f4fcb756`);return e[0]||=S(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[S(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`})],-1)})()}});function K(e){return t=>{e.value=t?t.$el:null}}var q=N(`n-dropdown-menu`),J=N(`n-dropdown`),Y=N(`n-dropdown-option`),X=P({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return u(),E(`div`,{class:e(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function Z(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function pe(e){return e.type===`group`}function Q(e){return e.type===`divider`}function me(e){return e.type===`render`}function he(e,t,r){if(!t)return e;let i=m(e.value),a=null;return n(e,e=>{a!==null&&window.clearTimeout(a),e===!0?r&&!r.value?i.value=!0:a=window.setTimeout(()=>{i.value=!0},t):i.value=!1}),i}var $=P({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=g(J),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:i,pendingKeyPathRef:a,activeKeyPathRef:o,animatedRef:s,mergedShowRef:c,renderLabelRef:l,renderIconRef:u,labelFieldRef:f,childrenFieldRef:p,renderOptionRef:_,nodePropsRef:v,menuPropsRef:y}=t,b=g(Y,null),x=g(q),S=g(U),C=M(()=>e.tmNode.rawNode),w=M(()=>{let{value:t}=p;return Z(e.tmNode.rawNode,t)}),T=M(()=>{let{disabled:t}=e.tmNode;return t}),E=he(M(()=>{if(!w.value)return!1;let{key:t,disabled:o}=e.tmNode;if(o)return!1;let{value:s}=n,{value:c}=r,{value:l}=i,{value:u}=a;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,M(()=>r.value===null&&!s.value)),D=M(()=>!!b?.enteringSubmenuRef.value),O=m(!1);d(Y,{enteringSubmenuRef:O});function k(){O.value=!0}function A(){O.value=!1}function j(){let{parentKey:t,tmNode:a}=e;a.disabled||c.value&&(i.value=t,r.value=null,n.value=a.key)}function N(){let{tmNode:t}=e;t.disabled||c.value&&n.value!==t.key&&j()}function P(t){if(e.tmNode.disabled||!c.value)return;let{relatedTarget:r}=t;r&&!L({target:r},`dropdownOption`)&&!L({target:r},`scrollbarRail`)&&(n.value=null)}function F(){let{value:n}=w,{tmNode:r}=e;c.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:f,renderLabel:l,renderIcon:u,siblingHasIcon:x.showIconRef,siblingHasSubmenu:x.hasSubmenuRef,menuProps:y,popoverBody:S,animated:s,mergedShowSubmenu:M(()=>E.value&&!D.value),rawNode:C,hasSubmenu:w,pending:h(()=>{let{value:t}=a,{key:n}=e.tmNode;return t.includes(n)}),childActive:h(()=>{let{value:t}=o,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:h(()=>{let{value:t}=o,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:T,renderOption:_,nodeProps:v,handleClick:F,handleMouseMove:N,handleMouseEnter:j,handleMouseLeave:P,handleSubmenuBeforeEnter:k,handleSubmenuAfterEnter:A}},render(){let{animated:n,rawNode:r,mergedShowSubmenu:i,clsPrefix:a,siblingHasIcon:o,siblingHasSubmenu:s,renderLabel:c,renderIcon:l,renderOption:d,nodeProps:f,props:p,scrollable:m}=this,h=null;if(i){let e=this.menuProps?.(r,r.children);h=(t=>(u(),w(ye,F({key:1},e,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(h)}let g={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},_=f?.(r),v=(u(),E(`div`,F({class:[`${a}-dropdown-option`,_?.class],"data-dropdown-option":!0},_),[O(()=>x(`div`,F(g,p),[(u(),E(`div`,{class:e([`${a}-dropdown-option-body__prefix`,o&&`${a}-dropdown-option-body__prefix--show-icon`])},[O(()=>[l?l(r):W(r.icon)])],2)),(u(),E(`div`,{"data-dropdown-option":!0,class:e(`${a}-dropdown-option-body__label`)},[c?(u(),E(k,{key:0},[O(()=>c(r))],64)):(u(),E(k,{key:1},[O(()=>W(r[this.labelField]??r.title))],64))],2)),(u(),E(`div`,{"data-dropdown-option":!0,class:e([`${a}-dropdown-option-body__suffix`,s&&`${a}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(u(),w(ue,{key:0},{_:1,default:C(()=>(u(),w(G)))})):O(()=>null)],2))])),this.hasSubmenu?(u(),w(ne,{key:0},{default:()=>[(u(),w(z,null,{default:()=>(u(),E(`div`,{class:e(`${a}-dropdown-offset-container`)},[(u(),w(B,{show:this.mergedShowSubmenu,placement:this.placement,to:m&&this.popoverBody||void 0,teleportDisabled:!m},{default:()=>(u(),E(`div`,{class:e(`${a}-dropdown-menu-wrapper`)},[n?(u(),w(t,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>h},1032,[`onBeforeEnter`,`onAfterEnter`])):(u(),E(k,{key:1},[O(()=>h)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):O(()=>null)],16));return d?d({node:v,option:r}):v}}),ge=P({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=g(q),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=g(J);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:t,hasSubmenu:n,showIcon:r,nodeProps:i,renderLabel:a,renderOption:o}=this,{rawNode:s}=this.tmNode,c=(u(),E(`div`,F({class:`${t}-dropdown-option`},i?.(s)),[S(`div`,{class:e(`${t}-dropdown-option-body ${t}-dropdown-option-body--group`)},[S(`div`,{"data-dropdown-option":!0,class:e([`${t}-dropdown-option-body__prefix`,r&&`${t}-dropdown-option-body__prefix--show-icon`])},[O(()=>W(s.icon))],2),S(`div`,{class:e(`${t}-dropdown-option-body__label`),"data-dropdown-option":!0},[a?(u(),E(k,{key:0},[O(()=>a(s))],64)):(u(),E(k,{key:1},[O(()=>W(s.title??s[this.labelField]))],64))],2),S(`div`,{class:e([`${t}-dropdown-option-body__suffix`,n&&`${t}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return o?o({node:c,option:s}):c}}),_e=P({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:n}=this,{children:r}=e;return u(),E(k,null,[(u(),w(ge,{clsPrefix:n,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),O(()=>r?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:Q(r)?x(X,{clsPrefix:n,key:e.key}):e.isGroup?(T(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(u(),w($,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),ve=P({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return x(`div`,t,[e?.()])}}),ye=P({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=g(J);d(q,{showIconRef:M(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:M(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>Z(e,t));let{rawNode:n}=e;return Z(n,t)})})});let r=m(null);return d(ae,null),d(ce,null),d(U,r),{bodyRef:r}},render(){let{parentKey:t,clsPrefix:n,scrollable:r}=this,i=this.tmNodes.map(e=>{let{rawNode:i}=e;return i.show===!1?null:me(i)?(u(),w(ve,{tmNode:e,key:e.key},null,8,[`tmNode`])):Q(i)?(u(),w(X,{clsPrefix:n,key:e.key},null,8,[`clsPrefix`])):pe(i)?(u(),w(_e,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(u(),w($,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key,props:i.props,scrollable:r},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return u(),E(`div`,{class:e([`${n}-dropdown-menu`,r&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[r?(u(),w(re,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(u(),E(k,{key:1},[O(()=>i)],64)),this.showArrow?(u(),E(k,{key:2},[O(()=>I({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):O(()=>null)],2)}}),be=_(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[se(),_(`dropdown-option`,`
 position: relative;
 `,[o(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[o(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),_(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[o(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),A(`disabled`,[l(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[i(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),o(`&::before`,`background-color: var(--n-option-color-hover);`)]),l(`active`,`
 color: var(--n-option-text-color-active);
 `,[i(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),o(`&::before`,`background-color: var(--n-option-color-active);`)]),l(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[i(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),l(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),l(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[i(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[l(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),i(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[l(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),_(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),i(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),i(`suffix`,`
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
 `,[l(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),_(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),_(`dropdown-menu`,`pointer-events: all;`)]),_(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),_(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),_(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),o(`>`,[_(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),A(`scrollable`,`
 padding: var(--n-padding);
 `),l(`scrollable`,[i(`content`,`
 padding: var(--n-padding);
 `)])]),xe={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Se=Object.keys(R),Ce={...R,...xe,...v.props},we=P({name:`Dropdown`,inheritAttrs:!1,props:Ce,setup(e){let t=m(!1),r=le(D(e,`show`),t),i=M(()=>{let{keyField:t,childrenField:n}=e;return te(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),o=M(()=>i.value.treeNodes),l=m(null),u=m(null),f=m(null),p=M(()=>l.value??u.value??f.value??null),g=M(()=>i.value.getPath(p.value).keyPath),_=M(()=>i.value.getPath(e.value).keyPath),y=h(()=>e.keyboard&&r.value);fe({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:A},Enter:{prevent:!0,handler:I},Escape:k}},y);let{mergedClsPrefixRef:b,inlineThemeDisabled:x,mergedComponentPropsRef:S}=j(e),C=M(()=>e.size||S?.value?.Dropdown?.size||`medium`),w=v(`Dropdown`,`-dropdown`,be,de,e,b);d(J,{labelFieldRef:D(e,`labelField`),childrenFieldRef:D(e,`childrenField`),renderLabelRef:D(e,`renderLabel`),renderIconRef:D(e,`renderIcon`),hoverKeyRef:l,keyboardKeyRef:u,lastToggledSubmenuKeyRef:f,pendingKeyPathRef:g,activeKeyPathRef:_,animatedRef:D(e,`animated`),mergedShowRef:r,nodePropsRef:D(e,`nodeProps`),renderOptionRef:D(e,`renderOption`),menuPropsRef:D(e,`menuProps`),doSelect:T,doUpdateShow:E}),n(r,t=>{!e.animated&&!t&&O()});function T(t,n){let{onSelect:r}=e;r&&s(r,t,n)}function E(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&s(r,n),i&&s(i,n),t.value=n}function O(){l.value=null,u.value=null,f.value=null}function k(){E(!1)}function A(){R(`left`)}function N(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&r.value&&(T(e.key,e.rawNode),E(!1))}function L(){let{value:e}=i,{value:t}=p;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=p,{value:{getFirstAvailableNode:n}}=i,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(l.value=null,u.value=r)}let z=M(()=>{let{inverted:t}=e,n=C.value,{common:{cubicBezierEaseInOut:r},self:i}=w.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:l,[c(`optionIconSuffixWidth`,n)]:u,[c(`optionSuffixWidth`,n)]:d,[c(`optionIconPrefixWidth`,n)]:f,[c(`optionPrefixWidth`,n)]:p,[c(`fontSize`,n)]:m,[c(`optionHeight`,n)]:h,[c(`optionIconSize`,n)]:g}=i,_={"--n-bezier":r,"--n-font-size":m,"--n-padding":a,"--n-border-radius":s,"--n-option-height":h,"--n-option-prefix-width":p,"--n-option-icon-prefix-width":f,"--n-option-suffix-width":d,"--n-option-icon-suffix-width":u,"--n-option-icon-size":g,"--n-divider-color":o,"--n-option-opacity-disabled":l};return t?(_[`--n-color`]=i.colorInverted,_[`--n-option-color-hover`]=i.optionColorHoverInverted,_[`--n-option-color-active`]=i.optionColorActiveInverted,_[`--n-option-text-color`]=i.optionTextColorInverted,_[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,_[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,_[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,_[`--n-prefix-color`]=i.prefixColorInverted,_[`--n-suffix-color`]=i.suffixColorInverted,_[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(_[`--n-color`]=i.color,_[`--n-option-color-hover`]=i.optionColorHover,_[`--n-option-color-active`]=i.optionColorActive,_[`--n-option-text-color`]=i.optionTextColor,_[`--n-option-text-color-hover`]=i.optionTextColorHover,_[`--n-option-text-color-active`]=i.optionTextColorActive,_[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,_[`--n-prefix-color`]=i.prefixColor,_[`--n-suffix-color`]=i.suffixColor,_[`--n-group-header-text-color`]=i.groupHeaderTextColor),_}),B=x?a(`dropdown`,M(()=>`${C.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:b,mergedTheme:w,mergedSize:C,tmNodes:o,mergedShow:r,handleAfterLeave:()=>{e.animated&&O()},doUpdateShow:E,cssVars:x?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let s=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},c={ref:K(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return x(ye,F(this.$attrs,c,s))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return u(),w(ee,oe(this.$props,Se,n),{_:1,trigger:C(()=>this.$slots.default?.())},16)}});export{K as n,G as r,we as t};