document.title = "Teacher's Lesson Notes";
import { NavLink } from "react-router-dom";
import { FaBook, FaThumbsUp } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import LittleHeader from "../../../components/layout/LittleHeader";
import { useNotes, useSchoolData } from "../../hook/useSchoolAuth";
import { FcApproval, FcCancel } from "react-icons/fc";
import Button from "../../../pagesForTeachers/components/reUse/Button";
import { useState } from "react";
import { adminlessonNoteReply } from "../../../pagesForTeachers/api/teachersAPI";
import { LuSend } from "react-icons/lu";
import Swal from "sweetalert2";
import pic from "../../../assets/pix.jpg";
import { BsArrowRight } from "react-icons/bs";
import Input from "../../../components/reUse/Input";

const AdminLessonNote = () => {
  const { data } = useSchoolData();
  const { notes } = useNotes(data?._id);

  const [id, setID] = useState<string>("");
  const [obj, setObj] = useState<any>({});

  const [response, setResponse] = useState("");
  const [day, setDay] = useState("");

  const handleSubmit = (el: any) => {
    adminlessonNoteReply(data?._id, el, {
      responseDetail: response,
      deadline: day,
    }).then((res) => {
      Swal.fire({
        title: "Success!",
        text: "Response sent successfully.",
        icon: "success",
      });
    });
  };
  const lessonNote = notes?.data?.lessonNotes;

  const bgColors = [
    "#e6f0ff", // Light Blue
    "#ffe6e6", // Light Red
    "#e6ffe6", // Light Green
    "#fff2cc", // Light Brown/Orange
    "#f2e6f2", // Light Purple
    "#ffe6f2", // Light Pink
    "#e6f7ff", // Light Cyan
    "#f2f2f2", // Light Gray
    "#e6ffff", // Light Aqua
    "#f0f8ff", // Light Slate
    "#fbeaff", // Light Plum
    "#f2f2ff", // Light Indigo
    "#fff2e6", // Light Peach
    "#e6ffe6", // Light Mint
    "#f9f2ec", // Light Chocolate
    "#ffe6e6", // Light Coral
    "#edf2fa", // Light Navy
    "#f2e6f7", // Light Wine
    "#e6ecff", // Light Royal Blue
    "#ffe6f0", // Light Burgundy
    "#f2f2f2", // Light Graphite Grey
    "#ecf5e6", // Light Olive Green
    "#f2f2f7", // Light Charcoal
    "#f9e6f9", // Light Magenta
    "#f2f4f7", // Light Blue Tint
  ];

  const randomBgColors = () => {
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

    return { randomBg };
  };

  const { randomBg } = randomBgColors();
  const [searchNote, setSearchNote] = useState("");

  const filteredNotes = lessonNote?.filter((notes: any) => {
    const allNotes = `${notes?.subject} ${notes?.topic}`.toLowerCase();
    return allNotes.includes(searchNote.toLowerCase());
  });

  return (
    <div>
      <LittleHeader name="Teacher's Lesson Notes" />
      <div
        className={`min-h-[82vh] ${
          data?.categoryType === "Secondary"
            ? "text-blue-950"
            : "text-green-950"
        } `}
      >
        <div className="">
          <div className="flex float-end"></div>
          <div className="py-9 w-full mt-[20px] p-3 border-b-2">
            <p className="font-bold mb-3">Lesson Note</p>
            <div>
              <Input
                placeholder="Search By Subject Or Topic"
                value={searchNote}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchNote(e.target.value);
                }}
              />
            </div>
            <div className="">
              <div className="">
                {filteredNotes?.length > 0 ? (
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:grid-cols-1 freshh">
                    {filteredNotes?.map((props: any, i: number) => (
                      <div
                        key={props?._id || i}
                        // style={{
                        //   backgroundColor: randomBg,
                        //   border: `1px solid ${randomBg}`,
                        // }}
                        className="p-5 min-h-[200px] border rounded-[15px] shadow-sm flex items-start justify-center flex-col"
                      >
                        <div className="w-full mb-3 flex justify-between items-start">
                          <div className="w-[75%]">
                            <div className="mb-2">
                              <h3
                                className={`font-semibold text-[15px] sm:text-[19px] lg:text-[21px] flex items-center gap-2`}
                              >
                                <FaBook />
                                {props?.subject}
                              </h3>
                            </div>
                            <div className=" mb-3 text-[25px] lg:text-[27px] font-bold flex items-center gap-3 ">
                              <h1>{props?.topic}</h1>
                            </div>
                          </div>

                          <div className="w-[20%] h-full flex justify-center items-start gap-2">
                            <img
                              src={props?.avatar ? props?.avatar : pic}
                              alt="teacher_profile_pic"
                              className="h-[60px] w-[60px] border object-cover rounded-full"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <p>
                            {props?.summary ? (
                              props?.summary.substring(0, 500)
                            ) : (
                              <div className="opacity-50">No summary</div>
                            )}
                          </p>
                        </div>
                        <div className="w-full border mb-3" />
                        <div className="mb-2 flex items-center font-semibold ">
                          <h2 className="w-[70px]">By:</h2>
                          <h2 className="">{props?.teacher}</h2>
                        </div>
                        <div className="mb-2 flex items-center font-semibold ">
                          <h2 className="w-[70px]">For:</h2>
                          <h2 className="">{props?.classes}</h2>
                        </div>
                        <div className="mb-8 font-semibold flex items-center">
                          <h2 className="w-[70px]">Status</h2>
                          {props?.adminSignation ? (
                            <h2 className="font-semibold text-green-500 flex items-center gap-1">
                              Approved <FcApproval />
                            </h2>
                          ) : (
                            <h2 className="font-semibold text-red-500 flex items-center gap-1">
                              Not Approved <FcCancel />
                            </h2>
                          )}
                        </div>
                        <div className="flex-1" />

                        <div className="w-full flex justify-between items-start">
                          {/* Send Response to Teacher Button */}
                          <div className="">
                            {lessonNote?.adminSignation ? (
                              <div>
                                <div className="w-full mb-[25px] flex justify-center items-center">
                                  <label
                                    // htmlFor="send_response"
                                    className={`py-3 px-3 ${
                                      data?.categoryType === "Secondary"
                                        ? "bg-blue-950"
                                        : "bg-red-950"
                                    }  text-white rounded-md flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer`}
                                  >
                                    Lesson Note has been Approved
                                    <FaThumbsUp className="mb-1" />
                                  </label>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="w-full mb-[25px] flex justify-center items-center">
                                  <label
                                    htmlFor="send_response"
                                    className={`py-2 px-3 ${
                                      data?.categoryType === "Secondary"
                                        ? "bg-blue-950"
                                        : "bg-red-950"
                                    }  text-white rounded-md flex justify-center items-center scale-105 gap-2 transition-all duration-300 cursor-pointer`}
                                    onClick={() => {
                                      // setID(props?._id);
                                      // setObj(props);
                                    }}
                                  >
                                    Send Response to Teacher
                                    <LuSend />
                                  </label>
                                </div>{" "}
                              </div>
                            )}
                            {/* Administrator Response Toggle */}
                            <div>
                              <input
                                type="checkbox"
                                id="send_response"
                                className="modal-toggle"
                              />
                              <div
                                className={`modal rounded-md ${
                                  data?.categoryType === "Secondary"
                                    ? "text-blue-950"
                                    : "text-green-950"
                                }  text-left`}
                                role="dialog"
                              >
                                <div className="modal-box bg-white  rounded-md">
                                  <div className="flex items-center justify-between my-4 ">
                                    <p className="font-bold">
                                      Give a Lesson Note Feedback to your
                                      Teacher
                                    </p>

                                    <label
                                      htmlFor="send_response"
                                      className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
                                    >
                                      <MdClose />
                                    </label>
                                  </div>
                                  <hr />
                                  <div className="mt-2 leading-tight text-[13px] font-medium">
                                    {obj?.responseDetail}
                                    {obj?.deadline}
                                    <br />
                                    <br />
                                    Send your thoughts, reviews on the lesson
                                    note back to your teacher so that updates
                                    will be made, hereby ensuring a top class
                                    lesson note
                                    <br />
                                  </div>
                                  <div className="mt-10 w-full gap-2 flex flex-col items-center">
                                    <div className="w-full">
                                      <label className="font-medium text-[12px]">
                                        Response Detail{" "}
                                        <span className="text-red-500">*</span>
                                      </label>

                                      {/* // readSubject */}
                                      <textarea
                                        className="border w-full resize-none h-[200px] mb-5 rounded-md mt-2 p-2 bg-gray-100 outline-none"
                                        value={response}
                                        defaultValue={`${obj?.responseDetail}`}
                                        onChange={(e) =>
                                          setResponse(e.target.value)
                                        }
                                        // value={period}
                                        // onChange={(e) => {
                                        //   setPeriod(e.target.value);
                                        // }}
                                        placeholder={
                                          obj?.responseDetail
                                            ? obj?.responseDetail
                                            : `Response Detail`
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2  items-start">
                                    <label htmlFor="">
                                      What is the deadline for the lesson note
                                      update to be done?
                                    </label>
                                    <select
                                      name="days"
                                      id="days"
                                      className={`border p-2 rounded-md bg-gray-100 ${
                                        data?.categoryType === "Secondary"
                                          ? "text-blue-950"
                                          : "text-green-950"
                                      }  w-[40%]`}
                                      value={day}
                                      onChange={(e) => setDay(e.target.value)}
                                    >
                                      <option disabled selected>
                                        {obj?.deadLine}
                                      </option>
                                      <option value="1 day">1 day</option>
                                      <option value="2 days">2 days</option>
                                      <option value="3 days">3 days</option>
                                      <option value="4 days">4 days</option>
                                      <option value="5 days">5 days</option>
                                      <option value="6 days">6 days</option>
                                      <option value="7 days">1 week</option>
                                    </select>
                                  </div>
                                  <div className="mt-[10px] flex justify-end items-center">
                                    {response?.length > 1 ? (
                                      <Button
                                        name="Send"
                                        onClick={() => handleSubmit(id)}
                                        className={`${
                                          data?.categoryType === "Secondary"
                                            ? "bg-blue-950"
                                            : "bg-red-950"
                                        } `}
                                      />
                                    ) : (
                                      <button
                                        className={`btn ${
                                          data?.categoryType === "Secondary"
                                            ? "bg-blue-950"
                                            : "bg-red-950"
                                        }  text-white hover:bg-blue-950 cursor-not-allowed`}
                                      >
                                        Send
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Click to View button */}
                          <div>
                            <NavLink to={props?._id}>
                              <div
                                // style={{ color: randomBg }}
                                className="py-1 px-[6px] bg-blue-950 text-[32px] font-extrabold rounded-lg text-white cursor-pointer scale-105"
                              >
                                <BsArrowRight className="animate-pulse" />
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="freshh">No Lesson Note Created So Far</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLessonNote;
