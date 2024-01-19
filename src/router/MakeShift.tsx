import { useEffect, useState } from "react";
import { getSchoolCookie, readSchool } from "../api/schoolAPIs";
import { Outlet } from "react-router-dom";
import Step1 from "../pages/home/start/Step1";
import LoadingScreen from "../components/static/LoadingScreen";
import FirstScreen from "../pages/home/start/FirstScreen";

const MakeShift = () => {
  const [state, setState] = useState<any>({});

  useEffect(() => {
    getSchoolCookie().then((res: any) => {
      return readSchool(res.data).then((resp) => {
        return setState(resp.data);
      });
    });
  }, [state]);

  return (
    <div>
      {Object.keys(state).length === 0 ? (
        <LoadingScreen />
      ) : (
        <div>
          {state.started ? (
            <div>
              <Outlet />
            </div>
          ) : (
            <FirstScreen />
          )}
        </div>
      )}
    </div>
  );
};

export default MakeShift;
