import { useState } from "react";
import Input from "../../../components/reUse/Input";
import LittleHeader from "../../../components/static/LittleHeader";
import Button from "../../../components/reUse/Button";
import { displayDelay, displayStudent } from "../../../global/reduxState";
import { useDispatch } from "react-redux";

const AddStudent = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [assignedClass, setAssignedClass] = useState<string>("");
  const [assignedSubject, setAssignedSubject] = useState<string>("");
  const [assignedRole, setAssignedRole] = useState<string>("");

  return (
    <div className="px-4 h-full ">
      <div className="mt-20" />
      <LittleHeader name={"Adding New Student"} />

      <div className="border rounded-md w-full h-[80%]  p-4 mt-4 ">
        <div className="mt-10" />

        <div className="mt-1">
          <label className="text-[14px]">Student Name</label>
          <Input
            placeholder="Enter Student Name"
            className="ml-0 w-full"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mt-1">
          <label className="text-[14px]">Student Address</label>
          <Input
            placeholder="Enter Student Address"
            className="ml-0 w-full"
            value={location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div className="mt-1">
          <label className="text-[14px]">Student Assigned Class</label>
          <Input
            placeholder="Enter Student Assigned Class"
            className="ml-0 w-full"
            value={assignedClass}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAssignedClass(e.target.value);
            }}
          />
        </div>
        <div className="mt-1">
          <label className="text-[14px]">Student Taking Subject</label>
          <Input
            placeholder="Enter Student Taking Subject"
            className="ml-0 w-full"
            value={assignedSubject}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAssignedSubject(e.target.value);
            }}
          />
        </div>
        <div className="mt-1">
          <label className="text-[14px]">Student Role</label>
          <Input
            placeholder="Enter Student Role"
            className="ml-0 w-full"
            value={assignedRole}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAssignedRole(e.target.value);
            }}
          />
        </div>

        <div className="mt-10" />

        <div className="w-full flex justify-center">
          <Button
            name="Register Student"
            className="w-full mx-0 bg-blue-950 py-4"
            onClick={() => {
              dispatch(displayDelay(false));
              const timing = setTimeout(() => {
                dispatch(displayStudent(false));

                clearTimeout(timing);
              }, 500);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
