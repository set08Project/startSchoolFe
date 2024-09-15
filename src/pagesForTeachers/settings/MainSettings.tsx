import { useState } from "react";
import LittleHeader from "../components/layout/LittleHeader";

const MainSettings = () => {
  const [activeSection, setActiveSection] = useState("My Profile");

  return (
    <div>
      <LittleHeader name={"Settings"} />

      <div>
        <div className="flex justify-start items-center gap-[20px] border-b transition-all duration-300">
          <div
            onClick={() => setActiveSection("My Profile")}
            className={`h-full cursor-pointer transition-all duration-300 ${
              activeSection === "My Profile"
                ? "border-b-[2px] border-blue-950 font-medium text-blue-950"
                : "border-transparent"
            }`}
          >
            <h1>My Profile</h1>
          </div>
          <div
            onClick={() => setActiveSection("My Socials")}
            className={`h-full cursor-pointer transition-all duration-300 ${
              activeSection === "My Socials"
                ? "border-b-[2px] border-blue-950 font-medium text-blue-950"
                : "border-transparent"
            }`}
          >
            <h1>My Socials</h1>
          </div>
          <div
            onClick={() => setActiveSection("Password and Security")}
            className={`h-full cursor-pointer transition-all duration-300 ${
              activeSection === "Password and Security"
                ? "border-b-[2px] border-blue-950 font-medium text-blue-950"
                : "border-transparent"
            }`}
          >
            <h1>Password and Security</h1>
          </div>
        </div>

        {/* EXPENDITURES AND FEES RECORDS DIVS */}

        {activeSection === "My Profile" && (
          <div className="mt-5 min-h-[70vh] smooth">
            <div>My Profile</div>
          </div>
        )}

        {activeSection === "My Socials" && (
          <div className="mt-5 min-h-[70vh]">
            <div>My Socials</div>
          </div>
        )}
        {activeSection === "Password and Security" && (
          <div className="mt-5 min-h-[70vh]">
            <div>Password and Security</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainSettings;
