import{$ as e,An as t,B as n,Cn as r,En as i,H as a,In as o,L as s,S as c,Sn as l,Wn as u,X as d,Y as f,an as p,en as m,et as h,in as g,it as _,mr as v,on as y,pt as b,rn as x,st as S,tn as C,ur as w,ut as T,vr as E,vt as D,w as O,wn as k,x as A,y as j}from"./client-BDSaduAi.js";import{t as M}from"./use-merged-state-BShkc5xA.js";import{s as N}from"./index-LlkbWj36.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${h(t,{alpha:.2})}`}}var F={name:`Switch`,common:e,self:P},I=C(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[x(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),x(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),x(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),C(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[A({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),x(`checked, unchecked`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),x(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),x(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),m(`&:focus`,[x(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),g(`round`,[x(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[x(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),p(`disabled`,[p(`icon`,[g(`rubber-band`,[g(`pressed`,[x(`rail`,[x(`button`,`max-width: var(--n-button-width-pressed);`)])]),x(`rail`,[m(`&:active`,[x(`button`,`max-width: var(--n-button-width-pressed);`)])]),g(`active`,[g(`pressed`,[x(`rail`,[x(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),x(`rail`,[m(`&:active`,[x(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),g(`active`,[x(`rail`,[x(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),x(`rail`,`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[x(`button-icon`,`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[A()]),x(`button`,`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),g(`active`,[x(`rail`,`background-color: var(--n-rail-color-active);`)]),g(`loading`,[x(`rail`,`
 cursor: wait;
 `)]),g(`disabled`,[x(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...f.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=t({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=D(e),i=f(`Switch`,`-switch`,I,F,e,t),o=O(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:r?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:s,mergedDisabledRef:c}=o,u=w(e.defaultValue),p=v(e,`value`),m=M(p,u),h=l(()=>m.value===e.checkedValue),g=w(!1),b=w(!1),x=l(()=>{let{railStyle:t}=e;if(t)return t({focused:b.value,checked:h.value})});function C(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:s,nTriggerFormChange:c}=o;n&&a(n,t),i&&a(i,t),r&&a(r,t),u.value=t,s(),c()}function T(){let{nTriggerFormFocus:e}=o;e()}function E(){let{nTriggerFormBlur:e}=o;e()}function k(){e.loading||c.value||(m.value===e.checkedValue?C(e.uncheckedValue):C(e.checkedValue))}function A(){b.value=!0,T()}function j(){b.value=!1,E(),g.value=!1}function N(t){e.loading||c.value||t.key===` `&&(m.value===e.checkedValue?C(e.uncheckedValue):C(e.checkedValue),g.value=!1)}function P(t){e.loading||c.value||t.key===` `&&(t.preventDefault(),g.value=!0)}let L=l(()=>{let{value:e}=s,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:a,buttonColor:o,boxShadowFocus:c,loadingColor:l,textColor:u,iconColor:d,[y(`buttonHeight`,e)]:f,[y(`buttonWidth`,e)]:p,[y(`buttonWidthPressed`,e)]:m,[y(`railHeight`,e)]:h,[y(`railWidth`,e)]:g,[y(`railBorderRadius`,e)]:v,[y(`buttonBorderRadius`,e)]:b},common:{cubicBezierEaseInOut:x}}=i.value,C,w,T;return z?(C=`calc((${h} - ${f}) / 2)`,w=`max(${h}, ${f})`,T=`max(${g}, calc(${g} + ${f} - ${h}))`):(C=S((_(h)-_(f))/2),w=S(Math.max(_(h),_(f))),T=_(h)>_(f)?g:S(_(g)+_(f)-_(h))),{"--n-bezier":x,"--n-button-border-radius":b,"--n-button-box-shadow":a,"--n-button-color":o,"--n-button-width":p,"--n-button-width-pressed":m,"--n-button-height":f,"--n-height":w,"--n-offset":C,"--n-opacity-disabled":t,"--n-rail-border-radius":v,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":h,"--n-rail-width":g,"--n-width":T,"--n-box-shadow-focus":c,"--n-loading-color":l,"--n-text-color":u,"--n-icon-color":d}}),R=n?d(`switch`,l(()=>s.value[0]),L,e):void 0;return{handleClick:k,handleBlur:j,handleFocus:A,handleKeyup:N,handleKeydown:P,mergedRailStyle:x,pressed:g,mergedClsPrefix:t,mergedValue:m,checked:h,mergedDisabled:c,cssVars:n?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:t,checked:a,mergedRailStyle:l,onRender:d,$slots:f}=this;d?.();let{checked:p,unchecked:m,icon:h,"checked-icon":g,"unchecked-icon":_}=f,v=!(s(h)&&s(g)&&s(_));return u(),i(`div`,{role:`switch`,"aria-checked":a,class:T([`${e}-switch`,this.themeClass,v&&`${e}-switch--icon`,a&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:E(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[r(`div`,{class:T(`${e}-switch__rail`),"aria-hidden":`true`,style:E(l)},[b(()=>n(p,t=>n(m,n=>t||n?(u(),i(`div`,{key:4,"aria-hidden":!0,class:T(`${e}-switch__children-placeholder`)},[r(`div`,{class:T(`${e}-switch__rail-placeholder`)},[r(`div`,{class:T(`${e}-switch__button-placeholder`)},null,2),b(()=>t)],2),r(`div`,{class:T(`${e}-switch__rail-placeholder`)},[r(`div`,{class:T(`${e}-switch__button-placeholder`)},null,2),b(()=>n)],2)],2)):null))),r(`div`,{class:T(`${e}-switch__button`)},[b(()=>n(h,t=>n(g,r=>n(_,n=>(u(),k(c,null,{default:()=>this.loading?(u(),k(j,o({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(r||t)?(u(),i(`div`,{class:T(`${e}-switch__button-icon`),key:r?`checked-icon`:`icon`},[b(()=>r||t)],2)):!this.checked&&(n||t)?(u(),i(`div`,{class:T(`${e}-switch__button-icon`),key:n?`unchecked-icon`:`icon`},[b(()=>n||t)],2)):null},1024)))))),b(()=>n(p,t=>t&&(u(),i(`div`,{key:`checked`,class:T(`${e}-switch__checked`)},[b(()=>t)],2)))),b(()=>n(m,t=>t&&(u(),i(`div`,{key:`unchecked`,class:T(`${e}-switch__unchecked`)},[b(()=>t)],2))))],2)],6)],46,L)}});export{B as t};