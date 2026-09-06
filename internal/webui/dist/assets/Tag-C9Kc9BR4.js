import{$ as e,D as t,Gt as n,H as r,Ht as i,I as a,Jt as o,Kt as s,Mn as c,Nn as l,P as u,Qn as d,U as f,Ut as p,V as m,W as h,X as g,dn as _,fn as v,k as y,mn as b,nr as x,nt as S,or as C,qt as w,st as T,un as E,ut as D,vn as O}from"./client-DkW07njR.js";import{t as k}from"./_common-nwXWsiwW.js";import{s as A}from"./fade-in-height-expand.cssr-DNkZo7mN.js";function j(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:w,heightMedium:T,closeColorHover:E,closeColorPressed:D,buttonColor2Hover:O,buttonColor2Pressed:A,fontWeightStrong:j}=e;return{...k,closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:w,heightLarge:T,borderRadius:_,opacityDisabled:d,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:O,colorPressedCheckable:A,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:g,closeColorHover:E,closeColorPressed:D,borderPrimary:`1px solid ${h(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:h(i,{alpha:.12}),colorBorderedPrimary:h(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:h(i,{alpha:.12}),closeColorPressedPrimary:h(i,{alpha:.18}),borderInfo:`1px solid ${h(a,{alpha:.3})}`,textColorInfo:a,colorInfo:h(a,{alpha:.12}),colorBorderedInfo:h(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:h(a,{alpha:.12}),closeColorPressedInfo:h(a,{alpha:.18}),borderSuccess:`1px solid ${h(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:h(o,{alpha:.12}),colorBorderedSuccess:h(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:h(o,{alpha:.12}),closeColorPressedSuccess:h(o,{alpha:.18}),borderWarning:`1px solid ${h(s,{alpha:.35})}`,textColorWarning:s,colorWarning:h(s,{alpha:.15}),colorBorderedWarning:h(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:h(s,{alpha:.12}),closeColorPressedWarning:h(s,{alpha:.18}),borderError:`1px solid ${h(c,{alpha:.23})}`,textColorError:c,colorError:h(c,{alpha:.1}),colorBorderedError:h(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:h(c,{alpha:.12}),closeColorPressedError:h(c,{alpha:.18})}}var M={name:`Tag`,common:f,self:j},N={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},P=p(`tag`,`
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
`,[s(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),n(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),n(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),n(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),n(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),s(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[n(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),n(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),s(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),s(`icon, avatar`,[s(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),s(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),s(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[w(`disabled`,[i(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[w(`checked`,`color: var(--n-text-color-hover-checkable);`)]),i(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[w(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),s(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[w(`disabled`,[i(`&:hover`,`background-color: var(--n-color-checked-hover);`),i(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),F=[`onClick`,`onMouseenter`,`onMouseleave`],I={...m.props,...N,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},L=D(`n-tag`),R=O({name:`Tag`,props:I,slots:Object,setup(e){let n=d(null),{mergedBorderedRef:i,mergedClsPrefixRef:s,inlineThemeDisabled:c,mergedRtlRef:u,mergedComponentPropsRef:f}=T(e),p=E(()=>e.size||f?.value?.Tag?.size||`medium`),h=m(`Tag`,`-tag`,P,M,e,s);l(L,{roundRef:x(e,`round`)});function _(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function v(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&a(n,t)}}let b={setTextContent(e){let{value:t}=n;t&&(t.textContent=e)}},S=y(`Tag`,u,s),C=E(()=>{let{type:t,color:{color:n,textColor:r}={}}=e,a=p.value,{common:{cubicBezierEaseInOut:s},self:{padding:c,closeMargin:l,borderRadius:u,opacityDisabled:d,textColorCheckable:f,textColorHoverCheckable:m,textColorPressedCheckable:_,textColorChecked:v,colorCheckable:y,colorHoverCheckable:b,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[o(`colorBordered`,t)]:D,[o(`closeSize`,a)]:O,[o(`closeIconSize`,a)]:k,[o(`fontSize`,a)]:A,[o(`height`,a)]:j,[o(`color`,t)]:M,[o(`textColor`,t)]:N,[o(`border`,t)]:P,[o(`closeIconColor`,t)]:F,[o(`closeIconColorHover`,t)]:I,[o(`closeIconColorPressed`,t)]:L,[o(`closeColorHover`,t)]:R,[o(`closeColorPressed`,t)]:z}}=h.value,B=g(l);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":s,"--n-border-radius":u,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":n||(i.value?D:M),"--n-color-checkable":y,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":b,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":d,"--n-padding":c,"--n-text-color":r||N,"--n-text-color-checkable":f,"--n-text-color-checked":v,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":_}}),w=c?r(`tag`,E(()=>{let n=``,{type:r,color:{color:a,textColor:o}={}}=e;return n+=r[0],n+=p.value[0],a&&(n+=`a${t(a)}`),o&&(n+=`b${t(o)}`),i.value&&(n+=`c`),n}),C,e):void 0;return{...b,rtlEnabled:S,mergedClsPrefix:s,contentRef:n,mergedBordered:i,handleClick:_,handleCloseClick:v,cssVars:c?void 0:C,themeClass:w?.themeClass,onRender:w?.onRender}},render(){let{mergedClsPrefix:t,rtlEnabled:n,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:s}=this;o?.();let l=u(s.avatar,n=>n&&(c(),b(`div`,{class:e(`${t}-tag__avatar`)},[S(()=>n)],2))),d=u(s.icon,n=>n&&(c(),b(`div`,{class:e(`${t}-tag__icon`)},[S(()=>n)],2)));return c(),b(`div`,{class:e([`${t}-tag`,this.themeClass,{[`${t}-tag--rtl`]:n,[`${t}-tag--strong`]:this.strong,[`${t}-tag--disabled`]:this.disabled,[`${t}-tag--checkable`]:this.checkable,[`${t}-tag--checked`]:this.checkable&&this.checked,[`${t}-tag--round`]:a,[`${t}-tag--avatar`]:l,[`${t}-tag--icon`]:d,[`${t}-tag--closable`]:r}]),style:C(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[S(()=>d||l),_(`span`,{class:e(`${t}-tag__content`),ref:`contentRef`},[S(()=>this.$slots.default?.())],2),!this.checkable&&r?(c(),v(A,{key:0,clsPrefix:t,class:e(`${t}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):S(()=>null),!this.checkable&&this.mergedBordered?(c(),b(`div`,{key:2,class:e(`${t}-tag__border`),style:C({borderColor:i})},null,6)):S(()=>null)],46,F)}});export{L as n,R as t};