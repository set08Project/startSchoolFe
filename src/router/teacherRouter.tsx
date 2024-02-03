import { createBrowserRouter } from "react-router-dom";
import TeacherDashboard from "../pagesForTeachers/TeacherDashboard";

export const teacherRouter = createBrowserRouter([
  {
    path: "/",
    element: <TeacherDashboard />,
  },
]);
