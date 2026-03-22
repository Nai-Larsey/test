import EnrollmentForm from "@/components/EnrollmentForm";
import { db } from "@/db";
import { students, courses } from "@/db/schema"; 

export const dynamic = 'force-dynamic';

export default async function EnrollmentPage() {
  const allStudents = await db.select().from(students);
  const allCourses = await db.select().from(courses);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <header className="mb-12 text-center sm:text-left">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-4">
          Course <span className="text-gradient">Enrollment</span>
        </h1>
        <p className="text-slate-500 font-medium text-lg leading-relaxed">
          Manage and register students for active courses.
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
        <EnrollmentForm students={allStudents} courses={allCourses} />
      </div>
    </div>
  );
}
