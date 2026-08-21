import{$t as e,C as t,E as n,En as r,Gt as i,Ht as a,Jt as o,O as s,Qt as c,Rt as l,Yt as u,Zt as d,dt as f,en as p,ft as m,gn as h,j as g,pt as _,rr as v,sr as y,vt as b,wn as x,wt as S,x as C,xt as w}from"./client-7ydMUZih.js";import{t as T}from"./use-merged-state-Bt7Nbk0v.js";import{o as E}from"./index-DHYLQA2V.js";function D(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return Object.assign(Object.assign({},E),{iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${l(t,{alpha:.2})}`})}var O={name:`Switch`,common:C,self:D},k=u(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[d(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),d(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),d(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),u(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[n({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),d(`checked, unchecked`,`
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
 `),d(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),d(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),o(`&:focus`,[d(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),c(`round`,[d(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[d(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),e(`disabled`,[e(`icon`,[c(`rubber-band`,[c(`pressed`,[d(`rail`,[d(`button`,`max-width: var(--n-button-width-pressed);`)])]),d(`rail`,[o(`&:active`,[d(`button`,`max-width: var(--n-button-width-pressed);`)])]),c(`active`,[c(`pressed`,[d(`rail`,[d(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),d(`rail`,[o(`&:active`,[d(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),c(`active`,[d(`rail`,[d(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),d(`rail`,`
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
 `,[d(`button-icon`,`
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
 `,[n()]),d(`button`,`
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
 `)]),c(`active`,[d(`rail`,`background-color: var(--n-rail-color-active);`)]),c(`loading`,[d(`rail`,`
 cursor: wait;
 `)]),c(`disabled`,[d(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),A=Object.assign(Object.assign({},g.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]}),j,M=x({name:`Switch`,props:A,slots:Object,setup(e){j===void 0&&(j=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=_(e),o=g(`Switch`,`-switch`,k,O,e,t),s=f(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:r?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:c,mergedDisabledRef:l}=s,u=v(e.defaultValue),d=y(e,`value`),b=T(d,u),x=h(()=>b.value===e.checkedValue),C=v(!1),w=v(!1),E=h(()=>{let{railStyle:t}=e;if(t)return t({focused:w.value,checked:x.value})});function D(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=s;n&&S(n,t),i&&S(i,t),r&&S(r,t),u.value=t,a(),o()}function A(){let{nTriggerFormFocus:e}=s;e()}function M(){let{nTriggerFormBlur:e}=s;e()}function N(){e.loading||l.value||(b.value===e.checkedValue?D(e.uncheckedValue):D(e.checkedValue))}function P(){w.value=!0,A()}function F(){w.value=!1,M(),C.value=!1}function I(t){e.loading||l.value||t.key===` `&&(b.value===e.checkedValue?D(e.uncheckedValue):D(e.checkedValue),C.value=!1)}function L(t){e.loading||l.value||t.key===` `&&(t.preventDefault(),C.value=!0)}let R=h(()=>{let{value:e}=c,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:s,buttonColor:l,boxShadowFocus:u,loadingColor:d,textColor:f,iconColor:m,[p(`buttonHeight`,e)]:h,[p(`buttonWidth`,e)]:g,[p(`buttonWidthPressed`,e)]:_,[p(`railHeight`,e)]:v,[p(`railWidth`,e)]:y,[p(`railBorderRadius`,e)]:b,[p(`buttonBorderRadius`,e)]:x},common:{cubicBezierEaseInOut:S}}=o.value,C,w,T;return j?(C=`calc((${v} - ${h}) / 2)`,w=`max(${v}, ${h})`,T=`max(${y}, calc(${y} + ${h} - ${v}))`):(C=i((a(v)-a(h))/2),w=i(Math.max(a(v),a(h))),T=a(v)>a(h)?y:i(a(y)+a(h)-a(v))),{"--n-bezier":S,"--n-button-border-radius":x,"--n-button-box-shadow":s,"--n-button-color":l,"--n-button-width":g,"--n-button-width-pressed":_,"--n-button-height":h,"--n-height":w,"--n-offset":C,"--n-opacity-disabled":t,"--n-rail-border-radius":b,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":v,"--n-rail-width":y,"--n-width":T,"--n-box-shadow-focus":u,"--n-loading-color":d,"--n-text-color":f,"--n-icon-color":m}}),z=n?m(`switch`,h(()=>c.value[0]),R,e):void 0;return{handleClick:N,handleBlur:F,handleFocus:P,handleKeyup:I,handleKeydown:L,mergedRailStyle:E,pressed:C,mergedClsPrefix:t,mergedValue:b,checked:x,mergedDisabled:l,cssVars:n?void 0:R,themeClass:z?.themeClass,onRender:z?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:n,checked:i,mergedRailStyle:a,onRender:o,$slots:c}=this;o?.();let{checked:l,unchecked:u,icon:d,"checked-icon":f,"unchecked-icon":p}=c,m=!(b(d)&&b(f)&&b(p));return r(`div`,{role:`switch`,"aria-checked":i,class:[`${e}-switch`,this.themeClass,m&&`${e}-switch--icon`,i&&`${e}-switch--active`,n&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},r(`div`,{class:`${e}-switch__rail`,"aria-hidden":`true`,style:a},w(l,t=>w(u,n=>t||n?r(`div`,{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},r(`div`,{class:`${e}-switch__rail-placeholder`},r(`div`,{class:`${e}-switch__button-placeholder`}),t),r(`div`,{class:`${e}-switch__rail-placeholder`},r(`div`,{class:`${e}-switch__button-placeholder`}),n)):null)),r(`div`,{class:`${e}-switch__button`},w(d,n=>w(f,i=>w(p,a=>r(s,null,{default:()=>this.loading?r(t,Object.assign({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(i||n)?r(`div`,{class:`${e}-switch__button-icon`,key:i?`checked-icon`:`icon`},i||n):!this.checked&&(a||n)?r(`div`,{class:`${e}-switch__button-icon`,key:a?`unchecked-icon`:`icon`},a||n):null})))),w(l,t=>t&&r(`div`,{key:`checked`,class:`${e}-switch__checked`},t)),w(u,t=>t&&r(`div`,{key:`unchecked`,class:`${e}-switch__unchecked`},t)))))}});export{M as t};