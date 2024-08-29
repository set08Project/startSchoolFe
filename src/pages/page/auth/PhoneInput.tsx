import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber, getCountryCallingCode } from "libphonenumber-js";
import "../../../index.css";

const PhoneNumberInput = ({ onChange }) => {
  const [value, setValue] = useState("");

  const handlePhoneChange = (phone) => {
    const country = "NG";
    const maxLength = 10 + getCountryCallingCode(country).length;

    if (phone && phone?.length > maxLength) {
      return;
    }

    setValue(phone);
    if (onChange) {
      onChange(phone);
    }
  };

  return (
    <div className="w-full lg:w-[50%] max-w-md mx-auto ml-10">
      <label
        htmlFor="phone-input"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Phone Number
      </label>
      <PhoneInput
        id="phone-input"
        international
        defaultCountry="NG"
        value={value}
        onChange={handlePhoneChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        placeholder="Enter your phone number"
      />
    </div>
  );
};

export default PhoneNumberInput;