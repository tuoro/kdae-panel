import{B as e,Cn as t,H as n,Ht as r,Vt as i,X as a,_n as o,an as s,jn as c,ln as l,ot as u,pn as d,qt as f,tt as p,v as m,yn as h}from"./client-aJ7VylDj.js";import{n as g}from"./misc-DDs3MKLt.js";var _=!1;function v(){if(m&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:n,self:y},x=i([r(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),i(`@keyframes skeleton-loading`,`
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
 `)]),S={...e.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=o({name:`Skeleton`,inheritAttrs:!1,props:S,setup(t){v();let{mergedClsPrefixRef:n,mergedComponentPropsRef:r}=u(t),i=l(()=>t.size||r?.value?.Skeleton?.size),o=e(`Skeleton`,`-skeleton`,x,b,t,n);return{mergedClsPrefix:n,style:l(()=>{let e=o.value,{common:{cubicBezierEaseInOut:n}}=e,r=e.self,{color:s,colorEnd:c,borderRadius:l}=r,u,{circle:d,sharp:p,round:m,width:h,height:g,text:_,animated:v}=t,y=i.value;y!==void 0&&(u=r[f(`height`,y)]);let b=d?h??g??u:h,x=(d?h??g:g)??u;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:d?`50%`:m?`4096px`:p?``:l,width:typeof b==`number`?a(b):b,height:typeof x==`number`?a(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":s,"--n-color-end":c}})}},render(){let{repeat:e,style:n,mergedClsPrefix:r,$attrs:i}=this,a=h(`div`,t({class:`${r}-skeleton`,style:n},i));return e>1?(c(),d(s,{key:1},[p(()=>g(e,null).map(e=>[a,`
`]))],64)):a}});export{C as t};