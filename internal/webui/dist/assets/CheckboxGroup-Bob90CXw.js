import{$ as e,Gt as t,H as n,Ht as r,I as i,Jt as a,Kt as o,Mn as s,Nn as c,P as l,Q as u,Qn as d,R as f,S as p,Sn as m,Ut as h,V as g,Xt as _,Yt as v,_n as y,dn as b,fn as x,k as S,mn as C,nr as w,nt as T,on as E,or as D,st as O,un as k,ut as A,vn as j,w as M,x as N}from"./client-DkW07njR.js";import{c as P}from"./Scrollbar-BZdl1G8a.js";import{t as F}from"./misc-DDs3MKLt.js";import{t as I}from"./use-merged-state-BhDn2UYN.js";import{t as L}from"./light-DBu5k9eV.js";var R=()=>(()=>{let e=u(`75be776d8875fa17`);return e[0]||=b(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},[b(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})],-1)})(),z=()=>(()=>{let e=u(`c6eed899356c8404`);return e[0]||=b(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},[b(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})],-1)})(),B=r([h(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[o(`show-label`,`line-height: var(--n-label-line-height);`),r(`&:hover`,[h(`checkbox-box`,[t(`border`,`border: var(--n-border-checked);`)])]),r(`&:focus:not(:active)`,[h(`checkbox-box`,[t(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),o(`inside-table`,[h(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),o(`checked`,[h(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[h(`checkbox-icon`,[r(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),o(`indeterminate`,[h(`checkbox-box`,[h(`checkbox-icon`,[r(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),r(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),o(`checked, indeterminate`,[r(`&:focus:not(:active)`,[h(`checkbox-box`,[t(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),h(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[t(`border`,{border:`var(--n-border-checked)`})])]),o(`disabled`,{cursor:`not-allowed`},[o(`checked`,[h(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[t(`border`,{border:`var(--n-border-disabled-checked)`}),h(`checkbox-icon`,[r(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),h(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[t(`border`,`
 border: var(--n-border-disabled);
 `),h(`checkbox-icon`,[r(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),t(`label`,`
 color: var(--n-text-color-disabled);
 `)]),h(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),h(`checkbox-box`,`
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
 `,[t(`border`,`
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
 `),h(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[r(`.check-icon, .line-icon`,`
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
 `),N({left:`1px`,top:`1px`})])]),t(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[r(`&:empty`,{display:`none`})])]),v(h(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),_(h(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),V=[`id`],H=[`tabindex`,`aria-checked`,`aria-labelledby`,`onKeyup`,`onKeydown`,`onClick`],U={...g.props,size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]},W=j({name:`Checkbox`,props:U,setup(e){let t=m(G,null),r=d(null),{mergedClsPrefixRef:o,inlineThemeDisabled:s,mergedRtlRef:c,mergedComponentPropsRef:l}=O(e),u=d(e.defaultChecked),p=w(e,`checked`),h=I(p,u),_=f(()=>{if(t){let n=t.valueSetRef.value;return n&&e.value!==void 0?n.has(e.value):!1}return h.value===e.checkedValue}),v=M(e,{mergedSize(n){let{size:r}=e;if(r!==void 0)return r;if(t){let{value:e}=t.mergedSizeRef;if(e!==void 0)return e}if(n){let{mergedSize:e}=n;if(e!==void 0)return e.value}return l?.value?.Checkbox?.size||`medium`},mergedDisabled(n){let{disabled:r}=e;if(r!==void 0)return r;if(t){if(t.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:n}=t;if(e!==void 0&&n.value>=e&&!_.value)return!0;let{minRef:{value:r}}=t;if(r!==void 0&&n.value<=r&&_.value)return!0}return n?n.disabled.value:!1}}),{mergedDisabledRef:y,mergedSizeRef:b}=v,x=g(`Checkbox`,`-checkbox`,B,L,e,o);function C(n){if(t&&e.value!==void 0)t.toggleCheckbox(!_.value,e.value);else{let{onChange:t,"onUpdate:checked":r,onUpdateChecked:a}=e,{nTriggerFormInput:o,nTriggerFormChange:s}=v,c=_.value?e.uncheckedValue:e.checkedValue;r&&i(r,c,n),a&&i(a,c,n),t&&i(t,c,n),o(),s(),u.value=c}}function T(e){y.value||C(e)}function E(e){if(!y.value)switch(e.key){case` `:case`Enter`:C(e)}}function D(e){e.key===` `&&e.preventDefault()}let A={focus:()=>{r.value?.focus()},blur:()=>{r.value?.blur()}},j=S(`Checkbox`,c,o),N=k(()=>{let{value:e}=b,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:o,colorTableHeader:s,colorTableHeaderModal:c,colorTableHeaderPopover:l,checkMarkColor:u,checkMarkColorDisabled:d,border:f,borderFocus:p,borderDisabled:m,borderChecked:h,boxShadowFocus:g,textColor:_,textColorDisabled:v,checkMarkColorDisabledChecked:y,colorDisabledChecked:S,borderDisabledChecked:C,labelPadding:w,labelLineHeight:T,labelFontWeight:E,[a(`fontSize`,e)]:D,[a(`size`,e)]:O}}=x.value;return{"--n-label-line-height":T,"--n-label-font-weight":E,"--n-size":O,"--n-bezier":t,"--n-border-radius":n,"--n-border":f,"--n-border-checked":h,"--n-border-focus":p,"--n-border-disabled":m,"--n-border-disabled-checked":C,"--n-box-shadow-focus":g,"--n-color":r,"--n-color-checked":i,"--n-color-table":s,"--n-color-table-modal":c,"--n-color-table-popover":l,"--n-color-disabled":o,"--n-color-disabled-checked":S,"--n-text-color":_,"--n-text-color-disabled":v,"--n-check-mark-color":u,"--n-check-mark-color-disabled":d,"--n-check-mark-color-disabled-checked":y,"--n-font-size":D,"--n-label-padding":w}}),P=s?n(`checkbox`,k(()=>b.value[0]),N,e):void 0;return Object.assign(v,A,{rtlEnabled:j,selfRef:r,mergedClsPrefix:o,mergedDisabled:y,renderedChecked:_,mergedTheme:x,labelId:F(),handleClick:T,handleKeyUp:E,handleKeyDown:D,cssVars:s?void 0:N,themeClass:P?.themeClass,onRender:P?.onRender})},render(){let{$slots:t,renderedChecked:n,mergedDisabled:r,indeterminate:i,privateInsideTable:a,cssVars:o,labelId:c,label:d,mergedClsPrefix:f,focusable:m,handleKeyUp:h,handleKeyDown:g,handleClick:_}=this;this.onRender?.();let v=l(t.default,t=>d||t?(s(),C(`span`,{key:1,class:e(`${f}-checkbox__label`),id:c},[T(()=>d||t)],10,V)):null);return(()=>{let t=u(`70be6e74cd27cb50`);return s(),C(`div`,{ref:`selfRef`,class:e([`${f}-checkbox`,this.themeClass,this.rtlEnabled&&`${f}-checkbox--rtl`,n&&`${f}-checkbox--checked`,r&&`${f}-checkbox--disabled`,i&&`${f}-checkbox--indeterminate`,a&&`${f}-checkbox--inside-table`,v&&`${f}-checkbox--show-label`]),tabindex:r||!m?void 0:0,role:`checkbox`,"aria-checked":i?`mixed`:n,"aria-labelledby":c,style:D(o),onKeyup:h,onKeydown:g,onClick:_,onMousedown:t[0]||=()=>{P(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},[b(`div`,{class:e(`${f}-checkbox-box-wrapper`)},[t[1]||=T(`\xA0`,-1),b(`div`,{class:e(`${f}-checkbox-box`)},[y(p,null,{default:()=>this.indeterminate?(s(),C(`div`,{key:`indeterminate`,class:e(`${f}-checkbox-icon`)},[T(()=>z())],2)):(s(),C(`div`,{key:`check`,class:e(`${f}-checkbox-icon`)},[T(()=>R())],2))},1024),b(`div`,{class:e(`${f}-checkbox-box__border`)},null,2)],2)],2),T(()=>v)],46,H)})()}}),G=A(`n-checkbox-group`),K=j({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,options:Array,labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:t}=O(e),n=M(e),{mergedSizeRef:r,mergedDisabledRef:a}=n,o=d(e.defaultValue),s=k(()=>e.value),l=I(s,o),u=k(()=>l.value?.length||0),f=k(()=>Array.isArray(l.value)?new Set(l.value):new Set);function p(t,r){let{nTriggerFormInput:a,nTriggerFormChange:s}=n,{onChange:c,"onUpdate:value":u,onUpdateValue:d}=e;if(Array.isArray(l.value)){let e=Array.from(l.value),n=e.findIndex(e=>e===r);t?~n||(e.push(r),d&&i(d,e,{actionType:`check`,value:r}),u&&i(u,e,{actionType:`check`,value:r}),a(),s(),o.value=e,c&&i(c,e)):~n&&(e.splice(n,1),d&&i(d,e,{actionType:`uncheck`,value:r}),u&&i(u,e,{actionType:`uncheck`,value:r}),c&&i(c,e),o.value=e,a(),s())}else t?(d&&i(d,[r],{actionType:`check`,value:r}),u&&i(u,[r],{actionType:`check`,value:r}),c&&i(c,[r]),o.value=[r],a(),s()):(d&&i(d,[],{actionType:`uncheck`,value:r}),u&&i(u,[],{actionType:`uncheck`,value:r}),c&&i(c,[]),o.value=[],a(),s())}return c(G,{checkedCountRef:u,maxRef:w(e,`max`),minRef:w(e,`min`),valueSetRef:f,disabledRef:a,mergedSizeRef:r,toggleCheckbox:p}),{mergedClsPrefix:t}},render(){let{options:t,labelField:n,valueField:r}=this.$props;return s(),C(`div`,{class:e(`${this.mergedClsPrefix}-checkbox-group`),role:`group`},[t?(s(),C(E,{key:0},[T(()=>t.map(e=>{let t=e[r];return s(),x(W,{key:t,value:t,disabled:e.disabled,label:e[n]},null,8,[`value`,`disabled`,`label`])}))],64)):(s(),C(E,{key:1},[T(()=>this.$slots.default?.())],64))],2)}});export{W as n,K as t};