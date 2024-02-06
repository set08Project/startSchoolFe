document.title = "Welcome Back";
import { Outlet } from "react-router-dom";
import Button from "../../components/reUse/Button";
import LittleHeader from "../../components/static/LittleHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  displayDelay,
  displayStudent,
  displaySubject,
} from "../../global/reduxState";
import AddAnyItem from "../../components/static/AddAnyItems";
import { useState } from "react";
import { createSchoolSubject } from "../api/schoolAPIs";
import { useSchoolData } from "../hook/useSchoolAuth";
import toast from "react-hot-toast";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const view = useSelector((state: any) => state.showStudent);
  const showIV = useSelector((state: any) => state.subjectToggled);

  const classroom = useSelector((state: any) => state.classroomToggled);
  const { data } = useSchoolData();

  console.log(data);

  const [subject, setSubject] = useState("");
  const [classAssigned, setClassAssigned] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDisplayStudent = () => {
    if (!document.startViewTransition) {
      dispatch(displayStudent(true));
      dispatch(displayDelay(true));
    } else {
      document.startViewTransition(() => {
        dispatch(displayStudent(true));
        const timer = setTimeout(() => {
          clearTimeout(timer);
          dispatch(displayDelay(true));
        }, 100);
      });
    }
  };

  const handleDisplaySubject = () => {
    if (!document.startViewTransition) {
      dispatch(displaySubject(!showIV));
    } else {
      document.startViewTransition(() => {
        dispatch(displaySubject(!showIV));
      });
    }
  };

  const handleDisplaySubjectOff = () => {
    if (!document.startViewTransition) {
      dispatch(displaySubject(false));
    } else {
      document.startViewTransition(() => {
        dispatch(displaySubject(false));
      });
    }
  };

  const handleCreateSubject = () => {
    try {
      setLoading(true);
      createSchoolSubject(data._id, {
        subjectTitle: subject,
        designated: classAssigned,
      }).then((res: any) => {
        if (res.status === 201) {
          setLoading(false);
          handleDisplaySubject();
        } else {
          setLoading(false);
          toast.error(`${res.response.data.message}`);
          console.log(res);
        }
      });
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <LittleHeader name={"Dashboard"} />
      <div className="grid w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 ">
        <div className="mt-24 sm:mt-0 col-span-1 sm:col-span-2 md:col-span-3   rounded-md h-[100%]">
          <Outlet />
        </div>

        <div className="bg-white order-first sm:order-last col-span-1 p-2 rounded-md h-[200px] sticky transition-all duration-300 mt-4 top-[4.5rem] sm:top-16">
          <div className="bg-white py-5 col-span-1 border p-2 rounded-md min-h-[200px] transition-all duration-300 -mt-5 ">
            <p className="font-medium text-[14px] mb-5">
              {/* <GeneralDataScreen /> */}
              Quick Action
            </p>
            <div>
              <Button
                name="Push Announcement"
                className="bg-black hover:bg-neutral-800 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
              />

              <Button
                name="Register new Student"
                className="bg-blue-900  hover:bg-blue-950 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                onClick={handleDisplayStudent}
              />

              <Button
                name="Create Event"
                className="bg-purple-900 hover:bg-purple-950 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
              />

              <Button
                name="Add Subject"
                className="bg-pink-600 hover:bg-pink-700 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                onClick={handleDisplaySubject}
              />

              <Button
                name="Quick Chat"
                className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
                onClick={handleDisplayStudent}
              />
            </div>
          </div>

          <div className="hidden sm:block col-span-1 border p-2 rounded-md min-h-[200px] transition-all duration-300 top-16 mt-4">
            <p className="font-medium text-[14px] mb-5">
              {/* <GeneralDataScreen /> */}
              Subjects
            </p>
            <div className="font-medium text-[13px]">
              <div>Junior Mathimatics</div>
              <div>Senior Mathimatics</div>
              <div>Junior English</div>
              <div>Senior English</div>
              <div>Chemistry</div>
              <div>Physics</div>
              <div>Biology</div>
              <div>Integrated Science</div>
              <div>Introduction to Technology</div>
              <div>Economics</div>
              <div>Agricultural Science</div>
            </div>
          </div>
        </div>
      </div>

      {showIV && (
        <div
          className="-top-0 w-full h-full left-0 absolute rounded-md overflow-hidden"
          style={{
            background: "rgba(73, 154, 255, 0.2)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(73, 154, 255, 0.3)",
          }}
        >
          <AddAnyItem
            titleCall="Add New Subject"
            offFn={handleDisplaySubjectOff}
            en
            text="Place the title fo the subject you are about to create and the Class that is meant to have this created subject!"
            placeStart="Mathematics"
            placeEnd="JSS 1A"
            startTitle="Enter Subject Name"
            endTitle="Class Assigned"
            setEnd={setClassAssigned}
            setStart={setSubject}
            start={subject}
            end={classAssigned}
            handleFn={handleCreateSubject}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      )}
    </div>
  );
};

export default HomeScreen;

// text,
//   handleFn,
//   start,
//   end,
//   setStart,
//   setEnd,
//   placeStart,
//   placeEnd,
//   startTitle,
//   endTitle,
