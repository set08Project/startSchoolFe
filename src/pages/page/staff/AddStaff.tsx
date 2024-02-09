import { useState } from "react";
import Input from "../../../components/reUse/Input";
import LittleHeader from "../../../components/static/LittleHeader";
import Button from "../../../components/reUse/Button";
import { createSchoolTeacher } from "../../api/schoolAPIs";
import { useSchoolData } from "../../hook/useSchoolAuth";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { displayDelay, displayStudent } from "../../../global/reduxState";
import ClipLoader from "react-spinners/ClipLoader";

const AddStaff = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [assignedSubject, setAssignedSubject] = useState<string>("");
  const [assignedRole, setAssignedRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useSchoolData();

  const createNewStaff = () => {
    setLoading(true);
    createSchoolTeacher(data?._id, {
      staffName: name,
      staffAddress: location,
      subjectTitle: assignedSubject,
      role: assignedRole,
      salary: parseInt(salary),
    }).then((res) => {
      if (res.status === 201) {
        setLoading(false);
        toast.success("student registered successful");
        dispatch(displayDelay(false));
        const timing = setTimeout(() => {
          dispatch(displayStudent(false));

          clearTimeout(timing);
        }, 500);
      } else {
        setLoading(false);
        toast.error(`${res.response.data.message}`);
      }
    });
  };

  return (
    <div className="px-4 h-full ">
      <div className="mt-20" />
      <LittleHeader name={"Add New Staff"} />

      <Toaster position="top-center" reverseOrder={true} />

      <div className="border rounded-md w-full h-[80%]  p-4 mt-4 ">
        <div className="mt-10" />

        <div className="mt-1">
          <label
            className="text-[14px]"
            onClick={() => {
              console.log("started");
            }}
          >
            Staff Name
          </label>
          <Input
            placeholder="Enter Staff Name"
            className="ml-0 w-full"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mt-1">
          <label className="text-[14px]">Staff Address</label>
          <Input
            placeholder="Enter Staff Address"
            className="ml-0 w-full"
            value={location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div className="mt-1">
          <label className="text-[14px]">Staff Salary</label>
          <Input
            placeholder="120000"
            className="ml-0 w-full"
            value={salary}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSalary(e.target.value);
            }}
          />
        </div>
        <div className="mt-1">
          <label className="text-[14px]">Staff Taking Subject</label>
          <Input
            placeholder="Enter Staff Taking Subject"
            className="ml-0 w-full"
            value={assignedSubject}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAssignedSubject(e.target.value);
            }}
          />
        </div>
        <div className="mt-1">
          <label className="text-[14px]">Staff Role</label>
          <Input
            placeholder="Enter Staff Role"
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
            name={
              loading ? (
                <div className="flex gap-2 items-center">
                  <ClipLoader color="#fff" size={20} />
                  <p>Loading</p>
                </div>
              ) : (
                "Register Staff"
              )
            }
            className="w-full mx-0 bg-blue-950 py-4"
            onClick={createNewStaff}
          />
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
