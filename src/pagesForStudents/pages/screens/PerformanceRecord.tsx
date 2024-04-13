import React from "react";
import {
  useReadOneClassInfo,
  useStudentInfo,
} from "../../hooks/useStudentHook";

const PerformanceRecord = () => {
  const { studentInfo } = useStudentInfo();
  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);

  console.log(studentInfo);

  return (
    <div className="mt-5 border rounded-md p-2 bg-slate-100 text-[12px] w-full">
      PerformanceRecord
    </div>
  );
};

export default PerformanceRecord;
