document.title = "class room Detail's Page";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import { MdDelete, MdHistory } from "react-icons/md";
import { FC, useEffect, useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import {
  useClassSubject,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { readClassInfo } from "../../api/teachersAPI";
import TimeTableScreen from "./TimeTableScreen";
import { FaCheckDouble, FaStar } from "react-icons/fa6";
import pix from "../../../assets/pix.jpg";
import ReadingClassStudents from "./ReadingClassStudents";
import { Link } from "react-router-dom";
import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";

interface iProps {
  props?: string;
}

const ClassSubjectScreen: FC<iProps> = ({ props }) => {
  const { subjectData } = useClassSubject(props!);

  return (
    <div>
      {subjectData?.classSubjects?.length > 0 ? (
        <div className="mt-1 w-full gap-2 grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3">
          {subjectData?.classSubjects?.map((props: any) => (
            <div
              key={props?._id}
              className="bg-white border flex flex-col rounded-2xl pb-2 min-h-[200px] px-4 pt-4"
            >
              <div className="mt-3 flex justify-between items-center font-bold">
                <p>{props?.subjectTitle}</p>
                <div className="w-8 h-8 transition-all duration-300 rounded-full hover:bg-slate-100 cursor-pointer flex justify-center items-center">
                  <Link to={`/test-exam-grade/${props?._id}`}>
                    <FaAddressBook className="hover:text-blue-900" />
                  </Link>
                </div>
              </div>
              <div className="flex">
                <p className="text-[12px] bg-slate-100 rounded-sm py-2 pl-1 shadow-sm pr-4 mb-5">
                  compulsory
                </p>
              </div>
              <div className="flex-1" />
              <p className="text-[13px] font-medium">
                Subject Teacher Name: <span></span>
              </p>
              <div className="flex mb-4 gap-2 flex-wrap">
                <div className="text-blue-950  rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px] ">
                  {props?.subjectTeacherName}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
            <FaCheckDouble size={13} />
            <p className="mt-3 text-[12px] font-medium">No Subject added yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

const StaffDetail: FC<iProps> = ({ props }) => {
  const { teacherInfo } = useTeacherInfo();

  return (
    <div className="flex gap-2 mt-1 items-start  ">
      <img
        className="w-12 h-12 object-cover rounded-full"
        src={teacherInfo?.avatar ? teacherInfo?.avatar : pix}
      />
      <p>
        <p className="m-0 leading-tight text-[14px] font-bold">
          {teacherInfo?.staffName
            ? teacherInfo?.staffName
            : "Hasn't been assigned"}
        </p>
        <p className="text-[12px] mt-2 flex items-center gap-1">
          <span className="font-bold text-[15px]">
            {teacherInfo?.staffRating}
          </span>{" "}
          <FaStar />
        </p>
      </p>
    </div>
  );
};

const MyClassRoomScreen = () => {
  const { teacherInfo } = useTeacherInfo();
  const [classInfo, setClassInfo] = useState<any>();

  const [state, setState] = useState<string>(
    teacherInfo?.classesAssigned[0]?.classID
  );

  const { oneClass } = useReadOneClassInfo(state);

  // useEffect(() => {
  //   readClassInfo(oneClass?.className).then((res: any) => {
  //     setClassInfo(res?.data);
  //   });
  // }, []);

  return (
    <div className="text-blue-950">
      <LittleHeader name="My ClassRoom Details" />
      <div>Class: {oneClass?.className}</div>

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

      <div className="w-full text-blue-950 min-h-[90px] rounded-lg border flex justify-between overflow-hidden ">
        <div className="bg-blue-950 text-white w-[160px] md:w-[300px] px-4 py-2 rounded-lg ">
          <div>Total Number of Students</div>
          <div className="text-[35px] font-medium">
            {oneClass?.students?.length}{" "}
            <span className="text-[20px]">Students</span>
          </div>
        </div>
        <div className=" px-4 py-1 rounded-lg text-end flex items-end flex-col">
          <div className="flex-1" />
          <div className="mr-0 text-[13px] font-medium leading-tight">
            View Result History:
          </div>
          <Link className="font-medium" to="result-history">
            <Button
              name="View"
              className="bg-orange-500 rounded-[5px] text-white m-0 text-[12px] py-2"
              icon={<MdHistory size={15} />}
            />
          </Link>
        </div>
      </div>
      <div className="my-6 border-t" />
      <div className="mt-6 w-full min-h-[80px] pb-4 bg-slate-50 rounded-lg border pt-2 px-4 ">
        <p>Manage Class Teacher: </p>
        <p className="text-[13px] flex items-center font-bold">
          Class teacher is responsible for day to day activities of the class{" "}
          <span className="font-bold flex items-center gap-1"></span>
        </p>
        {/* + Assign class Teacher{ */}
        <div className="mt-8" />
        <div className="text-[12px]"> class Teacher Assigned</div>
        <StaffDetail props={oneClass?._id} />
      </div>
      <div className="my-6 border-t" />

      {/* SUbjects */}

      <div className="w-full min-h-[180px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Class Subject for {oneClass?.className} </p>
        <p className="text-[13px] font-bold">
          Below are all the subjects this CLASS offers!
        </p>

        <ClassSubjectScreen props={oneClass?._id} />
      </div>

      {/* Top Students */}
      <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Top Performing student </p>
        <p className="text-[13px]  flex items-center font-bold">
          Here is the list of the top 5 performing student:{" "}
        </p>
        <div className="flex gap-4 mt-5">
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
              <FaCheckDouble size={13} />
              <p className="mt-3 text-[12px] font-medium">
                No Student rated yet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* viewing Students */}
      <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Viewing Students</p>
        <p className="text-[13px]  flex items-center font-bold">
          Here are all the students in this class:{" "}
        </p>
        <div className="flex gap-4 mt-5">
          <div className="overflow-x-auto">
            <ReadingClassStudents props={oneClass?._id} />
          </div>
        </div>
      </div>
      <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <div className="flex items-center w-full justify-between">
          <div>
            <p>Viewing Class TimeTable</p>
            <p className="text-[13px]  flex items-center font-bold">
              Here are all the students in this class:{" "}
            </p>
          </div>
        </div>
        <div className="flex gap-4 mt-5">
          {" "}
          <TimeTableScreen props={oneClass?._id} />{" "}
        </div>
      </div>

      {/* Attendance */}
    </div>
  );
};

export default MyClassRoomScreen;
