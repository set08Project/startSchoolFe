document.title = "Welcome Back";
import { Outlet } from "react-router-dom";
import Button from "../../components/reUse/Button";
import LittleHeader from "../../components/static/LittleHeader";
import { useDispatch, useSelector } from "react-redux";
import { displayDelay, displayStudent } from "../../global/reduxState";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const view = useSelector((state: any) => state.showStudent);

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

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 ">
      <div className="  col-span-1 sm:col-span-2 md:col-span-3   rounded-md h-[100%]">
        <LittleHeader name={"Dashboard"} />
        <Outlet />
      </div>
      <div className="col-span-1 border p-2 rounded-md h-[200px] sticky transition-all duration-300 top-16">
        <p className="font-medium text-[14px] mb-5">
          {/* <GeneralDataScreen /> */}
          Quick Action
        </p>

        <Button
          name="Push Announcement"
          className="bg-black hover:bg-neutral-800 transition-all duration-300 text-[13px] w-[95%] py-2 mb-2"
        />

        <Button
          name="Register new Student"
          className="bg-blue-950 text-[13px] w-[95%] py-2 mb-2"
          onClick={handleDisplayStudent}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
