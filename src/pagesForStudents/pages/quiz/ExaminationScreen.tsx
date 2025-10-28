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
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { FaSpinner } from "react-icons/fa6";
import lodash from "lodash";

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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const courseID = quizData?.subjectID;
  const countdownKey = `countdown_${examID}_${studentInfo?._id}`;

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

  const timer = parseFloat(quizData?.quiz?.instruction?.duration || "0.0333");
  let timerInSeconds = timer * 3600;

  const handleSubmit = () => {
    // guard against double submissions
    if (isSubmitted) return;
    setIsSubmitted(true);
    setLoading(true);

    // Normalize correct answers from the currently loaded/shuffled questions (fallback to original quiz questions)
    const correctAnswers = (readQuestion || myQuizData?.question || []).map(
      (q: any) =>
        typeof q?.answer === "string"
          ? q.answer.trim()
          : q?.answer?.toString?.() || ""
    );

    // Initialize score inside handleSubmit
    let score = 0;
    // Use readQuestion for both display and scoring
    readQuestion?.forEach((question: any, index: number) => {
      const correctAnswer = question.answer?.trim() || "";
      const studentAnswer = state[index]?.trim() || "";
      if (correctAnswer === studentAnswer) {
        score++;
      }
    });

    const totalForCalc = correctAnswers.length || 1;
    const percentage = Math.ceil((score / totalForCalc) * 100);
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
          // navigate(`/quiz-result/${examID}`, {
          navigate(`/confirm-quiz-take/${examID}`, {
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
        try {
          localStorage.removeItem(countdownKey);
        } catch (e) {}
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

  // Auto-submit when time is up
  useEffect(() => {
    if (timeUp && !isSubmitted) {
      toast.success("Time is up — submitting automatically...");
      // give a tiny delay to allow UI to update (optional)
      setTimeout(() => {
        handleSubmit();
      }, 250);
    }
  }, [timeUp, isSubmitted]);

  // Get shuffled questions from localStorage
  // const readQuestion = JSON.parse(localStorage.getItem("readQuestion") || "[]");

  const [readQuestion, setReadQuestion] = useState(
    JSON.parse(localStorage.getItem("examQuestions")!)
  );
  let score = 0;

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
    localStorage.setItem("exam", JSON.stringify({ score, state }));

    const question = JSON.parse(localStorage.getItem("examQuestions")!);
    console.clear();
    console.log(quizData);

    if (question === null) {
      const sourceQuestions = myQuizData?.question ?? [];
      console.log("Source Questions:", sourceQuestions);

      const questionsToStore = !quizData?.randomize
        ? lodash.shuffle([...sourceQuestions])
        : sourceQuestions;
      localStorage.setItem("examQuestions", JSON.stringify(questionsToStore));
      // localStorage.setItem(
      //   "examQuestions",
      //   JSON.stringify(lodash.shuffle(myQuizData?.question))
      // );
      setReadQuestion(JSON.parse(localStorage.getItem("examQuestions")!));
    } else if (question?.length === 0) {
      localStorage.setItem(
        "examQuestions",
        JSON.stringify(lodash.shuffle(myQuizData?.question))
      );
      setReadQuestion(JSON.parse(localStorage.getItem("examQuestions")!));
    }

    if (timeUp && !isSubmitted) {
      // small delay to allow UI update and any pending state flush
      const autoSubmit = setTimeout(() => {
        handleSubmit();
      }, 1000);
      return () => clearTimeout(autoSubmit);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state, readQuestion, myQuizData, timeUp, quizData?.randomize]);

  useEffect(() => {
    // do not clear countdown here so reloads won't reset the timer
    // clearing of countdown is handled when the exam is submitted or when time runs out
    try {
      localStorage.removeItem("exam");
      localStorage.removeItem("examQuestions");
    } catch (e) {}
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [_score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
      ],
      correctAnswer: 0,
    },
    {
      id: 2,
      question:
        "Which programming language is known as the 'language of the web'?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style Sheets",
        "Colorful Style Sheets",
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "Which of the following is a JavaScript framework?",
      options: ["Django", "Flask", "React", "Laravel"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "What is the purpose of Git?",
      options: [
        "Image editing",
        "Version control",
        "Database management",
        "Web hosting",
      ],
      correctAnswer: 1,
    },
    {
      id: 6,
      question: "Which HTTP method is used to retrieve data from a server?",
      options: ["POST", "PUT", "GET", "DELETE"],
      correctAnswer: 2,
    },
    {
      id: 7,
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Programming Interface",
        "Application Process Integration",
        "Automated Programming Interface",
      ],
      correctAnswer: 0,
    },
    {
      id: 8,
      question: "Which database is a NoSQL database?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
      correctAnswer: 2,
    },
    {
      id: 9,
      question: "What is the default port for HTTP?",
      options: ["21", "80", "443", "8080"],
      correctAnswer: 1,
    },
    {
      id: 10,
      question: "Which symbol is used for comments in JavaScript?",
      options: ["#", "//", "/* */", "Both // and /* */"],
      correctAnswer: 3,
    },
  ];

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < readQuestion?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getAnsweredCount = () => {
    return Object.keys(answers)?.length;
  };

  const getShuffledOptions = (question, questionIndex) => {
    // Ensure options exist
    if (!question?.options) return [];

    // Deterministic shuffle using a seeded PRNG based on questionIndex and question text
    function seededRandom(seed) {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }

    // Create a unique seed per question (using questionIndex and question text)
    const seed =
      questionIndex * 1000 +
      (typeof question.question === "string"
        ? question.question
            .split("")
            .reduce((acc, c) => acc + c.charCodeAt(0), 0)
        : 0);

    // Copy options with original indices
    const optionsWithIndices = question.options.map((option, index) => ({
      option,
      originalIndex: index,
    }));

    // Fisher-Yates shuffle with seeded random
    const arr = [...optionsWithIndices];
    for (let i = arr.length - 1; i > 0; i--) {
      // Use a different seed for each swap
      const rand = seededRandom(seed + i);
      const j = Math.floor(rand * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

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
            <div className="absolute top-20 left-1/3 z-10 flex flex-col justify-center items-center gap-5">
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
              <p className="font-medium text-[18px]">
                Push Play to start your{" "}
                <span className="font-bold capitalize">{quizData?.status}</span>
              </p>
            </div>
          )}
          {/* Timer */}
          <div className="sticky left-5 flex top-[px] justify-end items-center pointer-events-none">
            <div className="sticky max-w-[250px] p-3 bg-blue-50 border shadow-sm rounded-lg flex justify-center items-end flex-col">
              <h1 className="mb-1 text-blue-950 font-semibold flex items-center justify-start gap-2">
                Exam Count Down Timer <MdOutlineTimer />
              </h1>
              {activate && timerInSeconds ? (
                <div>
                  <CountdownTimer
                    initialSeconds={timerInSeconds}
                    onTimeUp={() => {
                      setTimeUp(true);
                      try {
                        // auto-submit when timer ends
                        handleSubmit();
                      } catch (e) {}
                    }}
                    storageKey={`countdown_${examID}_${studentInfo?._id}`}
                  />
                </div>
              ) : null}
            </div>
          </div>

          {/* Quiz Content */}
          <div className="bg-slate-0 justify-center flex -mt-40">
            {start && (
              <div className="!min-h-[300px] flex items-centr justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl p-8 !w-[700px] w-full">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h1 className="text-sm font-bold text-gray-800">
                        CBT Examination Progress
                      </h1>
                      <span className="text-sm text-gray-600">
                        Answered: {getAnsweredCount()}/{readQuestion?.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-blue-950 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            ((currentQuestion + 1) / readQuestion?.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {readQuestion.map((q, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentQuestion(index)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                            currentQuestion === index
                              ? "bg-blue-950 text-white ring-2 ring--blue-900"
                              : answers[index] !== undefined
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                          title={
                            answers[index] !== undefined
                              ? "Answered"
                              : "Not answered"
                          }
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-semibold text-blue-950">
                        Question {currentQuestion + 1} of {readQuestion?.length}
                      </span>
                      {answers[currentQuestion] !== undefined && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Answered
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      {readQuestion[currentQuestion]?.question?.replace(
                        /^\d+\.\s*/,
                        ""
                      )}
                    </h2>
                    {readQuestion[currentQuestion]?.images && (
                      <div>
                        <br />
                        {readQuestion[currentQuestion]?.images?.map(
                          (img: string, i: number) => (
                            <img src={img} key={i} className="h-60" />
                          )
                        )}
                        <br />
                      </div>
                    )}
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {readQuestion[currentQuestion].options.map(
                        (option, index) => (
                          <button
                            type="button"
                            key={index}
                            onClick={() => {
                              // Update local UI selection and the main answer state
                              handleAnswerSelect(index);
                              handleStateChange(currentQuestion, option);
                            }}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center ${
                              answers[currentQuestion] === index
                                ? "border-blue-950 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center w-full">
                              <div
                                className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center shrink-0 ${
                                  answers[currentQuestion] === index
                                    ? "border-blue-950 bg-blue-950"
                                    : "border-gray-300"
                                }`}
                              >
                                {answers[currentQuestion] === index && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                              <span className="text-gray-700 break-words">
                                {option}
                              </span>
                            </div>
                          </button>
                        )
                      )}
                    </div>

                    <hr className="my-6" /> */}

                    <div
                      // className="space-y-3"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {getShuffledOptions(
                        readQuestion[currentQuestion],
                        currentQuestion
                      ).map(({ option, originalIndex }, displayIndex) => (
                        <button
                          key={displayIndex}
                          onClick={() => {
                            // Use originalIndex to maintain correct answer tracking
                            handleAnswerSelect(originalIndex);
                            handleStateChange(currentQuestion, option);
                          }}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            answers[currentQuestion] === originalIndex
                              ? "border-blue-950 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                answers[currentQuestion] === originalIndex
                                  ? "border-blue-950 bg-blue-950"
                                  : "border-gray-300"
                              }`}
                            >
                              {answers[currentQuestion] === originalIndex && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="text-gray-700">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        currentQuestion === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      Previous
                    </button>

                    {currentQuestion === readQuestion?.length - 1 ? (
                      <button
                        onClick={() => {
                          handleSubmit();
                        }}
                        disabled={getAnsweredCount() !== readQuestion?.length}
                        className={`px-6 py-2 rounded-lg transition-colors ${
                          getAnsweredCount() === readQuestion?.length
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {loading ? (
                          <p className="flex gap-2 items-center justify-center">
                            <FaSpinner className="text-white animate-spin " />{" "}
                            <span>Submitting</span>{" "}
                          </p>
                        ) : (
                          "Submit Examination"
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="flex items-center px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors"
                      >
                        Next
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </button>
                    )}
                  </div>

                  {currentQuestion === readQuestion?.length - 1 &&
                    getAnsweredCount() !== readQuestion?.length && (
                      <p className="text-center text-sm text-amber-600 mt-4">
                        Please answer all questions before submitting
                      </p>
                    )}
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
