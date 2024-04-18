import { FC } from "react";
import pix from "../../../assets/logo.png";

interface iSchool {
  schoolName: string;
  schoolAddress: string;
  studentDetails: any;
  subjects: any;
}

const ReportCardTemplate: FC<iSchool> = ({
  schoolName,
  schoolAddress,
  studentDetails,
  subjects,
}) => {
  return (
    <div className="text-[12px] mx-auto bg-white p-8 shadow-md rounded-lg flex justify-center items-center">
      <div className="w-full min-h-[100vh] shadow lg:p-5">
        <div className="h-[100px] w-full flex justify-center items-center gap-3 o">
          <div className="h-[100px]  w-[100%]  border-b-gray-400 flex gap-3 p-3 px-4">
            <div className="lg:w-[14%] w-[25%] lg:h-[100px] h-[70px] flex  ">
              <img src={pix} alt="" className="h-[100%] object-contain mb-5" />
            </div>
            <div className="w-[70%] h-[100px]  flex flex-col items-start">
              <h1 className="font-bold text-[24px] text-center lg:text-[27px] ">
                {schoolName}
              </h1>
              <p className="text-center text-[14px]">{schoolAddress}</p>
            </div>
          </div>
        </div>

        <div className="mx-4 mb-2 mt-5">
          <hr />
        </div>

        <div className="p-4 flex justify-center items-center">
          <div className="w-[90%] grid grid-cols-3 gap-9">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{studentDetails.name}</p>
            </div>
            <div>
              <p className="font-semibold">Class:</p>
              <p>{studentDetails.class}</p>
            </div>
            <div>
              <p className="font-semibold">Roll Number:</p>
              <p>{studentDetails?.enrollmentID}</p>
            </div>
            <div>
              <p className="font-semibold">Attendance:</p>
              <p>{studentDetails?.attendance}%</p>
            </div>
            <div>
              <p className="font-semibold">Session:</p>
              <p>{studentDetails?.session}</p>
            </div>
            <div>
              <p className="font-semibold">Term:</p>
              <p>{studentDetails?.term}</p>
            </div>
          </div>
        </div>
        <div
          className="w-full flex justify-center items-center mt-7 p-4 flex-col 
        "
        >
          <div className="overflow-y-auto w-full">
            <table className="w-[100%] border-collapse border border-gray-300 overflow-y-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 w-10 pl-2 text-left">
                    S/N
                  </th>
                  <th className="border border-gray-300 w-28 pl-2 text-left">
                    Subject
                  </th>
                  <th className="border border-gray-300 lg:w-36 w-full pl-2 text-left">
                    CA Test Score
                  </th>
                  <th className="border border-gray-300 w-36 pl-2 text-left">
                    Exam Score
                  </th>
                  <th className="border border-gray-300 w-64 py-2 pl-2 text-left">
                    continous Assessment
                    <table className="w-full mt-1">
                      <thead>
                        <tr className="h-full w-full font-medium">
                          <th className="w-20 border">1</th>
                          <th className="w-20 border">2</th>
                          <th className="w-20 border">3</th>
                          <th className="w-20 border">4</th>
                          <th className="w-20 border  ">T</th>
                        </tr>
                      </thead>
                    </table>
                  </th>
                  <th className="border border-gray-300 w-36 pl-2 text-left">
                    Exam No
                  </th>
                  <th className="border border-gray-300 w-20 pl-3 text-left">
                    total mark
                  </th>
                  <th className="border border-gray-300 w-20 pl-3 text-left">
                    Grade
                  </th>
                  <th className="border border-gray-300 w-20 pl-2 text-left">
                    position
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjects?.result.map((props: any, i: any) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="border border-gray-300 lg:px-6 px-8 py-3 text-[12px] lg:text-[15px]">
                      {i + 1}
                    </td>
                    <td className="border border-gray-300 lg:px-6 px-8 py-3 text-[12px] lg:text-[15px]">
                      {props.subject}
                    </td>
                    <td className="border border-gray-300 lg:px-6 px-8 py-3 text-[12px] lg:text-[15px]">
                      {`${
                        props?.test1 +
                        props?.test2 +
                        props?.test3 +
                        props?.test4
                      }/40`}
                    </td>
                    <td className="border border-gray-300 lg:px-6 px-8 py-3 text-[12px] lg:text-[15px]">
                      {`${props.exam}/60`}
                    </td>
                    <thead>
                      <tbody>
                        {/* <tr> */}
                        <td className="border lg:w-20 w-24 lg:pl-2 lg:h-12 px-3 h-24">
                          {props?.test1}
                        </td>
                        <td className="border w-20 lg:pl-2 px-3 h-12">
                          {props?.test2}
                        </td>
                        <td className="border w-20 lg:pl-2 px-3 h-12">
                          {" "}
                          {props?.test3}
                        </td>
                        <td className="border w-20 lg:pl-2 px-3 h-12">
                          {" "}
                          {props?.test4}
                        </td>
                        <td className="border w-20 lg:pl-2 px-3 h-12">
                          {props?.test1 +
                            props?.test2 +
                            props?.test3 +
                            props?.test4}
                        </td>
                        {/* </tr> */}
                      </tbody>
                    </thead>
                    <td className="border border-gray-300 lg:px-6 py-3 px-10">
                      <p className="text-[12px]">{props.exam}</p>
                    </td>
                    <td className="border border-gray-300 px-6 py-3 font-semibold">
                      {props?.test1 +
                        props?.test2 +
                        props?.test3 +
                        props?.test4 +
                        props?.exam}
                    </td>
                    <td className="border border-gray-300 px-6 py-3 font-semibold">
                      {props.grade}
                    </td>
                    <td className="border border-gray-300 px-6 py-3">
                      {props.position}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <table className="w-[100%] border-collapse border border-gray-300 overflow-y-auto">
            <thead>
              <tr>
                <th className="border border-gray-300 w-[170px] py-3 pl-5 text-left">
                  Total mark
                </th>
                <th className="border border-gray-300 text-center w-30 py-3 px-3 text-[13px] lg:text-[18px]">
                  {`${subjects?.result
                    ?.map((el: any) => {
                      return el.points;
                    })
                    .reduce((a: number, b: number) => {
                      return a + b;
                    }, 0)}/${subjects?.result
                    ?.map((el: any) => {
                      return el.score;
                    })
                    .reduce((a: number, b: number) => {
                      return a + b;
                    }, 0)}`}
                </th>
                <th className="border border-gray-300 w-[146px] py-3 text-left pl-6">
                  {subjects?.grade}
                </th>
              </tr>
              <tr>
                <th className="border border-gray-300 text-left pl-5 w-30 py-3 ">
                  Total percentage
                </th>
                <th className="border-gray-300 w-50 py-3 text-center pl-6">
                  {subjects?.points}%
                </th>
              </tr>
            </thead>
          </table>
          {/* <table className="w-[100%] border-collapse border border-gray-300 bg-gray-400 overflow-y-auto">
            <thead>
              <tr>
                <th className="border border-gray-300 w-50 py-3 text-center pl-6 font-bold">
                  Co-Schorlastic Areas
                </th>
                <th className="border border-gray-300 w-32 py-3 text-center pl-6 font-bold">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border bg-white border-gray-300 text-left w-50 py-3 pl-6 font-bold">
                  Readings
                </th>
                <th className="border border-gray-300 w-32 py-3 text-center pl-6 font-bold">
                  A
                </th>
              </tr>
              <tr>
                <th className="border bg-white border-gray-300 text-left w-50 py-3 pl-6 font-bold">
                  Writing
                </th>
                <th className="border border-gray-300 w-32 py-3 text-center pl-6 font-bold">
                  B
                </th>
              </tr>
              <tr>
                <th className="border bg-white border-gray-300 text-left w-50 py-3 pl-6 font-bold">
                  Speaking
                </th>
                <th className="border border-gray-300 w-32 py-3 text-center pl-6 font-bold">
                  C
                </th>
              </tr>
            </tbody>
          </table> */}
          <div className="p-4 bg-gray-200 w-full min-h-[300px] text-center font-bold text-[20px]">
            Students's Performance Chart
          </div>

          <div className="p-4 w-full lg:h-[180px] min-h-[70px] mb-2 bg-gray-300 mt-3 border ">
            <h1 className="font-bold text-white pl-6 py-2 bg-gray-500">
              Principal's Comment
            </h1>
            <p className="lg:text-[13px] text-[15px] lg:pb-0 font-medium mt-2 text-left">
              {subjects?.adminComment}
            </p>
          </div>

          <div className="p-4 w-full lg:h-[180px] min-h-[70px] mb-12 bg-gray-400 mt-3 border ">
            <h1 className="font-bold text-white pl-6 py-2 bg-gray-500">
              Class Teacher's Comment
            </h1>
            <p className="lg:text-[13px] text-[15px] lg:pb-0 font-medium mt-2 text-left">
              {subjects?.classTeacherComment}
            </p>
          </div>
          <div className="p-4 w-full h-[120px] bg-gray-100 mt-3 border shadow-sm">
            <div className="w-full h-10 bg-gray-500">
              <h1 className="font-bold text-white pl-6 pt-2">
                Grade's Boundaries
              </h1>
              <div className="p-4">
                <p className="text-[14px] font-medium pt-5 flex gap-3">
                  {/* A :100-90, A: 90-80, B: 80-70, C: 70-60, D: 60-50, E: 50-40,
                  F: 40-0 */}
                  <p className="font-bold text-[17px]">
                    A: <span className="font-medium text-[15px]">100-80</span>,
                  </p>
                  <p className="font-bold text-[17px]">
                    B: <span className="font-medium text-[15px]">79-70</span>,
                  </p>
                  <p className="font-bold text-[17px]">
                    C: <span className="font-medium text-[15px]">69-60</span>,
                  </p>
                  <p className="font-bold text-[17px]">
                    D: <span className="font-medium text-[15px]">59-50</span>,
                  </p>
                  <p className="font-bold text-[17px]">
                    E: <span className="font-medium text-[15px]">49-40</span>,
                  </p>
                  <p className="font-bold text-[17px]">
                    F: <span className="font-medium text-[15px]">39-0</span>,
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCardTemplate;
