import React from "react";
import PasswordInput from "../../components/reUse/PasswordIput";
import { MdOutlineSecurity } from "react-icons/md";

const StudentPasswordSecurity = () => {
  return (
    <div>
      <div className="overflow-hidden">
        {/* Terms and Guidelines */}
        <div className="mt-5 p-4 xl:w-[900px] bg-gray-200 transition-all duration-300 rounded-md shadow-sm">
          <h4 className="font-semibold mb-3 text-[17px] flex items-center gap-2">
            <MdOutlineSecurity />{" "}
            <span className="text-blue-950 font-extrabold">NEXT</span> Security
            Guidelines
          </h4>
          <ul className="ml-5 list-disc text-gray-700 text-sm">
            <li className="mb-2">
              Passwords must be changed regularly to enhance your account
              security.
            </li>
            <li className="mb-2">
              Never share your password with anyone, and avoid reusing passwords
              across multiple platforms.
            </li>
            <li className="mb-2">
              For additional protection, enable two-factor authentication (2FA)
              for your account.
            </li>
            <li className="mb-2">
              Your new password should be at least 8 characters long and include
              a mix of uppercase, lowercase, numbers, and special characters.
            </li>
          </ul>
        </div>
        <div className="border my-10" />
        <div className="lg:flex lg:gap-4 items-start">
          {/* Step 1: Confirm Older Password */}
          <div className="mb-4 lg:mb-0">
            <div>Step 1</div>
            <div className="mb-3 font-semibold">Confirm Older Password</div>
            <div className="p-4 min-h-[250px] xl:w-[450px] bg-gray-100 transition-all duration-300 rounded-md shadow-sm">
              <h3 className="ml-3 mb-5 font-semibold text-[17px]">
                Input your current password
              </h3>
              <PasswordInput
                placeholder="Current Password"
                className="bg-white rounded-md w-[240px] sm:w-[340px]"
              />
              <p className="ml-3 text-sm text-gray-600">
                For your security, please enter your current password to verify
                your identity before making any changes.
              </p>
              <button className="ml-3 mt-4 rounded-md py-2 px-3 bg-blue-950 text-white transition-all duration-300 hover:scale-105">
                Confirm
              </button>
            </div>
          </div>

          {/* Step 2: Add New Password */}
          <div>
            <div>Step 2</div>
            <div className="mb-3 font-semibold">Add New Password</div>
            <div className="p-4 min-h-[250px] xl:w-[450px] bg-gray-100 transition-all duration-300 rounded-md shadow-sm">
              <h3 className="ml-3 mb-5 font-semibold text-[17px]">
                Input your new password
              </h3>
              <PasswordInput
                placeholder="New Password"
                className="bg-white rounded-md w-[240px] sm:w-[340px]"
              />
              <p className="ml-3 text-sm text-gray-600 mt-2">
                Ensure that your new password is unique and hasn't been used
                before.
              </p>
              <button className="ml-3 mt-4 rounded-md py-2 px-3 bg-blue-950 text-white transition-all duration-300 hover:scale-105">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPasswordSecurity;