import React from "react";

import { createBrowserRouter } from "react-router-dom";
const PersonalSetting = React.lazy(
  () => import("../pages/page/settings/PersonalSetting")
);
const PersonalInfoScreen = React.lazy(
  () => import("../pages/page/settings/PersonalInfoScreen")
);
const SettingScreen = React.lazy(
  () => import("../pages/page/settings/Setting")
);
const StudentDetail = React.lazy(
  () => import("../pages/page/student/StudentDetail")
);
const StaffDetail = React.lazy(() => import("../pages/page/staff/StaffDetail"));
const ViewStaffScreen = React.lazy(
  () => import("../pages/page/staff/ViewStaffScreen")
);
const ViewStudent = React.lazy(
  () => import("../pages/page/student/ViewStudent")
);
const ViewReport = React.lazy(() => import("../pages/page/report/ViewReport"));
const HomeView = React.lazy(() => import("../pages/home/HomeView"));
const HomeScreen = React.lazy(() => import("../pages/home/HomeScreen"));
const Layout = React.lazy(() => import("../components/layout/Layout"));
const MakeShift = React.lazy(() => import("./MakeShift"));
const PrivateRouter = React.lazy(() => import("./PrivateRouter"));
import { ErrorBoundary } from "react-error-boundary";
const LoadingScreen = React.lazy(
  () => import("../components/static/LoadingScreen")
);
const ThirdScreen = React.lazy(() => import("../pages/home/start/ThirdStep"));
const SecondStep = React.lazy(() => import("../pages/home/start/SecondStep"));
const ClassRoomScreen = React.lazy(
  () => import("../pages/page/class/ClassRoomScreen")
);
const ClassDetailScreen = React.lazy(
  () => import("../pages/page/class/ClassDetailScreen")
);
const ViewSubjects = React.lazy(
  () => import("../pages/page/subject/ViewSubject")
);
const AdminLessonNote = React.lazy(
  () => import("../pages/page/less/LessonNote")
);
const ViewTeacherNoteByAdmin = React.lazy(
  () => import("../pages/page/less/ViewTeacherNote")
);
const ViewSchoolSettings = React.lazy(
  () => import("../pages/page/settings/ViewSchoolSettings")
);
const SchoolTheme = React.lazy(
  () => import("../pages/page/settings/SchoolTheme")
);
const GallerySettings = React.lazy(
  () => import("../pages/page/settings/GallerySettings")
);
const GallaryScreen = React.lazy(
  () => import("../pages/page/gallary/GallaryScreen")
);
const ThemeScreen = React.lazy(
  () => import("../pages/page/settings/ThemeScreen")
);
const TestGallary = React.lazy(
  () => import("../pages/page/gallary/TestGallary")
);

const ViewStoreItems = React.lazy(
  () => import("../pages/page/store/ViewStoreItems")
);

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
              {
                index: true,
                path: "dashboard",
                element: <HomeView />,
              },
            ],
          },

          {
            index: true,
            path: "test",
            element: <TestGallary />,
          },

          {
            index: true,
            path: "lesson-note",
            element: <AdminLessonNote />,
          },

          {
            index: true,
            path: "/lesson-note/:noteID",
            element: <ViewTeacherNoteByAdmin />,
          },

          {
            index: true,
            path: "subjects",
            element: <ViewSubjects />,
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
            path: "class-room",
            element: <ClassRoomScreen />,
          },
          {
            index: true,
            path: "class-room/class-details/:classID",
            element: <ClassDetailScreen />,
          },
          {
            index: true,
            path: "view-staff/staff-details/:staffID",
            element: <StaffDetail />,
          },
          {
            index: true,
            path: "view-students/student-details/:studentID",
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
            index: true,
            path: "gallary",
            element: <GallaryScreen />,
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

              {
                index: true,
                path: "theme-settings",
                element: <SchoolTheme />,
              },
              {
                index: true,
                path: "theme-setting",
                element: <ThemeScreen />,
              },
            ],
          },

          {
            path: "school-info",
            element: <ViewSchoolSettings />,
            children: [
              {
                index: true,
                path: "view-school-settings",
                element: <ViewSchoolSettings />,
              },
            ],
          },

          {
            index: true,
            path: "view-gallery",
            element: <GallerySettings />,
          },
        ],
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
]);
