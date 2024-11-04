import useSWR from "swr";
import {
  getOneStudentSubjectPerformance,
  getStudentPerformance,
  getStudentSubjectPerformance,
} from "../api/teachersAPI";

export const useStudentPerfomance = (studentID: string) => {
  try {
    const { data: performance } = useSWR(
      `api/view-student-quiz-performance/${studentID}`,
      async () => {
        return getStudentPerformance(studentID).then((res) => {
          return res?.data || [];
        });
      }
    );
    return { performance };
  } catch (error) {
    console.error();
    return error;
  }
};

export const useSubjectStudentPerfomance = (subjectID: string) => {
  try {
    const { data: studentPerformance } = useSWR(
      `api/view-student-quiz-performance/${subjectID}`,
      async () => {
        return getStudentSubjectPerformance(subjectID).then((res) => {
          return res?.data || [];
        });
      }
    );
    return { studentPerformance };
  } catch (error) {
    console.error();
    return error;
  }
};

export const useOneSubjectStudentPerfomance = (
  subjectID: string,
  quizID: string
) => {
  try {
    const { data: oneStudentPerformance } = useSWR(
      `api/view-student-quiz-performance/${subjectID}/${quizID}`,
      async () => {
        return getOneStudentSubjectPerformance(subjectID, quizID).then(
          (res) => {
            return res?.data || [];
          }
        );
      }
    );
    return { oneStudentPerformance };
  } catch (error) {
    console.error();
    return error;
  }
};
