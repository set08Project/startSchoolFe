import { useState, useEffect } from "react";
import LittleHeader from "../../components/layout/LittleHeader";
import Button from "../../components/reUse/Button";
import Input from "../../components/reUse/Input";

import { useDispatch, useSelector } from "react-redux";
import { addTestInstruction } from "../../../global/reduxState";
import PreviewExamination from "./PreviewExamination";
import PreviewMidTestScreen from "./PreviewMidTestQuestions";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const CreateMidTestScreen = () => {
  const [editorValue, setEditorValue] = useState("");

  const dispatch = useDispatch();
  const testQuestion = useSelector((state: any) => state.test);
  const [toggle, setToggle] = useState<boolean>(false);

  const [instruction, setInstruction] = useState<string>("");
  const [duration, setDuration] = useState<string>("0.084");
  const [mark, setMark] = useState<string>("2");

  const [fileData, setFileData] = useState();

  const uploadQuestion = (e: any) => {
    setFileData(e.target.files[0]);
  };
  document.title = "NEXT: Creating mid Test Questions";

  //   {

  //   clipboard: {
  //     matchVisual: false,
  //   },
  // }

  // {
  //     modules: {
  //       toolbar: '#toolbar'
  //     },
  //     formats: ["size", "bold", "script"], // Important
  //   }

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      // Create a FormData object to send the image to the server
      const formData = new FormData();
      formData.append("image", file);

      try {
        // Upload the image to your server or third-party service
        const response = await axios.post("YOUR_IMAGE_UPLOAD_URL", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Assuming the response contains the URL of the uploaded image
        const imageUrl = response.data.url; // Modify based on your server's response

        // Insert image into the editor
        // const range = this.quill.getSelection();
        // this.quill.insertEmbed(range.index, "image", imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
  };

  const toolbar = [
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],
  ];

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline", "strike"],
        ["link", "image"],
        [{ align: [] }],
      ],
      // handlers: {
      //   image: imageHandler, // Hook the custom image handler
      // },
    },
  };

  return (
    <div>
      <LittleHeader name="Create Mid-Test Question Screen" />

      <div className="mt-10" />

      <div className="grid grid-cols-1 relative">
        <div className="order-first mb-10 border col-span-2 min-h-[200px] top-20 p-4 rounded-lg flex flex-col">
          <div className="flex">
            <label
              htmlFor="question"
              className="py-3 px-8 bg-neutral-950 text-[13px] uppercase font-semibold text-white rounded-sm cursor-pointer hover:bg-neutral-800 duration-300 transition-all"
            >
              Upload Question
            </label>
            <input
              className="hidden"
              id="question"
              type="file"
              onChange={uploadQuestion}
            />
          </div>

          <div className="mt-10" />

          <div className="h-full flex flex-col">
            <p className="my-2 font-medium capitalize border-b">
              Set Mid-Test Instruction
            </p>

            <div>
              <div className="mt-5 flex flex-col">
                <label className="text-[12px]">Enter Instruction</label>
                <textarea
                  placeholder="Enter Instructions"
                  className="ml-0 w-full lg:max-w-[80%] border bg-gray-100 text-[12px] h-[200px] rounded-md resize-none outline-none p-2"
                  value={instruction}
                  onChange={(e) => {
                    setInstruction(e.target.value);
                  }}
                />
              </div>
              <div className="mt-5 flex flex-col">
                <label className="mt-5 mb-2 text-[16px]">
                  <strong className="font-[500]">Section B: </strong>for Theory
                  Questions
                </label>

                <ReactQuill
                  value={editorValue}
                  onChange={(value) => {
                    setEditorValue(value);
                  }}
                  modules={modules}
                  theme="snow"
                  className="ml-0 w-full lg:max-w-[80%] border bg-gray-100 text-[12px] min-h-[100px] rounded-md resize-none outline-none p-2"
                />
              </div>
              <div className="mt-10 w-full flex gap-2">
                <div className="flex flex-col">
                  <label className="text-[12px]">Time/Duration(Hours)</label>
                  <select
                    className="border border-blue-950 w-full h-[50px] rounded-md  mt-2 px-2 relative transition-all duration-300 mb-6 select select-bordered max-w-xs "
                    name="hour"
                    id="hour"
                    defaultValue={testQuestion[0]?.instruction?.duration}
                    value={duration}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setDuration(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      choose
                    </option>

                    <option value="0.084">5 Minutes</option>
                    <option value="0.167">10 Minutes</option>
                    <option value="0.333">20 Minutes</option>
                    <option value="0.500">30 Minutes</option>
                    <option value="0.667">40 Minutes</option>
                    <option value="0.833">50 Minutes</option>
                    <option value="1.000">60 Minutes</option>
                    <option value="1.500">90 Minutes</option>
                  </select>
                </div>
                <div className="-mt-1 ml-6">
                  <label className="text-[12px] ">
                    Enter Mark Per Question
                  </label>
                  <Input
                    placeholder="Enter Marks"
                    className="ml-0 w-full"
                    defaultValue={testQuestion[0]?.instruction?.mark}
                    value={mark}
                    onChange={(e) => {
                      setMark(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <Button
                name={fileData ? "Ready To Publish" : "Yet to Upload"}
                className={`text-white ${
                  fileData ? "bg-red-500" : "bg-neutral-950"
                } uppercase text-[12px] ml-0 px-8 py-4`}
                onClick={() => {
                  setToggle(true);
                  let data: any = { duration, instruction, mark };
                  dispatch(addTestInstruction(data!));
                }}
              />
            </div>
            <div className="flex-1" />
          </div>
        </div>
        <div className=" col-span-3 ">
          <PreviewMidTestScreen
            duration={duration}
            mark={mark}
            file={fileData}
            instruction={instruction}
            editorValue={editorValue}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateMidTestScreen;
