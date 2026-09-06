import{Ht as e,Jt as t,Mn as n,U as r,Ut as i,V as a,Z as o,bn as s,mn as c,nt as l,on as u,st as d,un as f,v as p,vn as m,wn as h}from"./client-DkW07njR.js";import{n as g}from"./misc-DDs3MKLt.js";var _=!1;function v(){if(p&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:r,self:y},x=e([i(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),e(`@keyframes skeleton-loading`,`
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
 `)]),S={...a.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=m({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:n,mergedComponentPropsRef:r}=d(e),i=f(()=>e.size||r?.value?.Skeleton?.size),s=a(`Skeleton`,`-skeleton`,x,b,e,n);return{mergedClsPrefix:n,style:f(()=>{let n=s.value,{common:{cubicBezierEaseInOut:r}}=n,a=n.self,{color:c,colorEnd:l,borderRadius:u}=a,d,{circle:f,sharp:p,round:m,width:h,height:g,text:_,animated:v}=e,y=i.value;y!==void 0&&(d=a[t(`height`,y)]);let b=f?h??g??d:h,x=(f?h??g:g)??d;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:f?`50%`:m?`4096px`:p?``:u,width:typeof b==`number`?o(b):b,height:typeof x==`number`?o(x):x,animation:v?``:`none`,"--n-bezier":r,"--n-color-start":c,"--n-color-end":l}})}},render(){let{repeat:e,style:t,mergedClsPrefix:r,$attrs:i}=this,a=s(`div`,h({class:`${r}-skeleton`,style:t},i));return e>1?(n(),c(u,{key:1},[l(()=>g(e,null).map(e=>[a,`
`]))],64)):a}});export{C as t};