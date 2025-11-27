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

function MathRenderer({ text }) {
  if (!text) return null;

  const str = String(text);

  function parseMath(input) {
    const result = [];
    let i = 0;
    let currentText = "";

    while (i < input.length) {
      let matched = false;

      // Check for determinant: |a b; c d|
      if (input[i] === "|") {
        let closing = -1;
        for (let j = i + 1; j < input.length; j++) {
          if (input[j] === "|") {
            closing = j;
            break;
          }
        }

        if (closing > i) {
          const content = input.substring(i + 1, closing);
          if (content.includes(";")) {
            if (currentText) {
              result.push({ type: "text", content: currentText });
              currentText = "";
            }
            result.push({ type: "determinant", content: content });
            i = closing + 1;
            matched = true;
          }
        }
      }

      // Check for fraction: (numerator)/(denominator)
      if (!matched && input[i] === "(") {
        let firstClose = findMatchingParen(input, i);

        if (
          firstClose > i &&
          firstClose + 2 < input.length &&
          input[firstClose + 1] === "/" &&
          input[firstClose + 2] === "("
        ) {
          let secondClose = findMatchingParen(input, firstClose + 2);

          if (secondClose > firstClose) {
            if (currentText) {
              result.push({ type: "text", content: currentText });
              currentText = "";
            }
            result.push({
              type: "fraction",
              numerator: input.substring(i + 1, firstClose),
              denominator: input.substring(firstClose + 3, secondClose),
            });
            i = secondClose + 1;
            matched = true;
          }
        }
      }

      // Check for superscript: base^(exponent)
      if (
        !matched &&
        input[i] === "^" &&
        i + 1 < input.length &&
        input[i + 1] === "("
      ) {
        let baseStart = i - 1;

        while (baseStart > 0 && /[a-zA-Z0-9_]/.test(input[baseStart - 1])) {
          baseStart--;
        }

        let close = findMatchingParen(input, i + 1);

        if (close > i && baseStart < i) {
          if (baseStart > 0 && currentText.length > 0) {
            result.push({
              type: "text",
              content: currentText.substring(
                0,
                currentText.length - (i - baseStart)
              ),
            });
          }
          result.push({
            type: "superscript",
            base: input.substring(baseStart, i),
            sup: input.substring(i + 2, close),
          });
          currentText = "";
          i = close + 1;
          matched = true;
        }
      }

      // Check for subscript: base_(subscript) or base₁₀ format
      if (
        !matched &&
        input[i] === "_" &&
        i + 1 < input.length &&
        input[i + 1] === "("
      ) {
        let baseStart = i - 1;

        while (baseStart > 0 && /[a-zA-Z0-9]/.test(input[baseStart - 1])) {
          baseStart--;
        }

        let close = findMatchingParen(input, i + 1);

        if (close > i && baseStart < i) {
          if (baseStart > 0 && currentText.length > 0) {
            result.push({
              type: "text",
              content: currentText.substring(
                0,
                currentText.length - (i - baseStart)
              ),
            });
          }
          result.push({
            type: "subscript",
            base: input.substring(baseStart, i),
            sub: input.substring(i + 2, close),
          });
          currentText = "";
          i = close + 1;
          matched = true;
        }
      }

      // Check for Unicode subscripts like ₁₀
      if (!matched && /[₀₁₂₃₄₅₆₇₈₉]/.test(input[i])) {
        let baseStart = i - 1;
        while (baseStart > 0 && /[a-zA-Z0-9]/.test(input[baseStart - 1])) {
          baseStart--;
        }

        let subEnd = i;
        while (subEnd < input.length && /[₀₁₂₃₄₅₆₇₈₉]/.test(input[subEnd])) {
          subEnd++;
        }

        if (baseStart < i) {
          if (baseStart > 0 && currentText.length > 0) {
            result.push({
              type: "text",
              content: currentText.substring(
                0,
                currentText.length - (i - baseStart)
              ),
            });
          }

          // Convert Unicode subscripts to normal numbers
          const subText = input
            .substring(i, subEnd)
            .replace(/₀/g, "0")
            .replace(/₁/g, "1")
            .replace(/₂/g, "2")
            .replace(/₃/g, "3")
            .replace(/₄/g, "4")
            .replace(/₅/g, "5")
            .replace(/₆/g, "6")
            .replace(/₇/g, "7")
            .replace(/₈/g, "8")
            .replace(/₉/g, "9");

          result.push({
            type: "subscript",
            base: input.substring(baseStart, i),
            sub: subText,
          });
          currentText = "";
          i = subEnd;
          matched = true;
        }
      }

      // Check for square root: √(content)
      if (
        !matched &&
        input[i] === "√" &&
        i + 1 < input.length &&
        input[i + 1] === "("
      ) {
        let close = findMatchingParen(input, i + 1);

        if (close > i) {
          if (currentText) {
            result.push({ type: "text", content: currentText });
            currentText = "";
          }
          result.push({
            type: "sqrt",
            content: input.substring(i + 2, close),
          });
          i = close + 1;
          matched = true;
        }
      }

      if (!matched) {
        currentText += input[i];
        i++;
      }
    }

    if (currentText) {
      result.push({ type: "text", content: currentText });
    }

    return result;
  }

  function findMatchingParen(str, start) {
    let depth = 1;
    for (let j = start + 1; j < str.length; j++) {
      if (str[j] === "(") depth++;
      if (str[j] === ")") {
        depth--;
        if (depth === 0) return j;
      }
    }
    return -1;
  }

  function renderDeterminant(content) {
    const rows = content.split(";").map((r) => r.trim());
    const cells = [];

    for (let r = 0; r < rows.length; r++) {
      const values = rows[r].split(/\s+/).filter((v) => v);
      for (let c = 0; c < values.length; c++) {
        cells.push({ value: values[c], key: `${r}-${c}` });
      }
    }

    const colCount = rows[0].split(/\s+/).filter((v) => v).length;

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          margin: "0 3px",
          verticalAlign: "middle",
        }}
      >
        <span style={{ fontSize: "1.5em", fontWeight: "100", lineHeight: "1" }}>
          |
        </span>
        <span
          style={{
            display: "inline-grid",
            gridTemplateColumns: `repeat(${colCount}, auto)`,
            gridTemplateRows: `repeat(${rows.length}, auto)`,
            gap: "4px 12px",
            padding: "0 8px",
          }}
        >
          {cells.map((cell) => (
            <span key={cell.key} style={{ textAlign: "center" }}>
              {cell.value}
            </span>
          ))}
        </span>
        <span style={{ fontSize: "1.5em", fontWeight: "100", lineHeight: "1" }}>
          |
        </span>
      </span>
    );
  }

  function renderPart(part) {
    if (part.type === "fraction") {
      return (
        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            verticalAlign: "middle",
            margin: "0 2px",
            fontSize: "0.9em",
            lineHeight: "1.2",
          }}
        >
          <span
            style={{ padding: "0 4px", borderBottom: "1px solid currentColor" }}
          >
            <MathRenderer text={part.numerator} />
          </span>
          <span style={{ padding: "0 4px" }}>
            <MathRenderer text={part.denominator} />
          </span>
        </span>
      );
    }

    if (part.type === "superscript") {
      return (
        <span style={{ display: "inline-flex", alignItems: "flex-start" }}>
          <span>
            <MathRenderer text={part.base} />
          </span>
          <span
            style={{
              fontSize: "0.7em",
              marginLeft: "0.1em",
              marginTop: "-0.3em",
            }}
          >
            <MathRenderer text={part.sup} />
          </span>
        </span>
      );
    }

    if (part.type === "subscript") {
      return (
        <span style={{ display: "inline-flex", alignItems: "flex-end" }}>
          <span>
            <MathRenderer text={part.base} />
          </span>
          <span
            className="-mt-4"
            style={{
              fontSize: "0.7em",
              marginLeft: "0.1em",
              marginBottom: "-1em",
            }}
          >
            <MathRenderer text={part.sub} />
          </span>
        </span>
      );
    }

    if (part.type === "sqrt") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            margin: "0 2px",
          }}
        >
          <span style={{ fontSize: "1.2em" }}>√</span>
          <span
            style={{ borderTop: "1px solid currentColor", padding: "0 4px" }}
          >
            <MathRenderer text={part.content} />
          </span>
        </span>
      );
    }

    if (part.type === "determinant") {
      return renderDeterminant(part.content);
    }

    return <span>{part.content}</span>;
  }

  const parsed = parseMath(str);

  return (
    <>
      {parsed.map((part, index) => (
        <span key={index}>{renderPart(part)}</span>
      ))}
    </>
  );
}

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

  const timer = parseFloat(quizData?.quiz?.instruction?.duration || "0.500");
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
          // remove saved answers/state upon submission
          const key = `examAnswers_${examID}_${studentInfo?._id || "guest"}`;
          localStorage.removeItem(key);
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

    if (question === null) {
      const sourceQuestions = myQuizData?.question ?? [];

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

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex,
    });
  };

  // Storage key for saving answers + state per student and exam
  const storageKeyAnswers = `examAnswers_${examID}_${
    studentInfo?._id || "guest"
  }`;

  // Load saved answers/state from localStorage when component mounts or readQuestion updates
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(storageKeyAnswers) || "null"
      );
      if (saved) {
        if (saved.answers) setAnswers(saved.answers);
        if (saved.state) setState(saved.state);
      }
    } catch (e) {
      // ignore
    }
  }, [storageKeyAnswers, readQuestion]);

  // Persist answers and state to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKeyAnswers,
        JSON.stringify({ answers, state })
      );
    } catch (e) {}
  }, [answers, state, storageKeyAnswers]);

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
        } Screen stt`}
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
          {/* This Part watch out */}
          {!start && (
            <div className="absolute top-20 left-1/3 z-10 flex flex-col justify-center items-center gap-5">
              {/* {quizData?.subjectTitle ? (
                <div>
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
                      <span className="font-bold capitalize">
                        {quizData?.status}
                      </span>
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="absolute top-20 left-1/3 z-10 flex flex-col justify-center items-center gap-5">
                    <MdPlayCircle
                      size={200}
                      className="cursor-pointer animate-pulse text-red-500 hover:text-red-600 transition-all duration-300"
                    />
                    <p className="font-medium text-[18px]">
                      Push Play to start your{" "}
                      <span className="font-bold capitalize">
                        {quizData?.status}
                      </span>
                    </p>
                  </div>
                </div>
              )} */}

              {quizData?.subjectTitle ? (
                <div className="flex items-center justify-center flex-col">
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
                    <span className="font-bold capitalize">
                      {quizData?.status}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center flex-col">
                  <MdPlayCircle
                    size={200}
                    className=" opacity-80 text-red-400 hover:text-red-500 transition-all duration-300 cursor-not-allowed"
                    // onClick={() => {
                    //   if (!document.startViewTransition) {
                    //     setStart(true);
                    //     setActivate(true);
                    //   } else {
                    //     document.startViewTransition(() => {
                    //       setStart(true);
                    //       setActivate(true);
                    //     });
                    //   }
                    // }}
                  />
                  <p className="font-medium text-[18px]">
                    Please wait... Data loading{" "}
                    <span className="font-bold capitalize">
                      {quizData?.status}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}
          {/* Timer */}
          <div className="sticky left-5 flex top-[10px] justify-end items-center pointer-events-none">
            <div className="sticky max-w-[210px] p-3 bg-blue-50 border shadow-sm rounded-lg flex justify-center items-end flex-col">
              <h1 className="mb-1 text-blue-950 font-semibold flex items-center justify-start gap-2">
                Time Remaining
              </h1>
              {activate && timerInSeconds ? (
                <div className="w-full">
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
                <div className="bg-white rounded-lg shadow-xl p-8 !w-[700px] ">
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
                    <div className="text-4xl font-medium text-gray-800 mb-6">
                      <span className="text-lg text-gray-800  min-h-[160px]">
                        <MathRenderer
                          text={readQuestion[currentQuestion]?.question}
                        />
                      </span>
                    </div>
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

                    {/* Options */}
                    <div className="mt-8" />
                    <div
                      // className="space-y-3"
                      className="grid grid-cols-1 sm:grid-cols-1 gap-4"
                    >
                      {getShuffledOptions(
                        readQuestion[currentQuestion],
                        currentQuestion
                      ).map(({ option, originalIndex }, displayIndex) => (
                        <button
                          key={displayIndex}
                          onClick={() => {
                            // Use originalIndex to maintain correct answer tracking
                            // selectOption will update both answers and state and persist to localStorage
                            const optionText = option;
                            const newAnswers = {
                              ...answers,
                              [currentQuestion]: originalIndex,
                            };
                            const newState = {
                              ...state,
                              [currentQuestion]: optionText,
                            };
                            setAnswers(newAnswers);
                            setState(newState);
                            try {
                              const key = `examAnswers_${examID}_${
                                studentInfo?._id || "guest"
                              }`;
                              localStorage.setItem(
                                key,
                                JSON.stringify({
                                  answers: newAnswers,
                                  state: newState,
                                })
                              );
                            } catch (e) {}
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
                            <span className="text-gray-700">
                              {<MathRenderer text={option} />}
                            </span>
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
