import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const AuthLayout = React.lazy(() => import("../components/layout/AuthLayout"));
const Register = React.lazy(() => import("../pages/page/auth/Register"));
const SignIn = React.lazy(() => import("../pages/page/auth/SignIn"));

const RegisterCard = React.lazy(
  () => import("../pages/page/auth/RegisterCard")
);
import LoadingScreen from "../components/static/LoadingScreen";

// import SecondStep from "../pages/home/start/SecondStep";
// import ThirdScreen from "../pages/home/start/ThirdStep";

const SecondStep = React.lazy(() => import("../pages/home/start/SecondStep"));
const ThirdScreen = React.lazy(() => import("../pages/home/start/ThirdStep"));

// const LoadingScreen = React.lazy(
// () => import("../components/static/LoadingScreen")
// );
const SwitchLogin = React.lazy(() => import("../pages/page/auth/SwitchLogin"));

const StudentLogin = React.lazy(
  () => import("../pages/page/auth/StudentLogin")
);
const LandingLayout = React.lazy(() => import("../LandingPage1/LandingLayout"));
const feature = React.lazy(() => import("../LandingPage1/Feature"));
const Contact = React.lazy(() => import("../LandingPage1/Contact"));
const About = React.lazy(() => import("../LandingPage1/About"));
const SchoolLandingPage = React.lazy(
  () => import("../mainSchoolPage/Pages/SchoolLandingPage")
);
const LandingScreen = React.lazy(
  () => import("../LandingPage1/Homescreen/HomeScreen")
);
const StartUsing = React.lazy(
  () => import("../LandingPage1/Homescreen/StartUsing")
);

import SchoolPageEntry from "../schoolPage/SchoolPageEntry";
import ResultHistory from "../pages/page/ResultHistory/Result";
import Feature from "../LandingPage1/Feature";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <LandingLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <LandingScreen />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/features",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <Feature />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/contact",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/about",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <About />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/service",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StartUsing />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/auth",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Register />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "login",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "switch-login",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SwitchLogin />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "student-login",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StudentLogin />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "api/verify-user/:token",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <SignIn />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "register-message",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <RegisterCard />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/step-two-data",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <ThirdScreen />
      </Suspense>
    ),
  },

  {
    path: "/step-third-data",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <SecondStep />
      </Suspense>
    ),
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <LoadingScreen />
      </Suspense>
    ),
  },
  {
    path: "/school/:schoolName",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <SchoolLandingPage />
      </Suspense>
    ),
    // element: <SchoolPageLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SchoolPageEntry />
          </Suspense>
        ),
      },
    ],
  },
]);
