document.title = "View Students";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import moment from "moment";
import { FC, useState } from "react";
import { useStudentAttendance } from "../../../pages/hook/useSchoolAuth";
import {
  useClassStudent,
  useClassSubject,
  useTeacherInfo,
} from "../../hooks/useTeacher";
import { readClassInfo, remark } from "../../api/teachersAPI";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/reUse/Input";
import { useReadMyClassInfoData } from "../../../pagesForStudents/hooks/useStudentHook";
import lodash from "lodash";

interface iProps {
  props?: any;
  id?: string;
  data?: any;
  i?: number;
}

const SubjectScore: FC<iProps> = ({ props }) => {
  return (
    <div className="w-[208px] border-r ">
      <p className="pl-3 font-bold">{"props?.subjectTitle"}</p>
      <div className="pl-1 flex gap-1 mt-2 text-[10px] ">
        <p className="w-[30px] border-r">1st</p>
        <p className="w-[30px] border-r">2nd</p>
        <p className="w-[30px] border-r">3rd</p>
        <p className="w-[30px] border-r">4th</p>
        <p className="w-[35px] border-r">Exam</p>
        <p className="w-[35px] ">Total</p>
      </div>
    </div>
  );
};

const MainStudentRow: FC<iProps> = ({ props, i }) => {
  const { teacherInfo } = useTeacherInfo();
  const [state, setState] = useState<any>({});
  const [stateValue, setStateValue] = useState("");

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
      <div className="w-[100px] border-r">
        <AttendanceRatio props={props} />
      </div>

      <div className="w-[1000px] border-r items-center flex">
        <div className="flex ">
          <SubjectScore />
        </div>
      </div>
      {/* 
      <div className="w-[100px] border-r">
        <input
          className="w-[70px] h-8 outline-none border rounded-md px-2 "
          type="number"
          placeholder="10"
        />
      </div>

      <div className="w-[100px] border-r">
        <input
          className="w-[70px] h-8 outline-none border rounded-md px-2 "
          type="number"
          placeholder="10"
        />
      </div>

      <div className="w-[100px] border-r">
        <input
          className="w-[70px] h-8 outline-none border rounded-md px-2 "
          type="number"
          placeholder="10"
        />
      </div>

      <div className="w-[100px] border-r  ">
        <input
          className="w-[80px] h-8 outline-none border rounded-md px-2 "
          type="number"
          placeholder="70"
        />
      </div> */}

      <div className="w-[300px] border-r">
        <textarea
          className="border rounded-sm w-[94%] p-1 text-[12px] h-14 resize-none mx-2"
          placeholder="Give a Remark"
          value={stateValue}
          onChange={(e) => {
            setStateValue(e.target.value);
          }}
        />
      </div>

      <div className="w-[180px] border-r">
        <Button
          name="Add Report"
          className="pl-4 py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
          onClick={() => {
            if (stateValue !== "") {
              remark(teacherInfo?._id, props?._id, stateValue).then(
                (res: any) => {
                  if (res.status === 201) {
                    mutate(``);
                    toast.success("Report noted");
                  } else {
                    toast.error(`${res?.response?.data?.message}`);
                  }
                }
              );
            } else {
              toast.error("Please give a REMARK");
            }
          }}
        />
      </div>
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
      {(
        (mainStudentAttendance?.data?.attendance.filter(
          (el: any) => el.present === true
        ).length /
          mainStudentAttendance?.data?.attendance.length) *
        100
      ).toFixed(2)}
      %
    </div>
  );
};

const SubjectMap: FC<iProps> = ({ props }) => {
  return (
    <div className="w-[208px] border-r ">
      <p className="pl-3 font-bold">{props?.subjectTitle}</p>
      <div className="pl-1 flex gap-1 mt-2 text-[10px] ">
        <p className="w-[30px] border-r">1st</p>
        <p className="w-[30px] border-r">2nd</p>
        <p className="w-[30px] border-r">3rd</p>
        <p className="w-[30px] border-r">4th</p>
        <p className="w-[35px] border-r">Exam</p>
        <p className="w-[35px] ">Total</p>
      </div>
    </div>
  );
};

const CardReport = () => {
  const { teacherInfo } = useTeacherInfo();
  const [stateValue, setStateValue] = useState("");

  const { state } = useReadMyClassInfoData(teacherInfo?.classesAssigned);
  const { classStudents } = useClassStudent(state?._id!);

  const { subjectData } = useClassSubject(state?._id);

  const [data, setData] = useState([]);

  const handleInputChange = (id: any, newText: any) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  };
  // console.clear();

  console.log(lodash.sortBy(subjectData?.classSubjects, "subjectTitle"));

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={"Class Teacher Remark"} />

      <div className="mt-10" />

      <div className="flex w-full justify-end"></div>
      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
        <div className="text-[gray] w-[2480px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[100px] border-r">Sequent</div>
          <div className="w-[250px] border-r">student Info</div>
          <div className="w-[100px] border-r">Student's Attendance Ratio</div>

          <div className="w-[1000px] border-r">
            <div>Subject Grade</div>
            <div className="mt-4 flex gap-2">
              <div className="flex ">
                {lodash
                  .sortBy(subjectData?.classSubjects, "subjectTitle")
                  ?.map((props: any) => (
                    <SubjectMap props={props} />
                  ))}
              </div>
            </div>
          </div>

          <div className="w-[300px] border-r">Give Report/Remark</div>

          <div className="w-[180px] border-r">Submit Report</div>
        </div>

        <div className=" w-[2480px] overflow-hidden">
          {classStudents?.students?.length > 0 ? (
            <div>
              {classStudents?.students?.map((props: any, i: number) => (
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

export default CardReport;
