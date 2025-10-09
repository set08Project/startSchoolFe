// document.title = "View Students for Grading";
// import pix from "../../../assets/pix.jpg";
// import Button from "../../../components/reUse/Button";
// import LittleHeader from "../../../components/static/LittleHeader";
// import { FC, useCallback, useEffect, useState } from "react";
// import {
//   useSchoolClassRM,
//   useSchoolClassRMDetail,
//   useSchoolData,
//   useSchoolSessionData,
//   useSchoolTermDetails,
//   useStudentAttendance,
//   useViewSchoolClassRM,
// } from "../../../pages/hook/useSchoolAuth";
// import {
//   useClassStudent,
//   useStudentGrade,
//   useSujectInfo,
//   useTeacherInfo,
//   useSubjectPerformance,
//   useSchoolAnnouncement,
// } from "../../hooks/useTeacher";
// import { createGradeScore } from "../../api/teachersAPI";
// import { mutate } from "swr";
// import toast, { Toaster } from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
// import ClipLoader from "react-spinners/ClipLoader";
// import {
//   useOneExamSubjectStudentPerfomance,
//   useOneSubjectStudentPerfomance,
// } from "../../hooks/useQuizHook";

// interface iProps {
//   props?: any;
//   id?: string;
//   data?: any;
//   i?: number;
// }

// const MainStudentRow: FC<iProps> = ({ props, i }) => {
//   const { subjectID } = useParams();
//   const { teacherInfo } = useTeacherInfo();
//   const { schoolAnnouncement } = useSchoolAnnouncement(teacherInfo?.schoolIDs);
//   const { subjectInfo } = useSujectInfo(subjectID);
//   const { perform } = useSubjectPerformance(subjectID);

//   const { oneStudentPerformanceExam: oneStudentPerformance } =
//     useOneExamSubjectStudentPerfomance(
//       subjectID,
//       subjectInfo?.examination[subjectInfo?.examination.length - 1]
//     );

//   const [loading, setLoading] = useState<boolean>(false);

//   const { schoolInfo } = useSchoolSessionData(teacherInfo?.schoolIDs);

//   const [test1, setTest1] = useState("");
//   const [test2, setTest2] = useState("");
//   const [test3, setTest3] = useState("");
//   const [test4, setTest4] = useState("");
//   const [exam, setExam] = useState("");

//   const { gradeData } = useStudentGrade(props?._id);

//   let reportData = gradeData?.reportCard?.find((el: any) => {
//     return (
//       el.classInfo ===
//       `${subjectInfo?.designated} session: ${schoolAnnouncement?.presentSession}(${schoolAnnouncement?.presentTerm})`
//     );
//   });

//   let result = reportData?.result.find((el: any) => {
//     return el.subject === subjectInfo?.subjectTitle;
//   });

//   const readResultData = (props: any) => {
//     let readData: any = oneStudentPerformance?.find((el: any) => {
//       return (
//         el.studentName ===
//         `${props?.studentFirstName} ${props?.studentLastName}`
//       );
//     });

//     return gradeData?.reportCard;
//   };

//   const makeGrade = () => {
//     try {
//       setLoading(true);
//       createGradeScore(teacherInfo?._id, props?._id, {
//         subject: subjectInfo?.subjectTitle,
//         test1: test1 ? parseInt(test1) : result?.test1 ? result?.test1 : 0,
//         test2: test2 ? parseInt(test2) : result?.test2 ? result?.test2 : 0,
//         test3: test3 ? parseInt(test3) : result?.test3 ? result?.test3 : 0,
//         test4: test4 ? parseInt(test4) : result?.test4 ? result?.test4 : 0,
//         exam: exam ? parseInt(exam) : result?.exam ? result?.exam : 0,
//       }).then((res) => {
//         setLoading(false);
//         // if (res.status === 201) {
//         mutate(`api/student-report-card/${props?._id}`);
//         toast.success("Grade added");
//         // } else {
//         //   toast.error("Grade denied");
//         // }
//       });
//     } catch (error: any) {
//       return error.stack;
//     }
//   };

//   return (
//     <div
//       className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
//         i % 2 === 0 ? "bg-slate-50" : "bg-white"
//       }`}
//     >
//       <div className={`w-[100px] border-r font-bold`}>{i + 1}</div>
//       {/* name */}
//       <div className="w-[250px] flex border-r">
//         <div className="flex gap-2">
//           <img
//             className=" mask mask-squircle w-14 h-14 rounded-md border object-cover"
//             src={pix}
//           />

//           <div className="w-[180px] ">
//             {" "}
//             {props?.studentLastName} {props?.studentFirstName}
//           </div>
//         </div>
//       </div>
//       <div className="w-[100px] border-r pl-2">
//         {result?.mark}  -{" "}
//         <span className="font-bold text-[12px]">{result?.grade}</span>
//       </div>
//       <div className="w-[100px] border-r">
//         <AttendanceRatio props={props} />
//       </div>

//       {/* <div className="w-[100px] border-r items-center flex">
//         <input
//           className="w-[70px] h-8 outline-none border rounded-md px-2 "
//           //   type="number"
//           placeholder={`${result?.test1 !== undefined ? result?.test1 : 0}`}
//           value={test1}
//           onChange={(e: any) => {
//             setTest1(e.target.value);
//           }}
//           defaultValue={20}
//         />
//       </div>

//       <div className="w-[100px] border-r">
//         <input
//           className="w-[70px] h-8 outline-none border rounded-md px-2 "
//           //   type="number"
//           placeholder={`${result?.test2 !== undefined ? result?.test2 : 0}`}
//           value={test2}
//           onChange={(e: any) => {
//             setTest2(e.target.value);
//           }}
//         />
//       </div>

//       <div className="w-[100px] border-r">
//         <input
//           className="w-[70px] h-8 outline-none border rounded-md px-2 "
//           //   type="number"
//           placeholder={`${result?.test3 !== undefined ? result?.test3 : 0}`}
//           value={test3}
//           onChange={(e: any) => {
//             setTest3(e.target.value);
//           }}
//         />
//       </div> */}

//       <div className="w-[100px] border-r">
//         <input
//           className="w-[70px] h-8 outline-none border rounded-md px-2 "
//           //   type="number"
//           placeholder={`${
//             result?.test4 !== undefined ? parseInt(result?.test4) : 0
//           }`}
//           value={test4}
//           onChange={(e: any) => {
//             setTest4(e.target.value);
//           }}
//         />
//       </div>

//       <div className="w-[100px] border-r  ">
//         <input
//           className="w-[80px] h-8 outline-none border rounded-md px-2 "
//           //   type="number"
//           placeholder={`${
//             result?.exam !== undefined ? parseInt(result?.exam) : 0
//           }`}
//           value={exam}
//           // onChange={(e: any) => {
//           //   {
//           //     readResultData(props)
//           //       ? setExam(
//           //           (
//           //             (readResultData(props)?.performanceRating / 100) *
//           //             60
//           //           ).toString()
//           //         )
//           //       : setExam(e.target.value);
//           //   }
//           // }}
//           onChange={(e: any) => {
//             const resultData = readResultData(props);
//             const performanceRating = resultData?.performanceRating;

//             if (performanceRating && !isNaN(performanceRating)) {
//               setExam(((performanceRating / 100) * 60).toString());
//             } else {
//               setExam(e.target.value);
//             }
//           }}
//         />
//       </div>

//       <div className="w-[180px] border-r relative">
//         <Button
//           name={loading ? "Loading" : "Add Score"}
//           icon={
//             loading && (
//               <ClipLoader
//                 color="white"
//                 size={12}
//                 className="py-0 my-0 absolute bottom-6 z-10 left-10"
//               />
//             )
//           }
//           className="pl-4 py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
//           onClick={makeGrade}
//         />
//       </div>
//     </div>
//   );
// };

// const AttendanceRatio: FC<iProps> = ({ props }) => {
//   const { mainStudentAttendance } = useStudentAttendance(props?._id);

//   return (
//     <div>
//       {(mainStudentAttendance?.data?.attendance?.filter(
//         (el: any) => el.present === true
//       ).length /
//         mainStudentAttendance?.data?.attendance?.length) *
//       100 ? (
//         <div>
//           {(
//             (mainStudentAttendance?.data?.attendance?.filter(
//               (el: any) => el.present === true
//             ).length /
//               mainStudentAttendance?.data?.attendance?.length) *
//             100
//           ).toFixed(2)}
//           %
//         </div>
//       ) : (
//         <p>0%</p>
//       )}
//     </div>
//   );
// };

// const SubjectGradeCard = () => {
//   const { teacherInfo } = useTeacherInfo();
//   const { subjectID } = useParams();
//   const { subjectInfo } = useSujectInfo(subjectID);

//   const { classroom } = useSchoolClassRMDetail(teacherInfo?.schoolIDs);
//   const { viewClasses } = useViewSchoolClassRM(teacherInfo?.schoolIDs);

//   let mainClass = viewClasses?.classRooms?.find((el: any) => {
//     return el?.classSubjects?.find((el: any) => {
//       return el === subjectID;
//     });
//   });

//   const { oneClass } = useReadOneClassInfo(mainClass?._id);
//   const { classStudents } = useClassStudent(oneClass?._id!);
//   const allStudents = classStudents?.students;
//   const sortedStudents = allStudents?.sort((a, b) =>
//     a.studentLastName?.localeCompare(b.studentLastName)
//   );

//   useEffect(() => {
//     mutate(`api/view-classrooms/`);
//   }, [teacherInfo, subjectInfo, viewClasses]);

//   return (
//     <div className="">
//       <Toaster position="top-center" reverseOrder={true} />
//       {/* header */}
//       <div className="mb-0" />
//       <LittleHeader name={`Entry ${subjectInfo?.subjectTitle} Grades`} />

//       <div className="mt-10" />

//       <div className="flex w-full justify-end"></div>
//       <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
//         <div className="text-[gray] w-[1000px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
//           <div className="w-[100px] border-r">Sequence</div>
//           <div className="w-[250px] border-r">student Info</div>
//           <div className="w-[100px] border-r">Student's Grade</div>
//           <div className="w-[100px] border-r">Student's Attendance Ratio</div>

//           {/* <div className="w-[100px] border-r">
//             1st Test <br />
//             Score
//           </div>
//           <div className="w-[100px] border-r">
//             2nd Test
//             <br /> Score
//           </div>
//           <div className="w-[100px] border-r">
//             3rd Test <br />
//             Score
//           </div> */}
//           <div className="w-[100px] border-r">
//             Test
//             <br />
//             Score
//           </div>
//           <div className="w-[100px] border-r">Examination Score</div>

//           <div className="w-[180px] border-r">Submit Report</div>
//         </div>

//         <div className=" w-[1000px] overflow-hidden">
//           {sortedStudents?.length > 0 ? (
//             <div>
//               {sortedStudents?.map((props: any, i: number) => (
//                 <div key={props}>
//                   <MainStudentRow props={props} i={i} />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div>No student yet</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubjectGradeCard;

// document.title = "View Students for Grading";
// import pix from "../../../assets/pix.jpg";
// import Button from "../../../components/reUse/Button";
// import LittleHeader from "../../../components/static/LittleHeader";
// import { FC, useState, useEffect } from "react";
// import {
//   useSchoolSessionData,
//   useSchoolClassRMDetail,
//   useViewSchoolClassRM,
//   useStudentAttendance,
// } from "../../../pages/hook/useSchoolAuth";
// import {
//   useClassStudent,
//   useStudentGrade,
//   useSujectInfo,
//   useTeacherInfo,
//   useSchoolAnnouncement,
// } from "../../hooks/useTeacher";
// import { createGradeScore } from "../../api/teachersAPI";
// import { mutate } from "swr";
// import toast, { Toaster } from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
// import ClipLoader from "react-spinners/ClipLoader";
// import { useOneExamSubjectStudentPerfomance } from "../../hooks/useQuizHook";

// interface iProps {
//   props?: any;
//   id?: string;
//   data?: any;
//   i?: number;
// }

// const MainStudentRow: FC<iProps> = ({ props, i }) => {
//   const { subjectID } = useParams();
//   const { teacherInfo } = useTeacherInfo();
//   const { schoolAnnouncement } = useSchoolAnnouncement(teacherInfo?.schoolIDs);
//   const { subjectInfo } = useSujectInfo(subjectID);

//   const { oneStudentPerformanceExam: oneStudentPerformance } =
//     useOneExamSubjectStudentPerfomance(
//       subjectID,
//       subjectInfo?.examination[subjectInfo?.examination.length - 1]
//     );

//   const [loading, setLoading] = useState<boolean>(false);
//   const [test4, setTest4] = useState("");
//   const [exam, setExam] = useState("");

//   // Local state for immediate display after submission
//   const [displayGrade, setDisplayGrade] = useState<any>(null);

//   const { gradeData } = useStudentGrade(props?._id);

//   // Find the current report card entry
//   const reportData = gradeData?.reportCard?.find((el: any) => {
//     return (
//       el.classInfo ===
//       `${subjectInfo?.designated} session: ${schoolAnnouncement?.presentSession}(${schoolAnnouncement?.presentTerm})`
//     );
//   });

//   // Find the subject result
//   const result = reportData?.result?.find((el: any) => {
//     return el.subject === subjectInfo?.subjectTitle;
//   });

//   // Calculate grade based on total marks
//   const calculateGrade = (totalMark: number): string => {
//     if (totalMark >= 90) return "A+";
//     if (totalMark >= 80) return "A";
//     if (totalMark >= 70) return "B";
//     if (totalMark >= 60) return "C";
//     if (totalMark >= 50) return "D";
//     if (totalMark >= 40) return "E";
//     return "F";
//   };

//   const makeGrade = async () => {
//     try {
//       setLoading(true);

//       const test4Score = test4 ? parseInt(test4) : result?.test4 || 0;
//       const examScore = exam ? parseInt(exam) : result?.exam || 0;

//       // Calculate total and grade immediately
//       const totalMark = test4Score + examScore;
//       const grade = calculateGrade(totalMark);

//       const response = await createGradeScore(teacherInfo?._id, props?._id, {
//         subject: subjectInfo?.subjectTitle,
//         test1: result?.test1 || 0,
//         test2: result?.test2 || 0,
//         test3: result?.test3 || 0,
//         test4: test4Score,
//         exam: examScore,
//       });

//       // Update local display state immediately
//       setDisplayGrade({
//         mark: totalMark,
//         grade: grade,
//         test4: test4Score,
//         exam: examScore,
//       });

//       // Refresh data from server
//       await mutate(`api/student-report-card/${props?._id}`);

//       setLoading(false);
//       toast.success("Grade added successfully!");

//       // Clear input fields
//       setTest4("");
//       setExam("");
//     } catch (error: any) {
//       setLoading(false);
//       toast.error("Failed to add grade. Please try again.");
//       console.error("Error adding grade:", error);
//     }
//   };

//   // Use displayGrade if available, otherwise fall back to result
//   const currentResult = displayGrade || result;

//   return (
//     <div
//       className={`w-full flex items-center gap-2 text-[12px] font-medium h-16 px-4 my-2 overflow-hidden ${
//         i % 2 === 0 ? "bg-slate-50" : "bg-white"
//       }`}
//     >
//       <div className="w-[100px] border-r font-bold">{i + 1}</div>

//       {/* Student Name with Avatar */}
//       <div className="w-[250px] flex border-r">
//         <div className="flex gap-2 items-center">
//           <img
//             className="mask mask-squircle w-14 h-14 rounded-md border object-cover"
//             src={pix}
//             alt={`${props?.studentFirstName} ${props?.studentLastName}`}
//           />
//           <div className="w-[180px]">
//             {props?.studentLastName} {props?.studentFirstName}
//           </div>
//         </div>
//       </div>

//       {/* Student Grade Display */}
//       <div className="w-[100px] border-r pl-2">
//         {currentResult?.mark !== undefined ? (
//           <>
//             {currentResult.mark} -{" "}
//             <span className="font-bold text-[12px]">{currentResult.grade}</span>
//           </>
//         ) : (
//           <span className="text-gray-400">N/A</span>
//         )}
//       </div>

//       {/* Attendance Ratio */}
//       <div className="w-[100px] border-r">
//         <AttendanceRatio props={props} />
//       </div>

//       {/* Test Score Input */}
//       <div className="w-[100px] border-r">
//         <input
//           className="w-[70px] h-8 outline-none border rounded-md px-2"
//           type="number"
//           min="0"
//           max="40"
//           placeholder={`${
//             currentResult?.test4 !== undefined ? currentResult.test4 : 0
//           }`}
//           value={test4}
//           onChange={(e: any) => {
//             const value = e.target.value;
//             if (
//               value === "" ||
//               (parseInt(value) >= 0 && parseInt(value) <= 40)
//             ) {
//               setTest4(value);
//             }
//           }}
//         />
//       </div>

//       {/* Examination Score Input */}
//       <div className="w-[100px] border-r">
//         <input
//           className="w-[80px] h-8 outline-none border rounded-md px-2"
//           type="number"
//           min="0"
//           max="60"
//           placeholder={`${
//             currentResult?.exam !== undefined ? currentResult.exam : 0
//           }`}
//           value={exam}
//           onChange={(e: any) => {
//             const value = e.target.value;
//             if (
//               value === "" ||
//               (parseInt(value) >= 0 && parseInt(value) <= 60)
//             ) {
//               setExam(value);
//             }
//           }}
//         />
//       </div>

//       {/* Submit Button */}
//       <div className="w-[180px] border-r relative">
//         <Button
//           name={loading ? "Loading..." : "Add Score"}
//           icon={
//             loading && (
//               <ClipLoader color="white" size={12} className="absolute" />
//             )
//           }
//           className="pl-4 py-3 w-[85%] bg-black text-white hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//           onClick={makeGrade}
//           disabled={loading}
//         />
//       </div>
//     </div>
//   );
// };

// const AttendanceRatio: FC<iProps> = ({ props }) => {
//   const { mainStudentAttendance } = useStudentAttendance(props?._id);

//   const calculateAttendanceRatio = () => {
//     const attendance = mainStudentAttendance?.data?.attendance;

//     if (!attendance || attendance.length === 0) {
//       return "0.00";
//     }

//     const presentCount = attendance.filter(
//       (el: any) => el.present === true
//     ).length;
//     const totalCount = attendance.length;
//     const ratio = (presentCount / totalCount) * 100;

//     return ratio.toFixed(2);
//   };

//   return <div>{calculateAttendanceRatio()}%</div>;
// };

// const SubjectGradeCard = () => {
//   const { teacherInfo } = useTeacherInfo();
//   const { subjectID } = useParams();
//   const { subjectInfo } = useSujectInfo(subjectID);
//   const { viewClasses } = useViewSchoolClassRM(teacherInfo?.schoolIDs);

//   // Find the class that contains this subject
//   const mainClass = viewClasses?.classRooms?.find((el: any) => {
//     return el?.classSubjects?.find((subj: any) => subj === subjectID);
//   });

//   const { oneClass } = useReadOneClassInfo(mainClass?._id);
//   const { classStudents } = useClassStudent(oneClass?._id);

//   // Sort students by last name
//   const sortedStudents =
//     classStudents?.students?.sort((a: any, b: any) =>
//       a.studentLastName?.localeCompare(b.studentLastName)
//     ) || [];

//   useEffect(() => {
//     if (teacherInfo?.schoolIDs) {
//       mutate(`api/view-classrooms/`);
//     }
//   }, [teacherInfo?.schoolIDs]);

//   return (
//     <div>
//       <Toaster position="top-center" reverseOrder={true} />

//       <LittleHeader
//         name={`Entry ${subjectInfo?.subjectTitle || "Subject"} Grades`}
//       />

//       <div className="mt-10" />

//       <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-x-auto">
//         {/* Table Header */}
//         <div className="text-gray-600 w-[1000px] flex gap-2 text-[12px] font-medium uppercase mb-10 px-4">
//           <div className="w-[100px] border-r">Sequence</div>
//           <div className="w-[250px] border-r">Student Info</div>
//           <div className="w-[100px] border-r">Student's Grade</div>
//           <div className="w-[100px] border-r">Attendance Ratio</div>
//           <div className="w-[100px] border-r">Test Score (40)</div>
//           <div className="w-[100px] border-r">Exam Score (60)</div>
//           <div className="w-[180px] border-r">Submit Report</div>
//         </div>

//         {/* Table Body */}
//         <div className="w-[1000px] overflow-hidden">
//           {sortedStudents.length > 0 ? (
//             sortedStudents.map((student: any, index: number) => (
//               <MainStudentRow key={student._id} props={student} i={index} />
//             ))
//           ) : (
//             <div className="text-center py-8 text-gray-500">
//               No students enrolled in this class yet
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubjectGradeCard;





document.title = "View Students for Grading";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import { FC, useState, useEffect } from "react";
import {
  useSchoolSessionData,
  useSchoolClassRMDetail,
  useViewSchoolClassRM,
  useStudentAttendance,
} from "../../../pages/hook/useSchoolAuth";
import {
  useClassStudent,
  useStudentGrade,
  useSujectInfo,
  useTeacherInfo,
  useSchoolAnnouncement,
} from "../../hooks/useTeacher";
import { createGradeScore } from "../../api/teachersAPI";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
import ClipLoader from "react-spinners/ClipLoader";
import { useOneExamSubjectStudentPerfomance } from "../../hooks/useQuizHook";

interface iProps {
  props?: any;
  id?: string;
  data?: any;
  i?: number;
}

const MainStudentRow: FC<iProps> = ({ props, i }) => {
  const { subjectID } = useParams();
  const { teacherInfo } = useTeacherInfo();
  const { schoolAnnouncement } = useSchoolAnnouncement(teacherInfo?.schoolIDs);
  const { subjectInfo } = useSujectInfo(subjectID);

  const { oneStudentPerformanceExam: oneStudentPerformance } =
    useOneExamSubjectStudentPerfomance(
      subjectID,
      subjectInfo?.examination[subjectInfo?.examination.length - 1]
    );

  const [loading, setLoading] = useState<boolean>(false);
  const [test4, setTest4] = useState("");
  const [exam, setExam] = useState("");

  // Local state for immediate display after submission
  const [displayGrade, setDisplayGrade] = useState<any>(null);

  const { gradeData } = useStudentGrade(props?._id);

  // Find the current report card entry
  const reportData = gradeData?.reportCard?.find((el: any) => {
   
    const x = el.classInfo?.trim()?.replace(/\s+/g, " ")
      ?.replace(/\n/g, "").trim();
const y =  `${subjectInfo?.designated} session: ${schoolAnnouncement?.presentSession}(${schoolAnnouncement?.presentTerm})`

    return (
      el.classInfo?.replace(/\s+/g, " ")?.replace(/\n/g, "")?.trim() 
     
    );
  });

// console.clear()

  

  // Find the subject result
  const result = reportData?.result?.find((el: any) => {
    return el.subject === subjectInfo?.subjectTitle;
  });

  // Calculate grade based on total marks
  const calculateGrade = (totalMark: number): string => {
    if (totalMark >= 90) return "A+";
    if (totalMark >= 80) return "A";
    if (totalMark >= 70) return "B";
    if (totalMark >= 60) return "C";
    if (totalMark >= 50) return "D";
    if (totalMark >= 40) return "E";
    return "F";
  };

  const makeGrade = async () => {
    try {
      setLoading(true);

      // Use entered values if available, otherwise use existing result data
      const test4Score = test4 ? parseInt(test4) : result?.test4 || 0;
      const examScore = exam ? parseInt(exam) : result?.exam || 0;

      // Calculate total and grade immediately (including test1, test2, test3)
      const totalMark =
        (result?.test1 || 0) +
        (result?.test2 || 0) +
        (result?.test3 || 0) +
        test4Score +
        examScore;
      const grade = calculateGrade(totalMark);

      const response = await createGradeScore(teacherInfo?._id, props?._id, {
        subject: subjectInfo?.subjectTitle,
        test1: result?.test1 || 0,
        test2: result?.test2 || 0,
        test3: result?.test3 || 0,
        test4: test4Score,
        exam: examScore,
      });

      // Update local display state immediately
      setDisplayGrade({
        mark: totalMark,
        grade: grade,
        test1: result?.test1 || 0,
        test2: result?.test2 || 0,
        test3: result?.test3 || 0,
        test4: test4Score,
        exam: examScore,
      });

      // Refresh data from server
      await mutate(`api/student-report-card/${props?._id}`);

      setLoading(false);
      toast.success("Grade added successfully!");

      // Clear input fields
      setTest4("");
      setExam("");
    } catch (error: any) {
      setLoading(false);
      toast.error("Failed to add grade. Please try again.");
      console.error("Error adding grade:", error);
    }
  };

  // Use displayGrade if available, otherwise fall back to result from database
  const currentResult = displayGrade || result;

  

  return (
    <div
      className={`w-full flex items-center gap-2 text-[12px] font-medium h-16 px-4 my-2 overflow-hidden ${
        i % 2 === 0 ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className="w-[100px] border-r font-bold">{i + 1}</div>

      {/* Student Name with Avatar */}
      <div className="w-[250px] flex border-r">
        <div className="flex gap-2 items-center">
          <img
            className="mask mask-squircle w-14 h-14 rounded-md border object-cover"
            src={pix}
            alt={`${props?.studentFirstName} ${props?.studentLastName}`}
          />
          <div className="w-[180px]">
            {props?.studentLastName} {props?.studentFirstName}
          </div>
        </div>
      </div>

      {/* Student Grade Display */}
      <div className="w-[100px] border-r pl-2">
        {currentResult?.mark !== undefined ? (
          <>
            {currentResult.mark} -{" "}
            <span className="font-bold text-[12px]">{currentResult.grade}</span>
          </>
        ) : (
          <span className="text-gray-400">N/A</span>
        )}
      </div>

      {/* Attendance Ratio */}
      <div className="w-[100px] border-r">
        <AttendanceRatio props={props} />
      </div>

      {/* Test Score Input */}
      <div className="w-[100px] border-r">
        <input
          className="w-[70px] h-8 outline-none border rounded-md px-2"
          type="number"
          min="0"
          max="40"
          placeholder={
            result?.test4 !== undefined && result?.test4 !== null
              ? result.test4.toString()
              : "0"
          }
          value={test4}
          onChange={(e: any) => {
            const value = e.target.value;
            if (
              value === "" ||
              (parseInt(value) >= 0 && parseInt(value) <= 40)
            ) {
              setTest4(value);
            }
          }}
        />
      </div>

      {/* Examination Score Input */}
      <div className="w-[100px] border-r">
        <input
          className="w-[80px] h-8 outline-none border rounded-md px-2"
          type="number"
          min="0"
          max="60"
          placeholder={
            result?.exam !== undefined && result?.exam !== null
              ? result.exam.toString()
              : "0"
          }
          value={exam}
          onChange={(e: any) => {
            const value = e.target.value;
            if (
              value === "" ||
              (parseInt(value) >= 0 && parseInt(value) <= 60)
            ) {
              setExam(value);
            }
          }}
        />
      </div>

      {/* Submit Button */}
      <div className="w-[180px] border-r relative">
        <Button
          name={loading ? "Loading..." : "Add Score"}
          icon={
            loading && (
              <ClipLoader color="white" size={12} className="absolute" />
            )
          }
          className="pl-4 py-3 w-[85%] bg-black text-white hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={makeGrade}
          disabled={loading}
        />
      </div>
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props?._id);

  const calculateAttendanceRatio = () => {
    const attendance = mainStudentAttendance?.data?.attendance;

    if (!attendance || attendance.length === 0) {
      return "0.00";
    }

    const presentCount = attendance.filter(
      (el: any) => el.present === true
    ).length;
    const totalCount = attendance.length;
    const ratio = (presentCount / totalCount) * 100;

    return ratio.toFixed(2);
  };

  return <div>{calculateAttendanceRatio()}%</div>;
};

const SubjectGradeCard = () => {
  const { teacherInfo } = useTeacherInfo();
  const { subjectID } = useParams();
  const { subjectInfo } = useSujectInfo(subjectID);
  const { viewClasses } = useViewSchoolClassRM(teacherInfo?.schoolIDs);

  // Find the class that contains this subject
  const mainClass = viewClasses?.classRooms?.find((el: any) => {
    return el?.classSubjects?.find((subj: any) => subj === subjectID);
  });

  const { oneClass } = useReadOneClassInfo(mainClass?._id);
  const { classStudents } = useClassStudent(oneClass?._id);

  // Sort students by last name
  const sortedStudents =
    classStudents?.students?.sort((a: any, b: any) =>
      a.studentLastName?.localeCompare(b.studentLastName)
    ) || [];

  useEffect(() => {
    if (teacherInfo?.schoolIDs) {
      mutate(`api/view-classrooms/`);
    }
  }, [teacherInfo?.schoolIDs]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />

      <LittleHeader
        name={`Entry ${subjectInfo?.subjectTitle || "Subject"} Grades`}
      />

      <div className="mt-10" />

      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-x-auto">
        {/* Table Header */}
        <div className="text-gray-600 w-[1000px] flex gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[100px] border-r">Sequence</div>
          <div className="w-[250px] border-r">Student Info</div>
          <div className="w-[100px] border-r">Student's Grade</div>
          <div className="w-[100px] border-r">Attendance Ratio</div>
          <div className="w-[100px] border-r">Test Score (40)</div>
          <div className="w-[100px] border-r">Exam Score (60)</div>
          <div className="w-[180px] border-r">Submit Report</div>
        </div>

        {/* Table Body */}
        <div className="w-[1000px] overflow-hidden">
          {sortedStudents.length > 0 ? (
            sortedStudents.map((student: any, index: number) => (
              <MainStudentRow key={student._id} props={student} i={index} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No students enrolled in this class yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectGradeCard;