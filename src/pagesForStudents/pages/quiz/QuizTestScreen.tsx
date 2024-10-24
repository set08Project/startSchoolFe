import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/layout/LittleHeader";
import {
  useQuiz,
  useSujectQuiz,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { performanceTest } from "../../api/studentAPI";
import { useStudentInfo } from "../../hooks/useStudentHook";
import toast, { Toaster } from "react-hot-toast";
import { MdPlayCircle } from "react-icons/md";

const QuizTestScreen = () => {
  const navigate = useNavigate();
  const { quizID } = useParams();
  const [state, setState] = useState<any>({});
  const { quizData } = useQuiz(quizID!);
  const [start, setStart] = useState<boolean>(false);

  console.log("Reading Quiz Data", quizData);
  const courseID = quizData?.subjectID;
  const { studentInfo } = useStudentInfo();

  const handleStateChange = (questionIndex: any, optionValue: any) => {
    setState((prev: any) => ({
      ...prev,
      [questionIndex]: optionValue,
    }));
  };

  const handleSubmit = () => {
    const correctAnswers = quizData?.quiz[1]?.question?.map(
      (q: any) => q.answer
    );
    let score = 0;

    correctAnswers.forEach((correctAnswer: string, index: number) => {
      if (correctAnswer === state[index]) {
        score++;
      }
    });

    const percentage = Math.ceil((score / correctAnswers.length) * 100);
    let remark = getRemark(percentage);
    let grade = getGrade(percentage);

    // To be continued later. I will return the SubjectID at the backend and Consume it on the frontend. then try to populate it back to see if the performance is pushed to the subject array from the backend.

    performanceTest(studentInfo?._id, quizID!, courseID, {
      studentScore: score,
      studentGrade: grade,
      remark,
    }).then((res) => {
      if (res.status === 201) {
        toast.success("Quiz submitted successfully");
        navigate(`/quiz-result/${quizID}`, {
          state: {
            correctAnswers,
            studentAnswers: state,
            score,
            total: correctAnswers.length,
          },
        });
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  const getRemark = (percentage: number) => {
    if (percentage <= 45) return "Very poor performance!";
    if (percentage <= 55) return "A poor performance!";
    if (percentage <= 65) return "Good performance, can do better!";
    if (percentage <= 75) return "Good performance, keep it up!";
    if (percentage <= 85) return "Very good performance!";
    return "Excellent performance!";
  };

  const getGrade = (percentage: number) => {
    if (percentage <= 45) return "F";
    if (percentage <= 55) return "E";
    if (percentage <= 65) return "D";
    if (percentage <= 75) return "C";
    if (percentage <= 85) return "B";
    return "A";
  };

  const myQuizData = quizData?.quiz[1];

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <LittleHeader name={`${quizData?.subjectTitle} Test Screen`} />
      <div className="relative">
        {!start && (
          <div className="absolute top-20 left-1/3 z-10">
            <MdPlayCircle
              size={200}
              className="cursor-pointer text-red-500 hover:text-red-600 transition-all duration-300"
              onClick={() => {
                if (!document.startViewTransition) {
                  setStart(true);
                } else {
                  document.startViewTransition(() => {
                    setStart(true);
                  });
                }
              }}
            />
            <p className="font-bold">Push Play to start your Test</p>
          </div>
        )}
        <div className="bg-slate-50 justify-center flex min-h-[100vh]">
          {start && (
            <div className="bg-white w-full px-5">
              {myQuizData?.question?.map((question: any, index: number) => (
                <div key={index}>
                  <p className="text-[14px] font-bold mt-10">
                    Question {index + 1}.
                  </p>
                  <div className="ml-4">
                    <p className="text-[18px]">{question?.question}</p>
                    <div className="ml-8">
                      <p className="text-[12px] mt-5">
                        Choose your options carefully
                      </p>
                      {question?.options?.map((el: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 ml-4">
                          <input
                            className="radio radio-sm"
                            type="radio"
                            onChange={() => handleStateChange(index, el)}
                            checked={state[index] === el}
                          />
                          <label>
                            {typeof el === "string" ? el : JSON.stringify(el)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <Button
                  className="bg-blue-950 px-12 mt-14 py-4"
                  name="Submit"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizTestScreen;
