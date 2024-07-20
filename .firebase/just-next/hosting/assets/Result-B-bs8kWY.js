import{i as h,y as j,n as u,Z as v,b9 as N,j as e,f as w,X as b,a as f,B as g,s as p,C as y}from"./index-Dr9ZTIop.js";import{c as S}from"./index-BIHAHyvx.js";const R=({props:l})=>{const{teacherDetail:d}=p(l);return e.jsxs("div",{className:"w-[220px] flex gap-2 border-r",children:[e.jsx("img",{className:"w-16 shadow-md h-14 rounded-2xl border object-cover",src:d!=null&&d.avatar?d==null?void 0:d.avatar:y}),e.jsxs("div",{children:[e.jsx("p",{className:"leading-tight",children:d==null?void 0:d.staffName}),e.jsx("div",{className:"mt-6"}),e.jsxs("p",{className:"flex items-center gap-1",children:[e.jsx(S,{className:"ml-1 mb-1"}),e.jsx("span",{children:d==null?void 0:d.staffRating})]})]})]})},V=()=>{var r,c,i,n,t;const{session:l,term:d,termID:m}=h();j(),Array.from({length:0}),u(),v(a=>a.classroomToggled);const{sessionTermData:s}=N(m);return document.title=`Viewing ${(r=s==null?void 0:s.data)==null?void 0:r.year} session of ${(c=s==null?void 0:s.data)==null?void 0:c.presentTerm}`,console.log(s),e.jsxs("div",{className:"",children:[e.jsx("div",{className:"mb-0"}),e.jsx(w,{name:`Viewing ${(i=s==null?void 0:s.data)==null?void 0:i.year} session of ${(n=s==null?void 0:s.data)==null?void 0:n.presentTerm}`}),e.jsx("div",{className:"mt-10"}),e.jsxs("div",{className:"py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ",style:{color:"var(--secondary)"},children:[e.jsxs("div",{className:"text-[gray] w-[1480px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4",children:[e.jsx("div",{className:"w-[80px] border-r",children:"Class"}),e.jsx("div",{className:"w-[100px] border-r",children:"Number of Students"}),e.jsx("div",{className:"w-[120px] border-r",children:"Number of Subjects Offered"}),e.jsx("div",{className:"w-[220px] border-r",children:"class teacher Info"}),e.jsx("div",{className:"w-[150px] border-r",children:"Class Academic Performance"}),e.jsx("div",{className:"w-[220px] border-r",children:"view Results"})]}),e.jsx("div",{className:" w-[1480px] overflow-hidden",children:b.sortBy((t=s==null?void 0:s.data)==null?void 0:t.classResult,"className").map((a,o)=>{var x;return e.jsx("div",{children:e.jsx("div",{children:e.jsxs("div",{className:`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${o%2===0?"bg-slate-50":"bg-white"}`,children:[e.jsx("div",{className:"w-[80px] border-r",children:a.className}),e.jsx("div",{className:"w-[100px] border-r pl-4",children:(x=a==null?void 0:a.students)==null?void 0:x.length}),e.jsx("div",{className:"w-[120px] border-r pl-4",children:a==null?void 0:a.classSubjects.length}),e.jsx("div",{className:"w-[220px]",children:a.classTeacherName?e.jsx(R,{props:a.teacherID}):e.jsx("div",{children:"no teacher assigned yet"})}),e.jsx("div",{className:"w-[150px] border-r pl-4",children:"90%"}),e.jsx(f,{to:`student-result/${a._id}`,className:"w-[220px] border-r",children:e.jsx(g,{name:"View Student Results",className:"py-3 w-[86%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300",onClick:()=>{}})})]},a)})},a._id)})})]})]})};export{V as default};