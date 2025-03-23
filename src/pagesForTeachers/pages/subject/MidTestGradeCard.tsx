document.title = "View Students for Grading";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import { FC, useCallback, useEffect, useState } from "react";
import {
  useSchoolClassRM,
  useSchoolClassRMDetail,
  useSchoolSessionData,
  useStudentAttendance,
  useViewSchoolClassRM,
} from "../../../pages/hook/useSchoolAuth";
import {
  useClassStudent,
  useStudentGrade,
  useSujectInfo,
  useTeacherInfo,
  useSubjectPerformance,
  useMidTestResultPerformance,
} from "../../hooks/useTeacher";
import { createGradeScore } from "../../api/teachersAPI";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
import ClipLoader from "react-spinners/ClipLoader";
import {
  useOneExamSubjectStudentPerfomance,
  useOneSubjectStudentPerfomance,
} from "../../hooks/useQuizHook";

interface iProps {
  props?: any;
  data?: any;
  id?: string;
  i?: number;
}

const MainStudentRow: FC<iProps> = ({ props, i, data }) => {
  const { subjectID, quizID } = useParams();
  const { teacherInfo } = useTeacherInfo();

  const { subjectInfo } = useSujectInfo(subjectID);
  const { perform } = useSubjectPerformance(subjectID);

  const { oneStudentPerformanceExam: oneStudentPerformance } =
    useOneExamSubjectStudentPerfomance(
      subjectID,
      subjectInfo?.examination[subjectInfo?.examination.length - 1]
    );

  const [loading, setLoading] = useState<boolean>(false);

  const { schoolInfo } = useSchoolSessionData(teacherInfo?.schoolIDs);

  const [test1, setTest1] = useState("");
  const [test2, setTest2] = useState("");
  const [test3, setTest3] = useState("");
  const [test4, setTest4] = useState("");
  const [exam, setExam] = useState("");

  const { gradeData } = useStudentGrade(props?._id);

  let reportData = gradeData?.reportCard?.find((el: any) => {
    return (
      el.classInfo ===
      `${subjectInfo?.designated} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
    );
  });

  let result = reportData?.result.find((el: any) => {
    return el.subject === subjectInfo?.subjectTitle;
  });

  const readResultData = (props: any) => {
    let readData: any = oneStudentPerformance?.find((el: any) => {
      return (
        el.studentName ===
        `${props?.studentFirstName} ${props?.studentLastName}`
      );
    });

    return readData;
  };

  const makeGrade = () => {
    try {
      setLoading(true);
      createGradeScore(teacherInfo?._id, props?._id, {
        subject: subjectInfo?.subjectTitle,
        test1: test1 ? parseInt(test1) : result?.test1 ? result?.test1 : 0,
        test2: test2 ? parseInt(test2) : result?.test2 ? result?.test2 : 0,
        test3: test3 ? parseInt(test3) : result?.test3 ? result?.test3 : 0,
        test4: test4 ? parseInt(test4) : result?.test4 ? result?.test4 : 0,
        exam: exam ? parseInt(exam) : result?.exam ? result?.exam : 0,
      }).then((res) => {
        setLoading(false);
        // if (res.status === 201) {
        mutate(`api/student-report-card/${props?._id}`);
        toast.success("Grade added");
        // } else {
        //   toast.error("Grade denied");
        // }
      });
    } catch (error: any) {
      return error.stack;
    }
  };

  let resultValue = data?.find(
    (el) =>
      el.studentName === `${props?.studentFirstName} ${props?.studentLastName}`
  )?.performanceRating;

  const resultData = data?.find(
    (el) =>
      el.studentName === `${props?.studentFirstName} ${props?.studentLastName}`
  );

  return (
    <div
      className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
        i % 2 === 0 ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className={`w-[100px] border-r font-bold`}>{i + 1}</div>
      {/* name */}
      <div className="w-[250px] flex border-r">
        <div className="flex gap-2">
          <img
            className=" mask mask-squircle w-14 h-14 rounded-md border object-cover"
            src={pix}
          />

          <div className="w-[180px] ">
            {" "}
            {props?.studentFirstName} {props?.studentLastName}
          </div>
        </div>
      </div>
      <div className="w-[100px] border-r pl-2">
        {result?.mark} /{result?.score} -{" "}
        <span className="font-bold text-[12px]">
          {resultData?.studentGrade}
        </span>
      </div>
      <div className="w-[100px] border-r">
        <AttendanceRatio props={props} />
      </div>

      <div className="w-[100px] border-r  ">
        <input
          className="w-[80px] h-8 outline-none border rounded-md px-2 "
          //   type="number"
          placeholder={`${result?.exam !== undefined ? result?.exam : 0}`}
          value={resultValue}
          onChange={(e: any) => {
            {
              readResultData(props)
                ? setExam(resultValue)
                : setExam(e.target.value);
            }
          }}
          defaultChecked={resultValue}
          readOnly
        />
      </div>
      <div className="w-[180px] border-r relative">
        <Button
          name={loading ? "Loading" : "APPROVE"}
          icon={
            loading && (
              <ClipLoader
                color="white"
                size={12}
                className="py-0 my-0 absolute bottom-6 z-10 left-10"
              />
            )
          }
          className="pl-4 py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
          onClick={makeGrade}
        />
      </div>
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

const MidTestSubjectGradeCard = () => {
  const { teacherInfo } = useTeacherInfo();
  const { subjectID, quizID } = useParams();
  const { subjectInfo } = useSujectInfo(subjectID);

  const { classroom } = useSchoolClassRMDetail(teacherInfo?.schoolIDs);
  const { viewClasses } = useViewSchoolClassRM(teacherInfo?.schoolIDs);

  let mainClass = viewClasses?.classRooms?.find((el: any) => {
    return el?.classSubjects?.find((el: any) => {
      return el === subjectID;
    });
  });

  const { oneClass } = useReadOneClassInfo(mainClass?._id);
  const { classStudents } = useClassStudent(oneClass?._id!);
  const { midTestPerformance } = useMidTestResultPerformance(quizID);

  const allStudents = classStudents?.students;

  const sortedStudents = allStudents?.sort((a, b) =>
    a.studentFirstName?.localeCompare(b.studentFirstName)
  );

  useEffect(() => {
    mutate(`api/view-classrooms/`);
  }, [teacherInfo, subjectInfo, viewClasses]);

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={`Entry ${subjectInfo?.subjectTitle} Grades`} />

      <div className="mt-10" />

      <div className="flex w-full justify-end"></div>
      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
        <div className="text-[gray] w-[900px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[100px] border-r">Sequence</div>
          <div className="w-[250px] border-r">student Info</div>
          <div className="w-[100px] border-r">Student's Grade</div>
          <div className="w-[100px] border-r">Student's Attendance Ratio</div>

          <div className="w-[100px] border-r">Mid Test Examination Score</div>

          <div className="w-[180px] border-r">Submit Report</div>
        </div>

        <div className=" w-[900px] overflow-hidden">
          {sortedStudents?.length > 0 ? (
            <div>
              {sortedStudents?.map((props: any, i: number) => (
                <div key={props}>
                  <MainStudentRow
                    props={props}
                    i={i}
                    data={midTestPerformance?.performance}
                  />
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

export default MidTestSubjectGradeCard;
