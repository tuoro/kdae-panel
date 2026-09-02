import{$ as e,An as t,En as n,In as r,Mn as i,Sn as a,Wn as o,Y as s,en as c,on as l,pt as u,st as d,tn as f,v as p,vn as m,vt as h}from"./client-DOvxO6I9.js";import{n as g}from"./misc-DDs3MKLt.js";var _=!1;function v(){if(p&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:e,self:y},x=c([f(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),c(`@keyframes skeleton-loading`,`
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
 `)]),S={...s.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=t({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:t,mergedComponentPropsRef:n}=h(e),r=a(()=>e.size||n?.value?.Skeleton?.size),i=s(`Skeleton`,`-skeleton`,x,b,e,t);return{mergedClsPrefix:t,style:a(()=>{let t=i.value,{common:{cubicBezierEaseInOut:n}}=t,a=t.self,{color:o,colorEnd:s,borderRadius:c}=a,u,{circle:f,sharp:p,round:m,width:h,height:g,text:_,animated:v}=e,y=r.value;y!==void 0&&(u=a[l(`height`,y)]);let b=f?h??g??u:h,x=(f?h??g:g)??u;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:f?`50%`:m?`4096px`:p?``:c,width:typeof b==`number`?d(b):b,height:typeof x==`number`?d(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":s}})}},render(){let{repeat:e,style:t,mergedClsPrefix:a,$attrs:s}=this,c=i(`div`,r({class:`${a}-skeleton`,style:t},s));return e>1?(o(),n(m,{key:1},[u(()=>g(e,null).map(e=>[c,`
`]))],64)):c}});export{C as t};