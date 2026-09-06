import{$ as e,G as t,Gt as n,H as r,Ht as i,Jt as a,Kt as o,M as s,Mn as c,P as l,Qn as u,T as d,U as f,Ut as p,V as m,W as h,X as g,dn as _,fn as v,k as y,mn as b,nt as x,st as S,un as C,vn as w,wn as T,z as E}from"./client-DkW07njR.js";import{a as D,i as O,n as k,o as A,r as j,s as M,t as N}from"./fade-in-height-expand.cssr-DNkZo7mN.js";function P(e){let{lineHeight:n,borderRadius:r,fontWeightStrong:i,baseColor:a,dividerColor:o,actionColor:s,textColor1:c,textColor2:l,closeColorHover:u,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:m,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return{...A,fontSize:b,lineHeight:n,titleFontWeight:i,borderRadius:r,border:`1px solid ${o}`,color:s,titleTextColor:c,iconColor:l,contentTextColor:l,closeBorderRadius:r,closeColorHover:u,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:m,borderInfo:`1px solid ${t(a,h(g,{alpha:.25}))}`,colorInfo:t(a,h(g,{alpha:.08})),titleTextColorInfo:c,iconColorInfo:g,contentTextColorInfo:l,closeColorHoverInfo:u,closeColorPressedInfo:d,closeIconColorInfo:f,closeIconColorHoverInfo:p,closeIconColorPressedInfo:m,borderSuccess:`1px solid ${t(a,h(_,{alpha:.25}))}`,colorSuccess:t(a,h(_,{alpha:.08})),titleTextColorSuccess:c,iconColorSuccess:_,contentTextColorSuccess:l,closeColorHoverSuccess:u,closeColorPressedSuccess:d,closeIconColorSuccess:f,closeIconColorHoverSuccess:p,closeIconColorPressedSuccess:m,borderWarning:`1px solid ${t(a,h(v,{alpha:.33}))}`,colorWarning:t(a,h(v,{alpha:.08})),titleTextColorWarning:c,iconColorWarning:v,contentTextColorWarning:l,closeColorHoverWarning:u,closeColorPressedWarning:d,closeIconColorWarning:f,closeIconColorHoverWarning:p,closeIconColorPressedWarning:m,borderError:`1px solid ${t(a,h(y,{alpha:.25}))}`,colorError:t(a,h(y,{alpha:.08})),titleTextColorError:c,iconColorError:y,contentTextColorError:l,closeColorHoverError:u,closeColorPressedError:d,closeIconColorError:f,closeIconColorHoverError:p,closeIconColorPressedError:m}}var F={name:`Alert`,common:f,self:P},I=p(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[n(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),o(`closable`,[p(`alert-body`,[n(`title`,`
 padding-right: 24px;
 `)])]),n(`icon`,{color:`var(--n-icon-color)`}),p(`alert-body`,{padding:`var(--n-padding)`},[n(`title`,{color:`var(--n-title-text-color)`}),n(`content`,{color:`var(--n-content-text-color)`})]),N({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),n(`icon`,`
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
 `),n(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),o(`show-icon`,[p(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),o(`right-adjust`,[p(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),p(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[n(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[i(`& +`,[n(`content`,{marginTop:`9px`})])]),n(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),n(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...m.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=w({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,inlineThemeDisabled:i,mergedRtlRef:o}=S(e),s=m(`Alert`,`-alert`,I,F,e,t),c=y(`Alert`,o,t),l=C(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=s.value,{fontSize:r,borderRadius:i,titleFontWeight:o,lineHeight:c,iconSize:l,iconMargin:u,iconMarginRtl:d,closeIconSize:f,closeBorderRadius:p,closeSize:m,closeMargin:h,closeMarginRtl:_,padding:v}=n,{type:y}=e,{left:b,right:x}=g(u);return{"--n-bezier":t,"--n-color":n[a(`color`,y)],"--n-close-icon-size":f,"--n-close-border-radius":p,"--n-close-color-hover":n[a(`closeColorHover`,y)],"--n-close-color-pressed":n[a(`closeColorPressed`,y)],"--n-close-icon-color":n[a(`closeIconColor`,y)],"--n-close-icon-color-hover":n[a(`closeIconColorHover`,y)],"--n-close-icon-color-pressed":n[a(`closeIconColorPressed`,y)],"--n-icon-color":n[a(`iconColor`,y)],"--n-border":n[a(`border`,y)],"--n-title-text-color":n[a(`titleTextColor`,y)],"--n-content-text-color":n[a(`contentTextColor`,y)],"--n-line-height":c,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":o,"--n-icon-size":l,"--n-icon-margin":u,"--n-icon-margin-rtl":d,"--n-close-size":m,"--n-close-margin":h,"--n-close-margin-rtl":_,"--n-padding":v,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),d=i?r(`alert`,C(()=>e.type[0]),l,e):void 0,f=u(!0),p=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:c,mergedClsPrefix:t,mergedBordered:n,visible:f,handleCloseClick:()=>{Promise.resolve(e.onClose?.()).then(e=>{e!==!1&&(f.value=!1)})},handleAfterLeave:()=>{p()},mergedTheme:s,cssVars:i?void 0:l,themeClass:d?.themeClass,onRender:d?.onRender}},render(){return this.onRender?.(),c(),v(d,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:t,$slots:n}=this,r={class:[`${t}-alert`,this.themeClass,this.closable&&`${t}-alert--closable`,this.showIcon&&`${t}-alert--show-icon`,!this.title&&this.closable&&`${t}-alert--right-adjust`,this.rtlEnabled&&`${t}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(c(),b(`div`,T({key:1},T(this.$attrs,r)),[x(()=>this.closable&&(c(),v(M,{clsPrefix:t,class:e(`${t}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),x(()=>this.bordered&&(c(),b(`div`,{class:e(`${t}-alert__border`)},null,2))),x(()=>this.showIcon&&(c(),b(`div`,{class:e(`${t}-alert__icon`),"aria-hidden":`true`},[x(()=>s(n.icon,()=>[(c(),v(E,{clsPrefix:t},{default:()=>{switch(this.type){case`success`:return c(),v(j,{key:3});case`info`:return c(),v(O,{key:4});case`warning`:return c(),v(k,{key:5});case`error`:return c(),v(D,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),_(`div`,{class:e([`${t}-alert-body`,this.mergedBordered&&`${t}-alert-body--bordered`])},[x(()=>l(n.header,n=>{let r=n||this.title;return r?(c(),b(`div`,{key:2,class:e(`${t}-alert-body__title`)},[x(()=>r)],2)):null})),x(()=>n.default&&(c(),b(`div`,{class:e(`${t}-alert-body__content`)},[x(()=>n.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};