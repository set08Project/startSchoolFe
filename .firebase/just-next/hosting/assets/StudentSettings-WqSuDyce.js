import{r as n,H as h,j as e,B as v,cW as w,I as u,t as y,y as f,f as S,cX as T,al as x,cY as C,m as E}from"./index-Dr9ZTIop.js";import{d as D}from"./dummy-BcUwpZQ2.js";import{I as M}from"./Input-CHfh9ry9.js";import{_ as j}from"./index-CPykWLTA.js";const V=({change:r})=>{const[a,l]=n.useState(""),{studentInfo:s}=h();return e.jsxs("div",{className:"overflow-hidden",children:[e.jsxs("div",{className:"ml-[40px] mt-4 grid w-[100%] grid-cols-1 md:grid-cols-1  lg:grid-cols-2 md:w-[60%] overflow-hidden",children:[e.jsxs("div",{className:"mb-8",children:[e.jsx("a",{className:"text-[14px] text-gray-400 ",children:"First name"}),e.jsx("div",{className:"md:w-[87%] lg:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]",children:s==null?void 0:s.studentFirstName})]}),e.jsxs("div",{className:"mb-8",children:[e.jsx("a",{className:"text-[14px] text-gray-400",children:"Last name"}),e.jsx("div",{className:"md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]",children:s==null?void 0:s.studentLastName})]}),e.jsx("div",{className:"mb-8",children:e.jsx("div",{className:"md:w-[87%] w-[100%]  border-b-gray-400 pl-5 mt-[10px]",children:s!=null&&s.parentEmail?e.jsxs("div",{children:[e.jsx("div",{className:"text-sm mb-3",children:"Parent's email"}),e.jsx("div",{className:" border-b pb-2 border-gray-400 ",children:s==null?void 0:s.parentEmail})]}):e.jsx(M,{name:"Email",placeholder:"Email",value:a,onChange:i=>l(i.target.value),className:"ml-0 w-full "})})}),e.jsxs("div",{className:"mb-8",children:[e.jsx("a",{className:"text-[14px] text-gray-400 ",children:"My address"}),e.jsx("div",{className:"md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]",children:s!=null&&s.studentAddress?s==null?void 0:s.studentAddress:e.jsx("div",{className:"opacity-40",children:"No Address Yet"})})]})]}),e.jsxs("div",{className:"ml-[40px]",children:[e.jsx("a",{className:"text-[14px] text-gray-400 ",children:"My Biography"}),e.jsx("div",{className:`md:w-[70%] lg:w-full h-[156px] w-[90%] mt-[10px]\r
      text-black border-gray-400 p-3 rounded-md border text-[14px]`,children:s!=null&&s.bio?s==null?void 0:s.bio:e.jsx("div",{className:"opacity-40",children:"No Biography Yet"})})]}),a.length>=1?e.jsx(v,{onClick:()=>{w(s==null?void 0:s._id,{parentEmail:a})},name:"Submit",className:"bg-blue-950 text-[18px] ml-10 mt-4 font-bold"}):""]})},A=({})=>{var s,i,t,c,m,d;const{studentInfo:r}=h(),{students:a}=u(r==null?void 0:r.schoolIDs),{oneClass:l}=y(r==null?void 0:r.presentClassID);return e.jsxs("div",{className:"overflow-hidden w-full",children:[e.jsxs("div",{className:"ml-[40px] mt-4 grid w-full grid-cols-1 md:grid-cols-2",children:[e.jsxs("div",{className:"mb-8",children:[e.jsx("a",{className:"text-[14px] text-gray-400 ",children:"School Name"}),e.jsx("div",{className:"md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]",children:(s=a==null?void 0:a.data)==null?void 0:s.schoolName})]}),e.jsxs("div",{className:"mb-8 w-full",children:[e.jsx("a",{className:"text-[14px] text-gray-400 ",children:"Class teacher"}),e.jsx("div",{className:"md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]",children:l==null?void 0:l.classTeacherName})]}),e.jsxs("div",{className:"mb-8",children:[e.jsx("a",{className:"text-[14px] text-gray-400 ",children:"School address"}),e.jsx("div",{className:"md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]",children:(i=a==null?void 0:a.data)==null?void 0:i.address})]}),e.jsxs("div",{className:"mb-8",children:[e.jsx("a",{className:"text-[14px] text-gray-400 ",children:"My Class"}),e.jsx("div",{className:"md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]",children:r==null?void 0:r.classAssigned})]})]}),e.jsxs("div",{className:"mb-8 ml-[40px] w-[70%]",children:[e.jsx("a",{className:"text-[14px] text-gray-400 ",children:"School Mission"}),e.jsx("div",{className:"md:w-[100%] py-4 lg:w-[100%] p-1 border min-h-[156px] w-[100%] pl-5 mt-[10px] border-gray-400 rounded-md",children:(t=a==null?void 0:a.data)!=null&&t.mission?(c=a==null?void 0:a.data)==null?void 0:c.mission:e.jsx("div",{className:"opacity-40 text-[14px]",children:"Pledging to our country, To be faithful, loyal and honest to serve Nigeria wth all my strength, to defend her unity and uphold her honor and glory. So help me God of our athers' land. Amen"})})]}),e.jsxs("div",{className:"mb-8 ml-[40px] w-[70%]",children:[e.jsx("a",{className:"text-[14px] text-gray-400 ",children:"School Vision"}),e.jsx("div",{className:"md:w-[100%] p-1 py-4 border min-h-[156px] w-[100%] pl-5 mt-[10px] border-gray-400 rounded-md",children:(m=a==null?void 0:a.data)!=null&&m.vision?(d=a==null?void 0:a.data)==null?void 0:d.vision:e.jsx("div",{className:"opacity-40 text-[14px]",children:"Knowledege is our strength! Glory of the Lord, the sun is shining on the path everyday. We have a shepherd, loving and tender. He radiates pasture, greatness of children. We have him who care for his children."})})]})]})},B=()=>{const r=f(),{studentInfo:a}=h(),[l,s]=n.useState(!1),[i,t]=n.useState(""),c=m=>{console.log("updated...");const d=m.target.files[0],p=new FormData;if(p.append("avatar",d),t(d),i){r(x(!0));const N=setTimeout(()=>{C(a==null?void 0:a._id,p).then(o=>{var b,g;o.status===201?(E(`api/view-student-info/${a==null?void 0:a._id}`),j.success("Image has been updated"),r(x(!1))):(j.error(`${(g=(b=o==null?void 0:o.response)==null?void 0:b.data)==null?void 0:g.message}`),r(x(!1)))}),clearTimeout(N)},50)}};return e.jsxs("div",{className:"text-blue-950",children:[e.jsx(S,{name:"My Profile Detail"}),e.jsx("div",{className:"w-full h-[150px] flex rounded-md justify-center items-center bg-blue-950 gap-4",children:e.jsxs("div",{className:"h-[100%] w-[80%] relative flex ",children:[e.jsxs("div",{className:"w-[155px] col-span-3 h-[155px] rounded-full border-4 bg-blue-950 border-white absolute top-[70px] ",children:[e.jsx("img",{src:a!=null&&a.avatar?a==null?void 0:a.avatar:D,className:"w-full h-full rounded-full object-cover"}),e.jsxs("div",{className:"w-[40px] h-[40px] bg-black bottom-4 rounded-full cursor-pointer absolute flex justify-center items-center right-0",children:[e.jsx("label",{htmlFor:"pix",className:"cursor-pointer",children:e.jsx(T,{style:{color:"white"}})}),e.jsx("input",{id:"pix",type:"file",onChange:c,className:"hidden"})]})]}),e.jsx("div",{className:"w-[100%] h-[80%] flex justify-end items-end"})]})}),e.jsxs("div",{className:"ml-[40px] grid w-[89%] text-[16px] md:w-[80%] grid-cols-2 sm:w-[80%] mb-20 mt-32 border rounded-md overflow-hidden",children:[e.jsx("div",{className:`font-medium flex justify-center items-center cursor-pointer text-[16px]  ${l?"bg-blue-950 text-white p-4":""}`,onClick:()=>{document.startViewTransition?document.startViewTransition(()=>{s(!0)}):document.startViewTransition(()=>{s(!0)})},children:"My personal details"}),e.jsx("div",{className:`font-medium cursor-pointer text-[16px] flex justify-center items-center  ${l?"":"bg-blue-950 text-white p-4"}`,onClick:()=>{document.startViewTransition?document.startViewTransition(()=>{s(!1)}):document.startViewTransition(()=>{s(!1)})},children:"My school details"})]}),l?e.jsx(V,{change:l}):e.jsx(A,{})]})};export{B as default};