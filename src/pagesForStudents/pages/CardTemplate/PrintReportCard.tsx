import React, { useRef, useEffect, FC } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  useReadMyClassInfo,
  useReadMyClassInfoData,
  useReadOneClassInfo,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import {
  useClassStudent,
  useClassSubject,
  useSchoolAnnouncement,
  useStudentGrade,
  useSujectInfo,
  useTeacherDetail,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";
import {
  useSchoolSessionData,
  useStudentAttendance,
} from "../../../pages/hook/useSchoolAuth";
import lodash from "lodash";
import { useOneSubjectStudentPerfomance } from "../../../pagesForTeachers/hooks/useQuizHook";
import moment from "moment";

const PrintReportCard: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const preprocessContent = () => {
    const content = contentRef.current;
    if (!content) return;

    // Traverse the DOM and replace "oklch" color functions with a fallback color
    const elementsWithUnsupportedColors = content.querySelectorAll("*");
    elementsWithUnsupportedColors.forEach((element: any) => {
      const computedStyles = window.getComputedStyle(element);
      if (computedStyles.color.includes("oklch")) {
        element.style.color = "#000000"; // Replace with a fallback color
      }
    });
  };

  const downloadPDF = () => {
    const input = contentRef.current;

    if (!input) {
      return;
    }

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf: any = new jsPDF();
        pdf.addImage(imgData, "PNG", 30, 10);
        pdf.save("download.pdf");
      })
      .catch((error) => {
        return error;
      });
  };

  useEffect(() => {
    preprocessContent();
  }, []);

  const { studentInfo } = useStudentInfo();
  const { schoolAnnouncement }: any = useSchoolAnnouncement(
    studentInfo?.schoolIDs
  );
  const { mainStudentAttendance } = useStudentAttendance(studentInfo?._id);

  const { gradeData } = useStudentGrade(studentInfo?._id);

  let school: any = schoolAnnouncement;

  let grade = gradeData?.reportCard?.find((el: any) => {
    return (
      el.classInfo ===
      `${studentInfo?.classAssigned} session: ${school?.presentSession}(${school?.presentTerm})`
    );
  });

  const { oneClass: classDetails } = useReadOneClassInfo(
    studentInfo?.presentClassID
  );

  const { teacherDetail } = useTeacherDetail(classDetails?.teacherID);

  const { subjectData } = useClassSubject(studentInfo?.presentClassID);
  const { schoolInfo } = useSchoolSessionData(studentInfo?.schoolIDs);
  // const { subjectInfo } = useSujectInfo(subjectID);

  const schoolName = school?.schoolName!;
  const schoolAddress = school?.address;

  // const studentDetails = {
  //   name: `${studentInfo?.studentFirstName} ${studentInfo?.studentLastName} `,
  //   class: studentInfo?.classAssigned,
  //   term: school?.presentTerm,
  //   session: school?.presentSession,
  //   enrollmentID: `${studentInfo?.enrollmentID}`,
  //   passport: "https://via.placeholder.com/150",
  //   attendance:
  //     (mainStudentAttendance?.data?.attendance?.filter((el: any) => {
  //       return el.present === true;
  //     }).length /
  //       mainStudentAttendance?.data?.attendance?.length) *
  //     100,
  // };

  let numbPassed =
    grade?.result?.length -
    lodash.filter(grade?.result, { grade: "F" })?.length;

  let commulationScore =
    (grade?.result
      ?.map((el: any) => {
        return el.exam + el.test1 + el.test2 + el.test3 + el.test4;
      })
      .reduce((a: number, b: number) => {
        return a + b;
      }, 0) /
      (grade?.result?.length * 100)) *
    100;

  let holdeAll = [];

  for (let i of subjectData?.students!) {
    const { gradeData: details } = useStudentGrade(i);

    let reportData = details?.reportCard?.find((el: any) => {
      return (
        el.classInfo ===
        `${studentInfo?.classAssigned} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
      );
    });

    holdeAll.push(
      reportData?.result?.map((el: any) => {
        return {
          [`${el?.subject}`]:
            el?.test2 + el?.test1 + el?.test3 + el?.test4 + el?.exam,
        };
      })
    );
  }

  let result = {};
  let resultLow = {};

  lodash.sortBy(holdeAll, "subject")?.forEach((innerArray) => {
    // Iterate over each object in the inner array
    innerArray?.forEach((obj: any) => {
      for (let key in obj) {
        // Trim the key to handle potential trailing spaces
        let trimmedKey = key.trim();
        if (!result[trimmedKey] || result[trimmedKey] < obj[key]) {
          result[trimmedKey] = obj[key]; // Store the highest value
        }
      }
    });
  });

  lodash.sortBy(holdeAll, "subject")?.forEach((innerArray) => {
    // Iterate over each object in the inner array
    innerArray?.forEach((obj: any) => {
      for (let key in obj) {
        // Trim the key to handle potential trailing spaces
        let trimmedKey = key.trim();
        if (!resultLow[trimmedKey] || resultLow[trimmedKey] > obj[key]) {
          resultLow[trimmedKey] = obj[key]; // Store the highest value
        }
      }
    });
  });

  let resultMax: any = lodash.sortBy(
    Object.entries(result).map(([subject, score]) => ({
      subject,
      score,
    })),
    "subject"
  );

  let resultMin: any = lodash.sortBy(
    Object.entries(resultLow).map(([subject, score]) => ({
      subject,
      score,
    })),
    "subject"
  );

  console.log(schoolInfo);
  console.log(teacherDetail);

  return (
    <div ref={contentRef}>
      {/* <button onClick={downloadPDF}>Download PDF</button> */}
      <div>
        {/* Content you want to convert to PDF */}
        <h1 className="text-[12px] text-center mt-10 uppercase font-medium mb-10 italic">
          {studentInfo?.classAssigned} {school?.presentSession}
          <span className="mx-1">{school?.presentTerm}</span> Student Report
        </h1>
        {/* <main className="min-h-[30vh] border rounded-sm p-2">jj</main> */}

        <main className="flex justify-center mt-10">
          <div className="max-w-[1200px] p-4 overflow-auto border">
            <div className="flex items-center justify-between w-auto">
              <div className="border h-28 w-28 ">
                {school?.avatar ? (
                  <img
                    src={school?.avatar}
                    className=" w-full h-full object-contain"
                  />
                ) : (
                  <div className="bg-blue-50 font-semibold uppercase text-[30px] w-full h-full flex justify-center items-center">
                    {school?.schoolName?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center flex-col">
                <h1 className="font-bold uppercase text-[25px]">
                  {schoolName}
                </h1>
                <h1 className="text-[12px] font-semibold tracking-[0.6rem]">
                  {schoolAddress}
                </h1>
              </div>
              <div className="border h-28 w-28 ">
                {studentInfo?.avatar ? (
                  <img
                    src={studentInfo?.avatar}
                    className="bg-blue-50 w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-blue-50 font-semibold uppercase text-[30px] w-full h-full flex justify-center items-center">
                    {school?.schoolName?.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            <div className="h-14 my-5 uppercase bg-blue-950 text-white flex justify-center items-center">
              {school?.presentSession}
              <span className="mx-1">{school?.presentTerm}</span> Student Report
            </div>
            <main className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mb-10">
              <div className=" border p-2 ">
                <h1 className="uppercase text-[12px] font-semibold">Surname</h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {studentInfo?.studentLastName}
                </h1>
              </div>
              <div className=" border p-2 ">
                <h1 className="uppercase text-[12px] font-semibold">
                  Other Names
                </h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {studentInfo?.studentFirstName}
                </h1>
              </div>
              <div className=" border p-2 ">
                <h1 className="uppercase text-[12px] font-semibold">sex</h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {studentInfo?.gender}
                </h1>
              </div>
              <div className=" border p-2 ">
                <h1 className="uppercase text-[12px] font-semibold">Class</h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {studentInfo?.classAssigned}
                </h1>
              </div>
              <div className=" border p-2 ">
                <h1 className="uppercase text-[12px] font-semibold">
                  Academic Session
                </h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {school?.presentSession}
                </h1>
              </div>
              <div className=" border p-2 ">
                <h1 className="uppercase text-[12px] font-semibold">
                  Student Type
                </h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  Day
                </h1>
              </div>
              <div className=" border p-2">
                <h1 className="uppercase text-[12px] font-semibold">
                  Session Number
                </h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {studentInfo?.enrollmentID}
                </h1>
              </div>
              <div className=" border p-2 ">
                <h1 className="uppercase text-[12px] font-semibold">
                  Class Population
                </h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {classDetails?.students?.length}
                </h1>
              </div>
            </main>
            <main className="overflow-auto uppercase text-[12px]">
              <section className=" min-w-[1300px] flex flex-col mt-4  ">
                <main className="flex  bg-blue-50">
                  <div className="p-2 w-[40px]">S/N</div>
                  <div className="p-2 w-[250px] border-x ">subject</div>
                  <div className=" w-[58px] border-r flex flex-col justify-center items-center ">
                    <p className="text">CA</p>
                    <p className="text-[12px]">(40)</p>
                  </div>
                  <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                    <p className="text">Exam</p>
                    <p className="text-[12px]">(60)</p>
                  </div>
                  <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                    <p className="text">Total</p>
                    <p className="text-[12px]">(60)</p>
                  </div>
                  <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                    <p className="text">1st Term </p>
                    <p className="text-[12px]">(100)</p>
                  </div>
                  <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                    <p className="text">2nd Term </p>
                    <p className="text-[12px]">(100)</p>
                  </div>
                  <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                    <p className="text">3rd Term </p>
                    <p className="text-[12px]">(100)</p>
                  </div>

                  <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                    <p className="text">Average</p>
                    <p className="text-[12px]">(100)</p>
                  </div>
                  <div className=" w-[78px] px-2 border-r flex flex-col justify-center items-center ">
                    <p className="text">COMM. Term Score</p>
                  </div>
                  <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                    <p className="text">Class Highest Score</p>
                  </div>
                  <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                    <p className="text">Class lowest Score</p>
                  </div>
                  <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                    <p className="text">Class AVG. Score</p>
                  </div>
                  <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                    <p className="text">Grade</p>
                  </div>
                  <div className=" flex-1 text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                    <p className="text">Remark</p>
                  </div>
                </main>

                <main className="flex flex-col mt-1">
                  {lodash
                    .sortBy(grade?.result, "subject")
                    ?.map((el: any, i: number) => (
                      <section
                        className=" min-w-[1300px] flex my-1 bg-blue-50 h-[40px] "
                        key={i - el?._id}
                      >
                        <div className="p-2 w-[40px]">{i + 1}</div>
                        <div className="p-2 w-[250px] border-x ">
                          {el?.subject}
                        </div>
                        <div className=" w-[58px] border-r flex flex-col justify-center items-center ">
                          <p className="text-[12px]">
                            {el?.test1 + el?.test2 + el?.test3 + el?.test4}
                          </p>
                        </div>
                        <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                          <p className="text-[12px]">{el?.exam}</p>
                        </div>
                        <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                          <p className="text-[12px]">
                            {el?.test1 +
                              el?.test2 +
                              el?.test3 +
                              el?.test4 +
                              el?.exam}
                          </p>
                        </div>
                        <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                          <p className="text-[12px]">
                            {" "}
                            {el?.test1 +
                              el?.test2 +
                              el?.test3 +
                              el?.test4 +
                              el?.exam}
                          </p>
                        </div>
                        <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                          <p className="text-[12px]">0</p>
                        </div>
                        <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                          <p className="text-[12px]">0</p>
                        </div>

                        <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                          <p className="text-[12px]">
                            {el?.test1 +
                              el?.test2 +
                              el?.test3 +
                              el?.test4 +
                              el?.exam}
                          </p>
                        </div>
                        <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                          <p className="text-[12px]">
                            {el?.test1 +
                              el?.test2 +
                              el?.test3 +
                              el?.test4 +
                              el?.exam}
                          </p>
                        </div>
                        <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                          <p className="text">{resultMax[i]?.score}</p>
                        </div>
                        <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                          <p className="text">{resultMin[i]?.score}</p>
                        </div>
                        <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                          <p className="text">67</p>
                        </div>
                        <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                          <p className="text-[18px]">{el?.grade}</p>
                        </div>
                        <div className=" flex-1 text-[12px] px-2 leading-tight font-medium border-r pt-1 normal-case">
                          <p
                            className={`
                          ${
                            el?.grade === "A"
                              ? "text-green-600"
                              : el?.grade === "B"
                              ? "text-purple-800"
                              : el?.grade === "C"
                              ? "text-gray-600"
                              : el?.grade === "D"
                              ? "text-purple-600"
                              : el?.grade === "E"
                              ? "Poor Pass"
                              : el?.grade === "F"
                              ? "text-red-500"
                              : null
                          }
                          `}
                          >
                            {el?.grade === "A"
                              ? "Execellent"
                              : el?.grade === "B"
                              ? "Very Good"
                              : el?.grade === "C"
                              ? "Credit"
                              : el?.grade === "D"
                              ? "Pass"
                              : el?.grade === "E"
                              ? "Poor Pass"
                              : el?.grade === "F"
                              ? "Fail"
                              : null}
                          </p>
                        </div>
                      </section>
                    ))}
                </main>
              </section>
            </main>
            {/* <main className="overflow-auto uppercase text-[12px]">
             
            </main> */}

            <main className="grid grid-cols-1 sm:grid-cols-3 my-10">
              <div className=" border p-2 ">
                <h1 className="uppercase text-[12px] font-semibold">
                  No. of subject taken
                </h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {grade?.result?.length}
                </h1>
              </div>
              <div className=" border p-2 ">
                <h1 className="uppercase text-[12px] font-semibold">
                  No. of subject passed
                </h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {numbPassed}
                </h1>
              </div>
              <div className=" border p-2 ">
                <h1 className="uppercase text-[12px] font-semibold">
                  Percenatge score
                </h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {commulationScore}%
                </h1>
              </div>
            </main>
            <main className="flex justify-center text-[12px] gap-2">
              <div className="border-r pr-2 ">
                <h1>
                  Class Avarage:{" "}
                  <span className="font-semibold">
                    {(
                      ((resultMax
                        ?.map((el: any) => {
                          return el?.score;
                        })
                        .reduce((a: any, b: any) => {
                          return a + b;
                        }, 0) /
                        (resultMin?.length * 100)) *
                        100 +
                        (resultMin
                          ?.map((el: any) => {
                            return el?.score;
                          })
                          .reduce((a: any, b: any) => {
                            return a + b;
                          }, 0) /
                          (resultMin?.length * 100)) *
                          100) /
                      2
                    ).toFixed(2)}
                    %
                  </span>
                </h1>
              </div>
              <div className="border-r pr-2 ">
                <h1>
                  Class Highest:{" "}
                  <span className="font-semibold">
                    {(
                      (resultMax
                        ?.map((el: any) => {
                          return el?.score;
                        })
                        .reduce((a: any, b: any) => {
                          return a + b;
                        }, 0) /
                        (resultMin?.length * 100)) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </h1>
              </div>
              <div className="border-r pr-2 ">
                <h1>
                  Class lowest:{" "}
                  <span className="font-semibold">
                    {(
                      (resultMin
                        ?.map((el: any) => {
                          return el?.score;
                        })
                        .reduce((a: any, b: any) => {
                          return a + b;
                        }, 0) /
                        (resultMin.length * 100)) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </h1>
              </div>
            </main>
            <main className=" flex-col mt-5 ">
              <div className="my-5 px-20">
                <hr />
              </div>

              <div className="flex flex-col items-center">
                <p className="font-medium">
                  ACADEMIC PERFORMANCE INSIGHT/SUBJECT
                </p>

                <div className="flex gap-4 mt-2">
                  <div className="flex gap-1 items-center">
                    <div className="w-4 h-4 bg-red-500 shadow-inner" />
                    <p className="text-[12px] font-medium">Class Lowest</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="w-4 h-4 bg-green-500 shadow-inner" />
                    <p className="text-[12px] font-medium">Class Highest</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="w-4 h-4 bg-black shadow-inner" />
                    <p className="text-[12px] font-medium">My Score</p>
                  </div>
                </div>
              </div>

              <main className="mt-10">
                <div className="bg-slate-50 h-[100px] min-w-[1100px] flex items-end pb-2 ">
                  {grade?.result?.map((el: any, i: number) => (
                    <ChartPerformance
                      low={resultMin[i]?.score}
                      max={resultMax[i]?.score}
                      key={i}
                      subject={el?.subject}
                      score={
                        el?.test1 + el.test2 + el?.test3 + el.test4 + el.exam
                      }
                    />
                  ))}
                </div>
              </main>
            </main>
            <main className=" flex-col mt-5 ">
              <div className="my-5 px-20">
                <hr />
              </div>

              <div className="flex flex-col items-center">
                <p className="font-medium">
                  INSIGHT INTO TERM PERFORMANCE/SUBJECT
                </p>

                <div className="flex gap-4 mt-2">
                  <div className="flex gap-1 items-center">
                    <div className="w-4 h-4 bg-red-500 shadow-inner" />
                    <p className="text-[12px] font-medium">1st Term</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="w-4 h-4 bg-green-500 shadow-inner" />
                    <p className="text-[12px] font-medium">2nd Term</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="w-4 h-4 bg-black shadow-inner" />
                    <p className="text-[12px] font-medium">3rd Term</p>
                  </div>
                </div>
              </div>

              <main className="mt-10">
                <div className="bg-slate-50 h-[80px] min-w-[1100px] flex ">
                  <div className="flex items-end gap-1 border-r px-3">
                    <div
                      className="h-[80px] bg-red-500 w-3"
                      style={{ height: `30px` }}
                    />
                    <div
                      className="h-[80px] bg-black w-3"
                      style={{ height: `70px` }}
                    />
                    <div
                      className="h-[80px] bg-green-500 w-3"
                      style={{ height: `50px` }}
                    />
                  </div>
                  <div className="flex items-end gap-1 border-r px-3">
                    <div
                      className="h-[80px] bg-red-500 w-3"
                      style={{ height: `30px` }}
                    />
                    <div
                      className="h-[80px] bg-black w-3"
                      style={{ height: `70px` }}
                    />
                    <div
                      className="h-[80px] bg-green-500 w-3"
                      style={{ height: `50px` }}
                    />
                  </div>
                </div>
              </main>
            </main>
          </div>
        </main>
      </div>

      {/* Psycho */}
      <main className="mt-10">
        <p className="font-semibold uppercase text-[12px] mb-5">
          Psychometric Test Grading
        </p>

        <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          <div className="bg-slate-50 border min-h-20 m-2">
            <p className="p-4 uppercase font-semibold text-[12px] bg-black text-white">
              Effective Domain
            </p>
            <div className="px-2 w-full border-b h-[45px] flex items-center text-[12px] uppercase ">
              <p className="w-[30px] h-full border-r flex items-center">S/N</p>
              <p className="flex-1 h-full border-r ml-2 flex items-center">
                SKill
              </p>
              <p className="w-[60px] h-full ml-2 flex items-center">Rating</p>
            </div>

            {Array.from({ length: 8 }).map((el: any, i: number) => (
              <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b ">
                <p className="w-[30px] h-full border-r flex items-center">1</p>
                <p className="flex-1 h-full border-r ml-2 flex items-center">
                  Diligence
                </p>
                <p className="w-[60px] h-full ml-2 flex items-center">
                  Excellent
                </p>
              </div>
            ))}
          </div>
          <div className="bg-red-50 min-h-20 m-2">
            <p className="p-4 uppercase font-semibold text-[12px] bg-black text-white">
              Effective Domain
            </p>
            <div className="px-2 w-full border-b h-[45px] flex items-center text-[12px] uppercase border-x">
              <p className="w-[30px] h-full border-r flex items-center">S/N</p>
              <p className="flex-1 h-full border-r ml-2 flex items-center">
                SKill
              </p>
              <p className="w-[60px] h-full ml-2 flex items-center">Rating</p>
            </div>
            {Array.from({ length: 8 }).map((el: any, i: number) => (
              <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                <p className="w-[30px] h-full border-r flex items-center">1</p>
                <p className="flex-1 h-full border-r ml-2 flex items-center">
                  Diligence
                </p>
                <p className="w-[60px] h-full ml-2 flex items-center">
                  Excellent
                </p>
              </div>
            ))}
          </div>
          <div className="bg-green-50 min-h-20 col-span-1 sm:col-span-3 xl:col-span-1 m-2 ">
            <p className="p-4 uppercase font-semibold text-[12px] bg-black text-white">
              Result Test
            </p>
            <div className="px-2 w-full border-b border-x h-[45px] flex items-center text-[12px] uppercase ">
              <p className="w-[30px] h-full border-r flex items-center">S/N</p>
              <p className="flex-1 h-full border-r ml-2 flex items-center">
                SKill
              </p>
              <p className="w-[60px] h-full ml-2 flex items-center">Rating</p>
            </div>

            {Array.from({ length: 5 }).map((el: any, i: number) => (
              <div
                key={`${el}${i}`}
                className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x"
              >
                <p className="w-[30px] h-full border-r flex items-center">
                  {i + 1}
                </p>
                <p className="flex-1 h-full border-r ml-2 flex items-center">
                  Diligence
                </p>
                <p className="w-[60px] h-full ml-2 flex items-center">
                  Excellent
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Comments */}
      <div className=" grid grid-cols-1 md:grid-cols-2 text-[12px] mt-10">
        <div className="border mr-3 p-2">
          <p>Principal's Comment</p>

          <p className="my-2 border h-[120px] p-2 mb-5">
            {grade?.adminComment}
          </p>
          <div className="flex w-full">
            <div className="flex-1 flex flex-col">
              <p className="font-semibold">{classDetails?.classTeacherName}</p>
              <p className="text-[10px]">Principal</p>
              <div className="flex-1" />
              <p>{moment(grade?.createdAt).format("lll")}</p>
            </div>

            <div className="w-[160px] h-[80px] border">
              <img
                src={schoolInfo?.signature}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className="border mr-3 p-2">
          <p>Class Teacher's Comment</p>

          <p className="my-2 border h-[120px] p-2 mb-5">
            {" "}
            {grade?.classTeacherComment}
          </p>
          <div className="flex w-full">
            <div className="flex-1 flex flex-col">
              <p className="font-semibold">{teacherDetail?.staffName}</p>
              <p className="text-[10px]">Class Teacher</p>
              <div className="flex-1" />
              <p>{moment(grade?.createdAt).format("lll")}</p>
            </div>
            <div className="w-[160px] h-[80px] border">
              <img
                src={teacherDetail?.signature}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintReportCard;

const ChartPerformance: FC<any> = ({ subject, score, low, max }) => {
  const { studentInfo } = useStudentInfo();
  const { gradeData } = useStudentGrade(studentInfo?._id);
  const { schoolInfo } = useSchoolSessionData(studentInfo?.schoolIDs);
  const { subjectData } = useClassSubject(studentInfo?.presentClassID);
  const { subjectInfo } = useSujectInfo("subjectID");
  // const {  } = useClassStudent(studentInfo?.presentClassID);

  // console.log(subjectData?.students);

  let reportData = gradeData?.reportCard?.find((el: any) => {
    return (
      el.classInfo ===
      `${subjectInfo?.designated} session: ${schoolInfo[0]?.year}(${schoolInfo[0]?.presentTerm})`
    );
  });

  let result = reportData?.result.find((el: any) => {
    return el.subject === subjectInfo?.subjectTitle;
  });

  return (
    <div>
      <div className="flex items-end gap-1 border-r px-6">
        <div
          className="h-[80px] bg-red-500 w-3"
          style={{ height: `${(low / 100) * 70}px` }}
        />
        <div
          className="h-[80px] bg-black w-3"
          style={{ height: `${(score / 100) * 70}px` }}
        />
        <div
          className="h-[80px] bg-green-500 w-3"
          style={{ height: `${(max / 100) * 70}px` }}
        />
      </div>
      <p className="text-[8px] mt-1 font-semibold text-center">
        {subject.slice(0, 20)}
      </p>
    </div>
  );
};
