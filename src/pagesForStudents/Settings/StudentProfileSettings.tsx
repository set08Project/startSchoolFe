import { useState } from "react";
// import {
//   updateTeacherAddress,
//   updateTeacherFullName,
//   updateTeacherGender,
//   updateTeacherPhoneNum,
// } from "../../api/teachersAPI";
// import { useTeacherInfo } from "../../hooks/useTeacher";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/reUse/Input";
import Button from "../../components/reUse/Button";
import { CgClose } from "react-icons/cg";
import { useStudentInfo } from "../hooks/useStudentHook";

const StudentProfileSettings = () => {
  {
    /* const [dropdown, setDropdown] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phonenum, setPhonenum] = useState<string>(""); */
  }

  // Teacher and School

  const { studentInfo } = useStudentInfo();
  console.log("This Is StudentInfo", studentInfo);

  return (
    <div className="relative">
      <Toaster />
      <div className="border mb-4 rounded-[4px] shadow-sm">
        <div className="py-3 px-4 uppercase text-blue-950 font-medium">
          General
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-medium">
              <h3 className="font-bold w-full text-[13px] sm:text-[15px] md:text-[18px] text-blue-950 mb-[20px]">
                First Name:
              </h3>
              {studentInfo?.studentFirstName}
            </h1>
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[9px] md:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            // onClick={() => {
            //   setDropdown("Fullname");
            // }}
          >
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-medium">
              <h3 className="font-bold w-full text-[13px] sm:text-[15px] md:text-[18px] text-blue-950 mb-[20px]">
                Last Name:
              </h3>

              {studentInfo?.studentLastName}
            </h1>
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[9px] md:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            // onClick={() => {
            //   setDropdown("Fullname");
            // }}
          >
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-medium">
              <h3 className="font-bold w-full text-[11px] md:text-[18px] text-blue-950 mb-[20px]">
                Parent Email:
              </h3>
              <div className="text-[11px] md:text-[17px]">
                {studentInfo?.parentEmail}
              </div>
            </h1>
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[9px] md:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            // onClick={() => {
            //   setDropdown("Fullname");
            // }}
          >
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-bold w-[50px] flex items-center gap-1 text-[13px] sm:text-[15px] md:text-[18px] mr-[5px] md:mr-[50px]">
              Email:
            </h3>
            <div className="w-full xl:w-auto text-[11px] md:text-[18px] font-medium lowercase">
              {studentInfo?.email}
            </div>
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-bold w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Role:
            </h3>
            <h1 className=" font-medium text-[13px] sm:text-[18px] md:text-[18px] ">
              {studentInfo?.status}
            </h1>
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-bold w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Gender:
            </h3>

            {studentInfo?.gender ? (
              <h1 className="font-medium text-[13px] sm:text-[18px] md:text-[18px] ">
                {studentInfo?.gender}
              </h1>
            ) : (
              <div className="font-medium text-blue-500 text-[13px] sm:text-[18px] md:text-[18px]">
                + add your gender
              </div>
            )}
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[9px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            // onClick={() => setDropdown("Gender")}
          >
            Edit
          </div>
        </div>
      </div>
      <div className="border rounded-[4px] shadow-sm">
        <div className="py-3 px-4 uppercase text-blue-950 font-medium">
          Contact
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-bold w-[70px] text-[11px] md:text-[18px] md:w-[30%]">
              Phone No:
            </h3>
            {studentInfo?.phone ? (
              <div>
                <h1 className="text-[13px] sm:text-[17px] font-medium">
                  {studentInfo?.phone}
                </h1>
              </div>
            ) : (
              <div className="text-[10px] md:text-[18px] text-blue-800 font-[600]">
                + add your phone number
              </div>
            )}
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[9px] md:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            // onClick={() => setDropdown("PhoneNum")}
          >
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-bold w-[70px] text-[11px] md:text-[18px] md:w-[30%]">
              Parent No:
            </h3>
            {studentInfo?.phone ? (
              <div>
                <h1 className="text-[13px] sm:text-[17px] font-medium">
                  {studentInfo?.phone}
                </h1>
              </div>
            ) : (
              <div className="text-[10px] md:text-[18px] text-blue-800 font-[600]">
                + add your parent number
              </div>
            )}
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[9px] md:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            // onClick={() => setDropdown("PhoneNum")}
          >
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-bold w-[70px] text-[11px] md:text-[18px] md:w-[30%]">
              Address:
            </h3>
            <h1 className="w-[60%] sm:w-[70%] xl:w-auto md:break-words text-[11px] md:text-[17px] font-medium">
              {studentInfo?.studentAddress}
            </h1>
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[9px] md:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            // onClick={() => setDropdown("Address")}
          >
            Edit
          </div>
        </div>
      </div>
      {/* Dropdown Modal For Editing */}
    </div>
  );
};

export default StudentProfileSettings;
