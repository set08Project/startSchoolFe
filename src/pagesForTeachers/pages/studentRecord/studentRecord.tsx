import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useTeacherInfo } from "../../hooks/useTeacher";

const StudentTestRecord = () => {
  const { teacherInfo } = useTeacherInfo();
  const [testRecords, setTestRecords] = useState([]);
  const URL: string = "https://startschoolbe-1.onrender.com/api";
  // const URL =
  //   import.meta.env.VITE_MAIN_URL || import.meta.env.VITE_PRODUCTION_URL;

  useEffect(() => {
    const fetchRecords = async () => {
      console.log(
        "Fetching records for student:",
        teacherInfo?.quiz?.performance
      );

      if (teacherInfo) {
        try {
          const response = await axios.get(
            `${URL}/quiz/${teacherInfo._id}/records`
          );
          const performanceRecords = response?.data?.data?.quiz?.flatMap(
            (quiz) =>
              quiz.performance.map((perf) => ({
                studentName: perf.studentName,
                studentScore: perf.studentScore,
                studentGrade: perf.studentGrade,
                subjectTitle: quiz.subjectTitle,
                date: new Date().toLocaleString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                }),
              }))
          );

          setTestRecords(performanceRecords);
        } catch (error) {
          console.error("Error fetching student quiz records:", error);
        }
      }
    };

    fetchRecords();
  }, [teacherInfo]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-xl font-extrabold text-gray-900 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Student Test Records
        </motion.h2>
        <motion.div
          className="overflow-x-auto shadow-xl rounded-lg bg-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <table className="min-w-full bg-white rounded-lg border border-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-blue-950 to-blue-500 text-white text-left">
                <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider">
                  Student Name
                </th>
                <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider">
                  Score
                </th>
                <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider">
                  Grade
                </th>
                <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider">
                  Subject Title
                </th>
                <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {testRecords.map((record, index) => (
                <motion.tr
                  key={index}
                  className="border-b transition-all duration-300 hover:bg-gray-50"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {record.studentName}
                  </td>
                  <td
                    className={`py-4 px-6 font-bold ${
                      record.studentScore >= 10
                        ? "text-red-600"
                        : "text-black-600"
                    }`}
                  >
                    {record.studentScore}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {record.studentGrade}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {record.subjectTitle}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{record.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentTestRecord;
