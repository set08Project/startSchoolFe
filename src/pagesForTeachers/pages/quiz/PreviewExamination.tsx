import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/reUse/Button";
import { createExaminationData, readClassInfo } from "../../api/teachersAPI";
import { displayEmptyTest } from "../../../global/reduxState";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { useSujectQuiz } from "../../hooks/useTeacher";
import { mutate } from "swr";
import { FaSpinner } from "react-icons/fa";
import { useReadMyClassInfoData } from "../../../pagesForStudents/hooks/useStudentHook";

const PreviewExamination: FC<any> = ({ instruction, duration, mark, file }) => {
  const navigate = useNavigate();
  const { subjectID } = useParams();
  const { subjectQuiz } = useSujectQuiz(subjectID!);

  const [state, setState] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    readClassInfo(subjectQuiz?.designated).then((res: any) => {
      setState(res.data);
    });
  }, []);

  return (
    <div>
      {/* <p>Preview Entries</p>
      <p className="mt-10 font-bold">Test Instructions</p>
      <p className="mr-6 mt-2">{testQuestion[0]?.instruction?.instruction}</p>
      <div className="flex gap-3 capitalize mt-5 font-medium text-[14px] mr-6 pb-5 border-b">
        <p>duration: {testQuestion[0]?.instruction?.duration}hour</p>
        <p>mark per Question: {testQuestion[0]?.instruction?.mark} points</p>
      </div>
      <p className="my-6 font-semibold">Questions</p>
      <div className="w-[90%]">
        {testQuestion[1]?.question?.map((props: any, index: number) => (
          <div key={index}>
            <p className="text-[14px] font-bold mt-10">Question {index + 1}.</p>
            <div className="ml-4 ">
              <p className="text-[18px]">{props?.question}</p>

              <div className="ml-8">
                <p className="text-[15px] mt-5 mb-3 italic">
                  Answer: {props?.answer}
                </p>
                {props.options.map((props: any, i: number) => {
                  const choiceValue = Object.values(props)[0];
                  const choice: any = Object.keys(props)[0];
                  let val: string = "";

                  if (typeof props === "string") {
                    val = props.split(",")[choice];
                  }

                  return (
                    <div key={i} className="flex items-center gap-2 ml-4">
                      <input
                        className="radio radio-sm"
                        type="radio"
                        onChange={() => {
                          //   handleStateChange(index, choiceValue);
                        }}
                        id={`${index} - ${choice}`}
                        value={`${choiceValue}`}
                        checked={{}[index] === choiceValue}
                      />
                      <label htmlFor={`${index} - ${choice}`}>{val}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div> */}

      <Button
        name={
          loading ? (
            <div className="gap-3 flex items-center justify-center">
              <FaSpinner className="animate-spin text-[15px]" />{" "}
              <span>Loading...</span>
            </div>
          ) : (
            "Publish Question"
          )
        }
        className={`text-black border mt-50 ${
          instruction && mark && duration && "bg-neutral-950"
        } uppercase text-[12px] px-10 ml-4 py-4 bg-blue-950`}
        onClick={() => {
          setLoading(true);
          const formData: any = new FormData();
          formData.append("instruction", instruction);
          formData.append("duration", duration);
          formData.append("mark", mark);
          formData.append("file", file);

          createExaminationData(
            subjectQuiz?.subjectClassID!,
            subjectID!,
            formData
          )
            .then((res: any) => {
              if (res.status === 201) {
                mutate(`api/view-subject-quiz/${subjectID}`);
                //   navigate(`/subjects/${subjectID}`);
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      />
    </div>
  );
};

export default PreviewExamination;
