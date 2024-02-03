import React, { FC } from "react";
import Button from "../components/reUse/Button";

interface iProps {
  props?: any;
}
const MainHeader: FC<iProps> = ({ props }) => {
  console.log("reading this: ", props);
  return (
    <div
      className="fixed border-b w-full h-[70px] flex justify-center items-center
    
    "
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        // border: "1px solid rgba(73, 154, 255, 0.3)",
      }}
    >
      <div className="w-[90%] flex justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[100px] h-[60px] object-contain flex justify-center items-center border rounded-md ">
            SCH.
          </div>
          <div className="font-bold text-[25px]">{props?.schoolName}</div>
        </div>
        <div>
          <Button
            name="Get Started"
            className="bg-blue-950 text-[12px] py-4 px-8 hover:bg-blue-900 transition-all duration-300 "
          />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
