import { useState } from "react";
import ReactQuill from "react-quill";
import { useStudentInfo } from "../../hooks/useStudentHook";
import { createStudentArticle } from "../../api/studentAPI";
import { useNavigate } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

const CreateArticle = () => {
  const [area, setArea] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [iValue, setIValue] = useState<string>("");
  const navigate = useNavigate();

  const { studentInfo } = useStudentInfo();

  const handleSubmit = () => {
    createStudentArticle(studentInfo?.schoolIDs, studentInfo?._id, {
      title: iValue,
      content: value,
      desc: area,
    }).then((res) => {
      navigate(`/articles/${res?.data?._id}`);
    });
  };

  return (
    <div className=" w-full flex justify-center items-center">
      <div className=" w-[85%] min-h-[500px]">
        <div className=" w-full h-[40px] flex gap-5">
          <input
            type="text"
            placeholder="Title"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className=" capitalize bg-white border-b rounded-none outline-none w-full px-4 h-full text-blue-950"
          />
          <textarea
            placeholder="Description"
            value={iValue}
            maxLength={100}
            onChange={(e) => setIValue(e.target.value)}
            className=" capitalize bg-white border-b rounded-none outline-none w-full px-4 h-full text-blue-950"
          />
        </div>
        <div className=" mt-10 mb-20 min-h-[500px]">
          <p className="text-[12px] mt-3">Article</p>
          <div className="w-full my-1  min-h-[300px] border">
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                setValue(data);
              }}
            />
          </div>
        </div>
        <div className=" w-full">
          <button
            className="mt-10 lg:mt-0 py-2 px-4 rounded-md bg-blue-950 text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
