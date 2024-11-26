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
            subjectQuiz?.classDetails!,
            subjectID!,
            formData
          )
            .then((res: any) => {
              if (res.status === 201) {
                mutate(`api/view-subject-quiz/${subjectID}`);
                navigate(`/subjects/${subjectID}`);
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
