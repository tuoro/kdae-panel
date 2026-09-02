import{An as e,B as t,Cn as n,En as r,F as i,Gn as a,H as o,K as s,Pn as c,S as l,Sn as u,W as d,Wn as f,X as p,Y as m,cn as h,en as g,in as _,kn as v,lt as y,mr as b,on as x,pt as S,rn as C,sn as w,tn as T,ur as E,ut as D,vn as O,vr as k,vt as A,w as j,wn as M,x as N,xt as P}from"./client-BDSaduAi.js";import{t as F}from"./misc-DDs3MKLt.js";import{t as I}from"./use-merged-state-BShkc5xA.js";import{j as L}from"./index-LlkbWj36.js";var R=()=>(()=>{let e=y(`75be776d8875fa17`);return e[0]||=n(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},[n(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})],-1)})(),z=()=>(()=>{let e=y(`c6eed899356c8404`);return e[0]||=n(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},[n(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})],-1)})(),B=g([T(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[_(`show-label`,`line-height: var(--n-label-line-height);`),g(`&:hover`,[T(`checkbox-box`,[C(`border`,`border: var(--n-border-checked);`)])]),g(`&:focus:not(:active)`,[T(`checkbox-box`,[C(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),_(`inside-table`,[T(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),_(`checked`,[T(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[T(`checkbox-icon`,[g(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),_(`indeterminate`,[T(`checkbox-box`,[T(`checkbox-icon`,[g(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),g(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),_(`checked, indeterminate`,[g(`&:focus:not(:active)`,[T(`checkbox-box`,[C(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),T(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[C(`border`,{border:`var(--n-border-checked)`})])]),_(`disabled`,{cursor:`not-allowed`},[_(`checked`,[T(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[C(`border`,{border:`var(--n-border-disabled-checked)`}),T(`checkbox-icon`,[g(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),T(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[C(`border`,`
 border: var(--n-border-disabled);
 `),T(`checkbox-icon`,[g(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),C(`label`,`
 color: var(--n-text-color-disabled);
 `)]),T(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),T(`checkbox-box`,`
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
 `,[C(`border`,`
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
 `),T(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[g(`.check-icon, .line-icon`,`
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
 `),N({left:`1px`,top:`1px`})])]),C(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[g(`&:empty`,{display:`none`})])]),w(T(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),h(T(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),V=[`id`],H=[`tabindex`,`aria-checked`,`aria-labelledby`,`onKeyup`,`onKeydown`,`onClick`],U={...m.props,size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]},W=e({name:`Checkbox`,props:U,setup(e){let t=c(G,null),n=E(null),{mergedClsPrefixRef:r,inlineThemeDisabled:a,mergedRtlRef:s,mergedComponentPropsRef:l}=A(e),f=E(e.defaultChecked),h=b(e,`checked`),g=I(h,f),_=d(()=>{if(t){let n=t.valueSetRef.value;return n&&e.value!==void 0?n.has(e.value):!1}return g.value===e.checkedValue}),v=j(e,{mergedSize(n){let{size:r}=e;if(r!==void 0)return r;if(t){let{value:e}=t.mergedSizeRef;if(e!==void 0)return e}if(n){let{mergedSize:e}=n;if(e!==void 0)return e.value}return l?.value?.Checkbox?.size||`medium`},mergedDisabled(n){let{disabled:r}=e;if(r!==void 0)return r;if(t){if(t.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:n}=t;if(e!==void 0&&n.value>=e&&!_.value)return!0;let{minRef:{value:r}}=t;if(r!==void 0&&n.value<=r&&_.value)return!0}return n?n.disabled.value:!1}}),{mergedDisabledRef:y,mergedSizeRef:S}=v,C=m(`Checkbox`,`-checkbox`,B,L,e,r);function w(n){if(t&&e.value!==void 0)t.toggleCheckbox(!_.value,e.value);else{let{onChange:t,"onUpdate:checked":r,onUpdateChecked:i}=e,{nTriggerFormInput:a,nTriggerFormChange:s}=v,c=_.value?e.uncheckedValue:e.checkedValue;r&&o(r,c,n),i&&o(i,c,n),t&&o(t,c,n),a(),s(),f.value=c}}function T(e){y.value||w(e)}function D(e){if(!y.value)switch(e.key){case` `:case`Enter`:w(e)}}function O(e){e.key===` `&&e.preventDefault()}let k={focus:()=>{n.value?.focus()},blur:()=>{n.value?.blur()}},M=i(`Checkbox`,s,r),N=u(()=>{let{value:e}=S,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:f,borderDisabled:p,borderChecked:m,boxShadowFocus:h,textColor:g,textColorDisabled:_,checkMarkColorDisabledChecked:v,colorDisabledChecked:y,borderDisabledChecked:b,labelPadding:w,labelLineHeight:T,labelFontWeight:E,[x(`fontSize`,e)]:D,[x(`size`,e)]:O}}=C.value;return{"--n-label-line-height":T,"--n-label-font-weight":E,"--n-size":O,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":m,"--n-border-focus":f,"--n-border-disabled":p,"--n-border-disabled-checked":b,"--n-box-shadow-focus":h,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":y,"--n-text-color":g,"--n-text-color-disabled":_,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":v,"--n-font-size":D,"--n-label-padding":w}}),P=a?p(`checkbox`,u(()=>S.value[0]),N,e):void 0;return Object.assign(v,k,{rtlEnabled:M,selfRef:n,mergedClsPrefix:r,mergedDisabled:y,renderedChecked:_,mergedTheme:C,labelId:F(),handleClick:T,handleKeyUp:D,handleKeyDown:O,cssVars:a?void 0:N,themeClass:P?.themeClass,onRender:P?.onRender})},render(){let{$slots:e,renderedChecked:i,mergedDisabled:a,indeterminate:o,privateInsideTable:c,cssVars:u,labelId:d,label:p,mergedClsPrefix:m,focusable:h,handleKeyUp:g,handleKeyDown:_,handleClick:b}=this;this.onRender?.();let x=t(e.default,e=>p||e?(f(),r(`span`,{key:1,class:D(`${m}-checkbox__label`),id:d},[S(()=>p||e)],10,V)):null);return(()=>{let e=y(`70be6e74cd27cb50`);return f(),r(`div`,{ref:`selfRef`,class:D([`${m}-checkbox`,this.themeClass,this.rtlEnabled&&`${m}-checkbox--rtl`,i&&`${m}-checkbox--checked`,a&&`${m}-checkbox--disabled`,o&&`${m}-checkbox--indeterminate`,c&&`${m}-checkbox--inside-table`,x&&`${m}-checkbox--show-label`]),tabindex:a||!h?void 0:0,role:`checkbox`,"aria-checked":o?`mixed`:i,"aria-labelledby":d,style:k(u),onKeyup:g,onKeydown:_,onClick:b,onMousedown:e[0]||=()=>{s(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},[n(`div`,{class:D(`${m}-checkbox-box-wrapper`)},[e[1]||=S(`\xA0`,-1),n(`div`,{class:D(`${m}-checkbox-box`)},[v(l,null,{default:()=>this.indeterminate?(f(),r(`div`,{key:`indeterminate`,class:D(`${m}-checkbox-icon`)},[S(()=>z())],2)):(f(),r(`div`,{key:`check`,class:D(`${m}-checkbox-icon`)},[S(()=>R())],2))},1024),n(`div`,{class:D(`${m}-checkbox-box__border`)},null,2)],2)],2),S(()=>x)],46,H)})()}}),G=P(`n-checkbox-group`),K=e({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,options:Array,labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:t}=A(e),n=j(e),{mergedSizeRef:r,mergedDisabledRef:i}=n,s=E(e.defaultValue),c=u(()=>e.value),l=I(c,s),d=u(()=>l.value?.length||0),f=u(()=>Array.isArray(l.value)?new Set(l.value):new Set);function p(t,r){let{nTriggerFormInput:i,nTriggerFormChange:a}=n,{onChange:c,"onUpdate:value":u,onUpdateValue:d}=e;if(Array.isArray(l.value)){let e=Array.from(l.value),n=e.findIndex(e=>e===r);t?~n||(e.push(r),d&&o(d,e,{actionType:`check`,value:r}),u&&o(u,e,{actionType:`check`,value:r}),i(),a(),s.value=e,c&&o(c,e)):~n&&(e.splice(n,1),d&&o(d,e,{actionType:`uncheck`,value:r}),u&&o(u,e,{actionType:`uncheck`,value:r}),c&&o(c,e),s.value=e,i(),a())}else t?(d&&o(d,[r],{actionType:`check`,value:r}),u&&o(u,[r],{actionType:`check`,value:r}),c&&o(c,[r]),s.value=[r],i(),a()):(d&&o(d,[],{actionType:`uncheck`,value:r}),u&&o(u,[],{actionType:`uncheck`,value:r}),c&&o(c,[]),s.value=[],i(),a())}return a(G,{checkedCountRef:d,maxRef:b(e,`max`),minRef:b(e,`min`),valueSetRef:f,disabledRef:i,mergedSizeRef:r,toggleCheckbox:p}),{mergedClsPrefix:t}},render(){let{options:e,labelField:t,valueField:n}=this.$props;return f(),r(`div`,{class:D(`${this.mergedClsPrefix}-checkbox-group`),role:`group`},[e?(f(),r(O,{key:0},[S(()=>e.map(e=>{let r=e[n];return f(),M(W,{key:r,value:r,disabled:e.disabled,label:e[t]},null,8,[`value`,`disabled`,`label`])}))],64)):(f(),r(O,{key:1},[S(()=>this.$slots.default?.())],64))],2)}});export{W as n,K as t};