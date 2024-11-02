import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LittleHeader from "../../components/layout/LittleHeader";
import { useSujectQuiz } from "../../hooks/useTeacher";
import {
  useStudentPerfomance,
  useSubjectStudentPerfomance,
} from "../../hooks/useQuizHook";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Button from "../../components/reUse/Button";

const QuizSetupScreen = () => {
  const { subjectID } = useParams();
  const { quizID } = useParams();
  const { subjectQuiz } = useSujectQuiz(subjectID!);
  const { performance } = useStudentPerfomance(subjectID!);
  const { studentPerformance } = useSubjectStudentPerfomance(subjectID!);
  const navigate = useNavigate();

  // My Console.Logs
  console.log("viewing subjectID", subjectID);
  console.log("perfomance", performance);
  console.log("student Individual Perfomance", studentPerformance);

  const [loading, setLoading] = useState<boolean>(false);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "text-green-600";
      case "B":
        return "text-blue-600";
      case "C":
        return "text-yellow-600";
      case "D":
        return "text-orange-600";
      case "E":
        return "text-red-600";
      case "F":
        return "text-red-700";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="ml-5 pt-2">
        <LittleHeader name="Your Test Records" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* {data.length === 0 ? ( */}
            <p className="text-center text-gray-600">No test records found.</p>
            {/* ) : ( */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="py-3 px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Test Title
                    </th>
                    <th className="py-3 px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="py-3 px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="py-3 px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Remark
                    </th>
                    <th className="py-3 px-6 bg-blue-50 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {quizRecords.map((record: QuizRecord) => ( */}
                  <motion.tr
                    //   key={record._id}
                    className="border-b hover:bg-gray-100 transition-colors duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {/* {record.subjectTitle} */}Hello
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {/* {record.studentScore} */} Hello
                    </td>
                    <td
                    // className={`py-4 px-6 text-sm font-semibold ${getGradeColor(
                    //   record.studentGrade
                    // )}`}
                    >
                      {/* {record.studentGrade} */} Hello
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {/* {record.remark} */} Hello
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {/* {new Date(record.createdAt).toLocaleDateString()} */}{" "}
                      Hello
                    </td>
                  </motion.tr>
                  {/* ))} */}
                </tbody>
              </table>
            </div>
            {/* )} */}
          </motion.div>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            className="bg-blue-950 px-6 py-3 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-300"
            name="Go Back to Home"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizSetupScreen;
