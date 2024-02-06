import { Outlet } from "react-router-dom";
import Header from "../static/Header";
import Sider from "../static/Sider";
import { useDispatch, useSelector } from "react-redux";
import AddNewStaff from "../../pages/page/staff/AddNewStaff";
import { FC, useState } from "react";
import AddNewStudent from "../../pages/page/student/AddNewStudent";
import AddSession from "../static/AddSession";
import AddAnyItem from "../static/AddAnyItems";
import { displayClass } from "../../global/reduxState";
import {
  createSchoolClassroom,
  createSchoolSubject,
} from "../../pages/api/schoolAPIs";
import toast from "react-hot-toast";
import { useSchoolData } from "../../pages/hook/useSchoolAuth";

const Layout: FC = () => {
  const { data } = useSchoolData();
  const show = useSelector((state: any) => state.showStaffComp);
  const showII = useSelector((state: any) => state.showStudent);

  const classroom = useSelector((state: any) => state.classroomToggled);
  const dispatch = useDispatch();

  const [classRM, setClassRM] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDisplaySubjectOff = () => {
    if (!document.startViewTransition) {
      dispatch(displayClass(false));
    } else {
      document.startViewTransition(() => {
        dispatch(displayClass(false));
      });
    }
  };

  //createSchoolClassroom

  const handleCreateClassRoom = () => {
    try {
      setLoading(true);
      createSchoolClassroom(data._id, {
        className: classRM,
      }).then((res: any) => {
        if (res.status === 201) {
          setLoading(false);
          handleDisplaySubjectOff();
        } else {
          setLoading(false);
          toast.error(`${res.response.data.message}`);
          console.log(res);
        }
      });
    } catch (error) {
      return error;
    }
  };

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

            {classroom && (
              <div
                className="-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden"
                style={{
                  background: "rgba(73, 154, 255, 0.2)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(73, 154, 255, 0.3)",
                }}
              >
                <AddAnyItem
                  titleCall="Creating new classroom"
                  offFn={handleDisplaySubjectOff}
                  text="Place the name this would be generally called accross the life-span of the school's existance!"
                  placeStart="JSS 1A"
                  placeEnd="JSS 1A"
                  startTitle="Enter Class Name"
                  endTitle="Class Assigned"
                  // setEnd={setClassAssigned}
                  setStart={setClassRM}
                  start={classRM}
                  // end={classAssigned}
                  handleFn={handleCreateClassRoom}
                  loading={loading}
                  // setLoading={setLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
