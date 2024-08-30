import { FaPen } from "react-icons/fa";
import dummy from "../assets/dummy.jpg";
import StudentsPersonal from "./StudentsPersonal";
import StudentSchoolDetail from "./StudentSchoolDetail";
import { useState } from "react";
import LittleHeader from "../components/layout/LittleHeader";
import { useStudentInfo } from "./hooks/useStudentHook";
import { displayImageToggle } from "../global/reduxState";
import { useDispatch } from "react-redux";
import { updateStudentAvatar } from "./api/studentAPI";
import { mutate } from "swr";
import toast from "react-hot-toast";

const StudentSettings = () => {
  const dispatch = useDispatch();
  const { studentInfo } = useStudentInfo();
  const [change, setChange] = useState(false);

  const [state, setState] = useState<string>("");

  const changeImage = (e: any) => {
    const file = e.target.files[0];

    const formData: any = new FormData();
    formData.append("avatar", file);
    setState(file);

    if (state) {
      dispatch(displayImageToggle(true));
      const timer = setTimeout(() => {
        updateStudentAvatar(studentInfo?._id, formData).then((res) => {
          if (res.status === 201) {
            mutate(`api/view-student-info/${studentInfo?._id}`);
            toast.success("Image has been updated");
            dispatch(displayImageToggle(false));
          } else {
            toast.error(`${res?.response?.data?.message}`);
            dispatch(displayImageToggle(false));
          }
        });
        clearTimeout(timer);
      }, 50);
    }
  };

  return (
    <div className="text-blue-950">
      <LittleHeader name={"My Profile Detail"} />
      <div className="w-full h-[150px] flex rounded-md justify-center items-center bg-blue-950 gap-4">
        <div className="h-[100%] w-[80%] relative flex ">
          <div className="w-[155px] col-span-3 h-[155px] rounded-full border-4 bg-blue-950 border-white absolute top-[70px] ">
            <img
              src={studentInfo?.avatar ? studentInfo?.avatar : dummy}
              className="w-full h-full rounded-full object-cover"
              // style={{ objectFit: "cover", borderRadius: "100%" }}
            />
            <div className="w-[40px] h-[40px] bg-black bottom-4 rounded-full cursor-pointer absolute flex justify-center items-center right-0">
              <label htmlFor="pix" className="cursor-pointer">
                <FaPen style={{ color: "white" }} />
              </label>
              <input
                id="pix"
                type="file"
                onChange={changeImage}
                className="hidden"
              />
            </div>
          </div>
          <div className="w-[100%] h-[80%] flex justify-end items-end"></div>
        </div>
      </div>

      <div className="ml-[40px] grid w-[89%] text-[16px] md:w-[80%] grid-cols-2 sm:w-[80%] mb-20 mt-32 border rounded-md overflow-hidden">
        <div
          className={`font-medium flex justify-center items-center cursor-pointer text-[16px]  ${
            change ? "bg-blue-950 text-white p-4" : ""
          }`}
          onClick={() => {
            if (!document.startViewTransition) {
              document.startViewTransition(() => {
                setChange(true);
              });
            } else {
              document.startViewTransition(() => {
                setChange(true);
              });
            }
          }}
        >
          My personal details
        </div>
        <div
          className={`font-medium cursor-pointer text-[16px] flex justify-center items-center  ${
            change ? "" : "bg-blue-950 text-white p-4"
          }`}
          onClick={() => {
            if (!document.startViewTransition) {
              document.startViewTransition(() => {
                setChange(false);
              });
            } else {
              document.startViewTransition(() => {
                setChange(false);
              });
            }
          }}
        >
          My school details
        </div>
      </div>
      {change ? <StudentsPersonal change={change} /> : <StudentSchoolDetail />}
    </div>
  );
};

export default StudentSettings;
