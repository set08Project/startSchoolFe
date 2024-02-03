import { useEffect, useState } from "react";
import { getSchoolCookie, readSchool } from "../pages/api/schoolAPIs";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../components/static/LoadingScreen";
import FirstScreen from "../pages/home/start/FirstScreen";

const MakeShift = () => {
  const [state, setState] = useState<any>({} || "" || 0);

  useEffect(() => {
    let timer = setTimeout(() => {
      getSchoolCookie().then((res: any) => {
        return readSchool(res.data).then((resp) => {
          if (resp.status === 200) {
            return setState(resp.data);
          } else if (resp?.response?.status === 404) {
            return setState(resp?.response?.status);
          }
        });
      });
      clearTimeout(timer);
    }, 1000);
  }, []);

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
