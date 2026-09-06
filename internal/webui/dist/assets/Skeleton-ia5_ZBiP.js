import{$ as e,$t as t,Fn as n,Tn as r,Un as i,Y as a,_n as o,an as s,en as c,jn as l,kn as u,pt as d,st as f,v as p,vt as m,xn as h}from"./client-3GjT0YO-.js";import{n as g}from"./misc-DDs3MKLt.js";var _=!1;function v(){if(p&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:e,self:y},x=t([c(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),t(`@keyframes skeleton-loading`,`
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
 `)]),S={...a.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=u({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:t,mergedComponentPropsRef:n}=m(e),r=h(()=>e.size||n?.value?.Skeleton?.size),i=a(`Skeleton`,`-skeleton`,x,b,e,t);return{mergedClsPrefix:t,style:h(()=>{let t=i.value,{common:{cubicBezierEaseInOut:n}}=t,a=t.self,{color:o,colorEnd:c,borderRadius:l}=a,u,{circle:d,sharp:p,round:m,width:h,height:g,text:_,animated:v}=e,y=r.value;y!==void 0&&(u=a[s(`height`,y)]);let b=d?h??g??u:h,x=(d?h??g:g)??u;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:d?`50%`:m?`4096px`:p?``:l,width:typeof b==`number`?f(b):b,height:typeof x==`number`?f(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":c}})}},render(){let{repeat:e,style:t,mergedClsPrefix:a,$attrs:s}=this,c=l(`div`,n({class:`${a}-skeleton`,style:t},s));return e>1?(i(),r(o,{key:1},[d(()=>g(e,null).map(e=>[c,`
`]))],64)):c}});export{C as t};