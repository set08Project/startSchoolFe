import { FC, useState } from "react";
import { inputData } from "./InputData";
import lodash from "lodash";
import LittleHeader from "../../components/layout/LittleHeader";
import InputWithLabel from "./InputWithLabel";
import {
  createTeacherLessonNote,
  editTeacherLessonNote,
} from "../../api/teachersAPI";
import { useLessonNote, useTeacherInfo } from "../../hooks/useTeacher";
import TextArea from "./TextArea";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Editor from "./NoteCreated";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

document.title = "update and Improve Lesson Note ";

const EditLessonNote = () => {
  const { noteID } = useParams();

  const navigate = useNavigate();
  const { teacherInfo } = useTeacherInfo();

  const [loading, setLoading]: any = useState(false);
  const [value, setValue]: any = useState("");
  const [areaOne, setAreaOne]: any = useState("");
  const [areaTwo, setAreaTwo]: any = useState("");

  const [iValue, setiValue]: any = useState([""]);

  const { lessonNoteData }: any = useLessonNote(noteID!);

  const handleSubmit = () => {
    setLoading(true);

    const convertedData = lodash.reduce(
      iValue,
      (result: any, { label, value }) => {
        result[label] = value;
        return result;
      },
      {}
    );
    const convertedData1 = lodash.reduce(
      areaOne,
      (result: any, { label, value }) => {
        result[label] = value;
        return result;
      },
      {}
    );
    const convertedData2 = lodash.reduce(
      areaTwo,
      (result: any, { label, value }) => {
        result[label] = value;
        return result;
      },
      {}
    );

    const gatheredData = {
      ...convertedData,
      ...convertedData1,
      ...convertedData2,
      content: value,
    };

    editTeacherLessonNote(teacherInfo?._id, noteID, gatheredData).then(
      (res) => {
        if (res.status === 201) {
          setLoading(false);
          navigate("/lesson-note");
        } else {
          setLoading(false);
        }
      }
    );
  };

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  let getRead = { ...lessonNoteData };
  let fetchRead = { ...lessonNoteData };

  const mainInputData = [
    {
      label: "This lesson is for what week?",
      placeholder: "Week 1",
      name: "week",
      defaultValue: `${lessonNoteData?.week}`,
    },
    {
      label: "Input the started date",
      placeholder: "10/02/2024",
      name: "createDate",
      defaultValue: `${lessonNoteData?.createDate}`,
    },
    {
      label: "This lesson is for what class?",
      placeholder: "JSS 1B",
      name: "classes",
      defaultValue: `${lessonNoteData?.classes}`,
    },
    {
      label: "This lesson is for what subject?",
      placeholder: "Mathematics",
      name: "subject",
      defaultValue: `${lessonNoteData?.subject}`,
    },
    {
      label: "This lesson is for what topic?",
      placeholder: "Probabilty",
      name: "topic",
      defaultValue: `${lessonNoteData?.topic}`,
    },
    {
      label: "This lesson is for what sub-topic?",
      placeholder: "Sub-Topic",
      name: "subTopic",
      defaultValue: `${lessonNoteData?.subTopic}`,
    },
    {
      label: "This lesson is for how many periods?",
      placeholder: "2 - 5",
      name: "period",
      defaultValue: `${lessonNoteData?.period}`,
    },
    {
      label: "How long will this lesson take?",
      placeholder: "40 minutes x no of periods",
      name: "duration",
      defaultValue: `${lessonNoteData?.duration}`,
    },
    {
      label: "What are your teaching materials?",
      placeholder: "die, coins, or charts",
      name: "instructionalMaterial",
      defaultValue: `${lessonNoteData?.instructionalMaterial}`,
    },
    {
      label: "What are your reference materials?",
      placeholder: "Integrated Mathematics",
      name: "referenceMaterial",
      defaultValue: `${lessonNoteData?.referenceMaterial}`,
    },
  ];

  return (
    <div>
      <LittleHeader name={`${document.title} `} />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 text-blue-950 mt-10">
        {mainInputData?.map((el, i: number) => {
          return (
            <InputWithLabel
              defaultValue={`${el.defaultValue!}`}
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
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          {
            placeholder: "Previous Knowledge",
            name: "previousKnowledge",
            defaultValue: `${lessonNoteData?.previousKnowledge}`,
          },
          {
            placeholder: "Specific Objectives",
            name: "specificObjectives",
            defaultValue: `${lessonNoteData?.specificObjectives}`,
          },
        ].map((el, i: number) => (
          <TextArea
            defaultValue={el.defaultValue}
            value={areaOne[i] ? areaOne[i].value : ""}
            placeholder={el.placeholder}
            label={el.placeholder}
            onChange={(e: any) => {
              const newValue = e.target.value;
              setAreaOne((prevValues: any) => {
                const updatedValues = [...prevValues];
                updatedValues[i] = { label: el.name, value: newValue };
                return updatedValues;
              });
            }}
          />
        ))}
      </div>
      <p className="text-[12px] mt-3">Lesson Note</p>
      <div className="w-full my-1  min-h-[300px] border">
        <CKEditor
          editor={ClassicEditor}
          data={getRead?.content}
          onChange={(event, editor) => {
            const data = editor.getData();

            setValue(data);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
        {[
          {
            placeholder: "Evaluation",
            name: "evaluation",
            defaultValue: `${fetchRead?.evaluation}`,
          },
          {
            placeholder: "Summary",
            name: "summary",
            defaultValue: `${fetchRead?.summary}`,
          },
          {
            placeholder: "Presentation",
            name: "presentation",
            defaultValue: `${fetchRead?.presentation}`,
          },
          {
            placeholder: "Assignment",
            name: "assignment",
            defaultValue: `${fetchRead?.assignment}`,
          },
        ].map((el, i: number) => {
          console.log(el.defaultValue);
          return (
            <TextArea
              defaultValue={`${el?.defaultValue}`}
              value={areaTwo[i] ? areaTwo[i].value : ""}
              placeholder={el.placeholder}
              label={el.placeholder}
              onChange={(e: any) => {
                const newValue = e.target.value;
                setAreaTwo((prevValues: any) => {
                  const updatedValues = [...prevValues];
                  updatedValues[i] = { label: el.name, value: newValue };
                  return updatedValues;
                });
              }}
            />
          );
        })}
      </div>
      <button
        onClick={handleSubmit}
        className="btn text-white bg-blue-950 mt-3 px-12 hover:bg-blue-900 border-none"
      >
        {loading ? (
          <div>
            <ClipLoader size={10} color="white" />
            <span>Processing...</span>
          </div>
        ) : (
          "Submit Improved Note "
        )}
      </button>
    </div>
  );
};

export default EditLessonNote;
