import React from "react";
import { FaCheckDouble } from "react-icons/fa6";

const StudentDashboard = () => {
  return (
    <div className="w-full h-full bg-white flex items-center  justify-between rounded-lg">
      <div className="w-[58%] h-[100%] border border-slate-200 rounded-lg ">
        <p className="m-4 text-blue-900 font-medium">Student's Info</p>
        <div className="grid grid-cols-2 gap-3 m-4 text-blue-900 font-semibold">
          <div className="border rounded-md min-h-[100px] p-4">
            <p className="font-medium leading-tight">Total Subjects:</p>

            <h1 className="text-[40px] font-medium">13</h1>
          </div>

          <div className="border rounded-md min-h-[60px] p-4">
            <p className="font-medium leading-tight">Articles Read: </p>

            <h1 className="text-[40px] font-medium">5</h1>
          </div>
          <div className="border rounded-md min-h-[60px] p-4">
            <p className="font-medium leading-tight">Most Read Subject</p>

            <h1
              className="text-[25px] mt-5 font-bold"
              style={{ color: "var(--primary)" }}
            >
              Biology
              <span className="text-[12px]"></span>
            </h1>
          </div>
          <div className="border rounded-md min-h-[100px] p-4">
            <p className="font-medium leading-tight">Assignments Done: </p>

            <h1 className="text-[25px] mt-5  font-bold break-words leading-tight">
              2
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 m-4 mt-9 text-blue-900 font-semibold">
          <div className="border rounded-md min-h-[300px] p-4">
            <p className="font-medium leading-tight">Lesson Notes</p>
          </div>

          <div className="border rounded-md min-h-[300px] p-4">
            <p className="font-medium leading-tight">Other Info</p>
          </div>
        </div>
      </div>

      <div className="w-[40%] h-[100%]  border border-slate-200  rounded-lg">
        <p className="m-4 text-blue-900 font-medium">My Performance</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
