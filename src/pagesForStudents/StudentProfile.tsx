import { FaPen } from "react-icons/fa";
import dummy from "../assets/dummy.jpg";
import { NavLink } from "react-router-dom";
import StudentsPersonal from "./StudentsPersonal";
import StudentSchoolDetail from "./StudentSchoolDetail";
import { useState } from "react";
const StudentProfile = () => {
  const [change, setChange] = useState(false);

  return (
    <div>
      <div className="w-full h-[150px] flex  justify-center items-center bg-blue-800 gap-4">
        <div className="h-[100%] w-[80%] relative flex ">
          <div className="w-[155px] col-span-3 h-[155px] rounded-full border-4 bg-blue-800 border-white absolute top-[70px] ">
            <img
              src={dummy}
              style={{ objectFit: "cover", borderRadius: "100%" }}
            />
            <div className="w-[40px] h-[40px] bg-black bottom-4 rounded-full cursor-pointer  absolute flex justify-center items-center right-0">
              <FaPen style={{ color: "white" }} />
            </div>
          </div>
          <div className="w-[100%] h-[80%] flex justify-end items-end"></div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="ml-[55px] grid w-[89%] text-[16px] md:w-[80%] grid-cols-2 sm:w-[100%] ">
        <div
          className={`font-medium cursor-pointer text-[17px]  ${
            change ? "text-blue-800" : ""
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
          className={`font-medium cursor-pointer text-[17px] ${
            change ? "" : "text-blue-800"
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
      {change ? (
        <StudentsPersonal change={change} />
      ) : (
        <StudentSchoolDetail change={change} />
      )}
      <button className="btn text-white ml-12 mt-4 bg-blue-800 justify-items-end hover:bg-blue-900">
        Update
      </button>
    </div>
  );
};

export default StudentProfile;