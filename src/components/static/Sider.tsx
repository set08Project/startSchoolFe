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
  FaStore,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuState, changeStarting } from "../../global/reduxState";
import {
  useSchoolData,
  useSchoolSessionData,
  useViewTermDetail,
} from "../../pages/hook/useSchoolAuth";
import pix from "../../assets/pix.jpg";
import Tooltip from "./Tooltip";
import StoreScreen from "./StoreScreen";
import { FaPhotoVideo } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import { makePayment } from "../../pages/api/schoolAPIs";
import Button from "../reUse/Button";
import PrimaryAdminScreen from "./PrimaryAdminScreen";
import SecondaryAdminScreen from "./SecondaryAdminScreen";

const Sider = () => {
  const dispatch = useDispatch();
  const toggleImage = useSelector((state: any) => state.imageToggle);
  const starting = useSelector((state: any) => state.starting);
  const user = useSelector((state: any) => state.user);
  const [start, setStart] = useState<string>("");

  const [roll, setRoll] = useState<Boolean>(false);

  const { data } = useSchoolData();

  const { schoolInfo, loading }: any = useSchoolSessionData(user.id);

  let refID = schoolInfo;

  let obj: any = {};

  if (refID?.length > 0) {
    for (let i = 0; i < refID.length; i++) {
      obj = refID[0];
    }
  }

  let termID: string = "";

  if (obj !== null) {
    for (let i = 0; i < obj?.term?.reverse().length; i++) {
      termID = obj?.term[0];
    }
  }

  const { termData } = useViewTermDetail(termID);

  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(changeMenuState(false));
    } else {
      document.startViewTransition(() => {
        dispatch(changeMenuState(false));
      });
    }
  };

  let term = [];
  useEffect(() => {
    if (schoolInfo?.length === 1 || schoolInfo?.length === 0) {
      for (let i = 0; i < schoolInfo?.length; i++) {
        term = schoolInfo[i].term;
      }

      if (term?.length === 1) {
        dispatch(changeStarting(true));
      } else {
        dispatch(changeStarting(false));
      }
    } else {
      dispatch(changeStarting(false));
    }
  }, []);
  console.log("first", data?.schoolTags[0].val);

  return (
    <div className="overflow-y-auto min-h-[100vh] w-full border-r bg-white text-blue-900 flex flex-col ">
      <div className="w-full flex px-2 mt-6 ">
        <div className=" w-16 h-16 object-cover flex border rounded-full items-center justify-center ">
          {toggleImage ? (
            <div className="flex justify-center items-center w-full h-full object-cover rounded-full border">
              <ClipLoader size={20} color="#172554" />
            </div>
          ) : (
            <img
              className="w-full h-full object-cover rounded-full border"
              src={data?.avatar ? data?.avatar : pix}
            />
          )}
        </div>
        <div className="ml-2">
          {/* TODO: Add tooltip */}
          <div className="break-words font-bold text-[16px]">
            {data?.schoolName.length > 15 ? (
              <p>{data?.schoolName.substring(0, 15)}...</p>
            ) : (
              // <Tooltip side={true} tip={data?.schoolName}>
              // </Tooltip>
              data?.schoolName
            )}
          </div>
          <p className="break-words font-medium text-slate-400 text-[14px] mt-2">
            ID: {data?.enrollmentID}
          </p>
          <p className="break-words font-medium text-slate-400  text-[14px] -mt-1">
            Session: {loading ? "" : data?.presentSession}
          </p>

          <p className="text-[12px] font-bold">
            Term: {/* *************here***************** */}
            {loading ? (
              ""
            ) : data?.presentTerm ? (
              data?.presentTerm
            ) : (
              <span className="text-red-400 ml-1">Please create TERM</span>
            )}
          </p>

          {/* PICK */}

          {data?.freeMode ? (
            <div className="mt-3 px-1 text-center flex flex-col border mx-0 rounded-md py-1 bg-blue-50">
              <div className="mb-2 text-[12px] text-left font-medium w-[125px]">
                You are seeing this, because you are on your First Free Term
                Mode.
                <br />
                <p className="mt-1 font-bold">Thank you for coming on board!</p>
              </div>
            </div>
          ) : (
            <div>
              {!termData?.plan && termData?.payRef === "" && (
                <Button
                  name={
                    roll ? (
                      <span className="ml-3">Processing...</span>
                    ) : (
                      "Renew Plan"
                    )
                  }
                  icon={
                    roll && (
                      <ClipLoader
                        size={10}
                        color="white"
                        className="absolute -mt-1 ml-1"
                      />
                    )
                  }
                  className="text-[14px] w-full uppercase px-0 pr-2 font-bold bg-red-500 ml-0"
                  onClick={() => {
                    setRoll(true);
                    makePayment(user?.id, data?.email)
                      .then((res: any) => {
                        if (res?.data?.status === 201) {
                          location.replace(
                            res?.data?.data?.data?.authorization_url
                          );
                        }
                      })
                      .then(() => {
                        setRoll(false);
                      });
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* top box */}

      {/* top box */}
      <div className="mt-20 px-2 text-center flex flex-col border mx-2 rounded-md py-4">
        <div className="mb-4 text-[13px] font-medium ">
          Encourage Parents to Purchase Learning Materials for thier child by
          having more items in your Library Store{" "}
        </div>
        <div className="flex w-full justify-center">
          <StoreScreen />
        </div>
      </div>

      <div>
        {data?.schoolTags[0].val === "Secondary School." ? (
          <SecondaryAdminScreen />
        ) : (
          <PrimaryAdminScreen />
        )}
      </div>
    </div>
  );
};

export default Sider;
