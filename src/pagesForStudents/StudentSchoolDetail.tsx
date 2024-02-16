import { FC, useState } from "react";
import Input from "../components/reUse/Input";

interface iPersonal {
  change: boolean;
}
const StudentSchoolDetail: FC<iPersonal> = ({ change }) => {
  const [schAddress, setSchAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [teacherContact, setTeacherContact] = useState<string>("");
  const [changePassword, setChangePassword] = useState<string>("");
  const [schoolMission, setSchoolMission] = useState<string>("");
  const [schoolVision, setSchoolVision] = useState<string>("");
  return (
    <div className="overflow-hidden">
      <div className="ml-[40px] mt-4 grid w-[100%] grid-cols-1 md:grid-cols-2 md:w-[60%] overflow-hidden ">
        <Input
          placeholder="School address"
          className="md:w-[87%] w-[80%]   text-black"
          type="name"
          required
          value={schAddress}
          onChange={(e: any) => {
            setSchAddress(e.target.value);
          }}
        />
        <Input
          placeholder="Class Teacher"
          className="w-[80%] md:w-[87%]  text-black"
          type="name"
          required
          value={teacherContact}
          onChange={(e: any) => {
            setTeacherContact(e.target.value);
          }}
        />
        <Input
          placeholder="Current password"
          className="md:w-[95%] w-[80%]  text-black"
          type="name"
          required
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <Input
          placeholder="Change password"
          className="md:w-[95%] w-[80%] md:ml-5 text-black"
          type="text"
          required
          value={changePassword}
          onChange={(e: any) => {
            setChangePassword(e.target.value);
          }}
        />
      </div>
      <textarea
        placeholder="School Mission"
        className="md:w-[40%] h-[156px] w-[80%] ml-12 md:ml-12 text-black border-gray-300 p-3 rounded-md border resize-none outline-blue-500"
        required
        value={schoolMission}
        onChange={(e: any) => {
          setSchoolMission(e.target.value);
        }}
      />
      <textarea
        placeholder="School Vision"
        className="md:w-[40%] h-[156px] w-[80%] ml-11 md:ml-11 text-black border-gray-300 p-3 rounded-md border resize-none outline-blue-500"
        required
        value={schoolVision}
        onChange={(e: any) => {
          setSchoolVision(e.target.value);
        }}
      />
    </div>
  );
};

export default StudentSchoolDetail;