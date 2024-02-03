import { createBrowserRouter } from "react-router-dom";
import TeacherDashboard from "../pagesForTeachers/TeacherDashboard";
import LoadingScreen from "../components/static/LoadingScreen";

export const teacherRouter = createBrowserRouter([
  {
    path: "/",
    element: <TeacherDashboard />,
  },
  {
    path: "*",
    element: <LoadingScreen />,
  },
]);
