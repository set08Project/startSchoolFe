document.title = "Teacher's Lession Notes";
import { NavLink } from "react-router-dom";
import { FaBook, FaReply } from "react-icons/fa6";
import { MdAutoAwesome, MdCheck, MdClose } from "react-icons/md";
import LittleHeader from "../../../components/layout/LittleHeader";
import { useNotes, useSchoolData } from "../../hook/useSchoolAuth";
import { FiLoader } from "react-icons/fi";

const AdminLessonNote = () => {
  const { data } = useSchoolData();
  const { notes } = useNotes(data?._id);

  return (
    <div>
      <LittleHeader name="Teacher's Lesson Notes" />
      <div className="min-h-[82vh] text-blue-950">
        <div>
          <div className="flex float-end"></div>
          <div className="py-9 w-full mt-24 p-3 border-b-2">
            <p className="font-bold mb-7">Lesson Note</p>
            <div className="">
              <div>
                {notes?.data?.lessonNotes?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-3 ">
                    {/* {notes?.data?.lessonNotes?.map((props: any) => (
                      <NavLink
                        key={props?._id}
                        to={`/lesson-note/${props?._id}`}
                      >
                        <div
                          className={`min-h-[200px] shadow-sm border flex justify-center items-center flex-col rounded-md `}
                        >
                          <div className="card-body text-gray-500 px-2 ">
                            <div className="h-14 w-full flex justify-center items text-[30px]">
                              <FaBook />
                            </div>
                            <div className="flex flex-col text-center">
                              <h2 className="font-medium">
                                {props?.topic ? (
                                  props?.topic
                                ) : (
                                  <div className="opacity-50">No Topic</div>
                                )}
                              </h2>
                              <p className="pt-5 text-left text-[12px] ">
                                {props?.summary ? (
                                  props?.summary
                                ) : (
                                  <div className="opacity-50">No summary</div>
                                )}
                              </p>

                              <div className="text-[12px] w-full flex justify-start  mt-10 font-medium">
                                <p>{props?.classes}</p>
                                <p>{props?.subject}</p>
                                <p
                                  className={`${
                                    props?.adminSignation
                                      ? "text-green-500 font-bold"
                                      : "text-red-500 font-bold"
                                  }`}
                                >
                                  {props?.adminSignation
                                    ? "Approved"
                                    : "Not-Approved"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))} */}
                    {notes?.data?.lessonNotes?.map((props: any) => (
                      <div
                        className={`min-h-[200px] bxs border flex justify-between items-center flex-col rounded-lg `}
                      >
                        <NavLink
                          key={props?._id}
                          to={`/lesson-note/${props?._id}`}
                        >
                          <div className="w-full h-full py-[15px] px-[40px] flex justify-center items-start flex-col ">
                            <div className="w-full  py-[10px] flex items-center justify-between">
                              <div className="flex items-center text-[21px] gap-1">
                                <FaBook />
                                <div className="font-semibold">
                                  {props?.subject}
                                </div>
                              </div>
                              <div className="text-[20px] font-semibold">
                                {props?.classes}
                              </div>
                            </div>
                            <div className="py-[20px]">
                              <div className="flex items-center gap-5">
                                <h1 className="font-medium">Topic:</h1>
                                <h1 className="font-bold text-[18px]">
                                  {props?.topic ? (
                                    props?.topic
                                  ) : (
                                    <div className="opacity-50">No Topic</div>
                                  )}
                                </h1>
                              </div>
                              <div className="flex items-center gap-5">
                                <h1 className="font-medium">Notes:</h1>
                                <p className="pt-5 text-[15px] flex justify-start items-center ">
                                  {props?.summary ? (
                                    props?.summary.substring(0, 500)
                                  ) : (
                                    <div className="opacity-50">No summary</div>
                                  )}
                                  ...
                                </p>
                              </div>
                              <div className="w-full my-[10px] flex items-center gap-5">
                                <h1 className="font-medium">Status:</h1>
                                <p
                                  className={`${
                                    props?.adminSignation
                                      ? "text-green-500 font-bold"
                                      : "text-red-500 font-bold"
                                  }`}
                                >
                                  {props?.adminSignation
                                    ? "Approved ✅"
                                    : "Not-Approved ❌"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </NavLink>

                        <div className="w-full mb-[25px] flex justify-center items-center">
                          <label
                            htmlFor="send_response"
                            className="py-3 px-3 bg-blue-950 text-white rounded-md flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer "
                          >
                            Send Teacher Response
                            <FaReply />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className=" mt-32 w-full h-full flex flex-col items-center justify-center ">
                    <MdAutoAwesome />
                    <div className="opacity-50 mt-5">
                      No Lesson note Published yet
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Administrator Response Toggle */}
        <input type="checkbox" id="send_response" className="modal-toggle" />
        <div className="modal rounded-md text-blue-950 text-left" role="dialog">
          <div className="modal-box bg-white  rounded-md">
            <div className="flex items-center justify-between my-4 ">
              <p className="font-bold">
                Give a Lesson Note Feedback to your Teacher
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
              Is there anything that seriously disturb you... Please keep it no
              more, make the complain and let's start addressing it now!!
              <br />
              <br />
              <div className="flex gap-2  items-center">
                <p>
                  {" "}
                  Importance: <span className="font-medium">Hi</span>
                </p>
                <div className="flex items-center font-bold">
                  <span>selected</span>
                  <MdCheck className="text-green-500 text-[25px] mb-1 " />
                </div>
              </div>
            </div>
            <div className="mt-10 w-full gap-2 flex flex-col items-center">
              <div className="w-full">
                <label className="font-medium text-[12px]">
                  Complains Detail <span className="text-red-500">*</span>
                </label>

                {/* // readSubject */}
                <textarea
                  className="border w-full resize-none h-[200px] mb-5 rounded-md mt-2 p-2 bg-gray-100 outline-none"
                  // value={period}
                  // onChange={(e) => {
                  //   setPeriod(e.target.value);
                  // }}
                  placeholder="Complains Detail"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLessonNote;
