import{a4 as J,a5 as W,X,j as t,A as F,a6 as Z,y as q,Z as k,u as G,a7 as K,r as h,O as U,B as d,a as $,Q as O,F as P,a8 as A,a9 as Y,m as E,aa as ee,ab as te,ac as B,ad as H}from"./index-Dr9ZTIop.js";import{L as ae}from"./LittleHeader-XNWv_M-9.js";import{A as C}from"./AddAnyItems-a-uCWnmx.js";import{_ as D}from"./index-CPykWLTA.js";/* empty css                    */import{S as ne}from"./index-QaJKv7Yx.js";import"./Input-CHfh9ry9.js";import"./index-C2a7vhFd.js";import"./react-datepicker-Bv15p8ZS.js";const se=()=>{var S,u,s;var l={infinite:!0,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:5e3,pauseOnHover:!0};const{schoolAnnouncement:c}=J(),{schoolEvent:r}=W();let x=(S=c==null?void 0:c.announcements)==null?void 0:S.slice(0,5),n=(u=r==null?void 0:r.events)==null?void 0:u.slice(0,5),v=[].concat(x,n);const b=(s=X.shuffle(v))==null?void 0:s.slice(0,5),i=Array.from({length:2});return t.jsx("div",{className:"w-90% mx-7",children:(i==null?void 0:i.length)>0?t.jsx(ne,{...l,children:b==null?void 0:b.map((a,m)=>t.jsxs("div",{className:"px-5",children:[t.jsx("h3",{className:"text-[30px] ",children:a==null?void 0:a.title}),t.jsxs("h3",{className:"text-[10px] mb-2 -mt-1 opacity-75 capitalize",children:[a==null?void 0:a.date," · ",a==null?void 0:a.status," · posted data:"," ",F(a==null?void 0:a.createdAt).fromNow()]}),t.jsx("h3",{className:"text-[13px] opacity-60 font-normal h-[60px] ",children:a==null?void 0:a.details})]},m))}):t.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center p-4",children:[t.jsx(Z,{}),t.jsx("p",{className:"text-[12px] mt-3 capitalize",children:"no Announcement or Event yet"})]})})};document.title="Welcome Back Dashboard";const xe=()=>{var M;const l=q(),c=k(e=>e.subjectToggled),r=k(e=>e.notice),x=k(e=>e.event),{data:n}=G(),{schoolSubject:g}=K(),[v,b]=h.useState(""),[i,S]=h.useState(""),[u,s]=h.useState(!1),[a,m]=h.useState(new Date),[w,p]=h.useState(""),[y,N]=h.useState(""),o=()=>{window.scrollTo({top:0,behavior:"smooth"})},V=()=>{document.startViewTransition?document.startViewTransition(()=>{l(O(!0));const e=setTimeout(()=>{clearTimeout(e),l(P(!0))},100)}):(l(O(!0)),l(P(!0))),o()},Q=()=>{document.startViewTransition?document.startViewTransition(()=>{l(A(!1))}):l(A(!1)),o()},R=()=>{try{s(!0),Y(n==null?void 0:n._id,{subjectTitle:v,designated:i}).then(e=>{var f,j;(e==null?void 0:e.status)===201?(E(`api/view-school-subject/${n==null?void 0:n._id}`),s(!1),_()):(s(!1),D.error(`${(j=(f=e==null?void 0:e.response)==null?void 0:f.data)==null?void 0:j.message}`))}),o()}catch(e){return e}},z=()=>{try{s(!0),ee(n==null?void 0:n._id,{title:w,details:y,date:F(a).format("LLL")}).then(e=>{var f,j;e.status===201?(E(`api/view-announcement/${n==null?void 0:n._id}`),s(!1),T(),m(null),p(""),N("")):(s(!1),D.error(`${(j=(f=e==null?void 0:e.response)==null?void 0:f.data)==null?void 0:j.message}`))}),o()}catch(e){return e}},I=()=>{try{s(!0),te(n._id,{title:w,details:y,date:F(a).format("LLL")}).then(e=>{E(`api/view-event/${n==null?void 0:n._id}`),e.status===201?(s(!1),T(),m(null),p(""),N("")):(s(!1),D.error(`${e.response.data.message}`))}),o()}catch(e){return e}},L=()=>{document.startViewTransition?document.startViewTransition(()=>{l(B(!x))}):l(B(!x)),o()},T=()=>{document.startViewTransition?document.startViewTransition(()=>{l(H(!r))}):l(H(!r)),o()},_=()=>{document.startViewTransition?document.startViewTransition(()=>{l(A(!c))}):l(A(!c)),o()};return t.jsxs("div",{children:[t.jsx(ae,{name:"Dashboard"}),t.jsxs("div",{className:"grid w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 ",children:[t.jsxs("div",{className:"mt-44 sm:mt-0 col-span-1 sm:col-span-2 md:col-span-3   rounded-md h-[100%]",children:[t.jsxs("div",{className:"w-full min-h-[130px] bg-blue-950 rounded-lg mt-1 text-white p-3",children:[t.jsx("p",{className:"text-[20px] mb-2",children:"Announcement/Event"}),t.jsx(se,{})]}),t.jsx(U,{})]}),t.jsxs("div",{className:"bg-white order-first sm:order-last col-span-1 p-2 rounded-md h-[200px] md:sticky transition-all duration-300 mt-4 top-[4.5rem] sm:top-16",children:[t.jsxs("div",{className:"bg-white py-5 col-span-1 border p-2 rounded-md min-h-[200px] transition-all duration-300 -mt-5 ",children:[t.jsx("p",{className:"font-medium text-[14px] mb-5",children:"Quick Action"}),t.jsxs("div",{children:[t.jsx(d,{name:"Push Announcement",className:"bg-black hover:bg-neutral-800 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2",onClick:T}),t.jsx(d,{name:"Register new Student",className:"bg-blue-900  hover:bg-blue-950 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2",onClick:V}),t.jsx(d,{name:"Create Event",className:"bg-purple-900 hover:bg-purple-950 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2",onClick:L}),t.jsx(d,{name:"Add Subject",className:"bg-pink-600 hover:bg-pink-700 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2",onClick:_}),t.jsx(d,{name:"Quick Chat (coming soon)",className:"bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2",onClick:V}),t.jsx($,{to:"/class-report-card-ready",children:t.jsx(d,{name:"Prepare Result Card",className:"bg-neutral-700 hover:bg-neutral-900 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"})}),t.jsx($,{to:"/school-fees-history",children:t.jsx(d,{name:"View School Fees Payments",className:"bg-black hover:bg-neutral-800 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"})})]})]}),t.jsxs("div",{className:"hidden sm:block col-span-1 border p-2 rounded-md min-h-[200px] transition-all duration-300 top-16 mt-4",children:[t.jsx("p",{className:"font-medium text-[14px] mb-5",children:"Subjects"}),t.jsx("div",{className:"font-medium text-[12px] h-[280px]  overflow-y-auto ",children:(M=g==null?void 0:g.subjects)==null?void 0:M.map(e=>t.jsxs("div",{className:"my-1",children:[t.jsx("span",{className:"font-bold",children:e==null?void 0:e.subjectTitle})," ","· ",e==null?void 0:e.designated," ·"," ",e==null?void 0:e.subjectTeacherName]},e==null?void 0:e._id))})]})]})]}),c&&t.jsx("div",{className:"-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden",style:{background:"rgba(73, 154, 255, 0.2)",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",backdropFilter:"blur(5px)",border:"1px solid rgba(73, 154, 255, 0.3)"},children:t.jsx(C,{titleCall:"Add New Subject",offFn:Q,en:!0,sub:!0,text:"Place the title fo the subject you are about to create and the Class that is meant to have this created subject!",placeStart:"Mathematics",placeEnd:"JSS 1A",startTitle:"Enter Subject Name",endTitle:"Class Assigned",setEnd:S,setStart:b,start:v,end:i,handleFn:R,loading:u,setLoading:s})}),r&&t.jsx("div",{className:"-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden",style:{background:"rgba(73, 154, 255, 0.2)",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",backdropFilter:"blur(5px)",border:"1px solid rgba(73, 154, 255, 0.3)"},children:t.jsx(C,{titleCall:"Make Announcement",offFn:T,date:!0,text:"Make a public Announcement to give an importance notice to all teachers and student about something very important...!",placeStart:"Title this Announcement",placeEnd:"Mon. 21st Feb 2024",startTitle:"Enter Announcement Title",endTitle:"Date the Announcement",setStart:p,setAnnounce:N,announce:y,start:w,end:i,handleFn:z,loading:u,setLoading:s,startDateTime:a,startDateTimeFn:e=>m(e)})}),x&&t.jsx("div",{className:"-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden",style:{background:"rgba(73, 154, 255, 0.2)",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",backdropFilter:"blur(5px)",border:"1px solid rgba(73, 154, 255, 0.3)"},children:t.jsx(C,{titleCall:"Create/Schedule a new Event",offFn:L,date:!0,text:"Create/Schedule an Event and publish it so that everyone can see and get excited about this upcoming event!",placeStart:"Title this Event",placeEnd:"Mon. 21st Feb 2024",startTitle:"Enter Event Title",endTitle:"Date for the Event",setStart:p,setAnnounce:N,announce:y,start:w,end:i,handleFn:I,loading:u,setLoading:s,startDateTime:a,startDateTimeFn:e=>m(e)})})]})};export{xe as default};