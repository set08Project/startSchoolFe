// src/screens/QuizSetupScreen.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaTrashAlt, FaCheckDouble } from "react-icons/fa";
import { MdPlayCircle } from "react-icons/md";
import LittleHeader from "../../components/layout/LittleHeader";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import pix from "../../../assets/pix.jpg";
import { useSubjectAssignment, useSujectQuiz } from "../../hooks/useTeacher";
import { deleteQuiz, readClassInfo } from "../../api/teachersAPI";
import { useStudentPerfomance } from "../../hooks/useQuizHook";

const QuizSetupScreen = () => {
  const { subjectID } = useParams();
  const { subjectQuiz } = useSujectQuiz(subjectID!);

  const [state, setState] = useState<any>({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  useEffect(() => {
    if (subjectQuiz?.designated) {
      readClassInfo(subjectQuiz.designated).then((res: any) => {
        setState(res.data);
      });
    }
  }, [subjectQuiz]);

  const { subjectAssignment } = useSubjectAssignment(state?._id!);

  const quiz: [] = subjectQuiz?.quiz;
  const assign: [] = subjectAssignment?.assignment;

  const combine: Array<any> = quiz?.concat(assign);

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
              <p className="font-medium cursor-pointer bg-blue-950 text-white px-6 py-4 rounded-md text-[12px] text-center">
                + Create Test
              </p>
            </Link>
            <Link to={`/test-exam-grade/${subjectID}`}>
              <p className="font-medium cursor-pointer text-[12px] bg-orange-500 text-white px-6 py-4 rounded-md text-center">
                + Record Report Card Scores
              </p>
            </Link>
          </div>
        </div>
      </div>

      {combine?.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
            {quiz?.map((props: any, i: number) => (
              <div key={props._id}>
                <div className="border p-6 rounded-md h-[300px] flex flex-col relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
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
                    <p className="font-bold mt-0 text-[20px]">
                      {props?.subjectTitle}{" "}
                      {props?.quiz ? "Quiz" : "Assignment"}
                    </p>
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
                    <span className="font-normal">
                      {props?.quiz[0]?.instruction?.instruction
                        ? `${props?.quiz[0]?.instruction.instruction}`.slice(
                            0,
                            70
                          ) + "..."
                        : "..."}
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
