import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { RiPagesLine } from "react-icons/ri";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import { MdClose, MdFeedback } from "react-icons/md";
import Input from "../../../components/reUse/Input";
import { GiPadlock } from "react-icons/gi";
import { useSchoolData } from "../../hook/useSchoolAuth";

const SettingScreen: FC = () => {
  document.title = "School's Profile settings";

  const pathData = [
    {
      icon: <RiPagesLine size={45} />,
      title: "school's Info Settings",
      detail:
        "Provide basic info that would be used for your school's landing page.",
      url: "/my-personal-info/info",
      size: 35,
    },
    {
      icon: <RiPagesLine size={45} />,

      title: "School's Account Settings",
      detail: "Provide personal details and how we can reach you.",
      url: "/my-personal-info/theme-setting",
      size: 35,
    },
    // {
    //   icon: <HiMiniBuildingOffice2 size={45} />,
    //   title: "School's Page Settings",
    //   detail: "Provide studio details and how we can reach you.",
    //   url: "/my-personal-info/theme-settings",
    //   size: 35,
    // },
    {
      icon: <HiMiniBuildingOffice2 size={45} />,
      title: "Timetable Setup",
      detail:
        "This enable school to setup structure with which the time-table can be build up off.",
      url: "/my-personal-info/timetable-setting",
      size: 35,
    },
  ];

  const { data } = useSchoolData();

  const [view, setView] = useState<boolean>(false);
  const [codeValue, setCodeValue] = useState<string>("");

  return (
    <div className="relative min-h-[88vh] text-blue-950 flex flex-col ">
      <LittleHeader name={document.title} />
      <div className="w-full m-auto py-8 my-4 flex gap-24 max-lg:block max-md:pt-1">
        {/* profile Account Detail */}
        <div>
          <div className="font-bold text-[30px] text-blue-950 ">
            Main Settings Page
          </div>
          <div className="text-[13px]">
            `` &middot;
            <strong className="font-[600] mr-1">
              {/* {data?.firstName} {data?.lastName} &middot; */}
            </strong>
            {/* {data?.email} &middot;{" "} */}
            <Link
              to="/"
              className="underline text-black font-[400] hover:text-black "
            >
              <span>go back home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* profile Account Detail Card */}

      <div
        className="my-6 text-blue-950 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 transition-all duration-300 lg:[&>*:nth-child(3)]:col-span-2 xl:[&>*:nth-child(3)]:col-span-1
      "
      >
        {pathData.map((props: any, i: number) => {
          return (
            <div>
              {i === 1 ? (
                <div>
                  <div
                    className="min-w-[300px] border rounded-md p-3 min-h-[200px] text-blue-950 shadow-md flex flex-col hover:shadow-lg cursor-pointer"
                    onClick={() => {
                      if (!document.startViewTransition) {
                        setView(true);
                      } else {
                        document.startViewTransition(() => {
                          setView(true);
                        });
                      }
                    }}
                  >
                    <div className="flex-1  text-blue-950">{props.icon}</div>

                    <div className="font-[500] mb-2 text-[20px]">
                      {props.title}
                    </div>
                    <div className="text-[15px] leading-4 font-[300]">
                      {props.detail}
                    </div>
                  </div>
                  {view && (
                    <div className="absolute top-0 left-0 backdrop-blur-md h-[99%] w-full rounded-lg flex items-center pt-[200px] flex-col">
                      <div className="w-[90%] lg:w-[700px] h-[300px] bg-white border rounded-md p-4 flex flex-col shadow-sm">
                        <div>
                          <h2 className="font-semibold mb-2">
                            Security Measure
                          </h2>
                          <p className="text-[12px]">
                            You are about to enter a very sensitive area, as a
                            measure of security, You would be required to
                            provider your{" "}
                            <strong className="font-medium">
                              "Secure Code"
                            </strong>
                            ...
                          </p>
                        </div>
                        <div className="flex-1" />
                        <div className="flex-col flex">
                          <label className="text-[12px] font-semibold mb-3">
                            Enter your Admin secret code
                          </label>
                          <Input
                            placeholder="Enter Secret Code"
                            className="w-[90%] ml-0 mt-0"
                            value={codeValue}
                            onChange={(e) => {
                              setCodeValue(e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            icon={<MdClose size={30} />}
                            name={"Close"}
                            className=" bg-red-500 text-white"
                            onClick={() => {
                              if (!document.startViewTransition) {
                                setView(false);
                              } else {
                                document.startViewTransition(() => {
                                  setView(false);
                                });
                              }
                            }}
                          />
                          {data?.adminCode === codeValue ? (
                            <Link to={`${props.url}`}>
                              <Button
                                icon={<GiPadlock size={30} />}
                                name={"Proceed"}
                                className="ml-2 bg-blue-950 "
                              />
                            </Link>
                          ) : (
                            <Button
                              icon={<GiPadlock size={30} />}
                              name={"Proceed"}
                              className="ml-2 bg-blue-950 "
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={`${props.url}`} key={i} className="text-black">
                  <div className="min-w-[300px] border rounded-md p-3 min-h-[200px] text-blue-950 shadow-md flex flex-col hover:shadow-lg">
                    <div className="flex-1  text-blue-950">{props.icon}</div>

                    <div className="font-[500] mb-2 text-[20px]">
                      {props.title}
                    </div>
                    <div className="text-[15px] leading-4 font-[300]">
                      {props.detail}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex-1 " />

      <div className="flex justify-end gap-4">
        {/* <Button
          icon={}
          name={"Give us Feedback"}
          className=""
        /> */}
        <label
          htmlFor="feedback"
          className="px-6 py-2 border-blue-950 border rounded-md m-2 overflow-hidden flex items-center justify-center text-blue-950 gap-2"
        >
          <MdFeedback size={30} />
          <div>Give us Feedback</div>
        </label>
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="feedback" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="flex justify-between items-center ">
            <h3 className="text-lg font-medium leading-tight">
              We will Love to know how we can serve you better!
            </h3>
            <label
              htmlFor="feedback"
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-all duration-300 bg-slate-100"
            >
              <MdClose />
            </label>
          </div>
          <p className="py-4 leading-tight text-[12px]">
            Tell us what we should add in our next update and complains you
            have... so we can improve on this software!
          </p>
        </div>
        <label className="modal-backdrop" htmlFor="feedback">
          Close
        </label>
      </div>
    </div>
  );
};

export default SettingScreen;
