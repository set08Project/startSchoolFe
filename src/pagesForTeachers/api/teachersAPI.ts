import axios from "axios";

const URL: string = "http://localhost:2244/api";

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
