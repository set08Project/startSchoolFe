import { FC, TextareaHTMLAttributes } from "react";

interface iTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  value?: string;
  placeholder?: string;
}

const TextArea: FC<iTextArea> = ({ label, value, placeholder, ...props }) => {
  return (
    <div>
      {label}
      <textarea
        value={value}
        placeholder="Previous Knowledge"
        className="w-auto col-span-1 bg-white border transition-all duration-300 focus:outline-1 focus:outline outline-blue-950 rounded-md p-3 "
        {...props}
      />
    </div>
  );
};

export default TextArea;
