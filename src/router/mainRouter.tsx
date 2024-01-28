import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import Register from "../pages/auth/Register";
import SignIn from "../pages/auth/SignIn";
import RegisterCard from "../pages/auth/RegisterCard";
import Layout from "../components/layout/Layout";
import HomeScreen from "../pages/home/HomeScreen";
import PrivateRouter from "./PrivateRouter";
import MakeShift from "./MakeShift";
import SecondStep from "../pages/home/start/SecondStep";
import ThirdScreen from "../pages/home/start/ThirdStep";
import ViewCommentsAndReportScreen from "../pages/report/ViewCommentsAndReportScreen";
import HomeView from "../pages/home/HomeView";
import SettingScreen from "../pages/settings/Setting";
import ViewStaffScreen from "../pages/staffs/ViewStaffScreen";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <MakeShift />
      </PrivateRouter>
    ),
    children: [
      {
        element: <Layout />,
        children: [
          {
            element: <HomeScreen />,
            children: [
              {
                index: true,
                element: <HomeView />,
              },

              {
                index: true,
                path: "report",
                element: <ViewCommentsAndReportScreen />,
              },
            ],
          },

          {
            index: true,
            path: "view-staff",
            element: <ViewStaffScreen />,
          },

          {
            index: true,
            path: "settings",
            element: <SettingScreen />,
          },
        ],
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
      {
        index: true,
        path: "login",
        element: <SignIn />,
      },
      {
        index: true,
        path: "api/verify-user/:token",
        element: <SignIn />,
      },
      {
        index: true,
        path: "register-message",
        element: <RegisterCard />,
      },
    ],
  },

  {
    path: "/step-two-data",
    element: <ThirdScreen />,
  },

  {
    path: "/step-third-data",
    element: <SecondStep />,
  },
]);
