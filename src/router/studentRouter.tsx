import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import LoadingScreen from "../pagesForStudents/static/LoadingScreen";
import Correction from "../pagesForStudents/pages/quiz/Correction";
import SchoolFeePaidScreen from "../pagesForStudents/schoolFee/SchoolFeePaidScreen";
import DownloadTest from "../pagesForStudents/schoolFee/DownloadTest";
import PrintReportCard from "../pagesForStudents/pages/CardTemplate/PrintReportCard";
import Finances from "../pagesForStudents/pages/Finances/Finances";

const QuizResultScreen = React.lazy(
  () => import("../pagesForStudents/pages/quiz/QuizResultScreen")
);
const ReportCardPrint = React.lazy(
  () => import("../pagesForStudents/pages/CardTemplate/ReportCardPrint")
);
//
const SchoolFeesHistoryScreenStudent = React.lazy(
  () => import("../pagesForStudents/pages/screens/SchoolFeeHistory")
);

const PurchaseHistory = React.lazy(
  () => import("../pagesForStudents/pages/store/PurchaseHistory")
);

const CardReportHistory = React.lazy(
  () => import("../pagesForTeachers/pages/Result/CardReport")
);

const StudentDashboard = React.lazy(
  () => import("../pagesForStudents/StudentDashboard")
);

const Assignment = React.lazy(() => import("../pagesForStudents/Assignment"));
const Article = React.lazy(() => import("../pagesForStudents/Article"));
const TimeTable = React.lazy(() => import("../pagesForStudents/TimeTable"));
const StudentProfile = React.lazy(
  () => import("../pagesForStudents/StudentProfile")
);
const StudentSettings = React.lazy(
  () => import("../pagesForStudents/StudentSettings")
);

const Layout = React.lazy(() => import("../pagesForStudents/layout/Layout"));
const MyClassroom = React.lazy(
  () => import("../pagesForStudents/pages/subjects/Subject")
);

const QuizSetupScreen = React.lazy(
  () => import("../pagesForStudents/pages/quiz/QuizSetupScreen")
);
const QuizTestScreen = React.lazy(
  () => import("../pagesForStudents/pages/quiz/QuizTestScreen")
);
const MyClassRoomScreen = React.lazy(
  () => import("../pagesForStudents/pages/class/MyClassRoom")
);
const ReportScreen = React.lazy(
  () => import("../pagesForStudents/pages/report/ReportScreen")
);
const ClassLessonNote = React.lazy(
  () => import("../pagesForStudents/pages/studentNote/StudentNote")
);
const ViewClassNoteDetail = React.lazy(
  () => import("../pagesForStudents/pages/studentNote/ViewNotes")
);

const CreateArticle = React.lazy(
  () => import("../pagesForStudents/pages/article/CreateArticle")
);

const StudentGalleryScreen = React.lazy(
  () => import("../pagesForStudents/pages/Gallary/GallaryScreen")
);

const ViewReport = React.lazy(
  () => import("../pagesForStudents/pages/complain/ViewReport")
);
const PassQuestionQuiz = React.lazy(
  () => import("../pagesForStudents/pages/quiz/PassQuestionQuiz")
);
const PastQuestionScreen = React.lazy(
  () => import("../pagesForStudents/pages/quiz/PastQuestionScreen")
);
const PastQuestionYears = React.lazy(
  () => import("../pagesForStudents/pages/quiz/PastQuestionYears")
);
const QuizHistory = React.lazy(
  () => import("../pagesForStudents/pages/quiz/QuizHistory")
);

const ViewStoreItems = React.lazy(
  () => import("../pagesForStudents/pages/store/ViewStoreItems")
);

export const studentRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StudentDashboard />{" "}
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StudentDashboard />
          </Suspense>
        ),
      },
      {
        path: "/print-result1",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PrintReportCard />
          </Suspense>
        ),
      },
      {
        path: "/print-result",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ReportCardPrint />
          </Suspense>
        ),
      },
      {
        path: "/school-fee-history",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SchoolFeesHistoryScreenStudent />
          </Suspense>
        ),
      },

      {
        path: "/purchase-history",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PurchaseHistory />
          </Suspense>
        ),
      },
      {
        path: "/store",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <ViewStoreItems />
          </Suspense>
        ),
      },
      {
        path: "/result",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CardReportHistory />
          </Suspense>
        ),
      },
      {
        path: "/my-finances",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Finances />
          </Suspense>
        ),
      },
      {
        path: "/time-table",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <TimeTable />
          </Suspense>
        ),
      },
      {
        path: "/your-profile",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StudentProfile />
          </Suspense>
        ),
      },
      {
        path: "/your-settings",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StudentSettings />
          </Suspense>
        ),
      },
      {
        path: "/my-classroom",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MyClassRoomScreen />
          </Suspense>
        ),
      },
      {
        path: "/lesson",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ClassLessonNote />
          </Suspense>
        ),
      },
      {
        path: "/lesson/:noteID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <ViewClassNoteDetail />
          </Suspense>
        ),
      },
      {
        path: "/quiz-result/:quizID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            {" "}
            <QuizResultScreen />
          </Suspense>
        ),
      },
      {
        path: "/gallary",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <StudentGalleryScreen />
          </Suspense>
        ),
      },
      {
        path: "/articles",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "/articles/:view",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "/create-article",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CreateArticle />
          </Suspense>
        ),
      },
      {
        path: "/your-subjects",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MyClassroom />
          </Suspense>
        ),
      },
      {
        path: "subjects/:subjectID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <QuizSetupScreen />
          </Suspense>
        ),
      },
      {
        path: "/quiz/details/:quizID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <QuizTestScreen />
          </Suspense>
        ),
      },
      {
        path: "/assignment",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Assignment />
          </Suspense>
        ),
      },
      {
        path: "history/cbt",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <QuizHistory />
          </Suspense>
        ),
      },
      {
        path: "/CBT",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PassQuestionQuiz />
          </Suspense>
        ),
      },
      {
        path: "/CBT/:subject/:year",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PastQuestionScreen />
          </Suspense>
        ),
      },
      {
        path: "/CBT/:subject",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PastQuestionYears />
          </Suspense>
        ),
      },
      {
        path: "/:subject/:year/:cbtID",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Correction />
          </Suspense>
        ),
      },
      {
        path: "/report",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ReportScreen />
          </Suspense>
        ),
      },
      {
        path: "/complain",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ViewReport />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/school-fee-payment1",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <SchoolFeePaidScreen />
      </Suspense>
    ),
  },
  {
    path: "/school-fee-payment",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <DownloadTest />
      </Suspense>
    ),
  },
]);
