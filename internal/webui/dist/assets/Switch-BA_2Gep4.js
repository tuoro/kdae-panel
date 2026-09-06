import{$ as e,$t as t,B as n,Cn as r,Fn as i,H as a,L as o,S as s,Sn as c,Tn as l,Un as u,X as d,Y as f,_r as p,an as m,en as h,et as g,in as _,it as v,kn as y,lr as b,nn as x,pr as S,pt as C,rn as w,st as T,ut as E,vt as D,w as O,x as k,xn as A,y as j}from"./client-3GjT0YO-.js";import{t as M}from"./use-merged-state-DuBoFKO_.js";import{s as N}from"./index-fTZ5v0dX.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${g(t,{alpha:.2})}`}}var F={name:`Switch`,common:e,self:P},I=h(`switch`,`
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
 `),h(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[k({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),x(`checked, unchecked`,`
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
 `),t(`&:focus`,[x(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),w(`round`,[x(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[x(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),_(`disabled`,[_(`icon`,[w(`rubber-band`,[w(`pressed`,[x(`rail`,[x(`button`,`max-width: var(--n-button-width-pressed);`)])]),x(`rail`,[t(`&:active`,[x(`button`,`max-width: var(--n-button-width-pressed);`)])]),w(`active`,[w(`pressed`,[x(`rail`,[x(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),x(`rail`,[t(`&:active`,[x(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),w(`active`,[x(`rail`,[x(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),x(`rail`,`
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
 `,[k()]),x(`button`,`
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
 `)]),w(`active`,[x(`rail`,`background-color: var(--n-rail-color-active);`)]),w(`loading`,[x(`rail`,`
 cursor: wait;
 `)]),w(`disabled`,[x(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...f.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=y({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=D(e),i=f(`Switch`,`-switch`,I,F,e,t),o=O(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:r?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:s,mergedDisabledRef:c}=o,l=b(e.defaultValue),u=S(e,`value`),p=M(u,l),h=A(()=>p.value===e.checkedValue),g=b(!1),_=b(!1),y=A(()=>{let{railStyle:t}=e;if(t)return t({focused:_.value,checked:h.value})});function x(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:s,nTriggerFormChange:c}=o;n&&a(n,t),i&&a(i,t),r&&a(r,t),l.value=t,s(),c()}function C(){let{nTriggerFormFocus:e}=o;e()}function w(){let{nTriggerFormBlur:e}=o;e()}function E(){e.loading||c.value||(p.value===e.checkedValue?x(e.uncheckedValue):x(e.checkedValue))}function k(){_.value=!0,C()}function j(){_.value=!1,w(),g.value=!1}function N(t){e.loading||c.value||t.key===` `&&(p.value===e.checkedValue?x(e.uncheckedValue):x(e.checkedValue),g.value=!1)}function P(t){e.loading||c.value||t.key===` `&&(t.preventDefault(),g.value=!0)}let L=A(()=>{let{value:e}=s,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:a,buttonColor:o,boxShadowFocus:c,loadingColor:l,textColor:u,iconColor:d,[m(`buttonHeight`,e)]:f,[m(`buttonWidth`,e)]:p,[m(`buttonWidthPressed`,e)]:h,[m(`railHeight`,e)]:g,[m(`railWidth`,e)]:_,[m(`railBorderRadius`,e)]:y,[m(`buttonBorderRadius`,e)]:b},common:{cubicBezierEaseInOut:x}}=i.value,S,C,w;return z?(S=`calc((${g} - ${f}) / 2)`,C=`max(${g}, ${f})`,w=`max(${_}, calc(${_} + ${f} - ${g}))`):(S=T((v(g)-v(f))/2),C=T(Math.max(v(g),v(f))),w=v(g)>v(f)?_:T(v(_)+v(f)-v(g))),{"--n-bezier":x,"--n-button-border-radius":b,"--n-button-box-shadow":a,"--n-button-color":o,"--n-button-width":p,"--n-button-width-pressed":h,"--n-button-height":f,"--n-height":C,"--n-offset":S,"--n-opacity-disabled":t,"--n-rail-border-radius":y,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":g,"--n-rail-width":_,"--n-width":w,"--n-box-shadow-focus":c,"--n-loading-color":l,"--n-text-color":u,"--n-icon-color":d}}),R=n?d(`switch`,A(()=>s.value[0]),L,e):void 0;return{handleClick:E,handleBlur:j,handleFocus:k,handleKeyup:N,handleKeydown:P,mergedRailStyle:y,pressed:g,mergedClsPrefix:t,mergedValue:p,checked:h,mergedDisabled:c,cssVars:n?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:t,checked:a,mergedRailStyle:d,onRender:f,$slots:m}=this;f?.();let{checked:h,unchecked:g,icon:_,"checked-icon":v,"unchecked-icon":y}=m,b=!(o(_)&&o(v)&&o(y));return u(),l(`div`,{role:`switch`,"aria-checked":a,class:E([`${e}-switch`,this.themeClass,b&&`${e}-switch--icon`,a&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:p(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[c(`div`,{class:E(`${e}-switch__rail`),"aria-hidden":`true`,style:p(d)},[C(()=>n(h,t=>n(g,n=>t||n?(u(),l(`div`,{key:4,"aria-hidden":!0,class:E(`${e}-switch__children-placeholder`)},[c(`div`,{class:E(`${e}-switch__rail-placeholder`)},[c(`div`,{class:E(`${e}-switch__button-placeholder`)},null,2),C(()=>t)],2),c(`div`,{class:E(`${e}-switch__rail-placeholder`)},[c(`div`,{class:E(`${e}-switch__button-placeholder`)},null,2),C(()=>n)],2)],2)):null))),c(`div`,{class:E(`${e}-switch__button`)},[C(()=>n(_,t=>n(v,a=>n(y,n=>(u(),r(s,null,{default:()=>this.loading?(u(),r(j,i({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(a||t)?(u(),l(`div`,{class:E(`${e}-switch__button-icon`),key:a?`checked-icon`:`icon`},[C(()=>a||t)],2)):!this.checked&&(n||t)?(u(),l(`div`,{class:E(`${e}-switch__button-icon`),key:n?`unchecked-icon`:`icon`},[C(()=>n||t)],2)):null},1024)))))),C(()=>n(h,t=>t&&(u(),l(`div`,{key:`checked`,class:E(`${e}-switch__checked`)},[C(()=>t)],2)))),C(()=>n(g,t=>t&&(u(),l(`div`,{key:`unchecked`,class:E(`${e}-switch__unchecked`)},[C(()=>t)],2))))],2)],6)],46,L)}});export{B as t};