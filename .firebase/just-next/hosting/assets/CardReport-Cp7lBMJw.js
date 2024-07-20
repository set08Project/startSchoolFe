import{H as u,b2 as o,b4 as N,b6 as h,j as e,b8 as f,b3 as w,an as b,C as v,X as g,k as y}from"./index-Dr9ZTIop.js";import{L as S}from"./LittleHeader-XNWv_M-9.js";import{I as C}from"./index-CPykWLTA.js";document.title="View Students";const I=({props:d,el:s})=>{var x,t;const{gradeData:c}=h(d==null?void 0:d._id),{schoolInfo:r}=b(d==null?void 0:d.schoolIDs);return(t=(x=c==null?void 0:c.reportCard.find(i=>{var n,a;return i.classInfo===`${d==null?void 0:d.classAssigned} session: ${(n=r[0])==null?void 0:n.year}(${(a=r[0])==null?void 0:a.presentTerm})`}))==null?void 0:x.result)==null||t.find(i=>i.subject===(s==null?void 0:s.subjectTitle)),e.jsxs("div",{className:"w-[260px] border-r-2 border-blue-950 py-3 ",children:[e.jsx("div",{children:e.jsx("div",{className:" flex ",children:e.jsxs("div",{className:"w-[260px]  ",children:[e.jsx("p",{className:"pl-3 font-bold text-[15px]",children:s==null?void 0:s.subject}),e.jsxs("div",{className:"pl-1 flex gap-1 mt-2 text-[10px] ",children:[e.jsx("p",{className:"w-[30px] border-r",children:"1st"}),e.jsx("p",{className:"w-[30px] border-r",children:"2nd"}),e.jsx("p",{className:"w-[30px] border-r",children:"3rd"}),e.jsx("p",{className:"w-[30px] border-r",children:"4th"}),e.jsx("p",{className:"w-[35px] border-r",children:"Exam"}),e.jsx("p",{className:"w-[35px] ",children:"Total"}),e.jsx("p",{className:"w-[35px] ",children:"Grade"})]})]})})}),e.jsxs("div",{className:"pl-1 flex gap-1 mt-2 text-[12px] ",children:[e.jsx("p",{className:"w-[30px] border-r",children:s!=null&&s.test1?s==null?void 0:s.test1:0}),e.jsx("p",{className:"w-[30px] border-r",children:s!=null&&s.test2?s==null?void 0:s.test2:0}),e.jsx("p",{className:"w-[30px] border-r",children:s!=null&&s.test3?s==null?void 0:s.test3:0}),e.jsx("p",{className:"w-[30px] border-r",children:s!=null&&s.test4?s==null?void 0:s.test4:0}),e.jsx("p",{className:"w-[35px] border-r",children:s!=null&&s.exam?s==null?void 0:s.exam:0}),e.jsx("p",{className:"w-[35px] font-bold border-r",children:s!=null&&s.mark?s==null?void 0:s.mark:0}),e.jsx("p",{className:"w-[35px] font-bold",children:s!=null&&s.grade?s==null?void 0:s.grade:"Nill"})]})]})},$=({props:d,i:s,mainData:c})=>{var a;const{teacherInfo:r}=f(),{gradeData:x}=h(d==null?void 0:d._id),{state:t}=o(r==null?void 0:r.classesAssigned);w(t==null?void 0:t._id);const{subjectData:i}=N(t==null?void 0:t._id),{schoolInfo:n}=b(d==null?void 0:d.schoolIDs);return x==null||x.reportCard.find(l=>{var m,j;return l.classInfo===`${d==null?void 0:d.classAssigned} session: ${(m=n[0])==null?void 0:m.year}(${(j=n[0])==null?void 0:j.presentTerm})`}),e.jsxs("div",{className:`w-full flex items-center gap-2 text-[12px] font-medium  h-24 px-4 my-2  overflow-hidden ${s%2===0?"bg-slate-50":"bg-white"}`,children:[e.jsx("div",{className:"w-[100px] border-r font-bold",children:s+1}),e.jsx("div",{className:"w-[250px] flex border-r",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("img",{className:" mask mask-squircle w-14 h-14 rounded-md border object-cover",src:c!=null&&c.avatar?c==null?void 0:c.avatar:v}),e.jsxs("div",{className:"w-[180px] ",children:[" ",e.jsx("p",{className:"font-bold text-[13px]",children:d==null?void 0:d.classInfo.split(":")[0].split("session")[0]}),e.jsxs("p",{className:"mt-1",children:["session:",d==null?void 0:d.classInfo.split("session:")[1].split("(")[0]]}),e.jsxs("p",{className:"text-[11px] font-bold -mt-1",children:[" ",d==null?void 0:d.classInfo.split("session:")[1].split("(")[1].replace(")","")]})]})]})}),e.jsx("div",{className:"w-[100px] border-r",children:e.jsx(R,{mainData:c})}),e.jsx("div",{className:"w-[100px] border-r",children:d==null?void 0:d.points}),e.jsx("div",{className:"w-[100px] border-r text-[15px] leading-tight font-bold",children:(d==null?void 0:d.grade)!=="Not Recorded Yet"?d==null?void 0:d.grade:e.jsx("span",{className:"text-[12px] text-red-500",children:"Not Recorded Yet"})}),e.jsx("div",{className:`w-[${(i==null?void 0:i.classSubjects.length)*260}px]  border-r items-center flex`,children:e.jsx("div",{className:"flex gap-4 ",children:(a=g.sortBy(d==null?void 0:d.result,"subject"))==null?void 0:a.map(l=>e.jsx(I,{props:d,el:l}))})})]})},R=({mainData:d})=>{var c,r,x,t;const{mainStudentAttendance:s}=y(d==null?void 0:d._id);return e.jsxs("div",{children:[(((r=(c=s==null?void 0:s.data)==null?void 0:c.attendance)==null?void 0:r.filter(i=>i.present===!0).length)/((t=(x=s==null?void 0:s.data)==null?void 0:x.attendance)==null?void 0:t.length)*100).toFixed(2),"%"]})},A=()=>{var x,t;const{studentInfo:d}=u(),{state:s}=o(d==null?void 0:d.classAssigned),{subjectData:c}=N(s==null?void 0:s._id),{gradeData:r}=h(d==null?void 0:d._id);return e.jsxs("div",{className:"text-blue-950",children:[e.jsx(C,{position:"top-center",reverseOrder:!0}),e.jsx("div",{className:"mb-0"}),e.jsx(S,{name:"Student's Result History"}),e.jsx("div",{className:"mt-10"}),e.jsx("div",{className:"flex w-full justify-end"}),e.jsxs("div",{className:"py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ",children:[e.jsxs("div",{className:"text-[gray] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4",style:{width:`${1e3+(c==null?void 0:c.classSubjects.length)*260}px`},children:[e.jsx("div",{className:"w-[100px] border-r",children:"Sequence "}),e.jsx("div",{className:"w-[250px] border-r",children:"student Info"}),e.jsx("div",{className:"w-[100px] border-r",children:"Student's Attendance Ratio"}),e.jsx("div",{className:"w-[100px] border-r",children:"Class Performance"}),e.jsx("div",{className:"w-[100px] border-r",children:"Class Grade"}),e.jsx("div",{className:`w-[${(c==null?void 0:c.classSubjects.length)*260}px] border-r`})]}),e.jsx("div",{className:" overflow-hidden",style:{width:`${1e3+(c==null?void 0:c.classSubjects.length)*260}px`},children:((x=r==null?void 0:r.reportCard)==null?void 0:x.length)>0?e.jsx("div",{children:(t=r==null?void 0:r.reportCard)==null?void 0:t.map((i,n)=>e.jsx("div",{children:e.jsx($,{props:i,i:n,mainData:r})},i))}):e.jsx("div",{children:"No student yet"})})]})]})};export{A as default};