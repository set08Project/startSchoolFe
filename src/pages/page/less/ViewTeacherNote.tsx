document.title = "Teacher's Lesson Notes Approved";

import { useNavigate, useParams } from "react-router-dom";
import LittleHeader from "../../../components/layout/LittleHeader";
import { useLessonNote } from "../../../pagesForTeachers/hooks/useTeacher";
import Button from "../../../components/reUse/Button";
import { approveNoted } from "../../api/schoolAPIs";
import { useSchoolData } from "../../hook/useSchoolAuth";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";

const ViewTeacherNoteByAdmin = () => {
  const navigate = useNavigate();
  const { data } = useSchoolData();
  const { noteID } = useParams();
  const { lessonNoteData } = useLessonNote(noteID!);

  const lessonNoteRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = lessonNoteRef.current;
    const windowPrint = window.open("", "", "width=800,height=600");
    if (windowPrint && printContent) {
      windowPrint.document.write(`
        <html>
          <head>
            <title>Print Lesson Note</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                font-weight: 100;
              }
              .print-content {
                display: block;
                width: 100%;
              }
            </style>
          </head>
          <body>
            <div class="print-content">${printContent.innerHTML}</div>
          </body>
        </html>
      `);
      windowPrint.document.close();
      windowPrint.focus();
      windowPrint.print();
      windowPrint.close();
    }
  };

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      <LittleHeader name={`${""} Lesson Note Details`} />
      <div className="mb-[30px]">
        <button
          onClick={handlePrint}
          className="border border-blue-950 hover:scale-105 text-blue-950 bg-white py-2 px-3"
        >
          Print
        </button>
      </div>
      <div className="flex justify-center items-center ">
        {/* Lesson note starts */}
        <div
          className="bg-white shadow-lg rounded-md min-h-[100vh] w-[95%] md:w-[97%] xl:w-[80%] "
          ref={lessonNoteRef}
        >
          <div className="w-full h-[40px] bg-blue-950 rounded-tl-md rounded-tr-md"></div>
          <div className="p-5">
            <div className="pt-[20px]">
              <div className="mb-5 flex items-center">
                <div className="w-full text-center">
                  <h1 className="text-[18px] md:text-[25px] font-semibold text-blue-950">
                    English Language <span>(JSS 1A)</span>
                  </h1>
                  <h1 className="text-[25px] md:text-[35px] font-semibold text-blue-950">
                    Grammar and Punctuation
                  </h1>
                </div>
                {/* <h1 className="text-[18px] md:text-[20px] font-semibold text-blue-950">
                JSS 1B
              </h1> */}
              </div>
              <div className=" text-blue-950">
                <div className="font-medium">
                  <div className="flex mb-2 items-center">
                    <h2 className="w-[150px]">By:</h2>
                    <h2 className="font-semibold">Prince John</h2>
                  </div>
                  <div className="flex mb-2 items-center">
                    <h2 className="w-[150px]">Started Date:</h2>
                    <h2 className="font-semibold">10/02/2024</h2>
                  </div>
                  <div className="flex mb-2 items-center">
                    <h2 className="w-[150px]">Topic:</h2>
                    <h2 className="font-semibold">Grammar and Punctuation</h2>
                  </div>
                  <div className="flex mb-2 items-center">
                    <h2 className="w-[150px]">Sub Topic:</h2>
                    <h2 className="font-semibold">English Language</h2>
                  </div>
                </div>
              </div>
              <div className="pt-[20px] text-blue-950 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="">
                  <h1 className="font-semibold mb-2">Previous Knowledge:</h1>
                  <h2>
                    From academic performances to writing articles and CBTs to
                    rating teachers and lessons taught and to attendance
                    records.
                  </h2>
                </div>
                <div className="">
                  <h1 className="font-semibold mb-2">Specific Objectives:</h1>
                  <h2>
                    From academic performances to writing articles and CBTs to
                    rating teachers and lessons taught and to attendance
                    records.
                  </h2>
                </div>
              </div>

              <div className="my-5 border-b w-full" />
              <h3 className="mb-3 font-medium leading-9 text-blue-950">
                Dive into Next's virtual hub where you (admin & teachers) can
                effortlessly manage student information. From academic
                performances to writing articles and CBTs to rating teachers and
                lessons taught and to attendance records. Dive into Next's
                virtual hub where you (admin & teachers) can effortlessly manage
                student information. From academic performances to writing
                articles and CBTs to rating teachers and lessons taught and to
                attendance records.Dive into Next's virtual hub where you (admin
                & teachers) can effortlessly manage student information. From
                academic performances to writing articles and CBTs to rating
                teachers and lessons taught and to attendance records.Dive into
                Next's virtual hub where you (admin & teachers) can effortlessly
                manage student information. From academic performances to
                writing articles and CBTs to rating teachers and lessons taught
                and to attendance records.Dive into Next's virtual hub where you
                (admin & teachers) can effortlessly manage student information.
                From academic performances to writing articles and CBTs to
                rating teachers and lessons taught and to attendance
                records.Dive into Next's virtual hub where you (admin &
                teachers) can effortlessly manage student information. From
                academic performances to writing articles and CBTs to rating
                teachers and lessons taught and to attendance records.
              </h3>
              <div className="my-5 border-b w-full" />
              <div className="pt-[20px] text-blue-950 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="min-h-[150px] p-2 rounded-md bg-blue-50">
                  <h1 className="font-semibold mb-2">Evaluation:</h1>
                  <h2>
                    From academic performances to writing articles and CBTs to
                    rating teachers and lessons taught and to attendance
                    records. From academic performances to writing articles and
                    CBTs to rating teachers and lessons taught and to attendance
                    records. From academic performances to writing articles and
                    CBTs to rating teachers and lessons taught and to attendance
                    records.
                  </h2>
                </div>
                <div className="min-h-[150px] p-2 rounded-md bg-blue-50">
                  <h1 className="font-semibold mb-2">Summary:</h1>
                  <h2>
                    From academic performances to writing articles and CBTs to
                    rating teachers and lessons taught and to attendance
                    records.
                  </h2>
                </div>
              </div>
              <div className="pt-[20px] text-blue-950 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="min-h-[150px] p-2 rounded-md bg-blue-50">
                  <h1 className="font-semibold mb-2">Presentation:</h1>
                  <h2>
                    From academic performances to writing articles and CBTs to
                    rating teachers and lessons taught and to attendance
                    records.
                  </h2>
                </div>
                <div className="min-h-[150px] p-2 rounded-md bg-blue-50">
                  <h1 className="font-semibold mb-2">Assignments:</h1>
                  <h2>
                    From academic performances to writing articles and CBTs to
                    rating teachers and lessons taught and to attendance
                    records.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Lesson note starts */}
      </div>
      {/* <div className="mt-10">
        <div className="text-[12px] font-medium mb-5">Lesson Details</div>
        <p className="text-[25px] font-bold">{lessonNoteData?.topic}</p>
        <div className="flex gap-2 text-[12px] font-medium mb-10">
          <p>{lessonNoteData?.classes}</p> &middot;
          <p>{lessonNoteData?.subject}</p>&middot;
          <p
            className={`${
              lessonNoteData?.adminSignation ? "text-green-500" : "text-red-500"
            }`}
          >
            {lessonNoteData?.adminSignation ? "Approved" : "Not-Approved"}
          </p>
          &middot;
        </div>

        <div>
          Sub Topic:
          <span className="uppercase font-bold">
            
            {lessonNoteData?.subTopic}
          </span>
        </div>
        <div className="flex gap-2 text-[12px] font-medium mb-10">
          <p>Duration: {lessonNoteData?.duration}</p> &middot;
          <p>Week: {lessonNoteData?.week}</p>
        </div>
        <p className="mb-1 text-[12px] font-bold">Lesson Note Content:</p>
        <div
          className="border rounded-md px-2 py-5 text-[14px]"
          dangerouslySetInnerHTML={{ __html: `${lessonNoteData?.content}` }}
        />
        <div className="mt-5" />
        <div className="text-[12px]">
          <p className="font-bold mb-2">Lesson Note Evaluation</p>
          <p>{lessonNoteData?.evaluation}</p>
        </div>
        <div className="mt-5" />
        <div className="text-[12px]">
          <p className="font-bold mb-2">Lesson Note Summary</p>
          <p>{lessonNoteData?.summary}</p>
        </div>
        <div className="my-5 border-t" />
        <div className="mt-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="mb-1 text-[12px] font-bold">
              Lesson Note Presentation:
            </p>
            <div className="text-[12px]">{lessonNoteData?.presentation}</div>
          </div>
          <div>
            <p className="mb-1 text-[12px] font-bold">
              Lesson Note Previous Knowledge :
            </p>
            <div className="text-[12px]">
              {lessonNoteData?.previousKnowledge}
            </div>
          </div>
        </div>

        <div className="mt-10" />
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-2">
          <div className="text-[12px]">
            <p className="font-medium">Peroid</p>
            <p>{lessonNoteData?.period}</p>
          </div>

          <div className="text-[12px]">
            <p className="font-medium">Reference Material</p>
            <p>{lessonNoteData?.referenceMaterial}</p>
          </div>

          <div className="text-[12px]">
            <p className="font-medium">Instructional Material</p>
            <p>{lessonNoteData?.instructionalMaterial}</p>
          </div>

          <div className="text-[12px]">
            <p className="font-medium">Instructional Material</p>
            <p>{lessonNoteData?.instructionalMaterial}</p>
          </div>
        </div>
      </div>
      <div className="mt-10" />
      <div>
        <Button
          name={"Approve this Lesson Note"}
          className="bg-blue-950 ml-0"
          onClick={() => {
            approveNoted(data?._id, noteID!)
              .then((res: any) => {
                if (res.status === 200) {
                  toast.success("Lesson note has been Approved");
                } else {
                  toast.error("Fail to approve this Note");
                }
              })
              .then(() => {
                navigate(-1);
              });
          }}
        />
      </div> */}
    </div>
  );
};

export default ViewTeacherNoteByAdmin;
