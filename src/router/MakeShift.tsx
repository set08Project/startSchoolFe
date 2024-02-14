import { useEffect, useState } from "react";
import { getSchoolCookie, readSchool } from "../pages/api/schoolAPIs";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../components/static/LoadingScreen";
import FirstScreen from "../pages/home/start/FirstScreen";
import {
  readTeacherCookie,
  viewTeacherDetail,
} from "../pagesForTeachers/api/teachersAPI";

import { useSelector } from "react-redux";

const MakeShift = () => {
  const userStatus = useSelector((state: any) => state.userStatus);
  const [state, setState] = useState<any>({} || "" || 0);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (userStatus === "school-admin") {
        getSchoolCookie().then((res: any) => {
          return readSchool(res.data).then((resp) => {
            if (resp.status === 200) {
              return setState(resp.data);
            } else if (resp?.response?.status === 404) {
              return setState(resp?.response?.status);
            }
          });
        });
      } else if (userStatus === "school-teacher") {
        readTeacherCookie().then((res: any) => {
          return viewTeacherDetail(res.data).then((resp: any) => {
            if (resp.status === 200) {
              return setState(resp.data);
            } else if (resp?.response?.status === 404) {
              return setState(resp?.response?.status);
            }
          });
        });
      }

      clearTimeout(timer);
    }, 1000);
  }, []);

  console.log("showing; ", state);

  return (
    <div>
      {Object.keys(state)?.length === 0 ? (
        <LoadingScreen />
      ) : (
        <div>
          {state?.started ? (
            <div>
              <Outlet />
            </div>
          ) : (
            <div>
              <FirstScreen />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MakeShift;
