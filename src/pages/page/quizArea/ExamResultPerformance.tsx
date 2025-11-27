import { removeSelectedPerformance } from "@/pages/api/schoolAPIs";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import LittleHeader from "@/components/layout/LittleHeader";
import Button from "@/components/reUse/Button";
import { useExam } from "@/pagesForTeachers/hooks/useTeacher";
import { useExamSubjectPerfomance } from "@/pagesForTeachers/hooks/useQuizHook";
import {
  removePerformance,
  removeAllPerformance,
} from "@/pages/api/schoolAPIs";
import { FaSpinner } from "react-icons/fa6";
import { MdArrowBack } from "react-icons/md";

const ExamResultSetupRecordScreen = () => {
  const { subjectID, examID } = useParams();

  const { examPerformance, mutate } = useExamSubjectPerfomance(examID!);
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState<boolean>(false);
  const [recordToDelete, setRecordToDelete] = useState<string>("");
  const [deleteAllProcessing, setDeleteAllProcessing] =
    useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDeleteSelectedModal, setShowDeleteSelectedModal] =
    useState<boolean>(false);
  const [deleteSelectedProcessing, setDeleteSelectedProcessing] =
    useState<boolean>(false);
  // Local copy so we can update the UI immediately on delete
  const { examData: quizData } = useExam(examID);
  const students = examPerformance;

  const [localStudents, setLocalStudents] = useState<any>(examPerformance);
  useEffect(() => {
    setLocalStudents(examPerformance);
  }, [examPerformance]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="ml-5 pt-2">
        <LittleHeader
          name={` Students ${quizData?.status
            .charAt(0)
            .toUpperCase()
            .concat(quizData?.status.slice(1))} Results`}
        />
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
            {students?.length <= 0 ? (
              <p className="text-center text-gray-600">
                No Test Results Submitted.
              </p>
            ) : (
              <div className="flex flex-col overflow-auto">
                <div className="w-[1600px] flex bg-white rounded-lg shadow-md">
                  <div className=" w-[50px] py-3 px-6 bg-blue-50 text-left text-xs font-medium text-blue-950 uppercase tracking-wider flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={
                        localStudents?.performance?.length > 0 &&
                        selectedIds.length ===
                          localStudents?.performance?.length
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          const ids = (localStudents?.performance || []).map(
                            (r: any) => String(r.student || r._id)
                          );
                          setSelectedIds(ids);
                        } else {
                          setSelectedIds([]);
                        }
                      }}
                    />
                    <div>S/N</div>
                  </div>
                  <div className="py-3 w-[300px] border-r px-6 bg-blue-50 text-left text-xs font-medium text-blue-950 uppercase tracking-wider">
                    Student Name
                  </div>
                  <div className="py-3 w-[150px] border-r px-6 bg-blue-50 text-left text-xs font-medium text-blue-950 uppercase tracking-wider">
                    Student Attempts
                  </div>

                  <div className="w-[250px] border-r py-3 px-6 bg-blue-50 text-left text-xs font-medium text-blue-950 uppercase tracking-wider">
                    Student Score
                  </div>

                  <div className="py-3 w-[150px] border-r px-6 bg-blue-50 text-left text-xs font-medium text-blue-950 uppercase tracking-wider">
                    Student Grade
                  </div>
                  <div className="py-3 w-[250px] border-r  px-6 bg-blue-50 text-left text-xs font-medium text-blue-950 uppercase tracking-wider">
                    Remark
                  </div>

                  <div className="py-3 px-6 w-[180px] border-r bg-blue-50 text-left text-xs font-medium text-blue-950 uppercase tracking-wider">
                    Test Completed
                  </div>
                  <div className="w-[160px] py-3 px-6 bg-blue-50 text-left text-xs font-medium text-blue-950 uppercase tracking-wider">
                    Date
                  </div>
                  <div className="w-[160px] py-3 px-6 bg-blue-50 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                    Remove
                  </div>
                </div>
                <div className="ml-auto px-4 py-3 flex items-center gap-3">
                  <Button
                    className={`px-6 py-2 rounded-md shadow-md transition-colors duration-300 !text-[14px] ${
                      localStudents?.performance?.length > 0
                        ? "bg-red-600 text-white hover:bg-red-500"
                        : "bg-gray-300 text-gray-400 cursor-not-allowed"
                    }`}
                    name="Remove All"
                    disabled={!localStudents?.performance?.length}
                    onClick={() => setShowDeleteAllModal(true)}
                  />
                  <Button
                    className={`px-6 py-2 rounded-md shadow-md transition-colors duration-300 !text-[14px] ${
                      selectedIds.length > 0
                        ? "bg-red-600 text-white hover:bg-red-500"
                        : "bg-gray-300 text-gray-400 cursor-not-allowed"
                    }`}
                    name={`Delete Selected (${selectedIds.length})`}
                    disabled={selectedIds.length === 0}
                    onClick={() => setShowDeleteSelectedModal(true)}
                  />
                </div>

                <div className="w-[1500px]">
                  {localStudents?.performance?.map((record: any, i: number) => (
                    <motion.tr
                      key={record._id}
                      className="w-[1600px] items-center border-b hover:bg-gray-100 transition-colors duration-200 flex "
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="w-[50px] py-4 px-6 text-sm text-gray-700 flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={selectedIds.includes(
                            String(record.student || record._id)
                          )}
                          onChange={(e) => {
                            const id = String(record.student || record._id);
                            setSelectedIds((prev) => {
                              if (prev.includes(id))
                                return prev.filter((p) => p !== id);
                              return [...prev, id];
                            });
                          }}
                        />
                        <div>{i + 1}</div>
                      </div>

                      <div className="py-4 w-[300px] border-r px-6 text-sm text-gray-700">
                        {record?.studentName}
                      </div>

                      <div className="border-r w-[150px] py-4 px-6 text-sm text-gray-700">
                        {record.studentScore}/{record.totalQuestions}
                      </div>

                      <div className="py-4 border-r w-[250px] px-6 text-sm text-gray-700">
                        <div className="text-blue-700">
                          ({Number(record.markPerQuestion)} Mark Per Question)
                        </div>
                        {record.studentScore * Number(record.markPerQuestion)}/
                        {record.totalQuestions * Number(record.markPerQuestion)}
                      </div>

                      <div className="py-3 w-[150px] border-r px-6  text-left  font-medium  uppercase tracking-wider text-[30px]">
                        {record?.studentGrade}
                      </div>

                      <div className="py-4 px-6 text-sm w-[250px] border-r text-gray-700">
                        {record.remark}
                      </div>

                      <div className=" text-start py-4 w-[180px] border-r px-6 text-sm text-gray-700">
                        {record.quizDone ? (
                          <div className="py-4 px-6  text-sm text-green-700">
                            Completed
                          </div>
                        ) : (
                          <div className="py-4 px-6 text-sm text-red-700">
                            Not Completed
                          </div>
                        )}
                      </div>

                      <div className="w-[160px] py-4 px-6 text-sm text-gray-700">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </div>

                      <div className="w-[160px] py-4 px-6 text-sm text-gray-700">
                        <Button
                          className="bg-red-600 px-8 py-2 text-white rounded-mg shadow-md hover:bg-red-500 transition-colors duration-300"
                          name="Remove"
                          onClick={() => {
                            setRecordToDelete(record._id);
                            setShowDeleteModal(true);
                          }}
                        />
                      </div>
                    </motion.tr>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
        {/* Delete Selected Modal */}
        {showDeleteSelectedModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Confirm Remove Selected Records
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove the selected performance records
                for this exam? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <Button
                  className="bg-gray-300 px-8 py-2 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300 !text-[14px]"
                  name="Cancel"
                  onClick={() => setShowDeleteSelectedModal(false)}
                />
                <Button
                  className={`px-8 py-2 rounded-md transition-colors duration-300 !text-[14px] ${
                    selectedIds.length > 0
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-gray-300 text-gray-400 cursor-not-allowed"
                  }`}
                  name={
                    deleteSelectedProcessing ? (
                      <span className="flex gap-2 items-center justify-center">
                        <FaSpinner className="animate-spin text-white " />{" "}
                        Removing...
                      </span>
                    ) : (
                      "Remove Selected"
                    )
                  }
                  disabled={selectedIds.length === 0}
                  onClick={() => {
                    setDeleteSelectedProcessing(true);
                    removeSelectedPerformance(examID!, selectedIds)
                      .then((res) => {
                        if (res.status === 200 || res.status === 201) {
                          toast.success("Selected performance records removed");
                          // Remove matching records from local state immediately
                          setLocalStudents((prev: any) => {
                            if (!prev) return prev;
                            return {
                              ...prev,
                              performance: prev.performance.filter(
                                (r: any) =>
                                  !selectedIds.includes(
                                    String(r.student || r._id)
                                  )
                              ),
                            };
                          });
                          setSelectedIds([]);
                          if (mutate) mutate();
                        } else {
                          toast.error(
                            "Failed to remove selected records, please try again"
                          );
                        }
                      })
                      .catch((err) => {
                        console.error(err);
                        toast.error(
                          "Something went wrong while removing selected records"
                        );
                      })
                      .finally(() => {
                        setDeleteSelectedProcessing(false);
                        setShowDeleteSelectedModal(false);
                      });
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Confirm Record Removal
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove this performance record? This
                action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <Button
                  className="bg-gray-300 px-8 py-2 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300 !text-[14px]"
                  name="Cancel Action"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setRecordToDelete("");
                  }}
                />
                <Button
                  className="bg-red-600 px-8 py-2 text-white rounded-md hover:bg-red-700 transition-colors duration-300 !text-[14px]"
                  name={
                    loading ? (
                      <span className="flex gap-2 items-center justify-center">
                        <FaSpinner className="animate-spin text-white " />{" "}
                        Removing...
                      </span>
                    ) : (
                      "Remove Record"
                    )
                  }
                  onClick={() => {
                    setLoading(true);
                    removePerformance(recordToDelete)
                      .then((res) => {
                        if (res.status === 200) {
                          // remove from local state immediately
                          setLocalStudents((prev: any) => {
                            if (!prev) return prev;
                            return {
                              ...prev,
                              performance: prev.performance.filter(
                                (r: any) => r._id !== recordToDelete
                              ),
                            };
                          });

                          setLoading(false);
                          setShowDeleteModal(false);
                          setRecordToDelete("");
                          // revalidate remote data
                          if (mutate) mutate();
                        }
                      })
                      .catch((err) => {
                        console.error("Remove error:", err);
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
        {/* Bulk Confirmation Modal */}
        {showDeleteAllModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Confirm Remove All Records
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove <strong>ALL</strong> performance
                records for this exam? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-">
                <Button
                  className="bg-gray-300 px-8 py-2 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300 !text-[14px]"
                  name="Cancel"
                  onClick={() => {
                    setShowDeleteAllModal(false);
                  }}
                />
                <Button
                  className="bg-red-600 px-8 py-2 text-white rounded-md hover:bg-red-700 transition-colors duration-300 !text-[14px]"
                  name={
                    deleteAllProcessing ? (
                      <span className="flex gap-2 items-center justify-center">
                        <FaSpinner className="animate-spin text-white " />{" "}
                        Removing...
                      </span>
                    ) : (
                      "Remove All Records"
                    )
                  }
                  onClick={() => {
                    setDeleteAllProcessing(true);
                    removeAllPerformance(examID!)
                      .then((res) => {
                        if (res.status === 200 || res.status === 201) {
                          toast.success("All performance records removed");
                          // Clear local state immediately for UX
                          setLocalStudents((prev: any) => ({
                            ...prev,
                            performance: [],
                          }));
                          if (mutate) mutate();
                        } else {
                          toast.error(
                            "Failed to remove all records, please try again"
                          );
                        }
                      })
                      .catch((err) => {
                        console.error(err);
                        toast.error(
                          "Something went wrong while removing all records"
                        );
                      })
                      .finally(() => {
                        setDeleteAllProcessing(false);
                        setShowDeleteAllModal(false);
                        setLoading(false);
                      });
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            className="bg-blue-950 px-6 py-3 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-300 !text-[16px]"
            name="Go Back"
            onClick={() => navigate(-1)}
            icon={
              <MdArrowBack size={12} className="animate-pulse text-white " />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ExamResultSetupRecordScreen;
