import{r as i,j as t,bv as c,a2 as b,bw as f}from"./index-Dr9ZTIop.js";const j=({placeholder:d,show:o,bg:s,className:n,errorText:p,value:u,...m})=>{const r=i.useRef(null),[a,e]=i.useState(!1),[l,x]=i.useState(!1);return i.useEffect(()=>{a&&(r==null||r.current.focus())},[a]),t.jsxs("div",{className:c(`w-[300px] h-[50px]  border rounded-md m-2  relative transition-all duration-300 mb-6 ${a&&"border-blue-500"} `,n),style:{border:`${u?"1px solid rgb(59, 130, 246)":""}`},onClick:()=>{e(!0)},children:[t.jsx("label",{className:`text-[lightgray] transition-all duration-300 absolute ${s||"bg-white"}  text-[12px] ml-2 px-[2px]
        `,style:{top:`${a?"-0.75rem":`${u?"-0.75rem":"0.75rem"}`}`,backgroundColor:`${s||"white"}`},children:d}),o&&t.jsx("div",{className:"absolute top-1/3 right-3 cursor-pointer bg-transparent mx-1",children:l?t.jsx(b,{onClick:()=>{x(!l),e(!0)}}):t.jsx(f,{onClick:()=>{x(!l),e(!0)}})}),t.jsx("input",{ref:r,...m,className:c(`px-2 outline-none ${o?"w-[75%]":"w-full"} h-full bg-transparent`,n),onFocus:()=>{e(!0)},onBlur:()=>{e(!1)},type:l?"password":"text"}),t.jsx("div",{className:"text-[12px] text-right text-red-500 mt-1",children:p})]})};export{j as I};