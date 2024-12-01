import {
  MdPeople,
  MdQueryStats,
  MdReport,
  MdSchool,
  MdSettings,
  MdSignalCellularAlt,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import {
  FaBarsProgress,
  FaNoteSticky,
  FaSchool,
  FaSchoolFlag,
  FaStore,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuState, changeStarting } from "../../global/reduxState";

import { FaPhotoVideo } from "react-icons/fa";
import { useEffect, useState } from "react";

const SecondaryAdminScreen = () => {
  const dispatch = useDispatch();

  const starting = useSelector((state: any) => state.starting);
  const [start, setStart] = useState<string>("");
  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(changeMenuState(false));
    } else {
      document.startViewTransition(() => {
        dispatch(changeMenuState(false));
      });
    }
  };
  return (
    <div>
      <div>
        <div className="my-5 mx-4">
          <hr />
        </div>
        <div className="px-2 flex flex-col h-[90%]">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
                : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
            }
            onClick={handleToggleMenuFalse}
          >
            Dashboard
            <MdQueryStats />
          </NavLink>
          <NavLink
            to="/view-staff"
            className={({ isActive }) =>
              isActive
                ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
                : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
            }
            onClick={handleToggleMenuFalse}
          >
            View Staff
            <MdPeople />
          </NavLink>
          <NavLink
            to="/view-students"
            className={({ isActive }) =>
              isActive
                ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
                : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
            }
            onClick={handleToggleMenuFalse}
          >
            View Students
            <FaBarsProgress />
          </NavLink>
          <NavLink
            to="/class-room"
            className={({ isActive }) =>
              isActive
                ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
                : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
            }
            onClick={handleToggleMenuFalse}
          >
            View Classrooms
            <FaSchool />
          </NavLink>

          <NavLink
            to="/subjects"
            className={({ isActive }) =>
              isActive
                ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
                : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
            }
            onClick={handleToggleMenuFalse}
          >
            View Subjects
            <MdSchool />
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive
                ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
                : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
            }
            onClick={handleToggleMenuFalse}
          >
            Complains
            <MdReport />
          </NavLink>
          <NavLink
            to="/lesson-note"
            className={({ isActive }) =>
              isActive
                ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
                : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
            }
            onClick={handleToggleMenuFalse}
          >
            Lesson Note
            <FaNoteSticky />
          </NavLink>
          <NavLink
            to="/schemes"
            className={({ isActive }) =>
              isActive
                ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
                : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
            }
            onClick={handleToggleMenuFalse}
          >
            Scheme Of Work
            <FaSchoolFlag />
          </NavLink>

          <NavLink
            to="/view-gallery"
            className={({ isActive }) =>
              isActive
                ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
                : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
            }
            onClick={handleToggleMenuFalse}
          >
            Gallery
            <FaPhotoVideo />
          </NavLink>

          <NavLink
            to="/store"
            className={({ isActive }) =>
              isActive
                ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
                : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
            }
            onClick={handleToggleMenuFalse}
          >
            Store
            <FaStore />
          </NavLink>
          {/* <NavLink
          to="/result-history"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
          }
          onClick={handleToggleMenuFalse}
        >
          Result History
          <MdSignalCellularAlt />
        </NavLink> */}
          <NavLink
            to="/result-history/"
            className={({ isActive }) =>
              isActive
                ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
                : "duration-500 transition-all p-2 rounded-sm hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[3px] flex items-center justify-between "
            }
            onClick={handleToggleMenuFalse}
          >
            Operation History
            <MdSignalCellularAlt />
          </NavLink>

          <div className="flex-1" />

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "mt-10 duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[4px] flex items-center justify-between "
                : "mt-10 duration-500 transition-all p-2 rounded-sm  flex items-center justify-between hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[4px]"
            }
            onClick={handleToggleMenuFalse}
          >
            Settings
            <MdSettings />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SecondaryAdminScreen;
