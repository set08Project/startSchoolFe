import { MdBook, MdDelete } from "react-icons/md";
import { FC, useEffect, useState } from "react";

import {
  useClassSubject,
  useExamination,
  useMidTest,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";
import TimeTableScreen from "./TimeTableScreen";
import { FaCheckDouble, FaStar } from "react-icons/fa6";
import pix from "../../../assets/pix.jpg";
import ReadingClassStudents from "./ReadingClassStudents";
import {
  useReadOneClassInfo,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import { readClassInfo } from "../../api/studentAPI";
import LittleHeader from "../../../components/layout/LittleHeader";
import { Link } from "react-router-dom";

interface iProps {
  props?: string;
}

// New component to check individual subject test status
const SubjectCard: FC<{ subject: any }> = ({ subject }) => {
  const { examination } = useExamination(subject?._id);
  const { midTest } = useMidTest(subject?._id);

  // Only render if at least one test is active
  const shouldDisplay = midTest?.startMidTest || examination?.startExam;

  if (!shouldDisplay) return null;

  return (
    <div className="bg-white border flex flex-col rounded-2xl pb-2 min-h-[200px] px-4 pt-4">
      <div className="mt-3 flex justify-between items-center font-bold">
        <p>{subject?.subjectTitle}</p>
        <div className="w-8 h-8 transition-all duration-300 rounded-full hover:bg-slate-50 cursor-pointer flex justify-center items-center">
          <MdBook className="hover:text-blue-900" />
        </div>
      </div>
      <div className="flex">
        <p className="text-[12px] bg-slate-100 rounded-sm py-2 pl-1 shadow-sm pr-4 mb-5">
          Class Subject
        </p>
      </div>
      <div className="flex-1" />
      <p className="text-[13px] font-medium">
        Subject Teacher Name: <span></span>
      </p>
      <div className="flex mb-4 gap-2 flex-wrap">
        <div className="text-blue-950 rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px]">
          {subject?.subjectTeacherName}
        </div>
      </div>

      <div className="text-blue-950 rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px] flex items-center gap-2">
        {midTest?.startMidTest && (
          <Link
            to={`/mid-test/details/${subject?._id}/${
              subject?.midTest[subject?.midTest?.length - 1]
            }`}
            className="text-white bg-orange-500 rounded-md px-4 py-2 text-[13px] cursor-pointer"
          >
            Start Mid Test
          </Link>
        )}

        {examination?.startExam && (
          <Link
            to={`/examination/details/${
              subject?.examination[subject?.examination?.length - 1]
            }`}
            className="text-white bg-purple-600 rounded-md px-4 py-2 text-[13px] cursor-pointer"
          >
            Start Examination
          </Link>
        )}
      </div>
    </div>
  );
};

const ClassSubjectScreen: FC<iProps> = ({ props }) => {
  const { subjectData } = useClassSubject(props!);

  useEffect(() => {
    localStorage.removeItem("exam");
    localStorage.removeItem("examQuestions");
    localStorage.removeItem("midTest");
    localStorage.removeItem("midTestQuestions");
  }, []);

  const hasSubjects = subjectData?.classSubjects?.length > 0;

  return (
    <div>
      {hasSubjects ? (
        <div className="mt-1 w-full gap-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {subjectData.classSubjects.map((subject: any) => (
            <SubjectCard key={subject?._id} subject={subject} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
          <FaCheckDouble size={13} />
          <p className="mt-3 text-[12px] font-medium">No Subject added yet</p>
        </div>
      )}
    </div>
  );
};

const MyClassRoomTestExamScreen = () => {
  const { studentInfo } = useStudentInfo();
  const [classInfo, setClassInfo] = useState<any>();
  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);

  useEffect(() => {
    readClassInfo(studentInfo?.classAssigned).then((res: any) => {
      setClassInfo(res?.data);
    });
  }, []);

  console.log("oneClass", studentInfo);

  return (
    <div className="text-blue-950">
      <LittleHeader name="My Test-Examination Ready Screen" />
      <div>Class: {studentInfo?.classAssigned}</div>

      <div className="w-full text-blue-950 h-[90px] rounded-lg border flex justify-between overflow-hidden">
        <div className="bg-blue-950 text-white w-[160px] md:w-[300px] px-4 py-2 rounded-lg">
          <div>All subjects ready for</div>
          <div className="text-[25px] font-medium">Test or Examination</div>
        </div>
      </div>
      <div className="my-6 border-t" />

      <div className="w-full min-h-[180px] pb-10 bg-slate-50 rounded-lg border py-2 px-4">
        <p>Class Subject for {oneClass?.className} for Test and Examination</p>
        <p className="text-[13px] font-bold mb-10">
          Below are all the subject this CLASS That are now Available!
        </p>

        <ClassSubjectScreen props={oneClass?._id} />
      </div>
    </div>
  );
};

export default MyClassRoomTestExamScreen;
