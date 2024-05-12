document.title = "staff Detail's Page";
import { BsThreeDotsVertical } from "react-icons/bs";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import { FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useTeacherDetail } from "../../../pagesForTeachers/hooks/useTeacher";
import Input from "../../../components/reUse/Input";
import { useState } from "react";
import { updaetTeacherSalary } from "../../../pagesForTeachers/api/teachersAPI";
import { mutate } from "swr";
import { MdDelete } from "react-icons/md";
import { deletSubject, removeTeacherSubject } from "../../api/schoolAPIs";
import toast from "react-hot-toast";
import { useSchool } from "../../hook/useSchoolAuth";

const StaffDetail = () => {
  const { staffID } = useParams();
  const { teacherDetail } = useTeacherDetail(staffID!);

  const [show, setShow] = useState<boolean>(false);
  const [salary, setSalary] = useState<string>("");

  return (
    <div>
      <LittleHeader name="Staff Details" back />

      <div>{teacherDetail?.staffName}</div>

      <div className=" flex-wrap w-full text-blue-950 min-h-[90px] rounded-lg border flex justify-between relative">
        <div className="bg-orange-500 text-white w-full sm-w-[160px] md:w-[300px] px-4 py-2 rounded-lg h-[100px] flex flex-col">
          <div>Pay Grade</div>
          <div className="flex-1" />
          <div className="text-[25px] font-bold">
            ₦{teacherDetail?.salary?.toLocaleString()}
          </div>
        </div>
        <div className="mt-8 md:mt-0 px-4 py-2 rounded-lg items-end">
          <div>upgrade staff Pay</div>
          <Button
            name="Up Grade"
            className="bg-blue-950 mx-0 ml-3 "
            onClick={() => {
              setShow(!show);
            }}
          />
        </div>

        {show && (
          <div className="absolute top-[5.5rem] right-3 backdrop-blur-sm border rounded-md">
            <p className="text-[12px] py-4 px-3">
              You are about to incrase this staff salary...
              <p>
                The present salary is:{" "}
                <span className="font-bold">
                  ₦{teacherDetail?.salary?.toLocaleString()}
                </span>
              </p>
            </p>
            <Input
              placeholder="Enter new Salary"
              className="bg-white rounded-md"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            />
            <Button
              name="Up-Grade"
              className="bg-blue-950"
              onClick={() => {
                setShow(!show);
                updaetTeacherSalary(teacherDetail?._id, { salary }).then(() => {
                  mutate(`api/view-teacher-detail/${teacherDetail?._id}`);
                });
              }}
            />
          </div>
        )}
      </div>

      <div className="my-6 border-t" />
      {/* Every thing subject handled performance */}

      <div className="w-full min-h-[180px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>
          Detail data for{" "}
          <span className="font-semibold">{teacherDetail?.staffName}</span>
        </p>
        <p className="text-[13px]">
          Class Teacher of:{" "}
          <span className="font-bold">
            {teacherDetail?.classesAssigned
              ? teacherDetail?.classesAssigned
              : "Not Yet"}
          </span>
        </p>

        <div className="mt-5 text-[13px] font-medium">Subjects Handle</div>

        <div className="mt-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {teacherDetail?.subjectAssigned.map((props: any) => {
            return (
              <div
                className="bg-white border flex flex-col w-full rounded-2xl min-h-[200px] px-4 pt-4"
                key={props?._id}
              >
                <div className="mt-3 flex  justify-between items-center font-bold">
                  <p className="break-words w-full">{props?.title}</p>
                  <div
                    className="w-8 h-8 transition-all duration-300 rounded-full hover:bg-slate-50 cursor-pointer flex justify-center items-center"
                    onClick={() => {
                      removeTeacherSubject(
                        teacherDetail?.schoolIDs,
                        teacherDetail?._id,
                        props?.id
                      ).then((res: any) => {
                        if (res.status === 201) {
                          mutate(
                            `api/view-teacher-detail/${teacherDetail?._id}`
                          );
                          toast.success("subject deleted successfully");
                        } else {
                          toast.error("something went wrong");
                        }
                      });
                    }}
                  >
                    <MdDelete className="hover:text-blue-900" />
                  </div>
                </div>
                <div className="flex">
                  <p className="text-[12px] bg-slate-100 rounded-sm py-2 pl-1 shadow-sm pr-4">
                    compulsory
                  </p>
                </div>
                <div className="flex-1" />
                <p className="text-[13px] font-medium">Classes Tought</p>
                <div className="flex mb-4 gap-2 flex-wrap justify-center sm:justify-start">
                  <div className="bg-blue-950 text-white rounded-full px-6 font-medium py-2 text-[12px] border">
                    {props?.classMeant}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Every thing test and Exams performance */}

      <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Staff's Performance Detail</p>

        <p className="text-[13px] flex items-center font-medium">
          General Ratings:{" "}
          <span className="font-bold flex items-center mx-2 gap-1">
            {teacherDetail?.rating
              ? `${(<FaStar className="ml-1 mb-1" />)} \u2605`.repeat(
                  teacherDetail?.rating
                )
              : "not rated yet"}{" "}
            <span className="text-[12px] font-bold">{/* ({}) */}</span>
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          <div className="border rounded-md px-4 py-2 bg-blue-50">
            <div className=" text-[16px] font-medium border-b pb-2">
              Lectures:{" "}
              <span className="font-bold">
                {teacherDetail?.lessonNotes?.length}
              </span>
            </div>
            <div className="ml-5 text-[13px] font-medium mt-2">
              <span> </span> Mathematics: <span className="font-bold">12</span>
            </div>
          </div>
          <div className="border rounded-md px-4 py-2 bg-blue-50">
            <div className=" text-[16px] font-medium border-b pb-2">
              Assignment:{" "}
              <span className="font-bold">
                {teacherDetail?.assignment?.length}
              </span>
            </div>
            <div className="ml-5 text-[13px] font-medium mt-2">
              <span> </span> Mathematics:{" "}
              <span className="font-bold">
                {teacherDetail?.assignment?.length}
              </span>
            </div>
          </div>
          <div className="border rounded-md px-4 py-2 bg-blue-50">
            <div className=" text-[16px] font-medium border-b pb-2">
              Quiz:{" "}
              <span className="font-bold">{teacherDetail?.quiz?.length}</span>
            </div>
            <div className="ml-5 text-[13px] font-medium mt-2">
              <span> </span> Mathematics: <span className="font-bold">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetail;
