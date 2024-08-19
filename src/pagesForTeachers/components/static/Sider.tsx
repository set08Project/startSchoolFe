import {
  MdArticle,
  MdBadge,
  MdPeople,
  MdQueryStats,
  MdReport,
  MdSchool,
  MdSettings,
} from "react-icons/md";
import { Link, NavLink, useParams } from "react-router-dom";
import Button from "../reUse/Button";
import { FaBarsProgress, FaPhotoFilm, FaStore } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMenuState,
  displayDelay,
  displayStaffComp,
} from "../../../global/reduxState";
import pix from "../../../assets/pix.jpg";
import Tooltip from "./Tooltip";
import { useSchoolAnnouncement, useTeacherInfo } from "../../hooks/useTeacher";
import {
  useSchool,
  useSchoolCookie,
  useSchoolData,
  useSchoolSessionData,
} from "../../../pages/hook/useSchoolAuth";
import ClipLoader from "react-spinners/ClipLoader";
import { readSchool } from "../../../pages/api/schoolAPIs";
import { useEffect, useState } from "react";
import SecondaryScreen from "./SecondaryScreen";
import Primary from "./Primary";

const Sider = () => {
  const dispatch = useDispatch();
  const toggleImage = useSelector((state: any) => state.imageToggle);
  const showing = useSelector((state: any) => state.showStaffComp);
  const { teacherInfo } = useTeacherInfo();
  const { schoolInfo } = useSchoolSessionData(teacherInfo?.schoolIDs);
  const user = useSelector((state: any) => state.schoolInfo);

  const [schoolData, setSchoolData] = useState(null);

  useEffect(() => {
    const fetchSchoolData = async () => {
      if (teacherInfo?.schoolIDs) {
        try {
          const data = await readSchool(teacherInfo.schoolIDs);

          setSchoolData(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchSchoolData();
  }, [teacherInfo?.schoolIDs]);

  const { schoolAnnouncement } = useSchoolAnnouncement(teacherInfo?.schoolIDs);

  return (
    <div className="overflow-y-auto w-full border-r bg-white text-blue-900 flex flex-col text-[15px]">
      <div className="w-full flex px-2 mt-6 ">
        <div className=" w-16 h-16 object-cover flex border rounded-full items-center justify-center ">
          <div className=" w-16 h-16 object-cover flex border rounded-full items-center justify-center ">
            {toggleImage ? (
              <div className="flex justify-center items-center w-full h-full object-cover rounded-full border">
                <ClipLoader size={20} color="#172554" />
              </div>
            ) : (
              <img
                className="w-full h-full object-cover rounded-full border"
                src={teacherInfo?.avatar ? teacherInfo?.avatar : pix}
              />
            )}
          </div>
        </div>
        <div className="ml-2">
          {/* TODO: Add tooltip */}
          <p className="break-words font-bold">
            {teacherInfo?.schoolName.length > 16 ? (
              <p>{schoolAnnouncement?.schoolName.substring(0, 16)}...</p>
            ) : (
              // <Tooltip tip={schoolAnnouncement?.schoolName}>
              // </Tooltip>
              schoolAnnouncement?.schoolName
            )}
          </p>
          <p className="break-words font-medium text-slate-400 text-[14px] mt-2">
            ID: {teacherInfo?.enrollmentID}
          </p>
          <p className="break-words font-medium text-slate-400  text-[14px] -mt-1">
            Session:{" "}
            <span>
              {schoolAnnouncement && schoolAnnouncement?.presentSession}
            </span>
          </p>
          <p className="break-words font-medium text-[12px] my-2 -mt-1">
            Term:{" "}
            <span className="text-[12px]">
              {schoolAnnouncement && schoolAnnouncement?.presentTerm}
            </span>
          </p>
          <div className="text-[12px] font-bold">
            {teacherInfo?.staffName?.length > 16
              ? `${teacherInfo?.staffName.substring(0, 16)}...`
              : teacherInfo?.staffName}
          </div>
        </div>
      </div>

      {/* top box */}

      <div className="mt-10 px-2 text- center flex flex-col border mx-2 rounded-md py-4">
        <div className="mb-4 text-[13px] font-medium ">
          Mark students Attendance with the Button below{" "}
        </div>
        <div className="flex w-full justify-center">
          {/* <NavLink to="upgrade"> */}
          <Link to="/attendance">
            <Button
              name="Attendance"
              className="bg-black text-white border-none font-medium py-4 px-9 leading-tight"
              onClick={() => {
                // handleDisplayStaff();
              }}
            />
          </Link>

          {/* </NavLink> */}
        </div>
      </div>

      {/* top box */}

      {/* Settings */}
      <div>
        {schoolData?.data?.schoolTags[0].val === "Secondary School." ? (
          <SecondaryScreen />
        ) : (
          <Primary />
        )}
      </div>
    </div>
  );
};

export default Sider;
