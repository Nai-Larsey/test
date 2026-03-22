"use client"

import { useState } from "react"
import { enrollInCourse } from "@/app/actions"

type Student = { id: string; name: string }
type Course = { id: string; title: string; capacity: number }

export default function EnrollmentForm({ students, courses }: { students: Student[], courses: Course[] }) {
  const [studentId, setStudentId] = useState("")
  const [courseId, setCourseId] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentId || !courseId) return setMessage({ type: "error", text: "Please select both a student and a course." })

    setLoading(true)
    setMessage(null)

    const result = await enrollInCourse(studentId, courseId)

    if (result.success) {
      setMessage({ type: "success", text: "Successfully enrolled in the course!" })
      setStudentId("") 
      setCourseId("")
    } else {
      setMessage({ type: "error", text: result.error || "An unknown error occurred." })
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center tracking-tight">Course Enrollment</h2>
      
      {message && (
        <div className={`p-4 mb-6 rounded-lg text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Student</label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-black"
            disabled={loading}
          >
            <option value="">Select a student...</option>
            {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div>
           <label className="block text-sm font-semibold text-gray-700 mb-1.5">Course</label>
           <select
             value={courseId}
             onChange={(e) => setCourseId(e.target.value)}
             className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-black"
             disabled={loading}
           >
             <option value="">Select a course...</option>
             {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
           </select>
        </div>

        <button type="submit" disabled={loading} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm disabled:opacity-70 flex justify-center">
          {loading ? "Processing..." : "Complete Enrollment"}
        </button>
      </form>
    </div>
  )
}
