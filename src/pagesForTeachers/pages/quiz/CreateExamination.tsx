import { useState, useEffect } from "react";
import LittleHeader from "../../components/layout/LittleHeader";
import Button from "../../components/reUse/Button";
import Input from "../../components/reUse/Input";

import { useDispatch, useSelector } from "react-redux";
import { addTestInstruction } from "../../../global/reduxState";
import PreviewExamination from "./PreviewExamination";

const CreateExamination = () => {
  const dispatch = useDispatch();
  const testQuestion = useSelector((state: any) => state.test);
  const [toggle, setToggle] = useState<boolean>(false);

  const [instruction, setInstruction] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [mark, setMark] = useState<string>("");

  const [fileData, setFileData] = useState();

  const uploadQuestion = (e: any) => {
    setFileData(e.target.files[0]);
  };

  return (
    <div>
      <LittleHeader name="Create Examination Question Screen" />

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
              Set Examination Instruction
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
              <div className="mt-10 w-full flex gap-2">
                <div className="flex flex-col">
                  <label className="text-[12px]">Time/Duration(Hours)</label>

                  <select
                    name="hour"
                    id="hour"
                    className="border border-blue-950 w-[120px] h-[50px] rounded-md  mt-2 px-2 relative transition-all duration-300 mb-6"
                    defaultValue={testQuestion[0]?.instruction?.duration}
                    value={duration}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setDuration(e.target.value);
                    }}
                  >
                    <option selected>choose</option>
                    <option value="1">1 Hour</option>
                    <option value="2">2 Hours</option>
                    <option value="3">3 Hours</option>
                    <option value="4">4 Hours</option>
                    <option value="5">5 Hours</option>
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
                name={"Add Examination Question"}
                className="text-white bg-red-500 uppercase text-[12px] ml-0 px-8 py-4"
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
        <div className=" col-span-3 min-h-[60vh]">
          <PreviewExamination
            duration={duration}
            mark={mark}
            file={fileData}
            instruction={instruction}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateExamination;
