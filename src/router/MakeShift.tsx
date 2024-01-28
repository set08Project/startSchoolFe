import { useEffect, useState } from "react";
import { getSchoolCookie, readSchool } from "../api/schoolAPIs";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "../components/static/LoadingScreen";
import FirstScreen from "../pages/home/start/FirstScreen";

const MakeShift = () => {
  const [state, setState] = useState<any>({} || "" || 0);

  useEffect(() => {
    let timer = setTimeout(() => {
      getSchoolCookie().then((res: any) => {
        return readSchool(res.data).then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            console.log("reading inside: ", state);
            return setState(resp.data);
          } else if (resp?.response?.status === 404) {
            console.log(resp?.response?.status);
            console.log("reading outside: ", state);
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

{
  /* <div>
  {state?.started ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <div>
      {state !== null ? (
        <div>
          <FirstScreen />{" "}
        </div>
      ) : (
        <div>lll</div>
      )}
    </div>
  )}
</div>; */
}
