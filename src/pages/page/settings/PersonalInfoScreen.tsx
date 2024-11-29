import { useState } from "react";
import Input from "../../../components/reUse/Input";
import Button from "../../../components/reUse/Button";
import { MdSave } from "react-icons/md";
import BeatLoader from "react-spinners/ClipLoader";
import { useSchoolCookie, useSchoolData } from "../../hook/useSchoolAuth";
import {
  changeSchoolName,
  changeSchoolPersonalName,
  changeSchoolPhone,
  deleteAllStudent,
  updateSchoolSignature,
} from "../../api/schoolAPIs";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const PersonalInfoScreen = () => {
  const { data } = useSchoolData();
  const schoolID = useSchoolCookie().dataID;

  const [spin, setSpin] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [popup, setPopup] = useState<string | null>(null);
  const [changeText, setchangeText] = useState<boolean>(false);

  const [toggle, setToggle] = useState<boolean>(false);
  const [toggle1, setToggle1] = useState<boolean>(false);
  const [toggle2, setToggle2] = useState<boolean>(false);
  const [toggle3, setToggle3] = useState<boolean>(false);

  const [loadingData, setLoadingData] = useState<boolean>(false);

  const [signature, setSignature] = useState<string>("");

  const [firstName, setFirstName] = useState<string>(
    `${data?.name ? data?.name : ""}`
  );
  const [lastName, setLastName] = useState<string>(
    `${data?.name2 ? data?.name2 : ""}`
  );

  const [phone, setPhone] = useState<string>(
    `${data?.phone ? data?.phone : ""}`
  );

  const onToggle = () => {
    if (!document.startViewTransition) {
      setToggle(!toggle);
      setToggle2(false);
    } else {
      document.startViewTransition(() => {
        setToggle2(false);
        setToggle(!toggle);
      });
    }
  };

  const onToggle1 = () => {
    if (!document.startViewTransition) {
      setToggle1(!toggle1);
      setToggle2(false);
    } else {
      document.startViewTransition(() => {
        setToggle1(!toggle1);
        setToggle2(false);
      });
    }
  };

  const onToggle2 = () => {
    if (!document.startViewTransition) {
      setToggle2(!toggle2);
      setToggle(false);
    } else {
      document.startViewTransition(() => {
        setToggle2(!toggle2);
        setToggle(false);
      });
    }
  };

  const onToggle3 = () => {
    if (!document.startViewTransition) {
      setToggle3(!toggle3);
      setToggle(false);
    } else {
      document.startViewTransition(() => {
        setToggle3(!toggle3);
        setToggle(false);
      });
    }
  };

  const handleDeleteAllStudents = () => {
    setSpin(true);
    setTimeout(() => {
      try {
        deleteAllStudent(schoolID).then((res) => {
          if (res.status === 200) {
            if (res?.data?.length < 1) {
              toast.error("There Are No Students Registered");
              return res.data;
            } else {
              toast.success("All Student Has Been Successfully Deleted");
              return res.data;
            }
          }
        });
      } catch (error) {
        toast.error("Error In Deleting All Student");
        console.log(error);
      } finally {
        setSpin(false);
      }
      clearTimeout;
    }, 2000);
  };

  return (
    <div className="grid col-span-6 lg:col-span-3 pr-0 h-[100px] text-blue-950">
      <Toaster position="top-center" />
      {/* forms */}
      <div>
        <div className="flex w-[100%] justify-between h-[100px] relative ">
          <div>
            <div>Legal Name</div>
            {toggle ? (
              <div
                className="absolute top-6 z-10 -left-1
                h-[200px] w-[100%] sm:w-[120%] md:w-[105%] lg:w-[110%]  bg-blue-500 py-4
                "
                style={{
                  background: "rgba(252, 254, 255, 0.25)",
                  backdropFilter: " blur( 4px )",
                }}
              >
                <div className="z-20">
                  <div className="flex w-full">
                    <Input
                      className="flex-1 mr-1 placeholder:text-gray-400 "
                      placeholder={data?.name ? "" : "Enter First Name"}
                      defaultValue={data?.name}
                      value={firstName}
                      onChange={(e: any) => {
                        setFirstName(e.target.value);
                      }}
                    />
                    <Input
                      className="flex-1 ml-1"
                      placeholder={data?.name2 ? "" : "Enter Last Name"}
                      defaultValue={data?.name2}
                      value={lastName}
                      onChange={(e: any) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <Button
                      name={`${loading ? " Loading" : "save name"}`}
                      icon={
                        loading ? (
                          <BeatLoader
                            color={"color"}
                            size={18}
                            className="mb-[0.12rem]"
                          />
                        ) : (
                          <MdSave />
                        )
                      }
                      className={` bg-blue-950 transition-all duration-300 ${
                        loading && "h-12"
                      }`}
                      onClick={() => {
                        setLoading(true);
                        changeSchoolPersonalName(data?._id, {
                          name: firstName,
                          name2: lastName,
                        }).then((res) => {
                          setLoading(false);
                          setToggle(false);

                          toast.success("Legal Name updated successfully");
                          mutate(`api/view-school/${data?._id}`);
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {data?.name || data?.name2 ? (
                  <div>
                    {data?.name} {data?.name2}
                  </div>
                ) : (
                  <div>No Legal Name yet</div>
                )}
              </div>
            )}
          </div>
          <div
            className="text-[12px] underline font-[500] hover:cursor-pointer  ml-10"
            onClick={onToggle}
          >
            Change
          </div>
        </div>
      </div>

      {/* forms */}
      <div>
        <div className="flex w-full justify-between h-[100px] relative ">
          {" "}
          <div>
            <div>Email address</div>
            <div className="text-[12px] leading-4 text-[gray] mb-4 ">
              Use an address you’ll always have access to.
            </div>
            <div className="font-[400] mt-3">
              {toggle1 ? (
                <div>{data?.email}</div>
              ) : (
                <div>
                  {data?.email.substring(0, 2)}****@
                  {data?.email.split("@")[1]}
                </div>
              )}
            </div>
          </div>
          <div
            className="text-[12px] underline font-[500] hover:cursor-pointer "
            onClick={onToggle1}
          >
            View
          </div>
        </div>
      </div>

      {/* forms */}
      <div>
        <div className="flex w-full justify-between h-[100px] relative mt-10 ">
          {" "}
          <div>
            <div>Phone numbers</div>

            {toggle2 ? (
              <div
                className="absolute top-5 z-10 
                h-[200px] w-[100%] sm:w-[120%] md:w-[90%]   bg-blue-500 py-4
                "
                style={{
                  background: "rgba(252, 254, 255, 0.25)",
                  backdropFilter: " blur( 4px )",
                }}
              >
                <div className="z-20">
                  <div className="flex w-full">
                    <Input
                      className="flex-1 mr-1 placeholder:text-gray-400 "
                      placeholder={
                        data?.phone ? "" : "Enter your contact mobile number "
                      }
                      defaultValue={phone}
                      value={phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <Button
                      name={`${loading ? " Loading" : "save number"}`}
                      icon={
                        loading ? (
                          <BeatLoader
                            color={"color"}
                            size={18}
                            className="mb-[0.12rem]"
                          />
                        ) : (
                          <MdSave />
                        )
                      }
                      className={` bg-blue-950 transition-all duration-300 ${
                        loading && "h-12"
                      }`}
                      onClick={() => {
                        setLoading(true);
                        changeSchoolPhone(data?._id, phone).then(() => {
                          toast.success("Phone Number Updated successfully");
                          setLoading(false);
                          setToggle2(false);
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-[12px] leading-4 text-[gray] mb-4 mr-8 ">
                Add a your contact phone Number: {data?.phoneNumber}
              </div>
            )}

            <div>
              <div className="font-[400] mt-3">
                {toggle2 ? (
                  <div>{data?.phoneNumber}</div>
                ) : (
                  <div>
                    {data?.phone ? (
                      <div>{data?.phone}</div>
                    ) : (
                      <div>No phone contact yet</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="text-[12px] underline font-[500] hover:cursor-pointer "
            onClick={onToggle2}
          >
            Change
          </div>
        </div>
      </div>

      {/* forms */}
      <div>
        <div className="flex w-full justify-between h-[70px] relative mt-10 ">
          {" "}
          <div>
            <div>Change School Name</div>

            {toggle3 ? (
              <div
                className="absolute top-8 z-10 
                h-[200px] w-[100%] sm:w-[120%] md:w-[90%] bg-blue-500 py-4
                "
                style={{
                  background: "rgba(252, 254, 255, 0.25)",
                  backdropFilter: " blur( 4px )",
                }}
              >
                <div className="z-20">
                  <div className="flex w-full">
                    <Input
                      className="flex-1 mr-1 placeholder:text-gray-400 "
                      value={phone}
                      defaultValue={data?.schoolName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <Button
                      name={`${loading ? " Loading" : "save school name"}`}
                      icon={
                        loading ? (
                          <BeatLoader
                            color={"color"}
                            size={18}
                            className="mb-[0.12rem]"
                          />
                        ) : (
                          <MdSave />
                        )
                      }
                      className={` bg-blue-950 transition-all duration-300 ${
                        loading && "h-12"
                      }`}
                      onClick={() => {
                        setLoading(true);
                        changeSchoolName(data?._id, { schoolName: phone }).then(
                          () => {
                            setLoading(false);
                            onToggle3();
                            mutate(`api/view-school/${data?._id}`);
                          }
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-[12px] leading-4 text-[gray] mb-4 mr-8 ">
                You can always update your school name here:{" "}
                <span className="font-medium">{data?.schoolName}</span>
              </div>
            )}

            <div>
              <div className="font-[400] mt-3">
                {/* {toggle3 ? (
                  <div>{data?.schoolName}</div>
                ) : (
                  <div>
                    {data?.schoolName ? (
                      <div></div>
                    ) : (
                      <div>
                  updateSchoolSignature      school Name:{" "}
                        <strong className="font-medium">
                          {data?.schoolName}
                        </strong>
                      </div>
                    )}
                  </div>
                )} */}

                <div className="mt-40  p-5 uppercase">
                  {data?.signature ? (
                    <img
                      src={data?.signature}
                      className="w-[200px] h-[120px] border mb-10 object-contain"
                    />
                  ) : (
                    <div className="w-[200px] h-[120px] border mb-10 flex justify-center items-center text-[12px] font-semibold italic">
                      <p>NO SIGNATURE YET</p>
                    </div>
                  )}
                  <div>
                    {signature ? (
                      <button
                        className={`bg-red-500 ${
                          loading
                            ? "cursor-not-allowed bg-red-400 animate-pulse"
                            : "cursor-pointer"
                        } text-white px-[45px] py-4 rounded-md text-[12px]`}
                        disabled={loading}
                        onClick={() => {
                          setLoading(true);
                          const formData: any = new FormData();
                          formData.append("avatar", signature);
                          updateSchoolSignature(data?._id, formData)
                            .then((res) => {
                              if (res.status === 201) {
                                toast.success("signature updated successfully");
                                mutate(`api/api/view-school/${data?._id}`);
                              } else {
                                toast.error("signature updated Error");
                              }
                            })
                            .finally(() => {
                              setLoading(false);
                            });
                        }}
                      >
                        {loading ? "Loading..." : "upload Signature"}
                      </button>
                    ) : (
                      <div>
                        <label
                          htmlFor="signature-upload"
                          className="mt-4 bg-blue-950 text-white px-12 py-4 rounded-md text-[12px] cursor-pointer"
                        >
                          Update Signature
                        </label>
                        <input
                          className="hidden"
                          type="file"
                          id="signature-upload"
                          onChange={(e: any) => {
                            setSignature(e.target.files[0]);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="text-[12px] underline font-[500] hover:cursor-pointer "
            onClick={onToggle3}
          >
            Change
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center smallphon relative">
        <div className="w-[280px] ">
          <h1 className="font-medium text-[16px]">
            Delete All Students In your School
          </h1>
          <h3 className="text-[12px] font-extrabold">
            This is an irreversible action, All students and associated data's
            about each student will be wiped off. Be absolutely sure about
            taking this action.
          </h3>
        </div>
        <div>
          <div>
            <div className=" w-full">
              <div
                className="underline font-medium py-3 px-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                onClick={() => {
                  setPopup("Delete");
                }}
              >
                Proceed
              </div>
            </div>
          </div>
          {/* Popup Card */}
          {popup === "Delete" && (
            <div className="absolute freshh py-[30px] mb-3 w-full flex justify-center items-center backdrop-blur-sm bg-blue-50 top-0 left-0 rounded-lg">
              <div className="p-4 w-[400px] sm:w-[470px] min-h-[300px] bg-white rounded-lg smallphone">
                <div className="mb-3 text-center">
                  <h3 className="font-bold text-lg text-center text-blue-950">
                    All Student Deletion Notice
                  </h3>
                </div>
                <div className="mb text-blue-950">
                  <p className="mb-3 text-[14px]">
                    You are about to permanently delete{" "}
                    <span className="font-extrabold">All students </span> record
                    from your database. This action is irreversible and cannot
                    be undone, and will result in the complete removal of all
                    associated data, including academic history, contact
                    information, and every other students detail.{" "}
                  </p>
                  <p className="ml-3 mb-3 font-extrabold">
                    Be Absolutely Sure of this decision
                  </p>
                  <div className="mb-3 flex items-center justify-center gap-3 font-semibold  text-[15px]">
                    <p>
                      If <span className="text-red-500 text-[20px]">YES</span>{" "}
                      continue,
                    </p>
                    <p className="">
                      If <span className="text-[20px]">NO</span> cancel.
                    </p>
                  </div>
                  <div className="pt-2 flex justify-between items-center sm:justify-center sm:gap-5">
                    {spin ? (
                      <div className="">
                        <button
                          className={`text-white font-medium flex justify-center items-center gap-3 bg-red-600 py-3 px-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                            changeText ? "hidden" : "block"
                          }`}
                        >
                          <ClipLoader
                            color={"#fff"}
                            loading={loading}
                            size={20}
                          />
                          Deleting...
                        </button>
                      </div>
                    ) : (
                      <div className="">
                        <button
                          className={`text-white font-medium flex justify-center items-center gap-3 bg-red-600 py-3 px-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                            changeText ? "hidden" : "block"
                          }`}
                          onClick={() => {
                            handleDeleteAllStudents();
                            setchangeText(true);
                          }}
                        >
                          Delete All Students(Not Active)
                        </button>
                      </div>
                    )}

                    <button
                      className="btn text-white py-4 px-6 bg-blue-950 border hover:bg-blue-950 scale-105 cursor-pointer"
                      onClick={() => {
                        setPopup(null);
                        setchangeText(false);
                      }}
                    >
                      {changeText ? "Close" : "Cancel"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoScreen;
