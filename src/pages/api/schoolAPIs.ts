import axios from "axios";

const URL: string = "http://localhost:2244/api";

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
      .post(`${URL}/login-school`, data, { withCredentials: true })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getSchoolCookie = async () => {
  try {
    return await axios
      .get(`${URL}/read-school-cookie`, { withCredentials: true })
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
      .delete(`${URL}/logout-school`, { withCredentials: true })
      .then((res: any) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const openServerAPI = async () => {
  try {
    return await axios.get(`http://localhost:2244/`).then((res: any) => {
      return res?.message;
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
