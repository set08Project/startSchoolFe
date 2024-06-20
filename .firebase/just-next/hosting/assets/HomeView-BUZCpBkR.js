import{u as m,I as v,j as e,V as z,W as A,X as o,C as j,Y as I,z as _,t as M,y as $,Z as L,$ as V,a0 as D,m as H,r as u,i as Q,a1 as E,a as f,A as U,a2 as F,a3 as X}from"./index-Dr9ZTIop.js";import{C as B,A as G,p as J,a as Y,D as q}from"./index-Dd92SExZ.js";import{U as N}from"./index-CI8joyPh.js";import{b as W}from"./index-BIHAHyvx.js";import{P as O}from"./index-Dv11XXwU.js";B.register(G,J,Y);const Z=()=>{var n,c,x;const{data:a}=m(),{students:l}=v(a==null?void 0:a._id);let s=0,t=0;for(let r=0;r<((c=(n=l==null?void 0:l.data)==null?void 0:n.students)==null?void 0:c.length);r++)((x=l==null?void 0:l.data)==null?void 0:x.students[r].gender)==="Male"?s++:t++;const i={labels:[`Male: ${s}, Female: ${t}`],datasets:[{label:"My Class Male vs. Female Chart",data:[s,t],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)"],borderWidth:1}]};return e.jsx("div",{className:"w-full flex justify-center",children:e.jsx("div",{className:"sm:w-[300px] w-[200px]",children:e.jsx(q,{data:i})})})},K=()=>{var g,b,w,S,y,T,P,k,C,R;const{data:a}=m(),{schoolFeeRecord:l}=z(a==null?void 0:a._id),{students:s}=v(a==null?void 0:a._id);let t=l==null?void 0:l.filter(d=>d.term==="1st Term"&&d.session===(a==null?void 0:a.presentSession)).map(d=>(d==null?void 0:d.amount)/100).reduce((d,h)=>d+h,0),i=l==null?void 0:l.filter(d=>d.term==="2nd Term"&&d.session===(a==null?void 0:a.presentSession)).map(d=>(d==null?void 0:d.amount)/100).reduce((d,h)=>d+h,0),n=l==null?void 0:l.filter(d=>d.term==="3rd Term"&&d.session===(a==null?void 0:a.presentSession)).map(d=>(d==null?void 0:d.amount)/100).reduce((d,h)=>d+h,0),c=l==null?void 0:l.filter(d=>d.term==="1st Term"&&d.session===(a==null?void 0:a.presentSession)).map(d=>d.studentID),x=l==null?void 0:l.filter(d=>d.term==="2nd Term"&&d.session===(a==null?void 0:a.presentSession)).map(d=>d.studentID),r=l==null?void 0:l.filter(d=>d.term==="3rd Term"&&d.session===(a==null?void 0:a.presentSession)).map(d=>d.studentID);return e.jsxs("div",{children:[e.jsxs("div",{className:"mb-2 text-blue-950",children:[e.jsx("span",{className:"font-bold text-[12px] ",children:"Population Counts"}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 mt-2",children:[e.jsxs("div",{className:"border rounded-md min-h-[100px] p-4",children:[e.jsx("p",{className:"font-medium leading-tight",children:"Total Students Registered:"}),e.jsx("h1",{className:"text-[40px] font-medium",children:(g=a==null?void 0:a.students)==null?void 0:g.length})]}),e.jsxs("div",{className:"border rounded-md min-h-[60px] p-4",children:[e.jsx("p",{className:"font-medium leading-tight",children:"Total Teachers Hired:"}),e.jsx("h1",{className:"text-[40px] font-medium",children:(b=a==null?void 0:a.staff)==null?void 0:b.length})]}),e.jsxs("div",{className:"border rounded-md min-h-[60px] p-4",children:[e.jsx("p",{className:"font-medium leading-tight",children:"Total Subjects"}),e.jsxs("h1",{className:"text-[25px] mt-5 font-bold",style:{color:"var(--primary)"},children:[(w=a==null?void 0:a.subjects)==null?void 0:w.length,e.jsx("span",{className:"text-[12px]"})]})]}),e.jsxs("div",{className:"border rounded-md min-h-[100px] p-4",children:[e.jsx("p",{className:"font-medium leading-tight",children:"Total Classrooms"}),e.jsx("h1",{className:"text-[25px] mt-5  font-bold break-words leading-tight",children:(S=a==null?void 0:a.classRooms)==null?void 0:S.length})]}),e.jsxs("div",{className:"border rounded-md min-h-[100px] p-4 col-span-2",children:[e.jsxs("p",{className:"font-bold mb-3",children:["Revenue Report:",e.jsx("p",{className:"text-[12px]",children:a==null?void 0:a.presentSession})]}),e.jsx("h1",{className:"text-[12px] font-medium",children:e.jsxs("div",{className:" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 justify-center gap-[0.30rem]",children:[e.jsxs("div",{className:"border min-w-[90px]  min-h-[100px] rounded-md p-2 break-words flex flex-col items-center justify-center ",children:[e.jsx("p",{children:"1st Term School Fees Revenue "}),e.jsxs("p",{className:"font-bold mt-2 text-[14px] ",children:["₦",t==null?void 0:t.toLocaleString()]}),e.jsx("p",{className:"leading-tight mt-2 text-center",children:"Total Revenue"})]}),e.jsxs("div",{className:"border min-w-[90px]  min-h-[100px] rounded-md p-2 break-words flex flex-col items-center justify-center ",children:[e.jsx("p",{children:"2nd Term School Fees Revenue"}),e.jsxs("p",{className:"font-bold mt-2 text-[14px] ",children:["₦",i==null?void 0:i.toLocaleString()]}),e.jsx("p",{className:"leading-tight mt-2 text-center",children:"Total Revenue"})]}),e.jsxs("div",{className:"sm:col-span-2 xl:col-span-1 border min-w-[90px]  min-h-[100px] rounded-md p-2 break-words flex flex-col items-center justify-center ",children:[e.jsx("p",{children:"3rd Term School Fees Revenue"}),e.jsxs("p",{className:"font-bold mt-2 text-[14px] ",children:["₦",n==null?void 0:n.toLocaleString()]}),e.jsx("p",{className:"leading-tight mt-2 text-center",children:"Total Revenue"})]})]})})]}),e.jsxs("div",{className:"border rounded-md min-h-[100px] p-4 col-span-2",children:[e.jsxs("p",{className:"font-bold mb-3",children:["School Fee Paid/Not Paid:",e.jsx("p",{className:"text-[12px]",children:a==null?void 0:a.presentSession})]}),e.jsx("h1",{className:"text-[12px] font-medium",children:e.jsxs("div",{className:" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 justify-center gap-[0.30rem]",children:[e.jsxs("div",{className:"border min-w-[90px]  min-h-[100px] rounded-md p-2 break-words flex flex-col items-center justify-center ",children:[e.jsx("p",{children:"1st Term "}),e.jsxs("p",{className:"font-bold mt-2 text-[14px] ",children:[`${c==null?void 0:c.length}/${(T=(y=s==null?void 0:s.data)==null?void 0:y.students)==null?void 0:T.length}`," "]}),e.jsx("p",{className:"leading-tight mt-2 text-center",children:"Paid"})]}),e.jsxs("div",{className:"border min-w-[90px]  min-h-[100px] rounded-md p-2 break-words flex flex-col items-center justify-center ",children:[e.jsx("p",{children:"2nd Term"}),e.jsx("p",{className:"font-bold mt-2 text-[14px] ",children:`${x==null?void 0:x.length}/${(k=(P=s==null?void 0:s.data)==null?void 0:P.students)==null?void 0:k.length}`}),e.jsx("p",{className:"leading-tight mt-2 text-center",children:"Total Revenue"})]}),e.jsxs("div",{className:"sm:col-span-2 xl:col-span-1 border min-w-[90px]  min-h-[100px] rounded-md p-2 break-words flex flex-col items-center justify-center ",children:[e.jsx("p",{children:"3rd Term"}),e.jsx("p",{className:"font-bold mt-2 text-[14px] ",children:`${r==null?void 0:r.length}/${(R=(C=s==null?void 0:s.data)==null?void 0:C.students)==null?void 0:R.length}`}),e.jsx("p",{className:"leading-tight mt-2 text-center",children:"Total Revenue"})]})]})})]})]})]}),e.jsx("div",{className:"border-t my-5"}),e.jsxs("div",{className:"w-full",children:[e.jsx("p",{children:"Chart"}),e.jsx(Z,{}),e.jsx("p",{className:"text-[12px]",children:"Male vs Female"})]})]})},p=({props:a})=>{var i,n;const{studentAttendance:l}=I(a),s=(i=l==null?void 0:l.attendance)==null?void 0:i.filter(c=>c.present===!0);let t=(s==null?void 0:s.length)/((n=l==null?void 0:l.attendance)==null?void 0:n.length);return e.jsxs("span",{children:[t*100,"%"]})},ee=()=>{const{data:a}=m(),{perform:l}=A(a==null?void 0:a._id),s=o.sortBy(l==null?void 0:l.data,[t=>t.totalPerformance]);return e.jsx("div",{className:"",children:e.jsx("div",{className:"carousel carousel-center h-[400px] rounded-box *:bg-slate-100 gap-2",children:s==null?void 0:s.map((t,i)=>e.jsx("div",{className:"carousel-item",children:i<5&&e.jsxs("div",{children:[e.jsx(N,{alt:t==null?void 0:t.title,thumbhash:"1QcSHQRnh493V4dIh4eXh1h4kJUI",src:t!=null&&t.avatar?t==null?void 0:t.avatar:j,autoSizes:!0,className:"w-[280px] h-[82%] object-cover "}),e.jsxs("div",{className:"p-2 text-[12px]",children:[e.jsxs("p",{children:["Name:"," ",e.jsxs("span",{className:"capitalize font-bold",children:[t==null?void 0:t.studentFirstName," ",t==null?void 0:t.studentLastName]})]}),e.jsxs("p",{children:["Class:"," ",e.jsx("span",{className:"capitalize font-bold",children:t==null?void 0:t.classAssigned})]}),e.jsxs("div",{className:"flex items-center text-[10px] gap-3 mt-3 leading-tight",children:[e.jsxs("p",{children:["Grade Ratio:"," ",e.jsx("span",{className:"capitalize font-bold",children:(t==null?void 0:t.totalPerformance)/5?parseFloat(((t==null?void 0:t.totalPerformance)/5).toFixed(2)):0})]}),"·",e.jsxs("p",{children:["Attendance Rate:"," ",e.jsx("span",{className:"mr- capitalize font-bold",children:e.jsx(p,{props:t==null?void 0:t._id})})]})]})]})]})},t==null?void 0:t._id))})})},se=()=>{const{schoolTeacher:a}=_();let l=o.orderBy(a==null?void 0:a.staff,"staffRating");return o.sortBy(a==null?void 0:a.staff,[s=>s.staffRating]),console.log("show me: ",l),e.jsx("div",{className:"carousel carousel-end rounded-box w-96 gap-2 *:bg-slate-100",children:l==null?void 0:l.map((s,t)=>{var i;return e.jsx("div",{className:"carousel-item w-1/2",children:t<3&&e.jsxs("div",{className:"w-full h-[300px]",children:[e.jsx(N,{alt:s==null?void 0:s.title,thumbhash:"1QcSHQRnh493V4dIh4eXh1h4kJUI",src:s!=null&&s.avatar?s==null?void 0:s.avatar:j,autoSizes:!0,className:"w-full h-[70%] object-cover"}),e.jsxs("div",{className:"p-2 text-[12px]",children:[e.jsxs("p",{children:["Name:"," ",e.jsx("span",{className:"capitalize font-bold",children:s.staffName})]}),e.jsxs("p",{className:"flex flex-wrap",children:["Class:"," ",e.jsx("span",{className:"capitalize ml-2 flex items-center gap-2 font-bold text-[10px]",children:(i=s==null?void 0:s.classesAssigned)==null?void 0:i.map(n=>e.jsx("div",{className:"flex  items-center gap-2",children:n==null?void 0:n.className}))})]}),e.jsx("div",{className:"flex items-center text-[10px] gap-3 mt-4 leading-tight",children:e.jsxs("p",{children:["Att. Ratio:"," ",e.jsx("span",{className:"ml-1 capitalize font-bold",children:s==null?void 0:s.staffRating})]})})]})]})},s==null?void 0:s._id)})})},ae=({props:a})=>{const{oneClass:l}=M(a);return e.jsx("div",{children:l==null?void 0:l.classTeacherName})},le=()=>{var s,t;const{data:a}=m(),{students:l}=v(a==null?void 0:a._id);return e.jsx("div",{className:"py-6  rounded-md min-w-[300px] overflow-y-hidden ",children:e.jsx("div",{className:" w-[800px] overflow-hidden",children:e.jsxs("div",{className:"py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ",children:[e.jsxs("div",{className:"text-[gray] w-[700px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4",children:[e.jsx("div",{className:"w-[200px] border-r",children:"Gender"}),e.jsx("div",{className:"w-[200px] border-r",children:"Student's Info"}),e.jsx("div",{className:"w-[100px] border-r",children:"Class"}),e.jsx("div",{className:"w-[200px] border-r",children:"Assign Teacher"})]}),(t=(s=l==null?void 0:l.data)==null?void 0:s.students)==null?void 0:t.map((i,n)=>e.jsx("div",{children:n<=4&&e.jsx("div",{children:e.jsx("div",{className:" w-[700px] overflow-hidden ",children:e.jsx("div",{children:e.jsx("div",{children:e.jsxs("div",{className:`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden ${n%2===0?"bg-slate-50":"bg-white"}`,children:[e.jsx("div",{className:"w-[200px] border-r capitalize",children:i==null?void 0:i.gender}),e.jsx("div",{className:"w-[200px] border-r ",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"avatar",children:e.jsx("div",{className:"mask mask-squircle w-12 h-12",children:e.jsx("img",{src:i!=null&&i.avatar?i==null?void 0:i.avatar:j,alt:"Avatar"})})}),e.jsxs("div",{className:"text-[12px] leading-tight",children:[e.jsx("p",{children:i==null?void 0:i.studentFirstName}),e.jsx("p",{children:i==null?void 0:i.studentLastName}),e.jsx("div",{className:"mt-2"}),e.jsx("p",{className:"font-bold",children:i==null?void 0:i.totalPerformance})]})]})}),e.jsx("div",{className:"w-[100px] border-r",children:i==null?void 0:i.classAssigned}),e.jsx("div",{className:"w-[200px] border-r",children:e.jsx(ae,{props:i==null?void 0:i.presentClassID})})]},i)})})})})}))]})})})},te=()=>{$(),L(s=>s.cart);const{data:a}=m(),{schoolPurchased:l}=V(a==null?void 0:a._id);return e.jsx("div",{children:e.jsxs("div",{className:"py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ",style:{color:"var(--secondary)"},children:[e.jsxs("div",{className:"text-[gray] w-[1100px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4",children:[e.jsx("div",{className:"w-[180px] border-r",children:"Date Purchased"}),e.jsx("div",{className:"w-[250px] border-r",children:"Items Purchased"}),e.jsx("div",{className:"w-[100px] border-r",children:"Total cost paid"}),e.jsx("div",{className:"w-[150px] border-r",children:"Paid Receipt"}),e.jsx("div",{className:"w-[80px] border-r",children:"delievered"}),e.jsx("div",{className:"w-[10px] border-r"}),e.jsx("div",{className:"w-[150px] border-r",children:"Name"}),e.jsx("div",{className:"w-[80px] border-r",children:"Class"})]}),(l==null?void 0:l.length)>0?e.jsx("div",{className:" w-[1100px] overflow-hidden ",children:l==null?void 0:l.map((s,t)=>{var i;return e.jsx("div",{children:t<=5&&e.jsx("div",{children:e.jsx("div",{children:e.jsxs("div",{className:`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden ${t%2===0?"bg-slate-50":"bg-white"}`,children:[e.jsx("div",{className:"w-[180px] border-r",children:s==null?void 0:s.date}),e.jsx("div",{className:"w-[250px] border-r ",children:(i=s==null?void 0:s.cart)==null?void 0:i.map((n,c)=>e.jsx("div",{className:"",children:e.jsxs("div",{className:"flex items-center gap-3 my-2",children:[e.jsx("div",{className:"avatar",children:e.jsx("div",{className:"mask mask-squircle w-12 h-12",children:e.jsx("img",{src:n!=null&&n.avatar?n==null?void 0:n.avatar:j,alt:"Avatar"})})}),e.jsxs("div",{children:[e.jsx("div",{className:"font-bold",children:n.title}),e.jsxs("div",{className:"text-[12px] opacity-50 ",children:["₦",n.cost.toLocaleString()," * ",n.QTY]})]})]})},c))}),e.jsxs("div",{className:"w-[100px] border-r ml-1",children:["₦",(s==null?void 0:s.amount).toLocaleString()]}),e.jsx("div",{className:"w-[150px] border-r ml-1",children:s==null?void 0:s.reference}),e.jsx("div",{className:"w-[80px] border-r pl-6 ",children:e.jsx("label",{children:e.jsx("input",{checked:s==null?void 0:s.delievered,type:"checkbox",className:"checkbox checkbox-error",onClick:()=>{D(s==null?void 0:s._id).then(n=>{n.status===201&&(H(`api/view-school-purchase/${a==null?void 0:a._id}`),u.useEffect(()=>{},[s.delievered]))})}})})}),e.jsx("div",{className:"w-[10px] border-r ml-1"}),e.jsx("div",{className:"w-[150px] border-r ml-1",children:e.jsxs("div",{children:[e.jsx("div",{className:"font-bold",children:s==null?void 0:s.studentName}),e.jsx("div",{className:"text-[12px] opacity-50 ",children:s!=null&&s.studentClass?"student":"Teacher"})]})}),e.jsx("div",{className:"w-[80px] border-r ml-1",children:s==null?void 0:s.studentClass})]},s)})})})})}):e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx(W,{}),e.jsx("p",{className:"mt-2 text-[15px]",children:"You haven't reported any complains yet"})]})]})})};document.title="School's Article Page";const ie=()=>{Q();const{data:a}=m(),{allArticle:l}=E(a==null?void 0:a._id);return e.jsx("div",{children:e.jsx(e.Fragment,{children:e.jsx("div",{className:"w-full mt-6",children:l&&(l==null?void 0:l.map((s,t)=>{var i,n;return e.jsx("div",{children:t<1&&e.jsxs(f,{to:`/articles/${s==null?void 0:s._id}`,children:[e.jsx(N,{alt:"cover image",thumbhash:"1QcSHQRnh493V4dIh4eXh1h4kJUI",src:s==null?void 0:s.coverImage,autoSizes:!0,className:"w-full h-[250px] rounded-t-md object-cover border"}),e.jsxs("div",{className:"p-2 border-r border-l border-b",children:[e.jsxs("div",{className:"flex mt-2 gap-2 mb-3",children:[e.jsx("img",{alt:"image",src:s==null?void 0:s.avatar,className:"w-[40px] h-[40px] rounded-[50%] object-cover border"}),e.jsxs("div",{children:[e.jsx("p",{className:"capitalize text-[12px] font-semibold",children:s==null?void 0:s.student}),e.jsx("p",{className:"text-[12px]",children:U(s==null?void 0:s.createdAt).fromNow()})]})]})," ",e.jsx("p",{className:"font-semibold leading-tight mb-4",children:s==null?void 0:s.desc}),e.jsx("p",{className:"text-[14px] mb-5",children:s==null?void 0:s.title}),e.jsxs("div",{className:"flex gap-3 text-blue-950",children:[e.jsxs("p",{className:"flex items-center gap-1",children:[e.jsx(O,{}),e.jsx("span",{className:"font-semibold text-[12px]",children:(i=s==null?void 0:s.like)==null?void 0:i.length})]}),e.jsxs("p",{className:"flex items-center gap-1",children:[e.jsx(F,{}),e.jsx("span",{className:"font-semibold text-[12px]",children:(n=s==null?void 0:s.view)==null?void 0:n.length})]})]})]})]})})}))})})})},de=()=>{document.title="School's Record and Stats",u.useState("");const a=Array.from({length:2});return u.useEffect(()=>{},[]),e.jsxs("div",{className:"text-blue-950 flex flex-col h-full",children:[e.jsxs("div",{className:" grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5",children:[e.jsxs("div",{className:"min-w-[250px] h-full flex flex-col rounded-md border p-4",children:[e.jsx("div",{className:"mb-4 text-medium capitalize",children:"School's Info"}),e.jsx(K,{}),e.jsx("div",{className:"flex-1 mt-10"})]}),e.jsxs("div",{className:"min-w-[300px] overflow-hidden h-full flex flex-col rounded-md border p-4",children:[e.jsx("div",{className:"mb-10 text-[14px] font-normal capitalize",children:"Performance"}),e.jsx("div",{children:e.jsxs("div",{className:"flex justify-center flex-col gap-3 w-full items-center ",children:[e.jsx("p",{children:"Top 5 Performancing Students"}),e.jsx("div",{className:" overflow-hidden",children:e.jsx(ee,{})})]})}),e.jsx("div",{className:"my-10",children:e.jsx("hr",{})}),e.jsxs("div",{className:"mt-2 text-blue-950",children:[e.jsxs("div",{className:"flex gap-3 text-[15px] ",children:[e.jsx("p",{children:"Most Recent Article"}),e.jsx(f,{to:"/articles",children:e.jsx("p",{className:"font-bold",children:"View More"})})]}),e.jsx(ie,{})]}),e.jsx("div",{className:"my-10",children:e.jsx("hr",{})}),e.jsx("div",{className:"border-b my-5"}),e.jsxs("div",{className:"flex flex-col items-center w-full justify-center",children:[e.jsx("p",{className:"mb-3 text-[14px] font-medium",children:"Top Rated Teacher"}),e.jsx("div",{className:" flex justify-center gap-3 w-full items-center",children:e.jsx(se,{})})]})]}),e.jsx("div",{className:"border rounded-md flex gap-2 w-full p-2 col-span-1 lg:col-span-3  ",children:e.jsxs("div",{className:" rounded-md w-full  p-4",children:[e.jsx("div",{className:"mb-4 text-medium capitalize",children:"Top 5 Most Active Student"}),e.jsx("div",{children:(a==null?void 0:a.length)>0?e.jsxs("div",{children:[" ",e.jsx(le,{})," "]}):e.jsxs("div",{className:"flex flex-col w-full items-center",children:[e.jsx(X,{size:30}),e.jsx("p",{className:"font-medium text-[13px]",children:"No Enry Record yet"})]})})]})})]}),e.jsx("div",{className:"border rounded-md flex gap-2 w-full p-2 col-span-1 lg:col-span-3 mt-5 ",children:e.jsxs("div",{className:" rounded-md w-full  p-4",children:[e.jsxs("div",{className:"mb-4 text-medium capitalize",children:["Top 5 Recent Purchases"," ",e.jsx("span",{className:"font-bold ml-5",children:e.jsx(f,{to:"/purchase-history",children:"View All "})})]}),e.jsxs("div",{children:[e.jsx(te,{})," "]})]})}),e.jsx("div",{className:"flex-1"})]})},he=()=>e.jsx("div",{children:e.jsx(de,{})});export{he as default};
