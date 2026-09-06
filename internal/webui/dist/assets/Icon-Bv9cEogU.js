import{$ as e,$t as t,B as n,Cn as r,Ct as i,D as a,F as o,Fn as s,H as c,Sn as l,Tn as u,Un as d,Wn as f,X as p,Y as m,_r as h,an as g,en as _,et as v,in as y,jn as b,kn as x,lr as S,nn as C,ot as w,pr as T,pt as E,rn as D,ut as O,vt as k,xn as A,xt as j}from"./client-3GjT0YO-.js";import{r as M}from"./text-BS8gAoyY.js";import{r as N,t as P}from"./light-BfbRM88G.js";import{G as F}from"./index-CTeeybPj.js";function I(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:w,heightMedium:T,closeColorHover:E,closeColorPressed:D,buttonColor2Hover:O,buttonColor2Pressed:k,fontWeightStrong:A}=e;return{...N,closeBorderRadius:g,heightTiny:S,heightSmall:C,heightMedium:w,heightLarge:T,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:A,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:O,colorPressedCheckable:k,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:E,closeColorPressed:D,borderPrimary:`1px solid ${v(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:v(i,{alpha:.12}),colorBorderedPrimary:v(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:v(i,{alpha:.12}),closeColorPressedPrimary:v(i,{alpha:.18}),borderInfo:`1px solid ${v(a,{alpha:.3})}`,textColorInfo:a,colorInfo:v(a,{alpha:.12}),colorBorderedInfo:v(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:v(a,{alpha:.12}),closeColorPressedInfo:v(a,{alpha:.18}),borderSuccess:`1px solid ${v(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:v(o,{alpha:.12}),colorBorderedSuccess:v(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:v(o,{alpha:.12}),closeColorPressedSuccess:v(o,{alpha:.18}),borderWarning:`1px solid ${v(s,{alpha:.35})}`,textColorWarning:s,colorWarning:v(s,{alpha:.15}),colorBorderedWarning:v(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:v(s,{alpha:.12}),closeColorPressedWarning:v(s,{alpha:.18}),borderError:`1px solid ${v(c,{alpha:.23})}`,textColorError:c,colorError:v(c,{alpha:.1}),colorBorderedError:v(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:v(c,{alpha:.12}),closeColorPressedError:v(c,{alpha:.18})}}var L={name:`Tag`,common:e,self:I},R={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},z=_(`tag`,`
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
`,[D(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),C(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),C(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),C(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),C(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),D(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[C(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),C(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),D(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),D(`icon, avatar`,[D(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),D(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),D(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[y(`disabled`,[t(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[y(`checked`,`color: var(--n-text-color-hover-checkable);`)]),t(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[y(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),D(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[y(`disabled`,[t(`&:hover`,`background-color: var(--n-color-checked-hover);`),t(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),B=[`onClick`,`onMouseenter`,`onMouseleave`],V={...m.props,...R,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},H=j(`n-tag`),U=x({name:`Tag`,props:V,slots:Object,setup(e){let t=S(null),{mergedBorderedRef:n,mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:s,mergedComponentPropsRef:l}=k(e),u=A(()=>e.size||l?.value?.Tag?.size||`medium`),d=m(`Tag`,`-tag`,z,L,e,r);f(H,{roundRef:T(e,`round`)});function h(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function _(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&c(n,t)}}let v={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},y=o(`Tag`,s,r),b=A(()=>{let{type:t,color:{color:r,textColor:i}={}}=e,a=u.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:l,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:_,colorCheckable:v,colorHoverCheckable:y,colorPressedCheckable:b,colorChecked:x,colorCheckedHover:S,colorCheckedPressed:C,closeBorderRadius:T,fontWeightStrong:E,[g(`colorBordered`,t)]:D,[g(`closeSize`,a)]:O,[g(`closeIconSize`,a)]:k,[g(`fontSize`,a)]:A,[g(`height`,a)]:j,[g(`color`,t)]:M,[g(`textColor`,t)]:N,[g(`border`,t)]:P,[g(`closeIconColor`,t)]:F,[g(`closeIconColorHover`,t)]:I,[g(`closeIconColorPressed`,t)]:L,[g(`closeColorHover`,t)]:R,[g(`closeColorPressed`,t)]:z}}=d.value,B=w(c);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":o,"--n-border-radius":l,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":r||(n.value?D:M),"--n-color-checkable":v,"--n-color-checked":x,"--n-color-checked-hover":S,"--n-color-checked-pressed":C,"--n-color-hover-checkable":y,"--n-color-pressed-checkable":b,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":f,"--n-padding":s,"--n-text-color":i||N,"--n-text-color-checkable":p,"--n-text-color-checked":_,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),x=i?p(`tag`,A(()=>{let t=``,{type:r,color:{color:i,textColor:o}={}}=e;return t+=r[0],t+=u.value[0],i&&(t+=`a${a(i)}`),o&&(t+=`b${a(o)}`),n.value&&(t+=`c`),t}),b,e):void 0;return{...v,rtlEnabled:y,mergedClsPrefix:r,contentRef:t,mergedBordered:n,handleClick:h,handleCloseClick:_,cssVars:i?void 0:b,themeClass:x?.themeClass,onRender:x?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:t,closable:i,color:{borderColor:a}={},round:o,onRender:s,$slots:c}=this;s?.();let f=n(c.avatar,t=>t&&(d(),u(`div`,{class:O(`${e}-tag__avatar`)},[E(()=>t)],2))),p=n(c.icon,t=>t&&(d(),u(`div`,{class:O(`${e}-tag__icon`)},[E(()=>t)],2)));return d(),u(`div`,{class:O([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:t,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:o,[`${e}-tag--avatar`]:f,[`${e}-tag--icon`]:p,[`${e}-tag--closable`]:i}]),style:h(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[E(()=>p||f),l(`span`,{class:O(`${e}-tag__content`),ref:`contentRef`},[E(()=>this.$slots.default?.())],2),!this.checkable&&i?(d(),r(F,{key:0,clsPrefix:e,class:O(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:o,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):E(()=>null),!this.checkable&&this.mergedBordered?(d(),u(`div`,{key:2,class:O(`${e}-tag__border`),style:h({borderColor:a})},null,6)):E(()=>null)],46,B)}}),W=_(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[D(`color-transition`,{transition:`color .3s var(--n-bezier)`}),D(`depth`,{color:`var(--n-color)`},[t(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),t(`svg`,{height:`1em`,width:`1em`})]),G={...m.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},K=x({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:G,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=k(e),r=m(`Icon`,`-icon`,W,P,e,t),i=A(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),a=n?p(`icon`,A(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:A(()=>{let{size:t,color:n}=e;return{fontSize:M(t),color:n}}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:a,themeClass:o}=this;return e?.$options?._n_icon__&&i(`icon`,"don't wrap `n-icon` inside `n-icon`"),a?.(),b(`i`,s(this.$attrs,{role:`img`,class:[`${n}-icon`,o,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?b(r):this.$slots.default?.())}});export{U as n,H as r,K as t};