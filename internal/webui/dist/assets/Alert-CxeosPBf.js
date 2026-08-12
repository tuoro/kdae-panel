import{An as e,En as t,Jt as n,P as r,Qt as i,Rt as a,T as o,Wt as s,Yt as c,Zt as l,en as u,ft as d,gn as f,j as p,k as m,pt as h,rr as g,wn as _,x as v,xt as y,yt as b,zt as x}from"./client-7ydMUZih.js";import{a as S,i as C,n as w,o as T,r as E,s as D,t as O}from"./fade-in-height-expand.cssr-B8WMQWpp.js";function k(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:o,actionColor:s,textColor1:c,textColor2:l,closeColorHover:u,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:m,infoColor:h,successColor:g,warningColor:_,errorColor:v,fontSize:y}=e;return Object.assign(Object.assign({},w),{fontSize:y,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${o}`,color:s,titleTextColor:c,iconColor:l,contentTextColor:l,closeBorderRadius:n,closeColorHover:u,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:m,borderInfo:`1px solid ${x(i,a(h,{alpha:.25}))}`,colorInfo:x(i,a(h,{alpha:.08})),titleTextColorInfo:c,iconColorInfo:h,contentTextColorInfo:l,closeColorHoverInfo:u,closeColorPressedInfo:d,closeIconColorInfo:f,closeIconColorHoverInfo:p,closeIconColorPressedInfo:m,borderSuccess:`1px solid ${x(i,a(g,{alpha:.25}))}`,colorSuccess:x(i,a(g,{alpha:.08})),titleTextColorSuccess:c,iconColorSuccess:g,contentTextColorSuccess:l,closeColorHoverSuccess:u,closeColorPressedSuccess:d,closeIconColorSuccess:f,closeIconColorHoverSuccess:p,closeIconColorPressedSuccess:m,borderWarning:`1px solid ${x(i,a(_,{alpha:.33}))}`,colorWarning:x(i,a(_,{alpha:.08})),titleTextColorWarning:c,iconColorWarning:_,contentTextColorWarning:l,closeColorHoverWarning:u,closeColorPressedWarning:d,closeIconColorWarning:f,closeIconColorHoverWarning:p,closeIconColorPressedWarning:m,borderError:`1px solid ${x(i,a(v,{alpha:.25}))}`,colorError:x(i,a(v,{alpha:.08})),titleTextColorError:c,iconColorError:v,contentTextColorError:l,closeColorHoverError:u,closeColorPressedError:d,closeIconColorError:f,closeIconColorHoverError:p,closeIconColorPressedError:m})}var A={name:`Alert`,common:v,self:k},j=c(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[l(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),i(`closable`,[c(`alert-body`,[l(`title`,`
 padding-right: 24px;
 `)])]),l(`icon`,{color:`var(--n-icon-color)`}),c(`alert-body`,{padding:`var(--n-padding)`},[l(`title`,{color:`var(--n-title-text-color)`}),l(`content`,{color:`var(--n-content-text-color)`})]),O({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),l(`icon`,`
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
 `),l(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),i(`show-icon`,[c(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),i(`right-adjust`,[c(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),c(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[l(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[n(`& +`,[l(`content`,{marginTop:`9px`})])]),l(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),l(`icon`,{transition:`color .3s var(--n-bezier)`})]),M=Object.assign(Object.assign({},p.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),N=_({name:`Alert`,inheritAttrs:!1,props:M,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,inlineThemeDisabled:i,mergedRtlRef:a}=h(e),o=p(`Alert`,`-alert`,j,A,e,t),c=r(`Alert`,a,t),l=f(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=o.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:c,iconSize:l,iconMargin:d,iconMarginRtl:f,closeIconSize:p,closeBorderRadius:m,closeSize:h,closeMargin:g,closeMarginRtl:_,padding:v}=n,{type:y}=e,{left:b,right:x}=s(d);return{"--n-bezier":t,"--n-color":n[u(`color`,y)],"--n-close-icon-size":p,"--n-close-border-radius":m,"--n-close-color-hover":n[u(`closeColorHover`,y)],"--n-close-color-pressed":n[u(`closeColorPressed`,y)],"--n-close-icon-color":n[u(`closeIconColor`,y)],"--n-close-icon-color-hover":n[u(`closeIconColorHover`,y)],"--n-close-icon-color-pressed":n[u(`closeIconColorPressed`,y)],"--n-icon-color":n[u(`iconColor`,y)],"--n-border":n[u(`border`,y)],"--n-title-text-color":n[u(`titleTextColor`,y)],"--n-content-text-color":n[u(`contentTextColor`,y)],"--n-line-height":c,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":l,"--n-icon-margin":d,"--n-icon-margin-rtl":f,"--n-close-size":h,"--n-close-margin":g,"--n-close-margin-rtl":_,"--n-padding":v,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),m=i?d(`alert`,f(()=>e.type[0]),l,e):void 0,_=g(!0),v=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:c,mergedClsPrefix:t,mergedBordered:n,visible:_,handleCloseClick:()=>{Promise.resolve(e.onClose?.call(e)).then(e=>{e!==!1&&(_.value=!1)})},handleAfterLeave:()=>{v()},mergedTheme:o,cssVars:i?void 0:l,themeClass:m?.themeClass,onRender:m?.onRender}},render(){var n;return(n=this.onRender)==null||n.call(this),t(o,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:n,$slots:r}=this,i={class:[`${n}-alert`,this.themeClass,this.closable&&`${n}-alert--closable`,this.showIcon&&`${n}-alert--show-icon`,!this.title&&this.closable&&`${n}-alert--right-adjust`,this.rtlEnabled&&`${n}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?t(`div`,Object.assign({},e(this.$attrs,i)),this.closable&&t(E,{clsPrefix:n,class:`${n}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&t(`div`,{class:`${n}-alert__border`}),this.showIcon&&t(`div`,{class:`${n}-alert__icon`,"aria-hidden":`true`},b(r.icon,()=>[t(m,{clsPrefix:n},{default:()=>{switch(this.type){case`success`:return t(S,null);case`info`:return t(T,null);case`warning`:return t(C,null);case`error`:return t(D,null);default:return null}}})])),t(`div`,{class:[`${n}-alert-body`,this.mergedBordered&&`${n}-alert-body--bordered`]},y(r.header,e=>{let r=e||this.title;return r?t(`div`,{class:`${n}-alert-body__title`},r):null}),r.default&&t(`div`,{class:`${n}-alert-body__content`},r))):null}})}});export{N as t};