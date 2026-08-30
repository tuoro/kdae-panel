import{$ as e,$t as t,C as n,Cn as r,Fn as i,I as a,J as o,Q as s,Sn as c,Tn as l,Un as u,V as d,Y as f,_r as p,_t as m,an as h,b as g,en as _,ft as v,in as y,kn as b,lr as x,lt as S,nn as C,ot as w,pr as T,rn as E,rt as D,v as O,x as k,xn as A,z as j}from"./client-DecrR2G0.js";import{t as M}from"./use-merged-state-Dvb8YPIJ.js";import{s as N}from"./index-CBIB5M6s.js";function P(t){let{primaryColor:n,opacityDisabled:r,borderRadius:i,textColor3:a}=t;return{...N,iconColor:a,textColor:`white`,loadingColor:n,opacityDisabled:r,railColor:`rgba(0, 0, 0, .14)`,railColorActive:n,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:i,railBorderRadiusMedium:i,railBorderRadiusLarge:i,buttonBorderRadiusSmall:i,buttonBorderRadiusMedium:i,buttonBorderRadiusLarge:i,boxShadowFocus:`0 0 0 2px ${e(n,{alpha:.2})}`}}var F={name:`Switch`,common:s,self:P},I=_(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[C(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),C(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),C(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),_(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[g({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),C(`checked, unchecked`,`
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
 `),C(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),C(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),t(`&:focus`,[C(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),E(`round`,[C(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[C(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),y(`disabled`,[y(`icon`,[E(`rubber-band`,[E(`pressed`,[C(`rail`,[C(`button`,`max-width: var(--n-button-width-pressed);`)])]),C(`rail`,[t(`&:active`,[C(`button`,`max-width: var(--n-button-width-pressed);`)])]),E(`active`,[E(`pressed`,[C(`rail`,[C(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),C(`rail`,[t(`&:active`,[C(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),E(`active`,[C(`rail`,[C(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),C(`rail`,`
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
 `,[C(`button-icon`,`
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
 `,[g()]),C(`button`,`
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
 `)]),E(`active`,[C(`rail`,`background-color: var(--n-rail-color-active);`)]),E(`loading`,[C(`rail`,`
 cursor: wait;
 `)]),E(`disabled`,[C(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...o.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=b({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:t,inlineThemeDisabled:r,mergedComponentPropsRef:i}=m(e),a=o(`Switch`,`-switch`,I,F,e,t),s=n(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:i?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:c,mergedDisabledRef:l}=s,u=x(e.defaultValue),p=T(e,`value`),g=M(p,u),_=A(()=>g.value===e.checkedValue),v=x(!1),y=x(!1),b=A(()=>{let{railStyle:t}=e;if(t)return t({focused:y.value,checked:_.value})});function S(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=s;n&&d(n,t),i&&d(i,t),r&&d(r,t),u.value=t,a(),o()}function C(){let{nTriggerFormFocus:e}=s;e()}function E(){let{nTriggerFormBlur:e}=s;e()}function O(){e.loading||l.value||(g.value===e.checkedValue?S(e.uncheckedValue):S(e.checkedValue))}function k(){y.value=!0,C()}function j(){y.value=!1,E(),v.value=!1}function N(t){e.loading||l.value||t.key===` `&&(g.value===e.checkedValue?S(e.uncheckedValue):S(e.checkedValue),v.value=!1)}function P(t){e.loading||l.value||t.key===` `&&(t.preventDefault(),v.value=!0)}let L=A(()=>{let{value:e}=c,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:o,boxShadowFocus:s,loadingColor:l,textColor:u,iconColor:d,[h(`buttonHeight`,e)]:f,[h(`buttonWidth`,e)]:p,[h(`buttonWidthPressed`,e)]:m,[h(`railHeight`,e)]:g,[h(`railWidth`,e)]:_,[h(`railBorderRadius`,e)]:v,[h(`buttonBorderRadius`,e)]:y},common:{cubicBezierEaseInOut:b}}=a.value,x,S,C;return z?(x=`calc((${g} - ${f}) / 2)`,S=`max(${g}, ${f})`,C=`max(${_}, calc(${_} + ${f} - ${g}))`):(x=w((D(g)-D(f))/2),S=w(Math.max(D(g),D(f))),C=D(g)>D(f)?_:w(D(_)+D(f)-D(g))),{"--n-bezier":b,"--n-button-border-radius":y,"--n-button-box-shadow":i,"--n-button-color":o,"--n-button-width":p,"--n-button-width-pressed":m,"--n-button-height":f,"--n-height":S,"--n-offset":x,"--n-opacity-disabled":t,"--n-rail-border-radius":v,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":g,"--n-rail-width":_,"--n-width":C,"--n-box-shadow-focus":s,"--n-loading-color":l,"--n-text-color":u,"--n-icon-color":d}}),R=r?f(`switch`,A(()=>c.value[0]),L,e):void 0;return{handleClick:O,handleBlur:j,handleFocus:k,handleKeyup:N,handleKeydown:P,mergedRailStyle:b,pressed:v,mergedClsPrefix:t,mergedValue:g,checked:_,mergedDisabled:l,cssVars:r?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:t,checked:n,mergedRailStyle:o,onRender:s,$slots:d}=this;s?.();let{checked:f,unchecked:m,icon:h,"checked-icon":g,"unchecked-icon":_}=d,y=!(a(h)&&a(g)&&a(_));return u(),l(`div`,{role:`switch`,"aria-checked":n,class:S([`${e}-switch`,this.themeClass,y&&`${e}-switch--icon`,n&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:p(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[c(`div`,{class:S(`${e}-switch__rail`),"aria-hidden":`true`,style:p(o)},[v(()=>j(f,t=>j(m,n=>t||n?(u(),l(`div`,{key:4,"aria-hidden":!0,class:S(`${e}-switch__children-placeholder`)},[c(`div`,{class:S(`${e}-switch__rail-placeholder`)},[c(`div`,{class:S(`${e}-switch__button-placeholder`)},null,2),v(()=>t)],2),c(`div`,{class:S(`${e}-switch__rail-placeholder`)},[c(`div`,{class:S(`${e}-switch__button-placeholder`)},null,2),v(()=>n)],2)],2)):null))),c(`div`,{class:S(`${e}-switch__button`)},[v(()=>j(h,t=>j(g,n=>j(_,a=>(u(),r(k,null,{default:()=>this.loading?(u(),r(O,i({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(n||t)?(u(),l(`div`,{class:S(`${e}-switch__button-icon`),key:n?`checked-icon`:`icon`},[v(()=>n||t)],2)):!this.checked&&(a||t)?(u(),l(`div`,{class:S(`${e}-switch__button-icon`),key:a?`unchecked-icon`:`icon`},[v(()=>a||t)],2)):null},1024)))))),v(()=>j(f,t=>t&&(u(),l(`div`,{key:`checked`,class:S(`${e}-switch__checked`)},[v(()=>t)],2)))),v(()=>j(m,t=>t&&(u(),l(`div`,{key:`unchecked`,class:S(`${e}-switch__unchecked`)},[v(()=>t)],2))))],2)],6)],46,L)}});export{B as t};