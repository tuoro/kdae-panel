import{$t as e,C as t,Cn as n,G as r,J as i,Nn as a,On as o,P as s,Sn as c,Tn as l,U as u,Un as d,V as f,Wn as p,Y as m,_n as h,_r as g,_t as _,an as v,b as y,bt as b,ct as x,en as S,ft as C,kn as w,lr as T,lt as E,nn as D,on as O,pr as k,rn as A,sn as j,x as M,xn as N,z as P}from"./client-DecrR2G0.js";import{t as F}from"./misc-DDs3MKLt.js";import{t as I}from"./use-merged-state-Dvb8YPIJ.js";import{j as L}from"./index-CBIB5M6s.js";var R=()=>(()=>{let e=x(`75be776d8875fa17`);return e[0]||=c(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},[c(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})],-1)})(),z=()=>(()=>{let e=x(`c6eed899356c8404`);return e[0]||=c(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},[c(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})],-1)})(),B=e([S(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[A(`show-label`,`line-height: var(--n-label-line-height);`),e(`&:hover`,[S(`checkbox-box`,[D(`border`,`border: var(--n-border-checked);`)])]),e(`&:focus:not(:active)`,[S(`checkbox-box`,[D(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),A(`inside-table`,[S(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),A(`checked`,[S(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[S(`checkbox-icon`,[e(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),A(`indeterminate`,[S(`checkbox-box`,[S(`checkbox-icon`,[e(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),e(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),A(`checked, indeterminate`,[e(`&:focus:not(:active)`,[S(`checkbox-box`,[D(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),S(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[D(`border`,{border:`var(--n-border-checked)`})])]),A(`disabled`,{cursor:`not-allowed`},[A(`checked`,[S(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[D(`border`,{border:`var(--n-border-disabled-checked)`}),S(`checkbox-icon`,[e(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),S(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[D(`border`,`
 border: var(--n-border-disabled);
 `),S(`checkbox-icon`,[e(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),D(`label`,`
 color: var(--n-text-color-disabled);
 `)]),S(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),S(`checkbox-box`,`
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
 `,[D(`border`,`
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
 `),S(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[e(`.check-icon, .line-icon`,`
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
 `),y({left:`1px`,top:`1px`})])]),D(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[e(`&:empty`,{display:`none`})])]),O(S(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),j(S(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),V=[`id`],H=[`tabindex`,`aria-checked`,`aria-labelledby`,`onKeyup`,`onKeydown`,`onClick`],U={...i.props,size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]},W=w({name:`Checkbox`,props:U,setup(e){let n=a(G,null),r=T(null),{mergedClsPrefixRef:o,inlineThemeDisabled:c,mergedRtlRef:l,mergedComponentPropsRef:d}=_(e),p=T(e.defaultChecked),h=k(e,`checked`),g=I(h,p),y=u(()=>{if(n){let t=n.valueSetRef.value;return t&&e.value!==void 0?t.has(e.value):!1}return g.value===e.checkedValue}),b=t(e,{mergedSize(t){let{size:r}=e;if(r!==void 0)return r;if(n){let{value:e}=n.mergedSizeRef;if(e!==void 0)return e}if(t){let{mergedSize:e}=t;if(e!==void 0)return e.value}return d?.value?.Checkbox?.size||`medium`},mergedDisabled(t){let{disabled:r}=e;if(r!==void 0)return r;if(n){if(n.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:t}=n;if(e!==void 0&&t.value>=e&&!y.value)return!0;let{minRef:{value:r}}=n;if(r!==void 0&&t.value<=r&&y.value)return!0}return t?t.disabled.value:!1}}),{mergedDisabledRef:x,mergedSizeRef:S}=b,C=i(`Checkbox`,`-checkbox`,B,L,e,o);function w(t){if(n&&e.value!==void 0)n.toggleCheckbox(!y.value,e.value);else{let{onChange:n,"onUpdate:checked":r,onUpdateChecked:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=b,s=y.value?e.uncheckedValue:e.checkedValue;r&&f(r,s,t),i&&f(i,s,t),n&&f(n,s,t),a(),o(),p.value=s}}function E(e){x.value||w(e)}function D(e){if(!x.value)switch(e.key){case` `:case`Enter`:w(e)}}function O(e){e.key===` `&&e.preventDefault()}let A={focus:()=>{r.value?.focus()},blur:()=>{r.value?.blur()}},j=s(`Checkbox`,l,o),M=N(()=>{let{value:e}=S,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:f,borderDisabled:p,borderChecked:m,boxShadowFocus:h,textColor:g,textColorDisabled:_,checkMarkColorDisabledChecked:y,colorDisabledChecked:b,borderDisabledChecked:x,labelPadding:w,labelLineHeight:T,labelFontWeight:E,[v(`fontSize`,e)]:D,[v(`size`,e)]:O}}=C.value;return{"--n-label-line-height":T,"--n-label-font-weight":E,"--n-size":O,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":m,"--n-border-focus":f,"--n-border-disabled":p,"--n-border-disabled-checked":x,"--n-box-shadow-focus":h,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":b,"--n-text-color":g,"--n-text-color-disabled":_,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":y,"--n-font-size":D,"--n-label-padding":w}}),P=c?m(`checkbox`,N(()=>S.value[0]),M,e):void 0;return Object.assign(b,A,{rtlEnabled:j,selfRef:r,mergedClsPrefix:o,mergedDisabled:x,renderedChecked:y,mergedTheme:C,labelId:F(),handleClick:E,handleKeyUp:D,handleKeyDown:O,cssVars:c?void 0:M,themeClass:P?.themeClass,onRender:P?.onRender})},render(){let{$slots:e,renderedChecked:t,mergedDisabled:n,indeterminate:i,privateInsideTable:a,cssVars:s,labelId:u,label:f,mergedClsPrefix:p,focusable:m,handleKeyUp:h,handleKeyDown:_,handleClick:v}=this;this.onRender?.();let y=P(e.default,e=>f||e?(d(),l(`span`,{key:1,class:E(`${p}-checkbox__label`),id:u},[C(()=>f||e)],10,V)):null);return(()=>{let e=x(`70be6e74cd27cb50`);return d(),l(`div`,{ref:`selfRef`,class:E([`${p}-checkbox`,this.themeClass,this.rtlEnabled&&`${p}-checkbox--rtl`,t&&`${p}-checkbox--checked`,n&&`${p}-checkbox--disabled`,i&&`${p}-checkbox--indeterminate`,a&&`${p}-checkbox--inside-table`,y&&`${p}-checkbox--show-label`]),tabindex:n||!m?void 0:0,role:`checkbox`,"aria-checked":i?`mixed`:t,"aria-labelledby":u,style:g(s),onKeyup:h,onKeydown:_,onClick:v,onMousedown:e[0]||=()=>{r(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},[c(`div`,{class:E(`${p}-checkbox-box-wrapper`)},[e[1]||=C(`\xA0`,-1),c(`div`,{class:E(`${p}-checkbox-box`)},[o(M,null,{default:()=>this.indeterminate?(d(),l(`div`,{key:`indeterminate`,class:E(`${p}-checkbox-icon`)},[C(()=>z())],2)):(d(),l(`div`,{key:`check`,class:E(`${p}-checkbox-icon`)},[C(()=>R())],2))},1024),c(`div`,{class:E(`${p}-checkbox-box__border`)},null,2)],2)],2),C(()=>y)],46,H)})()}}),G=b(`n-checkbox-group`),K=w({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,options:Array,labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:n}=_(e),r=t(e),{mergedSizeRef:i,mergedDisabledRef:a}=r,o=T(e.defaultValue),s=N(()=>e.value),c=I(s,o),l=N(()=>c.value?.length||0),u=N(()=>Array.isArray(c.value)?new Set(c.value):new Set);function d(t,n){let{nTriggerFormInput:i,nTriggerFormChange:a}=r,{onChange:s,"onUpdate:value":l,onUpdateValue:u}=e;if(Array.isArray(c.value)){let e=Array.from(c.value),r=e.findIndex(e=>e===n);t?~r||(e.push(n),u&&f(u,e,{actionType:`check`,value:n}),l&&f(l,e,{actionType:`check`,value:n}),i(),a(),o.value=e,s&&f(s,e)):~r&&(e.splice(r,1),u&&f(u,e,{actionType:`uncheck`,value:n}),l&&f(l,e,{actionType:`uncheck`,value:n}),s&&f(s,e),o.value=e,i(),a())}else t?(u&&f(u,[n],{actionType:`check`,value:n}),l&&f(l,[n],{actionType:`check`,value:n}),s&&f(s,[n]),o.value=[n],i(),a()):(u&&f(u,[],{actionType:`uncheck`,value:n}),l&&f(l,[],{actionType:`uncheck`,value:n}),s&&f(s,[]),o.value=[],i(),a())}return p(G,{checkedCountRef:l,maxRef:k(e,`max`),minRef:k(e,`min`),valueSetRef:u,disabledRef:a,mergedSizeRef:i,toggleCheckbox:d}),{mergedClsPrefix:n}},render(){let{options:e,labelField:t,valueField:r}=this.$props;return d(),l(`div`,{class:E(`${this.mergedClsPrefix}-checkbox-group`),role:`group`},[e?(d(),l(h,{key:0},[C(()=>e.map(e=>{let i=e[r];return d(),n(W,{key:i,value:i,disabled:e.disabled,label:e[t]},null,8,[`value`,`disabled`,`label`])}))],64)):(d(),l(h,{key:1},[C(()=>this.$slots.default?.())],64))],2)}});export{W as n,K as t};