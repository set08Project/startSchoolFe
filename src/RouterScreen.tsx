import React, { useEffect, useState } from "react";
import { getSchoolCookie, readSchool } from "./api/schoolAPIs";
import { RouterProvider } from "react-router-dom";
import { adminRouter } from "./router/adminRouter";
import { mainRouter } from "./router/mainRouter";
import { ErrorBoundary } from "react-error-boundary";
import LoadingScreen from "./components/static/LoadingScreen";

const RouterScreen = () => {
  const [state, setState] = useState<any>({} || "" || 0);

  useEffect(() => {
    let timer = setTimeout(() => {
      getSchoolCookie().then((res: any) => {
        return readSchool(res.data).then((resp) => {
          if (resp.status === 200) {
            return setState(resp.data);
          } else if (resp?.response?.status === 404) {
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
      {state.status === "school-admin" ? (
        <div>
          {/*  */}
          <RouterProvider router={adminRouter} />
          {/* <div>Add</div> */}
        </div>
      ) : (
        <RouterProvider router={mainRouter} />
      )}
    </div>
  );
};

export default RouterScreen;
{
  /* <RouterProvider router={adminRouter} /> */
}
{
  /* <RouterProvider router={mainRouter} /> */
}
