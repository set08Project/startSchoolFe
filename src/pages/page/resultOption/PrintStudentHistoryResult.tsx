import React, { useRef, useEffect, FC, useState } from "react";

import {
  useSchoolSessionData,
  useStudentAttendance,
  useViewStudentHistory,
} from "../../../pages/hook/useSchoolAuth";
import lodash from "lodash";

import moment from "moment";
import {
  useReadOneClassInfo,
  useStudentInfo,
  useStudentInfoData,
} from "../../../pagesForStudents/hooks/useStudentHook";
import { useParams } from "react-router-dom";
import {
  useClassSubject,
  useSchoolAnnouncement,
  useStudentGrade,
  useSujectInfo,
  useTeacherDetail,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { Link } from "react-router-dom";

import { usePDF } from "react-to-pdf";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const PrintReportCardDesignAdminScreen: React.FC = () => {
  useEffect(() => {
    preprocessContent();
  }, []);

  const { studentID, id } = useParams();
  const { studentInfoData: studentInfo } = useStudentInfoData(studentID);
  const { studentResults } = useViewStudentHistory(studentID);
  console.clear();
  console.log(
    "res: ",
    studentResults.find((el) => el?._id === id)
  );

  const data = studentResults.find((el) => el?._id === id);

  const { gradeData } = useStudentGrade(studentID!);
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

  const { oneClass: classDetails } = useReadOneClassInfo(
    gradeData?.presentClassID
  );

  const { teacherDetail } = useTeacherDetail(classDetails?.teacherID);

  const { subjectData }: any = useClassSubject(gradeData?.presentClassID);
  const { schoolInfo } = useSchoolSessionData(gradeData?.schoolIDs);

  const schoolName = school?.schoolName!;
  const schoolAddress = school?.address;

  let numbPassed =
    data?.results?.length -
    lodash.filter(grade?.result, { grade: "F" })?.length;

  let commulationScore =
    (data?.results
      ?.map((el: any) => {
        return parseInt(el.exam) + parseInt(el.test1);
      })
      .reduce((a: number, b: number) => {
        return a + b;
      }, 0) /
      (data?.results?.length * 100)) *
    100;

  let holdeAll = [];

  console.log(
    data?.results?.map((el: any) => {
      return parseInt(el.exam) + parseInt(el.test1);
    })
  );
  // }

  let result = {};
  let resultLow = {};

  for (let i of subjectData?.students || []) {
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

  lodash.sortBy(holdeAll, "subject")?.forEach((innerArray) => {
    innerArray?.forEach((obj: any) => {
      for (let key in obj) {
        let trimmedKey = key.trim();
        if (!result[trimmedKey] || result[trimmedKey] < obj[key]) {
          result[trimmedKey] = obj[key];
        }
      }
    });
  });

  lodash.sortBy(holdeAll, "subject")?.forEach((innerArray) => {
    innerArray?.forEach((obj: any) => {
      for (let key in obj) {
        let trimmedKey = key.trim();
        if (!resultLow[trimmedKey] || resultLow[trimmedKey] > obj[key]) {
          resultLow[trimmedKey] = obj[key];
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey && event.key === "r") || event.key === "F5") {
        event.preventDefault();
        alert("Refresh is disabled on this page.");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  const { toPDF, targetRef }: any = usePDF({
    filename: `build--${moment(Date.now()).format("lll")}.pdf`,
    page: {
      //   orientation: "landscape", // Ensure landscape orientation
      // unit: "px", // Use pixels for dimensions
      // format: [2820, 1080],
      //  // Set custom dimensions (e.g., full HD resolution)
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingView, setLoadingView] = useState<boolean>(false);

  return (
    <div ref={contentRef} className="overflow-hidden">
      <Toaster />
      <button
        disabled={loading}
        className={`text-[12px] tracking-widest transistion-all duration-300 mb-2 hover:bg-red-100 px-8 py-2 rounded-md bg-red-50 ${
          loading && "cursor-not-allowed bg-red-200 animate-pulse"
        }`}
        onClick={() => {
          setLoading(true);
          setLoadingView(true);

          const x = setTimeout(() => {
            toPDF().finally(() => {
              setLoading(false);

              setLoadingView(false);
              clearTimeout(x);

              toast.success("Result downloaded.");
            });
          }, 2000);
        }}
      >
        {loading ? (
          <div className="flex gap-2 items-center">
            <FaSpinner className="animate-spin" />
            <span>downloading...</span>
          </div>
        ) : (
          "Print Result"
        )}
      </button>
      <div className="flex w-full justify-end"></div>
      <div
        ref={targetRef}
        style={{
          width: `${loadingView ? `${"1070"}px` : ""} `, // Full width for PDF
          height: "100%", // Full height for PDF
          // overflow: "hidden", // Prevent content overflow
        }}
        className={`${
          !loadingView ? "border rounded-md overflow-y-hidden" : ""
        }`}
      >
        <h1 className="text-[10px] md:text-[12px] text-center mt-10 uppercase font-medium mb-10 italic">
          {data?.classInfo} {data?.session}
          <span className="mx-1">{data?.term}</span> Student Report
        </h1>
        {/* <main className="min-h-[30vh] border rounded-sm p-2">jj</main> */}

        <main className="flex justify-center mt-10">
          <div
            className="relative max-w-[1100px] p-4 overflow-hidden border"
            style={{
              width: `${
                school?.presentTerm === "1st Term"
                  ? "994px"
                  : school?.presentTerm === "2nd Term"
                  ? "1072px"
                  : school?.presentTerm === "3rd Term"
                  ? "1150px"
                  : null
              }`,
            }}
          >
            <div
              className="absolute overflow-hidden inset-0 text-gray-300 text-opacity-20 text-[5vw] font-bold tracking-widest uppercase flex justify-center items-center"
              style={{
                lineHeight: "5.5em",
                whiteSpace: "pre-wrap",
                userSelect: "none",
                pointerEvents: "none",
                rotate: "30deg",
              }}
            >
              {school?.schoolName} {school?.schoolName} {school?.schoolName}{" "}
              {school?.schoolName} <br />
              {school?.schoolName} {school?.schoolName} {school?.schoolName}{" "}
              {school?.schoolName} <br />
              {school?.schoolName} {school?.schoolName} {school?.schoolName}{" "}
              {school?.schoolName} <br />
              {school?.schoolName} {school?.schoolName}
              {school?.schoolName} <br />
              {school?.schoolName} {school?.schoolName}
            </div>

            {/* full */}
            <div className="hidden md:flex items-center justify-between w-auto">
              {/* logo */}
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
              {/* school info */}
              <div className="flex justify-center items-center flex-col">
                <h1 className="font-bold uppercase text-[25px]">
                  {schoolName}
                </h1>
                <h1 className="text-[12px] font-semibold tracking-[0.6rem]">
                  {schoolAddress}
                </h1>
              </div>
              {/* avatar */}
              <div className="border h-28 w-28 ">
                {studentInfo?.avatar ? (
                  <img
                    src={studentInfo?.avatar}
                    className="bg-blue-50 w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-blue-50 font-semibold uppercase text-[30px] w-full h-full flex justify-center items-center">
                    {studentInfo?.studentFirstName?.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            {/* Mobile */}
            <div className="flex flex-col md:hidden ">
              <div className="flex items-center justify-between w-auto ">
                {/* logo */}
                {/* <div className="border h-28 w-28 ">
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
                </div> */}

                {/* avatar */}
                {/* <div className="border h-28 w-28 ">
                  {studentInfo?.avatar ? (
                    <img
                      src={studentInfo?.avatar}
                      className="bg-blue-50 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-blue-50 font-semibold uppercase text-[30px] w-full h-full flex justify-center items-center">
                      {studentInfo?.studentFirstName?.charAt(0)}
                    </div>
                  )}
                </div> */}
              </div>
              {/* school info */}
              {/* <div className="mt-5 flex justify-center items-center flex-col">
                <h1 className="font-bold uppercase text-[25px]">
                  {schoolName}
                </h1>
                <h1 className="text-[12px] font-semibold tracking-[0.6rem]">
                  {schoolAddress}
                </h1>
              </div> */}
            </div>
            {/* end */}

            <div className="text-[12px] md:text-[15px] h-14 my-5 uppercase bg-blue-950 text-white flex justify-center items-center">
              {data?.session}
              <span className="mx-1">{data?.term}</span> Student Report
            </div>
            <main
              className={`${
                !loadingView
                  ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
                  : "grid-cols-6 grid"
              } mb-10`}
              style={{
                width: `${loadingView ? `${"1070"}px` : ""} `,
              }}
            >
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
                  {data?.session}
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
                  {/* {classDetails?.students?.length} */}
                </h1>
              </div>

              <div className=" border p-2">
                <h1 className="uppercase text-[12px] font-semibold">
                  Class Teacher
                </h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {teacherDetail?.staffName}
                </h1>
              </div>
            </main>
            <main className="overflow-auto uppercase text-[12px]">
              <section className=" flex flex-col mt-4  ">
                <main
                  className="flex  bg-blue-50"
                  style={{
                    width: `${
                      school?.presentTerm === "1st Term"
                        ? "994px"
                        : school?.presentTerm === "2nd Term"
                        ? "1072px"
                        : school?.presentTerm === "3rd Term"
                        ? "1150px"
                        : null
                    }`,
                  }}
                >
                  <div className="p-2 w-[40px]">S/N</div>
                  <div className="p-2 w-[120px] border-x ">subject</div>
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
                    <p className="text-[12px]">(100)</p>
                  </div>
                  {/* {school?.presentTerm === "1st Term" ||
                    (school?.presentTerm === "3rd Term" && (
                      <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                        <p className="text">1st Term </p>
                        <p className="text-[12px]">(100)</p>
                      </div>
                    ))}

                  {school?.presentTerm === "1st Term" ||
                    (school?.presentTerm === "2nd Term" && (
                      <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                        <p className="text">2nd Term </p>
                        <p className="text-[12px]">(100)</p>
                      </div>
                    ))}

                  {school?.presentTerm === "1st Term" ||
                    school?.presentTerm === "2nd Term" ||
                    (school?.presentTerm === "3rd Term" && (
                      <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                        <p className="text">3rd Term </p>
                        <p className="text-[12px]">(100)</p>
                      </div>
                    ))} */}
                  <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                    <p className="text">Term Grade </p>
                    <p className="text-[12px]">(100)</p>
                  </div>

                  {/* <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                    <p className="text">Average</p>
                    <p className="text-[12px]">(100)</p>
                  </div> */}
                  <div className=" w-[78px] px-2 border-r flex flex-col justify-center items-center ">
                    <p className="text">COMM. Term Score</p>
                  </div>
                  <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                    <p className="text">Class Highest Score</p>
                  </div>
                  <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                    <p className="text">Class lowest Score</p>
                  </div>
                  {/* <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                    <p className="text">Class AVG. Score</p>
                  </div> */}
                  <div className=" w-[50px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                    <p className="text">Grade</p>
                  </div>
                  <div className=" flex-1 text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                    <p className="text">Remark</p>
                  </div>
                </main>

                <main className="flex flex-col mt-1">
                  {lodash
                    .sortBy(data?.results, "subject")
                    ?.map((el: any, i: number) => (
                      <section
                        className="flex my-1 bg-blue-50 min-h-[40px] py-1"
                        key={i - el?._id}
                        style={{
                          width: `${
                            school?.presentTerm === "1st Term"
                              ? "994px"
                              : school?.presentTerm === "2nd Term"
                              ? "1072px"
                              : school?.presentTerm === "3rd Term"
                              ? "1150px"
                              : null
                          }`,
                        }}
                      >
                        <div className="p-2 w-[40px]">{i + 1}</div>
                        <div className="p-2 w-[120px] border-x ">
                          {el?.subject}
                        </div>
                        {
                          <div className=" w-[58px] border-r flex flex-col justify-center items-center ">
                            <p className="text-[12px]">{el?.test1}</p>
                          </div>
                        }
                        <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                          <p className="text-[12px]">{el?.exam}</p>
                        </div>
                        <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                          <p className="text-[12px]">{el?.mark}</p>
                        </div>
                        {/* {school?.presentTerm === "1st Term" ||
                          (school?.presentTerm === "3rd Term" && (
                            <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                              <p className="text-[12px]"> {""}</p>
                            </div>
                          ))}
                        {school?.presentTerm === "1st Term" ||
                          (school?.presentTerm === "2nd Term" && (
                            <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                              <p className="text-[12px]">{el?.exam}</p>
                            </div>
                          ))} */}{" "}
                        <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                          <p className="text">{el?.mark}</p>
                          {/* <p className="text-[12px]">(100)</p> */}
                        </div>
                        {/* {school?.presentTerm === "1st Term" ||
                          school?.presentTerm === "2nd Term" ||
                          (school?.presentTerm === "3rd Term" && (
                            <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                              <p className="text-[12px]">0k</p>
                            </div>
                          ))} */}
                        <div className=" w-[78px] border-r flex flex-col justify-center items-center ">
                          <p className="text-[12px]">{el?.exam}</p>
                        </div>
                        <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                          <p className="text">{resultMax[i]?.score}</p>
                        </div>
                        <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                          <p className="text">{resultMin[i]?.score}</p>
                        </div>
                        {/* <div className=" w-[78px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                          <p className="text">67</p>
                        </div> */}
                        <div className=" w-[50px] text-[12px] px-2 leading-tight font-medium border-r flex flex-col justify-center items-center ">
                          <p className="text-[18px]">{el?.grade}</p>
                        </div>
                        <div className="w-[80px] text-center flex-1 text-[12px] px-2 leading-tight font-medium border-r pt-1 normal-case flex justify-center items-center">
                          <p
                            className={`
                          ${
                            el?.grade === "A1"
                              ? "text-green-600"
                              : el?.grade === "B2" || el?.grade === "B3"
                              ? "text-purple-800"
                              : el?.grade === "C4" ||
                                el?.grade === "C5" ||
                                el?.grade === "C6"
                              ? "text-gray-600"
                              : el?.grade === "D7"
                              ? "text-purple-600"
                              : el?.grade === "E8"
                              ? "Poor Pass"
                              : el?.grade === "F9" || el?.grade === "F"
                              ? "text-red-500"
                              : null
                          }
                          `}
                          >
                            {el?.grade === "A1"
                              ? "Execellent"
                              : el?.grade === "B2" || el?.grade === "B3"
                              ? "Very Good"
                              : el?.grade === "C4" ||
                                el?.grade === "C5" ||
                                el?.grade === "C6"
                              ? "Credit"
                              : el?.grade === "D7"
                              ? "Pass"
                              : el?.grade === "E8"
                              ? "Poor Pass"
                              : el?.grade === "F9" || el?.grade === "F"
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
            <main
              className={`${
                !loadingView
                  ? "grid grid-cols-1 sm:grid-cols-4 my-10"
                  : "grid-cols-4 grid"
              } mb-10`}
              style={{
                width: `${loadingView ? `${"1070"}px` : ""} `,
              }}
            >
              <div className=" border p-2 ">
                <h1 className="uppercase text-[12px] font-semibold">
                  No. of subject taken
                </h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {data?.results?.length}
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
                  Attendance Performance
                </h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {grade?.attendance}
                </h1>
              </div>
              <div className=" border p-2 ">
                <h1 className="uppercase text-[12px] font-semibold">
                  Percenatge score
                </h1>
                <h1 className="uppercase text-[12px] font-normal -mt-[2px]">
                  {commulationScore.toFixed(2)}%
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
            </main>
            <main className="mt-10">
              <div className="bg-slate-50 overflow-auto h-[100px] flex items-end pb-2 ">
                {data?.results?.map((el: any, i: number) => (
                  <ChartPerformance
                    low={resultMin[i]?.score}
                    max={resultMax[i]?.score}
                    key={i}
                    subject={el?.subject}
                    score={el?.test1 + el.exam}
                  />
                ))}
              </div>
            </main>

            {/* Psycho */}
            {/* <main className="mt-20">
              <p className="font-semibold uppercase text-[12px] mb-5">
                Psychometric Test Grading
              </p>

              <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                <div className="bg-slate-50 border min-h-20">
                  <p className="p-4 uppercase font-semibold text-[12px] bg-black text-white">
                    Soft skill
                  </p>
                  <div className="px-2 w-full border-b h-[45px] flex items-center text-[12px] uppercase ">
                    <p className="w-[30px] h-full border-r flex items-center">
                      S/N
                    </p>
                    <p className="flex-1 h-full border-r ml-2 flex items-center">
                      SKill
                    </p>
                    <p className="w-[60px] h-full ml-2 flex items-center">
                      Rating
                    </p>
                  </div>

                  <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                    <p className="w-[30px] h-full border-r flex items-center pl-2">
                      1
                    </p>
                    <p className="flex-1 h-full border-r ml-2 flex items-center">
                      communication
                    </p>
                    <p className="w-[60px] h-full ml-2 flex items-center">
                      {grade?.softSkill[0]?.communication}
                    </p>
                  </div>
                  <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                    <p className="w-[30px] h-full border-r flex items-center pl-2">
                      2
                    </p>
                    <p className="flex-1 h-full border-r ml-2 flex items-center">
                      leadership
                    </p>
                    <p className="w-[60px] h-full ml-2 flex items-center">
                      {grade?.softSkill[0]?.leadership}
                    </p>
                  </div>
                  <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                    <p className="w-[30px] h-full border-r flex items-center pl-2">
                      3
                    </p>
                    <p className="flex-1 h-full border-r ml-2 flex items-center">
                      punctuality
                    </p>
                    <p className="w-[60px] h-full ml-2 flex items-center">
                      {grade?.softSkill[0]?.punctuality}
                    </p>
                  </div>
                  <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                    <p className="w-[30px] h-full border-r flex items-center pl-2">
                      4
                    </p>
                    <p className="flex-1 h-full border-r ml-2 flex items-center">
                      empathy
                    </p>
                    <p className="w-[60px] h-full ml-2 flex items-center">
                      {grade?.softSkill[0]?.empathy}
                    </p>
                  </div>
                </div>
                <div className="bg-red-50 min-h-20 m-2">
                  <p className="p-4 uppercase font-semibold text-[12px] bg-black text-white">
                    People Skill
                  </p>
                  <div className="px-2 w-full border-b h-[45px] flex items-center text-[12px] uppercase border-x">
                    <p className="w-[30px] h-full border-r flex items-center">
                      S/N
                    </p>
                    <p className="flex-1 h-full border-r ml-2 flex items-center">
                      SKill
                    </p>
                    <p className="w-[60px] h-full ml-2 flex items-center">
                      Rating
                    </p>
                  </div>

                  <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                    <p className="w-[30px] h-full border-r flex items-center pl-2">
                      1
                    </p>
                    <p className="flex-1 h-full border-r ml-2 flex items-center">
                      Confidence
                    </p>
                    <p className="w-[60px] h-full ml-2 flex items-center">
                      {grade?.peopleSkill[0]?.confidence}
                    </p>
                  </div>
                  <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                    <p className="w-[30px] h-full border-r flex items-center pl-2">
                      2
                    </p>
                    <p className="flex-1 h-full border-r ml-2 flex items-center">
                      hardworking
                    </p>
                    <p className="w-[60px] h-full ml-2 flex items-center">
                      {grade?.peopleSkill[0]?.hardworking}
                    </p>
                  </div>
                  <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                    <p className="w-[30px] h-full border-r flex items-center pl-2">
                      3
                    </p>
                    <p className="flex-1 h-full border-r ml-2 flex items-center">
                      presentational
                    </p>
                    <p className="w-[60px] h-full ml-2 flex items-center">
                      {grade?.peopleSkill[0]?.presentational}
                    </p>
                  </div>
                  <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                    <p className="w-[30px] h-full border-r flex items-center pl-2">
                      4
                    </p>
                    <p className="flex-1 h-full border-r ml-2 flex items-center">
                      resilient
                    </p>
                    <p className="w-[60px] h-full ml-2 flex items-center">
                      {grade?.peopleSkill[0]?.resilient}
                    </p>
                  </div>
                </div>
                <div className="bg-green-50 min-h-20 col-span-1 sm:col-span-3 xl:col-span-1 m-2 ">
                  <p className="p-4 uppercase font-semibold text-[12px] bg-black text-white">
                    Physical Skill
                  </p>
                  <div className="px-2 w-full border-b border-x h-[45px] flex items-center text-[12px] uppercase ">
                    <p className="w-[30px] h-full border-r flex items-center">
                      S/N
                    </p>
                    <p className="flex-1 h-full border-r ml-2 flex items-center">
                      SKill
                    </p>
                    <p className="w-[60px] h-full ml-2 flex items-center">
                      Rating
                    </p>
                  </div>

                  <div className="px-2 w-full h-[45px] flex items-center text-[12px] uppercase border-b border-x">
                    <p className="w-[30px] h-full border-r flex items-center">
                      1
                    </p>
                    <p className="flex-1 h-full border-r ml-2 flex items-center">
                      sportship
                    </p>
                    <p className="w-[60px] h-full ml-2 flex items-center">
                      {grade?.physicalSkill[0]?.sportship}
                    </p>
                  </div>
                </div>
              </div>
            </main> */}

            {/* Comments */}
            <div className=" grid grid-cols-1 md:grid-cols-2 text-[12px] mt-10">
              <div className="border mr-3 p-2">
                <p>Principal's Comment</p>

                <p className="my-2 border h-[120px] p-2 mb-5">
                  {data?.adminComment}
                </p>
                <div className="flex w-full">
                  <div className="flex-1 flex flex-col">
                    <p className="font-semibold">
                      {school?.name} {school?.name2}
                    </p>
                    <p className="text-[10px]">Principal</p>
                    <div className="flex-1" />
                    <p>{moment(grade?.createdAt).format("lll")}</p>
                  </div>

                  <div className="w-[160px] h-[80px] border">
                    <img
                      src={school?.signature}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="border mr-3 p-2">
                <p>Class Teacher's Comment</p>

                <p className="my-2 border h-[120px] p-2 mb-5">
                  {" "}
                  {data?.classTeacherComment}
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
        </main>
      </div>
    </div>
  );
};

export default PrintReportCardDesignAdminScreen;

const ChartPerformance: FC<any> = ({ subject, score, low, max }) => {
  const { studentInfo } = useStudentInfo();
  const { gradeData } = useStudentGrade(studentInfo?._id);
  const { schoolInfo } = useSchoolSessionData(studentInfo?.schoolIDs);
  const { subjectData } = useClassSubject(studentInfo?.presentClassID);
  const { subjectInfo } = useSujectInfo("subjectID");
  // const {  } = useClassStudent(studentInfo?.presentClassID);

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
        {subject?.slice(0, 20)}
      </p>
    </div>
  );
};
