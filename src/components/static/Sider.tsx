import { MdPeople, MdQueryStats, MdReport, MdSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Button from "../reUse/Button";
import { FaBarsProgress } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMenuState,
  displayDelay,
  displayStaffComp,
} from "../../global/reduxState";
import { useSchoolData } from "../../hook/useSchoolAuth";
import pix from "../../assets/pix.jpg";

const Sider = () => {
  const dispatch = useDispatch();
  const toggleText = useSelector((state: any) => state.toggleText);
  const showing = useSelector((state: any) => state.showStaffComp);
  const { data } = useSchoolData();

  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(changeMenuState(false));
    } else {
      document.startViewTransition(() => {
        dispatch(changeMenuState(false));
      });
    }
  };

  const handleDisplayStaff = () => {
    if (!document.startViewTransition) {
      dispatch(displayStaffComp(!showing));
      dispatch(displayDelay(showing));
    } else {
      document.startViewTransition(() => {
        dispatch(displayDelay(!showing));

        if (showing === true) {
          const timer = setTimeout(() => {
            clearTimeout(timer);
            dispatch(displayStaffComp(!showing));
          }, 500);
        } else {
          dispatch(displayStaffComp(!showing));
        }
      });
    }
  };

  return (
    <div className="w-full border-r bg-white text-blue-900 flex flex-col ">
      <div className="w-full flex px-2 mt-6 ">
        <div className=" w-16 h-16 object-cover flex border rounded-full items-center justify-center ">
          <img
            className="w-full h-full object-cover rounded-full border"
            src={data?.logo ? data?.logo : pix}
          />
        </div>
        <div className="ml-2">
          {/* TODO: Add tooltip */}
          <p className="break-words font-bold">
            {data?.schoolName.length > 16
              ? `${data?.schoolName.substring(0, 16)}...`
              : data?.schoolName}
          </p>
          <p className="break-words font-medium text-slate-400 text-[14px] mt-2">
            ID: {data?.enrollmentID}
          </p>
          <p className="break-words font-medium text-slate-400  text-[14px] -mt-1">
            Session: 2023/2024
          </p>
        </div>
      </div>

      {/* top box */}

      {/* top box */}
      <div className="mt-20 px-2 text-center flex flex-col border mx-2 rounded-md py-4">
        <div className="mb-4 text-[18px] font-medium">
          You are currently on an{" "}
        </div>
        <div className="flex w-full justify-center">
          {/* <NavLink to="upgrade"> */}

          <Button
            name="Add a staff"
            className="bg-black text-white border-none font-medium  leading-tight"
            onClick={() => {
              handleDisplayStaff();
            }}
          />

          {/* </NavLink> */}
        </div>
      </div>

      {/* Nav Links */}
      <div className="w-full flex justify-center">
        <div className="transition-all duration-300 text-center text-[12px] font-medium mt-3 w-[90%] ">
          {toggleText ? (
            <div>A new member has been added to your family list</div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {/* Settings */}
      <div className="mt-16 px-2 flex flex-col h-[90%]">
        <NavLink
          to="/"
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
          View Staffs
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
          View Studients
          <FaBarsProgress />
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
          Reports
          <MdReport />
        </NavLink>

        <div className="flex-1" />

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "duration-500 transition-all p-2 rounded-sm bg-blue-100 text-black cursor-pointer font-medium my-[4px] flex items-center justify-between "
              : "duration-500 transition-all p-2 rounded-sm  flex items-center justify-between hover:bg-blue-100 hover:text-black cursor-pointer font-medium my-[4px]"
          }
          onClick={handleToggleMenuFalse}
        >
          Settings
          <MdSettings />
        </NavLink>
      </div>
    </div>
  );
};

export default Sider;
