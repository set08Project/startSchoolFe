import { FC } from "react";
import pix from "../../../assets/pix.jpg";
import { useStudentAttendant } from "../../../pagesForStudents/hooks/useStudentHook";
import { useSchoolData, useTopSchoolStudent } from "../../hook/useSchoolAuth";

interface iProps {
  props?: any;
}
const StudentRatio: FC<iProps> = ({ props }) => {
  const { studentAttendance } = useStudentAttendant(props);
  console.log(studentAttendance);

  const arrayData = studentAttendance?.attendance?.filter((el: any) => {
    return el.present === true;
  });

  let ratio = (
    arrayData?.length / studentAttendance?.attendance.length
  ).toFixed(2);

  return <span>{ratio}</span>;
};

const StudentPerformance = () => {
  const { data } = useSchoolData();
  const { perform } = useTopSchoolStudent(data?._id);

  return (
    <div className="">
      <div className="carousel carousel-center h-[400px] rounded-box *:bg-slate-100 gap-2">
        {perform?.data?.map((props: any, i: number) => (
          <div key={props?._id} className="carousel-item">
            {i < 5 && (
              <div>
                <img
                  src={pix}
                  alt="Pizza"
                  className="w-[280px] h-[82%] object-cover "
                />
                <div className="p-2 text-[12px]">
                  <p>
                    Name:{" "}
                    <span className="capitalize font-bold">
                      {props?.studentFirstName} {props?.studentLastName}
                    </span>
                  </p>
                  <p>
                    Class:{" "}
                    <span className="capitalize font-bold">
                      {props?.classAssigned}
                    </span>
                  </p>
                  <div className="flex items-center text-[10px] gap-3 mt-3 leading-tight">
                    <p>
                      Grade Ratio:{" "}
                      <span className="capitalize font-bold">
                        {props?.totalPerformance}
                      </span>
                    </p>
                    &middot;
                    <p>
                      Att. Ratio:{" "}
                      <span className="mr- capitalize font-bold">
                        <StudentRatio props={props?._id} />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentPerformance;
