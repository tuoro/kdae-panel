import{B as e,F as t,Gt as n,Ht as r,Jt as i,L as a,Mn as o,N as s,O as c,Q as l,S as u,V as d,Vt as f,Wt as p,Yt as m,Z as h,Zn as g,_n as _,an as v,ar as y,dn as b,gn as x,jn as S,ln as C,lt as w,ot as T,pn as E,qt as D,tr as O,tt as k,un as A,w as j,x as M,xn as N}from"./client-aJ7VylDj.js";import{c as P}from"./Scrollbar-BwDSgsaA.js";import{t as F}from"./misc-DDs3MKLt.js";import{t as I}from"./use-merged-state-C2wcLaf9.js";import{t as L}from"./light-LOV6ZxPg.js";var R=()=>(()=>{let e=h(`75be776d8875fa17`);return e[0]||=A(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},[A(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})],-1)})(),z=()=>(()=>{let e=h(`c6eed899356c8404`);return e[0]||=A(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},[A(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})],-1)})(),B=f([r(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[n(`show-label`,`line-height: var(--n-label-line-height);`),f(`&:hover`,[r(`checkbox-box`,[p(`border`,`border: var(--n-border-checked);`)])]),f(`&:focus:not(:active)`,[r(`checkbox-box`,[p(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),n(`inside-table`,[r(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),n(`checked`,[r(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[r(`checkbox-icon`,[f(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),n(`indeterminate`,[r(`checkbox-box`,[r(`checkbox-icon`,[f(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),f(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),n(`checked, indeterminate`,[f(`&:focus:not(:active)`,[r(`checkbox-box`,[p(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),r(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[p(`border`,{border:`var(--n-border-checked)`})])]),n(`disabled`,{cursor:`not-allowed`},[n(`checked`,[r(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[p(`border`,{border:`var(--n-border-disabled-checked)`}),r(`checkbox-icon`,[f(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),r(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[p(`border`,`
 border: var(--n-border-disabled);
 `),r(`checkbox-icon`,[f(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),p(`label`,`
 color: var(--n-text-color-disabled);
 `)]),r(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),r(`checkbox-box`,`
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
 `,[p(`border`,`
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
 `),r(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[f(`.check-icon, .line-icon`,`
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
 `),M({left:`1px`,top:`1px`})])]),p(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[f(`&:empty`,{display:`none`})])]),i(r(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),m(r(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),V=[`id`],H=[`tabindex`,`aria-checked`,`aria-labelledby`,`onKeyup`,`onKeydown`,`onClick`],U={...e.props,size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]},W=_({name:`Checkbox`,props:U,setup(n){let r=N(G,null),i=g(null),{mergedClsPrefixRef:o,inlineThemeDisabled:s,mergedRtlRef:l,mergedComponentPropsRef:u}=T(n),f=g(n.defaultChecked),p=O(n,`checked`),m=I(p,f),h=a(()=>{if(r){let e=r.valueSetRef.value;return e&&n.value!==void 0?e.has(n.value):!1}return m.value===n.checkedValue}),_=j(n,{mergedSize(e){let{size:t}=n;if(t!==void 0)return t;if(r){let{value:e}=r.mergedSizeRef;if(e!==void 0)return e}if(e){let{mergedSize:t}=e;if(t!==void 0)return t.value}return u?.value?.Checkbox?.size||`medium`},mergedDisabled(e){let{disabled:t}=n;if(t!==void 0)return t;if(r){if(r.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:t}=r;if(e!==void 0&&t.value>=e&&!h.value)return!0;let{minRef:{value:n}}=r;if(n!==void 0&&t.value<=n&&h.value)return!0}return e?e.disabled.value:!1}}),{mergedDisabledRef:v,mergedSizeRef:y}=_,b=e(`Checkbox`,`-checkbox`,B,L,n,o);function x(e){if(r&&n.value!==void 0)r.toggleCheckbox(!h.value,n.value);else{let{onChange:r,"onUpdate:checked":i,onUpdateChecked:a}=n,{nTriggerFormInput:o,nTriggerFormChange:s}=_,c=h.value?n.uncheckedValue:n.checkedValue;i&&t(i,c,e),a&&t(a,c,e),r&&t(r,c,e),o(),s(),f.value=c}}function S(e){v.value||x(e)}function w(e){if(!v.value)switch(e.key){case` `:case`Enter`:x(e)}}function E(e){e.key===` `&&e.preventDefault()}let k={focus:()=>{i.value?.focus()},blur:()=>{i.value?.blur()}},A=c(`Checkbox`,l,o),M=C(()=>{let{value:e}=y,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:f,borderDisabled:p,borderChecked:m,boxShadowFocus:h,textColor:g,textColorDisabled:_,checkMarkColorDisabledChecked:v,colorDisabledChecked:x,borderDisabledChecked:S,labelPadding:C,labelLineHeight:w,labelFontWeight:T,[D(`fontSize`,e)]:E,[D(`size`,e)]:O}}=b.value;return{"--n-label-line-height":w,"--n-label-font-weight":T,"--n-size":O,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":m,"--n-border-focus":f,"--n-border-disabled":p,"--n-border-disabled-checked":S,"--n-box-shadow-focus":h,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":x,"--n-text-color":g,"--n-text-color-disabled":_,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":v,"--n-font-size":E,"--n-label-padding":C}}),P=s?d(`checkbox`,C(()=>y.value[0]),M,n):void 0;return Object.assign(_,k,{rtlEnabled:A,selfRef:i,mergedClsPrefix:o,mergedDisabled:v,renderedChecked:h,mergedTheme:b,labelId:F(),handleClick:S,handleKeyUp:w,handleKeyDown:E,cssVars:s?void 0:M,themeClass:P?.themeClass,onRender:P?.onRender})},render(){let{$slots:e,renderedChecked:t,mergedDisabled:n,indeterminate:r,privateInsideTable:i,cssVars:a,labelId:o,label:c,mergedClsPrefix:d,focusable:f,handleKeyUp:p,handleKeyDown:m,handleClick:g}=this;this.onRender?.();let _=s(e.default,e=>c||e?(S(),E(`span`,{key:1,class:l(`${d}-checkbox__label`),id:o},[k(()=>c||e)],10,V)):null);return(()=>{let e=h(`70be6e74cd27cb50`);return S(),E(`div`,{ref:`selfRef`,class:l([`${d}-checkbox`,this.themeClass,this.rtlEnabled&&`${d}-checkbox--rtl`,t&&`${d}-checkbox--checked`,n&&`${d}-checkbox--disabled`,r&&`${d}-checkbox--indeterminate`,i&&`${d}-checkbox--inside-table`,_&&`${d}-checkbox--show-label`]),tabindex:n||!f?void 0:0,role:`checkbox`,"aria-checked":r?`mixed`:t,"aria-labelledby":o,style:y(a),onKeyup:p,onKeydown:m,onClick:g,onMousedown:e[0]||=()=>{P(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},[A(`div`,{class:l(`${d}-checkbox-box-wrapper`)},[e[1]||=k(`\xA0`,-1),A(`div`,{class:l(`${d}-checkbox-box`)},[x(u,null,{default:()=>this.indeterminate?(S(),E(`div`,{key:`indeterminate`,class:l(`${d}-checkbox-icon`)},[k(()=>z())],2)):(S(),E(`div`,{key:`check`,class:l(`${d}-checkbox-icon`)},[k(()=>R())],2))},1024),A(`div`,{class:l(`${d}-checkbox-box__border`)},null,2)],2)],2),k(()=>_)],46,H)})()}}),G=w(`n-checkbox-group`),K=_({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,options:Array,labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:n}=T(e),r=j(e),{mergedSizeRef:i,mergedDisabledRef:a}=r,s=g(e.defaultValue),c=C(()=>e.value),l=I(c,s),u=C(()=>l.value?.length||0),d=C(()=>Array.isArray(l.value)?new Set(l.value):new Set);function f(n,i){let{nTriggerFormInput:a,nTriggerFormChange:o}=r,{onChange:c,"onUpdate:value":u,onUpdateValue:d}=e;if(Array.isArray(l.value)){let e=Array.from(l.value),r=e.findIndex(e=>e===i);n?~r||(e.push(i),d&&t(d,e,{actionType:`check`,value:i}),u&&t(u,e,{actionType:`check`,value:i}),a(),o(),s.value=e,c&&t(c,e)):~r&&(e.splice(r,1),d&&t(d,e,{actionType:`uncheck`,value:i}),u&&t(u,e,{actionType:`uncheck`,value:i}),c&&t(c,e),s.value=e,a(),o())}else n?(d&&t(d,[i],{actionType:`check`,value:i}),u&&t(u,[i],{actionType:`check`,value:i}),c&&t(c,[i]),s.value=[i],a(),o()):(d&&t(d,[],{actionType:`uncheck`,value:i}),u&&t(u,[],{actionType:`uncheck`,value:i}),c&&t(c,[]),s.value=[],a(),o())}return o(G,{checkedCountRef:u,maxRef:O(e,`max`),minRef:O(e,`min`),valueSetRef:d,disabledRef:a,mergedSizeRef:i,toggleCheckbox:f}),{mergedClsPrefix:n}},render(){let{options:e,labelField:t,valueField:n}=this.$props;return S(),E(`div`,{class:l(`${this.mergedClsPrefix}-checkbox-group`),role:`group`},[e?(S(),E(v,{key:0},[k(()=>e.map(e=>{let r=e[n];return S(),b(W,{key:r,value:r,disabled:e.disabled,label:e[t]},null,8,[`value`,`disabled`,`label`])}))],64)):(S(),E(v,{key:1},[k(()=>this.$slots.default?.())],64))],2)}});export{W as n,K as t};