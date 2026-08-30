import{$t as e,Fn as t,J as n,Q as r,Tn as i,Un as a,_ as o,_n as s,_t as c,an as l,en as u,ft as d,jn as f,kn as p,ot as m,xn as h}from"./client-DecrR2G0.js";import{n as g}from"./misc-DDs3MKLt.js";var _=!1;function v(){if(o&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:r,self:y},x=e([u(`skeleton`,`
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
 `)]),S={...n.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=p({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:t,mergedComponentPropsRef:r}=c(e),i=h(()=>e.size||r?.value?.Skeleton?.size),a=n(`Skeleton`,`-skeleton`,x,b,e,t);return{mergedClsPrefix:t,style:h(()=>{let t=a.value,{common:{cubicBezierEaseInOut:n}}=t,r=t.self,{color:o,colorEnd:s,borderRadius:c}=r,u,{circle:d,sharp:f,round:p,width:h,height:g,text:_,animated:v}=e,y=i.value;y!==void 0&&(u=r[l(`height`,y)]);let b=d?h??g??u:h,x=(d?h??g:g)??u;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:d?`50%`:p?`4096px`:f?``:c,width:typeof b==`number`?m(b):b,height:typeof x==`number`?m(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":s}})}},render(){let{repeat:e,style:n,mergedClsPrefix:r,$attrs:o}=this,c=f(`div`,t({class:`${r}-skeleton`,style:n},o));return e>1?(a(),i(s,{key:1},[d(()=>g(e,null).map(e=>[c,`
`]))],64)):c}});export{C as t};