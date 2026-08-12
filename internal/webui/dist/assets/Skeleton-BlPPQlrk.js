import{An as e,En as t,Gt as n,Jt as r,Mt as i,Yt as a,en as o,fn as s,gn as c,j as l,pt as u,wn as d,x as f}from"./client-7ydMUZih.js";import{n as p}from"./misc-DDs3MKLt.js";var m=!1;function h(){if(i&&window.CSS&&!m&&(m=!0,`registerProperty`in(window==null?void 0:window.CSS)))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function g(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var _={name:`Skeleton`,common:f,self:g},v=r([a(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),r(`@keyframes skeleton-loading`,`
 0% {
 background: var(--n-color-start);
 }
 40% {
 background: var(--n-color-end);
 }
 80% {
 background: var(--n-color-start);
 }
 100% {
 background: var(--n-color-start);
 }
 `)]),y=Object.assign(Object.assign({},l.props),{text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}}),b=d({name:`Skeleton`,inheritAttrs:!1,props:y,setup(e){h();let{mergedClsPrefixRef:t,mergedComponentPropsRef:r}=u(e),i=c(()=>e.size||r?.value?.Skeleton?.size),a=l(`Skeleton`,`-skeleton`,v,_,e,t);return{mergedClsPrefix:t,style:c(()=>{let t=a.value,{common:{cubicBezierEaseInOut:r}}=t,s=t.self,{color:c,colorEnd:l,borderRadius:u}=s,d,{circle:f,sharp:p,round:m,width:h,height:g,text:_,animated:v}=e,y=i.value;y!==void 0&&(d=s[o(`height`,y)]);let b=f?h??g??d:h,x=(f?h??g:g)??d;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:f?`50%`:m?`4096px`:p?``:u,width:typeof b==`number`?n(b):b,height:typeof x==`number`?n(x):x,animation:v?``:`none`,"--n-bezier":r,"--n-color-start":c,"--n-color-end":l}})}},render(){let{repeat:n,style:r,mergedClsPrefix:i,$attrs:a}=this,o=t(`div`,e({class:`${i}-skeleton`,style:r},a));return n>1?t(s,null,p(n,null).map(e=>[o,`
`])):o}});export{b as t};