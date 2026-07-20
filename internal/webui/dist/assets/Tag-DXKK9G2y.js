import{R as so,bW as to,bX as e,s as io,T as u,z as m,$ as z,x as I,d as ho,C as D,n as x,bY as go,D as bo,E as V,ay as Co,F as vo,r as uo,Z as po,G as w,N as d,b8 as fo,O as U,q as ko,X as mo,_ as xo}from"./index-98BUdM3h.js";function yo(c){const{textColor2:g,primaryColorHover:r,primaryColorPressed:p,primaryColor:a,infoColor:i,successColor:n,warningColor:s,errorColor:t,baseColor:f,borderColor:k,opacityDisabled:b,tagColor:S,closeIconColor:y,closeIconColorHover:v,closeIconColorPressed:o,borderRadiusSmall:l,fontSizeMini:C,fontSizeTiny:h,fontSizeSmall:B,fontSizeMedium:$,heightMini:H,heightTiny:R,heightSmall:M,heightMedium:T,closeColorHover:_,closeColorPressed:E,buttonColor2Hover:O,buttonColor2Pressed:W,fontWeightStrong:j}=c;return Object.assign(Object.assign({},to),{closeBorderRadius:l,heightTiny:H,heightSmall:R,heightMedium:M,heightLarge:T,borderRadius:l,opacityDisabled:b,fontSizeTiny:C,fontSizeSmall:h,fontSizeMedium:B,fontSizeLarge:$,fontWeightStrong:j,textColorCheckable:g,textColorHoverCheckable:g,textColorPressedCheckable:g,textColorChecked:f,colorCheckable:"#0000",colorHoverCheckable:O,colorPressedCheckable:W,colorChecked:a,colorCheckedHover:r,colorCheckedPressed:p,border:`1px solid ${k}`,textColor:g,color:S,colorBordered:"rgb(250, 250, 252)",closeIconColor:y,closeIconColorHover:v,closeIconColorPressed:o,closeColorHover:_,closeColorPressed:E,borderPrimary:`1px solid ${e(a,{alpha:.3})}`,textColorPrimary:a,colorPrimary:e(a,{alpha:.12}),colorBorderedPrimary:e(a,{alpha:.1}),closeIconColorPrimary:a,closeIconColorHoverPrimary:a,closeIconColorPressedPrimary:a,closeColorHoverPrimary:e(a,{alpha:.12}),closeColorPressedPrimary:e(a,{alpha:.18}),borderInfo:`1px solid ${e(i,{alpha:.3})}`,textColorInfo:i,colorInfo:e(i,{alpha:.12}),colorBorderedInfo:e(i,{alpha:.1}),closeIconColorInfo:i,closeIconColorHoverInfo:i,closeIconColorPressedInfo:i,closeColorHoverInfo:e(i,{alpha:.12}),closeColorPressedInfo:e(i,{alpha:.18}),borderSuccess:`1px solid ${e(n,{alpha:.3})}`,textColorSuccess:n,colorSuccess:e(n,{alpha:.12}),colorBorderedSuccess:e(n,{alpha:.1}),closeIconColorSuccess:n,closeIconColorHoverSuccess:n,closeIconColorPressedSuccess:n,closeColorHoverSuccess:e(n,{alpha:.12}),closeColorPressedSuccess:e(n,{alpha:.18}),borderWarning:`1px solid ${e(s,{alpha:.35})}`,textColorWarning:s,colorWarning:e(s,{alpha:.15}),colorBorderedWarning:e(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:e(s,{alpha:.12}),closeColorPressedWarning:e(s,{alpha:.18}),borderError:`1px solid ${e(t,{alpha:.23})}`,textColorError:t,colorError:e(t,{alpha:.1}),colorBorderedError:e(t,{alpha:.08}),closeIconColorError:t,closeIconColorHoverError:t,closeIconColorPressedError:t,closeColorHoverError:e(t,{alpha:.12}),closeColorPressedError:e(t,{alpha:.18})})}const Po={common:so,self:yo},zo={color:Object,type:{type:String,default:"default"},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},Io=io("tag",`
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
`,[u("strong",`
 font-weight: var(--n-font-weight-strong);
 `),m("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),m("icon",`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),m("avatar",`
 display: flex;
 margin: 0 6px 0 0;
 `),m("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),u("round",`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[m("icon",`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),m("avatar",`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),u("closable",`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),u("icon, avatar",[u("round",`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),u("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),u("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[z("disabled",[I("&:hover","background-color: var(--n-color-hover-checkable);",[z("checked","color: var(--n-text-color-hover-checkable);")]),I("&:active","background-color: var(--n-color-pressed-checkable);",[z("checked","color: var(--n-text-color-pressed-checkable);")])]),u("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[z("disabled",[I("&:hover","background-color: var(--n-color-checked-hover);"),I("&:active","background-color: var(--n-color-checked-pressed);")])])])]),So=Object.assign(Object.assign(Object.assign({},V.props),zo),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),Bo=ko("n-tag"),Ho=ho({name:"Tag",props:So,slots:Object,setup(c){const g=uo(null),{mergedBorderedRef:r,mergedClsPrefixRef:p,inlineThemeDisabled:a,mergedRtlRef:i,mergedComponentPropsRef:n}=bo(c),s=w(()=>{var o,l;return c.size||((l=(o=n?.value)===null||o===void 0?void 0:o.Tag)===null||l===void 0?void 0:l.size)||"medium"}),t=V("Tag","-tag",Io,Po,c,p);mo(Bo,{roundRef:xo(c,"round")});function f(){if(!c.disabled&&c.checkable){const{checked:o,onCheckedChange:l,onUpdateChecked:C,"onUpdate:checked":h}=c;C&&C(!o),h&&h(!o),l&&l(!o)}}function k(o){if(c.triggerClickOnClose||o.stopPropagation(),!c.disabled){const{onClose:l}=c;l&&po(l,o)}}const b={setTextContent(o){const{value:l}=g;l&&(l.textContent=o)}},S=Co("Tag",i,p),y=w(()=>{const{type:o,color:{color:l,textColor:C}={}}=c,h=s.value,{common:{cubicBezierEaseInOut:B},self:{padding:$,closeMargin:H,borderRadius:R,opacityDisabled:M,textColorCheckable:T,textColorHoverCheckable:_,textColorPressedCheckable:E,textColorChecked:O,colorCheckable:W,colorHoverCheckable:j,colorPressedCheckable:K,colorChecked:L,colorCheckedHover:X,colorCheckedPressed:q,closeBorderRadius:A,fontWeightStrong:G,[d("colorBordered",o)]:Y,[d("closeSize",h)]:Z,[d("closeIconSize",h)]:J,[d("fontSize",h)]:Q,[d("height",h)]:F,[d("color",o)]:oo,[d("textColor",o)]:eo,[d("border",o)]:ro,[d("closeIconColor",o)]:N,[d("closeIconColorHover",o)]:lo,[d("closeIconColorPressed",o)]:co,[d("closeColorHover",o)]:ao,[d("closeColorPressed",o)]:no}}=t.value,P=fo(H);return{"--n-font-weight-strong":G,"--n-avatar-size-override":`calc(${F} - 8px)`,"--n-bezier":B,"--n-border-radius":R,"--n-border":ro,"--n-close-icon-size":J,"--n-close-color-pressed":no,"--n-close-color-hover":ao,"--n-close-border-radius":A,"--n-close-icon-color":N,"--n-close-icon-color-hover":lo,"--n-close-icon-color-pressed":co,"--n-close-icon-color-disabled":N,"--n-close-margin-top":P.top,"--n-close-margin-right":P.right,"--n-close-margin-bottom":P.bottom,"--n-close-margin-left":P.left,"--n-close-size":Z,"--n-color":l||(r.value?Y:oo),"--n-color-checkable":W,"--n-color-checked":L,"--n-color-checked-hover":X,"--n-color-checked-pressed":q,"--n-color-hover-checkable":j,"--n-color-pressed-checkable":K,"--n-font-size":Q,"--n-height":F,"--n-opacity-disabled":M,"--n-padding":$,"--n-text-color":C||eo,"--n-text-color-checkable":T,"--n-text-color-checked":O,"--n-text-color-hover-checkable":_,"--n-text-color-pressed-checkable":E}}),v=a?vo("tag",w(()=>{let o="";const{type:l,color:{color:C,textColor:h}={}}=c;return o+=l[0],o+=s.value[0],C&&(o+=`a${U(C)}`),h&&(o+=`b${U(h)}`),r.value&&(o+="c"),o}),y,c):void 0;return Object.assign(Object.assign({},b),{rtlEnabled:S,mergedClsPrefix:p,contentRef:g,mergedBordered:r,handleClick:f,handleCloseClick:k,cssVars:a?void 0:y,themeClass:v?.themeClass,onRender:v?.onRender})},render(){var c,g;const{mergedClsPrefix:r,rtlEnabled:p,closable:a,color:{borderColor:i}={},round:n,onRender:s,$slots:t}=this;s?.();const f=D(t.avatar,b=>b&&x("div",{class:`${r}-tag__avatar`},b)),k=D(t.icon,b=>b&&x("div",{class:`${r}-tag__icon`},b));return x("div",{class:[`${r}-tag`,this.themeClass,{[`${r}-tag--rtl`]:p,[`${r}-tag--strong`]:this.strong,[`${r}-tag--disabled`]:this.disabled,[`${r}-tag--checkable`]:this.checkable,[`${r}-tag--checked`]:this.checkable&&this.checked,[`${r}-tag--round`]:n,[`${r}-tag--avatar`]:f,[`${r}-tag--icon`]:k,[`${r}-tag--closable`]:a}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},k||f,x("span",{class:`${r}-tag__content`,ref:"contentRef"},(g=(c=this.$slots).default)===null||g===void 0?void 0:g.call(c)),!this.checkable&&a?x(go,{clsPrefix:r,class:`${r}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:n,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?x("div",{class:`${r}-tag__border`,style:{borderColor:i}}):null)}});export{Ho as N,Bo as t};
