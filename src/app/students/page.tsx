import StudentRegistrationForm from "@/components/StudentRegistrationForm";

export const dynamic = 'force-dynamic';

export default function StudentsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <header className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-4">
          Student <span className="text-gradient">Management</span>
        </h1>
        <p className="text-slate-500 font-medium text-lg">
          Add new students to the academy and manage their profiles.
        </p>
      </header>
      
      <div className="max-w-xl">
        <StudentRegistrationForm />
      </div>
    </div>
  );
}
