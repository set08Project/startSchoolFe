import { createBrowserRouter } from "react-router-dom";

const TeacherDashboard = React.lazy(
  () => import("../pagesForTeachers/TeacherDashboard")
);
const LoadingScreen = React.lazy(
  () => import("../components/static/LoadingScreen")
);
const TeacherLayout = React.lazy(
  () => import("../pagesForTeachers/components/layout/TeacherLayout")
);
const Schedule = React.lazy(
  () => import("../pagesForTeachers/pages/schedule/Schedule")
);

const MyClass = React.lazy(
  () => import("../pagesForTeachers/pages/class/MyClass")
);

const Subjects = React.lazy(
  () => import("../pagesForTeachers/pages/subject/Subjects")
);

const LessonNote = React.lazy(
  () => import("../pagesForTeachers/pages/lessonNote/LessonNote")
);

const WeekReport = React.lazy(
  () => import("../pagesForTeachers/pages/report/WeekReport")
);

const ViewStoreItems = React.lazy(
  () => import("../pagesForTeachers/pages/store/ViewStoreItems")
);

const StudentDetail = React.lazy(
  () => import("../pagesForTeachers/pages/class/StudentDetail")
);

const QuizSetupScreen = React.lazy(
  () => import("../pagesForTeachers/pages/quiz/QuizSetupScreen")
);
const QuizTestScreen = React.lazy(
  () => import("../pagesForTeachers/pages/quiz/QuizTestScreen")
);
const CreateQuiz = React.lazy(
  () => import("../pagesForTeachers/pages/quiz/CreateQuiz")
);
const CreateLesson = React.lazy(
  () => import("../pagesForTeachers/pages/lessonNote/CreateLessonNote")
);
const AttendanceScreen = React.lazy(
  () => import("../pagesForTeachers/pages/attendance/AttendanceScreen")
);
const ViewTeacherNote = React.lazy(
  () => import("../pagesForTeachers/pages/lessonNote/ViewTeacherNote")
);

const Article = React.lazy(
  () => import("../pagesForTeachers/pages/article/Article")
);
const GalleryScreen = React.lazy(
  () => import("../pagesForTeachers/pages/gallary/GallaryScreen")
);
const ViewReport = React.lazy(
  () => import("../pagesForTeachers/pages/complain/ViewReport")
);
const TableTag = React.lazy(
  () => import("../pagesForTeachers/pages/ReportCard/TableTag")
);
const CardReport = React.lazy(
  () => import("../pagesForTeachers/pages/ReportCard/CardReport")
);
import React from "react";

export const teacherRouter = createBrowserRouter([
  {
    path: "/",
    element: <TeacherLayout />,
    children: [
      {
        index: true,
        element: <TeacherDashboard />,
      },
      {
        index: true,
        path: "complain",
        element: <ViewReport />,
      },
      {
        path: "/dashboard",
        index: true,
        element: <TeacherDashboard />,
      },
      {
        path: "my-schedule",
        element: <Schedule />,
      },
      {
        path: "my-class",
        element: <MyClass />,
      },
      {
        path: "my-class/student-details/:studentID",
        element: <StudentDetail />,
      },
      {
        path: "subjects",
        element: <Subjects />,
      },
      {
        path: "subjects/:subjectID",
        element: <QuizSetupScreen />,
      },
      {
        path: "attendance",
        element: <AttendanceScreen />,
      },
      {
        path: "quiz/details/:quizID",
        element: <QuizTestScreen />,
      },

      {
        path: "create-quiz/:subjectID",
        element: <CreateQuiz />,
      },
      {
        path: "lesson-note",
        element: <LessonNote />,
      },
      {
        path: "table-tag",
        element: <TableTag />,
      },
      {
        path: "report-card",
        element: <CardReport />,
      },
      {
        path: "view-articles/:view",
        element: <Article />,
      },

      {
        path: "view-articles",
        element: <Article />,
      },
      {
        path: "lesson-note/:noteID",
        element: <ViewTeacherNote />,
      },

      {
        path: "create-notes",
        element: <CreateLesson />,
      },

      {
        path: "store",
        element: <ViewStoreItems />,
      },

      {
        path: "exams",
        element: <QuizSetupScreen />,
      },

      {
        path: "Gallary",
        element: <GalleryScreen />,
      },

      {
        path: "week-report",
        element: <WeekReport />,
      },
    ],
  },
  {
    path: "*",
    element: <LoadingScreen />,
  },
]);
