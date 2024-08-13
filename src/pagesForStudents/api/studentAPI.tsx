import axios from "axios";

const URL: string = import.meta.env.VITE_MAIN_URL;
// const URL: string = import.meta.env.VITE_PROCUTION_URL;
//
// const URL: string = "https://startschoolbe.onrender.com/api";
// const URL: string = "https://startschool.onrender.com/api";

export const viewStduentDetail: any = async (studentID: any) => {
  try {
    return await axios
      .get(`${URL}/read-student-info/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const loginStudent = async (data: {}) => {
  try {
    return await axios
      .post(
        `${URL}/login-student/`,
        data  
        // { withCredentials: true }
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readClassInfo = async (className: string) => {
  try {
    return await axios
      .post(`${URL}/view-classroom-info-name/`, { className })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readOneClassInfo = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-one-classroom-info/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewPerformanceTest = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-student-quiz-performance/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const performanceTest = async (
  studentID: string,
  quizID: string,
  data: {}
) => {
  try {
    return await axios
      .post(
        `${URL}/create-subject-quiz-performance/${studentID}/${quizID}/`,
        data
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readStudentCookie = async () => {
  try {
    return await axios
      .get(`${URL}/read-student-cookie/`, { withCredentials: true })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewStudentAttendance = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/viewing-student-attendance/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const classAssignment = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-class-assignment/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const lessonNotes = async (schoolID: string, staffID: string) => {
  try {
    return await axios
      .get(`${URL}/view-lesson-note/${schoolID}/${staffID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const classLessonNotes = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-class-lesson-note/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const rateNote = async (
  studentID: string,
  lessonID: string,
  data: {}
) => {
  try {
    return await axios
      .patch(`${URL}/rate-lesson-note/${studentID}/${lessonID}`, { rate: data })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createStudentArticle = async (
  schoolID: string,
  studentID: string,
  data: {}
) => {
  try {
    return await axios
      .post(`${URL}/create-article/${schoolID}/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return error;
  }
};

export const createPastQuestionHistory = async (
  studentID: string,
  data: {}
) => {
  try {
    return await axios
      .post(`${URL}/create-question-history/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return error;
  }
};

export const getOneStudentHistory = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-question-history/${studentID}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return error;
  }
};

export const getOneArticle = async (articleID: string) => {
  try {
    return await axios
      .get(`${URL}/view-article/${articleID}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolArticle = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-article/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return error;
  }
};

export const updateProfile = async (studntID: string, data: {}) => {
  try {
    return await axios
      .patch(`${URL}/update-student/${studntID}`, data)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return error;
  }
};

export const makeComplains = async (studentID: string, data: any) => {
  try {
    return await axios
      .post(`${URL}/create-student-complain/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewComplains = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-student-complain/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewClassTimetable = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-time-table/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateTeacherActiveness = async (
  studentID: string,
  data: string
) => {
  try {
    return await axios
      .patch(`${URL}/staff-active/${studentID}`, { teacherName: data })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateStudentAvatar = async (studentID: string, data: string) => {
  try {
    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    return await axios
      .patch(`${URL}/upload-student-avatar/${studentID}`, data, config)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getStudentGrade = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/student-report-card/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getOneHistory = async (historyID: string) => {
  try {
    return await axios
      .get(`${URL}/get-one-history/${historyID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateStudentParentEmail = async (
  schoolID: string,
  studentID: string,
  parentEmail: string
) => {
  try {
    return await axios
      .patch(`${URL}/update-parent-email/${schoolID}/${studentID}`, {
        parentEmail,
      })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewPurchasedEndPoint = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-purchase/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const purchasedEndPoint = async (studentID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/purchase/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const schoolPaymentEndPoint = async (studentID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/pay-student-schoolfee/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const schoolFeePayment = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/make-schoolfee-payment/`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const studentSchoolFeePayment = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-student-schoolfee-detail/${studentID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const studentRemake = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/view-remark/${studentID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const likeArticle = async (articleID: string, readerID: string) => {
  try {
    return await axios
      .patch(`${URL}/like-article/${articleID}/${readerID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewArticle = async (articleID: string, readerID: string) => {
  try {
    return await axios
      .patch(`${URL}/view-article/${articleID}/${readerID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};
