import{$t as e,A as t,B as n,Bn as r,Cn as i,F as a,Fn as o,H as s,In as c,Ln as l,N as u,Nn as d,O as f,On as p,Qn as m,R as h,Sn as g,Tn as _,U as v,Un as y,Vn as b,W as x,Wn as S,X as C,Y as w,Zn as T,_n as E,_r as D,an as O,ct as k,dt as A,en as j,er as ee,ht as M,in as N,it as P,j as F,jn as I,kn as L,lr as R,lt as z,nn as B,ot as V,pn as H,pr as U,pt as W,q as G,rn as K,st as q,un as te,ut as J,vt as Y,w as ne,xn as X,y as re,zn as ie}from"./client-3GjT0YO-.js";import{i as ae,n as oe}from"./Input-DMlF5z0w.js";import{c as Z,d as se,h as ce,l as le,m as Q,n as ue,o as de,p as fe,r as pe,s as me,t as he,u as ge}from"./create-Bt40Opne.js";import{t as _e}from"./next-frame-once-qdYFoq8G.js";import{t as ve}from"./use-merged-state-DuBoFKO_.js";import{i as ye}from"./text-BS8gAoyY.js";import{t as be}from"./src-Cp7gAE4-.js";import{n as xe}from"./Icon-Dm4VT5OZ.js";import{A as Se,C as Ce,F as we,I as Te,L as $,Y as Ee,k as De,ot as Oe,st as ke}from"./index-fTZ5v0dX.js";var Ae=L({name:`Empty`,render(){return(()=>{let e=z(`15c1a247ae156450`);return e[0]||=g(`svg`,{viewBox:`0 0 28 28`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[g(`path`,{d:`M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z`,fill:`currentColor`}),g(`path`,{d:`M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z`,fill:`currentColor`})],-1)})()}}),je=j(`empty`,`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[B(`icon`,`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[e(`+`,[B(`description`,`
 margin-top: 8px;
 `)])]),B(`description`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),B(`extra`,`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Me={...w.props,description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:`medium`},renderIcon:Function},Ne=L({name:`Empty`,props:Me,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=Y(e),a=w(`Empty`,`-empty`,je,ke,e,t),{localeRef:o}=ae(`Empty`),s=X(()=>e.description??r?.value?.Empty?.description),c=X(()=>r?.value?.Empty?.renderIcon||(()=>(y(),i(Ae)))),l=X(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{[O(`iconSize`,t)]:r,[O(`fontSize`,t)]:i,textColor:o,iconColor:s,extraTextColor:c}}=a.value;return{"--n-icon-size":r,"--n-font-size":i,"--n-bezier":n,"--n-text-color":o,"--n-icon-color":s,"--n-extra-text-color":c}}),u=n?C(`empty`,X(()=>{let t=``,{size:n}=e;return t+=n[0],t}),l,e):void 0;return{mergedClsPrefix:t,mergedRenderIcon:c,localizedDescription:X(()=>s.value||o.value.description),cssVars:n?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,onRender:n}=this;return n?.(),y(),_(`div`,{class:J([`${t}-empty`,this.themeClass]),style:D(this.cssVars)},[this.showIcon?(y(),_(`div`,{key:0,class:J(`${t}-empty__icon`)},[e.icon?(y(),_(E,{key:0},[W(()=>e.icon())],64)):(y(),i(G,{key:1,clsPrefix:t},{default:this.mergedRenderIcon},1032,[`clsPrefix`]))],2)):W(()=>null),this.showDescription?(y(),_(`div`,{key:2,class:J(`${t}-empty__description`)},[e.default?(y(),_(E,{key:0},[W(()=>e.default())],64)):(y(),_(E,{key:1},[W(()=>this.localizedDescription)],64))],2)):W(()=>null),e.extra?(y(),_(`div`,{key:4,class:J(`${t}-empty__extra`)},[W(()=>e.extra())],2)):W(()=>null)],6)}});function Pe(e){return e&-e}var Fe=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=Pe(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=Pe(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Ie;function Le(){return typeof document>`u`?!1:(Ie===void 0&&(Ie=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Ie)}var Re;function ze(){return typeof document>`u`?1:(Re===void 0&&(Re=`chrome`in window?window.devicePixelRatio:1),Re)}var Be=`VVirtualListXScroll`;function Ve({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=R(0),i=R(0),a=X(()=>{let t=e.value;if(t.length===0)return null;let n=new Fe(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),o=x(()=>{let e=a.value;return e===null?0:Math.max(e.getBound(i.value)-1,0)}),s=e=>{let t=a.value;return t===null?0:t.sum(e)},c=x(()=>{let t=a.value;return t===null?0:Math.min(t.getBound(i.value+r.value)+1,e.value.length-1)});return S(Be,{startIndexRef:o,endIndexRef:c,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:s}),{listWidthRef:r,scrollLeftRef:i}}var He=L({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=d(Be);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),Ue=me(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[me(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[me(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),We=L({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=M();Ue.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:Z,ssr:t}),b(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&v({key:n}):v({index:t})});let n=!1,i=!1;l(()=>{if(n=!1,!i){i=!0;return}v({top:h.value,left:s.value})}),r(()=>{n=!0,i||=!0});let a=x(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),o=X(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:s,listWidthRef:c}=Ve({columnsRef:U(e,`columns`),renderColRef:U(e,`renderCol`),renderItemWithColsRef:U(e,`renderItemWithCols`)}),u=R(null),d=R(void 0),f=new Map,p=X(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Fe(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=f.get(n);a!==void 0&&i.add(t,a)}),i}),m=R(0),h=R(0),g=x(()=>Math.max(p.value.getBound(h.value-P(e.paddingTop))-1,0)),_=X(()=>{let{value:t}=d;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=g.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),v=(e,t)=>{if(typeof e==`number`){w(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)w(n,r,c);else if(i!==void 0)C(i,c,l);else if(a!==void 0){let e=o.value.get(a);e!==void 0&&C(e,c,l)}else s===`bottom`?w(0,2**53-1,c):s===`top`&&w(0,0,c)},y,S=null;function C(t,n,r){let i=u.value;if(i==null)return;let{value:a}=p,o=a.sum(t)+P(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{y=t,S!==null&&window.clearTimeout(S),S=window.setTimeout(()=>{y=void 0,S=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function w(e,t,n){u.value?.scrollTo({left:e,top:t,behavior:n})}function T(t,r){if(n||e.ignoreItemResize||ee(r.target))return;let{value:i}=p,a=o.value.get(t),s=i.get(a),c=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(c===s)return;c-e.itemSize===0?f.delete(t):f.set(t,c-e.itemSize);let l=c-s;if(l===0)return;i.add(a,l);let d=u.value;if(d!=null){if(y===void 0){let e=i.sum(a);d.scrollTop>e&&d.scrollBy(0,l)}else(a<y||a===y&&c+i.sum(a)>d.scrollTop+d.offsetHeight)&&d.scrollBy(0,l);j()}m.value++}let E=!Le(),D=!1;function O(t){var n;(n=e.onScroll)==null||n.call(e,t),(!E||!D)&&j()}function k(t){var n;if((n=e.onWheel)==null||n.call(e,t),E){let e=u.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/ze(),e.scrollLeft+=t.deltaX/ze(),j(),D=!0,_e(()=>{D=!1})}}}function A(t){if(n||ee(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===d.value)return}else if(t.contentRect.height===d.value&&t.contentRect.width===c.value)return;d.value=t.contentRect.height,c.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function j(){let{value:e}=u;e!=null&&(h.value=e.scrollTop,s.value=e.scrollLeft)}function ee(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:d,listStyle:{overflow:`auto`},keyToIndex:o,itemsStyle:X(()=>{let{itemResizable:t}=e,n=q(p.value.sum());return m.value,[e.itemsStyle,{boxSizing:`content-box`,width:q(a.value),height:t?``:n,minHeight:t?n:``,paddingTop:q(e.paddingTop),paddingBottom:q(e.paddingBottom)}]}),visibleItemsStyle:X(()=>(m.value,{transform:`translateY(${q(p.value.sum(g.value))})`})),viewportItems:_,listElRef:u,itemsElRef:R(null),scrollTo:v,handleListResize:A,handleListScroll:O,handleListWheel:k,handleItemResize:T}},render(){let{itemResizable:e,keyField:n,keyToIndex:r,visibleItemsTag:i}=this;return I(t,{onResize:this.handleListResize},{default:()=>{var a;return I(`div`,o(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(a=this.$slots).empty?.call(a):I(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[I(i,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:i,renderItemWithCols:a}=this;return this.viewportItems.map(o=>{let s=o[n],c=r.get(s),l=i==null?void 0:I(He,{index:c,item:o}),u=a==null?void 0:I(He,{index:c,item:o}),d=this.$slots.default({item:o,renderedCols:l,renderedItemWithCols:u,index:c})[0];return e?I(t,{key:s,onResize:e=>this.handleItemResize(s,e)},{default:()=>d}):(d.key=s,d)})}})])])}})}});function Ge(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function Ke(e,t){t&&(b(()=>{let{value:n}=e;n&&F.registerHandler(n,t)}),T(e,(e,t)=>{t&&F.unregisterHandler(t)},{deep:!1}),ie(()=>{let{value:t}=e;t&&F.unregisterHandler(t)}))}var qe=L({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=z(`d16ead82505dc285`);return y(),_(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),Je=L({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=d(Q);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),s=t?t(i,!1):$(i[this.labelField],i,!1),c=(y(),_(`div`,o(a,{class:[`${e}-base-select-group-header`,a?.class]}),[W(()=>s)],16));return i.render?i.render({node:c,option:i}):n?n({node:c,option:i,selected:!1}):c}}),Ye=L({name:`Checkmark`,render(){return(()=>{let e=z(`3c84eac8ae4e1f96`);return e[0]||=g(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[g(`g`,{fill:`none`},[g(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),Xe=[`onClick`,`onMouseenter`,`onMousemove`];function Ze(e,t){return y(),i(te,{name:`fade-in-scale-up-transition`},{default:()=>e?(y(),i(G,{key:1,clsPrefix:t,class:J(`${t}-base-select-option__check`)},{default:()=>I(Ye)},1032,[`clsPrefix`,`class`])):null},1024)}var Qe=L({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:l,nodePropsRef:u,handleOptionClick:f,handleOptionMouseEnter:p}=d(Q),m=x(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e;n.disabled||p(t,n)}function _(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:x(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:l,nodeProps:u,isPending:m,isSelected:x(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:_,handleMouseEnter:g,handleClick:h}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:i,showCheckmark:a,nodeProps:s,renderOption:c,renderLabel:l,handleClick:u,handleMouseEnter:d,handleMouseMove:f}=this,p=Ze(n,e),m=l?[l(t,n),a&&p]:[$(t[this.labelField],t,n),a&&p],h=s?.(t),v=(y(),_(`div`,o(h,{class:[`${e}-base-select-option`,t.class,h?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:a}],style:[h?.style||``,t.style||``],onClick:Te([u,h?.onClick]),onMouseenter:Te([d,h?.onMouseenter]),onMousemove:Te([f,h?.onMousemove])}),[g(`div`,{class:J(`${e}-base-select-option__content`)},[W(()=>m)],2)],16,Xe));return t.render?t.render({node:v,option:t,selected:n}):c?c({node:v,option:t,selected:n}):v}}),$e=j(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[j(`scrollbar`,`
 max-height: var(--n-height);
 `),j(`virtual-list`,`
 max-height: var(--n-height);
 `),j(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[B(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),j(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),j(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),B(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),B(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),B(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),B(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),j(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),j(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[K(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),e(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),e(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),K(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),K(`pending`,[e(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),K(`selected`,`
 color: var(--n-option-text-color-active);
 `,[e(`&::before`,`
 background-color: var(--n-option-color-active);
 `),K(`pending`,[e(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),K(`disabled`,`
 cursor: not-allowed;
 `,[N(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),K(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),B(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[we({enterScale:`0.5`})])])]),et=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],tt=L({name:`InternalSelectMenu`,props:{...w.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n,mergedComponentPropsRef:r}=Y(e),i=a(`InternalSelectMenu`,n,t),o=w(`InternalSelectMenu`,`-internal-select-menu`,$e,Oe,e,U(e,`clsPrefix`)),s=R(null),l=R(null),u=R(null),d=X(()=>e.treeMate.getFlattenedNodes()),f=X(()=>ue(d.value)),p=R(null);function m(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),H(n||null)}function h(){let{value:t}=p;t&&!e.treeMate.getNode(t.key)&&(p.value=null)}let g;T(()=>e.show,t=>{t?g=T(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?m():h(),c(W)):h()},{immediate:!0}):g?.()},{immediate:!0}),ie(()=>{g?.()});let _=X(()=>P(o.value.self[O(`optionHeight`,e.size)])),v=X(()=>V(o.value.self[O(`padding`,e.size)])),y=X(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),x=X(()=>{let e=d.value;return e&&e.length===0}),E=X(()=>r?.value?.Select?.renderEmpty);function D(t){let{onToggle:n}=e;n&&n(t)}function k(t){let{onScroll:n}=e;n&&n(t)}function A(e){u.value?.sync(),k(e)}function j(){u.value?.sync()}function ee(){let{value:e}=p;return e||null}function M(e,t){t.disabled||H(t,!1)}function N(e,t){t.disabled||D(t)}function F(t){ce(t,`action`)||e.onKeyup?.(t)}function I(t){ce(t,`action`)||e.onKeydown?.(t)}function L(t){e.onMousedown?.(t),!e.focusable&&t.preventDefault()}function z(){let{value:e}=p;e&&H(e.getNext({loop:!0}),!0)}function B(){let{value:e}=p;e&&H(e.getPrev({loop:!0}),!0)}function H(e,t=!1){p.value=e,t&&W()}function W(){let t=p.value;if(!t)return;let n=f.value(t.key);n!==null&&(e.virtualScroll?l.value?.scrollTo({index:n}):u.value?.scrollTo({index:n,elSize:_.value}))}function G(t){s.value?.contains(t.target)&&e.onFocus?.(t)}function K(t){s.value?.contains(t.relatedTarget)||e.onBlur?.(t)}S(Q,{handleOptionMouseEnter:M,handleOptionClick:N,valueSetRef:y,pendingTmNodeRef:p,nodePropsRef:U(e,`nodeProps`),showCheckmarkRef:U(e,`showCheckmark`),multipleRef:U(e,`multiple`),valueRef:U(e,`value`),renderLabelRef:U(e,`renderLabel`),renderOptionRef:U(e,`renderOption`),labelFieldRef:U(e,`labelField`),valueFieldRef:U(e,`valueField`)}),S(fe,s),b(()=>{let{value:e}=u;e&&e.sync()});let q=X(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:s,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[O(`optionFontSize`,t)]:x,[O(`optionHeight`,t)]:S,[O(`optionPadding`,t)]:C}}=o.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":s,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":V(C,`left`),"--n-option-padding-right":V(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:te}=e,J=te?C(`internal-select-menu`,X(()=>e.size[0]),q,e):void 0,ne={selfRef:s,next:z,prev:B,getPendingTmNode:ee};return Ke(s,e.onResize),{mergedTheme:o,mergedClsPrefix:t,rtlEnabled:i,virtualListRef:l,scrollbarRef:u,itemSize:_,padding:v,flattenedNodes:d,empty:x,mergedRenderEmpty:E,virtualListContainer(){let{value:e}=l;return e?.listElRef},virtualListContent(){let{value:e}=l;return e?.itemsElRef},doScroll:k,handleFocusin:G,handleFocusout:K,handleKeyUp:F,handleKeyDown:I,handleMouseDown:L,handleVirtualListResize:j,handleVirtualListScroll:A,cssVars:te?void 0:q,themeClass:J?.themeClass,onRender:J?.onRender,...ne}},render(){let{$slots:e,virtualScroll:t,clsPrefix:r,mergedTheme:a,themeClass:s,onRender:c}=this;return c?.(),y(),_(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:J([`${r}-base-select-menu`,`${r}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${r}-base-select-menu--rtl`,s,this.multiple&&`${r}-base-select-menu--multiple`]),style:D(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[W(()=>n(e.header,e=>e&&(y(),_(`div`,{class:J(`${r}-base-select-menu__header`),"data-header":!0,key:`header`},[W(()=>e)],2)))),this.loading?(y(),_(`div`,{key:0,class:J(`${r}-base-select-menu__loading`)},[(y(),i(re,{clsPrefix:r,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(y(),_(E,{key:1},[this.empty?(y(),_(`div`,{key:1,class:J(`${r}-base-select-menu__empty`),"data-empty":!0},[W(()=>h(e.empty,()=>[this.mergedRenderEmpty?.()||(y(),i(Ne,{theme:a.peers.Empty,themeOverrides:a.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(y(),i(f,o({key:0,ref:`scrollbarRef`,theme:a.peers.Scrollbar,themeOverrides:a.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?(y(),i(We,{key:1,ref:`virtualListRef`,class:J(`${r}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(y(),i(Je,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(y(),i(Qe,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(y(),_(`div`,{key:4,class:J(`${r}-base-select-menu-option-wrapper`),style:D({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[W(()=>this.flattenedNodes.map(e=>e.isGroup?(y(),i(Je,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(y(),i(Qe,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),W(()=>n(e.action,e=>e&&[(y(),_(`div`,{class:J(`${r}-base-select-menu__action`),"data-action":!0,key:`action`},[W(()=>e)],2)),(y(),i(qe,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,et)}});function nt(e){return e.type===`group`}function rt(e){return e.type===`ignored`}function it(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function at(e,t){return{getIsGroup:nt,getIgnored:rt,getKey(t){return nt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function ot(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(nt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(rt(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function st(e,t,n){let r=new Map;return e.forEach(e=>{nt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var ct=e([j(`base-selection`,`
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[j(`base-loading`,`
 color: var(--n-loading-color);
 `),j(`base-selection-tags`,`min-height: var(--n-height);`),B(`border, state-border`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),B(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),j(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[B(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),j(`base-selection-overlay`,`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[B(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),j(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[B(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),j(`base-selection-tags`,`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),j(`base-selection-label`,`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[j(`base-selection-input`,`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[B(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),B(`render-label`,`
 color: var(--n-text-color);
 `)]),N(`disabled`,[e(`&:hover`,[B(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),K(`focus`,[B(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),K(`active`,[B(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),j(`base-selection-label`,`background-color: var(--n-color-active);`),j(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),K(`disabled`,`cursor: not-allowed;`,[B(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),j(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[j(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),B(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),j(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),j(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),j(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[B(`input`,`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),B(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(t=>K(`${t}-status`,[B(`state-border`,`border: var(--n-border-${t});`),N(`disabled`,[e(`&:hover`,[B(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${t});
 border: var(--n-border-hover-${t});
 `)]),K(`active`,[B(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${t});
 border: var(--n-border-active-${t});
 `),j(`base-selection-label`,`background-color: var(--n-color-active-${t});`),j(`base-selection-tags`,`background-color: var(--n-color-active-${t});`)]),K(`focus`,[B(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${t});
 border: var(--n-border-focus-${t});
 `)])])]))]),j(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),j(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[e(`&:last-child`,`padding-right: 0;`),j(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[B(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),lt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],ut=[`tabindex`],dt=[`title`],ft=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],pt=[`tabindex`],mt=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],ht=L({name:`InternalSelection`,props:{...w.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n}=Y(e),r=a(`InternalSelection`,n,t),i=R(null),o=R(null),s=R(null),l=R(null),u=R(null),d=R(null),f=R(null),p=R(null),h=R(null),g=R(null),_=R(!1),v=R(!1),y=R(!1),x=w(`InternalSelection`,`-internal-selection`,ct,Se,e,U(e,`clsPrefix`)),S=X(()=>e.clearable&&!e.disabled&&(y.value||e.active)),E=X(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):$(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),D=X(()=>{let t=e.selectedOption;if(t)return t[e.labelField]}),k=X(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function A(){let{value:t}=i;if(t){let{value:n}=o;n&&(n.style.width=`${t.offsetWidth}px`,e.maxTagCount!==`responsive`&&h.value?.sync({showAllItemsBeforeCalculate:!1}))}}function j(){let{value:e}=g;e&&(e.style.display=`none`)}function ee(){let{value:e}=g;e&&(e.style.display=`inline-block`)}T(U(e,`active`),e=>{e||j()}),T(U(e,`pattern`),()=>{e.multiple&&c(A)});function M(t){let{onFocus:n}=e;n&&n(t)}function N(t){let{onBlur:n}=e;n&&n(t)}function P(t){let{onDeleteOption:n}=e;n&&n(t)}function F(t){let{onClear:n}=e;n&&n(t)}function I(t){let{onPatternInput:n}=e;n&&n(t)}function L(e){(!e.relatedTarget||!s.value?.contains(e.relatedTarget))&&M(e)}function z(e){s.value?.contains(e.relatedTarget)||N(e)}function B(e){F(e)}function H(){y.value=!0}function W(){y.value=!1}function G(t){!e.active||!e.filterable||t.target!==o.value&&t.preventDefault()}function K(e){P(e)}let q=R(!1);function te(t){if(t.key===`Backspace`&&!q.value&&!e.pattern.length){let{selectedOptions:t}=e;t?.length&&K(t[t.length-1])}}let J=null;function ne(t){let{value:n}=i;n&&(n.textContent=t.target.value,A()),e.ignoreComposition&&q.value?J=t:I(t)}function re(){q.value=!0}function ie(){q.value=!1,e.ignoreComposition&&I(J),J=null}function ae(t){v.value=!0,e.onPatternFocus?.(t)}function oe(t){v.value=!1,e.onPatternBlur?.(t)}function Z(){if(e.filterable)v.value=!1,d.value?.blur(),o.value?.blur();else if(e.multiple){let{value:e}=l;e?.blur()}else{let{value:e}=u;e?.blur()}}function se(){e.filterable?(v.value=!1,d.value?.focus()):e.multiple?l.value?.focus():u.value?.focus()}function ce(){let{value:e}=o;e&&(ee(),e.focus())}function le(){let{value:e}=o;e&&e.blur()}function Q(e){let{value:t}=f;t&&t.setTextContent(`+${e}`)}function ue(){let{value:e}=p;return e}function de(){return o.value}let fe=null;function pe(){fe!==null&&window.clearTimeout(fe)}function me(){e.active||(pe(),fe=window.setTimeout(()=>{k.value&&(_.value=!0)},100))}function he(){pe()}function ge(e){e||(pe(),_.value=!1)}T(k,e=>{e||(_.value=!1)}),b(()=>{m(()=>{let t=d.value;t&&(e.disabled?t.removeAttribute(`tabindex`):t.tabIndex=v.value?-1:0)})}),Ke(s,e.onResize);let{inlineThemeDisabled:_e}=e,ve=X(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:S,arrowColor:C,arrowColorDisabled:w,loadingColor:T,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:k,boxShadowHoverWarning:A,borderWarning:j,borderFocusWarning:ee,borderHoverWarning:M,borderActiveWarning:N,colorActiveError:P,boxShadowFocusError:F,boxShadowActiveError:I,boxShadowHoverError:L,borderError:R,borderFocusError:z,borderHoverError:B,borderActiveError:H,clearColor:U,clearColorHover:W,clearColorPressed:G,clearSize:K,arrowSize:q,[O(`height`,t)]:te,[O(`fontSize`,t)]:J}}=x.value,Y=V(c),ne=V(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":S,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":J,"--n-height":te,"--n-padding-single-top":Y.top,"--n-padding-multiple-top":ne.top,"--n-padding-single-right":Y.right,"--n-padding-multiple-right":ne.right,"--n-padding-single-left":Y.left,"--n-padding-multiple-left":ne.left,"--n-padding-single-bottom":Y.bottom,"--n-padding-multiple-bottom":ne.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":C,"--n-arrow-color-disabled":w,"--n-loading-color":T,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":k,"--n-box-shadow-hover-warning":A,"--n-border-warning":j,"--n-border-focus-warning":ee,"--n-border-hover-warning":M,"--n-border-active-warning":N,"--n-color-active-error":P,"--n-box-shadow-focus-error":F,"--n-box-shadow-active-error":I,"--n-box-shadow-hover-error":L,"--n-border-error":R,"--n-border-focus-error":z,"--n-border-hover-error":B,"--n-border-active-error":H,"--n-clear-size":K,"--n-clear-color":U,"--n-clear-color-hover":W,"--n-clear-color-pressed":G,"--n-arrow-size":q,"--n-font-weight":r}}),ye=_e?C(`internal-selection`,X(()=>e.size[0]),ve,e):void 0;return{mergedTheme:x,mergedClearable:S,mergedClsPrefix:t,rtlEnabled:r,patternInputFocused:v,filterablePlaceholder:E,label:D,selected:k,showTagsPanel:_,isComposing:q,counterRef:f,counterWrapperRef:p,patternInputMirrorRef:i,patternInputRef:o,selfRef:s,multipleElRef:l,singleElRef:u,patternInputWrapperRef:d,overflowRef:h,inputTagElRef:g,handleMouseDown:G,handleFocusin:L,handleClear:B,handleMouseEnter:H,handleMouseLeave:W,handleDeleteOption:K,handlePatternKeyDown:te,handlePatternInputInput:ne,handlePatternInputBlur:oe,handlePatternInputFocus:ae,handleMouseEnterCounter:me,handleMouseLeaveCounter:he,handleFocusout:z,handleCompositionEnd:ie,handleCompositionStart:re,onPopoverUpdateShow:ge,focus:se,focusInput:ce,blur:Z,blurInput:le,updateCounter:Q,getCounter:ue,getTail:de,renderLabel:e.renderLabel,cssVars:_e?void 0:ve,themeClass:ye?.themeClass,onRender:ye?.onRender}},render(){let{status:e,multiple:t,size:n,disabled:r,filterable:a,maxTagCount:s,bordered:c,clsPrefix:l,ellipsisTagPopoverProps:d,onRender:f,renderTag:p,renderLabel:m}=this;f?.();let h=s===`responsive`,v=typeof s==`number`,b=h||v,x=(y(),i(u,null,{default:()=>(y(),i(oe,{clsPrefix:l,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),S;if(t){let{labelField:e}=this,t=t=>(y(),_(`div`,{class:J(`${l}-base-selection-tag-wrapper`),key:t.value},[p?(y(),_(E,{key:0},[W(()=>p({option:t,handleClose:()=>{this.handleDeleteOption(t)}}))],64)):(y(),i(xe,{key:1,size:n,closable:!t.disabled,disabled:r,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>m?m(t,!0):$(t[e],t,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),c=()=>(v?this.selectedOptions.slice(0,s):this.selectedOptions).map(t),u=a?(y(),_(`div`,{class:J(`${l}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[g(`input`,o(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:r,value:this.pattern,autofocus:this.autofocus,class:`${l}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,lt),g(`span`,{ref:`patternInputMirrorRef`,class:J(`${l}-base-selection-input-tag__mirror`)},[W(()=>this.pattern)],2)],2)):null,f=h?()=>(y(),_(`div`,{class:J(`${l}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(y(),i(xe,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:r},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,C;if(v){let e=this.selectedOptions.length-s;e>0&&(C=(t=>(y(),_(`div`,{class:J(`${l}-base-selection-tag-wrapper`),key:`__counter__`},[(y(),i(xe,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:r},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(C))}let w=h?a?(y(),i(be,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:c,counter:f,tail:()=>u},1032,[`updateCounter`,`getCounter`,`getTail`])):(y(),i(be,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:c,counter:f},1032,[`updateCounter`,`getCounter`])):v&&C?c().concat(C):c(),T=b?()=>(y(),_(`div`,{class:J(`${l}-base-selection-popover`)},[h?(y(),_(E,{key:0},[W(()=>c())],64)):(y(),_(E,{key:1},[W(()=>this.selectedOptions.map(t))],64))],2)):void 0,D=b?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...d}:null,O=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(y(),_(`div`,{key:5,class:J(`${l}-base-selection-placeholder ${l}-base-selection-overlay`)},[g(`div`,{class:J(`${l}-base-selection-placeholder__inner`)},[W(()=>this.placeholder)],2)],2)):null,k=a?(y(),_(`div`,{key:6,ref:`patternInputWrapperRef`,class:J(`${l}-base-selection-tags`)},[W(()=>w),h?W(()=>null):(y(),_(E,{key:1},[W(()=>u)],64)),W(()=>x)],2)):(y(),_(`div`,{key:7,ref:`multipleElRef`,class:J(`${l}-base-selection-tags`),tabindex:r?void 0:0},[W(()=>w),W(()=>x)],10,ut));S=(e=>(y(),_(E,{key:8},[b?(y(),i(pe,o({key:0},D,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>k,default:T},1040)):(y(),_(E,{key:1},[W(()=>k)],64)),W(()=>O)],64)))(S)}else if(a){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;S=(e=>(y(),_(`div`,{key:9,ref:`patternInputWrapperRef`,class:J(`${l}-base-selection-label`),title:this.patternInputFocused?void 0:Ge(this.label)},[g(`input`,o(this.inputProps,{ref:`patternInputRef`,class:`${l}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:r,disabled:r,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,ft),n?(y(),_(`div`,{class:J(`${l}-base-selection-label__render-label ${l}-base-selection-overlay`),key:`input`},[g(`div`,{class:J(`${l}-base-selection-overlay__wrapper`)},[p?(y(),_(E,{key:0},[W(()=>p({option:this.selectedOption,handleClose:()=>{}}))],64)):(y(),_(E,{key:1},[m?(y(),_(E,{key:0},[W(()=>m(this.selectedOption,!0))],64)):(y(),_(E,{key:1},[W(()=>$(this.label,this.selectedOption,!0))],64))],64))],2)],2)):W(()=>null),t?(y(),_(`div`,{class:J(`${l}-base-selection-placeholder ${l}-base-selection-overlay`),key:`placeholder`},[g(`div`,{class:J(`${l}-base-selection-overlay__wrapper`)},[W(()=>this.filterablePlaceholder)],2)],2)):W(()=>null),W(()=>x)],10,dt)))(S)}else S=(e=>(y(),_(`div`,{key:10,ref:`singleElRef`,class:J(`${l}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(y(),_(`div`,{class:J(`${l}-base-selection-placeholder ${l}-base-selection-overlay`),key:`placeholder`},[g(`div`,{class:J(`${l}-base-selection-placeholder__inner`)},[W(()=>this.placeholder)],2)],2)):(y(),_(`div`,{class:J(`${l}-base-selection-input`),title:Ge(this.label),key:`input`},[g(`div`,{class:J(`${l}-base-selection-input__content`)},[p?(y(),_(E,{key:0},[W(()=>p({option:this.selectedOption,handleClose:()=>{}}))],64)):(y(),_(E,{key:1},[m?(y(),_(E,{key:0},[W(()=>m(this.selectedOption,!0))],64)):(y(),_(E,{key:1},[W(()=>$(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),W(()=>x)],10,pt)))(S);return y(),_(`div`,{ref:`selfRef`,class:J([`${l}-base-selection`,this.rtlEnabled&&`${l}-base-selection--rtl`,this.themeClass,e&&`${l}-base-selection--${e}-status`,{[`${l}-base-selection--active`]:this.active,[`${l}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${l}-base-selection--disabled`]:this.disabled,[`${l}-base-selection--multiple`]:this.multiple,[`${l}-base-selection--focus`]:this.focused}]),style:D(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[W(()=>S),c?(y(),_(`div`,{key:0,class:J(`${l}-base-selection__border`)},null,2)):W(()=>null),c?(y(),_(`div`,{key:2,class:J(`${l}-base-selection__state-border`)},null,2)):W(()=>null)],46,mt)}}),gt=e([j(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),j(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[we({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),_t={...w.props,to:se.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},vt=L({name:`Select`,props:_t,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=Y(e),o=w(`Select`,`-select`,gt,Ce,e,t),c=R(e.defaultValue),l=U(e,`value`),u=ve(l,c),d=R(!1),f=R(``),p=ye(e,[`items`,`options`]),m=R([]),h=R([]),g=X(()=>h.value.concat(m.value).concat(p.value)),_=X(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return it(e,i);let a=t[r];return typeof a==`string`?it(e,a):typeof a==`number`&&it(e,String(a))}}),y=X(()=>{if(e.remote)return p.value;{let{value:t}=g,{value:n}=f;return!n.length||!e.filterable?t:ot(t,_.value,n,e.childrenField)}}),b=X(()=>{let{valueField:t,childrenField:n}=e,r=at(t,n);return he(y.value,r)}),x=X(()=>st(g.value,e.valueField,e.childrenField)),S=R(!1),E=ve(U(e,`show`),S),D=R(null),O=R(null),A=R(null),{localeRef:j}=ae(`Select`),ee=X(()=>e.placeholder??j.value.placeholder),M=[],N=R(new Map),P=X(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function F(t){let n=e.remote,{value:r}=N,{value:i}=x,{value:a}=P,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let I=X(()=>{if(e.multiple){let{value:e}=u;return Array.isArray(e)?F(e):[]}return null}),L=X(()=>{let{value:t}=u;return!e.multiple&&!Array.isArray(t)?t===null?null:F([t])[0]||null:null}),z=ne(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:a?.value?.Select?.size||`medium`}}),{mergedSizeRef:B,mergedDisabledRef:V,mergedStatusRef:H}=z;function W(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:l}=z;r&&s(r,t,n),a&&s(a,t,n),i&&s(i,t,n),c.value=t,o(),l()}function G(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=z;n&&s(n,t),r()}function K(){let{onClear:t}=e;t&&s(t)}function q(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=z;n&&s(n,t),i(),r&&oe()}function te(t){let{onSearch:n}=e;n&&s(n,t)}function J(t){let{onScroll:n}=e;n&&s(n,t)}function re(){let{remote:t,multiple:n}=e;if(t){let{value:t}=N;if(n){let{valueField:n}=e;I.value?.forEach(e=>{t.set(e[n],e)})}else{let n=L.value;n&&t.set(n[e.valueField],n)}}}function ie(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&s(n,t),r&&s(r,t),S.value=t}function oe(){V.value||(ie(!0),S.value=!0,e.filterable&&Ne())}function Z(){ie(!1)}function le(){f.value=``,h.value=M}let Q=R(!1);function ue(){e.filterable&&(Q.value=!0)}function de(){e.filterable&&(Q.value=!1,E.value||le())}function fe(){V.value||(E.value?e.filterable?Ne():Z():oe())}function pe(e){A.value?.selfRef?.contains(e.relatedTarget)||(d.value=!1,G(e),Z())}function me(e){q(e),d.value=!0}function ge(){d.value=!0}function _e(e){D.value?.$el.contains(e.relatedTarget)||(d.value=!1,G(e),Z())}function be(){D.value?.focus(),Z()}function xe(e){E.value&&(D.value?.$el.contains(k(e))||Z())}function Se(t){if(!Array.isArray(t))return[];if(P.value)return Array.from(t);{let{remote:n}=e,{value:r}=x;if(n){let{value:e}=N;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function we(e){Te(e.rawNode)}function Te(t){if(V.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=h,t=e[0]||null;if(t){let e=m.value;e.length?e.push(t):m.value=[t],h.value=M}}if(r&&N.value.set(t[a],t),e.multiple){let e=Se(u.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=$(t[a]);~e&&(m.value.splice(e,1),i&&(f.value=``))}}else e.push(t[a]),i&&(f.value=``);W(e,F(e))}else{if(n&&!r){let e=$(t[a]);~e?m.value=[m.value[e]]:m.value=M}Me(),Z(),W(t[a],t)}}function $(t){return m.value.findIndex(n=>n[e.valueField]===t)}function Ee(t){E.value||oe();let{value:n}=t.target;f.value=n;let{tag:r,remote:i}=e;if(te(n),r&&!i){if(!n){h.value=M;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;p.value.some(e=>e[i]===r[i]||e[a]===r[a])||m.value.some(e=>e[i]===r[i]||e[a]===r[a])?h.value=M:h.value=[r]}}function Oe(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Z(),r&&!i&&a&&(m.value=M),K(),n?W([],[]):W(null,null)}function ke(e){!ce(e,`action`)&&!ce(e,`empty`)&&!ce(e,`header`)&&e.preventDefault()}function Ae(e){J(e)}function je(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!D.value?.isComposing){if(E.value){let t=A.value?.getPendingTmNode();t?we(t):e.filterable||(Z(),Me())}else if(oe(),e.tag&&Q.value){let t=h.value[0];if(t){let n=t[e.valueField],{value:r}=u;e.multiple&&Array.isArray(r)&&r.includes(n)||Te(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;E.value&&A.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;E.value?A.value?.next():oe();break;case`Escape`:E.value&&(De(t),Z()),D.value?.focus()}}function Me(){D.value?.focus()}function Ne(){D.value?.focusInput()}function Pe(){E.value&&O.value?.syncPosition()}re(),T(U(e,`options`),re);let Fe={focus:()=>{D.value?.focus()},focusInput:()=>{D.value?.focusInput()},blur:()=>{D.value?.blur()},blurInput:()=>{D.value?.blurInput()}},Ie=X(()=>{let{self:{menuBoxShadow:e}}=o.value;return{"--n-menu-box-shadow":e}}),Le=i?C(`select`,void 0,Ie,e):void 0;return{...Fe,mergedStatus:H,mergedClsPrefix:t,mergedBordered:n,namespace:r,treeMate:b,isMounted:v(),triggerRef:D,menuRef:A,pattern:f,uncontrolledShow:S,mergedShow:E,adjustedTo:se(e),uncontrolledValue:c,mergedValue:u,followerRef:O,localizedPlaceholder:ee,selectedOption:L,selectedOptions:I,mergedSize:B,mergedDisabled:V,focused:d,activeWithoutMenuOpen:Q,inlineThemeDisabled:i,onTriggerInputFocus:ue,onTriggerInputBlur:de,handleTriggerOrMenuResize:Pe,handleMenuFocus:ge,handleMenuBlur:_e,handleMenuTabOut:be,handleTriggerClick:fe,handleToggle:we,handleDeleteOption:Te,handlePatternInput:Ee,handleClear:Oe,handleTriggerBlur:pe,handleTriggerFocus:me,handleKeydown:je,handleMenuAfterLeave:le,handleMenuClickOutside:xe,handleMenuScroll:Ae,handleMenuKeydown:je,handleMenuMousedown:ke,mergedTheme:o,cssVars:i?void 0:Ie,themeClass:Le?.themeClass,onRender:Le?.onRender}},render(){return y(),_(`div`,{class:J(`${this.mergedClsPrefix}-select`)},[p(ge,null,{_:1,default:A(()=>[(y(),i(le,null,{_:1,default:A(()=>(y(),i(ht,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:A(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(y(),i(de,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===se.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:A(()=>(y(),i(te,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:A(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),ee((y(),i(tt,o(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:A(()=>[this.$slots.empty?.()]),header:A(()=>[this.$slots.header?.()]),action:A(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[H,this.mergedShow],[Ee,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Ee,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{Ne as a,We as i,at as n,tt as r,vt as t};