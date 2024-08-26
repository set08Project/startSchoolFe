import React, { useState } from "react";
import Input from "../../../components/reUse/Input";
import PhoneNumberInput from "./PhoneInput";
import pic from "../../../assets/pix1.png";

const roles = ["Admin"];

const EnquiryForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Select Role");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (role) => {
    setSelectedRole(role);
    setIsOpen(false);
  };

  const handlePhoneNumberChange = (phone) => {
    console.log("Phone number:", phone);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="lg:h-[89%] min-h-screen lg:w-[55%] w-full shadow rounded-md flex justify-center items-center gap-3 py-4 flex-row-reverse">
        <div className="h-[87vh] w-[30%] lg:flex justify-end md:hidden items-end hidden">
          <div
            className="w-full h-full relative"
            style={{
              background: "linear-gradient(to bottom, transparent, #f0f0f0)",
            }}
          >
            <img
              src={pic}
              alt=""
              className="absolute w-full h-full object-contain top-[182px]"
            />
          </div>
        </div>
        <div className="h-full lg:w-[70%] w-full flex justify-center items-center flex-col gap-2">
          <div className="lg:w-[96%] md:w-[80%] lg:h-[18%] h-[12%] text-wrap">
            <p className="lg:text-[29px] md:text-[20px] text-[13px] ml-8 md:ml-0 text-black font-medium pt-4 overflow-hidden overflow-ellipsis break-words ">
              Digitize your school in minutes with NEXT's Integrated Platform
            </p>
          </div>
          <div className="w-[96%] h-[80%] flex justify-center items-center flex-col gap-2">
            <div className="h-[20%] w-full flex flex-col">
              <label htmlFor="input-field" className="mt-2 text-gray-700 pl-2">
                Enter your Name:
              </label>
              <Input
                type="text"
                id="input-field"
                className="p-4 mt-3 pb-5 w-[90%] rounded"
                placeholder="Enter Your Name..."
              />
            </div>
            <div className="h-[20%] w-full flex flex-col">
              <label htmlFor="input-field" className="mt-2 text-gray-700 pl-2">
                Enter your Email:
              </label>
              <Input
                type="text"
                id="input-field"
                className="p-4 mt-3 pb-5 w-[90%] rounded"
                placeholder="Enter Your Email..."
              />
            </div>
            <div className="h-[20%] w-full flex flex-col">
              <label htmlFor="input-field" className="mt-2 text-gray-700 pl-2">
                Enter your School Name:
              </label>
              <Input
                type="text"
                id="input-field"
                className="p-4 mt-3 pb-5 w-[90%] rounded"
                placeholder="Enter Your School Name..."
              />
            </div>
            <div className="h-[20%] w-full flex flex-col gap-5">
              <label htmlFor="input-field" className="mt-2 text-gray-700 pl-2">
                Select Organization Type
              </label>
              <div className="flex gap-4 ml-2 lg:flex-row flex-col">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="rounded-md "
                  />
                  <p>Independent School</p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="rounded-md "
                  />
                  <p>Group Of Schools</p>
                </div>
              </div>
            </div>
            <div className="h-[40%] w-full ">
              <div className="bg-white w-full py-6 rounded-lg flex justify-between items-center lg:flex-row flex-col">
                <div className="w-full">
                  <PhoneNumberInput onChange={handlePhoneNumberChange} />
                </div>
                <div className="lg:w-[39%] w-full lg:h-20 h-14 flex justify-between items-center">
                  <div className="relative w-[89%] h-10">
                    <button
                      className="w-full h-full text-[13px] bg-gray-100 flex items-center justify-between px-2 py-6 lg:py-6 lg:px-6 border border-gray-300 rounded-md shadow-sm hover:bg-blue-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
                      onClick={toggleDropdown}
                    >
                      <p className="font-medium lg:text-[17px]">
                        {selectedRole}
                      </p>
                      <svg
                        className={`lg:w-5 lg:h-5 h-3 w-3 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {roles.map((role) => (
                          <button
                            key={role}
                            onClick={() => handleSelect(role)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button className="py-4 px-4 mt-4 rounded-md bg-blue-400 text-white font-bold">
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
