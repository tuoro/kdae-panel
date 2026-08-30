import{$ as e,$t as t,Cn as n,Fn as r,J as i,K as a,L as o,P as s,Q as c,Sn as l,Tn as u,Un as d,Y as f,_t as p,an as m,at as h,en as g,et as _,ft as v,kn as y,lr as b,lt as x,nn as S,rn as C,w,xn as T,z as E}from"./client-DecrR2G0.js";import{B as D,G as O,H as k,U as A,V as j,W as M,z as N}from"./index-CBIB5M6s.js";function P(t){let{lineHeight:n,borderRadius:r,fontWeightStrong:i,baseColor:a,dividerColor:o,actionColor:s,textColor1:c,textColor2:l,closeColorHover:u,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:m,infoColor:h,successColor:g,warningColor:v,errorColor:y,fontSize:b}=t;return{...M,fontSize:b,lineHeight:n,titleFontWeight:i,borderRadius:r,border:`1px solid ${o}`,color:s,titleTextColor:c,iconColor:l,contentTextColor:l,closeBorderRadius:r,closeColorHover:u,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:m,borderInfo:`1px solid ${_(a,e(h,{alpha:.25}))}`,colorInfo:_(a,e(h,{alpha:.08})),titleTextColorInfo:c,iconColorInfo:h,contentTextColorInfo:l,closeColorHoverInfo:u,closeColorPressedInfo:d,closeIconColorInfo:f,closeIconColorHoverInfo:p,closeIconColorPressedInfo:m,borderSuccess:`1px solid ${_(a,e(g,{alpha:.25}))}`,colorSuccess:_(a,e(g,{alpha:.08})),titleTextColorSuccess:c,iconColorSuccess:g,contentTextColorSuccess:l,closeColorHoverSuccess:u,closeColorPressedSuccess:d,closeIconColorSuccess:f,closeIconColorHoverSuccess:p,closeIconColorPressedSuccess:m,borderWarning:`1px solid ${_(a,e(v,{alpha:.33}))}`,colorWarning:_(a,e(v,{alpha:.08})),titleTextColorWarning:c,iconColorWarning:v,contentTextColorWarning:l,closeColorHoverWarning:u,closeColorPressedWarning:d,closeIconColorWarning:f,closeIconColorHoverWarning:p,closeIconColorPressedWarning:m,borderError:`1px solid ${_(a,e(y,{alpha:.25}))}`,colorError:_(a,e(y,{alpha:.08})),titleTextColorError:c,iconColorError:y,contentTextColorError:l,closeColorHoverError:u,closeColorPressedError:d,closeIconColorError:f,closeIconColorHoverError:p,closeIconColorPressedError:m}}var F={name:`Alert`,common:c,self:P},I=g(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[S(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),C(`closable`,[g(`alert-body`,[S(`title`,`
 padding-right: 24px;
 `)])]),S(`icon`,{color:`var(--n-icon-color)`}),g(`alert-body`,{padding:`var(--n-padding)`},[S(`title`,{color:`var(--n-title-text-color)`}),S(`content`,{color:`var(--n-content-text-color)`})]),N({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),S(`icon`,`
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `),S(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),C(`show-icon`,[g(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),C(`right-adjust`,[g(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),g(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[S(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[t(`& +`,[S(`content`,{marginTop:`9px`})])]),S(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),S(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...i.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=y({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,inlineThemeDisabled:r,mergedRtlRef:a}=p(e),o=i(`Alert`,`-alert`,I,F,e,t),c=s(`Alert`,a,t),l=T(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=o.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:s,iconSize:c,iconMargin:l,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:g,closeMarginRtl:_,padding:v}=n,{type:y}=e,{left:b,right:x}=h(l);return{"--n-bezier":t,"--n-color":n[m(`color`,y)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":n[m(`closeColorHover`,y)],"--n-close-color-pressed":n[m(`closeColorPressed`,y)],"--n-close-icon-color":n[m(`closeIconColor`,y)],"--n-close-icon-color-hover":n[m(`closeIconColorHover`,y)],"--n-close-icon-color-pressed":n[m(`closeIconColorPressed`,y)],"--n-icon-color":n[m(`iconColor`,y)],"--n-border":n[m(`border`,y)],"--n-title-text-color":n[m(`titleTextColor`,y)],"--n-content-text-color":n[m(`contentTextColor`,y)],"--n-line-height":s,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":g,"--n-close-margin-rtl":_,"--n-padding":v,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),u=r?f(`alert`,T(()=>e.type[0]),l,e):void 0,d=b(!0),g=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:c,mergedClsPrefix:t,mergedBordered:n,visible:d,handleCloseClick:()=>{Promise.resolve(e.onClose?.()).then(e=>{e!==!1&&(d.value=!1)})},handleAfterLeave:()=>{g()},mergedTheme:o,cssVars:r?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){return this.onRender?.(),d(),n(w,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:t}=this,i={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(d(),u(`div`,r({key:1},r(this.$attrs,i)),[v(()=>this.closable&&(d(),n(O,{clsPrefix:e,class:x(`${e}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),v(()=>this.bordered&&(d(),u(`div`,{class:x(`${e}-alert__border`)},null,2))),v(()=>this.showIcon&&(d(),u(`div`,{class:x(`${e}-alert__icon`),"aria-hidden":`true`},[v(()=>o(t.icon,()=>[(d(),n(a,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return d(),n(j,{key:3});case`info`:return d(),n(k,{key:4});case`warning`:return d(),n(D,{key:5});case`error`:return d(),n(A,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),l(`div`,{class:x([`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`])},[v(()=>E(t.header,t=>{let n=t||this.title;return n?(d(),u(`div`,{key:2,class:x(`${e}-alert-body__title`)},[v(()=>n)],2)):null})),v(()=>t.default&&(d(),u(`div`,{class:x(`${e}-alert-body__content`)},[v(()=>t.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};