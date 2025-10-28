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
  useSchoolData,
} from "../../../pages/hook/useSchoolAuth";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
import ClipLoader from "react-spinners/ClipLoader";

// import {

// } from "../../hooks/useTeacher";

// import { createGradeScore } from "../../api/teachersAPI";

import {
  useExamSubjectPerfomance,
  useOneExamSubjectStudentPerfomance,
} from "@/pagesForTeachers/hooks/useQuizHook";
import { createGradeScore } from "@/pagesForTeachers/api/teachersAPI";
import {
  useClassStudent,
  useStudentGrade,
  useSujectInfo,
  useTeacherInfo,
  useSchoolAnnouncement,
} from "@/pagesForTeachers/hooks/useTeacher";

interface iProps {
  props?: any;
  id?: string;
  data?: any;
  i?: number;
}

const MainStudentRow: FC<iProps> = ({ props, i }) => {
  const { subjectID, examID } = useParams();
  // const { teacherInfo } = useTeacherInfo();
  const { data } = useSchoolData();
  const { schoolAnnouncement } = useSchoolAnnouncement(data?._id);
  const { subjectInfo } = useSujectInfo(subjectID);
  const { examPerformance } = useExamSubjectPerfomance(examID!);

  // console.clear()
  // console.log(examPerformance?.performance)

  const studentFullNameA = `${props?.studentFirstName ?? ""} ${
    props?.studentLastName ?? ""
  }`
    .trim()
    .toLowerCase();
  const studentFullNameB = `${props?.studentLastName ?? ""} ${
    props?.studentFirstName ?? ""
  }`
    .trim()
    .toLowerCase();

  const performanceList: any[] = Array.isArray(examPerformance)
    ? examPerformance
    : examPerformance?.performance ?? [];

  const matchedPerformance =
    performanceList.find((p: any) => {
      const name = (p?.studentName ?? "").trim().toLowerCase();
      return name === studentFullNameA || name === studentFullNameB;
    }) ?? null;

  const performanceRating = matchedPerformance?.performanceRating ?? null;
  const performanceRatingII =
    matchedPerformance?.studentScore *
    parseInt(matchedPerformance?.markPerQuestion);

  const { oneStudentPerformanceExam: oneStudentPerformance } =
    useOneExamSubjectStudentPerfomance(
      subjectID,
      subjectInfo?.examination[subjectInfo?.examination.length - 1]
    );

  const [loading, setLoading] = useState<boolean>(false);

  // Local state for immediate display after submission
  const [displayGrade, setDisplayGrade] = useState<any>(null);

  const { gradeData } = useStudentGrade(props?._id);

  // Find the current report card entry
  const reportData = gradeData?.reportCard?.find((el: any) => {
    const x = el.classInfo
      ?.trim()
      ?.replace(/\s+/g, " ")
      ?.replace(/\n/g, "")
      .trim();
    const y = `${subjectInfo?.designated} session: ${schoolAnnouncement?.presentSession}(${schoolAnnouncement?.presentTerm})`;

    return el.classInfo?.replace(/\s+/g, " ")?.replace(/\n/g, "")?.trim();
  });

  // Find the subject result
  const result = reportData?.result?.find((el: any) => {
    return el.subject === subjectInfo?.subjectTitle;
  });

  // initialize local input state empty; we'll sync from `result` below so
  // the inputs update when server data changes (e.g. after mutate())
  const [test4, setTest4] = useState(
    result?.test4 ? result.test4.toString() : ""
  );
  const [exam, setExam] = useState<string>("");
  const [isEditingExam, setIsEditingExam] = useState<boolean>(false);

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

  const computedExamDefault =
    performanceRatingII !== null && performanceRatingII !== undefined
      ? performanceRatingII.toString()
      : "";

  // Keep the exam input in sync with server data unless the user is
  // actively typing (exam !== ""). When a fresh result arrives (for
  // example after mutate), populate the input so it always shows
  // result.exam.
  useEffect(() => {
    try {
      // If user hasn't typed anything, reflect the server value or
      // the computed default
      if (!isEditingExam && exam === "") {
        if (result?.exam !== undefined && result?.exam !== null) {
          setExam(String(result.exam));
        } else if (computedExamDefault !== "") {
          setExam(computedExamDefault);
        }
      }
    } catch (err) {
      console.error("sync exam effect error:", err);
    }
    // re-run when server value, computed default or user input changes
  }, [result?.exam, computedExamDefault, exam]);

  const makeGrade = async () => {
    try {
      setLoading(true);

      // Use entered values if available, otherwise use existing result data
      const test4Score = test4 ? parseInt(test4) : result?.test4 || 0;
      // const examScore = exam ? parseInt(exam) : result?.exam || 0;
      const examScore =
        exam !== ""
          ? parseInt(exam, 10)
          : result?.exam ??
            (computedExamDefault !== "" && !isNaN(Number(computedExamDefault))
              ? Math.round(Number(computedExamDefault))
              : 0);

      // Calculate total and grade immediately (including test1, test2, test3)
      const totalMark =
        (result?.test1 || 0) +
        (result?.test2 || 0) +
        (result?.test3 || 0) +
        test4Score +
        examScore;
      const grade = calculateGrade(totalMark);

      const response = await createGradeScore(props?._id, {
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
      // Keep exam and test4 showing the submitted value; clear only if you
      // want blank inputs. Mark editing false to allow server sync again.
      setTest4(String(test4Score));
      setExam(String(examScore));
      setIsEditingExam(false);
    } catch (error: any) {
      setLoading(false);
      toast.error("Failed to add grade. Please try again.");
      console.error("Error adding grade:", error);
    }
  };

  // Use displayGrade if available, otherwise fall back to result from database
  const currentResult = displayGrade || result;

  console.log("result: ", result);

  return (
    <div
      className={`text-blue-950 w-full flex items-center gap-2 text-[12px] font-medium h-16 px-4 my-2 overflow-hidden ${
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
      <div className="w-[100px] border-r mb-1">
        <p>
          <span className="text-[10px] font-medium">CBT Score:</span>{" "}
          {computedExamDefault === "NaN" ? "0" : computedExamDefault}
        </p>
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
          // show the user-typed value if present, otherwise show the latest
          // server value or computed default
          value={exam !== "" ? exam : ""}
          onChange={(e: any) => {
            const value = e.target.value;
            if (value === "" || (Number(value) >= 0 && Number(value) <= 60)) {
              setIsEditingExam(true);
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
  const { data } = useSchoolData();
  const { subjectID } = useParams();
  const { subjectInfo } = useSujectInfo(subjectID);
  const { viewClasses } = useViewSchoolClassRM(data?._id);

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
    if (data?._id) {
      mutate(`api/view-classrooms/`);
    }
  }, [data?._id]);

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
