import useSWR from "swr";
import {
  classAssignment,
  classLessonNotes,
  getOneArticle,
  getOneStudentHistory,
  getSchoolArticle,
  getStudentByEnrollmentID,
  getStudentPayRecord,
  lessonNotes,
  readClassInfo,
  readOneClassInfo,
  readStudentCookie,
  studentRemake,
  studentSchoolFeePayment,
  viewClassTimetable,
  viewComplains,
  viewMidTestStduent,
  viewPerformanceTest,
  viewPurchasedEndPoint,
  viewStduentDetail,
  viewStudentAttendance,
  viewStudentPerformanceMidTest,
} from "../api/studentAPI";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  viewTermlyBudget,
  viewTermlyExpense,
} from "../../pages/api/schoolAPIs";
// import { viewMidTest } from "@/pagesForTeachers/api/teachersAPI";

export const useStudentCookie = () => {
  const user = useSelector((state: any) => state.user);
  const { data: dataID } = useSWR(`api/read-student-cookie/`, () => {
    return readStudentCookie().then((res: any) => {
      return res.data;
    });
  });
  return { dataID: user?.id };
};

export const useMidTestStudentPerformance = (studentID: string) => {
  const { data: midTestPerformace } = useSWR(
    `view-student-mid-test-performance/${studentID}/`,
    () => {
      return viewStudentPerformanceMidTest(studentID!).then((res) => {
        return res.data;
      });
    },
    {
      fallbackData:
        JSON.parse(localStorage.getItem("midTestPerformace")!) || null,
    }
  );
  useEffect(() => {
    if (midTestPerformace) {
      localStorage.setItem(
        "midTestPerformace",
        JSON.stringify(midTestPerformace)
      );
    }
  }, [midTestPerformace]);
  return { midTestPerformace };
};

export const useMidTestStudent = (subjectID: string) => {
  const { data: midTest } = useSWR(
    `api/view-subject-mid-test/${subjectID}`,
    () => {
      return viewMidTestStduent(subjectID!).then((res) => {
        return res.midTest;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("midTest")!) || null,
    }
  );
  useEffect(() => {
    if (midTest) {
      localStorage.setItem("midTest", JSON.stringify(midTest));
    }
  }, [midTest]);
  return { midTest };
};

export const useTermBudget = (schoolID: string) => {
  const { data: termBudget } = useSWR(
    `api/view-term-budget/${schoolID}`,
    () => {
      return viewTermlyBudget(schoolID!).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("termBudget")!) || null,
    }
  );
  useEffect(() => {
    if (termBudget) {
      localStorage.setItem("termBudget", JSON.stringify(termBudget));
    }
  }, [termBudget]);
  return { termBudget };
};

export const useTermExpenses = (schoolID: string) => {
  const { data: termlyExpense } = useSWR(
    `api/view-expense/${schoolID}`,
    () => {
      return viewTermlyExpense(schoolID!).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("termlyExpense")) || null,
    }
  );
  useEffect(() => {
    if (termlyExpense) {
      localStorage.setItem("termlyExpense", JSON.stringify(termlyExpense));
    }
  }, [termlyExpense]);
  return { termlyExpense };
};

export const useStudentInfo = () => {
  const { dataID } = useStudentCookie();

  const { data: studentInfo } = useSWR(
    `api/view-student-info/${dataID}`,
    () => {
      return viewStduentDetail(dataID!).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("studentInfo")!) || null,
    }
  );
  useEffect(() => {
    if (studentInfo) {
      localStorage.setItem("studentInfo", JSON.stringify(studentInfo));
    }
  });
  return { studentInfo };
};

export const useStudentInfoData = (studentID: string) => {
  const { data: studentInfoData } = useSWR(
    `api/view-student-info/${studentID}`,
    () => {
      return viewStduentDetail(studentID!).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData:
        JSON.parse(localStorage.getItem("studentInfoData")!) || null,
    }
  );
  useEffect(() => {
    if (studentInfoData) {
      localStorage.setItem("studentInfoData", JSON.stringify(studentInfoData));
    }
  }, [studentInfoData]);
  return { studentInfoData };
};

export const useStudentAttendant = (studentID: string) => {
  const { data: studentAttendance } = useSWR(
    `api/viewing-student-attendance/${studentID}`,
    () => {
      return viewStudentAttendance(studentID!).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData:
        JSON.parse(localStorage.getItem("studentAttendance")!) || null,
    }
  );
  useEffect(() => {
    if (studentAttendance) {
      localStorage.setItem(
        "studentAttendance",
        JSON.stringify(studentAttendance)
      );
    }
  }, [studentAttendance]);
  return { studentAttendance };
};

export const useAssignment = (classID: string) => {
  const { data: classAssignments } = useSWR(
    `api/viewing-class-assignment/${classID}`,
    () => {
      return classAssignment(classID!).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData:
        JSON.parse(localStorage.getItem("classAssignments")!) || null,
    }
  );
  useEffect(() => {
    if (classAssignments) {
      localStorage.setItem(
        "classAssignments",
        JSON.stringify(classAssignments)
      );
    }
  }, [classAssignments]);
  return { classAssignments };
};

export const useLessonNote = (schoolID: string, staffID: string) => {
  const { data: lessonNote } = useSWR(
    `api/view-lession-note/${staffID}`,
    () => {
      return lessonNotes(schoolID, staffID).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("lessonNote")!) || null,
    }
  );
  useEffect(() => {
    if (lessonNote) {
      localStorage.setItem("lessonNote", JSON.stringify(lessonNote));
    }
  }, [lessonNote]);

  return { lessonNote };
};

export const useClassLessonNote = (classID: string) => {
  const { data: classLessonNote } = useSWR(
    `api/view-lession-note/${classID}`,
    () => {
      return classLessonNotes(classID).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData:
        JSON.parse(localStorage.getItem("classLessonNote")!) || null,
    }
  );
  useEffect(() => {
    if (classLessonNote) {
      localStorage.setItem("classLessonNote", JSON.stringify(classLessonNote));
    }
  }, [classLessonNote]);
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

export const useReadMyClassInfoData = (classAssigned: string) => {
  const [state, setState] = useState<any>({});

  useEffect(() => {
    readClassInfo(classAssigned).then((res: any) => {
      setState(res.data);
    });
  }, []);

  return { state };
};

export const useReadOneClassInfo = (classID: string) => {
  const { data: oneClass } = useSWR(
    `api/view-one-classroom-info/${classID}`,
    async () => {
      return await readOneClassInfo(classID!).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("oneClass")!) || null,
    }
  );
  useEffect(() => {
    if (oneClass) {
      localStorage.setItem("oneClass", JSON.stringify(oneClass));
    }
  }, [oneClass]);
  return { oneClass };
};

export const useOneArticle = (studentID: string) => {
  const { data: oneArticle } = useSWR(
    `api/viewing-one-article/${studentID}`,
    () => {
      return getOneArticle(studentID!).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("oneArticle")!) || null,
    }
  );
  useEffect(() => {
    if (oneArticle) {
      localStorage.setItem("oneArticle", JSON.stringify(oneArticle));
    }
  }, [oneArticle]);
  return { oneArticle };
};

export const useSchoolArticle = (schoolID: string) => {
  const { data: allArticle } = useSWR(
    `api/viewing-all-article/${schoolID}`,
    () => {
      return getSchoolArticle(schoolID!).then((res: any) => {
        return res.data;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("allArticle")!) || null,
    }
  );
  useEffect(() => {
    if (allArticle) {
      localStorage.setItem("allArticle", JSON.stringify(allArticle));
    }
  }, [allArticle]);
  return { allArticle };
};

export const useComplain = (studentID: string) => {
  const { data: complainData } = useSWR(
    `api/view-student-complain/${studentID}`,
    () => {
      return viewComplains(studentID!).then((res) => {
        return res.data.complain;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("complainData")!) || null,
    }
  );
  useEffect(() => {
    if (complainData) {
      localStorage.setItem("complainData", JSON.stringify(complainData));
    }
  }, [complainData]);
  return { complainData };
};

export const usePastQuestionHistory = (studentID: string) => {
  const { data: pastQuestionData } = useSWR(
    `api/view-question-history/${studentID}`,
    () => {
      return getOneStudentHistory(studentID!).then((res) => {
        return res.data;
      });
    },
    {
      fallbackData:
        JSON.parse(localStorage.getItem("pastQuestionData")!) || null,
    }
  );
  useEffect(() => {
    if (pastQuestionData) {
      localStorage.setItem(
        "pastQuestionData",
        JSON.stringify(pastQuestionData)
      );
    }
  }, [pastQuestionData]);
  return { pastQuestionData };
};

export const useClassTimeTableViewer = (classID: string) => {
  const { data: viewTimeTable } = useSWR(
    `api/view-time-table/${classID}`,
    () => {
      return viewClassTimetable(classID!).then((res) => {
        return res.data.timeTable;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("viewTimeTable")!) || null,
    }
  );
  useEffect(() => {
    localStorage.setItem("viewTimeTable", JSON.stringify(viewTimeTable));
  }, [viewTimeTable]);
  return { viewTimeTable };
};

export const usePurchasedStore = (studentID: string) => {
  const { data: purchasedStore } = useSWR(
    `api/view-purchase/${studentID}`,
    () => {
      return viewPurchasedEndPoint(studentID!).then((res) => {
        return res.data;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("purchasedStore")!) || null,
    }
  );
  useEffect(() => {
    if (purchasedStore) {
      localStorage.setItem("purchasedStore", JSON.stringify(purchasedStore));
    }
  }, [purchasedStore]);
  return { purchasedStore };
};

export const useStudentSchoolFee = (studentID: string) => {
  const { data: studentFees } = useSWR(
    `api/view-student-schoolfee-detail/${studentID}`,
    () => {
      return studentSchoolFeePayment(studentID!).then((res) => {
        return res?.data?.data;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("studentFees")!) || null,
    }
  );
  useEffect(() => {
    if (studentFees) {
      localStorage.setItem("studentFees", JSON.stringify(studentFees));
    }
  }, [studentFees]);
  return { studentFees };
};

export const useViewPerformance = (studentID: string) => {
  const { data: performanceTest } = useSWR(
    `api/view-student-quiz-performance/${studentID}`,
    () => {
      return viewPerformanceTest(studentID!).then((res) => {
        return res?.data;
      });
    },
    {
      fallbackData:
        JSON.parse(localStorage.getItem("performanceTest")!) || null,
    }
  );
  useEffect(() => {
    if (performanceTest) {
      localStorage.setItem("performanceTest", JSON.stringify(performanceTest));
    }
  }, [performanceTest]);
  return { performanceTest };
};

export const useViewRemark = (studentID: string) => {
  const { data: remarks } = useSWR(
    `api/view-remark/${studentID}`,
    () => {
      return studentRemake(studentID!).then((res) => {
        return res?.data;
      });
    },
    {
      fallbackData: JSON.parse(localStorage.getItem("remarks")!) || null,
    }
  );
  useEffect(() => {
    if (remarks) {
      localStorage.setItem("remarks", JSON.stringify(remarks));
    }
  }, [remarks]);
  return { remarks };
};

export const useStudentFeePayment = (studentID: string) => {
  try {
    const { data: studentFeePayment } = useSWR(
      `api/getone-fee-records/${studentID}`,
      () => {
        return getStudentPayRecord(studentID).then((res) => {
          return res?.data?.recordPayments || [];
        });
      }
    );

    return { studentFeePayment };
  } catch (error) {
    console.error();
    return error;
  }
};

export const useStudentEnrollmentID = (studentID: string) => {
  try {
    const { data: studentRecord } = useSWR(
      `api/read-by-enrollment-id/${studentID}`,
      () => {
        return getStudentByEnrollmentID(studentID).then((res) => {
          return res;
        });
      }
    );

    return { studentRecord };
  } catch (error) {
    console.error();
    return error;
  }
};
