import moment from "moment";
import lodash from "lodash";
import LittleHeader from "../../../components/layout/LittleHeader";
import {
  useStudentAttendant,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import { useEffect, useState } from "react";
import { readClassInfo } from "../../api/studentAPI";

const ViewReportScreen = () => {
  const { studentInfo } = useStudentInfo();
  const { studentAttendance } = useStudentAttendant(studentInfo?._id);

  const [state, setState] = useState<any>({});

  useEffect(() => {
    readClassInfo(studentInfo?.classAssigned).then((res: any) => {
      setState(res.data);
    });
  }, []);

  let record: number = 0;
  let recordQuiz: any = [];

  for (let i = 0; i < studentAttendance?.attendance?.length; i++) {
    if (studentAttendance?.attendance[i].present) {
      record++;
    }
  }
  for (let i = 0; i < state?.classSubjects?.length; i++) {
    let x = state?.classSubjects[i]?.quiz?.length;
    // console.log(x);
    recordQuiz.push(x);
  }

  // let total = recordQuiz?.reduce((a: number, b: number) => {
  //   return a + b;
  // });

  console.log("Attendance: ", lodash.sumBy(recordQuiz));

  return (
    <div>
      <LittleHeader name={`${studentInfo?.studentFirstName}'s weekly Report`} />
      <div className="grid lg:grid-cols-5 grid-cols-1 w-full h-full gap-6">
        <div className=" lg:col-span-3 col-span-1  h-[400px] rounded-lg border-slate-300 border ">
          <p className="m-4 text-blue-950 font-semibold">Student's Profile</p>
          <div
            className="grid 
        grid-cols-2  h-[300px] gap-2 lg:w-[500px]"
          >
            <div className="col-span-1 h-full">
              <p className="p-4 ">Student's Name</p>
              <p className="p-4 ">Year</p>
              <p className="p-4 ">Class</p>
              <p className="p-4 ">Report Type</p>
              <p className="p-4 ">Teacher's Name</p>
            </div>
            <div className="col-span-1 h-full ">
              <div className="p-4 text-slate-500">
                {studentInfo?.studentFirstName} {studentInfo?.studentLastName}
              </div>
              <div className="p-4 text-slate-500">
                {moment(Date.now()).year()}
              </div>
              <div className="p-4 text-slate-500">
                {studentInfo?.classAssigned}
              </div>
              <div className="p-4 text-slate-500">Weekly</div>
              <div className="p-4 text-slate-500">
                {state?.classTeacherName}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 h-[400px] rounded-lg  border-slate-300 border ">
          <p className="m-4 text-blue-950 font-semibold">Weekly Report</p>
          <div
            className="grid 
        grid-cols-2  h-[300px] gap-2"
          >
            <div className="col-span-1  w-[140%]  h-full">
              <p className="p-4">Class Attendance</p>
              <p className="p-4 ">Assignments</p>
              <p className="p-4 "> Quizzes Taken</p>
              <p className="p-4 ">Tests Taken</p>
            </div>
            <div className="col-span-1 h-full ml-10 font-medium ">
              <div className="p-4 text-slate-500">
                {record} / {studentAttendance?.attendance?.length}
              </div>
              <div className="p-4 text-slate-500">
                {studentInfo?.performance?.length}/{lodash.sumBy(recordQuiz)}
              </div>
              {}

              <div className="p-4 text-slate-500">
                {studentInfo?.performance?.length}/{lodash.sumBy(recordQuiz)}
              </div>
              <div className="p-4 text-slate-500">
                {studentInfo?.performance?.length}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 h-[250px] rounded-lg border border-slate-300 ">
          <h1 className="m-4 text-blue-950 font-semibold ">Overview</h1>
          <div className="m-4 mt-6  grid grid-cols-3 gap-5 h-[150px]">
            <div className="col-span-1 border border-blue-200  rounded-xl cursor-pointer hover:shadow-lg flex p-3 items-center transition-all duration-1000">
              {/* {record} / {} */}
              <div>
                <div className="text-[30px]">
                  {(record / studentAttendance?.attendance?.length) * 100}%
                </div>
                <div className="text-slate-400">Attendance Percentage</div>
              </div>
            </div>
            <div className="col-span-1 border border-blue-200  rounded-xl cursor-pointer hover:shadow-lg flex p-3 items-center transition-all duration-1000">
              <div>
                <div className="text-[30px]">
                  {studentInfo?.totalPerformance}%
                </div>
                <div className="text-slate-400">Overall Percentage</div>
              </div>
            </div>
            <div className="col-span-1 border border-blue-200  rounded-xl cursor-pointer hover:shadow-lg flex p-3 items-center transition-all duration-1000">
              <div>
                <div className="text-[30px]">A</div>
                <div className="text-slate-400">Grade</div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 h-[200px] rounded-lg border border-slate-300">
          <p className="m-4 text-blue-950 font-semibold">Remarks</p>
        </div>
      </div>
    </div>
  );
};

export default ViewReportScreen;
