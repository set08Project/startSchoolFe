import useSWR from "swr";
import {
  classAssignment,
  readStudentCookie,
  viewStduentDetail,
  viewStudentAttendance,
} from "../api/studentAPI";

export const useStudentCookie = () => {
  const { data: dataID } = useSWR(`api/read-student-cookie/`, () => {
    return readStudentCookie().then((res: any) => {
      return res.data;
    });
  });
  return { dataID };
};

export const useStudentInfo = () => {
  const { dataID } = useStudentCookie();

  const { data: studentInfo } = useSWR(
    `api/view-student-info/${dataID}`,
    () => {
      return viewStduentDetail(dataID!).then((res: any) => {
        return res.data;
      });
    }
  );
  return { studentInfo };
};

export const useStudentAttendant = (studentID: string) => {
  const { data: studentAttendance } = useSWR(
    `api/viewing-student-attendance/${studentID}`,
    () => {
      return viewStudentAttendance(studentID!).then((res: any) => {
        return res.data;
      });
    }
  );
  return { studentAttendance };
};

export const useAssignment = (classID: string) => {
  const { data: classAssignments } = useSWR(
    `api/viewing-class-assignment/${classID}`,
    () => {
      return classAssignment(classID!).then((res: any) => {
        return res.data;
      });
    }
  );
  return { classAssignments };
};
