import React from "react";
import scan from "./scan.png";

const ClockingScreen = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <img src={scan} alt="Scan" />
        <div className="mt-5 text-3xl font-bold text-black">Scan your ID</div>
        <div className="text-lg font-medium text-black">
          Please scan for Clocking
        </div>
      </div>
    </div>
  );
};

export default ClockingScreen;
