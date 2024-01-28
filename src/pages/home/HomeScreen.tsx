import { Outlet } from "react-router-dom";
import Button from "../../components/reUse/Button";
import LittleHeader from "../../components/layout/LittleHeader";

const HomeScreen = () => {
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 ">
      <div className=" p-2 col-span-1 sm:col-span-2 md:col-span-3   rounded-md h-[100%]">
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
          name="Recruit New Staff"
          className="bg-blue-950 text-[13px] w-[95%] py-2 mb-2"
        />
      </div>
    </div>
  );
};

export default HomeScreen;
