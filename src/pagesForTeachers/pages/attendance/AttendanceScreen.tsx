document.title = "View Students";
import moment from "moment";
import pix from "../../../assets/pix.jpg";
import LittleHeader from "../../../components/static/LittleHeader";
import {
  useAttendance,
  useClassStudent,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { FC, useEffect, useState } from "react";
import {
  markAttendanceAbsent,
  markAttendancePresent,
} from "../../api/teachersAPI";
import { mutate } from "swr";
import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";
import toast, { Toaster } from "react-hot-toast";
import { UnLazyImage } from "@unlazy/react";

interface iProps {
  props?: string;
  id?: string;
  data?: any;
}
const Remark: FC<iProps> = ({ props, data }) => {
  const { attendance } = useAttendance(props!);

  let name2 = data?.studentFirstName;

  let result = attendance?.attendance?.find((el: any) => {
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

const Attendance: FC<iProps> = ({ id, data }) => {
  const { teacherInfo } = useTeacherInfo();
  const { oneClass } = useReadOneClassInfo(teacherInfo?.presentClassID);

  let name2 = data?.studentFirstName;

  const { attendance } = useAttendance(teacherInfo?.presentClassID!);

  let result = attendance?.attendance?.find((el: any) => {
    return el?.studentFirstName === name2;
  });

  return (
    <div className="flex justify-between px-4">
      {}
      <div className="flex flex-col items-center">
        <label>Absent</label>
        <input
          type="checkbox"
          className={`toggle toggle-sm mt-2  bg-neutral-500 border-neutral-500 ${
            result?.absent && "text-red-500"
          } ${result?.absent && "bg-red-500"}`}
          checked={result?.absent}
          onChange={() => {
            markAttendanceAbsent(teacherInfo?._id, id!).then((res: any) => {
              toast.success("student has been marked Absent for Today");

              mutate(`api/view-all-class-students/${oneClass?._id!}`);
              mutate(`api/view-class-attendance/${oneClass?._id!}`);
            });
          }}
        />
      </div>

      <div className="flex flex-col items-center">
        <label>Present</label>
        <input
          type="checkbox"
          className={`toggle toggle-sm mt-2 border-neutral-500 ${
            result?.present && "text-green-500"
          } ${result?.present && "bg-green-500"}`}
          checked={result?.present}
          onChange={() => {
            markAttendancePresent(teacherInfo?._id, id!).then((res: any) => {
              toast.success("student has been marked Present for Today");

              mutate(`api/view-all-class-students/${oneClass?._id!}`);
              mutate(`api/view-class-attendance/${oneClass?._id!}`);
            });
          }}
        />
      </div>
    </div>
  );
};

const AttendanceScreen = () => {
  const { teacherInfo } = useTeacherInfo();

  const [state, setState] = useState<string>(
    teacherInfo?.classesAssigned[0]?.classID
  );

  const { oneClass } = useReadOneClassInfo(state);

  // const { oneClass } = useReadOneClassInfo(teacherInfo?.presentClassID);

  const { classStudents } = useClassStudent(oneClass?._id);

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={"Record Students Attendance"} />

      <div className="my-10">
        <div className="text-[12px] font-semibold">Attendanct Record for</div>
        <select
          className="select select-bordered  w-full max-w-xs mb-10 mt-2"
          value={state}
          onChange={(e: any) => {
            setState(e.target.value);
          }}
        >
          {teacherInfo?.classesAssigned?.length > 0 ? (
            teacherInfo?.classesAssigned?.map((el: any) => (
              <option value={el?.classID}>{el?.className}</option>
            ))
          ) : (
            <option value="No class Assigned yet" disabled>
              No class Assigned yet
            </option>
          )}
        </select>
      </div>

      <div className="flex w-full justify-end"></div>
      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
        style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[1020px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[130px] border-r">Reg. Date</div>
          <div className="w-[100px] border-r">Today's Attendance</div>

          <div className="w-[200px] border-r">Mark Attendance</div>
          {/* <div className="w-[100px] border-r">This team Attendance Ratio</div> */}

          <div className="w-[250px] border-r">student info</div>

          <div className="w-[100px] border-r">student Class</div>

          <div className="w-[200px] border-r">Performance Ratio</div>

          <div className="w-[80px] border-r">Rate</div>
        </div>

        <div className=" w-[1020px] overflow-hidden">
          {classStudents?.students?.length > 0 ? (
            <div>
              {classStudents?.students?.map((props: any, i: number) => (
                <div>
                  <div>
                    <div
                      key={props}
                      className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
                        i % 2 === 0 ? "bg-slate-50" : "bg-white"
                      }`}
                    >
                      <div className="w-[130px] border-r">
                        {moment(props?.createdAt).format("ll")}
                      </div>

                      <Remark
                        props={oneClass?._id}
                        data={props}
                        id={props?._id}
                      />

                      <div className="w-[200px] border-r">
                        <Attendance
                          props={oneClass?._id}
                          id={props?._id}
                          data={props}
                        />
                      </div>

                      {/* name */}
                      <div className="w-[250px] flex  border-r">
                        <div className="flex gap-2">
                          <UnLazyImage
                            alt={"image"}
                            thumbhash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
                            src={props?.avatar ? props.avatar : pix}
                            autoSizes
                            className="w-14 h-14 rounded-2xl border object-cover "
                          />
                          <div>
                            {props?.studentFirstName} {props?.studentLastName}
                          </div>
                        </div>
                      </div>

                      <div className="w-[100px] border-r  ">
                        {props?.classAssigned}
                      </div>

                      <div className="w-[200px] border-r  ">
                        {props?.perfomance ? props?.perfomance : "0"}
                      </div>

                      <div className="w-[80px] border-r">
                        {props?.perfomance ? props?.perfomance : "0"} of 5
                      </div>
                    </div>
                  </div>
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

export default AttendanceScreen;
