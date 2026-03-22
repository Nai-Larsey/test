import EnrollmentForm from "@/components/EnrollmentForm";
import StudentRegistrationForm from "@/components/StudentRegistrationForm";
import { db } from "@/db";
import { students, courses } from "@/db/schema"; 

export default async function Home() {
  const allStudents = await db.select().from(students);
  const allCourses = await db.select().from(courses);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-12 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            School Registration System
          </h1>
          <p className="text-xl text-gray-600">Onboard students and manage course enrollments in one place.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Column */}
          <div className="space-y-8">
            <section>
              <StudentRegistrationForm />
            </section>
            
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">System Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-600">Registered Students</span>
                  <span className="font-mono font-bold text-indigo-600">{allStudents.length}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-600">Active Courses</span>
                  <span className="font-mono font-bold text-indigo-600">{allCourses.length}</span>
                </div>
              </div>
              
              {allCourses.length === 0 && (
                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100 text-sm text-amber-800">
                  <strong>Note:</strong> No courses found in database. You may need to add some courses via the database or a course management tool to test enrollment.
                </div>
              )}
            </section>
          </div>

          {/* Enrollment Column (Span 2) */}
          <div className="lg:col-span-2">
            <section>
              <EnrollmentForm students={allStudents} courses={allCourses} />
            </section>

            {/* List of current students for quick reference */}
            <section className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Onboarding</h2>
              {allStudents.length === 0 ? (
                <p className="text-gray-400 italic">No students registered yet.</p>
              ) : (
                <ul className="divide-y divide-gray-50">
                  {allStudents.slice(-5).reverse().map((s) => (
                    <li key={s.id} className="py-3 flex justify-between items-center text-black">
                      <div>
                        <p className="font-medium text-gray-900">{s.name}</p>
                        <p className="text-sm text-gray-500">{s.email}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}