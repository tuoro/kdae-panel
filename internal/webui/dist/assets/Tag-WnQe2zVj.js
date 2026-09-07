import{B as e,D as t,F as n,Gt as r,H as i,Ht as a,Kt as o,Mn as s,N as c,O as l,Q as u,U as d,V as f,Vt as p,Wt as m,Y as h,Zn as g,_n as _,ar as v,dn as y,jn as b,ln as x,lt as S,ot as C,pn as w,qt as T,tr as E,tt as D,un as O}from"./client-aJ7VylDj.js";import{s as k}from"./fade-in-height-expand.cssr-BJwCRVuW.js";import{A}from"./index-CS_xLr4y.js";function j(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:f,tagColor:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:w,heightMedium:T,closeColorHover:E,closeColorPressed:D,buttonColor2Hover:O,buttonColor2Pressed:k,fontWeightStrong:j}=e;return{...A,closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:w,heightLarge:T,borderRadius:_,opacityDisabled:f,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:O,colorPressedCheckable:k,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:p,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:E,closeColorPressed:D,borderPrimary:`1px solid ${d(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:d(i,{alpha:.12}),colorBorderedPrimary:d(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:d(i,{alpha:.12}),closeColorPressedPrimary:d(i,{alpha:.18}),borderInfo:`1px solid ${d(a,{alpha:.3})}`,textColorInfo:a,colorInfo:d(a,{alpha:.12}),colorBorderedInfo:d(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:d(a,{alpha:.12}),closeColorPressedInfo:d(a,{alpha:.18}),borderSuccess:`1px solid ${d(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:d(o,{alpha:.12}),colorBorderedSuccess:d(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:d(o,{alpha:.12}),closeColorPressedSuccess:d(o,{alpha:.18}),borderWarning:`1px solid ${d(s,{alpha:.35})}`,textColorWarning:s,colorWarning:d(s,{alpha:.15}),colorBorderedWarning:d(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:d(s,{alpha:.12}),closeColorPressedWarning:d(s,{alpha:.18}),borderError:`1px solid ${d(c,{alpha:.23})}`,textColorError:c,colorError:d(c,{alpha:.1}),colorBorderedError:d(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:d(c,{alpha:.12}),closeColorPressedError:d(c,{alpha:.18})}}var M={name:`Tag`,common:i,self:j},N={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},P=a(`tag`,`
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
`,[r(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),m(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),m(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),m(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),m(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),r(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[m(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),m(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),r(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),r(`icon, avatar`,[r(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),r(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),r(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[o(`disabled`,[p(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[o(`checked`,`color: var(--n-text-color-hover-checkable);`)]),p(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[o(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),r(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[o(`disabled`,[p(`&:hover`,`background-color: var(--n-color-checked-hover);`),p(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),F=[`onClick`,`onMouseenter`,`onMouseleave`],I={...e.props,...N,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},L=S(`n-tag`),R=_({name:`Tag`,props:I,slots:Object,setup(r){let i=g(null),{mergedBorderedRef:a,mergedClsPrefixRef:o,inlineThemeDisabled:c,mergedRtlRef:u,mergedComponentPropsRef:d}=C(r),p=x(()=>r.size||d?.value?.Tag?.size||`medium`),m=e(`Tag`,`-tag`,P,M,r,o);s(L,{roundRef:E(r,`round`)});function _(){if(!r.disabled&&r.checkable){let{checked:e,onCheckedChange:t,onUpdateChecked:n,"onUpdate:checked":i}=r;n&&n(!e),i&&i(!e),t&&t(!e)}}function v(e){if(r.triggerClickOnClose||e.stopPropagation(),!r.disabled){let{onClose:t}=r;t&&n(t,e)}}let y={setTextContent(e){let{value:t}=i;t&&(t.textContent=e)}},b=l(`Tag`,u,o),S=x(()=>{let{type:e,color:{color:t,textColor:n}={}}=r,i=p.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:l,opacityDisabled:u,textColorCheckable:d,textColorHoverCheckable:f,textColorPressedCheckable:g,textColorChecked:_,colorCheckable:v,colorHoverCheckable:y,colorPressedCheckable:b,colorChecked:x,colorCheckedHover:S,colorCheckedPressed:C,closeBorderRadius:w,fontWeightStrong:E,[T(`colorBordered`,e)]:D,[T(`closeSize`,i)]:O,[T(`closeIconSize`,i)]:k,[T(`fontSize`,i)]:A,[T(`height`,i)]:j,[T(`color`,e)]:M,[T(`textColor`,e)]:N,[T(`border`,e)]:P,[T(`closeIconColor`,e)]:F,[T(`closeIconColorHover`,e)]:I,[T(`closeIconColorPressed`,e)]:L,[T(`closeColorHover`,e)]:R,[T(`closeColorPressed`,e)]:z}}=m.value,B=h(c);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":o,"--n-border-radius":l,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":w,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":t||(a.value?D:M),"--n-color-checkable":v,"--n-color-checked":x,"--n-color-checked-hover":S,"--n-color-checked-pressed":C,"--n-color-hover-checkable":y,"--n-color-pressed-checkable":b,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":u,"--n-padding":s,"--n-text-color":n||N,"--n-text-color-checkable":d,"--n-text-color-checked":_,"--n-text-color-hover-checkable":f,"--n-text-color-pressed-checkable":g}}),w=c?f(`tag`,x(()=>{let e=``,{type:n,color:{color:i,textColor:o}={}}=r;return e+=n[0],e+=p.value[0],i&&(e+=`a${t(i)}`),o&&(e+=`b${t(o)}`),a.value&&(e+=`c`),e}),S,r):void 0;return{...y,rtlEnabled:b,mergedClsPrefix:o,contentRef:i,mergedBordered:a,handleClick:_,handleCloseClick:v,cssVars:c?void 0:S,themeClass:w?.themeClass,onRender:w?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:t,closable:n,color:{borderColor:r}={},round:i,onRender:a,$slots:o}=this;a?.();let s=c(o.avatar,t=>t&&(b(),w(`div`,{class:u(`${e}-tag__avatar`)},[D(()=>t)],2))),l=c(o.icon,t=>t&&(b(),w(`div`,{class:u(`${e}-tag__icon`)},[D(()=>t)],2)));return b(),w(`div`,{class:u([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:t,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:i,[`${e}-tag--avatar`]:s,[`${e}-tag--icon`]:l,[`${e}-tag--closable`]:n}]),style:v(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[D(()=>l||s),O(`span`,{class:u(`${e}-tag__content`),ref:`contentRef`},[D(()=>this.$slots.default?.())],2),!this.checkable&&n?(b(),y(k,{key:0,clsPrefix:e,class:u(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:i,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):D(()=>null),!this.checkable&&this.mergedBordered?(b(),w(`div`,{key:2,class:u(`${e}-tag__border`),style:v({borderColor:r})},null,6)):D(()=>null)],46,F)}});export{L as n,R as t};