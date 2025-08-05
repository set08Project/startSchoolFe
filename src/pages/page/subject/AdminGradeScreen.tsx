document.title = "View Students for Grading";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import { FC, useEffect, useState } from "react";
import {
  useSchoolClassRMDetail,
  useSchoolData,
  useSchoolSessionData,
  useStudentAttendance,
  useViewSchoolClassRM,
} from "../../hook/useSchoolAuth";

import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
import ClipLoader from "react-spinners/ClipLoader";

import {
  useClassStudent,
  useStudentGrade,
  useSujectInfo,
  useTeacherInfo,
} from "@/pagesForTeachers/hooks/useTeacher";
import { useOneExamSubjectStudentPerfomance } from "@/pagesForTeachers/hooks/useQuizHook";
import { createGradeScore } from "@/pagesForTeachers/api/teachersAPI";

interface iProps {
  props?: any;
  id?: string;
  data?: any;
  i?: number;
  teacherID?: number;
}

const MainStudentRow: FC<iProps> = ({ props, i, data, teacherID }) => {
  const { subjectID } = useParams();

  const { subjectInfo } = useSujectInfo(subjectID);

  const { oneStudentPerformanceExam: oneStudentPerformance } =
    useOneExamSubjectStudentPerfomance(
      subjectID,
      subjectInfo?.examination[subjectInfo?.examination.length - 1]
    );

  const [loading, setLoading] = useState<boolean>(false);

  const { schoolInfo } = useSchoolSessionData(data?._id);

  // console.clear();
  // console.log(data);

  const [test1, setTest1] = useState("0");
  const [test2, setTest2] = useState("0");
  const [test3, setTest3] = useState("0");
  const [test4, setTest4] = useState("0");
  const [exam, setExam] = useState("0");

  const { gradeData } = useStudentGrade(props?._id);

  let reportData = gradeData?.reportCard?.find((el: any) => {
    return (
      el.classInfo ===
      `${subjectInfo?.designated} session: ${
        schoolInfo &&
        schoolInfo?.find((el) => el.year === data?.presentSession)?.year
      }(${
        schoolInfo &&
        schoolInfo?.find((el) => el.presentTerm === data?.presentTerm)
          ?.presentTerm
      })`
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
      createGradeScore(teacherID.toString(), props?._id, {
        subject: subjectInfo?.subjectTitle,
        // test1: test1 ? parseInt(test1) : result?.test1 ? result?.test1 : 0,
        test1: 0,
        test2: 0,
        test3: 0,
        test4: test4 ? parseInt(test4) : result?.test4 ? result?.test4 : 0,
        exam: exam ? parseInt(exam) : result?.exam ? result?.exam : 0,
      }).then((res) => {
        setLoading(false);
        if (res.status === 201) {
          mutate(`api/student-report-card/${props?._id}`);
          console.log({
            subject: subjectInfo?.subjectTitle,
            // test1: test1 ? parseInt(test1) : result?.test1 ? result?.test1 : 0,
            test1: 0,
            test2: 0,
            test3: 0,
            test4: test4 ? parseInt(test4) : result?.test4 ? result?.test4 : 0,
            exam: exam ? parseInt(exam) : result?.exam ? result?.exam : 0,
          });
          toast.success("Grade added");
        } else {
          toast.error("Grade denied");
        }
      });
    } catch (error: any) {
      return error.stack;
    }
  };

  console.log(result);

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
            {props?.studentLastName} {props?.studentFirstName}
          </div>
        </div>
      </div>
      <div className="w-[100px] border-r pl-2">
        {result?.mark} -{" "}
        <span className="font-bold text-[12px]">{result?.grade}</span>
      </div>
      <div className="w-[100px] border-r">
        <AttendanceRatio props={props} />
      </div>
      {/* 
      <div className="w-[100px] border-r items-center flex">
        <input
          className="w-[70px] h-8 outline-none border rounded-md px-2 "
          //   type="number"
          placeholder={`${result?.test1 !== undefined ? result?.test1 : 0}`}
          value={test1}
          onChange={(e: any) => {
            setTest1(e.target.value);
          }}
          defaultValue={20}
        />
      </div>

      <div className="w-[100px] border-r">
        <input
          className="w-[70px] h-8 outline-none border rounded-md px-2 "
          //   type="number"
          placeholder={`${result?.test2 !== undefined ? result?.test2 : 0}`}
          value={test2}
          onChange={(e: any) => {
            setTest2(e.target.value);
          }}
        />
      </div>

      <div className="w-[100px] border-r">
        <input
          className="w-[70px] h-8 outline-none border rounded-md px-2 "
          //   type="number"
          placeholder={`${result?.test3 !== undefined ? result?.test3 : 0}`}
          value={test3}
          onChange={(e: any) => {
            setTest3(e.target.value);
          }}
        />
      </div> */}

      <div className="w-[100px] border-r">
        <input
          className="w-[70px] h-8 outline-none border rounded-md px-2 "
          //   type="number"
          placeholder={`${result?.test4 !== undefined ? result?.test4 : 0}`}
          value={test4}
          onChange={(e: any) => {
            setTest4(e.target.value);
          }}
        />
      </div>

      <div className="w-[100px] border-r  ">
        <input
          className="w-[80px] h-8 outline-none border rounded-md px-2 "
          //   type="number"
          placeholder={`${result?.exam !== undefined ? result?.exam : 0}`}
          value={exam}
          onChange={(e: any) => {
            {
              readResultData(props)
                ? setExam(
                    (
                      (readResultData(props)?.performanceRating / 100) *
                      60
                    ).toString()
                  )
                : setExam(e.target.value);
            }
          }}
        />
      </div>

      <div className="w-[180px] border-r relative">
        <Button
          name={loading ? "Loading" : "Add Score"}
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

const AdminSubjectGradeCardScreen = () => {
  const { data } = useSchoolData();
  const { teacherInfo } = useTeacherInfo();
  const { subjectID } = useParams();
  const { subjectInfo } = useSujectInfo(subjectID);

  const { classroom } = useSchoolClassRMDetail(subjectInfo?.subjectClassID);
  const { viewClasses } = useViewSchoolClassRM(data?._id);

  let mainClass = viewClasses?.classRooms?.find((el: any) => {
    return el?.classSubjects?.find((el: any) => {
      return el === subjectID;
    });
  });

  const { oneClass } = useReadOneClassInfo(mainClass?._id);
  const { classStudents } = useClassStudent(oneClass?._id!);
  const allStudents = classStudents?.students;
  const sortedStudents = allStudents?.sort((a, b) =>
    a.studentLastName?.localeCompare(b.studentLastName)
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
        <div className="text-[gray] w-[1000px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[100px] border-r">Sequence</div>
          <div className="w-[250px] border-r">student Info</div>
          <div className="w-[100px] border-r">Student's Grade</div>
          <div className="w-[100px] border-r">Student's Attendance Ratio</div>

          {/* <div className="w-[100px] border-r">
            1st Test <br />
            Score
          </div>
          <div className="w-[100px] border-r">
            2nd Test
            <br /> Score
          </div>
          <div className="w-[100px] border-r">
            3rd Test <br />
            Score
          </div> */}


          <div className="w-[100px] border-r">
            Test
            <br />
            Score
          </div>
          <div className="w-[100px] border-r">Examination Score</div>

          <div className="w-[180px] border-r">Submit Report</div>
        </div>

        <div className=" w-[1000px] overflow-hidden">
          {sortedStudents?.length > 0 ? (
            <div>
              {sortedStudents?.map((props: any, i: number) => (
                <div key={props}>
                  <MainStudentRow
                    props={props}
                    i={i}
                    data={data}
                    teacherID={oneClass?.teacherID}
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

export default AdminSubjectGradeCardScreen;
