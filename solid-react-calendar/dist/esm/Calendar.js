"use client";
import e,{useRef as t,useMemo as n,useEffect as o}from"react";import{FixedSizeList as r}from"./node_modules/react-window/dist/index.esm.js";import{startOfDay as s}from"./node_modules/date-fns/startOfDay.js";import{startOfYear as a}from"./node_modules/date-fns/startOfYear.js";import{endOfYear as m}from"./node_modules/date-fns/endOfYear.js";import{isBefore as d}from"./node_modules/date-fns/isBefore.js";import{addMonths as l}from"./node_modules/date-fns/addMonths.js";import{isSameMonth as i}from"./node_modules/date-fns/isSameMonth.js";import{eachDayOfInterval as f}from"./node_modules/date-fns/eachDayOfInterval.js";import{endOfMonth as c}from"./node_modules/date-fns/endOfMonth.js";import{getDay as u}from"./node_modules/date-fns/getDay.js";import{formatDate as y}from"./node_modules/date-fns/format.js";import{isSameDay as p}from"./node_modules/date-fns/isSameDay.js";const g=(new Date).getFullYear();function h({selectedDate:h,onChange:x,minDate:j,onClose:w}){const _=t(null),b=s(new Date),D=n((()=>{const e=[],t=a(new Date(g,0,1)),n=m(new Date(g+1,0,1));let o=t;for(;o<=n;)d(o,b)||e.push(o),o=l(o,1);return e}),[b]);o((()=>{if(h&&_.current){const e=D.findIndex((e=>i(e,h)));-1!==e&&_.current.scrollToItem(e,"center")}}),[h,D]);return e.createElement(r,{ref:_,height:300,itemCount:D.length,itemSize:300,width:280,className:"no-scrollbar"},(({index:t,style:n})=>{const o=D[t]||0,r=f({start:o,end:c(o)}),s=u(o),a=Array(s).fill(null);return e.createElement("div",{style:n,key:o.toString(),className:"p-4 mb-6 no-scrollbar"},e.createElement("h3",{className:"text-lg font-semibold mb-2"},y(o,"MMMM yyyy")),e.createElement("div",{className:"grid grid-cols-7 gap-1"},["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((t=>e.createElement("div",{key:t,className:"h-8 w-8 text-center text-xs font-medium text-gray-700 flex items-center justify-center"},t))),a.map(((t,n)=>e.createElement("div",{key:`empty-${n}`,className:"w-9 h-9"}))),r.map((t=>{const n=!!h&&p(t,h),o=d(t,j),r=[0,6].includes(u(t)),s=d(t,b);return e.createElement("button",{key:t.toString(),onClick:()=>{o||x(t),w()},type:"button",disabled:o,className:`\n                  flex justify-center items-center w-10 h-10 rounded-full\n                  ${n?"bg-indigo-600 text-white":"bg-transparent text-gray-700"}\n                  ${o?"text-gray-300 cursor-not-allowed":"hover:bg-gray-200"}\n                  ${r&&!o?s?"text-red-300":"text-red-500":""}\n                  ${r||o||n?"":"text-gray-900"}\n              \n                `},y(t,"d"))}))))}))}export{h as default};
//# sourceMappingURL=Calendar.js.map
