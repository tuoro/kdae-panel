import{$n as e,A as t,An as n,B as r,Bn as i,Cn as a,En as o,F as s,Gn as c,H as l,Hn as u,In as d,Ln as f,Mn as p,N as m,O as h,Pn as g,Qn as _,R as v,Rn as y,Sn as b,U as x,Vn as S,W as C,Wn as w,X as T,Y as E,an as D,ct as O,dn as k,dt as A,en as j,ht as ee,in as M,it as N,j as P,kn as te,lt as F,mn as ne,mr as I,on as L,ot as R,pt as z,q as B,rn as V,st as H,tn as U,tr as re,ur as W,ut as G,vn as K,vr as q,vt as J,w as ie,wn as Y,y as ae}from"./client-DOvxO6I9.js";import{t as oe}from"./use-locale-BMX4FTCv.js";import{a as X,c as Z,d as se,f as Q,i as ce,l as le,o as ue,s as de,t as fe}from"./Popover-BgdnYjCz.js";import{t as pe}from"./next-frame-once-qdYFoq8G.js";import{i as me,n as he,r as ge,t as _e}from"./create-CCdUweXY.js";import{t as ve}from"./use-merged-state-pTT-7LRM.js";import{i as ye}from"./text-CdZaUUMh.js";import{n as be}from"./Icon-qPtEwTkM.js";import{n as xe}from"./Input-BR2STuV6.js";import{A as Se,C as Ce,F as we,I as Te,L as $,Y as Ee,k as De,ot as Oe,st as ke}from"./index-Xj4sOcOi.js";var Ae=n({name:`Empty`,render(){return(()=>{let e=F(`15c1a247ae156450`);return e[0]||=a(`svg`,{viewBox:`0 0 28 28`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[a(`path`,{d:`M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z`,fill:`currentColor`}),a(`path`,{d:`M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z`,fill:`currentColor`})],-1)})()}}),je=U(`empty`,`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[V(`icon`,`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[j(`+`,[V(`description`,`
 margin-top: 8px;
 `)])]),V(`description`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),V(`extra`,`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Me={...E.props,description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:`medium`},renderIcon:Function},Ne=n({name:`Empty`,props:Me,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=J(e),i=E(`Empty`,`-empty`,je,ke,e,t),{localeRef:a}=oe(`Empty`),o=b(()=>e.description??r?.value?.Empty?.description),s=b(()=>r?.value?.Empty?.renderIcon||(()=>(w(),Y(Ae)))),c=b(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{[L(`iconSize`,t)]:r,[L(`fontSize`,t)]:a,textColor:o,iconColor:s,extraTextColor:c}}=i.value;return{"--n-icon-size":r,"--n-font-size":a,"--n-bezier":n,"--n-text-color":o,"--n-icon-color":s,"--n-extra-text-color":c}}),l=n?T(`empty`,b(()=>{let t=``,{size:n}=e;return t+=n[0],t}),c,e):void 0;return{mergedClsPrefix:t,mergedRenderIcon:s,localizedDescription:b(()=>o.value||a.value.description),cssVars:n?void 0:c,themeClass:l?.themeClass,onRender:l?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,onRender:n}=this;return n?.(),w(),o(`div`,{class:G([`${t}-empty`,this.themeClass]),style:q(this.cssVars)},[this.showIcon?(w(),o(`div`,{key:0,class:G(`${t}-empty__icon`)},[e.icon?(w(),o(K,{key:0},[z(()=>e.icon())],64)):(w(),Y(B,{key:1,clsPrefix:t},{default:this.mergedRenderIcon},1032,[`clsPrefix`]))],2)):z(()=>null),this.showDescription?(w(),o(`div`,{key:2,class:G(`${t}-empty__description`)},[e.default?(w(),o(K,{key:0},[z(()=>e.default())],64)):(w(),o(K,{key:1},[z(()=>this.localizedDescription)],64))],2)):z(()=>null),e.extra?(w(),o(`div`,{key:4,class:G(`${t}-empty__extra`)},[z(()=>e.extra())],2)):z(()=>null)],6)}});function Pe(e){return e&-e}var Fe=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=Pe(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=Pe(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Ie;function Le(){return typeof document>`u`?!1:(Ie===void 0&&(Ie=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Ie)}var Re;function ze(){return typeof document>`u`?1:(Re===void 0&&(Re=`chrome`in window?window.devicePixelRatio:1),Re)}var Be=`VVirtualListXScroll`;function Ve({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=W(0),i=W(0),a=b(()=>{let t=e.value;if(t.length===0)return null;let n=new Fe(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),o=C(()=>{let e=a.value;return e===null?0:Math.max(e.getBound(i.value)-1,0)}),s=e=>{let t=a.value;return t===null?0:t.sum(e)},l=C(()=>{let t=a.value;return t===null?0:Math.min(t.getBound(i.value+r.value)+1,e.value.length-1)});return c(Be,{startIndexRef:o,endIndexRef:l,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:s}),{listWidthRef:r,scrollLeftRef:i}}var He=n({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=g(Be);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),Ue=X(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[X(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[X(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),We=n({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=ee();Ue.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:ue,ssr:t}),u(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&_({key:n}):_({index:t})});let n=!1,r=!1;y(()=>{if(n=!1,!r){r=!0;return}_({top:m.value,left:o.value})}),S(()=>{n=!0,r||=!0});let i=C(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),a=b(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:o,listWidthRef:s}=Ve({columnsRef:I(e,`columns`),renderColRef:I(e,`renderCol`),renderItemWithColsRef:I(e,`renderItemWithCols`)}),c=W(null),l=W(void 0),d=new Map,f=b(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Fe(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=d.get(n);a!==void 0&&i.add(t,a)}),i}),p=W(0),m=W(0),h=C(()=>Math.max(f.value.getBound(m.value-N(e.paddingTop))-1,0)),g=b(()=>{let{value:t}=l;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=h.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),_=(e,t)=>{if(typeof e==`number`){T(e,t,`auto`);return}let{left:n,top:r,index:i,key:o,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)T(n,r,c);else if(i!==void 0)w(i,c,l);else if(o!==void 0){let e=a.value.get(o);e!==void 0&&w(e,c,l)}else s===`bottom`?T(0,2**53-1,c):s===`top`&&T(0,0,c)},v,x=null;function w(t,n,r){let i=c.value;if(i==null)return;let{value:a}=f,o=a.sum(t)+N(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{v=t,x!==null&&window.clearTimeout(x),x=window.setTimeout(()=>{v=void 0,x=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function T(e,t,n){c.value?.scrollTo({left:e,top:t,behavior:n})}function E(t,r){if(n||e.ignoreItemResize||P(r.target))return;let{value:i}=f,o=a.value.get(t),s=i.get(o),l=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(l===s)return;l-e.itemSize===0?d.delete(t):d.set(t,l-e.itemSize);let u=l-s;if(u===0)return;i.add(o,u);let m=c.value;if(m!=null){if(v===void 0){let e=i.sum(o);m.scrollTop>e&&m.scrollBy(0,u)}else(o<v||o===v&&l+i.sum(o)>m.scrollTop+m.offsetHeight)&&m.scrollBy(0,u);M()}p.value++}let D=!Le(),O=!1;function k(t){var n;(n=e.onScroll)==null||n.call(e,t),(!D||!O)&&M()}function A(t){var n;if((n=e.onWheel)==null||n.call(e,t),D){let e=c.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/ze(),e.scrollLeft+=t.deltaX/ze(),M(),O=!0,pe(()=>{O=!1})}}}function j(t){if(n||P(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===l.value)return}else if(t.contentRect.height===l.value&&t.contentRect.width===s.value)return;l.value=t.contentRect.height,s.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function M(){let{value:e}=c;e!=null&&(m.value=e.scrollTop,o.value=e.scrollLeft)}function P(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:l,listStyle:{overflow:`auto`},keyToIndex:a,itemsStyle:b(()=>{let{itemResizable:t}=e,n=H(f.value.sum());return p.value,[e.itemsStyle,{boxSizing:`content-box`,width:H(i.value),height:t?``:n,minHeight:t?n:``,paddingTop:H(e.paddingTop),paddingBottom:H(e.paddingBottom)}]}),visibleItemsStyle:b(()=>(p.value,{transform:`translateY(${H(f.value.sum(h.value))})`})),viewportItems:g,listElRef:c,itemsElRef:W(null),scrollTo:_,handleListResize:j,handleListScroll:k,handleListWheel:A,handleItemResize:E}},render(){let{itemResizable:e,keyField:n,keyToIndex:r,visibleItemsTag:i}=this;return p(t,{onResize:this.handleListResize},{default:()=>{var a;return p(`div`,d(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(a=this.$slots).empty?.call(a):p(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[p(i,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:i,renderItemWithCols:a}=this;return this.viewportItems.map(o=>{let s=o[n],c=r.get(s),l=i==null?void 0:p(He,{index:c,item:o}),u=a==null?void 0:p(He,{index:c,item:o}),d=this.$slots.default({item:o,renderedCols:l,renderedItemWithCols:u,index:c})[0];return e?p(t,{key:s,onResize:e=>this.handleItemResize(s,e)},{default:()=>d}):(d.key=s,d)})}})])])}})}});function Ge(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function Ke(e,t){t&&(u(()=>{let{value:n}=e;n&&P.registerHandler(n,t)}),_(e,(e,t)=>{t&&P.unregisterHandler(t)},{deep:!1}),i(()=>{let{value:t}=e;t&&P.unregisterHandler(t)}))}var qe=n({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=F(`d16ead82505dc285`);return w(),o(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=(...t)=>e.onFocus(...t),onBlur:t[1]||=(...t)=>e.onBlur(...t)},null,32)})()}}),Je=n({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=g(Q);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),s=t?t(i,!1):$(i[this.labelField],i,!1),c=(w(),o(`div`,d(a,{class:[`${e}-base-select-group-header`,a?.class]}),[z(()=>s)],16));return i.render?i.render({node:c,option:i}):n?n({node:c,option:i,selected:!1}):c}}),Ye=n({name:`Checkmark`,render(){return(()=>{let e=F(`3c84eac8ae4e1f96`);return e[0]||=a(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[a(`g`,{fill:`none`},[a(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),Xe=[`onClick`,`onMouseenter`,`onMousemove`];function Ze(e,t){return w(),Y(k,{name:`fade-in-scale-up-transition`},{default:()=>e?(w(),Y(B,{key:1,clsPrefix:t,class:G(`${t}-base-select-option__check`)},{default:()=>p(Ye)},1032,[`clsPrefix`,`class`])):null},1024)}var Qe=n({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:l,nodePropsRef:u,handleOptionClick:d,handleOptionMouseEnter:f}=g(Q),p=C(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function m(t){let{tmNode:n}=e;n.disabled||d(t,n)}function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function _(t){let{tmNode:n}=e,{value:r}=p;n.disabled||r||f(t,n)}return{multiple:r,isGrouped:C(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:l,nodeProps:u,isPending:p,isSelected:C(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:_,handleMouseEnter:h,handleClick:m}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:i,showCheckmark:s,nodeProps:c,renderOption:l,renderLabel:u,handleClick:f,handleMouseEnter:p,handleMouseMove:m}=this,h=Ze(n,e),g=u?[u(t,n),s&&h]:[$(t[this.labelField],t,n),s&&h],_=c?.(t),v=(w(),o(`div`,d(_,{class:[`${e}-base-select-option`,t.class,_?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:s}],style:[_?.style||``,t.style||``],onClick:Te([f,_?.onClick]),onMouseenter:Te([p,_?.onMouseenter]),onMousemove:Te([m,_?.onMousemove])}),[a(`div`,{class:G(`${e}-base-select-option__content`)},[z(()=>g)],2)],16,Xe));return t.render?t.render({node:v,option:t,selected:n}):l?l({node:v,option:t,selected:n}):v}}),$e=U(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[U(`scrollbar`,`
 max-height: var(--n-height);
 `),U(`virtual-list`,`
 max-height: var(--n-height);
 `),U(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[V(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),U(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),U(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),V(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),V(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),V(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),V(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),U(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),U(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[M(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),j(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),j(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),M(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),M(`pending`,[j(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),M(`selected`,`
 color: var(--n-option-text-color-active);
 `,[j(`&::before`,`
 background-color: var(--n-option-color-active);
 `),M(`pending`,[j(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),M(`disabled`,`
 cursor: not-allowed;
 `,[D(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),M(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),V(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[we({enterScale:`0.5`})])])]),et=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],tt=n({name:`InternalSelectMenu`,props:{...E.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n,mergedComponentPropsRef:r}=J(e),a=s(`InternalSelectMenu`,n,t),o=E(`InternalSelectMenu`,`-internal-select-menu`,$e,Oe,e,I(e,`clsPrefix`)),l=W(null),d=W(null),p=W(null),m=b(()=>e.treeMate.getFlattenedNodes()),h=b(()=>he(m.value)),g=W(null);function v(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),H(n||null)}function y(){let{value:t}=g;t&&!e.treeMate.getNode(t.key)&&(g.value=null)}let x;_(()=>e.show,t=>{t?x=_(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?v():y(),f(U)):y()},{immediate:!0}):x?.()},{immediate:!0}),i(()=>{x?.()});let S=b(()=>N(o.value.self[L(`optionHeight`,e.size)])),C=b(()=>R(o.value.self[L(`padding`,e.size)])),w=b(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),D=b(()=>{let e=m.value;return e&&e.length===0}),O=b(()=>r?.value?.Select?.renderEmpty);function k(t){let{onToggle:n}=e;n&&n(t)}function A(t){let{onScroll:n}=e;n&&n(t)}function j(e){p.value?.sync(),A(e)}function ee(){p.value?.sync()}function M(){let{value:e}=g;return e||null}function P(e,t){t.disabled||H(t,!1)}function te(e,t){t.disabled||k(t)}function F(t){me(t,`action`)||e.onKeyup?.(t)}function ne(t){me(t,`action`)||e.onKeydown?.(t)}function z(t){e.onMousedown?.(t),!e.focusable&&t.preventDefault()}function B(){let{value:e}=g;e&&H(e.getNext({loop:!0}),!0)}function V(){let{value:e}=g;e&&H(e.getPrev({loop:!0}),!0)}function H(e,t=!1){g.value=e,t&&U()}function U(){let t=g.value;if(!t)return;let n=h.value(t.key);n!==null&&(e.virtualScroll?d.value?.scrollTo({index:n}):p.value?.scrollTo({index:n,elSize:S.value}))}function re(t){l.value?.contains(t.target)&&e.onFocus?.(t)}function G(t){l.value?.contains(t.relatedTarget)||e.onBlur?.(t)}c(Q,{handleOptionMouseEnter:P,handleOptionClick:te,valueSetRef:w,pendingTmNodeRef:g,nodePropsRef:I(e,`nodeProps`),showCheckmarkRef:I(e,`showCheckmark`),multipleRef:I(e,`multiple`),valueRef:I(e,`value`),renderLabelRef:I(e,`renderLabel`),renderOptionRef:I(e,`renderOption`),labelFieldRef:I(e,`labelField`),valueFieldRef:I(e,`valueField`)}),c(se,l),u(()=>{let{value:e}=p;e&&e.sync()});let K=b(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:s,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[L(`optionFontSize`,t)]:x,[L(`optionHeight`,t)]:S,[L(`optionPadding`,t)]:C}}=o.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":s,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":R(C,`left`),"--n-option-padding-right":R(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:q}=e,ie=q?T(`internal-select-menu`,b(()=>e.size[0]),K,e):void 0,Y={selfRef:l,next:B,prev:V,getPendingTmNode:M};return Ke(l,e.onResize),{mergedTheme:o,mergedClsPrefix:t,rtlEnabled:a,virtualListRef:d,scrollbarRef:p,itemSize:S,padding:C,flattenedNodes:m,empty:D,mergedRenderEmpty:O,virtualListContainer(){let{value:e}=d;return e?.listElRef},virtualListContent(){let{value:e}=d;return e?.itemsElRef},doScroll:A,handleFocusin:re,handleFocusout:G,handleKeyUp:F,handleKeyDown:ne,handleMouseDown:z,handleVirtualListResize:ee,handleVirtualListScroll:j,cssVars:q?void 0:K,themeClass:ie?.themeClass,onRender:ie?.onRender,...Y}},render(){let{$slots:e,virtualScroll:t,clsPrefix:n,mergedTheme:i,themeClass:a,onRender:s}=this;return s?.(),w(),o(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:G([`${n}-base-select-menu`,`${n}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${n}-base-select-menu--rtl`,a,this.multiple&&`${n}-base-select-menu--multiple`]),style:q(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[z(()=>r(e.header,e=>e&&(w(),o(`div`,{class:G(`${n}-base-select-menu__header`),"data-header":!0,key:`header`},[z(()=>e)],2)))),this.loading?(w(),o(`div`,{key:0,class:G(`${n}-base-select-menu__loading`)},[(w(),Y(ae,{clsPrefix:n,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(w(),o(K,{key:1},[this.empty?(w(),o(`div`,{key:1,class:G(`${n}-base-select-menu__empty`),"data-empty":!0},[z(()=>v(e.empty,()=>[this.mergedRenderEmpty?.()||(w(),Y(Ne,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(w(),Y(h,d({key:0,ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?(w(),Y(We,{key:1,ref:`virtualListRef`,class:G(`${n}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(w(),Y(Je,{key:e.key,clsPrefix:n,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(w(),Y(Qe,{clsPrefix:n,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(w(),o(`div`,{key:4,class:G(`${n}-base-select-menu-option-wrapper`),style:q({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[z(()=>this.flattenedNodes.map(e=>e.isGroup?(w(),Y(Je,{key:e.key,clsPrefix:n,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(w(),Y(Qe,{clsPrefix:n,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),z(()=>r(e.action,e=>e&&[(w(),o(`div`,{class:G(`${n}-base-select-menu__action`),"data-action":!0,key:`action`},[z(()=>e)],2)),(w(),Y(qe,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,et)}});function nt(e){return e.type===`group`}function rt(e){return e.type===`ignored`}function it(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function at(e,t){return{getIsGroup:nt,getIgnored:rt,getKey(t){return nt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function ot(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(nt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(rt(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function st(e,t,n){let r=new Map;return e.forEach(e=>{nt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var ct=j([U(`base-selection`,`
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
 `,[U(`base-loading`,`
 color: var(--n-loading-color);
 `),U(`base-selection-tags`,`min-height: var(--n-height);`),V(`border, state-border`,`
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
 `),V(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),U(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[V(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),U(`base-selection-overlay`,`
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
 `,[V(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),U(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[V(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),U(`base-selection-tags`,`
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
 `),U(`base-selection-label`,`
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
 `,[U(`base-selection-input`,`
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
 `,[V(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),V(`render-label`,`
 color: var(--n-text-color);
 `)]),D(`disabled`,[j(`&:hover`,[V(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),M(`focus`,[V(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),M(`active`,[V(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),U(`base-selection-label`,`background-color: var(--n-color-active);`),U(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),M(`disabled`,`cursor: not-allowed;`,[V(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),U(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[U(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),V(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),U(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),U(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),U(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[V(`input`,`
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
 `),V(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(e=>M(`${e}-status`,[V(`state-border`,`border: var(--n-border-${e});`),D(`disabled`,[j(`&:hover`,[V(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),M(`active`,[V(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),U(`base-selection-label`,`background-color: var(--n-color-active-${e});`),U(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),M(`focus`,[V(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),U(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),U(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[j(`&:last-child`,`padding-right: 0;`),U(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[V(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),lt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],ut=[`tabindex`],dt=[`title`],ft=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],pt=[`tabindex`],mt=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],ht=n({name:`InternalSelection`,props:{...E.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(t){let{mergedClsPrefixRef:n,mergedRtlRef:r}=J(t),i=s(`InternalSelection`,r,n),a=W(null),o=W(null),c=W(null),l=W(null),d=W(null),p=W(null),m=W(null),h=W(null),g=W(null),v=W(null),y=W(!1),x=W(!1),S=W(!1),C=E(`InternalSelection`,`-internal-selection`,ct,Se,t,I(t,`clsPrefix`)),w=b(()=>t.clearable&&!t.disabled&&(S.value||t.active)),D=b(()=>t.selectedOption?t.renderTag?t.renderTag({option:t.selectedOption,handleClose:()=>{}}):t.renderLabel?t.renderLabel(t.selectedOption,!0):$(t.selectedOption[t.labelField],t.selectedOption,!0):t.placeholder),O=b(()=>{let e=t.selectedOption;if(e)return e[t.labelField]}),k=b(()=>t.multiple?!!(Array.isArray(t.selectedOptions)&&t.selectedOptions.length):t.selectedOption!==null);function A(){let{value:e}=a;if(e){let{value:n}=o;n&&(n.style.width=`${e.offsetWidth}px`,t.maxTagCount!==`responsive`&&g.value?.sync({showAllItemsBeforeCalculate:!1}))}}function j(){let{value:e}=v;e&&(e.style.display=`none`)}function ee(){let{value:e}=v;e&&(e.style.display=`inline-block`)}_(I(t,`active`),e=>{e||j()}),_(I(t,`pattern`),()=>{t.multiple&&f(A)});function M(e){let{onFocus:n}=t;n&&n(e)}function N(e){let{onBlur:n}=t;n&&n(e)}function P(e){let{onDeleteOption:n}=t;n&&n(e)}function te(e){let{onClear:n}=t;n&&n(e)}function F(e){let{onPatternInput:n}=t;n&&n(e)}function ne(e){(!e.relatedTarget||!c.value?.contains(e.relatedTarget))&&M(e)}function z(e){c.value?.contains(e.relatedTarget)||N(e)}function B(e){te(e)}function V(){S.value=!0}function H(){S.value=!1}function U(e){!t.active||!t.filterable||e.target!==o.value&&e.preventDefault()}function re(e){P(e)}let G=W(!1);function K(e){if(e.key===`Backspace`&&!G.value&&!t.pattern.length){let{selectedOptions:e}=t;e?.length&&re(e[e.length-1])}}let q=null;function ie(e){let{value:n}=a;n&&(n.textContent=e.target.value,A()),t.ignoreComposition&&G.value?q=e:F(e)}function Y(){G.value=!0}function ae(){G.value=!1,t.ignoreComposition&&F(q),q=null}function oe(e){x.value=!0,t.onPatternFocus?.(e)}function X(e){x.value=!1,t.onPatternBlur?.(e)}function Z(){if(t.filterable)x.value=!1,p.value?.blur(),o.value?.blur();else if(t.multiple){let{value:e}=l;e?.blur()}else{let{value:e}=d;e?.blur()}}function se(){t.filterable?(x.value=!1,p.value?.focus()):t.multiple?l.value?.focus():d.value?.focus()}function Q(){let{value:e}=o;e&&(ee(),e.focus())}function ce(){let{value:e}=o;e&&e.blur()}function le(e){let{value:t}=m;t&&t.setTextContent(`+${e}`)}function ue(){let{value:e}=h;return e}function de(){return o.value}let fe=null;function pe(){fe!==null&&window.clearTimeout(fe)}function me(){t.active||(pe(),fe=window.setTimeout(()=>{k.value&&(y.value=!0)},100))}function he(){pe()}function ge(e){e||(pe(),y.value=!1)}_(k,e=>{e||(y.value=!1)}),u(()=>{e(()=>{let e=p.value;e&&(t.disabled?e.removeAttribute(`tabindex`):e.tabIndex=x.value?-1:0)})}),Ke(c,t.onResize);let{inlineThemeDisabled:_e}=t,ve=b(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:S,arrowColorDisabled:w,loadingColor:T,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:O,boxShadowHoverWarning:k,borderWarning:A,borderFocusWarning:j,borderHoverWarning:ee,borderActiveWarning:M,colorActiveError:N,boxShadowFocusError:P,boxShadowActiveError:te,boxShadowHoverError:F,borderError:ne,borderFocusError:I,borderHoverError:z,borderActiveError:B,clearColor:V,clearColorHover:H,clearColorPressed:U,clearSize:re,arrowSize:W,[L(`height`,e)]:G,[L(`fontSize`,e)]:K}}=C.value,q=R(c),J=R(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":K,"--n-height":G,"--n-padding-single-top":q.top,"--n-padding-multiple-top":J.top,"--n-padding-single-right":q.right,"--n-padding-multiple-right":J.right,"--n-padding-single-left":q.left,"--n-padding-multiple-left":J.left,"--n-padding-single-bottom":q.bottom,"--n-padding-multiple-bottom":J.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":S,"--n-arrow-color-disabled":w,"--n-loading-color":T,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":O,"--n-box-shadow-hover-warning":k,"--n-border-warning":A,"--n-border-focus-warning":j,"--n-border-hover-warning":ee,"--n-border-active-warning":M,"--n-color-active-error":N,"--n-box-shadow-focus-error":P,"--n-box-shadow-active-error":te,"--n-box-shadow-hover-error":F,"--n-border-error":ne,"--n-border-focus-error":I,"--n-border-hover-error":z,"--n-border-active-error":B,"--n-clear-size":re,"--n-clear-color":V,"--n-clear-color-hover":H,"--n-clear-color-pressed":U,"--n-arrow-size":W,"--n-font-weight":r}}),ye=_e?T(`internal-selection`,b(()=>t.size[0]),ve,t):void 0;return{mergedTheme:C,mergedClearable:w,mergedClsPrefix:n,rtlEnabled:i,patternInputFocused:x,filterablePlaceholder:D,label:O,selected:k,showTagsPanel:y,isComposing:G,counterRef:m,counterWrapperRef:h,patternInputMirrorRef:a,patternInputRef:o,selfRef:c,multipleElRef:l,singleElRef:d,patternInputWrapperRef:p,overflowRef:g,inputTagElRef:v,handleMouseDown:U,handleFocusin:ne,handleClear:B,handleMouseEnter:V,handleMouseLeave:H,handleDeleteOption:re,handlePatternKeyDown:K,handlePatternInputInput:ie,handlePatternInputBlur:X,handlePatternInputFocus:oe,handleMouseEnterCounter:me,handleMouseLeaveCounter:he,handleFocusout:z,handleCompositionEnd:ae,handleCompositionStart:Y,onPopoverUpdateShow:ge,focus:se,focusInput:Q,blur:Z,blurInput:ce,updateCounter:le,getCounter:ue,getTail:de,renderLabel:t.renderLabel,cssVars:_e?void 0:ve,themeClass:ye?.themeClass,onRender:ye?.onRender}},render(){let{status:e,multiple:t,size:n,disabled:r,filterable:i,maxTagCount:s,bordered:c,clsPrefix:l,ellipsisTagPopoverProps:u,onRender:f,renderTag:p,renderLabel:h}=this;f?.();let g=s===`responsive`,_=typeof s==`number`,v=g||_,y=(w(),Y(m,null,{default:()=>(w(),Y(xe,{clsPrefix:l,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),b;if(t){let{labelField:e}=this,t=t=>(w(),o(`div`,{class:G(`${l}-base-selection-tag-wrapper`),key:t.value},[p?(w(),o(K,{key:0},[z(()=>p({option:t,handleClose:()=>{this.handleDeleteOption(t)}}))],64)):(w(),Y(be,{key:1,size:n,closable:!t.disabled,disabled:r,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>h?h(t,!0):$(t[e],t,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),c=()=>(_?this.selectedOptions.slice(0,s):this.selectedOptions).map(t),f=i?(w(),o(`div`,{class:G(`${l}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[a(`input`,d(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:r,value:this.pattern,autofocus:this.autofocus,class:`${l}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,lt),a(`span`,{ref:`patternInputMirrorRef`,class:G(`${l}-base-selection-input-tag__mirror`)},[z(()=>this.pattern)],2)],2)):null,m=g?()=>(w(),o(`div`,{class:G(`${l}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(w(),Y(be,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:r},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,x;if(_){let e=this.selectedOptions.length-s;e>0&&(x=(t=>(w(),o(`div`,{class:G(`${l}-base-selection-tag-wrapper`),key:`__counter__`},[(w(),Y(be,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:r},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(x))}let S=g?i?(w(),Y(ge,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:c,counter:m,tail:()=>f},1032,[`updateCounter`,`getCounter`,`getTail`])):(w(),Y(ge,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:c,counter:m},1032,[`updateCounter`,`getCounter`])):_&&x?c().concat(x):c(),C=v?()=>(w(),o(`div`,{class:G(`${l}-base-selection-popover`)},[g?(w(),o(K,{key:0},[z(()=>c())],64)):(w(),o(K,{key:1},[z(()=>this.selectedOptions.map(t))],64))],2)):void 0,T=v?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...u}:null,E=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(w(),o(`div`,{key:5,class:G(`${l}-base-selection-placeholder ${l}-base-selection-overlay`)},[a(`div`,{class:G(`${l}-base-selection-placeholder__inner`)},[z(()=>this.placeholder)],2)],2)):null,D=i?(w(),o(`div`,{key:6,ref:`patternInputWrapperRef`,class:G(`${l}-base-selection-tags`)},[z(()=>S),g?z(()=>null):(w(),o(K,{key:1},[z(()=>f)],64)),z(()=>y)],2)):(w(),o(`div`,{key:7,ref:`multipleElRef`,class:G(`${l}-base-selection-tags`),tabindex:r?void 0:0},[z(()=>S),z(()=>y)],10,ut));b=(e=>(w(),o(K,{key:8},[v?(w(),Y(fe,d({key:0},T,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>D,default:C},1040)):(w(),o(K,{key:1},[z(()=>D)],64)),z(()=>E)],64)))(b)}else if(i){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;b=(e=>(w(),o(`div`,{key:9,ref:`patternInputWrapperRef`,class:G(`${l}-base-selection-label`),title:this.patternInputFocused?void 0:Ge(this.label)},[a(`input`,d(this.inputProps,{ref:`patternInputRef`,class:`${l}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:r,disabled:r,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,ft),n?(w(),o(`div`,{class:G(`${l}-base-selection-label__render-label ${l}-base-selection-overlay`),key:`input`},[a(`div`,{class:G(`${l}-base-selection-overlay__wrapper`)},[p?(w(),o(K,{key:0},[z(()=>p({option:this.selectedOption,handleClose:()=>{}}))],64)):(w(),o(K,{key:1},[h?(w(),o(K,{key:0},[z(()=>h(this.selectedOption,!0))],64)):(w(),o(K,{key:1},[z(()=>$(this.label,this.selectedOption,!0))],64))],64))],2)],2)):z(()=>null),t?(w(),o(`div`,{class:G(`${l}-base-selection-placeholder ${l}-base-selection-overlay`),key:`placeholder`},[a(`div`,{class:G(`${l}-base-selection-overlay__wrapper`)},[z(()=>this.filterablePlaceholder)],2)],2)):z(()=>null),z(()=>y)],10,dt)))(b)}else b=(e=>(w(),o(`div`,{key:10,ref:`singleElRef`,class:G(`${l}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(w(),o(`div`,{class:G(`${l}-base-selection-placeholder ${l}-base-selection-overlay`),key:`placeholder`},[a(`div`,{class:G(`${l}-base-selection-placeholder__inner`)},[z(()=>this.placeholder)],2)],2)):(w(),o(`div`,{class:G(`${l}-base-selection-input`),title:Ge(this.label),key:`input`},[a(`div`,{class:G(`${l}-base-selection-input__content`)},[p?(w(),o(K,{key:0},[z(()=>p({option:this.selectedOption,handleClose:()=>{}}))],64)):(w(),o(K,{key:1},[h?(w(),o(K,{key:0},[z(()=>h(this.selectedOption,!0))],64)):(w(),o(K,{key:1},[z(()=>$(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),z(()=>y)],10,pt)))(b);return w(),o(`div`,{ref:`selfRef`,class:G([`${l}-base-selection`,this.rtlEnabled&&`${l}-base-selection--rtl`,this.themeClass,e&&`${l}-base-selection--${e}-status`,{[`${l}-base-selection--active`]:this.active,[`${l}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${l}-base-selection--disabled`]:this.disabled,[`${l}-base-selection--multiple`]:this.multiple,[`${l}-base-selection--focus`]:this.focused}]),style:q(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[z(()=>b),c?(w(),o(`div`,{key:0,class:G(`${l}-base-selection__border`)},null,2)):z(()=>null),c?(w(),o(`div`,{key:2,class:G(`${l}-base-selection__state-border`)},null,2)):z(()=>null)],46,mt)}}),gt=j([U(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),U(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[we({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),_t={...E.props,to:le.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},vt=n({name:`Select`,props:_t,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=J(e),o=E(`Select`,`-select`,gt,Ce,e,t),s=W(e.defaultValue),c=I(e,`value`),u=ve(c,s),d=W(!1),f=W(``),p=ye(e,[`items`,`options`]),m=W([]),h=W([]),g=b(()=>h.value.concat(m.value).concat(p.value)),v=b(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return it(e,i);let a=t[r];return typeof a==`string`?it(e,a):typeof a==`number`&&it(e,String(a))}}),y=b(()=>{if(e.remote)return p.value;{let{value:t}=g,{value:n}=f;return!n.length||!e.filterable?t:ot(t,v.value,n,e.childrenField)}}),S=b(()=>{let{valueField:t,childrenField:n}=e,r=at(t,n);return _e(y.value,r)}),C=b(()=>st(g.value,e.valueField,e.childrenField)),w=W(!1),D=ve(I(e,`show`),w),k=W(null),A=W(null),j=W(null),{localeRef:ee}=oe(`Select`),M=b(()=>e.placeholder??ee.value.placeholder),N=[],P=W(new Map),te=b(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function F(t){let n=e.remote,{value:r}=P,{value:i}=C,{value:a}=te,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let ne=b(()=>{if(e.multiple){let{value:e}=u;return Array.isArray(e)?F(e):[]}return null}),L=b(()=>{let{value:t}=u;return!e.multiple&&!Array.isArray(t)?t===null?null:F([t])[0]||null:null}),R=ie(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:a?.value?.Select?.size||`medium`}}),{mergedSizeRef:z,mergedDisabledRef:B,mergedStatusRef:V}=R;function H(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:c}=R;r&&l(r,t,n),a&&l(a,t,n),i&&l(i,t,n),s.value=t,o(),c()}function U(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=R;n&&l(n,t),r()}function re(){let{onClear:t}=e;t&&l(t)}function G(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=R;n&&l(n,t),i(),r&&X()}function K(t){let{onSearch:n}=e;n&&l(n,t)}function q(t){let{onScroll:n}=e;n&&l(n,t)}function Y(){let{remote:t,multiple:n}=e;if(t){let{value:t}=P;if(n){let{valueField:n}=e;ne.value?.forEach(e=>{t.set(e[n],e)})}else{let n=L.value;n&&t.set(n[e.valueField],n)}}}function ae(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&l(n,t),r&&l(r,t),w.value=t}function X(){B.value||(ae(!0),w.value=!0,e.filterable&&Ne())}function Z(){ae(!1)}function se(){f.value=``,h.value=N}let Q=W(!1);function ce(){e.filterable&&(Q.value=!0)}function ue(){e.filterable&&(Q.value=!1,D.value||se())}function de(){B.value||(D.value?e.filterable?Ne():Z():X())}function fe(e){j.value?.selfRef?.contains(e.relatedTarget)||(d.value=!1,U(e),Z())}function pe(e){G(e),d.value=!0}function he(){d.value=!0}function ge(e){k.value?.$el.contains(e.relatedTarget)||(d.value=!1,U(e),Z())}function be(){k.value?.focus(),Z()}function xe(e){D.value&&(k.value?.$el.contains(O(e))||Z())}function Se(t){if(!Array.isArray(t))return[];if(te.value)return Array.from(t);{let{remote:n}=e,{value:r}=C;if(n){let{value:e}=P;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function we(e){Te(e.rawNode)}function Te(t){if(B.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=h,t=e[0]||null;if(t){let e=m.value;e.length?e.push(t):m.value=[t],h.value=N}}if(r&&P.value.set(t[a],t),e.multiple){let e=Se(u.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=$(t[a]);~e&&(m.value.splice(e,1),i&&(f.value=``))}}else e.push(t[a]),i&&(f.value=``);H(e,F(e))}else{if(n&&!r){let e=$(t[a]);~e?m.value=[m.value[e]]:m.value=N}Me(),Z(),H(t[a],t)}}function $(t){return m.value.findIndex(n=>n[e.valueField]===t)}function Ee(t){D.value||X();let{value:n}=t.target;f.value=n;let{tag:r,remote:i}=e;if(K(n),r&&!i){if(!n){h.value=N;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;p.value.some(e=>e[i]===r[i]||e[a]===r[a])||m.value.some(e=>e[i]===r[i]||e[a]===r[a])?h.value=N:h.value=[r]}}function Oe(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Z(),r&&!i&&a&&(m.value=N),re(),n?H([],[]):H(null,null)}function ke(e){!me(e,`action`)&&!me(e,`empty`)&&!me(e,`header`)&&e.preventDefault()}function Ae(e){q(e)}function je(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!k.value?.isComposing){if(D.value){let t=j.value?.getPendingTmNode();t?we(t):e.filterable||(Z(),Me())}else if(X(),e.tag&&Q.value){let t=h.value[0];if(t){let n=t[e.valueField],{value:r}=u;e.multiple&&Array.isArray(r)&&r.includes(n)||Te(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;D.value&&j.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;D.value?j.value?.next():X();break;case`Escape`:D.value&&(De(t),Z()),k.value?.focus()}}function Me(){k.value?.focus()}function Ne(){k.value?.focusInput()}function Pe(){D.value&&A.value?.syncPosition()}Y(),_(I(e,`options`),Y);let Fe={focus:()=>{k.value?.focus()},focusInput:()=>{k.value?.focusInput()},blur:()=>{k.value?.blur()},blurInput:()=>{k.value?.blurInput()}},Ie=b(()=>{let{self:{menuBoxShadow:e}}=o.value;return{"--n-menu-box-shadow":e}}),Le=i?T(`select`,void 0,Ie,e):void 0;return{...Fe,mergedStatus:V,mergedClsPrefix:t,mergedBordered:n,namespace:r,treeMate:S,isMounted:x(),triggerRef:k,menuRef:j,pattern:f,uncontrolledShow:w,mergedShow:D,adjustedTo:le(e),uncontrolledValue:s,mergedValue:u,followerRef:A,localizedPlaceholder:M,selectedOption:L,selectedOptions:ne,mergedSize:z,mergedDisabled:B,focused:d,activeWithoutMenuOpen:Q,inlineThemeDisabled:i,onTriggerInputFocus:ce,onTriggerInputBlur:ue,handleTriggerOrMenuResize:Pe,handleMenuFocus:he,handleMenuBlur:ge,handleMenuTabOut:be,handleTriggerClick:de,handleToggle:we,handleDeleteOption:Te,handlePatternInput:Ee,handleClear:Oe,handleTriggerBlur:fe,handleTriggerFocus:pe,handleKeydown:je,handleMenuAfterLeave:se,handleMenuClickOutside:xe,handleMenuScroll:Ae,handleMenuKeydown:je,handleMenuMousedown:ke,mergedTheme:o,cssVars:i?void 0:Ie,themeClass:Le?.themeClass,onRender:Le?.onRender}},render(){return w(),o(`div`,{class:G(`${this.mergedClsPrefix}-select`)},[te(Z,null,{_:1,default:A(()=>[(w(),Y(de,null,{_:1,default:A(()=>(w(),Y(ht,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:A(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(w(),Y(ce,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===le.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:A(()=>(w(),Y(k,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:A(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),re((w(),Y(tt,d(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:A(()=>[this.$slots.empty?.()]),header:A(()=>[this.$slots.header?.()]),action:A(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[ne,this.mergedShow],[Ee,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Ee,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{Ne as a,We as i,at as n,tt as r,vt as t};