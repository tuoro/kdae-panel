import{a3 as ye,G as M,r as P,X as Ue,d as ce,L as Ye,n as i,V as gn,a8 as at,H as Xe,b3 as st,aI as dt,aA as dn,b4 as ct,_ as te,ap as $e,b5 as tn,K as Re,J as Sn,s as k,z as B,x as ee,Y as zn,D as Fe,E as pe,F as Ne,b6 as ut,N as ve,a1 as Te,as as Tn,T as le,$ as cn,aR as Fn,C as un,ar as ft,U as ht,A as vt,ay as hn,b7 as bt,aC as On,b8 as Ee,b9 as gt,a4 as pt,I as mt,ba as xt,aE as vn,q as wt,Z as G,aS as yt,v as Ct,y as kt,aK as Rt,aM as St,a7 as zt,bb as Tt,bc as Ft,bd as Ot,be as pn,bf as It,bg as Mt,bh as Pt,bi as _t}from"./index-98BUdM3h.js";import{a as Ge,b as Bt}from"./text-WteSNxjK.js";import{c as $t,b as on,i as bn,d as Et,N as At,B as Nt,V as Lt,a as Dt,u as fn}from"./Popover-B7kiSMJg.js";import{a as Vt}from"./Input-CWuPrC-a.js";import{N as ln}from"./Tag-DXKK9G2y.js";import{h as Ae,a as jt,V as mn,c as Ht}from"./create-DjTsMThw.js";import{b as Wt}from"./next-frame-once-C5Ksf8W7.js";import{u as In}from"./use-locale-DSENAQZ2.js";function xn(e){return e&-e}class Mn{constructor(t,o){this.l=t,this.min=o;const l=new Array(t+1);for(let a=0;a<t+1;++a)l[a]=0;this.ft=l}add(t,o){if(o===0)return;const{l,ft:a}=this;for(t+=1;t<=l;)a[t]+=o,t+=xn(t)}get(t){return this.sum(t+1)-this.sum(t)}sum(t){if(t===void 0&&(t=this.l),t<=0)return 0;const{ft:o,min:l,l:a}=this;if(t>a)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let u=t*l;for(;t>0;)u+=o[t],t-=xn(t);return u}getBound(t){let o=0,l=this.l;for(;l>o;){const a=Math.floor((o+l)/2),u=this.sum(a);if(u>t){l=a;continue}else if(u<t){if(o===a)return this.sum(o+1)<=t?o+1:a;o=a}else return a}return o}}let Ke;function Kt(){return typeof document>"u"?!1:(Ke===void 0&&("matchMedia"in window?Ke=window.matchMedia("(pointer:coarse)").matches:Ke=!1),Ke)}let rn;function wn(){return typeof document>"u"?1:(rn===void 0&&(rn="chrome"in window?window.devicePixelRatio:1),rn)}const Pn="VVirtualListXScroll";function Ut({columnsRef:e,renderColRef:t,renderItemWithColsRef:o}){const l=P(0),a=P(0),u=M(()=>{const h=e.value;if(h.length===0)return null;const x=new Mn(h.length,0);return h.forEach((g,w)=>{x.add(w,g.width)}),x}),v=ye(()=>{const h=u.value;return h!==null?Math.max(h.getBound(a.value)-1,0):0}),r=h=>{const x=u.value;return x!==null?x.sum(h):0},y=ye(()=>{const h=u.value;return h!==null?Math.min(h.getBound(a.value+l.value)+1,e.value.length-1):0});return Ue(Pn,{startIndexRef:v,endIndexRef:y,columnsRef:e,renderColRef:t,renderItemWithColsRef:o,getLeft:r}),{listWidthRef:l,scrollLeftRef:a}}const yn=ce({name:"VirtualListRow",props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){const{startIndexRef:e,endIndexRef:t,columnsRef:o,getLeft:l,renderColRef:a,renderItemWithColsRef:u}=Ye(Pn);return{startIndex:e,endIndex:t,columns:o,renderCol:a,renderItemWithCols:u,getLeft:l}},render(){const{startIndex:e,endIndex:t,columns:o,renderCol:l,renderItemWithCols:a,getLeft:u,item:v}=this;if(a!=null)return a({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:o,item:v,getLeft:u});if(l!=null){const r=[];for(let y=e;y<=t;++y){const h=o[y];r.push(l({column:h,left:u(y),item:v}))}return r}return null}}),Gt=on(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[on("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[on("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]),qt=ce({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){const t=ct();Gt.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:$t,ssr:t}),Xe(()=>{const{defaultScrollIndex:c,defaultScrollKey:C}=e;c!=null?N({index:c}):C!=null&&N({key:C})});let o=!1,l=!1;st(()=>{if(o=!1,!l){l=!0;return}N({top:S.value,left:v.value})}),dt(()=>{o=!0,l||(l=!0)});const a=ye(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let c=0;return e.columns.forEach(C=>{c+=C.width}),c}),u=M(()=>{const c=new Map,{keyField:C}=e;return e.items.forEach((A,D)=>{c.set(A[C],D)}),c}),{scrollLeftRef:v,listWidthRef:r}=Ut({columnsRef:te(e,"columns"),renderColRef:te(e,"renderCol"),renderItemWithColsRef:te(e,"renderItemWithCols")}),y=P(null),h=P(void 0),x=new Map,g=M(()=>{const{items:c,itemSize:C,keyField:A}=e,D=new Mn(c.length,C);return c.forEach((H,Z)=>{const V=H[A],Y=x.get(V);Y!==void 0&&D.add(Z,Y)}),D}),w=P(0),S=P(0),p=ye(()=>Math.max(g.value.getBound(S.value-dn(e.paddingTop))-1,0)),F=M(()=>{const{value:c}=h;if(c===void 0)return[];const{items:C,itemSize:A}=e,D=p.value,H=Math.min(D+Math.ceil(c/A+1),C.length-1),Z=[];for(let V=D;V<=H;++V)Z.push(C[V]);return Z}),N=(c,C)=>{if(typeof c=="number"){Q(c,C,"auto");return}const{left:A,top:D,index:H,key:Z,position:V,behavior:Y,debounce:X=!0}=c;if(A!==void 0||D!==void 0)Q(A,D,Y);else if(H!==void 0)j(H,Y,X);else if(Z!==void 0){const ae=u.value.get(Z);ae!==void 0&&j(ae,Y,X)}else V==="bottom"?Q(0,Number.MAX_SAFE_INTEGER,Y):V==="top"&&Q(0,0,Y)};let O,z=null;function j(c,C,A){const{value:D}=g,H=D.sum(c)+dn(e.paddingTop);if(!A)y.value.scrollTo({left:0,top:H,behavior:C});else{O=c,z!==null&&window.clearTimeout(z),z=window.setTimeout(()=>{O=void 0,z=null},16);const{scrollTop:Z,offsetHeight:V}=y.value;if(H>Z){const Y=D.get(c);H+Y<=Z+V||y.value.scrollTo({left:0,top:H+Y-V,behavior:C})}else y.value.scrollTo({left:0,top:H,behavior:C})}}function Q(c,C,A){y.value.scrollTo({left:c,top:C,behavior:A})}function K(c,C){var A,D,H;if(o||e.ignoreItemResize||q(C.target))return;const{value:Z}=g,V=u.value.get(c),Y=Z.get(V),X=(H=(D=(A=C.borderBoxSize)===null||A===void 0?void 0:A[0])===null||D===void 0?void 0:D.blockSize)!==null&&H!==void 0?H:C.contentRect.height;if(X===Y)return;X-e.itemSize===0?x.delete(c):x.set(c,X-e.itemSize);const se=X-Y;if(se===0)return;Z.add(V,se);const s=y.value;if(s!=null){if(O===void 0){const b=Z.sum(V);s.scrollTop>b&&s.scrollBy(0,se)}else if(V<O)s.scrollBy(0,se);else if(V===O){const b=Z.sum(V);X+b>s.scrollTop+s.offsetHeight&&s.scrollBy(0,se)}W()}w.value++}const L=!Kt();let T=!1;function U(c){var C;(C=e.onScroll)===null||C===void 0||C.call(e,c),(!L||!T)&&W()}function ne(c){var C;if((C=e.onWheel)===null||C===void 0||C.call(e,c),L){const A=y.value;if(A!=null){if(c.deltaX===0&&(A.scrollTop===0&&c.deltaY<=0||A.scrollTop+A.offsetHeight>=A.scrollHeight&&c.deltaY>=0))return;c.preventDefault(),A.scrollTop+=c.deltaY/wn(),A.scrollLeft+=c.deltaX/wn(),W(),T=!0,Wt(()=>{T=!1})}}}function ie(c){if(o||q(c.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(c.contentRect.height===h.value)return}else if(c.contentRect.height===h.value&&c.contentRect.width===r.value)return;h.value=c.contentRect.height,r.value=c.contentRect.width;const{onResize:C}=e;C!==void 0&&C(c)}function W(){const{value:c}=y;c!=null&&(S.value=c.scrollTop,v.value=c.scrollLeft)}function q(c){let C=c;for(;C!==null;){if(C.style.display==="none")return!0;C=C.parentElement}return!1}return{listHeight:h,listStyle:{overflow:"auto"},keyToIndex:u,itemsStyle:M(()=>{const{itemResizable:c}=e,C=$e(g.value.sum());return w.value,[e.itemsStyle,{boxSizing:"content-box",width:$e(a.value),height:c?"":C,minHeight:c?C:"",paddingTop:$e(e.paddingTop),paddingBottom:$e(e.paddingBottom)}]}),visibleItemsStyle:M(()=>(w.value,{transform:`translateY(${$e(g.value.sum(p.value))})`})),viewportItems:F,listElRef:y,itemsElRef:P(null),scrollTo:N,handleListResize:ie,handleListScroll:U,handleListWheel:ne,handleItemResize:K}},render(){const{itemResizable:e,keyField:t,keyToIndex:o,visibleItemsTag:l}=this;return i(gn,{onResize:this.handleListResize},{default:()=>{var a,u;return i("div",at(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:"listElRef"}),[this.items.length!==0?i("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[i(l,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{const{renderCol:v,renderItemWithCols:r}=this;return this.viewportItems.map(y=>{const h=y[t],x=o.get(h),g=v!=null?i(yn,{index:x,item:y}):void 0,w=r!=null?i(yn,{index:x,item:y}):void 0,S=this.$slots.default({item:y,renderedCols:g,renderedItemWithCols:w,index:x})[0];return e?i(gn,{key:h,onResize:p=>this.handleItemResize(h,p)},{default:()=>S}):(S.key=h,S)})}})]):(u=(a=this.$slots).empty)===null||u===void 0?void 0:u.call(a)])}})}});function _n(e,t){t&&(Xe(()=>{const{value:o}=e;o&&tn.registerHandler(o,t)}),Re(e,(o,l)=>{l&&tn.unregisterHandler(l)},{deep:!1}),Sn(()=>{const{value:o}=e;o&&tn.unregisterHandler(o)}))}function Cn(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}function an(e){const t=e.filter(o=>o!==void 0);if(t.length!==0)return t.length===1?t[0]:o=>{e.forEach(l=>{l&&l(o)})}}const Yt=ce({name:"Checkmark",render(){return i("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},i("g",{fill:"none"},i("path",{d:"M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",fill:"currentColor"})))}}),Xt=ce({name:"Empty",render(){return i("svg",{viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i("path",{d:"M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",fill:"currentColor"}),i("path",{d:"M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",fill:"currentColor"}))}}),Zt=ce({props:{onFocus:Function,onBlur:Function},setup(e){return()=>i("div",{style:"width: 0; height: 0",tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),Jt=k("empty",`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[B("icon",`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[ee("+",[B("description",`
 margin-top: 8px;
 `)])]),B("description",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),B("extra",`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Qt=Object.assign(Object.assign({},pe.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:"medium"},renderIcon:Function}),eo=ce({name:"Empty",props:Qt,slots:Object,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o,mergedComponentPropsRef:l}=Fe(e),a=pe("Empty","-empty",Jt,ut,e,t),{localeRef:u}=In("Empty"),v=M(()=>{var x,g,w;return(x=e.description)!==null&&x!==void 0?x:(w=(g=l?.value)===null||g===void 0?void 0:g.Empty)===null||w===void 0?void 0:w.description}),r=M(()=>{var x,g;return((g=(x=l?.value)===null||x===void 0?void 0:x.Empty)===null||g===void 0?void 0:g.renderIcon)||(()=>i(Xt,null))}),y=M(()=>{const{size:x}=e,{common:{cubicBezierEaseInOut:g},self:{[ve("iconSize",x)]:w,[ve("fontSize",x)]:S,textColor:p,iconColor:F,extraTextColor:N}}=a.value;return{"--n-icon-size":w,"--n-font-size":S,"--n-bezier":g,"--n-text-color":p,"--n-icon-color":F,"--n-extra-text-color":N}}),h=o?Ne("empty",M(()=>{let x="";const{size:g}=e;return x+=g[0],x}),y,e):void 0;return{mergedClsPrefix:t,mergedRenderIcon:r,localizedDescription:M(()=>v.value||u.value.description),cssVars:o?void 0:y,themeClass:h?.themeClass,onRender:h?.onRender}},render(){const{$slots:e,mergedClsPrefix:t,onRender:o}=this;return o?.(),i("div",{class:[`${t}-empty`,this.themeClass],style:this.cssVars},this.showIcon?i("div",{class:`${t}-empty__icon`},e.icon?e.icon():i(zn,{clsPrefix:t},{default:this.mergedRenderIcon})):null,this.showDescription?i("div",{class:`${t}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?i("div",{class:`${t}-empty__extra`},e.extra()):null)}}),kn=ce({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:t,labelFieldRef:o,nodePropsRef:l}=Ye(bn);return{labelField:o,nodeProps:l,renderLabel:e,renderOption:t}},render(){const{clsPrefix:e,renderLabel:t,renderOption:o,nodeProps:l,tmNode:{rawNode:a}}=this,u=l?.(a),v=t?t(a,!1):Te(a[this.labelField],a,!1),r=i("div",Object.assign({},u,{class:[`${e}-base-select-group-header`,u?.class]}),v);return a.render?a.render({node:r,option:a}):o?o({node:r,option:a,selected:!1}):r}});function no(e,t){return i(Tn,{name:"fade-in-scale-up-transition"},{default:()=>e?i(zn,{clsPrefix:t,class:`${t}-base-select-option__check`},{default:()=>i(Yt)}):null})}const Rn=ce({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:t,pendingTmNodeRef:o,multipleRef:l,valueSetRef:a,renderLabelRef:u,renderOptionRef:v,labelFieldRef:r,valueFieldRef:y,showCheckmarkRef:h,nodePropsRef:x,handleOptionClick:g,handleOptionMouseEnter:w}=Ye(bn),S=ye(()=>{const{value:O}=o;return O?e.tmNode.key===O.key:!1});function p(O){const{tmNode:z}=e;z.disabled||g(O,z)}function F(O){const{tmNode:z}=e;z.disabled||w(O,z)}function N(O){const{tmNode:z}=e,{value:j}=S;z.disabled||j||w(O,z)}return{multiple:l,isGrouped:ye(()=>{const{tmNode:O}=e,{parent:z}=O;return z&&z.rawNode.type==="group"}),showCheckmark:h,nodeProps:x,isPending:S,isSelected:ye(()=>{const{value:O}=t,{value:z}=l;if(O===null)return!1;const j=e.tmNode.rawNode[y.value];if(z){const{value:Q}=a;return Q.has(j)}else return O===j}),labelField:r,renderLabel:u,renderOption:v,handleMouseMove:N,handleMouseEnter:F,handleClick:p}},render(){const{clsPrefix:e,tmNode:{rawNode:t},isSelected:o,isPending:l,isGrouped:a,showCheckmark:u,nodeProps:v,renderOption:r,renderLabel:y,handleClick:h,handleMouseEnter:x,handleMouseMove:g}=this,w=no(o,e),S=y?[y(t,o),u&&w]:[Te(t[this.labelField],t,o),u&&w],p=v?.(t),F=i("div",Object.assign({},p,{class:[`${e}-base-select-option`,t.class,p?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:o,[`${e}-base-select-option--grouped`]:a,[`${e}-base-select-option--pending`]:l,[`${e}-base-select-option--show-checkmark`]:u}],style:[p?.style||"",t.style||""],onClick:an([h,p?.onClick]),onMouseenter:an([x,p?.onMouseenter]),onMousemove:an([g,p?.onMousemove])}),i("div",{class:`${e}-base-select-option__content`},S));return t.render?t.render({node:F,option:t,selected:o}):r?r({node:F,option:t,selected:o}):F}}),to=k("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[k("scrollbar",`
 max-height: var(--n-height);
 `),k("virtual-list",`
 max-height: var(--n-height);
 `),k("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[B("content",`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),k("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),k("base-select-menu-option-wrapper",`
 position: relative;
 width: 100%;
 `),B("loading, empty",`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),B("loading",`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),B("header",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),B("action",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),k("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),k("base-select-option",`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[le("show-checkmark",`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),ee("&::before",`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),ee("&:active",`
 color: var(--n-option-text-color-pressed);
 `),le("grouped",`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),le("pending",[ee("&::before",`
 background-color: var(--n-option-color-pending);
 `)]),le("selected",`
 color: var(--n-option-text-color-active);
 `,[ee("&::before",`
 background-color: var(--n-option-color-active);
 `),le("pending",[ee("&::before",`
 background-color: var(--n-option-color-active-pending);
 `)])]),le("disabled",`
 cursor: not-allowed;
 `,[cn("selected",`
 color: var(--n-option-text-color-disabled);
 `),le("selected",`
 opacity: var(--n-option-opacity-disabled);
 `)]),B("check",`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[Fn({enterScale:"0.5"})])])]),oo=ce({name:"InternalSelectMenu",props:Object.assign(Object.assign({},pe.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function}),setup(e){const{mergedClsPrefixRef:t,mergedRtlRef:o,mergedComponentPropsRef:l}=Fe(e),a=hn("InternalSelectMenu",o,t),u=pe("InternalSelectMenu","-internal-select-menu",to,bt,e,te(e,"clsPrefix")),v=P(null),r=P(null),y=P(null),h=M(()=>e.treeMate.getFlattenedNodes()),x=M(()=>jt(h.value)),g=P(null);function w(){const{treeMate:s}=e;let b=null;const{value:J}=e;J===null?b=s.getFirstAvailableNode():(e.multiple?b=s.getNode((J||[])[(J||[]).length-1]):b=s.getNode(J),(!b||b.disabled)&&(b=s.getFirstAvailableNode())),D(b||null)}function S(){const{value:s}=g;s&&!e.treeMate.getNode(s.key)&&(g.value=null)}let p;Re(()=>e.show,s=>{s?p=Re(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?w():S(),On(H)):S()},{immediate:!0}):p?.()},{immediate:!0}),Sn(()=>{p?.()});const F=M(()=>dn(u.value.self[ve("optionHeight",e.size)])),N=M(()=>Ee(u.value.self[ve("padding",e.size)])),O=M(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),z=M(()=>{const s=h.value;return s&&s.length===0}),j=M(()=>{var s,b;return(b=(s=l?.value)===null||s===void 0?void 0:s.Select)===null||b===void 0?void 0:b.renderEmpty});function Q(s){const{onToggle:b}=e;b&&b(s)}function K(s){const{onScroll:b}=e;b&&b(s)}function L(s){var b;(b=y.value)===null||b===void 0||b.sync(),K(s)}function T(){var s;(s=y.value)===null||s===void 0||s.sync()}function U(){const{value:s}=g;return s||null}function ne(s,b){b.disabled||D(b,!1)}function ie(s,b){b.disabled||Q(b)}function W(s){var b;Ae(s,"action")||(b=e.onKeyup)===null||b===void 0||b.call(e,s)}function q(s){var b;Ae(s,"action")||(b=e.onKeydown)===null||b===void 0||b.call(e,s)}function c(s){var b;(b=e.onMousedown)===null||b===void 0||b.call(e,s),!e.focusable&&s.preventDefault()}function C(){const{value:s}=g;s&&D(s.getNext({loop:!0}),!0)}function A(){const{value:s}=g;s&&D(s.getPrev({loop:!0}),!0)}function D(s,b=!1){g.value=s,b&&H()}function H(){var s,b;const J=g.value;if(!J)return;const ue=x.value(J.key);ue!==null&&(e.virtualScroll?(s=r.value)===null||s===void 0||s.scrollTo({index:ue}):(b=y.value)===null||b===void 0||b.scrollTo({index:ue,elSize:F.value}))}function Z(s){var b,J;!((b=v.value)===null||b===void 0)&&b.contains(s.target)&&((J=e.onFocus)===null||J===void 0||J.call(e,s))}function V(s){var b,J;!((b=v.value)===null||b===void 0)&&b.contains(s.relatedTarget)||(J=e.onBlur)===null||J===void 0||J.call(e,s)}Ue(bn,{handleOptionMouseEnter:ne,handleOptionClick:ie,valueSetRef:O,pendingTmNodeRef:g,nodePropsRef:te(e,"nodeProps"),showCheckmarkRef:te(e,"showCheckmark"),multipleRef:te(e,"multiple"),valueRef:te(e,"value"),renderLabelRef:te(e,"renderLabel"),renderOptionRef:te(e,"renderOption"),labelFieldRef:te(e,"labelField"),valueFieldRef:te(e,"valueField")}),Ue(Et,v),Xe(()=>{const{value:s}=y;s&&s.sync()});const Y=M(()=>{const{size:s}=e,{common:{cubicBezierEaseInOut:b},self:{height:J,borderRadius:ue,color:me,groupHeaderTextColor:fe,actionDividerColor:de,optionTextColorPressed:xe,optionTextColor:be,optionTextColorDisabled:Oe,optionTextColorActive:Ie,optionOpacityDisabled:Me,optionCheckColor:Ce,actionTextColor:ke,optionColorPending:Pe,optionColorActive:_e,loadingColor:Be,loadingSize:Se,optionColorActivePending:ze,[ve("optionFontSize",s)]:he,[ve("optionHeight",s)]:d,[ve("optionPadding",s)]:m}}=u.value;return{"--n-height":J,"--n-action-divider-color":de,"--n-action-text-color":ke,"--n-bezier":b,"--n-border-radius":ue,"--n-color":me,"--n-option-font-size":he,"--n-group-header-text-color":fe,"--n-option-check-color":Ce,"--n-option-color-pending":Pe,"--n-option-color-active":_e,"--n-option-color-active-pending":ze,"--n-option-height":d,"--n-option-opacity-disabled":Me,"--n-option-text-color":be,"--n-option-text-color-active":Ie,"--n-option-text-color-disabled":Oe,"--n-option-text-color-pressed":xe,"--n-option-padding":m,"--n-option-padding-left":Ee(m,"left"),"--n-option-padding-right":Ee(m,"right"),"--n-loading-color":Be,"--n-loading-size":Se}}),{inlineThemeDisabled:X}=e,ae=X?Ne("internal-select-menu",M(()=>e.size[0]),Y,e):void 0,se={selfRef:v,next:C,prev:A,getPendingTmNode:U};return _n(v,e.onResize),Object.assign({mergedTheme:u,mergedClsPrefix:t,rtlEnabled:a,virtualListRef:r,scrollbarRef:y,itemSize:F,padding:N,flattenedNodes:h,empty:z,mergedRenderEmpty:j,virtualListContainer(){const{value:s}=r;return s?.listElRef},virtualListContent(){const{value:s}=r;return s?.itemsElRef},doScroll:K,handleFocusin:Z,handleFocusout:V,handleKeyUp:W,handleKeyDown:q,handleMouseDown:c,handleVirtualListResize:T,handleVirtualListScroll:L,cssVars:X?void 0:Y,themeClass:ae?.themeClass,onRender:ae?.onRender},se)},render(){const{$slots:e,virtualScroll:t,clsPrefix:o,mergedTheme:l,themeClass:a,onRender:u}=this;return u?.(),i("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${o}-base-select-menu`,`${o}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${o}-base-select-menu--rtl`,a,this.multiple&&`${o}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},un(e.header,v=>v&&i("div",{class:`${o}-base-select-menu__header`,"data-header":!0,key:"header"},v)),this.loading?i("div",{class:`${o}-base-select-menu__loading`},i(ft,{clsPrefix:o,strokeWidth:20})):this.empty?i("div",{class:`${o}-base-select-menu__empty`,"data-empty":!0},vt(e.empty,()=>{var v;return[((v=this.mergedRenderEmpty)===null||v===void 0?void 0:v.call(this))||i(eo,{theme:l.peers.Empty,themeOverrides:l.peerOverrides.Empty,size:this.size})]})):i(ht,Object.assign({ref:"scrollbarRef",theme:l.peers.Scrollbar,themeOverrides:l.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?i(qt,{ref:"virtualListRef",class:`${o}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:v})=>v.isGroup?i(kn,{key:v.key,clsPrefix:o,tmNode:v}):v.ignored?null:i(Rn,{clsPrefix:o,key:v.key,tmNode:v})}):i("div",{class:`${o}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(v=>v.isGroup?i(kn,{key:v.key,clsPrefix:o,tmNode:v}):i(Rn,{clsPrefix:o,key:v.key,tmNode:v})))}),un(e.action,v=>v&&[i("div",{class:`${o}-base-select-menu__action`,"data-action":!0,key:"action"},v),i(Zt,{onFocus:this.onTabOut,key:"focus-detector"})]))}}),lo=ee([k("base-selection",`
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
 `,[k("base-loading",`
 color: var(--n-loading-color);
 `),k("base-selection-tags","min-height: var(--n-height);"),B("border, state-border",`
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
 `),B("state-border",`
 z-index: 1;
 border-color: #0000;
 `),k("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[B("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),k("base-selection-overlay",`
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
 `,[B("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),k("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `,[B("inner",`
 max-width: 100%;
 overflow: hidden;
 `)]),k("base-selection-tags",`
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
 `),k("base-selection-label",`
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
 `,[k("base-selection-input",`
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
 `,[B("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),B("render-label",`
 color: var(--n-text-color);
 `)]),cn("disabled",[ee("&:hover",[B("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),le("focus",[B("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),le("active",[B("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),k("base-selection-label","background-color: var(--n-color-active);"),k("base-selection-tags","background-color: var(--n-color-active);")])]),le("disabled","cursor: not-allowed;",[B("arrow",`
 color: var(--n-arrow-color-disabled);
 `),k("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[k("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),B("render-label",`
 color: var(--n-text-color-disabled);
 `)]),k("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),k("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),k("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[B("input",`
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
 `),B("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>le(`${e}-status`,[B("state-border",`border: var(--n-border-${e});`),cn("disabled",[ee("&:hover",[B("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),le("active",[B("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),k("base-selection-label",`background-color: var(--n-color-active-${e});`),k("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),le("focus",[B("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),k("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),k("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[ee("&:last-child","padding-right: 0;"),k("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[B("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),io=ce({name:"InternalSelection",props:Object.assign(Object.assign({},pe.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){const{mergedClsPrefixRef:t,mergedRtlRef:o}=Fe(e),l=hn("InternalSelection",o,t),a=P(null),u=P(null),v=P(null),r=P(null),y=P(null),h=P(null),x=P(null),g=P(null),w=P(null),S=P(null),p=P(!1),F=P(!1),N=P(!1),O=pe("InternalSelection","-internal-selection",lo,xt,e,te(e,"clsPrefix")),z=M(()=>e.clearable&&!e.disabled&&(N.value||e.active)),j=M(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Te(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),Q=M(()=>{const d=e.selectedOption;if(d)return d[e.labelField]}),K=M(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function L(){var d;const{value:m}=a;if(m){const{value:oe}=u;oe&&(oe.style.width=`${m.offsetWidth}px`,e.maxTagCount!=="responsive"&&((d=w.value)===null||d===void 0||d.sync({showAllItemsBeforeCalculate:!1})))}}function T(){const{value:d}=S;d&&(d.style.display="none")}function U(){const{value:d}=S;d&&(d.style.display="inline-block")}Re(te(e,"active"),d=>{d||T()}),Re(te(e,"pattern"),()=>{e.multiple&&On(L)});function ne(d){const{onFocus:m}=e;m&&m(d)}function ie(d){const{onBlur:m}=e;m&&m(d)}function W(d){const{onDeleteOption:m}=e;m&&m(d)}function q(d){const{onClear:m}=e;m&&m(d)}function c(d){const{onPatternInput:m}=e;m&&m(d)}function C(d){var m;(!d.relatedTarget||!(!((m=v.value)===null||m===void 0)&&m.contains(d.relatedTarget)))&&ne(d)}function A(d){var m;!((m=v.value)===null||m===void 0)&&m.contains(d.relatedTarget)||ie(d)}function D(d){q(d)}function H(){N.value=!0}function Z(){N.value=!1}function V(d){!e.active||!e.filterable||d.target!==u.value&&d.preventDefault()}function Y(d){W(d)}const X=P(!1);function ae(d){if(d.key==="Backspace"&&!X.value&&!e.pattern.length){const{selectedOptions:m}=e;m?.length&&Y(m[m.length-1])}}let se=null;function s(d){const{value:m}=a;if(m){const oe=d.target.value;m.textContent=oe,L()}e.ignoreComposition&&X.value?se=d:c(d)}function b(){X.value=!0}function J(){X.value=!1,e.ignoreComposition&&c(se),se=null}function ue(d){var m;F.value=!0,(m=e.onPatternFocus)===null||m===void 0||m.call(e,d)}function me(d){var m;F.value=!1,(m=e.onPatternBlur)===null||m===void 0||m.call(e,d)}function fe(){var d,m;if(e.filterable)F.value=!1,(d=h.value)===null||d===void 0||d.blur(),(m=u.value)===null||m===void 0||m.blur();else if(e.multiple){const{value:oe}=r;oe?.blur()}else{const{value:oe}=y;oe?.blur()}}function de(){var d,m,oe;e.filterable?(F.value=!1,(d=h.value)===null||d===void 0||d.focus()):e.multiple?(m=r.value)===null||m===void 0||m.focus():(oe=y.value)===null||oe===void 0||oe.focus()}function xe(){const{value:d}=u;d&&(U(),d.focus())}function be(){const{value:d}=u;d&&d.blur()}function Oe(d){const{value:m}=x;m&&m.setTextContent(`+${d}`)}function Ie(){const{value:d}=g;return d}function Me(){return u.value}let Ce=null;function ke(){Ce!==null&&window.clearTimeout(Ce)}function Pe(){e.active||(ke(),Ce=window.setTimeout(()=>{K.value&&(p.value=!0)},100))}function _e(){ke()}function Be(d){d||(ke(),p.value=!1)}Re(K,d=>{d||(p.value=!1)}),Xe(()=>{mt(()=>{const d=h.value;d&&(e.disabled?d.removeAttribute("tabindex"):d.tabIndex=F.value?-1:0)})}),_n(v,e.onResize);const{inlineThemeDisabled:Se}=e,ze=M(()=>{const{size:d}=e,{common:{cubicBezierEaseInOut:m},self:{fontWeight:oe,borderRadius:Ze,color:Je,placeholderColor:Qe,textColor:Le,paddingSingle:De,paddingMultiple:Ve,caretColor:en,colorDisabled:nn,textColorDisabled:je,placeholderColorDisabled:we,colorActive:n,boxShadowFocus:f,boxShadowActive:R,boxShadowHover:$,border:I,borderFocus:_,borderHover:E,borderActive:re,arrowColor:ge,arrowColorDisabled:En,loadingColor:An,colorActiveWarning:Nn,boxShadowFocusWarning:Ln,boxShadowActiveWarning:Dn,boxShadowHoverWarning:Vn,borderWarning:jn,borderFocusWarning:Hn,borderHoverWarning:Wn,borderActiveWarning:Kn,colorActiveError:Un,boxShadowFocusError:Gn,boxShadowActiveError:qn,boxShadowHoverError:Yn,borderError:Xn,borderFocusError:Zn,borderHoverError:Jn,borderActiveError:Qn,clearColor:et,clearColorHover:nt,clearColorPressed:tt,clearSize:ot,arrowSize:lt,[ve("height",d)]:it,[ve("fontSize",d)]:rt}}=O.value,He=Ee(De),We=Ee(Ve);return{"--n-bezier":m,"--n-border":I,"--n-border-active":re,"--n-border-focus":_,"--n-border-hover":E,"--n-border-radius":Ze,"--n-box-shadow-active":R,"--n-box-shadow-focus":f,"--n-box-shadow-hover":$,"--n-caret-color":en,"--n-color":Je,"--n-color-active":n,"--n-color-disabled":nn,"--n-font-size":rt,"--n-height":it,"--n-padding-single-top":He.top,"--n-padding-multiple-top":We.top,"--n-padding-single-right":He.right,"--n-padding-multiple-right":We.right,"--n-padding-single-left":He.left,"--n-padding-multiple-left":We.left,"--n-padding-single-bottom":He.bottom,"--n-padding-multiple-bottom":We.bottom,"--n-placeholder-color":Qe,"--n-placeholder-color-disabled":we,"--n-text-color":Le,"--n-text-color-disabled":je,"--n-arrow-color":ge,"--n-arrow-color-disabled":En,"--n-loading-color":An,"--n-color-active-warning":Nn,"--n-box-shadow-focus-warning":Ln,"--n-box-shadow-active-warning":Dn,"--n-box-shadow-hover-warning":Vn,"--n-border-warning":jn,"--n-border-focus-warning":Hn,"--n-border-hover-warning":Wn,"--n-border-active-warning":Kn,"--n-color-active-error":Un,"--n-box-shadow-focus-error":Gn,"--n-box-shadow-active-error":qn,"--n-box-shadow-hover-error":Yn,"--n-border-error":Xn,"--n-border-focus-error":Zn,"--n-border-hover-error":Jn,"--n-border-active-error":Qn,"--n-clear-size":ot,"--n-clear-color":et,"--n-clear-color-hover":nt,"--n-clear-color-pressed":tt,"--n-arrow-size":lt,"--n-font-weight":oe}}),he=Se?Ne("internal-selection",M(()=>e.size[0]),ze,e):void 0;return{mergedTheme:O,mergedClearable:z,mergedClsPrefix:t,rtlEnabled:l,patternInputFocused:F,filterablePlaceholder:j,label:Q,selected:K,showTagsPanel:p,isComposing:X,counterRef:x,counterWrapperRef:g,patternInputMirrorRef:a,patternInputRef:u,selfRef:v,multipleElRef:r,singleElRef:y,patternInputWrapperRef:h,overflowRef:w,inputTagElRef:S,handleMouseDown:V,handleFocusin:C,handleClear:D,handleMouseEnter:H,handleMouseLeave:Z,handleDeleteOption:Y,handlePatternKeyDown:ae,handlePatternInputInput:s,handlePatternInputBlur:me,handlePatternInputFocus:ue,handleMouseEnterCounter:Pe,handleMouseLeaveCounter:_e,handleFocusout:A,handleCompositionEnd:J,handleCompositionStart:b,onPopoverUpdateShow:Be,focus:de,focusInput:xe,blur:fe,blurInput:be,updateCounter:Oe,getCounter:Ie,getTail:Me,renderLabel:e.renderLabel,cssVars:Se?void 0:ze,themeClass:he?.themeClass,onRender:he?.onRender}},render(){const{status:e,multiple:t,size:o,disabled:l,filterable:a,maxTagCount:u,bordered:v,clsPrefix:r,ellipsisTagPopoverProps:y,onRender:h,renderTag:x,renderLabel:g}=this;h?.();const w=u==="responsive",S=typeof u=="number",p=w||S,F=i(gt,null,{default:()=>i(Vt,{clsPrefix:r,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var O,z;return(z=(O=this.$slots).arrow)===null||z===void 0?void 0:z.call(O)}})});let N;if(t){const{labelField:O}=this,z=c=>i("div",{class:`${r}-base-selection-tag-wrapper`,key:c.value},x?x({option:c,handleClose:()=>{this.handleDeleteOption(c)}}):i(ln,{size:o,closable:!c.disabled,disabled:l,onClose:()=>{this.handleDeleteOption(c)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>g?g(c,!0):Te(c[O],c,!0)})),j=()=>(S?this.selectedOptions.slice(0,u):this.selectedOptions).map(z),Q=a?i("div",{class:`${r}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},i("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:l,value:this.pattern,autofocus:this.autofocus,class:`${r}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),i("span",{ref:"patternInputMirrorRef",class:`${r}-base-selection-input-tag__mirror`},this.pattern)):null,K=w?()=>i("div",{class:`${r}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},i(ln,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:l})):void 0;let L;if(S){const c=this.selectedOptions.length-u;c>0&&(L=i("div",{class:`${r}-base-selection-tag-wrapper`,key:"__counter__"},i(ln,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:l},{default:()=>`+${c}`})))}const T=w?a?i(mn,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:j,counter:K,tail:()=>Q}):i(mn,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:j,counter:K}):S&&L?j().concat(L):j(),U=p?()=>i("div",{class:`${r}-base-selection-popover`},w?j():this.selectedOptions.map(z)):void 0,ne=p?Object.assign({show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},y):null,W=(this.selected?!1:this.active?!this.pattern&&!this.isComposing:!0)?i("div",{class:`${r}-base-selection-placeholder ${r}-base-selection-overlay`},i("div",{class:`${r}-base-selection-placeholder__inner`},this.placeholder)):null,q=a?i("div",{ref:"patternInputWrapperRef",class:`${r}-base-selection-tags`},T,w?null:Q,F):i("div",{ref:"multipleElRef",class:`${r}-base-selection-tags`,tabindex:l?void 0:0},T,F);N=i(pt,null,p?i(At,Object.assign({},ne,{scrollable:!0,style:"max-height: calc(var(--v-target-height) * 6.6);"}),{trigger:()=>q,default:U}):q,W)}else if(a){const O=this.pattern||this.isComposing,z=this.active?!O:!this.selected,j=this.active?!1:this.selected;N=i("div",{ref:"patternInputWrapperRef",class:`${r}-base-selection-label`,title:this.patternInputFocused?void 0:Cn(this.label)},i("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${r}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:l,disabled:l,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),j?i("div",{class:`${r}-base-selection-label__render-label ${r}-base-selection-overlay`,key:"input"},i("div",{class:`${r}-base-selection-overlay__wrapper`},x?x({option:this.selectedOption,handleClose:()=>{}}):g?g(this.selectedOption,!0):Te(this.label,this.selectedOption,!0))):null,z?i("div",{class:`${r}-base-selection-placeholder ${r}-base-selection-overlay`,key:"placeholder"},i("div",{class:`${r}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,F)}else N=i("div",{ref:"singleElRef",class:`${r}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?i("div",{class:`${r}-base-selection-input`,title:Cn(this.label),key:"input"},i("div",{class:`${r}-base-selection-input__content`},x?x({option:this.selectedOption,handleClose:()=>{}}):g?g(this.selectedOption,!0):Te(this.label,this.selectedOption,!0))):i("div",{class:`${r}-base-selection-placeholder ${r}-base-selection-overlay`,key:"placeholder"},i("div",{class:`${r}-base-selection-placeholder__inner`},this.placeholder)),F);return i("div",{ref:"selfRef",class:[`${r}-base-selection`,this.rtlEnabled&&`${r}-base-selection--rtl`,this.themeClass,e&&`${r}-base-selection--${e}-status`,{[`${r}-base-selection--active`]:this.active,[`${r}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${r}-base-selection--disabled`]:this.disabled,[`${r}-base-selection--multiple`]:this.multiple,[`${r}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},N,v?i("div",{class:`${r}-base-selection__border`}):null,v?i("div",{class:`${r}-base-selection__state-border`}):null)}});function qe(e){return e.type==="group"}function Bn(e){return e.type==="ignored"}function sn(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function ro(e,t){return{getIsGroup:qe,getIgnored:Bn,getKey(l){return qe(l)?l.name||l.key||"key-required":l[e]},getChildren(l){return l[t]}}}function ao(e,t,o,l){if(!t)return e;function a(u){if(!Array.isArray(u))return[];const v=[];for(const r of u)if(qe(r)){const y=a(r[l]);y.length&&v.push(Object.assign({},r,{[l]:y}))}else{if(Bn(r))continue;t(o,r)&&v.push(r)}return v}return a(e)}function so(e,t,o){const l=new Map;return e.forEach(a=>{qe(a)?a[o].forEach(u=>{l.set(u[t],u)}):l.set(a[t],a)}),l}const $n=wt("n-checkbox-group"),co={min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},So=ce({name:"CheckboxGroup",props:co,setup(e){const{mergedClsPrefixRef:t}=Fe(e),o=vn(e),{mergedSizeRef:l,mergedDisabledRef:a}=o,u=P(e.defaultValue),v=M(()=>e.value),r=Ge(v,u),y=M(()=>{var g;return((g=r.value)===null||g===void 0?void 0:g.length)||0}),h=M(()=>Array.isArray(r.value)?new Set(r.value):new Set);function x(g,w){const{nTriggerFormInput:S,nTriggerFormChange:p}=o,{onChange:F,"onUpdate:value":N,onUpdateValue:O}=e;if(Array.isArray(r.value)){const z=Array.from(r.value),j=z.findIndex(Q=>Q===w);g?~j||(z.push(w),O&&G(O,z,{actionType:"check",value:w}),N&&G(N,z,{actionType:"check",value:w}),S(),p(),u.value=z,F&&G(F,z)):~j&&(z.splice(j,1),O&&G(O,z,{actionType:"uncheck",value:w}),N&&G(N,z,{actionType:"uncheck",value:w}),F&&G(F,z),u.value=z,S(),p())}else g?(O&&G(O,[w],{actionType:"check",value:w}),N&&G(N,[w],{actionType:"check",value:w}),F&&G(F,[w]),u.value=[w],S(),p()):(O&&G(O,[],{actionType:"uncheck",value:w}),N&&G(N,[],{actionType:"uncheck",value:w}),F&&G(F,[]),u.value=[],S(),p())}return Ue($n,{checkedCountRef:y,maxRef:te(e,"max"),minRef:te(e,"min"),valueSetRef:h,disabledRef:a,mergedSizeRef:l,toggleCheckbox:x}),{mergedClsPrefix:t}},render(){return i("div",{class:`${this.mergedClsPrefix}-checkbox-group`,role:"group"},this.$slots)}}),uo=()=>i("svg",{viewBox:"0 0 64 64",class:"check-icon"},i("path",{d:"M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"})),fo=()=>i("svg",{viewBox:"0 0 100 100",class:"line-icon"},i("path",{d:"M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"})),ho=ee([k("checkbox",`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[le("show-label","line-height: var(--n-label-line-height);"),ee("&:hover",[k("checkbox-box",[B("border","border: var(--n-border-checked);")])]),ee("&:focus:not(:active)",[k("checkbox-box",[B("border",`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),le("inside-table",[k("checkbox-box",`
 background-color: var(--n-merged-color-table);
 `)]),le("checked",[k("checkbox-box",`
 background-color: var(--n-color-checked);
 `,[k("checkbox-icon",[ee(".check-icon",`
 opacity: 1;
 transform: scale(1);
 `)])])]),le("indeterminate",[k("checkbox-box",[k("checkbox-icon",[ee(".check-icon",`
 opacity: 0;
 transform: scale(.5);
 `),ee(".line-icon",`
 opacity: 1;
 transform: scale(1);
 `)])])]),le("checked, indeterminate",[ee("&:focus:not(:active)",[k("checkbox-box",[B("border",`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),k("checkbox-box",`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[B("border",{border:"var(--n-border-checked)"})])]),le("disabled",{cursor:"not-allowed"},[le("checked",[k("checkbox-box",`
 background-color: var(--n-color-disabled-checked);
 `,[B("border",{border:"var(--n-border-disabled-checked)"}),k("checkbox-icon",[ee(".check-icon, .line-icon",{fill:"var(--n-check-mark-color-disabled-checked)"})])])]),k("checkbox-box",`
 background-color: var(--n-color-disabled);
 `,[B("border",`
 border: var(--n-border-disabled);
 `),k("checkbox-icon",[ee(".check-icon, .line-icon",`
 fill: var(--n-check-mark-color-disabled);
 `)])]),B("label",`
 color: var(--n-text-color-disabled);
 `)]),k("checkbox-box-wrapper",`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),k("checkbox-box",`
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `,[B("border",`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `),k("checkbox-icon",`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[ee(".check-icon, .line-icon",`
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `),yt({left:"1px",top:"1px"})])]),B("label",`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[ee("&:empty",{display:"none"})])]),Ct(k("checkbox",`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),kt(k("checkbox",`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),vo=Object.assign(Object.assign({},pe.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),zo=ce({name:"Checkbox",props:vo,setup(e){const t=Ye($n,null),o=P(null),{mergedClsPrefixRef:l,inlineThemeDisabled:a,mergedRtlRef:u,mergedComponentPropsRef:v}=Fe(e),r=P(e.defaultChecked),y=te(e,"checked"),h=Ge(y,r),x=ye(()=>{if(t){const T=t.valueSetRef.value;return T&&e.value!==void 0?T.has(e.value):!1}else return h.value===e.checkedValue}),g=vn(e,{mergedSize(T){var U,ne;const{size:ie}=e;if(ie!==void 0)return ie;if(t){const{value:q}=t.mergedSizeRef;if(q!==void 0)return q}if(T){const{mergedSize:q}=T;if(q!==void 0)return q.value}const W=(ne=(U=v?.value)===null||U===void 0?void 0:U.Checkbox)===null||ne===void 0?void 0:ne.size;return W||"medium"},mergedDisabled(T){const{disabled:U}=e;if(U!==void 0)return U;if(t){if(t.disabledRef.value)return!0;const{maxRef:{value:ne},checkedCountRef:ie}=t;if(ne!==void 0&&ie.value>=ne&&!x.value)return!0;const{minRef:{value:W}}=t;if(W!==void 0&&ie.value<=W&&x.value)return!0}return T?T.disabled.value:!1}}),{mergedDisabledRef:w,mergedSizeRef:S}=g,p=pe("Checkbox","-checkbox",ho,Tt,e,l);function F(T){if(t&&e.value!==void 0)t.toggleCheckbox(!x.value,e.value);else{const{onChange:U,"onUpdate:checked":ne,onUpdateChecked:ie}=e,{nTriggerFormInput:W,nTriggerFormChange:q}=g,c=x.value?e.uncheckedValue:e.checkedValue;ne&&G(ne,c,T),ie&&G(ie,c,T),U&&G(U,c,T),W(),q(),r.value=c}}function N(T){w.value||F(T)}function O(T){if(!w.value)switch(T.key){case" ":case"Enter":F(T)}}function z(T){T.key===" "&&T.preventDefault()}const j={focus:()=>{var T;(T=o.value)===null||T===void 0||T.focus()},blur:()=>{var T;(T=o.value)===null||T===void 0||T.blur()}},Q=hn("Checkbox",u,l),K=M(()=>{const{value:T}=S,{common:{cubicBezierEaseInOut:U},self:{borderRadius:ne,color:ie,colorChecked:W,colorDisabled:q,colorTableHeader:c,colorTableHeaderModal:C,colorTableHeaderPopover:A,checkMarkColor:D,checkMarkColorDisabled:H,border:Z,borderFocus:V,borderDisabled:Y,borderChecked:X,boxShadowFocus:ae,textColor:se,textColorDisabled:s,checkMarkColorDisabledChecked:b,colorDisabledChecked:J,borderDisabledChecked:ue,labelPadding:me,labelLineHeight:fe,labelFontWeight:de,[ve("fontSize",T)]:xe,[ve("size",T)]:be}}=p.value;return{"--n-label-line-height":fe,"--n-label-font-weight":de,"--n-size":be,"--n-bezier":U,"--n-border-radius":ne,"--n-border":Z,"--n-border-checked":X,"--n-border-focus":V,"--n-border-disabled":Y,"--n-border-disabled-checked":ue,"--n-box-shadow-focus":ae,"--n-color":ie,"--n-color-checked":W,"--n-color-table":c,"--n-color-table-modal":C,"--n-color-table-popover":A,"--n-color-disabled":q,"--n-color-disabled-checked":J,"--n-text-color":se,"--n-text-color-disabled":s,"--n-check-mark-color":D,"--n-check-mark-color-disabled":H,"--n-check-mark-color-disabled-checked":b,"--n-font-size":xe,"--n-label-padding":me}}),L=a?Ne("checkbox",M(()=>S.value[0]),K,e):void 0;return Object.assign(g,j,{rtlEnabled:Q,selfRef:o,mergedClsPrefix:l,mergedDisabled:w,renderedChecked:x,mergedTheme:p,labelId:zt(),handleClick:N,handleKeyUp:O,handleKeyDown:z,cssVars:a?void 0:K,themeClass:L?.themeClass,onRender:L?.onRender})},render(){var e;const{$slots:t,renderedChecked:o,mergedDisabled:l,indeterminate:a,privateInsideTable:u,cssVars:v,labelId:r,label:y,mergedClsPrefix:h,focusable:x,handleKeyUp:g,handleKeyDown:w,handleClick:S}=this;(e=this.onRender)===null||e===void 0||e.call(this);const p=un(t.default,F=>y||F?i("span",{class:`${h}-checkbox__label`,id:r},y||F):null);return i("div",{ref:"selfRef",class:[`${h}-checkbox`,this.themeClass,this.rtlEnabled&&`${h}-checkbox--rtl`,o&&`${h}-checkbox--checked`,l&&`${h}-checkbox--disabled`,a&&`${h}-checkbox--indeterminate`,u&&`${h}-checkbox--inside-table`,p&&`${h}-checkbox--show-label`],tabindex:l||!x?void 0:0,role:"checkbox","aria-checked":a?"mixed":o,"aria-labelledby":r,style:v,onKeyup:g,onKeydown:w,onClick:S,onMousedown:()=>{St("selectstart",window,F=>{F.preventDefault()},{once:!0})}},i("div",{class:`${h}-checkbox-box-wrapper`}," ",i("div",{class:`${h}-checkbox-box`},i(Rt,null,{default:()=>this.indeterminate?i("div",{key:"indeterminate",class:`${h}-checkbox-icon`},fo()):i("div",{key:"check",class:`${h}-checkbox-icon`},uo())}),i("div",{class:`${h}-checkbox-box__border`}))),p)}}),bo=ee([k("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),k("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Fn({originalTransition:"background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"})])]),go=Object.assign(Object.assign({},pe.props),{to:fn.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},childrenField:{type:String,default:"children"},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array}),To=ce({name:"Select",props:go,slots:Object,setup(e){const{mergedClsPrefixRef:t,mergedBorderedRef:o,namespaceRef:l,inlineThemeDisabled:a,mergedComponentPropsRef:u}=Fe(e),v=pe("Select","-select",bo,Mt,e,t),r=P(e.defaultValue),y=te(e,"value"),h=Ge(y,r),x=P(!1),g=P(""),w=Bt(e,["items","options"]),S=P([]),p=P([]),F=M(()=>p.value.concat(S.value).concat(w.value)),N=M(()=>{const{filter:n}=e;if(n)return n;const{labelField:f,valueField:R}=e;return($,I)=>{if(!I)return!1;const _=I[f];if(typeof _=="string")return sn($,_);const E=I[R];return typeof E=="string"?sn($,E):typeof E=="number"?sn($,String(E)):!1}}),O=M(()=>{if(e.remote)return w.value;{const{value:n}=F,{value:f}=g;return!f.length||!e.filterable?n:ao(n,N.value,f,e.childrenField)}}),z=M(()=>{const{valueField:n,childrenField:f}=e,R=ro(n,f);return Ht(O.value,R)}),j=M(()=>so(F.value,e.valueField,e.childrenField)),Q=P(!1),K=Ge(te(e,"show"),Q),L=P(null),T=P(null),U=P(null),{localeRef:ne}=In("Select"),ie=M(()=>{var n;return(n=e.placeholder)!==null&&n!==void 0?n:ne.value.placeholder}),W=[],q=P(new Map),c=M(()=>{const{fallbackOption:n}=e;if(n===void 0){const{labelField:f,valueField:R}=e;return $=>({[f]:String($),[R]:$})}return n===!1?!1:f=>Object.assign(n(f),{value:f})});function C(n){const f=e.remote,{value:R}=q,{value:$}=j,{value:I}=c,_=[];return n.forEach(E=>{if($.has(E))_.push($.get(E));else if(f&&R.has(E))_.push(R.get(E));else if(I){const re=I(E);re&&_.push(re)}}),_}const A=M(()=>{if(e.multiple){const{value:n}=h;return Array.isArray(n)?C(n):[]}return null}),D=M(()=>{const{value:n}=h;return!e.multiple&&!Array.isArray(n)?n===null?null:C([n])[0]||null:null}),H=vn(e,{mergedSize:n=>{var f,R;const{size:$}=e;if($)return $;const{mergedSize:I}=n||{};if(I?.value)return I.value;const _=(R=(f=u?.value)===null||f===void 0?void 0:f.Select)===null||R===void 0?void 0:R.size;return _||"medium"}}),{mergedSizeRef:Z,mergedDisabledRef:V,mergedStatusRef:Y}=H;function X(n,f){const{onChange:R,"onUpdate:value":$,onUpdateValue:I}=e,{nTriggerFormChange:_,nTriggerFormInput:E}=H;R&&G(R,n,f),I&&G(I,n,f),$&&G($,n,f),r.value=n,_(),E()}function ae(n){const{onBlur:f}=e,{nTriggerFormBlur:R}=H;f&&G(f,n),R()}function se(){const{onClear:n}=e;n&&G(n)}function s(n){const{onFocus:f,showOnFocus:R}=e,{nTriggerFormFocus:$}=H;f&&G(f,n),$(),R&&fe()}function b(n){const{onSearch:f}=e;f&&G(f,n)}function J(n){const{onScroll:f}=e;f&&G(f,n)}function ue(){var n;const{remote:f,multiple:R}=e;if(f){const{value:$}=q;if(R){const{valueField:I}=e;(n=A.value)===null||n===void 0||n.forEach(_=>{$.set(_[I],_)})}else{const I=D.value;I&&$.set(I[e.valueField],I)}}}function me(n){const{onUpdateShow:f,"onUpdate:show":R}=e;f&&G(f,n),R&&G(R,n),Q.value=n}function fe(){V.value||(me(!0),Q.value=!0,e.filterable&&Ve())}function de(){me(!1)}function xe(){g.value="",p.value=W}const be=P(!1);function Oe(){e.filterable&&(be.value=!0)}function Ie(){e.filterable&&(be.value=!1,K.value||xe())}function Me(){V.value||(K.value?e.filterable?Ve():de():fe())}function Ce(n){var f,R;!((R=(f=U.value)===null||f===void 0?void 0:f.selfRef)===null||R===void 0)&&R.contains(n.relatedTarget)||(x.value=!1,ae(n),de())}function ke(n){s(n),x.value=!0}function Pe(){x.value=!0}function _e(n){var f;!((f=L.value)===null||f===void 0)&&f.$el.contains(n.relatedTarget)||(x.value=!1,ae(n),de())}function Be(){var n;(n=L.value)===null||n===void 0||n.focus(),de()}function Se(n){var f;K.value&&(!((f=L.value)===null||f===void 0)&&f.$el.contains(Pt(n))||de())}function ze(n){if(!Array.isArray(n))return[];if(c.value)return Array.from(n);{const{remote:f}=e,{value:R}=j;if(f){const{value:$}=q;return n.filter(I=>R.has(I)||$.has(I))}else return n.filter($=>R.has($))}}function he(n){d(n.rawNode)}function d(n){if(V.value)return;const{tag:f,remote:R,clearFilterAfterSelect:$,valueField:I}=e;if(f&&!R){const{value:_}=p,E=_[0]||null;if(E){const re=S.value;re.length?re.push(E):S.value=[E],p.value=W}}if(R&&q.value.set(n[I],n),e.multiple){const _=ze(h.value),E=_.findIndex(re=>re===n[I]);if(~E){if(_.splice(E,1),f&&!R){const re=m(n[I]);~re&&(S.value.splice(re,1),$&&(g.value=""))}}else _.push(n[I]),$&&(g.value="");X(_,C(_))}else{if(f&&!R){const _=m(n[I]);~_?S.value=[S.value[_]]:S.value=W}De(),de(),X(n[I],n)}}function m(n){return S.value.findIndex(R=>R[e.valueField]===n)}function oe(n){K.value||fe();const{value:f}=n.target;g.value=f;const{tag:R,remote:$}=e;if(b(f),R&&!$){if(!f){p.value=W;return}const{onCreate:I}=e,_=I?I(f):{[e.labelField]:f,[e.valueField]:f},{valueField:E,labelField:re}=e;w.value.some(ge=>ge[E]===_[E]||ge[re]===_[re])||S.value.some(ge=>ge[E]===_[E]||ge[re]===_[re])?p.value=W:p.value=[_]}}function Ze(n){n.stopPropagation();const{multiple:f,tag:R,remote:$,clearCreatedOptionsOnClear:I}=e;!f&&e.filterable&&de(),R&&!$&&I&&(S.value=W),se(),f?X([],[]):X(null,null)}function Je(n){!Ae(n,"action")&&!Ae(n,"empty")&&!Ae(n,"header")&&n.preventDefault()}function Qe(n){J(n)}function Le(n){var f,R,$,I,_;if(!e.keyboard){n.preventDefault();return}switch(n.key){case" ":if(e.filterable)break;n.preventDefault();case"Enter":if(!(!((f=L.value)===null||f===void 0)&&f.isComposing)){if(K.value){const E=(R=U.value)===null||R===void 0?void 0:R.getPendingTmNode();E?he(E):e.filterable||(de(),De())}else if(fe(),e.tag&&be.value){const E=p.value[0];if(E){const re=E[e.valueField],{value:ge}=h;e.multiple&&Array.isArray(ge)&&ge.includes(re)||d(E)}}}n.preventDefault();break;case"ArrowUp":if(n.preventDefault(),e.loading)return;K.value&&(($=U.value)===null||$===void 0||$.prev());break;case"ArrowDown":if(n.preventDefault(),e.loading)return;K.value?(I=U.value)===null||I===void 0||I.next():fe();break;case"Escape":K.value&&(_t(n),de()),(_=L.value)===null||_===void 0||_.focus();break}}function De(){var n;(n=L.value)===null||n===void 0||n.focus()}function Ve(){var n;(n=L.value)===null||n===void 0||n.focusInput()}function en(){var n;K.value&&((n=T.value)===null||n===void 0||n.syncPosition())}ue(),Re(te(e,"options"),ue);const nn={focus:()=>{var n;(n=L.value)===null||n===void 0||n.focus()},focusInput:()=>{var n;(n=L.value)===null||n===void 0||n.focusInput()},blur:()=>{var n;(n=L.value)===null||n===void 0||n.blur()},blurInput:()=>{var n;(n=L.value)===null||n===void 0||n.blurInput()}},je=M(()=>{const{self:{menuBoxShadow:n}}=v.value;return{"--n-menu-box-shadow":n}}),we=a?Ne("select",void 0,je,e):void 0;return Object.assign(Object.assign({},nn),{mergedStatus:Y,mergedClsPrefix:t,mergedBordered:o,namespace:l,treeMate:z,isMounted:It(),triggerRef:L,menuRef:U,pattern:g,uncontrolledShow:Q,mergedShow:K,adjustedTo:fn(e),uncontrolledValue:r,mergedValue:h,followerRef:T,localizedPlaceholder:ie,selectedOption:D,selectedOptions:A,mergedSize:Z,mergedDisabled:V,focused:x,activeWithoutMenuOpen:be,inlineThemeDisabled:a,onTriggerInputFocus:Oe,onTriggerInputBlur:Ie,handleTriggerOrMenuResize:en,handleMenuFocus:Pe,handleMenuBlur:_e,handleMenuTabOut:Be,handleTriggerClick:Me,handleToggle:he,handleDeleteOption:d,handlePatternInput:oe,handleClear:Ze,handleTriggerBlur:Ce,handleTriggerFocus:ke,handleKeydown:Le,handleMenuAfterLeave:xe,handleMenuClickOutside:Se,handleMenuScroll:Qe,handleMenuKeydown:Le,handleMenuMousedown:Je,mergedTheme:v,cssVars:a?void 0:je,themeClass:we?.themeClass,onRender:we?.onRender})},render(){return i("div",{class:`${this.mergedClsPrefix}-select`},i(Nt,null,{default:()=>[i(Lt,null,{default:()=>i(io,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,t;return[(t=(e=this.$slots).arrow)===null||t===void 0?void 0:t.call(e)]}})}),i(Dt,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===fn.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>i(Tn,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,t,o;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),Ft(i(oo,Object.assign({},this.menuProps,{ref:"menuRef",onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(t=this.menuProps)===null||t===void 0?void 0:t.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(o=this.menuProps)===null||o===void 0?void 0:o.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{empty:()=>{var l,a;return[(a=(l=this.$slots).empty)===null||a===void 0?void 0:a.call(l)]},header:()=>{var l,a;return[(a=(l=this.$slots).header)===null||a===void 0?void 0:a.call(l)]},action:()=>{var l,a;return[(a=(l=this.$slots).action)===null||a===void 0?void 0:a.call(l)]}}),this.displayDirective==="show"?[[Ot,this.mergedShow],[pn,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[pn,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}});export{zo as N,qt as V,To as a,eo as b,oo as c,ro as d,So as e,an as m};
