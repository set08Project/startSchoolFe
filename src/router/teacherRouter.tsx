import { createBrowserRouter } from "react-router-dom";
import TeacherDashboard from "../pagesForTeachers/TeacherDashboard";
import LoadingScreen from "../components/static/LoadingScreen";
import TeacherLayout from "../pagesForTeachers/components/layout/TeacherLayout";
import Schedule from "../pagesForTeachers/pages/schedule/Schedule";
import MyClass from "../pagesForTeachers/pages/class/MyClass";
import Subjects from "../pagesForTeachers/pages/subject/Subjects";
import LessonNote from "../pagesForTeachers/pages/lessonNote/LessonNote";
import Store from "../pagesForTeachers/pages/store/Store";
import Exams from "../pagesForTeachers/pages/exams/Exams";
import WeekReport from "../pagesForTeachers/pages/report/WeekReport";

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
        path: "subjects",
        element: <Subjects />,
      },
      {
        path: "lesson-note",
        element: <LessonNote />,
      },
      {
        path: "lesson-note",
        element: <LessonNote />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "exams",
        element: <Exams />,
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
