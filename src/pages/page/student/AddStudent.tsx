import { useState } from "react";
import Input from "../../../components/reUse/Input";
import LittleHeader from "../../../components/static/LittleHeader";
import Button from "../../../components/reUse/Button";
import { displayDelay, displayStudent } from "../../../global/reduxState";
import { useDispatch } from "react-redux";
import { createSchoolStudent } from "../../api/schoolAPIs";
import { useSchoolData } from "../../hook/useSchoolAuth";
import toast, { Toaster } from "react-hot-toast";
import { MdClose } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";

const AddStudent = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const [assignedClass, setAssignedClass] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useSchoolData();

  const handleStudentCreation = () => {
    setLoading(true);
    createSchoolStudent(data?._id, {
      studentLastName: lastName,
      studentFirstName: name,
      studentAddress: location,
      classAssigned: assignedClass,
      gender,
    })
      .then((res: any) => {
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
      })
      .catch(() => console.error());
  };

  return (
    <div className="px-4 h-full overflow-y-auto ">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="mt-20" />
      <div className="flex justify-between items-center">
        <LittleHeader name={"Add New Student"} />

        <MdClose
          className="cursor-pointer w-10 h-10 p-2 rounded-full hover:rotate-90 transition-all duration-300 hover:bg-slate-50"
          onClick={() => {
            dispatch(displayDelay(false));
            const timing = setTimeout(() => {
              dispatch(displayStudent(false));

              clearTimeout(timing);
            }, 500);

            // setShow(!show);
          }}
        />
      </div>

      <div className="border rounded-md w-full h-[80%]  p-4 mt-4 ">
        <div className="mt-10" />

        <div className="mt-1">
          <label className="text-[14px]">Student First Name</label>
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
          <label className="text-[14px]">Student First Name</label>
          <Input
            placeholder="Enter Student Address"
            className="ml-0 w-full"
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="mt-1 flex flex-col mb-6">
          <label className="text-[14px] mb-2">
            Gender:{" "}
            <span className="font-bold text-[10px]">Choose a Genders</span>
          </label>
          <select
            className="ml-0 select select-bordered w-full "
            value={gender}
            onChange={(e: any) => {
              setGender(e.target.value);
            }}
          >
            <option disabled selected value="Choose a Genders">
              Choose a Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mt-1">
          <label className="text-[14px]">Student Address</label>
          <Input
            placeholder="Enter Student Assigned Class"
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
            placeholder="Enter Student Taking Subject"
            className="ml-0 w-full"
            value={assignedClass}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAssignedClass(e.target.value);
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
                  <p>Processing Registration...</p>
                </div>
              ) : (
                "Register Student"
              )
            }
            className="w-full mx-0 bg-blue-950 py-4"
            onClick={handleStudentCreation}
          />
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
