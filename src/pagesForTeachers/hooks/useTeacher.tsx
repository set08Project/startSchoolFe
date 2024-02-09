import useSWR from "swr";
import { useSchoolCookie } from "../../pages/hook/useSchoolAuth";
import { viewTeacherDetail } from "../api/teachersAPI";

export const useTeacherDetail = (teacherID: string) => {
  const { data: teacherDetail } = useSWR(
    `api/view-teacher-detail/${teacherID}`,
    () => {
      return viewTeacherDetail(teacherID!).then((res) => {
        return res.data;
      });
    }
  );
  return { teacherDetail };
};

export const useTeacherInfo = () => {
  const { dataID } = useSchoolCookie();

  const { data: teacherInfo } = useSWR(
    `api/view-teacher-detail/${dataID}`,
    () => {
      return viewTeacherDetail(dataID!).then((res) => {
        return res.data;
      });
    }
  );
  return { teacherInfo };
};
