import{$t as e,An as t,At as n,C as r,En as i,Fn as a,Ft as o,Gn as s,Gt as c,Ht as l,In as u,Jn as d,Jt as f,Kn as p,Kt as m,Mn as h,On as g,Ot as _,P as v,Pn as y,Pt as b,Qt as x,Wt as S,Yt as C,Zt as w,_ as T,an as E,cn as D,dt as ee,en as O,fn as k,ft as A,gn as j,gt as M,j as N,jn as P,k as F,kt as I,pt as te,rr as L,sr as R,wn as z,wt as B,xt as V,yt as H,zn as U}from"./client-7ydMUZih.js";import{t as W}from"./next-frame-once-qdYFoq8G.js";import{i as G,n as ne,r as K,t as q}from"./create-CGC1bxDs.js";import{l as J}from"./light-CqZR8w70.js";import{a as Y,c as re,d as ie,i as ae,l as oe,o as se,s as ce,t as X,u as Z}from"./Popover-DVKrOGCB.js";import{t as le}from"./use-merged-state-Bt7Nbk0v.js";import{i as ue}from"./text-DpqooQtL.js";import{t as de}from"./use-locale-CYmXdobE.js";import{n as fe}from"./Input-Cgl6tG0Q.js";import{a as Q,r as pe,s as me,t as he}from"./light-ntxv2tWs.js";import{n as ge}from"./Icon-BLwMAvxr.js";import{E as _e,P as ve,j as $}from"./index-DHYLQA2V.js";function ye(e){return e&-e}var be=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=ye(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=ye(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},xe;function Se(){return typeof document>`u`?!1:(xe===void 0&&(xe=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),xe)}var Ce;function we(){return typeof document>`u`?1:(Ce===void 0&&(Ce=`chrome`in window?window.devicePixelRatio:1),Ce)}var Te=`VVirtualListXScroll`;function Ee({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=L(0),i=L(0),a=j(()=>{let t=e.value;if(t.length===0)return null;let n=new be(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),s=o(()=>{let e=a.value;return e===null?0:Math.max(e.getBound(i.value)-1,0)}),c=e=>{let t=a.value;return t===null?0:t.sum(e)},l=o(()=>{let t=a.value;return t===null?0:Math.min(t.getBound(i.value+r.value)+1,e.value.length-1)});return U(Te,{startIndexRef:s,endIndexRef:l,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:c}),{listWidthRef:r,scrollLeftRef:i}}var De=z({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=g(Te);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),Oe=Y(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[Y(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[Y(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),ke=z({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=n();Oe.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:se,ssr:t}),u(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&C({key:n}):C({index:t})});let r=!1,i=!1;h(()=>{if(r=!1,!i){i=!0;return}C({top:b.value,left:f.value})}),a(()=>{r=!0,i||=!0});let s=o(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),d=j(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:f,listWidthRef:p}=Ee({columnsRef:R(e,`columns`),renderColRef:R(e,`renderCol`),renderItemWithColsRef:R(e,`renderItemWithCols`)}),m=L(null),g=L(void 0),_=new Map,v=j(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new be(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=_.get(n);a!==void 0&&i.add(t,a)}),i}),y=L(0),b=L(0),x=o(()=>Math.max(v.value.getBound(b.value-l(e.paddingTop))-1,0)),S=j(()=>{let{value:t}=g;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=x.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),C=(e,t)=>{if(typeof e==`number`){D(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:o,behavior:s,debounce:c=!0}=e;if(n!==void 0||r!==void 0)D(n,r,s);else if(i!==void 0)E(i,s,c);else if(a!==void 0){let e=d.value.get(a);e!==void 0&&E(e,s,c)}else o===`bottom`?D(0,2**53-1,s):o===`top`&&D(0,0,s)},w,T=null;function E(t,n,r){let{value:i}=v,a=i.sum(t)+l(e.paddingTop);if(!r)m.value.scrollTo({left:0,top:a,behavior:n});else{w=t,T!==null&&window.clearTimeout(T),T=window.setTimeout(()=>{w=void 0,T=null},16);let{scrollTop:e,offsetHeight:r}=m.value;if(a>e){let o=i.get(t);a+o<=e+r||m.value.scrollTo({left:0,top:a+o-r,behavior:n})}else m.value.scrollTo({left:0,top:a,behavior:n})}}function D(e,t,n){m.value.scrollTo({left:e,top:t,behavior:n})}function ee(t,n){if(r||e.ignoreItemResize||F(n.target))return;let{value:i}=v,a=d.value.get(t),o=i.get(a),s=n.borderBoxSize?.[0]?.blockSize??n.contentRect.height;if(s===o)return;s-e.itemSize===0?_.delete(t):_.set(t,s-e.itemSize);let c=s-o;if(c===0)return;i.add(a,c);let l=m.value;if(l!=null){if(w===void 0){let e=i.sum(a);l.scrollTop>e&&l.scrollBy(0,c)}else(a<w||a===w&&s+i.sum(a)>l.scrollTop+l.offsetHeight)&&l.scrollBy(0,c);P()}y.value++}let O=!Se(),k=!1;function A(t){var n;(n=e.onScroll)==null||n.call(e,t),(!O||!k)&&P()}function M(t){var n;if((n=e.onWheel)==null||n.call(e,t),O){let e=m.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/we(),e.scrollLeft+=t.deltaX/we(),P(),k=!0,W(()=>{k=!1})}}}function N(t){if(r||F(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===g.value)return}else if(t.contentRect.height===g.value&&t.contentRect.width===p.value)return;g.value=t.contentRect.height,p.value=t.contentRect.width;let{onResize:n}=e;n!==void 0&&n(t)}function P(){let{value:e}=m;e!=null&&(b.value=e.scrollTop,f.value=e.scrollLeft)}function F(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:g,listStyle:{overflow:`auto`},keyToIndex:d,itemsStyle:j(()=>{let{itemResizable:t}=e,n=c(v.value.sum());return y.value,[e.itemsStyle,{boxSizing:`content-box`,width:c(s.value),height:t?``:n,minHeight:t?n:``,paddingTop:c(e.paddingTop),paddingBottom:c(e.paddingBottom)}]}),visibleItemsStyle:j(()=>(y.value,{transform:`translateY(${c(v.value.sum(x.value))})`})),viewportItems:S,listElRef:m,itemsElRef:L(null),scrollTo:C,handleListResize:N,handleListScroll:A,handleListWheel:M,handleItemResize:ee}},render(){let{itemResizable:e,keyField:n,keyToIndex:r,visibleItemsTag:a}=this;return i(_,{onResize:this.handleListResize},{default:()=>{var o;return i(`div`,t(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(o=this.$slots).empty?.call(o):i(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[i(a,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:t,renderItemWithCols:a}=this;return this.viewportItems.map(o=>{let s=o[n],c=r.get(s),l=t==null?void 0:i(De,{index:c,item:o}),u=a==null?void 0:i(De,{index:c,item:o}),d=this.$slots.default({item:o,renderedCols:l,renderedItemWithCols:u,index:c})[0];return e?i(_,{key:s,onResize:e=>this.handleItemResize(s,e)},{default:()=>d}):(d.key=s,d)})}})])])}})}});function Ae(e,t){t&&(u(()=>{let{value:n}=e;n&&I.registerHandler(n,t)}),s(e,(e,t)=>{t&&I.unregisterHandler(t)},{deep:!1}),y(()=>{let{value:t}=e;t&&I.unregisterHandler(t)}))}function je(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function Me(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var Ne=z({name:`Checkmark`,render(){return i(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},i(`g`,{fill:`none`},i(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})))}}),Pe=z({name:`Empty`,render(){return i(`svg`,{viewBox:`0 0 28 28`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},i(`path`,{d:`M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z`,fill:`currentColor`}),i(`path`,{d:`M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z`,fill:`currentColor`}))}}),Fe=z({props:{onFocus:Function,onBlur:Function},setup(e){return()=>i(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),Ie=C(`empty`,`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[w(`icon`,`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[f(`+`,[w(`description`,`
 margin-top: 8px;
 `)])]),w(`description`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),w(`extra`,`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Le=Object.assign(Object.assign({},N.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:`medium`},renderIcon:Function}),Re=z({name:`Empty`,props:Le,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=te(e),a=N(`Empty`,`-empty`,Ie,me,e,t),{localeRef:o}=de(`Empty`),s=j(()=>e.description??r?.value?.Empty?.description),c=j(()=>r?.value?.Empty?.renderIcon||(()=>i(Pe,null))),l=j(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{[O(`iconSize`,t)]:r,[O(`fontSize`,t)]:i,textColor:o,iconColor:s,extraTextColor:c}}=a.value;return{"--n-icon-size":r,"--n-font-size":i,"--n-bezier":n,"--n-text-color":o,"--n-icon-color":s,"--n-extra-text-color":c}}),u=n?A(`empty`,j(()=>{let t=``,{size:n}=e;return t+=n[0],t}),l,e):void 0;return{mergedClsPrefix:t,mergedRenderIcon:c,localizedDescription:j(()=>s.value||o.value.description),cssVars:n?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,onRender:n}=this;return n?.(),i(`div`,{class:[`${t}-empty`,this.themeClass],style:this.cssVars},this.showIcon?i(`div`,{class:`${t}-empty__icon`},e.icon?e.icon():i(F,{clsPrefix:t},{default:this.mergedRenderIcon})):null,this.showDescription?i(`div`,{class:`${t}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?i(`div`,{class:`${t}-empty__extra`},e.extra()):null)}}),ze=z({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=g(ie);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:a}}=this,o=r?.(a),s=t?t(a,!1):$(a[this.labelField],a,!1),c=i(`div`,Object.assign({},o,{class:[`${e}-base-select-group-header`,o?.class]}),s);return a.render?a.render({node:c,option:a}):n?n({node:c,option:a,selected:!1}):c}});function Be(e,t){return i(E,{name:`fade-in-scale-up-transition`},{default:()=>e?i(F,{clsPrefix:t,class:`${t}-base-select-option__check`},{default:()=>i(Ne)}):null})}var Ve=z({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:s,labelFieldRef:c,valueFieldRef:l,showCheckmarkRef:u,nodePropsRef:d,handleOptionClick:f,handleOptionMouseEnter:p}=g(ie),m=o(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function _(t){let{tmNode:n}=e;n.disabled||p(t,n)}function v(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:o(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:u,nodeProps:d,isPending:m,isSelected:o(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[l.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:c,renderLabel:a,renderOption:s,handleMouseMove:v,handleMouseEnter:_,handleClick:h}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:a,showCheckmark:o,nodeProps:s,renderOption:c,renderLabel:l,handleClick:u,handleMouseEnter:d,handleMouseMove:f}=this,p=Be(n,e),m=l?[l(t,n),o&&p]:[$(t[this.labelField],t,n),o&&p],h=s?.(t),g=i(`div`,Object.assign({},h,{class:[`${e}-base-select-option`,t.class,h?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:a,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:o}],style:[h?.style||``,t.style||``],onClick:Me([u,h?.onClick]),onMouseenter:Me([d,h?.onMouseenter]),onMousemove:Me([f,h?.onMousemove])}),i(`div`,{class:`${e}-base-select-option__content`},m));return t.render?t.render({node:g,option:t,selected:n}):c?c({node:g,option:t,selected:n}):g}}),He=C(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[C(`scrollbar`,`
 max-height: var(--n-height);
 `),C(`virtual-list`,`
 max-height: var(--n-height);
 `),C(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[w(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),C(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),C(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),w(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),w(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),w(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),w(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),C(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),C(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[x(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),f(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),f(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),x(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),x(`pending`,[f(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),x(`selected`,`
 color: var(--n-option-text-color-active);
 `,[f(`&::before`,`
 background-color: var(--n-option-color-active);
 `),x(`pending`,[f(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),x(`disabled`,`
 cursor: not-allowed;
 `,[e(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),x(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),w(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[_e({enterScale:`0.5`})])])]),Ue=z({name:`InternalSelectMenu`,props:Object.assign(Object.assign({},N.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function}),setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n,mergedComponentPropsRef:r}=te(e),i=v(`InternalSelectMenu`,n,t),a=N(`InternalSelectMenu`,`-internal-select-menu`,He,Q,e,R(e,`clsPrefix`)),o=L(null),c=L(null),d=L(null),f=j(()=>e.treeMate.getFlattenedNodes()),p=j(()=>ne(f.value)),m=L(null);function h(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),K(n||null)}function g(){let{value:t}=m;t&&!e.treeMate.getNode(t.key)&&(m.value=null)}let _;s(()=>e.show,t=>{t?_=s(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?h():g(),P(q)):g()},{immediate:!0}):_?.()},{immediate:!0}),y(()=>{_?.()});let b=j(()=>l(a.value.self[O(`optionHeight`,e.size)])),x=j(()=>S(a.value.self[O(`padding`,e.size)])),C=j(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),w=j(()=>{let e=f.value;return e&&e.length===0}),T=j(()=>r?.value?.Select?.renderEmpty);function E(t){let{onToggle:n}=e;n&&n(t)}function D(t){let{onScroll:n}=e;n&&n(t)}function ee(e){var t;(t=d.value)==null||t.sync(),D(e)}function k(){var e;(e=d.value)==null||e.sync()}function M(){let{value:e}=m;return e||null}function F(e,t){t.disabled||K(t,!1)}function I(e,t){t.disabled||E(t)}function z(t){var n;G(t,`action`)||(n=e.onKeyup)==null||n.call(e,t)}function B(t){var n;G(t,`action`)||(n=e.onKeydown)==null||n.call(e,t)}function V(t){var n;(n=e.onMousedown)==null||n.call(e,t),!e.focusable&&t.preventDefault()}function H(){let{value:e}=m;e&&K(e.getNext({loop:!0}),!0)}function W(){let{value:e}=m;e&&K(e.getPrev({loop:!0}),!0)}function K(e,t=!1){m.value=e,t&&q()}function q(){var t,n;let r=m.value;if(!r)return;let i=p.value(r.key);i!==null&&(e.virtualScroll?(t=c.value)==null||t.scrollTo({index:i}):(n=d.value)==null||n.scrollTo({index:i,elSize:b.value}))}function J(t){var n;o.value?.contains(t.target)&&((n=e.onFocus)==null||n.call(e,t))}function Y(t){var n;o.value?.contains(t.relatedTarget)||(n=e.onBlur)==null||n.call(e,t)}U(ie,{handleOptionMouseEnter:F,handleOptionClick:I,valueSetRef:C,pendingTmNodeRef:m,nodePropsRef:R(e,`nodeProps`),showCheckmarkRef:R(e,`showCheckmark`),multipleRef:R(e,`multiple`),valueRef:R(e,`value`),renderLabelRef:R(e,`renderLabel`),renderOptionRef:R(e,`renderOption`),labelFieldRef:R(e,`labelField`),valueFieldRef:R(e,`valueField`)}),U(Z,o),u(()=>{let{value:e}=d;e&&e.sync()});let re=j(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:o,groupHeaderTextColor:s,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[O(`optionFontSize`,t)]:x,[O(`optionHeight`,t)]:C,[O(`optionPadding`,t)]:w}}=a.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":o,"--n-option-font-size":x,"--n-group-header-text-color":s,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":C,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":w,"--n-option-padding-left":S(w,`left`),"--n-option-padding-right":S(w,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:ae}=e,oe=ae?A(`internal-select-menu`,j(()=>e.size[0]),re,e):void 0,se={selfRef:o,next:H,prev:W,getPendingTmNode:M};return Ae(o,e.onResize),Object.assign({mergedTheme:a,mergedClsPrefix:t,rtlEnabled:i,virtualListRef:c,scrollbarRef:d,itemSize:b,padding:x,flattenedNodes:f,empty:w,mergedRenderEmpty:T,virtualListContainer(){let{value:e}=c;return e?.listElRef},virtualListContent(){let{value:e}=c;return e?.itemsElRef},doScroll:D,handleFocusin:J,handleFocusout:Y,handleKeyUp:z,handleKeyDown:B,handleMouseDown:V,handleVirtualListResize:k,handleVirtualListScroll:ee,cssVars:ae?void 0:re,themeClass:oe?.themeClass,onRender:oe?.onRender},se)},render(){let{$slots:e,virtualScroll:t,clsPrefix:n,mergedTheme:a,themeClass:o,onRender:s}=this;return s?.(),i(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:[`${n}-base-select-menu`,`${n}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${n}-base-select-menu--rtl`,o,this.multiple&&`${n}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},V(e.header,e=>e&&i(`div`,{class:`${n}-base-select-menu__header`,"data-header":!0,key:`header`},e)),this.loading?i(`div`,{class:`${n}-base-select-menu__loading`},i(r,{clsPrefix:n,strokeWidth:20})):this.empty?i(`div`,{class:`${n}-base-select-menu__empty`,"data-empty":!0},H(e.empty,()=>[this.mergedRenderEmpty?.call(this)||i(Re,{theme:a.peers.Empty,themeOverrides:a.peerOverrides.Empty,size:this.size})])):i(T,Object.assign({ref:`scrollbarRef`,theme:a.peers.Scrollbar,themeOverrides:a.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?i(ke,{ref:`virtualListRef`,class:`${n}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?i(ze,{key:e.key,clsPrefix:n,tmNode:e}):e.ignored?null:i(Ve,{clsPrefix:n,key:e.key,tmNode:e})}):i(`div`,{class:`${n}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(e=>e.isGroup?i(ze,{key:e.key,clsPrefix:n,tmNode:e}):i(Ve,{clsPrefix:n,key:e.key,tmNode:e})))}),V(e.action,e=>e&&[i(`div`,{class:`${n}-base-select-menu__action`,"data-action":!0,key:`action`},e),i(Fe,{onFocus:this.onTabOut,key:`focus-detector`})]))}}),We=f([C(`base-selection`,`
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
 `,[C(`base-loading`,`
 color: var(--n-loading-color);
 `),C(`base-selection-tags`,`min-height: var(--n-height);`),w(`border, state-border`,`
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
 `),w(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),C(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[w(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),C(`base-selection-overlay`,`
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
 `,[w(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),C(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[w(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),C(`base-selection-tags`,`
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
 `),C(`base-selection-label`,`
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
 `,[C(`base-selection-input`,`
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
 `,[w(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),w(`render-label`,`
 color: var(--n-text-color);
 `)]),e(`disabled`,[f(`&:hover`,[w(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),x(`focus`,[w(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),x(`active`,[w(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),C(`base-selection-label`,`background-color: var(--n-color-active);`),C(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),x(`disabled`,`cursor: not-allowed;`,[w(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),C(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[C(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),w(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),C(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),C(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),C(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[w(`input`,`
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
 `),w(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(t=>x(`${t}-status`,[w(`state-border`,`border: var(--n-border-${t});`),e(`disabled`,[f(`&:hover`,[w(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${t});
 border: var(--n-border-hover-${t});
 `)]),x(`active`,[w(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${t});
 border: var(--n-border-active-${t});
 `),C(`base-selection-label`,`background-color: var(--n-color-active-${t});`),C(`base-selection-tags`,`background-color: var(--n-color-active-${t});`)]),x(`focus`,[w(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${t});
 border: var(--n-border-focus-${t});
 `)])])]))]),C(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),C(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[f(`&:last-child`,`padding-right: 0;`),C(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[w(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Ge=z({name:`InternalSelection`,props:Object.assign(Object.assign({},N.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n}=te(e),r=v(`InternalSelection`,n,t),i=L(null),a=L(null),o=L(null),c=L(null),l=L(null),d=L(null),f=L(null),m=L(null),h=L(null),g=L(null),_=L(!1),y=L(!1),b=L(!1),x=N(`InternalSelection`,`-internal-selection`,We,pe,e,R(e,`clsPrefix`)),C=j(()=>e.clearable&&!e.disabled&&(b.value||e.active)),w=j(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):$(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),T=j(()=>{let t=e.selectedOption;if(t)return t[e.labelField]}),E=j(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function D(){var t;let{value:n}=i;if(n){let{value:r}=a;r&&(r.style.width=`${n.offsetWidth}px`,e.maxTagCount!==`responsive`&&((t=h.value)==null||t.sync({showAllItemsBeforeCalculate:!1})))}}function ee(){let{value:e}=g;e&&(e.style.display=`none`)}function k(){let{value:e}=g;e&&(e.style.display=`inline-block`)}s(R(e,`active`),e=>{e||ee()}),s(R(e,`pattern`),()=>{e.multiple&&P(D)});function M(t){let{onFocus:n}=e;n&&n(t)}function F(t){let{onBlur:n}=e;n&&n(t)}function I(t){let{onDeleteOption:n}=e;n&&n(t)}function z(t){let{onClear:n}=e;n&&n(t)}function B(t){let{onPatternInput:n}=e;n&&n(t)}function V(e){(!e.relatedTarget||!o.value?.contains(e.relatedTarget))&&M(e)}function H(e){o.value?.contains(e.relatedTarget)||F(e)}function U(e){z(e)}function W(){b.value=!0}function G(){b.value=!1}function ne(t){!e.active||!e.filterable||t.target!==a.value&&t.preventDefault()}function K(e){I(e)}let q=L(!1);function J(t){if(t.key===`Backspace`&&!q.value&&!e.pattern.length){let{selectedOptions:t}=e;t?.length&&K(t[t.length-1])}}let Y=null;function re(t){let{value:n}=i;n&&(n.textContent=t.target.value,D()),e.ignoreComposition&&q.value?Y=t:B(t)}function ie(){q.value=!0}function ae(){q.value=!1,e.ignoreComposition&&B(Y),Y=null}function oe(t){var n;y.value=!0,(n=e.onPatternFocus)==null||n.call(e,t)}function se(t){var n;y.value=!1,(n=e.onPatternBlur)==null||n.call(e,t)}function ce(){var t,n;if(e.filterable)y.value=!1,(t=d.value)==null||t.blur(),(n=a.value)==null||n.blur();else if(e.multiple){let{value:e}=c;e?.blur()}else{let{value:e}=l;e?.blur()}}function X(){var t,n,r;e.filterable?(y.value=!1,(t=d.value)==null||t.focus()):e.multiple?(n=c.value)==null||n.focus():(r=l.value)==null||r.focus()}function Z(){let{value:e}=a;e&&(k(),e.focus())}function le(){let{value:e}=a;e&&e.blur()}function ue(e){let{value:t}=f;t&&t.setTextContent(`+${e}`)}function de(){let{value:e}=m;return e}function fe(){return a.value}let Q=null;function me(){Q!==null&&window.clearTimeout(Q)}function he(){e.active||(me(),Q=window.setTimeout(()=>{E.value&&(_.value=!0)},100))}function ge(){me()}function _e(e){e||(me(),_.value=!1)}s(E,e=>{e||(_.value=!1)}),u(()=>{p(()=>{let t=d.value;t&&(e.disabled?t.removeAttribute(`tabindex`):t.tabIndex=y.value?-1:0)})}),Ae(o,e.onResize);let{inlineThemeDisabled:ve}=e,ye=j(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:C,arrowColor:w,arrowColorDisabled:T,loadingColor:E,colorActiveWarning:D,boxShadowFocusWarning:ee,boxShadowActiveWarning:k,boxShadowHoverWarning:A,borderWarning:j,borderFocusWarning:M,borderHoverWarning:N,borderActiveWarning:P,colorActiveError:F,boxShadowFocusError:I,boxShadowActiveError:te,boxShadowHoverError:L,borderError:R,borderFocusError:z,borderHoverError:B,borderActiveError:V,clearColor:H,clearColorHover:U,clearColorPressed:W,clearSize:G,arrowSize:ne,[O(`height`,t)]:K,[O(`fontSize`,t)]:q}}=x.value,J=S(c),Y=S(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":C,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":q,"--n-height":K,"--n-padding-single-top":J.top,"--n-padding-multiple-top":Y.top,"--n-padding-single-right":J.right,"--n-padding-multiple-right":Y.right,"--n-padding-single-left":J.left,"--n-padding-multiple-left":Y.left,"--n-padding-single-bottom":J.bottom,"--n-padding-multiple-bottom":Y.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":w,"--n-arrow-color-disabled":T,"--n-loading-color":E,"--n-color-active-warning":D,"--n-box-shadow-focus-warning":ee,"--n-box-shadow-active-warning":k,"--n-box-shadow-hover-warning":A,"--n-border-warning":j,"--n-border-focus-warning":M,"--n-border-hover-warning":N,"--n-border-active-warning":P,"--n-color-active-error":F,"--n-box-shadow-focus-error":I,"--n-box-shadow-active-error":te,"--n-box-shadow-hover-error":L,"--n-border-error":R,"--n-border-focus-error":z,"--n-border-hover-error":B,"--n-border-active-error":V,"--n-clear-size":G,"--n-clear-color":H,"--n-clear-color-hover":U,"--n-clear-color-pressed":W,"--n-arrow-size":ne,"--n-font-weight":r}}),be=ve?A(`internal-selection`,j(()=>e.size[0]),ye,e):void 0;return{mergedTheme:x,mergedClearable:C,mergedClsPrefix:t,rtlEnabled:r,patternInputFocused:y,filterablePlaceholder:w,label:T,selected:E,showTagsPanel:_,isComposing:q,counterRef:f,counterWrapperRef:m,patternInputMirrorRef:i,patternInputRef:a,selfRef:o,multipleElRef:c,singleElRef:l,patternInputWrapperRef:d,overflowRef:h,inputTagElRef:g,handleMouseDown:ne,handleFocusin:V,handleClear:U,handleMouseEnter:W,handleMouseLeave:G,handleDeleteOption:K,handlePatternKeyDown:J,handlePatternInputInput:re,handlePatternInputBlur:se,handlePatternInputFocus:oe,handleMouseEnterCounter:he,handleMouseLeaveCounter:ge,handleFocusout:H,handleCompositionEnd:ae,handleCompositionStart:ie,onPopoverUpdateShow:_e,focus:X,focusInput:Z,blur:ce,blurInput:le,updateCounter:ue,getCounter:de,getTail:fe,renderLabel:e.renderLabel,cssVars:ve?void 0:ye,themeClass:be?.themeClass,onRender:be?.onRender}},render(){let{status:e,multiple:t,size:n,disabled:r,filterable:a,maxTagCount:o,bordered:s,clsPrefix:c,ellipsisTagPopoverProps:l,onRender:u,renderTag:d,renderLabel:f}=this;u?.();let p=o===`responsive`,m=typeof o==`number`,h=p||m,g=i(M,null,{default:()=>i(fe,{clsPrefix:c,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var e;return(e=this.$slots).arrow?.call(e)}})}),_;if(t){let{labelField:e}=this,t=t=>i(`div`,{class:`${c}-base-selection-tag-wrapper`,key:t.value},d?d({option:t,handleClose:()=>{this.handleDeleteOption(t)}}):i(ge,{size:n,closable:!t.disabled,disabled:r,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>f?f(t,!0):$(t[e],t,!0)})),s=()=>(m?this.selectedOptions.slice(0,o):this.selectedOptions).map(t),u=a?i(`div`,{class:`${c}-base-selection-input-tag`,ref:`inputTagElRef`,key:`__input-tag__`},i(`input`,Object.assign({},this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:r,value:this.pattern,autofocus:this.autofocus,class:`${c}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),i(`span`,{ref:`patternInputMirrorRef`,class:`${c}-base-selection-input-tag__mirror`},this.pattern)):null,v=p?()=>i(`div`,{class:`${c}-base-selection-tag-wrapper`,ref:`counterWrapperRef`},i(ge,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:r})):void 0,y;if(m){let e=this.selectedOptions.length-o;e>0&&(y=i(`div`,{class:`${c}-base-selection-tag-wrapper`,key:`__counter__`},i(ge,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:r},{default:()=>`+${e}`})))}let b=p?a?i(K,{ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:s,counter:v,tail:()=>u}):i(K,{ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:s,counter:v}):m&&y?s().concat(y):s(),x=h?()=>i(`div`,{class:`${c}-base-selection-popover`},p?s():this.selectedOptions.map(t)):void 0,S=h?Object.assign({show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},l):null,C=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?i(`div`,{class:`${c}-base-selection-placeholder ${c}-base-selection-overlay`},i(`div`,{class:`${c}-base-selection-placeholder__inner`},this.placeholder)):null,w=a?i(`div`,{ref:`patternInputWrapperRef`,class:`${c}-base-selection-tags`},b,p?null:u,g):i(`div`,{ref:`multipleElRef`,class:`${c}-base-selection-tags`,tabindex:r?void 0:0},b,g);_=i(k,null,h?i(X,Object.assign({},S,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>w,default:x}):w,C)}else if(a){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;_=i(`div`,{ref:`patternInputWrapperRef`,class:`${c}-base-selection-label`,title:this.patternInputFocused?void 0:je(this.label)},i(`input`,Object.assign({},this.inputProps,{ref:`patternInputRef`,class:`${c}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:r,disabled:r,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),n?i(`div`,{class:`${c}-base-selection-label__render-label ${c}-base-selection-overlay`,key:`input`},i(`div`,{class:`${c}-base-selection-overlay__wrapper`},d?d({option:this.selectedOption,handleClose:()=>{}}):f?f(this.selectedOption,!0):$(this.label,this.selectedOption,!0))):null,t?i(`div`,{class:`${c}-base-selection-placeholder ${c}-base-selection-overlay`,key:`placeholder`},i(`div`,{class:`${c}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,g)}else _=i(`div`,{ref:`singleElRef`,class:`${c}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label===void 0?i(`div`,{class:`${c}-base-selection-placeholder ${c}-base-selection-overlay`,key:`placeholder`},i(`div`,{class:`${c}-base-selection-placeholder__inner`},this.placeholder)):i(`div`,{class:`${c}-base-selection-input`,title:je(this.label),key:`input`},i(`div`,{class:`${c}-base-selection-input__content`},d?d({option:this.selectedOption,handleClose:()=>{}}):f?f(this.selectedOption,!0):$(this.label,this.selectedOption,!0))),g);return i(`div`,{ref:`selfRef`,class:[`${c}-base-selection`,this.rtlEnabled&&`${c}-base-selection--rtl`,this.themeClass,e&&`${c}-base-selection--${e}-status`,{[`${c}-base-selection--active`]:this.active,[`${c}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${c}-base-selection--disabled`]:this.disabled,[`${c}-base-selection--multiple`]:this.multiple,[`${c}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},_,s?i(`div`,{class:`${c}-base-selection__border`}):null,s?i(`div`,{class:`${c}-base-selection__state-border`}):null)}});function Ke(e){return e.type===`group`}function qe(e){return e.type===`ignored`}function Je(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function Ye(e,t){return{getIsGroup:Ke,getIgnored:qe,getKey(t){return Ke(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function Xe(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(Ke(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(qe(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function Ze(e,t,n){let r=new Map;return e.forEach(e=>{Ke(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var Qe=f([C(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),C(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[_e({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),$e=Object.assign(Object.assign({},N.props),{to:oe.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array}),et=z({name:`Select`,props:$e,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=te(e),o=N(`Select`,`-select`,Qe,he,e,t),c=L(e.defaultValue),l=R(e,`value`),u=le(l,c),d=L(!1),f=L(``),p=ue(e,[`items`,`options`]),h=L([]),g=L([]),_=j(()=>g.value.concat(h.value).concat(p.value)),v=j(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return Je(e,i);let a=t[r];return typeof a==`string`?Je(e,a):typeof a==`number`&&Je(e,String(a))}}),y=j(()=>{if(e.remote)return p.value;{let{value:t}=_,{value:n}=f;return!n.length||!e.filterable?t:Xe(t,v.value,n,e.childrenField)}}),x=j(()=>{let{valueField:t,childrenField:n}=e,r=Ye(t,n);return q(y.value,r)}),S=j(()=>Ze(_.value,e.valueField,e.childrenField)),C=L(!1),w=le(R(e,`show`),C),T=L(null),E=L(null),D=L(null),{localeRef:O}=de(`Select`),k=j(()=>e.placeholder??O.value.placeholder),M=[],P=L(new Map),F=j(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function I(t){let n=e.remote,{value:r}=P,{value:i}=S,{value:a}=F,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let z=j(()=>{if(e.multiple){let{value:e}=u;return Array.isArray(e)?I(e):[]}return null}),V=j(()=>{let{value:t}=u;return!e.multiple&&!Array.isArray(t)?t===null?null:I([t])[0]||null:null}),H=ee(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:a?.value?.Select?.size||`medium`}}),{mergedSizeRef:U,mergedDisabledRef:W,mergedStatusRef:ne}=H;function K(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:s}=H;r&&B(r,t,n),a&&B(a,t,n),i&&B(i,t,n),c.value=t,o(),s()}function J(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=H;n&&B(n,t),r()}function Y(){let{onClear:t}=e;t&&B(t)}function re(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=H;n&&B(n,t),i(),r&&X()}function ie(t){let{onSearch:n}=e;n&&B(n,t)}function ae(t){let{onScroll:n}=e;n&&B(n,t)}function se(){var t;let{remote:n,multiple:r}=e;if(n){let{value:n}=P;if(r){let{valueField:r}=e;(t=z.value)==null||t.forEach(e=>{n.set(e[r],e)})}else{let t=V.value;t&&n.set(t[e.valueField],t)}}}function ce(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&B(n,t),r&&B(r,t),C.value=t}function X(){W.value||(ce(!0),C.value=!0,e.filterable&&Ne())}function Z(){ce(!1)}function fe(){f.value=``,g.value=M}let Q=L(!1);function pe(){e.filterable&&(Q.value=!0)}function me(){e.filterable&&(Q.value=!1,w.value||fe())}function ge(){W.value||(w.value?e.filterable?Ne():Z():X())}function _e(e){(D.value?.selfRef)?.contains(e.relatedTarget)||(d.value=!1,J(e),Z())}function $(e){re(e),d.value=!0}function ye(){d.value=!0}function be(e){T.value?.$el.contains(e.relatedTarget)||(d.value=!1,J(e),Z())}function xe(){var e;(e=T.value)==null||e.focus(),Z()}function Se(e){w.value&&(T.value?.$el.contains(m(e))||Z())}function Ce(t){if(!Array.isArray(t))return[];if(F.value)return Array.from(t);{let{remote:n}=e,{value:r}=S;if(n){let{value:e}=P;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function we(e){Te(e.rawNode)}function Te(t){if(W.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=g,t=e[0]||null;if(t){let e=h.value;e.length?e.push(t):h.value=[t],g.value=M}}if(r&&P.value.set(t[a],t),e.multiple){let e=Ce(u.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Ee(t[a]);~e&&(h.value.splice(e,1),i&&(f.value=``))}}else e.push(t[a]),i&&(f.value=``);K(e,I(e))}else{if(n&&!r){let e=Ee(t[a]);~e?h.value=[h.value[e]]:h.value=M}Me(),Z(),K(t[a],t)}}function Ee(t){return h.value.findIndex(n=>n[e.valueField]===t)}function De(t){w.value||X();let{value:n}=t.target;f.value=n;let{tag:r,remote:i}=e;if(ie(n),r&&!i){if(!n){g.value=M;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;p.value.some(e=>e[i]===r[i]||e[a]===r[a])||h.value.some(e=>e[i]===r[i]||e[a]===r[a])?g.value=M:g.value=[r]}}function Oe(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Z(),r&&!i&&a&&(h.value=M),Y(),n?K([],[]):K(null,null)}function ke(e){!G(e,`action`)&&!G(e,`empty`)&&!G(e,`header`)&&e.preventDefault()}function Ae(e){ae(e)}function je(t){var n,r,i;if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!T.value?.isComposing){if(w.value){let t=D.value?.getPendingTmNode();t?we(t):e.filterable||(Z(),Me())}else if(X(),e.tag&&Q.value){let t=g.value[0];if(t){let n=t[e.valueField],{value:r}=u;e.multiple&&Array.isArray(r)&&r.includes(n)||Te(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;w.value&&((n=D.value)==null||n.prev());break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;w.value?(r=D.value)==null||r.next():X();break;case`Escape`:w.value&&(ve(t),Z()),(i=T.value)==null||i.focus()}}function Me(){var e;(e=T.value)==null||e.focus()}function Ne(){var e;(e=T.value)==null||e.focusInput()}function Pe(){var e;w.value&&((e=E.value)==null||e.syncPosition())}se(),s(R(e,`options`),se);let Fe={focus:()=>{var e;(e=T.value)==null||e.focus()},focusInput:()=>{var e;(e=T.value)==null||e.focusInput()},blur:()=>{var e;(e=T.value)==null||e.blur()},blurInput:()=>{var e;(e=T.value)==null||e.blurInput()}},Ie=j(()=>{let{self:{menuBoxShadow:e}}=o.value;return{"--n-menu-box-shadow":e}}),Le=i?A(`select`,void 0,Ie,e):void 0;return Object.assign(Object.assign({},Fe),{mergedStatus:ne,mergedClsPrefix:t,mergedBordered:n,namespace:r,treeMate:x,isMounted:b(),triggerRef:T,menuRef:D,pattern:f,uncontrolledShow:C,mergedShow:w,adjustedTo:oe(e),uncontrolledValue:c,mergedValue:u,followerRef:E,localizedPlaceholder:k,selectedOption:V,selectedOptions:z,mergedSize:U,mergedDisabled:W,focused:d,activeWithoutMenuOpen:Q,inlineThemeDisabled:i,onTriggerInputFocus:pe,onTriggerInputBlur:me,handleTriggerOrMenuResize:Pe,handleMenuFocus:ye,handleMenuBlur:be,handleMenuTabOut:xe,handleTriggerClick:ge,handleToggle:we,handleDeleteOption:Te,handlePatternInput:De,handleClear:Oe,handleTriggerBlur:_e,handleTriggerFocus:$,handleKeydown:je,handleMenuAfterLeave:fe,handleMenuClickOutside:Se,handleMenuScroll:Ae,handleMenuKeydown:je,handleMenuMousedown:ke,mergedTheme:o,cssVars:i?void 0:Ie,themeClass:Le?.themeClass,onRender:Le?.onRender})},render(){return i(`div`,{class:`${this.mergedClsPrefix}-select`},i(re,null,{default:()=>[i(ce,null,{default:()=>i(Ge,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e;return[(e=this.$slots).arrow?.call(e)]}})}),i(ae,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===oe.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{default:()=>i(E,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e;return this.mergedShow||this.displayDirective===`show`?((e=this.onRender)==null||e.call(this),d(i(Ue,Object.assign({},this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{empty:()=>{var e;return[(e=this.$slots).empty?.call(e)]},header:()=>{var e;return[(e=this.$slots).header?.call(e)]},action:()=>{var e;return[(e=this.$slots).action?.call(e)]}}),this.displayDirective===`show`?[[D,this.mergedShow],[J,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[J,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}});export{Me as a,Re as i,Ye as n,ke as o,Ue as r,et as t};