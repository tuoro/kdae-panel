import{d as J,c as Z,a as w,b as I,e as z,f,g as _,h as Q,i as X,j as N,k as c,m as Y,N as ee,r as oe,l as re,E as se,W as ne,I as te,S as le,n as ae,o as ie,u as ce,p as j,q as de,s as ue,t as B,v as k,w as ge,x as m,y as fe,z as pe,A as x,B as ve,C as me,D as W,F as h,G as b,H as $,J as he,K as be,L as Ce,M as we}from"./index-BPsA9wg7.js";import{_ as Ie,N as xe,a as E,b as H}from"./AuthShell.vue_vue_type_script_setup_true_lang-CsMoHZCZ.js";import{u as ye,N as ze}from"./text-ffxIDKcO.js";import"./use-locale-BWh0Y8eR.js";function Pe(n){const{lineHeight:o,borderRadius:u,fontWeightStrong:C,baseColor:t,dividerColor:g,actionColor:l,textColor1:p,textColor2:s,closeColorHover:i,closeColorPressed:e,closeIconColor:d,closeIconColorHover:y,closeIconColorPressed:a,infoColor:r,successColor:P,warningColor:S,errorColor:T,fontSize:R}=n;return Object.assign(Object.assign({},Z),{fontSize:R,lineHeight:o,titleFontWeight:C,borderRadius:u,border:`1px solid ${g}`,color:l,titleTextColor:p,iconColor:s,contentTextColor:s,closeBorderRadius:u,closeColorHover:i,closeColorPressed:e,closeIconColor:d,closeIconColorHover:y,closeIconColorPressed:a,borderInfo:`1px solid ${w(t,I(r,{alpha:.25}))}`,colorInfo:w(t,I(r,{alpha:.08})),titleTextColorInfo:p,iconColorInfo:r,contentTextColorInfo:s,closeColorHoverInfo:i,closeColorPressedInfo:e,closeIconColorInfo:d,closeIconColorHoverInfo:y,closeIconColorPressedInfo:a,borderSuccess:`1px solid ${w(t,I(P,{alpha:.25}))}`,colorSuccess:w(t,I(P,{alpha:.08})),titleTextColorSuccess:p,iconColorSuccess:P,contentTextColorSuccess:s,closeColorHoverSuccess:i,closeColorPressedSuccess:e,closeIconColorSuccess:d,closeIconColorHoverSuccess:y,closeIconColorPressedSuccess:a,borderWarning:`1px solid ${w(t,I(S,{alpha:.33}))}`,colorWarning:w(t,I(S,{alpha:.08})),titleTextColorWarning:p,iconColorWarning:S,contentTextColorWarning:s,closeColorHoverWarning:i,closeColorPressedWarning:e,closeIconColorWarning:d,closeIconColorHoverWarning:y,closeIconColorPressedWarning:a,borderError:`1px solid ${w(t,I(T,{alpha:.25}))}`,colorError:w(t,I(T,{alpha:.08})),titleTextColorError:p,iconColorError:T,contentTextColorError:s,closeColorHoverError:i,closeColorPressedError:e,closeIconColorError:d,closeIconColorHoverError:y,closeIconColorPressedError:a})}const Se={common:J,self:Pe},Te=z("alert",`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[f("border",`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),_("closable",[z("alert-body",[f("title",`
 padding-right: 24px;
 `)])]),f("icon",{color:"var(--n-icon-color)"}),z("alert-body",{padding:"var(--n-padding)"},[f("title",{color:"var(--n-title-text-color)"}),f("content",{color:"var(--n-content-text-color)"})]),Q({originalTransition:"transform .3s var(--n-bezier)",enterToProps:{transform:"scale(1)"},leaveToProps:{transform:"scale(0.9)"}}),f("icon",`
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
 `),f("close",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),_("show-icon",[z("alert-body",{paddingLeft:"calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))"})]),_("right-adjust",[z("alert-body",{paddingRight:"calc(var(--n-close-size) + var(--n-padding) + 2px)"})]),z("alert-body",`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[f("title",`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[X("& +",[f("content",{marginTop:"9px"})])]),f("content",{transition:"color .3s var(--n-bezier)",fontSize:"var(--n-font-size)"})]),f("icon",{transition:"color .3s var(--n-bezier)"})]),Re=Object.assign(Object.assign({},j.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:"default"},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),_e=N({name:"Alert",inheritAttrs:!1,props:Re,slots:Object,setup(n){const{mergedClsPrefixRef:o,mergedBorderedRef:u,inlineThemeDisabled:C,mergedRtlRef:t}=ce(n),g=j("Alert","-alert",Te,Se,n,o),l=de("Alert",t,o),p=B(()=>{const{common:{cubicBezierEaseInOut:a},self:r}=g.value,{fontSize:P,borderRadius:S,titleFontWeight:T,lineHeight:R,iconSize:F,iconMargin:A,iconMarginRtl:L,closeIconSize:M,closeBorderRadius:V,closeSize:O,closeMargin:K,closeMarginRtl:U,padding:q}=r,{type:v}=n,{left:D,right:G}=ge(A);return{"--n-bezier":a,"--n-color":r[m("color",v)],"--n-close-icon-size":M,"--n-close-border-radius":V,"--n-close-color-hover":r[m("closeColorHover",v)],"--n-close-color-pressed":r[m("closeColorPressed",v)],"--n-close-icon-color":r[m("closeIconColor",v)],"--n-close-icon-color-hover":r[m("closeIconColorHover",v)],"--n-close-icon-color-pressed":r[m("closeIconColorPressed",v)],"--n-icon-color":r[m("iconColor",v)],"--n-border":r[m("border",v)],"--n-title-text-color":r[m("titleTextColor",v)],"--n-content-text-color":r[m("contentTextColor",v)],"--n-line-height":R,"--n-border-radius":S,"--n-font-size":P,"--n-title-font-weight":T,"--n-icon-size":F,"--n-icon-margin":A,"--n-icon-margin-rtl":L,"--n-close-size":O,"--n-close-margin":K,"--n-close-margin-rtl":U,"--n-padding":q,"--n-icon-margin-left":D,"--n-icon-margin-right":G}}),s=C?ue("alert",B(()=>n.type[0]),p,n):void 0,i=k(!0),e=()=>{const{onAfterLeave:a,onAfterHide:r}=n;a&&a(),r&&r()};return{rtlEnabled:l,mergedClsPrefix:o,mergedBordered:u,visible:i,handleCloseClick:()=>{var a;Promise.resolve((a=n.onClose)===null||a===void 0?void 0:a.call(n)).then(r=>{r!==!1&&(i.value=!1)})},handleAfterLeave:()=>{e()},mergedTheme:g,cssVars:C?void 0:p,themeClass:s?.themeClass,onRender:s?.onRender}},render(){var n;return(n=this.onRender)===null||n===void 0||n.call(this),c(ie,{onAfterLeave:this.handleAfterLeave},{default:()=>{const{mergedClsPrefix:o,$slots:u}=this,C={class:[`${o}-alert`,this.themeClass,this.closable&&`${o}-alert--closable`,this.showIcon&&`${o}-alert--show-icon`,!this.title&&this.closable&&`${o}-alert--right-adjust`,this.rtlEnabled&&`${o}-alert--rtl`],style:this.cssVars,role:"alert"};return this.visible?c("div",Object.assign({},Y(this.$attrs,C)),this.closable&&c(ee,{clsPrefix:o,class:`${o}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&c("div",{class:`${o}-alert__border`}),this.showIcon&&c("div",{class:`${o}-alert__icon`,"aria-hidden":"true"},oe(u.icon,()=>[c(re,{clsPrefix:o},{default:()=>{switch(this.type){case"success":return c(le,null);case"info":return c(te,null);case"warning":return c(ne,null);case"error":return c(se,null);default:return null}}})])),c("div",{class:[`${o}-alert-body`,this.mergedBordered&&`${o}-alert-body--bordered`]},ae(u.header,t=>{const g=t||this.title;return g?c("div",{class:`${o}-alert-body__title`},g):null}),u.default&&c("div",{class:`${o}-alert-body__content`},u))):null}})}}),$e={class:"auth-form-heading"},Be=N({__name:"SetupView",setup(n){const o=fe(),u=ve(),C=ye(),t=k(null),g=k(!1),l=we({username:"admin",password:"",confirmPassword:""}),p={username:[{required:!0,message:"请输入用户名",trigger:["input","blur"]},{pattern:/^[A-Za-z0-9_-]{3,32}$/,message:"只能使用 3–32 位字母、数字、下划线和连字符",trigger:["input","blur"]}],password:[{required:!0,message:"请输入密码",trigger:["input","blur"]},{min:12,message:"密码至少需要 12 个字符",trigger:["input","blur"]}],confirmPassword:{validator:(i,e)=>e===l.password,message:"两次输入的密码不一致",trigger:["input","blur"]}};async function s(){await t.value?.validate(),g.value=!0;try{await o.setup({username:l.username,password:l.password}),C.success("管理员账户创建成功"),await u.replace({name:"dashboard"})}catch(i){C.error(i instanceof Error?i.message:"初始化失败")}finally{g.value=!1}}return(i,e)=>(me(),pe(Ie,{eyebrow:"FIRST RUN",title:"初始化 kdae-panel",description:"创建唯一的本地管理员账户。完成后，初始化接口将永久关闭。"},{default:x(()=>[W("div",$e,[e[4]||(e[4]=W("h2",null,"创建管理员",-1)),h(b(ze),{depth:"3"},{default:x(()=>[...e[3]||(e[3]=[$("密码使用 Argon2id 摘要保存，不会记录明文。",-1)])]),_:1})]),h(b(_e),{type:"warning",bordered:!1,class:"setup-warning"},{default:x(()=>[...e[5]||(e[5]=[$(" 首次初始化建议在本机完成；公开到网络前请先配置 HTTPS 与安全 Cookie。 ",-1)])]),_:1}),h(b(xe),{ref_key:"form",ref:t,model:l,rules:p,size:"large",onSubmit:he(s,["prevent"])},{default:x(()=>[h(b(E),{label:"管理员用户名",path:"username"},{default:x(()=>[h(b(H),{value:l.username,"onUpdate:value":e[0]||(e[0]=d=>l.username=d),autocomplete:"username"},null,8,["value"])]),_:1}),h(b(E),{label:"密码",path:"password"},{default:x(()=>[h(b(H),{value:l.password,"onUpdate:value":e[1]||(e[1]=d=>l.password=d),type:"password","show-password-on":"click",autocomplete:"new-password",placeholder:"至少 12 个字符"},null,8,["value"])]),_:1}),h(b(E),{label:"确认密码",path:"confirmPassword"},{default:x(()=>[h(b(H),{value:l.confirmPassword,"onUpdate:value":e[2]||(e[2]=d=>l.confirmPassword=d),type:"password","show-password-on":"click",autocomplete:"new-password",onKeyup:be(s,["enter"])},null,8,["value"])]),_:1}),h(b(Ce),{type:"primary",block:"","attr-type":"submit",loading:g.value},{default:x(()=>[...e[6]||(e[6]=[$("完成初始化",-1)])]),_:1},8,["loading"])]),_:1},8,["model"])]),_:1}))}});export{Be as default};
