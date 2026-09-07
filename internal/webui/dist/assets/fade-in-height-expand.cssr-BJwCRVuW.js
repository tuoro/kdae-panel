import{E as e,Gt as t,Ht as n,Kt as r,Q as i,R as a,Vn as o,Vt as s,Z as c,_n as l,dn as u,it as d,jn as f,nt as p,tr as m,un as h}from"./client-aJ7VylDj.js";var g=e(`close`,()=>(()=>{let e=c(`6b30a2290cd08d4`);return e[0]||=h(`svg`,{viewBox:`0 0 12 12`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":!0},[h(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},[h(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},[h(`path`,{d:`M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z`})])])],-1)})()),_=n(`base-close`,`
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`,[t(`absolute`,`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),s(`&::before`,`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),r(`disabled`,[s(`&:hover`,`
 color: var(--n-close-icon-color-hover);
 `),s(`&:hover::before`,`
 background-color: var(--n-close-color-hover);
 `),s(`&:focus::before`,`
 background-color: var(--n-close-color-hover);
 `),s(`&:active`,`
 color: var(--n-close-icon-color-pressed);
 `),s(`&:active::before`,`
 background-color: var(--n-close-color-pressed);
 `)]),t(`disabled`,`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),t(`round`,[s(`&::before`,`
 border-radius: 50%;
 `)])]),v=l({name:`BaseClose`,props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return p(`-base-close`,_,m(e,`clsPrefix`)),()=>{let{clsPrefix:t,disabled:n,absolute:r,round:s,isButtonTag:l}=e,d=l?`button`:`div`;return(()=>{let p=c(`b5bdc9fe09f5ae00`);return f(),u(d,{type:l?`button`:void 0,tabindex:n||!e.focusable?-1:0,"aria-disabled":n,"aria-label":`close`,role:l?void 0:`button`,disabled:n,class:i([`${t}-base-close`,r&&`${t}-base-close--absolute`,n&&`${t}-base-close--disabled`,s&&`${t}-base-close--round`]),onMousedown:p[0]||=t=>{e.focusable||t.preventDefault()},onClick:e.onClick},{default:o(()=>[(f(),u(a,{clsPrefix:t},{default:()=>(f(),u(g))},1032,[`clsPrefix`]))]),_:2},1032,[`type`,`tabindex`,`aria-disabled`,`role`,`disabled`,`class`,`onClick`])})()}}}),y={iconMargin:`11px 8px 0 12px`,iconMarginRtl:`11px 12px 0 8px`,iconSize:`24px`,closeIconSize:`16px`,closeSize:`20px`,closeMargin:`13px 14px 0 0`,closeMarginRtl:`13px 0 0 14px`,padding:`13px`},b=e(`error`,()=>(()=>{let e=c(`550229f72e94547c`);return e[0]||=h(`svg`,{viewBox:`0 0 48 48`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`},[h(`g`,{stroke:`none`,"stroke-width":`1`,"fill-rule":`evenodd`},[h(`g`,{"fill-rule":`nonzero`},[h(`path`,{d:`M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z`})])])],-1)})()),x=e(`info`,()=>(()=>{let e=c(`1d7d3032c5ab60`);return e[0]||=h(`svg`,{viewBox:`0 0 28 28`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`},[h(`g`,{stroke:`none`,"stroke-width":`1`,"fill-rule":`evenodd`},[h(`g`,{"fill-rule":`nonzero`},[h(`path`,{d:`M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z`})])])],-1)})()),S=e(`success`,()=>(()=>{let e=c(`2d4548faff86b4af`);return e[0]||=h(`svg`,{viewBox:`0 0 48 48`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`},[h(`g`,{stroke:`none`,"stroke-width":`1`,"fill-rule":`evenodd`},[h(`g`,{"fill-rule":`nonzero`},[h(`path`,{d:`M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z`})])])],-1)})()),C=e(`warning`,()=>(()=>{let e=c(`eb9505c3181fdf04`);return e[0]||=h(`svg`,{viewBox:`0 0 24 24`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`},[h(`g`,{stroke:`none`,"stroke-width":`1`,"fill-rule":`evenodd`},[h(`g`,{"fill-rule":`nonzero`},[h(`path`,{d:`M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z`})])])],-1)})()),{cubicBezierEaseInOut:w,cubicBezierEaseOut:T,cubicBezierEaseIn:E}=d;function D({overflow:e=`hidden`,duration:t=`.3s`,originalTransition:n=``,leavingDelay:r=`0s`,foldPadding:i=!1,enterToProps:a=void 0,leaveToProps:o=void 0,reverse:c=!1}={}){let l=c?`leave`:`enter`,u=c?`enter`:`leave`;return[s(`&.fade-in-height-expand-transition-${u}-from,
 &.fade-in-height-expand-transition-${l}-to`,{...a,opacity:1}),s(`&.fade-in-height-expand-transition-${u}-to,
 &.fade-in-height-expand-transition-${l}-from`,{...o,opacity:0,marginTop:`0 !important`,marginBottom:`0 !important`,paddingTop:i?`0 !important`:void 0,paddingBottom:i?`0 !important`:void 0}),s(`&.fade-in-height-expand-transition-${u}-active`,`
 overflow: ${e};
 transition:
 max-height ${t} ${w} ${r},
 opacity ${t} ${T} ${r},
 margin-top ${t} ${w} ${r},
 margin-bottom ${t} ${w} ${r},
 padding-top ${t} ${w} ${r},
 padding-bottom ${t} ${w} ${r}
 ${n?`,${n}`:``}
 `),s(`&.fade-in-height-expand-transition-${l}-active`,`
 overflow: ${e};
 transition:
 max-height ${t} ${w},
 opacity ${t} ${E},
 margin-top ${t} ${w},
 margin-bottom ${t} ${w},
 padding-top ${t} ${w},
 padding-bottom ${t} ${w}
 ${n?`,${n}`:``}
 `)]}export{b as a,x as i,C as n,y as o,S as r,v as s,D as t};