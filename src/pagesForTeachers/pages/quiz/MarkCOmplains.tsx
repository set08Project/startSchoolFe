import { FC, useEffect, useState } from "react";
import Button from "../../../components/reUse/Button";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { MdCheck, MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import {
  createAssignment,
  makeComplains,
  readClassInfo,
  studentOfTheWeek,
} from "../../api/teachersAPI";
import {
  useClassStudent,
  useSujectInfo,
  useTeacherInfo,
} from "../../hooks/useTeacher";
import Input from "../../components/reUse/Input";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { mutate } from "swr";
import {
  useReadMyClassInfo,
  useReadMyClassInfoData,
} from "../../../pagesForStudents/hooks/useStudentHook";
import { useSchoolClassRM } from "../../../pages/hook/useSchoolAuth";

interface iProps {
  props?: any;
}

const MakeComplains: FC<iProps> = ({ props }) => {
  const [subject, setSubject] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  const { teacherInfo } = useTeacherInfo();
  const { state } = useReadMyClassInfoData(teacherInfo?.classesAssigned);

  // api/view-subject-assignment/${subjectID}

  const onCreateAssignment = () => {
    makeComplains(teacherInfo?._id, {
      title: period,
      importance: subject,
    })
      .then((res) => {
        if (res?.status === 201) {
          mutate(`api/view-teacher-complain/${teacherInfo?._id}`);
          toast.success("Added Successfully...!");
        } else {
          toast.error(`${res?.response?.data?.message}`);
        }
      })
      .then(() => {
        setSubject("");
        setPeriod("");
      });
  };

  return (
    <div className="">
      {/* <Toaster position="top-center" reverseOrder={true} /> */}
      <div className=" text-[13px]  font-medium">
        <label
          htmlFor="mark_complains"
          className=" transition-all duration-300 cursor-pointer "
        >
          <div className="flex">
            <div className="text-[20px] mr-[10px]">
              <MdOutlineMarkChatRead />
            </div>
            <div>Make Complains</div>
          </div>
        </label>
        <div className="" />
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="mark_complains" className="modal-toggle" />
        <div className="modal rounded-md text-blue-950 text-left" role="dialog">
          <div className="modal-box bg-white  rounded-md">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">
                Make Complains and Tips for Improvement
              </p>

              <label
                htmlFor="mark_complains"
                className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
              >
                <MdClose />
              </label>
            </div>
            <hr />
            <div className="mt-2 leading-tight text-[13px] font-medium">
              Is there anything that seriously disturb you... Please keep it no
              more, make the complain and let's start addressing it now!!
              <br />
              <br />
              <div className="flex gap-2  items-center">
                <p>
                  {" "}
                  Importance: <span className="font-medium">{subject}</span>
                </p>
                {subject && (
                  <div className="flex items-center font-bold">
                    <span>selected</span>
                    <MdCheck className="text-green-500 text-[25px] mb-1 " />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-10 w-full gap-2 flex flex-col items-center">
              <div className="w-full">
                <label className="font-medium text-[12px]">
                  Complains Detail <span className="text-red-500">*</span>
                </label>

                {/* // readSubject */}
                <textarea
                  className="border w-full resize-none h-[200px] mb-5 rounded-md mt-2 p-2 bg-gray-100 outline-none"
                  value={period}
                  onChange={(e) => {
                    setPeriod(e.target.value);
                  }}
                  placeholder="Complains Detail"
                />
                <div className="flex w-full gap-2 mb-10">
                  <div className="w-full">
                    <label className="font-medium text-[12px]">
                      Importance <span className="text-red-500">*</span>
                    </label>

                    <select
                      className="select bg-gray-100 select-bordered w-full mt-2"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    >
                      <option selected>Choose Importance</option>
                      <option value={"Urgently Urgent"}>Urgently Urgent</option>
                      <option value={"Very Urgent"}>Very Urgent</option>
                      <option value={"Urgent"}>Urgent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end transition-all duration-300">
              {subject !== "" && period !== "" ? (
                <label
                  htmlFor="mark_complains"
                  className="bg-blue-950 text-white py-4 px-8 rounded-md cursor-pointer "
                  onClick={onCreateAssignment}
                >
                  Publish This Complain
                </label>
              ) : (
                <Button
                  name="Can't Proceed"
                  className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
                />
              )}
            </div>
          </div>

          <label className="modal-backdrop" htmlFor="mark_complains">
            Close
          </label>
        </div>
      </div>
    </div>
  );
};

export default MakeComplains;
