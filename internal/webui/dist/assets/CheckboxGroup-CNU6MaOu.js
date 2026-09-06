import{$t as e,B as t,Cn as n,F as r,H as i,K as a,Nn as o,On as s,S as c,Sn as l,Tn as u,Un as d,W as f,Wn as p,X as m,Y as h,_n as g,_r as _,an as v,en as y,kn as b,lr as x,lt as S,nn as C,on as w,pr as T,pt as E,rn as D,sn as O,ut as k,vt as A,w as j,x as M,xn as N,xt as P}from"./client-3GjT0YO-.js";import{t as F}from"./misc-DDs3MKLt.js";import{t as I}from"./use-merged-state-DuBoFKO_.js";import{j as L}from"./index-fTZ5v0dX.js";var R=()=>(()=>{let e=S(`75be776d8875fa17`);return e[0]||=l(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},[l(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})],-1)})(),z=()=>(()=>{let e=S(`c6eed899356c8404`);return e[0]||=l(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},[l(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})],-1)})(),B=e([y(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[D(`show-label`,`line-height: var(--n-label-line-height);`),e(`&:hover`,[y(`checkbox-box`,[C(`border`,`border: var(--n-border-checked);`)])]),e(`&:focus:not(:active)`,[y(`checkbox-box`,[C(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),D(`inside-table`,[y(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),D(`checked`,[y(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[y(`checkbox-icon`,[e(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),D(`indeterminate`,[y(`checkbox-box`,[y(`checkbox-icon`,[e(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),e(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),D(`checked, indeterminate`,[e(`&:focus:not(:active)`,[y(`checkbox-box`,[C(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),y(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[C(`border`,{border:`var(--n-border-checked)`})])]),D(`disabled`,{cursor:`not-allowed`},[D(`checked`,[y(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[C(`border`,{border:`var(--n-border-disabled-checked)`}),y(`checkbox-icon`,[e(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),y(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[C(`border`,`
 border: var(--n-border-disabled);
 `),y(`checkbox-icon`,[e(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),C(`label`,`
 color: var(--n-text-color-disabled);
 `)]),y(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),y(`checkbox-box`,`
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
 `),y(`checkbox-icon`,`
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
 `),M({left:`1px`,top:`1px`})])]),C(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[e(`&:empty`,{display:`none`})])]),w(y(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),O(y(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),V=[`id`],H=[`tabindex`,`aria-checked`,`aria-labelledby`,`onKeyup`,`onKeydown`,`onClick`],U={...h.props,size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]},W=b({name:`Checkbox`,props:U,setup(e){let t=o(G,null),n=x(null),{mergedClsPrefixRef:a,inlineThemeDisabled:s,mergedRtlRef:c,mergedComponentPropsRef:l}=A(e),u=x(e.defaultChecked),d=T(e,`checked`),p=I(d,u),g=f(()=>{if(t){let n=t.valueSetRef.value;return n&&e.value!==void 0?n.has(e.value):!1}return p.value===e.checkedValue}),_=j(e,{mergedSize(n){let{size:r}=e;if(r!==void 0)return r;if(t){let{value:e}=t.mergedSizeRef;if(e!==void 0)return e}if(n){let{mergedSize:e}=n;if(e!==void 0)return e.value}return l?.value?.Checkbox?.size||`medium`},mergedDisabled(n){let{disabled:r}=e;if(r!==void 0)return r;if(t){if(t.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:n}=t;if(e!==void 0&&n.value>=e&&!g.value)return!0;let{minRef:{value:r}}=t;if(r!==void 0&&n.value<=r&&g.value)return!0}return n?n.disabled.value:!1}}),{mergedDisabledRef:y,mergedSizeRef:b}=_,S=h(`Checkbox`,`-checkbox`,B,L,e,a);function C(n){if(t&&e.value!==void 0)t.toggleCheckbox(!g.value,e.value);else{let{onChange:t,"onUpdate:checked":r,onUpdateChecked:a}=e,{nTriggerFormInput:o,nTriggerFormChange:s}=_,c=g.value?e.uncheckedValue:e.checkedValue;r&&i(r,c,n),a&&i(a,c,n),t&&i(t,c,n),o(),s(),u.value=c}}function w(e){y.value||C(e)}function E(e){if(!y.value)switch(e.key){case` `:case`Enter`:C(e)}}function D(e){e.key===` `&&e.preventDefault()}let O={focus:()=>{n.value?.focus()},blur:()=>{n.value?.blur()}},k=r(`Checkbox`,c,a),M=N(()=>{let{value:e}=b,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:f,borderDisabled:p,borderChecked:m,boxShadowFocus:h,textColor:g,textColorDisabled:_,checkMarkColorDisabledChecked:y,colorDisabledChecked:x,borderDisabledChecked:C,labelPadding:w,labelLineHeight:T,labelFontWeight:E,[v(`fontSize`,e)]:D,[v(`size`,e)]:O}}=S.value;return{"--n-label-line-height":T,"--n-label-font-weight":E,"--n-size":O,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":m,"--n-border-focus":f,"--n-border-disabled":p,"--n-border-disabled-checked":C,"--n-box-shadow-focus":h,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":x,"--n-text-color":g,"--n-text-color-disabled":_,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":y,"--n-font-size":D,"--n-label-padding":w}}),P=s?m(`checkbox`,N(()=>b.value[0]),M,e):void 0;return Object.assign(_,O,{rtlEnabled:k,selfRef:n,mergedClsPrefix:a,mergedDisabled:y,renderedChecked:g,mergedTheme:S,labelId:F(),handleClick:w,handleKeyUp:E,handleKeyDown:D,cssVars:s?void 0:M,themeClass:P?.themeClass,onRender:P?.onRender})},render(){let{$slots:e,renderedChecked:n,mergedDisabled:r,indeterminate:i,privateInsideTable:o,cssVars:f,labelId:p,label:m,mergedClsPrefix:h,focusable:g,handleKeyUp:v,handleKeyDown:y,handleClick:b}=this;this.onRender?.();let x=t(e.default,e=>m||e?(d(),u(`span`,{key:1,class:k(`${h}-checkbox__label`),id:p},[E(()=>m||e)],10,V)):null);return(()=>{let e=S(`70be6e74cd27cb50`);return d(),u(`div`,{ref:`selfRef`,class:k([`${h}-checkbox`,this.themeClass,this.rtlEnabled&&`${h}-checkbox--rtl`,n&&`${h}-checkbox--checked`,r&&`${h}-checkbox--disabled`,i&&`${h}-checkbox--indeterminate`,o&&`${h}-checkbox--inside-table`,x&&`${h}-checkbox--show-label`]),tabindex:r||!g?void 0:0,role:`checkbox`,"aria-checked":i?`mixed`:n,"aria-labelledby":p,style:_(f),onKeyup:v,onKeydown:y,onClick:b,onMousedown:e[0]||=()=>{a(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},[l(`div`,{class:k(`${h}-checkbox-box-wrapper`)},[e[1]||=E(`\xA0`,-1),l(`div`,{class:k(`${h}-checkbox-box`)},[s(c,null,{default:()=>this.indeterminate?(d(),u(`div`,{key:`indeterminate`,class:k(`${h}-checkbox-icon`)},[E(()=>z())],2)):(d(),u(`div`,{key:`check`,class:k(`${h}-checkbox-icon`)},[E(()=>R())],2))},1024),l(`div`,{class:k(`${h}-checkbox-box__border`)},null,2)],2)],2),E(()=>x)],46,H)})()}}),G=P(`n-checkbox-group`),K=b({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,options:Array,labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:t}=A(e),n=j(e),{mergedSizeRef:r,mergedDisabledRef:a}=n,o=x(e.defaultValue),s=N(()=>e.value),c=I(s,o),l=N(()=>c.value?.length||0),u=N(()=>Array.isArray(c.value)?new Set(c.value):new Set);function d(t,r){let{nTriggerFormInput:a,nTriggerFormChange:s}=n,{onChange:l,"onUpdate:value":u,onUpdateValue:d}=e;if(Array.isArray(c.value)){let e=Array.from(c.value),n=e.findIndex(e=>e===r);t?~n||(e.push(r),d&&i(d,e,{actionType:`check`,value:r}),u&&i(u,e,{actionType:`check`,value:r}),a(),s(),o.value=e,l&&i(l,e)):~n&&(e.splice(n,1),d&&i(d,e,{actionType:`uncheck`,value:r}),u&&i(u,e,{actionType:`uncheck`,value:r}),l&&i(l,e),o.value=e,a(),s())}else t?(d&&i(d,[r],{actionType:`check`,value:r}),u&&i(u,[r],{actionType:`check`,value:r}),l&&i(l,[r]),o.value=[r],a(),s()):(d&&i(d,[],{actionType:`uncheck`,value:r}),u&&i(u,[],{actionType:`uncheck`,value:r}),l&&i(l,[]),o.value=[],a(),s())}return p(G,{checkedCountRef:l,maxRef:T(e,`max`),minRef:T(e,`min`),valueSetRef:u,disabledRef:a,mergedSizeRef:r,toggleCheckbox:d}),{mergedClsPrefix:t}},render(){let{options:e,labelField:t,valueField:r}=this.$props;return d(),u(`div`,{class:k(`${this.mergedClsPrefix}-checkbox-group`),role:`group`},[e?(d(),u(g,{key:0},[E(()=>e.map(e=>{let i=e[r];return d(),n(W,{key:i,value:i,disabled:e.disabled,label:e[t]},null,8,[`value`,`disabled`,`label`])}))],64)):(d(),u(g,{key:1},[E(()=>this.$slots.default?.())],64))],2)}});export{W as n,K as t};