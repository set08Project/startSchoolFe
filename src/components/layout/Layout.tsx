import { Outlet } from "react-router-dom";
import Header from "../static/Header";
import Sider from "../static/Sider";
import { useSelector } from "react-redux";
import AddNewStaff from "../../pages/staff/AddNewStaff";
import { FC } from "react";
import AddNewStudent from "../../pages/student/AddNewStudent";
import AddSession from "../static/AddSession";

const Layout: FC = () => {
  const show = useSelector((state: any) => state.showStaffComp);
  const showII = useSelector((state: any) => state.showStudent);
  const showIII = useSelector((state: any) => state.sessionToggle);

  return (
    <div className="flex w-[100%]">
      <div className="md:flex w-[250px] h-[100vh] fixed hidden  transition-all duration-300 z-50">
        <Sider />
      </div>

      <div className="flex w-[calc(100%)] justify-end">
        <div className="flex flex-col w-[100%] transition-all duration-300 md:w-[calc(100%-250px)] justify-end">
          <Header />
          <div
            className={`min-h-[calc(100vh-72px)] p-4 m-2 border rounded-md mt-16 relative `}
            onClick={() => {
              // dispatch(changeToggleToFalse());
            }}
          >
            <Outlet />

            {show && (
              //   <div className="relative  ">
              <div
                className="-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden"
                style={{
                  background: "rgba(73, 154, 255, 0.2)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(73, 154, 255, 0.3)",
                }}
              >
                <AddNewStaff />
              </div>
            )}

            {showII && (
              //   <div className="relative  ">
              <div
                className="-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden"
                style={{
                  background: "rgba(73, 154, 255, 0.2)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(73, 154, 255, 0.3)",
                }}
              >
                <AddNewStudent />
              </div>
            )}

            {showIII && (
              <div
                className="-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden"
                style={{
                  background: "rgba(73, 154, 255, 0.2)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(73, 154, 255, 0.3)",
                }}
              >
                <AddSession />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
