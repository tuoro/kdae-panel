import{$t as e,An as t,Dt as n,En as r,Et as i,Jt as a,Nt as o,P as s,Qt as c,Rt as l,Wt as u,Yt as d,Zt as f,en as p,ft as m,gn as h,j as g,pt as _,rr as v,sr as y,wn as b,wt as x,x as S,xt as C,zn as w}from"./client-7ydMUZih.js";import{r as T}from"./text-DpqooQtL.js";import{r as E,t as D}from"./light-ZcTCvkLS.js";import{r as O}from"./fade-in-height-expand.cssr-B8WMQWpp.js";function k(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:u,borderColor:d,opacityDisabled:f,tagColor:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:w,heightMedium:T,closeColorHover:D,closeColorPressed:O,buttonColor2Hover:k,buttonColor2Pressed:A,fontWeightStrong:j}=e;return Object.assign(Object.assign({},E),{closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:w,heightLarge:T,borderRadius:_,opacityDisabled:f,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:u,colorCheckable:`#0000`,colorHoverCheckable:k,colorPressedCheckable:A,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${d}`,textColor:t,color:p,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:D,closeColorPressed:O,borderPrimary:`1px solid ${l(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:l(i,{alpha:.12}),colorBorderedPrimary:l(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:l(i,{alpha:.12}),closeColorPressedPrimary:l(i,{alpha:.18}),borderInfo:`1px solid ${l(a,{alpha:.3})}`,textColorInfo:a,colorInfo:l(a,{alpha:.12}),colorBorderedInfo:l(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:l(a,{alpha:.12}),closeColorPressedInfo:l(a,{alpha:.18}),borderSuccess:`1px solid ${l(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:l(o,{alpha:.12}),colorBorderedSuccess:l(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:l(o,{alpha:.12}),closeColorPressedSuccess:l(o,{alpha:.18}),borderWarning:`1px solid ${l(s,{alpha:.35})}`,textColorWarning:s,colorWarning:l(s,{alpha:.15}),colorBorderedWarning:l(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:l(s,{alpha:.12}),closeColorPressedWarning:l(s,{alpha:.18}),borderError:`1px solid ${l(c,{alpha:.23})}`,textColorError:c,colorError:l(c,{alpha:.1}),colorBorderedError:l(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:l(c,{alpha:.12}),closeColorPressedError:l(c,{alpha:.18})})}var A={name:`Tag`,common:S,self:k},j={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},M=d(`tag`,`
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
`,[c(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),f(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),f(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),f(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),f(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),c(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[f(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),f(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),c(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),c(`icon, avatar`,[c(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),c(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),c(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[e(`disabled`,[a(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[e(`checked`,`color: var(--n-text-color-hover-checkable);`)]),a(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[e(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),c(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[e(`disabled`,[a(`&:hover`,`background-color: var(--n-color-checked-hover);`),a(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),N=Object.assign(Object.assign(Object.assign({},g.props),j),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),P=o(`n-tag`),F=b({name:`Tag`,props:N,slots:Object,setup(e){let t=v(null),{mergedBorderedRef:r,mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedRtlRef:o,mergedComponentPropsRef:c}=_(e),l=h(()=>e.size||c?.value?.Tag?.size||`medium`),d=g(`Tag`,`-tag`,M,A,e,i);w(P,{roundRef:y(e,`round`)});function f(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function b(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&x(n,t)}}let S={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},C=s(`Tag`,o,i),T=h(()=>{let{type:t,color:{color:n,textColor:i}={}}=e,a=l.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:f,opacityDisabled:m,textColorCheckable:h,textColorHoverCheckable:g,textColorPressedCheckable:_,textColorChecked:v,colorCheckable:y,colorHoverCheckable:b,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[p(`colorBordered`,t)]:D,[p(`closeSize`,a)]:O,[p(`closeIconSize`,a)]:k,[p(`fontSize`,a)]:A,[p(`height`,a)]:j,[p(`color`,t)]:M,[p(`textColor`,t)]:N,[p(`border`,t)]:P,[p(`closeIconColor`,t)]:F,[p(`closeIconColorHover`,t)]:I,[p(`closeIconColorPressed`,t)]:L,[p(`closeColorHover`,t)]:R,[p(`closeColorPressed`,t)]:z}}=d.value,B=u(c);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":o,"--n-border-radius":f,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":n||(r.value?D:M),"--n-color-checkable":y,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":b,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":m,"--n-padding":s,"--n-text-color":i||N,"--n-text-color-checkable":h,"--n-text-color-checked":v,"--n-text-color-hover-checkable":g,"--n-text-color-pressed-checkable":_}}),E=a?m(`tag`,h(()=>{let t=``,{type:i,color:{color:a,textColor:o}={}}=e;return t+=i[0],t+=l.value[0],a&&(t+=`a${n(a)}`),o&&(t+=`b${n(o)}`),r.value&&(t+=`c`),t}),T,e):void 0;return Object.assign(Object.assign({},S),{rtlEnabled:C,mergedClsPrefix:i,contentRef:t,mergedBordered:r,handleClick:f,handleCloseClick:b,cssVars:a?void 0:T,themeClass:E?.themeClass,onRender:E?.onRender})},render(){var e;let{mergedClsPrefix:t,rtlEnabled:n,closable:i,color:{borderColor:a}={},round:o,onRender:s,$slots:c}=this;s?.();let l=C(c.avatar,e=>e&&r(`div`,{class:`${t}-tag__avatar`},e)),u=C(c.icon,e=>e&&r(`div`,{class:`${t}-tag__icon`},e));return r(`div`,{class:[`${t}-tag`,this.themeClass,{[`${t}-tag--rtl`]:n,[`${t}-tag--strong`]:this.strong,[`${t}-tag--disabled`]:this.disabled,[`${t}-tag--checkable`]:this.checkable,[`${t}-tag--checked`]:this.checkable&&this.checked,[`${t}-tag--round`]:o,[`${t}-tag--avatar`]:l,[`${t}-tag--icon`]:u,[`${t}-tag--closable`]:i}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},u||l,r(`span`,{class:`${t}-tag__content`,ref:`contentRef`},(e=this.$slots).default?.call(e)),!this.checkable&&i?r(O,{clsPrefix:t,class:`${t}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:o,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?r(`div`,{class:`${t}-tag__border`,style:{borderColor:a}}):null)}}),I=d(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[c(`color-transition`,{transition:`color .3s var(--n-bezier)`}),c(`depth`,{color:`var(--n-color)`},[a(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),a(`svg`,{height:`1em`,width:`1em`})]),L=Object.assign(Object.assign({},g.props),{depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]}),R=b({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:L,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=_(e),r=g(`Icon`,`-icon`,I,D,e,t),i=h(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),a=n?m(`icon`,h(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:h(()=>{let{size:t,color:n}=e;return{fontSize:T(t),color:n}}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$parent:e,depth:n,mergedClsPrefix:a,component:o,onRender:s,themeClass:c}=this;return e?.$options?._n_icon__&&i(`icon`,"don't wrap `n-icon` inside `n-icon`"),s?.(),r(`i`,t(this.$attrs,{role:`img`,class:[`${a}-icon`,c,{[`${a}-icon--depth`]:n,[`${a}-icon--color-transition`]:n!==void 0}],style:[this.cssVars,this.mergedStyle]}),o?r(o):this.$slots)}});export{F as n,P as r,R as t};