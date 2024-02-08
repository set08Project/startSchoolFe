import useSWR from "swr";
import {
  getSchoolAnncoement,
  getSchoolClassroom,
  getSchoolCookie,
  getSchoolEvent,
  readSchool,
  registerSchool,
  viewSchoolByName,
} from "../api/schoolAPIs";

export const useSchoolRegister = (reader: any) => {
  const { mutate } = useSWR("api/register-school", () => {
    registerSchool(reader);
  });

  return { mutate };
};

export const useSchool = (schoolID: string) => {
  const { data } = useSWR(`api/view-school${schoolID}`, () => {
    readSchool(schoolID);
  });

  return { data };
};

export const useSchoolCookie = () => {
  const { data: dataID } = useSWR(`api/read-school-cookie/`, () => {
    return getSchoolCookie().then((res) => {
      return res.data;
    });
  });
  return { dataID };
};

export const useSchoolData = () => {
  const { dataID } = useSchoolCookie();

  const { data, isLoading } = useSWR(`api/view-school/${dataID}`, () => {
    return readSchool(dataID!).then((res) => {
      return res.data;
    });
  });
  return { data, isLoading };
};

export const useSchoolDataByName = (schoolName: string) => {
  const { data: schoolInfo } = useSWR(`api/view-school/${schoolName}`, () => {
    return viewSchoolByName(schoolName!).then((res) => {
      return res.data;
    });
  });
  return { schoolInfo };
};

export const useSchoolClassRM = (schoolID: string) => {
  const { data: schoolClassroom } = useSWR(
    `api/view-classrooms/${schoolID}`,
    () => {
      return getSchoolClassroom(schoolID!).then((res) => {
        return res.data;
      });
    }
  );
  return { schoolClassroom };
};

export const useSchoolAnnouncement = () => {
  const { dataID } = useSchoolCookie();
  const { data: schoolAnnouncement } = useSWR(
    `api/view-announcement/${dataID}`,
    () => {
      return getSchoolAnncoement(dataID!).then((res) => {
        return res.data;
      });
    }
  );
  return { schoolAnnouncement };
};

export const useSchoolEvent = () => {
  const { dataID } = useSchoolCookie();
  const { data: schoolEvent } = useSWR(`api/view-event/${dataID}`, () => {
    return getSchoolEvent(dataID!).then((res) => {
      return res.data;
    });
  });
  return { schoolEvent };
};
