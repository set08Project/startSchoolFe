import { createBrowserRouter } from "react-router-dom";
import React from "react";

const StudentDashboard = React.lazy(
  () => import("../pagesForStudents/StudentDashboard")
);

const Assignment = React.lazy(() => import("../pagesForStudents/Assignment"));
const Article = React.lazy(() => import("../pagesForStudents/Article"));
const TimeTable = React.lazy(() => import("../pagesForStudents/TimeTable"));
const StudentProfile = React.lazy(
  () => import("../pagesForStudents/StudentProfile")
);

const Layout = React.lazy(() => import("../pagesForStudents/layout/Layout"));
const MyClassroom = React.lazy(
  () => import("../pagesForStudents/pages/subjects/Subject")
);

const QuizSetupScreen = React.lazy(
  () => import("../pagesForStudents/pages/quiz/QuizSetupScreen")
);
const QuizTestScreen = React.lazy(
  () => import("../pagesForStudents/pages/quiz/QuizTestScreen")
);
const MyClassRoomScreen = React.lazy(
  () => import("../pagesForStudents/pages/class/MyClassRoom")
);
const ReportScreen = React.lazy(
  () => import("../pagesForStudents/pages/report/ReportScreen")
);
const ClassLessonNote = React.lazy(
  () => import("../pagesForStudents/pages/studentNote/StudentNote")
);
const ViewClassNoteDetail = React.lazy(
  () => import("../pagesForStudents/pages/studentNote/ViewNotes")
);

const CreateArticle = React.lazy(
  () => import("../pagesForStudents/pages/article/CreateArticle")
);

const StudentGalleryScreen = React.lazy(
  () => import("../pagesForStudents/pages/Gallary/GallaryScreen")
);

const ViewReport = React.lazy(
  () => import("../pagesForStudents/pages/complain/ViewReport")
);
const PassQuestionQuiz = React.lazy(
  () => import("../pagesForStudents/pages/quiz/PassQuestionQuiz")
);
const PastQuestionScreen = React.lazy(
  () => import("../pagesForStudents/pages/quiz/PastQuestionScreen")
);
const PastQuestionYears = React.lazy(
  () => import("../pagesForStudents/pages/quiz/PastQuestionYears")
);
const QuizHistory = React.lazy(
  () => import("../pagesForStudents/pages/quiz/QuizHistory")
);

export const studentRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <StudentDashboard /> },
      {
        path: "/dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "/time-table",
        element: <TimeTable />,
      },
      {
        path: "/your-profile",
        element: <StudentProfile />,
      },
      {
        path: "/my-classroom",
        element: <MyClassRoomScreen />,
      },
      {
        path: "/lesson",
        element: <ClassLessonNote />,
      },
      {
        path: "/lesson/:noteID",
        element: <ViewClassNoteDetail />,
      },
      {
        path: "/gallary",
        element: <StudentGalleryScreen />,
      },
      {
        path: "/articles",
        element: <Article />,
      },
      {
        path: "/articles/:view",
        element: <Article />,
      },
      {
        path: "/create-article",
        element: <CreateArticle />,
      },
      {
        path: "/your-subjects",
        element: <MyClassroom />,
      },
      {
        path: "subjects/:subjectID",
        element: <QuizSetupScreen />,
      },
      {
        path: "/quiz/details/:quizID",
        element: <QuizTestScreen />,
      },
      {
        path: "/assignment",
        element: <Assignment />,
      },
      {
        path: "history/quiz",
        element: <QuizHistory />,
      },
      {
        path: "/CBT",
        element: <PassQuestionQuiz />,
      },
      {
        path: "/CBT/:subject/:year",
        element: <PastQuestionScreen />,
      },
      {
        path: "/CBT/:subject",
        element: <PastQuestionYears />,
      },
      {
        path: "/report",
        element: <ReportScreen />,
      },
      {
        path: "/complain",
        element: <ViewReport />,
      },
    ],
  },
]);
