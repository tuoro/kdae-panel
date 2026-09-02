import{$ as e,An as t,B as n,Cn as r,D as i,En as a,F as o,Gn as s,H as c,In as l,Mn as u,Sn as d,Wn as f,X as p,Y as m,an as h,en as g,et as _,in as v,mr as y,on as b,ot as x,pt as S,rn as C,tn as w,ur as T,ut as E,vr as D,vt as O,wn as k,wt as A,xt as j}from"./client-BDSaduAi.js";import{r as M}from"./text-D9E8ig7N.js";import{r as N,t as P}from"./light-D4BiPys2.js";import{G as F}from"./index-LlkbWj36.js";function I(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:w,heightMedium:T,closeColorHover:E,closeColorPressed:D,buttonColor2Hover:O,buttonColor2Pressed:k,fontWeightStrong:A}=e;return{...N,closeBorderRadius:g,heightTiny:S,heightSmall:C,heightMedium:w,heightLarge:T,borderRadius:g,opacityDisabled:d,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:A,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:O,colorPressedCheckable:k,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:E,closeColorPressed:D,borderPrimary:`1px solid ${_(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:_(i,{alpha:.12}),colorBorderedPrimary:_(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:_(i,{alpha:.12}),closeColorPressedPrimary:_(i,{alpha:.18}),borderInfo:`1px solid ${_(a,{alpha:.3})}`,textColorInfo:a,colorInfo:_(a,{alpha:.12}),colorBorderedInfo:_(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:_(a,{alpha:.12}),closeColorPressedInfo:_(a,{alpha:.18}),borderSuccess:`1px solid ${_(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:_(o,{alpha:.12}),colorBorderedSuccess:_(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:_(o,{alpha:.12}),closeColorPressedSuccess:_(o,{alpha:.18}),borderWarning:`1px solid ${_(s,{alpha:.35})}`,textColorWarning:s,colorWarning:_(s,{alpha:.15}),colorBorderedWarning:_(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:_(s,{alpha:.12}),closeColorPressedWarning:_(s,{alpha:.18}),borderError:`1px solid ${_(c,{alpha:.23})}`,textColorError:c,colorError:_(c,{alpha:.1}),colorBorderedError:_(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:_(c,{alpha:.12}),closeColorPressedError:_(c,{alpha:.18})}}var L={name:`Tag`,common:e,self:I},R={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},z=w(`tag`,`
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
`,[v(`strong`,`
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
 `),v(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[C(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),C(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),v(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),v(`icon, avatar`,[v(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),v(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),v(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[h(`disabled`,[g(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[h(`checked`,`color: var(--n-text-color-hover-checkable);`)]),g(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[h(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),v(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[h(`disabled`,[g(`&:hover`,`background-color: var(--n-color-checked-hover);`),g(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),B=[`onClick`,`onMouseenter`,`onMouseleave`],V={...m.props,...R,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},H=j(`n-tag`),U=t({name:`Tag`,props:V,slots:Object,setup(e){let t=T(null),{mergedBorderedRef:n,mergedClsPrefixRef:r,inlineThemeDisabled:a,mergedRtlRef:l,mergedComponentPropsRef:u}=O(e),f=d(()=>e.size||u?.value?.Tag?.size||`medium`),h=m(`Tag`,`-tag`,z,L,e,r);s(H,{roundRef:y(e,`round`)});function g(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function _(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&c(n,t)}}let v={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},S=o(`Tag`,l,r),C=d(()=>{let{type:t,color:{color:r,textColor:i}={}}=e,a=f.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:l,opacityDisabled:u,textColorCheckable:d,textColorHoverCheckable:p,textColorPressedCheckable:m,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[b(`colorBordered`,t)]:D,[b(`closeSize`,a)]:O,[b(`closeIconSize`,a)]:k,[b(`fontSize`,a)]:A,[b(`height`,a)]:j,[b(`color`,t)]:M,[b(`textColor`,t)]:N,[b(`border`,t)]:P,[b(`closeIconColor`,t)]:F,[b(`closeIconColorHover`,t)]:I,[b(`closeIconColorPressed`,t)]:L,[b(`closeColorHover`,t)]:R,[b(`closeColorPressed`,t)]:z}}=h.value,B=x(c);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":o,"--n-border-radius":l,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":r||(n.value?D:M),"--n-color-checkable":_,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":u,"--n-padding":s,"--n-text-color":i||N,"--n-text-color-checkable":d,"--n-text-color-checked":g,"--n-text-color-hover-checkable":p,"--n-text-color-pressed-checkable":m}}),w=a?p(`tag`,d(()=>{let t=``,{type:r,color:{color:a,textColor:o}={}}=e;return t+=r[0],t+=f.value[0],a&&(t+=`a${i(a)}`),o&&(t+=`b${i(o)}`),n.value&&(t+=`c`),t}),C,e):void 0;return{...v,rtlEnabled:S,mergedClsPrefix:r,contentRef:t,mergedBordered:n,handleClick:g,handleCloseClick:_,cssVars:a?void 0:C,themeClass:w?.themeClass,onRender:w?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:t,closable:i,color:{borderColor:o}={},round:s,onRender:c,$slots:l}=this;c?.();let u=n(l.avatar,t=>t&&(f(),a(`div`,{class:E(`${e}-tag__avatar`)},[S(()=>t)],2))),d=n(l.icon,t=>t&&(f(),a(`div`,{class:E(`${e}-tag__icon`)},[S(()=>t)],2)));return f(),a(`div`,{class:E([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:t,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:s,[`${e}-tag--avatar`]:u,[`${e}-tag--icon`]:d,[`${e}-tag--closable`]:i}]),style:D(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[S(()=>d||u),r(`span`,{class:E(`${e}-tag__content`),ref:`contentRef`},[S(()=>this.$slots.default?.())],2),!this.checkable&&i?(f(),k(F,{key:0,clsPrefix:e,class:E(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:s,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):S(()=>null),!this.checkable&&this.mergedBordered?(f(),a(`div`,{key:2,class:E(`${e}-tag__border`),style:D({borderColor:o})},null,6)):S(()=>null)],46,B)}}),W=w(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[v(`color-transition`,{transition:`color .3s var(--n-bezier)`}),v(`depth`,{color:`var(--n-color)`},[g(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),g(`svg`,{height:`1em`,width:`1em`})]),G={...m.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},K=t({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:G,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=O(e),r=m(`Icon`,`-icon`,W,P,e,t),i=d(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),a=n?p(`icon`,d(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:d(()=>{let{size:t,color:n}=e;return{fontSize:M(t),color:n}}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&A(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),u(`i`,l(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?u(r):this.$slots.default?.())}});export{U as n,H as r,K as t};