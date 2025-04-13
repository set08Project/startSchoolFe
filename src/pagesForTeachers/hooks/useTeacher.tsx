import useSWR, { Cache, mutate } from "swr";
import {
  classAssignment,
  classAttendance,
  lessonNote,
  readClassInfoStudent,
  readClassInfoSubject,
  readQuiz,
  readSubjectDetail,
  readSubjectQuiz,
  readTeacherCookie,
  readTeacherSchedule,
  viewClassAcademicHistory,
  viewComplains,
  viewExamination,
  viewPurchases,
  viewStudentGrade,
  viewTeacherDetail,
  viewTeacherLessonNote,
  getStudentSubjectPerformance,
  readExam,
  getExam,
  viewMidTest,
  getMidTestPerformance,
  getMidTestPerformanceResut,
  viewStudentMidGrade,
} from "../api/teachersAPI";
import {
  getSchoolAnncoement,
  getSchoolEvent,
} from "../../pages/api/schoolAPIs";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const localStorageProvider = () => {
  // When initializing, we restore the data from `localStorage` into SWR's internal cache:
  const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));

  // Before unloading the app, we write back all the data into `localStorage`:
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", appCache);
  });

  return map;
};

export const useTeacherCookie = () => {
  const user = useSelector((state: any) => state.user);
  const { data: dataID } = useSWR(`api/read-teacher-cookie/`, () => {
    return readTeacherCookie().then((res: any) => {
      return res.data;
    });
  });
  return { dataID: user?.id };
};

export const useTeacherDetail = (teacherID: string) => {
  const { data: teacherDetail } = useSWR(
    `api/view-teacher-detail/${teacherID}`,
    () => {
      return viewTeacherDetail(teacherID!).then((res: any) => {
        return res.data;
      });
    }
  );

  return { teacherDetail };
};

export const useTeacherInfo = () => {
  const { dataID } = useTeacherCookie();

  const { data: teacherInfo } = useSWR(
    `api/view-teacher-detail/${dataID}`,

    () => {
      return viewTeacherDetail(dataID!).then((res: any) => {
        return res.data;
      });
    }
  );

  return { teacherInfo };
};

export const useClassSubject = (classID: string) => {
  const { data: subjectData } = useSWR(
    `api/view-teacher-detail/${classID}`,
    () => {
      return readClassInfoSubject(classID!).then((res: any) => {
        return res.data;
      });
    }
  );

  return { subjectData };
};

export const useClassTimeTable = (classID: string) => {
  const { data: timetableData } = useSWR(
    `api/view-teacher-detail/${classID}`,
    () => {
      return readClassInfoSubject(classID!).then((res: any) => {
        return res.data;
      });
    }
  );

  return { timetableData };
};

export const useTeacherSchedule = (teacherID: string) => {
  const { data: teacherSchedule } = useSWR(
    `api/view-teacher-schedule/${teacherID}`,
    () => {
      return readTeacherSchedule(teacherID!).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData:
        JSON.parse(localStorage.getItem("teacherSchedule")!) || null,
    }
  );

  return { teacherSchedule };
};

export const useTeacherStudent = (classID: string) => {
  const { data: teacherSchedule } = useSWR(
    `api/view-teacher-schedule/${classID}`,
    () => {
      return readTeacherSchedule(classID!).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData:
        JSON.parse(localStorage.getItem("teacherSchedule")!) || null,
    }
  );

  return { teacherSchedule };
};

export const useClassStudent = (classID: string) => {
  const { data: classStudents, mutate } = useSWR(
    `api/view-all-class-students/${classID}`,
    () => {
      return readClassInfoStudent(classID!).then((res: any) => {
        return res.data;
      });
    }
  );

  return { classStudents, mutate };
};

export const useSujectInfo = (subjectID: string) => {
  const { data: subjectInfo } = useSWR(
    `api/view-subject-info/${subjectID}`,
    () => {
      return readSubjectDetail(subjectID!).then((res: any) => {
        return res.data;
      });
    }
  );

  return { subjectInfo };
};

export const useSujectQuiz = (subjectID: string) => {
  const { data: subjectQuiz } = useSWR(
    `api/view-subject-quiz/${subjectID}`,
    () => {
      return readSubjectQuiz(subjectID!).then((res: any) => {
        return res.data;
      });
    }
  );

  return { subjectQuiz };
};

export const useExam = (quizID: string) => {
  const { data: examData } = useSWR(`api/view-exam/${quizID}`, () => {
    return getExam(quizID!).then((res: any) => {
      return res.data;
    });
  });

  return { examData };
};

export const useQuiz = (quizID: string) => {
  const { data: quizData } = useSWR(`api/view-quiz/${quizID}`, () => {
    return readQuiz(quizID!).then((res: any) => {
      return res.data;
    });
  });

  return { quizData };
};

export const useAttendance = (classID: string) => {
  const { data: attendance } = useSWR(
    `api/view-class-attendance/${classID}`,
    () => {
      return classAttendance(classID!).then((res: any) => {
        return res.data;
      });
    }
  );

  return { attendance };
};

export const useSchoolAnnouncement = (schoolID: string) => {
  const { data: schoolAnnouncement } = useSWR(
    `api/view-announcement/${schoolID}`,
    () => {
      return getSchoolAnncoement(schoolID!).then((res) => {
        return res.data;
      });
    },
    {
      fallbackData:
        JSON.parse(localStorage.getItem("schoolAnnouncement")!) || null,
    }
  );

  return { schoolAnnouncement };
};

export const useSchoolEvent = (schoolID: string) => {
  const { data: schoolEvent } = useSWR(`api/view-event/${schoolID}`, () => {
    return getSchoolEvent(schoolID!).then((res) => {
      return res.data;
    });
  });

  return { schoolEvent };
};

export const useSubjectAssignment = (subjectID: string) => {
  const { data: subjectAssignment } = useSWR(
    `api/view-subject-assignment/${subjectID}`,
    () => {
      return classAssignment(subjectID!).then((res) => {
        return res.data;
      });
    },
    {
      fallbackData:
        JSON.parse(localStorage.getItem("subjectAssignment")!) || null,
    }
  );

  return { subjectAssignment };
};

export const useLessonNote = (lessonID: string) => {
  const { data: lessonNoteData } = useSWR(
    `api/view-lesson-note-detail/${lessonID}`,
    () => {
      return lessonNote(lessonID!).then((res) => {
        return res?.data;
      });
    }
  );

  mutate(`api/view-lesson-note-detail/${lessonID}`);
  return { lessonNoteData };
};

export const useComplain = (teacherID: string) => {
  const { data: complainData } = useSWR(
    `api/view-teacher-complain/${teacherID}`,
    () => {
      return viewComplains(teacherID!).then((res) => {
        return res.data.complain;
      });
    }
  );

  return { complainData };
};

export const useSubjectPerformance = (subjectID: string) => {
  const { data: perform } = useSWR(
    `api/view-subject-quiz-performance/${subjectID}`,
    () => {
      return getStudentSubjectPerformance(subjectID!).then((res) => {
        return res;
      });
    }
  );

  return { perform };
};

export const useExamination = (subjectID: string) => {
  const { data: examination } = useSWR(
    `api/view-subject-exam/${subjectID}`,
    () => {
      return viewExamination(subjectID!).then((res) => {
        return res.exam;
      });
    }
  );

  return { examination };
};

export const useMidTest = (subjectID: string) => {
  const { data: midTest, mutate: midTestMutate } = useSWR(
    `api/view-subject-mid-test/${subjectID}`,
    () => {
      return viewMidTest(subjectID!).then((res) => {
        return res?.midTest;
      });
    }
  );

  return { midTest, midTestMutate };
};

export const useStudentGrade = (studentID: string) => {
  const { data: gradeData } = useSWR(
    `api/student-report-card/${studentID}`,
    () => {
      return viewStudentGrade(studentID!).then((res) => {
        return res.data;
      });
    }
  );

  return { gradeData };
};

export const useStudentMidGrade = (studentID: string) => {
  const { data: gradeMidData } = useSWR(
    `api/student-mid-report-card/${studentID}`,
    () => {
      return viewStudentMidGrade(studentID!).then((res) => {
        return res.data;
      });
    }
  );

  return { gradeMidData };
};

export const useMidTestResultPerformance = (quizID: string) => {
  const { data: midTestPerformance } = useSWR(
    `api/view-mid-test-performance/${quizID}`,
    () => {
      return getMidTestPerformance(quizID!).then((res) => {
        return res.data;
      });
    }
  );

  return { midTestPerformance };
};

export const useMidTestResultPerformanceData = (
  subjectID: string,
  quizID: string
) => {
  const { data: midTestPerformanceResult } = useSWR(
    `api/view-mid-test-performance/${subjectID}/${quizID}`,
    () => {
      return getMidTestPerformanceResut(subjectID, quizID!).then((res) => {
        return res.data;
      });
    }
  );

  return { midTestPerformanceResult };
};

export const useClassAcademicHistory = (classID: string) => {
  const { data: classAcademicHistory } = useSWR(
    `api/view-class-result-history/${classID}`,
    () => {
      return viewClassAcademicHistory(classID!).then((res) => {
        return res.data;
      });
    }
  );

  return { classAcademicHistory };
};

export const usePurchasedData = (staffID: string) => {
  const { data: purchasedData } = useSWR(
    `api/view-teacher-purchase/${staffID}`,
    () => {
      return viewPurchases(staffID!).then((res) => {
        return res.data;
      });
    }
  );

  return { purchasedData };
};

export const useTeacherNote = (staffID: string) => {
  const { data: teacherNote } = useSWR(
    `api/view-teacher-lesson-note/${staffID}`,
    () => {
      return viewTeacherLessonNote(staffID!).then((res) => {
        return res.data;
      });
    }
  );

  return { teacherNote };
};
