import{$ as e,Gt as t,H as n,Ht as r,I as i,J as a,Jt as o,Kt as s,Mn as c,P as l,Qn as u,S as d,U as f,Ut as p,V as m,W as h,Z as g,dn as _,fn as v,j as y,mn as b,nr as x,nt as S,or as C,qt as w,st as T,un as E,vn as D,w as O,wn as k,x as A,y as j}from"./client-DkW07njR.js";import{t as M}from"./use-merged-state-BhDn2UYN.js";import{o as N}from"./index-Cfzv7Muz.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${h(t,{alpha:.2})}`}}var F={name:`Switch`,common:f,self:P},I=p(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[t(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),t(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),t(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),p(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[A({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),t(`checked, unchecked`,`
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
 `),t(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),t(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),r(`&:focus`,[t(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),s(`round`,[t(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[t(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),w(`disabled`,[w(`icon`,[s(`rubber-band`,[s(`pressed`,[t(`rail`,[t(`button`,`max-width: var(--n-button-width-pressed);`)])]),t(`rail`,[r(`&:active`,[t(`button`,`max-width: var(--n-button-width-pressed);`)])]),s(`active`,[s(`pressed`,[t(`rail`,[t(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),t(`rail`,[r(`&:active`,[t(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),s(`active`,[t(`rail`,[t(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),t(`rail`,`
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
 `,[t(`button-icon`,`
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
 `,[A()]),t(`button`,`
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
 `)]),s(`active`,[t(`rail`,`background-color: var(--n-rail-color-active);`)]),s(`loading`,[t(`rail`,`
 cursor: wait;
 `)]),s(`disabled`,[t(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...m.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=D({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:t,inlineThemeDisabled:r,mergedComponentPropsRef:s}=T(e),c=m(`Switch`,`-switch`,I,F,e,t),l=O(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:s?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:d,mergedDisabledRef:f}=l,p=u(e.defaultValue),h=x(e,`value`),_=M(h,p),v=E(()=>_.value===e.checkedValue),y=u(!1),b=u(!1),S=E(()=>{let{railStyle:t}=e;if(t)return t({focused:b.value,checked:v.value})});function C(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:a}=e,{nTriggerFormInput:o,nTriggerFormChange:s}=l;n&&i(n,t),a&&i(a,t),r&&i(r,t),p.value=t,o(),s()}function w(){let{nTriggerFormFocus:e}=l;e()}function D(){let{nTriggerFormBlur:e}=l;e()}function k(){e.loading||f.value||(_.value===e.checkedValue?C(e.uncheckedValue):C(e.checkedValue))}function A(){b.value=!0,w()}function j(){b.value=!1,D(),y.value=!1}function N(t){e.loading||f.value||t.key===` `&&(_.value===e.checkedValue?C(e.uncheckedValue):C(e.checkedValue),y.value=!1)}function P(t){e.loading||f.value||t.key===` `&&(t.preventDefault(),y.value=!0)}let L=E(()=>{let{value:e}=d,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:s,boxShadowFocus:l,loadingColor:u,textColor:f,iconColor:p,[o(`buttonHeight`,e)]:m,[o(`buttonWidth`,e)]:h,[o(`buttonWidthPressed`,e)]:_,[o(`railHeight`,e)]:v,[o(`railWidth`,e)]:y,[o(`railBorderRadius`,e)]:b,[o(`buttonBorderRadius`,e)]:x},common:{cubicBezierEaseInOut:S}}=c.value,C,w,T;return z?(C=`calc((${v} - ${m}) / 2)`,w=`max(${v}, ${m})`,T=`max(${y}, calc(${y} + ${m} - ${v}))`):(C=g((a(v)-a(m))/2),w=g(Math.max(a(v),a(m))),T=a(v)>a(m)?y:g(a(y)+a(m)-a(v))),{"--n-bezier":S,"--n-button-border-radius":x,"--n-button-box-shadow":i,"--n-button-color":s,"--n-button-width":h,"--n-button-width-pressed":_,"--n-button-height":m,"--n-height":w,"--n-offset":C,"--n-opacity-disabled":t,"--n-rail-border-radius":b,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":v,"--n-rail-width":y,"--n-width":T,"--n-box-shadow-focus":l,"--n-loading-color":u,"--n-text-color":f,"--n-icon-color":p}}),R=r?n(`switch`,E(()=>d.value[0]),L,e):void 0;return{handleClick:k,handleBlur:j,handleFocus:A,handleKeyup:N,handleKeydown:P,mergedRailStyle:S,pressed:y,mergedClsPrefix:t,mergedValue:_,checked:v,mergedDisabled:f,cssVars:r?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:t,mergedDisabled:n,checked:r,mergedRailStyle:i,onRender:a,$slots:o}=this;a?.();let{checked:s,unchecked:u,icon:f,"checked-icon":p,"unchecked-icon":m}=o,h=!(y(f)&&y(p)&&y(m));return c(),b(`div`,{role:`switch`,"aria-checked":r,class:e([`${t}-switch`,this.themeClass,h&&`${t}-switch--icon`,r&&`${t}-switch--active`,n&&`${t}-switch--disabled`,this.round&&`${t}-switch--round`,this.loading&&`${t}-switch--loading`,this.pressed&&`${t}-switch--pressed`,this.rubberBand&&`${t}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:C(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[_(`div`,{class:e(`${t}-switch__rail`),"aria-hidden":`true`,style:C(i)},[S(()=>l(s,n=>l(u,r=>n||r?(c(),b(`div`,{key:4,"aria-hidden":!0,class:e(`${t}-switch__children-placeholder`)},[_(`div`,{class:e(`${t}-switch__rail-placeholder`)},[_(`div`,{class:e(`${t}-switch__button-placeholder`)},null,2),S(()=>n)],2),_(`div`,{class:e(`${t}-switch__rail-placeholder`)},[_(`div`,{class:e(`${t}-switch__button-placeholder`)},null,2),S(()=>r)],2)],2)):null))),_(`div`,{class:e(`${t}-switch__button`)},[S(()=>l(f,n=>l(p,r=>l(m,i=>(c(),v(d,null,{default:()=>this.loading?(c(),v(j,k({key:`loading`,clsPrefix:t,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(r||n)?(c(),b(`div`,{class:e(`${t}-switch__button-icon`),key:r?`checked-icon`:`icon`},[S(()=>r||n)],2)):!this.checked&&(i||n)?(c(),b(`div`,{class:e(`${t}-switch__button-icon`),key:i?`unchecked-icon`:`icon`},[S(()=>i||n)],2)):null},1024)))))),S(()=>l(s,n=>n&&(c(),b(`div`,{key:`checked`,class:e(`${t}-switch__checked`)},[S(()=>n)],2)))),S(()=>l(u,n=>n&&(c(),b(`div`,{key:`unchecked`,class:e(`${t}-switch__unchecked`)},[S(()=>n)],2))))],2)],6)],46,L)}});export{B as t};