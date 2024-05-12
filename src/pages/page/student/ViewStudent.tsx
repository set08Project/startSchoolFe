document.title = "View Students";
// import moment from "moment"
import { useDispatch } from "react-redux";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import { displayDelay, displayStudent } from "../../../global/reduxState";
import { Link, useParams } from "react-router-dom";

import crypto from "crypto";
import {
  useSchoolData,
  useSchoolStudents,
  useStudentAttendance,
} from "../../hook/useSchoolAuth";
import moment from "moment";
import { FC, useState } from "react";
import {
  verifyPayment1st,
  verifyPayment2nd,
  verifyPayment3rd,
} from "../../api/schoolAPIs";
import toast from "react-hot-toast";
import {
  useStudentCookie,
  useStudentInfo,
} from "../../../pagesForStudents/hooks/useStudentHook";
import { mutate } from "swr";
import { schoolPaymentEndPoint } from "../../../pagesForStudents/api/studentAPI";

interface iProps {
  props?: any;
  id?: string;
  data?: any;
}

const Remark: FC<iProps> = ({ id, data }) => {
  const { mainStudentAttendance } = useStudentAttendance(id!);

  let name2 = data?.studentFirstName;

  let result = mainStudentAttendance?.data?.attendance?.find((el: any) => {
    return el?.studentFirstName === name2;
  });

  let timer = Date.now();

  return (
    <div
      className={`w-[100px] border-r 
      ${
        result?.present
          ? "text-green-600"
          : result?.absent
          ? "text-red-600"
          : null
      }`}
    >
      {moment(result?.createdAt).format("ll") === moment(timer).format("ll") &&
      result?.present
        ? "Present"
        : result?.absent
        ? "Absent"
        : null}
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props?._id);

  return (
    <div>
      {(mainStudentAttendance?.data?.attendance?.filter(
        (el: any) => el.present === true
      )?.length /
        mainStudentAttendance?.data?.attendance?.length) *
      100 ? (
        <div>
          {(
            (mainStudentAttendance?.data?.attendance?.filter(
              (el: any) => el.present === true
            )?.length /
              mainStudentAttendance?.data?.attendance?.length) *
            100
          ).toFixed(2)}
          %
        </div>
      ) : (
        <p>0%</p>
      )}
    </div>
  );
};

const ViewStudent = () => {
  const dispatch = useDispatch();
  const { studentInfo } = useStudentInfo();

  const getValue = (length: number): string => {
    const alphanumericChars: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result: string = "";
    for (let i = 0; i < length; i++) {
      const randomIndex: number = Math.floor(
        Math.random() * alphanumericChars.length
      );
      result += alphanumericChars.charAt(randomIndex);
    }
    return result;
  };

  // const {} = use
  const { data: UI } = useSchoolData();
  const { students } = useSchoolStudents(UI?._id);
  const [viewstudent1stfees, setViewStudent1stFees] = useState(false);
  const [viewstudent2ndfees, setViewStudent2ndFees] = useState(false);
  const [viewstudent3rdfees, setViewStudent3rdFees] = useState(false);

  const [ID, setID] = useState<string>("");

  const handleToggleCheckbox1st = (studentID: any) => {
    setViewStudent1stFees(!viewstudent1stfees);

    verifyPayment1st(UI?._id, studentID!).then((res: any) => {
   
      if (res.status === 200) {
        schoolPaymentEndPoint(studentID, {
          date: moment(Date.now()).format("lll"),
          amount: "2000",
          purchasedID: getValue(10),
          reference: getValue(10),
        }).then((res) => {
          setID("");
          toast.success("3rd term SchoolFees has been Approved");
          mutate(`api/read-student/${UI?._id}`);
        });
      } else {
        toast.error("Fail to approve this 1st term SchoolFees");
        setID("");
      }
    });
  };

  const handleToggleCheckbox2nd = (studentID: any) => {
    setViewStudent2ndFees(!viewstudent2ndfees);

    verifyPayment2nd(UI?._id, studentID!).then((res: any) => {
      if (res.status === 200) {
        setID("");
        toast.success("2nd term SchoolFees has been Approved");
        mutate(`api/read-student/${UI?._id}`);
      } else {
        setID("");
        toast.error("Fail to approve this 2nd term SchoolFees");
      }
    });
  };

  const handleToggleCheckbox3rd = (studentID: any) => {
    setViewStudent3rdFees(!viewstudent3rdfees);

    verifyPayment3rd(UI?._id, studentID!).then((res: any) => {
      if (res.status === 200) {
        schoolPaymentEndPoint(studentID, {
          date: moment(Date.now()).format("lll"),
          amount: "2000",
          purchasedID: crypto.randomBytes(3).toString("hex"),
          reference: crypto.randomBytes(3).toString("hex"),
        }).then(() => {
          setID("");
          toast.success("3rd term SchoolFees has been Approved");
          mutate(`api/read-student/${UI?._id}`);
        });
      } else {
        setID("");
        toast.error("Fail to approve this 3rd term SchoolFees");
      }
    });
  };

  const handleDisplayStaff = () => {
    if (!document.startViewTransition) {
      dispatch(displayStudent(true));
      dispatch(displayDelay(true));
    } else {
      document.startViewTransition(() => {
        dispatch(displayDelay(true));
        dispatch(displayStudent(true));
      });
    }
  };

  return (
    <div className="">
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={"viewing all Students"} />

      <div className="mt-10" />

      <div className="flex w-full justify-end">
        <Button
          name="Add a new Student"
          className="uppercase text-[12px] font-medium bg-blue-950 py-4 px-8 hover:bg-blue-900 cursor-pointer transition-all duration-300 "
          onClick={handleDisplayStaff}
        />
      </div>
      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
        <div className="text-[gray] w-[1920px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[130px] border-r">Reg. Date</div>
          <div className="w-[100px] border-r">Today's Attendance</div>
          <div className="w-[100px] border-r">Student's Attendance Ratio</div>
          <div className="w-[220px] border-r">Session Fee</div>

          <div className="w-[150px] border-r">student Image</div>
          <div className="w-[200px] border-r">student Name</div>

          <div className="w-[100px] border-r">student Class</div>

          <div className="w-[150px] border-r">Parent Contact</div>
          <div className="w-[200px] border-r">Address </div>

          <div className="w-[200px] border-r">Performance Ratio</div>

          <div className="w-[80px] border-r">Rate</div>
          <div className="w-[180px] border-r">View Detail</div>
        </div>

        <div className=" w-[1920px] overflow-hidden">
          {students?.data?.students?.length > 0 ? (
            <div>
              {students?.data?.students?.map((props: any, i: number) => (
                <div>
                  <div>
                    <div
                      key={props}
                      className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
                        i % 2 === 0 ? "bg-slate-50" : "bg-white"
                      }`}
                    >
                      <div className="w-[130px] border-r">
                        {moment(props?.createdAt).format("ll")}
                      </div>

                      <Remark data={props} id={props?._id} />

                      <div className="w-[100px] border-r">
                        <AttendanceRatio props={props} />
                      </div>

                      <div className="w-[220px] border-r flex gap-4">
                        <div className="flex flex-col items-center">
                          <label>1st Term</label>

                          <label htmlFor="my_modal_6 relative ">
                            <label
                              htmlFor="my_modal_6"
                              // className={`btn text-[12px] font-medium text-white `}
                            >
                              <label
                                htmlFor="my_modal_6"
                                className="absolute z-80 bg-transparent hover:bg-transparent border-0 btn"
                                onClick={() => {
                                  setID(props?._id);
                                }}
                              />
                              <input
                                type="checkbox"
                                className={`
                                -z-20
                            toggle toggle-sm mt-2  ${
                              props?.feesPaid1st
                                ? "bg-blue-950 border-blue-950"
                                : "bg-neutral-500 border-neutral-500"
                            }
                            `}
                                onChange={() => {}}
                                checked={props?.feesPaid1st}
                              />
                            </label>

                            {/* Put this part before </body> tag */}
                            <input
                              type="checkbox"
                              id="my_modal_6"
                              className="modal-toggle"
                            />
                            <div className="modal" role="dialog">
                              <div className="modal-box">
                                <h3 className="font-bold text-lg">
                                  Confirm this payment
                                </h3>
                                <p className="py-4">
                                  Are you sure you want to confirm this payment?
                                  <br />
                                </p>
                                <div className="modal-action">
                                  <label
                                    htmlFor="my_modal_6"
                                    className="btn px-8 bg-green-500 text-white hover:bg-green-600 "
                                    onClick={() => {
                                      handleToggleCheckbox1st(ID);
                                    }}
                                  >
                                    Yes
                                  </label>

                                  <label
                                    htmlFor="my_modal_6"
                                    className="btn px-8 bg-red-500 text-white hover:bg-red-600 "
                                    onClick={() => {}}
                                  >
                                    No
                                  </label>
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>

                        <div className="flex flex-col items-center">
                          <label>2nd Term</label>

                          <label htmlFor="my_modal_6 relative ">
                            <label htmlFor="my_modal_6">
                              <label
                                htmlFor="my_modal_6"
                                className="absolute z-80 bg-transparent hover:bg-transparent border-0 btn"
                                onClick={() => {
                                  setID(props?._id);
                                }}
                              />
                              <input
                                type="checkbox"
                                className={`
                                -z-20
                            toggle toggle-sm mt-2  ${
                              props?.feesPaid2nd
                                ? "bg-blue-950 border-blue-950"
                                : "bg-neutral-500 border-neutral-500"
                            }
                            `}
                                onChange={() => {}}
                                checked={props?.feesPaid2nd}
                              />
                            </label>

                            {/* Put this part before </body> tag */}
                            <input
                              type="checkbox"
                              id="my_modal_6"
                              className="modal-toggle"
                            />
                            <div className="modal" role="dialog">
                              <div className="modal-box">
                                <h3 className="font-bold text-lg">
                                  Confirm 2nd Term school-fees payment
                                </h3>
                                <p className="py-4">
                                  Are you sure you want to confirm this payment?
                                  <br />
                                </p>
                                <div className="modal-action">
                                  <label
                                    htmlFor="my_modal_6"
                                    className="btn px-8 bg-green-500 text-white hover:bg-green-600 "
                                    onClick={() => {
                                      handleToggleCheckbox2nd(ID);
                                    }}
                                  >
                                    Yes
                                  </label>

                                  <label
                                    htmlFor="my_modal_6"
                                    className="btn px-8 bg-red-500 text-white hover:bg-red-600 "
                                    onClick={() => {}}
                                  >
                                    No
                                  </label>
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>
                        <div className="flex flex-col items-center">
                          <label>3rd Term</label>
                          {/* <input
                            type="checkbox"
                            className={`
                            toggle toggle-sm mt-2  ${
                              props?.feesPaid3rd
                                ? "bg-blue-950 border-blue-950"
                                : "bg-neutral-500 border-neutral-500"
                            }
                            `}
                            onChange={() => handleToggleCheckbox3rd(props?._id)}
                            checked={props?.feesPaid4rd}
                          /> */}

                          <label htmlFor="my_modal_6 relative ">
                            <label htmlFor="my_modal_6">
                              <label
                                htmlFor="my_modal_6"
                                className="absolute z-80 bg-transparent hover:bg-transparent border-0 btn"
                                onClick={() => {
                                  setID(props?._id);
                                }}
                              />
                              <input
                                type="checkbox"
                                className={`
                                -z-20
                            toggle toggle-sm mt-2  ${
                              props?.feesPaid3rd
                                ? "bg-blue-950 border-blue-950"
                                : "bg-neutral-500 border-neutral-500"
                            }
                            `}
                                onChange={() => {}}
                                checked={props?.feesPaid4rd}
                              />
                            </label>

                            {/* Put this part before </body> tag */}
                            <input
                              type="checkbox"
                              id="my_modal_6"
                              className="modal-toggle"
                            />
                            <div className="modal" role="dialog">
                              <div className="modal-box">
                                <h3 className="font-bold text-lg">
                                  Confirm 3rd Term school-fees payment
                                </h3>
                                <p className="py-4">
                                  Are you sure you want to confirm this payment?
                                  <br />
                                </p>
                                <div className="modal-action">
                                  <label
                                    htmlFor="my_modal_6"
                                    className="btn px-8 bg-green-500 text-white hover:bg-green-600 "
                                    onClick={() => {
                                      handleToggleCheckbox3rd(ID);
                                    }}
                                  >
                                    Yes
                                  </label>

                                  <label
                                    htmlFor="my_modal_6"
                                    className="btn px-8 bg-red-500 text-white hover:bg-red-600 "
                                    onClick={() => {}}
                                  >
                                    No
                                  </label>
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* name */}
                      <div className="w-[150px] flex justify-center border-r">
                        <img
                          className="w-14 h-14 rounded-md border object-cover"
                          src={props?.avtar ? props?.avatar : pix}
                        />
                      </div>
                      <div className="w-[200px] border-r gap-2 font-bold">
                        {props?.studentFirstName} {props?.studentLastName}
                      </div>

                      <div className="w-[100px] border-r  ">
                        {props?.classAssigned}
                      </div>
                      <div className="w-[150px] border-r  ">
                        {props?.phone ? props?.phone : "Not yet Added"}
                      </div>
                      <div className="w-[200px] border-r  ">
                        {props?.studentAddress
                          ? props?.studentAddress
                          : "Not yet Added"}
                      </div>
                      <div className="w-[200px] border-r  ">
                        {props?.totalPerformance
                          ? props?.totalPerformance
                          : "0"}
                      </div>

                      <div className="w-[80px] border-r">3 of 5</div>

                      <Link
                        to={`student-details/${props?._id}`}
                        className="w-[180px] border-r"
                      >
                        <Button
                          name="View Detail"
                          className="py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
                          onClick={() => {}}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No student yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
