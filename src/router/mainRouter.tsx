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
import ViewStaffScreen from "../pages/staff/ViewStaffScreen";
import PersonalSetting from "../pages/settings/PersonalSetting";
import PersonalInfoScreen from "../pages/settings/PersonalInfoScreen";
import ViewStudent from "../pages/student/ViewStudent";
import StaffDetail from "../pages/staff/StaffDetail";
import StudentDetail from "../pages/student/StudentDetail";
import ViewStoreItems from "../pages/store/ViewStoreItems";
import ViewReport from "../pages/report/ViewReport";

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
            ],
          },
          {
            index: true,
            path: "report",
            element: <ViewReport />,
            // element: <ViewCommentsAndReportScreen />,
          },
          {
            index: true,
            path: "view-students",
            element: <ViewStudent />,
          },
          {
            index: true,
            path: "view-staff",
            element: <ViewStaffScreen />,
          },
          {
            index: true,
            path: "view-staff/staff-details/:staffID",
            element: <StaffDetail />,
          },
          {
            index: true,
            path: "view-students/student-details/:staffID",
            element: <StudentDetail />,
          },

          {
            index: true,
            path: "settings",
            element: <SettingScreen />,
          },

          {
            index: true,
            path: "store",
            element: <ViewStoreItems />,
          },

          {
            path: "my-personal-info",
            element: <PersonalSetting />,
            children: [
              {
                index: true,
                path: "info",
                element: <PersonalInfoScreen />,
              },
              // {
              //   index: true,
              //   path: "my-main-info",
              //   element: <ProfressionInfoScreen />,
              // },
              // {
              //   index: true,
              //   path: "choose-hospital",
              //   element: <HospitalChice />,
              // },
            ],
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
