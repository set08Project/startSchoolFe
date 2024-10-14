import axios from "axios";

const URL2: string = import.meta.env.VITE_URL;
const URL: string = import.meta.env.VITE_MAIN_URL;

// working locally

// const URL: string = "https://just-next-be1.onrender.com/api";
// const URL2: string = "https://just-next-be1.onrender.com";

//
// const URL: string = "https://startschoolbe-1.onrender.com/api";
// const URL2: string = "https://startschoolbe-1.onrender.com";

// const URL: string = "https://just-next-be1.onrender.com/api";
// const URL2: string = "https://just-next-be1.onrender.com";

// const URL: string = "https://startschoolbe-1.onrender.com/api";
// const URL2: string = "https://startschoolbe-1.onrender.com";

export const updateSchoolAdminCode = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/update-school-admin-code/${schoolID}`, { adminCode: data })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const timeTableSetups = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/create-school-time-table/${schoolID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const bulkUploadofStudent = async (schoolID: string, data: any) => {
  try {
    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    return await axios
      .post(`${URL}/create-bulk-student/${schoolID}`, data, config)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const bulkUploadSchemeOfWork = async (data: any) => {
  try {
    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    return await axios
      .post(`${URL}/upload-schemes`, data, config)
      .then((res: any) => {
        console.log("res", res);
        return res;
      });
  } catch (error: any) {
    console.log("error", error.message);
    return error;
  }
};

export const fetchSchemeOfWork = async (
  selectedClass,
  selectedSubject,
  selectTerm
) => {
  try {
    const response = await axios.get(
      `${URL}/schemes/${selectedClass}/${selectedSubject}/${selectTerm}`
    );
    console.log(response);
    console.log(response?.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching scheme of work:", error);
    return null;
  }
};

export const allSchools = async () => {
  try {
    return await axios.get(`${URL}/view-all-school`).then((res: any) => {
      // console.log(res);

      return res;
    });
  } catch (error: any) {
    return error;
  }
};

export const googleAuth = async () => {
  try {
    return await axios.get(`${URL}/api/auth/google`).then((res: any) => {
      return res;
    });
  } catch (error: any) {
    return error;
  }
};

export const googleData = async () => {
  try {
    return await axios
      .get(`${URL}/auth/google-data`, { withCredentials: true })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

// Expenditures Api
export const setTermBudet = async (schoolID: string, budget: number) => {
  try {
    return await axios
      .patch(`${URL}/set-budget/${schoolID}`, { budget })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewTermlyBudget = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/read-term-budget/${schoolID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewTermlyExpense = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/read-expense/${schoolID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const createExpense = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-expense/${schoolID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

// School Fees Installmental Api starts here
export const recordFeesPayment = async (
  schoolID: string,
  studentID: string,
  feePaid: number,
  feePaidDate: string,
  paidByWho: string,
  paymentMode: string
) => {
  try {
    return await axios
      .post(`${URL}/record-payment/${schoolID}/${studentID}`, {
        feePaid,
        feePaidDate,
        paidByWho,
        paymentMode,
      })
      .then((res: any) => {
        return res.data;
      });
  } catch (error: any) {
    console.error();
    console.log(error.message);
    return error;
  }
};

export const updateClassName = async (
  schoolID: string,
  classID: string,
  data: string
) => {
  try {
    return await axios
      .patch(`${URL}/update-classname/${schoolID}/${classID}`, {
        className: data,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateRecordFee = async (recordID: string) => {
  try {
    return await axios
      .patch(`${URL}/second-payment/${recordID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const getRecords = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/getall-fee-records/${schoolID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const getOneRecord = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/getone-fee-records/${studentID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const deleteRecord = async (
  schoolID: string,
  studentID: string,
  recordID: string
) => {
  try {
    return await axios
      .delete(`${URL}/delete-fee-record/${schoolID}/${studentID}/${recordID}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

// School Fees Records Expenditures api ends here

export const getSchool = async () => {
  try {
    return await axios.get(`${URL}/get-school`).then((res: any) => {
      return res;
    });
  } catch (error: any) {
    return error;
  }
};

export const updateRegisterationStatus = async (data: {}) => {
  try {
    return await axios
      .patch(`${URL}/school-request-registration`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const approveRegisterationStatus = async (id: string) => {
  try {
    return await axios
      .patch(`${URL}/approved-school-registration/${id}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

export const deleteStudent = async (schoolID: string, studentID: string) => {
  try {
    return await axios
      .delete(`${URL}/delete-student/${schoolID}/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const deleteAllStudent = async (schoolID: string) => {
  try {
    return await axios
      .delete(`${URL}/delete-all-students/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const deleteStaff = async (schoolID: string, staffID: string) => {
  try {
    return await axios
      .delete(`${URL}/delete-staff/${schoolID}/${staffID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const makePayment = async (schoolID: string, email: string) => {
  try {
    return await axios
      .post(`${URL}/make-payment/${schoolID}`, { email })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const createReceipt = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/payment-receipt/${schoolID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const verifyPay = async (ref: string) => {
  try {
    return await axios.get(`${URL}/verify-payment/${ref}`).then((res: any) => {
      return res?.data?.data;
    });
  } catch (error: any) {
    return error;
  }
};

export const viewTermDetail = async (termID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-term-detail/${termID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const updatePayInfo = async (termID: string, data: {}) => {
  try {
    return await axios
      .patch(`${URL}/school-term-payment-updated/${termID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const getStarted = async () => {
  try {
    return await axios.get(`${URL2}`).then((res: any) => {
      return res?.data;
    });
  } catch (error: any) {
    return error;
  }
};

export const getSchoolCookie = async () => {
  try {
    return await axios
      .get(
        `${URL}/read-school-cookie`
        // { withCredentials: true }
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolLandingPage = async (schoolName: string) => {
  try {
    return await axios.get(`${URL2}/${schoolName}`).then((res: any) => {
      return res?.data;
    });
  } catch (error: any) {
    return error;
  }
};

export const openServerAPI = async () => {
  try {
    return await axios.get(`${URL2}`).then((res: any) => {
      return res?.message;
    });
  } catch (error) {
    return error;
  }
};

export const registerSchool = async (data: any) => {
  try {
    return await axios
      .post(`${URL}/register-school`, { email: data })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const loginSchool = async (data: {}) => {
  try {
    return await axios
      .post(
        `${URL}/login-school`,
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

export const verifySchool = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/verify-school/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readSchool = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    return await axios
      .delete(
        `${URL}/logout-school`
        // { withCredentials: true }
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const changeSchoolTags = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-school-tag/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const changeSchoolName = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-school-name/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const changeSchoolLocation = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-school-location/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const changeSchoolStarted = async (schoolID: string) => {
  try {
    return await axios
      .patch(`${URL}/change-school-started/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewSchoolByName = async (schoolName: string) => {
  try {
    return await axios
      .get(`${URL}/get-school-by-name/${schoolName}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createSchoolTeacher = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-school-teacher/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewSchoolTeacher = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-teacher/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

// subject API

export const createSchoolSubject = async (schoolID: string, data: any) => {
  try {
    return await axios
      .post(`${URL}/create-subject/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createSchoolClassroom = async (schoolID: string, data: any) => {
  try {
    return await axios
      .post(`${URL}/create-classroom/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolClassroom = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-classrooms/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateClassroomTeacher = async (
  schoolID: string,
  classID: string,
  data: {}
) => {
  try {
    return await axios
      .patch(`${URL}/update-classrooms-teacher/${schoolID}/${classID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getClassroom = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-classroom-info/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolAnncoement = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-announcement/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolClassromm = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-announcement/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolEvent = async (schoolID: string) => {
  try {
    return await axios.get(`${URL}/view-event/${schoolID}`).then((res: any) => {
      return res?.data;
    });
  } catch (error) {
    return error;
  }
};

export const createSchoolEvent = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-event/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createSchoolAnnouncement = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-announcement/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createSchoolStudent = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-student/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewSchoolSubjects = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-subjects/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getClassSubjects = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-classroom-info/${classID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getClassTimeTable = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-time-table/${classID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolStudents = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/read-student/${schoolID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolStudentDetail = async (studentID: string) => {
  try {
    return await axios
      .get(`${URL}/read-student-info/${studentID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createTimeTable = async (
  schoolID: string,
  classID: string,
  data: {}
) => {
  try {
    return await axios
      .post(`${URL}/create-time-table/${schoolID}/${classID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateSchoolSubjectTeacher = async (
  schoolID: string,
  classID: string,
  data: {}
) => {
  try {
    return await axios
      .patch(`${URL}/update-subject-teacher/${schoolID}/${classID}`, {
        subjectTeacherName: data,
      })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const topSchoolStudent = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-top-student/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const classAttendance = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/viewing-class-attendance/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const studentAttendance = async (studentID: string) => {
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

export const readNoted = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/admin-view-lesson-note/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const approveNoted = async (schoolID: string, lessonID: string) => {
  try {
    return await axios
      .patch(`${URL}/approve-lesson-note/${schoolID}/${lessonID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createStore = async (schoolID: string, data: {}) => {
  try {
    const config: any = {
      "content-type": "multipart/form-data",
    };
    return await axios
      .post(`${URL}/create-store/${schoolID}/`, data, config)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewStore = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-store/${schoolID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const deleteArticle = async (
  schoolID: string,
  studentID: string,
  articleID: string
) => {
  try {
    return await axios
      .delete(
        `${URL}/delete-school-article/${schoolID}/${studentID}/${articleID}`
      )
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createGallaryRestrict = async (schoolID: string, data: {}) => {
  try {
    const config: any = {
      "content-type": "multipart/form-data",
    };
    return await axios
      .post(`${URL}/create-restrict-gallary/${schoolID}/`, data, config)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createGallary = async (schoolID: string, data: {}) => {
  try {
    const config: any = {
      "content-type": "multipart/form-data",
    };
    return await axios
      .post(`${URL}/create-gallary/${schoolID}/`, data, config)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewGallary = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-gallary/${schoolID}/`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};
export const deleteGallary = async (schoolID: string, gallaryID: string) => {
  try {
    return await axios
      .get(`${URL}/delete-gallary/${schoolID}/${gallaryID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewSchoolSession = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-session/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewSchoolSessionTerm = async (sessionID: any) => {
  try {
    return await axios
      .get(`${URL}/view-present-school-session/${sessionID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const verifyPayment1st = async (schoolID: string, studentID: string) => {
  try {
    return await axios
      .patch(`${URL}/update-student-fees-1st/${schoolID}/${studentID}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
};

export const verifyPayment2nd = async (schoolID: string, studentID: string) => {
  try {
    return await axios
      .patch(`${URL}/update-student-fees-2nd/${schoolID}/${studentID}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
};

export const verifyPayment3rd = async (schoolID: string, studentID: string) => {
  try {
    return await axios
      .patch(`${URL}/update-student-fees-3rd/${schoolID}/${studentID}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
};

export const createNewSession = async (schoolID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-new-school-session/${schoolID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewComplains = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-complain/${schoolID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const markSeenComplains = async (
  schoolID: string,
  complainID: string
) => {
  try {
    return await axios
      .patch(`${URL}/mark-seen/${schoolID}/${complainID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const markResolveComplains = async (
  schoolID: string,
  complainID: string
) => {
  try {
    return await axios
      .patch(`${URL}/mark-resolve/${schoolID}/${complainID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateAvatar = async (schoolID: string, data: any) => {
  try {
    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    return await axios
      .patch(`${URL}/upload-school-avatar/${schoolID}`, data, config)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createNewSessionTerm = async (sessionID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/create-school-term/${sessionID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewPresentSession = async (sessionID: string) => {
  try {
    return await axios
      .get(`${URL}/view-present-school-session/${sessionID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewPresentSessionTerm = async (termID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-session/${termID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const createSessionTermHistory = async (termID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-session/${termID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const viewSessionTermHistory = async (termID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-term/${termID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateAccount = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/update-payment-info`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateSchoolFeeAccountInfo = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/update-schoolfee-payment-info`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateAccountInfo = async (schoolID: string, bankDetails: {}) => {
  try {
    return await axios
      .patch(`${URL}/update-account-info/${schoolID}`, bankDetails)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const storePayment = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/make-store-payment/`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const verifyPayment = async (refID: string) => {
  try {
    return await axios
      .get(`${URL}/verify-payment/${refID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const purchasedStoreInfo = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-purchase/${schoolID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updatePurchasedStore = async (purchaseID: string) => {
  try {
    return await axios
      .post(`${URL}/update-school-purchase/${purchaseID}`, { delievered: true })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const readSchoolFee = async (schoolID: string) => {
  try {
    return await axios
      .get(`${URL}/view-school-schoolfee-detail/${schoolID}`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const updateSchoolFee = async (schoolFeeID: string) => {
  try {
    return await axios
      .post(`${URL}/update-school-school-fee/${schoolFeeID}`, {
        confirm: true,
      })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const adminReport = async (
  schoolID: string,
  studentID: string,
  adminComment: string
) => {
  try {
    return await axios
      .patch(`${URL}/admin-report-card/${schoolID}/${studentID}`, {
        adminComment,
      })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const approveMainReport = async (classID: string, data: string) => {
  try {
    return await axios
      .post(`${URL}/create-history-session/${classID}/`, {
        text: data,
      })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const deletSubject = async (schoolID: string, subjectID: string) => {
  try {
    return await axios
      .delete(`${URL}/delete-subject/${schoolID}/${subjectID}/`)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const removeTeacherSubject = async (
  schoolID: string,
  teacherID: string,
  subjectID: string
) => {
  try {
    return await axios
      .patch(
        `${URL}/remove-teacher-subject/${schoolID}/${teacherID}/${subjectID}/`
      )
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const changeStudentClass = async (studentID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-student-class/${studentID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const changeSchoolPhone = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-school-phone/${schoolID}`, { phone: data })
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};

export const changeSchoolPersonalName = async (schoolID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/change-school-personal-name/${schoolID}`, data)
      .then((res: any) => {
        return res;
      });
  } catch (error: any) {
    return error;
  }
};
