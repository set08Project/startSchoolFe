import LittleHeader from "@/components/layout/LittleHeader";
import {
  useStudentInfo,
  useStudentInfoData,
  useViewRemark,
} from "@/pagesForStudents/hooks/useStudentHook";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AttendanceDataChart } from "./AttendanceDtaaChart";
import { StraightChart } from "./StraightChart";

const ViewWeekReport = () => {
  const { studentID } = useParams();
  const { studentInfoData } = useStudentInfoData(studentID);
  const { remarks } = useViewRemark(studentID);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      {/* header */}
      <div className="mb-0" />
      <LittleHeader
        name={`Viewing ${studentInfoData?.studentFirstName} Weekly Report`}
      />

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          <div className="border min-h-10 rounded-md p-4 m-2 flex flex-col">
            <p className="leading-tight text-red-400">
              Outstanding School-fee Payment
            </p>

            <p className="mt-10 text-[30px] md:text-[40px] font-semibold">
              ₦5,000
            </p>

            <p className="text-[12px] text-blue-950 -mt-2">
              This is a simple Notification that the above amount is still yet
              to be paid.
              <br />
              <p className="mt-2">Once paid it will be updated</p>
            </p>

            <div className="flex-1" />
            <div className="flex ">
              <p className="text-[12px] rounded-sm py-1 px-6 text-white bg-orange-500">
                Paid off Outstanding
              </p>
            </div>
          </div>
          <div className="border min-h-10 rounded-md p-4 m-2">
            <div className="flex flex-col h-full">
              <p>Most Recent Complain</p>

              <p className="text-[12px] mt-10">Your Complain Message:</p>
              <p>message</p>
              <div className="flex-1" />
              <div className="flex items-end flex-col ">
                <p className="text-[12px] font-semibold mt-5 ">
                  complain status
                </p>
                <p className="text-[12px] rounded-sm py-1 px-6 text-white bg-orange-500">
                  Seen
                </p>
              </div>
            </div>
          </div>

          <div className="border min-h-10 rounded-md p-4 col-span-1 sm:col-span-3 lg:col-span-1 m-2">
            <div>
              <p>Special Announcement</p>
              <p className="text-[12px] font-semibold ">
                You are seeing this because it is very important
              </p>

              <p className="text-[12px] font-semibold mt-8">Notice</p>
              <p>Message Title</p>
              <p className="text-[13px] text-black/60">Message Detail</p>
              <p className="text-[13px] text-black/60 mt-6">Date</p>
              <p className="text-[13px] text-black/60 mt-">Created</p>
            </div>
          </div>
        </div>
      </main>

      <section className="mt-10 ">
        <main className="grid grid-cols-1 md:grid-cols-3">
          <div className="py-4 min-h-5 border rounded-md m-2 col-span-2 grid grid-cols-1 lg:grid-cols-2 ">
            <AttendanceDataChart
              studentInfoData={studentInfoData}
              remarks={remarks}
            />
            <div className="p-4 min-h-5 rounded-md m- ">
              <StraightChart />
            </div>
          </div>
          <div className="p-4 min-h-5 border rounded-md m-2 ">1</div>
        </main>
      </section>
    </div>
  );
};

export default ViewWeekReport;
