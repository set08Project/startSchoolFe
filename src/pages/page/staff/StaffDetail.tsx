document.title = "staff Detail's Page";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import LittleHeader from "../../../components/layout/LittleHeader";
// import Button from "../../../components/reUse/Button";
// import { FaStar } from "react-icons/fa6";
// import { useParams } from "react-router-dom";
// import { useTeacherDetail } from "../../../pagesForTeachers/hooks/useTeacher";
// import Input from "../../../components/reUse/Input";
// import { useState } from "react";
// import { updaetTeacherSalary } from "../../../pagesForTeachers/api/teachersAPI";
// import { mutate } from "swr";
// import { MdDelete } from "react-icons/md";
// import { deletSubject, removeTeacherSubject } from "../../api/schoolAPIs";
// import toast from "react-hot-toast";
// import { useSchool } from "../../hook/useSchoolAuth";
// import { useReadOneClassInfo } from "../../../pagesForStudents/hooks/useStudentHook";

// const StaffDetail = () => {
//   const { staffID } = useParams();
//   const { teacherDetail } = useTeacherDetail(staffID!);

//   const [show, setShow] = useState<boolean>(false);
//   const [salary, setSalary] = useState<string>("");

//   const [state, setState] = useState<string>(
//     teacherDetail?.classesAssigned[0]?.classID
//   );

//   const { oneClass } = useReadOneClassInfo(state);

//   return (
//     <div>
//       <LittleHeader name="Staff Details" back />

//       <div>{teacherDetail?.staffName}</div>

//       <div className=" flex-wrap w-full text-blue-950 min-h-[90px] rounded-lg border flex justify-between relative">
//         <div className="bg-orange-500 text-white w-full sm-w-[160px] md:w-[300px] px-4 py-2 rounded-lg h-[100px] flex flex-col">
//           <div>Pay Grade</div>
//           <div className="flex-1" />
//           <div className="text-[25px] font-bold">
//             ₦{teacherDetail?.salary?.toLocaleString()}
//           </div>
//         </div>
//         <div className="mt-8 md:mt-0 px-4 py-2 rounded-lg items-end">
//           <div>upgrade staff Pay</div>
//           <Button
//             name="Up Grade"
//             className="bg-blue-950 mx-0 ml-3 "
//             onClick={() => {
//               setShow(!show);
//             }}
//           />
//         </div>

//         {show && (
//           <div className="absolute top-[5.5rem] right-3 backdrop-blur-sm border rounded-md">
//             <p className="text-[12px] py-4 px-3">
//               You are about to incrase this staff salary...
//               <p>
//                 The present salary is:{" "}
//                 <span className="font-bold">
//                   ₦{teacherDetail?.salary?.toLocaleString()}
//                 </span>
//               </p>
//             </p>
//             <Input
//               placeholder="Enter new Salary"
//               className="bg-white rounded-md"
//               value={salary}
//               onChange={(e) => {
//                 setSalary(e.target.value);
//               }}
//             />
//             <Button
//               name="Up-Grade"
//               className="bg-blue-950"
//               onClick={() => {
//                 setShow(!show);
//                 updaetTeacherSalary(teacherDetail?._id, { salary }).then(() => {
//                   mutate(`api/view-teacher-detail/${teacherDetail?._id}`);
//                   toast.success("Successfully Updated Staff Salary");
//                 });
//               }}
//             />
//           </div>
//         )}
//       </div>

//       <div className="my-6 border-t" />
//       {/* Every thing subject handled performance */}

//       <div className="w-full min-h-[180px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
//         <p>
//           Detail data for{" "}
//           <span className="font-semibold">{teacherDetail?.staffName}</span>
//         </p>
//         <p className="text-[13px]">
//           Class Teacher of:{" "}
//           <span className="font-bold flex gap-4">
//             {teacherDetail?.classesAssigned
//               ? teacherDetail?.classesAssigned?.map((el: any) => (
//                   <div>{el.className}</div>
//                 ))
//               : "Not Yet"}
//           </span>
//         </p>

//         <div className="mt-5 text-[13px] font-medium">Subjects Handle</div>

//         <div className="mt-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
//           {teacherDetail?.subjectAssigned.map((props: any) => {
//             return (
//               <div
//                 className="bg-white border flex flex-col w-full rounded-2xl min-h-[200px] px-4 pt-4"
//                 key={props?._id}
//               >
//                 <div className="mt-3 flex  justify-between items-center font-bold">
//                   <p className="break-words w-full">{props?.title}</p>
//                   <div
//                     className="w-8 h-8 transition-all duration-300 rounded-full hover:bg-slate-50 cursor-pointer flex justify-center items-center"
//                     onClick={() => {
//                       removeTeacherSubject(
//                         teacherDetail?.schoolIDs,
//                         teacherDetail?._id,
//                         props?.id
//                       ).then((res: any) => {
//                         if (res.status === 201) {
//                           mutate(
//                             `api/view-teacher-detail/${teacherDetail?._id}`
//                           );
//                           toast.success("subject deleted successfully");
//                         } else {
//                           toast.error("something went wrong");
//                         }
//                       });
//                     }}
//                   >
//                     <MdDelete className="hover:text-blue-900" />
//                   </div>
//                 </div>
//                 <div className="flex">
//                   <p className="text-[12px] bg-slate-100 rounded-sm py-2 pl-1 shadow-sm pr-4">
//                     compulsory
//                   </p>
//                 </div>
//                 <div className="flex-1" />
//                 <p className="text-[13px] font-medium">Classes Tought</p>
//                 <div className="flex mb-4 gap-2 flex-wrap justify-center sm:justify-start">
//                   <div className="bg-blue-950 text-white rounded-full px-6 font-medium py-2 text-[12px] border">
//                     {props?.classMeant}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Every thing test and Exams performance */}

//       <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
//         <p>Staff's Performance Detail</p>

//         <p className="text-[13px] flex items-center font-medium">
//           General Ratings:{" "}
//           <span className="font-bold flex items-center mx-2 gap-1">
//             {teacherDetail?.rating
//               ? `${(<FaStar className="ml-1 mb-1" />)} \u2605`.repeat(
//                   teacherDetail?.rating
//                 )
//               : "not rated yet"}{" "}
//             <span className="text-[12px] font-bold">{/* ({}) */}</span>
//           </span>
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
//           <div className="border rounded-md px-4 py-2 bg-blue-50">
//             <div className=" text-[16px] font-medium border-b pb-2">
//               Lectures:{" "}
//               <span className="font-bold">
//                 {teacherDetail?.lessonNotes?.length}
//               </span>
//             </div>
//             <div className="ml-5 text-[13px] font-medium mt-2">
//               <span> </span> Mathematics: <span className="font-bold">12</span>
//             </div>
//           </div>
//           <div className="border rounded-md px-4 py-2 bg-blue-50">
//             <div className=" text-[16px] font-medium border-b pb-2">
//               Assignment:{" "}
//               <span className="font-bold">
//                 {teacherDetail?.assignment?.length}
//               </span>
//             </div>
//             <div className="ml-5 text-[13px] font-medium mt-2">
//               <span> </span> Mathematics:{" "}
//               <span className="font-bold">
//                 {teacherDetail?.assignment?.length}
//               </span>
//             </div>
//           </div>
//           <div className="border rounded-md px-4 py-2 bg-blue-50">
//             <div className=" text-[16px] font-medium border-b pb-2">
//               Quiz:{" "}
//               <span className="font-bold">{teacherDetail?.quiz?.length}</span>
//             </div>
//             <div className="ml-5 text-[13px] font-medium mt-2">
//               <span> </span> Mathematics: <span className="font-bold">2</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffDetail;

import pic from "../../../assets/pix.jpg";
import { MdEmail } from "react-icons/md";
import { HiPhoto } from "react-icons/hi2";
import { BsPerson, BsPhone } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa6";
import IG from "../../../assets/socials/Ig.png";
import FB from "../../../assets/socials/fb.png";
import Linkden from "../../../assets/socials/linkden.png";
import X from "../../../assets/socials/x-social-media-round-icon.svg";
import {
  useTeacherDetail,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";
import moment from "moment";
import { FaUserEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {
  updaetTeacherSalary,
  updateTeacherAvatar,
} from "../../../pagesForTeachers/api/teachersAPI";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Input from "../../../components/reUse/Input";
import Button from "../../../components/reUse/Button";
import { IoClose } from "react-icons/io5";

const StaffDetail = () => {
  const [show, setShow] = useState<boolean>(false);
  const [salary, setSalary] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { staffID } = useParams();
  const { teacherDetail } = useTeacherDetail(staffID!);

  const initials =
    teacherDetail?.staffName?.charAt(0) +
    teacherDetail?.staffName?.charAt(teacherDetail?.staffName.indexOf(" ") + 1);

  return (
    <div className="freshh">
      <div>
        <div className="w-full mb-7 pb-5 flex justify-between items-center border-b">
          <div className="flex items-center gap-4">
            <div className="rounded-full shadow-sm border w-10 h-10 flex justify-center items-center font-semibold bg-gray-50">
              {initials}
            </div>
            <div className="text-[24px] font-semibold text-blue-950">
              {teacherDetail?.staffName}
            </div>
          </div>
          <div className="w-[100px] md:w-[150px] lg:w-auto flex justify-end flex-col">
            <div className="mb-1 text-[14px]">Increase Staff Salary</div>
            <button
              className="uppercase py-2 px-2 text-[13px bg-blue-950 text-white rounded-md hover:scale-[1.01]"
              onClick={() => {
                if (!document.startViewTransition) {
                  setShow(!show);
                } else {
                  document.startViewTransition(() => {
                    setShow(!show);
                  });
                }
              }}
            >
              upgrade
            </button>
          </div>

          {show && (
            <div className="absolute top-[5.5rem] right-3  bg-[whitesmoke] border rounded-md">
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
              <div className="flex items-center justify-between">
                <Button
                  name="Upgrade"
                  className="bg-blue-950"
                  onClick={() => {
                    if (!document.startViewTransition) {
                      setShow(!show);
                      updaetTeacherSalary(teacherDetail?._id, { salary }).then(
                        () => {
                          mutate(
                            `api/view-teacher-detail/${teacherDetail?._id}`
                          );
                          toast.success("Successfully Updated Staff Salary");
                        }
                      );
                    } else {
                      document.startViewTransition(() => {
                        setShow(!show);
                        updaetTeacherSalary(teacherDetail?._id, {
                          salary,
                        }).then(() => {
                          mutate(
                            `api/view-teacher-detail/${teacherDetail?._id}`
                          );
                          toast.success("Successfully Updated Staff Salary");
                        });
                      });
                    }
                  }}
                />

                <button
                  onClick={() => {
                    setShow(false);
                  }}
                  className="mr-[10px] py-1 px-1 border border-blue-950 rounded-md flex justify-between items-center gap-2 scale-105"
                >
                  <IoClose />
                  close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="min-h-[87vh] ">
          <div className="mb-8">
            <h1 className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              Profile Image:
            </h1>
            {loading ? (
              <div className="mb-2 h-[320px] md:h-[300px] w-[90%] md:w-[80%] object-cover rounded-lg border flex justify-center items-center">
                <ClipLoader color="#172554" size={30} />
              </div>
            ) : (
              <img
                src={teacherDetail?.avatar ? teacherDetail?.avatar : pic}
                alt="profile-image"
                className="w-[100%] mb-2 border h-[320px] md:h-[300px] md:w-[100%] object-cover rounded-lg"
              />
            )}
          </div>
          <div className="">
            <h1 className="mb-3 font-medium text-[17px] text-gray-600 uppercase">
              Personal Information:
            </h1>
            <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
              <p className="mb-1 flex items-center gap-1">
                <BsPerson /> Full Name:
              </p>
              <h1 className="text-[18px] font-semibold">
                {teacherDetail?.staffName}
              </h1>
            </div>
            <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
              <p className="mb-1 flex items-center gap-1">
                <BsPerson /> Gender:
              </p>
              {teacherDetail?.gender === "" ? (
                <h1 className="text-[18px] text-blue-500 font-normal">
                  + no gender set
                </h1>
              ) : (
                <h1 className="text-[18px] font-semibold">
                  {teacherDetail?.gender}
                </h1>
              )}
            </div>
            <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
              <p className="mb-1 flex items-center gap-1">
                <MdEmail /> Email Address:
              </p>
              <h1 className="text-[18px] font-semibold lowercase break-words">
                {teacherDetail?.email}
              </h1>
            </div>
            <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
              <p className="mb-1 flex items-center gap-1">
                <BsPhone />
                Phone Number:
              </p>
              {!teacherDetail?.phone ? (
                <h1 className="text-[14px] text-blue-500 font-normal">
                  + no phone number set
                </h1>
              ) : (
                <h1 className="text-[18px] font-semibold">
                  {teacherDetail?.phone}
                </h1>
              )}
            </div>
            <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
              <p className="mb-1 flex items-center gap-1">
                <FaAddressBook /> Home Address:
              </p>
              <h1 className="text-[18px] font-semibold break-words">
                {teacherDetail?.staffAddress}
              </h1>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="min-h-[65vh] transition-all duration-300 ">
          <div className="mb-3 md:mb-5">
            <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              Status:
            </div>
            <div className="font-medium rounded-lg flex justify-start items-center">
              <div
                className={`py-1 px-3 rounded-xl  text-[16px] ${
                  teacherDetail?.activeStatus === true
                    ? "text-green-600 bg-green-50"
                    : "text-red-600 bg-red-50"
                }`}
              >
                {String(teacherDetail?.activeStatus)}
              </div>
            </div>
          </div>
          <div className="mb-3 md:mb-5">
            <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              Role:
            </div>
            <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
              Teacher/Staff
            </div>
          </div>
          <div className="mb-3 md:mb-5">
            <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              Salary:
            </div>
            <div className="p-3 bg-gray-100 text-green-600 font-medium rounded-lg text-[17px]">
              ₦
              {teacherDetail?.salary
                ? teacherDetail?.salary.toLocaleString()
                : "N/A"}
            </div>
          </div>
          <div className="mb-3 md:mb-5">
            <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              School Employment ID:
            </div>
            <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
              {teacherDetail?.enrollmentID}
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
              Onboard Date:
            </div>
            <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
              {moment(teacherDetail?.createdAt).format("ll")}
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-5">
              <div className="mb-1 font-medium text-[17px] text-gray-600 uppercase">
                Socials:
              </div>
              <div className="border w-full" />
            </div>
            <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
              <div>
                <img
                  src={FB}
                  alt="facebook pic"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>
              {teacherDetail?.facebookAcct ? (
                <h3 className="text-blue-950">{teacherDetail?.facebookAcct}</h3>
              ) : (
                <h3 className="text-blue-500">+ no facebook handle set</h3>
              )}
            </div>
            <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
              <div>
                <img
                  src={IG}
                  alt="instagram pic"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>
              {teacherDetail?.instagramAcct ? (
                <h3 className="text-blue-950">
                  {teacherDetail?.instagramAcct}
                </h3>
              ) : (
                <h3 className="text-blue-500">+ no instagram handle set</h3>
              )}
            </div>
            <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
              <div>
                <img
                  src={X}
                  alt="X pic"
                  className="w-[20px] h-[17px] object-contain"
                />
              </div>
              {teacherDetail?.xAcct ? (
                <h3 className="text-blue-950">{teacherDetail?.xAcct}</h3>
              ) : (
                <h3 className="text-blue-500">+ no X handle set</h3>
              )}
            </div>
            <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
              <div>
                <img
                  src={Linkden}
                  alt="LinkedIn pic"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>
              {teacherDetail?.instagramAcct ? (
                <h3 className="text-blue-950">{teacherDetail?.linkedinAcct}</h3>
              ) : (
                <h3 className="text-blue-500">+ no linkedIn handle set</h3>
              )}
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div className="min-h-[87vh] transition-all duration-300 lg:col-span-2 xl:col-auto lg:flex justify-between items-start xl:block">
          <div className="mb-10 lg:w-[47%] xl:w-auto">
            <div className="mb-3 font-medium text-[17px] text-gray-600 uppercase">
              Assigned Classes:
            </div>
            {teacherDetail?.classesAssigned?.length > 0 ? (
              teacherDetail?.classesAssigned?.map((props) => (
                <div className="border-b mb-1 py-2 flex items-center gap-5 justify-start font-medium">
                  <h1>Class Teacher :</h1>
                  <h1 className="font-semibold text-[18px] uppercase">
                    {props?.className}
                  </h1>
                </div>
              ))
            ) : (
              <div>No class assigned yet</div>
            )}
          </div>
          <div className="lg:w-[47%] xl:w-auto">
            <div className="mb-3 font-medium text-[17px] text-gray-600 uppercase">
              Assigned Subjects:
            </div>
            {teacherDetail?.subjectAssigned?.length > 0 ? (
              teacherDetail?.subjectAssigned?.map((props: any) => (
                <div className="border-b mb-1 py-2 flex items-center justify-between font-medium">
                  <h1>{props?.title}</h1>
                  <h1>{props?.classMeant}</h1>
                </div>
              ))
            ) : (
              <div>No Subject assigned yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetail;
