// src/screens/QuizSetupScreen.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaTrashAlt, FaCheckDouble } from "react-icons/fa";
import { MdPlayCircle, MdVisibilityOff, MdVisibility } from "react-icons/md";
import LittleHeader from "../../components/layout/LittleHeader";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import pix from "../../../assets/pix.jpg";
import { GoGoal } from "react-icons/go";
import {
  useExamination,
  useSubjectAssignment,
  useSujectQuiz,
} from "../../hooks/useTeacher";
import {
  deleteQuiz,
  readClassInfo,
  startExamination,
  stopExamination,
} from "../../api/teachersAPI";
import { mutate } from "swr";
import { useStudentPerfomance } from "../../hooks/useQuizHook";
import _ from "lodash";

const QuizSetupScreen = () => {
  const { subjectID } = useParams();
  const { subjectQuiz } = useSujectQuiz(subjectID!);
  const { examination } = useExamination(subjectID!);

  const [state, setState] = useState<any>({});
  const [isModalOpen, setModalOpen] = useState<Boolean>(false);

  const [loading, setLoading] = useState<Boolean>(false);

  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  useEffect(() => {
    if (subjectQuiz?.designated) {
      readClassInfo(subjectQuiz.designated).then((res: any) => {
        setState(res.data);
      });
    }
  }, [subjectQuiz, examination]);

  const { subjectAssignment } = useSubjectAssignment(state?._id!);

  const quiz: [] = subjectQuiz?.quiz;
  const assign: [] = subjectAssignment?.assignment;

  const combine: Array<any> = quiz?.concat(assign);

  const readQuiz = _.filter(quiz, (el: any) => el.status === "quiz");

  const handleDelete = (id: string) => {
    setSelectedQuizId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedQuizId) {
      try {
        await deleteQuiz(selectedQuizId);
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
      setModalOpen(false);
      setSelectedQuizId(null);
    }
  };

  return (
    <div className="text-blue-950  relative">
      <LittleHeader name={`Viewing ${subjectQuiz?.subjectTitle} Quiz`} />

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <div className="mt-10" />

      <div>
        <div className="mb-16 flex-col-reverse flex lg:flex-row justify-between items-center">
          <p className="mt-10 lg:mt-0">View Assignment/Test/Quiz</p>

          <div className="flex gap-2">
            <Link to={`/create-quiz/${subjectID}`}>
              <p className="font-medium cursor-pointer bg-neutral-950 text-white px-6 py-4 rounded-md text-[14px] text-center">
                + Create Test
              </p>
            </Link>
            <Link to={`/create-examination/${subjectID}`}>
              <p className="font-medium cursor-pointer bg-blue-950 text-white px-6 py-4 rounded-md text-[14px] text-center">
                + Create Exam
              </p>
            </Link>
            <Link to={`/test-exam-grade/${subjectID}`}>
              <p className="font-medium cursor-pointer text-[14px] bg-orange-500 text-white px-6 py-4 rounded-md text-center">
                + Record Report Card Scores
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div>
        {examination && (
          <div>
            <div className="border p-6 rounded-md min-h-[300px] flex flex-col relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 text-[200px] opacity-5 font-bold text-red-300">
                {1}
              </div>
              <div className="mt-4 text-center relative bottom-4">
                <button
                  onClick={() => {}}
                  className="flex items-center justify-center text-red-600 hover:text-red-400 transition-all duration-300 font-bold"
                >
                  <FaTrashAlt size={20} className="mr-1" />
                  Delete
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col ">
                  <p className="font-semibold italicmt-0 text-[12px]">
                    {examination?.session}
                  </p>
                  <p className="font-bold text-[20px]">
                    {examination?.term} {examination?.subjectTitle}
                  </p>
                </div>
                <Link to={`/exam/details/${subjectID}/${examination?._id}`}>
                  <MdPlayCircle
                    size={40}
                    className="opacity-60 text-red-600 hover:text-red-400 transition-all duration-300"
                  />
                </Link>
              </div>

              <div className="flex flex-col mb-3">
                <div className="flex">
                  <p className="px-4 py-1 rounded-md text-[12px] border bg-blue-50">
                    Examination
                  </p>
                </div>
                <p className="font-semibold text-[12px] mt-2">
                  {/* {new Date(examination?.createdAt).toLocaleDateString()} */}
                </p>
              </div>

              <div>
                <p className="text-[14px] my-5 italic">
                  Students can't access this Examination Questions yet, <br />{" "}
                  change the accessibility of students to take test!{" "}
                </p>
              </div>

              <div className="flex-1" />

              <div className="flex justify-between text-[13px]">
                <div>
                  Questions:{" "}
                  <span className="font-bold">
                    {examination?.quiz?.question
                      ? examination?.quiz?.question.length
                      : 0}
                  </span>
                </div>
                <div>
                  Mark/Question:{" "}
                  <span className="font-bold">
                    {examination?.quiz?.instruction
                      ? examination?.quiz?.instruction.mark
                      : 0}
                  </span>
                </div>
              </div>
              <div className="text-[12px] mt-2 font-bold">
                Instruction:{" "}
                <span className="font-normal">
                  {examination?.quiz?.instruction?.instruction
                    ? `${examination?.quiz?.instruction.instruction}`.slice(
                        0,
                        70
                      ) + "..."
                    : "..."}
                </span>
              </div>

              <div className="flex gap-3">
                <div
                  className={`mt-10 cursor-pointer flex gap-3 items-center ${
                    examination?.startExam ? "bg-blue-950" : "bg-red-500"
                  } text-white px-6 py-3 rounded-md`}
                  onClick={() => {
                    setLoading(true);

                    examination?.startExam
                      ? stopExamination(examination?._id)
                          .then((res) => {
                            mutate(`api/view-subject-exam/${subjectID}`);
                          })
                          .finally(() => {
                            setLoading(false);
                          })
                      : startExamination(examination?._id)
                          .then((res) => {
                            mutate(`api/view-subject-exam/${subjectID}`);
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                  }}
                >
                  {loading ? (
                    "Laoding"
                  ) : (
                    <span>
                      {examination?.startExam
                        ? "Exam can Start "
                        : "Change Visibility"}
                    </span>
                  )}
                  {examination?.startExam ? (
                    <MdVisibility
                      size={20}
                      className=" text-white transition-all duration-300"
                    />
                  ) : (
                    <MdVisibilityOff
                      size={20}
                      className=" text-white transition-all duration-300"
                    />
                  )}
                </div>
                <Link
                  to={`/examination-preview-details/${subjectID}/${examination?._id}`}
                  className={`mt-10 cursor-pointer flex gap-3 items-center 
                   bg-orange-500 text-white px-6 py-3 rounded-md italic font-semibold`}
                >
                  {<span>Preview Questions</span>}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="my-10">
        <hr />
      </div>

      {combine?.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
            {readQuiz?.map((props: any, i: number) => (
              <div key={props._id}>
                <div className="border p-6 rounded-sm min-h-[300px] flex flex-col relative overflow-hidden  hover:shadow-lg transition-shadow duration-300">
                  <div className="absolute top-0 right-0 text-[200px] opacity-5 font-bold text-red-300">
                    {i + 1}
                  </div>
                  <div className="mt-4 text-center relative bottom-4">
                    <button
                      onClick={() => handleDelete(props._id)}
                      className="flex items-center justify-center text-red-600 hover:text-red-400 transition-all duration-300 font-bold"
                    >
                      <FaTrashAlt size={20} className="mr-1" />
                      Delete
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex justify-center items-center gap-3">
                      <p className="font-bold mt-0 text-[20px]">
                        {props?.subjectTitle}{" "}
                        {props?.quiz ? "Quiz" : "Assignment"}
                      </p>
                      <p className="font-semibold">
                        {new Date(props?.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link to={`/quiz/details/${subjectID}/${props?._id}`}>
                      <MdPlayCircle
                        size={40}
                        className="opacity-60 text-red-600 hover:text-red-400 transition-all duration-300"
                      />
                    </Link>
                  </div>

                  <div className="flex mt-2">
                    <p className="px-4 py-1 rounded-md text-[12px] border bg-blue-50">
                      Test
                    </p>
                  </div>

                  <div className="flex-1" />

                  <div className="text-[12px] my-4">
                    <p className="font-medium mb-2">Top Performing Student</p>

                    {props?.performance?.length > 0 ? (
                      <div className="flex gap-2">
                        <img
                          src={pix}
                          alt="Student"
                          className="w-[50px] h-[50px] border rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-bold capitalize">Name</p>
                          <p>Points</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <GoGoal size={20} />
                        <p className="font-semibold text-[12px]">
                          No student has Attented this test yet.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex mt-5 justify-between text-[13px] border-y py-4 mb-3">
                    <div>
                      Questions:{" "}
                      <span className="font-bold">
                        {props?.quiz[1]?.question
                          ? props?.quiz[1]?.question.length
                          : 0}
                      </span>
                    </div>
                    <div>
                      Mark/Question:{" "}
                      <span className="font-bold">
                        {props?.quiz[0]?.instruction
                          ? props?.quiz[0]?.instruction.mark
                          : 0}
                      </span>
                    </div>
                  </div>
                  <div className="text-[12px] mt-2 font-bold">
                    Instruction:{" "}
                    <span className="font-normal line-clamp-2">
                      {props?.quiz[0]?.instruction.instruction}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="my-8 border-t" />

          {/* Assignments Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
            {assign?.map((props: any, i: number) => (
              <div key={props._id}>
                <div className="border p-6 rounded-md h-[300px] flex flex-col relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute top-0 right-0 text-[200px] opacity-5 font-bold text-green-300">
                    {i + 1}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold mt-0 text-[20px]">
                      {props?.subjectTitle}{" "}
                      {props?.quiz ? "Quiz" : "Assignment"}
                    </p>
                  </div>

                  <div className="flex mt-2">
                    <p className="px-4 py-1 rounded-md text-[12px] border bg-blue-50">
                      Assignment
                    </p>
                  </div>

                  <div className="flex-1" />

                  <div className="text-[12px] my-4">
                    <p className="font-medium mb-2">Top Performing Student</p>
                    <div className="flex gap-2">
                      <img
                        src={pix}
                        alt="Student"
                        className="w-[50px] h-[50px] border rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-bold capitalize">Name</p>
                        <p>Points</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <div>
                      Questions Topic:{" "}
                      <span className="font-bold">
                        {props?.assignmentTopic}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[13px]">
                    <div>
                      Submission Deadline:{" "}
                      <span className="font-bold">
                        {props?.assignmentDeadline}
                      </span>
                    </div>
                  </div>

                  <div className="text-[12px] mt-2 font-bold">
                    Question Detail:{" "}
                    <span className="font-normal">
                      {props?.assignmentDetails
                        ? `${props.assignmentDetails}`.slice(0, 70) + "..."
                        : "..."}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
          <FaCheckDouble size={13} />
          <p className="mt-3 text-[12px] font-medium">No Test set yet</p>
        </div>
      )}

      <div className="absolute top-0"></div>
    </div>
  );
};

export default QuizSetupScreen;
