"use client"

import { useState } from "react"
import { registerStudent } from "@/app/actions"

export default function StudentRegistrationForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return setMessage({ type: "error", text: "Please fill in all fields." })

    setLoading(true)
    setMessage(null)

    const result = await registerStudent({ name, email })

    if (result.success) {
      setMessage({ type: "success", text: `Successfully registered ${name}!` })
      setName("") 
      setEmail("")
      // Refresh the page to update the student list in the enrollment form
      window.location.reload()
    } else {
      setMessage({ type: "error", text: result.error || "Registration failed." })
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center tracking-tight">Register Student</h2>
      
      {message && (
        <div className={`p-4 mb-6 rounded-lg text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 text-black">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 font-sans">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading} className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm disabled:opacity-70 flex justify-center transform active:scale-[0.98] transition-all">
          {loading ? "Registering..." : "Register Student"}
        </button>
      </form>
    </div>
  )
}
