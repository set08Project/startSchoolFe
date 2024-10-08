import axios from "axios";

// const URL: string =
import.meta.env.VITE_MAIN_URL || import.meta.env.VITE_PRODUCTION_URL;

// const URL: string = "https://just-next-be1.onrender.com/api";

// const URL: string = "https://startschoolbe-1.onrender.com/api";

export const viewTeacherDetail: any = async (teacherID: string) => {
  try {
    return await axios
      .get(`${URL}/view-teacher-detail/${teacherID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updaetTeacherSalary = async (teacherID: string, data: {}) => {
  try {
    return await axios
      .patch(`${URL}/update-teacher-salery/${teacherID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const loginTeacherToken = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/login-teacher-token/`, data, { withCredentials: true })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const loginTeacher = async (data: {}) => {
  try {
    return await axios
      .post(`${URL}/login-teacher/`, data, { withCredentials: true })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readTeacherCookie = async () => {
  try {
    return await axios
      .get(`${URL}/read-teacher-cookie/`, { withCredentials: true })
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

export const readClassInfoTimeTable = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-classroom-info-timetable/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readClassInfoSubject = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-classroom-info-subject/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewSchoolClassroom = async (schoolID: string) => {
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

export const readClassInfoStudent = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-classroom-info-student/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readTeacherSchedule = async (teacherID: string) => {
  try {
    return await axios
      .get(`${URL}/view-teacher-schedule/${teacherID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readSubjectDetail = async (subjectID: string) => {
  try {
    return await axios
      .get(`${URL}/view-subjects-info/${subjectID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createQuiz = async (
  classID: string,
  subjectID: string,
  data: {}
) => {
  try {
    return await axios
      .post(`${URL}/create-subject-quiz/${classID}/${subjectID}`, {
        quiz: data,
      })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readSubjectQuiz = async (subjectID: string) => {
  try {
    return await axios
      .get(`${URL}/view-subject-quiz/${subjectID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const readQuiz = async (quizID: string) => {
  try {
    return await axios.get(`${URL}/view-quiz/${quizID}`).then((res: any) => {
      return res?.data;
    });
  } catch (error) {
    return error;
  }
};

export const markAttendancePresent = async (
  teacherID: string,
  studentID: string
) => {
  try {
    return await axios
      .post(`${URL}/present/${teacherID}/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const markAttendanceAbsent = async (
  teacherID: string,
  studentID: string
) => {
  try {
    return await axios
      .post(`${URL}/absent/${teacherID}/${studentID}`)
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

export const createAssignment = async (
  classID: string,
  subjectID: string,
  data: {}
) => {
  try {
    return await axios
      .post(`${URL}/create-subject-assignment/${classID}/${subjectID}/`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const classAssignment = async (subjectID: string) => {
  try {
    return await axios
      .get(`${URL}/view-class-assignment/${subjectID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createTeacherLessonNote = async (
  schoolID: string,
  teacherID: string,
  data: {}
) => {
  try {
    return await axios
      .post(`${URL}/create-lesson-note/${schoolID}/${teacherID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const adminlessonNoteReply = async (
  schoolID: string,
  lessonNotedID: string,
  data: {}
) => {
  try {
    return await axios
      .patch(`${URL}/reply-lesson-note/${schoolID}/${lessonNotedID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const lessonNote = async (lessonID: string) => {
  try {
    return await axios
      .get(`${URL}/view-lesson-note-detail/${lessonID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const remark = async (
  teacherID: string,
  studentID: string,
  data: any
) => {
  try {
    return await axios
      .post(`${URL}/create-remark/${teacherID}/${studentID}`, { remark: data })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const studentOfTheWeek = async (teacherID: string, data: any) => {
  try {
    return await axios
      .patch(`${URL}/student-week/${teacherID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const makeComplains = async (teacherID: string, data: any) => {
  try {
    return await axios
      .post(`${URL}/create-complain/${teacherID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewComplains = async (teacherID: string) => {
  try {
    return await axios
      .get(`${URL}/view-teacher-complain/${teacherID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

// Teacher Profile Settings

export const updateTeacherFullName = async (
  schoolID: string,
  staffID: string,
  staffName: string
) => {
  try {
    return await axios
      .patch(`${URL}/update-staffName/${schoolID}/${staffID}`, { staffName })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

//Update Socials

export const updateStaffFacebook = async (
  schoolID: string,
  staffID: string,
  facebookAcct: string
) => {
  try {
    return await axios
      .patch(`${URL}/update-staff-facebook/${schoolID}/${staffID}`, {
        facebookAcct,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateStaffXAcct = async (
  schoolID: string,
  staffID: string,
  xAcct: string
) => {
  try {
    return await axios
      .patch(`${URL}/update-staff-x/${schoolID}/${staffID}`, { xAcct })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateStaffInstagramAcct = async (
  schoolID: string,
  staffID: string,
  instagramAcct: string
) => {
  try {
    return await axios
      .patch(`${URL}/update-staff-instagram/${schoolID}/${staffID}`, {
        instagramAcct,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateStaffLinkinAcct = async (
  schoolID: string,
  staffID: string,
  linkedinAcct: string
) => {
  try {
    return await axios
      .patch(`${URL}/update-staff-linkedin/${schoolID}/${staffID}`, {
        linkedinAcct,
      })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    console.error();
    return error;
  }
};
//Update Socials Ends Here!

export const updateTeacherPhoneNum = async (
  schoolID: string,
  staffID: string,
  phone: string
) => {
  try {
    return await axios.patch(
      `${URL}/update-phoneNumber/${schoolID}/${staffID}`,
      { phone }
    );
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateTeacherGender = async (
  schoolID: string,
  staffID: string,
  gender: string
) => {
  try {
    return await axios.patch(
      `${URL}/update-staffgender/${schoolID}/${staffID}`,
      { gender }
    );
  } catch (error) {
    console.error();
    return error;
  }
};
export const updateTeacherAddress = async (
  schoolID: string,
  staffID: string,
  staffAddress: string
) => {
  try {
    return await axios.patch(
      `${URL}/update-staff-address/${schoolID}/${staffID}`,
      { staffAddress }
    );
  } catch (error) {
    console.error();
    return error;
  }
};

export const updateTeacherAvatar = async (teacherID: string, data: string) => {
  try {
    const config: any = {
      "Content-Type": "multipart/form-data",
    };
    return await axios
      .patch(`${URL}/upload-staff-avatar/${teacherID}`, data, config)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createGradeScore = async (
  teacherID: string,
  studentID: string,
  data: {}
) => {
  try {
    return await axios
      .post(`${URL}/create-report-card/${teacherID}/${studentID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewStudentGrade = async (studentID: string) => {
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

export const reportCardRemark = async (
  teacherID: string,
  studentID: string,
  data: any
) => {
  try {
    return await axios
      .patch(`${URL}/teacher-report-card/${teacherID}/${studentID}`, data)
      .then((res: any) => {
        console.log(res);
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewClassAcademicHistory = async (classID: string) => {
  try {
    return await axios
      .get(`${URL}/view-class-result-history/${classID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const createPurchases = async (staffID: string, data: {}) => {
  try {
    return await axios
      .post(`${URL}/teacher-purchase/${staffID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewPurchases = async (staffID: string) => {
  try {
    return await axios
      .get(`${URL}/view-teacher-purchase/${staffID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const viewTeacherLessonNote = async (staffID: string) => {
  try {
    return await axios
      .get(`${URL}/view-teacher-lesson-note/${staffID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const editTeacherLessonNote = async (
  staffID: string,
  lessonNodeID: string,
  data: any
) => {
  try {
    return await axios
      .patch(`${URL}/update-lesson-note/${staffID}/${lessonNodeID}`, data)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const assignClassMonitor = async (
  staffID: string,
  studentID: string
) => {
  try {
    return await axios
      .patch(`${URL}/assign-class-monitor/${staffID}/${studentID}`)
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};
