import { createBrowserRouter } from "react-router-dom";
import PersonalSetting from "../pages/settings/PersonalSetting";
import PersonalInfoScreen from "../pages/settings/PersonalInfoScreen";
import ViewStoreItems from "../pages/store/ViewStoreItems";
import SettingScreen from "../pages/settings/Setting";
import StudentDetail from "../pages/student/StudentDetail";
import StaffDetail from "../pages/staff/StaffDetail";
import ViewStaffScreen from "../pages/staff/ViewStaffScreen";
import ViewStudent from "../pages/student/ViewStudent";
import ViewReport from "../pages/report/ViewReport";
import HomeView from "../pages/home/HomeView";
import HomeScreen from "../pages/home/HomeScreen";
import Layout from "../components/layout/Layout";
import MakeShift from "./MakeShift";
import PrivateRouter from "./PrivateRouter";
import { ErrorBoundary } from "react-error-boundary";
import LoadingScreen from "../components/static/LoadingScreen";

export const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary fallback={<LoadingScreen />}>
        <PrivateRouter>
          <MakeShift />
        </PrivateRouter>
      </ErrorBoundary>
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
]);
