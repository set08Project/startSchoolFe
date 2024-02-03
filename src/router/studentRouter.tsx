import { createBrowserRouter } from "react-router-dom";
import StudentDashboard from "../pagesForStudents/StudentDashboard";

export const studentRouter = createBrowserRouter([
  {
    path: "/",
    element: <StudentDashboard />,
  },
]);
