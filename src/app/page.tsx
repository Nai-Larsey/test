import { db } from "@/db";
import { students, courses } from "@/db/schema"; 
import { LayoutDashboard, Users, BookOpen, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allStudents = await db.select().from(students);
  const allCourses = await db.select().from(courses);

  return (
    <main className="min-h-screen py-12 px-10">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-brand-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl space-y-16">
        <header className="space-y-4">
          <h1 className="text-7xl font-black tracking-tighter text-slate-900">
            Academy<span className="text-gradient">Insights</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
            Welcome back to your operational command center. Monitor growth, manage enrollment, and scale your academy.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-[2.5rem] relative group border-none">
            <div className="bg-brand-primary/10 p-4 rounded-3xl w-fit mb-6 text-brand-primary group-hover:scale-110 transition-transform duration-500">
              <Users size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Total Students</p>
            <p className="text-5xl font-black text-slate-900 tracking-tighter">{allStudents.length}</p>
            <div className="absolute top-8 right-8 text-emerald-500 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">+12%</div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] relative group border-none">
            <div className="bg-brand-secondary/10 p-4 rounded-3xl w-fit mb-6 text-brand-secondary group-hover:scale-110 transition-transform duration-500">
              <BookOpen size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Active Courses</p>
            <p className="text-5xl font-black text-slate-900 tracking-tighter">{allCourses.length}</p>
          </div>

          <div className="glass p-8 rounded-[2.5rem] relative group border-none">
            <div className="bg-amber-500/10 p-4 rounded-3xl w-fit mb-6 text-amber-500 group-hover:scale-110 transition-transform duration-500">
              <GraduationCap size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Certifications</p>
            <p className="text-5xl font-black text-slate-900 tracking-tighter">0</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
          <Link href="/students" className="glass p-10 rounded-[3rem] group hover:bg-brand-primary transition-all duration-500 border-none shadow-none">
            <h3 className="text-3xl font-bold mb-4 group-hover:text-white transition-colors">Register New Student</h3>
            <p className="text-slate-500 group-hover:text-white/80 transition-colors font-medium">Add a new admission to the database and set up their profile.</p>
          </Link>

          <Link href="/enrollment" className="glass p-10 rounded-[3rem] group hover:bg-brand-secondary transition-all duration-500 border-none shadow-none">
            <h3 className="text-3xl font-bold mb-4 group-hover:text-white transition-colors">Enroll in Courses</h3>
            <p className="text-slate-500 group-hover:text-white/80 transition-colors font-medium">Browse active courses and register students for the new term.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}