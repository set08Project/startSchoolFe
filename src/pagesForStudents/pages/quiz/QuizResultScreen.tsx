// src/pages/Student/QuizResultScreen.tsx

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../components/reUse/Button";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useStudentInfo } from "../../hooks/useStudentHook";

const QuizResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers, studentAnswers, score, total } = location.state;
  const [animate, setAnimate] = useState(false);
  const { studentInfo } = useStudentInfo();

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const BackOn = () => {
    navigate(-2);
  };


  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-100 transition-opacity duration-700 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Header */}
      <header className="bg-blue-950 text-white p-4 shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-center">My Test Results</h1>
      </header>

      {/* Content */}
      <main className="flex flex-col mt-8 transition-all duration-300 items-center px-4">
        <p className="text-lg mt-4 font-medium text-gray-700">
          You scored{" "}
          <span className="text-green-600 font-bold text-2xl">{score}</span> out
          of <span className="text-blue-600 font-bold text-2xl">{total}</span>
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {correctAnswers.map((correctAnswer: any, index: any) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md border-l-4 ${
                studentAnswers[index] === correctAnswer
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
              } transition-transform duration-500 hover:scale-105`}
            >
              <div className="flex justify-between items-center">
                <h2 className="lg:text-xl text-[18px] font-semibold text-blue-950 underline">
                  Question {index + 1}
                </h2>
                {studentAnswers[index] === correctAnswer ? (
                  <FaCheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <FaTimesCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
              <p
                className={`mt-1 text-[14px] font-medium ${
                  studentAnswers[index] === correctAnswer
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <span className="text-gray-600">Your Answer:</span>{" "}
                {studentAnswers[index] || "No answer selected"}
              </p>
              <p className="mt-2 text-[16px] md:text-[18px]">
                <span className="font-semibold text-gray-600">
                  Correct Answer:
                </span>{" "}
                <span className="font-semibold text-green-600">
                  {correctAnswer}
                </span>
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Button */}
      <footer className="flex justify-center mt-auto mb-8">
        <Button
          className="bg-blue-950 mt-8 px-8 py-3 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-300"
          name="🔙 view quiz"
          onClick={BackOn}
        />
      </footer>
    </div>
  );
};

export default QuizResultScreen;
