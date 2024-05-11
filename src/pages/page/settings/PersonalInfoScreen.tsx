import { useState } from "react";
import Input from "../../../components/reUse/Input";
import Button from "../../../components/reUse/Button";
import { MdSave } from "react-icons/md";
import BeatLoader from "react-spinners/ClipLoader";
import { useSchoolData } from "../../hook/useSchoolAuth";
import {
  changeSchoolName,
  changeSchoolPersonalName,
  changeSchoolPhone,
} from "../../api/schoolAPIs";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";

const PersonalInfoScreen = () => {
  const { data } = useSchoolData();

  const [loading, setLoading] = useState<boolean>(false);

  const [toggle, setToggle] = useState<boolean>(false);
  const [toggle1, setToggle1] = useState<boolean>(false);
  const [toggle2, setToggle2] = useState<boolean>(false);
  const [toggle3, setToggle3] = useState<boolean>(false);

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

  return (
    <div className=" grid col-span-3 pr-0 h-[100px] text-blue-950 ">
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
        <div className="flex w-full justify-between h-[100px] relative mt-10 ">
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
                        school Name:{" "}
                        <strong className="font-medium">
                          {data?.schoolName}
                        </strong>
                      </div>
                    )}
                  </div>
                )} */}
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
    </div>
  );
};

export default PersonalInfoScreen;
