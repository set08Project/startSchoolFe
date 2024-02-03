import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { getSchoolCookie, readSchool } from "../api/schoolAPIs";
import { Outlet } from "react-router-dom";

export const UseRouter: FC<PropsWithChildren> = ({ children }) => {
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
          <Outlet />
        </div>
      ) : state.status === "school-teacher" ? (
        <div>
          <Outlet />{" "}
        </div>
      ) : state.status === "school-student" ? (
        <div>
          <Outlet />
        </div>
      ) : null}
    </div>
  );
};
