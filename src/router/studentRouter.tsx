import { createBrowserRouter } from "react-router-dom";
import StudentDashboard from "../pagesForStudents/StudentDashboard";
// import Layout from "../components/layout/Layout";
import Assignment from "../pagesForStudents/Assignment";
import MySubjects from "../pagesForStudents/MySubjects";
import Article from "../pagesForStudents/Article";
import TimeTable from "../pagesForStudents/TimeTable";
import StudentProfile from "../pagesForStudents/StudentProfile";
import Layout from "../pagesForStudents/layout/Layout";
import MyClassroom from "../pagesForStudents/pages/subjects/Subject";
import QuizSetupScreen from "../pagesForStudents/pages/quiz/QuizSetupScreen";
import QuizTestScreen from "../pagesForStudents/pages/quiz/QuizTestScreen";
import MyClassRoomScreen from "../pagesForStudents/pages/class/MyClassRoom";
import ReportScreen from "../pagesForStudents/pages/report/ReportScreen";

export const studentRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <StudentDashboard /> },
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
        path: "/articles",
        element: <Article />,
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
        path: "/report",
        element: <ReportScreen />,
      },
    ],
  },
]);
