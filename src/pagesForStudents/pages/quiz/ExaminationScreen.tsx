import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/layout/LittleHeader";
import { useExam, useQuiz } from "../../../pagesForTeachers/hooks/useTeacher";
import { performanceExamination, performanceTest } from "../../api/studentAPI";
import { useStudentInfo } from "../../hooks/useStudentHook";
import toast, { Toaster } from "react-hot-toast";
import oops from "../../../assets/socials/oops-transformed-removebg-preview.png";
import { MdPlayCircle } from "react-icons/md";
import CountdownTimer from "../../../components/static/CountdownTimer";
import { MdOutlineTimer } from "react-icons/md";
import { useStudentPerfomance } from "../../../pagesForTeachers/hooks/useQuizHook";

const ExaminationTestScreen = () => {
  const navigate = useNavigate();
  const { examID } = useParams();

  //   const { quizData } = useQuiz(examID!);
  const { examData: quizData } = useExam(examID!);
  const { studentInfo } = useStudentInfo();
  const { performance } = useStudentPerfomance(studentInfo?._id);

  const [state, setState] = useState<any>({});
  const [start, setStart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activate, setActivate] = useState<boolean>(false);
  const [timeUp, setTimeUp] = useState<boolean>(false);

  const courseID = quizData?.subjectID;

  console.log(quizData);

  const handleStateChange = (questionIndex: any, optionValue: any) => {
    setState((prev: any) => ({
      ...prev,
      [questionIndex]: optionValue.trim(),
    }));
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

  const myQuizData: any = quizData?.quiz;

  const isQuizDone = performance?.performance?.find(
    (el: any) => el?.quizID === examID && el?.quizDone
  );
  const timer = parseInt(quizData?.quiz?.instruction?.duration);
  let timerInSeconds = timer * 3600;

  const handleSubmit = () => {
    setLoading(true);
    const correctAnswers = quizData?.quiz?.question?.map((q: any) =>
      q.answer.trim()
    );
    let score = 0;

    correctAnswers.forEach((correctAnswer: string, index: number) => {
      if (correctAnswer === state[index]?.trim()) {
        score++;
      }
    });

    const percentage = Math.ceil((score / correctAnswers.length) * 100);
    let remark = getRemark(percentage);
    let grade = getGrade(percentage);

    const markPerQuest = quizData?.quiz?.instruction?.mark;
    const getQuizData = quizData?.quiz;

    const totalquest = getQuizData?.question?.length;

    timerInSeconds = 0;

    performanceExamination(studentInfo?._id, examID!, courseID, {
      studentScore: score,
      studentGrade: grade,
      remark,
      totalQuestions: totalquest,
      markPerQuestion: markPerQuest,
      status: quizData.status,
    })
      .then((res) => {
        if (res.status === 201) {
          toast.success(
            `${
              quizData?.status?.charAt(0).toUpperCase() +
              quizData?.status.slice(1)
            } submitted successfully`
          );
          navigate(`/quiz-result/${examID}`, {
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
      })
      .finally(() => {
        setLoading(false);
        localStorage.removeItem("countdown");
      });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey && event.key === "r") || event.key === "F5") {
        event.preventDefault();
        toast.error(
          `This action can't be done, while ${
            quizData?.status?.charAt(0).toUpperCase() +
            quizData?.status.slice(1)
          } is ongoing!`
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <LittleHeader
        name={`${quizData?.term && quizData?.term} ${quizData?.subjectTitle} ${
          quizData?.status
        } Screen`}
      />

      {isQuizDone ? (
        <div className="flex justify-center items-center flex-col">
          <img
            src={oops}
            alt="Oops"
            className="w-[250px] h-[250px] object-contain animate-pulse"
          />
          <h1 className="font-semibold text-purple-700">
            You have already attempted and Completed this Test
          </h1>
        </div>
      ) : (
        <div className="relative">
          {!start && (
            <div className="absolute top-20 left-1/3 z-10">
              <MdPlayCircle
                size={200}
                className="cursor-pointer text-red-500 hover:text-red-600 transition-all duration-300"
                onClick={() => {
                  if (!document.startViewTransition) {
                    setStart(true);
                    setActivate(true);
                  } else {
                    document.startViewTransition(() => {
                      setStart(true);
                      setActivate(true);
                    });
                  }
                }}
              />
              <p className="font-bold">
                Push Play to start your {quizData?.status}
              </p>
            </div>
          )}
          {/* Timer */}
          <div className="sticky flex top-[70px] justify-end items-center">
            <div className="sticky min-w-[230px] p-3 bg-blue-50 border shadow-sm rounded-lg flex justify-center items-end flex-col">
              <h1 className="mb-1 text-blue-950 font-semibold flex items-center justify-start gap-2">
                Test Count Down Timer <MdOutlineTimer />
              </h1>
              {activate && timerInSeconds ? (
                <div>
                  <CountdownTimer
                    initialSeconds={timerInSeconds}
                    onTimeUp={() => setTimeUp(true)}
                  />
                </div>
              ) : null}
            </div>
          </div>

          {/* Quiz Content */}
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
                          <div>
                            {el !== "" && (
                              <div
                                key={i}
                                className="flex items-center gap-2 ml-4"
                              >
                                <input
                                  className="radio radio-sm"
                                  type="radio"
                                  onChange={() => {
                                    handleStateChange(index, el);
                                  }}
                                  checked={state[index] === el.trim()}
                                />
                                <label>
                                  {typeof el === "string"
                                    ? el
                                    : JSON.stringify(el)}
                                </label>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <Button
                    className={`bg-blue-950 px-12 mt-14 py-4 ${
                      loading ? "cursor-not-allowed" : "cursor-pointer"
                    } `}
                    name={loading ? "Loading...." : "Submit"}
                    disabled={loading}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExaminationTestScreen;
