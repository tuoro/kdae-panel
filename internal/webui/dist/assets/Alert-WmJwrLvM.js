import{$ as e,An as t,B as n,Cn as r,En as i,F as a,In as o,R as s,Sn as c,T as l,Wn as u,X as d,Y as f,en as p,et as m,in as h,on as g,ot as _,pt as v,q as y,rn as b,tn as x,tt as S,ur as C,ut as w,vt as T,wn as E}from"./client-BDSaduAi.js";import{B as D,G as O,H as k,U as A,V as j,W as M,z as N}from"./index-LlkbWj36.js";function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:l,closeColorPressed:u,closeIconColor:d,closeIconColorHover:f,closeIconColorPressed:p,infoColor:h,successColor:g,warningColor:_,errorColor:v,fontSize:y}=e;return{...M,fontSize:y,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:l,closeColorPressed:u,closeIconColor:d,closeIconColorHover:f,closeIconColorPressed:p,borderInfo:`1px solid ${S(i,m(h,{alpha:.25}))}`,colorInfo:S(i,m(h,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:h,contentTextColorInfo:c,closeColorHoverInfo:l,closeColorPressedInfo:u,closeIconColorInfo:d,closeIconColorHoverInfo:f,closeIconColorPressedInfo:p,borderSuccess:`1px solid ${S(i,m(g,{alpha:.25}))}`,colorSuccess:S(i,m(g,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:g,contentTextColorSuccess:c,closeColorHoverSuccess:l,closeColorPressedSuccess:u,closeIconColorSuccess:d,closeIconColorHoverSuccess:f,closeIconColorPressedSuccess:p,borderWarning:`1px solid ${S(i,m(_,{alpha:.33}))}`,colorWarning:S(i,m(_,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:_,contentTextColorWarning:c,closeColorHoverWarning:l,closeColorPressedWarning:u,closeIconColorWarning:d,closeIconColorHoverWarning:f,closeIconColorPressedWarning:p,borderError:`1px solid ${S(i,m(v,{alpha:.25}))}`,colorError:S(i,m(v,{alpha:.08})),titleTextColorError:s,iconColorError:v,contentTextColorError:c,closeColorHoverError:l,closeColorPressedError:u,closeIconColorError:d,closeIconColorHoverError:f,closeIconColorPressedError:p}}var F={name:`Alert`,common:e,self:P},I=x(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[b(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),h(`closable`,[x(`alert-body`,[b(`title`,`
 padding-right: 24px;
 `)])]),b(`icon`,{color:`var(--n-icon-color)`}),x(`alert-body`,{padding:`var(--n-padding)`},[b(`title`,{color:`var(--n-title-text-color)`}),b(`content`,{color:`var(--n-content-text-color)`})]),N({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),b(`icon`,`
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
 `),b(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),h(`show-icon`,[x(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),h(`right-adjust`,[x(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),x(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[b(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[p(`& +`,[b(`content`,{marginTop:`9px`})])]),b(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),b(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...f.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=t({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,inlineThemeDisabled:r,mergedRtlRef:i}=T(e),o=f(`Alert`,`-alert`,I,F,e,t),s=a(`Alert`,i,t),l=c(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=o.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:s,iconSize:c,iconMargin:l,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:h,padding:v}=n,{type:y}=e,{left:b,right:x}=_(l);return{"--n-bezier":t,"--n-color":n[g(`color`,y)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":n[g(`closeColorHover`,y)],"--n-close-color-pressed":n[g(`closeColorPressed`,y)],"--n-close-icon-color":n[g(`closeIconColor`,y)],"--n-close-icon-color-hover":n[g(`closeIconColorHover`,y)],"--n-close-icon-color-pressed":n[g(`closeIconColorPressed`,y)],"--n-icon-color":n[g(`iconColor`,y)],"--n-border":n[g(`border`,y)],"--n-title-text-color":n[g(`titleTextColor`,y)],"--n-content-text-color":n[g(`contentTextColor`,y)],"--n-line-height":s,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":h,"--n-padding":v,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),u=r?d(`alert`,c(()=>e.type[0]),l,e):void 0,p=C(!0),m=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:s,mergedClsPrefix:t,mergedBordered:n,visible:p,handleCloseClick:()=>{Promise.resolve(e.onClose?.()).then(e=>{e!==!1&&(p.value=!1)})},handleAfterLeave:()=>{m()},mergedTheme:o,cssVars:r?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){return this.onRender?.(),u(),E(l,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:t}=this,a={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(u(),i(`div`,o({key:1},o(this.$attrs,a)),[v(()=>this.closable&&(u(),E(O,{clsPrefix:e,class:w(`${e}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),v(()=>this.bordered&&(u(),i(`div`,{class:w(`${e}-alert__border`)},null,2))),v(()=>this.showIcon&&(u(),i(`div`,{class:w(`${e}-alert__icon`),"aria-hidden":`true`},[v(()=>s(t.icon,()=>[(u(),E(y,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return u(),E(j,{key:3});case`info`:return u(),E(k,{key:4});case`warning`:return u(),E(D,{key:5});case`error`:return u(),E(A,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),r(`div`,{class:w([`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`])},[v(()=>n(t.header,t=>{let n=t||this.title;return n?(u(),i(`div`,{key:2,class:w(`${e}-alert-body__title`)},[v(()=>n)],2)):null})),v(()=>t.default&&(u(),i(`div`,{class:w(`${e}-alert-body__content`)},[v(()=>t.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};