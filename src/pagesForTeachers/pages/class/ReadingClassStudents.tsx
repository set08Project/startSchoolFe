import { Link } from "react-router-dom";
import pix from "../../../assets/pix.jpg";
import Button from "../../components/reUse/Button";
import { FC } from "react";
import {
  useAttendance,
  useClassStudent,
  useSchoolAnnouncement,
  useStudentGrade,
} from "../../hooks/useTeacher";
import { FaCheckDouble } from "react-icons/fa6";
import moment from "moment";
import { useStudentAttendance } from "../../../pages/hook/useSchoolAuth";
import { useStudentInfoData } from "../../../pagesForStudents/hooks/useStudentHook";

interface iProps {
  props?: any;
  id?: string;
  data?: any;
}

const Remark: FC<iProps> = ({ id, data }) => {
  const { attendance } = useAttendance(id!);

  let name2 = data?.studentFirstName;

  let result = attendance?.attendance?.find((el: any) => {
    return el?.studentFirstName === name2;
  });

  let timer = Date.now();

  return (
    <div
      className={`w-[100px] border-r 
      ${
        result?.present
          ? "text-green-600"
          : result?.absent
          ? "text-red-600"
          : null
      }`}
    >
      {moment(result?.createdAt).format("ll") === moment(timer).format("ll") &&
      result?.present
        ? "Present"
        : result?.absent
        ? "Absent"
        : null}
    </div>
  );
};

const AttendanceRatio: FC<iProps> = ({ props }) => {
  const { mainStudentAttendance } = useStudentAttendance(props);

  return (
    <div>
      {(mainStudentAttendance?.data?.attendance?.filter(
        (el: any) => el.present === true
      ).length /
        mainStudentAttendance?.data?.attendance?.length) *
      100 ? (
        <div>
          {(
            (mainStudentAttendance?.data?.attendance?.filter(
              (el: any) => el.present === true
            ).length /
              mainStudentAttendance?.data?.attendance?.length) *
            100
          ).toFixed(2)}
          %
        </div>
      ) : (
        <div>0%</div>
      )}
    </div>
  );
};

const ReadingClassStudents: FC<iProps> = ({ props }) => {
  const { classStudents } = useClassStudent(props);
  const allStudents = classStudents?.students;
  const sortedStudents = allStudents?.sort((a, b) =>
    a.studentFirstName?.localeCompare(b.studentFirstName)
  );

  return (
    <div>
      <div className="mt-4">
        <div className=" py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
          <div className="text-[gray] w-[1920px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4 border-b pb-3">
            <div className="w-[50px] border-r">S/N</div>
            <div className="w-[100px] border-r">
              student
              <br />
              Image
            </div>
            <div className="w-[200px] border-r">student Name</div>
            <div className="w-[120px] border-r">Today's Attendance</div>
            <div className="w-[100px] border-r">Student's Attendance Ratio</div>

            <div className="w-[100px] border-r">Student Class</div>

            <div className="w-[150px] border-r">Gender</div>
            <div className="w-[200px] border-r">Address </div>

            <div className="w-[200px] border-r">Performance Ratio</div>

            <div className="w-[80px] border-r">Rate</div>
            <div className="w-[180px] border-r">View Detail</div>

            <div className="w-[180px] border-r">
              View{" "}
              <span className="italic font-semibold text-[14px]">
                {classStudents?.presentTerm}
              </span>{" "}
              <br />
              Record Card
            </div>
          </div>

          <div>
            {sortedStudents?.length > 0 ? (
              <div className=" w-[1920px] overflow-hidden">
                {sortedStudents?.map((props: any, i: number) => (
                  <div>
                    <div>
                      <div
                        key={props}
                        className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
                          i % 2 === 0 ? "bg-slate-50" : "bg-white"
                        }`}
                      >
                        <div className="w-[50px] border-r">{i + 1}</div>
                        {/* Image and Name */}
                        <div className="w-[100px] flex justify-center border-r">
                          <img
                            className="w-14 h-14 rounded-md border object-cover"
                            src={pix}
                          />
                        </div>
                        <div className="w-[200px] border-r">
                          <p>
                            {props?.studentFirstName} {props?.studentLastName}
                          </p>

                          <p>
                            LoginID:{" "}
                            <span className="font-semibold">
                              {props?.enrollmentID}
                            </span>
                          </p>
                        </div>

                        <div className="w-[120px]">
                          <Remark data={props} id={classStudents?._id} />
                        </div>

                        <div className="w-[100px] border-r">
                          <AttendanceRatio props={props?._id} />
                        </div>

                        <div className="w-[100px] border-r  ">
                          {classStudents?.className}
                        </div>
                        <div className="w-[150px] border-r  ">
                          {props?.phone ? props.phone : "no phone yet"}
                        </div>
                        <div className="w-[200px] border-r  ">
                          {props?.gender ? props.gender : "no gender added"}
                        </div>
                        <div className="w-[200px] border-r  ">
                          {props?.totalPerformance
                            ? props?.totalPerformance
                            : 0}
                          %
                        </div>

                        <div className="w-[80px] border-r">
                          {props?.totalPerformance
                            ? Math.floor(props?.totalPerformance / 20)
                            : 0}{" "}
                          of 5
                        </div>

                        <Link
                          to={`student-details/:studentID`}
                          className="w-[180px] border-r"
                        >
                          <Button
                            name="View Detail"
                            className="py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
                            onClick={() => {}}
                          />
                        </Link>
                        <View props={props} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
                  <FaCheckDouble size={13} />
                  <p className="mt-3 text-[12px] font-medium">
                    No Subject added yet
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingClassStudents;

const View: FC<any> = ({ props }) => {
  const { gradeData } = useStudentGrade(props?._id!);
  const { studentInfoData: studentInfo } = useStudentInfoData(props?._id);
  const { schoolAnnouncement }: any = useSchoolAnnouncement(
    gradeData?.schoolIDs
  );

  let school: any = schoolAnnouncement;

  let grade = gradeData?.reportCard?.find((el: any) => {
    return (
      el.classInfo ===
      `${studentInfo?.classAssigned} session: ${school?.presentSession}(${school?.presentTerm})`
    );
  });

  return (
    <div className="w-[180px]">
      {grade?.approve ? (
        <Link
          to={`/teacher-student-report-card/${props?._id}`}
          className="w-[180px] border-r"
        >
          <Button
            name="Report-card"
            className="py-3 w-[85%] bg-orange-500 text-white  hover:bg-orange-600 transition-all duration-300"
            onClick={() => {}}
          />
        </Link>
      ) : (
        <div className="w-[180px] border-r">
          <Button
            name="Not Ready"
            className="py-3 w-[85%] bg-red-500 text-white  hover:bg-red-600 transition-all duration-300"
          />
        </div>
      )}
    </div>
  );
};
