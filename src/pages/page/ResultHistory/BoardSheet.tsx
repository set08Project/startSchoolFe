document.title = "View Students Grades";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import moment from "moment";
import { FC, useEffect, useRef, useState } from "react";
import {
  useSchoolData,
  useSchoolSessionData,
  useStudentAttendance,
} from "../../../pages/hook/useSchoolAuth";

import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import {
  useReadMyClassInfoData,
  useReadOneClassInfo,
} from "../../../pagesForStudents/hooks/useStudentHook";
import lodash from "lodash";
import {
  useClassStudent,
  useClassSubject,
  useStudentGrade,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { useNavigate, useParams } from "react-router-dom";
import { adminReport, approveMainReport } from "../../api/schoolAPIs";
import { Margin, Resolution, usePDF } from "react-to-pdf";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaSpinner } from "react-icons/fa6";

interface iProps {
  props?: any;
  id?: string;
  el?: any;
  data?: any;
  i?: number;
  stateValue?: string;
  teacherInfo?: any;
}

const SubjectScore: FC<iProps> = ({ props, el }) => {
  const { gradeData } = useStudentGrade(props?._id);
  const { data } = useSchoolData();
  const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);
  const { classID } = useParams();
  const { oneClass } = useReadOneClassInfo(classID);
  const { state } = useReadMyClassInfoData("JSS 1A");
  const { subjectData } = useClassSubject(state?._id);

  let result = gradeData?.reportCard
    .find((el: any) => {
      return (
        el.classInfo ===
        `${props?.classAssigned} session: ${
          schoolInfo?.find((el) => el?.year === data?.presentSession)?.year
        }(${
          schoolInfo?.find((el) => el?.presentTerm === data?.presentTerm)
            ?.presentTerm
        })`
      );
    })
    ?.result?.find((data: any) => {
      return data.subject === el?.subjectTitle;
    });

  return (
    <div className="w-[120px] border-r-2 border-blue-950 ">
      <div>
        <div className="w-[120px] ">
          <p className="pl-1 font-bold text-[12px] ">
            {/* {result?.subject ? result?.subject : "Have't Entered"} */}
          </p>
          <div className="pl-1 flex gap-1 mt-2 text-[10px] ">
            {/* <p className="w-[30px] border-r">1st</p>
            <p className="w-[30px] border-r">2nd</p>
            <p className="w-[30px] border-r">3rd</p> */}
            <p className="w-[30px] border-r">4th</p>
            <p className="w-[35px] border-r">Exam</p>
            <p className="w-[35px] ">Total</p>
            {/* <p className="w-[35px] ">Grade</p> */}
          </div>
        </div>
      </div>
      <div className="pl-1 flex gap-1 mt-2 text-[12px] ">
        {/* <p className="w-[30px] border-r">{result?.test1 ? result?.test1 : 0}</p>
        <p className="w-[30px] border-r">{result?.test2 ? result?.test2 : 0}</p>
        <p className="w-[30px] border-r">{result?.test3 ? result?.test3 : 0}</p> */}
        {/* 
        <p className="w-[30px] border-r">
          {result?.test4
            ? result?.test1 + result?.test2 + result?.test3 + result?.test4
            : 22}
        </p> */}

        {/* <p className="w-[30px] border-r">{0}</p>
        <p className="w-[30px] border-r">{0}</p>
        <p className="w-[30px] border-r">{0}</p> */}

        <p className="w-[30px] border-r">
          {!isNaN(result?.test1 + result?.test2 + result?.test3 + result?.test4)
            ? result?.test1 + result?.test2 + result?.test3 + result?.test4
            : 0}
        </p>

        <p className="w-[35px] border-r">{result?.exam ? result?.exam : 0}</p>
        <p className="w-[35px] font-bold border-r">
          {result?.mark ? result?.mark : 0}
        </p>
        {/* <p className="w-[35px] font-bold">
          {result?.grade ? result?.grade : "Nill"}
        </p> */}
      </div>
    </div>
  );
};

const MainStudentRow: FC<iProps> = ({ props, i }) => {
  const { classID } = useParams();
  const { data } = useSchoolData();
  const { gradeData } = useStudentGrade(props?._id);
  const { oneClass } = useReadOneClassInfo(classID!);

  const { subjectData } = useClassSubject(oneClass?._id);
  const { classStudents } = useClassStudent(oneClass?._id!);

  const { schoolInfo } = useSchoolSessionData(props?.schoolIDs);

  let result = gradeData?.reportCard.find((el: any) => {
    return (
      el.classInfo ===
      `${props?.classAssigned} session: ${
        schoolInfo?.find((el) => el.presentTerm === oneClass?.presentTerm)?.year
      }(${
        schoolInfo?.find((el) => el.presentTerm === oneClass?.presentTerm)
          ?.presentTerm
      })`
    );
  });

  const [stateValue, setStateValue] = useState(
    `${result?.classTeacherComment ? result?.classTeacherComment : ""}`
  );

  let score = result?.result?.map((el) => el?.mark).reduce((a, b) => a + b);

  const x = score / result?.result?.length;

  const grade =
    x >= 0 && x <= 39
      ? "F9"
      : x >= 39 && x <= 44
      ? "E8"
      : x >= 44 && x <= 49
      ? "D7"
      : x >= 49 && x <= 54
      ? "C6"
      : x >= 54 && x <= 59
      ? "C5"
      : x >= 59 && x <= 64
      ? "C4"
      : x >= 64 && x <= 69
      ? "B3"
      : x >= 69 && x <= 74
      ? "B2"
      : x >= 74 && x <= 100
      ? "A1"
      : null;
  return (
    <div
      className={`w-full flex items-center gap-2 text-[12px] font-medium  h-28 px-4 my-2  overflow-hidden ${
        i % 2 === 0 ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className={`w-[40px] border-r font-bold`}>{i + 1}</div>
      {/* name */}
      <div className="w-[150px] flex border-r">
        <div className="flex gap-2">
          <div className="w-[180px] break-words">
            {" "}
            {props?.studentFirstName} {props?.studentLastName}
          </div>
        </div>
      </div>
      <div className="w-[40px] border-r">
        {/* <AttendanceRatio props={props} /> */}
        {props?.gender.charAt(0)}
      </div>

      <div
        className={`w-[${
          subjectData?.classSubjects.length * 290
        }px]  border-r items-center flex`}
      >
        <div className="flex gap-4 ">
          {lodash
            .sortBy(subjectData?.classSubjects, "subjectTitle")
            ?.map((el: any) => (
              <SubjectScore props={props} el={el} />
            ))}
        </div>
      </div>

      <div className="w-[40px] border-r ">{result?.result?.length}</div>

      <div className="w-[40px] border-r ">{score}</div>
      <div className="w-[60px] border-r ">
        {(score / result?.result?.length).toFixed(2)}
      </div>

      <div className="w-[40px] border-r">{grade}</div>
      {/* <div className="w-[40px] border-r">{result?.grade}</div> */}
    </div>
  );
};

const Remark: FC<iProps> = ({ id, data }) => {
  const { mainStudentAttendance } = useStudentAttendance(id!);

  let name2 = data?.studentFirstName;

  let result = mainStudentAttendance?.data?.attendance?.find((el: any) => {
    return el?.studentFirstName === name2;
  });

  let timer = Date.now();

  return (
    <div
      className={`w-[100px] border-r 
      ${
        result?.present
          ? "text-green-600"
          : result?.absent
          ? "text-red-600"
          : null
      }`}
    >
      {moment(result?.createdAt).format("ll") === moment(timer).format("ll") &&
      result?.present
        ? "Present"
        : result?.absent
        ? "Absent"
        : null}
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props?._id);

  return (
    <div>
      {(mainStudentAttendance?.data?.attendance?.filter(
        (el: any) => el.present === true
      ).length /
        mainStudentAttendance?.data?.attendance?.length) *
      100 ? (
        <div>
          {(
            (mainStudentAttendance?.data?.attendance?.filter(
              (el: any) => el.present === true
            ).length /
              mainStudentAttendance?.data?.attendance?.length) *
            100
          ).toFixed(2)}
          %
        </div>
      ) : (
        <p>0%</p>
      )}
    </div>
  );
};

const SubjectMap: FC<iProps> = ({ props }) => {
  return (
    <div className="w-[120px] border-r h-[150px] flex flex-col relative  justify-start items-start ">
      {/* <p className="mb-4">Subject Offered</p>{" "} */}
      {/* Add margin-bottom for spacing */}
      <div className="absolute top-[60%] left-3 transform -translate-x-[90%] -translate-y-[70%] rotate-90 text-start h-[180px] w-[150px] mt-10 break-words text-[14px] font-[500] text-black ">
        {props?.subjectTitle}
      </div>
    </div>
  );
};

import jsPDF from "jspdf";
const BroadSheetReportCardApproved = () => {
  const navigate = useNavigate();
  const { classID } = useParams();

  const { oneClass } = useReadOneClassInfo(classID);

  const { state } = useReadMyClassInfoData(oneClass?.className);

  const { classStudents } = useClassStudent(oneClass?._id!);
  const { subjectData } = useClassSubject(oneClass?._id);
  const [data, setData] = useState([]);

  const [text, setText] = useState("");
  const [resultToggle, setResultToggle] = useState<boolean>(false);

  // Sort students by their total score
  const sortedStudents = lodash.orderBy(
    classStudents?.students,
    [
      (student) => {
        // Calculate the total score for each student
        const gradeData = student?.gradeData?.reportCard?.find((el: any) => {
          return (
            el.classInfo ===
            `${student?.classAssigned} session: ${oneClass?.presentSession}(${oneClass?.presentTerm})`
          );
        });

        return (
          gradeData?.result
            ?.map((el: any) => el?.mark)
            ?.reduce((a: number, b: number) => a + b, 0) || 0
        ); // Default to 0 if no marks
      },
    ],
    ["desc"] // Sort in descending order
  );

  const contentRef = useRef<HTMLDivElement>(null);

  const preprocessContent = () => {
    const content = contentRef.current;
    if (!content) return;

    // Traverse the DOM and replace "oklch" color functions with a fallback color
    const elementsWithUnsupportedColors = content.querySelectorAll("*");
    elementsWithUnsupportedColors.forEach((element: any) => {
      const computedStyles = window.getComputedStyle(element);
      if (computedStyles.color.includes("oklch")) {
        element.style.color = "#000000"; // Replace with a fallback color
      }
    });
  };

  const { toPDF, targetRef }: any = usePDF({
    filename: `build--${moment(Date.now()).format("lll")}.pdf`,
    page: {
      orientation: "landscape", // Ensure landscape orientation
      // unit: "px", // Use pixels for dimensions
      // format: [2820, 1080],
      //  // Set custom dimensions (e.g., full HD resolution)
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingView, setLoadingView] = useState<boolean>(false);

  useEffect(() => {
    preprocessContent();
  }, []);
  // ${loadingView ? `${100 + subjectData?.classSubjects.length * 160}
  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={"Class Result Broad Sheet"} />
      <div className="mt-10" />

      <div className="flex justify-end mb-4">
        <button
          disabled={loading}
          className={`text-[12px] tracking-widest transistion-all duration-300 hover:bg-red-100 px-8 py-2 rounded-md bg-red-50 ${
            loading && "cursor-not-allowed bg-red-200 animate-pulse"
          }`}
          onClick={() => {
            setLoading(true);
            setLoadingView(true);

            const x = setTimeout(() => {
              toPDF().finally(() => {
                setLoading(false);

                setLoadingView(false);
                clearTimeout(x);

                toast.success("Result downloaded.");
              });
            }, 2000);
          }}
        >
          {loading ? (
            <div className="flex gap-2 items-center">
              <FaSpinner className="animate-spin" />
              <span>downloading...</span>
            </div>
          ) : (
            "Print Result"
          )}
        </button>
      </div>
      <div className="flex w-full justify-end"></div>
      <div
        ref={targetRef}
        style={{
          width: `${
            loadingView
              ? `${100 + subjectData?.classSubjects.length * 160}px`
              : ""
          } `, // Full width for PDF
          height: "100%", // Full height for PDF
          // overflow: "hidden", // Prevent content overflow
        }}
        className={`py-6 px-2 min-w-[300px]  ${
          !loadingView ? "border rounded-md overflow-y-hidden" : ""
        } 
        `}
      >
        <div
          className={`text-[gray] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4`}
          style={{
            width: `${100 + subjectData?.classSubjects.length * 160}px`,
          }}
        >
          <div className="w-[40px] border-r">S/N</div>
          <div className="w-[220px] border-r">student Info</div>
          <div className="w-[40px] border-r">sex</div>
          {/* 260px */}
          <div
            className={`w-[${
              subjectData?.classSubjects.length * 290
            }px] border-r`}
          >
            {/* <div>Subject Grade</div> */}
            <div className=" flex ">
              <div className="flex gap-4">
                {lodash
                  .sortBy(subjectData?.classSubjects, "subjectTitle")
                  ?.map((props: any) => (
                    <SubjectMap props={props} />
                  ))}
              </div>
            </div>
          </div>
          {/* <div className="w-[100px] border-r"></div>
          <div className="w-[100px] border-r"></div> */}
          <div className="w-[40px] border-r h-[150px] flex flex-col relative  justify-start items-start ">
            <div className="absolute top-[60%] left-1 transform -translate-x-[100%] -translate-y-[70%] rotate-90 text-start h-[180px] w-[150px] mt-10 break-words ">
              No. of Subj.
            </div>
          </div>
          <div className="w-[40px] border-r h-[150px] flex flex-col relative  justify-start items-start ">
            <div className="absolute top-[60%] left-1 transform -translate-x-[100%] -translate-y-[70%] rotate-90 text-start h-[180px] w-[150px] mt-10 break-words ">
              Total Score
            </div>
          </div>
          <div className="w-[60px] border-r h-[150px] flex flex-col relative  justify-start items-start ">
            <div className="absolute top-[60%] left-1 transform -translate-x-[100%] -translate-y-[70%] rotate-90 text-start h-[180px] w-[150px] mt-10 break-words ">
              Total Points
            </div>
          </div>
          <div className="w-[40px] border-r h-[150px] flex flex-col relative  justify-start items-start ">
            <div className="absolute top-[60%] left-1 transform -translate-x-[100%] -translate-y-[70%] rotate-90 text-start h-[180px] w-[150px] mt-10 break-words ">
              Grade
            </div>
          </div>
          {/* <div className="w-[40px] border-r h-[150px] flex flex-col relative  justify-start items-start ">
            <div className="absolute top-[60%] left-1 transform -translate-x-[100%] -translate-y-[70%] rotate-90 text-start h-[180px] w-[150px] mt-10 break-words ">
              Postition
            </div>
          </div> */}
        </div>

        <div
          className={` overflow-hidde`}
          style={{
            width: `${100 + subjectData?.classSubjects.length * 160}px`,
          }}
        >
          {sortedStudents?.length > 0 ? (
            <div>
              {sortedStudents?.map((props: any, i: number) => (
                <div key={props}>
                  <MainStudentRow props={props} i={i} />
                </div>
              ))}
            </div>
          ) : (
            <div>No student yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BroadSheetReportCardApproved;
