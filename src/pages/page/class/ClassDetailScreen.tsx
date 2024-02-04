document.title = "class room Detail's Page";
import { BsThreeDotsVertical } from "react-icons/bs";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import { FaCheckDouble, FaStar } from "react-icons/fa6";
import pix from "../../../assets/pix.jpg";
import { MdClose, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { displaySession } from "../../../global/reduxState";
import { useState } from "react";
import Input from "../../../components/reUse/Input";

const ClassDetailScreen = () => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState<string>("");
  const [subjectTeacher, setSubjectTeacher] = useState<string>("");

  const [teacher, setTeacher] = useState<string>("");

  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(displaySession(false));
    } else {
      document.startViewTransition(() => {
        dispatch(displaySession(false));
      });
    }
  };
  return (
    <div className="text-blue-950">
      <LittleHeader name="Class room Details" back />

      <div>Class: JSS 1A</div>

      <div className="w-full text-blue-950 h-[90px] rounded-lg border flex justify-between overflow-hidden ">
        <div className="bg-blue-950 text-white w-[160px] md:w-[300px] px-4 py-2 rounded-lg ">
          <div>Total Number of Students</div>
          <div className="text-[35px] font-medium">
            59 <span className="text-[20px]">Students</span>
          </div>
        </div>
        <div className=" px-4 py-1 rounded-lg text-center flex items-end flex-col">
          <div className="flex-1" />
          <div className="mr-0 ">Next Recommended action:</div>
          <p className="font-medium">Add Teacher to supervise this class</p>
        </div>
      </div>

      <div className="my-6 border-t" />

      <div className="mt-6 w-full min-h-[80px] pb-4 bg-slate-50 rounded-lg border pt-2 px-4 ">
        <div className="uppercase px-3  opacity-100 rounded-md bg-orange-400 text-white mb-2 py-2 flex justify-between items-center">
          <p className="text-[20px] font-bold">₦50,000</p>
          {/* <Button name="" className="text-blue-950 bg-white" /> */}
          <button className="btn text-white bg-blue-950 hover:bg-blue-900 transition-all duration-300 px-8 uppercase ">
            update Class Fee
          </button>
        </div>
        <p>Manage Class Teacher: </p>
        <p className="text-[13px] flex items-center font-bold">
          Class teacher is responsible for day to day activities of the class{" "}
          <span className="font-bold flex items-center gap-1"></span>
        </p>
        {/* + Assign class Teacher{ */}
        <div className="mt-5 text-[13px] font-medium">
          <div className="mt-5 text-[13px] font-medium">
            <label
              htmlFor="assign_teacher"
              className=" my-3 text-blue-500 transition-all duration-300 hover:text-blue-600 cursor-pointer "
            >
              + Assign class Teacher
            </label>
            <div className="mt-3" />
            {/* Put this part before </body> tag */}
            <input
              type="checkbox"
              id="assign_teacher"
              className="modal-toggle"
            />
            <div className="modal rounded-md" role="dialog">
              <div className="modal-box  rounded-md">
                <p className="flex items-center justify-between my-4 ">
                  <p className="font-bold">Assigning Teacher to this class</p>

                  <label
                    htmlFor="assign_teacher"
                    className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
                  >
                    <MdClose />
                  </label>
                </p>
                <hr />

                <p className="mt-2 leading-tight text-[13px] font-medium">
                  Please note that this teacher you're about to assign to this
                  class will exhibit all feature, roles and previlage to
                  supervise this class.
                </p>

                <div className="mt-10 w-full gap-2 flex flex-col items-center">
                  <div className="w-full flex flex-col">
                    <label className="font-medium text-[12px]">
                      Subject Teacher <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="select border border-slate-200 text-[12px] py-0 px-2 w-full max-w-xs mb-3"
                      value={teacher}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setTeacher(e.target.value);
                      }}
                    >
                      <option disabled selected>
                        Select a Teacher
                      </option>
                      <option value="ames Okon">James Okon</option>
                      <option value="Tunde Rashedi">Tunde Rashedi</option>
                    </select>
                  </div>
                </div>

                <div className="w-full flex justify-end transition-all duration-300">
                  {teacher !== "" ? (
                    <Button
                      name="Proceed"
                      className="bg-blue-950  mx-0"
                      onClick={handleToggleMenuFalse}
                    />
                  ) : (
                    <Button
                      name="Can't Proceed"
                      className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
                    />
                  )}
                </div>
              </div>

              <label className="modal-backdrop" htmlFor="assign_teacher">
                Close
              </label>
            </div>
          </div>
        </div>
        <div className="text-[12px]"> class Teacher Assigned</div>
        <div className="flex gap-2 mt-1 items-start  ">
          <img className="w-10 h-10 object-cover rounded-full" src={pix} />
          <p>
            <p className="m-0 leading-tight text-[14px] font-bold">
              Tunde Rashedi
            </p>
            <p className="text-[12px] mt-2">
              <FaStar />
            </p>
          </p>
        </div>
      </div>

      <div className="my-6 border-t" />

      <div className="w-full min-h-[180px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Manage Class Subject for JSS 1A </p>
        <p className="text-[13px] font-bold">
          Add/Remove Subjects for this class
        </p>

        <div className="mt-5 text-[13px] font-medium">
          <label
            htmlFor="assign_class_subject"
            className=" my-3 text-blue-500 transition-all duration-300 hover:text-blue-600 cursor-pointer "
          >
            + Add Subject
          </label>
          <div className="mt-5" />
          {/* Put this part before </body> tag */}
          <input
            type="checkbox"
            id="assign_class_subject"
            className="modal-toggle"
          />
          <div className="modal rounded-md" role="dialog">
            <div className="modal-box  rounded-md">
              <p className="flex items-center justify-between my-4 ">
                <p className="font-bold">Add New Subject</p>

                <label
                  htmlFor="assign_class_subject"
                  className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
                >
                  <MdClose />
                </label>
              </p>
              <hr />

              <p className="mt-2 leading-tight text-[13px] font-medium">
                Please note that by assigning this subject to this class, it
                automtically becomes one of the class must take suject.
              </p>

              <div className="mt-10 w-full gap-2 flex flex-col items-center">
                <div className="w-full">
                  <label className="font-medium text-[12px]">
                    Subject Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter the here: English"
                    className="mx-0 h-12 w-full"
                    value={subject}
                    onChange={(e: any) => {
                      setSubject(e.target.value);
                    }}
                  />
                </div>

                <div className="w-full flex flex-col">
                  <label className="font-medium text-[12px]">
                    Subject Teacher <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="select select-info mt-1 text-[12px] py-0 px-2 w-full max-w-xs mb-3"
                    value={subjectTeacher}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setSubjectTeacher(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      Select the subject Teacher
                    </option>
                    <option value={"James Okon"}>James Okon</option>
                    <option value={"Tunde Rashedi"}>Tunde Rashedi</option>
                  </select>
                </div>
              </div>

              <div className="w-full flex justify-end transition-all duration-300">
                {subject !== "" && subjectTeacher !== "" ? (
                  <Button
                    name="Proceed"
                    className="bg-blue-950  mx-0"
                    // onClick={handleToggleMenuFalse}
                  />
                ) : (
                  <Button
                    name="Can't Proceed"
                    className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
                  />
                )}
              </div>
            </div>

            <label className="modal-backdrop" htmlFor="assign_class_subject">
              Close
            </label>
          </div>
        </div>

        <div className="mt-1 w-full grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3">
          <div className="bg-white border flex flex-col rounded-2xl pb-2 min-h-[200px] px-4 pt-4">
            <div className="mt-3 flex justify-between items-center font-bold">
              <p>Mathematics</p>
              <div className="w-8 h-8 transition-all duration-300 rounded-full hover:bg-slate-50 cursor-pointer flex justify-center items-center">
                <MdDelete className="hover:text-blue-900" />
              </div>
            </div>
            <div className="flex">
              <p className="text-[12px] bg-slate-100 rounded-sm py-2 pl-1 shadow-sm pr-4 mb-5">
                compulsory
              </p>
            </div>
            <div className="flex-1" />
            <p className="text-[13px] font-medium">Subject Teacher Name</p>
            <div className="flex mb-4 gap-2 flex-wrap">
              <div className="text-blue-950  rounded-mlg mt-1 px-0 border-t font-medium py-2 text-[17px] ">
                John Amadi
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Top Performing student </p>
        <p className="text-[13px]  flex items-center font-bold">
          Here is the list of the top 5 performing student:{" "}
        </p>
        <div className="flex gap-4 mt-5"></div>
      </div>

      <div className="mt-6 w-full min-h-[100px] pb-10 bg-slate-50 rounded-lg border py-2 px-4 ">
        <p>Viewing Students</p>
        <p className="text-[13px]  flex items-center font-bold">
          Here are all the students in this class:{" "}
        </p>
        <div className="flex gap-4 mt-5"></div>
      </div>

      {/* Attendance */}
    </div>
  );
};

export default ClassDetailScreen;
