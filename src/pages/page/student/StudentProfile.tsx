import moment from "moment";
// import pix from "../assets/Child2.jpg";
// import { useStudentInfo, useStudentInfoData } from "./hooks/useStudentHook";
import { Link, useParams } from "react-router-dom";
import pic from "../../../assets/Child1.jpg";
import { MdEmail } from "react-icons/md";
import { HiPhoto } from "react-icons/hi2";
import { BsPerson, BsPhone } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa6";
import IG from "../../../assets/ig.png";
import FB from "../../../assets/fb.png";
import Linkden from "../../../assets/linkden.png";
import X from "../../../assets/ig.png";
import { FaUserEdit } from "react-icons/fa";
// import { Link } from "react-router-dom";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { useStudentInfo } from "@/pagesForStudents/hooks/useStudentHook";
import { useClassSubjects, useSchoolData, useSchoolStudentDetail } from "@/pages/hook/useSchoolAuth";
import { readClassInfo } from "@/pagesForTeachers/api/teachersAPI";
import { updateStudentAvatar } from "@/pagesForStudents/api/studentAPI";

const StudentProfile = () => {
  const [state, setState] = useState<string>("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  
 const { studentID } = useParams();

 const { studentDetails } = useSchoolStudentDetail(studentID!);
//   const student = useStudentInfo().studentInfo;
const  student = studentDetails?.data
  const studentInfo = useStudentInfo()?.studentInfo;

const {data} = useSchoolData()
console.log(data)

  const fetchSubjects = async (classID: string) => {
    setLoading(true);
    try {
      const res = await readClassInfo(classID);
      // console.log("Fetched subjects:", res);
      setSubjects(res.subjects);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const changeImage = (e: any) => {
    // console.log("start...");
    const file = e.target.files[0];

    const formData: any = new FormData();
    formData.append("avatar", file);
    setState(file);

    if (state) {
      const timer = setTimeout(() => {
        setLoading(true);
        updateStudentAvatar(studentInfo?._id, formData).then((res) => {
          mutate(`api/view-teacher-detail/${studentInfo?._id}`);
          if (res.status === 201) {
            toast.success("Image has been updated");
          } else {
            toast.error(`${res?.response?.data?.message}`);
          }
        });
        clearTimeout(timer);
      }, 50);
    }
  };

  const { readSubject } = useClassSubjects(studentInfo?.presentClassID);

console.log(student)
  return (
    <div>
      <div className="freshh">
        <div>
          <div className="w-full mb-7 pb-5 flex justify-between items-center border-b">
            <div className="flex items-center gap-4">
              <div className="text-[24px] text-blue-850">
                <div className="text-[12px] md:text-[29px]">
                  Welcome To your Profile,
                </div>
                <span className="font-bold text-blue-950">
                  {student?.studentFirstName}
                </span>
              </div>
            </div>
            <Link to="/your-settings">
              <div className="font-normal flex items-center gap-2 cursor-pointer hover:scale-105 text-[11px] md:text-[18px]">
                <FaUserEdit /> Edit Profile
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
                  src={student?.avatar ? student?.avatar : pic}
                  alt="profile-image"
                  className="mb-2 border h-[320px] md:h-[300px] w-[90%] md:w-[80%] object-cover rounded-lg"
                />
              )}

              <div className="ml-7 flex gap-2 text-blue-800 items-center ">
                <HiPhoto className="cursor-pointer hover:scale-105 transition-all duration-300" />
                <label
                  htmlFor="id"
                  className="cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  Change Profile Image
                </label>
                <input
                  id="id"
                  className="hidden"
                  onChange={changeImage}
                  type="file"
                />
              </div>
            </div>
            <div className="">
              <h1 className="mb-3 font-medium text-[17px] text-gray-600 uppercase">
                Personal Information
              </h1>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1">
                  <BsPerson /> First Name:
                </p>
                <h1 className="text-[18px] font-semibold  text-left">
                  {student?.studentFirstName}
                </h1>
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1">
                  <BsPerson /> First LastName:
                </p>
                <h1 className="text-[18px] font-semibold text-left">
                  {student?.studentLastName}
                </h1>
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1">
                  <BsPerson /> Gender:
                </p>
                {student?.gender === "" ? (
                  <h1 className="text-[18px] text-blue-500 font-normal">
                    + add your gender
                  </h1>
                ) : (
                  <h1 className="text-[18px] font-semibold  text-left">
                    {student?.gender}
                  </h1>
                )}
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1 md:text-[17px] text-[11px]">
                  <MdEmail /> My Email Address:
                </p>
                <h1 className="md:text-[18px] font-semibold lowercase text-[11px]  text-left">
                  {student?.email}
                </h1>
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1 md:text-[17px] text-[11px]">
                  <MdEmail /> Parent Email Address:
                </p>
                <h1 className="md:text-[18px] font-semibold lowercase text-[11px]  text-left">
                  {student?.parentEmail}
                </h1>
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1 md:text-[17px] text-[11px]">
                  <BsPhone />
                  My Phone Number:
                </p>
                {studentInfo?.phone === "" ? (
                  <h1 className="md:text-[18px] text-blue-500 font-normal text-[11px]">
                    + add your phone number
                  </h1>
                ) : (
                  <h1 className="md:text-[18px] text-blue-500 font-normal text-[11px] text-left">
                    {studentInfo?.phone}
                  </h1>
                )}
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1 md:text-[17px] text-[11px]">
                  <BsPhone />
                  Parent Phone Number:
                </p>
                {studentInfo?.parentPhoneNumber === "" ? (
                  <h1 className="md:text-[18px] text-blue-500 font-normal text-[11px]">
                    + add parent phone number
                  </h1>
                ) : (
                  <h1 className="md:text-[18px] text-blue-500 font-normal text-[11px] text-left">
                    {studentInfo?.parentPhoneNumber}
                  </h1>
                )}
              </div>
              <div className="mb-3 py-2 px-3 bg-gray-100 rounded-lg">
                <p className="mb-1 flex items-center gap-1">
                  <FaAddressBook /> Home Address:
                </p>
                <h1 className="text-[11px] md:text-[18px] font-semibold  text-left">
                  {student?.studentAddress}
                </h1>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="min-h-[65vh] transition-all duration-300 ">
            <div className="mb-3 md:mb-5">
              <div className="mb-2 font-medium md:text-[17px] text-[11px] text-gray-600 uppercase">
                Class Term Fees:
              </div>
              <div className="font-bold rounded-lg flex justify-start items-center text-green-600">
                ₦{student?.classTermFee?.toLocaleString()}
              </div>
            </div>
            <div className="mb-3 md:mb-5">
              <div className="mb-2 font-medium md:text-[17px] text-[11px] text-gray-600 uppercase">
                Term Fees Balance:
              </div>
              <div className="font-bold rounded-lg flex justify-start items-center text-green-600">
                ₦{student?.termBalance || 0}
              </div>
            </div>
            <div className="mb-3 md:mb-5">
              <div className="mb-2 font-medium md:text-[17px] text-[11px] text-gray-600 uppercase">
                Fee Paid:
              </div>
              <div className="font-bold rounded-lg flex justify-start items-center text-green-600">
                {data?.presentTerm === "1st Term" ? (
                  student?.feesPaid1st && "Yes"
                ) : data?.presentTerm === "2nd Term" ? (
                  student?.feesPaid2nd && "Yes"
                ) : data?.presentTerm === "3rd Term" ? (
                  student?.feesPaid3rd && "Yes"
                ) : (
                  <p className="text-red-500">No</p>
                )}
              </div>
            </div>
            <div className="mb-3 md:mb-5">
              <div className="mb-2 font-medium text-[17px] text-gray-600 uppercase">
                Role:
              </div>
              <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                Student
              </div>
            </div>
            <div className="mb-3 md:mb-5">
              <div className="mb-2 font-medium md:text-[17px] text-[11px] text-gray-600 uppercase">
                School EnrollmentID:
              </div>
              <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                {student?.enrollmentID}
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                Onboard Date:
              </div>
              <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                {moment(student?.createdAt).format("ll")}
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                Admission Year:
              </div>
              <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                {student?.admissionYear || "No Entry Yet"}
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                Admission Number:
              </div>
              <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                {student?.admissionNumber || "No Entry Yet"}
              </div>
            </div>

            <div className="">
              <div className="flex items-center gap-5">
                <div className="mb-1 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
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
                <h3 className="text-blue-500 text-[11px] md:text-[17px]">
                  + add your facebook handle or parents
                </h3>
              </div>
              <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
                <div>
                  <img
                    src={IG}
                    alt="instagram pic"
                    className="w-[20px] h-[20px] object-contain"
                  />
                </div>
                <h3 className="text-blue-500 text-[11px] md:text-[17px]">
                  + add your instagram handle or parents
                </h3>
              </div>
              <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
                <div>
                  <img
                    src={X}
                    alt="X pic"
                    className="w-[20px] h-[17px] object-contain"
                  />
                </div>
                <h3 className="text-blue-500 text-[11px] md:text-[17px]">
                  + add your X handle or parents
                </h3>
              </div>
              <div className="mb-1 p-3 font-medium rounded-lg text-[18px] flex items-center gap-2 italic">
                <div>
                  <img
                    src={Linkden}
                    alt="LinkedIn pic"
                    className="w-[20px] h-[20px] object-contain"
                  />
                </div>
                <h3 className="text-blue-500 text-[11px] md:text-[17px]">
                  + add your linkedIn handle or parents
                </h3>
              </div>
            </div>
          </div>
          {/* Section 3 */}
          <div className="min-h-[87vh] transition-all duration-300 lg:col-span-2 xl:col-auto lg:flex justify-between items-start xl:block">
            <div className="mb-10 lg:w-[47%] xl:w-auto">
              <div className="mb-3 font-medium text-[17px] text-gray-600 uppercase">
                My Current Class:
              </div>
              <div className="font-[700]">{studentInfo?.classAssigned}</div>
            </div>

            <div className="lg:w-[47%] xl:w-auto h-[500px] w-[330px]">
              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  Graduation Year:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  {student?.graduationYear || "No Entry Yet"}
                </div>
              </div>
              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  Leave Year:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  {student?.leaveYear || "No Entry Yet"}
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  State of Origin:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  {student?.stateOrigin || "No Entry Yet"}
                </div>
              </div>
              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  LGA:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  {student?.LGA || "No Entry Yet"}
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  Date of Birth:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  {student?.BOD || "No Entry Yet"}
                </div>
              </div>
              <div className="mb-5">
                <div className="mb-2 font-medium text-[11px] md:text-[17px] text-gray-600 uppercase">
                  Personal Number:
                </div>
                <div className="p-3 bg-gray-100 font-medium rounded-lg text-[17px]">
                  {student?.personalPhone || "No Entry Yet"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
