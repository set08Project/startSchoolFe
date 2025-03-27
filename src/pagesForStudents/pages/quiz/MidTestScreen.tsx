import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/layout/LittleHeader";
import { useMidTest } from "../../../pagesForTeachers/hooks/useTeacher";
import { performanceMidTest } from "../../api/studentAPI";
import { useMidTestStudent, useStudentInfo } from "../../hooks/useStudentHook";
import toast, { Toaster } from "react-hot-toast";
import oops from "../../../assets/socials/oops-transformed-removebg-preview.png";
import { MdPlayCircle } from "react-icons/md";
import CountdownTimer from "../../../components/static/CountdownTimer";
import { MdOutlineTimer } from "react-icons/md";
import { useStudentPerfomance } from "../../../pagesForTeachers/hooks/useQuizHook";
import lodash from "lodash";
import { useSchoolClassRMDetail } from "@/pages/hook/useSchoolAuth";

const MidTestScreen = () => {
  const navigate = useNavigate();
  const { midTestID, subjectID } = useParams();

  //   const { quizData } = useQuiz(midTestID!);
  const { midTest: quizData } = useMidTestStudent(subjectID!);
  const { midTest } = useMidTest(midTestID!);
  const { studentInfo } = useStudentInfo();
  const { performance } = useStudentPerfomance(studentInfo?._id);
  const { classroom } = useSchoolClassRMDetail(studentInfo?.schoolIDs);

  const [state, setState] = useState<any>(
    JSON.parse(localStorage.getItem("midTest")!)?.state || {}
  );
  const [start, setStart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activate, setActivate] = useState<boolean>(false);
  const [timeUp, setTimeUp] = useState<boolean>(false);

  const courseID = quizData?.subjectID;

  const handleStateChange = (questionIndex: any, optionValue: any) => {
    setState((prev: any) => ({
      ...prev,
      [questionIndex]: optionValue.trim(),
    }));
  };

  const getRemark = (genPointScore: number) => {
    return genPointScore >= 0 && genPointScore <= 5
      ? "This is a very poor result."
      : genPointScore >= 6 && genPointScore <= 11
      ? "This result is poor; it's not satisfactory."
      : genPointScore >= 11 && genPointScore <= 15
      ? "Below average; needs significant improvement."
      : genPointScore >= 16 && genPointScore <= 21
      ? "Below average; more effort required."
      : genPointScore >= 21 && genPointScore <= 25
      ? "Fair but not satisfactory; strive harder."
      : genPointScore >= 26 && genPointScore <= 31
      ? "Fair performance; potential for improvement."
      : genPointScore >= 31 && genPointScore <= 35
      ? "Average; a steady effort is needed."
      : genPointScore >= 36 && genPointScore <= 41
      ? "Average; showing gradual improvement."
      : genPointScore >= 41 && genPointScore <= 45
      ? "Slightly above average; keep it up."
      : genPointScore >= 46 && genPointScore <= 51
      ? "Decent work; shows potential."
      : genPointScore >= 51 && genPointScore <= 55
      ? "Passable; satisfactory effort."
      : genPointScore >= 56 && genPointScore <= 61
      ? "Satisfactory; good progress."
      : genPointScore >= 61 && genPointScore <= 65
      ? "Good work; keep striving for excellence."
      : genPointScore >= 66 && genPointScore <= 71
      ? "Commendable effort; very good."
      : genPointScore >= 71 && genPointScore <= 75
      ? "Very good; consistent effort is visible."
      : genPointScore >= 76 && genPointScore <= 81
      ? "Excellent performance; well done!"
      : genPointScore >= 81 && genPointScore <= 85
      ? "Exceptional result; keep up the great work!"
      : genPointScore >= 86 && genPointScore <= 91
      ? "Outstanding achievement; impressive work!"
      : genPointScore >= 91 && genPointScore <= 95
      ? "Brilliant performance; you’re a star!"
      : genPointScore >= 96 && genPointScore <= 100
      ? "Outstanding achievement; impressive work!"
      : ``;
  };

  const getGrade = (exam: number) => {
    if (exam >= 0 && exam <= 39) return "F9";
    if (exam >= 39 && exam <= 44) return "E8";
    if (exam >= 44 && exam <= 49) return "D7";
    if (exam >= 49 && exam <= 54) return "C6";
    if (exam >= 54 && exam <= 59) return "C5";
    if (exam >= 59 && exam <= 64) return "C4";
    if (exam >= 64 && exam <= 69) return "B3";
    if (exam >= 69 && exam <= 74) return "B2";
    if (exam >= 74 && exam <= 100) return "A1";
    return null;
  };

  const myQuizData: any = quizData?.quiz;

  const isQuizDone = performance?.performance?.find(
    (el: any) => el?.quizID === midTestID && el?.quizDone
  );
  const timer = parseFloat(quizData?.quiz?.instruction?.duration);

  let timerInSeconds = timer * 3600;
  let score = 0;

  const handleSubmit = () => {
    setLoading(true);
    const correctAnswers = quizData?.quiz?.question?.map((q: any) =>
      q.answer.trim()
    );

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

    performanceMidTest(studentInfo?._id, midTestID!, courseID, {
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
          navigate(`/confirm-quiz-take/${studentInfo?._id}`, {
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
        localStorage.removeItem("midTest");
        localStorage.removeItem("midTestQuestions");
        setTimeUp(false);
      });
  };
  const [readQuestion, setReadQuestion] = useState(
    JSON.parse(localStorage.getItem("midTestQuestions")!)
  );
  let savedSeconds = JSON.parse(localStorage.getItem("countdown"));

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
    localStorage.setItem("midTest", JSON.stringify({ score, state }));

    const question = JSON.parse(localStorage.getItem("midTestQuestions")!);

    if (question === null) {
      localStorage.setItem(
        "midTestQuestions",
        JSON.stringify(lodash.shuffle(myQuizData?.question))
      );
      setReadQuestion(JSON.parse(localStorage.getItem("midTestQuestions")!));
    } else if (question?.length === 0) {
      localStorage.setItem(
        "midTestQuestions",
        JSON.stringify(lodash.shuffle(myQuizData?.question))
      );
      setReadQuestion(JSON.parse(localStorage.getItem("midTestQuestions")!));
    }

    if (timeUp) {
      let autoSubmit = setTimeout(() => {
        const correctAnswers = quizData?.quiz?.question?.map((q: any) =>
          q.answer.trim()
        );

        correctAnswers?.forEach((correctAnswer: string, index: number) => {
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

        performanceMidTest(studentInfo?._id, midTestID!, courseID, {
          studentScore: score,
          studentGrade: grade,
          remark,
          totalQuestions: totalquest,
          markPerQuestion: markPerQuest,
          status: quizData?.status,
        })
          .then((res) => {
            if (res.status === 201) {
              toast.success(
                `${
                  quizData?.status?.charAt(0).toUpperCase() +
                  quizData?.statu?.slice(1)
                } submitted successfully`
              );
              navigate(`/confirm-quiz-take/${studentInfo?._id}`, {
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
            localStorage.removeItem("midTest");
            localStorage.removeItem("midTestQuestions");
            setTimeUp(false);
          });
        clearTimeout(autoSubmit);
      }, 1000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state, readQuestion, myQuizData, timeUp]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <LittleHeader
        name={`
          ${quizData?.subjectTitle} ${quizData?.status} Screen`}
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
                {readQuestion?.map((question: any, index: number) => (
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

                <div className="border-r mt-10 w-full h-[10px] bg-red-30">
                  <hr />
                </div>
                <div className="text-[16px] italic font-semibold">
                  Section B{" "}
                </div>

                <div
                  className="mt-5"
                  dangerouslySetInnerHTML={{
                    __html: `${myQuizData?.theory}`,
                  }}
                />
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

export default MidTestScreen;
