import{$ as e,$t as t,B as n,Cn as r,F as i,Fn as a,R as o,Sn as s,T as c,Tn as l,Un as u,X as d,Y as f,an as p,en as m,et as h,kn as g,lr as _,nn as v,ot as y,pt as b,q as x,rn as S,tt as C,ut as w,vt as T,xn as E}from"./client-3GjT0YO-.js";import{B as D,G as O,H as k,U as A,V as j,W as M,z as N}from"./index-CTeeybPj.js";function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:l,closeColorPressed:u,closeIconColor:d,closeIconColorHover:f,closeIconColorPressed:p,infoColor:m,successColor:g,warningColor:_,errorColor:v,fontSize:y}=e;return{...M,fontSize:y,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:l,closeColorPressed:u,closeIconColor:d,closeIconColorHover:f,closeIconColorPressed:p,borderInfo:`1px solid ${C(i,h(m,{alpha:.25}))}`,colorInfo:C(i,h(m,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:m,contentTextColorInfo:c,closeColorHoverInfo:l,closeColorPressedInfo:u,closeIconColorInfo:d,closeIconColorHoverInfo:f,closeIconColorPressedInfo:p,borderSuccess:`1px solid ${C(i,h(g,{alpha:.25}))}`,colorSuccess:C(i,h(g,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:g,contentTextColorSuccess:c,closeColorHoverSuccess:l,closeColorPressedSuccess:u,closeIconColorSuccess:d,closeIconColorHoverSuccess:f,closeIconColorPressedSuccess:p,borderWarning:`1px solid ${C(i,h(_,{alpha:.33}))}`,colorWarning:C(i,h(_,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:_,contentTextColorWarning:c,closeColorHoverWarning:l,closeColorPressedWarning:u,closeIconColorWarning:d,closeIconColorHoverWarning:f,closeIconColorPressedWarning:p,borderError:`1px solid ${C(i,h(v,{alpha:.25}))}`,colorError:C(i,h(v,{alpha:.08})),titleTextColorError:s,iconColorError:v,contentTextColorError:c,closeColorHoverError:l,closeColorPressedError:u,closeIconColorError:d,closeIconColorHoverError:f,closeIconColorPressedError:p}}var F={name:`Alert`,common:e,self:P},I=m(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[v(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),S(`closable`,[m(`alert-body`,[v(`title`,`
 padding-right: 24px;
 `)])]),v(`icon`,{color:`var(--n-icon-color)`}),m(`alert-body`,{padding:`var(--n-padding)`},[v(`title`,{color:`var(--n-title-text-color)`}),v(`content`,{color:`var(--n-content-text-color)`})]),N({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),v(`icon`,`
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
 `),v(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),S(`show-icon`,[m(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),S(`right-adjust`,[m(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),m(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[v(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[t(`& +`,[v(`content`,{marginTop:`9px`})])]),v(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),v(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...f.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=g({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,inlineThemeDisabled:r,mergedRtlRef:a}=T(e),o=f(`Alert`,`-alert`,I,F,e,t),s=i(`Alert`,a,t),c=E(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=o.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:s,iconSize:c,iconMargin:l,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:m,closeMargin:h,closeMarginRtl:g,padding:_}=n,{type:v}=e,{left:b,right:x}=y(l);return{"--n-bezier":t,"--n-color":n[p(`color`,v)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":n[p(`closeColorHover`,v)],"--n-close-color-pressed":n[p(`closeColorPressed`,v)],"--n-close-icon-color":n[p(`closeIconColor`,v)],"--n-close-icon-color-hover":n[p(`closeIconColorHover`,v)],"--n-close-icon-color-pressed":n[p(`closeIconColorPressed`,v)],"--n-icon-color":n[p(`iconColor`,v)],"--n-border":n[p(`border`,v)],"--n-title-text-color":n[p(`titleTextColor`,v)],"--n-content-text-color":n[p(`contentTextColor`,v)],"--n-line-height":s,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":m,"--n-close-margin":h,"--n-close-margin-rtl":g,"--n-padding":_,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),l=r?d(`alert`,E(()=>e.type[0]),c,e):void 0,u=_(!0),m=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:s,mergedClsPrefix:t,mergedBordered:n,visible:u,handleCloseClick:()=>{Promise.resolve(e.onClose?.()).then(e=>{e!==!1&&(u.value=!1)})},handleAfterLeave:()=>{m()},mergedTheme:o,cssVars:r?void 0:c,themeClass:l?.themeClass,onRender:l?.onRender}},render(){return this.onRender?.(),u(),r(c,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:t}=this,i={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(u(),l(`div`,a({key:1},a(this.$attrs,i)),[b(()=>this.closable&&(u(),r(O,{clsPrefix:e,class:w(`${e}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),b(()=>this.bordered&&(u(),l(`div`,{class:w(`${e}-alert__border`)},null,2))),b(()=>this.showIcon&&(u(),l(`div`,{class:w(`${e}-alert__icon`),"aria-hidden":`true`},[b(()=>o(t.icon,()=>[(u(),r(x,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return u(),r(j,{key:3});case`info`:return u(),r(k,{key:4});case`warning`:return u(),r(D,{key:5});case`error`:return u(),r(A,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),s(`div`,{class:w([`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`])},[b(()=>n(t.header,t=>{let n=t||this.title;return n?(u(),l(`div`,{key:2,class:w(`${e}-alert-body__title`)},[b(()=>n)],2)):null})),b(()=>t.default&&(u(),l(`div`,{class:w(`${e}-alert-body__content`)},[b(()=>t.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};