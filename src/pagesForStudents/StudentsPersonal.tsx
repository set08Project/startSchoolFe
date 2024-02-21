import { FC, useState } from "react";
import Input from "../components/reUse/Input";
import { useStudentInfo } from "./hooks/useStudentHook";

interface iPersonal {
  change: boolean;
}

const StudentsPersonal: FC<iPersonal> = ({ change }) => {
  // const [address, setAddress] = useState<string>("");
  // const [firstName, setFirstName] = useState<string>("");
  // const [lastName, setLastName] = useState<string>("");
  // const [number, setNumber] = useState<string>("");
  // const [bio, setBio] = useState<string>("");

  const { studentInfo } = useStudentInfo();

  return (
    <div className="overflow-hidden">
      <div className="ml-[40px] mt-4 grid w-[100%] grid-cols-1 md:grid-cols-1  lg:grid-cols-2 md:w-[60%] overflow-hidden">
        <div className="mb-8">
          <a className="text-[14px] text-gray-400 ">First name</a>
          <div className="md:w-[87%] lg:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]">
            {studentInfo?.studentFirstName}
          </div>
        </div>

        <div className="mb-8">
          <a className="text-[14px] text-gray-400">Last name</a>
          <div className="md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]">
            {studentInfo?.studentLastName}
          </div>
        </div>
        <div className="mb-8">
          <a className="text-[14px] text-gray-400">Phone number</a>
          <div className="md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]">
            {studentInfo?.phone ? (
              studentInfo?.phone
            ) : (
              <div className="opacity-40 text-[14px]">No Phone Number Yet</div>
            )}
          </div>
        </div>
        <div className="mb-8">
          <a className="text-[14px] text-gray-400 ">My address</a>
          <div className="md:w-[87%] w-[80%] border-b border-b-gray-400 pl-5 mt-[10px]">
            {studentInfo?.studentAddress ? (
              studentInfo?.studentAddress
            ) : (
              <div className="opacity-40">No Address Yet</div>
            )}
          </div>
        </div>
      </div>
      <div className="ml-[40px]">
        <a className="text-[14px] text-gray-400 ">My Biography</a>
        <div
          className="md:w-[70%] lg:w-full h-[156px] w-[90%] mt-[10px]
      text-black border-gray-400 p-3 rounded-md border text-[14px]"
        >
          {studentInfo?.bio ? (
            studentInfo?.bio
          ) : (
            <div className="opacity-40">No Biography Yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsPersonal;
