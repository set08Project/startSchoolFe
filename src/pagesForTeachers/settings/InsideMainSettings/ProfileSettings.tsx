import { useState } from "react";
import { updateTeacherFullName } from "../../api/teachersAPI";
import { useTeacherInfo } from "../../hooks/useTeacher";
import { useSchoolCookie } from "../../../pages/hook/useSchoolAuth";
import toast from "react-hot-toast";
import Input from "../../components/reUse/Input";
import Button from "../../components/reUse/Button";
import { CgClose } from "react-icons/cg";

const ProfileSettings = () => {
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [name, setName] = useState("");
  const { teacherInfo } = useTeacherInfo();

  const schoolID = useSchoolCookie().dataID;
  const staffID = teacherInfo?._id;

  const handleNameChange = () => {
    try {
      updateTeacherFullName(schoolID, staffID, name).then((res) => {
        toast.success("Full Name Updated");
        console.log(res?.data);
        return res?.data;
      });
    } catch (error) {
      toast.error("Full Name Not Updated, Try Again");
      console.error();
      return error;
    }
  };

  return (
    <div className="relative">
      <div className="border mb-4 rounded-[4px] shadow-sm">
        <div className="py-3 px-4 uppercase text-blue-950 font-medium">
          General
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[15px] md:text-[18px] text-blue-950">
              Full Name
            </h3>
            <h1 className="text-[13px] sm:text-[18px] md:text-[18px] font-medium">
              {teacherInfo?.staffName}
            </h1>
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => {
              setDropdown("Fullname");
            }}
          >
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] flex items-center gap-1 text-[13px] sm:text-[15px] md:text-[18px]">
              Email
            </h3>
            <div className="w-[60%] sm:w-[67%] xl:w-auto text-[13px] sm:text-[18px] md:text-[18px] font-medium lowercase break-words">
              {teacherInfo?.email}
            </div>
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Role
            </h3>
            <h1 className=" font-medium text-[13px] sm:text-[18px] md:text-[18px] ">
              {teacherInfo?.staffRole}
            </h1>
          </div>
          <div></div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Gender
            </h3>

            {teacherInfo?.gender ? (
              <h1 className="font-medium text-[13px] sm:text-[18px] md:text-[18px] ">
                {teacherInfo?.gender}
              </h1>
            ) : (
              <div className="font-medium text-blue-500 text-[13px] sm:text-[18px] md:text-[18px]">
                + add your gender
              </div>
            )}
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setDropdown("Gender")}
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
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Phone No:
            </h3>
            <h1 className="text-[13px] sm:text-[17px] font-medium">
              +234 812-910-0830
            </h1>
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setDropdown("PhoneNum")}
          >
            Edit
          </div>
        </div>
        <div className="border-b py-6 px-4 flex justify-between items-center hover:bg-gray-50">
          <div className="min-w-[80%] lg:min-w-[30%] flex justify-start items-center">
            <h3 className="font-normal w-[100px] text-[13px] sm:text-[18px] md:text-[18px] ">
              Address
            </h3>
            <h1 className="w-[60%] sm:w-[70%] xl:w-auto break-words text-[13px] sm:text-[17px] font-medium">
              {teacherInfo?.staffAddress}
            </h1>
          </div>
          <div
            className="py-1 px-3 border border-blue-950 rounded-md text-[13px] sm:text-[17px] font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setDropdown("Address")}
          >
            Edit
          </div>
        </div>
      </div>
      {/* Dropdown Modal For Editing */}
      {dropdown && (
        <div className="absolute w-full h-full flex justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm">
          <div className="p-4 min-h-[200px] min-w-[300px] bg-white border shadow-md rounded-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-blue-950">
                {dropdown === "Fullname" && "Enter Your Full Name"}
                {dropdown === "Gender" && "Enter Your Gender"}
                {dropdown === "PhoneNum" && "Enter Your Phone Number"}
                {dropdown === "Address" && "Enter Your Address"}
              </h2>
              <CgClose
                className="text-blue-950 text-[18px] font-bold cursor-pointer hover:scale-110"
                onClick={() => {
                  setDropdown(null);
                }}
              />
            </div>
            {dropdown === "Fullname" && (
              <Input
                placeholder="Example Prince John"
                value={name}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value;
                }}
              />
            )}
            {dropdown === "Gender" && (
              <Input
                placeholder="Example Prince John"
                value={name}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value;
                }}
              />
            )}
            {dropdown === "PhoneNum" && (
              <Input
                placeholder="08123456789"
                value={name}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value;
                }}
              />
            )}
            {dropdown === "Address" && (
              <Input
                placeholder="Example 402 creek road, Lekki Lagos"
                value={name}
                className="mb-4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value;
                }}
              />
            )}
            {/* State Change For button */}
            {dropdown === "Fullname" && (
              <Button
                name="Update"
                className="bg-blue-950 hover:scale-105"
                onClick={handleNameChange}
              />
            )}
            {dropdown === "Gender" && (
              <Button name="Update" className="bg-blue-950 hover:scale-105" />
            )}
            {dropdown === "PhoneNum" && (
              <Button name="Update" className="bg-blue-950 hover:scale-105" />
            )}
            {dropdown === "Address" && (
              <Button name="Update" className="bg-blue-950 hover:scale-105" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
