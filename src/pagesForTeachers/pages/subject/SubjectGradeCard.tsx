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
import {
  useExamSubjectPerfomance,
  useOneExamSubjectStudentPerfomance,
} from "../../hooks/useQuizHook";

interface iProps {
  props?: any;
  id?: string;
  data?: any;
  i?: number;
}

const MainStudentRow: FC<iProps> = ({ props, i }) => {
  const { subjectID, examID } = useParams();
  const { teacherInfo } = useTeacherInfo();
  const { schoolAnnouncement } = useSchoolAnnouncement(teacherInfo?.schoolIDs);
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
    const y = `${subjectInfo?.designated} session: ${schoolAnnouncement?.presentSession}(${schoolAnnouncement?.presentTerm})`
      ?.trim()
      ?.replace(/\s+/g, " ")
      ?.replace(/\n/g, "")
      .trim();

    return x === y;
  });

  // Find the subject result
  const result = reportData?.result?.find((el: any) => {
    return el.subject === subjectInfo?.subjectTitle;
  });

  const [test4, setTest4] = useState(
    result?.text4 ? result.text4.toString() : ""
  );
  const [exam, setExam] = useState(result?.exam ? result.exam.toString() : "");
  const [teacherComment, setTeacherComment] = useState(
    result?.teacherComment ? result.teacherComment : ""
  );

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

      await createGradeScore(
        // teacherInfo?._id,
        props?._id,
        {
          subject: subjectInfo?.subjectTitle,
          test1: result?.test1 || 0,
          test2: result?.test2 || 0,
          test3: result?.test3 || 0,
          test4: test4Score,
          exam: examScore,
          teacherComment: teacherComment,
        }
      );

      // Update local display state immediately
      setDisplayGrade({
        mark: totalMark,
        grade: grade,
        test1: result?.test1 || 0,
        test2: result?.test2 || 0,
        test3: result?.test3 || 0,
        test4: test4Score,
        exam: examScore,
        teacherComment: teacherComment,
      });

      // Refresh data from server
      await mutate(`api/student-report-card/${props?._id}`);

      setLoading(false);
      toast.success("Grade added successfully!");

      // Clear input fields
      setTest4("");
      setExam(result?.exam ? result.exam.toString() : "");
      setTeacherComment("");
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
      className={`flex items-center gap-2 text-[12px] font-medium h-16 px-4 my-2 overflow-hidden whitespace-nowrap ${
        i % 2 === 0 ? "bg-slate-50" : "bg-white"
      }`}
      style={{ width: "1180px" }}
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
          // show explicit exam state if user typed one, otherwise show computed default
          value={exam !== "" ? exam : ""}
          onChange={(e: any) => {
            const value = e.target.value;
            if (value === "" || (Number(value) >= 0 && Number(value) <= 60)) {
              setExam(value);
            }
          }}
        />
      </div>

      {/* Teacher Comment Input */}
      <div className="w-[200px] border-r">
        <input
          className="w-[95%] h-8 outline-none border rounded-md px-2 text-[11px]"
          type="text"
          placeholder={`${
            result?.teacherComment ? result?.teacherComment : "Add a comment"
          }`}
          maxLength={100}
          value={teacherComment}
          onChange={(e: any) => setTeacherComment(e.target.value)}
          title="Teacher's comment for this subject"
        />
      </div>

      {/* Submit Button */}
      <div className="w-[180px] relative">
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
        <div className="text-gray-600 w-[1180px] flex gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[100px] border-r">Sequence</div>
          <div className="w-[250px] border-r">Student Info</div>
          <div className="w-[100px] border-r">Student's Grade</div>
          <div className="w-[100px] border-r">Attendance Ratio</div>
          <div className="w-[100px] border-r">Test Score (40)</div>
          <div className="w-[100px] border-r">Exam Score (60)</div>
          <div className="w-[200px] border-r">Teacher Comment</div>
          <div className="w-[180px]">Submit Report</div>
        </div>

        {/* Table Body */}
        <div className="w-[1180px] overflow-hidden">
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
