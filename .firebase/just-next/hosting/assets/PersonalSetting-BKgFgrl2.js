import{j as e,L as s,a as n,O as d,M as o}from"./index-Dr9ZTIop.js";import{F as c,a as r}from"./index-BIHAHyvx.js";const h=()=>{document.title="Personal Settings";let i=location.pathname;const l=[{icon:e.jsx(c,{size:55}),title:"Why isn’t my info shown here?",detail:"We’re hiding some account details to protect your identity.",url:"/",size:55},{icon:e.jsx(r,{size:55}),title:"Which details can be edited?",detail:"Contact info and personal details can be edited. If this info was used to verify your identity, you’ll need to get verified again the next time you book—or to continue hosting.",url:"/",size:35},{icon:e.jsx(o,{size:55}),title:"Why isn’t my info shown here?",detail:"We’re hiding some account details to protect your identity.",url:"/",size:55}];return e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center text-blue-950",children:["Account ",e.jsx(s,{size:13,className:"mx-4 "})," ",e.jsx(n,{to:"/settings",className:"underline",children:"Settings"})," ",e.jsx(s,{size:13,className:"mx-4 "})," ",e.jsx("div",{className:"capitalize",children:i.split("/")[1].replaceAll("-"," ")})]}),e.jsx("div",{className:"text-blue-800 mt-5 font-[500] text-[30px] mb-10 capitalize",children:i.split("/")[2].replaceAll("-"," ")}),e.jsxs("div",{className:"w-full sm:grid sm:grid-cols-6 min-h-[65vh]  text-blue-950",children:[e.jsx(d,{}),e.jsx("div",{className:"border ml-2 rounded-md hidden sm:block text-blue-950 ",style:{gridColumn:"5/7"},children:l.map((t,a)=>e.jsxs("div",{className:"m-2 ",children:[e.jsxs("div",{className:"relative mb-8",children:[e.jsx("div",{className:"mt-4 absolute top-[-10px] left-1  text-blue-500 z-[2px] opacity-20 ",children:t.icon}),e.jsx("div",{className:"mt-4 ",children:t.icon})]}),e.jsx("div",{className:"my-4 text-blue-950 text-[20px] font-[400] ",children:t.title}),e.jsx("div",{className:"mb-6  text-[17px]  leading-6 text-blue-900",children:t.detail}),e.jsx("hr",{})]},a))})]})]})};export{h as default};
