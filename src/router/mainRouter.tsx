import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import Register from "../pages/page/auth/Register";
import SignIn from "../pages/page/auth/SignIn";
import RegisterCard from "../pages/page/auth/RegisterCard";

import SecondStep from "../pages/home/start/SecondStep";
import ThirdScreen from "../pages/home/start/ThirdStep";
import LoadingScreen from "../components/static/LoadingScreen";
import MainSchoolPage from "../mainPage/MainSchoolPage";
import SwitchLogin from "../pages/page/auth/SwitchLogin";
import StudentLogin from "../pages/page/auth/StudentLogin";

export const mainRouter = createBrowserRouter([
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
        path: "switch-login",
        element: <SwitchLogin />,
      },
      {
        index: true,
        path: "student-login",
        element: <StudentLogin />,
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

  {
    path: "*",
    element: <LoadingScreen />,
  },
  {
    path: "/:schoolName",
    element: <MainSchoolPage />,
  },

  // {
  //   path: "/",
  //   element: <LandingPageScreen />,
  // },
]);

// {
//         element: <Layout />,
//         children: [
//           {
//             element: <HomeScreen />,
//             children: [
//               {
//                 index: true,
//                 element: <HomeView />,
//               },
//             ],
//           },
//           {
//             index: true,
//             path: "report",
//             element: <ViewReport />,
//             // element: <ViewCommentsAndReportScreen />,
//           },
//           {
//             index: true,
//             path: "view-students",
//             element: <ViewStudent />,
//           },
//           {
//             index: true,
//             path: "view-staff",
//             element: <ViewStaffScreen />,
//           },
//           {
//             index: true,
//             path: "view-staff/staff-details/:staffID",
//             element: <StaffDetail />,
//           },
//           {
//             index: true,
//             path: "view-students/student-details/:staffID",
//             element: <StudentDetail />,
//           },

//           {
//             index: true,
//             path: "settings",
//             element: <SettingScreen />,
//           },

//           {
//             index: true,
//             path: "store",
//             element: <ViewStoreItems />,
//           },

//           {
//             path: "my-personal-info",
//             element: <PersonalSetting />,
//             children: [
//               {
//                 index: true,
//                 path: "info",
//                 element: <PersonalInfoScreen />,
//               },
//               // {
//               //   index: true,
//               //   path: "my-main-info",
//               //   element: <ProfressionInfoScreen />,
// },
// {
//   index: true,
//   path: "choose-hospital",
//   element: <HospitalChice />,
// },
//       ],
//     },
//   ],
// },
