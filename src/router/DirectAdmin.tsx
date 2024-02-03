import { FC, PropsWithChildren } from "react";
import { Outlet, createBrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomeScreen from "../pages/home/HomeScreen";
import HomeView from "../pages/home/HomeView";
import ViewReport from "../pages/report/ViewReport";
import ViewStudent from "../pages/student/ViewStudent";
import ViewStaffScreen from "../pages/staff/ViewStaffScreen";
import StaffDetail from "../pages/staff/StaffDetail";
import StudentDetail from "../pages/student/StudentDetail";
import SettingScreen from "../pages/settings/Setting";
import ViewStoreItems from "../pages/store/ViewStoreItems";
import PersonalSetting from "../pages/settings/PersonalSetting";
import PersonalInfoScreen from "../pages/settings/PersonalInfoScreen";

const DirectAdmin = () => {
  const routes = [
    {
      path: "/",
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
          ],

          // {
          //   index: true,
          //   path: "choose-hospital",
          //   element: <HospitalChice />,
          // },
          //       ],
          //     },
          //   ],
          // Add more routes as needed
        },
      ],
    },
  ];

  // const BrowserRouter = createBrowserRouter();

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.map((child) => (
            <Route
              // key={child.index}
              index={child.index}
              element={child.element}
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default DirectAdmin;
