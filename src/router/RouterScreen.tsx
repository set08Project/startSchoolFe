import { useEffect, useState } from "react";
import { getSchoolCookie, readSchool } from "../pages/api/schoolAPIs";
import { RouterProvider } from "react-router-dom";
import { adminRouter } from "./adminRouter";
import { mainRouter } from "./mainRouter";
import { teacherRouter } from "./teacherRouter";
import { studentRouter } from "./studentRouter";

const RouterScreen = () => {
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
    });
  }, []);
  return (
    <div>
      {state.status === "school-admin" ? (
        <div>
          <RouterProvider router={adminRouter} />
        </div>
      ) : state.status === "school-teacher" ? (
        <div>
          <RouterProvider router={teacherRouter} />
        </div>
      ) : state.status === "school-student" ? (
        <div>
          <RouterProvider router={studentRouter} />
        </div>
      ) : state?.status === "" ? (
        <RouterProvider router={mainRouter} />
      ) : null}
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
