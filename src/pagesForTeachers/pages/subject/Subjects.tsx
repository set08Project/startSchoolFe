import { FC } from "react";
import { Link } from "react-router-dom";
import { useSujectInfo, useTeacherInfo } from "../../hooks/useTeacher";
import LittleHeader from "../../components/layout/LittleHeader";
import {
  useClassSubjects,
  useSchoolSessionData,
} from "../../../pages/hook/useSchoolAuth";
import pix from "../../../assets/pix.jpg";

document.title = "View teacher subjects";

interface AssignedSubject {
  id?: string;
  _id?: string;
  subjectID?: string;
  title?: string;
  subjectTitle?: string;
  classMeant?: string;
  classID?: string;
  subject?: {
    id?: string;
    _id?: string;
    subjectID?: string;
    subjectTitle?: string;
  };
}

interface ClassAssignment {
  classID?: string;
  className?: string;
}

interface SubjectRowProps {
  assignment: AssignedSubject;
  classID?: string;
  term?: string;
  session?: string;
}

interface SubjectReadinessProps {
  subjectID: string;
  term?: string;
  session?: string;
}

const normalize = (value?: string) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const normalizeClassName = (value?: string) =>
  normalize(value).replace(/[^a-z0-9]/g, "");

const normalizeSubjectName = (value?: string) =>
  normalize(value)
    .replace(/\bmaths?\b/g, "mathematics")
    .replace(/[^a-z0-9]/g, "");

const getAssignedSubjectId = (assignment: AssignedSubject) =>
  assignment.subjectID ||
  assignment.id ||
  assignment._id ||
  assignment.subject?.subjectID ||
  assignment.subject?.id ||
  assignment.subject?._id;

const Status: FC<{ label: string; ready: boolean | undefined }> = ({
  label,
  ready,
}) => (
  <div className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2">
    <span className="text-sm text-slate-600">{label}</span>
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        ready === undefined
          ? "bg-slate-100 text-slate-500"
          : ready
          ? "bg-green-50 text-green-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      {ready === undefined ? "Loading" : ready ? "Ready" : "Not ready"}
    </span>
  </div>
);

const SubjectReadiness: FC<SubjectReadinessProps> = ({
  subjectID,
  term,
  session,
}) => {
  const { subjectInfo } = useSujectInfo(subjectID);
  const currentTerm = normalize(term);
  const currentSession = normalize(session);

  const matchesCurrentPeriod = (assessment: {
    term?: string;
    session?: string;
  }) => {
    const assessmentTerm = normalize(assessment.term);
    const assessmentSession = normalize(assessment.session);

    return (
      (!currentTerm || assessmentTerm === currentTerm) &&
      (!currentSession || assessmentSession === currentSession)
    );
  };

  const assessmentsLoaded = Boolean(subjectInfo);

  return (
    <div className="grid gap-2 sm:grid-cols-3">
      <Status
        label="Quiz"
        ready={
          assessmentsLoaded ? Boolean(subjectInfo?.quiz?.length) : undefined
        }
      />
      <Status
        label="Mid-test"
        ready={
          assessmentsLoaded
            ? Boolean(subjectInfo?.midTest?.some(matchesCurrentPeriod))
            : undefined
        }
      />
      <Status
        label="Examination"
        ready={
          assessmentsLoaded
            ? Boolean(subjectInfo?.examination?.some(matchesCurrentPeriod))
            : undefined
        }
      />
    </div>
  );
};

const ResolvedSubject: FC<SubjectRowProps & { title: string }> = ({
  assignment,
  classID,
  term,
  session,
  title,
}) => {
  const { readSubject } = useClassSubjects(classID || "");
  const canonicalSubject = readSubject?.find(
    (subject: { subjectTitle?: string }) =>
      normalizeSubjectName(subject?.subjectTitle) ===
      normalizeSubjectName(title)
  );
  const canonicalSubjectID = canonicalSubject?._id;

  if (!readSubject) {
    return <p className="text-sm text-slate-500">Loading classroom subject…</p>;
  }

  if (!canonicalSubjectID) {
    return (
      <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
        This subject assignment does not match a subject in its assigned class.
        Ask your school administrator to correct the assignment.
      </p>
    );
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="break-words text-lg font-semibold text-blue-950">
            {canonicalSubject.subjectTitle || title}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {assignment.classMeant
              ? `Class: ${assignment.classMeant}`
              : "Class not specified"}
          </p>
        </div>
        <Link
          to={`/subjects/${canonicalSubjectID}`}
          className="shrink-0 rounded-lg bg-blue-950 px-4 py-2 text-sm font-medium capitalize text-white transition-colors hover:bg-blue-900"
        >
          View Subject
        </Link>
      </div>
      <SubjectReadiness
        subjectID={canonicalSubjectID}
        term={term}
        session={session}
      />
    </>
  );
};

const SubjectRow: FC<SubjectRowProps> = ({
  assignment,
  classID,
  term,
  session,
}) => {
  const title =
    assignment.title ||
    assignment.subjectTitle ||
    assignment.subject?.subjectTitle ||
    "Assigned subject";

  return (
    <article className="min-w-0 rounded-xl border bg-white p-4 shadow-sm">
      {classID ? (
        <ResolvedSubject
          assignment={assignment}
          classID={classID}
          term={term}
          session={session}
          title={title}
        />
      ) : (
        <>
          <h2 className="break-words text-lg font-semibold text-blue-950">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {assignment.classMeant
              ? `Class: ${assignment.classMeant}`
              : "Class not specified"}
          </p>
          <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            This assignment is not linked to one of your assigned classes.
            Please ask your school administrator to correct the assignment.
          </p>
        </>
      )}
    </article>
  );
};

const TeacherSubject: FC = () => {
  const { teacherInfo } = useTeacherInfo();
  const { schoolInfo } = useSchoolSessionData(teacherInfo?.schoolIDs);
  const assignments: AssignedSubject[] = Array.isArray(
    teacherInfo?.subjectAssigned
  )
    ? teacherInfo.subjectAssigned
    : [];
  const assignedClasses: ClassAssignment[] = Array.isArray(
    teacherInfo?.classesAssigned
  )
    ? teacherInfo.classesAssigned
    : [];

  return (
    <div className="w-full min-w-0">
      <LittleHeader name="Teacher Subjects" />

      <section className="mt-5 flex min-w-0 items-center gap-3">
        <img
          src={teacherInfo?.avatar || pix}
          alt={`${teacherInfo?.staffName || "Teacher"} avatar`}
          className="h-12 w-12 rounded-full border object-cover"
        />
        <div className="min-w-0">
          <h1 className="font-bold text-blue-950">Assigned subjects</h1>
          <p className="text-sm text-slate-500">
            Subjects and assessment readiness for the current school period
          </p>
        </div>
      </section>

      {schoolInfo?.presentTerm || schoolInfo?.presentSession ? (
        <p className="mt-4 text-sm text-slate-600">
          Current period:{" "}
          <span className="font-medium text-blue-950">
            {[schoolInfo?.presentSession, schoolInfo?.presentTerm]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </p>
      ) : null}

      <section className="mt-5 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {assignments.map((assignment, index) => {
          const assignedClass = assignedClasses.find(
            (classAssignment) =>
              normalizeClassName(classAssignment.className) ===
              normalizeClassName(assignment.classMeant)
          );
          const classID = assignment.classID || assignedClass?.classID;

          return (
            <SubjectRow
              key={`${classID || "unlinked"}-${
                getAssignedSubjectId(assignment) ||
                `${assignment.title}-${index}`
              }`}
              assignment={assignment}
              classID={classID}
              term={schoolInfo?.presentTerm}
              session={schoolInfo?.presentSession}
            />
          );
        })}
      </section>

      {assignments.length === 0 && (
        <div className="mt-5 rounded-xl border border-dashed p-8 text-center text-slate-600">
          No subjects have been assigned to your account yet.
        </div>
      )}
    </div>
  );
};

export default TeacherSubject;
