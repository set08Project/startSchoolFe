import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { inputData } from "./InputData";
import ReactQuill from "react-quill";
import lodash from "lodash";
import LittleHeader from "../../components/layout/LittleHeader";
import InputWithLabel from "./InputWithLabel";
import { createTeacherLessonNote } from "../../api/teachersAPI";
import { useSchool, useSchoolCookie } from "../../../pages/hook/useSchoolAuth";
import { useTeacherCookie } from "../../hooks/useTeacher";
import TextArea from "./TextArea";

document.title = "Lesson Note";

// const { dataID } = useSchoolCookie();
// const { staffID } = useTeacherCookie();

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],

  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];

const modules = {
  toolbar: toolbarOptions,
};

const CreateLesson = () => {
  const [value, setValue]: any = useState("");
  //   const [prevKnow, setPrevKnow]: any = useState("");
  const [prevKnow, setPrevKnow]: any = useState("");

  const [iValue, setiValue]: any = useState([""]);

  const handleSubmit = () => {
    const convertedData = lodash.reduce(
      iValue,
      (result: any, { label, value }) => {
        result[label] = value;
        return result;
      },
      {}
    );

    // createTeacherLessonNote(dataID, staffID, convertedData);
    console.log(convertedData);
  };

  return (
    <div>
      <LittleHeader name={document.title} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 text-blue-950 mt-10">
        {inputData.map((el, i: number) => (
          <InputWithLabel
            label={el.label}
            placeholder={el.placeholder}
            value={iValue[i] ? iValue[i].value : ""}
            onChange={(e: any) => {
              const newValue = e.target.value;
              setiValue((prevValues: any) => {
                const updatedValues = [...prevValues];
                updatedValues[i] = { label: el.name, value: newValue };
                return updatedValues;
              });
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={prevKnow}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPrevKnow(e.target.value)
          }
          placeholder="Previous Knowledge"
          className="w-auto col-span-1 bg-white border transition-all duration-300 focus:outline-1 focus:outline outline-blue-950 rounded-md p-3 "
        />
        {/* <TextArea
          value={prevKnow}
          placeholder="Previous Knowledge"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPrevKnow(e.target.value)
          }
        /> */}
        <textarea
          placeholder="Specific Objectives"
          className="w-auto col-span-1 bg-white border transition-all duration-300 focus:outline-1 focus:outline outline-blue-950 rounded-md p-3 "
        />
      </div>
      <div className="w-full mt-4">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="h-[300px]"
          modules={modules}
          placeholder="Content"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-16">
        <textarea
          placeholder="Evaluation"
          className="w-auto col-span-1 bg-white border transition-all duration-300 focus:outline-1 focus:outline outline-blue-950 rounded-md p-3"
        ></textarea>
        <textarea
          placeholder="Summary"
          className="w-auto col-span-1 bg-white border transition-all duration-300 focus:outline-1 focus:outline outline-blue-950 rounded-md p-3"
        ></textarea>
        <textarea
          placeholder="Presentation"
          className="w-auto col-span-1 bg-white border transition-all duration-300 focus:outline-1 focus:outline outline-blue-950 rounded-md p-3"
        ></textarea>
        <textarea
          placeholder="Assignment"
          className="w-auto col-span-1 bg-white border transition-all duration-300 focus:outline-1 focus:outline outline-blue-950 rounded-md p-3"
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        className="btn text-white bg-blue-950 mt-3 hover:bg-blue-900 border-none"
      >
        Submit
      </button>
    </div>
  );
};

export default CreateLesson;
