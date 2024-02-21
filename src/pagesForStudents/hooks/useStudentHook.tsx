import useSWR from "swr";
import {
  classAssignment,
  classLessonNotes,
  lessonNotes,
  readClassInfo,
  readStudentCookie,
  viewStduentDetail,
  viewStudentAttendance,
} from "../api/studentAPI";
import { useEffect, useState } from "react";

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

export const useLessonNote = (schoolID: string, staffID: string) => {
  const { data: lessonNote } = useSWR(
    `api/view-lession-note/${staffID}`,
    () => {
      return lessonNotes(schoolID, staffID).then((res: any) => {
        return res.data;
      });
    }
  );
  return { lessonNote };
};

export const useClassLessonNote = (classID: string) => {
  const { data: classLessonNote } = useSWR(
    `api/view-lession-note/${classID}`,
    () => {
      return classLessonNotes(classID).then((res: any) => {
        return res.data;
      });
    }
  );
  return { classLessonNote };
};

export const useReadMyClassInfo = () => {
  const [state, setState] = useState<any>({});
  const { studentInfo } = useStudentInfo();

  useEffect(() => {
    readClassInfo(studentInfo?.classAssigned).then((res: any) => {
      setState(res.data);
    });
  }, []);

  return { state };
};
