import pix from "../../../assets/pix.jpg";
import {
  useReadOneClassInfo,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import { useClassStudent } from "../../../pagesForTeachers/hooks/useTeacher";

const StudentPerformance = () => {
  const { studentInfo } = useStudentInfo();
  const { oneClass } = useReadOneClassInfo(studentInfo?.presentClassID);
  const { classStudents } = useClassStudent(oneClass?._id);

  return (
    <div className="">
      <div className="carousel carousel-center h-[400px] rounded-box *:bg-slate-100 gap-2">
        {classStudents?.students?.map((props: any, i: number) => (
          <div key={props?._id} className="carousel-item">
            {i < 3 && (
              <div>
                <img
                  src={props?.avatar ? props?.avatar : pix}
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
                      <span className="mr-0 capitalize font-bold">
                        {/* {props?.attendance} */}
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
