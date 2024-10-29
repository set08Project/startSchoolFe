import useSWR, { Cache, mutate } from "swr";
import { getStudentPerformance } from "../api/teachersAPI";

export const useStudentPerfomance = (studentID: string) => {
  try {
    const { data: performance } = useSWR(
      `api/view-student-quiz-performance/${studentID}`,
      async () => {
        return getStudentPerformance(studentID).then((res) => {
          console.log(res?.data);
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
