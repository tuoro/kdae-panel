import{$ as e,$t as t,Cn as n,Ct as r,E as i,Fn as a,J as o,P as s,Q as c,Sn as l,Tn as u,Un as d,V as f,Wn as p,Y as m,_r as h,_t as g,an as _,at as v,bt as y,en as b,ft as x,in as S,jn as C,kn as w,lr as T,lt as E,nn as D,pr as O,rn as k,xn as A,z as j}from"./client-DecrR2G0.js";import{r as M}from"./text-DpnNyaQe.js";import{r as N,t as P}from"./light-A_JurRsC.js";import{G as F}from"./index-CBIB5M6s.js";function I(t){let{textColor2:n,primaryColorHover:r,primaryColorPressed:i,primaryColor:a,infoColor:o,successColor:s,warningColor:c,errorColor:l,baseColor:u,borderColor:d,opacityDisabled:f,tagColor:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:w,heightMedium:T,closeColorHover:E,closeColorPressed:D,buttonColor2Hover:O,buttonColor2Pressed:k,fontWeightStrong:A}=t;return{...N,closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:w,heightLarge:T,borderRadius:_,opacityDisabled:f,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:A,textColorCheckable:n,textColorHoverCheckable:n,textColorPressedCheckable:n,textColorChecked:u,colorCheckable:`#0000`,colorHoverCheckable:O,colorPressedCheckable:k,colorChecked:a,colorCheckedHover:r,colorCheckedPressed:i,border:`1px solid ${d}`,textColor:n,color:p,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:E,closeColorPressed:D,borderPrimary:`1px solid ${e(a,{alpha:.3})}`,textColorPrimary:a,colorPrimary:e(a,{alpha:.12}),colorBorderedPrimary:e(a,{alpha:.1}),closeIconColorPrimary:a,closeIconColorHoverPrimary:a,closeIconColorPressedPrimary:a,closeColorHoverPrimary:e(a,{alpha:.12}),closeColorPressedPrimary:e(a,{alpha:.18}),borderInfo:`1px solid ${e(o,{alpha:.3})}`,textColorInfo:o,colorInfo:e(o,{alpha:.12}),colorBorderedInfo:e(o,{alpha:.1}),closeIconColorInfo:o,closeIconColorHoverInfo:o,closeIconColorPressedInfo:o,closeColorHoverInfo:e(o,{alpha:.12}),closeColorPressedInfo:e(o,{alpha:.18}),borderSuccess:`1px solid ${e(s,{alpha:.3})}`,textColorSuccess:s,colorSuccess:e(s,{alpha:.12}),colorBorderedSuccess:e(s,{alpha:.1}),closeIconColorSuccess:s,closeIconColorHoverSuccess:s,closeIconColorPressedSuccess:s,closeColorHoverSuccess:e(s,{alpha:.12}),closeColorPressedSuccess:e(s,{alpha:.18}),borderWarning:`1px solid ${e(c,{alpha:.35})}`,textColorWarning:c,colorWarning:e(c,{alpha:.15}),colorBorderedWarning:e(c,{alpha:.12}),closeIconColorWarning:c,closeIconColorHoverWarning:c,closeIconColorPressedWarning:c,closeColorHoverWarning:e(c,{alpha:.12}),closeColorPressedWarning:e(c,{alpha:.18}),borderError:`1px solid ${e(l,{alpha:.23})}`,textColorError:l,colorError:e(l,{alpha:.1}),colorBorderedError:e(l,{alpha:.08}),closeIconColorError:l,closeIconColorHoverError:l,closeIconColorPressedError:l,closeColorHoverError:e(l,{alpha:.12}),closeColorPressedError:e(l,{alpha:.18})}}var L={name:`Tag`,common:c,self:I},R={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},z=b(`tag`,`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[k(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),D(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),D(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),D(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),D(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),k(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[D(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),D(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),k(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),k(`icon, avatar`,[k(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),k(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),k(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[S(`disabled`,[t(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[S(`checked`,`color: var(--n-text-color-hover-checkable);`)]),t(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[S(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),k(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[S(`disabled`,[t(`&:hover`,`background-color: var(--n-color-checked-hover);`),t(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),B=[`onClick`,`onMouseenter`,`onMouseleave`],V={...o.props,...R,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},H=y(`n-tag`),U=w({name:`Tag`,props:V,slots:Object,setup(e){let t=T(null),{mergedBorderedRef:n,mergedClsPrefixRef:r,inlineThemeDisabled:a,mergedRtlRef:c,mergedComponentPropsRef:l}=g(e),u=A(()=>e.size||l?.value?.Tag?.size||`medium`),d=o(`Tag`,`-tag`,z,L,e,r);p(H,{roundRef:O(e,`round`)});function h(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function y(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&f(n,t)}}let b={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},x=s(`Tag`,c,r),S=A(()=>{let{type:t,color:{color:r,textColor:i}={}}=e,a=u.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:l,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:y,colorHoverCheckable:b,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[_(`colorBordered`,t)]:D,[_(`closeSize`,a)]:O,[_(`closeIconSize`,a)]:k,[_(`fontSize`,a)]:A,[_(`height`,a)]:j,[_(`color`,t)]:M,[_(`textColor`,t)]:N,[_(`border`,t)]:P,[_(`closeIconColor`,t)]:F,[_(`closeIconColorHover`,t)]:I,[_(`closeIconColorPressed`,t)]:L,[_(`closeColorHover`,t)]:R,[_(`closeColorPressed`,t)]:z}}=d.value,B=v(c);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":o,"--n-border-radius":l,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":r||(n.value?D:M),"--n-color-checkable":y,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":b,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":f,"--n-padding":s,"--n-text-color":i||N,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),C=a?m(`tag`,A(()=>{let t=``,{type:r,color:{color:a,textColor:o}={}}=e;return t+=r[0],t+=u.value[0],a&&(t+=`a${i(a)}`),o&&(t+=`b${i(o)}`),n.value&&(t+=`c`),t}),S,e):void 0;return{...b,rtlEnabled:x,mergedClsPrefix:r,contentRef:t,mergedBordered:n,handleClick:h,handleCloseClick:y,cssVars:a?void 0:S,themeClass:C?.themeClass,onRender:C?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:t,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:s}=this;o?.();let c=j(s.avatar,t=>t&&(d(),u(`div`,{class:E(`${e}-tag__avatar`)},[x(()=>t)],2))),f=j(s.icon,t=>t&&(d(),u(`div`,{class:E(`${e}-tag__icon`)},[x(()=>t)],2)));return d(),u(`div`,{class:E([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:t,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:a,[`${e}-tag--avatar`]:c,[`${e}-tag--icon`]:f,[`${e}-tag--closable`]:r}]),style:h(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[x(()=>f||c),l(`span`,{class:E(`${e}-tag__content`),ref:`contentRef`},[x(()=>this.$slots.default?.())],2),!this.checkable&&r?(d(),n(F,{key:0,clsPrefix:e,class:E(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):x(()=>null),!this.checkable&&this.mergedBordered?(d(),u(`div`,{key:2,class:E(`${e}-tag__border`),style:h({borderColor:i})},null,6)):x(()=>null)],46,B)}}),W=b(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[k(`color-transition`,{transition:`color .3s var(--n-bezier)`}),k(`depth`,{color:`var(--n-color)`},[t(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),t(`svg`,{height:`1em`,width:`1em`})]),G={...o.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},K=w({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:G,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=g(e),r=o(`Icon`,`-icon`,W,P,e,t),i=A(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),a=n?m(`icon`,A(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:A(()=>{let{size:t,color:n}=e;return{fontSize:M(t),color:n}}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:i,onRender:o,themeClass:s}=this;return e?.$options?._n_icon__&&r(`icon`,"don't wrap `n-icon` inside `n-icon`"),o?.(),C(`i`,a(this.$attrs,{role:`img`,class:[`${n}-icon`,s,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),i?C(i):this.$slots.default?.())}});export{U as n,H as r,K as t};