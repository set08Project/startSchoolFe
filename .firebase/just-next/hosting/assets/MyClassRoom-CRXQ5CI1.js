import{bD as f,X as v,j as e,b3 as u,A as h,C as o,a as g,B as w,bk as y,k as T,H as A,r as N,t as M,cU as P,f as S,b4 as k,x as R,b8 as F}from"./index-Dr9ZTIop.js";import{b as j,c as D}from"./index-BIHAHyvx.js";const m=["Monday","Tuesday","Wednesday","Thursday","Friday"],C=({props:d})=>{var s;const{timetbale:l}=f(d),t=Object.values(v.groupBy((s=l==null?void 0:l.data)==null?void 0:s.timeTable,"day"));return e.jsx("div",{className:"w-full ",children:e.jsx("div",{className:" h-screen",children:e.jsxs("div",{className:" w-full h-[400px] bg-slate-100  border rounded-md p-2 overflow-x-auto gap-4",children:[e.jsxs("div",{className:"flex w-[2600px] gap-4 bg-white py-3 px-1",children:[e.jsx("div",{className:"w-[300px] h-6 border-r",children:"days"}),e.jsx("div",{className:"w-[300px] h-6  border-r",children:"07:45AM - 08:10AM "}),e.jsx("div",{className:"w-[300px] h-6  border-r",children:"08:10AM - 08:50AM "}),e.jsx("div",{className:"w-[300px] h-6  border-r",children:"08:50AM - 09:30AM "}),e.jsx("div",{className:"w-[300px] h-6  border-r",children:"09:30AM - 10:10AM"}),e.jsx("div",{className:"w-[300px] h-6  border-r",children:"10:10AM - 10:20AM "}),e.jsx("div",{className:"w-[300px] h-6  border-r",children:"10:20AM - 11:00AM "}),e.jsx("div",{className:"w-[300px] h-6  border-r",children:"11:00AM - 11:40AM "}),e.jsx("div",{className:"w-[300px] h-6  border-r",children:"11:40AM - 12:00NOON "}),e.jsx("div",{className:"w-[300px] h-6  border-r",children:"12:00NOON - 12:40PM "}),e.jsx("div",{className:"w-[300px] h-6  border-r",children:"12:40PM - 01:20PM "}),e.jsx("div",{className:"w-[300px] h-6  border-r",children:"01:20PM - 02:00PM "})]}),e.jsxs("div",{className:"flex w-[2600px] gap-0 px-1 py-3 mt-2",children:[e.jsx("div",{className:"w-[200px] h-6 border-r",children:m==null?void 0:m.map((a,c)=>e.jsxs("div",{className:`py-2 pl-2 h-[3.75rem] ${c%2===0?"bg-white":"bg-slate-50"}`,children:[" ",a]},c))}),e.jsx("div",{className:"",children:t==null?void 0:t.map((a,c)=>e.jsx("div",{className:`
                flex flex-col py-2 ${c%2===0?"bg-white":"bg-slate-50"}
                `,children:e.jsx("div",{className:"flex   ",children:a==null?void 0:a.map((r,i)=>e.jsx("div",{className:"flex",children:e.jsx("div",{className:"w-[220px] h-11 border-r px-4",children:r.subject})},i))})},c))})]})]})})})},L=({id:d,data:l})=>{var r;const{attendance:t}=y(d);let s=l==null?void 0:l.studentFirstName,a=(r=t==null?void 0:t.attendance)==null?void 0:r.find(i=>(i==null?void 0:i.studentFirstName)===s),c=Date.now();return e.jsx("div",{className:`w-[100px] border-r 
      ${a!=null&&a.present?"text-green-600":a!=null&&a.absent?"text-red-600":null}`,children:h(a==null?void 0:a.createdAt).format("ll")===h(c).format("ll")&&(a!=null&&a.present)?"Present":a!=null&&a.absent?"Absent":null})},$=({props:d})=>{var t,s,a,c,r,i,x,b;const{mainStudentAttendance:l}=T(d);return e.jsx("div",{children:((s=(t=l==null?void 0:l.data)==null?void 0:t.attendance)==null?void 0:s.filter(n=>n.present===!0).length)/((c=(a=l==null?void 0:l.data)==null?void 0:a.attendance)==null?void 0:c.length)*100?e.jsxs("div",{children:[(((i=(r=l==null?void 0:l.data)==null?void 0:r.attendance)==null?void 0:i.filter(n=>n.present===!0).length)/((b=(x=l==null?void 0:l.data)==null?void 0:x.attendance)==null?void 0:b.length)*100).toFixed(2),"%"]}):"No Record Yet"})},H=({props:d})=>{var t;const{classStudents:l}=u(d);return e.jsx("div",{children:e.jsx("div",{className:"mt-4",children:e.jsxs("div",{className:"py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ",children:[e.jsxs("div",{className:"text-[gray] w-[1920px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4 border-b pb-3",children:[e.jsx("div",{className:"w-[130px] border-r",children:"Reg. Date"}),e.jsx("div",{className:"w-[100px] border-r",children:"Today's Attendance"}),e.jsx("div",{className:"w-[100px] border-r",children:"This team Attendance Ratio"}),e.jsx("div",{className:"w-[220px] border-r",children:"Session Fee"}),e.jsx("div",{className:"w-[150px] border-r",children:"student Image"}),e.jsx("div",{className:"w-[200px] border-r",children:"student Name"}),e.jsx("div",{className:"w-[100px] border-r",children:"student Class"}),e.jsx("div",{className:"w-[150px] border-r",children:"Parent Contact"}),e.jsx("div",{className:"w-[200px] border-r",children:"Address "}),e.jsx("div",{className:"w-[200px] border-r",children:"Performance Ratio"}),e.jsx("div",{className:"w-[80px] border-r",children:"Rate"}),e.jsx("div",{className:"w-[180px] border-r",children:"View Detail"})]}),e.jsx("div",{children:(l==null?void 0:l.students.length)>0?e.jsx("div",{className:" w-[1920px] overflow-hidden",children:(t=l==null?void 0:l.students)==null?void 0:t.map((s,a)=>e.jsx("div",{children:e.jsx("div",{children:e.jsxs("div",{className:`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${a%2===0?"bg-slate-50":"bg-white"}`,children:[e.jsx("div",{className:"w-[130px] border-r",children:h(s==null?void 0:s.createdAt).format("ll")}),e.jsx(L,{data:s,id:l==null?void 0:l._id}),e.jsx("div",{className:"w-[100px] border-r",children:e.jsx($,{props:s==null?void 0:s._id})}),e.jsxs("div",{className:"w-[220px] border-r flex gap-4 ",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("label",{children:"1st Term"}),e.jsx("input",{type:"checkbox",className:`
                              toggle toggle-sm mt-2  ${s!=null&&s.feesPaid1st?"bg-blue-950 border-blue-950":"bg-neutral-500 border-neutral-500"}
                              `,checked:s==null?void 0:s.feesPaid1st})]}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("label",{children:"2nd Term"}),e.jsx("input",{type:"checkbox",className:`
                              toggle toggle-sm mt-2  ${s!=null&&s.feesPaid2nd?"bg-blue-950 border-blue-950":"bg-neutral-500 border-neutral-500"}
                              `,checked:s==null?void 0:s.feesPaid2nd})]}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("label",{children:"3rd Term"}),e.jsx("input",{type:"checkbox",className:`
                              toggle toggle-sm mt-2  ${s!=null&&s.feesPaid3rd?"bg-blue-950 border-blue-950":"bg-neutral-500 border-neutral-500"}
                              `,checked:s==null?void 0:s.feesPaid3rd})]})]}),e.jsx("div",{className:"w-[150px] flex justify-center border-r",children:e.jsx("img",{className:"w-14 h-14 rounded-md border object-cover",src:o})}),e.jsxs("div",{className:"w-[200px] border-r",children:[s==null?void 0:s.studentFirstName," ",s==null?void 0:s.studentLastName]}),e.jsx("div",{className:"w-[100px] border-r  ",children:l==null?void 0:l.className}),e.jsx("div",{className:"w-[150px] border-r  ",children:s!=null&&s.phone?s.phone:"no phone yet"}),e.jsx("div",{className:"w-[200px] border-r  ",children:s!=null&&s.studentAddress?s.studentAddress:"no Address yet"}),e.jsxs("div",{className:"w-[200px] border-r",children:[s!=null&&s.totalPerformance?s==null?void 0:s.totalPerformance:0,"%"]}),e.jsxs("div",{className:"w-[80px] border-r",children:[s!=null&&s.totalPerformance?Math.floor((s==null?void 0:s.totalPerformance)/20):0," ","of 5"]}),e.jsx(g,{to:"student-details/:studentID",className:"w-[180px] border-r",children:e.jsx(w,{name:"View Detail",className:"py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300",onClick:()=>{}})})]},s)})}))}):e.jsx("div",{children:e.jsxs("div",{className:"flex flex-col items-center justify-center px-4 py-1 mt-3",children:[e.jsx(j,{size:13}),e.jsx("p",{className:"mt-3 text-[12px] font-medium",children:"No Subject added yet"})]})})})]})})})};document.title="class room Detail's Page";const O=({props:d})=>{var t,s;const{subjectData:l}=k(d);return e.jsx("div",{children:((t=l==null?void 0:l.classSubjects)==null?void 0:t.length)>0?e.jsx("div",{className:"mt-1 w-full gap-2 grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3",children:(s=l==null?void 0:l.classSubjects)==null?void 0:s.map(a=>e.jsxs("div",{className:"bg-white border flex flex-col rounded-2xl pb-2 min-h-[200px] px-4 pt-4",children:[e.jsxs("div",{className:"mt-3 flex justify-between items-center font-bold",children:[e.jsx("p",{children:a==null?void 0:a.subjectTitle}),e.jsx("div",{className:"w-8 h-8 transition-all duration-300 rounded-full hover:bg-slate-50 cursor-pointer flex justify-center items-center",children:e.jsx(R,{className:"hover:text-blue-900"})})]}),e.jsx("div",{className:"flex",children:e.jsx("p",{className:"text-[12px] bg-slate-100 rounded-sm py-2 pl-1 shadow-sm pr-4 mb-5",children:"compulsory"})}),e.jsx("div",{className:"flex-1"}),e.jsxs("p",{className:"text-[13px] font-medium",children:["Subject Teacher Name: ",e.jsx("span",{})]}),e.jsx("div",{className:"flex mb-4 gap-2 flex-wrap",children:e.jsx("div",{className:"text-blue-950  rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px] ",children:a==null?void 0:a.subjectTeacherName})})]},a==null?void 0:a._id))}):e.jsx("div",{children:e.jsxs("div",{className:"flex flex-col items-center justify-center px-4 py-1 mt-3",children:[e.jsx(j,{size:13}),e.jsx("p",{className:"mt-3 text-[12px] font-medium",children:"No Subject added yet"})]})})})},_=({props:d})=>{const{teacherInfo:l}=F();return e.jsxs("div",{className:"flex gap-2 mt-1 items-start  ",children:[e.jsx("img",{className:"w-10 h-10 object-cover rounded-full",src:l!=null&&l.avatar?l==null?void 0:l.avatar:o}),e.jsxs("p",{children:[e.jsx("p",{className:"m-0 leading-tight text-[14px] font-bold",children:d!=null&&d.classTeacherName?d==null?void 0:d.classTeacherName:"Hasn't been assigned"}),e.jsxs("p",{className:"text-[12px] mt-2 flex items-center gap-1",children:[e.jsx("span",{className:"font-bold text-[15px]",children:l==null?void 0:l.staffRating})," ",e.jsx(D,{})]})]})]})},z=()=>{var a,c,r,i;const{studentInfo:d}=A(),[l,t]=N.useState(),{oneClass:s}=M(d==null?void 0:d.presentClassID);return N.useEffect(()=>{P(d==null?void 0:d.classAssigned).then(x=>{t(x==null?void 0:x.data)})},[]),e.jsxs("div",{className:"text-blue-950",children:[e.jsx(S,{name:"My ClassRoom Details"}),e.jsxs("div",{children:["Class: ",d==null?void 0:d.classesAssigned]}),e.jsxs("div",{className:"w-full text-blue-950 h-[90px] rounded-lg border flex justify-between overflow-hidden ",children:[e.jsxs("div",{className:"bg-blue-950 text-white w-[160px] md:w-[300px] px-4 py-2 rounded-lg ",children:[e.jsx("div",{children:"Total Number of Students"}),e.jsxs("div",{className:"text-[35px] font-medium",children:[(a=s==null?void 0:s.students)==null?void 0:a.length," ",e.jsx("span",{className:"text-[20px]",children:"Students"})]})]}),e.jsxs("div",{className:" px-4 py-1 rounded-lg text-center flex items-end flex-col",children:[e.jsx("div",{className:"flex-1"}),e.jsx("div",{className:"mr-0 ",children:"Next Recommended action:"}),e.jsx("p",{className:"font-medium",children:"Add Teacher to supervise this class"})]})]}),e.jsx("div",{className:"my-6 border-t"}),e.jsxs("div",{className:"mt-6 w-full min-h-[80px] pb-4 bg-slate-50 rounded-lg border pt-2 px-4 ",children:[e.jsx("div",{className:" px-3  opacity-100 rounded-md bg-orange-400 text-white mb-2 py-2 flex justify-between items-center ",children:e.jsxs("div",{className:"flex gap-2 font-normal",children:[e.jsxs("p",{className:"text-[12px]",children:[e.jsx("p",{className:"font-normal",children:"First Term"}),e.jsxs("p",{className:"font-bold",children:["₦",(c=s==null?void 0:s.class1stFee)==null?void 0:c.toLocaleString()]})]}),e.jsxs("p",{className:"text-[12px]",children:[e.jsx("p",{className:"font-normal",children:"Second Term"}),e.jsxs("p",{className:"font-bold",children:["₦",(r=s==null?void 0:s.class2ndFee)==null?void 0:r.toLocaleString()]})]}),e.jsxs("p",{className:"text-[12px]",children:[e.jsx("p",{className:"font-normal",children:"Third Term"}),e.jsxs("p",{className:"font-bold",children:["₦",(i=s==null?void 0:s.class3rdFee)==null?void 0:i.toLocaleString()]})]})]})}),e.jsx("p",{children:"Manage Class Teacher: "}),e.jsxs("p",{className:"text-[13px] flex items-center font-bold",children:["Class teacher is responsible for day to day activities of the class"," ",e.jsx("span",{className:"font-bold flex items-center gap-1"})]}),e.jsx("div",{className:"mt-8"}),e.jsx("div",{className:"text-[12px]",children:" class Teacher Assigned"}),e.jsx(_,{props:s})]}),e.jsx("div",{className:"my-6 border-t"}),e.jsxs("div",{className:"w-full min-h-[180px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ",children:[e.jsxs("p",{children:["Class Subject for ",s==null?void 0:s.className," "]}),e.jsx("p",{className:"text-[13px] font-bold",children:"Below are all the subject this CLASS offers!"}),e.jsx(O,{props:s==null?void 0:s._id})]}),e.jsxs("div",{className:"m>t-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ",children:[e.jsx("p",{children:"Top Performing student "}),e.jsxs("p",{className:"text-[13px]  flex items-center font-bold",children:["Here is the list of the top 5 performing student:"," "]}),e.jsx("div",{className:"flex gap-4 mt-5",children:e.jsx("div",{className:"flex justify-center w-full",children:e.jsxs("div",{className:"flex flex-col items-center justify-center px-4 py-1 mt-3",children:[e.jsx(j,{size:13}),e.jsx("p",{className:"mt-3 text-[12px] font-medium",children:"No Student rated yet"})]})})})]}),e.jsxs("div",{className:"mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ",children:[e.jsx("p",{children:"Viewing Students"}),e.jsxs("p",{className:"text-[13px]  flex items-center font-bold",children:["Here are all the students in this class:"," "]}),e.jsx("div",{className:"flex gap-4 mt-5",children:e.jsx("div",{className:"overflow-x-auto",children:e.jsx(H,{props:s==null?void 0:s._id})})})]}),e.jsxs("div",{className:"mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ",children:[e.jsx("div",{className:"flex items-center w-full justify-between",children:e.jsxs("div",{children:[e.jsx("p",{children:"Viewing Class TimeTable"}),e.jsxs("p",{className:"text-[13px]  flex items-center font-bold",children:["Here are all the students in this class:"," "]})]})}),e.jsxs("div",{className:"flex gap-4 mt-5",children:[" ",e.jsx(C,{props:s==null?void 0:s._id})," "]})]})]})};export{z as default};